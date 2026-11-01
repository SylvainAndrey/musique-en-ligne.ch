// Génère le manifeste des médias + compresse les vidéos/audios pour le web.
// Usage: node scripts/build-media.mjs
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Chemin vers le dossier des médias sources bruts (hors dépôt, trop volumineux pour Git).
// Spécifique à la machine : surchargeable via la variable d'env MEDIA_SOURCE_ROOT si besoin.
const SOURCE_ROOT = process.env.MEDIA_SOURCE_ROOT || '/Users/sylvainandrey/www.musique-en-ligne.ch';
const PROJECT_ROOT = path.resolve(__dirname, '..');
const MEDIA_OUT = path.join(PROJECT_ROOT, 'public', 'media');
const MANIFEST_OUT = path.join(PROJECT_ROOT, 'src', 'data', 'media-manifest.generated.ts');

const VIDEO_EXT = new Set(['.mp4', '.mov', '.m4v']);
const AUDIO_EXT = new Set(['.mp3', '.wav', '.m4a']);

// Dossier source (avec accents) -> { grade, slug } utilisé sur le site.
const THEME_MAP = {
  '9H/Chant': { grade: '9h', slug: 'chant' },
  '9H/Cordes': { grade: '9h', slug: 'cordes' },
  '9H/Musique descriptive': { grade: '9h', slug: 'musique-descriptive' },
  '9H/Développement auditif': { grade: '9h', slug: 'developpement-auditif' },
  '9H/Découverte du langage musical': { grade: '9h', slug: 'decouverte-du-langage-musical' },
  '10H/Instruments à vent': { grade: '10h', slug: 'instruments-a-vent' },
  '10H/Développement auditif': { grade: '10h', slug: 'developpement-auditif' },
  '10H/Musique orchestrale, concerto et symphonie': { grade: '10h', slug: 'musique-orchestrale' },
  '10H/Découverte du langage musical': { grade: '10h', slug: 'decouverte-du-langage-musical' },
  '11H/La percussion': { grade: '11h', slug: 'percussion' },
  '11H/Développement auditif': { grade: '11h', slug: 'developpement-auditif' },
  '11H/Le jazz': { grade: '11h', slug: 'jazz' },
  '11H/Découverte du langage musical': { grade: '11h', slug: 'decouverte-du-langage-musical' },
  '9H/Bucket Drumming': { grade: '9h', slug: 'bucket-drumming' },
  '10H/Bucket Drumming': { grade: '10h', slug: 'bucket-drumming' },
  '11H/Bucket Drumming': { grade: '11h', slug: 'bucket-drumming' },
};

function slugify(input) {
  return input
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/&/g, ' et ')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase() || 'x';
}

function uniqueSlug(base, used) {
  let slug = base;
  let i = 2;
  while (used.has(slug)) {
    slug = `${base}-${i}`;
    i += 1;
  }
  used.add(slug);
  return slug;
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  let files = [];
  let dirs = [];
  for (const entry of entries) {
    if (entry.isDirectory()) dirs.push(entry.name);
    else files.push(entry.name);
  }
  return { files, dirs };
}

/** Collecte récursivement les sections média (un dossier "feuille" contenant des fichiers = 1 section). */
async function collectSections(themeDir, relParts = []) {
  const sections = [];
  const { files, dirs } = await walk(themeDir);
  const mediaFiles = files.filter((f) => VIDEO_EXT.has(path.extname(f).toLowerCase()) || AUDIO_EXT.has(path.extname(f).toLowerCase()));
  if (mediaFiles.length > 0) {
    sections.push({ pathParts: relParts, dir: themeDir, files: mediaFiles });
  }
  for (const d of dirs) {
    if (/^exercices?/i.test(d)) continue; // dossiers PDF/docx uniquement
    const sub = await collectSections(path.join(themeDir, d), [...relParts, d]);
    sections.push(...sub);
  }
  return sections;
}

function ffmpegTranscode(inputPath, outputPath, isVideo) {
  return new Promise((resolve, reject) => {
    const args = isVideo
      ? [
          '-y', '-i', inputPath,
          '-vf', "scale='min(1280,iw)':'min(720,ih)':force_original_aspect_ratio=decrease",
          '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '27',
          '-c:a', 'aac', '-b:a', '128k',
          '-movflags', '+faststart',
          outputPath,
        ]
      : [
          '-y', '-i', inputPath,
          '-c:a', 'libmp3lame', '-b:a', '128k',
          outputPath,
        ];
    const proc = spawn('ffmpeg', args, { stdio: ['ignore', 'ignore', 'pipe'] });
    let stderr = '';
    proc.stderr.on('data', (d) => { stderr += d.toString(); });
    proc.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`ffmpeg exit ${code} for ${inputPath}\n${stderr.slice(-800)}`));
    });
  });
}

async function main() {
  const manifest = {};
  const jobs = [];

  for (const [relTheme, { grade, slug }] of Object.entries(THEME_MAP)) {
    const themeDir = path.join(SOURCE_ROOT, ...relTheme.split('/'));
    let sections;
    try {
      sections = await collectSections(themeDir);
    } catch (err) {
      console.error(`Theme introuvable: ${themeDir}`, err.message);
      continue;
    }

    const key = `${grade}/${slug}`;
    manifest[key] = manifest[key] || [];
    const usedSectionSlugs = new Set();

    for (const section of sections) {
      const title = section.pathParts.length ? section.pathParts.join(' › ') : 'Médias';
      const sectionSlugBase = slugify(section.pathParts.join('-') || 'medias');
      const sectionSlug = uniqueSlug(sectionSlugBase, usedSectionSlugs);
      const outDir = path.join(MEDIA_OUT, grade, slug, sectionSlug);
      const items = [];
      const usedFileSlugs = new Set();

      for (const file of section.files) {
        const ext = path.extname(file).toLowerCase();
        const isVideo = VIDEO_EXT.has(ext);
        const base = path.basename(file, ext);
        const fileSlugBase = slugify(base);
        const fileSlug = uniqueSlug(fileSlugBase, usedFileSlugs);
        const outExt = isVideo ? '.mp4' : '.mp3';
        const outName = `${fileSlug}${outExt}`;
        const outPath = path.join(outDir, outName);
        const inPath = path.join(section.dir, file);

        items.push({
          title: base.replace(/\s*\+\s*/g, ' + ').trim(),
          type: isVideo ? 'video' : 'audio',
          src: `/media/${grade}/${slug}/${sectionSlug}/${outName}`.replace(/\\/g, '/'),
        });

        jobs.push({ inPath, outPath, outDir, isVideo });
      }

      manifest[key].push({ title, items });
    }
  }

  // Phase A: écrire le manifeste tout de suite (rapide), pour pouvoir construire les pages sans attendre l'encodage.
  const tsContent = `// Fichier généré automatiquement par scripts/build-media.mjs — ne pas éditer à la main.\nimport type { MediaSection } from './types';\n\nexport const mediaSections: Record<string, MediaSection[]> = ${JSON.stringify(manifest, null, 2)};\n`;
  await fs.mkdir(path.dirname(MANIFEST_OUT), { recursive: true });
  await fs.writeFile(MANIFEST_OUT, tsContent, 'utf8');
  console.log(`Manifeste écrit: ${MANIFEST_OUT} (${jobs.length} fichiers à traiter)`);

  // Phase B: transcodage (lent).
  let done = 0;
  for (const job of jobs) {
    await fs.mkdir(job.outDir, { recursive: true });
    try {
      await fs.access(job.outPath);
      done += 1;
      continue; // déjà généré (reprise possible)
    } catch {
      /* pas encore généré */
    }
    try {
      await ffmpegTranscode(job.inPath, job.outPath, job.isVideo);
    } catch (err) {
      console.error('ÉCHEC:', job.inPath, err.message);
    }
    done += 1;
    if (done % 5 === 0 || done === jobs.length) {
      console.log(`[${done}/${jobs.length}] ${path.basename(job.outPath)}`);
    }
  }
  console.log('Compression média terminée.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

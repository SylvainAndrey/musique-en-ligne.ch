import { playSequence, playChord, C_MAJOR_FREQ } from '../audio';

export interface MediaRef {
  type: 'video' | 'audio';
  src: string;
  /** Si vrai, masque l'image de la vidéo et ne garde que le son (pour ne pas donner d'indice visuel). */
  audioOnly?: boolean;
}

/** Insère un lecteur vidéo/audio compact avant le reste de l'exercice, si une référence média est fournie. */
export function renderMediaRef(container: HTMLElement, media?: MediaRef): void {
  if (!media) return;
  const wrap = document.createElement('div');
  wrap.className = 'exo-media';
  if (media.type === 'video' && !media.audioOnly) {
    const video = document.createElement('video');
    video.controls = true;
    video.preload = 'none';
    video.src = media.src;
    wrap.appendChild(video);
  } else {
    // audioOnly : un <audio> lit uniquement la piste sonore d'un fichier vidéo, sans jamais afficher l'image.
    const audio = document.createElement('audio');
    audio.controls = true;
    audio.preload = 'none';
    audio.src = media.src;
    wrap.appendChild(audio);
  }
  container.appendChild(wrap);
}

/**
 * Insère un bouton « Écouter » qui joue une courte mélodie synthétisée à partir de noms de notes
 * (ex: ['do4','mi4','sol4']). Utile quand aucun enregistrement audio de référence n'existe :
 * la mélodie est générée par le site lui-même, donc la bonne réponse est toujours vérifiable.
 */
export function renderSynthButton(container: HTMLElement, notes?: string[], noteMs = 420): void {
  if (!notes || notes.length === 0) return;
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'btn btn-ghost exo-synth-btn';
  btn.textContent = '▶ Écouter';
  btn.addEventListener('click', () => {
    const freqs = notes.map((n) => C_MAJOR_FREQ[n] ?? 440);
    playSequence(freqs, noteMs);
  });
  container.appendChild(btn);
}

/**
 * Insère un bouton « Écouter l'accord » qui joue plusieurs notes en même temps (accord),
 * avec un son doux, à partir de noms de notes (ex: ['do4','mi4','sol4']).
 */
export function renderChordButton(container: HTMLElement, notes?: string[]): void {
  if (!notes || notes.length === 0) return;
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'btn btn-ghost exo-synth-btn';
  btn.textContent = '▶ Écouter l’accord';
  btn.addEventListener('click', () => {
    const freqs = notes.map((n) => C_MAJOR_FREQ[n] ?? 440);
    playChord(freqs);
  });
  container.appendChild(btn);
}

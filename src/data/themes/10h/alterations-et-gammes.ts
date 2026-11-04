import type { ThemeContent } from '../../types';

// Sous-thème de « Découverte du langage musical » (10H), d'après le dossier
// « 10H – Langage musical – Altérations et gammes ».
const GRADE = '10h';
const SLUG = 'alterations-et-gammes';
const id = (n: number) => `${GRADE}-${SLUG}-${n}`;
const IMG = '/images/10h-alterations-et-gammes';

/** Réponses acceptées pour une note altérée, ex. alt('Ré', '#') → « ré# », « ré dièse »… */
function alt(note: string, accidental: '#' | 'b' | 'n'): string[] {
  const n = note.toLowerCase();
  if (accidental === '#') return [`${n}#`, `${n} dièse`];
  if (accidental === 'b') return [`${n}b`, `${n} bémol`, `${n}♭`];
  return [`${n} bécarre`, `${n}♮`, `${n} naturel`];
}
const INTERVAL_OPTIONS = ['1 ton', '½ ton'];
const MAJ_MIN = ['Majeur', 'Mineur'];

const theme: ThemeContent = {
  grade: GRADE,
  slug: SLUG,
  parent: 'decouverte-du-langage-musical',
  order: 2,
  title: 'Altérations et gammes',
  description: 'Dièses, bémols et bécarres, tons et demi-tons, gammes majeures et mineures et tonalités.',
  colorVar: '--color-10h',
  icon: '♯',
  interactive: true,
  intro:
    "La musique est composée de notes qui elles-mêmes forment des gammes. Selon leur construction, elles peuvent être majeures, mineures ou modales. Une gamme est l'espacement entre deux notes du même nom séparées par une octave, par exemple de do à do ou de ré à ré. Depuis l'époque baroque, et plus précisément grâce à Jean-Sébastien Bach et son « Clavier bien tempéré », la musique est dodécaphonique, c'est-à-dire construite sur 12 demi-tons égaux. Les altérations (dièse, bémol, bécarre) permettent d'écrire ces notes intermédiaires.",
  heroImage: '/images/themes/10h-alterations-et-gammes.svg',
  sections: [],
  exercises: [
    {
      id: id(3),
      number: 1,
      title: 'Aux origines de la gamme',
      instructions:
        "Le monocorde de Pythagore, la « musique des sphères » (le chant des étoiles) et le cor des Alpes : quel est leur point commun ?",
      engine: 'mcq',
      data: {
        items: [
          {
            question: 'Leur point commun :',
            options: [
              'Ce sont tous des instruments inventés en Suisse.',
              "Ils reposent tous sur les rapports naturels entre les sons (les harmoniques étudiées par Pythagore), à l'origine de nos gammes.",
              "Ils datent tous de l'époque baroque et du « Clavier bien tempéré » de Bach.",
              'Ils servent tous à battre la mesure.',
            ],
            correctIndex: 1,
          },
        ],
      },
    },
    {
      id: id(17),
      number: 2,
      title: 'Les altérations : leur nom',
      instructions: "Comment s'appellent ces trois altérations ?",
      engine: 'fill-blank',
      data: {
        layout: 'grid',
        large: true,
        items: [
          { id: 'diese', glyph: '♯', prompt: '', accepted: ['dièse', 'le dièse', 'diese'] },
          { id: 'bemol', glyph: '♭', prompt: '', accepted: ['bémol', 'le bémol', 'bemol'] },
          { id: 'becarre', glyph: '♮', prompt: '', accepted: ['bécarre', 'le bécarre', 'becarre'] },
        ],
      },
    },
    {
      id: id(16),
      number: 3,
      title: 'Les altérations : leur rôle',
      instructions: "Relie chaque altération à sa signification : que fait-elle à la note devant laquelle elle est placée ?",
      engine: 'matching',
      data: {
        largeLeft: true,
        pairs: [
          { left: '♯', right: "Élève (hausse) la note d'un demi-ton" },
          { left: '♭', right: "Abaisse la note d'un demi-ton" },
          { left: '♮', right: "Annule l'altération : la note redevient naturelle" },
        ],
      },
    },
    {
      id: id(5),
      number: 4,
      title: 'Les haltères à Sion',
      instructions:
        "Inscris sur la portée les notes altérées suivantes. Attention : les altérations s'écrivent avant la note (ici, elles s'affichent automatiquement à gauche de la note).",
      engine: 'staff-write',
      data: { targets: ['Do#', 'Mib', 'Sol#', 'Sib', 'Fab', 'Ré#'] },
    },
    {
      id: id(6),
      number: 5,
      title: 'À la pêche aux altérations',
      instructions:
        "Trouve la bonne touche du piano pour chaque note. Rappel : un dièse monte d'un demi-ton (la touche juste à droite), un bémol descend d'un demi-ton (la touche juste à gauche). Attention, entre mi et fa et entre si et do, il n'y a pas de touche noire !",
      engine: 'piano-find',
      data: { targets: ['Mi#', 'Mib', 'Lab', 'Sib', 'Sol#', 'Fab'] },
    },
    {
      id: id(7),
      number: 6,
      title: 'Qui est-ce ?',
      instructions:
        "Voici deux extraits de partitions connues. Donne le nom de toutes les notes possédant une altération (dans l'ordre où elles apparaissent), ainsi que le titre du morceau.",
      engine: 'composite',
      data: {
        parts: [
          {
            title: 'Extrait A',
            engine: 'fill-blank',
            data: {
              layout: 'list',
              image: `${IMG}/lettre-a-elise.png`,
              imageAlt: 'Extrait de partition A',
              items: [
                { id: 'a1', prompt: '1re note altérée', accepted: alt('Ré', '#') },
                { id: 'a2', prompt: '2e note altérée', accepted: alt('Ré', 'n') },
                { id: 'a3', prompt: '3e note altérée', accepted: alt('Sol', '#') },
                { id: 'a-titre', prompt: 'Titre du morceau', accepted: ['lettre à élise', 'la lettre à élise', 'für elise', 'fur elise', 'pour élise', 'lettre à élise de beethoven'] },
              ],
            },
          },
          {
            title: 'Extrait B',
            engine: 'fill-blank',
            data: {
              layout: 'list',
              image: `${IMG}/vol-du-bourdon.png`,
              imageAlt: 'Extrait de partition B',
              items: [
                { id: 'b1', prompt: '1re note altérée', accepted: alt('Ré', '#') },
                { id: 'b2', prompt: '2e note altérée', accepted: alt('Ré', 'n') },
                { id: 'b3', prompt: '3e note altérée', accepted: alt('Do', '#') },
                { id: 'b4', prompt: '4e note altérée', accepted: alt('Do', 'n') },
                { id: 'b-titre', prompt: 'Titre du morceau', accepted: ['le vol du bourdon', 'vol du bourdon'] },
              ],
            },
          },
        ],
      },
    },
    {
      id: id(8),
      number: 7,
      title: 'Les dents de la mère',
      instructions:
        "Écoute le motif du leitmotiv du film « Les Dents de la mer ». Les deux notes qui le composent sont-elles séparées d'un ton ou d'un demi-ton ?",
      engine: 'mcq',
      data: {
        items: [
          { question: 'Le motif des « Dents de la mer »', synth: ['mi3', 'fa3', 'mi3', 'fa3', 'mi3', 'fa3', 'mi3', 'fa3'], options: INTERVAL_OPTIONS, correctIndex: 1 },
        ],
      },
    },
    {
      id: id(9),
      number: 8,
      title: 'Triste ou joyeux ?',
      lesson: [
        "Une gamme majeure répond à une structure très précise : des tons partout, sauf entre la 3e et la 4e note ainsi qu'entre la 7e et la 8e note, qui sont séparées par des demi-tons. Voici par exemple la gamme de do majeur.",
        "Les gammes mineures répondent à une logique semblable, à la différence que l'agencement des tons et des demi-tons est différent, comme dans la gamme de la mineur. À l'oreille, le majeur sonne souvent joyeux et lumineux, le mineur plus triste ou plus sombre.",
      ],
      images: [
        { src: `${IMG}/structure-gamme-majeure.png`, alt: 'Gamme de do majeur avec ses tons et demi-tons', caption: 'Do majeur' },
        { src: `${IMG}/structure-gamme-mineure.png`, alt: 'Gamme de la mineur avec ses tons et demi-tons', caption: 'La mineur' },
      ],
      instructions:
        "Écoute ces gammes. Indique s'il s'agit d'une gamme majeure (plutôt joyeuse) ou mineure (plutôt triste).",
      engine: 'mcq',
      data: {
        items: [
          { question: 'Gamme A', synth: ['do4', 're4', 'mi4', 'fa4', 'sol4', 'la4', 'si4', 'do5'], options: MAJ_MIN, correctIndex: 0 },
          { question: 'Gamme B', synth: ['la3', 'si3', 'do4', 're4', 'mi4', 'fa4', 'sol4', 'la4'], options: MAJ_MIN, correctIndex: 1 },
          { question: 'Gamme C', synth: ['re4', 'mi4', 'fa4', 'sol4', 'la4', 'si4b', 'do5', 're5'], options: MAJ_MIN, correctIndex: 1 },
          { question: 'Gamme D', synth: ['sol3', 'la3', 'si3', 'do4', 're4', 'mi4', 'fa4#', 'sol4'], options: MAJ_MIN, correctIndex: 0 },
          { question: 'Gamme E', synth: ['mi3', 'fa3#', 'sol3', 'la3', 'si3', 'do4', 're4', 'mi4'], options: MAJ_MIN, correctIndex: 1 },
          { question: 'Gamme F', synth: ['fa3', 'sol3', 'la3', 'si3b', 'do4', 're4', 'mi4', 'fa4'], options: MAJ_MIN, correctIndex: 0 },
        ],
      },
    },
    {
      id: id(10),
      number: 9,
      title: 'Frère Jacques change d’humeur',
      instructions: 'Voici deux versions du canon « Frère Jacques ». Laquelle est en majeur et laquelle est en mineur ?',
      engine: 'mcq',
      data: {
        items: [
          { question: 'Version 1', synth: ['do4', 're4', 'mi4b', 'do4', 'do4', 're4', 'mi4b', 'do4', 'mi4b', 'fa4', 'sol4'], options: MAJ_MIN, correctIndex: 1 },
          { question: 'Version 2', synth: ['do4', 're4', 'mi4', 'do4', 'do4', 're4', 'mi4', 'do4', 'mi4', 'fa4', 'sol4'], options: MAJ_MIN, correctIndex: 0 },
        ],
      },
    },
    {
      id: id(12),
      number: 10,
      title: 'Montée en gamme',
      instructions: 'Voici une gamme de sol majeur. Indique les intervalles entre les notes : 1 ton ou ½ ton ?',
      images: [{ src: `${IMG}/gamme-de-sol-majeur.png`, alt: 'Gamme de sol majeur sur la portée, avec un fa dièse à la clé' }],
      engine: 'mcq',
      data: {
        items: [
          { question: 'Sol → La', synth: ['sol4', 'la4'], options: INTERVAL_OPTIONS, correctIndex: 0 },
          { question: 'La → Si', synth: ['la4', 'si4'], options: INTERVAL_OPTIONS, correctIndex: 0 },
          { question: 'Si → Do', synth: ['si4', 'do5'], options: INTERVAL_OPTIONS, correctIndex: 1 },
          { question: 'Do → Ré', synth: ['do4', 're4'], options: INTERVAL_OPTIONS, correctIndex: 0 },
          { question: 'Ré → Mi', synth: ['re4', 'mi4'], options: INTERVAL_OPTIONS, correctIndex: 0 },
          { question: 'Mi → Fa♯', synth: ['mi4', 'fa4#'], options: INTERVAL_OPTIONS, correctIndex: 0 },
          { question: 'Fa♯ → Sol', synth: ['fa4#', 'sol4'], options: INTERVAL_OPTIONS, correctIndex: 1 },
        ],
      },
    },
    {
      id: id(13),
      number: 11,
      title: 'Ré',
      instructions:
        "Construis la gamme de ré majeur en respectant la structure de la gamme majeure (1 ton – 1 ton – ½ ton – 1 ton – 1 ton – 1 ton – ½ ton) : glisse les altérations nécessaires devant les bonnes notes. Aide-toi de la gamme de do majeur et du clavier ci-dessous.",
      images: [{ src: `${IMG}/aide-gamme-de-do-majeur.png`, alt: 'Gamme de do majeur avec ses tons et demi-tons, et clavier de piano' }],
      engine: 'scale-fix',
      data: { roots: ['Ré'], octaveShifts: { Ré: -1 } },
    },

    // --- Révision pour le test, sur le modèle de l'exercice n° 15 du dossier ---
    {
      id: id(15),
      number: 12,
      title: 'Révision',
      instructions: 'Révise pour le test : réalise chaque consigne et vérifie tes réponses au fur et à mesure.',
      engine: 'composite',
      data: {
        parts: [
          {
            title: 'A) Nomme ces 3 altérations (3 points)',
            engine: 'fill-blank',
            data: {
              layout: 'grid',
              large: true,
              items: [
                { id: 'r-bemol', glyph: '♭', prompt: '1)', accepted: ['bémol', 'le bémol', 'bemol'] },
                { id: 'r-becarre', glyph: '♮', prompt: '2)', accepted: ['bécarre', 'le bécarre', 'becarre'] },
                { id: 'r-diese', glyph: '♯', prompt: '3)', accepted: ['dièse', 'le dièse', 'diese'] },
              ],
            },
          },
          {
            title: 'B) Écris 4 notes différentes de ton choix : 2 avec un dièse, 2 avec un bémol (4 points)',
            engine: 'staff-write',
            data: { free: { count: 4, sharps: 2, flats: 2 } },
          },
          {
            title: 'C) Trouve la touche du clavier correspondant à chaque note (4 points)',
            engine: 'piano-find',
            data: { targets: ['Do#', 'Fab', 'La#', 'Réb'], showLabels: true },
          },
          {
            title: 'D) En do majeur, entre quelles notes y a-t-il un demi-ton ? (2 points)',
            instructions: 'Écris les deux paires de notes, par exemple « do et ré ».',
            engine: 'fill-blank',
            data: {
              layout: 'list',
              items: [
                { id: 'r-demi-1', prompt: '1re paire', accepted: ['mi et fa', 'mi fa', 'mi-fa', 'fa et mi', 'mi a fa'] },
                { id: 'r-demi-2', prompt: '2e paire', accepted: ['si et do', 'si do', 'si-do', 'do et si', 'si a do'] },
              ],
            },
          },
          {
            title: 'E) Y a-t-il 1 ton ou ½ ton entre les notes suivantes ? (3 points)',
            engine: 'mcq',
            data: {
              items: [
                { question: '1) Do → Ré', synth: ['do4', 're4'], options: INTERVAL_OPTIONS, correctIndex: 0 },
                { question: '2) Mi → Fa', synth: ['mi4', 'fa4'], options: INTERVAL_OPTIONS, correctIndex: 1 },
                { question: '3) La → Si', synth: ['la4', 'si4'], options: INTERVAL_OPTIONS, correctIndex: 0 },
              ],
            },
          },
        ],
      },
    },
  ],
};

export default theme;

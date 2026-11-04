import type { ThemeContent } from '../../types';

// Sous-thème de « Développement auditif » (11H).
// Les exercices viennent de l'ancienne page « Développement auditif » et du dossier
// « Intervalles et signatures rythmiques » : leurs identifiants d'origine sont conservés pour garder la progression des élèves.
const GRADE = '11h';
const SLUG = 'intervalles';
const DA = (n: number) => `${GRADE}-developpement-auditif-${n}`;
const IS = (n: number) => `${GRADE}-intervalles-et-signatures-rythmiques-${n}`;
const IMG = '/images/11h-intervalles-et-signatures';

const INTERVALS = ['Prime (unisson)', 'Seconde', 'Tierce', 'Quarte', 'Quinte', 'Sixte', 'Septième', 'Octave'];
const SONG_INTERVALS = ['Seconde', 'Tierce', 'Quarte', 'Quinte', 'Sixte', 'Octave'];

const theme: ThemeContent = {
  grade: GRADE,
  slug: SLUG,
  parent: 'developpement-auditif',
  order: 2,
  title: 'Intervalles',
  description: "Nommer, écrire et reconnaître à l'oreille les intervalles, de la prime à l'octave.",
  colorVar: '--color-11h',
  icon: '👂',
  interactive: true,
  intro:
    "Les intervalles sont l'espacement entre deux notes : on les définit grâce aux tons et demi-tons qui les constituent et on les compte de la note de départ jusqu'à la note d'arrivée incluse. Chanter à des intervalles différents permet de créer des polyphonies, comme dans un canon.",
  heroImage: '/images/themes/11h-intervalles.svg',
  sections: [],
  exercises: [
    {
      id: DA(1),
      number: 1,
      title: 'Vocabulaire',
      instructions: 'Complète ces définitions liées aux intervalles et à la polyphonie.',
      engine: 'fill-blank',
      data: {
        layout: 'list',
        items: [
          { id: 'a', prompt: "L'espacement entre deux notes, mesuré en tons et demi-tons, s'appelle un ___", accepted: ['intervalle'] },
          { id: 'b', prompt: 'Une pièce où la même mélodie est chantée par plusieurs voix qui commencent à des moments différents est un ___', accepted: ['canon'] },
          { id: 'c', prompt: 'Le fait que plusieurs voix chantent ou jouent des parties différentes en même temps s’appelle la ___', accepted: ['polyphonie'] },
          { id: 'd', prompt: 'Un intervalle entre deux notes identiques (même hauteur) s’appelle un ___', accepted: ['unisson'] },
        ],
      },
    },
    {
      id: IS(4),
      number: 2,
      title: 'Qui est-ce ?',
      lesson: [
        "Les intervalles sont l'espacement entre deux notes. On les définit grâce aux tons et demi-tons qui les constituent. On compte les intervalles de la note de départ jusqu'à la note d'arrivée incluse : de do à sol, on compte do-ré-mi-fa-sol, soit 5 notes : c'est une quinte.",
        "Pour reconnaître les intervalles à l'oreille, il est utile, voire nécessaire, d'avoir un repère auditif : une mélodie ou une chanson que l'on peut se chanter facilement dans la tête.",
      ],
      images: [{ src: `${IMG}/intervalles.svg`, alt: 'Les huit intervalles à partir de do : prime, seconde, tierce, quarte, quinte, sixte, septième et octave' }],
      instructions: 'Écoute le début de chaque chanson, puis l’intervalle formé par ses deux premières notes différentes, et relie la chanson au bon intervalle.',
      engine: 'mcq',
      data: {
        items: [
          { question: '1) Malbrough s’en va-t-en guerre', sounds: [{ label: 'La chanson', notes: ['do4', 'mi4', 'mi4', 'mi4', 're4', 'mi4', 'fa4', 'mi4', 'mi4', 're4', 're4', 're4'] }, { label: 'L’intervalle', notes: ['do4', 'mi4'] }], options: SONG_INTERVALS, correctIndex: 1 },
          { question: '2) La Marseillaise', sounds: [{ label: 'La chanson', notes: ['re4', 're4', 're4', 'sol4', 'sol4', 'la4', 'la4', 're5', 'si4', 'sol4'] }, { label: 'L’intervalle', notes: ['re4', 'sol4'] }], options: SONG_INTERVALS, correctIndex: 2 },
          { question: '3) Une souris verte', sounds: [{ label: 'L’intervalle', notes: ['do4', 'la4'] }], options: SONG_INTERVALS, correctIndex: 4 },
          { question: '4) Frère Jacques', sounds: [{ label: 'La chanson', notes: ['do4', 're4', 'mi4', 'do4', 'do4', 're4', 'mi4', 'do4'] }, { label: 'L’intervalle', notes: ['do4', 're4'] }], options: SONG_INTERVALS, correctIndex: 0 },
          { question: '5) Over the Rainbow', sounds: [{ label: 'La chanson', notes: ['do4', 'do5', 'si4', 'sol4', 'la4', 'si4', 'do5'] }, { label: 'L’intervalle', notes: ['do4', 'do5'] }], options: SONG_INTERVALS, correctIndex: 5 },
          { question: '6) Ah ! vous dirai-je, maman (Quand trois poules vont aux champs)', sounds: [{ label: 'La chanson', notes: ['do4', 'do4', 'sol4', 'sol4', 'la4', 'la4', 'sol4'] }, { label: 'L’intervalle', notes: ['do4', 'sol4'] }], options: SONG_INTERVALS, correctIndex: 3 },
        ],
      },
    },
    {
      id: IS(5),
      number: 3,
      title: 'À la quête des intervalles',
      instructions: 'Nomme chaque intervalle.',
      engine: 'interval-read',
      data: {
        items: [
          { from: 'Sol4', to: 'Do4' },
          { from: 'Do4', to: 'Ré4' },
          { from: 'Do4', to: 'La4' },
          { from: 'Do4', to: 'Do4' },
          { from: 'La4', to: 'Fa4' },
          { from: 'Do5', to: 'Do4' },
          { from: 'Do4', to: 'Fa4' },
          { from: 'Sol4', to: 'Do5' },
          { from: 'Do5', to: 'Si4' },
          { from: 'Ré5', to: 'Sol4' },
          { from: 'Sol4', to: 'La4' },
          { from: 'Mi4', to: 'Do4' },
        ],
      },
    },
    {
      id: IS(7),
      number: 4,
      title: 'L’inter… valle',
      instructions:
        "Écris les 7 intervalles à partir de do : place la note d'arrivée au-dessus du do (grisé) pour former l'intervalle demandé.",
      engine: 'staff-write',
      data: {
        baseStep: -2,
        noAccidentals: true,
        labels: ['Seconde', 'Tierce', 'Quarte', 'Quinte', 'Sixte', 'Septième', 'Octave'],
        targets: ['Ré', 'Mi', 'Fa', 'Sol', 'La', 'Si', 'Do'],
      },
    },
    {
      id: IS(8),
      number: 5,
      title: 'Dictée d’intervalles',
      instructions: 'Écoute les intervalles qui te sont joués (chaque fois à partir de do) et indique leur nom, dans leur ordre d’apparition.',
      engine: 'mcq',
      data: {
        items: [
          { question: 'Intervalle 1', synth: ['do4', 'sol4'], options: INTERVALS, correctIndex: 4 },
          { question: 'Intervalle 2', synth: ['do4', 'mi4'], options: INTERVALS, correctIndex: 2 },
          { question: 'Intervalle 3', synth: ['do4', 'do5'], options: INTERVALS, correctIndex: 7 },
          { question: 'Intervalle 4', synth: ['do4', 're4'], options: INTERVALS, correctIndex: 1 },
          { question: 'Intervalle 5', synth: ['do4', 'la4'], options: INTERVALS, correctIndex: 5 },
          { question: 'Intervalle 6', synth: ['do4', 'do4'], options: INTERVALS, correctIndex: 0 },
          { question: 'Intervalle 7', synth: ['do4', 'fa4'], options: INTERVALS, correctIndex: 3 },
          { question: 'Intervalle 8', synth: ['do4', 'si4'], options: INTERVALS, correctIndex: 6 },
        ],
      },
    },

    // --- Révision pour le test (consignes A et B de l'exercice n° 19 du dossier 11H) ---
    {
      id: `${GRADE}-${SLUG}-revision`,
      number: 6,
      title: 'Révision',
      instructions: 'Révise pour le test : réalise chaque consigne et vérifie tes réponses au fur et à mesure.',
      engine: 'composite',
      data: {
        parts: [
          {
            title: 'A) Indique le nom de ces intervalles (4 points)',
            engine: 'interval-read',
            data: {
              items: [
                { from: 'Mi4', to: 'Do5', harmonic: true },
                { from: 'Ré4', to: 'La4', harmonic: true },
                { from: 'Mi4', to: 'Sol4', harmonic: true },
                { from: 'Ré4', to: 'Sol4', harmonic: true },
              ],
            },
          },
          {
            title: 'B) Écris cinq intervalles différents en dessinant la note d’arrivée au-dessus du do (4 points)',
            engine: 'staff-write',
            data: {
              baseStep: -2,
              noAccidentals: true,
              labels: ['Tierce', 'Quinte', 'Seconde', 'Octave', 'Sixte'],
              targets: ['Mi', 'Sol', 'Ré', 'Do', 'La'],
            },
          },
        ],
      },
    },
  ],
};

export default theme;

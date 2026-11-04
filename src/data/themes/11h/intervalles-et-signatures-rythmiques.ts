import type { ThemeContent } from '../../types';

// Sous-thème de « Découverte du langage musical » (11H), d'après le dossier
// « 11H – Découverte du langage musical – Intervalles et signatures rythmiques ».
// Les images de signatures et le tableau des intervalles sont générés par scripts/generate-notation-images.py.
const GRADE = '11h';
const SLUG = 'intervalles-et-signatures-rythmiques';
const id = (n: number) => `${GRADE}-${SLUG}-${n}`;
const IMG = '/images/11h-intervalles-et-signatures';
const sig = (num: number, den: number) => `${IMG}/signature-${num}-${den}.svg`;

const INTERVALS = ['Prime (unisson)', 'Seconde', 'Tierce', 'Quarte', 'Quinte', 'Sixte', 'Septième', 'Octave'];
const SONG_INTERVALS = ['Seconde', 'Tierce', 'Quarte', 'Quinte', 'Sixte', 'Octave'];
const SONGS = [
  'Frère Jacques',
  'Une souris verte',
  'Malbrough s’en va-t-en guerre',
  'La Marseillaise',
  'Over the Rainbow',
  'Ah ! vous dirai-je, maman (Quand trois poules vont aux champs)',
];
const BEATS = ['1 temps', '2 temps', '3 temps', '4 temps'];
/** Réponses acceptées pour une signature rythmique, ex. fraction('4/4') → « 4/4 », « 4 4 », « 4 sur 4 ». */
const fraction = (...values: string[]) => values.flatMap((v) => [v, v.replace('/', ' '), v.replace('/', ' sur ')]);

const theme: ThemeContent = {
  grade: GRADE,
  slug: SLUG,
  parent: 'decouverte-du-langage-musical',
  order: 2,
  title: 'Intervalles et signatures rythmiques',
  description: "Reconnaître et écrire les intervalles, comprendre les signatures rythmiques binaires, ternaires et irrégulières.",
  colorVar: '--color-11h',
  icon: '🎼',
  interactive: true,
  intro:
    "Les intervalles sont l'espacement entre deux notes : on les définit grâce aux tons et demi-tons qui les constituent et on les compte de la note de départ jusqu'à la note d'arrivée incluse. Chanter à des intervalles différents permet de créer des polyphonies. La signature rythmique, elle, est une fraction placée au début de la portée qui indique la quantité de musique contenue dans chaque mesure.",
  heroImage: '/images/themes/11h-intervalles-et-signatures-rythmiques.svg',
  sections: [],
  exercises: [
    // --- Les intervalles ---
    {
      id: id(3),
      number: 1,
      title: 'Les comptines de notre enfance',
      instructions: "Écoute le début de ces chansons que tu as peut-être chantées dans ton enfance. Devine leur titre, puis chante-les.",
      engine: 'mcq',
      data: {
        items: [
          { question: 'Chanson 1', synth: ['do4', 're4', 'mi4', 'do4', 'do4', 're4', 'mi4', 'do4'], options: SONGS, correctIndex: 0 },
          { question: 'Chanson 2', synth: ['do4', 'do4', 'sol4', 'sol4', 'la4', 'la4', 'sol4', 'fa4', 'fa4', 'mi4', 'mi4', 're4', 're4', 'do4'], options: SONGS, correctIndex: 5 },
          { question: 'Chanson 3', synth: ['do4', 'mi4', 'mi4', 'mi4', 're4', 'mi4', 'fa4', 'mi4', 'mi4', 're4', 're4', 're4'], options: SONGS, correctIndex: 2 },
          { question: 'Chanson 4', synth: ['do4', 'do5', 'si4', 'sol4', 'la4', 'si4', 'do5'], options: SONGS, correctIndex: 4 },
          { question: 'Chanson 5', synth: ['re4', 're4', 're4', 'sol4', 'sol4', 'la4', 'la4', 're5', 'si4', 'sol4'], options: SONGS, correctIndex: 3 },
        ],
      },
    },
    {
      id: id(4),
      number: 2,
      title: 'Qui est-ce ?',
      lesson: [
        "Les intervalles sont l'espacement entre deux notes. On les définit grâce aux tons et demi-tons qui les constituent. On compte les intervalles de la note de départ jusqu'à la note d'arrivée incluse : de do à sol, on compte do-ré-mi-fa-sol, soit 5 notes : c'est une quinte.",
        "Pour reconnaître les intervalles à l'oreille, il est utile, voire nécessaire, d'avoir un repère auditif : une mélodie ou une chanson que l'on peut se chanter facilement dans la tête.",
      ],
      images: [{ src: `${IMG}/intervalles.svg`, alt: 'Les huit intervalles à partir de do : prime, seconde, tierce, quarte, quinte, sixte, septième et octave' }],
      instructions: 'Écoute le début de chaque chanson (ses deux premières notes différentes) et relie-la au bon intervalle.',
      engine: 'mcq',
      data: {
        items: [
          { question: '1) Malbrough s’en va-t-en guerre', synth: ['do4', 'mi4'], options: SONG_INTERVALS, correctIndex: 1 },
          { question: '2) La Marseillaise', synth: ['re4', 'sol4'], options: SONG_INTERVALS, correctIndex: 2 },
          { question: '3) Une souris verte', synth: ['do4', 'la4'], options: SONG_INTERVALS, correctIndex: 4 },
          { question: '4) Frère Jacques', synth: ['do4', 're4'], options: SONG_INTERVALS, correctIndex: 0 },
          { question: '5) Over the Rainbow', synth: ['do4', 'do5'], options: SONG_INTERVALS, correctIndex: 5 },
          { question: '6) Ah ! vous dirai-je, maman (Quand trois poules vont aux champs)', synth: ['do4', 'sol4'], options: SONG_INTERVALS, correctIndex: 3 },
        ],
      },
    },
    {
      id: id(5),
      number: 3,
      title: 'À la quête des intervalles',
      instructions:
        "Voici des paires de notes qui se suivent dans un menuet. Nomme chaque intervalle. Attention : on compte la note de départ jusqu'à la note d'arrivée incluse.",
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
        ],
      },
    },
    {
      id: id(6),
      number: 4,
      title: 'Une ou un intervalle ?',
      instructions:
        "Ces paires de notes sont tirées du menuet du « Bourgeois gentilhomme » de Jean-Baptiste Lully (1632-1687). Indique le nom de chaque intervalle.",
      engine: 'interval-read',
      data: {
        items: [
          { from: 'Sol4', to: 'Do5' },
          { from: 'Do5', to: 'Si4' },
          { from: 'Ré5', to: 'Sol4' },
          { from: 'Sol4', to: 'La4' },
          { from: 'La4', to: 'Fa4' },
          { from: 'Mi4', to: 'Do4' },
        ],
      },
    },
    {
      id: id(7),
      number: 5,
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
      id: id(8),
      number: 6,
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

    // --- Les signatures rythmiques ---
    {
      id: id(10),
      number: 7,
      title: 'C’est combien ?',
      instructions: 'Écoute les trois extraits (le premier temps de chaque mesure est accentué) et indique le nombre de temps de la mesure.',
      engine: 'listen-meter',
      data: {
        items: [
          { id: 'a', label: 'Extrait 1', bpm: 96, beatsPerBar: 2, bars: 4 },
          { id: 'b', label: 'Extrait 2', bpm: 108, beatsPerBar: 3, bars: 4 },
          { id: 'c', label: 'Extrait 3', bpm: 100, beatsPerBar: 4, bars: 3 },
        ],
      },
    },
    {
      id: id(11),
      number: 8,
      title: 'La signature rythmique',
      instructions:
        "La signature rythmique est une fraction qui indique la quantité de musique dans une mesure. Ses deux chiffres indiquent la quantité et l'unité. Que représente chacun d'eux ?",
      images: [{ src: sig(3, 4), alt: 'Signature rythmique 3/4' }],
      engine: 'mcq',
      data: {
        items: [
          { question: 'Le chiffre du haut (3) indique…', options: ['La quantité', 'L’unité'], correctIndex: 0 },
          { question: 'Le chiffre du bas (4) indique…', options: ['La quantité', 'L’unité'], correctIndex: 1 },
        ],
      },
    },
    {
      id: id(12),
      number: 9,
      title: 'La valse des temps',
      instructions: 'Écoute les extraits suivants et indique le nombre de temps de chacun d’eux.',
      engine: 'listen-meter',
      data: {
        items: [
          { id: 'a', label: 'A)', bpm: 132, beatsPerBar: 3, bars: 4 },
          { id: 'b', label: 'B)', bpm: 104, beatsPerBar: 4, bars: 3 },
          { id: 'c', label: 'C)', bpm: 112, beatsPerBar: 2, bars: 5 },
          { id: 'd', label: 'D)', bpm: 120, beatsPerBar: 3, bars: 4 },
        ],
      },
    },
    {
      id: id(13),
      number: 10,
      title: 'Le temps, c’est des fractions',
      lesson: [
        "Dans une mesure binaire, le chiffre du bas indique l'unité de temps : 1 = la ronde, 2 = la blanche, 4 = la noire, 8 = la croche, 16 = la double croche (voir le diagramme). Le chiffre du haut indique combien de ces unités il y a dans la mesure, c'est-à-dire le nombre de temps.",
        "Attention, temps ≠ temps ! La signature rythmique indique la battue du chef d'orchestre et non la durée des notes : en 4/4 on bat 4 temps, en 2/2 on n'en bat que 2, même si les deux mesures contiennent la même quantité de musique.",
      ],
      images: [{ src: `${IMG}/arbre-des-valeurs.png`, alt: 'Diagramme : une ronde vaut deux blanches, quatre noires, huit croches ou seize doubles croches' }],
      instructions: 'À l’aide du diagramme, indique le nombre de temps des signatures rythmiques ci-dessous.',
      engine: 'mcq',
      data: {
        items: [
          { question: 'A)', image: sig(2, 2), imageAlt: 'Signature 2/2', imageWide: true, options: BEATS, correctIndex: 1 },
          { question: 'B)', image: sig(2, 4), imageAlt: 'Signature 2/4', imageWide: true, options: BEATS, correctIndex: 1 },
          { question: 'C)', image: sig(4, 4), imageAlt: 'Signature 4/4', imageWide: true, options: BEATS, correctIndex: 3 },
          { question: 'D)', image: sig(4, 1), imageAlt: 'Signature 4/1', imageWide: true, options: BEATS, correctIndex: 3 },
          { question: 'E)', image: sig(3, 2), imageAlt: 'Signature 3/2', imageWide: true, options: BEATS, correctIndex: 2 },
        ],
      },
    },
    {
      id: id(14),
      number: 11,
      title: 'Dis, fractions',
      lesson: ["Dans une mesure ternaire (chiffre du bas : 8), chaque temps contient trois croches. Nombre de temps = chiffre du haut : 3."],
      instructions: 'Détermine le nombre de temps des signatures rythmiques ternaires ci-dessous.',
      engine: 'mcq',
      data: {
        items: [
          { question: 'A)', image: sig(3, 8), imageAlt: 'Signature 3/8', imageWide: true, options: BEATS, correctIndex: 0 },
          { question: 'B)', image: sig(12, 8), imageAlt: 'Signature 12/8', imageWide: true, options: BEATS, correctIndex: 3 },
          { question: 'C)', image: sig(6, 8), imageAlt: 'Signature 6/8', imageWide: true, options: BEATS, correctIndex: 1 },
        ],
      },
    },
    {
      id: id(15),
      number: 12,
      title: 'À l’irrégulière…',
      lesson: [
        "Dans une mesure irrégulière, on regroupe les unités en paquets de 2 et de 3. Chaque paquet correspond à un temps : 5/8 = 3 + 2, soit 2 temps.",
      ],
      instructions: 'Détermine le nombre de temps des mesures irrégulières suivantes.',
      engine: 'mcq',
      data: {
        items: [
          { question: 'A)', image: sig(11, 8), imageAlt: 'Signature 11/8', imageWide: true, options: BEATS, correctIndex: 3 },
          { question: 'B)', image: sig(7, 8), imageAlt: 'Signature 7/8', imageWide: true, options: BEATS, correctIndex: 2 },
          { question: 'C)', image: sig(5, 8), imageAlt: 'Signature 5/8', imageWide: true, options: BEATS, correctIndex: 1 },
          { question: 'D)', image: sig(10, 8), imageAlt: 'Signature 10/8', imageWide: true, options: BEATS, correctIndex: 3 },
          { question: 'E)', image: sig(5, 16), imageAlt: 'Signature 5/16', imageWide: true, options: BEATS, correctIndex: 1 },
        ],
      },
    },
    {
      id: id(16),
      number: 13,
      title: 'À l’envers…',
      lesson: [
        "Aide-mémoire — Quantité (chiffre du haut) : mesure binaire = nombre de temps souhaité ; mesure ternaire = nombre de temps × 3 ; mesure irrégulière = addition de paquets de 2 et de 3.",
        "Unité (chiffre du bas) : mesure binaire = 1, 2 ou 4 ; mesure ternaire = 8 ; mesure irrégulière = 8 ou 16.",
      ],
      instructions: 'Indique une signature rythmique binaire pour chacun des cas suivants (écris-la sous la forme 3/4).',
      engine: 'fill-blank',
      data: {
        layout: 'list',
        items: [
          { id: 'a', prompt: 'A) 4 temps (mesure binaire)', accepted: fraction('4/4', '4/2', '4/1') },
          { id: 'b', prompt: 'B) 3 temps (mesure binaire)', accepted: fraction('3/4', '3/2', '3/1') },
          { id: 'c', prompt: 'C) 2 temps (mesure binaire)', accepted: fraction('2/4', '2/2', '2/1') },
          { id: 'd', prompt: 'D) 1 temps (mesure binaire)', accepted: fraction('1/4', '1/2', '1/1') },
        ],
      },
    },
    {
      id: id(17),
      number: 14,
      title: 'Les opposés s’attirent',
      instructions: 'Indique la signature rythmique ternaire de chacun des cas suivants (nombre de temps souhaité × 3, sur 8).',
      engine: 'fill-blank',
      data: {
        layout: 'list',
        items: [
          { id: 'a', prompt: 'A) 4 temps (mesure ternaire)', accepted: fraction('12/8') },
          { id: 'b', prompt: 'B) 3 temps (mesure ternaire)', accepted: fraction('9/8') },
          { id: 'c', prompt: 'C) 2 temps (mesure ternaire)', accepted: fraction('6/8') },
          { id: 'd', prompt: 'D) 1 temps (mesure ternaire)', accepted: fraction('3/8') },
        ],
      },
    },
    {
      id: id(18),
      number: 15,
      title: 'Créer des paquets',
      instructions:
        'Indique une signature rythmique irrégulière pour chacun des cas suivants : attribue un paquet de 3 ou de 2 à chaque temps souhaité, puis additionne le tout (sur 8 ou sur 16).',
      engine: 'fill-blank',
      data: {
        layout: 'list',
        items: [
          { id: 'a', prompt: 'A) 4 temps (mesure irrégulière)', accepted: fraction('9/8', '10/8', '11/8', '9/16', '10/16', '11/16') },
          { id: 'b', prompt: 'B) 3 temps (mesure irrégulière)', accepted: fraction('7/8', '8/8', '7/16', '8/16') },
          { id: 'c', prompt: 'C) 2 temps (mesure irrégulière)', accepted: fraction('5/8', '5/16') },
        ],
      },
    },

    // --- Révision pour le test, sur le modèle de l'exercice n° 19 du dossier ---
    {
      id: id(19),
      number: 16,
      title: 'Révisons…',
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
          {
            title: 'C) Indique les signatures rythmiques des éléments suivants (3 points)',
            instructions: 'Écris-les sous la forme 3/4.',
            engine: 'fill-blank',
            data: {
              layout: 'list',
              items: [
                { id: 'c1', prompt: '1) 3 temps (binaire)', accepted: fraction('3/4', '3/2', '3/1') },
                { id: 'c2', prompt: '2) 4 temps (ternaire)', accepted: fraction('12/8') },
                { id: 'c3', prompt: '3) 2 temps (irrégulière)', accepted: fraction('5/8', '5/16') },
              ],
            },
          },
          {
            title: 'D) Indique le nombre de temps des mesures suivantes (5 points)',
            engine: 'mcq',
            data: {
              items: [
                { question: '1)', image: sig(3, 2), imageAlt: 'Signature 3/2', imageWide: true, options: BEATS, correctIndex: 2 },
                { question: '2)', image: sig(1, 1), imageAlt: 'Signature 1/1', imageWide: true, options: BEATS, correctIndex: 0 },
                { question: '3)', image: sig(3, 4), imageAlt: 'Signature 3/4', imageWide: true, options: BEATS, correctIndex: 2 },
                { question: '4)', image: sig(3, 8), imageAlt: 'Signature 3/8', imageWide: true, options: BEATS, correctIndex: 0 },
                { question: '5)', image: sig(10, 8), imageAlt: 'Signature 10/8', imageWide: true, options: BEATS, correctIndex: 3 },
              ],
            },
          },
        ],
      },
    },
  ],
};

export default theme;

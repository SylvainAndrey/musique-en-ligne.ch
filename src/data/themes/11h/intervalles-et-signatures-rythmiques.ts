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
const BEATS = ['1 temps', '2 temps', '3 temps', '4 temps'];

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
      id: id(4),
      number: 1,
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
      id: id(5),
      number: 2,
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
      id: id(7),
      number: 3,
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
      number: 4,
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
      id: id(11),
      number: 5,
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
      id: id(13),
      number: 6,
      title: 'Le temps, c’est des fractions',
      lesson: [
        "Dans une mesure binaire, le chiffre du bas indique l'unité de temps : 1 = la ronde, 2 = la blanche, 4 = la noire, 8 = la croche, 16 = la double croche (voir le diagramme). Le chiffre du haut indique combien de ces unités il y a dans la mesure, c'est-à-dire le nombre de temps.",
        "Attention, temps ≠ temps ! La signature rythmique indique la battue du chef d'orchestre et non la durée des notes : en 4/4 on bat 4 temps, en 2/2 on n'en bat que 2, même si les deux mesures contiennent la même quantité de musique.",
      ],
      images: [{ src: `${IMG}/arbre-des-valeurs.png`, alt: 'Diagramme : une ronde vaut deux blanches, quatre noires, huit croches ou seize doubles croches' }],
      instructions: 'À l’aide du diagramme, indique le nombre de temps et l’unité de temps (ronde, blanche, noire…) des signatures rythmiques ci-dessous.',
      engine: 'time-signature',
      data: {
        mode: 'read',
        items: [
          { label: 'A)', image: sig(2, 2), imageAlt: 'Signature 2/2', beats: 2, unit: 'Blanche' },
          { label: 'B)', image: sig(2, 4), imageAlt: 'Signature 2/4', beats: 2, unit: 'Noire' },
          { label: 'C)', image: sig(4, 4), imageAlt: 'Signature 4/4', beats: 4, unit: 'Noire' },
          { label: 'D)', image: sig(4, 1), imageAlt: 'Signature 4/1', beats: 4, unit: 'Ronde' },
          { label: 'E)', image: sig(3, 2), imageAlt: 'Signature 3/2', beats: 3, unit: 'Blanche' },
        ],
      },
    },
    {
      id: id(14),
      number: 7,
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
      number: 8,
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
      number: 9,
      title: 'À l’envers…',
      lesson: [
        "Aide-mémoire — Quantité (chiffre du haut) : mesure binaire = nombre de temps souhaité ; mesure ternaire = nombre de temps × 3 ; mesure irrégulière = addition de paquets de 2 et de 3.",
        "Unité (chiffre du bas) : mesure binaire = 1, 2 ou 4 ; mesure ternaire = 8 ; mesure irrégulière = 8 ou 16.",
      ],
      instructions: 'Indique une signature rythmique binaire pour chacun des cas suivants : choisis le chiffre du haut et le chiffre du bas.',
      engine: 'time-signature',
      data: {
        mode: 'write',
        items: [
          { label: 'A) 4 temps (mesure binaire)', accepted: ['4/4', '4/2', '4/1'] },
          { label: 'B) 3 temps (mesure binaire)', accepted: ['3/4', '3/2', '3/1'] },
          { label: 'C) 2 temps (mesure binaire)', accepted: ['2/4', '2/2', '2/1'] },
          { label: 'D) 1 temps (mesure binaire)', accepted: ['1/4', '1/2', '1/1'] },
        ],
      },
    },
    {
      id: id(17),
      number: 10,
      title: 'Les opposés s’attirent',
      instructions: 'Indique la signature rythmique ternaire de chacun des cas suivants (nombre de temps souhaité × 3, sur 8).',
      engine: 'time-signature',
      data: {
        mode: 'write',
        items: [
          { label: 'A) 4 temps (mesure ternaire)', accepted: ['12/8'] },
          { label: 'B) 3 temps (mesure ternaire)', accepted: ['9/8'] },
          { label: 'C) 2 temps (mesure ternaire)', accepted: ['6/8'] },
          { label: 'D) 1 temps (mesure ternaire)', accepted: ['3/8'] },
        ],
      },
    },
    {
      id: id(18),
      number: 11,
      title: 'Créer des paquets',
      instructions:
        'Indique une signature rythmique irrégulière pour chacun des cas suivants : attribue un paquet de 3 ou de 2 à chaque temps souhaité, puis additionne le tout (sur 8 ou sur 16).',
      engine: 'time-signature',
      data: {
        mode: 'write',
        items: [
          { label: 'A) 4 temps (mesure irrégulière)', accepted: ['9/8', '10/8', '11/8', '9/16', '10/16', '11/16'] },
          { label: 'B) 3 temps (mesure irrégulière)', accepted: ['7/8', '8/8', '7/16', '8/16'] },
          { label: 'C) 2 temps (mesure irrégulière)', accepted: ['5/8', '5/16'] },
        ],
      },
    },

    // --- Révision pour le test, sur le modèle de l'exercice n° 19 du dossier ---
    {
      id: id(19),
      number: 12,
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
            engine: 'time-signature',
            data: {
              mode: 'write',
              items: [
                { label: '1) 3 temps (binaire)', accepted: ['3/4', '3/2', '3/1'] },
                { label: '2) 4 temps (ternaire)', accepted: ['12/8'] },
                { label: '3) 2 temps (irrégulière)', accepted: ['5/8', '5/16'] },
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

import type { ThemeContent } from '../../types';

// Sous-thème de « Découverte du langage musical » (11H), d'après la partie « signatures rythmiques » du dossier
// « 11H – Découverte du langage musical – Intervalles et signatures rythmiques » (la partie intervalles est dans Développement auditif › Intervalles).
// Les images de signatures et le tableau des intervalles sont générés par scripts/generate-notation-images.py.
const GRADE = '11h';
const SLUG = 'signatures-rythmiques';
// Identifiants d'origine (« intervalles-et-signatures-rythmiques ») conservés pour garder la progression des élèves.
const id = (n: number) => `${GRADE}-intervalles-et-signatures-rythmiques-${n}`;
const IMG = '/images/11h-intervalles-et-signatures';
const sig = (num: number, den: number) => `${IMG}/signature-${num}-${den}.svg`;

const BEATS = ['1 temps', '2 temps', '3 temps', '4 temps'];

const theme: ThemeContent = {
  grade: GRADE,
  slug: SLUG,
  parent: 'decouverte-du-langage-musical',
  order: 2,
  title: 'Signatures rythmiques',
  description: 'Comprendre et écrire les signatures rythmiques binaires, ternaires et irrégulières.',
  colorVar: '--color-11h',
  icon: '🎼',
  interactive: true,
  intro:
    "La signature rythmique est une fraction placée au début de la portée : elle indique la quantité de musique contenue dans chaque mesure. Le chiffre du haut indique la quantité, celui du bas l'unité. Selon la façon de regrouper les temps, une mesure peut être binaire, ternaire ou irrégulière.",
  heroImage: '/images/themes/11h-signatures-rythmiques.svg',
  sections: [],
  exercises: [
    // --- Les signatures rythmiques ---
    {
      id: id(11),
      number: 1,
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
      number: 2,
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
      number: 3,
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
      number: 4,
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
      number: 5,
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
      number: 6,
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
      number: 7,
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

    // --- Révision pour le test (consignes C et D de l'exercice n° 19 du dossier) ---
    {
      id: id(19),
      number: 8,
      title: 'Révision',
      instructions: 'Révise pour le test : réalise chaque consigne et vérifie tes réponses au fur et à mesure.',
      engine: 'composite',
      data: {
        parts: [
          {
            title: 'A) Indique les signatures rythmiques des éléments suivants (3 points)',
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
            title: 'B) Indique le nombre de temps des mesures suivantes (5 points)',
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

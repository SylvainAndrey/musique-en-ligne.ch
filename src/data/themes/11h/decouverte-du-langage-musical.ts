import type { ThemeContent } from '../../types';
import { mediaSections } from '../../media-manifest.generated';

const GRADE = '11h';
const SLUG = 'decouverte-du-langage-musical';
const id = (n: number) => `${GRADE}-${SLUG}-${n}`;

const theme: ThemeContent = {
  grade: GRADE,
  slug: SLUG,
  title: 'Découverte du langage musical',
  description: 'Rythmes complexes, mesures irrégulières et lecture de partition pour approfondir le langage musical.',
  colorVar: '--color-11h',
  icon: '🎼',
  interactive: true,
  intro:
    "La notation musicale actuelle est l'aboutissement d'une longue évolution : des neumes du Moyen-Âge, simples indications d'inflexion mélodique, jusqu'au système de portée et de fractions rythmiques hérité de la Renaissance. Aujourd'hui, cette écriture s'est encore affranchie de ces conventions : chaque compositeur peut inventer sa propre notation graphique du moment qu'elle reste compréhensible. Ce thème approfondit les rythmes, les silences et les signatures rythmiques, y compris les mesures irrégulières et la musique ternaire.",
  heroImage: '/images/themes/11h-decouverte-du-langage-musical.svg',
  sections: mediaSections['11h/decouverte-du-langage-musical'] ?? [],
  exercises: [
    // --- Niveau "Mémoriser" ---
    {
      id: id(1),
      number: 1,
      title: 'Rythmes et silences',
      instructions: 'Associe chaque symbole à son nom.',
      engine: 'matching',
      data: {
        largeLeft: true,
        pairs: [
          { left: '𝅝', right: 'Ronde (4 temps)' },
          { left: '𝅗𝅥', right: 'Blanche (2 temps)' },
          { left: '♩', right: 'Noire (1 temps)' },
          { left: '♪', right: 'Croche (0,5 temps)' },
          { left: '𝄼', right: 'Demi-pause (silence de 2 temps)' },
          { left: '𝄽', right: 'Soupir (silence d’1 temps)' },
          { left: '𝄾', right: 'Demi-soupir (silence de 0,5 temps)' },
        ],
      },
    },
    {
      id: id(2),
      number: 2,
      title: 'Valeurs des notes',
      instructions: 'Trouve la valeur (en nombre de temps) de chaque figure rythmique.',
      engine: 'fill-blank',
      data: {
        layout: 'list',
        large: true,
        items: [
          { id: 'a', glyph: '𝅝', prompt: 'Une ronde vaut combien de temps ?', accepted: ['4'] },
          { id: 'b', glyph: '𝅗𝅥', prompt: 'Une blanche vaut combien de temps ?', accepted: ['2'] },
          { id: 'c', glyph: '♩', prompt: 'Une noire vaut combien de temps ?', accepted: ['1'] },
          { id: 'd', glyph: '♪', prompt: 'Une croche vaut combien de temps ?', accepted: ['0.5', '0,5', '1/2'] },
        ],
      },
    },
    {
      id: id(3),
      number: 3,
      title: 'La signature rythmique',
      instructions: 'Complète ces phrases sur la signature rythmique (par exemple 3/4) et les types de mesures.',
      engine: 'fill-blank',
      data: {
        layout: 'list',
        items: [
          { id: 'a', prompt: 'Dans une signature rythmique, le chiffre du haut indique la ___ (nombre de temps par mesure)', accepted: ['quantité', 'quantite'] },
          { id: 'b', prompt: "Dans une signature rythmique, le chiffre du bas indique l'___ (la valeur d'un temps)", accepted: ['unité', 'unite'] },
          { id: 'c', prompt: 'Une mesure où chaque temps se divise naturellement en 2 (ex. 4/4) est dite...', accepted: ['binaire'] },
          { id: 'd', prompt: 'Une mesure où chaque temps se divise naturellement en 3 (ex. 6/8, 9/8) est dite...', accepted: ['ternaire'] },
          { id: 'e', prompt: "Une mesure qui ne suit pas une division symétrique classique (ex. 5/8, 7/8) est dite...", accepted: ['irrégulière', 'irreguliere'] },
        ],
      },
    },

    // --- Niveau "Comprendre" ---
    {
      id: id(4),
      number: 4,
      title: 'Rythmes pointés',
      instructions: "Complète ces phrases sur le point d'augmentation et les rythmes pointés.",
      engine: 'fill-blank',
      data: {
        layout: 'list',
        items: [
          { id: 'a', prompt: "Un point placé après une note ajoute à sa valeur ___ de cette même valeur", accepted: ['la moitié', 'sa moitié'] },
          { id: 'b', prompt: 'Une noire pointée (♩.) vaut 1 + 0,5 = ___ temps', accepted: ['1.5', '1,5'] },
          { id: 'c', prompt: 'Une blanche pointée (𝅗𝅥.) vaut 2 + 1 = ___ temps', accepted: ['3'] },
          { id: 'd', prompt: 'Une croche pointée (♪.) vaut 0,5 + 0,25 = ___ temps', accepted: ['0.75', '0,75'] },
          { id: 'e', prompt: "Une noire pointée suivie d'une croche (♩. ♪) remplit en tout combien de temps ?", accepted: ['2'] },
        ],
      },
    },
    {
      id: id(5),
      number: 5,
      title: "Le temps, c'est des fractions",
      instructions: "À l'aide du diagramme des durées, indique le nombre de temps de chaque signature rythmique, y compris les signatures irrégulières.",
      engine: 'mcq',
      data: {
        items: [
          { question: 'Dans une mesure à 4/4 (binaire), combien de temps compte-t-on ?', options: ['3', '4', '6'], correctIndex: 1 },
          { question: 'Dans une mesure à 3/8 (ternaire), combien de croches compte-t-on ?', options: ['3', '4', '8'], correctIndex: 0 },
          { question: 'Dans une mesure à 6/8 (ternaire), combien de croches compte-t-on ?', options: ['4', '6', '8'], correctIndex: 1 },
          { question: 'Dans une mesure à 2/2 (binaire), combien de blanches compte-t-on ?', options: ['1', '2', '4'], correctIndex: 1 },
          { question: 'Dans une mesure à 5/8 (irrégulière), combien de croches compte-t-on ?', options: ['4', '5', '7'], correctIndex: 1 },
          { question: 'Dans une mesure à 7/8 (irrégulière), combien de croches compte-t-on ?', options: ['6', '7', '9'], correctIndex: 1 },
          { question: 'Dans une mesure à 10/8 (irrégulière), combien de croches compte-t-on ?', options: ['8', '10', '12'], correctIndex: 1 },
          { question: 'Dans une mesure à 11/8 (irrégulière), combien de croches compte-t-on ?', options: ['9', '11', '13'], correctIndex: 1 },
        ],
      },
    },
    // --- Niveau "Appliquer" ---
    {
      id: id(6),
      number: 6,
      title: 'Trouve la signature',
      instructions: "Pour chaque mesure décrite (ternaire ou irrégulière), indique sa signature rythmique (ex. 6/8).",
      engine: 'fill-blank',
      data: {
        layout: 'list',
        items: [
          { id: 'a', prompt: 'Mesure ternaire de 6 croches, groupées en 2 temps de 3 croches chacun → signature :', accepted: ['6/8'] },
          { id: 'b', prompt: 'Mesure ternaire de 9 croches, groupées en 3 temps de 3 croches chacun → signature :', accepted: ['9/8'] },
          { id: 'c', prompt: 'Mesure ternaire de 12 croches, groupées en 4 temps de 3 croches chacun → signature :', accepted: ['12/8'] },
          { id: 'd', prompt: 'Mesure irrégulière de 5 croches, groupées par exemple en 2+3 → signature :', accepted: ['5/8'] },
          { id: 'e', prompt: 'Mesure irrégulière de 7 croches, groupées par exemple en 2+2+3 → signature :', accepted: ['7/8'] },
        ],
      },
    },
    {
      id: id(7),
      number: 7,
      title: "À l'envers",
      instructions: 'Indique une signature rythmique possible pour chacun des cas suivants.',
      engine: 'fill-blank',
      data: {
        layout: 'list',
        items: [
          { id: 'a', prompt: '4 temps, mesure binaire → signature :', accepted: ['4/4'] },
          { id: 'b', prompt: '2 temps, mesure binaire → signature :', accepted: ['2/4'] },
          { id: 'c', prompt: '3 temps, mesure ternaire → signature :', accepted: ['9/8'] },
          { id: 'd', prompt: '3 temps, mesure binaire → signature :', accepted: ['3/4'] },
          { id: 'e', prompt: '2 temps, mesure irrégulière → signature :', accepted: ['5/8'] },
          { id: 'f', prompt: '5 temps, mesure binaire → signature :', accepted: ['5/4'] },
        ],
      },
    },
    {
      id: id(8),
      number: 8,
      title: 'Le compte est ternaire',
      instructions:
        "En musique ternaire (6/8, 9/8, 12/8...), un temps se divise en trois croches. Utilise les rythmes ci-dessous pour composer deux mesures de 6/8 à deux temps chacune.",
      engine: 'rhythm-fill',
      data: {
        paletteType: 'ternary-cells',
        requireDistinct: true,
        dragBar: true,
        rows: [
          { id: 'm1', label: 'Mesure 1', target: 6 },
          { id: 'm2', label: 'Mesure 2', target: 6 },
        ],
      },
    },
    {
      id: id(9),
      number: 9,
      title: 'Tous les rythmes ternaires',
      instructions:
        'Cette fois, utilise chacun des 6 rythmes ternaires pour construire 4 mesures de 9/8 à trois temps chacune.',
      engine: 'rhythm-fill',
      data: {
        paletteType: 'ternary-cells',
        requireDistinct: true,
        dragBar: true,
        rows: [
          { id: 'm1', label: 'Mesure 1', target: 9 },
          { id: 'm2', label: 'Mesure 2', target: 9 },
          { id: 'm3', label: 'Mesure 3', target: 9 },
          { id: 'm4', label: 'Mesure 4', target: 9 },
        ],
      },
    },

    // --- Niveau "Analyser" ---
    {
      id: id(10),
      number: 10,
      title: 'Binaire et ternaire',
      instructions:
        "Certaines mesures sont binaires (comme 4/4), d'autres ternaires (comme 6/8) : un temps binaire se divise en deux croches, un temps ternaire en trois. Crée 4 mesures de 4/4 (temps binaires) sur la première ligne et 4 mesures de 9/8 (temps ternaires) sur la deuxième ligne grâce aux rythmes ci-dessous.",
      engine: 'rhythm-fill',
      data: {
        dragBar: true,
        groups: [
          {
            label: 'Mesures binaires (4/4)',
            paletteType: 'note-values',
            rows: [
              { id: 'b1', label: 'Mesure 1', target: 4 },
              { id: 'b2', label: 'Mesure 2', target: 4 },
              { id: 'b3', label: 'Mesure 3', target: 4 },
              { id: 'b4', label: 'Mesure 4', target: 4 },
            ],
          },
          {
            label: 'Mesures ternaires (9/8)',
            paletteType: 'ternary-cells',
            rows: [
              { id: 't1', label: 'Mesure 1', target: 9 },
              { id: 't2', label: 'Mesure 2', target: 9 },
              { id: 't3', label: 'Mesure 3', target: 9 },
              { id: 't4', label: 'Mesure 4', target: 9 },
            ],
          },
        ],
      },
    },

    // --- Niveau "Créer" ---
    {
      id: id(11),
      number: 11,
      title: 'Cap ou pas cap',
      instructions:
        'Crée différents rythmes de 4 temps de bodypercussion (pieds, cuisses, torse, mains, doigts), note-les, puis joue-les.',
      engine: 'rhythm-fill',
      data: {
        paletteType: 'body-percussion',
        minRows: 4,
        rows: [{ id: 'r1', label: 'Rythme 1', freeform: true }],
      },
    },

    // --- Révision finale ---
    {
      id: id(12),
      number: 12,
      title: 'Évaluation récapitulative',
      instructions: 'Réponds à ces 12 questions pour vérifier ce que tu as retenu sur les rythmes, les silences et les signatures rythmiques.',
      engine: 'mcq',
      data: {
        items: [
          { question: 'Combien de temps vaut une ronde (𝅝) ?', options: ['2', '4', '8'], correctIndex: 1 },
          { question: 'Combien de temps vaut une noire (♩) ?', options: ['0,5', '1', '2'], correctIndex: 1 },
          { question: 'Comment s’appelle le silence équivalent à une noire ?', options: ['Soupir', 'Pause', 'Demi-soupir'], correctIndex: 0 },
          { question: 'Dans une signature rythmique, le chiffre du haut indique...', options: ['La quantité (nombre de temps)', "L'unité (valeur d'un temps)", 'Le tempo'], correctIndex: 0 },
          { question: 'Dans une mesure à 7/8 (irrégulière), combien de croches compte-t-on ?', options: ['6', '7', '9'], correctIndex: 1 },
          { question: 'Dans une mesure à 9/8 (ternaire régulière), combien de croches compte-t-on ?', options: ['6', '9', '12'], correctIndex: 1 },
          { question: 'Une noire pointée (♩.) vaut combien de temps ?', options: ['1', '1,5', '2'], correctIndex: 1 },
          { question: 'Un point placé après une note ajoute à sa valeur...', options: ['Le double de sa valeur', 'La moitié de sa valeur', 'Un quart de sa valeur'], correctIndex: 1 },
          { question: 'Une mesure de 6 croches groupées en 2 temps de 3 croches (mesure ternaire) correspond à la signature...', options: ['3/4', '6/8', '2/4'], correctIndex: 1 },
          { question: 'Une mesure irrégulière de 5 croches (par exemple 2+3) correspond à la signature...', options: ['4/8', '5/8', '6/8'], correctIndex: 1 },
          { question: 'Le signe qui indique de prolonger une note ou un silence à volonté s’appelle un point d’...', options: ['Orgue', 'Reprise', 'Armure'], correctIndex: 0 },
          { question: 'La clé utilisée pour les instruments graves (violoncelle, tuba) s’appelle la clé de...', options: ['Sol', 'Fa', 'Ut'], correctIndex: 1 },
        ],
      },
    },
  ],
};

export default theme;

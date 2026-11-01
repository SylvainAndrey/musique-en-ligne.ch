import type { ThemeContent } from '../../types';

const GRADE = '10h';
const SLUG = 'decouverte-du-langage-musical';
const id = (n: number) => `${GRADE}-${SLUG}-${n}`;

const theme: ThemeContent = {
  grade: GRADE,
  slug: SLUG,
  title: 'Découverte du langage musical',
  description: 'Rythmes, silences et signatures rythmiques pour consolider les bases du langage musical.',
  colorVar: '--color-10h',
  icon: '🎼',
  interactive: true,
  intro:
    "Bien avant l'invention de l'imprimerie musicale, les mélodies se transmettaient oralement, ce qui provoquait de nombreuses erreurs. Dès le IXe siècle apparaissent les neumes, de premiers signes rudimentaires notés au-dessus du texte, puis un système de lignes qui deviendra la portée actuelle. À la Renaissance, les rythmes se mettent à suivre une logique mathématique de fractions, d'où leur nom dans certaines langues, tandis qu'en français on les nomme plutôt selon leur aspect visuel. Ce thème revient sur les bases de cette écriture — rythmes, silences et signatures rythmiques — avec des mesures plus complexes qu'en 9ème Harmos.",
  heroImage: '/images/themes/10h-decouverte-du-langage-musical.svg',
  sections: [],
  exercises: [
    // --- Niveau "Mémoriser" ---
    {
      id: id(1),
      number: 1,
      title: "L'alphabet des rythmes",
      instructions: 'Donne le nom des rythmes et silences suivants.',
      engine: 'fill-blank',
      data: {
        layout: 'grid',
        large: true,
        items: [
          { id: 'r2', glyph: '𝅗𝅥', prompt: 'la moitié de la ronde', accepted: ['blanche'] },
          { id: 'r3', glyph: '♩', prompt: 'la moitié de la blanche', accepted: ['noire'] },
          { id: 'r4', glyph: '♪', prompt: 'la moitié de la noire', accepted: ['croche'] },
          { id: 'r5', glyph: '♬', prompt: 'la moitié de la croche', accepted: ['double croche', 'double-croche', 'doubles croches'] },
          { id: 's1', glyph: '𝄻', prompt: 'silence équivalent à la ronde', accepted: ['pause'] },
          { id: 's2', glyph: '𝄼', prompt: 'silence équivalent à la blanche', accepted: ['demi-pause', 'demi pause'] },
          { id: 's3', glyph: '𝄽', prompt: 'silence équivalent à la noire', accepted: ['soupir'] },
          { id: 's4', glyph: '𝄾', prompt: 'silence équivalent à la croche', accepted: ['demi-soupir', 'demi soupir'] },
        ],
      },
    },
    {
      id: id(2),
      number: 2,
      title: 'Devine ma valeur',
      instructions: 'Trouve la valeur de chaque rythme selon les indices donnés.',
      engine: 'fill-blank',
      data: {
        layout: 'riddle',
        large: true,
        items: [
          { id: 'a', prompt: '♩', hint: 'Ma valeur sert de référence et donne le plus souvent le tempo.', accepted: ['noire'] },
          { id: 'b', prompt: '𝅝', hint: 'Je suis le rythme le plus long de tous, multiple de 2.', accepted: ['ronde'] },
          { id: 'c', prompt: '𝅗𝅥', hint: 'Je vaux deux fois plus et deux fois moins que les notes voisines.', accepted: ['blanche'] },
          { id: 'd', prompt: '♪', hint: 'Il en faut deux comme moi pour faire un temps.', accepted: ['croche'] },
          { id: 'e', prompt: '♬', hint: "Je suis si rapide qu'on me groupe par 4.", accepted: ['double croche', 'double-croche', 'doubles croches'] },
        ],
      },
    },
    {
      id: id(3),
      number: 3,
      title: 'Silence, on tourne',
      instructions: 'Trouve le nombre de temps de chaque silence selon les indices donnés.',
      engine: 'fill-blank',
      data: {
        layout: 'grid',
        items: [
          { id: 'a-temps', glyph: '𝄽', prompt: 'A) indice : ma valeur correspond à une noire → nombre de temps', accepted: ['1', '1 temps', 'un'] },
          { id: 'b-temps', glyph: '𝄻', prompt: 'B) indice : le silence le plus long → nombre de temps', accepted: ['4', '4 temps', 'quatre'] },
          { id: 'c-temps', glyph: '𝄼', prompt: 'C) indice : je vaux deux fois plus et deux fois moins que les précédentes → nombre de temps', accepted: ['2', '2 temps', 'deux'] },
          { id: 'd-temps', glyph: '𝄾', prompt: 'D) indice : il en faut deux pour faire un temps → nombre de temps', accepted: ['0.5', '0,5', 'un demi', '½'] },
        ],
      },
    },

    // --- Niveau "Comprendre" ---
    {
      id: id(4),
      number: 4,
      title: 'En haut, en bas',
      instructions: 'Complète les deux phrases sur la signature rythmique (ex. 3/4).',
      engine: 'fill-blank',
      data: {
        layout: 'list',
        items: [
          { id: 'haut', prompt: 'Dans la signature 3/4, le chiffre du haut (3) indique la ___', accepted: ['quantité', 'quantite'] },
          { id: 'bas', prompt: 'Le chiffre du bas (4) indique l’___', accepted: ['unité', 'unite'] },
        ],
      },
    },
    {
      id: id(5),
      number: 5,
      title: 'Le temps, c’est des fractions',
      instructions: "À l'aide du diagramme des durées ci-dessous, indique le nombre de temps de chaque signature rythmique.",
      engine: 'fill-blank',
      data: {
        layout: 'list',
        image: '/images/diagrams/diagramme-durees.png',
        imageAlt: 'Diagramme des durées : une ronde (1) vaut 2 blanches, 4 noires, 8 croches ou 16 doubles croches',
        items: [
          { id: 'a', prompt: 'Signature 4/4 → nombre de temps :', accepted: ['4', '4 temps', 'quatre', 'quatre temps'] },
          { id: 'b', prompt: 'Signature 3/4 → nombre de temps :', accepted: ['3', '3 temps', 'trois', 'trois temps'] },
          { id: 'c', prompt: 'Signature 2/2 → nombre de temps :', accepted: ['2', '2 temps', 'deux', 'deux temps'] },
        ],
      },
    },

    // --- Niveau "Appliquer" ---
    {
      id: id(6),
      number: 6,
      title: 'Cinq sur cinq',
      instructions: "Crée une mesure irrégulière d'exactement 5 temps grâce aux rythmes ci-dessous (les doubles croches sont les bienvenues).",
      engine: 'rhythm-fill',
      data: {
        paletteType: 'note-values',
        extraKeys: ['double-croche-seule'],
        rows: [{ id: 'm1', label: 'Mesure à compléter (5 temps)', target: 5 }],
      },
    },
    {
      id: id(7),
      number: 7,
      title: 'Cinq temps, zéro doublon',
      instructions:
        "Glisse les rythmes ci-dessous dans la barre pour créer en tout 4 mesures irrégulières d'exactement 5 temps chacune (les doubles croches sont les bienvenues). Chaque mesure doit être différente.",
      engine: 'rhythm-fill',
      data: {
        paletteType: 'note-values',
        extraKeys: ['double-croche-seule'],
        requireDistinct: true,
        dragBar: true,
        rows: [
          { id: 'm1', label: 'Mesure 1', target: 5 },
          { id: 'm2', label: 'Mesure 2', target: 5 },
          { id: 'm3', label: 'Mesure 3', target: 5 },
          { id: 'm4', label: 'Mesure 4', target: 5 },
        ],
      },
    },
    {
      id: id(8),
      number: 8,
      title: 'Silence irrégulier',
      instructions: 'Crée une mesure de 7 temps en utilisant uniquement des silences.',
      engine: 'rhythm-fill',
      data: {
        paletteType: 'note-values',
        extraKeys: ['double-croche-seule'],
        rows: [{ id: 'l1', label: 'Mesure à compléter (7 temps)', target: 7 }],
      },
    },
    {
      id: id(9),
      number: 9,
      title: 'Sept temps, zéro doublon',
      instructions:
        "Crée en tout 4 mesures d'exactement 7 temps chacune grâce aux rythmes ci-dessous. Chaque mesure doit être différente et le plus grand nombre de rythmes doit être utilisé.",
      engine: 'rhythm-fill',
      data: {
        paletteType: 'note-values',
        requireDistinct: true,
        dragBar: true,
        rows: [
          { id: 'm1', label: 'Mesure 1', target: 7 },
          { id: 'm2', label: 'Mesure 2', target: 7 },
          { id: 'm3', label: 'Mesure 3', target: 7 },
          { id: 'm4', label: 'Mesure 4', target: 7 },
        ],
      },
    },

    // --- Niveau "Analyser" ---
    {
      id: id(10),
      number: 10,
      title: 'Sur la corde raide',
      instructions: 'Dans chacun des rythmes ci-dessous, clique sur les notes qui tombent exactement sur un temps.',
      engine: 'click-target',
      data: {
        rows: [
          { id: 'r1', label: 'Rythme 1 (4 temps)', icons: [
            { id: 'r1-1', glyph: '♩', isBeatStart: true },
            { id: 'r1-2', glyph: '♬', isBeatStart: true },
            { id: 'r1-3', glyph: '♬', isBeatStart: false },
            { id: 'r1-4', glyph: '♩', isBeatStart: true },
            { id: 'r1-5', glyph: '♩', isBeatStart: true },
          ] },
          { id: 'r2', label: 'Rythme 2 (4 temps)', icons: [
            { id: 'r2-1', glyph: '♬', isBeatStart: true },
            { id: 'r2-2', glyph: '♬', isBeatStart: false },
            { id: 'r2-3', glyph: '♩', isBeatStart: true },
            { id: 'r2-4', glyph: '♬', isBeatStart: true },
            { id: 'r2-5', glyph: '♬', isBeatStart: false },
            { id: 'r2-6', glyph: '♩', isBeatStart: true },
          ] },
          { id: 'r3', label: 'Rythme 3 (5 temps)', icons: [
            { id: 'r3-1', glyph: '♩', isBeatStart: true },
            { id: 'r3-2', glyph: '♩', isBeatStart: true },
            { id: 'r3-3', glyph: '♩', isBeatStart: true },
            { id: 'r3-4', glyph: '♩', isBeatStart: true },
            { id: 'r3-5', glyph: '♩', isBeatStart: true },
          ] },
          { id: 'r4', label: 'Rythme 4 (5 temps)', icons: [
            { id: 'r4-1', glyph: '♬', isBeatStart: true },
            { id: 'r4-2', glyph: '♬', isBeatStart: false },
            { id: 'r4-3', glyph: '♩', isBeatStart: true },
            { id: 'r4-4', glyph: '♩', isBeatStart: true },
            { id: 'r4-5', glyph: '♩', isBeatStart: true },
            { id: 'r4-6', glyph: '♩', isBeatStart: true },
          ] },
          { id: 'r5', label: 'Rythme 5 (7 temps)', icons: [
            { id: 'r5-1', glyph: '𝅗𝅥', isBeatStart: true },
            { id: 'r5-2', glyph: '♬', isBeatStart: true },
            { id: 'r5-3', glyph: '♬', isBeatStart: false },
            { id: 'r5-4', glyph: '♩', isBeatStart: true },
            { id: 'r5-5', glyph: '♩', isBeatStart: true },
            { id: 'r5-6', glyph: '♩', isBeatStart: true },
            { id: 'r5-7', glyph: '♩', isBeatStart: true },
          ] },
          { id: 'r6', label: 'Rythme 6 (4 temps)', icons: [
            { id: 'r6-1', glyph: '♪', isBeatStart: true },
            { id: 'r6-2', glyph: '♪', isBeatStart: false },
            { id: 'r6-3', glyph: '♬', isBeatStart: true },
            { id: 'r6-4', glyph: '♬', isBeatStart: false },
            { id: 'r6-5', glyph: '♩', isBeatStart: true },
            { id: 'r6-6', glyph: '♩', isBeatStart: true },
          ] },
          { id: 'r7', label: 'Rythme 7 (4 temps)', icons: [
            { id: 'r7-1', glyph: '♬', isBeatStart: true },
            { id: 'r7-2', glyph: '♩', isBeatStart: false },
            { id: 'r7-3', glyph: '♬', isBeatStart: false },
            { id: 'r7-4', glyph: '♩', isBeatStart: true },
            { id: 'r7-5', glyph: '♩', isBeatStart: true },
          ] },
          { id: 'r8', label: 'Rythme 8 (5 temps)', icons: [
            { id: 'r8-1', glyph: '♩', isBeatStart: true },
            { id: 'r8-2', glyph: '♬', isBeatStart: true },
            { id: 'r8-3', glyph: '♬', isBeatStart: false },
            { id: 'r8-4', glyph: '♩', isBeatStart: true },
            { id: 'r8-5', glyph: '♩', isBeatStart: true },
            { id: 'r8-6', glyph: '♩', isBeatStart: true },
          ] },
          { id: 'r9', label: 'Rythme 9 (4 temps)', icons: [
            { id: 'r9-1', glyph: '𝅗𝅥', isBeatStart: true },
            { id: 'r9-2', glyph: '♬', isBeatStart: true },
            { id: 'r9-3', glyph: '♬', isBeatStart: false },
            { id: 'r9-4', glyph: '♩', isBeatStart: true },
          ] },
          { id: 'r10', label: 'Rythme 10 (7 temps)', icons: [
            { id: 'r10-1', glyph: '♩', isBeatStart: true },
            { id: 'r10-2', glyph: '♩', isBeatStart: true },
            { id: 'r10-3', glyph: '♬', isBeatStart: true },
            { id: 'r10-4', glyph: '♬', isBeatStart: false },
            { id: 'r10-5', glyph: '♩', isBeatStart: true },
            { id: 'r10-6', glyph: '♩', isBeatStart: true },
            { id: 'r10-7', glyph: '♩', isBeatStart: true },
            { id: 'r10-8', glyph: '♩', isBeatStart: true },
          ] },
          { id: 'r11', label: 'Rythme 11 (4 temps)', icons: [
            { id: 'r11-1', glyph: '♪', isBeatStart: true },
            { id: 'r11-2', glyph: '♬', isBeatStart: false },
            { id: 'r11-3', glyph: '♪', isBeatStart: true },
            { id: 'r11-4', glyph: '♬', isBeatStart: false },
            { id: 'r11-5', glyph: '♩', isBeatStart: true },
            { id: 'r11-6', glyph: '♩', isBeatStart: true },
          ] },
          { id: 'r12', label: 'Rythme 12 (4 temps)', icons: [
            { id: 'r12-1', glyph: '♬', isBeatStart: true },
            { id: 'r12-2', glyph: '♪', isBeatStart: false },
            { id: 'r12-3', glyph: '♬', isBeatStart: true },
            { id: 'r12-4', glyph: '♪', isBeatStart: false },
            { id: 'r12-5', glyph: '♩', isBeatStart: true },
            { id: 'r12-6', glyph: '♩', isBeatStart: true },
          ] },
          { id: 'r13', label: 'Rythme 13 (4 temps)', icons: [
            { id: 'r13-1', glyph: '♪', isBeatStart: true },
            { id: 'r13-2', glyph: '♬', isBeatStart: false },
            { id: 'r13-3', glyph: '♬', isBeatStart: true },
            { id: 'r13-4', glyph: '♪', isBeatStart: false },
            { id: 'r13-5', glyph: '♩', isBeatStart: true },
            { id: 'r13-6', glyph: '♩', isBeatStart: true },
          ] },
          { id: 'r14', label: 'Rythme 14 (5 temps)', icons: [
            { id: 'r14-1', glyph: '♪', isBeatStart: true },
            { id: 'r14-2', glyph: '♬', isBeatStart: false },
            { id: 'r14-3', glyph: '♬', isBeatStart: true },
            { id: 'r14-4', glyph: '♪', isBeatStart: false },
            { id: 'r14-5', glyph: '♩', isBeatStart: true },
            { id: 'r14-6', glyph: '♩', isBeatStart: true },
            { id: 'r14-7', glyph: '♩', isBeatStart: true },
          ] },
        ],
      },
    },

    // --- Niveau "Créer" ---
    {
      id: id(11),
      number: 11,
      title: 'Cap ou pas cap',
      instructions: "Par deux, invente un rythme de bodypercussion, note-le, puis fais-le rejouer à ton camarade. Recommence avec au moins 4 rythmes différents.",
      engine: 'rhythm-fill',
      data: {
        paletteType: 'body-percussion',
        minRows: 4,
        rows: [{ id: 'r1', label: 'Rythme 1', freeform: true }],
      },
    },

    // --- Révision finale : une seule évaluation en plusieurs consignes, modélisée sur le vrai test de synthèse 10H ---
    {
      id: id(12),
      number: 12,
      title: 'Le contrôle surprise',
      instructions: 'Complète cette évaluation récapitulative en plusieurs consignes, sur le vocabulaire des rythmes, des silences et de la signature rythmique.',
      engine: 'composite',
      data: {
        parts: [
          {
            title: 'Vocabulaire des rythmes et des silences',
            instructions: 'Donne le nom de chaque rythme ou silence.',
            engine: 'fill-blank',
            data: {
              layout: 'grid',
              items: [
                { id: 'noire', prompt: '♩', accepted: ['noire'] },
                { id: 'blanche', prompt: '𝅗𝅥', accepted: ['blanche'] },
                { id: 'croches', prompt: '♫', accepted: ['croches', 'deux croches', 'croches liées'] },
                { id: 'doubles', prompt: '♬', accepted: ['doubles croches', 'double croche', 'doubles croches liées'] },
                { id: 'ronde', prompt: '𝅝', accepted: ['ronde'] },
                { id: 'demi-pause', prompt: '𝄼', accepted: ['demi-pause', 'demi pause'] },
                { id: 'soupir', prompt: '𝄽', accepted: ['soupir'] },
                { id: 'demi-soupir', prompt: '𝄾', accepted: ['demi-soupir', 'demi soupir'] },
                { id: 'pause', prompt: '𝄻', accepted: ['pause'] },
                { id: 'quart-soupir', prompt: '𝄿', accepted: ['quart de soupir', 'quart-de-soupir'] },
              ],
            },
          },
          {
            title: 'Consigne 1 — Silences : nom et temps',
            instructions: 'Pour chaque silence, indique son nom et le nombre de temps correspondant.',
            engine: 'fill-blank',
            data: {
              layout: 'grid',
              items: [
                { id: 'a-nom', glyph: '𝄾', prompt: 'A) nom du silence', accepted: ['demi-soupir', 'demi soupir'] },
                { id: 'a-temps', glyph: '𝄾', prompt: 'A) nombre de temps', accepted: ['0.5', '0,5', 'un demi', '½'] },
                { id: 'b-nom', glyph: '𝄽', prompt: 'B) nom du silence', accepted: ['soupir'] },
                { id: 'b-temps', glyph: '𝄽', prompt: 'B) nombre de temps', accepted: ['1', '1 temps', 'un'] },
                { id: 'c-nom', glyph: '𝄼', prompt: 'C) nom du silence', accepted: ['demi-pause', 'demi pause'] },
                { id: 'c-temps', glyph: '𝄼', prompt: 'C) nombre de temps', accepted: ['2', '2 temps', 'deux'] },
              ],
            },
          },
          {
            title: 'Consigne 2 — Relie le rythme au silence équivalent',
            instructions: 'Relie chaque rythme au silence qui possède la même durée.',
            engine: 'matching',
            data: {
              pairs: [
                { left: '♪', right: 'Demi-soupir (silence équivalent à la croche)' },
                { left: '♩', right: 'Soupir (silence équivalent à la noire)' },
                { left: '𝅗𝅥', right: 'Demi-pause (silence équivalent à la blanche)' },
                { left: '𝅝', right: 'Pause (silence équivalent à la ronde)' },
              ],
            },
          },
          {
            title: 'Consigne 3 — Pile sur le temps',
            instructions: 'Comme dans le vrai test, clique sur chaque note ou silence qui tombe exactement sur un temps dans cette ligne rythmique de 4 mesures.',
            engine: 'click-target',
            data: {
              rows: [
                { id: 'test', label: 'Ligne rythmique (4 mesures de 4 temps)', icons: [
                  { id: 't1', glyph: '♩', isBeatStart: true },
                  { id: 't2', glyph: '♪', isBeatStart: true },
                  { id: 't3', glyph: '♪', isBeatStart: false },
                  { id: 't4', glyph: '♪', isBeatStart: true },
                  { id: 't5', glyph: '♪', isBeatStart: false },
                  { id: 't6', glyph: '♩', isBeatStart: true },
                  { id: 't7', glyph: '♩', isBeatStart: true },
                  { id: 't8', glyph: '𝄾', isBeatStart: true },
                  { id: 't9', glyph: '♪', isBeatStart: false },
                  { id: 't10', glyph: '♩.', isBeatStart: true },
                  { id: 't11', glyph: '♪', isBeatStart: false },
                  { id: 't12', glyph: '♩', isBeatStart: true },
                  { id: 't13', glyph: '♪', isBeatStart: true },
                  { id: 't14', glyph: '♪', isBeatStart: false },
                  { id: 't15', glyph: '𝄾', isBeatStart: true },
                  { id: 't16', glyph: '♪', isBeatStart: false },
                  { id: 't17', glyph: '𝄾', isBeatStart: true },
                  { id: 't18', glyph: '♪', isBeatStart: false },
                  { id: 't19', glyph: '♩.', isBeatStart: true },
                  { id: 't20', glyph: '♪', isBeatStart: false },
                  { id: 't21', glyph: '♩', isBeatStart: true },
                  { id: 't22', glyph: '𝄽', isBeatStart: true },
                ] },
              ],
            },
          },
          {
            title: 'Consigne 4 — La signature rythmique',
            instructions: 'Complète les phrases sur la signature rythmique, puis construis la signature correspondant à chaque description.',
            engine: 'fill-blank',
            data: {
              layout: 'list',
              items: [
                { id: 'haut', prompt: 'Dans une signature rythmique, le chiffre du haut indique la ___', accepted: ['quantité', 'quantite'] },
                { id: 'bas', prompt: 'Le chiffre du bas indique l’___', accepted: ['unité', 'unite'] },
                { id: 'sig-a', prompt: '4 temps, chaque temps vaut une noire → signature :', accepted: ['4/4'] },
                { id: 'sig-b', prompt: '3 temps, chaque temps vaut une noire → signature :', accepted: ['3/4'] },
                { id: 'sig-c', prompt: '2 temps, chaque temps vaut une noire → signature :', accepted: ['2/4'] },
                { id: 'sig-d', prompt: '7 temps, chaque temps vaut une noire (mesure irrégulière) → signature :', accepted: ['7/4'] },
              ],
            },
          },
          {
            title: 'Consigne 5 — Compose librement',
            instructions: 'Invente deux mesures à 4 temps chacune en utilisant les rythmes et les silences de ton choix. Ils peuvent être utilisés plusieurs fois.',
            engine: 'rhythm-fill',
            data: {
              paletteType: 'note-values',
              rows: [
                { id: 'm1', label: 'Mesure 1', target: 4 },
                { id: 'm2', label: 'Mesure 2', target: 4 },
              ],
            },
          },
        ],
      },
    },
  ],
};

export default theme;

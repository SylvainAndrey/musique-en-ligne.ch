import type { ThemeContent } from '../../types';

const GRADE = '9h';
const SLUG = 'decouverte-du-langage-musical';
const id = (n: number) => `${GRADE}-${SLUG}-${n}`;

const theme: ThemeContent = {
  grade: GRADE,
  slug: SLUG,
  title: 'Découverte du langage musical',
  description: "L'origine de l'écriture musicale, les rythmes, les silences et les signatures rythmiques.",
  colorVar: '--color-9h',
  icon: '🎼',
  interactive: true,
  intro:
    "Au Moyen-Âge, on laisse tomber le bouche à oreille pour enseigner des chants au profit des partitions écrites afin de limiter les erreurs dans la transmission. Les premiers écrits, datés à partir du IXe siècle, sont rudimentaires : on note des neumes qui indiquent les inflexions de la mélodie au-dessus du texte. Pas assez précise, cette notation s'améliore avec un système de lignes. À l'heure actuelle, les rythmes sont notés de manière très précise et mathématique sous la forme de fractions (1/2, 1/4, 1/8), au point où celles-ci ont donné leur nom aux notes en allemand ou en anglais. En français, les rythmes sont plutôt nommés selon leur aspect visuel.",
  heroImage: '/images/themes/9h-decouverte-du-langage-musical.svg',
  sections: [],
  exercises: [
    // --- Niveau "Mémoriser" ---
    {
      id: id(1),
      number: 1,
      title: 'Qui es-tu, petite note ?',
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
      title: "Le silence est d'or",
      instructions: 'Trouve le nombre de temps de chaque silence selon les indices donnés.',
      engine: 'fill-blank',
      data: {
        layout: 'grid',
        items: [
          { id: 'a-temps', glyph: '𝄽', prompt: 'A) indice : ma valeur correspond à une noire → nombre de temps', accepted: ['1', '1 temps', 'un'] },
          { id: 'b-temps', glyph: '𝄻', prompt: 'B) indice : le silence le plus long, le moment préféré des élèves → nombre de temps', accepted: ['4', '4 temps', 'quatre'] },
          { id: 'c-temps', glyph: '𝄼', prompt: 'C) indice : je vaux deux fois plus et deux fois moins que les précédentes → nombre de temps', accepted: ['2', '2 temps', 'deux'] },
          { id: 'd-temps', glyph: '𝄾', prompt: 'D) indice : il en faut deux comme moi pour faire un temps → nombre de temps', accepted: ['0.5', '0,5', 'un demi', '½'] },
          { id: 'e-temps', glyph: '𝄿', prompt: "E) indice : je suis si rapide que l'on me groupe par 4 → nombre de temps", accepted: ['0.25', '0,25', 'un quart', '¼'] },
        ],
      },
    },

    // --- Niveau "Comprendre" ---
    {
      id: id(3),
      number: 3,
      title: 'Charades rythmiques',
      instructions: 'Chaque rythme et silence possède une valeur spécifique. Trouve la valeur selon les indices donnés.',
      engine: 'fill-blank',
      data: {
        layout: 'riddle',
        large: true,
        items: [
          { id: 'a', glyph: '♩', prompt: '', hint: "C'est ma valeur qui sert de référence et donne le plus souvent le tempo en musique.", accepted: ['noire'] },
          { id: 'b', glyph: '𝅝', prompt: '', hint: 'Je suis le rythme le plus long de tous et un multiple de 2.', accepted: ['ronde'] },
          { id: 'c', glyph: '𝅗𝅥', prompt: '', hint: 'Je vaux deux fois plus et deux fois moins que les notes précédentes.', accepted: ['blanche'] },
          { id: 'd', glyph: '♪', prompt: '', hint: 'Il en faut deux comme moi pour faire un temps.', accepted: ['croche'] },
          { id: 'e', glyph: '♬', prompt: '', hint: "Je suis si rapide que l'on me groupe par 4.", accepted: ['double croche', 'double-croche', 'doubles croches'] },
        ],
      },
    },

    // --- Niveau "Appliquer" ---
    {
      id: id(4),
      number: 4,
      title: 'Mesure pour mesure',
      instructions: "Crée une mesure d'exactement 4 temps grâce aux rythmes ci-dessous.",
      engine: 'rhythm-fill',
      data: {
        paletteType: 'note-values',
        excludeKeys: ['croche-pointee'],
        rows: [{ id: 'm1', label: 'Mesure à compléter', target: 4 }],
      },
    },
    {
      id: id(5),
      number: 5,
      title: 'Silence total',
      instructions: 'Crée une mesure de 4 temps en utilisant uniquement des silences.',
      engine: 'rhythm-fill',
      data: {
        paletteType: 'note-values',
        excludeKeys: ['croche-pointee'],
        rows: [{ id: 'l1', label: 'Mesure à compléter', target: 4 }],
      },
    },
    {
      id: id(13),
      number: 6,
      title: 'Chut, il manque des silences',
      instructions:
        "Complète chaque mesure à l'aide de silences uniquement : les rythmes déjà présents (grisés) sont donnés, ajoute seulement ce qu'il manque pour atteindre 4 temps.",
      engine: 'rhythm-fill',
      data: {
        paletteType: 'note-values',
        excludeKeys: ['ronde', 'blanche', 'noire', 'croche', 'doubles-croches', 'croche-pointee', 'noire-pointee'],
        rows: [
          { id: 'm1', label: 'Mesure 1', target: 4, given: ['blanche', 'croche'] },
          { id: 'm2', label: 'Mesure 2', target: 4, given: ['noire', 'deux-croches'] },
          { id: 'm3', label: 'Mesure 3', target: 4, given: ['croche', 'noire', 'croche'] },
          { id: 'm4', label: 'Mesure 4', target: 4, given: ['quatre-doubles-croches', 'croche'] },
        ],
      },
    },
    {
      id: id(7),
      number: 7,
      title: '2 en 1',
      instructions:
        "Complète chacune des deux lignes ci-dessous pour qu'elle forme 2 mesures de 4 temps, à l'aide des rythmes et des silences proposés.",
      engine: 'rhythm-fill',
      data: {
        dragBar: true,
        groups: [
          {
            label: 'Ligne 1',
            paletteType: 'note-values',
            excludeKeys: ['croche-pointee', 'noire-pointee'],
            rows: [
              { id: 'l1m1', label: 'Mesure 1', target: 4 },
              { id: 'l1m2', label: 'Mesure 2', target: 4 },
            ],
          },
          {
            label: 'Ligne 2',
            paletteType: 'note-values',
            excludeKeys: ['croche-pointee', 'noire-pointee'],
            rows: [
              { id: 'l2m1', label: 'Mesure 1', target: 4 },
              { id: 'l2m2', label: 'Mesure 2', target: 4 },
            ],
          },
        ],
      },
    },
    {
      id: id(8),
      number: 8,
      title: 'Quatre mesures, zéro doublon',
      instructions:
        "Glisse les rythmes ci-dessous dans la barre pour créer en tout 4 mesures d'exactement 4 temps chacune. Chaque mesure doit être différente.",
      engine: 'rhythm-fill',
      data: {
        paletteType: 'note-values',
        excludeKeys: ['croche-pointee'],
        requireDistinct: true,
        dragBar: true,
        rows: [
          { id: 'm1', label: 'Mesure 1', target: 4 },
          { id: 'm2', label: 'Mesure 2', target: 4 },
          { id: 'm3', label: 'Mesure 3', target: 4 },
          { id: 'm4', label: 'Mesure 4', target: 4 },
        ],
      },
    },

    // --- Révision finale : une seule évaluation en plusieurs consignes, modélisée sur le vrai test de synthèse 9H ---
    {
      id: id(12),
      number: 9,
      title: 'Évaluation finale',
      instructions: 'Complète cette évaluation récapitulative en plusieurs consignes, sur le vocabulaire des rythmes, des silences et leur construction.',
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
                { id: 'noire', glyph: '♩', prompt: '', accepted: ['noire'] },
                { id: 'blanche', glyph: '𝅗𝅥', prompt: '', accepted: ['blanche'] },
                { id: 'croches', glyph: '♫', prompt: '', accepted: ['croches', 'deux croches', 'croches liées'] },
                { id: 'doubles', glyph: '♬', prompt: '', accepted: ['doubles croches', 'double croche', 'doubles croches liées'] },
                { id: 'ronde', glyph: '𝅝', prompt: '', accepted: ['ronde'] },
                { id: 'demi-pause', glyph: '𝄼', prompt: '', accepted: ['demi-pause', 'demi pause'] },
                { id: 'soupir', glyph: '𝄽', prompt: '', accepted: ['soupir'] },
                { id: 'demi-soupir', glyph: '𝄾', prompt: '', accepted: ['demi-soupir', 'demi soupir'] },
                { id: 'pause', glyph: '𝄻', prompt: '', accepted: ['pause'] },
                { id: 'quart-soupir', glyph: '𝄿', prompt: '', accepted: ['quart de soupir', 'quart-de-soupir'] },
              ],
            },
          },
          {
            title: 'Consigne 1 — Nomme les rythmes (1 point par item)',
            engine: 'fill-blank',
            data: {
              layout: 'grid',
              large: true,
              items: [
                { id: 'q1', glyph: '♪.', prompt: '', accepted: ['croche pointée', 'croche pointee'] },
                { id: 'q2', glyph: '♩.', prompt: '', accepted: ['noire pointée', 'noire pointee'] },
                { id: 'q3', glyph: '♫', prompt: '', accepted: ['deux croches liées', 'deux croches', 'croches liées'] },
                { id: 'q4', glyph: '𝅘𝅥𝅯', prompt: '', accepted: ['double croche', 'une double croche'] },
              ],
            },
          },
          {
            title: 'Consigne 2 — Silences et valeurs (0.5 point par item)',
            instructions: 'Pour chaque rythme, indique le nom du silence qui possède la même durée, et le nombre de temps correspondant.',
            engine: 'fill-blank',
            data: {
              layout: 'grid',
              items: [
                { id: 'a-nom', glyph: '♪', prompt: 'A) nom du silence équivalent', accepted: ['demi-soupir', 'demi soupir'] },
                { id: 'a-temps', glyph: '♪', prompt: 'A) nombre de temps', accepted: ['0.5', '0,5', 'un demi', '½'] },
                { id: 'b-nom', glyph: '♩', prompt: 'B) nom du silence équivalent', accepted: ['soupir'] },
                { id: 'b-temps', glyph: '♩', prompt: 'B) nombre de temps', accepted: ['1', '1 temps', 'un'] },
                { id: 'c-nom', glyph: '𝅗𝅥', prompt: 'C) nom du silence équivalent', accepted: ['demi-pause', 'demi pause'] },
                { id: 'c-temps', glyph: '𝅗𝅥', prompt: 'C) nombre de temps', accepted: ['2', '2 temps', 'deux'] },
                { id: 'd-nom', glyph: '𝅝', prompt: 'D) nom du silence équivalent', accepted: ['pause'] },
                { id: 'd-temps', glyph: '𝅝', prompt: 'D) nombre de temps', accepted: ['4', '4 temps', 'quatre'] },
              ],
            },
          },
          {
            title: 'Consigne 3 — Silences uniquement',
            instructions:
              "Comme dans le vrai test, complète chaque mesure à l'aide de silences uniquement : les rythmes déjà présents (grisés) sont donnés, ajoute seulement ce qu'il manque pour atteindre 4 temps.",
            engine: 'rhythm-fill',
            data: {
              paletteType: 'note-values',
              excludeKeys: ['ronde', 'blanche', 'noire', 'croche', 'doubles-croches', 'croche-pointee', 'noire-pointee'],
              rows: [
                { id: 'm1', label: 'Mesure 1', target: 4, given: ['croche', 'croche', 'noire'] },
                { id: 'm2', label: 'Mesure 2', target: 4, given: ['croche', 'croche'] },
                { id: 'm3', label: 'Mesure 3', target: 4, given: ['croche', 'croche'] },
                { id: 'm4', label: 'Mesure 4', target: 4, given: ['quatre-doubles-croches', 'noire'] },
              ],
            },
          },
          {
            title: 'Consigne 4 — Compose librement',
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

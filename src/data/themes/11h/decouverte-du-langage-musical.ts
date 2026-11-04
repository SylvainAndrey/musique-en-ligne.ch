import type { ThemeContent } from '../../types';

// Page d'accueil du thème : sous-thèmes « Rythmes et silences », « Signatures rythmiques » et « Lecture de notes »
// (fichiers rythmes-et-silences.ts, signatures-rythmiques.ts et lecture-de-notes.ts).
const theme: ThemeContent = {
  grade: '11h',
  slug: 'decouverte-du-langage-musical',
  title: 'Découverte du langage musical',
  description: 'Rythmes et silences, signatures rythmiques et lecture de notes : approfondir le langage musical en trois sous-thèmes.',
  colorVar: '--color-11h',
  icon: '🎼',
  interactive: true,
  intro:
    "La notation musicale actuelle est l'aboutissement d'une longue évolution, des neumes du Moyen-Âge jusqu'au système de portée et de fractions rythmiques que l'on utilise aujourd'hui. Pour la lire et l'écrire avec aisance, il faut maîtriser la durée des sons (rythmes, silences, signatures rythmiques) et savoir lire les notes sur la portée. Ce thème est divisé en trois sous-thèmes : choisis celui sur lequel tu veux travailler.",
  heroImage: '/images/themes/11h-decouverte-du-langage-musical.svg',
  sections: [],
  exercises: [],
};

export default theme;

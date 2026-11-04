import type { ThemeContent } from '../../types';

// Page d'accueil du thème : elle regroupe les sous-thèmes « Rythmes et silences » et
// « Intervalles et signatures rythmiques » (fichiers rythmes-et-silences.ts et intervalles-et-signatures-rythmiques.ts).
const theme: ThemeContent = {
  grade: '11h',
  slug: 'decouverte-du-langage-musical',
  title: 'Découverte du langage musical',
  description: 'Rythmes et silences, intervalles et signatures rythmiques : approfondir le langage musical en deux sous-thèmes.',
  colorVar: '--color-11h',
  icon: '🎼',
  interactive: true,
  intro:
    "La notation musicale actuelle est l'aboutissement d'une longue évolution, des neumes du Moyen-Âge jusqu'au système de portée et de fractions rythmiques que l'on utilise aujourd'hui. Pour la lire et l'écrire avec aisance, il faut maîtriser la durée des sons (rythmes, silences, signatures rythmiques) et la distance qui sépare les notes (intervalles). Ce thème est divisé en deux sous-thèmes : choisis celui sur lequel tu veux travailler.",
  heroImage: '/images/themes/11h-decouverte-du-langage-musical.svg',
  sections: [],
  exercises: [],
};

export default theme;

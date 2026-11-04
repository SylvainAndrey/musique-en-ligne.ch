import type { ThemeContent } from '../../types';

// Page d'accueil du thème : elle regroupe les sous-thèmes « Rythmes et silences » et
// « Altérations et gammes » (fichiers rythmes-et-silences.ts et alterations-et-gammes.ts).
const theme: ThemeContent = {
  grade: '10h',
  slug: 'decouverte-du-langage-musical',
  title: 'Découverte du langage musical',
  description: 'Rythmes et silences, altérations et gammes : les bases du langage musical en deux sous-thèmes.',
  colorVar: '--color-10h',
  icon: '🎼',
  interactive: true,
  intro:
    "Bien avant l'invention de l'imprimerie musicale, les mélodies se transmettaient oralement, ce qui provoquait de nombreuses erreurs. Peu à peu, une écriture précise s'est construite : des rythmes et des silences pour noter la durée des sons, des notes, des altérations et des gammes pour noter leur hauteur. Ce thème est divisé en deux sous-thèmes : choisis celui sur lequel tu veux travailler.",
  heroImage: '/images/themes/10h-decouverte-du-langage-musical.svg',
  sections: [],
  exercises: [],
};

export default theme;

import type { ThemeContent } from '../../types';

// Page d'accueil du thème : sous-thèmes « Dictée musicale » (dictee-musicale.ts) et « Intervalles » (intervalles.ts).

const GRADE = '11h';
const SLUG = 'developpement-auditif';

const theme: ThemeContent = {
  grade: GRADE,
  slug: SLUG,
  title: 'Développement auditif',
  description: "Dictées musicales et intervalles pour affiner l'oreille musicale, en deux sous-thèmes.",
  colorVar: '--color-11h',
  icon: '👂',
  interactive: true,
  intro:
    "Développer son oreille, c'est apprendre à reconnaître ce que l'on entend : la distance entre deux notes (les intervalles) et les notes d'une mélodie (la dictée musicale). Ce thème est divisé en deux sous-thèmes : choisis celui sur lequel tu veux travailler.",
  heroImage: '/images/themes/11h-developpement-auditif.svg',
  sections: [],
  exercises: [],
};

export default theme;

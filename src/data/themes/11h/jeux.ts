import type { ThemeContent } from '../../types';

const GRADE = '11h';
const SLUG = 'jeux';
const id = (n: number) => `${GRADE}-${SLUG}-${n}`;

const theme: ThemeContent = {
  grade: GRADE,
  slug: SLUG,
  title: 'Jeux',
  description: "Des jeux interactifs pour s'entraîner en s'amusant sur les morceaux travaillés en classe.",
  colorVar: '--color-11h',
  icon: '🎮',
  interactive: true,
  intro:
    "Rejoue les morceaux travaillés en classe sous la forme d'un jeu rythmique : choisis ta voix, touche la bonne touche au bon moment et vise le meilleur score possible.",
  heroImage: '/images/themes/11h-jeux.svg',
  hideExercisesHeading: true,
  sections: [],
  exercises: [
    {
      id: id(1),
      number: 1,
      title: 'No Time For Caution',
      instructions:
        'Choisis ta voix (glockenspiel, xylophones, piano ou guitare basse) et touche la bonne touche au bon moment pour jouer le morceau en rythme.',
      engine: 'iframe-game',
      data: {
        src: '/jeux/no-time-for-caution/index.html',
        title: 'Jeu — No Time For Caution',
        height: 640,
      },
    },
  ],
};

export default theme;

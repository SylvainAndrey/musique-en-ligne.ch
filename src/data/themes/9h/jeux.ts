import type { ThemeContent } from '../../types';

const GRADE = '9h';
const SLUG = 'jeux';
const id = (n: number) => `${GRADE}-${SLUG}-${n}`;

const theme: ThemeContent = {
  grade: GRADE,
  slug: SLUG,
  title: 'Jeux',
  description: "Des jeux interactifs pour s'entraîner en s'amusant sur les morceaux travaillés en classe.",
  colorVar: '--color-9h',
  icon: '🎮',
  interactive: true,
  intro:
    "Rejoue les morceaux travaillés en classe sous la forme d'un jeu rythmique : choisis ta voix, touche la bonne lame au bon moment et vise le meilleur score possible.",
  heroImage: '/images/themes/9h-jeux.svg',
  hideExercisesHeading: true,
  sections: [],
  exercises: [
    {
      id: id(1),
      number: 1,
      title: 'Interstellar : Day One - Hans Zimmer. Arr : Sylvain Andrey',
      instructions:
        'Choisis ta voix (glockenspiel, xylophones, piano ou guitare basse) et touche la bonne touche au bon moment pour jouer le morceau en rythme.',
      engine: 'iframe-game',
      data: {
        src: '/jeux/interstellar-day-one/index.html',
        title: 'Jeu — Interstellar : Day One',
        height: 640,
      },
    },
    {
      id: id(2),
      number: 2,
      title: "C'est le vent - Jean Naty-Boyer. Arr : Quentin Chevigny",
      instructions:
        'Choisis ta voix (mélodie, basse ou rythme au djembé) et touche la bonne lame au bon moment pour jouer le morceau en rythme.',
      engine: 'iframe-game',
      data: {
        src: '/jeux/xylophone-cest-le-vent/index.html',
        title: "Jeu de xylophone — C'est le vent",
        height: 640,
      },
    },
  ],
};

export default theme;

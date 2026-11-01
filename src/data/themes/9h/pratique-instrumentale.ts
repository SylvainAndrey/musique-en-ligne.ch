import type { ThemeContent } from '../../types';

const GRADE = '9h';
const SLUG = 'pratique-instrumentale';
const id = (n: number) => `${GRADE}-${SLUG}-${n}`;

const theme: ThemeContent = {
  grade: GRADE,
  slug: SLUG,
  title: 'Pratique instrumentale',
  description: 'Un clavier de piano virtuel pour exercer chez toi les morceaux travaillés en classe.',
  colorVar: '--color-9h',
  icon: '🎹',
  interactive: true,
  intro:
    "Que ce soit au xylophone en classe ou au piano à la maison, s'exercer régulièrement est la meilleure façon de progresser. Ce clavier virtuel te permet de rejouer tes partitions n'importe où, sans instrument sous la main.",
  heroImage: '/images/themes/9h-pratique-instrumentale.svg',
  sections: [],
  exercises: [
    {
      id: id(1),
      number: 1,
      title: 'Le clavier libre',
      instructions:
        'Tu souhaites exercer un morceau de xylophone travaillé en cours ? Prend ta partition et joue-la grâce au clavier de piano virtuel ci-dessous.',
      engine: 'piano-along',
      data: {
        items: [],
        hideDoneButton: true,
      },
    },
  ],
};

export default theme;

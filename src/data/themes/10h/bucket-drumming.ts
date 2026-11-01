import type { ThemeContent } from '../../types';
import { mediaSections } from '../../media-manifest.generated';

const GRADE = '10h';
const SLUG = 'bucket-drumming';
const id = (n: number) => `${GRADE}-${SLUG}-${n}`;

const theme: ThemeContent = {
  grade: GRADE,
  slug: SLUG,
  title: 'Bucket Drumming',
  description: 'Exerce tes rythmes de Bucket Drumming grâce aux vidéos',
  colorVar: '--color-10h',
  icon: '🪣',
  interactive: true,
  intro:
    "Le bucket drumming consiste à jouer des rythmes sur des seaux renversés, une pratique très répandue dans la musique urbaine et les percussions de rue. Regarde ces cinq performances sur des tubes connus pour t'en inspirer.",
  heroImage: '/images/themes/10h-bucket-drumming.svg',
  sections: mediaSections['10h/bucket-drumming'] ?? [],
  exercises: [
    {
      id: id(1),
      number: 1,
      title: 'Qui a composé ça ?',
      instructions: 'Associe chaque morceau à son interprète.',
      engine: 'matching',
      data: {
        pairs: [
          { left: 'Seven Nation Army', right: 'The White Stripes' },
          { left: 'Billie Jean', right: 'Michael Jackson' },
          { left: 'La Bamba', right: 'Chanson traditionnelle mexicaine' },
          { left: 'Thunder', right: 'Imagine Dragons' },
          { left: 'Crazy', right: 'Gnarls Barkley' },
        ],
      },
    },
  ],
};

export default theme;

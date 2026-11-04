import type { ThemeContent } from '../../types';

// Sous-thème de « Découverte du langage musical » (11H), venu de « Développement auditif ».
// Identifiant d'origine conservé (progression des élèves).
const GRADE = '11h';
const DA = (n: number) => `${GRADE}-developpement-auditif-${n}`;

const theme: ThemeContent = {
  grade: GRADE,
  slug: 'lecture-de-notes',
  parent: 'decouverte-du-langage-musical',
  order: 3,
  title: 'Lecture de notes',
  description: 'Lire rapidement les notes en clé de sol et en clé de fa.',
  colorVar: '--color-11h',
  icon: '🎼',
  interactive: true,
  intro:
    "La position d'une note sur la portée indique sa hauteur, et la clé placée au début de la portée indique comment lire ces positions : en clé de sol, la note sur la 2e ligne est un sol ; en clé de fa, la note sur la 4e ligne est un fa.",
  heroImage: '/images/themes/11h-lecture-de-notes.svg',
  sections: [],
  exercises: [
    {
      id: DA(3),
      number: 1,
      title: 'Lecture de notes',
      instructions: 'Observe la note (clé de sol ou clé de fa) et indique son nom.',
      engine: 'note-read',
      data: {
        count: 10,
        minStep: -4,
        maxStep: 9,
        mixClefs: true,
      },
    },
  ],
};

export default theme;

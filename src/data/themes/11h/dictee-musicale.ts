import type { ThemeContent } from '../../types';

// Sous-thème de « Développement auditif » (11H). Identifiants d'origine conservés (progression des élèves).
const GRADE = '11h';
const DA = (n: number) => `${GRADE}-developpement-auditif-${n}`;

const theme: ThemeContent = {
  grade: GRADE,
  slug: 'dictee-musicale',
  parent: 'developpement-auditif',
  order: 1,
  title: 'Dictée musicale',
  description: 'Relever des mélodies à l’oreille et les compléter.',
  colorVar: '--color-11h',
  icon: '👂',
  interactive: true,
  intro:
    "Faire une dictée musicale, c'est retrouver à l'oreille les notes d'une mélodie. Écoute attentivement, chante intérieurement, puis cherche les notes sur le clavier.",
  heroImage: '/images/themes/11h-dictee-musicale.svg',
  sections: [],
  exercises: [
    {
      id: DA(2),
      number: 1,
      title: 'Relevés de mélodies au piano',
      instructions: 'Écoute les extraits suivants et essaie de reproduire la mélodie (le thème) sur le clavier de piano virtuel ci-dessous.',
      engine: 'piano-along',
      data: {
        items: [
          { label: 'James Bond — Complexe', media: { type: 'audio', src: '/media/11h/developpement-auditif/releves-de-melodies-au-xylo/1-jamesbond-complexe.mp3' } },
          { label: 'James Bond — Simple', media: { type: 'audio', src: '/media/11h/developpement-auditif/releves-de-melodies-au-xylo/2-jamesbond-simple.mp3' } },
          { label: 'Jurassic Park — Complexe', media: { type: 'audio', src: '/media/11h/developpement-auditif/releves-de-melodies-au-xylo/3-jurassicpark-complexe.mp3' } },
          { label: 'Jurassic Park — Simple', media: { type: 'audio', src: '/media/11h/developpement-auditif/releves-de-melodies-au-xylo/4-jurassicpark-simple.mp3' } },
          { label: 'Peppa Pig — Très simple', media: { type: 'audio', src: '/media/11h/developpement-auditif/releves-de-melodies-au-xylo/5-peppapig-tres-simple.mp3' } },
          { label: 'Pirates — Moyen', media: { type: 'audio', src: '/media/11h/developpement-auditif/releves-de-melodies-au-xylo/6-pirates-moyen.mp3' } },
        ],
      },
    },
    {
      id: DA(7),
      number: 2,
      title: 'Termine la mélodie',
      instructions: 'Écoute le début de chaque mélodie et trouve la note qui la complète logiquement.',
      engine: 'mcq',
      data: {
        items: [
          { question: 'Do - Mi - Sol - … ?', synth: ['do4', 'mi4', 'sol4'], options: ['Do (aigu)', 'Si', 'La'], correctIndex: 0 },
          { question: 'Sol - Fa - Mi - … ?', synth: ['sol4', 'fa4', 'mi4'], options: ['Ré', 'Do', 'Fa'], correctIndex: 0 },
          { question: 'Do - Ré - Mi - Fa - … ?', synth: ['do4', 're4', 'mi4', 'fa4'], options: ['Sol', 'La', 'Fa'], correctIndex: 0 },
          { question: 'La - Do - Mi - … ?', synth: ['la4', 'do5', 'mi5'], options: ['Sol (aigu)', 'Fa (aigu)', 'La (aigu)'], correctIndex: 0 },
          { question: 'Si - La - Sol - … ?', synth: ['si4', 'la4', 'sol4'], options: ['Fa', 'Mi', 'Sol'], correctIndex: 0 },
          { question: 'Mi - Sol - Si - … ?', synth: ['mi4', 'sol4', 'si4'], options: ['Ré (aigu)', 'Do (aigu)', 'Mi (aigu)'], correctIndex: 0 },
        ],
      },
    },
  ],
};

export default theme;

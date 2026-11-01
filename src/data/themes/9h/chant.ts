import type { ThemeContent } from '../../types';
import { mediaSections } from '../../media-manifest.generated';

const GRADE = '9h';
const SLUG = 'chant';
const id = (n: number) => `${GRADE}-${SLUG}-${n}`;

const theme: ThemeContent = {
  grade: GRADE,
  slug: SLUG,
  title: "Chant — La voix humaine et l'organologie",
  description: "La voix comme instrument à part entière : appareil phonatoire, tessitures vocales et technique du chant.",
  colorVar: '--color-9h',
  icon: '🎤',
  interactive: true,
  intro:
    "L'organologie est l'étude des instruments de musique, et la voix humaine en fait partie intégrante. On y découvre l'appareil phonatoire et son fonctionnement pour comprendre comment naît le son vocal. La tessiture, c'est-à-dire l'ensemble des notes qu'une voix peut produire, dépend avant tout du sexe : si les voix d'enfants se ressemblent, la puberté entraîne des changements hormonaux (testostérone, œstrogènes) qui modifient le larynx et font baisser la voix, surtout chez les garçons.",
  heroImage: '/images/themes/9h-chant.svg',
  sections: mediaSections['9h/chant'] ?? [],
  exercises: [
    {
      id: id(1),
      number: 1,
      title: 'Comment fonctionne la voix ?',
      instructions: "Regarde la vidéo puis réponds aux questions sur le fonctionnement de la voix.",
      engine: 'mcq',
      data: {
        media: { type: 'video', src: '/media/9h/chant/organologie/fonctionnement-de-la-voix.mp4' },
        items: [
          {
            question: 'Combien y a-t-il d’éléments communs à tous les instruments (dont la voix) pour produire un son ?',
            options: ['Deux', 'Trois', 'Quatre'],
            correctIndex: 1,
          },
          {
            question: 'Quels organes maîtrisent le souffle nécessaire à la voix ?',
            options: ['Les poumons et le diaphragme', 'Les cordes vocales', 'La bouche et le nez'],
            correctIndex: 0,
          },
          {
            question: 'Où se situent les cordes vocales ?',
            options: ['Dans les poumons', 'Dans le larynx (la gorge)', 'Dans la bouche'],
            correctIndex: 1,
          },
          {
            question: 'Qu’est-ce que le tractus vocal ?',
            options: [
              "L'ensemble des cavités (gorge, bouche, nez) qui résonnent et donnent sa couleur au son",
              'Le muscle qui contrôle la respiration',
              "Le nom scientifique des cordes vocales",
            ],
            correctIndex: 0,
          },
          {
            question: 'Pour bien chanter, quelle est une bonne habitude de posture ?',
            options: ['Se tenir droit, épaules relâchées', 'Rentrer le menton vers la poitrine', 'Bloquer sa respiration'],
            correctIndex: 0,
          },
          {
            question: 'Comment ménager ses cordes vocales ?',
            options: [
              'En criant le plus possible pour les muscler',
              "En évitant les efforts vocaux excessifs et en s'échauffant la voix",
              'En ne buvant jamais d’eau avant de chanter',
            ],
            correctIndex: 1,
          },
        ],
      },
    },
    {
      id: id(2),
      number: 2,
      title: "L'appareil phonatoire",
      instructions: 'Associe chaque organe à son rôle dans la production de la voix.',
      engine: 'matching',
      data: {
        pairs: [
          { left: 'Poumons', right: "Fournissent l'air, le souffle nécessaire à la voix" },
          { left: 'Larynx (cordes vocales)', right: 'Vibrent au passage de l’air pour produire le son' },
          { left: 'Diaphragme', right: 'Contrôle la respiration et la puissance du souffle' },
          { left: 'Bouche, nez, gorge (résonateurs)', right: 'Amplifient le son et lui donnent sa couleur (timbre)' },
        ],
      },
    },
    {
      id: id(3),
      number: 3,
      title: 'Le corps humain',
      instructions: 'Associe chaque organe de la phonation à la région du corps où il se situe.',
      engine: 'matching',
      data: {
        pairs: [
          { left: 'Poumons', right: 'Thorax (cage thoracique)' },
          { left: 'Larynx', right: 'Gorge (cou)' },
          { left: 'Diaphragme', right: "Bas du thorax, au-dessus de l'abdomen" },
          { left: 'Résonateurs', right: 'Tête (bouche, nez, visage)' },
        ],
      },
    },
    {
      id: id(4),
      number: 4,
      title: 'De haut en bas et de bas en haut',
      instructions: "Écoute chaque extrait et indique s'il s'agit d'une voix d'homme ou de femme, grave ou aiguë.",
      engine: 'mcq',
      data: {
        shuffle: true,
        items: [
          {
            question: 'Extrait 1',
            media: { type: 'video', src: '/media/9h/chant/tessitures-vocales-voix-d-hommes/basse.mp4', audioOnly: true },
            options: ["Voix d'homme grave", "Voix d'homme aiguë", 'Voix de femme grave', 'Voix de femme aiguë'],
            correctIndex: 0,
          },
          {
            question: 'Extrait 2',
            media: { type: 'video', src: '/media/9h/chant/tessitures-vocales-voix-d-hommes/tenor.mp4', audioOnly: true },
            options: ["Voix d'homme grave", "Voix d'homme aiguë", 'Voix de femme grave', 'Voix de femme aiguë'],
            correctIndex: 1,
          },
          {
            question: 'Extrait 3',
            media: { type: 'video', src: '/media/9h/chant/tessitures-vocales-voix-de-femmes/mezzo-soprano.mp4', audioOnly: true },
            options: ["Voix d'homme grave", "Voix d'homme aiguë", 'Voix de femme grave', 'Voix de femme aiguë'],
            correctIndex: 2,
          },
          {
            question: 'Extrait 4',
            media: { type: 'video', src: '/media/9h/chant/tessitures-vocales-voix-de-femmes/soprano.mp4', audioOnly: true },
            options: ["Voix d'homme grave", "Voix d'homme aiguë", 'Voix de femme grave', 'Voix de femme aiguë'],
            correctIndex: 3,
          },
          {
            question: 'Extrait 5',
            media: { type: 'video', src: '/media/9h/chant/tessitures-vocales-voix-d-hommes/baryton.mp4', audioOnly: true },
            options: ["Voix d'homme grave", "Voix d'homme aiguë", 'Voix de femme grave', 'Voix de femme aiguë'],
            correctIndex: 0,
          },
          {
            question: 'Extrait 6',
            media: { type: 'video', src: '/media/9h/chant/tessitures-vocales-voix-de-femmes/soprano-colorature.mp4', audioOnly: true },
            options: ["Voix d'homme grave", "Voix d'homme aiguë", 'Voix de femme grave', 'Voix de femme aiguë'],
            correctIndex: 3,
          },
        ],
      },
    },
    {
      id: id(5),
      number: 5,
      title: 'Qui suis-je ?',
      instructions: 'Lis chaque définition et indique la tessiture vocale correspondante.',
      engine: 'mcq',
      data: {
        items: [
          {
            question: "Je suis la voix d'homme la plus grave.",
            options: ['Basse', 'Ténor', 'Haute-contre', 'Soprano'],
            correctIndex: 0,
          },
          {
            question: "Je suis la voix d'homme la plus aiguë (dans le registre masculin courant).",
            options: ['Basse', 'Ténor', 'Alto', 'Soprano'],
            correctIndex: 1,
          },
          {
            question: 'Voix d’homme très aiguë chantant dans le registre grave des voix féminines.',
            options: ['Basse', 'Ténor', 'Haute-contre', 'Soprano'],
            correctIndex: 2,
          },
          {
            question: 'Je suis la voix de femme la plus aiguë.',
            options: ['Alto', 'Mezzo-soprano', 'Soprano', 'Basse'],
            correctIndex: 2,
          },
        ],
      },
    },
    {
      id: id(6),
      number: 6,
      title: 'Comme à l’opéra',
      instructions: 'Classe ces tessitures vocales du plus aigu, en haut, au plus grave, en bas.',
      engine: 'ordering',
      data: {
        items: ['Soprano', 'Mezzo-soprano', 'Alto', 'Ténor', 'Baryton', 'Basse'],
      },
    },
    {
      id: id(7),
      number: 7,
      title: 'Vocabulaire',
      instructions: 'Complète chaque définition avec le terme qui convient.',
      engine: 'fill-blank',
      data: {
        layout: 'list',
        items: [
          { id: 'a', prompt: "L'ensemble des notes qu'une voix peut produire s'appelle sa ___", accepted: ['tessiture'] },
          { id: 'b', prompt: "L'organe où vibrent les cordes vocales s'appelle le ___", accepted: ['larynx'] },
          { id: 'c', prompt: "Le muscle qui contrôle la respiration s'appelle le ___", accepted: ['diaphragme'] },
          { id: 'd', prompt: "L'étude des instruments de musique (dont la voix) s'appelle l'___", accepted: ['organologie'] },
        ],
      },
    },
    {
      id: id(8),
      number: 8,
      title: 'Évaluation récapitulative',
      instructions: 'Réponds à ces 12 questions pour vérifier ce que tu as retenu sur la voix et le chant.',
      engine: 'mcq',
      data: {
        items: [
          { question: "Combien y a-t-il d'éléments communs à tous les instruments (dont la voix) pour produire un son ?", options: ['Deux', 'Trois', 'Quatre'], correctIndex: 1 },
          { question: 'Où se situent les cordes vocales ?', options: ['Dans les poumons', 'Dans le larynx (la gorge)', 'Dans la bouche'], correctIndex: 1 },
          {
            question: "Qu'est-ce que le tractus vocal ?",
            options: ["L'ensemble des cavités (gorge, bouche, nez) qui résonnent et donnent sa couleur au son", 'Le muscle qui contrôle la respiration', 'Le nom scientifique des cordes vocales'],
            correctIndex: 0,
          },
          { question: 'Quel organe fournit le souffle nécessaire à la voix ?', options: ['Les poumons', 'Les cordes vocales', 'La bouche'], correctIndex: 0 },
          { question: 'Quel muscle contrôle la respiration et la puissance du souffle ?', options: ['Le larynx', 'Le diaphragme', 'Le tractus vocal'], correctIndex: 1 },
          { question: 'Dans quelle région du corps se situe le larynx ?', options: ['Le thorax', 'La gorge (le cou)', "L'abdomen"], correctIndex: 1 },
          { question: "Quelle est la voix d'homme la plus grave ?", options: ['Basse', 'Ténor', 'Baryton'], correctIndex: 0 },
          { question: "Quelle est la voix d'homme la plus aiguë (registre masculin courant) ?", options: ['Basse', 'Baryton', 'Ténor'], correctIndex: 2 },
          { question: 'Quelle est la voix de femme la plus aiguë ?', options: ['Alto', 'Mezzo-soprano', 'Soprano'], correctIndex: 2 },
          { question: 'Entre le Baryton et le Ténor, lequel est le plus aigu ?', options: ['Le Baryton', 'Le Ténor', 'Ils sont identiques'], correctIndex: 1 },
          { question: "L'ensemble des notes qu'une voix peut produire s'appelle sa...", options: ['Portée', 'Gamme', 'Tessiture'], correctIndex: 2 },
          { question: "La couleur particulière d'une voix, qui permet de reconnaître qui chante même sur la même note, s'appelle son...", options: ['Tempo', 'Timbre', 'Diaphragme'], correctIndex: 1 },
        ],
      },
    },
  ],
};

export default theme;

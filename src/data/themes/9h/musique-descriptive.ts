import type { ThemeContent } from '../../types';
import { mediaSections } from '../../media-manifest.generated';

const GRADE = '9h';
const SLUG = 'musique-descriptive';
const id = (n: number) => `${GRADE}-${SLUG}-${n}`;

const theme: ThemeContent = {
  grade: GRADE,
  slug: SLUG,
  title: 'La musique descriptive',
  description: "Comment la musique peut raconter une histoire ou peindre un tableau, du Carnaval des animaux aux ballets de Stravinsky.",
  colorVar: '--color-9h',
  icon: '🖼️',
  interactive: true,
  intro:
    "La musique descriptive ne date pas d'hier : dès la Renaissance, des œuvres chorales imitaient déjà la guerre à l'aide d'onomatopées. Elle cherche à représenter des scènes, des personnages ou des émotions à travers des éléments musicaux comme le tempo, la hauteur des notes, les nuances ou le timbre. Ce thème explore des œuvres emblématiques du genre, du Carnaval des animaux de Saint-Saëns aux Tableaux d'une exposition de Moussorgski, en passant par le ballet Petrouchka de Stravinsky.",
  heroImage: '/images/themes/9h-musique-descriptive.svg',
  sections: mediaSections['9h/musique-descriptive'] ?? [],
  exercises: [
    {
      id: id(1),
      number: 1,
      title: 'La Belle et la Bête',
      instructions:
        "Écoute « L'éléphant » et « Le vol du bourdon », puis compare-les : tempo, hauteur des notes et instrument principal.",
      engine: 'mcq',
      data: {
        items: [
          {
            question: "« L'éléphant » (Saint-Saëns) : quel est son tempo et le registre des notes ?",
            media: { type: 'video', src: '/media/9h/musique-descriptive/oeuvres-de-musique-descriptive/camille-saint-saens-l-elephant.mp4' },
            options: ['Lent et grave', 'Rapide et aigu', 'Lent et aigu'],
            correctIndex: 0,
          },
          {
            question: '« Le vol du bourdon » (Rimski-Korsakov) : quel est son tempo et le registre des notes ?',
            media: { type: 'video', src: '/media/9h/musique-descriptive/oeuvres-de-musique-descriptive/rimsky-korsakov-vol-du-bourdon.mp4' },
            options: ['Lent et grave', 'Rapide et aigu', 'Lent et aigu'],
            correctIndex: 1,
          },
          {
            question: 'Pourquoi Saint-Saëns utilise-t-il des notes graves et un tempo lent pour représenter un éléphant ?',
            options: [
              'Parce que les sons graves et lents évoquent la lourdeur et la grande taille',
              "Parce que les éléphants n'aiment pas la musique rapide",
              "Parce que c'est plus facile à jouer",
            ],
            correctIndex: 0,
          },
        ],
      },
    },
    {
      id: id(2),
      number: 2,
      title: 'Définition',
      instructions: 'Laquelle de ces définitions correspond le mieux à la musique descriptive ?',
      engine: 'mcq',
      data: {
        items: [
          {
            question: 'La musique descriptive, c’est...',
            options: [
              'Une musique qui cherche à représenter une scène, un personnage ou une émotion avec des éléments sonores',
              'Une musique jouée uniquement par un orchestre symphonique complet',
              'Une musique écrite exclusivement pour le cinéma muet',
            ],
            correctIndex: 0,
          },
        ],
      },
    },
    {
      id: id(3),
      number: 3,
      title: 'Le quoi ?',
      instructions: 'Complète les définitions de ces éléments du langage musical.',
      engine: 'fill-blank',
      data: {
        layout: 'list',
        items: [
          { id: 'a', prompt: "La vitesse à laquelle est jouée une musique s'appelle le ___", accepted: ['tempo'] },
          { id: 'b', prompt: "Plusieurs notes jouées en même temps forment un ___", accepted: ['accord'] },
          { id: 'c', prompt: "L'ensemble des notes qu'une voix ou un instrument peut produire s'appelle sa ___", accepted: ['tessiture'] },
          { id: 'd', prompt: 'La manière de lier ou détacher les notes (legato, staccato) s’appelle l’___', accepted: ['articulation'] },
        ],
      },
    },
    {
      id: id(4),
      number: 4,
      title: 'Carnaval',
      instructions: "Écoute des extraits puis réponds aux questions sur les 14 mouvements du Carnaval des animaux de Camille Saint-Saëns.",
      engine: 'mcq',
      data: {
        items: [
          {
            question: 'Quel animal ce passage représente-t-il ?',
            media: { type: 'video', src: '/media/9h/musique-descriptive/oeuvres-de-musique-descriptive/camille-saint-saens-l-elephant.mp4', audioOnly: true },
            options: ['La tortue', "L'éléphant", 'Le coucou', 'Les poules'],
            correctIndex: 1,
          },
          {
            question: 'Combien d’animaux (de mouvements) le Carnaval des animaux décrit-il en tout ?',
            media: { type: 'video', src: '/media/9h/musique-descriptive/oeuvres-de-musique-descriptive/saint-saens-le-carnaval-des-animaux.mp4', audioOnly: true },
            options: ['7', '14', '20'],
            correctIndex: 1,
          },
          {
            question: 'Quel est le nom du tout premier mouvement, qui ouvre l’œuvre ?',
            options: ['Introduction et marche royale du lion', 'Final', 'Fossiles'],
            correctIndex: 0,
          },
          {
            question: 'Quel animal est mis en scène dans « Poules et coqs », le 2e mouvement ?',
            options: ['Les poules et les coqs', 'Les kangourous', 'Les tortues'],
            correctIndex: 0,
          },
          {
            question: 'Le mouvement « Tortues » a la particularité de...',
            options: [
              'Jouer très lentement un air normalement rapide (le french-cancan d’Offenbach)',
              'Ne durer que 2 secondes',
              'Être joué uniquement par des percussions',
            ],
            correctIndex: 0,
          },
          {
            question: 'Quel type d’animaux est évoqué dans le mouvement « Aquarium » ?',
            options: ['Des poissons', 'Des oiseaux', 'Des insectes'],
            correctIndex: 0,
          },
          {
            question: 'Quel oiseau est représenté par une seule note répétée à la clarinette dans « Le coucou au fond des bois » ?',
            options: ['Le coucou', 'Le rossignol', 'La chouette'],
            correctIndex: 0,
          },
          {
            question: 'Le mouvement « Volière » représente...',
            options: ['Une volée d’oiseaux', 'Un troupeau d’éléphants', 'Un banc de poissons'],
            correctIndex: 0,
          },
          {
            question: 'Dans « Pianistes », Saint-Saëns se moque gentiment de...',
            options: [
              'Élèves qui répètent maladroitement leurs gammes au piano',
              'Chefs d’orchestre trop lents',
              'Violonistes qui jouent trop vite',
            ],
            correctIndex: 0,
          },
          {
            question: 'Que représente le mouvement « Fossiles » ?',
            options: [
              'Des squelettes et des thèmes anciens qui dansent, dont le célèbre thème du xylophone',
              'Des dinosaures vivants',
              'Une tempête de sable',
            ],
            correctIndex: 0,
          },
          {
            question: 'Quel est le nom de l’avant-dernier mouvement, le plus célèbre, souvent joué au violoncelle ?',
            options: ['Le cygne', 'Le lion', 'La tortue'],
            correctIndex: 0,
          },
          {
            question: 'Que fait le dernier mouvement, « Final » ?',
            options: [
              'Il réunit la plupart des personnages (animaux) de l’œuvre',
              'Il ne contient que des silences',
              'Il reprend uniquement le thème du cygne',
            ],
            correctIndex: 0,
          },
        ],
      },
    },
    {
      id: id(5),
      number: 5,
      title: 'Comme au cinéma',
      instructions: 'Pour chaque description sonore, choisis la scène de film qui lui correspond le mieux.',
      engine: 'mcq',
      data: {
        items: [
          {
            question: 'Rythmes rapides, notes aiguës et silences soudains…',
            options: ['Une scène de poursuite ou de suspense', 'Une balade tranquille en forêt', "Une berceuse pour endormir un bébé"],
            correctIndex: 0,
          },
          {
            question: 'Sons graves et lents…',
            options: ["Une scène menaçante ou un monstre qui approche", 'Une fête foraine joyeuse', 'Un feu d’artifice'],
            correctIndex: 0,
          },
          {
            question: 'Notes légères et rapides…',
            options: ['Des flocons de neige ou des oiseaux qui voltigent', 'Un tremblement de terre', 'Une armée qui marche'],
            correctIndex: 0,
          },
        ],
      },
    },
    {
      id: id(6),
      number: 6,
      title: 'Les émotions',
      instructions: 'Quelle caractéristique musicale évoque le mieux chaque émotion ?',
      engine: 'mcq',
      data: {
        items: [
          {
            question: 'Comment évoquer la peur en musique ?',
            options: ['Des notes graves, dissonantes et un crescendo soudain', 'Un tempo lent et régulier', 'Des notes aiguës et joyeuses'],
            correctIndex: 0,
          },
          {
            question: 'Comment évoquer la joie en musique ?',
            options: ['Un tempo rapide, des notes aiguës et une nuance forte', 'Un tempo très lent et des notes très graves', 'Un silence complet'],
            correctIndex: 0,
          },
          {
            question: 'Comment évoquer la surprise en musique ?',
            options: ['Un accord fort et soudain après un silence ou un passage doux', 'Un decrescendo très progressif', 'Une seule note répétée sans changement'],
            correctIndex: 0,
          },
        ],
      },
    },
    {
      id: id(7),
      number: 7,
      title: "Les tableaux d'une exposition",
      instructions: "Écoute un extrait des Tableaux d'une exposition de Moussorgski et réponds aux questions.",
      engine: 'mcq',
      data: {
        media: { type: 'video', src: '/media/9h/musique-descriptive/oeuvres-de-musique-descriptive/moussorgsky-tableaux-d-une-exposition.mp4' },
        items: [
          {
            question: 'Modeste Moussorgski a composé cette œuvre en hommage à qui ?',
            options: ["L'architecte et peintre Viktor Hartmann, un ami décédé", 'Le tsar de Russie', 'Un critique musical parisien'],
            correctIndex: 0,
          },
          {
            question: 'Quel est le principe de composition de cette œuvre ?',
            options: [
              'Chaque mouvement décrit un tableau différent, comme une visite de musée en musique',
              'Toute la pièce ne décrit qu’un seul tableau, très longuement',
              'Il n’y a aucun lien entre les mouvements',
            ],
            correctIndex: 0,
          },
        ],
      },
    },
    {
      id: id(8),
      number: 8,
      title: 'Petrouchka',
      instructions: 'Découvre Petrouchka de Stravinsky et réponds aux questions sur ce début de ballet.',
      engine: 'mcq',
      data: {
        media: { type: 'video', src: '/media/9h/musique-descriptive/oeuvres-de-musique-descriptive/stravinsky-petrouchka.mp4' },
        items: [
          {
            question: 'Petrouchka de Stravinsky est...',
            options: ['Un ballet', 'Un opéra', 'Une symphonie sans instruments'],
            correctIndex: 0,
          },
          {
            question: 'Au début de l’œuvre, quel instrument populaire est évoqué par la musique ?',
            options: ["Un orgue de Barbarie (musique de fête foraine)", 'Un orgue d’église', 'Une cornemuse'],
            correctIndex: 0,
          },
          {
            question: 'Que remarque-t-on dans les motifs joués par les flûtes à ce moment ?',
            options: [
              'Plusieurs motifs différents se superposent en même temps',
              'Une seule flûte joue, seule, en silence total',
              'Les flûtes ne jouent jamais dans cette œuvre',
            ],
            correctIndex: 0,
          },
        ],
      },
    },
  ],
};

export default theme;

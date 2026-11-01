import type { ThemeContent } from '../../types';
import { mediaSections } from '../../media-manifest.generated';

const GRADE = '10h';
const SLUG = 'instruments-a-vent';
const id = (n: number) => `${GRADE}-${SLUG}-${n}`;

const theme: ThemeContent = {
  grade: GRADE,
  slug: SLUG,
  title: 'Les instruments à vent',
  description: "Les familles des bois et des cuivres, la vibration de l'air et le timbre des instruments à vent.",
  colorVar: '--color-10h',
  icon: '🎺',
  interactive: true,
  intro:
    "Le son d'un instrument à vent naît de la vibration régulière d'une colonne d'air, provoquée différemment selon les familles : biseau pour la flûte à bec, anche simple ou double pour les bois, embouchure pour les cuivres. La hauteur du son dépend de la taille de cette colonne d'air, tandis que le timbre propre à chaque instrument s'explique par la richesse de ses harmoniques. Ce thème permet de découvrir et de distinguer les instruments à vent, de la famille des bois à celle des cuivres.",
  heroImage: '/images/themes/10h-instruments-a-vent.svg',
  sections: mediaSections['10h/instruments-a-vent'] ?? [],
  exercises: [
    {
      id: id(1),
      number: 1,
      title: "Comment faire vibrer une colonne d'air",
      instructions: "Regarde cette vidéo sur la vibration de la colonne d'air, puis réponds aux questions.",
      engine: 'mcq',
      data: {
        media: { type: 'video', src: "/media/10h/instruments-a-vent/le-son/comment-faire-vibrer-une-colonne-d-air.mp4" },
        items: [
          {
            question: "Comment fait-on vibrer la colonne d'air d'un instrument à vent ?",
            options: ['En soufflant dedans', 'En le frottant', 'En le pinçant'],
            correctIndex: 0,
          },
          {
            question: 'Plus la colonne d’air est longue, plus le son produit est...',
            options: ['Grave', 'Aigu', 'Identique'],
            correctIndex: 0,
          },
          {
            question: 'Plus la colonne d’air est courte, plus le son produit est...',
            options: ['Aigu', 'Grave', 'Identique'],
            correctIndex: 0,
          },
          {
            question: "Qu'est-ce qui fait vibrer l'air à l'intérieur d'un instrument à vent ?",
            options: ['Le souffle du musicien', 'Un archet', 'Des baguettes'],
            correctIndex: 0,
          },
        ],
      },
    },
    {
      id: id(2),
      number: 2,
      title: 'Propagation du son',
      instructions: 'Regarde cette vidéo sur la propagation du son, puis réponds aux questions.',
      engine: 'mcq',
      data: {
        media: { type: 'video', src: '/media/10h/instruments-a-vent/le-son/propagation-du-son.mp4' },
        items: [
          {
            question: "Le son se propage dans l'air sous forme de...",
            options: ['Ondes', 'Particules solides', 'Lumière'],
            correctIndex: 0,
          },
          {
            question: 'Le son peut-il se propager dans le vide (en absence d’air) ?',
            options: ['Oui', 'Non'],
            correctIndex: 1,
          },
          {
            question: 'Le son se propage-t-il plus vite dans l’air ou dans l’eau ?',
            options: ['Dans l’air', 'Dans l’eau', 'À la même vitesse'],
            correctIndex: 1,
          },
          {
            question: 'Qu’est-ce qui vibre pour transmettre une onde sonore dans l’air ?',
            options: ['Les molécules de l’air', 'La lumière', 'Rien, le son voyage seul'],
            correctIndex: 0,
          },
        ],
      },
    },
    {
      id: id(3),
      number: 3,
      title: 'Les bois',
      instructions: 'Regarde chaque présentation et identifie l’instrument de la famille des bois.',
      engine: 'mcq',
      data: {
        items: [
          {
            question: 'Quel est cet instrument ?',
            media: { type: 'video', src: '/media/10h/instruments-a-vent/bois-presentations-d-instruments/presentation-de-la-flute-traversiere.mp4' },
            options: ['Flûte traversière', 'Piccolo', 'Flûte à bec'],
            correctIndex: 0,
          },
          {
            question: 'Quel est cet instrument ?',
            media: { type: 'video', src: '/media/10h/instruments-a-vent/bois-presentations-d-instruments/presentation-du-hautbois.mp4' },
            options: ['Basson', 'Clarinette', 'Hautbois'],
            correctIndex: 2,
          },
          {
            question: 'Quel est cet instrument ?',
            media: { type: 'video', src: '/media/10h/instruments-a-vent/bois-presentations-d-instruments/presentation-de-la-clarinette.mp4' },
            options: ['Clarinette', 'Saxophone', 'Hautbois'],
            correctIndex: 0,
          },
          {
            question: 'Quel est cet instrument ?',
            media: { type: 'video', src: '/media/10h/instruments-a-vent/bois-presentations-d-instruments/presentation-des-saxophones.mp4' },
            options: ['Clarinette', 'Basson', 'Saxophone'],
            correctIndex: 2,
          },
          {
            question: 'Quel est cet instrument ?',
            media: { type: 'video', src: '/media/10h/instruments-a-vent/bois-presentations-d-instruments/presentation-du-basson.mp4' },
            options: ['Cor anglais', 'Basson', 'Hautbois'],
            correctIndex: 1,
          },
          {
            question: 'Quel est cet instrument ?',
            media: { type: 'video', src: '/media/10h/instruments-a-vent/bois-presentations-d-instruments/presentation-du-cor-anglais.mp4' },
            options: ['Hautbois', 'Basson', 'Cor anglais'],
            correctIndex: 2,
          },
        ],
      },
    },
    {
      id: id(4),
      number: 4,
      title: 'Chez les pygmées',
      instructions: 'Écoute cet extrait et indique à quel type d’instrument il te fait penser.',
      engine: 'mcq',
      data: {
        items: [
          {
            question: 'De quel instrument s’agit-il ?',
            media: { type: 'video', src: '/media/10h/instruments-a-vent/bois/flute-bambou-pygmees.mp4' },
            options: ['Une flûte traditionnelle en bambou', 'Une flûte traversière moderne', 'Un piccolo'],
            correctIndex: 0,
          },
        ],
      },
    },
    {
      id: id(5),
      number: 5,
      title: 'Les cuivres',
      instructions: 'Écoute chaque extrait et identifie l’instrument de la famille des cuivres.',
      engine: 'mcq',
      data: {
        items: [
          {
            question: 'Quel est cet instrument ?',
            media: { type: 'video', src: '/media/10h/instruments-a-vent/cuivres/cor-des-alpes-solo.mp4', audioOnly: true },
            options: ['Cor des Alpes', 'Cor', 'Trombone'],
            correctIndex: 0,
          },
          {
            question: 'Quel est cet instrument ?',
            media: { type: 'video', src: '/media/10h/instruments-a-vent/cuivres-presentations-d-instruments/presentation-trompette.mp4', audioOnly: true },
            options: ['Cornet', 'Trompette', 'Tuba'],
            correctIndex: 1,
          },
          {
            question: 'Quel est cet instrument ?',
            media: { type: 'video', src: '/media/10h/instruments-a-vent/cuivres/cor-solo.mp4', audioOnly: true },
            options: ['Cor', 'Trombone', 'Tuba'],
            correctIndex: 0,
          },
          {
            question: 'Quel est cet instrument ?',
            media: { type: 'video', src: '/media/10h/instruments-a-vent/cuivres/trombone-solo.mp4', audioOnly: true },
            options: ['Trombone', 'Tuba', 'Cor'],
            correctIndex: 0,
          },
          {
            question: 'Quel est cet instrument ?',
            media: { type: 'video', src: '/media/10h/instruments-a-vent/cuivres/tuba-solo.mp4', audioOnly: true },
            options: ['Tuba', 'Trombone', 'Cor des Alpes'],
            correctIndex: 0,
          },
        ],
      },
    },
    {
      id: id(6),
      number: 6,
      title: 'Vocabulaire',
      instructions: 'Complète ces définitions liées aux instruments à vent.',
      engine: 'fill-blank',
      data: {
        layout: 'list',
        items: [
          { id: 'a', prompt: 'Le dispositif qui fait vibrer l’air dans la flûte à bec (comme un sifflet) est le ___', accepted: ['biseau'] },
          { id: 'b', prompt: 'La fine languette de bois qui vibre pour produire le son de la clarinette ou du saxophone est une anche ___', accepted: ['simple'] },
          { id: 'c', prompt: 'Le basson et le hautbois utilisent une anche ___ (deux languettes qui vibrent l’une contre l’autre)', accepted: ['double'] },
          { id: 'd', prompt: "Chez les cuivres, la partie où l'on pose les lèvres pour produire le son s'appelle l'___", accepted: ['embouchure'] },
        ],
      },
    },
    {
      id: id(7),
      number: 7,
      title: 'Anche simple ou anche double ?',
      instructions: 'Associe chaque instrument de la famille des bois à son mode de vibration.',
      engine: 'matching',
      data: {
        pairs: [
          { left: 'Clarinette', right: 'Anche simple' },
          { left: 'Saxophone', right: 'Anche simple' },
          { left: 'Hautbois', right: 'Anche double' },
          { left: 'Basson', right: 'Anche double' },
          { left: 'Flûte traversière', right: 'Sans anche (biseau)' },
        ],
      },
    },
    {
      id: id(8),
      number: 8,
      title: 'Bois ou cuivre ?',
      instructions: 'Écoute chaque extrait et indique la famille de l’instrument.',
      engine: 'mcq',
      data: {
        items: [
          { question: 'Extrait 1', media: { type: 'video', src: '/media/10h/instruments-a-vent/bois/flute-alto-solo.mp4', audioOnly: true }, options: ['Bois', 'Cuivre'], correctIndex: 0 },
          { question: 'Extrait 2', media: { type: 'video', src: '/media/10h/instruments-a-vent/cuivres/cor-et-accompagnement.mp4', audioOnly: true }, options: ['Bois', 'Cuivre'], correctIndex: 1 },
          { question: 'Extrait 3', media: { type: 'video', src: '/media/10h/instruments-a-vent/bois-anche-simple/clarinette-sib.mp4', audioOnly: true }, options: ['Bois', 'Cuivre'], correctIndex: 0 },
          { question: 'Extrait 4', media: { type: 'video', src: '/media/10h/instruments-a-vent/cuivres/tuba-et-accompagnement.mp4', audioOnly: true }, options: ['Bois', 'Cuivre'], correctIndex: 1 },
          { question: 'Extrait 5', media: { type: 'video', src: '/media/10h/instruments-a-vent/bois-anche-simple/saxophone-alto-solo.mp4', audioOnly: true }, options: ['Bois', 'Cuivre'], correctIndex: 0 },
          { question: 'Extrait 6', media: { type: 'video', src: '/media/10h/instruments-a-vent/cuivres/cornet-et-accompagnement.mp4', audioOnly: true }, options: ['Bois', 'Cuivre'], correctIndex: 1 },
          { question: 'Extrait 7', media: { type: 'video', src: '/media/10h/instruments-a-vent/bois-anche-double/basson-solo.mp4', audioOnly: true }, options: ['Bois', 'Cuivre'], correctIndex: 0 },
          { question: 'Extrait 8', media: { type: 'video', src: '/media/10h/instruments-a-vent/cuivres/trombone-et-accompagnement.mp4', audioOnly: true }, options: ['Bois', 'Cuivre'], correctIndex: 1 },
        ],
      },
    },
    {
      id: id(9),
      number: 9,
      title: 'Évaluation récapitulative',
      instructions: 'Réponds à ces 12 questions pour vérifier ce que tu as retenu sur les instruments à vent.',
      engine: 'mcq',
      data: {
        items: [
          { question: 'Le dispositif qui fait vibrer l’air dans la flûte à bec s’appelle le...', options: ['Biseau', 'Anche', 'Embouchure'], correctIndex: 0 },
          { question: 'La clarinette et le saxophone utilisent une anche...', options: ['Simple', 'Double', 'Triple'], correctIndex: 0 },
          { question: 'Le basson et le hautbois utilisent une anche...', options: ['Simple', 'Double', 'Triple'], correctIndex: 1 },
          { question: 'Chez les cuivres, la partie où l’on pose les lèvres s’appelle l’...', options: ['Embouchure', 'Anche', 'Biseau'], correctIndex: 0 },
          { question: 'Le cor des Alpes appartient à la famille des...', options: ['Bois', 'Cuivres'], correctIndex: 1 },
          { question: 'Le basson appartient à la famille des...', options: ['Bois', 'Cuivres'], correctIndex: 0 },
          { question: 'La trompette appartient à la famille des...', options: ['Bois', 'Cuivres'], correctIndex: 1 },
          { question: 'Malgré son nom et son métal, le saxophone est classé parmi les...', options: ['Bois', 'Cuivres'], correctIndex: 0 },
          { question: 'Plus une colonne d’air est longue, plus le son produit est...', options: ['Grave', 'Aigu'], correctIndex: 0 },
          { question: 'Le son se propage dans l’air sous forme de...', options: ['Ondes', 'Particules solides', 'Lumière'], correctIndex: 0 },
          { question: 'La flûte traversière produit son son grâce à un(e)...', options: ['Biseau', 'Anche simple', 'Anche double'], correctIndex: 0 },
          { question: 'Quelle famille produit son son sans anche ni embouchure, mais grâce à un biseau ?', options: ['Les flûtes', 'Les cuivres', 'Les anches doubles'], correctIndex: 0 },
        ],
      },
    },
  ],
};

export default theme;

import type { ThemeContent } from '../../types';

const GRADE = '9h';
const SLUG = 'developpement-auditif';
const id = (n: number) => `${GRADE}-${SLUG}-${n}`;

const theme: ThemeContent = {
  grade: GRADE,
  slug: SLUG,
  title: 'Développement auditif',
  description: "Lecture de notes, dictées mélodiques et repérage des éléments de la partition, de la clé de sol à la dictée en do majeur.",
  colorVar: '--color-9h',
  icon: '👂',
  interactive: true,
  intro:
    "La musique s'écrit avec des notes disposées sur une portée, dont la position indique la hauteur du son : plus une note est basse sur la portée, plus elle est grave à l'oreille. Selon l'instrument ou la voix concernés, on utilise différentes clés (sol, ut, fa) qui situent la même portée à des hauteurs différentes. Ce thème développe l'oreille musicale à travers la lecture, l'écriture et la dictée de mélodies dans la gamme de do majeur.",
  heroImage: '/images/themes/9h-developpement-auditif.svg',
  sections: [],
  exercises: [
    {
      id: id(1),
      number: 1,
      title: 'Monter puis redescendre',
      instructions: 'Écoute chaque mélodie et indique si elle monte ou si elle descend.',
      engine: 'mcq',
      data: {
        items: [
          { question: 'Mélodie 1', synth: ['do4', 'mi4', 'sol4', 'do5'], options: ['Elle monte', 'Elle descend'], correctIndex: 0 },
          { question: 'Mélodie 2', synth: ['do5', 'sol4', 'mi4', 'do4'], options: ['Elle monte', 'Elle descend'], correctIndex: 1 },
          { question: 'Mélodie 3', synth: ['sol4', 'fa4', 'mi4', 're4', 'do4'], options: ['Elle monte', 'Elle descend'], correctIndex: 1 },
          { question: 'Mélodie 4', synth: ['do4', 're4', 'mi4', 'fa4', 'sol4'], options: ['Elle monte', 'Elle descend'], correctIndex: 0 },
        ],
      },
    },
    {
      id: id(2),
      number: 2,
      title: 'En reconnaissance',
      instructions: 'Écoute chaque enchaînement de notes (do, mi, sol) et retrouve l’ordre exact.',
      engine: 'mcq',
      data: {
        items: [
          { question: 'Enchaînement 1', synth: ['do4', 'mi4', 'sol4'], options: ['Do - Mi - Sol', 'Sol - Mi - Do', 'Do - Sol - Mi'], correctIndex: 0 },
          { question: 'Enchaînement 2', synth: ['sol4', 'mi4', 'do4'], options: ['Do - Mi - Sol', 'Sol - Mi - Do', 'Do - Sol - Mi'], correctIndex: 1 },
          { question: 'Enchaînement 3', synth: ['do4', 'sol4', 'mi4'], options: ['Do - Mi - Sol', 'Sol - Mi - Do', 'Do - Sol - Mi'], correctIndex: 2 },
        ],
      },
    },
    {
      id: id(3),
      number: 3,
      title: 'Relevés de mélodies au piano',
      instructions:
        'Écoute les quatre extraits suivants et essaie de reproduire la mélodie (le thème) sur le clavier de piano virtuel ci-dessous.',
      engine: 'piano-along',
      data: {
        items: [
          { label: 'James Bond', media: { type: 'audio', src: '/media/9h/developpement-auditif/releves-de-melodies-au-xylo/james-bond-simple.mp3' } },
          { label: 'Jurassic Park', media: { type: 'audio', src: '/media/9h/developpement-auditif/releves-de-melodies-au-xylo/jurassic-park-simple.mp3' } },
          { label: 'Peppa Pig', media: { type: 'audio', src: '/media/9h/developpement-auditif/releves-de-melodies-au-xylo/peppapig-simple.mp3' } },
          { label: 'Pirates', media: { type: 'audio', src: '/media/9h/developpement-auditif/releves-de-melodies-au-xylo/pirates-simple.mp3' } },
        ],
      },
    },
    {
      id: id(4),
      number: 4,
      title: 'La gamme de do majeur',
      instructions: 'Réponds à ces questions sur la gamme de do majeur.',
      engine: 'mcq',
      data: {
        items: [
          {
            question: 'Combien de notes différentes compte la gamme de do majeur ?',
            options: ['5', '7', '8'],
            correctIndex: 1,
          },
          {
            question: 'Dans la gamme de do majeur, quelle est la note la plus grave ?',
            options: ['Do', 'Sol', 'Si'],
            correctIndex: 0,
          },
        ],
      },
    },
    {
      id: id(5),
      number: 5,
      title: 'Lecture de notes',
      instructions: 'Observe la note et indique son nom.',
      engine: 'note-read',
      data: {
        count: 10,
        minStep: -4,
        maxStep: 9,
      },
    },
    {
      id: id(6),
      number: 6,
      title: 'Évaluation récapitulative',
      instructions: 'Complète cette évaluation récapitulative sur la portée, la gamme et la lecture de notes.',
      engine: 'fill-blank',
      data: {
        layout: 'list',
        items: [
          { id: 'a', prompt: 'Une suite de 7 notes ordonnées du grave à l’aigu forme une ___', accepted: ['gamme'] },
          { id: 'b', prompt: 'Les 5 lignes et 4 interlignes sur lesquelles on écrit la musique forment la ___', accepted: ['portée'] },
          { id: 'c', prompt: 'Le symbole placé en début de portée qui indique quelle note correspond à quelle ligne est la ___', accepted: ['clé', 'cle'] },
          { id: 'd', prompt: 'Le nombre de notes différentes dans la gamme de do majeur est : ___', accepted: ['7', 'sept'] },
          { id: 'e', prompt: 'Dans la gamme de do majeur, la note la plus grave est : ___', accepted: ['do'] },
          { id: 'f', prompt: 'La clé la plus utilisée pour les voix aiguës et de nombreux instruments (violon, flûte…) est la clé de ___', accepted: ['sol'] },
          { id: 'g', prompt: 'La clé de sol s’enroule autour de la ___ ligne de la portée', accepted: ['2e', '2ème', 'deuxième'] },
          { id: 'h', prompt: 'Le nombre de notes différentes dans le langage musical occidental (avant de répéter à l’octave) est : ___', accepted: ['7', 'sept'] },
          { id: 'i', prompt: 'La note juste après Si (à l’octave supérieure) est : ___', accepted: ['do'] },
          { id: 'j', prompt: 'Une mélodie qui monte progressivement d’un degré à l’autre va vers l’___', accepted: ['aigu'] },
          { id: 'k', prompt: 'Dans la gamme de do majeur, la note juste avant Sol est : ___', accepted: ['fa'] },
          { id: 'l', prompt: 'Dans la gamme de do majeur, la note juste après Ré est : ___', accepted: ['mi'] },
        ],
      },
    },
  ],
};

export default theme;

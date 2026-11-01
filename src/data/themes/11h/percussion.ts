import type { ThemeContent } from '../../types';
import { mediaSections } from '../../media-manifest.generated';

const GRADE = '11h';
const SLUG = 'percussion';
const id = (n: number) => `${GRADE}-${SLUG}-${n}`;

const theme: ThemeContent = {
  grade: GRADE,
  slug: SLUG,
  title: 'La percussion',
  description: 'Classification, histoire et diversité des instruments de percussion, des timbales à la batterie.',
  colorVar: '--color-11h',
  icon: '🥁',
  interactive: true,
  intro:
    "Les percussions se classent selon la nature de leur son, déterminé (une note précise) ou indéterminé (un bruit), mais aussi selon leur mode de jeu : peaux, claviers ou accessoires, ces derniers se répartissant entre métaux et bois. Venus de tous les continents, ces instruments racontent des histoires très différentes, du hang suisse inventé en 1976 aux timbales utilisées depuis le Moyen-Âge pour donner des ordres aux soldats. Ce thème explore cette grande diversité, jusqu'à la batterie qui réunit plusieurs catégories en un seul instrument.",
  heroImage: '/images/themes/11h-percussion.svg',
  sections: mediaSections['11h/percussion'] ?? [],
  exercises: [
    {
      id: id(1),
      number: 1,
      title: 'Les instruments à claviers',
      instructions: 'Regarde chaque extrait et identifie l’instrument à clavier.',
      engine: 'mcq',
      data: {
        items: [
          { question: 'Quel est cet instrument ?', media: { type: 'video', src: '/media/11h/percussion/instruments-a-claviers/glockenspiel.mp4' }, options: ['Glockenspiel', 'Xylophone', 'Célesta'], correctIndex: 0 },
          { question: 'Quel est cet instrument ?', media: { type: 'video', src: '/media/11h/percussion/instruments-a-claviers/marimba-solo.mp4' }, options: ['Marimba', 'Vibraphone', 'Xylophone'], correctIndex: 0 },
          { question: 'Quel est cet instrument ?', media: { type: 'video', src: '/media/11h/percussion/instruments-a-claviers/vibraphone-solo.mp4' }, options: ['Xylophone', 'Vibraphone', 'Marimba'], correctIndex: 1 },
          { question: 'Quel est cet instrument ?', media: { type: 'video', src: '/media/11h/percussion/instruments-a-claviers/celesta.mp4' }, options: ['Célesta', 'Glockenspiel', 'Piano'], correctIndex: 0 },
          { question: 'Quel est cet instrument ?', media: { type: 'video', src: '/media/11h/percussion/instruments-a-claviers/xylophone-et-accompagnement.mp4' }, options: ['Xylophone', 'Marimba', 'Glockenspiel'], correctIndex: 0 },
        ],
      },
    },
    {
      id: id(2),
      number: 2,
      title: 'Son déterminé ou indéterminé ?',
      instructions: 'Écoute chaque extrait et indique si le son entendu est déterminé ou indéterminé.',
      engine: 'mcq',
      data: {
        items: [
          { question: 'Extrait 1', media: { type: 'video', src: '/media/11h/percussion/instruments-a-peaux-sons-determines/timbales-solo.mp4' }, options: ['Déterminé', 'Indéterminé'], correctIndex: 0 },
          { question: 'Extrait 2', media: { type: 'video', src: '/media/11h/percussion/instruments-a-peaux-sons-indetermines/caisse-claire-solo.mp4' }, options: ['Déterminé', 'Indéterminé'], correctIndex: 1 },
          { question: 'Extrait 3', media: { type: 'video', src: '/media/11h/percussion/instruments-a-claviers/marimba-solo.mp4' }, options: ['Déterminé', 'Indéterminé'], correctIndex: 0 },
          { question: 'Extrait 4', media: { type: 'video', src: '/media/11h/percussion/idiophones-sons-indetermines/triangle-solo.mp4' }, options: ['Déterminé', 'Indéterminé'], correctIndex: 1 },
          { question: 'Extrait 5', media: { type: 'video', src: '/media/11h/percussion/idiophones-sons-determines/hang-solo.mp4' }, options: ['Déterminé', 'Indéterminé'], correctIndex: 0 },
          { question: 'Extrait 6', media: { type: 'video', src: '/media/11h/percussion/instruments-a-peaux-sons-indetermines/grosse-caisse-solo.mp4' }, options: ['Déterminé', 'Indéterminé'], correctIndex: 1 },
        ],
      },
    },
    {
      id: id(3),
      number: 3,
      title: 'Présentation des timbales',
      instructions: 'Regarde la vidéo puis réponds à ces questions sur les timbales.',
      engine: 'mcq',
      data: {
        media: { type: 'video', src: '/media/11h/percussion/presentations-des-instruments/presentation-des-timbales.mp4' },
        items: [
          { question: 'Les timbales sont-elles un instrument à son déterminé ou indéterminé ?', options: ['Déterminé', 'Indéterminé'], correctIndex: 0 },
          { question: 'À quelle famille de percussions appartiennent les timbales ?', options: ['Membranophones', 'Idiophones', 'Cordophones'], correctIndex: 0 },
          { question: 'Historiquement, à quoi servaient les timbales au Moyen Âge ?', options: ['À donner des ordres aux soldats', 'À accompagner les mariages', 'À sonner les heures dans les églises'], correctIndex: 0 },
          { question: 'Dans un orchestre symphonique, combien de timbales utilise-t-on généralement en même temps ?', options: ['Une seule', 'Deux à quatre', 'Dix ou plus'], correctIndex: 1 },
          { question: 'Comment un·e timbalier·ère peut-il·elle changer la hauteur d’une timbale ?', options: ['En changeant de baguette', 'En tendant ou détendant la peau', 'En changeant la taille de l’instrument'], correctIndex: 1 },
        ],
      },
    },
    {
      id: id(4),
      number: 4,
      title: 'Membranophone ou idiophone ?',
      instructions: 'Associe chaque instrument à sa famille de percussion.',
      engine: 'matching',
      data: {
        pairs: [
          { left: 'Timbales', right: 'Membranophone (peau)' },
          { left: 'Caisse claire', right: 'Membranophone (peau)' },
          { left: 'Marimba', right: 'Idiophone (clavier)' },
          { left: 'Triangle', right: 'Idiophone (accessoire métal)' },
          { left: 'Claves', right: 'Idiophone (accessoire bois)' },
          { left: 'Steel Drum', right: 'Idiophone (métal)' },
        ],
      },
    },
    {
      id: id(5),
      number: 5,
      title: 'La fierté suisse',
      instructions: 'Regarde et écoute le hang, puis réponds à ces questions sur son histoire.',
      engine: 'mcq',
      data: {
        media: { type: 'video', src: '/media/11h/percussion/idiophones-sons-determines/hang-solo.mp4' },
        items: [
          { question: 'Le hang a été inventé en Suisse dans quelle décennie ?', options: ['Dans les années 1970', 'Dans les années 1990', 'Dans les années 2000'], correctIndex: 0 },
          { question: "De quel instrument le hang s'inspire-t-il ?", options: ['Le steel drum des Caraïbes', 'Le gamelan indonésien', 'Le tambourin arabe'], correctIndex: 0 },
          { question: 'Le hang appartient à la famille des :', options: ['Idiophones', 'Membranophones', 'Cordophones'], correctIndex: 0 },
        ],
      },
    },
    {
      id: id(6),
      number: 6,
      title: 'Blind test des percussions',
      instructions: 'Écoute chaque extrait (son uniquement) et reconnais l’instrument de percussion.',
      engine: 'mcq',
      data: {
        items: [
          { question: 'Extrait 1', media: { type: 'video', src: '/media/11h/percussion/instruments-a-peaux-sons-determines/timbales-solo.mp4', audioOnly: true }, options: ['Timbales', 'Grosse caisse', 'Congas'], correctIndex: 0 },
          { question: 'Extrait 2', media: { type: 'video', src: '/media/11h/percussion/instruments-a-peaux-sons-indetermines/caisse-claire-solo.mp4', audioOnly: true }, options: ['Toms', 'Caisse claire', 'Grosse caisse'], correctIndex: 1 },
          { question: 'Extrait 3', media: { type: 'video', src: '/media/11h/percussion/instruments-a-peaux-sons-indetermines/grosse-caisse-solo.mp4', audioOnly: true }, options: ['Grosse caisse', 'Timbales', 'Caisse claire'], correctIndex: 0 },
          { question: 'Extrait 4', media: { type: 'video', src: '/media/11h/percussion/instruments-a-claviers/glockenspiel.mp4', audioOnly: true }, options: ['Xylophone', 'Glockenspiel', 'Célesta'], correctIndex: 1 },
          { question: 'Extrait 5', media: { type: 'video', src: '/media/11h/percussion/instruments-a-claviers/marimba-solo.mp4', audioOnly: true }, options: ['Marimba', 'Xylophone', 'Vibraphone'], correctIndex: 0 },
          { question: 'Extrait 6', media: { type: 'video', src: '/media/11h/percussion/instruments-a-claviers/vibraphone-solo.mp4', audioOnly: true }, options: ['Vibraphone', 'Marimba', 'Glockenspiel'], correctIndex: 0 },
          { question: 'Extrait 7', media: { type: 'video', src: '/media/11h/percussion/idiophones-sons-indetermines/triangle-solo.mp4', audioOnly: true }, options: ['Triangle', 'Wood Block', 'Tam'], correctIndex: 0 },
          { question: 'Extrait 8', media: { type: 'video', src: '/media/11h/percussion/idiophones-sons-indetermines/claves-solo.mp4', audioOnly: true }, options: ['Claves', 'Wood Block', 'Maracas'], correctIndex: 0 },
          { question: 'Extrait 9', media: { type: 'video', src: '/media/11h/percussion/idiophones-sons-indetermines/maracas-solo.mp4', audioOnly: true }, options: ['Grelots', 'Maracas', 'Claves'], correctIndex: 1 },
          { question: 'Extrait 10', media: { type: 'video', src: '/media/11h/percussion/idiophones-sons-determines/steel-drum-solo.mp4', audioOnly: true }, options: ['Hang', 'Steel Drum', 'Cloches tubulaires'], correctIndex: 1 },
        ],
      },
    },
    {
      id: id(7),
      number: 7,
      title: 'La batterie',
      instructions: 'Complète les définitions des éléments de la batterie.',
      engine: 'fill-blank',
      data: {
        layout: 'list',
        items: [
          { id: 'a', prompt: "L'élément le plus grave de la batterie, actionné au pied, s'appelle la ___", accepted: ['grosse caisse'] },
          { id: 'b', prompt: 'Le tambour central, souvent muni d’un timbre métallique, s’appelle la ___', accepted: ['caisse claire'] },
          { id: 'c', prompt: 'Les disques de métal frappés avec des baguettes s’appellent des ___', accepted: ['cymbales'] },
          { id: 'd', prompt: 'Les petits tambours accordés situés autour de la batterie s’appellent des ___', accepted: ['toms'] },
        ],
      },
    },
    {
      id: id(8),
      number: 8,
      title: 'Vocabulaire',
      instructions: 'Complète ces définitions liées à la classification des percussions.',
      engine: 'fill-blank',
      data: {
        layout: 'list',
        items: [
          { id: 'a', prompt: "Un instrument de percussion dont le son est produit par une peau tendue s'appelle un ___", accepted: ['membranophone'] },
          { id: 'b', prompt: "Un instrument de percussion dont le son est produit par le corps même de l'instrument (bois, métal) s'appelle un ___", accepted: ['idiophone'] },
          { id: 'c', prompt: 'Un son qui correspond à une note précise et identifiable est un son ___', accepted: ['déterminé', 'determine'] },
          { id: 'd', prompt: "Un son qui ne correspond à aucune hauteur précise est un son ___", accepted: ['indéterminé', 'indetermine'] },
        ],
      },
    },
    {
      id: id(9),
      number: 9,
      title: 'Évaluation récapitulative',
      instructions: 'Réponds à ces 12 questions pour vérifier ce que tu as retenu sur les percussions.',
      engine: 'mcq',
      data: {
        items: [
          { question: 'Un instrument dont le son est produit par une peau tendue s’appelle un...', options: ['Membranophone', 'Idiophone', 'Cordophone'], correctIndex: 0 },
          { question: 'Un instrument dont le son est produit par le corps même de l’instrument s’appelle un...', options: ['Membranophone', 'Idiophone', 'Cordophone'], correctIndex: 1 },
          { question: 'Un son qui correspond à une note précise est un son...', options: ['Déterminé', 'Indéterminé', 'Neutre'], correctIndex: 0 },
          { question: 'Un son sans hauteur précise est un son...', options: ['Déterminé', 'Indéterminé', 'Neutre'], correctIndex: 1 },
          { question: 'Le marimba appartient à la famille des...', options: ['Membranophones', 'Idiophones (clavier)', 'Cordophones'], correctIndex: 1 },
          { question: 'Les timbales appartiennent à la famille des...', options: ['Membranophones', 'Idiophones', 'Cordophones'], correctIndex: 0 },
          { question: 'Le hang a été inventé dans quel pays ?', options: ['La Suisse', 'Les Caraïbes', 'L’Indonésie'], correctIndex: 0 },
          { question: 'Le hang s’inspire de quel instrument ?', options: ['Le gamelan', 'Le steel drum', 'Le tambourin'], correctIndex: 1 },
          { question: 'Historiquement, les timbales servaient à...', options: ['Donner des ordres aux soldats', 'Accompagner les mariages', 'Sonner les heures'], correctIndex: 0 },
          { question: 'L’élément le plus grave de la batterie, actionné au pied, s’appelle la...', options: ['Caisse claire', 'Grosse caisse', 'Cymbale'], correctIndex: 1 },
          { question: 'Les disques de métal frappés à la batterie s’appellent des...', options: ['Toms', 'Cymbales', 'Congas'], correctIndex: 1 },
          { question: 'Le triangle appartient à la famille des...', options: ['Membranophones', 'Idiophones (accessoire métal)', 'Cordophones'], correctIndex: 1 },
        ],
      },
    },
  ],
};

export default theme;

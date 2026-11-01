import type { ThemeContent } from '../../types';
import { mediaSections } from '../../media-manifest.generated';

const GRADE = '9h';
const SLUG = 'cordes';
const id = (n: number) => `${GRADE}-${SLUG}-${n}`;

const theme: ThemeContent = {
  grade: GRADE,
  slug: SLUG,
  title: 'Les instruments à cordes',
  description: 'Cordes frottées, pincées et frappées : du violon au piano, en passant par la guitare et la harpe.',
  colorVar: '--color-9h',
  icon: '🎻',
  interactive: true,
  intro:
    "Les instruments à cordes se distinguent selon la façon dont on les fait vibrer : en les frottant (violon, violoncelle...), en les pinçant (guitare, harpe...) ou en les frappant (piano et instruments apparentés comme le cymbalum). Ce thème explore leur histoire, leur facture et leur place dans l'orchestre symphonique, du célèbre violon Stradivarius à l'évolution du piano moderne.",
  heroImage: '/images/themes/9h-cordes.svg',
  sections: mediaSections['9h/cordes'] ?? [],
  exercises: [
    {
      id: id(1),
      number: 1,
      title: 'Touché, coulé',
      instructions: 'Associe chaque instrument à cordes à sa catégorie : frottées, pincées ou frappées.',
      engine: 'matching',
      data: {
        pairs: [
          { left: 'Violon', right: 'Cordes frottées' },
          { left: 'Violoncelle', right: 'Cordes frottées' },
          { left: 'Contrebasse', right: 'Cordes frottées' },
          { left: 'Guitare classique', right: 'Cordes pincées' },
          { left: 'Harpe', right: 'Cordes pincées' },
          { left: 'Banjo', right: 'Cordes pincées' },
          { left: 'Piano', right: 'Cordes frappées' },
          { left: 'Cymbalum', right: 'Cordes frappées' },
        ],
      },
    },
    {
      id: id(2),
      number: 2,
      title: 'Qui est qui ?',
      instructions: "Écoute chaque extrait et identifie l'instrument à cordes frottées entendu.",
      engine: 'mcq',
      data: {
        items: [
          {
            question: 'Extrait 1',
            media: { type: 'video', src: '/media/9h/cordes/instruments-a-cordes-frottees/violon.mp4', audioOnly: true },
            options: ['Violon', 'Alto', 'Violoncelle', 'Contrebasse'],
            correctIndex: 0,
          },
          {
            question: 'Extrait 2',
            media: { type: 'video', src: '/media/9h/cordes/instruments-a-cordes-frottees/alto.mp4', audioOnly: true },
            options: ['Violon', 'Alto', 'Violoncelle', 'Contrebasse'],
            correctIndex: 1,
          },
          {
            question: 'Extrait 3',
            media: { type: 'video', src: '/media/9h/cordes/instruments-a-cordes-frottees/violoncelle.mp4', audioOnly: true },
            options: ['Violon', 'Alto', 'Violoncelle', 'Contrebasse'],
            correctIndex: 2,
          },
          {
            question: 'Extrait 4',
            media: { type: 'video', src: '/media/9h/cordes/instruments-a-cordes-frottees/contrebasse.mp4', audioOnly: true },
            options: ['Violon', 'Alto', 'Violoncelle', 'Contrebasse'],
            correctIndex: 3,
          },
          {
            question: 'Extrait 5 (instrument pas encore présenté)',
            media: { type: 'video', src: '/media/9h/cordes/instruments-a-cordes-frottees/erhu-chine.mp4', audioOnly: true },
            options: ['Erhu (Chine)', 'Vielle à roue', 'Violon', 'Guitare'],
            correctIndex: 0,
          },
          {
            question: 'Extrait 6 (instrument pas encore présenté)',
            media: { type: 'video', src: '/media/9h/cordes/instruments-a-cordes-frottees/vielle-a-roue-moyen-age.mp4', audioOnly: true },
            options: ['Erhu (Chine)', 'Vielle à roue', 'Violon', 'Guitare'],
            correctIndex: 1,
          },
        ],
      },
    },
    {
      id: id(3),
      number: 3,
      title: "Facteur d'instrument",
      instructions: 'Regarde la vidéo puis complète le vocabulaire de la facture du violon.',
      engine: 'fill-blank',
      data: {
        layout: 'list',
        media: { type: 'video', src: '/media/9h/cordes/exercices/anatomie-du-violon.mp4' },
        items: [
          { id: 'a', prompt: 'La pièce sur laquelle reposent les cordes et qui transmet leurs vibrations à la caisse : le ___', accepted: ['chevalet'] },
          { id: 'b', prompt: 'Les deux ouvertures en forme de « f » sur la table d’harmonie : les ___', accepted: ['ouïes'] },
          { id: 'c', prompt: "La pièce de bois à l'intérieur de la caisse qui relie la table et le fond : l'___", accepted: ['âme', 'ame'] },
          { id: 'd', prompt: 'La pièce sur laquelle on appuie les doigts pour changer la hauteur des notes : la ___', accepted: ['touche'] },
          { id: 'e', prompt: 'La petite pièce près du chevillier qui guide les cordes : le ___', accepted: ['sillet'] },
          { id: 'f', prompt: 'La pièce qui fixe les cordes côté mentonnière : le ___', accepted: ['cordier'] },
        ],
      },
    },
    {
      id: id(4),
      number: 4,
      title: "Qu'est-ce qui pince ?",
      instructions: 'Écoute chaque extrait et identifie l’instrument à cordes pincées entendu.',
      engine: 'mcq',
      data: {
        items: [
          {
            question: 'Extrait 1',
            media: { type: 'video', src: '/media/9h/cordes/instruments-a-cordes-pincees/guitare-classique.mp4', audioOnly: true },
            options: ['Guitare classique', 'Harpe', 'Banjo', 'Clavecin'],
            correctIndex: 0,
          },
          {
            question: 'Extrait 2',
            media: { type: 'video', src: '/media/9h/cordes/instruments-a-cordes-pincees/harpe-debussy-clair-de-lune.mp4', audioOnly: true },
            options: ['Guitare classique', 'Harpe', 'Banjo', 'Clavecin'],
            correctIndex: 1,
          },
          {
            question: 'Extrait 3',
            media: { type: 'video', src: '/media/9h/cordes/instruments-a-cordes-pincees/bonjo-nord-americain.mp4', audioOnly: true },
            options: ['Guitare classique', 'Harpe', 'Banjo', 'Clavecin'],
            correctIndex: 2,
          },
          {
            question: 'Extrait 4',
            media: { type: 'video', src: '/media/9h/cordes/instruments-a-cordes-pincees/clavecin-rameau-les-sauvages.mp4', audioOnly: true },
            options: ['Guitare classique', 'Harpe', 'Banjo', 'Clavecin'],
            correctIndex: 3,
          },
          {
            question: 'Extrait 5',
            media: { type: 'video', src: '/media/9h/cordes/instruments-a-cordes-pincees/koto-japon.mp4', audioOnly: true },
            options: ['Koto (Japon)', 'Balalaïka (Russie)', 'Cifteli (Kosovo)', 'Guitare basse'],
            correctIndex: 0,
          },
          {
            question: 'Extrait 6',
            media: { type: 'video', src: '/media/9h/cordes/instruments-a-cordes-pincees/balalaika-russie.mp4', audioOnly: true },
            options: ['Koto (Japon)', 'Balalaïka (Russie)', 'Cifteli (Kosovo)', 'Guitare basse'],
            correctIndex: 1,
          },
        ],
      },
    },
    {
      id: id(5),
      number: 5,
      title: 'Stradivarius',
      instructions: 'Que sais-tu sur Antonio Stradivari et ses violons ?',
      engine: 'mcq',
      data: {
        items: [
          {
            question: 'Dans quel pays et à quelle époque Antonio Stradivari a-t-il fabriqué ses instruments ?',
            options: ['En Italie, aux XVIIe-XVIIIe siècles', 'En Allemagne, au XIXe siècle', 'En France, au XXe siècle'],
            correctIndex: 0,
          },
          {
            question: 'Combien de violons Stradivarius existe-t-il encore approximativement de nos jours ?',
            options: ['Environ 50', 'Environ 650', 'Environ 5000'],
            correctIndex: 1,
          },
          {
            question: "Pourquoi les violons Stradivarius sont-ils considérés comme exceptionnels sur le plan sonore ?",
            options: [
              'Le choix du bois, le vernis et les proportions précises leur donnent une sonorité unique',
              "Ils sont fabriqués avec des cordes en métal précieux",
              "Ils sont plus grands que les violons modernes",
            ],
            correctIndex: 0,
          },
          {
            question: "Quel est approximativement le prix actuel d'un violon Stradivarius authentique ?",
            options: ['Quelques milliers de francs', 'Quelques dizaines de milliers de francs', 'Plusieurs millions de francs'],
            correctIndex: 2,
          },
        ],
      },
    },
    {
      id: id(6),
      number: 6,
      title: 'Claviers',
      instructions: 'Écoute chaque extrait et identifie cet instrument à cordes frappées.',
      engine: 'mcq',
      data: {
        items: [
          {
            question: 'Extrait 1',
            media: { type: 'video', src: '/media/9h/cordes/instruments-a-cordes-frappees/piano-seul.mp4', audioOnly: true },
            options: ['Piano', 'Cymbalum', 'Hackbrett', 'Berimbau'],
            correctIndex: 0,
          },
          {
            question: 'Extrait 2',
            media: { type: 'video', src: '/media/9h/cordes/instruments-a-cordes-frappees/cymbalum-roumanie.mp4', audioOnly: true },
            options: ['Piano', 'Cymbalum', 'Hackbrett', 'Berimbau'],
            correctIndex: 1,
          },
          {
            question: 'Extrait 3',
            media: { type: 'video', src: '/media/9h/cordes/instruments-a-cordes-frappees/hackbrett-sailor-s-dance.mp4', audioOnly: true },
            options: ['Piano', 'Cymbalum', 'Hackbrett', 'Berimbau'],
            correctIndex: 2,
          },
          {
            question: 'Extrait 4',
            media: { type: 'video', src: '/media/9h/cordes/instruments-a-cordes-frappees/berimbau-bresil.mp4', audioOnly: true },
            options: ['Piano', 'Cymbalum', 'Hackbrett', 'Berimbau'],
            correctIndex: 3,
          },
          {
            question: 'Extrait 5 : piano ancien ou moderne ?',
            media: { type: 'video', src: '/media/9h/cordes/instruments-a-cordes-frappees/pianoforte-mozart.mp4', audioOnly: true },
            options: ['Pianoforte (ancêtre du piano)', 'Piano moderne', 'Clavicorde'],
            correctIndex: 0,
          },
        ],
      },
    },
    {
      id: id(7),
      number: 7,
      title: 'Histoire de la musique',
      instructions: "Regarde la vidéo sur l'histoire du piano puis réponds aux questions.",
      engine: 'mcq',
      data: {
        media: { type: 'video', src: '/media/9h/cordes/instruments-a-cordes-frappees-presentation-d-instruments/petite-histoire-du-piano.mp4' },
        items: [
          {
            question: 'Quels sont les principaux ancêtres du piano ?',
            options: ['Le clavecin et le clavicorde', 'La guitare et le violon', 'Le xylophone et le tambour'],
            correctIndex: 0,
          },
          {
            question: 'Pourquoi le piano s’appelle-t-il à l’origine « pianoforte » ?',
            options: [
              "Parce qu'il peut jouer à la fois doucement (piano) et fort (forte), contrairement au clavecin",
              "Parce qu'il a été inventé en Italie par un certain Piano",
              "Parce qu'il ne peut jouer que doucement",
            ],
            correctIndex: 0,
          },
          {
            question: 'Quelle est la principale limite du clavecin par rapport au piano ?',
            options: [
              'Il pince toujours les cordes avec la même force, sans nuances possibles',
              "Il n'a pas de cordes du tout",
              'Il est plus grand que le piano',
            ],
            correctIndex: 0,
          },
        ],
      },
    },
    {
      id: id(8),
      number: 8,
      title: 'Être complètement marteau',
      instructions: 'Regarde le mécanisme du piano en action puis réponds aux questions.',
      engine: 'mcq',
      data: {
        media: { type: 'video', src: '/media/9h/cordes/instruments-a-cordes-frappees/fonctionnement-du-piano.mp4' },
        items: [
          {
            question: "Quand on appuie sur une touche, qu'est-ce qui vient frapper la corde ?",
            options: ['Un marteau', 'Un plectre', 'Un archet'],
            correctIndex: 0,
          },
          {
            question: 'Que fait la pédale de droite (forte) ?',
            options: [
              'Elle lève les étouffoirs pour laisser les cordes résonner plus longtemps',
              'Elle coupe complètement le son',
              'Elle transpose toutes les notes',
            ],
            correctIndex: 0,
          },
        ],
      },
    },
    {
      id: id(9),
      number: 9,
      title: "T'y crois ?",
      instructions: "Regarde la vidéo puis indique si ces affirmations sur le piano sont vraies ou fausses.",
      engine: 'true-false',
      data: {
        media: { type: 'video', src: '/media/9h/cordes/instruments-a-cordes-frappees-presentation-d-instruments/piano-documentaire.mp4' },
        items: [
          { statement: 'Un piano comporte plusieurs milliers de pièces.', correct: true },
          { statement: 'Toutes les cordes du piano ont la même longueur.', correct: false },
          { statement: "Un piano peut peser plusieurs centaines de kilos.", correct: true },
          { statement: 'Un piano bien entretenu peut durer plus de 50 ans.', correct: true },
          { statement: 'Les touches du piano ont toujours été fabriquées en plastique.', correct: false },
        ],
      },
    },
    {
      id: id(10),
      number: 10,
      title: 'Évaluation récapitulative',
      instructions: 'Réponds à ces 24 questions pour vérifier ce que tu as retenu sur les instruments à cordes.',
      engine: 'mcq',
      data: {
        items: [
          { question: 'Le violon appartient à la famille des cordes...', options: ['Frottées', 'Pincées', 'Frappées'], correctIndex: 0 },
          { question: "L'alto appartient à la famille des cordes...", options: ['Frottées', 'Pincées', 'Frappées'], correctIndex: 0 },
          { question: 'Le violoncelle appartient à la famille des cordes...', options: ['Frottées', 'Pincées', 'Frappées'], correctIndex: 0 },
          { question: 'La contrebasse appartient à la famille des cordes...', options: ['Frottées', 'Pincées', 'Frappées'], correctIndex: 0 },
          { question: 'La guitare appartient à la famille des cordes...', options: ['Frottées', 'Pincées', 'Frappées'], correctIndex: 1 },
          { question: 'La harpe appartient à la famille des cordes...', options: ['Frottées', 'Pincées', 'Frappées'], correctIndex: 1 },
          { question: 'Le banjo appartient à la famille des cordes...', options: ['Frottées', 'Pincées', 'Frappées'], correctIndex: 1 },
          { question: 'Le piano appartient à la famille des cordes...', options: ['Frottées', 'Pincées', 'Frappées'], correctIndex: 2 },
          { question: 'Le cymbalum appartient à la famille des cordes...', options: ['Frottées', 'Pincées', 'Frappées'], correctIndex: 2 },
          { question: 'Quel est le nom de la pièce sur laquelle reposent les cordes du violon et qui transmet leurs vibrations à la caisse ?', options: ['Le chevalet', 'Le sillet', 'Le cordier'], correctIndex: 0 },
          { question: 'Comment appelle-t-on les deux ouvertures en forme de « f » sur la table d’harmonie du violon ?', options: ['Les ouïes', 'Les âmes', 'Les touches'], correctIndex: 0 },
          { question: "Quelle pièce de bois à l'intérieur de la caisse du violon relie la table et le fond ?", options: ['Le chevalet', "L'âme", 'Le sillet'], correctIndex: 1 },
          { question: 'Comment appelle-t-on la pièce sur laquelle on appuie les doigts pour changer la hauteur des notes ?', options: ['La touche', 'Le chevalet', 'Le cordier'], correctIndex: 0 },
          { question: 'Dans quel pays et à quelle époque Antonio Stradivari a-t-il fabriqué ses instruments ?', options: ['En Italie, aux XVIIe-XVIIIe siècles', 'En Allemagne, au XIXe siècle', 'En France, au XXe siècle'], correctIndex: 0 },
          { question: 'Combien de violons Stradivarius existe-t-il encore approximativement de nos jours ?', options: ['Environ 50', 'Environ 650', 'Environ 5000'], correctIndex: 1 },
          { question: "Quel est approximativement le prix actuel d'un violon Stradivarius authentique ?", options: ['Quelques milliers de francs', 'Quelques dizaines de milliers de francs', 'Plusieurs millions de francs'], correctIndex: 2 },
          { question: 'Quels sont les principaux ancêtres du piano ?', options: ['Le clavecin et le clavicorde', 'La guitare et le violon', 'Le xylophone et le tambour'], correctIndex: 0 },
          { question: 'Pourquoi le piano s’appelle-t-il à l’origine « pianoforte » ?', options: ["Parce qu'il peut jouer doucement (piano) et fort (forte), contrairement au clavecin", "Parce qu'il a été inventé par un certain Piano", "Parce qu'il ne peut jouer que doucement"], correctIndex: 0 },
          { question: 'Quelle est la principale limite du clavecin par rapport au piano ?', options: ['Il pince toujours les cordes avec la même force, sans nuances possibles', "Il n'a pas de cordes du tout", 'Il est plus grand que le piano'], correctIndex: 0 },
          { question: "Quand on appuie sur une touche de piano, qu'est-ce qui vient frapper la corde ?", options: ['Un marteau', 'Un plectre', 'Un archet'], correctIndex: 0 },
          { question: 'Que fait la pédale de droite (forte) du piano ?', options: ['Elle lève les étouffoirs pour laisser les cordes résonner plus longtemps', 'Elle coupe complètement le son', 'Elle transpose toutes les notes'], correctIndex: 0 },
          { question: 'Un piano comporte plusieurs milliers de pièces : vrai ou faux ?', options: ['Vrai', 'Faux'], correctIndex: 0 },
          { question: 'Toutes les cordes du piano ont la même longueur : vrai ou faux ?', options: ['Vrai', 'Faux'], correctIndex: 1 },
          { question: 'Un piano peut peser plusieurs centaines de kilos : vrai ou faux ?', options: ['Vrai', 'Faux'], correctIndex: 0 },
        ],
      },
    },
  ],
};

export default theme;

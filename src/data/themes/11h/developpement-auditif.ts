import type { ThemeContent } from '../../types';

const GRADE = '11h';
const SLUG = 'developpement-auditif';
const id = (n: number) => `${GRADE}-${SLUG}-${n}`;

const theme: ThemeContent = {
  grade: GRADE,
  slug: SLUG,
  title: 'Développement auditif',
  description: "Intervalles, polyphonie et dictées mélodiques pour affiner l'oreille musicale.",
  colorVar: '--color-11h',
  icon: '👂',
  interactive: true,
  intro:
    "Un intervalle est l'espacement entre deux notes, mesuré en tons et demi-tons, de la prime à l'octave. Chanter à des intervalles différents permet de créer des polyphonies, comme dans le canon de « Frère Jacques » ou le célèbre Canon de Pachelbel. Ce thème développe la reconnaissance des intervalles à l'oreille, notamment à l'aide de mélodies connues servant de repère, ainsi que la pratique du chant à plusieurs voix.",
  heroImage: '/images/themes/11h-developpement-auditif.svg',
  sections: [],
  exercises: [
    {
      id: id(1),
      number: 1,
      title: 'Vocabulaire',
      instructions: 'Complète ces définitions liées aux intervalles et à la polyphonie.',
      engine: 'fill-blank',
      data: {
        layout: 'list',
        items: [
          { id: 'a', prompt: "L'espacement entre deux notes, mesuré en tons et demi-tons, s'appelle un ___", accepted: ['intervalle'] },
          { id: 'b', prompt: 'Une pièce où la même mélodie est chantée par plusieurs voix qui commencent à des moments différents est un ___', accepted: ['canon'] },
          { id: 'c', prompt: 'Le fait que plusieurs voix chantent ou jouent des parties différentes en même temps s’appelle la ___', accepted: ['polyphonie'] },
          { id: 'd', prompt: 'Un intervalle entre deux notes identiques (même hauteur) s’appelle un ___', accepted: ['unisson'] },
        ],
      },
    },
    {
      id: id(2),
      number: 2,
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
      id: id(3),
      number: 3,
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
    {
      id: id(4),
      number: 4,
      title: 'Reconnaître les intervalles',
      instructions: 'Écoute chaque intervalle (à partir du Do) et indique son nom.',
      engine: 'mcq',
      data: {
        items: [
          { question: 'Do → Ré', synth: ['do4', 're4'], options: ['Seconde', 'Tierce', 'Quarte'], correctIndex: 0 },
          { question: 'Do → Mi', synth: ['do4', 'mi4'], options: ['Seconde', 'Tierce', 'Quinte'], correctIndex: 1 },
          { question: 'Do → Fa', synth: ['do4', 'fa4'], options: ['Tierce', 'Quarte', 'Quinte'], correctIndex: 1 },
          { question: 'Do → Sol', synth: ['do4', 'sol4'], options: ['Quarte', 'Quinte', 'Sixte'], correctIndex: 1 },
          { question: 'Do → La', synth: ['do4', 'la4'], options: ['Quinte', 'Sixte', 'Septième'], correctIndex: 1 },
          { question: 'Do → Si', synth: ['do4', 'si4'], options: ['Sixte', 'Septième', 'Octave'], correctIndex: 1 },
          { question: 'Do → Do (aigu)', synth: ['do4', 'do5'], options: ['Septième', 'Octave', 'Neuvième'], correctIndex: 1 },
        ],
      },
    },
    {
      id: id(5),
      number: 5,
      title: 'Reconnaître les intervalles (à l’oreille)',
      instructions: 'Comme dans l’exercice 2, mais cette fois les notes ne sont pas indiquées : écoute chaque intervalle et indique son nom uniquement à l’oreille.',
      engine: 'mcq',
      data: {
        items: [
          { question: 'Intervalle 1', synth: ['do4', 're4'], options: ['Seconde', 'Tierce', 'Quarte'], correctIndex: 0 },
          { question: 'Intervalle 2', synth: ['do4', 'mi4'], options: ['Seconde', 'Tierce', 'Quinte'], correctIndex: 1 },
          { question: 'Intervalle 3', synth: ['do4', 'fa4'], options: ['Tierce', 'Quarte', 'Quinte'], correctIndex: 1 },
          { question: 'Intervalle 4', synth: ['do4', 'sol4'], options: ['Quarte', 'Quinte', 'Sixte'], correctIndex: 1 },
          { question: 'Intervalle 5', synth: ['do4', 'la4'], options: ['Quinte', 'Sixte', 'Septième'], correctIndex: 1 },
          { question: 'Intervalle 6', synth: ['do4', 'si4'], options: ['Sixte', 'Septième', 'Octave'], correctIndex: 1 },
          { question: 'Intervalle 7', synth: ['do4', 'do5'], options: ['Septième', 'Octave', 'Neuvième'], correctIndex: 1 },
        ],
      },
    },
    {
      id: id(6),
      number: 6,
      title: "Dictée d'intervalles",
      instructions: "La note de départ t'est donnée : écoute l'intervalle joué pour trouver la deuxième note.",
      engine: 'mcq',
      data: {
        items: [
          { question: 'Note de départ : Do — quelle est la deuxième note ?', synth: ['do4', 'sol4'], options: ['Fa', 'Sol', 'La'], correctIndex: 1 },
          { question: 'Note de départ : Ré — quelle est la deuxième note ?', synth: ['re4', 'la4'], options: ['Sol', 'La', 'Si'], correctIndex: 1 },
          { question: 'Note de départ : Mi — quelle est la deuxième note ?', synth: ['mi4', 'do5'], options: ['Si', 'Do (aigu)', 'Ré (aigu)'], correctIndex: 1 },
          { question: 'Note de départ : Fa — quelle est la deuxième note ?', synth: ['fa4', 'si4'], options: ['La', 'Si', 'Do (aigu)'], correctIndex: 1 },
          { question: 'Note de départ : Sol — quelle est la deuxième note ?', synth: ['sol4', 're5'], options: ['Do (aigu)', 'Ré (aigu)', 'Mi (aigu)'], correctIndex: 1 },
        ],
      },
    },
    {
      id: id(7),
      number: 7,
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
    {
      id: id(8),
      number: 8,
      title: "Identifie l'intervalle",
      instructions: 'Écoute chaque intervalle (les deux notes jouées sont toujours différentes) et indique son nom.',
      engine: 'mcq',
      data: {
        items: [
          { question: 'Intervalle 1', synth: ['re4', 'mi4'], options: ['Seconde', 'Tierce', 'Quarte'], correctIndex: 0 },
          { question: 'Intervalle 2', synth: ['re4', 'fa4'], options: ['Seconde', 'Tierce', 'Quinte'], correctIndex: 1 },
          { question: 'Intervalle 3', synth: ['mi4', 'la4'], options: ['Tierce', 'Quarte', 'Quinte'], correctIndex: 1 },
          { question: 'Intervalle 4', synth: ['fa4', 'do5'], options: ['Quarte', 'Quinte', 'Sixte'], correctIndex: 1 },
          { question: 'Intervalle 5', synth: ['sol4', 'mi5'], options: ['Quinte', 'Sixte', 'Septième'], correctIndex: 1 },
          { question: 'Intervalle 6', synth: ['la4', 'sol5'], options: ['Sixte', 'Septième', 'Octave'], correctIndex: 1 },
          { question: 'Intervalle 7', synth: ['si4', 'si5'], options: ['Septième', 'Octave', 'Neuvième'], correctIndex: 1 },
          { question: 'Intervalle 8', synth: ['fa4', 'sol4'], options: ['Seconde', 'Tierce', 'Quarte'], correctIndex: 0 },
        ],
      },
    },
    {
      id: id(9),
      number: 9,
      title: 'Vrai ou faux ?',
      instructions: 'Le canon, la polyphonie et les intervalles : vrai ou faux ?',
      engine: 'true-false',
      data: {
        items: [
          { statement: 'Un canon est une pièce où la même mélodie est chantée par plusieurs voix qui commencent à des moments différents.', correct: true },
          { statement: '« Frère Jacques » est un exemple de canon.', correct: true },
          { statement: 'Le Canon de Pachelbel est écrit pour un seul instrument.', correct: false },
          { statement: 'Une polyphonie signifie que plusieurs voix chantent ou jouent des parties différentes en même temps.', correct: true },
          { statement: 'Un intervalle de quinte est plus petit qu’un intervalle de tierce.', correct: false },
        ],
      },
    },
    {
      id: id(10),
      number: 10,
      title: 'Évaluation récapitulative',
      instructions: 'Réponds à ces 12 questions pour vérifier ce que tu as retenu sur les intervalles et la polyphonie.',
      engine: 'mcq',
      data: {
        items: [
          { question: "L'espacement entre deux notes, mesuré en tons et demi-tons, s'appelle un...", options: ['Accord', 'Intervalle', 'Silence'], correctIndex: 1 },
          { question: 'Une pièce où la même mélodie est chantée par plusieurs voix qui commencent à des moments différents s’appelle un...', options: ['Canon', 'Concerto', 'Prélude'], correctIndex: 0 },
          { question: 'Plusieurs voix qui chantent ou jouent des parties différentes en même temps, c’est de la...', options: ['Mélodie', 'Polyphonie', 'Harmonie seule'], correctIndex: 1 },
          { question: 'Un intervalle entre deux notes identiques (même hauteur) s’appelle un(e)...', options: ['Unisson', 'Octave', 'Silence'], correctIndex: 0 },
          { question: 'L’intervalle Do → Ré s’appelle une...', options: ['Seconde', 'Tierce', 'Quarte'], correctIndex: 0 },
          { question: 'L’intervalle Do → Mi s’appelle une...', options: ['Seconde', 'Tierce', 'Quinte'], correctIndex: 1 },
          { question: 'L’intervalle Do → Sol s’appelle une...', options: ['Quarte', 'Quinte', 'Sixte'], correctIndex: 1 },
          { question: 'L’intervalle Do → Do (aigu) s’appelle une...', options: ['Septième', 'Octave', 'Neuvième'], correctIndex: 1 },
          { question: '« Frère Jacques » est un exemple de...', options: ['Canon', 'Symphonie', 'Concerto'], correctIndex: 0 },
          { question: 'Le Canon de Pachelbel est écrit pour...', options: ['Un seul instrument', 'Plusieurs instruments', 'Aucun instrument'], correctIndex: 1 },
          { question: 'Un intervalle de quinte est-il plus grand ou plus petit qu’une tierce ?', options: ['Plus grand', 'Plus petit', 'Identique'], correctIndex: 0 },
          { question: 'En comptant Do deux fois (grave et aigu), combien de notes naturelles différentes sépare une octave ?', options: ['6', '7', '8'], correctIndex: 2 },
        ],
      },
    },
  ],
};

export default theme;

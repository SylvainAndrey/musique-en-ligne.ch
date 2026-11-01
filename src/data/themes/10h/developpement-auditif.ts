import type { ThemeContent } from '../../types';

const GRADE = '10h';
const SLUG = 'developpement-auditif';
const id = (n: number) => `${GRADE}-${SLUG}-${n}`;

const theme: ThemeContent = {
  grade: GRADE,
  slug: SLUG,
  title: 'Développement auditif',
  description: 'Altérations, tonalités majeures et mineures, dictées mélodiques.',
  colorVar: '--color-10h',
  icon: '👂',
  interactive: true,
  intro:
    "Depuis Jean-Sébastien Bach et son Clavier bien tempéré, la musique occidentale se construit sur douze demi-tons égaux. Une gamme majeure suit une structure précise de tons et de demi-tons, tandis qu'une gamme mineure répartit différemment ces intervalles. Le cycle des quintes permet de visualiser les douze tonalités majeures et mineures, longtemps associées à des couleurs émotionnelles particulières. Ce thème travaille la reconnaissance des altérations, des tonalités et des mélodies à l'oreille.",
  heroImage: '/images/themes/10h-developpement-auditif.svg',
  sections: [],
  exercises: [
    {
      id: id(1),
      number: 1,
      title: 'Les altérations',
      instructions: 'Complète les définitions des trois altérations.',
      engine: 'fill-blank',
      data: {
        layout: 'list',
        items: [
          { id: 'a', prompt: "L'altération qui monte une note d'un demi-ton s'appelle un ___", accepted: ['dièse'] },
          { id: 'b', prompt: "L'altération qui baisse une note d'un demi-ton s'appelle un ___", accepted: ['bémol'] },
          { id: 'c', prompt: "L'altération qui annule un dièse ou un bémol s'appelle un ___", accepted: ['bécarre'] },
        ],
      },
    },
    {
      id: id(2),
      number: 2,
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
      id: id(3),
      number: 3,
      title: 'À la pêche aux altérations',
      instructions: 'Associe chaque note altérée à la touche du piano correspondante.',
      engine: 'matching',
      data: {
        pairs: [
          { left: 'Do dièse (Do#)', right: 'Touche noire entre Do et Ré' },
          { left: 'Fa dièse (Fa#)', right: 'Touche noire entre Fa et Sol' },
          { left: 'Si bémol (Sib)', right: 'Touche noire entre La et Si' },
          { left: 'Sol dièse (Sol#)', right: 'Touche noire entre Sol et La' },
        ],
      },
    },
    {
      id: id(4),
      number: 4,
      title: 'Relevés de mélodies au piano',
      instructions: 'Écoute les extraits suivants et essaie de reproduire la mélodie (le thème) sur le clavier de piano virtuel ci-dessous.',
      engine: 'piano-along',
      data: {
        items: [
          { label: 'James Bond — Difficile', media: { type: 'audio', src: '/media/10h/developpement-auditif/releves-de-melodies-au-xylo/james-bond-difficile.mp3' } },
          { label: 'James Bond — Simple', media: { type: 'audio', src: '/media/10h/developpement-auditif/releves-de-melodies-au-xylo/james-bond-simple.mp3' } },
          { label: 'Jurassic Park — Difficile', media: { type: 'audio', src: '/media/10h/developpement-auditif/releves-de-melodies-au-xylo/jurassic-park-difficile.mp3' } },
          { label: 'Jurassic Park — Simple', media: { type: 'audio', src: '/media/10h/developpement-auditif/releves-de-melodies-au-xylo/jurassik-park-simple.mp3' } },
          { label: 'Peppa Pig — Simple', media: { type: 'audio', src: '/media/10h/developpement-auditif/releves-de-melodies-au-xylo/peppapig-simple.mp3' } },
          { label: 'Pirates — Moyen', media: { type: 'audio', src: '/media/10h/developpement-auditif/releves-de-melodies-au-xylo/pirates-moyen.mp3' } },
        ],
      },
    },
    {
      id: id(5),
      number: 5,
      title: "Hymne à la joie",
      instructions: "Écoute chaque paire de notes du début de l'Hymne à la joie (9e symphonie de Beethoven) et indique s'il s'agit d'un ton ou d'un demi-ton.",
      engine: 'mcq',
      data: {
        items: [
          { question: 'Mi puis Fa', synth: ['mi4', 'fa4'], options: ['Un ton', 'Un demi-ton'], correctIndex: 1 },
          { question: 'Fa puis Sol', synth: ['fa4', 'sol4'], options: ['Un ton', 'Un demi-ton'], correctIndex: 0 },
          { question: 'Sol puis Fa', synth: ['sol4', 'fa4'], options: ['Un ton', 'Un demi-ton'], correctIndex: 0 },
          { question: 'Ré puis Do', synth: ['re4', 'do4'], options: ['Un ton', 'Un demi-ton'], correctIndex: 0 },
          { question: 'Do puis Ré', synth: ['do4', 're4'], options: ['Un ton', 'Un demi-ton'], correctIndex: 0 },
        ],
      },
    },
    {
      id: id(6),
      number: 6,
      title: 'Montée en gamme',
      instructions: 'Réponds à ces questions sur la gamme de sol majeur.',
      engine: 'mcq',
      data: {
        items: [
          { question: 'Quelle note de la gamme de sol majeur est altérée ?', options: ['Fa dièse', 'Do dièse', 'Si bémol'], correctIndex: 0 },
          { question: 'Entre Sol et La, y a-t-il un ton ou un demi-ton ?', options: ['Un ton', 'Un demi-ton'], correctIndex: 0 },
          { question: 'Entre Si et Do (dans cette gamme), y a-t-il un ton ou un demi-ton ?', options: ['Un ton', 'Un demi-ton'], correctIndex: 1 },
        ],
      },
    },
    {
      id: id(7),
      number: 7,
      title: 'Fa',
      instructions: 'Réponds à ces questions sur la gamme de fa majeur.',
      engine: 'mcq',
      data: {
        items: [
          { question: 'Quelle note de la gamme de fa majeur est altérée ?', options: ['Si bémol', 'Fa dièse', 'Mi bémol'], correctIndex: 0 },
          { question: 'Entre La et Si bémol, y a-t-il un ton ou un demi-ton ?', options: ['Un ton', 'Un demi-ton'], correctIndex: 1 },
          { question: 'Entre Mi et Fa (dans cette gamme), y a-t-il un ton ou un demi-ton ?', options: ['Un ton', 'Un demi-ton'], correctIndex: 1 },
        ],
      },
    },
    {
      id: id(8),
      number: 8,
      title: 'Majeur ou mineur ?',
      instructions:
        "Écoute chaque accord (joué avec ses 3 notes en même temps) et indique s'il sonne plutôt majeur (joyeux) ou mineur (triste). Les accords changent à chaque rafraîchissement de la page : tu peux t'entraîner plusieurs fois de suite.",
      engine: 'mcq',
      data: {
        chordPool: {
          count: 6,
          entries: [
            { label: 'Do majeur', chord: ['do4', 'mi4', 'sol4'], isMajor: true },
            { label: 'Fa majeur', chord: ['fa4', 'la4', 'do5'], isMajor: true },
            { label: 'Sol majeur', chord: ['sol4', 'si4', 're5'], isMajor: true },
            { label: 'Ré majeur', chord: ['re4', 'fa4#', 'la4'], isMajor: true },
            { label: 'Mi majeur', chord: ['mi4', 'sol4#', 'si4'], isMajor: true },
            { label: 'La mineur', chord: ['la4', 'do5', 'mi5'], isMajor: false },
            { label: 'Ré mineur', chord: ['re4', 'fa4', 'la4'], isMajor: false },
            { label: 'Mi mineur', chord: ['mi4', 'sol4', 'si4'], isMajor: false },
            { label: 'Sol mineur', chord: ['sol4', 'la4b', 're5'], isMajor: false },
            { label: 'Do mineur', chord: ['do4', 'mi4b', 'sol4'], isMajor: false },
          ],
        },
      },
    },
    {
      id: id(9),
      number: 9,
      title: 'Répare la gamme',
      instructions:
        "Ces sept gammes majeures (de do à si) sont affichées sans altération. Glisse les dièses ou les bémols au bon endroit, juste avant chaque note, pour reconstituer une gamme majeure correcte. Le rapport de tons et de demi-tons nécessaire pour construire une gamme majeure (1 ton, 1 ton, 1 demi-ton, 1 ton, 1 ton, 1 ton, 1 demi-ton) est indiqué en dessous de chaque portée, entre les notes.",
      engine: 'scale-fix',
      data: {
        roots: ['Do', 'Ré', 'Mi', 'Fa', 'Sol', 'La', 'Si'],
        octaveShifts: { Do: -1, Ré: -1 },
      },
    },
    {
      id: id(10),
      number: 10,
      title: 'Évaluation récapitulative',
      instructions: 'Réponds à ces 12 questions pour vérifier ce que tu as retenu sur les altérations, les gammes et les accords.',
      engine: 'mcq',
      data: {
        items: [
          { question: 'Quelle altération monte une note d’un demi-ton ?', options: ['Bémol', 'Dièse', 'Bécarre'], correctIndex: 1 },
          { question: 'Quelle altération baisse une note d’un demi-ton ?', options: ['Bémol', 'Dièse', 'Bécarre'], correctIndex: 0 },
          { question: 'Quelle altération annule un dièse ou un bémol ?', options: ['Bécarre', 'Dièse', 'Bémol'], correctIndex: 0 },
          { question: 'Do dièse et Ré bémol désignent-ils la même touche noire du piano ?', options: ['Oui', 'Non'], correctIndex: 0 },
          { question: 'Quelle note de la gamme de sol majeur est altérée ?', options: ['Fa dièse', 'Do dièse', 'Si bémol'], correctIndex: 0 },
          { question: 'Quelle note de la gamme de fa majeur est altérée ?', options: ['Si bémol', 'Fa dièse', 'Mi bémol'], correctIndex: 0 },
          { question: 'Dans la gamme de sol majeur, entre Sol et La, y a-t-il un ton ou un demi-ton ?', options: ['Un ton', 'Un demi-ton'], correctIndex: 0 },
          { question: 'Dans la gamme de sol majeur, entre Si et Do, y a-t-il un ton ou un demi-ton ?', options: ['Un ton', 'Un demi-ton'], correctIndex: 1 },
          { question: 'Une gamme majeure sonne plutôt...', options: ['Joyeuse', 'Triste', 'Neutre'], correctIndex: 0 },
          { question: 'Une gamme mineure sonne plutôt...', options: ['Joyeuse', 'Triste', 'Neutre'], correctIndex: 1 },
          { question: 'Un accord regroupe au minimum combien de notes ?', options: ['2', '3', '5'], correctIndex: 1 },
          { question: 'Jouer des notes « en accord » signifie...', options: ['Les jouer toutes en même temps', 'Les jouer l’une après l’autre', 'Les jouer très vite'], correctIndex: 0 },
        ],
      },
    },
  ],
};

export default theme;

import type { ThemeContent } from '../../types';
import { mediaSections } from '../../media-manifest.generated';

const GRADE = '10h';
const SLUG = 'musique-orchestrale';
const id = (n: number) => `${GRADE}-${SLUG}-${n}`;

const theme: ThemeContent = {
  grade: GRADE,
  slug: SLUG,
  title: 'Musique orchestrale, concerto et symphonie',
  description: "Du concerto grosso baroque aux symphonies modernes : l'histoire et les formes de la musique orchestrale.",
  colorVar: '--color-10h',
  icon: '🎻🎼',
  interactive: true,
  intro:
    "L'orchestre tel qu'on le connaît aujourd'hui s'est constitué progressivement, depuis les musiciens isolés du Moyen-Âge jusqu'aux grandes formations symphoniques. Le concerto grosso, apparu en Italie au XVIIe siècle, fait dialoguer un groupe de solistes (le concertino) avec l'ensemble des musiciens (le ripieno) ; cette forme évoluera vers le concerto de soliste puis vers la symphonie, qui prendra une ampleur toujours plus grande de Haydn à Mahler. Ce thème retrace cette évolution à travers les œuvres de Bach, Beethoven, Dvorak, Chostakovitch et Mahler.",
  heroImage: '/images/themes/10h-musique-orchestrale.svg',
  sections: mediaSections['10h/musique-orchestrale'] ?? [],
  exercises: [
    {
      id: id(1),
      number: 1,
      title: "La naissance de l'orchestre",
      instructions: 'Regarde la vidéo puis réponds à ces questions sur l’origine de l’orchestre.',
      engine: 'mcq',
      data: {
        media: { type: 'video', src: '/media/10h/musique-orchestrale/origine-de-l-orchestre/origines-de-l-orchestre.mp4' },
        items: [
          { question: "D'où vient le mot « orchestra » ?", options: ['Du grec ancien', "De l'italien", "De l'allemand"], correctIndex: 0 },
          {
            question: "Dans le théâtre grec antique, l'« orchestra » désignait :",
            options: ["L'espace entre le public et la scène, où dansait le chœur", 'La scène elle-même', 'Les gradins du public'],
            correctIndex: 0,
          },
          {
            question: 'Qui se produisait dans l’« orchestra » du théâtre grec antique ?',
            options: ['Le chœur', 'Les acteurs principaux', 'Le public'],
            correctIndex: 0,
          },
          {
            question: 'Avant la constitution de l’orchestre moderne, la musique était plutôt jouée par...',
            options: ['Des musiciens isolés ou en petits groupes', 'De grands orchestres symphoniques', 'Des orgues seuls'],
            correctIndex: 0,
          },
          {
            question: 'Quelle évolution a eu lieu à la Renaissance ?',
            options: ['Les instruments ont commencé à être regroupés en ensembles organisés', "L'orchestre a disparu", 'Le chœur a remplacé l’orchestre'],
            correctIndex: 0,
          },
        ],
      },
    },
    {
      id: id(2),
      number: 2,
      title: 'Au fil du temps',
      instructions: 'Remets les périodes musicales dans leur ordre chronologique.',
      engine: 'ordering',
      data: {
        items: ['Renaissance', 'Baroque', 'Classique', 'Romantique', 'Moderne'],
      },
    },
    {
      id: id(3),
      number: 3,
      title: 'Compositeurs et époques',
      instructions: 'Associe chaque compositeur à sa période musicale.',
      engine: 'matching',
      data: {
        pairs: [
          { left: 'Vivaldi', right: 'Baroque' },
          { left: 'Bach', right: 'Baroque' },
          { left: 'Mozart', right: 'Classique' },
          { left: 'Dvorak', right: 'Romantique' },
          { left: 'Chostakovitch', right: 'Moderne (20e siècle)' },
        ],
      },
    },
    {
      id: id(4),
      number: 4,
      title: 'Qui a composé cette œuvre ?',
      instructions: 'Écoute chaque extrait et identifie son compositeur.',
      engine: 'mcq',
      data: {
        items: [
          {
            question: 'Extrait 1',
            media: { type: 'video', src: '/media/10h/musique-orchestrale/oeuvres-orchestrales-de-concerto-et-symphonies/concerto-grosso-bach.mp4', audioOnly: true },
            options: ['Bach', 'Vivaldi', 'Haendel'],
            correctIndex: 0,
          },
          {
            question: 'Extrait 2',
            media: { type: 'video', src: '/media/10h/musique-orchestrale/oeuvres-orchestrales-de-concerto-et-symphonies/concerto-pour-violon-mendelssohn.mp4', audioOnly: true },
            options: ['Mendelssohn', 'Brahms', 'Tchaïkovski'],
            correctIndex: 0,
          },
          {
            question: 'Extrait 3',
            media: { type: 'video', src: '/media/10h/musique-orchestrale/oeuvres-orchestrales-de-concerto-et-symphonies/concerto-pour-hautbois-marcello.mp4', audioOnly: true },
            options: ['Marcello', 'Albinoni', 'Vivaldi'],
            correctIndex: 0,
          },
          {
            question: 'Extrait 4',
            media: { type: 'video', src: '/media/10h/musique-orchestrale/oeuvres-orchestrales-de-concerto-et-symphonies/symphonie-du-nouveau-monde-dvorak.mp4', audioOnly: true },
            options: ['Dvorak', 'Smetana', 'Sibelius'],
            correctIndex: 0,
          },
          {
            question: 'Extrait 5',
            media: { type: 'video', src: '/media/10h/musique-orchestrale/oeuvres-orchestrales-de-concerto-et-symphonies/schostakovitch-symphonie-7-marche-de-stalin.mp4', audioOnly: true },
            options: ['Chostakovitch', 'Prokofiev', 'Stravinsky'],
            correctIndex: 0,
          },
          {
            question: 'Extrait 6',
            media: { type: 'video', src: "/media/10h/musique-orchestrale/oeuvres-orchestrales-de-concerto-et-symphonies/beethoven-symphonie-n-9-ode-a-la-joie-ch-ur-de-radio-france.mp4", audioOnly: true },
            options: ['Beethoven', 'Brahms', 'Schubert'],
            correctIndex: 0,
          },
          {
            question: 'Extrait 7',
            media: { type: 'video', src: '/media/10h/musique-orchestrale/oeuvres-orchestrales-de-concerto-et-symphonies/mahler-s-8th-symphony-finale.mp4', audioOnly: true },
            options: ['Mahler', 'Bruckner', 'Strauss'],
            correctIndex: 0,
          },
        ],
      },
    },
    {
      id: id(5),
      number: 5,
      title: 'Vocabulaire',
      instructions: 'Complète ces définitions liées au concerto et à la symphonie.',
      engine: 'fill-blank',
      data: {
        layout: 'list',
        items: [
          { id: 'a', prompt: 'Le petit groupe de solistes qui dialogue avec l’orchestre dans un concerto grosso s’appelle le ___', accepted: ['concertino'] },
          { id: 'b', prompt: 'L’ensemble des musiciens qui répond au concertino s’appelle le ___', accepted: ['ripieno'] },
          { id: 'c', prompt: 'Une œuvre pour orchestre en plusieurs mouvements, sans soliste, s’appelle une ___', accepted: ['symphonie'] },
          { id: 'd', prompt: 'Une œuvre qui met en valeur un instrument soliste face à l’orchestre s’appelle un ___', accepted: ['concerto'] },
        ],
      },
    },
    {
      id: id(6),
      number: 6,
      title: 'Vrai ou faux ?',
      instructions: 'Le concerto grosso et la symphonie : vrai ou faux ?',
      engine: 'true-false',
      data: {
        items: [
          { statement: 'Dans un concerto grosso, le concertino est le petit groupe de solistes.', correct: true },
          { statement: "Le ripieno désigne l'orchestre complet qui répond au concertino.", correct: true },
          { statement: 'La symphonie est apparue avant le concerto grosso.', correct: false },
          { statement: "Vivaldi n'a jamais écrit de symphonie, mais de nombreux concertos.", correct: true },
          { statement: "Une cadence est un passage où le soliste joue seul, sans l'orchestre.", correct: true },
        ],
      },
    },
    {
      id: id(7),
      number: 7,
      title: 'Combien de mouvements ?',
      instructions: 'Réponds à ces questions sur le nombre de mouvements des concertos et symphonies.',
      engine: 'mcq',
      data: {
        items: [
          { question: 'Combien de mouvements compte un concerto classique typique (comme celui de Mendelssohn) ?', options: ['1', '3', '5'], correctIndex: 1 },
          { question: 'Combien de mouvements compte une symphonie classique ou romantique typique (comme celles de Beethoven ou Dvorak) ?', options: ['2', '4', '6'], correctIndex: 1 },
          { question: 'Dans un concerto en 3 mouvements, quel est généralement le tempo du mouvement central ?', options: ['Rapide', 'Lent', 'Très rapide'], correctIndex: 1 },
          { question: 'Combien de mouvements compte un concerto grosso baroque typique (comme ceux de Bach) ?', options: ['1', '3', '7'], correctIndex: 1 },
        ],
      },
    },
    {
      id: id(8),
      number: 8,
      title: 'Évaluation récapitulative',
      instructions: 'Réponds à ces 12 questions pour vérifier ce que tu as retenu sur le concerto et la symphonie.',
      engine: 'mcq',
      data: {
        items: [
          { question: 'Le petit groupe de solistes d’un concerto grosso s’appelle le...', options: ['Concertino', 'Ripieno', 'Continuo'], correctIndex: 0 },
          { question: 'L’ensemble des musiciens qui répond au concertino s’appelle le...', options: ['Concertino', 'Ripieno', 'Continuo'], correctIndex: 1 },
          { question: 'Une œuvre pour orchestre en plusieurs mouvements, sans soliste, s’appelle une...', options: ['Symphonie', 'Sonate', 'Cantate'], correctIndex: 0 },
          { question: 'Une œuvre qui met en valeur un soliste face à l’orchestre s’appelle un...', options: ['Concerto', 'Motet', 'Prélude'], correctIndex: 0 },
          { question: 'Vivaldi appartient à quelle période musicale ?', options: ['Baroque', 'Classique', 'Romantique'], correctIndex: 0 },
          { question: 'Dvorak appartient à quelle période musicale ?', options: ['Baroque', 'Romantique', 'Moderne'], correctIndex: 1 },
          { question: 'Chostakovitch appartient à quelle période musicale ?', options: ['Baroque', 'Romantique', 'Moderne (20e siècle)'], correctIndex: 2 },
          { question: 'Combien de mouvements compte un concerto classique typique ?', options: ['1', '3', '5'], correctIndex: 1 },
          { question: 'Combien de mouvements compte une symphonie romantique typique ?', options: ['2', '4', '6'], correctIndex: 1 },
          { question: "D'où vient le mot « orchestra » ?", options: ['Du grec ancien', "De l'italien", "De l'allemand"], correctIndex: 0 },
          { question: 'La symphonie est-elle apparue avant ou après le concerto grosso ?', options: ['Avant', 'Après'], correctIndex: 1 },
          { question: 'Vivaldi a-t-il écrit des symphonies ?', options: ['Oui, beaucoup', 'Non, surtout des concertos'], correctIndex: 1 },
        ],
      },
    },
  ],
};

export default theme;

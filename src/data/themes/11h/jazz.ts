import type { ThemeContent } from '../../types';

const GRADE = '11h';
const SLUG = 'jazz';
const id = (n: number) => `${GRADE}-${SLUG}-${n}`;

const theme: ThemeContent = {
  grade: GRADE,
  slug: SLUG,
  title: 'Le jazz',
  description: "Des work songs de l'esclavage aux standards du jazz moderne : histoire, styles et instruments du jazz.",
  colorVar: '--color-11h',
  icon: '🎷',
  interactive: true,
  intro:
    "Le jazz plonge ses racines dans la tragique histoire de l'esclavage aux États-Unis, entre chants de travail (work songs) chantés a cappella et musique religieuse transformée par la culture africaine (negro spiritual, gospel). De ces influences naîtront, dès 1900, le ragtime, le style New Orleans puis le swing, le bebop, le cool jazz et le jazz-rock, portés par des musiciens devenus légendaires comme Louis Armstrong, Duke Ellington ou Charlie Parker. Ce thème retrace cette histoire, ses instruments caractéristiques et la structure propre aux morceaux de jazz.",
  heroImage: '/images/themes/11h-jazz.svg',
  sections: [
    {
      title: 'Origines du jazz',
      items: [
        { title: 'Origines du jazz', type: 'video', src: '/media/11h/jazz/origines-du-jazz/origines-du-jazz.mp4' },
        { title: 'Le cakewalk', type: 'video', src: '/media/11h/jazz/origines-du-jazz-cakewalk/minstrel-cakewalk-cake-walk-dancing.mp4' },
        { title: 'Work Song', type: 'video', src: '/media/11h/jazz/work-song/work-song.mp4' },
        { title: 'Call and response', type: 'video', src: '/media/11h/jazz/call-and-response/call-and-response.mp4' },
        { title: 'Gospel — Harlem Gospel Choir, Amazing Grace', type: 'video', src: '/media/11h/jazz/gospel/harlem-gospel-choir-amazing-grace.mp4' },
      ],
    },
    {
      title: 'Styles de jazz',
      items: [
        { title: 'Ragtime — Scott Joplin, Maple Leaf Rag', type: 'video', src: '/media/11h/jazz/styles-de-jazz-1-ragtime/ragtime-maple-leaf-rag-scott-joplin.mp4' },
        { title: 'New Orleans — Louis Armstrong, When The Saints Go Marching In', type: 'video', src: '/media/11h/jazz/styles-de-jazz-2-new-orleans-dixieland/new-orleans-louis-armstrong-when-the-saints-go-marching-in.mp4' },
        { title: 'Swing — Benny Goodman, Sing, Sing, Sing', type: 'video', src: '/media/11h/jazz/styles-de-jazz-3-swing/swing-sing-sing-sing-benny-goodman.mp4' },
        { title: 'Be Bop', type: 'video', src: '/media/11h/jazz/styles-de-jazz-4-be-bop/be-bop.mp4' },
        { title: 'Cool Jazz — Miles Davis, So What', type: 'video', src: '/media/11h/jazz/styles-de-jazz-5-cool-jazz/cool-jazz-miles-davis-so-what.mp4' },
        { title: 'Jazz-Rock — Chick Corea, Spain', type: 'video', src: '/media/11h/jazz/styles-de-jazz-6-jazz-rock/jazz-rock-chick-corea-spain.mp4' },
      ],
    },
    {
      title: 'Formations de jazz',
      items: [
        { title: 'Quintette — Take The A Train', type: 'video', src: '/media/11h/jazz/formations-de-jazz-quintuor/quintette-take-the-a-train.mp4' },
        { title: 'Trio — Michel Petrucciani Trio', type: 'video', src: '/media/11h/jazz/formations-de-jazz-trio/trio-michel-petrucciani-trio.mp4' },
        { title: 'Quatuor — New Orleans Jazz Quartet, Basin St. Blues', type: 'video', src: '/media/11h/jazz/formations-de-jazz-quatuor/quatuor-new-orleans-jazz-quartet-basin-st-blues.mp4' },
        { title: "Duo — Chick Corea & Gary Burton, Armando's Rumba", type: 'video', src: "/media/11h/jazz/formations-de-jazz-duo/duo-chick-corea-et-gary-burton-armando-s-rumba.mp4" },
        { title: 'Big Band — Whiplash', type: 'video', src: '/media/11h/jazz/formations-de-jazz-big-band/big-band-whiplash.mp4' },
        { title: 'Septuor — Wynton Marsalis Septet, live à Marciac 2022', type: 'video', src: '/media/11h/jazz/formations-de-jazz-septuor/the-wynton-marsalis-septet-performing-live-at-jazz-in-marciac-2022.mp4' },
      ],
    },
    {
      title: 'Structure des morceaux de jazz et chansons',
      items: [
        { title: 'Tina Arena — Aller plus haut', type: 'video', src: '/media/11h/jazz/structure-des-morceaux-de-jazz-et-chansons-structures-de-chansons/tina-arena-aller-plus-haut.mp4' },
        { title: 'Louis Armstrong — What A Wonderful World', type: 'video', src: '/media/11h/jazz/structure-des-morceaux-de-jazz-et-chansons-structures-de-chansons/louis-armstrong-what-a-wonderful-world.mp4' },
        { title: "Louise Attaque — J't'emmène au vent", type: 'video', src: '/media/11h/jazz/structure-des-morceaux-de-jazz-et-chansons-structures-de-chansons/louise-attaque-j-t-emmene-au-vent.mp4' },
        { title: 'Dave Brubeck — Take Five', type: 'video', src: '/media/11h/jazz/structure-des-morceaux-de-jazz-et-chansons-structures-de-standards-de-jazz/dave-brubeck-take-five.mp4' },
        { title: 'Charlie Parker — Ornithology', type: 'video', src: '/media/11h/jazz/structure-des-morceaux-de-jazz-et-chansons-structures-de-standards-de-jazz/ornithology-by-charlie-parker.mp4' },
        { title: 'Bill Evans Trio — Autumn Leaves', type: 'video', src: '/media/11h/jazz/structure-des-morceaux-de-jazz-et-chansons-structures-de-standards-de-jazz/bill-evans-trio-autumn-leaves.mp4' },
        { title: 'Frank Sinatra — Fly Me To The Moon', type: 'video', src: '/media/11h/jazz/structure-des-morceaux-de-jazz-et-chansons-structures-de-standards-de-jazz/frank-sinatra-fly-me-to-the-moon.mp4' },
      ],
    },
  ],
  exercises: [
    {
      id: id(1),
      number: 1,
      title: 'Work song, call and response ou gospel ?',
      instructions: "Écoute chaque extrait (son uniquement) et identifie le type de musique afro-américaine issue de l'esclavage.",
      engine: 'mcq',
      data: {
        items: [
          {
            question: 'Extrait 1',
            media: { type: 'video', src: '/media/11h/jazz/work-song/work-song.mp4', audioOnly: true },
            options: ['Work Song', 'Call and response', 'Gospel'],
            correctIndex: 0,
          },
          {
            question: 'Extrait 2',
            media: { type: 'video', src: '/media/11h/jazz/call-and-response/call-and-response.mp4', audioOnly: true },
            options: ['Gospel', 'Call and response', 'Work Song'],
            correctIndex: 1,
          },
          {
            question: 'Extrait 3',
            media: { type: 'video', src: '/media/11h/jazz/gospel/harlem-gospel-choir-amazing-grace.mp4', audioOnly: true },
            options: ['Work Song', 'Call and response', 'Gospel'],
            correctIndex: 2,
          },
        ],
      },
    },
    {
      id: id(2),
      number: 2,
      title: 'Origines du jazz',
      instructions: 'Regarde la vidéo puis réponds à ces questions sur la naissance du jazz.',
      engine: 'mcq',
      data: {
        media: { type: 'video', src: '/media/11h/jazz/origines-du-jazz/origines-du-jazz.mp4' },
        items: [
          { question: 'Le jazz est né dans quelle région des États-Unis ?', options: ['La Nouvelle-Orléans (Louisiane)', 'New York', 'Chicago'], correctIndex: 0 },
          {
            question: 'Quels courants musicaux afro-américains ont influencé la naissance du jazz ?',
            options: ['Les work songs et le negro spiritual', 'Uniquement la musique classique européenne', 'La musique amérindienne'],
            correctIndex: 0,
          },
          { question: 'Le cakewalk, qui a influencé le ragtime, est à l’origine :', options: ['Une danse', 'Un instrument', 'Un style vestimentaire'], correctIndex: 0 },
          {
            question: 'Quelles pratiques ont transformé les chants religieux des Blancs pour donner naissance au gospel et au negro spiritual ?',
            options: ['Le call and response, les battements de mains et le changement de rythme', 'Le chant grégorien', 'La musique symphonique'],
            correctIndex: 0,
          },
          {
            question: 'Le negro spiritual et le gospel se distinguent principalement par :',
            options: ["Le negro spiritual est chanté a cappella, le gospel profite d'un accompagnement instrumental", 'Le negro spiritual est instrumental, le gospel est chanté', "Il n'y a aucune différence"],
            correctIndex: 0,
          },
          {
            question: "Ce pianiste surnommé le 'Roi du Ragtime' a ouvert la voie au jazz dès 1900 :",
            options: ['Scott Joplin', 'Louis Armstrong', 'Duke Ellington'],
            correctIndex: 0,
          },
        ],
      },
    },
    {
      id: id(3),
      number: 3,
      title: 'Les grands styles du jazz',
      instructions: "Écoute chaque extrait (son uniquement) à l'aide du portrait de l'artiste et identifie le style et le musicien.",
      engine: 'mcq',
      data: {
        items: [
          {
            question: 'Extrait 1',
            media: { type: 'video', src: '/media/11h/jazz/styles-de-jazz-1-ragtime/ragtime-maple-leaf-rag-scott-joplin.mp4', audioOnly: true },
            image: '/images/jazz-artistes/scott-joplin.png',
            imageAlt: 'Scott Joplin',
            options: ['Ragtime – Scott Joplin', 'Swing – Duke Ellington', 'Bebop – Charlie Parker'],
            correctIndex: 0,
          },
          {
            question: 'Extrait 2',
            media: { type: 'video', src: '/media/11h/jazz/styles-de-jazz-2-new-orleans-dixieland/new-orleans-louis-armstrong-when-the-saints-go-marching-in.mp4', audioOnly: true },
            image: '/images/jazz-artistes/louis-armstrong.png',
            imageAlt: 'Louis Armstrong',
            options: ['New Orleans – Louis Armstrong', 'Cool Jazz – Miles Davis', 'Jazz-rock – Chick Corea'],
            correctIndex: 0,
          },
          {
            question: 'Extrait 3',
            media: { type: 'video', src: '/media/11h/jazz/styles-de-jazz-3-swing/swing-sing-sing-sing-benny-goodman.mp4', audioOnly: true },
            image: '/images/jazz-artistes/benny-goodman.png',
            imageAlt: 'Benny Goodman',
            options: ['Swing – Benny Goodman', 'Ragtime – Scott Joplin', 'Be Bop – Charlie Parker'],
            correctIndex: 0,
          },
          {
            question: 'Extrait 4',
            media: { type: 'video', src: '/media/11h/jazz/styles-de-jazz-4-be-bop/be-bop.mp4', audioOnly: true },
            image: '/images/jazz-artistes/charlie-parker.png',
            imageAlt: 'Charlie Parker',
            options: ['Be Bop – Charlie Parker', 'Swing – Benny Goodman', 'Cool Jazz – Miles Davis'],
            correctIndex: 0,
          },
          {
            question: 'Extrait 5',
            media: { type: 'video', src: '/media/11h/jazz/styles-de-jazz-5-cool-jazz/cool-jazz-miles-davis-so-what.mp4', audioOnly: true },
            image: '/images/jazz-artistes/miles-davis.png',
            imageAlt: 'Miles Davis',
            options: ['Cool Jazz – Miles Davis', 'Swing – Benny Goodman', 'Ragtime – Scott Joplin'],
            correctIndex: 0,
          },
          {
            question: 'Extrait 6',
            media: { type: 'video', src: '/media/11h/jazz/styles-de-jazz-6-jazz-rock/jazz-rock-chick-corea-spain.mp4', audioOnly: true },
            image: '/images/jazz-artistes/chick-corea.png',
            imageAlt: 'Chick Corea',
            options: ['Jazz-rock – Chick Corea', 'Bebop – Charlie Parker', 'New Orleans – Louis Armstrong'],
            correctIndex: 0,
          },
        ],
      },
    },
    {
      id: id(4),
      number: 4,
      title: 'Les formations de jazz',
      instructions: 'Associe chaque formation à son nombre de musiciens.',
      engine: 'matching',
      data: {
        pairs: [
          { left: 'Duo', right: '2 musiciens' },
          { left: 'Trio', right: '3 musiciens' },
          { left: 'Quatuor', right: '4 musiciens' },
          { left: 'Quintette', right: '5 musiciens' },
          { left: 'Septuor', right: '7 musiciens' },
          { left: 'Big Band', right: 'De 17 à 20 musiciens' },
        ],
      },
    },
    {
      id: id(5),
      number: 5,
      title: 'Combien sont-ils ?',
      instructions: 'Écoute chaque extrait (son uniquement) et identifie la formation de jazz.',
      engine: 'mcq',
      data: {
        items: [
          { question: 'Extrait 1', media: { type: 'video', src: '/media/11h/jazz/formations-de-jazz-trio/trio-michel-petrucciani-trio.mp4', audioOnly: true }, options: ['Trio', 'Quatuor', 'Quintette'], correctIndex: 0 },
          { question: 'Extrait 2', media: { type: 'video', src: '/media/11h/jazz/formations-de-jazz-quatuor/quatuor-new-orleans-jazz-quartet-basin-st-blues.mp4', audioOnly: true }, options: ['Quatuor', 'Trio', 'Quintette'], correctIndex: 0 },
          { question: 'Extrait 3', media: { type: 'video', src: '/media/11h/jazz/formations-de-jazz-quintuor/quintette-take-the-a-train.mp4', audioOnly: true }, options: ['Quintette', 'Quatuor', 'Septuor'], correctIndex: 0 },
          { question: 'Extrait 4', media: { type: 'video', src: "/media/11h/jazz/formations-de-jazz-duo/duo-chick-corea-et-gary-burton-armando-s-rumba.mp4", audioOnly: true }, options: ['Duo', 'Trio', 'Quatuor'], correctIndex: 0 },
          { question: 'Extrait 5', media: { type: 'video', src: '/media/11h/jazz/formations-de-jazz-big-band/big-band-whiplash.mp4', audioOnly: true }, options: ['Big Band', 'Quintette', 'Septuor'], correctIndex: 0 },
        ],
      },
    },
    {
      id: id(6),
      number: 6,
      title: 'Vocabulaire',
      instructions: 'Complète ces définitions liées au vocabulaire du jazz.',
      engine: 'fill-blank',
      data: {
        layout: 'list',
        items: [
          { id: 'a', prompt: 'Une technique où un musicien "appelle" et un autre "répond" en musique s’appelle l’___', accepted: ['appel-réponse', 'appel reponse', 'call and response'] },
          { id: 'b', prompt: "Le fait de créer de la musique spontanément, sans partition écrite à l'avance, s'appelle l'___", accepted: ['improvisation'] },
          { id: 'c', prompt: 'Le léger décalage rythmique caractéristique du jazz, qui donne envie de bouger, s’appelle le ___', accepted: ['swing'] },
          { id: 'd', prompt: 'Une pièce de jazz connue et rejouée par de nombreux musiciens s’appelle un ___', accepted: ['standard'] },
        ],
      },
    },
    {
      id: id(7),
      number: 7,
      title: 'Vrai ou faux ?',
      instructions: "L'histoire du jazz : vrai ou faux ?",
      engine: 'true-false',
      data: {
        items: [
          { statement: 'Le jazz est né aux États-Unis, dans la région de la Nouvelle-Orléans.', correct: true },
          { statement: 'Louis Armstrong est une figure emblématique du style New Orleans.', correct: true },
          { statement: 'Le bebop est apparu avant le ragtime.', correct: false },
          { statement: 'Charlie Parker est associé au style bebop.', correct: true },
          { statement: 'Le jazz-rock mélange des éléments de jazz et de rock.', correct: true },
        ],
      },
    },
    {
      id: id(8),
      number: 8,
      title: 'La structure des chansons',
      instructions:
        "Une chanson se construit à partir de plusieurs éléments : l'intro (introduction instrumentale), le couplet (partie narrative qui change de paroles), le refrain (partie répétée, le plus souvent identique), le pont (partie de transition qui apporte un contraste) et l'outro (conclusion de la chanson). Écoute chaque chanson et remets ces éléments dans leur ordre d'apparition.",
      engine: 'ordering',
      data: {
        rows: [
          {
            id: 'aller-plus-haut',
            label: 'Tina Arena – Aller plus haut',
            media: { type: 'video', src: '/media/11h/jazz/structure-des-morceaux-de-jazz-et-chansons-structures-de-chansons/tina-arena-aller-plus-haut.mp4' },
            items: ['Intro', 'Couplet', 'Refrain', 'Couplet', 'Refrain', 'Pont', 'Refrain', 'Outro'],
          },
          {
            id: 'wonderful-world',
            label: 'Louis Armstrong – What A Wonderful World',
            media: { type: 'video', src: '/media/11h/jazz/structure-des-morceaux-de-jazz-et-chansons-structures-de-chansons/louis-armstrong-what-a-wonderful-world.mp4' },
            items: ['Intro', 'Couplet', 'Couplet', 'Pont', 'Couplet', 'Outro'],
          },
          {
            id: 'emmene-au-vent',
            label: "Louise Attaque – J't'emmène au vent",
            media: { type: 'video', src: '/media/11h/jazz/structure-des-morceaux-de-jazz-et-chansons-structures-de-chansons/louise-attaque-j-t-emmene-au-vent.mp4' },
            items: ['Intro', 'Couplet', 'Refrain', 'Couplet', 'Refrain', 'Couplet', 'Refrain', 'Couplet', 'Refrain', 'Pont', 'Refrain', 'Outro'],
          },
        ],
      },
    },
    {
      id: id(9),
      number: 9,
      title: 'La structure des standards de jazz',
      instructions:
        "Le début d'un standard de jazz suit généralement une logique propre : une intro (introduction instrumentale), un ou plusieurs thèmes (A, B, C — la mélodie principale et ses variantes), un pont (une transition), l'improvisation (les musiciens s'éloignent du thème pour inventer) et un outro (conclusion). Les thèmes et l'improvisation peuvent revenir plusieurs fois avant la fin du morceau. Écoute chaque standard et remets ces éléments dans leur ordre d'apparition.",
      engine: 'ordering',
      data: {
        rows: [
          {
            id: 'fly-me-to-the-moon',
            label: 'Frank Sinatra – Fly Me To The Moon',
            media: { type: 'video', src: '/media/11h/jazz/structure-des-morceaux-de-jazz-et-chansons-structures-de-standards-de-jazz/frank-sinatra-fly-me-to-the-moon.mp4' },
            items: ['Intro', 'Thème A', 'Thème A', 'Pont', 'Thème A', 'Improvisation', 'Pont', 'Thème A', 'Outro'],
          },
          {
            id: 'take-five',
            label: 'Dave Brubeck – Take Five',
            media: { type: 'video', src: '/media/11h/jazz/structure-des-morceaux-de-jazz-et-chansons-structures-de-standards-de-jazz/dave-brubeck-take-five.mp4' },
            items: ['Intro', 'Thème A', 'Thème A', 'Pont', 'Thème A', 'Improvisation', 'Improvisation', 'Pont', 'Thème A', 'Outro'],
          },
          {
            id: 'ornithology',
            label: 'Charlie Parker – Ornithology',
            media: { type: 'video', src: '/media/11h/jazz/structure-des-morceaux-de-jazz-et-chansons-structures-de-standards-de-jazz/ornithology-by-charlie-parker.mp4' },
            items: ['Intro', 'Thème A', 'Thème A', 'Pont', 'Thème A', 'Improvisation', 'Improvisation', 'Improvisation', 'Thème A', 'Thème A', 'Pont', 'Thème A', 'Outro'],
          },
          {
            id: 'autumn-leaves',
            label: 'Bill Evans Trio – Autumn Leaves',
            media: { type: 'video', src: '/media/11h/jazz/structure-des-morceaux-de-jazz-et-chansons-structures-de-standards-de-jazz/bill-evans-trio-autumn-leaves.mp4' },
            items: ['Intro', 'Thème A', 'Thème A', 'Thème B', 'Thème C', 'Improvisation', 'Improvisation', 'Thème A', 'Thème A', 'Thème B', 'Thème C', 'Outro'],
          },
        ],
      },
    },
    {
      id: id(10),
      number: 10,
      title: 'Évaluation récapitulative',
      instructions: 'Réponds à ces questions pour vérifier ce que tu as retenu sur le jazz.',
      engine: 'mcq',
      data: {
        items: [
          { question: 'Le jazz est né dans quelle région des États-Unis ?', options: ['La Nouvelle-Orléans', 'New York', 'Chicago'], correctIndex: 0 },
          { question: 'Les work songs étaient chantées :', options: ['A cappella par les esclaves', 'Avec un orchestre symphonique', 'Uniquement par des enfants'], correctIndex: 0 },
          { question: 'Le negro spiritual se chante :', options: ['A cappella', 'Avec un accompagnement instrumental complet', 'Uniquement en solo'], correctIndex: 0 },
          { question: 'Le gospel, contrairement au negro spiritual, profite :', options: ["D'un accompagnement instrumental", 'De paroles en français', "D'aucune voix"], correctIndex: 0 },
          { question: "Ce pianiste est surnommé le 'Roi du Ragtime' :", options: ['Scott Joplin', 'Louis Armstrong', 'Duke Ellington'], correctIndex: 0 },
          { question: "Ce trompettiste est célèbre pour 'When The Saints Go Marching In' :", options: ['Louis Armstrong', 'Miles Davis', 'Charlie Parker'], correctIndex: 0 },
          { question: 'Ce clarinettiste a popularisé le swing dans les années 1930 avec son big band :', options: ['Benny Goodman', 'Chick Corea', 'Scott Joplin'], correctIndex: 0 },
          { question: "Surnommé 'The Bird' en raison de ses solos rapides et techniques :", options: ['Charlie Parker', 'Miles Davis', 'Benny Goodman'], correctIndex: 0 },
          { question: 'Une salle de concert à Montreux porte le nom de ce musicien de Cool Jazz :', options: ['Miles Davis', 'Louis Armstrong', 'Scott Joplin'], correctIndex: 0 },
          { question: 'Ce musicien de jazz-rock est connu pour son duo avec le vibraphoniste Gary Burton :', options: ['Chick Corea', 'Charlie Parker', 'Benny Goodman'], correctIndex: 0 },
          { question: 'Un ensemble de jazz composé de 17 à 20 musiciens s’appelle un :', options: ['Big Band', 'Septuor', 'Quintette'], correctIndex: 0 },
          { question: 'Un ensemble de 5 musiciens s’appelle un :', options: ['Duo', 'Quintette', 'Septuor'], correctIndex: 1 },
          { question: 'Le fait de créer de la musique spontanément, sans partition, s’appelle :', options: ['L’improvisation', 'La transcription', 'L’harmonisation'], correctIndex: 0 },
          { question: 'Une pièce de jazz connue et rejouée par de nombreux musiciens s’appelle un :', options: ['Standard', 'Solo', 'Riff'], correctIndex: 0 },
          { question: 'Dans la structure d’un morceau, une partie différente insérée entre les sections s’appelle :', options: ['Un pont', 'Un standard', 'Un riff'], correctIndex: 0 },
          { question: "L'introduction d'un morceau, avant l'arrivée du thème principal, se note généralement :", options: ['Intro', 'A', 'Pont'], correctIndex: 0 },
        ],
      },
    },
  ],
};

export default theme;

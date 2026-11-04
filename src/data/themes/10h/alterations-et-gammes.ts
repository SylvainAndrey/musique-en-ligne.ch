import type { ThemeContent } from '../../types';

// Sous-thème de « Découverte du langage musical » (10H), d'après le dossier
// « 10H – Langage musical – Altérations et gammes ».
const GRADE = '10h';
const SLUG = 'alterations-et-gammes';
const id = (n: number) => `${GRADE}-${SLUG}-${n}`;
const IMG = '/images/10h-alterations-et-gammes';

/** Réponses acceptées pour une note altérée, ex. alt('Ré', '#') → « ré# », « ré dièse »… */
function alt(note: string, accidental: '#' | 'b' | 'n'): string[] {
  const n = note.toLowerCase();
  if (accidental === '#') return [`${n}#`, `${n} dièse`];
  if (accidental === 'b') return [`${n}b`, `${n} bémol`, `${n}♭`];
  return [`${n} bécarre`, `${n}♮`, `${n} naturel`];
}
const INTERVAL_OPTIONS = ['1 ton', '½ ton'];
const MAJ_MIN = ['Majeur', 'Mineur'];

const theme: ThemeContent = {
  grade: GRADE,
  slug: SLUG,
  parent: 'decouverte-du-langage-musical',
  order: 2,
  title: 'Altérations et gammes',
  description: 'Dièses, bémols et bécarres, tons et demi-tons, gammes majeures et mineures et tonalités.',
  colorVar: '--color-10h',
  icon: '♯',
  interactive: true,
  intro:
    "La musique est composée de notes qui elles-mêmes forment des gammes. Selon leur construction, elles peuvent être majeures, mineures ou modales. Une gamme est l'espacement entre deux notes du même nom séparées par une octave, par exemple de do à do ou de ré à ré. Depuis l'époque baroque, et plus précisément grâce à Jean-Sébastien Bach et son « Clavier bien tempéré », la musique est dodécaphonique, c'est-à-dire construite sur 12 demi-tons égaux. Les altérations (dièse, bémol, bécarre) permettent d'écrire ces notes intermédiaires.",
  heroImage: '/images/themes/10h-alterations-et-gammes.svg',
  sections: [],
  exercises: [
    {
      id: id(1),
      number: 1,
      title: 'Retour aux basiques',
      instructions: 'Complète le tableau avec le nom des rythmes, des silences et leur valeur (en nombre de temps).',
      engine: 'fill-blank',
      data: {
        layout: 'grid',
        large: true,
        items: [
          { id: 'ronde-nom', glyph: '𝅝', prompt: 'nom', accepted: ['ronde', 'la ronde'] },
          { id: 'ronde-val', glyph: '𝅝', prompt: 'valeur', accepted: ['4', '4 temps', 'quatre', 'quatre temps'] },
          { id: 'blanche-nom', glyph: '𝅗𝅥', prompt: 'nom', accepted: ['blanche', 'la blanche'] },
          { id: 'blanche-val', glyph: '𝅗𝅥', prompt: 'valeur', accepted: ['2', '2 temps', 'deux', 'deux temps'] },
          { id: 'noire-nom', glyph: '♩', prompt: 'nom', accepted: ['noire', 'la noire'] },
          { id: 'noire-val', glyph: '♩', prompt: 'valeur', accepted: ['1', '1 temps', 'un', 'un temps'] },
          { id: 'croche-nom', glyph: '♪', prompt: 'nom', accepted: ['croche', 'la croche'] },
          { id: 'croche-val', glyph: '♪', prompt: 'valeur', accepted: ['0.5', '0,5', '1/2', 'un demi', 'demi-temps', 'un demi-temps', '0,5 temps', '0.5 temps'] },
          { id: 'double-nom', glyph: '𝅘𝅥𝅯', prompt: 'nom', accepted: ['double croche', 'double-croche', 'la double croche', 'la double-croche'] },
          { id: 'double-val', glyph: '𝅘𝅥𝅯', prompt: 'valeur', accepted: ['0.25', '0,25', '1/4', 'un quart', 'quart de temps', 'un quart de temps', '0,25 temps', '0.25 temps'] },
          { id: 'pause-nom', glyph: '𝄻', prompt: 'nom', accepted: ['pause', 'la pause'] },
          { id: 'pause-val', glyph: '𝄻', prompt: 'valeur', accepted: ['4', '4 temps', 'quatre', 'quatre temps'] },
          { id: 'demi-pause-nom', glyph: '𝄼', prompt: 'nom', accepted: ['demi-pause', 'demi pause', 'la demi-pause'] },
          { id: 'demi-pause-val', glyph: '𝄼', prompt: 'valeur', accepted: ['2', '2 temps', 'deux', 'deux temps'] },
          { id: 'soupir-nom', glyph: '𝄽', prompt: 'nom', accepted: ['soupir', 'le soupir'] },
          { id: 'soupir-val', glyph: '𝄽', prompt: 'valeur', accepted: ['1', '1 temps', 'un', 'un temps'] },
          { id: 'demi-soupir-nom', glyph: '𝄾', prompt: 'nom', accepted: ['demi-soupir', 'demi soupir', 'le demi-soupir'] },
          { id: 'demi-soupir-val', glyph: '𝄾', prompt: 'valeur', accepted: ['0.5', '0,5', '1/2', 'un demi', 'demi-temps', 'un demi-temps', '0,5 temps', '0.5 temps'] },
          { id: 'quart-nom', glyph: '𝄿', prompt: 'nom', accepted: ['quart de soupir', 'quart-de-soupir', 'le quart de soupir'] },
          { id: 'quart-val', glyph: '𝄿', prompt: 'valeur', accepted: ['0.25', '0,25', '1/4', 'un quart', 'quart de temps', 'un quart de temps', '0,25 temps', '0.25 temps'] },
        ],
      },
    },
    {
      id: id(2),
      number: 2,
      title: 'Ça monte et ça descend',
      instructions:
        "Chaque signe de la main correspond à une note de la gamme de do (signes de Curwen-Kodály). Trouve la note de chaque signe, écoute-la puis chante-la en faisant le geste.",
      engine: 'mcq',
      data: {
        items: [
          { question: 'Signe A', image: `${IMG}/signe-sol.png`, imageAlt: 'Signe de la main A', synth: ['sol4'], options: ['Do', 'Ré', 'Mi', 'Fa', 'Sol', 'La', 'Si'], correctIndex: 4 },
          { question: 'Signe B', image: `${IMG}/signe-do.png`, imageAlt: 'Signe de la main B', synth: ['do4'], options: ['Do', 'Ré', 'Mi', 'Fa', 'Sol', 'La', 'Si'], correctIndex: 0 },
          { question: 'Signe C', image: `${IMG}/signe-mi.png`, imageAlt: 'Signe de la main C', synth: ['mi4'], options: ['Do', 'Ré', 'Mi', 'Fa', 'Sol', 'La', 'Si'], correctIndex: 2 },
          { question: 'Signe D', image: `${IMG}/signe-la.png`, imageAlt: 'Signe de la main D', synth: ['la4'], options: ['Do', 'Ré', 'Mi', 'Fa', 'Sol', 'La', 'Si'], correctIndex: 5 },
          { question: 'Signe E', image: `${IMG}/signe-re.png`, imageAlt: 'Signe de la main E', synth: ['re4'], options: ['Do', 'Ré', 'Mi', 'Fa', 'Sol', 'La', 'Si'], correctIndex: 1 },
          { question: 'Signe F', image: `${IMG}/signe-si.png`, imageAlt: 'Signe de la main F', synth: ['si4'], options: ['Do', 'Ré', 'Mi', 'Fa', 'Sol', 'La', 'Si'], correctIndex: 6 },
          { question: 'Signe G', image: `${IMG}/signe-fa.png`, imageAlt: 'Signe de la main G', synth: ['fa4'], options: ['Do', 'Ré', 'Mi', 'Fa', 'Sol', 'La', 'Si'], correctIndex: 3 },
        ],
      },
    },
    {
      id: id(3),
      number: 3,
      title: 'Aux origines de la gamme',
      instructions:
        "Le monocorde de Pythagore, la « musique des sphères » (le chant des étoiles) et le cor des Alpes : quel est leur point commun ?",
      engine: 'mcq',
      data: {
        items: [
          {
            question: 'Leur point commun :',
            options: [
              'Ce sont tous des instruments inventés en Suisse.',
              "Ils reposent tous sur les rapports naturels entre les sons (les harmoniques étudiées par Pythagore), à l'origine de nos gammes.",
              "Ils datent tous de l'époque baroque et du « Clavier bien tempéré » de Bach.",
              'Ils servent tous à battre la mesure.',
            ],
            correctIndex: 1,
          },
        ],
      },
    },
    {
      id: id(4),
      number: 4,
      title: 'Les altérations',
      instructions:
        "Écoute deux versions de « Frère Jacques » dans lesquelles on a ajouté une altération, observe ce qui change, puis déduis-en le nom et l'effet des trois altérations.",
      engine: 'composite',
      data: {
        parts: [
          {
            title: 'A) Écoute et observe',
            instructions: 'Écoute la version originale, puis les deux versions altérées. La note altérée sonne-t-elle plus aiguë ou plus grave ?',
            engine: 'mcq',
            data: {
              items: [
                { question: 'Version originale (pour comparer)', synth: ['do4', 're4', 'mi4', 'do4', 'do4', 're4', 'mi4', 'do4', 'mi4', 'fa4', 'sol4'], options: ["J'ai écouté"], correctIndex: 0 },
                { question: 'Version 1 : on a ajouté un ♯ (dièse) sur le fa', synth: ['do4', 're4', 'mi4', 'do4', 'do4', 're4', 'mi4', 'do4', 'mi4', 'fa4#', 'sol4'], options: ['Plus aiguë', 'Plus grave'], correctIndex: 0 },
                { question: 'Version 2 : on a ajouté un ♭ (bémol) sur le mi', synth: ['do4', 're4', 'mi4b', 'do4', 'do4', 're4', 'mi4b', 'do4', 'mi4b', 'fa4', 'sol4'], options: ['Plus aiguë', 'Plus grave'], correctIndex: 1 },
              ],
            },
          },
          {
            title: 'B) Comment s’appellent ces trois altérations ?',
            engine: 'fill-blank',
            data: {
              layout: 'grid',
              large: true,
              items: [
                { id: 'diese', glyph: '♯', prompt: '', accepted: ['dièse', 'le dièse', 'diese'] },
                { id: 'bemol', glyph: '♭', prompt: '', accepted: ['bémol', 'le bémol', 'bemol'] },
                { id: 'becarre', glyph: '♮', prompt: '', accepted: ['bécarre', 'le bécarre', 'becarre'] },
              ],
            },
          },
          {
            title: 'C) Quelle est leur signification ?',
            engine: 'matching',
            data: {
              largeLeft: true,
              pairs: [
                { left: '♯', right: "Élève (hausse) la note d'un demi-ton" },
                { left: '♭', right: "Abaisse la note d'un demi-ton" },
                { left: '♮', right: "Annule l'altération : la note redevient naturelle" },
              ],
            },
          },
        ],
      },
    },
    {
      id: id(5),
      number: 5,
      title: 'Les haltères à Sion',
      instructions:
        "Inscris sur la portée les notes altérées suivantes. Attention : les altérations s'écrivent avant la note (ici, elles s'affichent automatiquement à gauche de la note).",
      engine: 'staff-write',
      data: { targets: ['Do#', 'Mib', 'Sol#', 'Sib', 'Fab', 'Ré#'] },
    },
    {
      id: id(6),
      number: 6,
      title: 'À la pêche aux altérations',
      instructions:
        "Trouve la bonne touche du piano pour chaque note. Rappel : un dièse monte d'un demi-ton (la touche juste à droite), un bémol descend d'un demi-ton (la touche juste à gauche). Attention, entre mi et fa et entre si et do, il n'y a pas de touche noire !",
      engine: 'piano-find',
      data: { targets: ['Mi#', 'Mib', 'Lab', 'Sib', 'Sol#', 'Fab'] },
    },
    {
      id: id(7),
      number: 7,
      title: 'Qui est-ce ?',
      instructions:
        "Voici deux extraits de partitions connues. Donne le nom de toutes les notes possédant une altération (dans l'ordre où elles apparaissent), ainsi que le titre du morceau.",
      engine: 'composite',
      data: {
        parts: [
          {
            title: 'Extrait A',
            engine: 'fill-blank',
            data: {
              layout: 'list',
              image: `${IMG}/lettre-a-elise.png`,
              imageAlt: 'Extrait de partition A',
              items: [
                { id: 'a1', prompt: '1re note altérée', accepted: alt('Ré', '#') },
                { id: 'a2', prompt: '2e note altérée', accepted: alt('Ré', 'n') },
                { id: 'a3', prompt: '3e note altérée', accepted: alt('Sol', '#') },
                { id: 'a-titre', prompt: 'Titre du morceau', accepted: ['lettre à élise', 'la lettre à élise', 'für elise', 'fur elise', 'pour élise', 'lettre à élise de beethoven'] },
              ],
            },
          },
          {
            title: 'Extrait B',
            engine: 'fill-blank',
            data: {
              layout: 'list',
              image: `${IMG}/vol-du-bourdon.png`,
              imageAlt: 'Extrait de partition B',
              items: [
                { id: 'b1', prompt: '1re note altérée', accepted: alt('Ré', '#') },
                { id: 'b2', prompt: '2e note altérée', accepted: alt('Ré', 'n') },
                { id: 'b3', prompt: '3e note altérée', accepted: alt('Do', '#') },
                { id: 'b4', prompt: '4e note altérée', accepted: alt('Do', 'n') },
                { id: 'b-titre', prompt: 'Titre du morceau', accepted: ['le vol du bourdon', 'vol du bourdon'] },
              ],
            },
          },
        ],
      },
    },
    {
      id: id(8),
      number: 8,
      title: 'Les dents de la mère',
      instructions:
        "A) Écoute le motif du leitmotiv du film « Les Dents de la mer ». B) Aux instruments, cherche les deux notes qui permettent de le reproduire. C) Trouve encore deux autres possibilités : l'une avec un dièse et l'autre avec un bémol.",
      engine: 'mcq',
      data: {
        items: [
          { question: 'A-B) Quelles sont les deux notes du motif ?', synth: ['mi3', 'fa3', 'mi3', 'fa3', 'mi3', 'fa3', 'mi3', 'fa3'], options: ['Do – Ré', 'Mi – Fa', 'Fa – Sol', 'La – Si'], correctIndex: 1 },
          { question: 'C) Une autre possibilité avec un dièse :', options: ['Do♯ – Ré', 'Do – Ré♯', 'Fa♯ – La', 'Sol♯ – Si'], correctIndex: 0 },
          { question: 'C) Une autre possibilité avec un bémol :', options: ['Si♭ – Do', 'La – Si♭', 'Mi♭ – Fa', 'La♭ – Si♭'], correctIndex: 1 },
        ],
      },
    },
    {
      id: id(9),
      number: 9,
      title: 'Triste ou joyeux ?',
      lesson: [
        "Une gamme majeure répond à une structure très précise : des tons partout, sauf entre la 3e et la 4e note ainsi qu'entre la 7e et la 8e note, qui sont séparées par des demi-tons. Voici par exemple la gamme de do majeur.",
        "Les gammes mineures répondent à une logique semblable, à la différence que l'agencement des tons et des demi-tons est différent, comme dans la gamme de la mineur. À l'oreille, le majeur sonne souvent joyeux et lumineux, le mineur plus triste ou plus sombre.",
      ],
      images: [
        { src: `${IMG}/structure-gamme-majeure.png`, alt: 'Gamme de do majeur avec ses tons et demi-tons', caption: 'Do majeur' },
        { src: `${IMG}/structure-gamme-mineure.png`, alt: 'Gamme de la mineur avec ses tons et demi-tons', caption: 'La mineur' },
      ],
      instructions:
        "Écoute ces débuts de mélodies célèbres du répertoire symphonique (jouées ici au synthétiseur). Indique s'il s'agit d'une tonalité majeure ou mineure.",
      engine: 'mcq',
      data: {
        items: [
          { question: 'Extrait A', synth: ['mi4', 'mi4', 'fa4', 'sol4', 'sol4', 'fa4', 'mi4', 're4', 'do4', 'do4', 're4', 'mi4', 'mi4', 're4', 're4'], options: MAJ_MIN, correctIndex: 0 },
          { question: 'Extrait B', synth: ['sol4', 'sol4', 'sol4', 'mi4b', 'fa4', 'fa4', 'fa4', 're4'], options: MAJ_MIN, correctIndex: 1 },
          { question: 'Extrait C', synth: ['mi4b', 're4', 're4', 'mi4b', 're4', 're4', 'mi4b', 're4', 're4', 'si4b'], options: MAJ_MIN, correctIndex: 1 },
          { question: 'Extrait D', synth: ['sol4', 're4', 'sol4', 're4', 'sol4', 're4', 'sol4', 'si4', 're5'], options: MAJ_MIN, correctIndex: 0 },
          { question: 'Extrait E', synth: ['si3', 'do4#', 're4', 'mi4', 'fa4#', 're4', 'fa4#'], options: MAJ_MIN, correctIndex: 1 },
          { question: 'Extrait F', synth: ['mi4', 'sol4', 'sol4', 'mi4', 're4', 'do4', 're4', 'mi4', 'sol4', 'mi4', 're4'], options: MAJ_MIN, correctIndex: 0 },
        ],
      },
    },
    {
      id: id(10),
      number: 10,
      title: 'Frère Jacques change d’humeur',
      instructions: 'Voici deux versions du canon « Frère Jacques ». Laquelle est en majeur et laquelle est en mineur ?',
      engine: 'mcq',
      data: {
        items: [
          { question: 'Version 1', synth: ['do4', 're4', 'mi4b', 'do4', 'do4', 're4', 'mi4b', 'do4', 'mi4b', 'fa4', 'sol4'], options: MAJ_MIN, correctIndex: 1 },
          { question: 'Version 2', synth: ['do4', 're4', 'mi4', 'do4', 'do4', 're4', 'mi4', 'do4', 'mi4', 'fa4', 'sol4'], options: MAJ_MIN, correctIndex: 0 },
        ],
      },
    },
    {
      id: id(11),
      number: 11,
      title: 'Hymne à la joie',
      instructions:
        "Voici le début de l'« Hymne à la joie », tiré de la 9e symphonie de Beethoven (4e mouvement), devenu l'hymne européen. Indique si l'intervalle entre les notes est un ton ou un demi-ton. Aide-toi du clavier.",
      images: [
        { src: `${IMG}/hymne-a-la-joie.png`, alt: "Partition du début de l'Hymne à la joie, en sol majeur" },
        { src: `${IMG}/clavier-tons-demi-tons.png`, alt: 'Clavier de piano avec les tons et demi-tons entre les notes' },
      ],
      engine: 'mcq',
      data: {
        items: [
          { question: 'Si → Do', synth: ['si4', 'do5'], options: INTERVAL_OPTIONS, correctIndex: 1 },
          { question: 'Do → Ré', synth: ['do5', 're5'], options: INTERVAL_OPTIONS, correctIndex: 0 },
          { question: 'Ré → Do', synth: ['re5', 'do5'], options: INTERVAL_OPTIONS, correctIndex: 0 },
          { question: 'Do → Si', synth: ['do5', 'si4'], options: INTERVAL_OPTIONS, correctIndex: 1 },
          { question: 'Si → La', synth: ['si4', 'la4'], options: INTERVAL_OPTIONS, correctIndex: 0 },
          { question: 'La → Sol', synth: ['la4', 'sol4'], options: INTERVAL_OPTIONS, correctIndex: 0 },
          { question: 'Sol → La', synth: ['sol4', 'la4'], options: INTERVAL_OPTIONS, correctIndex: 0 },
          { question: 'La → Si', synth: ['la4', 'si4'], options: INTERVAL_OPTIONS, correctIndex: 0 },
        ],
      },
    },
    {
      id: id(12),
      number: 12,
      title: 'Montée en gamme',
      instructions: 'Voici une gamme de sol majeur. Indique les intervalles entre les notes : 1 ton ou ½ ton ?',
      images: [{ src: `${IMG}/gamme-de-sol-majeur.png`, alt: 'Gamme de sol majeur sur la portée, avec un fa dièse à la clé' }],
      engine: 'mcq',
      data: {
        items: [
          { question: 'Sol → La', synth: ['sol4', 'la4'], options: INTERVAL_OPTIONS, correctIndex: 0 },
          { question: 'La → Si', synth: ['la4', 'si4'], options: INTERVAL_OPTIONS, correctIndex: 0 },
          { question: 'Si → Do', synth: ['si4', 'do5'], options: INTERVAL_OPTIONS, correctIndex: 1 },
          { question: 'Do → Ré', synth: ['do4', 're4'], options: INTERVAL_OPTIONS, correctIndex: 0 },
          { question: 'Ré → Mi', synth: ['re4', 'mi4'], options: INTERVAL_OPTIONS, correctIndex: 0 },
          { question: 'Mi → Fa♯', synth: ['mi4', 'fa4#'], options: INTERVAL_OPTIONS, correctIndex: 0 },
          { question: 'Fa♯ → Sol', synth: ['fa4#', 'sol4'], options: INTERVAL_OPTIONS, correctIndex: 1 },
        ],
      },
    },
    {
      id: id(13),
      number: 13,
      title: 'Fa',
      instructions:
        "Construis la gamme de fa majeur en respectant la structure de la gamme majeure (1 ton – 1 ton – ½ ton – 1 ton – 1 ton – 1 ton – ½ ton) : glisse l'altération nécessaire devant la bonne note. Aide-toi de la gamme de do majeur et du clavier ci-dessous.",
      images: [{ src: `${IMG}/aide-gamme-de-do-majeur.png`, alt: 'Gamme de do majeur avec ses tons et demi-tons, et clavier de piano' }],
      engine: 'scale-fix',
      data: { roots: ['Fa'] },
    },
    {
      id: id(14),
      number: 14,
      title: 'La tonalité',
      lesson: [
        "Chaque gamme correspond à une tonalité. C'est pourquoi les altérations sont notées au début de chaque portée afin de constituer l'armure. Puisqu'il y a 12 notes, il existe 12 tonalités majeures et 12 tonalités mineures.",
        "De l'époque baroque (1600) jusqu'à la fin du romantisme (peu avant 1900), les tonalités sont liées à des émotions : mi majeur serait brillante et noble, do mineur représenterait le désespoir absolu, et fa majeur est souvent associée à la nature, comme dans la Symphonie n° 6 « Pastorale » de Beethoven. Le cycle des quintes permet de faire apparaître les 12 tonalités.",
      ],
      images: [{ src: `${IMG}/cycle-des-quintes.png`, alt: 'Cycle des quintes avec les 12 tonalités majeures et mineures et leurs armures' }],
      instructions: "Indique la tonalité (majeure) des extraits musicaux suivants. Regarde bien l'armure et aide-toi du cycle des quintes.",
      engine: 'mcq',
      data: {
        items: [
          { question: 'Extrait 1', image: `${IMG}/hymne-a-la-joie.png`, imageAlt: 'Extrait 1', imageWide: true, options: ['Do majeur', 'Sol majeur', 'Fa majeur', 'La♭ majeur'], correctIndex: 1 },
          { question: 'Extrait 2', image: `${IMG}/tonalite-extrait-2.png`, imageAlt: 'Extrait 2', imageWide: true, options: ['Do majeur', 'Sol majeur', 'Fa majeur', 'La♭ majeur'], correctIndex: 0 },
          { question: 'Extrait 3', image: `${IMG}/tonalite-extrait-3.png`, imageAlt: 'Extrait 3', imageWide: true, options: ['Do majeur', 'Sol majeur', 'La♭ majeur', 'Ré♭ majeur'], correctIndex: 3 },
        ],
      },
    },

    // --- Révision pour le test, sur le modèle de l'exercice n° 15 du dossier ---
    {
      id: id(15),
      number: 15,
      title: 'Révision',
      instructions: 'Révise pour le test : réalise chaque consigne et vérifie tes réponses au fur et à mesure.',
      engine: 'composite',
      data: {
        parts: [
          {
            title: 'A) Nomme ces 3 altérations (3 points)',
            engine: 'fill-blank',
            data: {
              layout: 'grid',
              large: true,
              items: [
                { id: 'r-bemol', glyph: '♭', prompt: '1)', accepted: ['bémol', 'le bémol', 'bemol'] },
                { id: 'r-becarre', glyph: '♮', prompt: '2)', accepted: ['bécarre', 'le bécarre', 'becarre'] },
                { id: 'r-diese', glyph: '♯', prompt: '3)', accepted: ['dièse', 'le dièse', 'diese'] },
              ],
            },
          },
          {
            title: 'B) Écris 4 notes différentes de ton choix : 2 avec un dièse, 2 avec un bémol (4 points)',
            engine: 'staff-write',
            data: { free: { count: 4, sharps: 2, flats: 2 } },
          },
          {
            title: 'C) Trouve la touche du clavier correspondant à chaque note (4 points)',
            engine: 'piano-find',
            data: { targets: ['Do#', 'Fab', 'La#', 'Réb'], showLabels: true },
          },
          {
            title: 'D) En do majeur, entre quelles notes y a-t-il un demi-ton ? (2 points)',
            instructions: 'Écris les deux paires de notes, par exemple « do et ré ».',
            engine: 'fill-blank',
            data: {
              layout: 'list',
              items: [
                { id: 'r-demi-1', prompt: '1re paire', accepted: ['mi et fa', 'mi fa', 'mi-fa', 'fa et mi', 'mi a fa'] },
                { id: 'r-demi-2', prompt: '2e paire', accepted: ['si et do', 'si do', 'si-do', 'do et si', 'si a do'] },
              ],
            },
          },
          {
            title: 'E) Y a-t-il 1 ton ou ½ ton entre les notes suivantes ? (3 points)',
            engine: 'mcq',
            data: {
              items: [
                { question: '1) Do → Ré', synth: ['do4', 're4'], options: INTERVAL_OPTIONS, correctIndex: 0 },
                { question: '2) Mi → Fa', synth: ['mi4', 'fa4'], options: INTERVAL_OPTIONS, correctIndex: 1 },
                { question: '3) La → Si', synth: ['la4', 'si4'], options: INTERVAL_OPTIONS, correctIndex: 0 },
              ],
            },
          },
        ],
      },
    },
  ],
};

export default theme;

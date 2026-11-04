export type Grade = '9h' | '10h' | '11h';

export interface MediaItem {
  title: string;
  type: 'video' | 'audio';
  /** chemin relatif sous /media/, ex: "9h/chant/oeuvres-vocales/gjeilo-northern-lights.mp4" */
  src: string;
}

export interface MediaSection {
  title: string;
  items: MediaItem[];
}

export type ExerciseEngine =
  | 'fill-blank'
  | 'practice-tool'
  | 'tap-tempo'
  | 'click-target'
  | 'listen-meter'
  | 'rhythm-fill'
  | 'mcq'
  | 'true-false'
  | 'matching'
  | 'ordering'
  | 'piano-along'
  | 'note-read'
  | 'scale-fix'
  | 'composite'
  | 'iframe-game'
  | 'staff-write'
  | 'piano-find'
  | 'placeholder';

export interface ExerciseDef {
  id: string;
  number: number;
  title: string;
  instructions: string;
  engine: ExerciseEngine;
  data?: Record<string, unknown>;
  /** Paragraphes d'explication (leçon) affichés avant la consigne. */
  lesson?: string[];
  /** Images d'aide (partition, schéma…) affichées sous la consigne, avant l'exercice. */
  images?: { src: string; alt: string; caption?: string }[];
}

export interface ThemeMeta {
  grade: Grade;
  slug: string;
  /** Slug du thème parent : le thème devient un sous-thème, affiché sur la page du parent (URL /degré/parent/slug/). */
  parent?: string;
  /** Ordre d'affichage parmi les sous-thèmes d'un même parent. */
  order?: number;
  title: string;
  description: string;
  colorVar: '--color-9h' | '--color-10h' | '--color-11h';
  icon: string;
}

export interface ThemeContent extends ThemeMeta {
  intro: string;
  /** Photo représentative du thème (extraite d'une vidéo du thème), sous /images/themes/. Absente si le thème n'a aucune vidéo source. */
  heroImage?: string;
  sections: MediaSection[];
  exercises: ExerciseDef[];
  interactive: boolean;
  /** Si vrai, les cartes d'exercice n'affichent que "Exercice N" sans le titre. */
  hideExerciseTitles?: boolean;
  /** Si vrai, masque le titre de section numéroté ("01 Exercices") au-dessus des cartes. */
  hideExercisesHeading?: boolean;
}

export const GRADE_LABELS: Record<Grade, string> = {
  '9h': '9ème Harmos',
  '10h': '10ème Harmos',
  '11h': '11ème Harmos',
};

export const GRADE_ORDER: Grade[] = ['9h', '10h', '11h'];

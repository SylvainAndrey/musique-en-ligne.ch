import type { ThemeContent } from '../types';

const modules = import.meta.glob<{ default: ThemeContent }>(
  ['./9h/*.ts', './10h/*.ts', './11h/*.ts'],
  { eager: true },
);

export const themes: ThemeContent[] = Object.values(modules)
  .map((mod) => mod.default)
  .filter(Boolean);

/** Thèmes principaux d'un degré (les sous-thèmes sont affichés sur la page de leur parent). */
export function getThemesByGrade(grade: ThemeContent['grade']): ThemeContent[] {
  return themes.filter((t) => t.grade === grade && !t.parent);
}

export function getTheme(grade: ThemeContent['grade'], slug: string): ThemeContent | undefined {
  return themes.find((t) => t.grade === grade && t.slug === slug);
}

/** Sous-thèmes d'un thème, dans l'ordre de leur champ `order` (puis alphabétique). */
export function getChildren(theme: ThemeContent): ThemeContent[] {
  return themes
    .filter((t) => t.grade === theme.grade && t.parent === theme.slug)
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99) || a.title.localeCompare(b.title, 'fr'));
}

export function getParent(theme: ThemeContent): ThemeContent | undefined {
  return theme.parent ? getTheme(theme.grade, theme.parent) : undefined;
}

export function themeHref(theme: ThemeContent): string {
  return theme.parent ? `/${theme.grade}/${theme.parent}/${theme.slug}/` : `/${theme.grade}/${theme.slug}/`;
}

/** Identifiants de tous les exercices d'un thème, sous-thèmes compris (pour les barres de progression). */
export function exerciseIds(theme: ThemeContent): string[] {
  return [...theme.exercises.map((e) => e.id), ...getChildren(theme).flatMap(exerciseIds)];
}

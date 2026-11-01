import type { ThemeContent } from '../types';

const modules = import.meta.glob<{ default: ThemeContent }>(
  ['./9h/*.ts', './10h/*.ts', './11h/*.ts'],
  { eager: true },
);

export const themes: ThemeContent[] = Object.values(modules)
  .map((mod) => mod.default)
  .filter(Boolean);

export function getThemesByGrade(grade: ThemeContent['grade']): ThemeContent[] {
  return themes.filter((t) => t.grade === grade);
}

export function getTheme(grade: ThemeContent['grade'], slug: string): ThemeContent | undefined {
  return themes.find((t) => t.grade === grade && t.slug === slug);
}

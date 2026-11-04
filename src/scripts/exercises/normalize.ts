/** Normalise une réponse texte pour comparaison : minuscule, accents et ponctuation ignorés. */
export function normalize(value: string): string {
  return value
    .toLowerCase()
    // Les altérations comptent : « Ré# », « Ré♯ » et « Ré dièse » sont équivalents (idem bémol, bécarre).
    .replace(/[#♯]/g, ' diese ')
    .replace(/♭/g, ' bemol ')
    .replace(/♮/g, ' becarre ')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[’']/g, "'")
    .replace(/[^a-z0-9'\s]/g, '')
    .trim()
    .replace(/\s+/g, ' ');
}

export function isAccepted(value: string, accepted: string[]): boolean {
  const norm = normalize(value);
  if (!norm) return false;
  return accepted.some((a) => normalize(a) === norm);
}

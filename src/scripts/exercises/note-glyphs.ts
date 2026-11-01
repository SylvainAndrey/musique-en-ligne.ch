/**
 * Icônes SVG (et non des caractères Unicode) pour les valeurs rythmiques et les silences.
 * Les glyphes Unicode du bloc "Musical Symbols" (𝅝 𝅗𝅥 𝄻 𝄼 𝄽 𝄾 𝄿…) ne sont pas fiablement
 * rendus par les polices système sur iOS/iPadOS : ils y apparaissent parfois en bleu (glyphe de
 * remplacement) ou pas du tout. On les remplace donc par des icônes vectorielles dessinées à la
 * main, en `fill="currentColor"` pour suivre la couleur du texte environnant.
 */

const NOIRE_SVG =
  '<svg viewBox="0 0 20 34" width="0.5em" height="1.3em" xmlns="http://www.w3.org/2000/svg" fill="currentColor" style="vertical-align:-0.1em"><ellipse cx="6" cy="29" rx="5" ry="3.6" transform="rotate(-18 6 29)"/><rect x="10.2" y="3" width="1.6" height="26"/></svg>';

const CROCHE_SVG =
  '<svg viewBox="0 0 20 34" width="0.5em" height="1.3em" xmlns="http://www.w3.org/2000/svg" fill="currentColor" style="vertical-align:-0.1em"><ellipse cx="6" cy="29" rx="5" ry="3.6" transform="rotate(-18 6 29)"/><rect x="10.2" y="3" width="1.6" height="26"/><path d="M11.8 3 C17 5, 18 9, 16 13 C14 10, 12 8.5, 11.8 7 Z"/></svg>';

const DOUBLE_CROCHE_SEULE_SVG =
  '<svg viewBox="0 0 20 34" width="0.5em" height="1.3em" xmlns="http://www.w3.org/2000/svg" fill="currentColor" style="vertical-align:-0.1em"><ellipse cx="5" cy="29" rx="5" ry="3.6" transform="rotate(-18 5 29)"/><rect x="9.2" y="3" width="1.6" height="26"/><path d="M10.8 3 C16 5, 17 9, 15 13 C13 10, 11 8.5, 10.8 7 Z"/><path d="M10.8 9 C16 11, 17 15, 15 19 C13 16, 11 14.5, 10.8 13 Z"/></svg>';

const DOUBLES_CROCHES_SVG =
  '<svg viewBox="0 0 34 34" width="1em" height="1.3em" xmlns="http://www.w3.org/2000/svg" fill="currentColor" style="vertical-align:-0.1em"><ellipse cx="6" cy="29" rx="5" ry="3.6" transform="rotate(-18 6 29)"/><rect x="10.2" y="3" width="1.6" height="26"/><ellipse cx="26" cy="29" rx="5" ry="3.6" transform="rotate(-18 26 29)"/><rect x="30.2" y="3" width="1.6" height="26"/><rect x="10.2" y="3" width="21.6" height="2.6"/><rect x="10.2" y="7.5" width="21.6" height="2.6"/></svg>';

const DEUX_CROCHES_SVG =
  '<svg viewBox="0 0 34 34" width="1em" height="1.3em" xmlns="http://www.w3.org/2000/svg" fill="currentColor" style="vertical-align:-0.1em"><ellipse cx="6" cy="29" rx="5" ry="3.6" transform="rotate(-18 6 29)"/><rect x="10.2" y="3" width="1.6" height="26"/><ellipse cx="26" cy="29" rx="5" ry="3.6" transform="rotate(-18 26 29)"/><rect x="30.2" y="3" width="1.6" height="26"/><rect x="10.2" y="3" width="21.6" height="2.6"/></svg>';

const QUATRE_DOUBLES_CROCHES_SVG =
  '<svg viewBox="0 0 54 34" width="1.5em" height="1.3em" xmlns="http://www.w3.org/2000/svg" fill="currentColor" style="vertical-align:-0.1em"><ellipse cx="5" cy="29" rx="4.3" ry="3.2" transform="rotate(-18 5 29)"/><rect x="8.6" y="3" width="1.4" height="26"/><ellipse cx="18" cy="29" rx="4.3" ry="3.2" transform="rotate(-18 18 29)"/><rect x="21.6" y="3" width="1.4" height="26"/><ellipse cx="31" cy="29" rx="4.3" ry="3.2" transform="rotate(-18 31 29)"/><rect x="34.6" y="3" width="1.4" height="26"/><ellipse cx="44" cy="29" rx="4.3" ry="3.2" transform="rotate(-18 44 29)"/><rect x="47.6" y="3" width="1.4" height="26"/><rect x="8.6" y="3" width="40.4" height="2.4"/><rect x="8.6" y="7.2" width="40.4" height="2.4"/></svg>';

const CROCHE_POINTEE_SVG =
  '<svg viewBox="0 0 26 34" width="0.65em" height="1.3em" xmlns="http://www.w3.org/2000/svg" fill="currentColor" style="vertical-align:-0.1em"><ellipse cx="6" cy="29" rx="5" ry="3.6" transform="rotate(-18 6 29)"/><circle cx="13.5" cy="27" r="1.4"/><rect x="10.2" y="3" width="1.6" height="26"/><path d="M11.8 3 C17 5, 18 9, 16 13 C14 10, 12 8.5, 11.8 7 Z"/></svg>';

const NOIRE_POINTEE_SVG =
  '<svg viewBox="0 0 20 34" width="0.55em" height="1.3em" xmlns="http://www.w3.org/2000/svg" fill="currentColor" style="vertical-align:-0.1em"><ellipse cx="6" cy="29" rx="5" ry="3.6" transform="rotate(-18 6 29)"/><circle cx="13.5" cy="27" r="1.4"/><rect x="10.2" y="3" width="1.6" height="26"/></svg>';

const BLANCHE_SVG =
  '<svg viewBox="0 0 20 34" width="0.5em" height="1.3em" xmlns="http://www.w3.org/2000/svg" style="vertical-align:-0.1em"><ellipse cx="6" cy="29" rx="5" ry="3.6" transform="rotate(-18 6 29)" fill="none" stroke="currentColor" stroke-width="2.1"/><rect x="10.2" y="3" width="1.6" height="26" fill="currentColor"/></svg>';

const BLANCHE_POINTEE_SVG =
  '<svg viewBox="0 0 26 34" width="0.65em" height="1.3em" xmlns="http://www.w3.org/2000/svg" style="vertical-align:-0.1em"><ellipse cx="6" cy="29" rx="5" ry="3.6" transform="rotate(-18 6 29)" fill="none" stroke="currentColor" stroke-width="2.1"/><circle cx="13.5" cy="27" r="1.4" fill="currentColor"/><rect x="10.2" y="3" width="1.6" height="26" fill="currentColor"/></svg>';

const RONDE_SVG =
  '<svg viewBox="0 0 24 34" width="0.7em" height="1.3em" xmlns="http://www.w3.org/2000/svg" style="vertical-align:-0.1em"><ellipse cx="12" cy="17" rx="9" ry="6" fill="none" stroke="currentColor" stroke-width="2.4"/></svg>';

const PAUSE_SVG =
  '<svg viewBox="0 0 20 14" width="0.6em" height="0.55em" xmlns="http://www.w3.org/2000/svg" fill="currentColor" style="vertical-align:0.15em"><line x1="0" y1="2" x2="20" y2="2" stroke="currentColor" stroke-width="1.2"/><rect x="2" y="2" width="16" height="5"/></svg>';

const DEMI_PAUSE_SVG =
  '<svg viewBox="0 0 20 14" width="0.6em" height="0.55em" xmlns="http://www.w3.org/2000/svg" fill="currentColor" style="vertical-align:0.15em"><line x1="0" y1="9" x2="20" y2="9" stroke="currentColor" stroke-width="1.2"/><rect x="2" y="4" width="16" height="5"/></svg>';

const SOUPIR_SVG =
  '<svg viewBox="0 0 14 34" width="0.4em" height="1.3em" xmlns="http://www.w3.org/2000/svg" fill="currentColor" style="vertical-align:-0.1em"><path d="M9 2 C4 3 3 7 6 9 C9 11 9 13 6 15 C2 17 1 20 4 22 L9 30 L6.5 22 C5 19 8 17 10 15 C13 12 12 8 9 6 C7 4.5 7.5 3 9 2 Z"/></svg>';

/**
 * Tracé réel du "Quaver rest" (silence de croche = demi-soupir), extrait du fichier
 * domaine-public "Music rests.svg" (Wikimedia Commons), rescalé dans le repère du site.
 * Source : https://commons.wikimedia.org/wiki/File:Music_rests.svg
 */
const DEMI_SOUPIR_SVG =
  '<svg viewBox="0 0 14 34" width="0.4em" height="1.3em" xmlns="http://www.w3.org/2000/svg" fill="currentColor" style="vertical-align:-0.1em">' +
  '<g transform="translate(-360.94,1.56) scale(1.009)"><g transform="matrix(1.8,0,0,1.8,-593.78902,-123.1393318481)">' +
  '<path d="m 531.098,74.847 c -0.52,0.098 -0.918,0.457 -1.098,0.953 -0.039,0.16 -0.039,0.199 -0.039,0.418 0,0.301 0.019,0.461 0.16,0.699 0.199,0.399 0.617,0.719 1.094,0.836 0.5,0.141 1.336,0.02 2.293,-0.297 l 0.238,-0.082 -1.176,3.25 -1.156,3.246 c 0,0 0.039,0.02 0.102,0.063 0.117,0.078 0.316,0.137 0.457,0.137 0.238,0 0.539,-0.137 0.578,-0.258 0,-0.039 0.558,-1.934 1.234,-4.184 l 1.195,-4.125 -0.039,-0.058 c -0.097,-0.121 -0.296,-0.16 -0.418,-0.063 -0.039,0.039 -0.101,0.121 -0.14,0.18 -0.18,0.301 -0.637,0.836 -0.875,1.035 -0.219,0.18 -0.34,0.199 -0.539,0.121 -0.18,-0.098 -0.239,-0.199 -0.36,-0.738 -0.117,-0.535 -0.257,-0.778 -0.558,-0.977 -0.278,-0.179 -0.637,-0.238 -0.953,-0.156 z" />' +
  '</g></g></svg>';

/**
 * Sicilienne : croche pointée, double croche, croche — les trois notes reliées par une
 * ligambe commune (avec une double-barre secondaire entre la 1re et la 2e note, puisque
 * seule la double croche est subdivisée).
 */
const SICILIENNE_SVG =
  '<svg viewBox="0 0 54 34" width="1.9em" height="1.3em" xmlns="http://www.w3.org/2000/svg" fill="currentColor" style="vertical-align:-0.1em">' +
  '<ellipse cx="6" cy="29" rx="5" ry="3.6" transform="rotate(-18 6 29)"/>' +
  '<circle cx="13.5" cy="27" r="1.3"/>' +
  '<rect x="10.2" y="3" width="1.6" height="26"/>' +
  '<ellipse cx="26" cy="29" rx="5" ry="3.6" transform="rotate(-18 26 29)"/>' +
  '<rect x="30.2" y="3" width="1.6" height="26"/>' +
  '<ellipse cx="46" cy="29" rx="5" ry="3.6" transform="rotate(-18 46 29)"/>' +
  '<rect x="50.2" y="3" width="1.6" height="26"/>' +
  '<rect x="10.2" y="3" width="41.6" height="2.6"/>' +
  '<rect x="10.2" y="7.5" width="21.6" height="2.6"/>' +
  '</svg>';

/**
 * Tracé réel du "Semiquaver rest" (silence de double croche = quart de soupir), extrait du
 * même fichier domaine-public que le demi-soupir ci-dessus.
 * Source : https://commons.wikimedia.org/wiki/File:Music_rests.svg
 */
const QUART_DE_SOUPIR_SVG =
  '<svg viewBox="0 0 14 34" width="0.4em" height="1.3em" xmlns="http://www.w3.org/2000/svg" fill="currentColor" style="vertical-align:-0.1em">' +
  '<g transform="translate(-433.70,-7.87) scale(1.009)"><g transform="matrix(1.8,0,0,1.8,-544.6617,-122.78886)">' +
  '<path d="M 544.191,74.847 C 543.672,74.945 543.273,75.304 543.098,75.8 C 543.055,75.96 543.055,75.999 543.055,76.218 C 543.055,76.519 543.074,76.679 543.215,76.917 C 543.414,77.316 543.832,77.636 544.313,77.753 C 544.809,77.894 545.605,77.792 546.563,77.476 C 546.703,77.417 546.82,77.374 546.82,77.394 C 546.82,77.417 545.926,80.324 545.887,80.425 C 545.785,80.683 545.445,81.16 545.148,81.46 C 544.871,81.738 544.73,81.8 544.512,81.699 C 544.332,81.601 544.273,81.499 544.152,80.96 C 544.051,80.562 543.973,80.343 543.813,80.187 C 543.395,79.726 542.676,79.667 542.121,80.027 C 541.859,80.206 541.66,80.484 541.543,80.785 C 541.5,80.941 541.5,80.984 541.5,81.202 C 541.5,81.499 541.523,81.66 541.66,81.898 C 541.859,82.296 542.277,82.617 542.758,82.734 C 542.977,82.796 543.535,82.796 543.914,82.734 C 544.23,82.675 544.609,82.577 544.988,82.456 C 545.148,82.398 545.289,82.359 545.289,82.378 C 545.289,82.378 543.336,88.734 543.297,88.831 C 543.297,88.851 543.453,88.972 543.613,89.011 C 543.773,89.074 543.934,89.074 544.094,89.011 C 544.25,88.972 544.41,88.874 544.41,88.812 C 544.43,88.792 545.227,85.785 546.203,82.136 L 547.977,75.503 L 547.938,75.445 C 547.859,75.324 547.699,75.304 547.559,75.363 C 547.48,75.402 547.48,75.402 547.242,75.761 C 547.043,76.081 546.762,76.417 546.602,76.577 C 546.383,76.757 546.266,76.796 546.066,76.718 C 545.887,76.62 545.824,76.519 545.707,75.98 C 545.586,75.445 545.445,75.202 545.148,75.003 C 544.871,74.824 544.512,74.765 544.191,74.847 z" />' +
  '</g></g></svg>';

/** Clés sémantiques (utilisées par le moteur rhythm-fill). */
export const NOTE_SVG_BY_KEY: Record<string, string> = {
  ronde: RONDE_SVG,
  'demi-pause': DEMI_PAUSE_SVG,
  blanche: BLANCHE_SVG,
  soupir: SOUPIR_SVG,
  noire: NOIRE_SVG,
  'demi-soupir': DEMI_SOUPIR_SVG,
  croche: CROCHE_SVG,
  'quart-de-soupir': QUART_DE_SOUPIR_SVG,
  'doubles-croches': DOUBLES_CROCHES_SVG,
  'croche-pointee': CROCHE_POINTEE_SVG,
  'noire-pointee': NOIRE_POINTEE_SVG,
  'double-croche-seule': DOUBLE_CROCHE_SEULE_SVG,
  'deux-croches': DEUX_CROCHES_SVG,
  'quatre-doubles-croches': QUATRE_DOUBLES_CROCHES_SVG,
  sicilienne: SICILIENNE_SVG,
};

/** Caractères Unicode fragiles (encore présents dans certaines données) -> icône SVG équivalente. */
export const NOTE_SVG_BY_GLYPH: Record<string, string> = {
  '♩': NOIRE_SVG,
  '♪': CROCHE_SVG,
  '♬': DOUBLES_CROCHES_SVG,
  '♫': DEUX_CROCHES_SVG,
  '𝅗𝅥': BLANCHE_SVG,
  '𝅝': RONDE_SVG,
  '𝄻': PAUSE_SVG,
  '𝄼': DEMI_PAUSE_SVG,
  '𝄽': SOUPIR_SVG,
  '𝄾': DEMI_SOUPIR_SVG,
  '𝄿': QUART_DE_SOUPIR_SVG,
  '♪.': CROCHE_POINTEE_SVG,
  '♩.': NOIRE_POINTEE_SVG,
  '𝅗𝅥.': BLANCHE_POINTEE_SVG,
  '𝅘𝅥𝅯': DOUBLE_CROCHE_SEULE_SVG,
};

/** Renvoie l'icône SVG correspondant à un glyphe Unicode connu, ou le texte tel quel sinon. */
export function glyphToHTML(glyph: string): string {
  return NOTE_SVG_BY_GLYPH[glyph] ?? glyph;
}

// Clés triées des plus longues aux plus courtes, pour que les glyphes composés (ex. 𝅗𝅥, formé de
// deux points de code) soient reconnus avant leurs éventuelles sous-séquences.
const GLYPH_KEYS = Object.keys(NOTE_SVG_BY_GLYPH).sort((a, b) => b.length - a.length);

/**
 * Remplace, au sein d'un texte libre (phrase, question, indice…), toute occurrence d'un glyphe
 * musical fragile par son icône SVG, en laissant le reste du texte intact. À utiliser avec
 * `innerHTML` (et non `textContent`) partout où un texte pourrait contenir un de ces symboles,
 * par exemple "Une noire pointée (♩.) vaut...".
 */
export function replaceGlyphsInText(text: string): string {
  let result = '';
  let i = 0;
  while (i < text.length) {
    let matched = false;
    for (const key of GLYPH_KEYS) {
      if (text.startsWith(key, i)) {
        result += NOTE_SVG_BY_GLYPH[key];
        i += key.length;
        matched = true;
        break;
      }
    }
    if (!matched) {
      result += text[i];
      i += 1;
    }
  }
  return result;
}

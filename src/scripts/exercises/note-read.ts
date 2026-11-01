import type { EngineRenderer } from './types';
import { createRevealButton } from './reveal';

type Clef = 'treble' | 'bass';

interface NoteReadItem {
  /** Position diatonique par rapport à la 1ère ligne (bas de portée) de la clé concernée. */
  step: number;
  correctName: string;
  options: string[];
  /** Clé utilisée pour cette question (défaut : sol). */
  clef?: Clef;
}

interface NoteReadData {
  /** Liste fixe de questions (optionnel). Si absente, les questions sont générées et mélangées aléatoirement. */
  items?: NoteReadItem[];
  /** Nombre de questions générées aléatoirement (si `items` n'est pas fourni). */
  count?: number;
  minStep?: number;
  maxStep?: number;
  /** Si vrai, mélange des notes en clé de sol ET en clé de fa (au lieu de clé de sol uniquement). */
  mixClefs?: boolean;
}

const STAFF_TOP = 40;
const LINE_GAP = 18;
const STEP = LINE_GAP / 2;
// La 1ère ligne (step 0, bas de la portée) est à STAFF_TOP + 4*LINE_GAP.
const BOTTOM_LINE_Y = STAFF_TOP + 4 * LINE_GAP;

function noteY(step: number): number {
  return BOTTOM_LINE_Y - step * STEP;
}

// Lettres cycliques par degré, alignées sur la note qui occupe la 1ère ligne (bas de portée) de chaque clé.
const CLEF_LETTERS: Record<Clef, string[]> = {
  treble: ['Mi', 'Fa', 'Sol', 'La', 'Si', 'Do', 'Ré'], // 1ère ligne = Mi4
  bass: ['Sol', 'La', 'Si', 'Do', 'Ré', 'Mi', 'Fa'], // 1ère ligne = Sol2
};
const CLEF_GLYPH: Record<Clef, string> = { treble: '𝄞', bass: '𝄢' };
// Step autour duquel le glyphe de la clé doit être centré (2e ligne pour sol, 4e ligne pour fa).
const CLEF_ANCHOR_STEP: Record<Clef, number> = { treble: 2, bass: 6 };
const CLEF_GLYPH_Y_OFFSET: Record<Clef, number> = { treble: 14 };

/**
 * Clé de fa dessinée en SVG (et non le caractère Unicode 𝄢) : le rendu du glyphe dépend de polices
 * de notation musicale (Bravura, Noto Music) rarement installées, ce qui place ses deux points
 * n'importe où selon la police de repli. Le tracé ci-dessous est ré-échelonné à partir d'une clé de
 * fa réelle du domaine public (Wikimedia Commons, "Bass clef.svg"), avec ses deux points alignés de
 * part et d'autre de la 4e ligne (Fa3), soit la 2e ligne en partant du haut de la portée.
 */
const BASS_CLEF_BODY_PATH =
  'M 22 96.91 C 26.82 93.65 30.41 91.18 32.73 89.47 C 35.05 87.8 37.49 85.69 39.98 83.19 C 42.48 80.69 44.59 77.86 46.29 74.72 C 47.64 72.4 48.79 69.72 49.74 66.67 C 50.68 63.65 51.17 60.73 51.26 57.95 C 51.26 55.36 50.93 52.89 50.23 50.58 C 49.56 48.23 48.4 46.31 46.75 44.76 C 45.11 43.23 42.97 42.47 40.32 42.47 C 37.76 42.47 35.35 42.99 33.1 43.99 C 30.87 45.03 29.29 46.68 28.4 48.99 C 28.4 49.21 28.28 49.48 28.1 49.88 C 28.16 50.36 28.4 50.73 28.86 51 C 29.32 51.28 29.71 51.4 30.08 51.4 C 30.26 51.4 30.78 51.31 31.57 51.13 C 32.39 50.94 33.07 50.82 33.61 50.82 C 35.23 50.82 36.66 51.4 37.97 52.53 C 39.25 53.66 39.89 55.03 39.89 56.64 C 39.89 57.8 39.56 58.9 38.92 59.91 C 38.28 60.91 37.39 61.73 36.27 62.31 C 35.14 62.92 33.89 63.2 32.55 63.2 C 30.11 63.2 28.04 62.47 26.33 60.97 C 24.65 59.45 23.8 57.53 23.8 55.12 C 23.8 52.04 24.74 49.39 26.6 47.13 C 28.49 44.88 30.87 43.2 33.8 42.07 C 36.69 40.91 39.62 40.37 42.61 40.37 C 45.87 40.37 48.98 41.19 51.87 42.87 C 54.8 44.51 57.09 46.8 58.79 49.63 C 60.5 52.5 61.38 55.55 61.38 58.84 C 61.38 64.69 59.43 70.12 55.53 75.15 C 51.63 80.18 46.81 84.54 41.05 88.25 C 37.21 90.78 30.99 94.2 22.43 98.5 L 22 96.91 Z';
const BASS_CLEF_DOT_PATHS = [
  'M 64.34 49.75 C 64.34 48.66 64.74 47.74 65.53 47.01 C 66.29 46.25 67.24 45.88 68.36 45.88 C 69.34 45.88 70.25 46.31 71.08 47.13 C 71.9 47.93 72.3 48.87 72.3 49.91 C 72.3 51 71.87 51.95 71.08 52.71 C 70.22 53.44 69.28 53.81 68.21 53.81 C 67.08 53.81 66.17 53.44 65.44 52.62 C 64.71 51.83 64.34 50.88 64.34 49.75 Z',
  'M 64.34 65.73 C 64.34 64.63 64.74 63.69 65.47 62.95 C 66.23 62.19 67.18 61.83 68.36 61.83 C 69.34 61.83 70.22 62.22 71.08 63.04 C 71.87 63.87 72.3 64.75 72.3 65.73 C 72.3 66.92 71.9 67.86 71.14 68.62 C 70.35 69.39 69.43 69.78 68.36 69.78 C 67.18 69.78 66.23 69.39 65.47 68.65 C 64.74 67.92 64.34 66.95 64.34 65.73 Z',
];

function buildBassClef(): SVGGElement {
  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  g.setAttribute('class', 'nr__clef nr__clef--bass');

  const body = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  body.setAttribute('d', BASS_CLEF_BODY_PATH);
  body.setAttribute('class', 'nr__clef-fill');
  g.appendChild(body);

  for (const dotPath of BASS_CLEF_DOT_PATHS) {
    const dot = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    dot.setAttribute('d', dotPath);
    dot.setAttribute('class', 'nr__clef-fill');
    g.appendChild(dot);
  }

  return g;
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildRandomItems(count: number, minStep: number, maxStep: number, clef: Clef = 'treble'): NoteReadItem[] {
  const letters = CLEF_LETTERS[clef];
  const steps: number[] = [];
  for (let s = minStep; s <= maxStep; s++) steps.push(s);
  const chosen = shuffle(steps).slice(0, Math.min(count, steps.length));
  return chosen.map((step) => {
    const idx = ((step % 7) + 7) % 7;
    const correctName = letters[idx];
    const below = letters[(idx - 1 + 7) % 7];
    const above = letters[(idx + 1) % 7];
    return { step, correctName, options: shuffle([correctName, below, above]), clef };
  });
}

function buildMixedClefItems(count: number, minStep: number, maxStep: number): NoteReadItem[] {
  const half = Math.ceil(count / 2);
  const treble = buildRandomItems(half, minStep, maxStep, 'treble');
  const bass = buildRandomItems(count - half, minStep, maxStep, 'bass');
  return shuffle([...treble, ...bass]);
}

function buildStaffSvg(step: number, clefType: Clef = 'treble'): SVGSVGElement {
  const width = 260;
  const height = 190;
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  svg.setAttribute('class', 'nr__staff');

  // 5 lignes de la portée
  for (let i = 0; i < 5; i++) {
    const y = STAFF_TOP + i * LINE_GAP;
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', '14');
    line.setAttribute('y1', String(y));
    line.setAttribute('x2', String(width - 14));
    line.setAttribute('y2', String(y));
    line.setAttribute('class', 'nr__line');
    svg.appendChild(line);
  }

  // Clé de sol : enroulement aligné sur la 2e ligne (Sol4). Clé de fa : dessinée en SVG, points sur la 4e ligne (Fa3).
  if (clefType === 'bass') {
    svg.appendChild(buildBassClef());
  } else {
    const clef = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    clef.setAttribute('x', '20');
    clef.setAttribute('y', String(noteY(CLEF_ANCHOR_STEP[clefType]) + CLEF_GLYPH_Y_OFFSET[clefType]));
    clef.setAttribute('class', `nr__clef nr__clef--${clefType}`);
    clef.textContent = CLEF_GLYPH[clefType];
    svg.appendChild(clef);
  }

  const noteX = width / 2 + 30;
  const y = noteY(step);

  // Lignes supplémentaires (ledger lines) si la note sort de la portée
  const ledgerSteps: number[] = [];
  if (step < 0) {
    for (let s = -2; s >= step; s -= 2) ledgerSteps.push(s);
  } else if (step > 8) {
    for (let s = 10; s <= step; s += 2) ledgerSteps.push(s);
  }
  for (const s of ledgerSteps) {
    const ly = noteY(s);
    const ledger = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    ledger.setAttribute('x1', String(noteX - 18));
    ledger.setAttribute('y1', String(ly));
    ledger.setAttribute('x2', String(noteX + 18));
    ledger.setAttribute('y2', String(ly));
    ledger.setAttribute('class', 'nr__ledger');
    svg.appendChild(ledger);
  }

  // Tête de note
  const note = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
  note.setAttribute('cx', String(noteX));
  note.setAttribute('cy', String(y));
  note.setAttribute('rx', '12');
  note.setAttribute('ry', '9');
  note.setAttribute('class', 'nr__note');
  svg.appendChild(note);

  // Hampe (queue de la note)
  const stemUp = step < 4;
  const stem = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  const stemX = stemUp ? noteX + 11 : noteX - 11;
  stem.setAttribute('x1', String(stemX));
  stem.setAttribute('y1', String(y));
  stem.setAttribute('x2', String(stemX));
  stem.setAttribute('y2', String(stemUp ? y - 48 : y + 48));
  stem.setAttribute('class', 'nr__stem');
  svg.appendChild(stem);

  return svg;
}

export const renderNoteRead: EngineRenderer = (container, rawData, ctx) => {
  const data = rawData as unknown as NoteReadData;
  const items =
    data.items && data.items.length > 0
      ? data.items
      : data.mixClefs
        ? buildMixedClefItems(data.count ?? 10, data.minStep ?? -4, data.maxStep ?? 9)
        : buildRandomItems(data.count ?? 10, data.minStep ?? -4, data.maxStep ?? 9, 'treble');
  const wrap = document.createElement('div');
  wrap.className = 'nr';

  const blocks: { item: NoteReadItem; buttons: HTMLButtonElement[]; selected: number }[] = [];

  items.forEach((item) => {
    const block = document.createElement('div');
    block.className = 'nr__block';

    block.appendChild(buildStaffSvg(item.step, item.clef ?? 'treble'));

    const optionsWrap = document.createElement('div');
    optionsWrap.className = 'mcq__options nr__options';
    const state = { item, buttons: [] as HTMLButtonElement[], selected: -1 };
    item.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'mcq__option';
      btn.textContent = opt;
      btn.addEventListener('click', () => {
        state.buttons.forEach((b) => b.classList.remove('is-selected'));
        btn.classList.add('is-selected');
        state.selected = i;
      });
      state.buttons.push(btn);
      optionsWrap.appendChild(btn);
    });
    block.appendChild(optionsWrap);
    wrap.appendChild(block);
    blocks.push(state);
  });

  const actions = document.createElement('div');
  actions.className = 'exo__actions';
  const checkBtn = document.createElement('button');
  checkBtn.type = 'button';
  checkBtn.className = 'btn btn-primary';
  checkBtn.textContent = 'Vérifier';
  const result = document.createElement('p');
  result.className = 'exo__result';

  const revealBtn = createRevealButton((shown) => {
    for (const state of blocks) {
      const correctIndex = state.item.options.indexOf(state.item.correctName);
      if (state.selected === correctIndex || correctIndex === -1) continue;
      state.buttons[correctIndex].classList.toggle('is-correct', shown);
    }
  });

  actions.append(checkBtn, revealBtn, result);
  wrap.appendChild(actions);

  checkBtn.addEventListener('click', () => {
    let correct = 0;
    for (const state of blocks) {
      if (state.selected === -1) continue;
      const correctIndex = state.item.options.indexOf(state.item.correctName);
      const ok = state.selected === correctIndex;
      state.buttons[state.selected].classList.add(ok ? 'is-correct' : 'is-wrong');
      if (ok) correct += 1;
      state.buttons.forEach((b) => (b.disabled = true));
    }
    result.textContent = `${correct} / ${blocks.length} bonnes réponses`;
    result.className = `exo__result ${correct === blocks.length ? 'is-correct' : ''}`;
    checkBtn.disabled = true;
    if (correct < blocks.length) revealBtn.hidden = false;
    ctx.complete({ correct, total: blocks.length });
  });

  container.appendChild(wrap);
};

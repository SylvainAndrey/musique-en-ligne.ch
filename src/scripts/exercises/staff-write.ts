import type { EngineRenderer } from './types';
import { createRevealButton } from './reveal';
import { playPianoNote } from '../audio';
import { appendTrebleClef } from './clef';

/**
 * « Écris sur la portée » : l'élève clique sur la portée (clé de sol) pour placer une note dans
 * chaque case, puis lui ajoute éventuellement un dièse ou un bémol.
 *
 * - Mode consigne (`targets`) : chaque case doit contenir la note demandée, ex. ['Do#', 'Mib'].
 *   L'octave est libre, seuls le nom de la note et l'altération comptent.
 * - Mode libre (`free`) : l'élève choisit ses notes ; on vérifie seulement qu'elles sont toutes
 *   différentes et qu'il y a le bon nombre de dièses et de bémols.
 */

type Accidental = '#' | 'b' | null;

interface StaffWriteData {
  targets?: string[];
  free?: { count: number; sharps: number; flats: number };
  /** Libellés affichés au-dessus des cases à la place du nom des notes (ex. noms d'intervalles). */
  labels?: string[];
  /** Note de départ déjà écrite (grisée) dans chaque case, ex. -2 pour Do4 : l'élève écrit la note d'arrivée au-dessus. */
  baseStep?: number;
  /** Masque les boutons dièse/bémol (notes naturelles uniquement). */
  noAccidentals?: boolean;
}

// Position diatonique en clé de sol : step 0 = Mi4 (1re ligne), alignée sur note-read.ts et scale-fix.ts.
const LETTERS_FROM_STEP = ['Mi', 'Fa', 'Sol', 'La', 'Si', 'Do', 'Ré'];
const BASE_STEP: Record<string, number> = { Mi: 0, Fa: 1, Sol: 2, La: 3, Si: 4, Do: 5, Ré: 6 };
const NATURAL_SEMITONE: Record<string, number> = { Do: 0, Ré: 2, Mi: 4, Fa: 5, Sol: 7, La: 9, Si: 11 };
const MIN_STEP = -3; // Do4 = -2, Si3 = -3
const MAX_STEP = 11;

const STAFF_TOP = 50;
const LINE_GAP = 18;
const HALF = LINE_GAP / 2;
const BOTTOM_LINE_Y = STAFF_TOP + 4 * LINE_GAP;
const FIRST_X = 120;
const COL_W = 78;
const HEIGHT = 190;

const noteY = (step: number) => BOTTOM_LINE_Y - step * HALF;
const letterOf = (step: number) => LETTERS_FROM_STEP[((step % 7) + 7) % 7];
const accGlyph = (a: Accidental) => (a === '#' ? '♯' : a === 'b' ? '♭' : '');

function parseTarget(t: string): { letter: string; acc: Accidental } {
  const m = t.trim().match(/^(Do|Ré|Re|Mi|Fa|Sol|La|Si)\s*(#|♯|b|♭)?$/i);
  if (!m) return { letter: t, acc: null };
  const letter = m[1].charAt(0).toUpperCase() + m[1].slice(1).toLowerCase();
  const acc: Accidental = m[2] ? (/[#♯]/.test(m[2]) ? '#' : 'b') : null;
  return { letter: letter === 'Re' ? 'Ré' : letter, acc };
}

function frequency(step: number, acc: Accidental): number {
  // Mi4 = 329.63 Hz ; on calcule le demi-ton absolu à partir de la position diatonique.
  const octave = Math.floor((step + 2) / 7); // Do4..Si4 => 0 (step -2..4)
  const letter = letterOf(step);
  const semitone = NATURAL_SEMITONE[letter] + (acc === '#' ? 1 : acc === 'b' ? -1 : 0);
  const midi = 60 + octave * 12 + semitone;
  return 440 * Math.pow(2, (midi - 69) / 12);
}

const SVG_NS = 'http://www.w3.org/2000/svg';
function el<K extends keyof SVGElementTagNameMap>(tag: K, attrs: Record<string, string | number>): SVGElementTagNameMap[K] {
  const node = document.createElementNS(SVG_NS, tag);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, String(v));
  return node;
}

export const renderStaffWrite: EngineRenderer = (container, rawData, ctx) => {
  const data = rawData as unknown as StaffWriteData;
  const targets = (data.targets ?? []).map(parseTarget);
  const count = data.targets ? targets.length : data.free?.count ?? 4;
  const width = FIRST_X + count * COL_W + 20;

  const wrap = document.createElement('div');
  wrap.className = 'sw';

  const help = document.createElement('p');
  help.className = 'sw__help';
  help.textContent = data.noAccidentals
    ? 'Clique sur la portée pour placer la note de chaque case.'
    : 'Clique sur la portée pour placer la note de chaque case, puis choisis son altération sous la portée.';
  wrap.appendChild(help);

  const scroller = document.createElement('div');
  scroller.className = 'sw__scroller';
  // La portée et les boutons d'altération partagent le même conteneur, pour rester alignés (défilement horizontal sur mobile).
  const inner = document.createElement('div');
  inner.className = 'sw__inner';
  inner.style.minWidth = `${Math.min(width, 560)}px`;
  inner.style.maxWidth = `${Math.max(width, 720)}px`;
  const svg = el('svg', { viewBox: `0 0 ${width} ${HEIGHT}`, class: 'sw__staff' });

  for (let i = 0; i < 5; i++) {
    const y = STAFF_TOP + i * LINE_GAP;
    svg.appendChild(el('line', { x1: 10, y1: y, x2: width - 10, y2: y, class: 'sf__line' }));
  }
  appendTrebleClef(svg, 16, BOTTOM_LINE_Y, LINE_GAP);

  const state: { step: number | null; acc: Accidental; group: SVGGElement; col: SVGRectElement; buttons: HTMLButtonElement[] }[] = [];
  const controls = document.createElement('div');
  controls.className = 'sw__controls';
  controls.style.gridTemplateColumns = `repeat(${count}, minmax(0, 1fr))`;
  controls.style.paddingLeft = `${(FIRST_X / width) * 100}%`;
  controls.style.paddingRight = `${(20 / width) * 100}%`;

  const ghost = el('ellipse', { rx: 10, ry: 7.5, class: 'sw__ghost' });
  ghost.style.display = 'none';

  function stepFromEvent(e: PointerEvent | MouseEvent): number {
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const p = pt.matrixTransform(svg.getScreenCTM()!.inverse());
    const step = Math.round((BOTTOM_LINE_Y - p.y) / HALF);
    return Math.max(MIN_STEP, Math.min(MAX_STEP, step));
  }

  function drawColumn(i: number) {
    const s = state[i];
    const g = s.group;
    g.replaceChildren();
    if (s.step === null) return;
    const x = FIRST_X + i * COL_W + COL_W / 2 + (data.baseStep !== undefined ? 14 : 0);
    const y = noteY(s.step);
    const ledgers: number[] = [];
    if (s.step < 0) for (let k = -2; k >= s.step; k -= 2) ledgers.push(k);
    if (s.step > 8) for (let k = 10; k <= s.step; k += 2) ledgers.push(k);
    for (const k of ledgers) g.appendChild(el('line', { x1: x - 16, y1: noteY(k), x2: x + 16, y2: noteY(k), class: 'sf__ledger' }));
    g.appendChild(el('ellipse', { cx: x, cy: y, rx: 10, ry: 7.5, class: 'sf__note' }));
    if (s.acc) {
      const t = el('text', { x: x - 24, y: y + 7, class: 'sw__acc', 'text-anchor': 'middle' });
      t.textContent = accGlyph(s.acc);
      g.appendChild(t);
    }
  }

  for (let i = 0; i < count; i++) {
    const x0 = FIRST_X + i * COL_W;
    if (data.labels?.[i]) {
      const num = el('text', { x: x0 + COL_W / 2, y: 22, class: 'sw__num', 'text-anchor': 'middle' });
      num.textContent = `${i + 1}) ${data.labels[i]}`;
      svg.appendChild(num);
    } else if (data.targets) {
      const num = el('text', { x: x0 + COL_W / 2, y: 22, class: 'sw__num', 'text-anchor': 'middle' });
      num.textContent = `${i + 1}) ${data.targets[i].replace('#', '♯').replace(/(?<=[a-zé])b$/i, '♭')}`;
      svg.appendChild(num);
    } else {
      const num = el('text', { x: x0 + COL_W / 2, y: 22, class: 'sw__num', 'text-anchor': 'middle' });
      num.textContent = `${i + 1})`;
      svg.appendChild(num);
    }
    const col = el('rect', { x: x0 + 4, y: 28, width: COL_W - 8, height: HEIGHT - 36, rx: 6, class: 'sw__col' });
    const group = el('g', {});
    svg.append(col, group);
    if (data.baseStep !== undefined) {
      const bx = x0 + COL_W / 2 - 14;
      const base = el('g', { class: 'sw__base' });
      const bs = data.baseStep;
      if (bs < 0) for (let k = -2; k >= bs; k -= 2) base.appendChild(el('line', { x1: bx - 16, y1: noteY(k), x2: bx + 16, y2: noteY(k), class: 'sf__ledger' }));
      if (bs > 8) for (let k = 10; k <= bs; k += 2) base.appendChild(el('line', { x1: bx - 16, y1: noteY(k), x2: bx + 16, y2: noteY(k), class: 'sf__ledger' }));
      base.appendChild(el('ellipse', { cx: bx, cy: noteY(bs), rx: 10, ry: 7.5, class: 'sw__base-note' }));
      svg.appendChild(base);
    }

    const ctrl = document.createElement('div');
    ctrl.className = 'sw__ctrl';
    const buttons: HTMLButtonElement[] = [];
    ([['#', '♯'], ['b', '♭']] as [Accidental, string][]).forEach(([acc, glyph]) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'sw__accbtn';
      b.textContent = glyph;
      b.title = acc === '#' ? 'Dièse' : 'Bémol';
      b.addEventListener('click', () => {
        if (wrap.classList.contains('is-locked')) return;
        const s = state[i];
        s.acc = s.acc === acc ? null : acc;
        buttons.forEach((bb) => bb.classList.toggle('is-on', bb.textContent === accGlyph(s.acc)));
        drawColumn(i);
        if (s.step !== null) playPianoNote(frequency(s.step, s.acc), 1.2);
      });
      buttons.push(b);
      ctrl.appendChild(b);
    });
    if (data.noAccidentals) ctrl.style.visibility = 'hidden';
    controls.appendChild(ctrl);

    state.push({ step: null, acc: null, group, col, buttons });

    col.addEventListener('pointermove', (e) => {
      if (wrap.classList.contains('is-locked')) return;
      const step = stepFromEvent(e);
      ghost.setAttribute('cx', String(x0 + COL_W / 2 + (data.baseStep !== undefined ? 14 : 0)));
      ghost.setAttribute('cy', String(noteY(step)));
      ghost.style.display = '';
    });
    col.addEventListener('pointerleave', () => (ghost.style.display = 'none'));
    col.addEventListener('click', (e) => {
      if (wrap.classList.contains('is-locked')) return;
      const s = state[i];
      s.step = stepFromEvent(e);
      drawColumn(i);
      playPianoNote(frequency(s.step, s.acc), 1.2);
    });
  }
  svg.appendChild(ghost);
  inner.append(svg, controls);
  scroller.appendChild(inner);
  wrap.appendChild(scroller);

  const actions = document.createElement('div');
  actions.className = 'exo__actions';
  const checkBtn = document.createElement('button');
  checkBtn.type = 'button';
  checkBtn.className = 'btn btn-primary';
  checkBtn.textContent = 'Vérifier';
  const result = document.createElement('p');
  result.className = 'exo__result';

  let saved: { step: number | null; acc: Accidental }[] = [];
  const revealBtn = createRevealButton((shown) => {
    if (!data.targets) return;
    if (shown) {
      saved = state.map((s) => ({ step: s.step, acc: s.acc }));
      targets.forEach((t, i) => {
        state[i].step = BASE_STEP[t.letter] ?? 0;
        state[i].acc = t.acc;
        drawColumn(i);
      });
    } else {
      saved.forEach((v, i) => {
        state[i].step = v.step;
        state[i].acc = v.acc;
        drawColumn(i);
      });
    }
  });
  actions.append(checkBtn, revealBtn, result);
  wrap.appendChild(actions);

  checkBtn.addEventListener('click', () => {
    let correct = 0;
    let total = count;
    if (data.targets) {
      targets.forEach((t, i) => {
        const s = state[i];
        const above = data.baseStep === undefined || (s.step !== null && s.step > data.baseStep);
        const ok = s.step !== null && above && letterOf(s.step) === t.letter && s.acc === t.acc;
        s.col.classList.toggle('is-correct', ok);
        s.col.classList.toggle('is-wrong', !ok);
        if (ok) correct += 1;
      });
      result.textContent = `${correct} / ${total} notes correctes`;
    } else {
      const free = data.free ?? { count, sharps: 0, flats: 0 };
      const seen = new Set<string>();
      let sharps = 0;
      let flats = 0;
      state.forEach((s) => {
        const filled = s.step !== null;
        const key = filled ? `${letterOf(s.step!)}${s.acc ?? ''}` : '';
        const ok = filled && s.acc !== null && !seen.has(key);
        if (ok) {
          seen.add(key);
          if (s.acc === '#') sharps += 1;
          else flats += 1;
          correct += 1;
        }
        s.col.classList.toggle('is-correct', ok);
        s.col.classList.toggle('is-wrong', !ok);
      });
      total = count;
      const balanced = sharps === free.sharps && flats === free.flats;
      if (!balanced) correct = Math.min(correct, total - 1);
      result.textContent = balanced
        ? `${correct} / ${total} notes correctes`
        : `${correct} / ${total} — il faut ${free.sharps} notes avec un dièse et ${free.flats} avec un bémol, toutes différentes.`;
    }
    result.className = `exo__result ${correct === total ? 'is-correct' : ''}`;
    checkBtn.disabled = true;
    wrap.classList.add('is-locked');
    ghost.style.display = 'none';
    state.forEach((s) => s.buttons.forEach((b) => (b.disabled = true)));
    if (correct < total && data.targets) revealBtn.hidden = false;
    ctx.complete({ correct, total });
  });

  container.appendChild(wrap);
};

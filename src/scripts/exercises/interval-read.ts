import type { EngineRenderer } from './types';
import { createRevealButton } from './reveal';
import { playPianoNote, playChord } from '../audio';
import { appendTrebleClef } from './clef';

/**
 * « Nomme l'intervalle » : deux notes sont écrites sur une portée en clé de sol (l'une après
 * l'autre, ou superposées), l'élève peut les écouter et choisit le nom de l'intervalle.
 * L'intervalle se compte de la note de départ jusqu'à la note d'arrivée incluse (sans altérations).
 */

interface IntervalItem {
  /** Notes au format « Do4 », « Sol4 », « Do5 »… (sans altération). */
  from: string;
  to: string;
  /** Notes superposées (jouées ensemble) plutôt que l'une après l'autre. */
  harmonic?: boolean;
  label?: string;
}

interface IntervalReadData {
  items: IntervalItem[];
  /** Noms proposés (dans l'ordre de taille). Défaut : de la prime à l'octave. */
  options?: string[];
}

export const INTERVAL_NAMES = ['Prime (unisson)', 'Seconde', 'Tierce', 'Quarte', 'Quinte', 'Sixte', 'Septième', 'Octave'];

const LETTERS = ['Do', 'Ré', 'Mi', 'Fa', 'Sol', 'La', 'Si'];
const NATURAL_SEMITONE = [0, 2, 4, 5, 7, 9, 11];

function parseNote(n: string): { diatonic: number; midi: number } {
  const m = n.trim().match(/^(Do|Ré|Re|Mi|Fa|Sol|La|Si)\s*(\d)$/i);
  if (!m) throw new Error(`Note invalide : ${n}`);
  let letter = m[1].charAt(0).toUpperCase() + m[1].slice(1).toLowerCase();
  if (letter === 'Re') letter = 'Ré';
  const idx = LETTERS.indexOf(letter);
  const octave = Number(m[2]);
  return { diatonic: octave * 7 + idx, midi: 12 * (octave + 1) + NATURAL_SEMITONE[idx] };
}
const freq = (midi: number) => 440 * Math.pow(2, (midi - 69) / 12);

// Géométrie de la portée, alignée sur les autres exercices (step 0 = Mi4, 1re ligne).
const STAFF_TOP = 34;
const LINE_GAP = 16;
const HALF = LINE_GAP / 2;
const BOTTOM = STAFF_TOP + 4 * LINE_GAP;
const MI4 = 4 * 7 + 2;
const stepOf = (diatonic: number) => diatonic - MI4;
const yOf = (step: number) => BOTTOM - step * HALF;

const NS = 'http://www.w3.org/2000/svg';
function el<K extends keyof SVGElementTagNameMap>(tag: K, attrs: Record<string, string | number>): SVGElementTagNameMap[K] {
  const node = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, String(v));
  return node;
}

function drawNote(svg: SVGSVGElement, x: number, step: number) {
  if (step < 0) for (let k = -2; k >= step; k -= 2) svg.appendChild(el('line', { x1: x - 14, y1: yOf(k), x2: x + 14, y2: yOf(k), class: 'sf__ledger' }));
  if (step > 8) for (let k = 10; k <= step; k += 2) svg.appendChild(el('line', { x1: x - 14, y1: yOf(k), x2: x + 14, y2: yOf(k), class: 'sf__ledger' }));
  svg.appendChild(el('ellipse', { cx: x, cy: yOf(step), rx: 9, ry: 6.5, class: 'sf__note' }));
}

function buildStaff(item: IntervalItem): SVGSVGElement {
  const width = 210;
  const svg = el('svg', { viewBox: `0 0 ${width} 136`, class: 'ir__staff' });
  for (let i = 0; i < 5; i++) {
    const y = STAFF_TOP + i * LINE_GAP;
    svg.appendChild(el('line', { x1: 6, y1: y, x2: width - 6, y2: y, class: 'sf__line' }));
  }
  appendTrebleClef(svg, 10, BOTTOM, LINE_GAP);
  const a = stepOf(parseNote(item.from).diatonic);
  const b = stepOf(parseNote(item.to).diatonic);
  if (item.harmonic) {
    const x = 130;
    const low = Math.min(a, b);
    const high = Math.max(a, b);
    drawNote(svg, x, low);
    // Seconde superposée : la note du haut est décalée sur le côté, comme en gravure.
    drawNote(svg, high - low === 1 ? x + 17 : x, high);
  } else {
    drawNote(svg, 105, a);
    drawNote(svg, 160, b);
  }
  return svg;
}

export const renderIntervalRead: EngineRenderer = (container, rawData, ctx) => {
  const data = rawData as unknown as IntervalReadData;
  const options = data.options ?? INTERVAL_NAMES;
  const wrap = document.createElement('div');
  wrap.className = 'ir';
  const grid = document.createElement('div');
  grid.className = 'ir__grid';
  wrap.appendChild(grid);

  const states = data.items.map((item, index) => {
    const from = parseNote(item.from);
    const to = parseNote(item.to);
    const size = Math.abs(to.diatonic - from.diatonic);
    const correctIndex = options.indexOf(INTERVAL_NAMES[size]);

    const card = document.createElement('div');
    card.className = 'ir__card';
    const head = document.createElement('div');
    head.className = 'ir__head';
    const label = document.createElement('span');
    label.className = 'ir__label';
    label.textContent = item.label ?? `${index + 1})`;
    const play = document.createElement('button');
    play.type = 'button';
    play.className = 'btn btn-ghost ir__play';
    play.textContent = '▶ Écouter';
    play.addEventListener('click', () => {
      if (item.harmonic) {
        playChord([freq(from.midi), freq(to.midi)]);
      } else {
        playPianoNote(freq(from.midi), 1.2);
        setTimeout(() => playPianoNote(freq(to.midi), 1.4), 650);
      }
    });
    head.append(label, play);
    card.append(head, buildStaff(item));

    const select = document.createElement('select');
    select.className = 'ir__select';
    select.setAttribute('aria-label', `Nom de l'intervalle ${index + 1}`);
    select.append(new Option('Choisis…', ''));
    options.forEach((o, i) => select.append(new Option(o, String(i))));
    card.appendChild(select);
    grid.appendChild(card);
    return { card, select, correctIndex };
  });

  const actions = document.createElement('div');
  actions.className = 'exo__actions';
  const checkBtn = document.createElement('button');
  checkBtn.type = 'button';
  checkBtn.className = 'btn btn-primary';
  checkBtn.textContent = 'Vérifier';
  const result = document.createElement('p');
  result.className = 'exo__result';

  const answers: HTMLElement[] = [];
  const revealBtn = createRevealButton((shown) => {
    states.forEach((s, i) => {
      if (!answers[i]) {
        answers[i] = document.createElement('p');
        answers[i].className = 'ir__answer';
        answers[i].textContent = `Réponse : ${options[s.correctIndex] ?? ''}`;
        s.card.appendChild(answers[i]);
      }
      answers[i].hidden = !shown || s.card.classList.contains('is-correct');
    });
  });
  actions.append(checkBtn, revealBtn, result);
  wrap.appendChild(actions);

  checkBtn.addEventListener('click', () => {
    let correct = 0;
    states.forEach((s) => {
      const ok = s.select.value !== '' && Number(s.select.value) === s.correctIndex;
      s.card.classList.toggle('is-correct', ok);
      s.card.classList.toggle('is-wrong', !ok);
      s.select.disabled = true;
      if (ok) correct += 1;
    });
    const total = states.length;
    result.textContent = `${correct} / ${total} intervalles corrects`;
    result.className = `exo__result ${correct === total ? 'is-correct' : ''}`;
    checkBtn.disabled = true;
    if (correct < total) revealBtn.hidden = false;
    ctx.complete({ correct, total });
  });

  container.appendChild(wrap);
};

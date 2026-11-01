import type { EngineRenderer } from './types';
import { createRevealButton } from './reveal';

type Accidental = '#' | 'b';

interface ScaleFixData {
  /** Notes de départ des gammes à corriger (ex. ['Do', 'Ré', 'Mi', 'Fa', 'Sol', 'La', 'Si']). */
  roots?: string[];
  /** Décalage d'octave par note de départ (ex. { Do: -1 } pour écrire la gamme de do une octave plus bas). */
  octaveShifts?: Record<string, number>;
}

interface ScaleItem {
  root: string;
  label: string;
  letters: string[];
  steps: number[];
  correct: (Accidental | null)[];
}

const LETTER_CYCLE = ['Do', 'Ré', 'Mi', 'Fa', 'Sol', 'La', 'Si'];
const NATURAL_SEMITONE: Record<string, number> = { Do: 0, Ré: 2, Mi: 4, Fa: 5, Sol: 7, La: 9, Si: 11 };
// Position diatonique (step) de chaque note naturelle en clé de sol, alignée sur note-read.ts (step 0 = Mi4).
const BASE_STEP: Record<string, number> = { Mi: 0, Fa: 1, Sol: 2, La: 3, Si: 4, Do: 5, Ré: 6 };
const MAJOR_INTERVALS = [0, 2, 4, 5, 7, 9, 11, 12];
const INTERVAL_LABELS = ['1 ton', '1 ton', '½ ton', '1 ton', '1 ton', '1 ton', '½ ton'];

function buildScaleItem(root: string, octaveShift = 0): ScaleItem {
  const rootIndex = LETTER_CYCLE.indexOf(root);
  const rootSemitone = NATURAL_SEMITONE[root];
  const startStep = BASE_STEP[root] + octaveShift * 7;
  const letters: string[] = [];
  const steps: number[] = [];
  const correct: (Accidental | null)[] = [];
  for (let i = 0; i <= 7; i++) {
    const letter = LETTER_CYCLE[(rootIndex + i) % 7];
    letters.push(letter);
    steps.push(startStep + i);
    const naturalSemitone = NATURAL_SEMITONE[letter];
    const targetSemitone = (rootSemitone + MAJOR_INTERVALS[i]) % 12;
    const diff = (((targetSemitone - naturalSemitone) % 12) + 12) % 12;
    correct.push(diff === 0 ? null : diff === 1 ? '#' : diff === 11 ? 'b' : null);
  }
  return { root, label: `${root} majeur`, letters, steps, correct };
}

const STAFF_TOP = 40;
const LINE_GAP = 18;
const STEP = LINE_GAP / 2;
const BOTTOM_LINE_Y = STAFF_TOP + 4 * LINE_GAP;
function noteY(step: number): number {
  return BOTTOM_LINE_Y - step * STEP;
}

const FIRST_NOTE_X = 100;
const NOTE_SPACING = 62;
const STAFF_WIDTH = FIRST_NOTE_X + 7 * NOTE_SPACING + 60;
const STAFF_HEIGHT = 230;

export const renderScaleFix: EngineRenderer = (container, rawData, ctx) => {
  const data = rawData as unknown as ScaleFixData;
  const roots = data.roots ?? LETTER_CYCLE;
  const items = roots.map((root) => buildScaleItem(root, data.octaveShifts?.[root] ?? 0));

  const wrap = document.createElement('div');
  wrap.className = 'sf';

  const blocks: {
    item: ScaleItem;
    placed: (Accidental | null)[];
    slots: HTMLElement[];
  }[] = [];

  for (const item of items) {
    const block = document.createElement('div');
    block.className = 'sf__block';

    const label = document.createElement('p');
    label.className = 'sf__label';
    label.textContent = item.label;
    block.appendChild(label);

    const placed: (Accidental | null)[] = item.correct.map(() => null);
    const slots: HTMLElement[] = [];

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', `0 0 ${STAFF_WIDTH} ${STAFF_HEIGHT}`);
    svg.setAttribute('class', 'sf__staff');

    for (let i = 0; i < 5; i++) {
      const y = STAFF_TOP + i * LINE_GAP;
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', '14');
      line.setAttribute('y1', String(y));
      line.setAttribute('x2', String(STAFF_WIDTH - 14));
      line.setAttribute('y2', String(y));
      line.setAttribute('class', 'sf__line');
      svg.appendChild(line);
    }

    const clef = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    clef.setAttribute('x', '20');
    clef.setAttribute('y', String(noteY(2) + 14));
    clef.setAttribute('class', 'sf__clef');
    clef.textContent = '𝄞';
    svg.appendChild(clef);

    const accidentalTexts: HTMLElement[] = [];

    item.steps.forEach((step, i) => {
      const x = FIRST_NOTE_X + i * NOTE_SPACING;
      const y = noteY(step);

      const ledgerSteps: number[] = [];
      if (step < 0) {
        for (let s = -2; s >= step; s -= 2) ledgerSteps.push(s);
      } else if (step > 8) {
        for (let s = 10; s <= step; s += 2) ledgerSteps.push(s);
      }
      for (const s of ledgerSteps) {
        const ly = noteY(s);
        const ledger = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        ledger.setAttribute('x1', String(x - 16));
        ledger.setAttribute('y1', String(ly));
        ledger.setAttribute('x2', String(x + 16));
        ledger.setAttribute('y2', String(ly));
        ledger.setAttribute('class', 'sf__ledger');
        svg.appendChild(ledger);
      }

      const note = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
      note.setAttribute('cx', String(x));
      note.setAttribute('cy', String(y));
      note.setAttribute('rx', '10');
      note.setAttribute('ry', '7.5');
      note.setAttribute('class', 'sf__note');
      svg.appendChild(note);

      const stemUp = step < 4;
      const stem = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      const stemX = stemUp ? x + 9 : x - 9;
      stem.setAttribute('x1', String(stemX));
      stem.setAttribute('y1', String(y));
      stem.setAttribute('x2', String(stemX));
      stem.setAttribute('y2', String(stemUp ? y - 42 : y + 42));
      stem.setAttribute('class', 'sf__stem');
      svg.appendChild(stem);

      // Zone de dépôt de l'altération, à gauche de la tête de note.
      const slotRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      slotRect.setAttribute('x', String(x - 32));
      slotRect.setAttribute('y', String(y - 16));
      slotRect.setAttribute('width', '22');
      slotRect.setAttribute('height', '32');
      slotRect.setAttribute('rx', '4');
      slotRect.setAttribute('class', 'sf__slot');
      slotRect.dataset.index = String(i);
      svg.appendChild(slotRect);

      const slotText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      slotText.setAttribute('x', String(x - 21));
      slotText.setAttribute('y', String(y + 7));
      slotText.setAttribute('class', 'sf__slot-text');
      svg.appendChild(slotText);

      slots.push(slotRect as unknown as HTMLElement);
      accidentalTexts.push(slotText as unknown as HTMLElement);

      slotRect.addEventListener('click', () => {
        if (wrap.classList.contains('is-locked')) return;
        placed[i] = null;
        slotText.textContent = '';
        slotRect.classList.remove('has-accidental');
      });

      if (i < item.steps.length - 1) {
        const nextX = FIRST_NOTE_X + (i + 1) * NOTE_SPACING;
        const midX = (x + nextX) / 2;
        const intervalLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        intervalLabel.setAttribute('x', String(midX));
        intervalLabel.setAttribute('y', String(BOTTOM_LINE_Y + 48));
        intervalLabel.setAttribute('class', 'sf__interval');
        intervalLabel.setAttribute('text-anchor', 'middle');
        intervalLabel.textContent = INTERVAL_LABELS[i];
        svg.appendChild(intervalLabel);

        const bracket = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        bracket.setAttribute('x1', String(x + 10));
        bracket.setAttribute('y1', String(BOTTOM_LINE_Y + 30));
        bracket.setAttribute('x2', String(nextX - 10));
        bracket.setAttribute('y2', String(BOTTOM_LINE_Y + 30));
        bracket.setAttribute('class', 'sf__bracket');
        svg.appendChild(bracket);
      }
    });

    block.appendChild(svg);

    function isOverSlot(clientX: number, clientY: number): { slot: HTMLElement; index: number } | null {
      for (const slot of slots) {
        const rect = (slot as unknown as SVGRectElement).getBoundingClientRect();
        if (clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom) {
          return { slot, index: Number((slot as unknown as HTMLElement).dataset.index) };
        }
      }
      return null;
    }

    const palette = document.createElement('div');
    palette.className = 'sf__palette';
    (['#', 'b'] as Accidental[]).forEach((accidental) => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'sf__chip';
      chip.textContent = accidental === '#' ? '♯ Dièse' : '♭ Bémol';
      chip.addEventListener('pointerdown', (e: PointerEvent) => {
        if (wrap.classList.contains('is-locked')) return;
        e.preventDefault();
        const ghost = document.createElement('div');
        ghost.className = 'sf__chip sf__chip--ghost';
        ghost.textContent = accidental === '#' ? '♯' : '♭';
        document.body.appendChild(ghost);

        const move = (ev: PointerEvent) => {
          ghost.style.left = `${ev.clientX}px`;
          ghost.style.top = `${ev.clientY}px`;
          const over = isOverSlot(ev.clientX, ev.clientY);
          slots.forEach((s) => s.classList.remove('is-drag-over'));
          if (over) over.slot.classList.add('is-drag-over');
        };
        const up = (ev: PointerEvent) => {
          document.removeEventListener('pointermove', move);
          document.removeEventListener('pointerup', up);
          ghost.remove();
          slots.forEach((s) => s.classList.remove('is-drag-over'));
          const over = isOverSlot(ev.clientX, ev.clientY);
          if (over) {
            placed[over.index] = accidental;
            accidentalTexts[over.index].textContent = accidental === '#' ? '♯' : '♭';
            over.slot.classList.add('has-accidental');
          }
        };
        document.addEventListener('pointermove', move);
        document.addEventListener('pointerup', up, { once: true });
        move(e);
      });
      palette.appendChild(chip);
    });
    block.appendChild(palette);

    wrap.appendChild(block);
    blocks.push({ item, placed, slots });
  }

  const actions = document.createElement('div');
  actions.className = 'exo__actions';
  const checkBtn = document.createElement('button');
  checkBtn.type = 'button';
  checkBtn.className = 'btn btn-primary';
  checkBtn.textContent = 'Vérifier';
  const result = document.createElement('p');
  result.className = 'exo__result';

  const revealBtn = createRevealButton((shown) => {
    for (const { item, slots } of blocks) {
      item.correct.forEach((acc, i) => {
        slots[i].classList.toggle('is-answer', shown && acc !== null);
      });
    }
  });

  actions.append(checkBtn, revealBtn, result);
  wrap.appendChild(actions);

  checkBtn.addEventListener('click', () => {
    let correct = 0;
    let total = 0;
    for (const { item, placed, slots } of blocks) {
      item.correct.forEach((acc, i) => {
        total += 1;
        const ok = placed[i] === acc;
        slots[i].classList.toggle('is-correct', ok);
        slots[i].classList.toggle('is-wrong', !ok);
        if (ok) correct += 1;
      });
    }
    result.textContent = `${correct} / ${total} altérations correctes`;
    result.className = `exo__result ${correct === total ? 'is-correct' : ''}`;
    checkBtn.disabled = true;
    wrap.classList.add('is-locked');
    if (correct < total) revealBtn.hidden = false;
    ctx.complete({ correct, total });
  });

  container.appendChild(wrap);
};

import type { EngineRenderer } from './types';
import { renderMediaRef, type MediaRef } from './media-embed';
import { createRevealButton } from './reveal';

interface OrderingRow {
  id: string;
  label?: string;
  media?: MediaRef;
  items: string[];
}

interface OrderingData {
  media?: MediaRef;
  /** Rétrocompatibilité : une seule rangée sans label. */
  items?: string[];
  /** Plusieurs rangées indépendantes (une par morceau/chanson à reconstituer). */
  rows?: OrderingRow[];
}

interface RowState {
  row: OrderingRow;
  sequence: string[];
  bar: HTMLDivElement;
  answerLine: HTMLElement;
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function uniquePreserveFirst(items: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const it of items) {
    if (!seen.has(it)) {
      seen.add(it);
      out.push(it);
    }
  }
  return out;
}

export const renderOrdering: EngineRenderer = (container, rawData, ctx) => {
  const data = rawData as unknown as OrderingData;
  const rows: OrderingRow[] = data.rows ?? (data.items ? [{ id: 'r1', items: data.items }] : []);

  const wrap = document.createElement('div');
  wrap.className = 'order';

  renderMediaRef(wrap, data.media);

  const rowStates: RowState[] = [];

  for (const row of rows) {
    const rowWrap = document.createElement('div');
    rowWrap.className = 'order__group';

    if (row.label) {
      const label = document.createElement('p');
      label.className = 'order__label';
      label.textContent = row.label;
      rowWrap.appendChild(label);
    }

    renderMediaRef(rowWrap, row.media);

    const bar = document.createElement('div');
    bar.className = 'order__bar';
    rowWrap.appendChild(bar);

    const palette = document.createElement('div');
    palette.className = 'order__palette';
    rowWrap.appendChild(palette);

    const answerLine = document.createElement('p');
    answerLine.className = 'order__answer';
    answerLine.style.display = 'none';
    answerLine.textContent = `Ordre correct : ${row.items.join(' → ')}`;
    rowWrap.appendChild(answerLine);

    const state: RowState = { row, sequence: [], bar, answerLine };
    rowStates.push(state);

    function renderBar() {
      bar.innerHTML = '';
      if (state.sequence.length === 0) {
        const hint = document.createElement('span');
        hint.className = 'order__bar-hint';
        hint.textContent = 'Glisse les éléments ici, dans l’ordre';
        bar.appendChild(hint);
        return;
      }
      state.sequence.forEach((text, index) => {
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'order__chip order__chip--placed';
        chip.textContent = text;
        chip.title = 'Cliquer pour retirer';
        chip.addEventListener('click', () => {
          if (wrap.classList.contains('is-locked')) return;
          state.sequence.splice(index, 1);
          renderBar();
        });
        bar.appendChild(chip);
      });
    }
    renderBar();

    function insertAtPosition(clientX: number, text: string) {
      const chipEls = Array.from(bar.querySelectorAll('.order__chip--placed')) as HTMLElement[];
      let index = chipEls.length;
      for (let i = 0; i < chipEls.length; i++) {
        const rect = chipEls[i].getBoundingClientRect();
        if (clientX < rect.left + rect.width / 2) {
          index = i;
          break;
        }
      }
      state.sequence.splice(index, 0, text);
      renderBar();
    }

    const uniqueOptions = shuffle(uniquePreserveFirst(row.items));
    for (const optionText of uniqueOptions) {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'order__chip order__chip--source';
      chip.textContent = optionText;
      chip.addEventListener('pointerdown', (e: PointerEvent) => {
        if (wrap.classList.contains('is-locked')) return;
        e.preventDefault();
        const ghost = document.createElement('div');
        ghost.className = 'order__chip order__chip--ghost';
        ghost.textContent = optionText;
        document.body.appendChild(ghost);

        const isOverBar = (ev: PointerEvent) => {
          const rect = bar.getBoundingClientRect();
          return ev.clientX >= rect.left - 10 && ev.clientX <= rect.right + 10 && ev.clientY >= rect.top - 20 && ev.clientY <= rect.bottom + 20;
        };

        const move = (ev: PointerEvent) => {
          ghost.style.left = `${ev.clientX}px`;
          ghost.style.top = `${ev.clientY}px`;
          bar.classList.toggle('is-drag-over', isOverBar(ev));
        };
        const up = (ev: PointerEvent) => {
          document.removeEventListener('pointermove', move);
          document.removeEventListener('pointerup', up);
          ghost.remove();
          bar.classList.remove('is-drag-over');
          if (isOverBar(ev)) insertAtPosition(ev.clientX, optionText);
        };
        document.addEventListener('pointermove', move);
        document.addEventListener('pointerup', up, { once: true });
        move(e);
      });
      palette.appendChild(chip);
    }

    wrap.appendChild(rowWrap);
  }

  const actions = document.createElement('div');
  actions.className = 'exo__actions';
  const checkBtn = document.createElement('button');
  checkBtn.type = 'button';
  checkBtn.className = 'btn btn-primary';
  checkBtn.textContent = 'Vérifier l’ordre';
  const result = document.createElement('p');
  result.className = 'exo__result';

  const revealBtn = createRevealButton((shown) => {
    for (const state of rowStates) {
      state.answerLine.style.display = shown ? '' : 'none';
    }
  });

  actions.append(checkBtn, revealBtn, result);
  wrap.appendChild(actions);

  checkBtn.addEventListener('click', () => {
    let correct = 0;
    let total = 0;
    for (const state of rowStates) {
      const chipEls = Array.from(state.bar.querySelectorAll('.order__chip--placed')) as HTMLElement[];
      state.row.items.forEach((target, i) => {
        const chip = chipEls[i];
        const ok = state.sequence[i] === target;
        if (chip) {
          chip.classList.toggle('is-correct', ok);
          chip.classList.toggle('is-wrong', !ok);
        }
        if (ok) correct += 1;
        total += 1;
      });
      for (let i = state.row.items.length; i < chipEls.length; i++) {
        chipEls[i].classList.add('is-wrong');
      }
    }
    result.textContent = `${correct} / ${total} bien placés`;
    result.className = `exo__result ${correct === total ? 'is-correct' : ''}`;
    checkBtn.disabled = true;
    wrap.classList.add('is-locked');
    if (correct < total) revealBtn.hidden = false;
    ctx.complete({ correct, total });
  });

  container.appendChild(wrap);
};

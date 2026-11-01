import type { EngineRenderer } from './types';
import { createRevealButton } from './reveal';
import { glyphToHTML } from './note-glyphs';

interface ClickTargetIcon {
  id: string;
  glyph: string;
  isBeatStart: boolean;
}

interface ClickTargetRow {
  id: string;
  label?: string;
  icons: ClickTargetIcon[];
}

interface ClickTargetData {
  /** Plusieurs rangées de rythmes indépendantes (une par exercice à réaliser). */
  rows?: ClickTargetRow[];
  /** Rétrocompatibilité : une seule rangée sans label. */
  icons?: ClickTargetIcon[];
}

export const renderClickTarget: EngineRenderer = (container, rawData, ctx) => {
  const data = rawData as unknown as ClickTargetData;
  const rows: ClickTargetRow[] = data.rows ?? (data.icons ? [{ id: 'r1', icons: data.icons }] : []);

  const wrap = document.createElement('div');
  wrap.className = 'ct';

  const rowStates: { row: ClickTargetRow; selected: Set<string>; buttons: HTMLButtonElement[] }[] = [];

  for (const row of rows) {
    const rowWrap = document.createElement('div');
    rowWrap.className = 'ct__group';

    if (row.label) {
      const label = document.createElement('p');
      label.className = 'ct__label';
      label.textContent = row.label;
      rowWrap.appendChild(label);
    }

    const rowEl = document.createElement('div');
    rowEl.className = 'ct__row';
    const selected = new Set<string>();
    const buttons: HTMLButtonElement[] = [];

    for (const icon of row.icons) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'ct__icon';
      btn.innerHTML = glyphToHTML(icon.glyph);
      btn.setAttribute('aria-pressed', 'false');
      btn.addEventListener('click', () => {
        if (selected.has(icon.id)) {
          selected.delete(icon.id);
          btn.classList.remove('is-selected');
          btn.setAttribute('aria-pressed', 'false');
        } else {
          selected.add(icon.id);
          btn.classList.add('is-selected');
          btn.setAttribute('aria-pressed', 'true');
        }
      });
      buttons.push(btn);
      rowEl.appendChild(btn);
    }
    rowWrap.appendChild(rowEl);
    wrap.appendChild(rowWrap);
    rowStates.push({ row, selected, buttons });
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
    for (const { row, selected, buttons } of rowStates) {
      row.icons.forEach((icon, index) => {
        const chosen = selected.has(icon.id);
        const missed = icon.isBeatStart && !chosen;
        buttons[index].classList.toggle('is-answer', shown && missed);
      });
    }
  });

  actions.append(checkBtn, revealBtn, result);
  wrap.appendChild(actions);

  checkBtn.addEventListener('click', () => {
    let correct = 0;
    let total = 0;
    for (const { row, selected, buttons } of rowStates) {
      row.icons.forEach((icon, index) => {
        const btn = buttons[index];
        const chosen = selected.has(icon.id);
        const ok = chosen === icon.isBeatStart;
        btn.classList.toggle('is-correct', ok && icon.isBeatStart);
        btn.classList.toggle('is-wrong', !ok);
        if (ok) correct += 1;
        total += 1;
      });
    }
    result.textContent = `${correct} / ${total} notes correctement identifiées`;
    result.className = `exo__result ${correct === total ? 'is-correct' : ''}`;
    checkBtn.disabled = true;
    if (correct < total) revealBtn.hidden = false;
    ctx.complete({ correct, total });
  });

  container.appendChild(wrap);
};

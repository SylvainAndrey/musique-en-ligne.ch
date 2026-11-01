import type { EngineRenderer } from './types';
import { renderMediaRef, type MediaRef } from './media-embed';
import { createRevealButton } from './reveal';
import { replaceGlyphsInText } from './note-glyphs';

interface TrueFalseItem {
  statement: string;
  correct: boolean;
}

interface TrueFalseData {
  media?: MediaRef;
  items: TrueFalseItem[];
}

interface Row {
  item: TrueFalseItem;
  vraiBtn: HTMLButtonElement;
  fauxBtn: HTMLButtonElement;
  feedback: HTMLElement;
  choice: number;
}

export const renderTrueFalse: EngineRenderer = (container, rawData, ctx) => {
  const data = rawData as unknown as TrueFalseData;
  const wrap = document.createElement('div');
  wrap.className = 'tf';

  renderMediaRef(wrap, data.media);

  const rows: Row[] = [];

  for (const item of data.items) {
    const row = document.createElement('div');
    row.className = 'tf__row';
    const statement = document.createElement('p');
    statement.className = 'tf__statement';
    statement.innerHTML = replaceGlyphsInText(item.statement);
    row.appendChild(statement);

    const btnRow = document.createElement('div');
    btnRow.className = 'tf__buttons';
    const vraiBtn = document.createElement('button');
    vraiBtn.type = 'button';
    vraiBtn.className = 'tf__btn';
    vraiBtn.textContent = 'Vrai';
    const fauxBtn = document.createElement('button');
    fauxBtn.type = 'button';
    fauxBtn.className = 'tf__btn';
    fauxBtn.textContent = 'Faux';

    const rowState: Row = { item, vraiBtn, fauxBtn, feedback: document.createElement('span'), choice: -1 };
    vraiBtn.addEventListener('click', () => {
      vraiBtn.classList.add('is-selected');
      fauxBtn.classList.remove('is-selected');
      rowState.choice = 1;
    });
    fauxBtn.addEventListener('click', () => {
      fauxBtn.classList.add('is-selected');
      vraiBtn.classList.remove('is-selected');
      rowState.choice = 0;
    });
    btnRow.append(vraiBtn, fauxBtn);
    row.appendChild(btnRow);
    rowState.feedback.className = 'fb__feedback';
    row.appendChild(rowState.feedback);
    wrap.appendChild(row);
    rows.push(rowState);
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
    for (const row of rows) {
      const expected = row.item.correct ? 1 : 0;
      if (row.choice === expected) continue;
      const answerBtn = expected === 1 ? row.vraiBtn : row.fauxBtn;
      answerBtn.classList.toggle('is-answer', shown);
    }
  });

  actions.append(checkBtn, revealBtn, result);
  wrap.appendChild(actions);

  checkBtn.addEventListener('click', () => {
    let correct = 0;
    for (const row of rows) {
      const expected = row.item.correct ? 1 : 0;
      const ok = row.choice === expected;
      row.feedback.textContent = ok ? '✔' : '✘';
      row.feedback.className = `fb__feedback ${ok ? 'is-correct' : 'is-wrong'}`;
      (row.choice === 1 ? row.vraiBtn : row.choice === 0 ? row.fauxBtn : null)?.classList.add(ok ? 'is-correct' : 'is-wrong');
      if (ok) correct += 1;
    }
    result.textContent = `${correct} / ${rows.length} bonnes réponses`;
    result.className = `exo__result ${correct === rows.length ? 'is-correct' : ''}`;
    checkBtn.disabled = true;
    if (correct < rows.length) revealBtn.hidden = false;
    ctx.complete({ correct, total: rows.length });
  });

  container.appendChild(wrap);
};

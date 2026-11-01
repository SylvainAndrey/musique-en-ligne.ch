import type { EngineRenderer } from './types';
import { startMetronome, type MetronomeHandle } from '../audio';
import { createRevealButton } from './reveal';

interface ListenMeterItem {
  id: string;
  label: string;
  bpm: number;
  beatsPerBar: number;
  bars: number;
}

interface ListenMeterData {
  items: ListenMeterItem[];
}

export const renderListenMeter: EngineRenderer = (container, rawData, ctx) => {
  const data = rawData as unknown as ListenMeterData;
  const wrap = document.createElement('div');
  wrap.className = 'lm';

  const rows: { input: HTMLInputElement; feedback: HTMLElement; item: ListenMeterItem }[] = [];

  for (const item of data.items) {
    const row = document.createElement('div');
    row.className = 'lm__row';

    const label = document.createElement('span');
    label.className = 'lm__label';
    label.textContent = item.label;
    row.appendChild(label);

    const playBtn = document.createElement('button');
    playBtn.type = 'button';
    playBtn.className = 'btn btn-ghost';
    playBtn.textContent = '▶ Écouter';
    let handle: MetronomeHandle | null = null;
    playBtn.addEventListener('click', () => {
      if (handle) handle.stop();
      let count = 0;
      const total = item.beatsPerBar * item.bars;
      handle = startMetronome(item.bpm, item.beatsPerBar, () => {
        count += 1;
        if (count >= total && handle) {
          handle.stop();
        }
      });
      window.setTimeout(() => handle?.stop(), (total * 60000) / item.bpm + 200);
    });
    row.appendChild(playBtn);

    const input = document.createElement('input');
    input.type = 'number';
    input.min = '1';
    input.max = '12';
    input.placeholder = 'Nb de temps';
    input.className = 'lm__input';
    row.appendChild(input);

    const feedback = document.createElement('span');
    feedback.className = 'fb__feedback';
    row.appendChild(feedback);

    const answerSpan = document.createElement('span');
    answerSpan.className = 'lm__answer';
    answerSpan.style.display = 'none';
    row.appendChild(answerSpan);

    wrap.appendChild(row);
    rows.push({ input, feedback, item, answerSpan });
  }

  const actions = document.createElement('div');
  actions.className = 'exo__actions';
  const checkBtn = document.createElement('button');
  checkBtn.type = 'button';
  checkBtn.className = 'btn btn-primary';
  checkBtn.textContent = 'Vérifier mes réponses';
  const result = document.createElement('p');
  result.className = 'exo__result';

  const revealBtn = createRevealButton((shown) => {
    for (const row of rows) {
      row.answerSpan.style.display = shown ? '' : 'none';
    }
  });

  actions.append(checkBtn, revealBtn, result);
  wrap.appendChild(actions);

  checkBtn.addEventListener('click', () => {
    let correct = 0;
    for (const row of rows) {
      const ok = Number(row.input.value) === row.item.beatsPerBar;
      row.feedback.textContent = ok ? '✔' : '✘';
      row.feedback.className = `fb__feedback ${ok ? 'is-correct' : 'is-wrong'}`;
      if (!ok) row.answerSpan.textContent = `(réponse : ${row.item.beatsPerBar})`;
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

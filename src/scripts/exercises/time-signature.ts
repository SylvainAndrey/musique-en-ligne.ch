import type { EngineRenderer } from './types';
import { createRevealButton } from './reveal';

/**
 * Signatures rythmiques, deux modes :
 * - « read » : la signature est affichée (image), l'élève choisit le nombre de temps et, si demandé,
 *   l'unité de temps (ronde, blanche, noire…).
 * - « write » : l'élève compose une signature en choisissant un chiffre en haut et un chiffre en bas ;
 *   plusieurs signatures peuvent être acceptées (ex. 4/4, 4/2 ou 4/1 pour « 4 temps binaire »).
 */

interface ReadItem {
  label: string;
  image: string;
  imageAlt?: string;
  beats: number;
  /** Unité de temps attendue (une des valeurs de UNITS), si on la demande. */
  unit?: string;
}

interface WriteItem {
  label: string;
  /** Signatures acceptées, ex. ['4/4', '4/2', '4/1']. */
  accepted: string[];
}

interface TimeSignatureData {
  mode: 'read' | 'write';
  items: (ReadItem | WriteItem)[];
  /** Mode « read » : nombres de temps proposés (défaut 1 à 4). */
  beatOptions?: number[];
  /** Mode « write » : chiffres proposés en haut et en bas. */
  numerators?: number[];
  denominators?: number[];
}

export const UNITS = ['Ronde', 'Blanche', 'Noire', 'Croche', 'Double croche'];

function select(options: { value: string; label: string }[], aria: string, cls = 'ts__select'): HTMLSelectElement {
  const s = document.createElement('select');
  s.className = cls;
  s.setAttribute('aria-label', aria);
  s.append(new Option('…', ''));
  for (const o of options) s.append(new Option(o.label, o.value));
  return s;
}

export const renderTimeSignature: EngineRenderer = (container, rawData, ctx) => {
  const data = rawData as unknown as TimeSignatureData;
  const wrap = document.createElement('div');
  wrap.className = `ts ts--${data.mode}`;
  const grid = document.createElement('div');
  grid.className = 'ts__grid';
  wrap.appendChild(grid);

  type Check = { card: HTMLElement; ok: () => boolean; answer: string; lock: () => void };
  const checks: Check[] = [];

  data.items.forEach((raw) => {
    const card = document.createElement('div');
    card.className = 'ts__card';
    const label = document.createElement('p');
    label.className = 'ts__label';
    label.textContent = raw.label;
    card.appendChild(label);

    if (data.mode === 'read') {
      const item = raw as ReadItem;
      const img = document.createElement('img');
      img.className = 'ts__image';
      img.src = item.image;
      img.alt = item.imageAlt ?? '';
      card.appendChild(img);

      const beatOpts = (data.beatOptions ?? [1, 2, 3, 4]).map((n) => ({ value: String(n), label: `${n} temps` }));
      const beats = select(beatOpts, `${item.label} : nombre de temps`);
      const row1 = document.createElement('label');
      row1.className = 'ts__field';
      row1.append('Nombre de temps', beats);
      card.appendChild(row1);

      let unit: HTMLSelectElement | null = null;
      if (item.unit) {
        unit = select(UNITS.map((u) => ({ value: u, label: u })), `${item.label} : unité de temps`);
        const row2 = document.createElement('label');
        row2.className = 'ts__field';
        row2.append('Unité de temps', unit);
        card.appendChild(row2);
      }
      checks.push({
        card,
        ok: () => beats.value === String(item.beats) && (!unit || unit.value === item.unit),
        answer: `${item.beats} temps${item.unit ? ` — ${item.unit.toLowerCase()}` : ''}`,
        lock: () => {
          beats.disabled = true;
          if (unit) unit.disabled = true;
        },
      });
    } else {
      const item = raw as WriteItem;
      const nums = (data.numerators ?? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]).map((n) => ({ value: String(n), label: String(n) }));
      const dens = (data.denominators ?? [1, 2, 4, 8, 16]).map((n) => ({ value: String(n), label: String(n) }));
      const frac = document.createElement('div');
      frac.className = 'ts__fraction';
      const top = select(nums, `${item.label} : chiffre du haut`, 'ts__digit');
      const bar = document.createElement('span');
      bar.className = 'ts__bar';
      const bottom = select(dens, `${item.label} : chiffre du bas`, 'ts__digit');
      frac.append(top, bar, bottom);
      card.appendChild(frac);
      checks.push({
        card,
        ok: () => item.accepted.includes(`${top.value}/${bottom.value}`),
        answer: item.accepted.join(' ou '),
        lock: () => {
          top.disabled = true;
          bottom.disabled = true;
        },
      });
    }
    grid.appendChild(card);
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
    checks.forEach((c, i) => {
      if (!answers[i]) {
        answers[i] = document.createElement('p');
        answers[i].className = 'ts__answer';
        answers[i].textContent = `Réponse : ${c.answer}`;
        c.card.appendChild(answers[i]);
      }
      answers[i].hidden = !shown || c.card.classList.contains('is-correct');
    });
  });
  actions.append(checkBtn, revealBtn, result);
  wrap.appendChild(actions);

  checkBtn.addEventListener('click', () => {
    let correct = 0;
    checks.forEach((c) => {
      const ok = c.ok();
      c.card.classList.toggle('is-correct', ok);
      c.card.classList.toggle('is-wrong', !ok);
      c.lock();
      if (ok) correct += 1;
    });
    const total = checks.length;
    result.textContent = `${correct} / ${total} bonnes réponses`;
    result.className = `exo__result ${correct === total ? 'is-correct' : ''}`;
    checkBtn.disabled = true;
    if (correct < total) revealBtn.hidden = false;
    ctx.complete({ correct, total });
  });

  container.appendChild(wrap);
};

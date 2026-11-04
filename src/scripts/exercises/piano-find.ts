import type { EngineRenderer } from './types';
import { createRevealButton } from './reveal';
import { playPianoNote } from '../audio';

/**
 * « Trouve la touche » : pour chaque note demandée (ex. 'Mi#', 'Lab'), l'élève clique sur la
 * bonne touche d'un clavier de piano. Les équivalences enharmoniques sont acceptées (Mi# = Fa),
 * quelle que soit l'octave.
 */

interface PianoFindData {
  targets: string[];
  /** Affiche le nom des touches blanches (comme sur le clavier du test). Défaut : non. */
  showLabels?: boolean;
}

const WHITE = ['Do', 'Ré', 'Mi', 'Fa', 'Sol', 'La', 'Si'];
const WHITE_SEMI = [0, 2, 4, 5, 7, 9, 11];
const NATURAL_SEMITONE: Record<string, number> = { Do: 0, Ré: 2, Mi: 4, Fa: 5, Sol: 7, La: 9, Si: 11 };
const OCTAVES = 2;

function pitchClass(name: string): number | null {
  const m = name.trim().match(/^(Do|Ré|Re|Mi|Fa|Sol|La|Si)\s*(#|♯|b|♭)?$/i);
  if (!m) return null;
  let letter = m[1].charAt(0).toUpperCase() + m[1].slice(1).toLowerCase();
  if (letter === 'Re') letter = 'Ré';
  const delta = m[2] ? (/[#♯]/.test(m[2]) ? 1 : -1) : 0;
  return (((NATURAL_SEMITONE[letter] + delta) % 12) + 12) % 12;
}

const pretty = (name: string) => name.replace('#', '♯').replace(/(?<=[a-zé])b$/i, '♭');
const freqOf = (absSemitone: number) => 440 * Math.pow(2, (60 + absSemitone - 69) / 12);

export const renderPianoFind: EngineRenderer = (container, rawData, ctx) => {
  const data = rawData as unknown as PianoFindData;
  const wrap = document.createElement('div');
  wrap.className = 'pf';

  const chosen: (number | null)[] = data.targets.map(() => null);
  let active = 0;

  const chipsRow = document.createElement('div');
  chipsRow.className = 'pf__targets';
  const chips: HTMLButtonElement[] = data.targets.map((t, i) => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'pf__target';
    chip.innerHTML = `<span class="pf__badge">${i + 1}</span> ${pretty(t)}`;
    chip.addEventListener('click', () => {
      if (wrap.classList.contains('is-locked')) return;
      active = i;
      refresh();
    });
    chipsRow.appendChild(chip);
    return chip;
  });
  wrap.appendChild(chipsRow);

  const help = document.createElement('p');
  help.className = 'pf__help';
  wrap.appendChild(help);

  const piano = document.createElement('div');
  piano.className = 'piano pf__piano';
  const whiteRow = document.createElement('div');
  whiteRow.className = 'piano__white-row';
  const blackRow = document.createElement('div');
  blackRow.className = 'piano__black-row';
  piano.append(whiteRow, blackRow);

  const keys: { el: HTMLButtonElement; abs: number; tags: HTMLElement }[] = [];
  const whiteCount = WHITE.length * OCTAVES;

  function addKey(el: HTMLButtonElement, abs: number) {
    const tags = document.createElement('span');
    tags.className = 'pf__tags';
    el.appendChild(tags);
    el.addEventListener('click', () => {
      playPianoNote(freqOf(abs), 1.4);
      if (wrap.classList.contains('is-locked')) return;
      chosen[active] = abs;
      const next = chosen.findIndex((c, i) => c === null && i > active);
      const firstEmpty = chosen.findIndex((c) => c === null);
      active = next !== -1 ? next : firstEmpty !== -1 ? firstEmpty : active;
      refresh();
    });
    keys.push({ el, abs, tags });
  }

  for (let o = 0; o < OCTAVES; o++) {
    WHITE.forEach((name, i) => {
      const key = document.createElement('button');
      key.type = 'button';
      key.className = 'piano__key piano__key--white';
      key.setAttribute('aria-label', `Touche blanche ${o * 7 + i + 1}`);
      if (data.showLabels) {
        const label = document.createElement('span');
        label.className = 'piano__label';
        label.textContent = name.toUpperCase();
        key.appendChild(label);
      }
      whiteRow.appendChild(key);
      addKey(key, o * 12 + WHITE_SEMI[i]);
    });
  }
  for (let o = 0; o < OCTAVES; o++) {
    [0, 1, 3, 4, 5].forEach((afterWhite) => {
      const key = document.createElement('button');
      key.type = 'button';
      key.className = 'piano__key piano__key--black';
      key.setAttribute('aria-label', 'Touche noire');
      const whiteIndex = o * 7 + afterWhite;
      const keyWidth = (100 / whiteCount) * 0.62;
      key.style.width = `${keyWidth}%`;
      key.style.left = `${(whiteIndex + 1) * (100 / whiteCount) - keyWidth / 2}%`;
      blackRow.appendChild(key);
      addKey(key, o * 12 + WHITE_SEMI[afterWhite] + 1);
    });
  }
  wrap.appendChild(piano);

  function refresh() {
    chips.forEach((c, i) => {
      c.classList.toggle('is-active', i === active && !wrap.classList.contains('is-locked'));
      c.classList.toggle('is-set', chosen[i] !== null);
    });
    keys.forEach((k) => {
      k.tags.replaceChildren();
      chosen.forEach((abs, i) => {
        if (abs === k.abs) {
          const b = document.createElement('span');
          b.className = 'pf__badge';
          b.textContent = String(i + 1);
          k.tags.appendChild(b);
        }
      });
    });
    help.innerHTML = wrap.classList.contains('is-locked')
      ? ''
      : `Clique sur la touche correspondant à <strong>${active + 1}) ${pretty(data.targets[active])}</strong>.`;
  }
  refresh();

  const actions = document.createElement('div');
  actions.className = 'exo__actions';
  const checkBtn = document.createElement('button');
  checkBtn.type = 'button';
  checkBtn.className = 'btn btn-primary';
  checkBtn.textContent = 'Vérifier';
  const result = document.createElement('p');
  result.className = 'exo__result';

  const revealBtn = createRevealButton((shown) => {
    keys.forEach((k) => {
      const answerFor = data.targets
        .map((t, i) => ({ i, pc: pitchClass(t) }))
        .filter(({ pc }) => pc === k.abs % 12 && k.abs < 12);
      k.el.classList.toggle('is-answer', shown && answerFor.length > 0);
      k.el.title = shown && answerFor.length ? answerFor.map(({ i }) => `${i + 1}) ${pretty(data.targets[i])}`).join(', ') : '';
    });
  });

  actions.append(checkBtn, revealBtn, result);
  wrap.appendChild(actions);

  checkBtn.addEventListener('click', () => {
    let correct = 0;
    data.targets.forEach((t, i) => {
      const ok = chosen[i] !== null && chosen[i]! % 12 === pitchClass(t);
      chips[i].classList.toggle('is-correct', ok);
      chips[i].classList.toggle('is-wrong', !ok);
      if (ok) correct += 1;
    });
    const total = data.targets.length;
    wrap.classList.add('is-locked');
    refresh();
    result.textContent = `${correct} / ${total} touches correctes`;
    result.className = `exo__result ${correct === total ? 'is-correct' : ''}`;
    checkBtn.disabled = true;
    if (correct < total) revealBtn.hidden = false;
    ctx.complete({ correct, total });
  });

  container.appendChild(wrap);
};

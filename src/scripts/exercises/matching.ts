import type { EngineRenderer } from './types';
import { renderMediaRef, type MediaRef } from './media-embed';
import { createRevealButton } from './reveal';
import { replaceGlyphsInText } from './note-glyphs';

interface MatchPair {
  left: string;
  right: string;
}

interface MatchingData {
  media?: MediaRef;
  pairs: MatchPair[];
  /** Si vrai, agrandit la taille des caractères de la colonne de gauche (utile pour des glyphes musicaux). */
  largeLeft?: boolean;
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export const renderMatching: EngineRenderer = (container, rawData, ctx) => {
  const data = rawData as unknown as MatchingData;
  const wrap = document.createElement('div');
  wrap.className = 'match';

  renderMediaRef(wrap, data.media);

  const gridOuter = document.createElement('div');
  gridOuter.className = 'match__grid-outer';
  wrap.appendChild(gridOuter);

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'match__lines');
  gridOuter.appendChild(svg);

  const grid = document.createElement('div');
  grid.className = 'match__grid';
  gridOuter.appendChild(grid);

  const rightItems = shuffle(data.pairs.map((p, i) => ({ text: p.right, pairIndex: i })));

  let selectedLeft: { btn: HTMLButtonElement; pairIndex: number } | null = null;
  const madePairs = new Map<number, number>(); // leftPairIndex -> rightPairIndex chosen
  const leftButtons: { btn: HTMLButtonElement; pairIndex: number }[] = [];
  const rightButtons: { btn: HTMLButtonElement; pairIndex: number }[] = [];
  const lineByLeftIndex = new Map<number, SVGLineElement>();

  function drawLine(leftPairIndex: number, rightBtn: HTMLButtonElement) {
    const leftBtn = leftButtons.find((b) => b.pairIndex === leftPairIndex)?.btn;
    if (!leftBtn) return;
    const outerRect = gridOuter.getBoundingClientRect();
    const leftRect = leftBtn.getBoundingClientRect();
    const rightRect = rightBtn.getBoundingClientRect();
    const x1 = leftRect.right - outerRect.left;
    const y1 = leftRect.top + leftRect.height / 2 - outerRect.top;
    const x2 = rightRect.left - outerRect.left;
    const y2 = rightRect.top + rightRect.height / 2 - outerRect.top;

    let line = lineByLeftIndex.get(leftPairIndex);
    if (!line) {
      line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('class', 'match__line');
      svg.appendChild(line);
      lineByLeftIndex.set(leftPairIndex, line);
    }
    line.setAttribute('x1', String(x1));
    line.setAttribute('y1', String(y1));
    line.setAttribute('x2', String(x2));
    line.setAttribute('y2', String(y2));
  }

  const notes: { note: HTMLElement; leftBtn: HTMLButtonElement }[] = [];

  function positionNote(note: HTMLElement, leftBtn: HTMLButtonElement) {
    const outerRect = gridOuter.getBoundingClientRect();
    const leftRect = leftBtn.getBoundingClientRect();
    note.style.left = `${leftRect.left - outerRect.left}px`;
    note.style.top = `${leftRect.bottom - outerRect.top + 4}px`;
    note.style.width = `${leftRect.width}px`;
  }

  function redrawAllLines() {
    for (const [leftPairIndex, rightPairIndex] of madePairs.entries()) {
      const rightBtn = rightButtons.find((b) => b.pairIndex === rightPairIndex)?.btn;
      if (rightBtn) drawLine(leftPairIndex, rightBtn);
    }
    for (const { note, leftBtn } of notes) positionNote(note, leftBtn);
  }

  window.addEventListener('resize', redrawAllLines);

  // Grille à placement explicite (plutôt que deux colonnes empilées indépendamment) afin que
  // chaque rangée gauche/droite partage la même hauteur, même si les libellés font des longueurs différentes.
  data.pairs.forEach((pair, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = data.largeLeft ? 'match__item match__item--large' : 'match__item';
    btn.innerHTML = replaceGlyphsInText(pair.left);
    btn.style.gridColumn = '1';
    btn.style.gridRow = String(i + 1);
    btn.addEventListener('click', () => {
      if (madePairs.has(i)) return;
      leftButtons.forEach((b) => b.btn.classList.remove('is-active'));
      btn.classList.add('is-active');
      selectedLeft = { btn, pairIndex: i };
    });
    leftButtons.push({ btn, pairIndex: i });
    grid.appendChild(btn);
  });

  rightItems.forEach(({ text, pairIndex }, position) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'match__item';
    btn.innerHTML = replaceGlyphsInText(text);
    btn.style.gridColumn = '2';
    btn.style.gridRow = String(position + 1);
    btn.addEventListener('click', () => {
      if (!selectedLeft) return;
      const leftPairIndex = selectedLeft.pairIndex;
      if (madePairs.has(leftPairIndex)) return;
      madePairs.set(leftPairIndex, pairIndex);
      selectedLeft.btn.classList.remove('is-active');
      selectedLeft.btn.classList.add('is-paired');
      btn.classList.add('is-paired');
      btn.disabled = true;
      selectedLeft.btn.disabled = true;
      drawLine(leftPairIndex, btn);
      selectedLeft = null;
    });
    rightButtons.push({ btn, pairIndex });
    grid.appendChild(btn);
  });

  const actions = document.createElement('div');
  actions.className = 'exo__actions';
  const checkBtn = document.createElement('button');
  checkBtn.type = 'button';
  checkBtn.className = 'btn btn-primary';
  checkBtn.textContent = 'Vérifier';
  const result = document.createElement('p');
  result.className = 'exo__result';

  const answerNotes = new Map<number, HTMLElement>();
  const revealBtn = createRevealButton((shown) => {
    for (const [leftPairIndex, note] of answerNotes.entries()) {
      note.style.display = shown ? '' : 'none';
    }
  });

  actions.append(checkBtn, revealBtn, result);
  wrap.appendChild(actions);

  checkBtn.addEventListener('click', () => {
    let correct = 0;
    leftButtons.forEach(({ btn, pairIndex }) => {
      const chosenRight = madePairs.get(pairIndex);
      const ok = chosenRight === pairIndex;
      btn.classList.toggle('is-correct', ok);
      btn.classList.toggle('is-wrong', !ok);
      const line = lineByLeftIndex.get(pairIndex);
      line?.classList.toggle('is-correct', ok);
      line?.classList.toggle('is-wrong', !ok);
      if (ok) {
        correct += 1;
      } else {
        const note = document.createElement('span');
        note.className = 'match__answer';
        note.style.display = 'none';
        note.innerHTML = `→ ${replaceGlyphsInText(data.pairs[pairIndex].right)}`;
        gridOuter.appendChild(note);
        positionNote(note, btn);
        notes.push({ note, leftBtn: btn });
        answerNotes.set(pairIndex, note);
      }
    });
    result.textContent = `${correct} / ${leftButtons.length} paires correctes`;
    result.className = `exo__result ${correct === leftButtons.length ? 'is-correct' : ''}`;
    checkBtn.disabled = true;
    if (correct < leftButtons.length) revealBtn.hidden = false;
    ctx.complete({ correct, total: leftButtons.length });
  });

  container.appendChild(wrap);
};

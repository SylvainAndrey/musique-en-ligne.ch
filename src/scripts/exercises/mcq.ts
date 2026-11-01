import type { EngineRenderer } from './types';
import { renderMediaRef, renderSynthButton, renderChordButton, type MediaRef } from './media-embed';
import { createRevealButton } from './reveal';
import { replaceGlyphsInText } from './note-glyphs';

interface McqItem {
  question: string;
  options: string[];
  correctIndex: number;
  media?: MediaRef;
  synth?: string[];
  /** Notes jouées simultanément (accord), plutôt qu'en séquence. */
  chord?: string[];
  /** Image fixe (ex. portrait d'un artiste) affichée à côté du média audio. */
  image?: string;
  imageAlt?: string;
}

interface ChordPoolEntry {
  label: string;
  chord: string[];
  isMajor: boolean;
}

interface McqData {
  media?: MediaRef;
  items: McqItem[];
  /** Si vrai, l'ordre des questions est mélangé à chaque affichage et les questions sont numérotées automatiquement ("Extrait 1, 2, …"). */
  shuffle?: boolean;
  /**
   * Si présent, `items` est ignoré et remplacé à chaque affichage par `count` accords tirés
   * aléatoirement de ce pool (majeur/mineur mélangés), pour que les élèves s'entraînent avec
   * des accords différents à chaque rafraîchissement de page.
   */
  chordPool?: { entries: ChordPoolEntry[]; count: number };
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildItemsFromChordPool(pool: { entries: ChordPoolEntry[]; count: number }): McqItem[] {
  const chosen = shuffle(pool.entries).slice(0, Math.min(pool.count, pool.entries.length));
  return chosen.map((entry, index) => ({
    question: `Accord ${index + 1}`,
    chord: entry.chord,
    options: ['Majeur', 'Mineur'],
    correctIndex: entry.isMajor ? 0 : 1,
  }));
}

export const renderMcq: EngineRenderer = (container, rawData, ctx) => {
  const data = rawData as unknown as McqData;
  const wrap = document.createElement('div');
  wrap.className = 'mcq';

  renderMediaRef(wrap, data.media);

  const baseItems = data.chordPool ? buildItemsFromChordPool(data.chordPool) : data.items;
  const items = data.shuffle ? shuffle(baseItems) : baseItems;

  const questionBlocks: { item: McqItem; buttons: HTMLButtonElement[]; selected: number }[] = [];

  items.forEach((item, index) => {
    const block = document.createElement('div');
    block.className = 'mcq__block';

    renderMediaRef(block, item.media);
    renderSynthButton(block, item.synth);
    renderChordButton(block, item.chord);

    if (item.image) {
      const img = document.createElement('img');
      img.className = 'mcq__image';
      img.src = item.image;
      img.alt = item.imageAlt ?? '';
      block.appendChild(img);
    }

    const q = document.createElement('p');
    q.className = 'mcq__question';
    q.innerHTML = data.shuffle ? `Extrait ${index + 1}` : replaceGlyphsInText(item.question);
    block.appendChild(q);

    const state = { item, buttons: [] as HTMLButtonElement[], selected: -1 };
    const optionsWrap = document.createElement('div');
    optionsWrap.className = 'mcq__options';
    item.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'mcq__option';
      btn.innerHTML = replaceGlyphsInText(opt);
      btn.addEventListener('click', () => {
        state.buttons.forEach((b) => b.classList.remove('is-selected'));
        btn.classList.add('is-selected');
        state.selected = i;
      });
      state.buttons.push(btn);
      optionsWrap.appendChild(btn);
    });
    block.appendChild(optionsWrap);
    wrap.appendChild(block);
    questionBlocks.push(state);
  });

  const actions = document.createElement('div');
  actions.className = 'exo__actions';
  const checkBtn = document.createElement('button');
  checkBtn.type = 'button';
  checkBtn.className = 'btn btn-primary';
  checkBtn.textContent = 'Vérifier';
  const result = document.createElement('p');
  result.className = 'exo__result';

  const revealBtn = createRevealButton((shown) => {
    for (const state of questionBlocks) {
      if (state.selected === state.item.correctIndex) continue;
      state.buttons[state.item.correctIndex].classList.toggle('is-correct', shown);
    }
  });

  actions.append(checkBtn, revealBtn, result);
  wrap.appendChild(actions);

  checkBtn.addEventListener('click', () => {
    let correct = 0;
    for (const state of questionBlocks) {
      if (state.selected === -1) continue;
      const ok = state.selected === state.item.correctIndex;
      state.buttons[state.selected].classList.add(ok ? 'is-correct' : 'is-wrong');
      if (ok) correct += 1;
      state.buttons.forEach((b) => (b.disabled = true));
    }
    result.textContent = `${correct} / ${questionBlocks.length} bonnes réponses`;
    result.className = `exo__result ${correct === questionBlocks.length ? 'is-correct' : ''}`;
    checkBtn.disabled = true;
    if (correct < questionBlocks.length) revealBtn.hidden = false;
    ctx.complete({ correct, total: questionBlocks.length });
  });

  container.appendChild(wrap);
};

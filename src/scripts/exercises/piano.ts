import type { EngineRenderer } from './types';
import { playPianoNote, C_MAJOR_FREQ } from '../audio';
import { renderMediaRef, type MediaRef } from './media-embed';

interface PianoAlongItem {
  label: string;
  media: MediaRef;
}

interface PianoAlongData {
  items: PianoAlongItem[];
  /** Si vrai, masque le bouton "Marquer comme terminé" (utile pour un clavier de pratique libre, sans tâche précise à valider). */
  hideDoneButton?: boolean;
}

const WHITE_KEYS = ['do3', 're3', 'mi3', 'fa3', 'sol3', 'la3', 'si3', 'do4', 're4', 'mi4', 'fa4', 'sol4', 'la4', 'si4', 'do5'];
const BLACK_KEYS: { note: string; afterWhiteIndex: number }[] = [
  { note: 'do3#', afterWhiteIndex: 0 },
  { note: 're3#', afterWhiteIndex: 1 },
  { note: 'fa3#', afterWhiteIndex: 3 },
  { note: 'sol3#', afterWhiteIndex: 4 },
  { note: 'la3#', afterWhiteIndex: 5 },
  { note: 'do4#', afterWhiteIndex: 7 },
  { note: 're4#', afterWhiteIndex: 8 },
  { note: 'fa4#', afterWhiteIndex: 10 },
  { note: 'sol4#', afterWhiteIndex: 11 },
  { note: 'la4#', afterWhiteIndex: 12 },
];

const NOTE_LABEL: Record<string, string> = {
  do: 'Do', re: 'Ré', mi: 'Mi', fa: 'Fa', sol: 'Sol', la: 'La', si: 'Si',
};

// Équivalent enharmonique (bémol) de chaque note diésée : do# = réb, ré# = mib, fa# = solb, sol# = lab, la# = sib.
const FLAT_EQUIVALENT: Record<string, string> = {
  do: 'Réb', re: 'Mib', fa: 'Solb', sol: 'Lab', la: 'Sib',
};

function noteDisplayName(note: string): string {
  const m = note.match(/^([a-z]+)(\d)(#?)$/);
  if (!m) return note;
  const [, base, , sharp] = m;
  return `${NOTE_LABEL[base] ?? base}${sharp ? '#' : ''}`;
}

/** Pour une touche noire, renvoie le libellé double dièse/bémol, ex: "Do#/Réb". */
function blackKeyLabel(note: string): string {
  const m = note.match(/^([a-z]+)(\d)#$/);
  if (!m) return noteDisplayName(note);
  const [, base] = m;
  const sharpName = noteDisplayName(note);
  const flatName = FLAT_EQUIVALENT[base] ?? '';
  return flatName ? `${sharpName}/${flatName}` : sharpName;
}

function playNote(note: string) {
  const freq = C_MAJOR_FREQ[note];
  if (freq) playPianoNote(freq);
}

/** Construit un clavier de piano virtuel jouable (2 octaves) et l'insère dans `container`. */
export function renderPianoKeyboard(container: HTMLElement): void {
  const piano = document.createElement('div');
  piano.className = 'piano';

  const whiteRow = document.createElement('div');
  whiteRow.className = 'piano__white-row';
  piano.appendChild(whiteRow);

  WHITE_KEYS.forEach((note) => {
    const key = document.createElement('button');
    key.type = 'button';
    key.className = 'piano__key piano__key--white';
    key.title = noteDisplayName(note);
    const label = document.createElement('span');
    label.className = 'piano__label';
    label.textContent = noteDisplayName(note);
    key.appendChild(label);
    key.addEventListener('pointerdown', () => key.classList.add('is-active'));
    key.addEventListener('pointerup', () => key.classList.remove('is-active'));
    key.addEventListener('pointerleave', () => key.classList.remove('is-active'));
    key.addEventListener('click', () => playNote(note));
    whiteRow.appendChild(key);
  });

  const blackRow = document.createElement('div');
  blackRow.className = 'piano__black-row';
  piano.appendChild(blackRow);

  BLACK_KEYS.forEach(({ note, afterWhiteIndex }) => {
    const key = document.createElement('button');
    key.type = 'button';
    key.className = 'piano__key piano__key--black';
    key.title = blackKeyLabel(note).replace('/', ' / ');
    key.style.left = `calc(${(afterWhiteIndex + 1) * (100 / WHITE_KEYS.length)}% - 1.25rem)`;
    const [sharpName, flatName] = blackKeyLabel(note).split('/');
    const label = document.createElement('span');
    label.className = 'piano__label piano__label--black';
    const sharpLine = document.createElement('span');
    sharpLine.textContent = sharpName;
    label.appendChild(sharpLine);
    if (flatName) {
      const flatLine = document.createElement('span');
      flatLine.textContent = flatName;
      label.appendChild(flatLine);
    }
    key.appendChild(label);
    key.addEventListener('pointerdown', () => key.classList.add('is-active'));
    key.addEventListener('pointerup', () => key.classList.remove('is-active'));
    key.addEventListener('pointerleave', () => key.classList.remove('is-active'));
    key.addEventListener('click', () => playNote(note));
    blackRow.appendChild(key);
  });

  container.appendChild(piano);
}

export const renderPianoAlong: EngineRenderer = (container, rawData, ctx) => {
  const data = rawData as unknown as PianoAlongData;
  const wrap = document.createElement('div');
  wrap.className = 'piano-along';

  for (const item of data.items) {
    const block = document.createElement('div');
    block.className = 'piano-along__block';
    const label = document.createElement('p');
    label.className = 'piano-along__label';
    label.textContent = item.label;
    block.appendChild(label);
    renderMediaRef(block, item.media);
    wrap.appendChild(block);
  }

  const pianoWrap = document.createElement('div');
  pianoWrap.className = 'piano-along__piano';
  renderPianoKeyboard(pianoWrap);
  wrap.appendChild(pianoWrap);

  if (!data.hideDoneButton) {
    const actions = document.createElement('div');
    actions.className = 'exo__actions';
    const doneBtn = document.createElement('button');
    doneBtn.type = 'button';
    doneBtn.className = 'btn btn-primary';
    doneBtn.textContent = 'Marquer comme terminé';
    const result = document.createElement('p');
    result.className = 'exo__result';
    actions.append(doneBtn, result);
    wrap.appendChild(actions);

    doneBtn.addEventListener('click', () => {
      result.textContent = '✔ Exercice marqué comme terminé';
      result.className = 'exo__result is-correct';
      doneBtn.disabled = true;
      ctx.complete({});
    });
  }

  container.appendChild(wrap);
};

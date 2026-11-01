import type { EngineRenderer } from './types';
import { isAccepted } from './normalize';
import { createRevealButton } from './reveal';
import { renderMediaRef, type MediaRef } from './media-embed';
import { glyphToHTML, replaceGlyphsInText } from './note-glyphs';

interface FillBlankItem {
  id: string;
  prompt: string;
  hint?: string;
  accepted: string[];
  /** Caractère(s) musical(aux) affiché(s) séparément du texte, avec sa propre taille (voir .fb__glyph-big). */
  glyph?: string;
}

interface FillBlankData {
  layout: 'grid' | 'riddle' | 'list';
  items: FillBlankItem[];
  /** Agrandit la taille des glyphes musicaux dans les prompts (lisibilité). */
  large?: boolean;
  media?: MediaRef;
  /** Image statique (ex: diagramme) affichée au-dessus des items. */
  image?: string;
  imageAlt?: string;
}

export const renderFillBlank: EngineRenderer = (container, rawData, ctx) => {
  const data = rawData as unknown as FillBlankData;
  const wrap = document.createElement('div');
  wrap.className = `fb fb--${data.layout}${data.large ? ' fb--large' : ''}`;

  renderMediaRef(wrap, data.media);

  if (data.image) {
    const img = document.createElement('img');
    img.src = data.image;
    img.alt = data.imageAlt ?? '';
    img.className = 'fb__image';
    wrap.appendChild(img);
  }

  const inputs: { input: HTMLInputElement; feedback: HTMLElement; item: FillBlankItem }[] = [];

  for (const item of data.items) {
    const row = document.createElement('div');
    row.className = 'fb__row';

    const promptEl = document.createElement('div');
    promptEl.className = 'fb__prompt';
    if (item.glyph) {
      const glyphSpan = document.createElement('span');
      glyphSpan.className = 'fb__glyph-big';
      glyphSpan.innerHTML = glyphToHTML(item.glyph);
      const textSpan = document.createElement('span');
      textSpan.className = 'fb__prompt-text';
      textSpan.innerHTML = replaceGlyphsInText(item.prompt);
      promptEl.append(glyphSpan, textSpan);
    } else {
      promptEl.innerHTML = replaceGlyphsInText(item.prompt);
    }
    row.appendChild(promptEl);

    if (item.hint) {
      const hintEl = document.createElement('div');
      hintEl.className = 'fb__hint';
      hintEl.innerHTML = `Indice : ${replaceGlyphsInText(item.hint)}`;
      row.appendChild(hintEl);
    }

    const field = document.createElement('div');
    field.className = 'fb__field';
    const input = document.createElement('input');
    input.type = 'text';
    input.autocomplete = 'off';
    input.spellcheck = false;
    input.placeholder = 'Ta réponse…';
    input.setAttribute('aria-label', item.glyph ? `${item.glyph} ${item.prompt}` : item.prompt);
    const feedback = document.createElement('span');
    feedback.className = 'fb__feedback';
    field.append(input, feedback);
    row.appendChild(field);

    const answerSpan = document.createElement('span');
    answerSpan.className = 'fb__answer';
    answerSpan.style.display = 'none';
    row.appendChild(answerSpan);

    wrap.appendChild(row);
    inputs.push({ input, feedback, item, answerSpan });
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
    for (const row of inputs) {
      row.answerSpan.style.display = shown ? '' : 'none';
    }
  });

  actions.append(checkBtn, revealBtn, result);
  wrap.appendChild(actions);

  checkBtn.addEventListener('click', () => {
    let correct = 0;
    for (const row of inputs) {
      const ok = isAccepted(row.input.value, row.item.accepted);
      row.feedback.textContent = ok ? '✔' : '✘';
      row.feedback.className = `fb__feedback ${ok ? 'is-correct' : 'is-wrong'}`;
      row.input.classList.toggle('is-correct', ok);
      row.input.classList.toggle('is-wrong', !ok);
      if (!ok) row.answerSpan.textContent = `Réponse : ${row.item.accepted[0]}`;
      if (ok) correct += 1;
    }
    result.textContent = `${correct} / ${inputs.length} bonnes réponses`;
    result.className = `exo__result ${correct === inputs.length ? 'is-correct' : ''}`;
    checkBtn.disabled = true;
    if (correct < inputs.length) revealBtn.hidden = false;
    ctx.complete({ correct, total: inputs.length });
  });

  container.appendChild(wrap);
};

import type { EngineRenderer } from './types';

interface IframeGameData {
  /** Chemin vers la page autonome du jeu, ex. "/jeux/xylophone-cest-le-vent/index.html". */
  src: string;
  title?: string;
  /** Hauteur de l'iframe en pixels (bureau/tablette — réduite automatiquement sur mobile). */
  height?: number;
  /** Si vrai, n'affiche pas le bouton "Marquer comme terminé" (jeu en libre accès, non noté). */
  hideDoneButton?: boolean;
}

export const renderIframeGame: EngineRenderer = (container, rawData, ctx) => {
  const data = rawData as unknown as IframeGameData;
  const wrap = document.createElement('div');
  wrap.className = 'iframe-game';

  const frame = document.createElement('iframe');
  frame.className = 'iframe-game__frame';
  frame.src = data.src;
  frame.title = data.title ?? 'Jeu interactif';
  frame.loading = 'lazy';
  frame.allow = 'autoplay';
  frame.style.setProperty('--iframe-h', `${data.height ?? 640}px`);
  wrap.appendChild(frame);

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

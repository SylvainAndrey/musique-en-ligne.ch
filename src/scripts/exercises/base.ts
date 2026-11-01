import type { EngineRenderer } from './types';
import { saveResult } from '../progress';
import { renderFillBlank } from './fill-blank';
import { renderClickTarget } from './click-target';
import { renderTapTempo } from './tap-tempo';
import { renderListenMeter } from './listen-meter';
import { renderRhythmFill } from './rhythm-fill';
import { renderPracticeTool } from './practice-tool';
import { renderMcq } from './mcq';
import { renderTrueFalse } from './true-false';
import { renderMatching } from './matching';
import { renderOrdering } from './ordering';
import { renderPianoAlong } from './piano';
import { renderNoteRead } from './note-read';
import { renderScaleFix } from './scale-fix';
import { renderComposite } from './composite';
import { renderIframeGame } from './iframe-game';

const ENGINES: Record<string, EngineRenderer> = {
  'fill-blank': renderFillBlank,
  'click-target': renderClickTarget,
  'tap-tempo': renderTapTempo,
  'listen-meter': renderListenMeter,
  'rhythm-fill': renderRhythmFill,
  'practice-tool': renderPracticeTool,
  'mcq': renderMcq,
  'true-false': renderTrueFalse,
  'matching': renderMatching,
  'ordering': renderOrdering,
  'piano-along': renderPianoAlong,
  'note-read': renderNoteRead,
  'scale-fix': renderScaleFix,
  'composite': renderComposite,
  'iframe-game': renderIframeGame,
};

class MelExercise extends HTMLElement {
  connectedCallback() {
    if (this.dataset.mounted) return;
    this.dataset.mounted = 'true';

    const configScript = this.querySelector('script[type="application/json"]');
    if (!configScript?.textContent) return;

    let config: { id: string; engine: string; data?: Record<string, unknown> };
    try {
      config = JSON.parse(configScript.textContent);
    } catch {
      return;
    }

    const renderer = ENGINES[config.engine];
    if (!renderer) return;

    const mount = document.createElement('div');
    mount.className = 'exo__mount';
    this.appendChild(mount);

    renderer(mount, config.data ?? {}, {
      complete: (result) => {
        saveResult(config.id, { done: true, correct: result.correct, total: result.total });
        this.classList.add('is-done');
        this.dispatchEvent(new CustomEvent('mel-exercise-done', { bubbles: true }));
      },
    });
  }
}

if (!customElements.get('mel-exercise')) {
  customElements.define('mel-exercise', MelExercise);
}

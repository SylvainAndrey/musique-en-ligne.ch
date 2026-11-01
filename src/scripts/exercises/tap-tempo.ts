import type { EngineRenderer } from './types';
import { startMetronome, type MetronomeHandle } from '../audio';

interface TapTempoData {
  bpm: number;
}

const TOLERANCE_MS = 160;
const TARGET_HITS = 16;

export const renderTapTempo: EngineRenderer = (container, rawData, ctx) => {
  const data = rawData as unknown as TapTempoData;
  const wrap = document.createElement('div');
  wrap.className = 'tt';

  const info = document.createElement('p');
  info.className = 'tt__info';
  info.textContent = `Tempo à suivre : ${data.bpm} BPM. Écoute quelques temps, puis clique sur "Je frappe" en rythme, sans regarder le métronome.`;
  wrap.appendChild(info);

  const startBtn = document.createElement('button');
  startBtn.type = 'button';
  startBtn.className = 'btn btn-primary';
  startBtn.textContent = '▶ Démarrer le métronome';
  wrap.appendChild(startBtn);

  const tapBtn = document.createElement('button');
  tapBtn.type = 'button';
  tapBtn.className = 'btn btn-accent';
  tapBtn.textContent = '👏 Je frappe';
  tapBtn.disabled = true;
  wrap.appendChild(tapBtn);

  const streakEl = document.createElement('p');
  streakEl.className = 'exo__result';
  wrap.appendChild(streakEl);

  let handle: MetronomeHandle | null = null;
  let beatTimes: number[] = [];
  let started = false;
  let bestStreak = 0;
  let streak = 0;
  let hits = 0;

  const beatMs = 60000 / data.bpm;

  startBtn.addEventListener('click', () => {
    if (handle) handle.stop();
    beatTimes = [];
    started = true;
    bestStreak = 0;
    streak = 0;
    hits = 0;
    tapBtn.disabled = false;
    streakEl.textContent = 'Métronome en cours… suis le tempo puis clique "Je frappe" à chaque temps.';
    streakEl.className = 'exo__result';
    handle = startMetronome(data.bpm, 4, () => {
      beatTimes.push(performance.now());
    });
  });

  tapBtn.addEventListener('click', () => {
    if (!started) return;
    const now = performance.now();
    const nearest = beatTimes.length ? beatTimes[beatTimes.length - 1] : now;
    const expectedNext = nearest + beatMs;
    const distToLast = Math.abs(now - nearest);
    const distToNext = Math.abs(now - expectedNext);
    const offset = Math.min(distToLast, distToNext);
    hits += 1;
    if (offset <= TOLERANCE_MS) {
      streak += 1;
      bestStreak = Math.max(bestStreak, streak);
    } else {
      streak = 0;
    }
    streakEl.textContent = `Série actuelle : ${streak} — Meilleure série : ${bestStreak} / ${TARGET_HITS}`;
    if (bestStreak >= TARGET_HITS) {
      streakEl.textContent += ' 🎉 Objectif atteint !';
      streakEl.className = 'exo__result is-correct';
      if (handle) handle.stop();
      tapBtn.disabled = true;
      ctx.complete({ correct: bestStreak, total: TARGET_HITS });
    }
  });

  const doneBtn = document.createElement('button');
  doneBtn.type = 'button';
  doneBtn.className = 'btn btn-ghost';
  doneBtn.textContent = "Marquer comme terminé";
  doneBtn.addEventListener('click', () => {
    if (handle) handle.stop();
    ctx.complete({ correct: bestStreak, total: TARGET_HITS });
    doneBtn.textContent = '✔ Terminé';
    doneBtn.disabled = true;
  });
  wrap.appendChild(doneBtn);

  container.appendChild(wrap);
};

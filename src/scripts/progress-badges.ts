import { countDoneWithPrefix, onProgressChange } from './progress';

function updateAll() {
  document.querySelectorAll<HTMLElement>('[data-progress-prefix]').forEach((el) => {
    const prefix = el.dataset.progressPrefix!;
    const total = Number(el.dataset.progressTotal ?? '0');
    if (!total) return;
    const done = countDoneWithPrefix(prefix);
    const pct = Math.round((done / total) * 100);
    const bar = el.querySelector<HTMLElement>('[data-progress-fill]');
    const label = el.querySelector<HTMLElement>('[data-progress-label]');
    if (bar) bar.style.width = `${pct}%`;
    const word = total !== 1 ? 'exercices' : 'exercice';
    if (label) label.textContent = done > 0 ? `${done}/${total} ${word} terminés` : `${total} ${word}`;
  });
}

updateAll();
onProgressChange(updateAll);
document.addEventListener('astro:page-load', updateAll);

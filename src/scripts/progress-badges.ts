import { countDoneIn, countDoneWithPrefix, onProgressChange } from './progress';

function updateAll() {
  document.querySelectorAll<HTMLElement>('[data-progress-prefix], [data-progress-ids]').forEach((el) => {
    const total = Number(el.dataset.progressTotal ?? '0');
    if (!total) return;
    // Liste exacte des exercices (évite de compter d'anciens exercices supprimés) ; sinon, préfixe.
    const ids = el.dataset.progressIds;
    const done = ids ? countDoneIn(ids.split('|')) : countDoneWithPrefix(el.dataset.progressPrefix ?? '');
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

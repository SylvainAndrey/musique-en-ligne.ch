/**
 * Bouton "Afficher les réponses" partagé par tous les moteurs d'exercice.
 * Reste caché tant que l'élève n'a pas cliqué sur "Vérifier" ; se révèle ensuite,
 * et permet de basculer l'affichage des bonnes réponses à la demande.
 */
export function createRevealButton(onToggle: (shown: boolean) => void): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'btn btn-ghost exo-reveal-btn';
  btn.textContent = 'Afficher les réponses';
  btn.hidden = true;
  let shown = false;
  btn.addEventListener('click', () => {
    shown = !shown;
    btn.textContent = shown ? 'Masquer les réponses' : 'Afficher les réponses';
    onToggle(shown);
  });
  return btn;
}

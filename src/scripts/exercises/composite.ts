import type { EngineRenderer } from './types';
import { renderFillBlank } from './fill-blank';
import { renderClickTarget } from './click-target';
import { renderRhythmFill } from './rhythm-fill';
import { renderMcq } from './mcq';
import { renderTrueFalse } from './true-false';
import { renderMatching } from './matching';

/**
 * Moteur "composite" : regroupe plusieurs sous-exercices (potentiellement de moteurs différents)
 * sous une seule carte d'exercice, à la manière des consignes numérotées d'une vraie évaluation
 * papier. Chaque partie garde son propre bouton "Vérifier" ; le résultat global (affiché dans la
 * barre de progression du thème) cumule les réponses correctes et le total de toutes les parties
 * au fur et à mesure qu'elles sont complétées.
 */
const SUB_ENGINES: Record<string, EngineRenderer> = {
  'fill-blank': renderFillBlank,
  'click-target': renderClickTarget,
  'rhythm-fill': renderRhythmFill,
  'mcq': renderMcq,
  'true-false': renderTrueFalse,
  'matching': renderMatching,
};

interface CompositePart {
  title: string;
  instructions?: string;
  engine: string;
  data?: Record<string, unknown>;
}

interface CompositeData {
  parts: CompositePart[];
}

export const renderComposite: EngineRenderer = (container, rawData, ctx) => {
  const data = rawData as unknown as CompositeData;
  const wrap = document.createElement('div');
  wrap.className = 'composite';

  const results: ({ correct: number; total: number } | null)[] = data.parts.map(() => null);

  function reportAggregate() {
    const done = results.filter((r): r is { correct: number; total: number } => r !== null);
    const correct = done.reduce((acc, r) => acc + (r.correct ?? 0), 0);
    const total = done.reduce((acc, r) => acc + (r.total ?? 0), 0);
    ctx.complete({ correct, total });
  }

  data.parts.forEach((part, index) => {
    const partEl = document.createElement('div');
    partEl.className = 'composite__part';

    const heading = document.createElement('h3');
    heading.className = 'composite__part-title';
    heading.textContent = part.title;
    partEl.appendChild(heading);

    if (part.instructions) {
      const instr = document.createElement('p');
      instr.className = 'composite__part-instructions';
      instr.textContent = part.instructions;
      partEl.appendChild(instr);
    }

    const mount = document.createElement('div');
    partEl.appendChild(mount);
    wrap.appendChild(partEl);

    const renderer = SUB_ENGINES[part.engine];
    if (!renderer) return;
    renderer(mount, part.data ?? {}, {
      complete: (result) => {
        results[index] = { correct: result.correct ?? 0, total: result.total ?? 0 };
        reportAggregate();
      },
    });
  });

  container.appendChild(wrap);
};

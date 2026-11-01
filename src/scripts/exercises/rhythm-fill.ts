import type { EngineRenderer } from './types';
import { createRevealButton } from './reveal';
import { NOTE_SVG_BY_KEY, replaceGlyphsInText } from './note-glyphs';

interface RhythmFillRow {
  id: string;
  label: string;
  target?: number;
  freeform?: boolean;
  /** Éléments déjà placés et non modifiables (ex. une mesure partiellement complétée), par clé de palette. */
  given?: string[];
}

type RhythmPaletteType = 'note-values' | 'body-percussion' | 'ternary-cells';

interface RhythmFillGroup {
  /** Titre affiché au-dessus de ce groupe (bar + palette), ex. "Mesures binaires". */
  label?: string;
  paletteType: RhythmPaletteType;
  rows: RhythmFillRow[];
  excludeKeys?: string[];
  extraKeys?: string[];
  requireDistinct?: boolean;
}

interface RhythmFillData {
  paletteType?: RhythmPaletteType;
  rows?: RhythmFillRow[];
  /** Nombre minimum de rangées à remplir (utilisé avec des rangées freeform + un bouton "Ajouter"). */
  minRows?: number;
  /** Si vrai, les rangées à objectif (target) doivent toutes être différentes les unes des autres. */
  requireDistinct?: boolean;
  /** Exclut certains éléments de la palette par leur clé (ex. pour ne pas proposer les rythmes pointés). */
  excludeKeys?: string[];
  /** Ajoute des éléments optionnels (hors palette de base) par leur clé, ex. 'double-croche-seule'. */
  extraKeys?: string[];
  /** Si vrai, tous les éléments se glissent dans une (ou plusieurs, voir `groups`) barre(s) horizontale(s), segmentée(s) automatiquement en mesures selon les objectifs des rangées. */
  dragBar?: boolean;
  /** Plusieurs groupes indépendants (bar + palette chacun), ex. un pour le binaire, un pour le ternaire. Si présent, remplace `paletteType`/`rows`/`excludeKeys`/`extraKeys`/`requireDistinct` du niveau racine. */
  groups?: RhythmFillGroup[];
}

type PaletteEntry = { key: string; label: string; glyph: string; beats?: number; svg?: string };

function glyphHTML(p: { key: string; glyph: string; svg?: string }): string {
  return p.svg ?? NOTE_SVG_BY_KEY[p.key] ?? replaceGlyphsInText(p.glyph);
}

const NOTE_PALETTE: PaletteEntry[] = [
  { key: 'ronde', label: 'Ronde', glyph: '𝅝', beats: 4 },
  { key: 'demi-pause', label: 'Demi-pause', glyph: '𝄼', beats: 2 },
  { key: 'blanche', label: 'Blanche', glyph: '𝅗𝅥', beats: 2 },
  { key: 'soupir', label: 'Soupir', glyph: '𝄽', beats: 1 },
  { key: 'noire', label: 'Noire', glyph: '♩', beats: 1 },
  { key: 'demi-soupir', label: 'Demi-soupir', glyph: '𝄾', beats: 0.5 },
  { key: 'croche', label: 'Croche', glyph: '♪', beats: 0.5 },
  { key: 'quart-de-soupir', label: 'Quart de soupir', glyph: '𝄿', beats: 0.25 },
  { key: 'doubles-croches', label: 'Doubles croches', glyph: '♬', beats: 0.5 },
  { key: 'croche-pointee', label: 'Croche pointée', glyph: '♪.', beats: 0.75 },
  { key: 'noire-pointee', label: 'Noire pointée', glyph: '♩.', beats: 1.5 },
];

const BODY_PALETTE: PaletteEntry[] = [
  { key: 'pieds', label: 'Pieds', glyph: '🦶' },
  { key: 'cuisses', label: 'Cuisses', glyph: '🦵' },
  { key: 'torse', label: 'Torse', glyph: '✋' },
  { key: 'mains', label: 'Mains', glyph: '👏' },
  { key: 'doigts', label: 'Doigts', glyph: '🤏' },
];

/**
 * Cellules rythmiques ternaires complètes (chacune remplit exactement un temps ternaire,
 * soit 3 croches) plutôt que des notes isolées : on choisit une cellule entière à la fois.
 */
const TERNARY_CELL_PALETTE: PaletteEntry[] = [
  { key: 'trois-croches', label: 'Trois croches', glyph: '♪ ♪ ♪', beats: 3 },
  { key: 'noire-croche', label: 'Noire-croche', glyph: '♩ ♪', beats: 3 },
  { key: 'croche-noire', label: 'Croche-noire', glyph: '♪ ♩', beats: 3 },
  { key: 'sicilienne', label: 'Sicilienne', glyph: '♪. 𝅘𝅥𝅯 ♪', beats: 3 },
  { key: 'deux-doubles-deux-croches', label: 'Deux doubles croches, deux croches', glyph: '♬ ♪ ♪', beats: 3 },
  { key: 'six-doubles-croches', label: 'Six doubles croches', glyph: '♬ ♬ ♬', beats: 3 },
];

/** Éléments optionnels, activés au cas par cas via `extraKeys` pour ne pas polluer la palette par défaut partout. */
const EXTRA_PALETTE_ENTRIES: Record<string, PaletteEntry> = {
  'double-croche-seule': { key: 'double-croche-seule', label: 'Double croche', glyph: '♬', beats: 0.25 },
  'deux-croches': { key: 'deux-croches', label: 'Deux croches liées', glyph: '♫', beats: 1 },
  'quatre-doubles-croches': { key: 'quatre-doubles-croches', label: 'Quatre doubles croches liées', glyph: '♬♬', beats: 1 },
};

function formatBeats(n: number): string {
  return Number.isInteger(n) ? `${n}` : n.toString();
}

/** Résout des clés de palette (ex. pour des éléments "donnés", déjà placés) en entrées complètes, indépendamment de excludeKeys. */
function resolveGivenItems(paletteType: RhythmPaletteType | undefined, keys?: string[]): PaletteEntry[] {
  if (!keys || keys.length === 0) return [];
  const fullPalette = paletteType === 'body-percussion' ? BODY_PALETTE : paletteType === 'ternary-cells' ? TERNARY_CELL_PALETTE : NOTE_PALETTE;
  const byKey = new Map(fullPalette.map((p) => [p.key, p] as const));
  for (const [k, v] of Object.entries(EXTRA_PALETTE_ENTRIES)) byKey.set(k, v);
  return keys.map((k) => byKey.get(k)).filter((p): p is PaletteEntry => Boolean(p));
}

function resolvePalette(paletteType: RhythmPaletteType | undefined, excludeKeys?: string[], extraKeys?: string[]): PaletteEntry[] {
  const fullPalette = paletteType === 'body-percussion' ? BODY_PALETTE : paletteType === 'ternary-cells' ? TERNARY_CELL_PALETTE : NOTE_PALETTE;
  let palette = excludeKeys ? fullPalette.filter((p) => !excludeKeys.includes(p.key)) : fullPalette;
  if (extraKeys) {
    palette = [...palette, ...extraKeys.map((k) => EXTRA_PALETTE_ENTRIES[k]).filter((p): p is PaletteEntry => Boolean(p))];
  }
  return palette;
}

export const renderRhythmFill: EngineRenderer = (container, rawData, ctx) => {
  const data = rawData as unknown as RhythmFillData;

  const wrap = document.createElement('div');
  wrap.className = 'rf';

  if (data.dragBar) {
    const groups: RhythmFillGroup[] = data.groups ?? [
      {
        paletteType: data.paletteType ?? 'note-values',
        rows: data.rows ?? [],
        excludeKeys: data.excludeKeys,
        extraKeys: data.extraKeys,
        requireDistinct: data.requireDistinct,
      },
    ];
    renderDragBarMode(wrap, groups, ctx);
    container.appendChild(wrap);
    return;
  }

  const palette = resolvePalette(data.paletteType, data.excludeKeys, data.extraKeys);

  const rowsList = document.createElement('div');
  wrap.appendChild(rowsList);

  const rowStates: { row: RhythmFillRow; total: HTMLElement; chosen: { key: string; glyph: string; beats?: number; svg?: string }[]; givenSum: number }[] = [];
  let freeformCount = 0;

  function addRow(row: RhythmFillRow) {
    if (row.freeform) freeformCount += 1;
    const rowEl = document.createElement('div');
    rowEl.className = 'rf__row';

    const label = document.createElement('p');
    label.className = 'rf__label';
    label.textContent = row.target ? `${row.label} — objectif : ${formatBeats(row.target)} temps` : row.label;
    rowEl.appendChild(label);

    const sequence = document.createElement('div');
    sequence.className = 'rf__sequence';
    rowEl.appendChild(sequence);

    const total = document.createElement('p');
    total.className = 'rf__total';
    rowEl.appendChild(total);

    const givenItems = resolveGivenItems(data.paletteType, row.given);
    const givenSum = givenItems.reduce((acc, c) => acc + (c.beats ?? 0), 0);
    const chosen: { key: string; glyph: string; beats?: number; svg?: string }[] = [];
    const state = { row, total, chosen, givenSum };

    function renderSequence() {
      sequence.innerHTML = '';
      if (givenItems.length === 0 && chosen.length === 0) {
        const empty = document.createElement('span');
        empty.className = 'rf__empty';
        empty.textContent = 'Clique sur la palette pour construire ta séquence…';
        sequence.appendChild(empty);
      }
      for (const g of givenItems) {
        const chip = document.createElement('span');
        chip.className = 'rf__chip rf__chip--given';
        chip.title = 'Déjà placé';
        chip.innerHTML = glyphHTML(g);
        sequence.appendChild(chip);
      }
      for (const c of chosen) {
        const chip = document.createElement('span');
        chip.className = 'rf__chip';
        chip.innerHTML = glyphHTML(c);
        sequence.appendChild(chip);
      }
      if (row.target) {
        const sum = givenSum + chosen.reduce((acc, c) => acc + (c.beats ?? 0), 0);
        total.textContent = `Total : ${formatBeats(sum)} / ${formatBeats(row.target)} temps`;
        total.className = 'rf__total';
      } else {
        total.textContent = `${chosen.length} élément(s) placé(s)`;
      }
    }
    renderSequence();

    const paletteEl = document.createElement('div');
    paletteEl.className = 'rf__palette';
    for (const p of palette) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'rf__palette-btn';
      btn.innerHTML = `<span class="rf__glyph">${glyphHTML(p)}</span><span class="rf__plabel">${p.label}</span>`;
      btn.addEventListener('click', () => {
        chosen.push(p as { key: string; glyph: string; beats?: number; svg?: string });
        renderSequence();
      });
      paletteEl.appendChild(btn);
    }
    rowEl.appendChild(paletteEl);

    const rowActions = document.createElement('div');
    rowActions.className = 'rf__row-actions';
    const undoBtn = document.createElement('button');
    undoBtn.type = 'button';
    undoBtn.className = 'btn btn-ghost';
    undoBtn.textContent = '↺ Retirer le dernier';
    undoBtn.addEventListener('click', () => {
      chosen.pop();
      renderSequence();
    });
    rowActions.appendChild(undoBtn);
    rowEl.appendChild(rowActions);

    rowsList.appendChild(rowEl);
    rowStates.push(state);
  }

  const dataRows = data.rows ?? [];
  for (const row of dataRows) addRow(row);

  if (data.minRows && dataRows.some((r) => r.freeform)) {
    const template = dataRows.find((r) => r.freeform)!;
    const addBtn = document.createElement('button');
    addBtn.type = 'button';
    addBtn.className = 'btn btn-ghost';
    addBtn.textContent = '+ Ajouter un rythme';
    addBtn.addEventListener('click', () => {
      addRow({ id: `${template.id}-${freeformCount + 1}`, label: `Rythme ${freeformCount + 1}`, freeform: true });
    });
    wrap.appendChild(addBtn);
  }

  const actions = document.createElement('div');
  actions.className = 'exo__actions';
  const checkBtn = document.createElement('button');
  checkBtn.type = 'button';
  checkBtn.className = 'btn btn-primary';
  checkBtn.textContent = 'Vérifier';
  const result = document.createElement('p');
  result.className = 'exo__result';

  const revealBtn = createRevealButton((shown) => {
    for (const state of rowStates) {
      if (!state.row.target) continue;
      const sum = state.givenSum + state.chosen.reduce((acc, c) => acc + (c.beats ?? 0), 0);
      if (sum === state.row.target) continue;
      const missing = state.row.target - sum;
      state.total.textContent = shown
        ? `Total : ${formatBeats(sum)} / ${formatBeats(state.row.target)} temps — il manque ${formatBeats(Math.abs(missing))} temps${missing < 0 ? ' en trop' : ''}`
        : `Total : ${formatBeats(sum)} / ${formatBeats(state.row.target)} temps`;
    }
  });

  actions.append(checkBtn, revealBtn, result);
  wrap.appendChild(actions);

  checkBtn.addEventListener('click', () => {
    let correct = 0;
    let checkable = 0;

    let duplicateSignatures = new Set<string>();
    if (data.requireDistinct) {
      const targetStates = rowStates.filter((s) => s.row.target);
      const seen = new Map<string, number>();
      for (const state of targetStates) {
        const sig = state.chosen.map((c) => c.key).join(',');
        seen.set(sig, (seen.get(sig) ?? 0) + 1);
      }
      duplicateSignatures = new Set(
        Array.from(seen.entries())
          .filter(([, count]) => count > 1)
          .map(([sig]) => sig),
      );
    }

    for (const state of rowStates) {
      if (state.row.target) {
        checkable += 1;
        const sum = state.givenSum + state.chosen.reduce((acc, c) => acc + (c.beats ?? 0), 0);
        const sig = state.chosen.map((c) => c.key).join(',');
        const isDuplicate = duplicateSignatures.has(sig);
        const ok = sum === state.row.target && !isDuplicate;
        state.total.classList.toggle('is-correct', ok);
        state.total.classList.toggle('is-wrong', !ok);
        if (isDuplicate && sum === state.row.target) {
          state.total.textContent = `Total : ${formatBeats(sum)} / ${formatBeats(state.row.target)} temps — identique à une autre mesure`;
        }
        if (ok) correct += 1;
      } else if (state.chosen.length > 0) {
        correct += 1;
        checkable += 1;
      }
    }
    if (data.minRows) {
      const filled = rowStates.filter((s) => s.chosen.length > 0).length;
      result.textContent =
        filled >= data.minRows
          ? `${filled} rythme(s) créé(s) — objectif atteint !`
          : `${filled} / ${data.minRows} rythmes créés — continue !`;
      result.className = `exo__result ${filled >= data.minRows ? 'is-correct' : ''}`;
    } else {
      result.textContent = `${correct} / ${checkable} mesure(s) correcte(s)`;
      result.className = `exo__result ${correct === checkable ? 'is-correct' : ''}`;
    }
    if (correct < checkable) revealBtn.hidden = false;
    ctx.complete({ correct, total: checkable });
  });

  container.appendChild(wrap);
};

type DragBarItem = { key: string; glyph: string; beats: number; svg?: string };

interface DragBarGroupState {
  group: RhythmFillGroup;
  flat: DragBarItem[];
  bar: HTMLDivElement;
  status: HTMLElement;
  partition: () => { items: DragBarItem[]; sum: number }[];
  renderBar: () => void;
}

function createDragBarGroup(wrap: HTMLDivElement, container: HTMLElement, group: RhythmFillGroup): DragBarGroupState {
  const palette = resolvePalette(group.paletteType, group.excludeKeys, group.extraKeys);
  const flat: DragBarItem[] = [];
  const targets = group.rows.map((r) => r.target ?? 0);

  if (group.label) {
    const label = document.createElement('p');
    label.className = 'rf__group-label';
    label.textContent = group.label;
    container.appendChild(label);
  }

  const bar = document.createElement('div');
  bar.className = 'rf__bar';
  container.appendChild(bar);

  const status = document.createElement('p');
  status.className = 'rf__bar-status';
  container.appendChild(status);

  function partition(): { items: DragBarItem[]; sum: number }[] {
    const measures: { items: DragBarItem[]; sum: number }[] = [];
    let idx = 0;
    for (const target of targets) {
      let sum = 0;
      const items: DragBarItem[] = [];
      while (idx < flat.length && sum < target) {
        items.push(flat[idx]);
        sum += flat[idx].beats;
        idx += 1;
      }
      measures.push({ items, sum });
    }
    if (idx < flat.length) {
      const extra = flat.slice(idx);
      measures.push({ items: extra, sum: extra.reduce((acc, c) => acc + c.beats, 0) });
    }
    return measures;
  }

  function renderBar() {
    bar.innerHTML = '';
    const measures = partition();
    if (flat.length === 0) {
      const hint = document.createElement('span');
      hint.className = 'rf__bar-hint';
      hint.textContent = 'Glisse les rythmes ici pour construire les mesures…';
      bar.appendChild(hint);
    } else {
      let flatIndex = 0;
      measures.forEach((m, mi) => {
        m.items.forEach((it) => {
          const idxCapture = flatIndex;
          const chip = document.createElement('button');
          chip.type = 'button';
          chip.className = 'rf__chip rf__chip--placed';
          if (mi >= group.rows.length) chip.classList.add('rf__chip--overflow');
          chip.innerHTML = glyphHTML(it);
          chip.title = 'Cliquer pour retirer';
          chip.addEventListener('click', () => {
            if (wrap.classList.contains('is-locked')) return;
            flat.splice(idxCapture, 1);
            renderBar();
          });
          bar.appendChild(chip);
          flatIndex += 1;
        });
        if (mi < measures.length - 1) {
          const divider = document.createElement('span');
          divider.className = 'rf__divider';
          divider.textContent = '│';
          bar.appendChild(divider);
        }
      });
    }
    status.textContent = group.rows
      .map((r, i) => `${r.label} : ${formatBeats(measures[i]?.sum ?? 0)} / ${formatBeats(r.target ?? 0)} temps`)
      .join(' · ');
  }
  renderBar();

  function insertAtPosition(clientX: number, item: DragBarItem) {
    const chipEls = Array.from(bar.querySelectorAll('.rf__chip--placed')) as HTMLElement[];
    let index = chipEls.length;
    for (let i = 0; i < chipEls.length; i++) {
      const rect = chipEls[i].getBoundingClientRect();
      if (clientX < rect.left + rect.width / 2) {
        index = i;
        break;
      }
    }
    flat.splice(index, 0, item);
    renderBar();
  }

  const paletteEl = document.createElement('div');
  paletteEl.className = 'rf__palette';
  container.appendChild(paletteEl);

  for (const p of palette) {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'rf__palette-btn rf__palette-btn--draggable';
    chip.innerHTML = `<span class="rf__glyph">${glyphHTML(p)}</span><span class="rf__plabel">${p.label}</span>`;
    chip.addEventListener('pointerdown', (e: PointerEvent) => {
      if (wrap.classList.contains('is-locked')) return;
      e.preventDefault();
      const ghost = document.createElement('div');
      ghost.className = 'rf__chip rf__chip--ghost';
      ghost.innerHTML = glyphHTML(p);
      document.body.appendChild(ghost);

      const isOverBar = (ev: PointerEvent) => {
        const rect = bar.getBoundingClientRect();
        return ev.clientX >= rect.left - 10 && ev.clientX <= rect.right + 10 && ev.clientY >= rect.top - 20 && ev.clientY <= rect.bottom + 20;
      };
      const move = (ev: PointerEvent) => {
        ghost.style.left = `${ev.clientX}px`;
        ghost.style.top = `${ev.clientY}px`;
        bar.classList.toggle('is-drag-over', isOverBar(ev));
      };
      const up = (ev: PointerEvent) => {
        document.removeEventListener('pointermove', move);
        document.removeEventListener('pointerup', up);
        ghost.remove();
        bar.classList.remove('is-drag-over');
        if (isOverBar(ev)) insertAtPosition(ev.clientX, { key: p.key, glyph: p.glyph, beats: p.beats ?? 0, svg: p.svg });
      };
      document.addEventListener('pointermove', move);
      document.addEventListener('pointerup', up, { once: true });
      move(e);
    });
    paletteEl.appendChild(chip);
  }

  return { group, flat, bar, status, partition, renderBar };
}

function renderDragBarMode(wrap: HTMLDivElement, groups: RhythmFillGroup[], ctx: Parameters<EngineRenderer>[2]) {
  const groupStates = groups.map((group) => createDragBarGroup(wrap, wrap, group));

  function updateStatus(groupState: DragBarGroupState, shown: boolean) {
    const measures = groupState.partition();
    groupState.status.textContent = groupState.group.rows
      .map((r, i) => {
        const sum = measures[i]?.sum ?? 0;
        const target = r.target ?? 0;
        if (!shown || sum === target) return `${r.label} : ${formatBeats(sum)} / ${formatBeats(target)} temps`;
        const missing = target - sum;
        return `${r.label} : ${formatBeats(sum)} / ${formatBeats(target)} temps (il manque ${formatBeats(Math.abs(missing))}${missing < 0 ? ' en trop' : ''})`;
      })
      .join(' · ');
  }

  const actions = document.createElement('div');
  actions.className = 'exo__actions';
  const checkBtn = document.createElement('button');
  checkBtn.type = 'button';
  checkBtn.className = 'btn btn-primary';
  checkBtn.textContent = 'Vérifier';
  const result = document.createElement('p');
  result.className = 'exo__result';

  const revealBtn = createRevealButton((shown) => {
    for (const groupState of groupStates) updateStatus(groupState, shown);
  });

  actions.append(checkBtn, revealBtn, result);
  wrap.appendChild(actions);

  checkBtn.addEventListener('click', () => {
    let correct = 0;
    let total = 0;
    let anyOverflow = false;

    for (const groupState of groupStates) {
      const { group, partition } = groupState;
      const measures = partition();

      let duplicateSignatures = new Set<string>();
      if (group.requireDistinct) {
        const seen = new Map<string, number>();
        for (let i = 0; i < group.rows.length; i++) {
          const sig = (measures[i]?.items ?? []).map((it) => it.key).join(',');
          seen.set(sig, (seen.get(sig) ?? 0) + 1);
        }
        duplicateSignatures = new Set(Array.from(seen.entries()).filter(([, c]) => c > 1).map(([sig]) => sig));
      }

      const hasOverflow = measures.length > group.rows.length;
      if (hasOverflow) anyOverflow = true;
      group.rows.forEach((r, i) => {
        const m = measures[i] ?? { items: [], sum: 0 };
        const sig = m.items.map((it) => it.key).join(',');
        const isDuplicate = group.requireDistinct && duplicateSignatures.has(sig);
        const ok = m.sum === (r.target ?? 0) && !isDuplicate && !hasOverflow;
        if (ok) correct += 1;
        total += 1;
      });
    }

    result.textContent = `${correct} / ${total} mesure(s) correcte(s)${anyOverflow ? ' — retire les éléments en trop' : ''}`;
    result.className = `exo__result ${correct === total && !anyOverflow ? 'is-correct' : ''}`;
    checkBtn.disabled = true;
    wrap.classList.add('is-locked');
    if (correct < total || anyOverflow) revealBtn.hidden = false;
    ctx.complete({ correct, total });
  });
}

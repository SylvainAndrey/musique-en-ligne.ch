import type { EngineRenderer } from './types';
import { startMetronome, type MetronomeHandle } from '../audio';

interface ConductorOption {
  beats: number;
  label: string;
  arrows: string[];
}

interface PracticeToolData {
  bpm?: number;
  beatsPerBar?: number;
  steps?: string[];
  showConductorPattern?: boolean;
  sectionLabels?: string[];
  /** Si présent, affiche un sélecteur pour choisir le nombre de temps (et le schéma de direction associé). */
  conductorOptions?: ConductorOption[];
}

const CONDUCTOR_ARROWS = ['⬇️', '⬅️', '➡️', '⬆️'];

export const renderPracticeTool: EngineRenderer = (container, rawData, ctx) => {
  const data = rawData as unknown as PracticeToolData;
  const bpm = data.bpm ?? 100;
  const wrap = document.createElement('div');
  wrap.className = 'pt';

  if (data.steps?.length) {
    const list = document.createElement('ol');
    list.className = 'pt__steps';
    for (const step of data.steps) {
      const li = document.createElement('li');
      li.textContent = step;
      list.appendChild(li);
    }
    wrap.appendChild(list);
  }

  let beatsPerBar = data.beatsPerBar ?? data.conductorOptions?.[0]?.beats ?? 4;
  let pattern: HTMLElement | null = null;

  function renderConductorArrows(arrows: string[]) {
    if (!pattern) return;
    pattern.innerHTML = '';
    arrows.forEach((arrow, i) => {
      const cell = document.createElement('span');
      cell.className = 'pt__beat';
      cell.textContent = arrow;
      cell.dataset.beat = String(i);
      pattern!.appendChild(cell);
    });
  }

  if (data.conductorOptions?.length) {
    const selector = document.createElement('div');
    selector.className = 'pt__conductor-select';
    const optionBtns: HTMLButtonElement[] = [];
    data.conductorOptions.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'btn btn-ghost pt__option-btn';
      btn.textContent = opt.label;
      btn.addEventListener('click', () => {
        optionBtns.forEach((b) => b.classList.remove('is-selected'));
        btn.classList.add('is-selected');
        beatsPerBar = opt.beats;
        renderConductorArrows(opt.arrows);
        if (handle) {
          handle.stop();
          startPlaying();
        }
      });
      optionBtns.push(btn);
      selector.appendChild(btn);
      if (i === 0) btn.classList.add('is-selected');
    });
    wrap.appendChild(selector);

    pattern = document.createElement('div');
    pattern.className = 'pt__conductor';
    wrap.appendChild(pattern);
    renderConductorArrows(data.conductorOptions[0].arrows);
  } else if (data.showConductorPattern) {
    pattern = document.createElement('div');
    pattern.className = 'pt__conductor';
    wrap.appendChild(pattern);
    renderConductorArrows(CONDUCTOR_ARROWS);
  }

  let sectionEl: HTMLElement | null = null;
  if (data.sectionLabels?.length) {
    sectionEl = document.createElement('div');
    sectionEl.className = 'pt__sections';
    for (const label of data.sectionLabels) {
      const chip = document.createElement('span');
      chip.className = 'pt__section-chip';
      chip.textContent = label;
      sectionEl.appendChild(chip);
    }
    wrap.appendChild(sectionEl);
  }

  const controls = document.createElement('div');
  controls.className = 'pt__controls';

  const sliderWrap = document.createElement('label');
  sliderWrap.className = 'pt__slider';
  const sliderLabel = document.createElement('span');
  sliderLabel.textContent = `Tempo : ${bpm} BPM`;
  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = '50';
  slider.max = '160';
  slider.value = String(bpm);
  slider.addEventListener('input', () => {
    sliderLabel.textContent = `Tempo : ${slider.value} BPM`;
    if (handle) {
      handle.stop();
      startPlaying();
    }
  });
  sliderWrap.append(sliderLabel, slider);
  controls.appendChild(sliderWrap);

  const toggleBtn = document.createElement('button');
  toggleBtn.type = 'button';
  toggleBtn.className = 'btn btn-primary';
  toggleBtn.textContent = '▶ Démarrer le métronome';
  controls.appendChild(toggleBtn);
  wrap.appendChild(controls);

  let handle: MetronomeHandle | null = null;
  let beatCounter = 0;
  let sectionIndex = 0;

  function startPlaying() {
    beatCounter = 0;
    sectionIndex = 0;
    handle = startMetronome(Number(slider.value), beatsPerBar, (beatIndex) => {
      wrap.querySelectorAll('.pt__beat').forEach((el) => el.classList.remove('is-active'));
      const beatEl = wrap.querySelector(`.pt__beat[data-beat="${beatIndex}"]`);
      beatEl?.classList.add('is-active');

      if (beatIndex === 0 && sectionEl) {
        beatCounter += 1;
        if (beatCounter > 1) {
          sectionIndex = (sectionIndex + 1) % (data.sectionLabels?.length ?? 1);
        }
        sectionEl.querySelectorAll('.pt__section-chip').forEach((el, i) => {
          el.classList.toggle('is-active', i === sectionIndex);
        });
      }
    });
  }

  toggleBtn.addEventListener('click', () => {
    if (handle) {
      handle.stop();
      handle = null;
      toggleBtn.textContent = '▶ Démarrer le métronome';
      wrap.querySelectorAll('.pt__beat, .pt__section-chip').forEach((el) => el.classList.remove('is-active'));
    } else {
      startPlaying();
      toggleBtn.textContent = '⏸ Arrêter';
    }
  });

  const doneBtn = document.createElement('button');
  doneBtn.type = 'button';
  doneBtn.className = 'btn btn-ghost';
  doneBtn.textContent = 'Marquer comme terminé';
  doneBtn.addEventListener('click', () => {
    if (handle) handle.stop();
    ctx.complete({});
    doneBtn.textContent = '✔ Terminé';
    doneBtn.disabled = true;
  });
  wrap.appendChild(doneBtn);

  container.appendChild(wrap);
};

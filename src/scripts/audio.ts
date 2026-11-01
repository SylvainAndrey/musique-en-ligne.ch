let ctx: AudioContext | null = null;
let unlocked = false;

function getCtx(): AudioContext {
  if (!ctx) ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  return ctx;
}

/**
 * Débloque la session audio iOS de façon strictement synchrone, dans la même pile d'appel que le
 * geste utilisateur (clic). Sur certaines versions de Safari/iOS, appeler juste `resume()` (même
 * en l'attendant) ne suffit pas à activer réellement la sortie audio : il faut qu'un vrai noeud
 * sonore soit démarré (`start()`) de façon synchrone pendant le geste. On joue donc un buffer
 * muet d'un seul échantillon dès le tout premier appel, ce qui est la technique standard pour
 * fiabiliser l'audio Web Audio API sur iOS (utilisée par ex. par Howler.js).
 */
function unlockSync(): void {
  if (unlocked) return;
  unlocked = true;
  const audioCtx = getCtx();
  try {
    const buffer = audioCtx.createBuffer(1, 1, 22050);
    const source = audioCtx.createBufferSource();
    source.buffer = buffer;
    source.connect(audioCtx.destination);
    source.start(0);
  } catch {
    /* ignoré */
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
}

/**
 * Renvoie le contexte audio une fois qu'il est bien "running". Sur iOS/Safari, un contexte créé
 * ou réveillé pendant un geste utilisateur reste parfois à l'état "suspended" quelques instants :
 * si on programme des sons avant que `resume()` ne soit résolu, ils peuvent être perdus
 * silencieusement selon la version d'iOS. On attend donc systématiquement la reprise effective
 * avant de créer le moindre oscillateur.
 */
async function ensureRunning(): Promise<AudioContext> {
  unlockSync();
  const audioCtx = getCtx();
  if (audioCtx.state === 'suspended') {
    try {
      await audioCtx.resume();
    } catch {
      /* ignoré : on tente quand même de jouer le son ci-dessous */
    }
  }
  return audioCtx;
}

/** Joue un clic bref de métronome. accent=true pour le premier temps de la mesure. */
export function playClick(accent = false, time?: number) {
  const audioCtx = getCtx();
  const t = time ?? audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sine';
  osc.frequency.value = accent ? 1500 : 900;
  gain.gain.setValueAtTime(accent ? 0.5 : 0.32, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);
  osc.connect(gain).connect(audioCtx.destination);
  osc.start(t);
  osc.stop(t + 0.1);
}

export interface MetronomeHandle {
  stop: () => void;
}

/**
 * Démarre un métronome jouant `beatsPerBar` clics par mesure au tempo `bpm`,
 * en accentuant le premier temps. Appelle `onBeat(beatIndex)` à chaque temps.
 */
export function startMetronome(
  bpm: number,
  beatsPerBar: number,
  onBeat: (beatIndex: number) => void,
): MetronomeHandle {
  const secondsPerBeat = 60 / bpm;
  let beat = 0;
  let stopped = false;
  let timer: number;

  const scheduleAhead = 0.15;

  ensureRunning().then((audioCtx) => {
    if (stopped) return;
    let nextTime = audioCtx.currentTime + 0.05;

    function tick() {
      if (stopped) return;
      while (nextTime < audioCtx.currentTime + scheduleAhead) {
        const beatIndex = beat % beatsPerBar;
        playClick(beatIndex === 0, nextTime);
        const delay = Math.max(0, (nextTime - audioCtx.currentTime) * 1000);
        setTimeout(() => {
          if (!stopped) onBeat(beatIndex);
        }, delay);
        nextTime += secondsPerBeat;
        beat += 1;
      }
      timer = window.setTimeout(tick, 25);
    }
    tick();
  });

  return {
    stop() {
      stopped = true;
      window.clearTimeout(timer);
    },
  };
}

export function now(): number {
  return getCtx().currentTime;
}

/** Joue une brève mélodie à partir d'une liste de fréquences (Hz), une note toutes les `noteMs`. */
export function playSequence(frequencies: number[], noteMs = 420): void {
  ensureRunning().then((audioCtx) => {
    let t = audioCtx.currentTime + 0.05;
    const gapMs = noteMs * 0.15;
    for (const freq of frequencies) {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = freq;
      const dur = (noteMs - gapMs) / 1000;
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(0.4, t + 0.02);
      gain.gain.setValueAtTime(0.4, t + dur - 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      osc.connect(gain).connect(audioCtx.destination);
      osc.start(t);
      osc.stop(t + dur + 0.02);
      t += noteMs / 1000;
    }
  });
}

/**
 * Joue plusieurs notes simultanément (un accord) avec un son doux (sinusoïdal, attaque et
 * relâchement progressifs) qui permet de bien distinguer les notes empilées, sans les confondre
 * avec une mélodie jouée note après note.
 */
export function playChord(frequencies: number[], durationSec = 1.8): void {
  ensureRunning().then((audioCtx) => {
    const t = audioCtx.currentTime + 0.05;
    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.32, t + 0.09);
    gain.gain.setValueAtTime(0.32, t + durationSec * 0.5);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + durationSec);
    gain.connect(audioCtx.destination);
    for (const freq of frequencies) {
      const osc = audioCtx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;
      osc.connect(gain);
      osc.start(t);
      osc.stop(t + durationSec + 0.1);
    }
  });
}

/**
 * Joue une note avec un timbre approchant celui d'un piano acoustique : synthèse additive
 * (fondamentale + harmoniques d'amplitude décroissante) passée dans un filtre passe-bas dont
 * la fréquence de coupure décroît avec le temps, et enveloppe percussive (attaque rapide,
 * longue décroissance exponentielle), comme le son produit par un marteau frappant une corde.
 */
export function playPianoNote(freq: number, durationSec = 2.4): void {
  ensureRunning().then((audioCtx) => {
    const t = audioCtx.currentTime;

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.Q.value = 0.7;
    filter.frequency.setValueAtTime(freq * 10, t);
    filter.frequency.exponentialRampToValueAtTime(Math.max(freq * 1.5, 200), t + durationSec * 0.8);

    const master = audioCtx.createGain();
    master.gain.setValueAtTime(0.0001, t);
    master.gain.exponentialRampToValueAtTime(0.8, t + 0.006);
    master.gain.exponentialRampToValueAtTime(0.0001, t + durationSec);
    filter.connect(master).connect(audioCtx.destination);

    const partials = [
      { mult: 1, gain: 1 },
      { mult: 2, gain: 0.55 },
      { mult: 3, gain: 0.28 },
      { mult: 4, gain: 0.16 },
      { mult: 5, gain: 0.09 },
      { mult: 6, gain: 0.05 },
    ];
    for (const p of partials) {
      const osc = audioCtx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq * p.mult;
      const partialGain = audioCtx.createGain();
      partialGain.gain.value = p.gain;
      osc.connect(partialGain).connect(filter);
      osc.start(t);
      osc.stop(t + durationSec + 0.1);
    }
  });
}

/** Fréquences (Hz) des notes (naturelles + altérations courantes), do3 à do5. */
export const C_MAJOR_FREQ: Record<string, number> = {
  'do3': 130.81, 'do3#': 138.59, 're3b': 138.59, 're3': 146.83, 're3#': 155.56, 'mi3b': 155.56, 'mi3': 164.81,
  'fa3': 174.61, 'fa3#': 184.99, 'sol3b': 184.99, 'sol3': 196.0, 'sol3#': 207.65, 'la3b': 207.65, 'la3': 220.0,
  'la3#': 233.08, 'si3b': 233.08, 'si3': 246.94,
  'do4': 261.63, 'do4#': 277.18, 're4b': 277.18, 're4': 293.66, 're4#': 311.13, 'mi4b': 311.13, 'mi4': 329.63,
  'fa4': 349.23, 'fa4#': 369.99, 'sol4b': 369.99, 'sol4': 392.0, 'sol4#': 415.3, 'la4b': 415.3, 'la4': 440.0,
  'la4#': 466.16, 'si4b': 466.16, 'si4': 493.88,
  'do5': 523.25, 're5': 587.33, 'mi5': 659.25, 'fa5': 698.46, 'sol5': 783.99, 'la5': 880.0, 'si5': 987.77,
};

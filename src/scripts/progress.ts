const STORAGE_KEY = 'mel_progress_v1';
const EVENT_NAME = 'mel-progress-change';

export interface ProgressEntry {
  done: boolean;
  correct?: number;
  total?: number;
  ts: number;
}

type Store = Record<string, ProgressEntry>;

function readStore(): Store {
  if (typeof localStorage === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Store) : {};
  } catch {
    return {};
  }
}

function writeStore(store: Store) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    /* localStorage indisponible (mode privé, quota...) : on ignore silencieusement */
  }
  window.dispatchEvent(new CustomEvent(EVENT_NAME));
}

export function saveResult(id: string, entry: Partial<ProgressEntry>) {
  const store = readStore();
  store[id] = {
    done: entry.done ?? true,
    correct: entry.correct,
    total: entry.total,
    ts: Date.now(),
  };
  writeStore(store);
}

export function getResult(id: string): ProgressEntry | undefined {
  return readStore()[id];
}

export function clearResult(id: string) {
  const store = readStore();
  delete store[id];
  writeStore(store);
}

export function getThemeProgress(exerciseIds: string[]): { done: number; total: number } {
  const store = readStore();
  const done = exerciseIds.filter((id) => store[id]?.done).length;
  return { done, total: exerciseIds.length };
}

/** Compte les exercices terminés dont l'id commence par `prefix` (ex: "9h-chant-"). */
export function countDoneWithPrefix(prefix: string): number {
  const store = readStore();
  return Object.keys(store).filter((k) => k.startsWith(prefix) && store[k].done).length;
}

export function onProgressChange(callback: () => void): () => void {
  window.addEventListener(EVENT_NAME, callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener(EVENT_NAME, callback);
    window.removeEventListener('storage', callback);
  };
}

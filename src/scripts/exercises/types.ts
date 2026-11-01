export interface EngineContext {
  /** Enregistre un résultat et déclenche le badge de progression. */
  complete: (result: { correct?: number; total?: number }) => void;
}

export type EngineRenderer = (container: HTMLElement, data: Record<string, unknown>, ctx: EngineContext) => void;

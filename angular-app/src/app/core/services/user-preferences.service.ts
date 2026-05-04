import { Injectable, signal } from '@angular/core';
import { DEFAULT_COMBAT_ZOOM } from '../engine/game-rules';

const STORAGE_KEY = 'lucasCardsBattleUiPrefs';

/** Preferencias de interfaz de batalla persistidas entre partidas y recargas. */
export interface BattleUiPreferences {
  combatZoom: 1 | 2 | 3;
  /** Velocidad ×1/×2/×3/×5 cuando AUTO está desactivado. */
  battleSpeed: 1 | 2 | 3 | 5;
  battleAuto: boolean;
}

const DEFAULT_BATTLE_UI: BattleUiPreferences = {
  combatZoom: DEFAULT_COMBAT_ZOOM,
  battleSpeed: 1,
  battleAuto: false,
};

function clampSpeed(n: number): 1 | 2 | 3 | 5 {
  if (n === 2 || n === 3 || n === 5) return n;
  return 1;
}

function clampZoom(n: number): 1 | 2 | 3 {
  if (n === 1 || n === 3) return n;
  return 2;
}

function readBattleUi(): BattleUiPreferences {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_BATTLE_UI };
    const o = JSON.parse(raw) as Partial<BattleUiPreferences>;
    return {
      combatZoom: clampZoom(Number(o.combatZoom)),
      battleSpeed: clampSpeed(Number(o.battleSpeed)),
      battleAuto: Boolean(o.battleAuto),
    };
  } catch {
    return { ...DEFAULT_BATTLE_UI };
  }
}

function writeBattleUi(p: BattleUiPreferences): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch {
    /* ignore */
  }
}

/**
 * Preferencias de usuario persistidas en `localStorage`.
 * Hoy: opciones de batalla (zoom, velocidad, AUTO). Sonido sigue en `SoundService`.
 */
@Injectable({ providedIn: 'root' })
export class UserPreferencesService {
  readonly battleUi = signal<BattleUiPreferences>(readBattleUi());

  patchBattleUi(partial: Partial<BattleUiPreferences>): void {
    const next: BattleUiPreferences = { ...this.battleUi(), ...partial };
    this.battleUi.set(next);
    writeBattleUi(next);
  }
}

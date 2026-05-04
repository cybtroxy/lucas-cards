import type { BattleCard } from './battle-card.model';
import type { Card } from './card.model';
import type { PersistedDeckSlot, DeckSlot } from './deck-slot.model';
import type { SimultaneousExchangeResult, TypeEffLabel } from './combat-detail.model';

/** Una casilla fija de la tienda (puede repetir id con otras casillas; al elegir queda vacía). */
export interface ShopOfferSlot {
  slotUid: string;
  card: Card | null;
}

export type BattleWinner = 'player' | 'rival' | 'draw';

/** Dificultad del rival en la partida (tirada al abrir selección; presupuesto vs. jugador). */
export type RivalDifficultyTier = 'easy' | 'normal' | 'hard';

export type CombatLogViewMode = 'float' | 'min' | 'modal';

/** Entrada del registro de combate estructurado (sustituye HTML acumulado). */
export type CombatLogEntry =
  | { kind: 'html'; html: string }
  | { kind: 'round'; round: number; exchange: SimultaneousExchangeResult };

export interface GameState {
  /** Huecos del mazo en pantalla de selección. */
  deckSlots: DeckSlot[];
  playerDeck: BattleCard[];
  rivalDeck: BattleCard[];
  battleIdx: { p: number; r: number };
  round: number;
  speed: number;
  auto: boolean;
  paused: boolean;
  running: boolean;
  endedReason: BattleWinner | null;
  log: string[];

  /** Victorias de partida (duelo) del jugador en la serie actual. */
  seriesWinsP: number;
  /**
   * Derrotas de partida del jugador (victorias de partida del rival).
   * No aumenta con empates de partida. Si llega a `SERIES_PARTIDA_LOSSES_TO_ELIMINATE`, el rival gana la serie.
   */
  seriesWinsR: number;
  /** Partidas de serie ya jugadas (incluye empates). */
  gamesInSeries: number;

  coinsForPlayer: number;
  coinsForRival: number;
  playerCoinsStart: number;
  rivalCoinsStart: number;
  /** Tirada de dificultad rival al abrir esta selección (afecta presupuesto tienda simulado vs. jugador). */
  rivalDifficultyThisPartida: RivalDifficultyTier | null;
  spentP: number;
  spentR: number;

  playerTrophy: number;
  rivalTrophy: number;

  /** Mazo guardado al iniciar la última partida (reconstruye huecos al volver a selección). */
  lastPartidaDeckSlots: PersistedDeckSlot[];
  /** Resultado de cada partida de la serie actual (orden cronológico): victoria jugador, rival o empate. */
  seriesPartidaOutcomes: BattleWinner[];

  combatCardZoom: 1 | 2 | 3;
  combatLogView: CombatLogViewMode;

  combatLogEntries: CombatLogEntry[];
  lastCombatEventLogSnapshot: string;

  /** Casillas fijas de la tienda (longitud constante); `card: null` = hueco ya elegido o sin rellenar. */
  shopOfferSlots: ShopOfferSlot[];
  shopRefreshCoinsSpent: number;
  /** Número de partida de la serie usado para el rango de niveles de la tienda (≈ `gamesInSeries + 1` al abrir selección). */
  shopAsaltoForNextSelect: number;

  /** UI de batalla: fase de animación del asalto actual. */
  battleUi: BattleUiPhase;
}

export interface BattleUiPhase {
  playerAttacking: boolean;
  rivalAttacking: boolean;
  playerTakingHit: boolean;
  rivalTakingHit: boolean;
  playerDamagePopup: { dmg: number; label: TypeEffLabel } | null;
  rivalDamagePopup: { dmg: number; label: TypeEffLabel } | null;
  /** Curación del jugador / rival en el asalto (robo vida, habilidad heal), mismo instante que el golpe. */
  playerHealPopup: number | null;
  rivalHealPopup: number | null;
  /** Durante colapso post-K.O. (una o dos cartas en doble K.O.). */
  fainting: { side: 'player' | 'rival'; uid: string }[];
  /** UIDs retirados de la arena tras completar la animación de muerte. */
  removedFromArenaUids: string[];
}

/** Resultado al cerrar partida (pantalla resultado). */
export interface BattleResultSnapshot {
  winner: BattleWinner;
  gloryGainedP: number;
  gloryGainedR: number;
  seriesOver: boolean;
  /** Coste de refresco de tienda usado en la economía de esta partida (= SHOP_REFRESH_COST). */
  economyRefreshCostRef: number;
  survivorsP: number;
  deckLenP: number;
  totalDmgDealt: number;
  totalDmgTaken: number;
  emoji: string;
  title: string;
  subtitle: string;
  seriesNote: string;
  statsRows: { label: string; value: string }[];
}

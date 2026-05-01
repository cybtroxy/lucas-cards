import type { Card } from './card.model';
import type { BattleState } from './battle-state.model';

/** Instancia en partida (instantiate en game.js). */
export interface BattleCard extends Card {
  currentHp: number;
  alive: boolean;
  uid: string;
  battle: BattleState;
  /** Copias apiladas en selección (tooltip / desglose). */
  stackCopies?: number;
  stackStars?: 0 | 1 | 2;
  /** Valores del catálogo antes de bonos por estrellas. */
  catalogHp?: number;
  catalogAtk?: number;
}

/** Etiqueta de efectividad de tipo en UI. */
export type TypeEffLabel = 'super' | 'weak' | 'normal';

export interface StrikeEffectiveness {
  mult: number;
  label: TypeEffLabel;
}

/** Línea de detalle de un golpe (misma forma que combat.js detail.lines). */
export type CombatLogLine = Record<string, unknown> & { k: string };

/** Detalle devuelto por resolveStrike cuando se pide detail. */
export interface StrikeDetail {
  lines: CombatLogLine[];
  attackerName?: string;
  defenderName?: string;
  attackerType?: string;
  defenderType?: string;
  attackAbility?: string;
  defendAbility?: string;
}

/** Resultado de applySimultaneousExchange. */
export interface SimultaneousExchangeResult {
  damageToRival: number;
  damageToPlayer: number;
  effPlayerAttack: StrikeEffectiveness;
  effRivalAttack: StrikeEffectiveness;
  detailPtoR: StrikeDetail;
  detailRtoP: StrikeDetail;
}

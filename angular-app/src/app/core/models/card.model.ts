/** Códigos de habilidad — alineados con cards.js / combat.js */
export type AbilityCode =
  | 'life_steal'
  | 'crit_chance'
  | 'shield'
  | 'first_strike'
  | 'execute'
  | 'burn'
  | 'stun'
  | 'psychic_blast'
  | 'heal'
  | 'buff_next'
  | 'revive'
  | 'damage_reduce'
  | 'armor'
  | 'pierce';

/** Carta del catálogo (sin estado de batalla). */
export interface Card {
  id: string;
  name: string;
  type: string;
  ability: AbilityCode;
  level: number;
  atk: number;
  hp: number;
  art: string;
}

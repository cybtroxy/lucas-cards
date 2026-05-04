/** Rareza de catálogo (afecta peso en tienda si se usa `dropRate`). */
export type CardRarity = 'common' | 'uncommon' | 'rare';

/** Carta del catálogo (sin estado de batalla). */
export interface Card {
  id: string;
  name: string;
  type: string;
  level: number;
  rarity: CardRarity;
  /** Peso relativo en sorteos ponderados (p. ej. 0.6 / 0.3 / 0.1 según rareza). */
  dropRate: number;
  atk: number;
  hp: number;
  art: string;
}

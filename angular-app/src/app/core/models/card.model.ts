/** Rareza de catálogo (afecta peso en tienda si se usa `dropRate`). */
export type CardRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

/** Carta del catálogo (sin estado de batalla). */
export interface Card {
  id: string;
  name: string;
  type: string;
  level: number;
  rarity: CardRarity;
  /** Peso relativo en sorteos ponderados (p. ej. variando entre las cinco rarezas). */
  dropRate: number;
  atk: number;
  hp: number;
  art: string;
  /** URL o ruta de imagen de arte (vacío si solo hay emoji en `art`). */
  art_url: string;
}

/** Carta del catálogo (sin estado de batalla). */
export interface Card {
  id: string;
  name: string;
  type: string;
  level: number;
  atk: number;
  hp: number;
  art: string;
}

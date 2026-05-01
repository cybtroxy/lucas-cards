/** Hueco del mazo en selección (permite apilar la misma carta). */
export interface DeckSlot {
  uid: string;
  id: string;
  copies: number;
}

/** Persistido entre partidas (sin uid efímero). */
export type PersistedDeckSlot = Pick<DeckSlot, 'id' | 'copies'>;

export function newDeckSlotUid(): string {
  return `ds-${Math.random().toString(36).slice(2, 10)}`;
}

export function newShopOfferSlotUid(): string {
  return `sh-${Math.random().toString(36).slice(2, 10)}`;
}

export function persistedSlotsToDeckSlots(rows: PersistedDeckSlot[]): DeckSlot[] {
  return rows
    .filter((r) => r.copies > 0)
    .map((r) => ({ uid: newDeckSlotUid(), id: r.id, copies: r.copies }));
}

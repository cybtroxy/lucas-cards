/** Carta en un hueco del mazo (puede apilarse con copias). */
export interface FilledDeckSlot {
  uid: string;
  id: string;
  copies: number;
}

/** Hueco reservado al retirar una carta: mantiene posición y reordenado. */
export interface EmptyDeckSlot {
  uid: string;
  empty: true;
}

export type DeckSlot = FilledDeckSlot | EmptyDeckSlot;

export function isFilledDeckSlot(s: DeckSlot): s is FilledDeckSlot {
  return !('empty' in s && s.empty);
}

export function isEmptyDeckSlot(s: DeckSlot): s is EmptyDeckSlot {
  return 'empty' in s && s.empty === true;
}

/** Persistido entre partidas (sin uid efímero; solo huecos con carta). */
export type PersistedDeckSlot = Pick<FilledDeckSlot, 'id' | 'copies'>;

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

/**
 * Generación del mazo rival como si fuera un jugador en la tienda:
 * mismas reglas que la selección humana (huecos, apilado, refrescos con 💰, cartas sin coste).
 */
import type { Card } from '../models/card.model';
import type { DeckSlot } from '../models/deck-slot.model';
import { newDeckSlotUid } from '../models/deck-slot.model';
import type { ShopOfferSlot } from '../models/game-state.model';
import {
  fillShopOffers,
  MAX_COPIES_PER_DECK_SLOT_STACK,
  MIN_DECK,
  MIN_BASE_COINS_PER_PARTIDA,
  SHOP_REFRESH_COST,
  maxSelectableSlotsForPartida,
  pickRivalDeckBase,
} from './game-rules';

export interface RivalSelectionSimulationInput {
  /** Saldo tipo `rivalCoinsStart`: solo gasto en refrescos de tienda (como el jugador). */
  rivalCoinBudget: number;
  partidaNumber: number;
  catalog: Card[];
  rng: () => number;
}

export type RivalTraceKind =
  | 'start'
  | 'shop_filled'
  | 'after_pick'
  | 'after_refresh'
  | 'fallback_flat_deck'
  | 'done';

export interface RivalSelectionTraceStep {
  stepIndex: number;
  roundIndex: number;
  kind: RivalTraceKind;
  /** Monedas disponibles para refrescar (= presupuesto inicial − shopRefreshCoinsSpent). */
  coinsLeft: number;
  shopRefreshCoinsSpent: number;
  targetSlotRows: number;
  maxSlotRows: number;
  deckSlotRows: number;
  /** Resumen legible: "id×copies, …" */
  deckSummary: string;
  /** Ofertas: id o vacío si la casilla ya se eligió. */
  shopSummary: string;
}

export interface RivalSelectionResult {
  deckSlots: DeckSlot[];
  trace: RivalSelectionTraceStep[];
  targetSlotRows: number;
  maxSlotRows: number;
  usedFallback: boolean;
}

/** Resumen compacto del mazo rival en selección (balance / logs). */
export function summarizeRivalDeckSlots(slots: DeckSlot[]): string {
  if (slots.length === 0) return '—';
  return slots.map((s) => `${s.id}×${s.copies}`).join(', ');
}

function deckSummary(slots: DeckSlot[]): string {
  return summarizeRivalDeckSlots(slots);
}

function shopSummary(shop: ShopOfferSlot[]): string {
  return shop
    .map((s) => (s.card ? `${s.card.id}@${s.slotUid.slice(0, 6)}` : '∅'))
    .join(' | ');
}

function canRivalAddCard(
  deck: DeckSlot[],
  card: Card,
  maxSlots: number,
  cardIsOnShop: boolean,
): boolean {
  if (!cardIsOnShop) return false;
  if (deck.some((s) => s.id === card.id && s.copies < MAX_COPIES_PER_DECK_SLOT_STACK)) {
    return true;
  }
  return deck.length < maxSlots;
}

function tryAddFromShop(
  deck: DeckSlot[],
  shop: ShopOfferSlot[],
  slotUid: string,
  maxSlots: number,
): boolean {
  const sl = shop.find((s) => s.slotUid === slotUid);
  const c = sl?.card;
  if (!c) return false;
  if (!canRivalAddCard(deck, c, maxSlots, true)) return false;
  const mergeIdx = deck.findIndex(
    (s) => s.id === c.id && s.copies < MAX_COPIES_PER_DECK_SLOT_STACK,
  );
  if (mergeIdx >= 0) {
    sl.card = null;
    deck[mergeIdx] = { ...deck[mergeIdx], copies: deck[mergeIdx].copies + 1 };
  } else if (deck.length < maxSlots) {
    sl.card = null;
    deck.push({ uid: newDeckSlotUid(), id: c.id, copies: 1 });
  } else {
    return false;
  }
  return true;
}

function pickIdsOfAddableOffers(
  shop: ShopOfferSlot[],
  deck: DeckSlot[],
  maxSlots: number,
): string[] {
  const uids: string[] = [];
  for (const s of shop) {
    if (s.card && canRivalAddCard(deck, s.card, maxSlots, true)) uids.push(s.slotUid);
  }
  return uids;
}

/**
 * Simula al rival como jugador: tienda por `fillShopOffers`, elige cartas hasta alcanzar filas objetivo,
 * refresca pagando `SHOP_REFRESH_COST` mientras haya monedas y falte mazo.
 */
export function simulateRivalDeckSelection(input: RivalSelectionSimulationInput): RivalSelectionResult {
  const { rivalCoinBudget, partidaNumber, catalog, rng } = input;

  const maxSlots = maxSelectableSlotsForPartida(partidaNumber);
  const u = rng();
  let deficit = 0;
  if (u < 0.1) deficit = 2;
  else if (u < 0.3) deficit = 1;
  const targetSlotRows = Math.max(MIN_DECK, maxSlots - deficit);

  const trace: RivalSelectionTraceStep[] = [];
  let stepIndex = 0;
  const push = (
    roundIndex: number,
    kind: RivalTraceKind,
    shopRefreshCoinsSpent: number,
    deck: DeckSlot[],
    shop: ShopOfferSlot[],
  ): void => {
    const coinsLeft = Math.max(0, rivalCoinBudget - shopRefreshCoinsSpent);
    trace.push({
      stepIndex: stepIndex++,
      roundIndex,
      kind,
      coinsLeft,
      shopRefreshCoinsSpent,
      targetSlotRows,
      maxSlotRows: maxSlots,
      deckSlotRows: deck.length,
      deckSummary: deckSummary(deck),
      shopSummary: shopSummary(shop),
    });
  };

  let shopRefreshCoinsSpent = 0;
  const deck: DeckSlot[] = [];
  let roundIndex = 0;
  let shop = fillShopOffers(catalog, partidaNumber, rng);

  push(roundIndex, 'start', shopRefreshCoinsSpent, deck, shop);
  push(roundIndex, 'shop_filled', shopRefreshCoinsSpent, deck, shop);

  const MAX_STEPS = 200;
  let steps = 0;
  let doneFillingRows = false;

  while (steps < MAX_STEPS) {
    let addable = pickIdsOfAddableOffers(shop, deck, maxSlots);
    if (addable.length > 0) {
      let pool = addable;
      if (deck.length >= targetSlotRows) {
        const mergeUids = addable.filter((uid) => {
          const sl = shop.find((s) => s.slotUid === uid);
          const c = sl?.card;
          return !!c && deck.some((d) => d.id === c.id);
        });
        if (mergeUids.length > 0) pool = mergeUids;
        else {
          addable = [];
        }
      }
      if (addable.length > 0) {
        const pickUid = pool[Math.floor(rng() * pool.length)]!;
        if (tryAddFromShop(deck, shop, pickUid, maxSlots)) {
          steps++;
          push(roundIndex, 'after_pick', shopRefreshCoinsSpent, deck, shop);
          if (deck.length >= targetSlotRows) doneFillingRows = true;
          continue;
        }
      }
    }

    const coinsLeft = rivalCoinBudget - shopRefreshCoinsSpent;
    if (coinsLeft >= SHOP_REFRESH_COST) {
      shopRefreshCoinsSpent += SHOP_REFRESH_COST;
      shop = fillShopOffers(catalog, partidaNumber, rng);
      roundIndex++;
      steps++;
      push(roundIndex, 'after_refresh', shopRefreshCoinsSpent, deck, shop);
      push(roundIndex, 'shop_filled', shopRefreshCoinsSpent, deck, shop);
      continue;
    }

    if (doneFillingRows || deck.length >= MIN_DECK) break;
    break;
  }

  let usedFallback = false;
  if (deck.length < MIN_DECK) {
    usedFallback = true;
    const flat = pickRivalDeckBase(
      Math.max(rivalCoinBudget, MIN_BASE_COINS_PER_PARTIDA * 3),
      partidaNumber,
      catalog,
      rng,
    );
    const slots = flatCardsToDeckSlots(flat);
    deck.length = 0;
    deck.push(...slots);
    push(roundIndex, 'fallback_flat_deck', shopRefreshCoinsSpent, deck, shop);
  }

  push(roundIndex, 'done', shopRefreshCoinsSpent, deck, shop);

  return {
    deckSlots: deck.map((s) => ({ ...s })),
    trace,
    targetSlotRows,
    maxSlotRows: maxSlots,
    usedFallback,
  };
}

function flatCardsToDeckSlots(cards: Card[]): DeckSlot[] {
  const byId = new Map<string, number>();
  for (const c of cards) {
    byId.set(c.id, (byId.get(c.id) ?? 0) + 1);
  }
  const out: DeckSlot[] = [];
  for (const [id, n] of byId) {
    let left = n;
    while (left > 0) {
      const cop = Math.min(MAX_COPIES_PER_DECK_SLOT_STACK, left);
      out.push({ uid: newDeckSlotUid(), id, copies: cop });
      left -= cop;
    }
  }
  return out;
}

/** Varias partidas de ejemplo para revisar balance (≥10 pasos de traza suele haber por escenario con refrescos). */
export function sampleRivalBalanceReport(
  catalog: Card[],
  rng: () => number,
  opts?: {
    rivalBudget?: number;
    /** Partidas de la serie a simular (por defecto 1…10). */
    partidas?: number[];
  },
): Array<{
  partidaNumber: number;
  maxSlots: number;
  targetSlotRows: number;
  deckSummary: string;
  traceStepCount: number;
  usedFallback: boolean;
  trace: RivalSelectionTraceStep[];
}> {
  const rivalBudget = opts?.rivalBudget ?? 30;
  const partidas = opts?.partidas ?? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return partidas.map((p) => {
    const r = simulateRivalDeckSelection({
      rivalCoinBudget: rivalBudget,
      partidaNumber: p,
      catalog,
      rng,
    });
    return {
      partidaNumber: p,
      maxSlots: r.maxSlotRows,
      targetSlotRows: r.targetSlotRows,
      deckSummary: summarizeRivalDeckSlots(r.deckSlots),
      traceStepCount: r.trace.length,
      usedFallback: r.usedFallback,
      trace: r.trace,
    };
  });
}

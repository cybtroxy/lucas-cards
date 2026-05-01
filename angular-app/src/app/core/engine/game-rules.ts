/**
 * Reglas puras extraídas de game.js — economía, tienda, rival, gloria.
 */
import type { Card } from '../models/card.model';
import { newShopOfferSlotUid } from '../models/deck-slot.model';
import type { BattleWinner, ShopOfferSlot } from '../models/game-state.model';
import { CARDS } from '../data/cards.catalog';

export const FIBONACCI_COSTS = [1, 2, 3, 5, 8, 13] as const;
/** Monedas base que recibe cada bando al inicio de una partida de la serie (antes de arrastre y bono). */
export const MIN_BASE_COINS_PER_PARTIDA = 10;
export const MAX_DECK = 10;
export const MIN_DECK = 1;
export const WINS_TO_WIN_SERIES = 5;

/** Partidas 1–3: 3 huecos; 4→4; 5→5; 6→6; 7+→7. */
export function maxSelectableSlotsForPartida(partidaNumber: number): number {
  const n = Math.max(1, Math.floor(partidaNumber));
  if (n <= 3) return 3;
  if (n === 4) return 4;
  if (n === 5) return 5;
  if (n === 6) return 6;
  return 7;
}

/** Círculos en la barra de serie: 9 hasta que haya 9 partidas sin ganador de serie; luego crece. */
export function seriesProgressCircleCount(input: {
  partidasCompletadas: number;
  seriesDecided: boolean;
}): number {
  const { partidasCompletadas, seriesDecided } = input;
  if (seriesDecided) {
    return Math.max(9, partidasCompletadas);
  }
  if (partidasCompletadas >= 9) {
    return Math.max(9, partidasCompletadas + 1);
  }
  return 9;
}

/** Stats efectivos por copias apiladas (1★: +30% PV; 2★: +50% PV y ATK). Redondeo hacia abajo; si el bono queda en 0, +1 mínimo en ese stat. */
export function stackStatsFromCopies(
  copies: number,
  baseHp: number,
  baseAtk: number,
): { hp: number; atk: number; stars: 0 | 1 | 2 } {
  const c = Math.max(1, Math.floor(copies));
  const stars: 0 | 1 | 2 = c >= 3 ? 2 : c >= 2 ? 1 : 0;
  let hp = baseHp;
  let atk = baseAtk;
  if (stars === 1) {
    hp = Math.floor(baseHp * 1.3);
    if (hp <= baseHp) hp = baseHp + 1;
  } else if (stars === 2) {
    hp = Math.floor(baseHp * 1.5);
    atk = Math.floor(baseAtk * 1.5);
    if (hp <= baseHp) hp = baseHp + 1;
    if (atk <= baseAtk) atk = baseAtk + 1;
  }
  return { hp, atk, stars };
}

/** Copias máximas en un mismo hueco del mazo (2★); otra copia igual abre un hueco nuevo si cabe. */
export const MAX_COPIES_PER_DECK_SLOT_STACK = 3;

export const MAX_DUEL_ASALTOS = 600;
export const SHOP_OFFER_COUNT = 6;
/** Máximo de la misma carta (id) en la rejilla de la tienda a la vez. */
export const SHOP_MAX_SAME_CARD = 3;
/** Monedas que cuesta refrescar la tienda una vez. */
export const SHOP_REFRESH_COST = 1;

export const GLORY_PARTICIPATE = 1;
export const GLORY_WIN = 5;
export const GLORY_LOSS = 2;
export const GLORY_DRAW = 3;
export const GLORY_SERIES_BONUS = 8;

export const COMBAT_ZOOM_SCALE: Record<1 | 2 | 3, number> = { 1: 0.75, 2: 1, 3: 2.5 };
export const DEFAULT_COMBAT_ZOOM = 2 as const;

export function coinsBonusAfterPartida(completedEnSerie: number): number {
  const idx = Math.min(Math.max(0, completedEnSerie - 1), FIBONACCI_COSTS.length - 1);
  return FIBONACCI_COSTS[idx];
}

export function applyCoinsAfterGame(input: {
  playerCoinsStart: number;
  rivalCoinsStart: number;
  gamesInSeries: number;
}): { coinsForPlayer: number; coinsForRival: number } {
  const carryP = input.playerCoinsStart;
  const carryR = input.rivalCoinsStart;
  const bonus = coinsBonusAfterPartida(input.gamesInSeries);
  return {
    coinsForPlayer: MIN_BASE_COINS_PER_PARTIDA + carryP + bonus,
    coinsForRival: MIN_BASE_COINS_PER_PARTIDA + carryR + bonus,
  };
}

export function ensureMinCoins(coinsForPlayer: number, coinsForRival: number): {
  coinsForPlayer: number;
  coinsForRival: number;
} {
  return {
    coinsForPlayer: Math.max(MIN_BASE_COINS_PER_PARTIDA, coinsForPlayer),
    coinsForRival: Math.max(MIN_BASE_COINS_PER_PARTIDA, coinsForRival),
  };
}

/** Rangos de nivel en tienda según último asalto de referencia. */
export function shopLevelRangeFromAsalto(asalto: number): { min: number; max: number } {
  const a = Math.max(1, asalto | 0);
  if (a <= 2) return { min: 1, max: 1 };
  if (a <= 4) return { min: 1, max: 2 };
  if (a <= 5) return { min: 1, max: 2 };
  if (a === 6) return { min: 2, max: 3 };
  if (a <= 8) return { min: 3, max: 4 };
  return { min: 3, max: 5 };
}

export function fillShopOffers(
  catalog: Card[],
  asaltoRef: number,
  rng: () => number = Math.random,
): ShopOfferSlot[] {
  if (!catalog.length) return [];

  const range = shopLevelRangeFromAsalto(asaltoRef);
  let pool = catalog.filter((c) => {
    const lv = Number(c.level);
    return lv >= range.min && lv <= range.max;
  });
  if (!pool.length) pool = catalog.slice();

  const slots: ShopOfferSlot[] = [];
  const idCount = new Map<string, number>();

  for (let i = 0; i < SHOP_OFFER_COUNT; i++) {
    const eligibleInRange = pool.filter((c) => (idCount.get(c.id) ?? 0) < SHOP_MAX_SAME_CARD);
    const eligibleWide =
      eligibleInRange.length > 0
        ? eligibleInRange
        : catalog.filter((c) => (idCount.get(c.id) ?? 0) < SHOP_MAX_SAME_CARD);
    const pickFrom = eligibleWide.length > 0 ? eligibleWide : catalog;
    const pick = pickFrom[Math.floor(rng() * pickFrom.length)]!;
    idCount.set(pick.id, (idCount.get(pick.id) ?? 0) + 1);
    slots.push({ slotUid: newShopOfferSlotUid(), card: { ...pick } });
  }
  return slots;
}

export function pickRivalDeckBase(
  rivalCoins: number,
  playerSelectedIds: string[],
  catalog: Card[] = CARDS,
  rng: () => number = Math.random,
): Card[] {
  const B = rivalCoins;
  const used = new Set(playerSelectedIds);
  let pool = catalog.filter((c) => !used.has(c.id));
  if (pool.length === 0) pool = catalog.slice();

  for (let tryN = 0; tryN < 40; tryN++) {
    const sh = pool.slice().sort(() => rng() - 0.5);
    const targetN = 1 + Math.floor(rng() * Math.min(MAX_DECK, 8));
    const ch: Card[] = [];
    let total = 0;
    for (const c of sh) {
      if (ch.length >= targetN) break;
      const lv = Number(c.level) || 0;
      if (total + lv <= B) {
        ch.push(c);
        total += lv;
      }
    }
    if (ch.length >= MIN_DECK) return ch;
  }

  const sh = pool.slice().sort(() => rng() - 0.5);
  const ch: Card[] = [];
  let total = 0;
  for (const c of sh) {
    if (ch.length >= MAX_DECK) break;
    const lv = Number(c.level) || 0;
    if (total + lv <= B) {
      ch.push(c);
      total += lv;
    }
  }
  if (ch.length >= MIN_DECK) return ch;
  const fallback = (pool.length ? pool : catalog)
    .slice()
    .sort((a, b) => (Number(a.level) || 0) - (Number(b.level) || 0));
  for (const c of fallback) {
    const lv = Number(c.level) || 0;
    if (lv <= B) return [c];
  }
  return [fallback[0] || catalog[0]];
}

export function awardGloryAfterPartida(input: {
  winner: BattleWinner;
  seriesWinsP: number;
  seriesWinsR: number;
}): { gainedP: number; gainedR: number } {
  const seriesOver =
    input.seriesWinsP >= WINS_TO_WIN_SERIES || input.seriesWinsR >= WINS_TO_WIN_SERIES;
  let p = GLORY_PARTICIPATE;
  let r = GLORY_PARTICIPATE;
  if (input.winner === 'player') {
    p += GLORY_WIN;
    r += GLORY_LOSS;
  } else if (input.winner === 'rival') {
    r += GLORY_WIN;
    p += GLORY_LOSS;
  } else {
    p += GLORY_DRAW;
    r += GLORY_DRAW;
  }
  if (seriesOver) {
    if (input.seriesWinsP >= WINS_TO_WIN_SERIES) p += GLORY_SERIES_BONUS;
    if (input.seriesWinsR >= WINS_TO_WIN_SERIES) r += GLORY_SERIES_BONUS;
  }
  return { gainedP: p, gainedR: r };
}

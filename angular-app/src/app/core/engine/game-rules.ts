/**
 * Reglas puras extraídas de game.js — economía, tienda, rival, gloria.
 */
import type { Card } from '../models/card.model';
import { newShopOfferSlotUid } from '../models/deck-slot.model';
import type { BattleWinner, RivalDifficultyTier, ShopOfferSlot } from '../models/game-state.model';
import { CARDS } from '../data/cards.catalog';

/** Piso de saldo tras cerrar partida (casos extremos). */
export const MIN_BASE_COINS_PER_PARTIDA = 10;
/** Monedas del jugador al iniciar partida nueva (pantalla de selección). */
export const INITIAL_PLAYER_COINS = 30;

export interface RivalDifficultyRoll {
  tier: RivalDifficultyTier;
  /** Se suma al saldo del jugador en esta selección para el presupuesto rival. */
  budgetDelta: number;
}

/**
 * Tirada al abrir selección (cada partida): Fácil 30%, Normal 60%, Difícil 10%.
 * Bonos vs. saldo del jugador (`playerBudget`): Fácil −20, Normal −5, Difícil +30.
 */
export function rollRivalDifficulty(rng: () => number): RivalDifficultyRoll {
  const u = rng();
  if (u < 0.3) return { tier: 'easy', budgetDelta: -20 };
  if (u < 0.9) return { tier: 'normal', budgetDelta: -5 };
  return { tier: 'hard', budgetDelta: 30 };
}

/** Presupuesto rival para simular la tienda / mazo; nunca por debajo del piso global. */
export function rivalShopBudgetForPartida(
  playerBudget: number,
  rng: () => number,
): RivalDifficultyRoll & { budget: number } {
  const roll = rollRivalDifficulty(rng);
  const budget = Math.max(MIN_BASE_COINS_PER_PARTIDA, playerBudget + roll.budgetDelta);
  return { ...roll, budget };
}

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

/** Stats efectivos por copias apiladas (1★: +30% PV; 2★: +50%; 3★: +70% PV y ATK). Redondeo hacia abajo; si el bono queda en 0, +1 mínimo en ese stat. */
export function stackStatsFromCopies(
  copies: number,
  baseHp: number,
  baseAtk: number,
): { hp: number; atk: number; stars: 0 | 1 | 2 | 3 } {
  const c = Math.max(1, Math.floor(copies));
  const stars: 0 | 1 | 2 | 3 = c >= 4 ? 3 : c >= 3 ? 2 : c >= 2 ? 1 : 0;
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
  } else if (stars === 3) {
    hp = Math.floor(baseHp * 1.7);
    atk = Math.floor(baseAtk * 1.7);
    if (hp <= baseHp) hp = baseHp + 1;
    if (atk <= baseAtk) atk = baseAtk + 1;
  }
  return { hp, atk, stars };
}

/** Copias máximas en un mismo hueco del mazo (hasta 3★); otra copia igual abre un hueco nuevo si cabe. */
export const MAX_COPIES_PER_DECK_SLOT_STACK = 4;

export const MAX_DUEL_ASALTOS = 600;
export const SHOP_OFFER_COUNT = 6;
/** Máximo de la misma carta (id) en la rejilla de la tienda a la vez. */
export const SHOP_MAX_SAME_CARD = 3;
/** Monedas devueltas al quitar un hueco completo del mazo en selección (por estrellas del apilado). */
export function coinsRefundWhenRemovingDeckSlot(copies: number): number {
  const c = Math.max(1, Math.floor(copies));
  if (c === 1) return 1;
  if (c === 2) return 2;
  if (c === 3) return 4;
  return 8;
}

/** Monedas que cuesta refrescar la tienda una vez (fijo, no depende de la partida). */
export const SHOP_REFRESH_COST = 5;

export const GLORY_PARTICIPATE = 1;
export const GLORY_WIN = 5;
export const GLORY_LOSS = 2;
export const GLORY_DRAW = 3;
export const GLORY_SERIES_BONUS = 8;

export const COMBAT_ZOOM_SCALE: Record<1 | 2 | 3, number> = { 1: 0.75, 2: 1, 3: 2.5 };
export const DEFAULT_COMBAT_ZOOM = 2 as const;

/**
 * Monedas al cerrar partida: arrastre + (3 × coste refresco) + extra por resultado.
 * Coste refresco = `SHOP_REFRESH_COST`. Empate: sin extra. Ganador +1× coste, perdedor +2× coste.
 */
export function applyCoinsAfterGame(input: {
  playerCoinsStart: number;
  rivalCoinsStart: number;
  winner: BattleWinner;
}): { coinsForPlayer: number; coinsForRival: number } {
  const cost = SHOP_REFRESH_COST;
  const grantBase = 3 * cost;

  let extraPlayer = 0;
  let extraRival = 0;
  if (input.winner === 'draw') {
    /* solo grantBase */
  } else if (input.winner === 'player') {
    extraPlayer = cost;
    extraRival = 2 * cost;
  } else {
    extraRival = cost;
    extraPlayer = 2 * cost;
  }

  return {
    coinsForPlayer: input.playerCoinsStart + grantBase + extraPlayer,
    coinsForRival: input.rivalCoinsStart + grantBase + extraRival,
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

/**
 * Rango de nivel en tienda según el número de la próxima partida en la serie (1 = primera).
 * No usar asaltos del duelo anterior; debe coincidir con `gamesInSeries + 1` en selección.
 */
export function shopLevelRangeFromPartida(partida: number): { min: number; max: number } {
  const p = Math.max(1, Math.floor(partida));
  if (p <= 2) return { min: 1, max: 1 };
  if (p <= 4) return { min: 1, max: 2 };
  if (p <= 5) return { min: 1, max: 3 };
  if (p === 6) return { min: 2, max: 3 };
  if (p <= 8) return { min: 3, max: 4 };
  return { min: 3, max: 5 };
}

/** @deprecated Alias histórico; el argumento es número de partida, no asaltos del duelo. */
export const shopLevelRangeFromAsalto = shopLevelRangeFromPartida;

export function fillShopOffers(
  catalog: Card[],
  partidaRef: number,
  rng: () => number = Math.random,
): ShopOfferSlot[] {
  if (!catalog.length) return [];

  const range = shopLevelRangeFromPartida(partidaRef);
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

/**
 * Mazo rival: como máximo tantas cartas como huecos permitidos en esa partida (`maxSelectableSlotsForPartida`).
 * Objetivo de tamaño: suele ser ese máximo; con 20% lleva una menos; con 10% dos menos (70% máximo completo).
 * Si las monedas no alcanzan, puede quedar por debajo del objetivo; siempre ≥ 1 carta.
 */
export function pickRivalDeckBase(
  rivalCoins: number,
  /** Número de partida en la serie (como `gamesInSeries + 1` al iniciar el duelo). */
  partidaNumber: number,
  catalog: Card[] = CARDS,
  rng: () => number = Math.random,
): Card[] {
  const B = rivalCoins;
  const pool = catalog.length > 0 ? catalog : CARDS;

  const maxSlots = maxSelectableSlotsForPartida(partidaNumber);
  const u = rng();
  let deficit = 0;
  if (u < 0.1) deficit = 2;
  else if (u < 0.3) deficit = 1;
  const targetN = Math.max(1, maxSlots - deficit);

  for (let tryN = 0; tryN < 40; tryN++) {
    const sh = pool.slice().sort(() => rng() - 0.5);
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
    if (ch.length >= maxSlots) break;
    const lv = Number(c.level) || 0;
    if (total + lv <= B) {
      ch.push(c);
      total += lv;
    }
  }
  if (ch.length >= MIN_DECK) return ch;
  const fallback = pool
    .slice()
    .sort((a, b) => (Number(a.level) || 0) - (Number(b.level) || 0));
  for (const c of fallback) {
    const lv = Number(c.level) || 0;
    if (lv <= B) return [c];
  }
  return [fallback[0] ?? CARDS[0]];
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

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

/** Tope de huecos de mazo (jugador y rival); crece con la serie hasta este máximo. */
export const MAX_DECK = 6;
export const MIN_DECK = 1;

/** Victorias de **partida** (duelo completo) que el jugador necesita para ganar la serie. */
export const SERIES_PARTIDA_WINS_TO_CLINCH = 10;
/**
 * Derrotas de **partida** del jugador (victorias de partida del rival) que eliminan al jugador de la serie.
 * Los empates de partida no incrementan este contador.
 */
export const SERIES_PARTIDA_LOSSES_TO_ELIMINATE = 3;

/**
 * Huecos de mazo en selección: **3** en las partidas 1–2; +1 cada **2** partidas de serie
 * (gane o pierdas); tope **6**. Misma regla para el rival (`pickRivalDeckBase` / simulación).
 */
export function maxSelectableSlotsForPartida(partidaNumber: number): number {
  const p = Math.max(1, Math.floor(partidaNumber));
  return Math.min(MAX_DECK, 3 + Math.floor((p - 1) / 2));
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

/** Pesos por nivel (índice 0 = nivel 1, …) según la próxima partida en la serie. */
export type ShopLevelWeights = readonly [number, number, number, number, number];

/**
 * Probabilidad de que cada **oferta** de tienda sea de un nivel dado.
 * Partidas 1–3: 60% L1, 30% L2, 10% L3.
 * Partidas 4–6: 30% L1, 40% L2, 20% L3, 10% L4.
 * Partidas 7–9: 5% L1, 10% L2, 25% L3, 40% L4, 20% L5.
 * Partida 10 en adelante: 0% L1–2, 20% L3, 30% L4, 50% L5.
 */
export function shopLevelWeightsFromPartida(partida: number): ShopLevelWeights {
  const p = Math.max(1, Math.floor(partida));
  if (p >= 10) return [0, 0, 0.2, 0.3, 0.5];
  if (p >= 7) return [0.05, 0.1, 0.25, 0.4, 0.2];
  if (p >= 4) return [0.3, 0.4, 0.2, 0.1, 0];
  return [0.6, 0.3, 0.1, 0, 0];
}

function sampleLevelFromWeights(weights: ShopLevelWeights, rng: () => number): number {
  const u = rng();
  let cum = 0;
  for (let i = 0; i < 5; i++) {
    cum += weights[i] ?? 0;
    if (u < cum) return i + 1;
  }
  for (let i = 4; i >= 0; i--) {
    if ((weights[i] ?? 0) > 0) return i + 1;
  }
  return 1;
}

function pickShopCardForOffer(
  catalog: Card[],
  weights: ShopLevelWeights,
  idCount: Map<string, number>,
  rng: () => number,
): Card {
  const maxTries = 60;
  for (let t = 0; t < maxTries; t++) {
    const level = sampleLevelFromWeights(weights, rng);
    const pool = catalog.filter(
      (c) => Number(c.level) === level && (idCount.get(c.id) ?? 0) < SHOP_MAX_SAME_CARD,
    );
    if (pool.length > 0) {
      return pool[Math.floor(rng() * pool.length)]!;
    }
  }
  const eligible = catalog.filter((c) => (idCount.get(c.id) ?? 0) < SHOP_MAX_SAME_CARD);
  const pickFrom = eligible.length > 0 ? eligible : catalog;
  return pickFrom[Math.floor(rng() * pickFrom.length)]!;
}

/**
 * Rango de niveles que pueden aparecer en tienda (peso &gt; 0) según el número de partida.
 * Debe coincidir con `gamesInSeries + 1` en selección.
 */
export function shopLevelRangeFromPartida(partida: number): { min: number; max: number } {
  const w = shopLevelWeightsFromPartida(partida);
  let min = 5;
  let max = 1;
  for (let i = 0; i < 5; i++) {
    if ((w[i] ?? 0) > 0) {
      min = Math.min(min, i + 1);
      max = Math.max(max, i + 1);
    }
  }
  if (min > max) return { min: 1, max: 1 };
  return { min, max };
}

/** @deprecated Alias histórico; el argumento es número de partida, no asaltos del duelo. */
export const shopLevelRangeFromAsalto = shopLevelRangeFromPartida;

export function fillShopOffers(
  catalog: Card[],
  partidaRef: number,
  rng: () => number = Math.random,
): ShopOfferSlot[] {
  if (!catalog.length) return [];

  const weights = shopLevelWeightsFromPartida(partidaRef);
  const slots: ShopOfferSlot[] = [];
  const idCount = new Map<string, number>();

  for (let i = 0; i < SHOP_OFFER_COUNT; i++) {
    const pick = pickShopCardForOffer(catalog, weights, idCount, rng);
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
    input.seriesWinsP >= SERIES_PARTIDA_WINS_TO_CLINCH ||
    input.seriesWinsR >= SERIES_PARTIDA_LOSSES_TO_ELIMINATE;
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
    if (input.seriesWinsP >= SERIES_PARTIDA_WINS_TO_CLINCH) p += GLORY_SERIES_BONUS;
    if (input.seriesWinsR >= SERIES_PARTIDA_LOSSES_TO_ELIMINATE) r += GLORY_SERIES_BONUS;
  }
  return { gainedP: p, gainedR: r };
}

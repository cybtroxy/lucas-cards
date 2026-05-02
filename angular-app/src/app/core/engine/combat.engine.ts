/**
 * Motor de combate — solo tipos y PV/ATK (sin habilidades).
 */
import type { Card } from '../models/card.model';
import type {
  SimultaneousExchangeResult,
  StrikeDetail,
  StrikeEffectiveness,
} from '../models/combat-detail.model';

export const TYPE_ADV: Record<string, string[]> = {
  fire: ['nature'],
  water: ['fire'],
  nature: ['water'],
  energy: ['water', 'metal'],
  metal: ['air', 'alien'],
  air: ['earth'],
  earth: ['energy'],
  light: ['darkness'],
  darkness: ['spirit'],
  spirit: ['light', 'alien'],
  alien: ['light'],
  love: ['darkness'],
};

export function getTypeMultiplier(attackerType: string, defenderType: string): number {
  const a = String(attackerType);
  const d = String(defenderType);
  if (TYPE_ADV[a]?.includes(d)) return 1.25;
  if (TYPE_ADV[d]?.includes(a)) return 0.8;
  return 1;
}

export function multToEffLabel(mult: number): StrikeEffectiveness {
  if (mult >= 1.25) return { mult, label: 'super' };
  if (mult <= 0.8) return { mult, label: 'weak' };
  return { mult, label: 'normal' };
}

/** Participante mutable en resolveStrike. */
export interface StrikeParticipant {
  id: string;
  name: string;
  type: string;
  atk: number;
  hp: number;
  level: number;
  art: string;
  maxHp?: number;
  currentHp?: number;
}

export interface ResolveStrikeOptions {
  rng?: () => number;
  useCurrentHp?: boolean;
  detail?: StrikeDetail | null;
}

export interface ResolveStrikeResult {
  damage: number;
  eff: StrikeEffectiveness;
  defenderHp: number;
  detail: StrikeDetail | null;
}

export function resolveStrike(
  attacker: StrikeParticipant,
  defender: StrikeParticipant,
  opts?: ResolveStrikeOptions,
): ResolveStrikeResult {
  const detail = opts?.detail ?? null;
  if (detail) {
    detail.lines = [];
    detail.attackerName = attacker.name;
    detail.defenderName = defender.name;
    detail.attackerType = attacker.type;
    detail.defenderType = defender.type;
  }

  const tMult = getTypeMultiplier(attacker.type, defender.type);
  const eff = multToEffLabel(tMult);
  const damage = Math.max(1, Math.ceil(attacker.atk * tMult));
  if (detail) {
    detail.lines.push({
      k: 'base',
      atk: attacker.atk,
      mult: tMult,
      eff: eff.label,
      out: damage,
    });
  }

  const hpKey = opts?.useCurrentHp ? 'currentHp' : 'hp';
  const defAny = defender as StrikeParticipant & Record<string, number | undefined>;
  if (defender.maxHp == null) defender.maxHp = defender.hp != null ? defender.hp : defAny[hpKey];
  const prevD = defAny[hpKey] ?? 0;
  defAny[hpKey] = Math.max(0, prevD - damage);
  if (detail) {
    detail.lines.push({
      k: 'hp_hit',
      prevHp: prevD,
      fromAtk: damage,
      nextHp: defAny[hpKey],
    });
  }

  return { damage, eff, defenderHp: defAny[hpKey]!, detail };
}

function makeRuntimeClone(card: StrikeParticipant, currentHp: number): StrikeParticipant {
  return {
    id: card.id,
    name: card.name,
    type: card.type,
    atk: card.atk,
    hp: card.hp,
    maxHp: card.hp,
    currentHp,
    level: card.level,
    art: card.art,
  };
}

export function applySimultaneousExchange(
  p: StrikeParticipant,
  r: StrikeParticipant,
  opts?: { rng?: () => number },
): SimultaneousExchangeResult {
  const rng = opts?.rng ?? Math.random;
  let p0 = p.currentHp!;
  let r0 = r.currentHp!;
  if (p0 < 0) p0 = 0;
  if (r0 < 0) r0 = 0;

  const cP1 = makeRuntimeClone(p, p0);
  const cR1 = makeRuntimeClone(r, r0);
  const detailPtoR: StrikeDetail = { lines: [] };
  const res1 = resolveStrike(cP1, cR1, { useCurrentHp: true, rng, detail: detailPtoR });
  const dmgPtoR = res1.damage;
  const eff1 = res1.eff;

  const cP2 = makeRuntimeClone(p, p0);
  const cR2 = makeRuntimeClone(r, r0);
  const detailRtoP: StrikeDetail = { lines: [] };
  const res2 = resolveStrike(cR2, cP2, { useCurrentHp: true, rng, detail: detailRtoP });
  const dmgRtoP = res2.damage;
  const eff2 = res2.eff;

  p.currentHp = cP2.currentHp!;
  r.currentHp = cR1.currentHp!;

  return {
    damageToRival: dmgPtoR,
    damageToPlayer: dmgRtoP,
    effPlayerAttack: eff1,
    effRivalAttack: eff2,
    detailPtoR,
    detailRtoP,
  };
}

/** PV que “cura” el atacante en el golpe — sin habilidades siempre 0. */
export function sumAttackerHealFromStrikeDetail(_detail: StrikeDetail): number {
  return 0;
}

function copyCard(c: Card): StrikeParticipant {
  return {
    id: c.id,
    name: c.name,
    type: c.type,
    atk: c.atk,
    hp: c.hp,
    maxHp: c.hp,
    currentHp: c.hp,
    level: c.level,
    art: c.art,
  };
}

export function pickFirstStriker(a: StrikeParticipant, b: StrikeParticipant): 'a' | 'b' {
  if (a.atk !== b.atk) return a.atk > b.atk ? 'a' : 'b';
  if (a.hp !== b.hp) return a.hp > b.hp ? 'a' : 'b';
  return a.id < b.id ? 'a' : 'b';
}

export function fight(
  cardA: Card,
  cardB: Card,
  opts?: { rng?: () => number },
): {
  winner: 'a' | 'b' | null;
  draw: boolean;
  aHp: number;
  bHp: number;
  log: { attacker: string; damage: number; eff: string }[];
} {
  const rng = opts?.rng ?? Math.random;
  const A = copyCard(cardA);
  const B = copyCard(cardB);
  const first = pickFirstStriker(A, B);
  let striker = first === 'a' ? 0 : 1;
  const log: { attacker: string; damage: number; eff: string }[] = [];
  while (A.hp > 0 && B.hp > 0) {
    const at = striker === 0 ? A : B;
    const df = striker === 0 ? B : A;
    const res = resolveStrike(at, df, { rng, useCurrentHp: false, detail: null });
    log.push({ attacker: at.id, damage: res.damage, eff: res.eff.label });
    if (A.hp <= 0 && B.hp <= 0) {
      return { winner: null, draw: true, aHp: A.hp, bHp: B.hp, log };
    }
    if (A.hp <= 0) return { winner: 'b', draw: false, aHp: 0, bHp: B.hp, log };
    if (B.hp <= 0) return { winner: 'a', draw: false, aHp: A.hp, bHp: 0, log };
    striker = 1 - striker;
  }
  if (A.hp <= 0 && B.hp <= 0) return { winner: null, draw: true, aHp: 0, bHp: 0, log };
  if (A.hp > 0) return { winner: 'a', draw: false, aHp: A.hp, bHp: B.hp, log };
  return { winner: 'b', draw: false, aHp: A.hp, bHp: B.hp, log };
}

export function fightLine(
  teamA: Card[],
  teamB: Card[],
  opts?: { rng?: () => number },
): {
  winner: 'A' | 'B' | null;
  lineA: StrikeParticipant[];
  lineB: StrikeParticipant[];
  log: ReturnType<typeof fight>[];
} {
  const a = teamA.map(copyCard);
  const b = teamB.map(copyCard);
  const log: ReturnType<typeof fight>[] = [];
  const rng = opts?.rng ?? Math.random;
  while (a.length && b.length) {
    const r = fight(a[0] as Card, b[0] as Card, { rng });
    log.push(r);
    if (r.draw) {
      a.shift();
      b.shift();
    } else if (r.winner === 'a') {
      b.shift();
    } else {
      a.shift();
    }
  }
  if (a.length) return { winner: 'A', lineA: a, lineB: b, log };
  if (b.length) return { winner: 'B', lineA: a, lineB: b, log };
  return { winner: null, lineA: a, lineB: b, log };
}

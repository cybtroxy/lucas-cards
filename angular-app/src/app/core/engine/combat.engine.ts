/**
 * Motor de combate — port directo de combat.js (sin DOM, sin Angular).
 */
import type { AbilityCode } from '../models/card.model';
import type { BattleState } from '../models/battle-state.model';
import type { Card } from '../models/card.model';
import type {
  CombatLogLine,
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

const ABILITY_HEAL_USES_CAP = 3;

function restorativeAbility(abilityCode: string): boolean {
  return abilityCode === 'life_steal' || abilityCode === 'heal';
}

export function createBattleState(ability: AbilityCode | string): BattleState {
  const a = String(ability);
  return {
    firstStrikeLeft: a === 'first_strike' ? 1 : 0,
    shieldBlocks: a === 'shield' ? 1 : 0,
    reviveLeft: a === 'revive' ? 1 : 0,
    buffUsed: false,
    healProcsLeft: restorativeAbility(a) ? ABILITY_HEAL_USES_CAP : 0,
  };
}

/** Participante mutable en resolveStrike (misma forma que cartas runtime). */
export interface StrikeParticipant {
  id: string;
  name: string;
  type: string;
  ability: string;
  atk: number;
  hp: number;
  level: number;
  art: string;
  maxHp?: number;
  currentHp?: number;
  battle?: BattleState;
}

function mergeState(card: StrikeParticipant): void {
  if (!card) return;
  const a = String(card.ability || '');
  if (!card.battle) {
    card.battle = createBattleState(a);
    return;
  }
  const b = card.battle;
  if (b.healProcsLeft == null && restorativeAbility(a)) {
    const legacy = b as BattleState & { lifeStealHealsLeft?: number; selfHealHitsLeft?: number };
    if (typeof legacy.lifeStealHealsLeft === 'number') {
      b.healProcsLeft = legacy.lifeStealHealsLeft;
    } else if (typeof legacy.selfHealHitsLeft === 'number') {
      b.healProcsLeft = legacy.selfHealHitsLeft;
    } else {
      b.healProcsLeft = ABILITY_HEAL_USES_CAP;
    }
  }
}

export function resetBattleForCard(card: StrikeParticipant): void {
  if (!card) return;
  card.battle = createBattleState(card.ability || '');
}

interface AbilityCtx {
  attacker: StrikeParticipant;
  defender: StrikeParticipant;
  damage: number;
  rng: () => number;
  pierceActive: boolean;
  burnExtra: number;
  selfHealOnHit: number;
  lifeStealRatio: number;
  executeActive: boolean;
  critProcced?: boolean;
}

function randomFn(ctx: AbilityCtx): number {
  return ctx.rng();
}

const abilityMap: Record<string, (ctx: AbilityCtx) => void> = {
  crit_chance: (ctx) => {
    let d = ctx.damage;
    ctx.critProcced = false;
    if (randomFn(ctx) < 0.2) {
      d = Math.max(1, Math.ceil(d * 2));
      ctx.critProcced = true;
    }
    ctx.damage = d;
  },
  pierce: (ctx) => {
    ctx.pierceActive = true;
  },
  first_strike: (ctx) => {
    if (ctx.attacker.battle && ctx.attacker.battle.firstStrikeLeft > 0) {
      ctx.damage = Math.max(1, Math.ceil(ctx.damage * 1.4));
      ctx.attacker.battle.firstStrikeLeft = 0;
    }
  },
  life_steal: (ctx) => {
    ctx.lifeStealRatio = 0.25;
  },
  burn: (ctx) => {
    ctx.burnExtra = 2;
  },
  stun: (ctx) => {
    ctx.damage = Math.max(1, Math.ceil(ctx.damage * 1.1));
  },
  psychic_blast: (ctx) => {
    ctx.damage = Math.max(1, Math.ceil(ctx.damage * 1.15));
  },
  execute: (ctx) => {
    ctx.executeActive = true;
  },
  heal: (ctx) => {
    ctx.selfHealOnHit = 2;
  },
  buff_next: (ctx) => {
    if (!ctx.attacker.battle!.buffUsed) {
      ctx.damage = Math.max(1, Math.ceil(ctx.damage * 1.2));
      ctx.attacker.battle!.buffUsed = true;
    }
  },
  revive: () => {},
  shield: () => {},
  damage_reduce: () => {},
  armor: () => {},
};

function applyDefenderWhileReceiving(dmg: number, ctx: AbilityCtx, detail: StrikeDetail | null): number {
  const def = ctx.defender;
  mergeState(def);
  const a = def.ability;
  const b = def.battle!;
  let d = dmg;
  let effectiveArmor = 2;
  if (ctx.pierceActive) {
    b.shieldBlocks = 0;
    effectiveArmor = 1;
    if (detail) {
      detail.lines.push({ k: 'pierce_defense', shieldStripped: true, armorIs: 1 });
    }
  }
  if (a === 'shield' && b.shieldBlocks > 0) {
    b.shieldBlocks -= 1;
    if (detail) detail.lines.push({ k: 'shield_block' });
    return 0;
  }
  if (a === 'armor') {
    const pA = d;
    d = Math.max(1, d - effectiveArmor);
    if (detail) detail.lines.push({ k: 'armor', sub: effectiveArmor, from: pA, to: d });
  }
  if (a === 'damage_reduce') {
    const pR = d;
    d = Math.max(1, Math.ceil(d * 0.75));
    if (detail) detail.lines.push({ k: 'damage_reduce', from: pR, to: d, factor: 0.75 });
  }
  return d;
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
  const rng = opts?.rng ?? Math.random;
  const detail = opts?.detail ?? null;
  if (detail) {
    detail.lines = [];
    detail.attackerName = attacker.name;
    detail.defenderName = defender.name;
    detail.attackerType = attacker.type;
    detail.defenderType = defender.type;
    detail.attackAbility = attacker.ability;
    detail.defendAbility = defender.ability;
  }
  const ctx: AbilityCtx = {
    attacker,
    defender,
    damage: 0,
    rng: typeof rng === 'function' ? rng : Math.random,
    pierceActive: false,
    burnExtra: 0,
    selfHealOnHit: 0,
    lifeStealRatio: 0,
    executeActive: false,
  };
  mergeState(attacker);
  mergeState(defender);

  const tMult = getTypeMultiplier(attacker.type, defender.type);
  const eff = multToEffLabel(tMult);
  ctx.damage = Math.max(1, Math.ceil(attacker.atk * tMult));
  if (detail) {
    detail.lines.push({
      k: 'base',
      atk: attacker.atk,
      mult: tMult,
      eff: eff.label,
      out: ctx.damage,
    });
  }
  const ab = attacker.ability;
  if (ab === 'crit_chance' && abilityMap['crit_chance']) {
    const c0 = ctx.damage;
    abilityMap['crit_chance'](ctx);
    if (detail && (ctx.critProcced || c0 !== ctx.damage)) {
      detail.lines.push({
        k: 'crit',
        from: c0,
        to: ctx.damage,
        proc: !!ctx.critProcced,
      });
    }
  }
  if (ab === 'pierce' && abilityMap['pierce']) {
    abilityMap['pierce'](ctx);
    if (detail) detail.lines.push({ k: 'pierce_atk' });
  }
  if (ab === 'first_strike' && abilityMap['first_strike']) {
    const f0 = ctx.damage;
    abilityMap['first_strike'](ctx);
    if (detail && f0 !== ctx.damage) detail.lines.push({ k: 'first_strike', from: f0, to: ctx.damage });
  }
  if (ab === 'life_steal' && abilityMap['life_steal']) {
    mergeState(attacker);
    if ((attacker.battle!.healProcsLeft | 0) > 0) {
      abilityMap['life_steal'](ctx);
      if (detail) detail.lines.push({ k: 'life_steal_pass' });
    }
  }
  if (ab === 'burn' && abilityMap['burn']) {
    abilityMap['burn'](ctx);
    if (detail) detail.lines.push({ k: 'burn_primer', extra: ctx.burnExtra || 0 });
  }
  if (ab === 'stun' && abilityMap['stun']) {
    const s0 = ctx.damage;
    abilityMap['stun'](ctx);
    if (detail && s0 !== ctx.damage) detail.lines.push({ k: 'stun', from: s0, to: ctx.damage });
  }
  if (ab === 'psychic_blast' && abilityMap['psychic_blast']) {
    const ps0 = ctx.damage;
    abilityMap['psychic_blast'](ctx);
    if (detail && ps0 !== ctx.damage) detail.lines.push({ k: 'psychic', from: ps0, to: ctx.damage });
  }
  if (ab === 'execute' && abilityMap['execute']) {
    abilityMap['execute'](ctx);
    if (detail) detail.lines.push({ k: 'execute_flag' });
  }
  if (ab === 'buff_next' && abilityMap['buff_next']) {
    const b0 = ctx.damage;
    abilityMap['buff_next'](ctx);
    if (detail && b0 !== ctx.damage) detail.lines.push({ k: 'buff_next', from: b0, to: ctx.damage });
  }
  if (ab === 'heal' && abilityMap['heal']) {
    mergeState(attacker);
    if ((attacker.battle!.healProcsLeft | 0) > 0) {
      abilityMap['heal'](ctx);
    }
  }

  ctx.damage = applyDefenderWhileReceiving(ctx.damage, ctx, detail);

  const hpKey = opts?.useCurrentHp ? 'currentHp' : 'hp';
  const defAny = defender as StrikeParticipant & Record<string, number | undefined>;
  if (defender.maxHp == null) defender.maxHp = defender.hp != null ? defender.hp : defAny[hpKey];

  if (ab === 'execute' && ctx.executeActive && defAny[hpKey]! < 5) {
    const ex0 = ctx.damage;
    if (detail) {
      detail.lines.push({
        k: 'execute_finisher',
        hpCap: defAny[hpKey],
        from: ex0,
        to: defAny[hpKey],
      });
    }
    ctx.damage = defAny[hpKey]!;
  }

  const burn = ab === 'burn' ? ctx.burnExtra || 0 : 0;
  if (burn > 0 && detail) {
    detail.lines.push({ k: 'burn_add', n: burn, afterMitigation: ctx.damage });
  }
  const prevD = defAny[hpKey]!;
  const totalToDef = Math.min(defAny[hpKey]!, ctx.damage + burn);
  if (detail) {
    detail.lines.push({
      k: 'hp_hit',
      prevHp: prevD,
      fromAtk: ctx.damage,
      burn,
      total: totalToDef,
      nextHp: Math.max(0, prevD - totalToDef),
    });
  }
  defAny[hpKey] = Math.max(0, prevD - totalToDef);

  const healL = ctx.lifeStealRatio > 0 ? Math.floor(totalToDef * ctx.lifeStealRatio) : 0;
  let maxA = attacker.maxHp != null ? attacker.maxHp : attacker.hp;
  if (attacker.maxHp == null && opts?.useCurrentHp) maxA = attacker.hp;
  const atkAny = attacker as StrikeParticipant & Record<string, number | undefined>;
  if (healL > 0) {
    mergeState(attacker);
    if ((attacker.battle!.healProcsLeft | 0) > 0) {
      attacker.battle!.healProcsLeft = (attacker.battle!.healProcsLeft | 0) - 1;
      const curA = atkAny[hpKey] != null ? atkAny[hpKey]! : maxA;
      if (detail) {
        detail.lines.push({ k: 'drain', ratio: 0.25, gain: healL, before: curA });
      }
      atkAny[hpKey] = Math.min(maxA, curA + healL);
    }
  }
  if (ctx.selfHealOnHit) {
    mergeState(attacker);
    if ((attacker.battle!.healProcsLeft | 0) > 0) {
      attacker.battle!.healProcsLeft = (attacker.battle!.healProcsLeft | 0) - 1;
      if (detail) detail.lines.push({ k: 'self_heal', n: ctx.selfHealOnHit });
      atkAny[hpKey] = Math.min(maxA, (atkAny[hpKey] || 0) + ctx.selfHealOnHit);
    }
  }

  if (defAny[hpKey]! <= 0 && defender.ability === 'revive' && defender.battle && defender.battle.reviveLeft > 0) {
    defender.battle.reviveLeft = 0;
    defAny[hpKey] = 1;
    if (detail) detail.lines.push({ k: 'revive', hp: 1 });
  }

  return { damage: totalToDef, eff, defenderHp: defAny[hpKey]!, detail };
}

export function applyAbility(attacker: StrikeParticipant, defender: StrikeParticipant, damage: number): number {
  const c: AbilityCtx = {
    attacker,
    defender,
    damage,
    rng: Math.random,
    pierceActive: false,
    burnExtra: 0,
    selfHealOnHit: 0,
    lifeStealRatio: 0,
    executeActive: false,
  };
  mergeState(defender);
  return applyDefenderWhileReceiving(damage, c, null);
}

function copyCard(c: Card): StrikeParticipant {
  return {
    id: c.id,
    name: c.name,
    type: c.type,
    ability: c.ability,
    atk: c.atk,
    hp: c.hp,
    maxHp: c.hp,
    currentHp: c.hp,
    level: c.level,
    art: c.art,
    battle: createBattleState(c.ability),
  };
}

export function pickFirstStriker(a: StrikeParticipant, b: StrikeParticipant): 'a' | 'b' {
  const fsA = a.ability === 'first_strike' ? 1 : 0;
  const fsB = b.ability === 'first_strike' ? 1 : 0;
  if (fsA > fsB) return 'a';
  if (fsB > fsA) return 'b';
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
  A.battle = createBattleState(A.ability);
  B.battle = createBattleState(B.ability);
  A.battle.buffUsed = false;
  B.battle.buffUsed = false;
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

function copyBattleState(src: BattleState | undefined): BattleState {
  if (!src) return createBattleState('');
  return {
    firstStrikeLeft: src.firstStrikeLeft | 0,
    shieldBlocks: src.shieldBlocks | 0,
    reviveLeft: src.reviveLeft | 0,
    buffUsed: !!src.buffUsed,
    healProcsLeft: src.healProcsLeft != null ? src.healProcsLeft | 0 : 0,
  };
}

function makeRuntimeClone(card: StrikeParticipant, currentHp: number): StrikeParticipant {
  mergeState(card);
  return {
    id: card.id,
    name: card.name,
    type: card.type,
    ability: card.ability,
    atk: card.atk,
    hp: card.hp,
    maxHp: card.hp,
    currentHp: currentHp,
    level: card.level,
    art: card.art,
    battle: copyBattleState(card.battle),
  };
}

function mergeAttDefBattle(
  real: StrikeParticipant,
  fromAttack: BattleState | undefined,
  fromDef: BattleState | undefined,
): void {
  mergeState(real);
  if (!fromAttack) fromAttack = createBattleState(real.ability);
  if (!fromDef) fromDef = createBattleState(real.ability);
  real.battle!.firstStrikeLeft = fromAttack.firstStrikeLeft | 0;
  real.battle!.buffUsed = !!(fromAttack.buffUsed || fromDef.buffUsed);
  real.battle!.shieldBlocks = fromDef.shieldBlocks | 0;
  const ra = fromAttack.reviveLeft | 0;
  const rd = fromDef.reviveLeft | 0;
  real.battle!.reviveLeft = Math.min(ra, rd);
  real.battle!.healProcsLeft = fromAttack.healProcsLeft != null ? fromAttack.healProcsLeft | 0 : 0;
}

export function applySimultaneousExchange(
  p: StrikeParticipant,
  r: StrikeParticipant,
  opts?: { rng?: () => number },
): SimultaneousExchangeResult {
  const rng = opts?.rng ?? Math.random;
  mergeState(p);
  mergeState(r);
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

  const pEnd = cP1.currentHp! - p0 + cP2.currentHp!;
  const rEnd = cR1.currentHp! - r0 + cR2.currentHp!;
  p.currentHp = Math.max(0, Math.min(p.hp, pEnd));
  r.currentHp = Math.max(0, Math.min(r.hp, rEnd));

  mergeAttDefBattle(p, cP1.battle, cP2.battle);
  mergeAttDefBattle(r, cR2.battle, cR1.battle);

  return {
    damageToRival: dmgPtoR,
    damageToPlayer: dmgRtoP,
    effPlayerAttack: eff1,
    effRivalAttack: eff2,
    detailPtoR,
    detailRtoP,
  };
}

/** PV que gana el atacante por robo de vida o autocuración en ese golpe (para popup en batalla). */
export function sumAttackerHealFromStrikeDetail(detail: StrikeDetail): number {
  let sum = 0;
  for (const line of detail.lines) {
    if (line.k === 'drain') {
      const gain = (line as { gain?: number }).gain;
      if (typeof gain === 'number') sum += gain;
    } else if (line.k === 'self_heal') {
      const n = (line as { n?: number }).n;
      if (typeof n === 'number') sum += n;
    }
  }
  return sum;
}

/** Exponer abilityMap para tests / extensión (misma modularidad que combat.js). */
export { abilityMap };

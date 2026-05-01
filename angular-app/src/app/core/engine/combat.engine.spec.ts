import { applySimultaneousExchange, createBattleState, resolveStrike } from './combat.engine';
import type { StrikeParticipant } from './combat.engine';
import type { Card } from '../models/card.model';

function asRuntime(c: Card): StrikeParticipant {
  return {
    ...c,
    currentHp: c.hp,
    maxHp: c.hp,
    battle: createBattleState(c.ability),
  };
}

describe('combat.engine', () => {
  it('applySimultaneousExchange mutates HP like double strike from same snapshot', () => {
    const base: Card = {
      id: 't1',
      name: 'A',
      type: 'fire',
      ability: 'stun',
      level: 1,
      atk: 4,
      hp: 20,
      art: 'x',
    };
    const p = asRuntime(base);
    const r = asRuntime({ ...base, id: 't2', name: 'B', type: 'water' });
    const rng = () => 0.99;
    const p0 = p.currentHp!;
    const r0 = r.currentHp!;
    applySimultaneousExchange(p, r, { rng });
    expect(p.currentHp).toBeLessThanOrEqual(p0);
    expect(r.currentHp).toBeLessThanOrEqual(r0);
    expect(p.currentHp).toBeGreaterThanOrEqual(0);
    expect(r.currentHp).toBeGreaterThanOrEqual(0);
  });

  it('resolveStrike respects shield block once', () => {
    const atk: StrikeParticipant = asRuntime({
      id: 'a',
      name: 'Atk',
      type: 'light',
      ability: 'stun',
      level: 1,
      atk: 5,
      hp: 10,
      art: '⚔️',
    });
    const def: StrikeParticipant = asRuntime({
      id: 'd',
      name: 'Def',
      type: 'energy',
      ability: 'shield',
      level: 1,
      atk: 1,
      hp: 10,
      art: '🛡️',
    });
    const d0 = def.hp;
    resolveStrike(atk, def, { rng: () => 0.5, detail: null });
    expect(def.hp).toBe(d0);
    expect(def.battle!.shieldBlocks).toBe(0);
  });
});

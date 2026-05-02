import { applySimultaneousExchange, resolveStrike } from './combat.engine';
import type { StrikeParticipant } from './combat.engine';

describe('combat.engine (sin habilidades)', () => {
  it('resolveStrike aplica multiplicador de tipo y baja PV', () => {
    const atk: StrikeParticipant = {
      id: 'a',
      name: 'A',
      type: 'fire',
      atk: 4,
      hp: 5,
      level: 1,
      art: 'x',
    };
    const def: StrikeParticipant = {
      id: 'b',
      name: 'B',
      type: 'nature',
      atk: 2,
      hp: 8,
      level: 1,
      art: 'y',
    };
    const r = resolveStrike(atk, def, { useCurrentHp: false, detail: null });
    expect(r.damage).toBe(5);
    expect(def.hp).toBe(3);
  });

  it('applySimultaneousExchange resuelve ambos golpes', () => {
    const p: StrikeParticipant = {
      id: 'p',
      name: 'P',
      type: 'water',
      atk: 3,
      hp: 10,
      currentHp: 10,
      level: 1,
      art: 'a',
    };
    const r: StrikeParticipant = {
      id: 'r',
      name: 'R',
      type: 'fire',
      atk: 2,
      hp: 8,
      currentHp: 8,
      level: 1,
      art: 'b',
    };
    const ex = applySimultaneousExchange(p, r, { rng: () => 0.5 });
    expect(ex.damageToRival).toBeGreaterThan(0);
    expect(ex.damageToPlayer).toBeGreaterThan(0);
  });
});

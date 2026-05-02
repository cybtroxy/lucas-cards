import {
  MIN_BASE_COINS_PER_PARTIDA,
  rivalShopBudgetForPartida,
  rollRivalDifficulty,
} from './game-rules';

describe('rivalShopBudgetForPartida', () => {
  it('Fácil: jugador −20 referencia, respetando piso', () => {
    const r = rivalShopBudgetForPartida(30, () => 0.05);
    expect(r.tier).toBe('easy');
    expect(r.budgetDelta).toBe(-20);
    expect(r.budget).toBe(10);
  });

  it('Normal: jugador −5', () => {
    const r = rivalShopBudgetForPartida(40, () => 0.65);
    expect(r.tier).toBe('normal');
    expect(r.budgetDelta).toBe(-5);
    expect(r.budget).toBe(35);
  });

  it('Difícil: jugador +30', () => {
    const r = rivalShopBudgetForPartida(25, () => 0.92);
    expect(r.tier).toBe('hard');
    expect(r.budgetDelta).toBe(30);
    expect(r.budget).toBe(55);
  });

  it('no baja del mínimo global si jugador va muy justo', () => {
    const r = rivalShopBudgetForPartida(12, () => 0.05);
    expect(r.tier).toBe('easy');
    expect(r.budget).toBe(MIN_BASE_COINS_PER_PARTIDA);
  });
});

describe('rollRivalDifficulty umbrales', () => {
  it('30% / 60% / 10%', () => {
    expect(rollRivalDifficulty(() => 0).tier).toBe('easy');
    expect(rollRivalDifficulty(() => 0.299).tier).toBe('easy');
    expect(rollRivalDifficulty(() => 0.3).tier).toBe('normal');
    expect(rollRivalDifficulty(() => 0.899).tier).toBe('normal');
    expect(rollRivalDifficulty(() => 0.9).tier).toBe('hard');
  });
});

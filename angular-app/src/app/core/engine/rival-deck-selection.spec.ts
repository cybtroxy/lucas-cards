import { CARDS } from '../data/cards.catalog';
import {
  sampleRivalBalanceReport,
  simulateRivalDeckSelection,
  summarizeRivalDeckSlots,
} from './rival-deck-selection';

/** RNG determinista para snapshots reproducibles. */
function mulberry32(seed: number): () => number {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

describe('rival-deck-selection', () => {
  it('genera mazo con apilado / huecos como el jugador y traza larga para balance', () => {
    const rng = mulberry32(42);
    const r = simulateRivalDeckSelection({
      rivalCoinBudget: 30,
      partidaNumber: 1,
      catalog: CARDS,
      rng,
    });
    expect(r.deckSlots.length).toBeGreaterThanOrEqual(1);
    expect(r.deckSlots.length).toBeLessThanOrEqual(r.maxSlotRows);
    expect(summarizeRivalDeckSlots(r.deckSlots)).not.toBe('—');
    expect(r.trace.length).toBeGreaterThanOrEqual(10);
    expect(r.trace[0].kind).toBe('start');
    expect(r.trace[r.trace.length - 1].kind).toBe('done');
  });

  it('reporte multi-partida: ≥10 pasos de traza por partida en escenarios base', () => {
    const rng = mulberry32(99);
    const report = sampleRivalBalanceReport(CARDS, rng, {
      rivalBudget: 30,
      partidas: [1, 2, 3, 4, 5],
    });
    expect(report.length).toBe(5);
    for (const row of report) {
      expect(row.traceStepCount).toBeGreaterThanOrEqual(
        10,
        `partida ${row.partidaNumber} debería tener traza detallada`,
      );
    }
  });
});

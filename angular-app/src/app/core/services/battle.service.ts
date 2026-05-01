import { Injectable } from '@angular/core';
import type { Card } from '../models/card.model';
import type { SimultaneousExchangeResult } from '../models/combat-detail.model';
import {
  applyAbility,
  applySimultaneousExchange,
  fight,
  fightLine,
  resolveStrike,
  createBattleState as engineCreateBattleState,
  resetBattleForCard,
  pickFirstStriker,
  TYPE_ADV,
  abilityMap,
} from '../engine/combat.engine';
import type { StrikeParticipant } from '../engine/combat.engine';
import type { ResolveStrikeOptions, ResolveStrikeResult } from '../engine/combat.engine';

/** Fachada del motor de combate — sin lógica extra. */
@Injectable({ providedIn: 'root' })
export class BattleService {
  readonly TYPE_ADV = TYPE_ADV;
  readonly abilityMap = abilityMap;

  resolveStrike(
    attacker: StrikeParticipant,
    defender: StrikeParticipant,
    opts?: ResolveStrikeOptions,
  ): ResolveStrikeResult {
    return resolveStrike(attacker, defender, opts);
  }

  applySimultaneousExchange(p: StrikeParticipant, r: StrikeParticipant, opts?: { rng?: () => number }): SimultaneousExchangeResult {
    return applySimultaneousExchange(p, r, opts);
  }

  applyAbility(attacker: StrikeParticipant, defender: StrikeParticipant, damage: number): number {
    return applyAbility(attacker, defender, damage);
  }

  fight(cardA: Card, cardB: Card, opts?: { rng?: () => number }) {
    return fight(cardA, cardB, opts);
  }

  fightLine(teamA: Card[], teamB: Card[], opts?: { rng?: () => number }) {
    return fightLine(teamA, teamB, opts);
  }

  createBattleState(ability: Parameters<typeof engineCreateBattleState>[0]) {
    return engineCreateBattleState(ability);
  }

  resetBattleForCard = resetBattleForCard;
  pickFirstStriker = pickFirstStriker;
}

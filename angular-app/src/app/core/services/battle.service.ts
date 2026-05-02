import { Injectable } from '@angular/core';
import type { Card } from '../models/card.model';
import type { SimultaneousExchangeResult } from '../models/combat-detail.model';
import {
  applySimultaneousExchange,
  fight,
  fightLine,
  pickFirstStriker,
  resolveStrike,
  TYPE_ADV,
} from '../engine/combat.engine';
import type { StrikeParticipant } from '../engine/combat.engine';
import type { ResolveStrikeOptions, ResolveStrikeResult } from '../engine/combat.engine';

/** Fachada del motor de combate. */
@Injectable({ providedIn: 'root' })
export class BattleService {
  readonly TYPE_ADV = TYPE_ADV;
  readonly pickFirstStriker = pickFirstStriker;

  resolveStrike(
    attacker: StrikeParticipant,
    defender: StrikeParticipant,
    opts?: ResolveStrikeOptions,
  ): ResolveStrikeResult {
    return resolveStrike(attacker, defender, opts);
  }

  applySimultaneousExchange(
    p: StrikeParticipant,
    r: StrikeParticipant,
    opts?: { rng?: () => number },
  ): SimultaneousExchangeResult {
    return applySimultaneousExchange(p, r, opts);
  }

  fight(cardA: Card, cardB: Card, opts?: { rng?: () => number }) {
    return fight(cardA, cardB, opts);
  }

  fightLine(teamA: Card[], teamB: Card[], opts?: { rng?: () => number }) {
    return fightLine(teamA, teamB, opts);
  }
}

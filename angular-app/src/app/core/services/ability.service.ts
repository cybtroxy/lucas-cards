import { Injectable } from '@angular/core';
import { abilityMap } from '../engine/combat.engine';

@Injectable({ providedIn: 'root' })
export class AbilityService {
  readonly abilityMap = abilityMap;
}

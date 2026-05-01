import { Injectable } from '@angular/core';
import { getTypeMultiplier, multToEffLabel, TYPE_ADV } from '../engine/combat.engine';

@Injectable({ providedIn: 'root' })
export class TypeService {
  readonly TYPE_ADV = TYPE_ADV;

  getTypeMultiplier(attackerType: string, defenderType: string): number {
    return getTypeMultiplier(attackerType, defenderType);
  }

  multToEffLabel(mult: number) {
    return multToEffLabel(mult);
  }
}

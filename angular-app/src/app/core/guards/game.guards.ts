import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { GameStateService } from '../services/game-state.service';
import { MIN_DECK } from '../engine/game-rules';

export const battleGuard: CanActivateFn = () => {
  const gs = inject(GameStateService);
  const g = gs.game();
  if (g.playerDeck.length >= MIN_DECK && g.rivalDeck.length >= MIN_DECK) return true;
  return inject(Router).createUrlTree(['/select']);
};

export const resultGuard: CanActivateFn = () => {
  const gs = inject(GameStateService);
  if (gs.lastResult() != null) return true;
  return inject(Router).createUrlTree(['/menu']);
};

import { Routes } from '@angular/router';
import { battleGuard, resultGuard } from './core/guards/game.guards';

export const routes: Routes = [
  { path: '', redirectTo: 'menu', pathMatch: 'full' },
  {
    path: 'menu',
    loadComponent: () => import('./features/menu/menu.page').then((m) => m.MenuPageComponent),
  },
  {
    path: 'select',
    loadComponent: () => import('./features/select/select.page').then((m) => m.SelectPageComponent),
  },
  {
    path: 'battle',
    loadComponent: () => import('./features/battle/battle.page').then((m) => m.BattlePageComponent),
    canActivate: [battleGuard],
  },
  {
    path: 'result',
    loadComponent: () => import('./features/result/result.page').then((m) => m.ResultPageComponent),
    canActivate: [resultGuard],
  },
];

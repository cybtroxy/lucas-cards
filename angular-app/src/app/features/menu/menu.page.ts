import { Component, inject, signal } from '@angular/core';
import { GameStateService } from '../../core/services/game-state.service';
import { I18nService, type LucasLang } from '../../core/services/i18n.service';

@Component({
  selector: 'app-menu-page',
  standalone: true,
  templateUrl: './menu.page.html',
  styleUrl: './menu.page.scss',
})
export class MenuPageComponent {
  readonly gs = inject(GameStateService);
  readonly i18n = inject(I18nService);

  readonly howOpen = signal(false);

  play(): void {
    this.gs.playFromMenu();
  }

  toggleHow(): void {
    this.howOpen.update((v) => !v);
  }

  closeHow(): void {
    this.howOpen.set(false);
  }

  setLang(code: LucasLang): void {
    this.i18n.setLang(code);
  }
}

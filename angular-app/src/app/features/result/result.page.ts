import { Component, computed, inject, signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { GameStateService } from '../../core/services/game-state.service';
import { I18nService } from '../../core/services/i18n.service';

@Component({
  selector: 'app-result-page',
  standalone: true,
  templateUrl: './result.page.html',
  styleUrl: './result.page.scss',
})
export class ResultPageComponent {
  readonly gs = inject(GameStateService);
  readonly i18n = inject(I18nService);
  private readonly sanitizer = inject(DomSanitizer);

  readonly result = this.gs.lastResult;
  readonly combatLogOpen = signal(false);
  readonly combatDetailOpen = signal(false);

  readonly logSnapshotSafe = computed(() =>
    this.sanitizer.bypassSecurityTrustHtml(this.gs.game().lastCombatEventLogSnapshot || ''),
  );

  readonly headingLog = computed(() => (this.i18n.isEn() ? 'Battle log' : 'Registro del combate'));

  nextMatch(): void {
    this.gs.goToNextMatch();
  }

  newSeries(): void {
    this.gs.newSeriesFromResult();
  }

  backMenu(): void {
    this.gs.backToMenuFromResult();
  }

  openLog(): void {
    this.combatLogOpen.set(true);
  }

  closeLog(): void {
    this.combatLogOpen.set(false);
  }

  toggleCombatDetail(): void {
    this.combatDetailOpen.update((v) => !v);
  }
}

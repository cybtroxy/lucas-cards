import { afterNextRender, Component, computed, DestroyRef, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CardComponent } from '../../shared/components/card/card.component';
import { COMBAT_ZOOM_SCALE, WINS_TO_WIN_SERIES } from '../../core/engine/game-rules';
import { combatLogEntriesToHtml } from '../../core/engine/combat-log.format';
import { GameStateService } from '../../core/services/game-state.service';
import { I18nService } from '../../core/services/i18n.service';
import type { BattleCard } from '../../core/models/battle-card.model';

/** Same breakpoint as `lucas-cards.scss` (viewports under 900px). */
const MOBILE_BATTLE_ZOOM_MQ = '(max-width: 899px)';

@Component({
  selector: 'app-battle-page',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './battle.page.html',
  styleUrl: './battle.page.scss',
})
export class BattlePageComponent {
  readonly gs = inject(GameStateService);
  readonly i18n = inject(I18nService);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly destroyRef = inject(DestroyRef);

  readonly game = this.gs.game;

  /** Etiqueta de dificultad del rival en esta partida (tienda simulada); null si no hay dato. */
  readonly rivalDifficultyLabel = computed(() => {
    const t = this.game().rivalDifficultyThisPartida;
    if (t == null) return null;
    switch (t) {
      case 'easy':
        return this.i18n.tUi('rivalDifficultyEasy');
      case 'normal':
        return this.i18n.tUi('rivalDifficultyNormal');
      case 'hard':
        return this.i18n.tUi('rivalDifficultyHard');
      default:
        return null;
    }
  });

  /** Mazos en arena: sin cartas ya retiradas tras animación de K.O. */
  readonly playerDeckRevVisible = computed(() => {
    const g = this.gs.game();
    const removed = new Set(g.battleUi.removedFromArenaUids);
    return [...g.playerDeck].filter((c) => !removed.has(c.uid)).reverse();
  });

  readonly rivalDeckVisible = computed(() => {
    const g = this.gs.game();
    const removed = new Set(g.battleUi.removedFromArenaUids);
    return g.rivalDeck.filter((c) => !removed.has(c.uid));
  });

  readonly activePlayer = computed(() => {
    const g = this.gs.game();
    return g.playerDeck[g.battleIdx.p] ?? null;
  });

  readonly activeRival = computed(() => {
    const g = this.gs.game();
    return g.rivalDeck[g.battleIdx.r] ?? null;
  });

  readonly combatLogSafe = computed(() => {
    const html = combatLogEntriesToHtml(this.gs.game().combatLogEntries, this.i18n.isEn());
    return this.sanitizer.bypassSecurityTrustHtml(html);
  });

  readonly lastLogSafe = computed((): SafeHtml => {
    const log = this.gs.game().log;
    const line = log[log.length - 1] || 'Preparen las cartas…';
    return this.sanitizer.bypassSecurityTrustHtml(line);
  });

  readonly zoomScale = computed(() => COMBAT_ZOOM_SCALE[this.gs.game().combatCardZoom]);

  readonly combatEventTitle = computed(() => (this.i18n.isEn() ? 'Battle log' : 'Registro de combate'));

  constructor() {
    const gs = this.gs;
    afterNextRender(() => {
      if (typeof matchMedia === 'undefined') return;
      const mq = matchMedia(MOBILE_BATTLE_ZOOM_MQ);
      const applyMobileZoom = (isMobile: boolean) => {
        if (isMobile) {
          gs.setCombatZoom(1);
          const g = gs.game();
          if (g.auto) gs.toggleAuto();
          else if (g.speed === 2) gs.setSpeed(1);
        }
      };
      applyMobileZoom(mq.matches);
      const onChange = (e: MediaQueryListEvent) => applyMobileZoom(e.matches);
      mq.addEventListener('change', onChange);
      this.destroyRef.onDestroy(() => mq.removeEventListener('change', onChange));
    });
  }

  isPlayerCardActive(c: BattleCard): boolean {
    return c.uid === this.activePlayer()?.uid;
  }

  isRivalCardActive(c: BattleCard): boolean {
    return c.uid === this.activeRival()?.uid;
  }

  isDead(c: BattleCard): boolean {
    return c.currentHp <= 0;
  }

  isVanishing(side: 'player' | 'rival', c: BattleCard): boolean {
    return this.gs.game().battleUi.fainting.some((e) => e.side === side && e.uid === c.uid);
  }

  setCombatLogMode(mode: 'float' | 'min' | 'modal'): void {
    this.gs.setCombatLogView(mode);
  }

  onBackdropClick(): void {
    if (this.gs.game().combatLogView === 'modal') {
      this.gs.setCombatLogView('float');
    }
  }

  setZoom(z: 1 | 2 | 3): void {
    this.gs.setCombatZoom(z);
  }

  setSpeed(s: number): void {
    this.gs.setSpeed(s);
  }

  togglePause(): void {
    this.gs.togglePause();
  }

  toggleAuto(): void {
    this.gs.toggleAuto();
  }

  endTurnQuick(): void {
    this.gs.endBattleQuick();
  }

  protected readonly winsSeries = WINS_TO_WIN_SERIES;
}

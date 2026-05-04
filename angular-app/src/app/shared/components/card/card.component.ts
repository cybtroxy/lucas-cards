import { DOCUMENT, NgStyle } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  computed,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import {
  CARDS_STATS_LUPA_SRC,
  cardsArtImageSrc,
  cardsBorderImageSrc,
} from '../../../core/constants/cards-art.constants';
import type { BattleCard } from '../../../core/models/battle-card.model';
import type { Card } from '../../../core/models/card.model';
import { CardStatPopoverCoordinator } from './card-stat-popover.coordinator';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnDestroy {
  private readonly doc = inject(DOCUMENT);
  private readonly hostRef = inject(ElementRef<HTMLElement>);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly popoverCoordinator = inject(CardStatPopoverCoordinator);
  private readonly popoverRef = viewChild<ElementRef<HTMLElement>>('statPopover');

  card = input.required<Card | BattleCard>();
  side = input<'player' | 'rival'>('player');
  extraClass = input('');
  /** Estrellas por apilamiento (selección) o copias en batalla. */
  stackStars = input<0 | 1 | 2 | 3>(0);
  /** Valores base del catálogo para desglose en el popover (PV/ATK mejorados). */
  statPopoverBase = input<{ hp: number; atk: number } | null>(null);
  /** Desactiva el popover de stats (p. ej. miniaturas). */
  statPopoverEnabled = input(true);
  /** Barra de PV animada: solo batalla; fuera del marco con aspect-ratio. */
  showHpBar = input(false);
  isActive = input(false);
  isDead = input(false);
  isVanishing = input(false);
  isAttacking = input(false);
  isTakingHit = input(false);
  damagePopup = input<{ dmg: number; label: string } | null>(null);
  healPopup = input<number | null>(null);

  cardClick = output<Card | BattleCard>();

  protected readonly popoverVisible = signal(false);
  /** Colapso en host cuando está oculto (no reserva espacio). */
  protected readonly popoverStyle = signal<Record<string, string>>(this.hiddenPopoverStyle());

  /** Cierra este popover y libera el coordinador (también se usa para cerrar otros al abrir uno nuevo). */
  private readonly dismissPopover = (): void => {
    this.unbindGlobalDismiss();
    this.restorePopoverToHost();
    this.popoverVisible.set(false);
    this.popoverStyle.set(this.hiddenPopoverStyle());
    this.popoverCoordinator.release(this.dismissPopover);
  };

  private outsideClickHandler: ((e: MouseEvent) => void) | null = null;
  private escapeKeyHandler: ((e: KeyboardEvent) => void) | null = null;

  private unbindGlobalDismiss(): void {
    if (this.outsideClickHandler) {
      this.doc.removeEventListener('click', this.outsideClickHandler, true);
      this.outsideClickHandler = null;
    }
    if (this.escapeKeyHandler) {
      this.doc.removeEventListener('keydown', this.escapeKeyHandler, true);
      this.escapeKeyHandler = null;
    }
  }

  private bindGlobalDismiss(): void {
    this.unbindGlobalDismiss();
    this.outsideClickHandler = (e: MouseEvent) => {
      const t = e.target as Node;
      if (this.hostRef.nativeElement.contains(t)) return;
      const pop = this.popoverRef()?.nativeElement;
      if (pop?.contains(t)) return;
      this.dismissPopover();
    };
    this.escapeKeyHandler = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      e.preventDefault();
      this.dismissPopover();
    };
    setTimeout(() => {
      if (this.outsideClickHandler) {
        this.doc.addEventListener('click', this.outsideClickHandler, true);
      }
      if (this.escapeKeyHandler) {
        this.doc.addEventListener('keydown', this.escapeKeyHandler, true);
      }
    }, 0);
  }

  ngOnDestroy(): void {
    this.dismissPopover();
  }

  protected readonly cardArtSrc = computed(() =>
    cardsArtImageSrc(this.card().level || 1, this.card().art_url),
  );

  protected readonly cardBorderSrc = computed(() =>
    cardsBorderImageSrc(this.card().level || 1),
  );

  protected cardUid = computed(() => {
    const c = this.card() as BattleCard;
    return c.uid ?? c.id;
  });

  protected readonly statPopoverId = computed(
    () => `card-stat-popover-${this.cardUid()}`,
  );

  protected readonly statsLupaSrc = CARDS_STATS_LUPA_SRC;

  protected displayStars = computed((): 0 | 1 | 2 | 3 => {
    const s = this.stackStars();
    if (s > 0) return s;
    const c = this.card() as BattleCard;
    return (c.stackStars ?? 0) as 0 | 1 | 2 | 3;
  });

  protected starMarks = computed(() => Array.from({ length: this.displayStars() }));

  protected currentHp(): number {
    const c = this.card() as BattleCard;
    return c.currentHp ?? c.hp;
  }

  /** PV máximo en la fila de stats; la barra y el popover siguen reflejando cur / max con currentHp. */
  protected displayStatHp(): number {
    return this.card().hp;
  }

  protected hpPct(): number {
    const c = this.card();
    const cur = this.currentHp();
    return Math.max(0, Math.min(100, (cur / c.hp) * 100));
  }

  /** Batalla: solo carta activa del asalto; oculta al llegar a 0 PV (sin animación de vaciado). */
  protected readonly hpBarVisible = computed(() => {
    if (!this.showHpBar()) return false;
    if (!this.isActive()) return false;
    const c = this.card() as BattleCard;
    const cur = c.currentHp ?? c.hp;
    return cur > 0;
  });

  protected hpFillStyle(): string {
    const pct = this.hpPct();
    if (pct > 60) return 'linear-gradient(180deg, #4ade80, #16a34a)';
    if (pct > 30) return 'linear-gradient(180deg, #facc15, #d97706)';
    return 'linear-gradient(180deg, #f87171, #b91c1c)';
  }

  protected classNames = computed(() => {
    const bits = ['card'];
    const lv = Math.min(5, Math.max(1, this.card().level || 1));
    bits.push(`card--l${lv}`);
    if (this.side() === 'rival') bits.push('rival');
    const ex = this.extraClass().trim();
    if (ex) bits.push(ex);
    if (this.isActive()) bits.push('active');
    if (this.isDead()) bits.push('dead');
    if (this.isVanishing()) bits.push('vanishing');
    if (this.isAttacking()) bits.push('attacking');
    if (this.isTakingHit()) bits.push('taking-hit');
    return bits.join(' ');
  });

  onStatsLupaClick(ev: MouseEvent): void {
    ev.stopPropagation();
    ev.preventDefault();
    if (!this.statPopoverEnabled()) return;
    if (this.popoverVisible()) {
      this.dismissPopover();
      return;
    }
    this.openStatsPopover();
  }

  private openStatsPopover(): void {
    const cardEl = this.hostRef.nativeElement.querySelector('.card') as HTMLElement | null;
    if (!cardEl) return;
    this.popoverCoordinator.takeover(this.dismissPopover);
    this.popoverVisible.set(true);
    this.cdr.markForCheck();
    this.bindGlobalDismiss();
    requestAnimationFrame(() => {
      const pop = this.popoverRef()?.nativeElement;
      if (!pop) return;
      if (pop.parentElement !== this.doc.body) {
        this.doc.body.appendChild(pop);
      }
      this.positionPopover(cardEl);
    });
  }

  private hiddenPopoverStyle(): Record<string, string> {
    return {
      opacity: '0',
      visibility: 'hidden',
      position: 'absolute',
      left: '0',
      top: '0',
      width: '0',
      height: '0',
      overflow: 'hidden',
      pointerEvents: 'none',
    };
  }

  private restorePopoverToHost(): void {
    const pop = this.popoverRef()?.nativeElement;
    if (pop && pop.parentElement === this.doc.body) {
      this.hostRef.nativeElement.appendChild(pop);
    }
  }

  private positionPopover(cardEl: HTMLElement): void {
    const rect = cardEl.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const pw = 228;
    const ph = 168;
    const pad = 10;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const preferAbove = cy > vh * 0.48;
    const preferAlignLeft = cx < vw * 0.52;
    let top: number;
    let left: number;
    if (preferAbove && preferAlignLeft) {
      left = rect.right - pw;
      top = rect.top - ph - pad;
    } else if (preferAbove && !preferAlignLeft) {
      left = rect.left;
      top = rect.top - ph - pad;
    } else if (!preferAbove && preferAlignLeft) {
      left = rect.right - pw;
      top = rect.bottom + pad;
    } else {
      left = rect.left;
      top = rect.bottom + pad;
    }
    left = Math.max(pad, Math.min(left, vw - pw - pad));
    top = Math.max(pad, Math.min(top, vh - ph - pad));
    this.popoverStyle.set({
      position: 'fixed',
      zIndex: '9999',
      width: `${pw}px`,
      top: `${top}px`,
      left: `${left}px`,
      opacity: '1',
      visibility: 'visible',
      overflow: 'visible',
      height: 'auto',
      pointerEvents: 'auto',
    });
  }

  onClick(): void {
    if (this.popoverVisible()) {
      this.dismissPopover();
    }
    this.cardClick.emit(this.card());
  }
}

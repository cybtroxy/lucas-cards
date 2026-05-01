import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import {
  Component,
  computed,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { REFERENCE_ORDER } from '../../core/i18n/card-reference';
import { CardComponent } from '../../shared/components/card/card.component';
import { CardsCatalogService } from '../../core/services/cards-catalog.service';
import { GameStateService } from '../../core/services/game-state.service';
import { I18nService } from '../../core/services/i18n.service';
import {
  SHOP_MAX_SAME_CARD,
  SHOP_OFFER_COUNT,
  shopLevelRangeFromAsalto,
  stackStatsFromCopies,
} from '../../core/engine/game-rules';
import type { Card } from '../../core/models/card.model';
import type { DeckSlot } from '../../core/models/deck-slot.model';
import type { ShopOfferSlot } from '../../core/models/game-state.model';

@Component({
  selector: 'app-select-page',
  standalone: true,
  imports: [CardComponent, DragDropModule],
  templateUrl: './select.page.html',
  styleUrl: './select.page.scss',
})
export class SelectPageComponent implements OnInit, OnDestroy {
  readonly gs = inject(GameStateService);
  readonly catalog = inject(CardsCatalogService);
  readonly i18n = inject(I18nService);

  readonly game = this.gs.game;

  /** Orden de filas del glosario (tipos, habilidades). */
  readonly refOrder = REFERENCE_ORDER;

  readonly glossaryOpen = signal(false);
  /** Aviso efímero cuando el mazo está lleno de huecos y se intenta añadir carta nueva. */
  readonly deckFullHint = signal<string | null>(null);
  private deckFullHintTimer: ReturnType<typeof setTimeout> | null = null;

  ngOnInit(): void {
    if (this.gs.game().shopOfferSlots.length === 0) {
      this.gs.prepareSelectPool();
    }
  }

  readonly maxSlots = computed(() => this.gs.maxSlotsForCurrentSelect());

  readonly placeholderCount = computed(() =>
    Math.max(0, this.maxSlots() - this.game().deckSlots.length),
  );

  readonly placeholderSlots = computed(() =>
    Array.from({ length: this.placeholderCount() }, (_, i) => i),
  );

  readonly shopHint = computed(() => {
    const a = this.gs.game().shopAsaltoForNextSelect;
    const r = shopLevelRangeFromAsalto(a);
    return `Según el asalto de referencia ${a}, la tienda solo incluye cartas de nivel ${r.min}–${r.max}. ${SHOP_OFFER_COUNT} casillas; la misma carta puede repetirse hasta ${SHOP_MAX_SAME_CARD} veces. Al elegir una, su hueco queda vacío hasta refrescar.`;
  });

  readonly budgetLeft = computed(() => this.gs.selectBudgetLeft());

  readonly canStart = computed(() => this.gs.canStartBattle());

  readonly upcomingPartida = computed(() => this.game().gamesInSeries + 1);

  slotViewCard(slot: DeckSlot): Card {
    const raw = this.catalog.findById(slot.id)!;
    const st = stackStatsFromCopies(slot.copies, raw.hp, raw.atk);
    return { ...raw, hp: st.hp, atk: st.atk };
  }

  slotStatBase(slot: DeckSlot): { hp: number; atk: number } {
    const raw = this.catalog.findById(slot.id)!;
    return { hp: raw.hp, atk: raw.atk };
  }

  slotStars(slot: DeckSlot): 0 | 1 | 2 {
    const raw = this.catalog.findById(slot.id)!;
    return stackStatsFromCopies(slot.copies, raw.hp, raw.atk).stars;
  }

  /** Oferta de tienda apilable sobre un hueco del mazo (misma carta y aún se puede añadir). */
  shopOfferIsDeckUpgrade(card: Card): boolean {
    const g = this.game();
    if (!g.deckSlots.some((s) => s.id === card.id)) return false;
    return this.gs.canAddCard(card);
  }

  shopOfferExtraClass(card: Card): string {
    return this.shopOfferIsDeckUpgrade(card) ? 'card--shop-deck-upgrade' : '';
  }

  onPoolSlotClick(slot: ShopOfferSlot): void {
    const card = slot.card;
    if (!card) return;
    if (!this.gs.canAddCard(card)) {
      if (this.gs.isCardInCurrentShop(card)) {
        this.flashDeckFullHint();
      }
      return;
    }
    this.gs.addCardFromShopSlot(slot.slotUid);
  }

  private flashDeckFullHint(): void {
    if (this.deckFullHintTimer != null) {
      clearTimeout(this.deckFullHintTimer);
      this.deckFullHintTimer = null;
    }
    this.deckFullHint.set(this.i18n.tUi('selectDeckFullToast'));
    this.deckFullHintTimer = setTimeout(() => {
      this.deckFullHint.set(null);
      this.deckFullHintTimer = null;
    }, 3200);
  }

  ngOnDestroy(): void {
    if (this.deckFullHintTimer != null) {
      clearTimeout(this.deckFullHintTimer);
    }
  }

  onDeckSlotClick(slot: DeckSlot): void {
    this.gs.removeCopyFromDeckSlot(slot.uid);
  }

  drop(event: CdkDragDrop<unknown>): void {
    if (event.previousIndex === event.currentIndex) return;
    this.gs.reorderDeck(event.previousIndex, event.currentIndex);
  }

  refreshShop(): void {
    this.gs.refreshShop();
  }

  startBattle(): void {
    this.gs.startBattle();
  }

  backMenu(): void {
    this.gs.backToMenuFromSelect();
  }

  openGlossary(): void {
    this.glossaryOpen.set(true);
  }

  closeGlossary(): void {
    this.glossaryOpen.set(false);
  }

  @HostListener('document:keydown.escape')
  onGlossaryEscape(): void {
    if (this.glossaryOpen()) this.closeGlossary();
  }
}

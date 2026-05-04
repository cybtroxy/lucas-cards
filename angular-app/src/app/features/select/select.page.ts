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
import { AudioSettingsFabComponent } from '../../shared/components/audio-settings-fab/audio-settings-fab.component';
import { CardComponent } from '../../shared/components/card/card.component';
import { CardsCatalogService } from '../../core/services/cards-catalog.service';
import { GameStateService } from '../../core/services/game-state.service';
import { I18nService } from '../../core/services/i18n.service';
import { SoundCue, SoundService } from '../../core/services/sound.service';
import {
  SHOP_MAX_SAME_CARD,
  SHOP_OFFER_COUNT,
  SHOP_REFRESH_COST,
  shopLevelRangeFromPartida,
  stackStatsFromCopies,
} from '../../core/engine/game-rules';
import type { Card } from '../../core/models/card.model';
import {
  isEmptyDeckSlot,
  isFilledDeckSlot,
  type FilledDeckSlot,
} from '../../core/models/deck-slot.model';
import type { ShopOfferSlot } from '../../core/models/game-state.model';

@Component({
  selector: 'app-select-page',
  standalone: true,
  imports: [AudioSettingsFabComponent, CardComponent, DragDropModule],
  templateUrl: './select.page.html',
  styleUrl: './select.page.scss',
})
export class SelectPageComponent implements OnInit, OnDestroy {
  readonly gs = inject(GameStateService);
  readonly catalog = inject(CardsCatalogService);
  readonly i18n = inject(I18nService);
  readonly sound = inject(SoundService);

  readonly game = this.gs.game;

  /** Orden de filas del glosario (tipos, habilidades). */
  readonly refOrder = REFERENCE_ORDER;

  readonly glossaryOpen = signal(false);

  ngOnInit(): void {
    if (this.gs.game().shopOfferSlots.length === 0) {
      this.gs.prepareSelectPool();
    }
    this.sound.startShoppingAmbient();
  }

  ngOnDestroy(): void {
    this.sound.stopAmbientMusic();
  }

  readonly maxSlots = computed(() => this.gs.maxSlotsForCurrentSelect());

  readonly placeholderCount = computed(() =>
    Math.max(0, this.maxSlots() - this.game().deckSlots.length),
  );

  readonly placeholderSlots = computed(() =>
    Array.from({ length: this.placeholderCount() }, (_, i) => i),
  );

  readonly shopHint = computed(() => {
    const partida = this.gs.game().shopAsaltoForNextSelect;
    const r = shopLevelRangeFromPartida(partida);
    const slots = this.maxSlots();
    return `Partida ${partida}: cada oferta elige nivel al azar con estas gamas — 1–3: 60%·30%·10% (niveles 1–3); 4–6: 30%·40%·20%·10% (niveles 1–4); 7–9: 5%·10%·25%·40%·20%; desde la 10: 20%·30%·50% solo en niveles 3–5. En esta fase pueden salir niveles ${r.min}–${r.max}. Mazo: hasta ${slots} hueco(s) (3 al inicio; +1 cada 2 partidas; máx. 6). ${SHOP_OFFER_COUNT} casillas; la misma carta hasta ${SHOP_MAX_SAME_CARD} veces. Al elegir, el hueco queda vacío hasta refrescar.`;
  });

  readonly shopCoinsLeft = computed(() => this.gs.selectShopCoinsLeft());

  /** Coste fijo de refrescar la tienda (no depende del round). */
  readonly shopRefreshCost = computed(() => SHOP_REFRESH_COST);

  readonly canStart = computed(() => this.gs.canStartBattle());

  readonly isEmptyDeckSlot = isEmptyDeckSlot;
  readonly isFilledDeckSlot = isFilledDeckSlot;

  /** Número de partida de la serie según el que se filtra la tienda (coincide con el hint). */
  readonly shopAsaltoRef = computed(() => this.game().shopAsaltoForNextSelect);

  slotViewCard(slot: FilledDeckSlot): Card {
    const raw = this.catalog.findById(slot.id)!;
    const st = stackStatsFromCopies(slot.copies, raw.hp, raw.atk);
    return { ...raw, hp: st.hp, atk: st.atk };
  }

  slotStatBase(slot: FilledDeckSlot): { hp: number; atk: number } {
    const raw = this.catalog.findById(slot.id)!;
    return { hp: raw.hp, atk: raw.atk };
  }

  slotStars(slot: FilledDeckSlot): 0 | 1 | 2 | 3 {
    const raw = this.catalog.findById(slot.id)!;
    return stackStatsFromCopies(slot.copies, raw.hp, raw.atk).stars;
  }

  /** Oferta de tienda apilable sobre un hueco del mazo (misma carta y aún se puede añadir). */
  shopOfferIsDeckUpgrade(card: Card): boolean {
    const g = this.game();
    if (!g.deckSlots.some((s) => isFilledDeckSlot(s) && s.id === card.id)) return false;
    return this.gs.canAddCard(card);
  }

  shopOfferExtraClass(card: Card): string {
    return this.shopOfferIsDeckUpgrade(card) ? 'card--shop-deck-upgrade' : '';
  }

  onPoolSlotClick(slot: ShopOfferSlot): void {
    const card = slot.card;
    if (!card) return;
    if (!this.gs.canAddCard(card)) {
      this.sound.play(SoundCue.Denial);
      return;
    }
    this.gs.addCardFromShopSlot(slot.slotUid);
    this.sound.play(SoundCue.ShopPick);
  }

  onDeckSlotClick(slot: FilledDeckSlot): void {
    this.gs.removeDeckSlot(slot.uid);
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

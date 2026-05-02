import { Injectable, inject, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import type { BattleCard } from '../models/battle-card.model';
import type { Card } from '../models/card.model';
import type {
  BattleResultSnapshot,
  BattleWinner,
  CombatLogEntry,
  CombatLogViewMode,
  GameState,
} from '../models/game-state.model';
import type { DeckSlot } from '../models/deck-slot.model';
import { newDeckSlotUid, persistedSlotsToDeckSlots } from '../models/deck-slot.model';
import { CardsCatalogService } from './cards-catalog.service';
import { I18nService } from './i18n.service';
import { SoundCue, SoundService } from './sound.service';
import type { StrikeParticipant } from '../engine/combat.engine';
import { applySimultaneousExchange, sumAttackerHealFromStrikeDetail } from '../engine/combat.engine';
import {
  applyCoinsAfterGame,
  awardGloryAfterPartida,
  coinsRefundWhenRemovingDeckSlot,
  DEFAULT_COMBAT_ZOOM,
  ensureMinCoins,
  fillShopOffers,
  MAX_COPIES_PER_DECK_SLOT_STACK,
  MAX_DUEL_ASALTOS,
  INITIAL_PLAYER_COINS,
  MIN_BASE_COINS_PER_PARTIDA,
  MIN_DECK,
  maxSelectableSlotsForPartida,
  rivalShopBudgetForPartida,
  SHOP_REFRESH_COST,
  stackStatsFromCopies,
  WINS_TO_WIN_SERIES,
} from '../engine/game-rules';
import { simulateRivalDeckSelection } from '../engine/rival-deck-selection';
import { nowMs } from '../engine/game-utils';
import { combatLogEntriesToHtml, formatCombatFaintLine } from '../engine/combat-log.format';

function createBattleUi(): GameState['battleUi'] {
  return {
    playerAttacking: false,
    rivalAttacking: false,
    playerTakingHit: false,
    rivalTakingHit: false,
    playerDamagePopup: null,
    rivalDamagePopup: null,
    playerHealPopup: null,
    rivalHealPopup: null,
    fainting: [],
    removedFromArenaUids: [],
  };
}

function createInitialState(): GameState {
  return {
    deckSlots: [],
    playerDeck: [],
    rivalDeck: [],
    battleIdx: { p: 0, r: 0 },
    round: 1,
    speed: 1,
    auto: false,
    paused: false,
    running: false,
    endedReason: null,
    log: [],
    seriesWinsP: 0,
    seriesWinsR: 0,
    gamesInSeries: 0,
    coinsForPlayer: INITIAL_PLAYER_COINS,
    coinsForRival: INITIAL_PLAYER_COINS,
    playerCoinsStart: INITIAL_PLAYER_COINS,
    rivalCoinsStart: INITIAL_PLAYER_COINS,
    rivalDifficultyThisPartida: null,
    spentP: 0,
    spentR: 0,
    playerTrophy: 0,
    rivalTrophy: 0,
    lastPartidaDeckSlots: [],
    seriesPartidaOutcomes: [],
    combatCardZoom: DEFAULT_COMBAT_ZOOM,
    combatLogView: 'min',
    combatLogEntries: [],
    lastCombatEventLogSnapshot: '',
    shopOfferSlots: [],
    shopRefreshCoinsSpent: 0,
    shopAsaltoForNextSelect: 1,
    battleUi: createBattleUi(),
  };
}

@Injectable({ providedIn: 'root' })
export class GameStateService {
  private readonly router = inject(Router);
  private readonly catalog = inject(CardsCatalogService);
  private readonly i18n = inject(I18nService);
  private readonly sound = inject(SoundService);

  /** Estado único del juego (signal + observable equivalente a BehaviorSubject). */
  private readonly _game = signal<GameState>(createInitialState());
  readonly game = this._game.asReadonly();
  /** @deprecated Preferir `game()`; se expone para integraciones RxJS. */
  readonly state$ = toObservable(this._game);

  readonly lastResult = signal<BattleResultSnapshot | null>(null);

  private myCardsDeckDndT = 0;

  private setGame(updater: (g: GameState) => void): void {
    const g = structuredClone(this._game()) as GameState;
    updater(g);
    this._game.set(g);
  }

  initSeries(): void {
    this._game.set(createInitialState());
    this.lastResult.set(null);
  }

  /** Entrar a selección desde menú: reinicia serie y abre pool. */
  playFromMenu(): void {
    this.initSeries();
    this.prepareSelectPool();
    void this.router.navigate(['/select']);
  }

  prepareSelectPool(): void {
    this.setGame((g) => {
      g.playerCoinsStart = g.coinsForPlayer;
      const rb = rivalShopBudgetForPartida(g.playerCoinsStart, Math.random);
      g.rivalCoinsStart = rb.budget;
      g.rivalDifficultyThisPartida = rb.tier;
      g.shopRefreshCoinsSpent = 0;
      if (g.lastPartidaDeckSlots.length) {
        g.deckSlots = persistedSlotsToDeckSlots(g.lastPartidaDeckSlots);
      } else {
        g.deckSlots = [];
      }
      const partidaRef = Math.max(1, g.gamesInSeries + 1);
      g.shopAsaltoForNextSelect = partidaRef;
      g.shopOfferSlots = fillShopOffers(this.catalog.cards, partidaRef);
    });
  }

  isCardInCurrentShop(card: Card): boolean {
    return this._game().shopOfferSlots.some((s) => s.card?.id === card.id);
  }

  maxSlotsForCurrentSelect(): number {
    const g = this._game();
    return maxSelectableSlotsForPartida(g.gamesInSeries + 1);
  }

  canAddCard(card: Card): boolean {
    const g = this._game();
    if (!this.isCardInCurrentShop(card)) return false;
    const maxSlots = maxSelectableSlotsForPartida(g.gamesInSeries + 1);
    const canStackOnSlot = g.deckSlots.some(
      (s) => s.id === card.id && s.copies < MAX_COPIES_PER_DECK_SLOT_STACK,
    );
    if (canStackOnSlot) return true;
    return g.deckSlots.length < maxSlots;
  }

  /** Añade la carta de una casilla concreta de la tienda y deja esa casilla vacía (hueco reservado). */
  addCardFromShopSlot(slotUid: string): void {
    const g0 = this._game();
    const slot0 = g0.shopOfferSlots.find((s) => s.slotUid === slotUid);
    const card = slot0?.card;
    if (!card || !this.canAddCard(card)) return;
    this.setGame((g) => {
      const sl = g.shopOfferSlots.find((s) => s.slotUid === slotUid);
      if (!sl?.card) return;
      const c = sl.card;
      const maxSlots = maxSelectableSlotsForPartida(g.gamesInSeries + 1);
      const mergeIdx = g.deckSlots.findIndex(
        (s) => s.id === c.id && s.copies < MAX_COPIES_PER_DECK_SLOT_STACK,
      );
      if (mergeIdx >= 0) {
        sl.card = null;
        g.deckSlots = g.deckSlots.map((s, i) =>
          i === mergeIdx ? { ...s, copies: s.copies + 1 } : s,
        );
      } else if (g.deckSlots.length < maxSlots) {
        sl.card = null;
        g.deckSlots = [...g.deckSlots, { uid: newDeckSlotUid(), id: c.id, copies: 1 }];
      }
    });
  }

  /** Quita el hueco completo (todas las copias apiladas) y devuelve monedas según estrellas del apilado. */
  removeDeckSlot(slotUid: string): void {
    this.setGame((g) => {
      const idx = g.deckSlots.findIndex((s) => s.uid === slotUid);
      if (idx < 0) return;
      const s = g.deckSlots[idx];
      const refund = coinsRefundWhenRemovingDeckSlot(s.copies);
      g.playerCoinsStart += refund;
      g.deckSlots = g.deckSlots.filter((x) => x.uid !== slotUid);
    });
  }

  reorderDeck(previousIndex: number, currentIndex: number): void {
    this.setGame((g) => {
      const arr = [...g.deckSlots];
      const [moved] = arr.splice(previousIndex, 1);
      arr.splice(currentIndex, 0, moved);
      g.deckSlots = arr;
    });
  }

  refreshShop(): void {
    const g = this._game();
    const left = g.playerCoinsStart - g.shopRefreshCoinsSpent;
    if (left < SHOP_REFRESH_COST) return;
    this.setGame((s) => {
      s.shopRefreshCoinsSpent += SHOP_REFRESH_COST;
      const p = Math.max(1, s.gamesInSeries + 1);
      s.shopAsaltoForNextSelect = p;
      s.shopOfferSlots = fillShopOffers(this.catalog.cards, p);
    });
  }

  selectShopCoinsLeft(): number {
    const g = this._game();
    return Math.max(0, g.playerCoinsStart - g.shopRefreshCoinsSpent);
  }

  canStartBattle(): boolean {
    const g = this._game();
    const n = g.deckSlots.length;
    const maxSlots = maxSelectableSlotsForPartida(g.gamesInSeries + 1);
    return (
      n >= MIN_DECK &&
      n <= maxSlots &&
      g.shopRefreshCoinsSpent <= g.playerCoinsStart &&
      g.deckSlots.every((s) => s.copies >= 1)
    );
  }

  private instantiate(card: Card): BattleCard {
    return {
      ...card,
      currentHp: card.hp,
      alive: true,
      uid: `${card.id}-${Math.random().toString(36).slice(2, 7)}`,
      catalogHp: card.hp,
      catalogAtk: card.atk,
    };
  }

  private instantiateFromSlot(slot: DeckSlot): BattleCard {
    const base = this.catalog.findById(slot.id)!;
    const st = stackStatsFromCopies(slot.copies, base.hp, base.atk);
    return {
      ...base,
      hp: st.hp,
      atk: st.atk,
      currentHp: st.hp,
      alive: true,
      uid: `${base.id}-${Math.random().toString(36).slice(2, 7)}`,
      stackCopies: slot.copies,
      stackStars: st.stars,
      catalogHp: base.hp,
      catalogAtk: base.atk,
    };
  }

  startBattle(): void {
    if (!this.canStartBattle()) return;
    this.setGame((g) => {
      g.playerCoinsStart = Math.max(0, g.playerCoinsStart - g.shopRefreshCoinsSpent);
      g.shopRefreshCoinsSpent = 0;
      g.spentP = 0;
      g.lastPartidaDeckSlots = g.deckSlots.map(({ id, copies }) => ({ id, copies }));
      g.playerDeck = g.deckSlots.map((slot) => this.instantiateFromSlot(slot));
      const partidaN = Math.max(1, g.gamesInSeries + 1);
      const rivalSel = simulateRivalDeckSelection({
        rivalCoinBudget: g.rivalCoinsStart,
        partidaNumber: partidaN,
        catalog: this.catalog.cards,
        rng: Math.random,
      });
      g.rivalDeck = rivalSel.deckSlots.map((slot) => this.instantiateFromSlot(slot));
      g.spentR = g.rivalDeck.reduce((s, c) => s + (Number(c.level) || 0), 0);
      g.battleIdx = { p: 0, r: 0 };
      g.round = 1;
      g.endedReason = null;
      g.log = [];
      g.paused = false;
      g.speed = 1;
      g.auto = false;
      g.running = true;
      g.combatLogEntries = [];
      g.battleUi = createBattleUi();
      g.combatLogView = 'min';
      const isEn = this.i18n.isEn();
      g.combatLogEntries.push({
        kind: 'html',
        html: `<p class="ce-note">${isEn ? '— Match start. Simultaneous rounds. —' : '— Inicio. Asaltos simultáneos. —'}</p>`,
      });
      g.log.push(
        'La partida comienza. <strong>Asaltos simultáneos</strong> — ambas cartas atacan a la vez; puede haber doble K.O.',
      );
    });
    void this.router.navigate(['/battle']);
    setTimeout(() => void this.runTurnLoop(), 900);
  }

  /** x1 / x2 / x3: desactiva AUTO (comportamiento vanilla). */
  setSpeed(s: number): void {
    this.setGame((g) => {
      if (s !== 0) g.auto = false;
      g.speed = s;
      g.paused = s === 0;
    });
  }

  togglePause(): void {
    if (this._game().paused) {
      const wasAuto = this._game().auto;
      this.setGame((s) => {
        s.paused = false;
        s.speed = wasAuto ? 3 : 1;
      });
    } else {
      this.setGame((s) => {
        s.paused = true;
        s.speed = 0;
      });
    }
  }

  toggleAuto(): void {
    this.setGame((g) => {
      g.auto = !g.auto;
      if (g.auto) {
        g.speed = 3;
        g.paused = false;
      } else {
        g.speed = 1;
      }
    });
  }

  setCombatZoom(level: 1 | 2 | 3): void {
    this.setGame((g) => {
      g.combatCardZoom = level;
    });
  }

  setCombatLogView(mode: CombatLogViewMode): void {
    this.setGame((g) => {
      g.combatLogView = mode;
    });
  }

  endBattleQuick(): void {
    this.setGame((g) => {
      g.auto = true;
      g.paused = false;
      g.speed = 3;
    });
  }

  private speedToMs(base: number): number {
    const g = this._game();
    if (g.speed === 0) return Infinity;
    return Math.round(base / g.speed);
  }

  private wait(ms: number): Promise<void> {
    return new Promise((res) => setTimeout(res, ms));
  }

  private async pace(baseMs: number): Promise<void> {
    while (this._game().paused && this._game().running) {
      await this.wait(80);
    }
    if (!this._game().running) return;
    await this.wait(this.speedToMs(baseMs));
  }

  private activeCard(side: 'player' | 'rival'): BattleCard | null {
    const g = this._game();
    if (side === 'player') return g.playerDeck[g.battleIdx.p] ?? null;
    return g.rivalDeck[g.battleIdx.r] ?? null;
  }

  private async runTurnLoop(): Promise<void> {
    while (this._game().running) {
      const p = this.activeCard('player');
      const r = this.activeCard('rival');
      if (!p && !r) {
        this.finishBattle('draw');
        return;
      }
      if (!p) {
        this.finishBattle('rival');
        return;
      }
      if (!r) {
        this.finishBattle('player');
        return;
      }

      let g = this._game();
      if (g.round > MAX_DUEL_ASALTOS) {
        const isEn = this.i18n.isEn();
        this.setGame((s) => {
          s.log.push(
            isEn
              ? `<em>Round limit reached (${MAX_DUEL_ASALTOS}) — match is a draw.</em>`
              : `<em>Se alcanzó el límite de asaltos (${MAX_DUEL_ASALTOS}) — partida en empate.</em>`,
          );
        });
        this.finishBattle('draw');
        return;
      }

      await this.pace(600);
      if (!this._game().running) return;

      await this.performSimultaneousExchangeRound();

      if (!this._game().running) return;

      const p2 = this.activeCard('player');
      const r2 = this.activeCard('rival');
      if (!p2 && !r2) {
        this.finishBattle('draw');
        return;
      }
      if (!p2) {
        this.finishBattle('rival');
        return;
      }
      if (!r2) {
        this.finishBattle('player');
        return;
      }

      this.setGame((s) => {
        s.round += 1;
      });
      await this.pace(350);
    }
  }

  private async performSimultaneousExchangeRound(): Promise<void> {
    const p = this.activeCard('player');
    const r = this.activeCard('rival');
    if (!p || !r) return;

    const ex = applySimultaneousExchange(p as StrikeParticipant, r as StrikeParticipant, {
      rng: Math.random,
    });
    const healP = sumAttackerHealFromStrikeDetail(ex.detailPtoR);
    const healR = sumAttackerHealFromStrikeDetail(ex.detailRtoP);

    const round = this._game().round;
    const effTag = (eff: { label: string }) => {
      if (!eff?.label) return '';
      if (eff.label === 'super') return ' <span class="super">¡Ef.!</span>';
      if (eff.label === 'weak') return ' <span class="weak">Déb.</span>';
      return '';
    };

    this.setGame((g) => {
      g.log.push(
        `¡Choque! <span class="player-name">${p.name}</span> inflige <strong>${ex.damageToRival}</strong>${effTag(ex.effPlayerAttack)} · ` +
          `<span class="rival-name">${r.name}</span> inflige <strong>${ex.damageToPlayer}</strong>${effTag(ex.effRivalAttack)} — <em>simultáneo</em>`,
      );
      g.combatLogEntries.push({ kind: 'round', round, exchange: ex });
      g.battleUi = {
        ...g.battleUi,
        playerAttacking: true,
        rivalAttacking: true,
      };
    });

    await this.pace(280);
    if (ex.damageToRival > 0) this.sound.play(SoundCue.BattleHitEnemy);
    if (ex.damageToPlayer > 0) this.sound.play(SoundCue.BattleHitPlayer);
    if (healP > 0 || healR > 0) this.sound.play(SoundCue.BattleHeal);
    this.setGame((g) => {
      g.battleUi = {
        ...g.battleUi,
        playerAttacking: false,
        rivalAttacking: false,
        playerTakingHit: true,
        rivalTakingHit: true,
        playerDamagePopup: { dmg: ex.damageToPlayer, label: ex.effRivalAttack.label },
        rivalDamagePopup: { dmg: ex.damageToRival, label: ex.effPlayerAttack.label },
        playerHealPopup: healP > 0 ? healP : null,
        rivalHealPopup: healR > 0 ? healR : null,
      };
    });

    await this.pace(420);
    this.setGame((g) => {
      g.battleUi = {
        ...g.battleUi,
        playerTakingHit: false,
        rivalTakingHit: false,
        playerDamagePopup: null,
        rivalDamagePopup: null,
        playerHealPopup: null,
        rivalHealPopup: null,
      };
    });

    if (p.currentHp <= 0) p.alive = false;
    if (r.currentHp <= 0) r.alive = false;

    this.setGame((g) => {
      g.playerDeck = g.playerDeck.map((c) =>
        c.uid === p.uid ? { ...c, currentHp: p.currentHp, alive: p.alive } : c,
      );
      g.rivalDeck = g.rivalDeck.map((c) =>
        c.uid === r.uid ? { ...c, currentHp: r.currentHp, alive: r.alive } : c,
      );
    });

    const playerDead = p.currentHp <= 0;
    const rivalDead = r.currentHp <= 0;
    if (playerDead && rivalDead) await this.animateDoubleFaint(p, r);
    else if (playerDead) await this.animateFaint('player', p);
    else if (rivalDead) await this.animateFaint('rival', r);
  }

  /** Doble K.O.: mismas fases de tiempo que una sola muerte, ambas cartas a la vez. */
  private async animateDoubleFaint(pCard: BattleCard, rCard: BattleCard): Promise<void> {
    this.sound.play(SoundCue.BattleDeathDouble);
    const isEn = this.i18n.isEn();
    this.setGame((g) => {
      g.combatLogEntries.push(
        { kind: 'html', html: formatCombatFaintLine(pCard, 'player', isEn) },
        { kind: 'html', html: formatCombatFaintLine(rCard, 'rival', isEn) },
      );
      const pushDown = (name: string, nClass: string) =>
        g.log.push(
          isEn
            ? `<span class="${nClass}">${name}</span> is down.`
            : `<span class="${nClass}">${name}</span> ha caído.`,
        );
      pushDown(pCard.name, 'player-name');
      pushDown(rCard.name, 'rival-name');
    });
    await this.pace(480);

    this.setGame((g) => {
      g.battleUi = {
        ...g.battleUi,
        fainting: [
          { side: 'player', uid: pCard.uid },
          { side: 'rival', uid: rCard.uid },
        ],
      };
      g.battleIdx = { p: g.battleIdx.p + 1, r: g.battleIdx.r + 1 };
    });
    await this.pace(620);
    this.setGame((g) => {
      const uids = [...new Set([...g.battleUi.removedFromArenaUids, pCard.uid, rCard.uid])];
      g.battleUi = { ...g.battleUi, fainting: [], removedFromArenaUids: uids };
    });
  }

  private async animateFaint(side: 'player' | 'rival', card: BattleCard): Promise<void> {
    this.sound.play(SoundCue.BattleDeathSingle);
    if (side === 'rival') this.sound.play(SoundCue.BattleRoundWin);
    else this.sound.play(SoundCue.BattleRoundLose);
    const isEn = this.i18n.isEn();
    this.setGame((g) => {
      g.combatLogEntries.push({
        kind: 'html',
        html: formatCombatFaintLine(card, side, isEn),
      });
      const nClass = side === 'player' ? 'player-name' : 'rival-name';
      g.log.push(
        isEn
          ? `<span class="${nClass}">${card.name}</span> is down.`
          : `<span class="${nClass}">${card.name}</span> ha caído.`,
      );
    });
    await this.pace(480);

    this.setGame((g) => {
      g.battleUi = { ...g.battleUi, fainting: [{ side, uid: card.uid }] };
      if (side === 'player') g.battleIdx = { ...g.battleIdx, p: g.battleIdx.p + 1 };
      else g.battleIdx = { ...g.battleIdx, r: g.battleIdx.r + 1 };
    });
    await this.pace(620);
    this.setGame((g) => {
      const uids = g.battleUi.removedFromArenaUids.includes(card.uid)
        ? g.battleUi.removedFromArenaUids
        : [...g.battleUi.removedFromArenaUids, card.uid];
      g.battleUi = { ...g.battleUi, fainting: [], removedFromArenaUids: uids };
    });
  }

  private finishBattle(winner: BattleWinner): void {
    if (winner === 'player') this.sound.play(SoundCue.BattleMatchWin);
    else if (winner === 'rival') this.sound.play(SoundCue.BattleMatchLose);
    this.setGame((g) => {
      g.running = false;
      g.endedReason = winner;
      g.combatLogView = 'min';
    });
    setTimeout(() => this.showResult(winner), 600);
  }

  private showResult(winner: BattleWinner): void {
    const snap = structuredClone(this._game()) as GameState;
    let gamesInSeries = snap.gamesInSeries + 1;
    let seriesWinsP = snap.seriesWinsP;
    let seriesWinsR = snap.seriesWinsR;
    if (winner === 'player') seriesWinsP += 1;
    else if (winner === 'rival') seriesWinsR += 1;

    const coins = applyCoinsAfterGame({
      playerCoinsStart: snap.playerCoinsStart,
      rivalCoinsStart: snap.rivalCoinsStart,
      winner,
    });
    const ensured = ensureMinCoins(coins.coinsForPlayer, coins.coinsForRival);

    const glory = awardGloryAfterPartida({
      winner,
      seriesWinsP,
      seriesWinsR,
    });

    const seriesOver = seriesWinsP >= WINS_TO_WIN_SERIES || seriesWinsR >= WINS_TO_WIN_SERIES;
    const isDraw = winner === 'draw';
    const isWin = winner === 'player';

    const formatTrophy = (n: number) => Math.max(0, Math.floor(n)).toLocaleString('es-ES');
    const newPlayerTrophy = snap.playerTrophy + glory.gainedP;
    const newRivalTrophy = snap.rivalTrophy + glory.gainedR;

    let emoji = '🏆';
    let title = '';
    let subtitle = '';
    if (isDraw) {
      emoji = '🤝';
      title = 'Empate en la partida';
      subtitle = `Ninguno suma victoria en la serie. Monedas: arrastre + ${3 * SHOP_REFRESH_COST} 💰 (3× refresco fijo ${SHOP_REFRESH_COST}), sin extra por empate. Total tú: ${ensured.coinsForPlayer}. Gloria +${glory.gainedP}.`;
    } else if (isWin) {
      emoji = '🏆';
      title = '¡Ganaste la partida!';
      subtitle = `Tus cartas dominaron la ronda. +${glory.gainedP} gloria (acum. ${formatTrophy(newPlayerTrophy)}).`;
    } else {
      emoji = '💀';
      title = 'Perdiste la partida';
      subtitle = `El rival se llevó la ronda. +${glory.gainedP} gloria (acum. ${formatTrophy(newPlayerTrophy)}).`;
    }

    let seriesNote = '';
    if (seriesOver) {
      if (seriesWinsP >= WINS_TO_WIN_SERIES) {
        seriesNote = `Serie final: ${seriesWinsP} - ${seriesWinsR}. ¡Ganaste la serie al mejor de 9 (extensible)!`;
      } else {
        seriesNote = `Serie final: ${seriesWinsP} - ${seriesWinsR}. El rival gana la serie.`;
      }
    } else {
      seriesNote = `Serie: ${seriesWinsP} - ${seriesWinsR} (primeros a ${WINS_TO_WIN_SERIES} victorias; partida ${gamesInSeries} · BO9+). Próx. 💰 tú: ${ensured.coinsForPlayer} · rival: ${ensured.coinsForRival}`;
    }

    const survivorsP = snap.playerDeck.filter((c) => c.alive).length;
    const totalDmgDealt = snap.rivalDeck.reduce((s, c) => s + (c.hp - c.currentHp), 0);
    const totalDmgTaken = snap.playerDeck.reduce((s, c) => s + (c.hp - c.currentHp), 0);

    const result: BattleResultSnapshot = {
      winner,
      gloryGainedP: glory.gainedP,
      gloryGainedR: glory.gainedR,
      seriesOver,
      economyRefreshCostRef: SHOP_REFRESH_COST,
      survivorsP,
      deckLenP: snap.playerDeck.length,
      totalDmgDealt,
      totalDmgTaken,
      emoji,
      title,
      subtitle,
      seriesNote,
      statsRows: [
        { label: 'Partida (esta)', value: isDraw ? 'Empate' : isWin ? 'Ganada' : 'Perdida' },
        { label: 'Gloria + (tú)', value: `+${glory.gainedP}` },
        { label: 'Gloria total', value: formatTrophy(newPlayerTrophy) },
        { label: 'Cartas vivas', value: `${survivorsP} / ${snap.playerDeck.length}` },
        { label: 'Daño hecho', value: String(totalDmgDealt) },
        { label: 'Daño recibido', value: String(totalDmgTaken) },
      ],
    };

    const logHtml = combatLogEntriesToHtml(snap.combatLogEntries, this.i18n.isEn());

    this.setGame((g) => {
      g.gamesInSeries = gamesInSeries;
      g.seriesWinsP = seriesWinsP;
      g.seriesWinsR = seriesWinsR;
      g.seriesPartidaOutcomes = [...g.seriesPartidaOutcomes, winner];
      g.coinsForPlayer = ensured.coinsForPlayer;
      g.coinsForRival = ensured.coinsForRival;
      g.playerTrophy = newPlayerTrophy;
      g.rivalTrophy = newRivalTrophy;
      g.lastCombatEventLogSnapshot = logHtml;
    });

    this.lastResult.set(result);
    void this.router.navigate(['/result']);
  }

  goToNextMatch(): void {
    this.lastResult.set(null);
    this.prepareSelectPool();
    void this.router.navigate(['/select']);
  }

  newSeriesFromResult(): void {
    this.initSeries();
    this.prepareSelectPool();
    void this.router.navigate(['/select']);
  }

  backToMenuFromResult(): void {
    this.initSeries();
    void this.router.navigate(['/menu']);
  }

  backToMenuFromSelect(): void {
    this.initSeries();
    void this.router.navigate(['/menu']);
  }

  registerDeckDndTime(): void {
    this.myCardsDeckDndT = nowMs();
  }

  shouldIgnoreDeckClickAfterDnd(): boolean {
    return nowMs() - this.myCardsDeckDndT < 220;
  }
}

import { Injectable, signal } from '@angular/core';

const STORAGE_KEY = 'lucasCardsSoundEnabled';

/** Generado con `scripts/generate_denial_wav.py` → `public/sounds/shopping/denial.wav`. */
export const SOUND_DENIAL_URL = '/sounds/shopping/denial.wav';

/** Generado con `scripts/generate_shop_pick_wav.py` → `public/sounds/shopping/shop-pick.wav`. */
export const SOUND_SHOP_PICK_URL = '/sounds/shopping/shop-pick.wav';

const SOUND_BATTLE = {
  hitEnemy: '/sounds/battle/hit-enemy.wav',
  hitPlayer: '/sounds/battle/hit-player.wav',
  heal: '/sounds/battle/heal.wav',
  deathSingle: '/sounds/battle/death-single.wav',
  deathDouble: '/sounds/battle/death-double.wav',
  roundWin: '/sounds/battle/round-win.wav',
  roundLose: '/sounds/battle/round-lose.wav',
  matchWin: '/sounds/battle/match-win.wav',
  matchLose: '/sounds/battle/match-lose.wav',
} as const;

/** Cues de audio del juego; añade claves y manejadores en `SoundService.play`. */
export const SoundCue = {
  /** Intento inválido (p. ej. no se puede añadir carta desde la tienda). */
  Denial: 'denial',
  /** Carta añadida al mazo desde la tienda. */
  ShopPick: 'shopPick',
  BattleHitEnemy: 'battleHitEnemy',
  BattleHitPlayer: 'battleHitPlayer',
  BattleHeal: 'battleHeal',
  BattleDeathSingle: 'battleDeathSingle',
  BattleDeathDouble: 'battleDeathDouble',
  BattleRoundWin: 'battleRoundWin',
  BattleRoundLose: 'battleRoundLose',
  BattleMatchWin: 'battleMatchWin',
  BattleMatchLose: 'battleMatchLose',
} as const;

export type SoundCue = (typeof SoundCue)[keyof typeof SoundCue];

/**
 * Sistema central de sonido: archivos en `public/sounds/` y respaldo por síntesis Web Audio.
 */
@Injectable({ providedIn: 'root' })
export class SoundService {
  private audioContext: AudioContext | null = null;

  /** Si es false, `play` no reproduce nada. */
  readonly enabled = signal(this.readStoredEnabled());

  setEnabled(on: boolean): void {
    try {
      localStorage.setItem(STORAGE_KEY, on ? '1' : '0');
    } catch {
      /* ignore */
    }
    this.enabled.set(on);
  }

  play(cue: SoundCue): void {
    if (!this.enabled()) return;
    switch (cue) {
      case SoundCue.Denial:
        void this.playDenial();
        break;
      case SoundCue.ShopPick:
        void this.playShopPick();
        break;
      case SoundCue.BattleHitEnemy:
        this.playUrl(SOUND_BATTLE.hitEnemy, 0.62);
        break;
      case SoundCue.BattleHitPlayer:
        this.playUrl(SOUND_BATTLE.hitPlayer, 0.62);
        break;
      case SoundCue.BattleHeal:
        this.playUrl(SOUND_BATTLE.heal, 0.55);
        break;
      case SoundCue.BattleDeathSingle:
        this.playUrl(SOUND_BATTLE.deathSingle, 0.65);
        break;
      case SoundCue.BattleDeathDouble:
        this.playUrl(SOUND_BATTLE.deathDouble, 0.65);
        break;
      case SoundCue.BattleRoundWin:
        this.playUrl(SOUND_BATTLE.roundWin, 0.58);
        break;
      case SoundCue.BattleRoundLose:
        this.playUrl(SOUND_BATTLE.roundLose, 0.58);
        break;
      case SoundCue.BattleMatchWin:
        this.playUrl(SOUND_BATTLE.matchWin, 0.62);
        break;
      case SoundCue.BattleMatchLose:
        this.playUrl(SOUND_BATTLE.matchLose, 0.62);
        break;
      default:
        break;
    }
  }

  /**
   * Reproduce un archivo servido desde `public/` (p. ej. `sounds/foo.mp3` → `/sounds/foo.mp3`).
   */
  playUrl(url: string, volume = 0.7): void {
    if (!this.enabled()) return;
    const audio = new Audio(url);
    audio.volume = Math.max(0, Math.min(1, volume));
    void audio.play().catch(() => {
      /* autoplay bloqueado o recurso ausente */
    });
  }

  private readStoredEnabled(): boolean {
    try {
      const s = localStorage.getItem(STORAGE_KEY);
      if (s === '0') return false;
      if (s === '1') return true;
    } catch {
      /* ignore */
    }
    return true;
  }

  private getContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new AudioContext();
    }
    return this.audioContext;
  }

  private async resumeIfNeeded(ctx: AudioContext): Promise<void> {
    if (ctx.state === 'suspended') {
      await ctx.resume().catch(() => undefined);
    }
  }

  private async playDenial(): Promise<void> {
    const audio = new Audio(SOUND_DENIAL_URL);
    audio.volume = 0.42;
    try {
      await audio.play();
    } catch {
      await this.playDenialSynthetic();
    }
  }

  private async playShopPick(): Promise<void> {
    const audio = new Audio(SOUND_SHOP_PICK_URL);
    audio.volume = 0.38;
    try {
      await audio.play();
    } catch {
      await this.playShopPickSynthetic();
    }
  }

  /** Respaldo si el WAV no carga o el navegador bloquea `HTMLAudioElement.play`. */
  private async playDenialSynthetic(): Promise<void> {
    const ctx = this.getContext();
    await this.resumeIfNeeded(ctx);
    const t0 = ctx.currentTime;
    const dur = 0.14;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(300, t0);
    osc.frequency.exponentialRampToValueAtTime(120, t0 + dur);

    const peak = 0.07;
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(peak, t0 + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur + 0.02);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.03);
  }

  /** Dos tonos ascendentes (aprox. C5 → E5), similar al WAV generado. */
  private async playShopPickSynthetic(): Promise<void> {
    const ctx = this.getContext();
    await this.resumeIfNeeded(ctx);
    const playTone = (start: number, freq: number, len: number, peak: number): void => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(peak, start + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + len);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + len + 0.01);
    };
    const t0 = ctx.currentTime;
    playTone(t0, 523, 0.055, 0.08);
    playTone(t0 + 0.062, 659, 0.095, 0.075);
  }
}

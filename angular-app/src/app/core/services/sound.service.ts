import { Injectable, signal } from '@angular/core';
import { preferMp3Assets, setPreferMp3Assets, soundAssetUrl } from './sound-assets.config';

const STORAGE_KEY = 'lucasCardsSoundEnabled';

/** Por defecto MP3 (`sound-assets.config`); `setPreferMp3Assets(false)` fuerza WAV. */
export { preferMp3Assets, setPreferMp3Assets };

/** Cues de audio del juego; buffers precargados tras unlock. */
export const SoundCue = {
  Denial: 'denial',
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

/** Rutas bajo `public/sounds/` sin extensión (ver `soundAssetUrl`). */
const CUE_PATHS: Record<SoundCue, string> = {
  [SoundCue.Denial]: 'shopping/denial',
  [SoundCue.ShopPick]: 'shopping/shop-pick',
  [SoundCue.BattleHitEnemy]: 'battle/hit-enemy',
  [SoundCue.BattleHitPlayer]: 'battle/hit-player',
  [SoundCue.BattleHeal]: 'battle/heal',
  [SoundCue.BattleDeathSingle]: 'battle/death-single',
  [SoundCue.BattleDeathDouble]: 'battle/death-double',
  [SoundCue.BattleRoundWin]: 'battle/round-win',
  [SoundCue.BattleRoundLose]: 'battle/round-lose',
  [SoundCue.BattleMatchWin]: 'battle/match-win',
  [SoundCue.BattleMatchLose]: 'battle/match-lose',
};

const CUE_VOLUME: Record<SoundCue, number> = {
  [SoundCue.Denial]: 0.42,
  [SoundCue.ShopPick]: 0.38,
  [SoundCue.BattleHitEnemy]: 0.62,
  [SoundCue.BattleHitPlayer]: 0.62,
  [SoundCue.BattleHeal]: 0.55,
  [SoundCue.BattleDeathSingle]: 0.65,
  [SoundCue.BattleDeathDouble]: 0.65,
  [SoundCue.BattleRoundWin]: 0.58,
  [SoundCue.BattleRoundLose]: 0.58,
  [SoundCue.BattleMatchWin]: 0.62,
  [SoundCue.BattleMatchLose]: 0.62,
};

/** URLs actuales según `preferMp3Assets` (evaluar tras posible `setPreferMp3Assets`). */
export function soundCueDenialUrl(): string {
  return soundAssetUrl('shopping/denial');
}
export function soundCueShopPickUrl(): string {
  return soundAssetUrl('shopping/shop-pick');
}

/** @deprecated Usar `soundCueDenialUrl()` si cambias MP3 en runtime. */
export const SOUND_DENIAL_URL = soundAssetUrl('shopping/denial');
/** @deprecated Usar `soundCueShopPickUrl()`. */
export const SOUND_SHOP_PICK_URL = soundAssetUrl('shopping/shop-pick');

/**
 * Audio por Web Audio API: unlock en primer gesto, caché de `AudioBuffer`, fallback HTMLAudioElement.
 * Por defecto MP3 en `sound-assets.config`; fallback HTMLAudio si decode falla.
 */
@Injectable({ providedIn: 'root' })
export class SoundService {
  private audioContext: AudioContext | null = null;
  private readonly bufferCache = new Map<string, AudioBuffer>();
  private readonly bufferLoads = new Map<string, Promise<AudioBuffer | null>>();
  private unlockSetup = false;
  private unlockRunning = false;

  /** Desbloqueado tras primer pointer/touch/click (AudioContext running). */
  readonly audioUnlocked = signal(false);
  /** Todos los cues intentaron cargarse en buffer (algunos pueden fallar silenciosamente). */
  readonly buffersWarm = signal(false);

  readonly enabled = signal(this.readStoredEnabled());

  private readonly onFirstInteraction = (): void => {
    void this.performUnlock();
  };

  setEnabled(on: boolean): void {
    try {
      localStorage.setItem(STORAGE_KEY, on ? '1' : '0');
    } catch {
      /* ignore */
    }
    this.enabled.set(on);
  }

  /**
   * Registrar una vez: primer gesto del usuario desbloquea audio iOS/Safari y precarga buffers.
   * Llamar desde `AppComponent` al iniciar la app.
   */
  setupDocumentUnlock(): void {
    if (typeof document === 'undefined') return;
    if (this.unlockSetup) return;
    this.unlockSetup = true;
    document.addEventListener('pointerdown', this.onFirstInteraction, { passive: true });
    document.addEventListener('touchstart', this.onFirstInteraction, { passive: true });
    document.addEventListener('click', this.onFirstInteraction, { passive: true });
  }

  /**
   * Tras generar `.mp3` y cambiar formato: actualiza flag y vacía buffers decodificados.
   * Llamar antes del siguiente combate si cambias MP3/WAV en caliente.
   */
  applyPreferMp3Assets(on: boolean): void {
    setPreferMp3Assets(on);
    this.bufferCache.clear();
    this.bufferLoads.clear();
    this.buffersWarm.set(false);
    if (this.audioUnlocked()) {
      void this.preloadAllCueBuffers().finally(() => this.buffersWarm.set(true));
    }
  }

  play(cue: SoundCue): void {
    if (!this.enabled()) return;
    const path = CUE_PATHS[cue];
    const url = soundAssetUrl(path);
    const volume = CUE_VOLUME[cue];
    void this.playCue(cue, url, volume);
  }

  /**
   * URL directa (p. ej. tests); usa buffer si está en caché y desbloqueado.
   */
  playUrl(url: string, volume = 0.7): void {
    if (!this.enabled()) return;
    void this.playUrlInternal(url, volume);
  }

  private async performUnlock(): Promise<void> {
    if (this.audioUnlocked() || this.unlockRunning) return;
    this.unlockRunning = true;
    try {
      const ctx = this.getAudioContext();
      await ctx.resume().catch(() => undefined);

      try {
        const ping = ctx.createBuffer(1, 1, ctx.sampleRate);
        const src = ctx.createBufferSource();
        src.buffer = ping;
        const g = ctx.createGain();
        g.gain.value = 0.0001;
        src.connect(g);
        g.connect(ctx.destination);
        src.start(0);
      } catch {
        /* ignore */
      }

      await ctx.resume().catch(() => undefined);
      this.detachUnlockListeners();
      this.audioUnlocked.set(ctx.state === 'running');

      void this.preloadAllCueBuffers().finally(() => this.buffersWarm.set(true));
    } finally {
      this.unlockRunning = false;
    }
  }

  private detachUnlockListeners(): void {
    if (typeof document === 'undefined') return;
    document.removeEventListener('pointerdown', this.onFirstInteraction);
    document.removeEventListener('touchstart', this.onFirstInteraction);
    document.removeEventListener('click', this.onFirstInteraction);
  }

  private getAudioContext(): AudioContext {
    if (!this.audioContext) {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AC) {
        throw new Error('AudioContext not supported');
      }
      this.audioContext = new AC();
    }
    return this.audioContext;
  }

  private async preloadAllCueBuffers(): Promise<void> {
    const ctx = this.getAudioContext();
    await this.resumeIfNeeded(ctx);
    const urls = [...new Set(Object.values(CUE_PATHS).map((p) => soundAssetUrl(p)))];
    await Promise.all(urls.map((u) => this.ensureBuffer(ctx, u)));
  }

  private async resumeIfNeeded(ctx: AudioContext): Promise<void> {
    if (ctx.state === 'suspended') {
      await ctx.resume().catch(() => undefined);
    }
  }

  private decodeArrayBuffer(ctx: AudioContext, data: ArrayBuffer): Promise<AudioBuffer> {
    const copy = data.slice(0);
    const maybePromise = ctx.decodeAudioData(copy);
    if (maybePromise instanceof Promise) {
      return maybePromise;
    }
    return new Promise((resolve, reject) => {
      ctx.decodeAudioData(data.slice(0), resolve, reject);
    });
  }

  private async ensureBuffer(ctx: AudioContext, url: string): Promise<AudioBuffer | null> {
    const hit = this.bufferCache.get(url);
    if (hit) return hit;

    const pending = this.bufferLoads.get(url);
    if (pending) return pending;

    const load = (async (): Promise<AudioBuffer | null> => {
      try {
        const res = await fetch(url);
        if (!res.ok) return null;
        const ab = await res.arrayBuffer();
        await this.resumeIfNeeded(ctx);
        const audioBuf = await this.decodeArrayBuffer(ctx, ab);
        this.bufferCache.set(url, audioBuf);
        return audioBuf;
      } catch {
        return null;
      } finally {
        this.bufferLoads.delete(url);
      }
    })();

    this.bufferLoads.set(url, load);
    return load;
  }

  private async playCue(cue: SoundCue, url: string, volume: number): Promise<void> {
    const ctx = this.getAudioContext();
    await this.resumeIfNeeded(ctx);

    const buf = await this.ensureBuffer(ctx, url);
    await this.resumeIfNeeded(ctx);
    if (buf) {
      try {
        this.playBuffer(ctx, buf, volume);
        return;
      } catch {
        /* fallback */
      }
    }

    if (cue === SoundCue.Denial) {
      await this.playDenialFallback();
      return;
    }
    if (cue === SoundCue.ShopPick) {
      await this.playShopPickFallback();
      return;
    }

    await this.playHtmlAudio(url, volume);
  }

  private async playUrlInternal(url: string, volume: number): Promise<void> {
    const ctx = this.getAudioContext();
    await this.resumeIfNeeded(ctx);
    const buf = await this.ensureBuffer(ctx, url);
    await this.resumeIfNeeded(ctx);
    if (buf) {
      try {
        this.playBuffer(ctx, buf, volume);
        return;
      } catch {
        /* */
      }
    }
    await this.playHtmlAudio(url, volume);
  }

  private playBuffer(ctx: AudioContext, buffer: AudioBuffer, volume: number): void {
    const src = ctx.createBufferSource();
    const gain = ctx.createGain();
    gain.gain.value = Math.max(0, Math.min(1, volume));
    src.buffer = buffer;
    src.connect(gain);
    gain.connect(ctx.destination);
    src.start(0);
  }

  private async playHtmlAudio(url: string, volume: number): Promise<void> {
    const audio = new Audio(url);
    audio.volume = Math.max(0, Math.min(1, volume));
    try {
      await audio.play();
    } catch {
      /* autoplay / iOS */
    }
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

  private async playDenialFallback(): Promise<void> {
    await this.playDenialSynthetic();
  }

  private async playShopPickFallback(): Promise<void> {
    await this.playShopPickSynthetic();
  }

  private async playDenialSynthetic(): Promise<void> {
    const ctx = this.getAudioContext();
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

  private async playShopPickSynthetic(): Promise<void> {
    const ctx = this.getAudioContext();
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

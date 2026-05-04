import { Injectable, signal } from '@angular/core';
import { preferMp3Assets, setPreferMp3Assets, soundAssetUrl } from './sound-assets.config';
import { battle_loops, shopping_loops } from './sound-loops.config';

const STORAGE_KEY_ENABLED = 'lucasCardsSoundEnabled';
const STORAGE_KEY_VOLUME = 'lucasCardsSoundVolume';
/** Volumen maestro por defecto (0–1) si no hay valor en `localStorage`. */
const DEFAULT_MASTER_VOLUME = 0.25;

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

/** Volumen música de ambiente (Web Audio loop o HTMLAudio `loop`). */
const AMBIENT_MUSIC_VOLUME = 0.32;

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
  private ambientSource: AudioBufferSourceNode | null = null;
  private ambientGain: GainNode | null = null;
  private ambientHtmlAudio: HTMLAudioElement | null = null;
  /** Pantalla que debe retomar música al reactivar sonido (`setEnabled(true)`). */
  private ambientScreen: 'shopping' | 'battle' | null = null;

  /** Desbloqueado tras primer pointer/touch/click (AudioContext running). */
  readonly audioUnlocked = signal(false);
  /** Todos los cues intentaron cargarse en buffer (algunos pueden fallar silenciosamente). */
  readonly buffersWarm = signal(false);

  readonly enabled = signal(this.readStoredEnabled());
  /** Volumen maestro 0–1 (efectos y música de ambiente). */
  readonly volume = signal(this.readStoredVolume());

  private readonly onFirstInteraction = (): void => {
    void this.performUnlock();
  };

  setEnabled(on: boolean): void {
    try {
      localStorage.setItem(STORAGE_KEY_ENABLED, on ? '1' : '0');
    } catch {
      /* ignore */
    }
    this.enabled.set(on);
    if (!on) {
      this.stopAmbientPlaybackOnly();
    } else {
      void this.restartAmbientForCurrentScreen();
    }
  }

  setVolume(level: number): void {
    const v = Math.max(0, Math.min(1, level));
    try {
      localStorage.setItem(STORAGE_KEY_VOLUME, String(v));
    } catch {
      /* ignore */
    }
    this.volume.set(v);
    this.applyAmbientOutputGain();
  }

  private effectiveVolume(): number {
    return this.enabled() ? this.volume() : 0;
  }

  private applyAmbientOutputGain(): void {
    const m = this.effectiveVolume();
    if (this.ambientGain) {
      this.ambientGain.gain.value = AMBIENT_MUSIC_VOLUME * m;
    }
    if (this.ambientHtmlAudio) {
      this.ambientHtmlAudio.volume = Math.min(1, AMBIENT_MUSIC_VOLUME * m);
    }
  }

  private async restartAmbientForCurrentScreen(): Promise<void> {
    if (!this.enabled() || !this.ambientScreen) return;
    if (this.ambientScreen === 'shopping') {
      await this.startAmbientFromPaths(shopping_loops);
    } else {
      await this.startAmbientFromPaths(battle_loops);
    }
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
    this.stopAmbientPlaybackOnly();
    this.ambientScreen = null;
    this.bufferCache.clear();
    this.bufferLoads.clear();
    this.buffersWarm.set(false);
    if (this.audioUnlocked()) {
      void this.preloadAllCueBuffers().finally(() => this.buffersWarm.set(true));
    }
  }

  /** Una pista al azar de `shopping_loops`, loop continuo (sin pausa entre vueltas). */
  startShoppingAmbient(): void {
    this.ambientScreen = 'shopping';
    void this.startAmbientFromPaths(shopping_loops);
  }

  /** Una pista al azar de `battle_loops`, loop continuo. */
  startBattleAmbient(): void {
    this.ambientScreen = 'battle';
    void this.startAmbientFromPaths(battle_loops);
  }

  /** Detiene música de ambiente y olvida la pantalla (p. ej. al cambiar de ruta). */
  stopAmbientMusic(): void {
    this.stopAmbientPlaybackOnly();
    this.ambientScreen = null;
  }

  private stopAmbientPlaybackOnly(): void {
    if (this.ambientSource) {
      try {
        this.ambientSource.stop();
      } catch {
        /* already stopped */
      }
      try {
        this.ambientSource.disconnect();
      } catch {
        /* */
      }
      this.ambientSource = null;
    }
    if (this.ambientGain) {
      try {
        this.ambientGain.disconnect();
      } catch {
        /* */
      }
      this.ambientGain = null;
    }
    if (this.ambientHtmlAudio) {
      this.ambientHtmlAudio.pause();
      this.ambientHtmlAudio.src = '';
      this.ambientHtmlAudio.removeAttribute('src');
      this.ambientHtmlAudio.load();
      this.ambientHtmlAudio = null;
    }
  }

  play(cue: SoundCue): void {
    if (!this.enabled() || this.volume() <= 0) return;
    const path = CUE_PATHS[cue];
    const url = soundAssetUrl(path);
    const volume = CUE_VOLUME[cue];
    void this.playCue(cue, url, volume);
  }

  /**
   * URL directa (p. ej. tests); usa buffer si está en caché y desbloqueado.
   */
  playUrl(url: string, volume = 0.7): void {
    if (!this.enabled() || this.volume() <= 0) return;
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
      if (this.ambientHtmlAudio) {
        void this.ambientHtmlAudio.play().catch(() => undefined);
      }

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
    const cueUrls = Object.values(CUE_PATHS).map((p) => soundAssetUrl(p));
    const loopUrls = [...shopping_loops, ...battle_loops].map((p) => soundAssetUrl(p));
    const urls = [...new Set([...cueUrls, ...loopUrls])];
    await Promise.all(urls.map((u) => this.ensureBuffer(ctx, u)));
  }

  private async startAmbientFromPaths(paths: readonly string[]): Promise<void> {
    if (!this.enabled() || paths.length === 0) return;
    this.stopAmbientPlaybackOnly();
    const path = paths[Math.floor(Math.random() * paths.length)]!;
    const url = soundAssetUrl(path);
    const ctx = this.getAudioContext();
    await this.resumeIfNeeded(ctx);
    const buf = await this.ensureBuffer(ctx, url);
    await this.resumeIfNeeded(ctx);
    const eff = this.effectiveVolume();
    if (buf) {
      try {
        const src = ctx.createBufferSource();
        const gain = ctx.createGain();
        gain.gain.value = AMBIENT_MUSIC_VOLUME * eff;
        src.buffer = buf;
        src.loop = true;
        src.connect(gain);
        gain.connect(ctx.destination);
        src.start(0);
        this.ambientSource = src;
        this.ambientGain = gain;
        return;
      } catch {
        /* HTMLAudio */
      }
    }
    const audio = new Audio(url);
    audio.loop = true;
    audio.volume = Math.max(0, Math.min(1, AMBIENT_MUSIC_VOLUME * eff));
    this.ambientHtmlAudio = audio;
    try {
      await audio.play();
    } catch {
      /* autoplay / gesto pendiente */
    }
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
    gain.gain.value = Math.max(0, Math.min(1, volume * this.effectiveVolume()));
    src.buffer = buffer;
    src.connect(gain);
    gain.connect(ctx.destination);
    src.start(0);
  }

  private async playHtmlAudio(url: string, volume: number): Promise<void> {
    const audio = new Audio(url);
    audio.volume = Math.max(0, Math.min(1, volume * this.effectiveVolume()));
    try {
      await audio.play();
    } catch {
      /* autoplay / iOS */
    }
  }

  private readStoredEnabled(): boolean {
    try {
      const s = localStorage.getItem(STORAGE_KEY_ENABLED);
      if (s === '0') return false;
      if (s === '1') return true;
    } catch {
      /* ignore */
    }
    return true;
  }

  private readStoredVolume(): number {
    try {
      const s = localStorage.getItem(STORAGE_KEY_VOLUME);
      if (s == null || s === '') return DEFAULT_MASTER_VOLUME;
      const n = Number(s);
      if (!Number.isFinite(n)) return DEFAULT_MASTER_VOLUME;
      return Math.max(0, Math.min(1, n));
    } catch {
      return DEFAULT_MASTER_VOLUME;
    }
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

    const peak = 0.07 * this.effectiveVolume();
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(Math.max(0.0001, peak), t0 + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur + 0.02);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.03);
  }

  private async playShopPickSynthetic(): Promise<void> {
    const ctx = this.getAudioContext();
    await this.resumeIfNeeded(ctx);
    const ev = this.effectiveVolume();
    const playTone = (start: number, freq: number, len: number, peak: number): void => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, start);
      const p = peak * ev;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(Math.max(0.0001, p), start + 0.012);
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

import { Component, HostListener, inject, input, signal } from '@angular/core';
import { I18nService } from '../../../core/services/i18n.service';
import { SoundService } from '../../../core/services/sound.service';

@Component({
  selector: 'app-audio-settings-fab',
  standalone: true,
  templateUrl: './audio-settings-fab.component.html',
  styleUrl: './audio-settings-fab.component.scss',
})
export class AudioSettingsFabComponent {
  readonly sound = inject(SoundService);
  readonly i18n = inject(I18nService);
  readonly panelOpen = signal(false);
  /**
   * - `floating`: centrado arriba del viewport (por defecto; p. ej. menú).
   * - `selectTools`: en flujo junto a la guía en la tienda.
   * - `battleDock`: junto al panel / chip del registro de combate.
   */
  readonly layout = input<'floating' | 'selectTools' | 'battleDock'>('floating');

  togglePanel(): void {
    this.panelOpen.update((v) => !v);
  }

  closePanel(): void {
    this.panelOpen.set(false);
  }

  onVolumeInput(ev: Event): void {
    const raw = Number((ev.target as HTMLInputElement).value);
    if (!Number.isFinite(raw)) return;
    this.sound.setVolume(raw / 100);
  }

  toggleSoundEnabled(): void {
    this.sound.setEnabled(!this.sound.enabled());
  }

  volumePercent(): number {
    return Math.round(this.sound.volume() * 100);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.panelOpen()) this.closePanel();
  }
}

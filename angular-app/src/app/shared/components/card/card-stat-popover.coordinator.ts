import { Injectable } from '@angular/core';

/**
 * Garantiza un solo popover de stats de carta visible (un clic en la lupa a la vez).
 */
@Injectable({ providedIn: 'root' })
export class CardStatPopoverCoordinator {
  private activeDismiss: (() => void) | null = null;

  takeover(dismiss: () => void): void {
    const prev = this.activeDismiss;
    if (prev && prev !== dismiss) {
      prev();
    }
    this.activeDismiss = dismiss;
  }

  release(dismiss: () => void): void {
    if (this.activeDismiss === dismiss) {
      this.activeDismiss = null;
    }
  }
}

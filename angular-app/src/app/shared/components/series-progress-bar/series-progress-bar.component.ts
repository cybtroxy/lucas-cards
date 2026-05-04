import { booleanAttribute, Component, computed, inject, input } from '@angular/core';
import { GameStateService } from '../../../core/services/game-state.service';
import {
  SERIES_PARTIDA_LOSSES_TO_ELIMINATE,
  SERIES_PARTIDA_WINS_TO_CLINCH,
} from '../../../core/engine/game-rules';
import { I18nService } from '../../../core/services/i18n.service';

@Component({
  selector: 'app-series-progress-bar',
  standalone: true,
  templateUrl: './series-progress-bar.component.html',
  styleUrl: './series-progress-bar.component.scss',
})
export class SeriesProgressBarComponent {
  readonly gs = inject(GameStateService);
  readonly i18n = inject(I18nService);
  readonly game = this.gs.game;

  /** Si es true, la barra va en flujo normal (p. ej. dentro del modal de resultado), no fija al viewport. */
  readonly embedded = input(false, { transform: booleanAttribute });

  readonly strikeIndices = [0, 1, 2] as const;

  /** Porcentaje de la barra verde hacia 10 victorias de partida (empates no suman). */
  readonly winsFillPercent = computed(() => {
    const w = this.game().seriesWinsP;
    const pct = (w / SERIES_PARTIDA_WINS_TO_CLINCH) * 100;
    return Math.min(100, Math.max(0, pct));
  });

  strikeLit(index: number): boolean {
    return this.game().seriesWinsR > index;
  }

  readonly progressAria = computed(() => {
    const g = this.game();
    if (this.i18n.isEn()) {
      return `Series: ${g.seriesWinsP} of ${SERIES_PARTIDA_WINS_TO_CLINCH} wins, ${g.seriesWinsR} of ${SERIES_PARTIDA_LOSSES_TO_ELIMINATE} match losses.`;
    }
    return `Serie: ${g.seriesWinsP} de ${SERIES_PARTIDA_WINS_TO_CLINCH} victorias, ${g.seriesWinsR} de ${SERIES_PARTIDA_LOSSES_TO_ELIMINATE} derrotas de partida.`;
  });
}

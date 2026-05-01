import { Component, computed, inject } from '@angular/core';
import { GameStateService } from '../../../core/services/game-state.service';
import { seriesProgressCircleCount, WINS_TO_WIN_SERIES } from '../../../core/engine/game-rules';
@Component({
  selector: 'app-series-progress-bar',
  standalone: true,
  templateUrl: './series-progress-bar.component.html',
  styleUrl: './series-progress-bar.component.scss',
})
export class SeriesProgressBarComponent {
  readonly gs = inject(GameStateService);
  readonly game = this.gs.game;

  readonly circleCount = computed(() => {
    const g = this.game();
    const decided =
      g.seriesWinsP >= WINS_TO_WIN_SERIES || g.seriesWinsR >= WINS_TO_WIN_SERIES;
    return seriesProgressCircleCount({
      partidasCompletadas: g.seriesPartidaOutcomes.length,
      seriesDecided: decided,
    });
  });

  readonly indices = computed(() =>
    Array.from({ length: this.circleCount() }, (_, i) => i),
  );

  /** Índice 0-based del círculo de la partida en curso (siguiente sin resultado). */
  readonly currentPartidaIndex = computed(() => {
    const g = this.game();
    const decided =
      g.seriesWinsP >= WINS_TO_WIN_SERIES || g.seriesWinsR >= WINS_TO_WIN_SERIES;
    if (decided) return -1;
    const n = seriesProgressCircleCount({
      partidasCompletadas: g.seriesPartidaOutcomes.length,
      seriesDecided: decided,
    });
    const next = g.seriesPartidaOutcomes.length;
    return next < n ? next : -1;
  });

  chipState(index: number): 'pending' | 'win' | 'loss' | 'draw' {
    const g = this.game();
    const o = g.seriesPartidaOutcomes[index];
    if (o === undefined) return 'pending';
    if (o === 'player') return 'win';
    if (o === 'rival') return 'loss';
    return 'draw';
  }

  lineTint(prevIndex: number): 'muted' | 'ahead' {
    const a = this.chipState(prevIndex);
    const b = this.chipState(prevIndex + 1);
    if (a === 'pending' && b === 'pending') return 'muted';
    return 'ahead';
  }
}

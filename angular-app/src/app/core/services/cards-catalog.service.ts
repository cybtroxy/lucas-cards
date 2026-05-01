import { Injectable } from '@angular/core';
import type { Card } from '../models/card.model';
import { CARDS } from '../data/cards.catalog';

@Injectable({ providedIn: 'root' })
export class CardsCatalogService {
  readonly cards: Card[] = CARDS;

  findById(id: string): Card | undefined {
    return CARDS.find((c) => c.id === id);
  }
}

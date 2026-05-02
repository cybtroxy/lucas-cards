import { Injectable, signal } from '@angular/core';
import {
  referenceDescription,
  type ReferenceKind,
} from '../i18n/card-reference';

export type LucasLang = 'es' | 'en';
export type I18nCategory = 'type';

const STORAGE_KEY = 'lucasCardLang';

const MAPS: Record<
  LucasLang,
  Record<I18nCategory, Record<string, string>>
> = {
  es: {
    type: {
      fire: 'Fuego',
      water: 'Agua',
      nature: 'Naturaleza',
      air: 'Aire',
      earth: 'Tierra',
      metal: 'Metal',
      alien: 'Alien',
      light: 'Luz',
      darkness: 'Oscuridad',
      spirit: 'Espíritu',
      energy: 'Energía',
      love: 'Amor',
    },
  },
  en: {
    type: {
      fire: 'Fire',
      water: 'Water',
      nature: 'Nature',
      air: 'Air',
      earth: 'Earth',
      metal: 'Metal',
      alien: 'Alien',
      light: 'Light',
      darkness: 'Darkness',
      spirit: 'Spirit',
      energy: 'Energy',
      love: 'Love',
    },
  },
};

const UI: Record<LucasLang, Record<string, string>> = {
  es: {
    typeBadgeTitle: 'Tipo',
    selectGlossaryBtn: 'Guía: tipos',
    selectGlossaryTitle: 'Guía de cartas',
    selectGlossaryIntro: 'Consulta cómo actúan los tipos elementales en combate.',
    selectGlossaryClose: 'Cerrar',
    refSectionTypes: 'Tipos elementales (combate)',
    refColName: 'Nombre',
    refColDesc: 'Descripción',
    resultCombatDetailToggle: 'Detalle de combate',
    selectShopCoinsAria: 'Saldo disponible para refrescar la tienda',
    rivalDifficultyEasy: 'Fácil',
    rivalDifficultyNormal: 'Normal',
    rivalDifficultyHard: 'Difícil',
  },
  en: {
    typeBadgeTitle: 'Type',
    selectGlossaryBtn: 'Guide: types',
    selectGlossaryTitle: 'Card guide',
    selectGlossaryIntro: 'How elemental types work in combat.',
    selectGlossaryClose: 'Close',
    refSectionTypes: 'Elemental types (combat)',
    refColName: 'Name',
    refColDesc: 'Description',
    resultCombatDetailToggle: 'Battle details',
    selectShopCoinsAria: 'Balance available to refresh the shop',
    rivalDifficultyEasy: 'Easy',
    rivalDifficultyNormal: 'Normal',
    rivalDifficultyHard: 'Hard',
  },
};

@Injectable({ providedIn: 'root' })
export class I18nService {
  readonly lang = signal<LucasLang>(this.readStoredLang());

  constructor() {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = this.lang();
    }
  }

  private readStoredLang(): LucasLang {
    try {
      const s = localStorage.getItem(STORAGE_KEY);
      if (s === 'en' || s === 'es') return s;
    } catch {
      /* ignore */
    }
    return 'es';
  }

  setLang(code: LucasLang): void {
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      /* ignore */
    }
    this.lang.set(code);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = code;
    }
  }

  t(category: I18nCategory, code: string | null | undefined): string {
    if (code == null || code === '') return '';
    const lang = this.lang();
    const c = String(code);
    const table = MAPS[lang]?.[category] ?? {};
    if (table[c] != null) return table[c];
    const fallback = MAPS.en[category] ?? {};
    if (fallback[c] != null) return fallback[c];
    return c;
  }

  tUi(key: string): string {
    const lang = this.lang();
    if (UI[lang]?.[key] != null) return UI[lang][key];
    if (UI.en[key] != null) return UI.en[key];
    return key;
  }

  isEn(): boolean {
    return this.lang() === 'en';
  }

  /** Texto largo para glosario de tipos en pantalla de selección. */
  tReferenceDesc(kind: ReferenceKind, code: string): string {
    return referenceDescription(this.lang(), kind, code);
  }
}

export type { ReferenceKind };

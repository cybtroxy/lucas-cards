/** Orden estable para tablas del glosario en selección. */
export const REFERENCE_ORDER = {
  type: [
    'fire',
    'water',
    'nature',
    'air',
    'earth',
    'metal',
    'alien',
    'light',
    'darkness',
    'spirit',
    'energy',
    'love',
  ] as const,
} as const;

export type ReferenceKind = keyof typeof REFERENCE_ORDER;

type RefLang = 'es' | 'en';

const DESCRIPTIONS: Record<RefLang, Record<ReferenceKind, Record<string, string>>> = {
  es: {
    type: {
      fire:
        'Daño ×1,25 vs Naturaleza. Si defiendes contra Agua, el daño recibido se calcula a ×0,8 (poco efectivo para el atacante agua).',
      water:
        'Daño ×1,25 vs Fuego. Débil en defensa vs Naturaleza y vs Energía (sus ataques te tratan con ventaja).',
      nature:
        'Daño ×1,25 vs Agua. Débil en defensa vs Fuego.',
      energy:
        'Daño ×1,25 vs Agua y Metal. Débil en defensa vs Tierra.',
      metal:
        'Daño ×1,25 vs Aire y Alien. Débil en defensa vs Energía.',
      air:
        'Daño ×1,25 vs Tierra. Débil en defensa vs Metal.',
      earth:
        'Daño ×1,25 vs Energía. Débil en defensa vs Aire.',
      light:
        'Daño ×1,25 vs Oscuridad. Débil en defensa vs Espíritu y Alien.',
      darkness:
        'Daño ×1,25 vs Espíritu. Débil en defensa vs Luz y Amor.',
      spirit:
        'Daño ×1,25 vs Luz y Alien. Débil en defensa vs Oscuridad.',
      alien:
        'Daño ×1,25 vs Luz. Débil en defensa vs Metal y Espíritu.',
      love:
        'Daño ×1,25 vs Oscuridad. Ningún tipo atacante te aplica ×1,25 mientras defiendes (tabla actual).',
    },
  },
  en: {
    type: {
      fire: '×1.25 damage vs Nature. On defense vs Water, incoming damage uses the ×0.8 matchup (water is super effective).',
      water: '×1.25 damage vs Fire. Weak on defense vs Nature and Energy.',
      nature: '×1.25 damage vs Water. Weak on defense vs Fire.',
      energy: '×1.25 damage vs Water and Metal. Weak on defense vs Earth.',
      metal: '×1.25 damage vs Air and Alien. Weak on defense vs Energy.',
      air: '×1.25 damage vs Earth. Weak on defense vs Metal.',
      earth: '×1.25 damage vs Energy. Weak on defense vs Air.',
      light: '×1.25 damage vs Darkness. Weak on defense vs Spirit and Alien.',
      darkness: '×1.25 damage vs Spirit. Weak on defense vs Light and Love.',
      spirit: '×1.25 damage vs Light and Alien. Weak on defense vs Darkness.',
      alien: '×1.25 damage vs Light. Weak on defense vs Metal and Spirit.',
      love: '×1.25 damage vs Darkness. No attacker type in the current table gets super-effective damage against Love.',
    },
  },
};

export function referenceDescription(lang: RefLang, kind: ReferenceKind, code: string): string {
  const table = DESCRIPTIONS[lang]?.[kind];
  if (table?.[code]) return table[code];
  const en = DESCRIPTIONS.en[kind]?.[code];
  return en ?? '';
}

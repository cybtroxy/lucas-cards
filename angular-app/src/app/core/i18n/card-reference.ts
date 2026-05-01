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
  ability: [
    'crit_chance',
    'pierce',
    'first_strike',
    'life_steal',
    'burn',
    'stun',
    'psychic_blast',
    'execute',
    'heal',
    'buff_next',
    'shield',
    'armor',
    'damage_reduce',
    'revive',
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
    ability: {
      crit_chance:
        'Al atacar, 20% de probabilidad de duplicar el daño (mínimo 1 tras el crítico).',
      pierce:
        'Tu golpe ignora el escudo rival (lo anula) y reduce el blindaje efectivo a 1 en lugar de 2.',
      first_strike:
        'En el primer golpe que apliques en la partida con esta carta, el daño sube ~40% (una sola vez).',
      life_steal:
        'Tras impactar, recuperas PV igual al 25% del daño total aplicado al rival (incluye quemadura). Hasta 3 activaciones por carta y partida.',
      burn:
        'Además del daño del golpe, añade 2 de daño por quemadura al mismo impacto (tras mitigaciones del defensor).',
      stun:
        'Aumenta el daño de tu golpe en ~10%.',
      psychic_blast:
        'Aumenta el daño de tu golpe en ~15%.',
      execute:
        'Si el rival tiene menos de 5 PV antes del remate del golpe, tu daño se ajusta para dejarlo exactamente en 0 (ejecución).',
      heal:
        'Al golpear, te curas +2 PV (hasta 3 veces por carta y partida).',
      buff_next:
        'La primera vez que golpeas con esta carta en la partida, el daño sube ~20%; luego vuelve a lo normal.',
      shield:
        'Bloquea por completo el primer golpe recibido (0 daño); luego se consume.',
      armor:
        'Reduce en 2 el daño recibido tras el multiplicador de tipo (mínimo 1). Con perforar activo, solo reduce 1.',
      damage_reduce:
        'El daño recibido se multiplica por 0,75 (redondeo hacia arriba, mínimo 1).',
      revive:
        'La primera vez que tus PV llegarían a 0, quedas con 1 PV en su lugar (una sola vez por carta y partida).',
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
    ability: {
      crit_chance: 'On attack, 20% chance to double damage (at least 1 after crit).',
      pierce: 'Your strike bypasses shield (nullifies it) and treats armor as 1 instead of 2.',
      first_strike: 'The first hit this card deals in the match deals ~+40% damage (once).',
      life_steal:
        'After landing a hit, heal for 25% of total damage dealt to the defender (including burn). Up to 3 procs per card per match.',
      burn: 'In addition to strike damage, adds 2 burn damage on the same hit (after defender mitigation).',
      stun: 'Increases your strike damage by ~10%.',
      psychic_blast: 'Increases your strike damage by ~15%.',
      execute:
        'If the defender has under 5 HP before the finisher step, damage is set to exactly wipe remaining HP.',
      heal: 'On hit, heal yourself +2 HP (up to 3 times per card per match).',
      buff_next: 'The first time this card hits in the match, damage is ~+20%; then normal.',
      shield: 'Completely blocks the first incoming hit (0 damage); then consumed.',
      armor: 'Reduces incoming damage by 2 after the type multiplier (minimum 1). With pierce active, only 1.',
      damage_reduce: 'Incoming damage is multiplied by 0.75 (ceil, minimum 1).',
      revive: 'The first time HP would reach 0, you stay at 1 HP instead (once per card per match).',
    },
  },
};

export function referenceDescription(lang: RefLang, kind: ReferenceKind, code: string): string {
  const table = DESCRIPTIONS[lang]?.[kind];
  if (table?.[code]) return table[code];
  const en = DESCRIPTIONS.en[kind]?.[code];
  return en ?? '';
}

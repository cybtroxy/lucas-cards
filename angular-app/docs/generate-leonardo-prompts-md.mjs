#!/usr/bin/env node
/**
 * Genera docs/leonardo-card-art-prompts.md a partir de cards.json
 * Ejecutar: node angular-app/docs/generate-leonardo-prompts-md.mjs
 */
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { CONCEPTS } from './leonardo-concepts-data.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const cardsPath = join(__dirname, '../src/app/core/data/cards.json');
const outPath = join(__dirname, 'leonardo-card-art-prompts.md');

const cards = JSON.parse(readFileSync(cardsPath, 'utf8'));

const TYPE_META = {
  nature: {
    es: 'Naturaleza',
    palette: 'dominant natural greens, moss and leaf tones, soft bark browns as accents',
  },
  water: {
    es: 'Agua',
    palette: 'dominant deep blues and teals, aqua highlights, cool reflective light',
  },
  alien: {
    es: 'Alienígena',
    palette: 'otherworldly purples, teals, bioluminescent accents, strange atmosphere',
  },
  air: {
    es: 'Aire',
    palette: 'airy silvers, sky blues, white wisps, light and translucent feeling',
  },
  fire: {
    es: 'Fuego',
    palette: 'strong orange and ember red, warm highlights, subtle smoke wisps',
  },
  earth: {
    es: 'Tierra',
    palette: 'ochre, stone gray, clay brown, grounded dusty tones',
  },
  metal: {
    es: 'Metal',
    palette: 'steel silver, bronze or iron reflections, cool metallic highlights',
  },
  love: {
    es: 'Amor',
    palette: 'soft rose, warm pink-gold light, gentle harmonious glow',
  },
  energy: {
    es: 'Energía',
    palette: 'electric yellow and violet arcs, high-contrast neon accents',
  },
  light: {
    es: 'Luz',
    palette: 'radiant gold and white, soft lens flare, luminous ethereal mood',
  },
};

const LEVEL_EN = {
  1: 'small-scale focal subject, humble readable silhouette, subtle elemental hints, modest presence — not epic, keep detail clear not cluttered',
  2: 'clearer elemental motif, richer materials and textures, growing intensity — still a believable “rising” tier, not a final boss',
  3: 'bold silhouette, strong thematic read, visible mastery of the element — notable power, memorable mid-tier spectacle',
  4: 'majestic focal composition, intricate surfaces and effects — elite, almost mythic weight, still one primary subject',
  5: 'legendary centerpiece, maximal elemental spectacle, awe-inspiring finale energy — one dominant focal, avoid muddy clutter',
};

const NEGATIVE =
  'text, letters, words, watermark, logo, UI, HUD, interface, health bar, mana bar, stats, numbers, card frame, borders, captions, typography, infographic, title, subtitle, buttons, icons, duplicate character, split image, collage grid, multiple panels, generic human knight, generic wizard, generic anime protagonist, standard RPG human hero unless explicitly described';

function conceptForCard(card) {
  const list = CONCEPTS[card.type];
  if (!list || list.length !== 10) throw new Error(`Unknown or invalid type ${card.type}`);
  /** Dos variantes por bloque de 10 ids: filas 0–4 vs 5–9 para el mismo tipo y nivel. */
  const n = parseInt(card.id.split('_')[1], 10);
  const row = Math.floor((n - 1) / 10) % 2;
  const slot = row * 5 + (card.level - 1);
  return list[slot];
}

function buildPrompt(card, concept) {
  const tm = TYPE_META[card.type];
  const levelPhrase = LEVEL_EN[card.level];
  return [
    `Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only.`,
    `Subject (follow strictly): ${concept.subjectEn}`,
    `Flavor anchor: "${concept.name}" — archetype: ${concept.cls}. Visual scale: ${levelPhrase}.`,
    `Element theme: ${card.type} — color direction: ${tm.palette}.`,
    `The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person.`,
    `Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette.`,
    `Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject.`,
    `CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography.`,
    `High quality, sharp focal subject, professional illustration suitable for a digital card game.`,
  ].join(' ');
}

const order = ['nature', 'water', 'alien', 'air', 'fire', 'earth', 'metal', 'love', 'energy', 'light'];

function typeIndexInCycle(card) {
  const n = parseInt(card.id.split('_')[1], 10);
  return (n - 1) % 10; // 0–9: nature, water, alien, … en cada bloque de 10
}

let md = `# Prompts Leonardo.ai — arte de cartas (Lucas Cards)

Este documento alinea **100 entradas** con el catálogo \`src/app/core/data/cards.json\` (series \`c1\`–\`c5\`, 20 cartas por serie). Cada carta tiene **elemento** según su \`type\` y **escala de poder visual** según \`level\` (1 básico → 5 legendario). Los prompts priorizan **siluetas variadas** (fauna, flora, objetos, fenómenos, paisajes focales, criaturas no humanoides) para evitar que todas las ilustraciones converjan en humanoides genéricos.

## Uso en Leonardo (o similar)

| Parámetro | Sugerencia |
|-----------|------------|
| **Relación de aspecto** | **1 : 1.4** (ej. ancho × alto: **768 × 1075**, **896 × 1254**, o **640 × 896**; múltiplos de 8 según modelo). |
| **Imágenes por job** | \`num_images\`: 2–4 para variaciones; si se parecen, reformula el prompt o genera de una en una. |
| **Prompt** | Texto en **inglés** (mejor compatibilidad con la mayoría de modelos). |
| **Negativo** | Usar el bloque **Negativo global** al final (o copiarlo en cada generación). |

### Negativo global (copiar/pegar)

\`\`\`
${NEGATIVE}
\`\`\`

### Notas de diseño por nivel

- **Nivel 1:** sujeto pequeño o sencillo, silueta clara, toques elementales suaves.
- **Nivel 2:** motivo elemental más marcado, más textura y material, sin pasarse de escala.
- **Nivel 3:** presencia notoria, lectura del elemento muy clara, pieza memorable.
- **Nivel 4:** composición casi mítica, superficies y efectos ricos, foco único dominante.
- **Nivel 5:** **legendario** — espectáculo elemental máximo, impacto de “cierre”, sin convertir el fondo en competencia del sujeto.

### Sugerencias / dudas abiertas

- Los **nombres** y **subjectEn** son editables en \`leonardo-concepts-data.mjs\`; mantened el \`id\` de \`cards.json\` en el juego.
- Si el modelo sigue forzando humanoides, reforzad en el prompt *creature / object / plant only, no human* o sustituid el ancla por una descripción más explícita de silueta.
- Para **consistencia** entre cartas de una misma facción, añadid al final del prompt una frase fija de estilo (*e.g.* “same painterly fantasy style as series X”).
- **Oscuridad / Spirit:** el ciclo actual del JSON no incluye \`darkness\` ni \`spirit\`; si ampliáis tipos, duplicad la plantilla de prompts.

---

`;

for (const card of cards) {
  const concept = conceptForCard(card);
  const tm = TYPE_META[card.type];
  const prompt = buildPrompt(card, concept);
  const idx = typeIndexInCycle(card);
  const cycleLabel = `${order[idx]} (${idx + 1}/10 del ciclo de nivel)`;

  md += `## ${card.id} — ${card.name}\n\n`;
  md += `| Campo | Valor |\n|--------|--------|\n`;
  md += `| **ID catálogo** | \`${card.id}\` |\n`;
  md += `| **Nivel** | ${card.level} |\n`;
  md += `| **Elemento (\`type\`)** | ${tm.es} (\`${card.type}\`) |\n`;
  md += `| **Rareza (JSON)** | \`${card.rarity}\` |\n`;
  md += `| **Ciclo por nivel** | ${cycleLabel} |\n`;
  md += `| **Nombre sugerido** | ${concept.name} |\n`;
  md += `| **Clase / arquetipo** | ${concept.cls} |\n`;
  md += `| **Formato (silueta)** | ${concept.formato} |\n`;
  md += `| **Voz / descripción** | ${concept.quote} |\n`;
  md += `| **Paleta (elemento)** | ${tm.palette} |\n\n`;
  md += `### Prompt (inglés, Leonardo)\n\n`;
  md += `\`\`\`txt\n${prompt}\n\`\`\`\n\n---\n\n`;
}

md += `\n## Regenerar este archivo\n\nDesde la raíz del repo:\n\n\`\`\`bash\nnode angular-app/docs/generate-leonardo-prompts-md.mjs\n\`\`\`\n\nEditar conceptos en \`angular-app/docs/leonardo-concepts-data.mjs\` (export \`CONCEPTS\`); paletas y negativo en \`generate-leonardo-prompts-md.mjs\`.\n`;

writeFileSync(outPath, md, 'utf8');
console.log('Written:', outPath);

# Prompts Leonardo.ai — arte de cartas (Lucas Cards)

Este documento alinea **100 entradas** con el catálogo `src/app/core/data/cards.json` (series `c1`–`c5`, 20 cartas por serie). Cada carta tiene **elemento** según su `type` y **escala de poder visual** según `level` (1 básico → 5 legendario). Los prompts priorizan **siluetas variadas** (fauna, flora, objetos, fenómenos, paisajes focales, criaturas no humanoides) para evitar que todas las ilustraciones converjan en humanoides genéricos.

## Uso en Leonardo (o similar)

| Parámetro | Sugerencia |
|-----------|------------|
| **Relación de aspecto** | **1 : 1.4** (ej. ancho × alto: **768 × 1075**, **896 × 1254**, o **640 × 896**; múltiplos de 8 según modelo). |
| **Imágenes por job** | `num_images`: 2–4 para variaciones; si se parecen, reformula el prompt o genera de una en una. |
| **Prompt** | Texto en **inglés** (mejor compatibilidad con la mayoría de modelos). |
| **Negativo** | Usar el bloque **Negativo global** al final (o copiarlo en cada generación). |

### Negativo global (copiar/pegar)

```
text, letters, words, watermark, logo, UI, HUD, interface, health bar, mana bar, stats, numbers, card frame, borders, captions, typography, infographic, title, subtitle, buttons, icons, duplicate character, split image, collage grid, multiple panels, generic human knight, generic wizard, generic anime protagonist, standard RPG human hero unless explicitly described
```

### Notas de diseño por nivel

- **Nivel 1:** sujeto pequeño o sencillo, silueta clara, toques elementales suaves.
- **Nivel 2:** motivo elemental más marcado, más textura y material, sin pasarse de escala.
- **Nivel 3:** presencia notoria, lectura del elemento muy clara, pieza memorable.
- **Nivel 4:** composición casi mítica, superficies y efectos ricos, foco único dominante.
- **Nivel 5:** **legendario** — espectáculo elemental máximo, impacto de “cierre”, sin convertir el fondo en competencia del sujeto.

### Sugerencias / dudas abiertas

- Los **nombres** y **subjectEn** son editables en `leonardo-concepts-data.mjs`; mantened el `id` de `cards.json` en el juego.
- Si el modelo sigue forzando humanoides, reforzad en el prompt *creature / object / plant only, no human* o sustituid el ancla por una descripción más explícita de silueta.
- Para **consistencia** entre cartas de una misma facción, añadid al final del prompt una frase fija de estilo (*e.g.* “same painterly fantasy style as series X”).
- **Oscuridad / Spirit:** el ciclo actual del JSON no incluye `darkness` ni `spirit`; si ampliáis tipos, duplicad la plantilla de prompts.

---

## c1_01 — Elegido 1-01

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c1_01` |
| **Nivel** | 1 |
| **Elemento (`type`)** | Naturaleza (`nature`) |
| **Rareza (JSON)** | `common` |
| **Ciclo por nivel** | nature (1/10 del ciclo de nivel) |
| **Nombre sugerido** | Geovena |
| **Clase / arquetipo** | Brote de geoda volcánica |
| **Formato (silueta)** | Planta-mineral |
| **Voz / descripción** | «Del cascarón roto nace el verde.» |
| **Paleta (elemento)** | dominant natural greens, moss and leaf tones, soft bark browns as accents |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): A massive cracked geode half buried in dark soil, glowing lava veins inside the cavity, a single luminous green sprout curling out like a small dragon tail. No people. Macro wonder, stone and life intertwined. Flavor anchor: "Geovena" — archetype: Brote de geoda volcánica. Visual scale: small-scale focal subject, humble readable silhouette, subtle elemental hints, modest presence — not epic, keep detail clear not cluttered. Element theme: nature — color direction: dominant natural greens, moss and leaf tones, soft bark browns as accents. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c1_02 — Elegido 1-02

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c1_02` |
| **Nivel** | 1 |
| **Elemento (`type`)** | Agua (`water`) |
| **Rareza (JSON)** | `common` |
| **Ciclo por nivel** | water (2/10 del ciclo de nivel) |
| **Nombre sugerido** | Espiral de Cristal |
| **Clase / arquetipo** | Banco de peces vidrio |
| **Formato (silueta)** | Enjambre acuático |
| **Voz / descripción** | «Transparentes pero no invisibles.» |
| **Paleta (elemento)** | dominant deep blues and teals, aqua highlights, cool reflective light |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): A helix school of perfectly glass-clear fish catching prismatic light underwater, bubbles like jewels. Abstract motion, no humanoid, ocean blues and teals. Flavor anchor: "Espiral de Cristal" — archetype: Banco de peces vidrio. Visual scale: small-scale focal subject, humble readable silhouette, subtle elemental hints, modest presence — not epic, keep detail clear not cluttered. Element theme: water — color direction: dominant deep blues and teals, aqua highlights, cool reflective light. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c1_03 — Elegido 1-03

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c1_03` |
| **Nivel** | 1 |
| **Elemento (`type`)** | Alienígena (`alien`) |
| **Rareza (JSON)** | `common` |
| **Ciclo por nivel** | alien (3/10 del ciclo de nivel) |
| **Nombre sugerido** | Hex-Meteor |
| **Clase / arquetipo** | Colmena caída |
| **Formato (silueta)** | Estructura xeno |
| **Voz / descripción** | «Trajimos geometría hambrienta.» |
| **Paleta (elemento)** | otherworldly purples, teals, bioluminescent accents, strange atmosphere |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): A meteorite crater with perfect hexagonal hive tunnels glowing violet, small winged not-insect aliens optional as specks. Geometry-first horror-beauty, no human. Flavor anchor: "Hex-Meteor" — archetype: Colmena caída. Visual scale: small-scale focal subject, humble readable silhouette, subtle elemental hints, modest presence — not epic, keep detail clear not cluttered. Element theme: alien — color direction: otherworldly purples, teals, bioluminescent accents, strange atmosphere. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c1_04 — Elegido 1-04

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c1_04` |
| **Nivel** | 1 |
| **Elemento (`type`)** | Aire (`air`) |
| **Rareza (JSON)** | `common` |
| **Ciclo por nivel** | air (4/10 del ciclo de nivel) |
| **Nombre sugerido** | Polillas de Estática |
| **Clase / arquetipo** | Enjambre eléctrico |
| **Formato (silueta)** | Enjambre |
| **Voz / descripción** | «Polvo que pica.» |
| **Paleta (elemento)** | airy silvers, sky blues, white wisps, light and translucent feeling |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Thousands of pale moths leaving faint lightning dust trails in twilight sky, spiral formation. Insect weather, airy silvers and blues. Flavor anchor: "Polillas de Estática" — archetype: Enjambre eléctrico. Visual scale: small-scale focal subject, humble readable silhouette, subtle elemental hints, modest presence — not epic, keep detail clear not cluttered. Element theme: air — color direction: airy silvers, sky blues, white wisps, light and translucent feeling. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c1_05 — Elegido 1-05

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c1_05` |
| **Nivel** | 1 |
| **Elemento (`type`)** | Fuego (`fire`) |
| **Rareza (JSON)** | `common` |
| **Ciclo por nivel** | fire (5/10 del ciclo de nivel) |
| **Nombre sugerido** | Salamandras de Brasas |
| **Clase / arquetipo** | Colonias ígneas |
| **Formato (silueta)** | Reptiles menores |
| **Voz / descripción** | «Pequeñas llamas con patas.» |
| **Paleta (elemento)** | strong orange and ember red, warm highlights, subtle smoke wisps |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Cluster of cute salamanders made of glowing coal and ember skin on ash ground, sparks. Animal charm, not a fire knight. Flavor anchor: "Salamandras de Brasas" — archetype: Colonias ígneas. Visual scale: small-scale focal subject, humble readable silhouette, subtle elemental hints, modest presence — not epic, keep detail clear not cluttered. Element theme: fire — color direction: strong orange and ember red, warm highlights, subtle smoke wisps. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c1_06 — Elegido 1-06

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c1_06` |
| **Nivel** | 1 |
| **Elemento (`type`)** | Tierra (`earth`) |
| **Rareza (JSON)** | `common` |
| **Ciclo por nivel** | earth (6/10 del ciclo de nivel) |
| **Nombre sugerido** | Columnas Abeja |
| **Clase / arquetipo** | Basalto y enjambre |
| **Formato (silueta)** | Formación rocosa |
| **Voz / descripción** | «Hexágonos y zumbido.» |
| **Paleta (elemento)** | ochre, stone gray, clay brown, grounded dusty tones |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Hexagonal basalt columns with golden bioluminescent bees streaming between pillars, dusk light. Geometry + insect life. Flavor anchor: "Columnas Abeja" — archetype: Basalto y enjambre. Visual scale: small-scale focal subject, humble readable silhouette, subtle elemental hints, modest presence — not epic, keep detail clear not cluttered. Element theme: earth — color direction: ochre, stone gray, clay brown, grounded dusty tones. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c1_07 — Elegido 1-07

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c1_07` |
| **Nivel** | 1 |
| **Elemento (`type`)** | Metal (`metal`) |
| **Rareza (JSON)** | `uncommon` |
| **Ciclo por nivel** | metal (7/10 del ciclo de nivel) |
| **Nombre sugerido** | Escarabajo Latón |
| **Clase / arquetipo** | Engranaje vivo |
| **Formato (silueta)** | Insecto mecánico |
| **Voz / descripción** | «Cada placa es rezo.» |
| **Paleta (elemento)** | steel silver, bronze or iron reflections, cool metallic highlights |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Large brass scarab with visible gear segments, steam hiss from joints, ruby eyes. Steampunk jewel bug, hero macro. Flavor anchor: "Escarabajo Latón" — archetype: Engranaje vivo. Visual scale: small-scale focal subject, humble readable silhouette, subtle elemental hints, modest presence — not epic, keep detail clear not cluttered. Element theme: metal — color direction: steel silver, bronze or iron reflections, cool metallic highlights. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c1_08 — Elegido 1-08

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c1_08` |
| **Nivel** | 1 |
| **Elemento (`type`)** | Amor (`love`) |
| **Rareza (JSON)** | `uncommon` |
| **Ciclo por nivel** | love (8/10 del ciclo de nivel) |
| **Nombre sugerido** | Zorros del Lazo |
| **Clase / arquetipo** | Pareja de bosque |
| **Formato (silueta)** | Animales |
| **Voz / descripción** | «Compartimos bufanda y huida.» |
| **Paleta (elemento)** | soft rose, warm pink-gold light, gentle harmonious glow |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Two red foxes with shared knitted scarf knot between them, snow softly falling, warm eyes. Emotional animals, zero humans. Flavor anchor: "Zorros del Lazo" — archetype: Pareja de bosque. Visual scale: small-scale focal subject, humble readable silhouette, subtle elemental hints, modest presence — not epic, keep detail clear not cluttered. Element theme: love — color direction: soft rose, warm pink-gold light, gentle harmonious glow. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c1_09 — Elegido 1-09

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c1_09` |
| **Nivel** | 1 |
| **Elemento (`type`)** | Energía (`energy`) |
| **Rareza (JSON)** | `uncommon` |
| **Ciclo por nivel** | energy (9/10 del ciclo de nivel) |
| **Nombre sugerido** | Margaritas Tesla |
| **Clase / arquetipo** | Flores de bobina |
| **Formato (silueta)** | Plantas eléctricas |
| **Voz / descripción** | «Pétalos que zumban.» |
| **Paleta (elemento)** | electric yellow and violet arcs, high-contrast neon accents |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Meadow where daisy centers are tiny Tesla coils with safe cute arcs, green stems, stormcloud far away. Whimsical electric nature. Flavor anchor: "Margaritas Tesla" — archetype: Flores de bobina. Visual scale: small-scale focal subject, humble readable silhouette, subtle elemental hints, modest presence — not epic, keep detail clear not cluttered. Element theme: energy — color direction: electric yellow and violet arcs, high-contrast neon accents. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c1_10 — Elegido 1-10

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c1_10` |
| **Nivel** | 1 |
| **Elemento (`type`)** | Luz (`light`) |
| **Rareza (JSON)** | `rare` |
| **Ciclo por nivel** | light (10/10 del ciclo de nivel) |
| **Nombre sugerido** | Caracol Prisma |
| **Clase / arquetipo** | Molusco arcoíris |
| **Formato (silueta)** | Animal luz |
| **Voz / descripción** | «Lento pero espectro.» |
| **Paleta (elemento)** | radiant gold and white, soft lens flare, luminous ethereal mood |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Giant snail shell made of faceted prism glass, slow rainbow caustics on moss rock. Crystal mollusk still-life. Flavor anchor: "Caracol Prisma" — archetype: Molusco arcoíris. Visual scale: small-scale focal subject, humble readable silhouette, subtle elemental hints, modest presence — not epic, keep detail clear not cluttered. Element theme: light — color direction: radiant gold and white, soft lens flare, luminous ethereal mood. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c1_11 — Elegido 1-11

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c1_11` |
| **Nivel** | 1 |
| **Elemento (`type`)** | Naturaleza (`nature`) |
| **Rareza (JSON)** | `common` |
| **Ciclo por nivel** | nature (1/10 del ciclo de nivel) |
| **Nombre sugerido** | Lotos de Obsidiana |
| **Clase / arquetipo** | Flotadores de lava |
| **Formato (silueta)** | Placas volcánicas |
| **Voz / descripción** | «Florecemos donde arde el lago.» |
| **Paleta (elemento)** | dominant natural greens, moss and leaf tones, soft bark browns as accents |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Wide obsidian lily pads with molten orange cracks, floating on a calm lava lake, steam curls. Optional small fireflies or sparks — still no humanoid, focus on alien botany. Flavor anchor: "Lotos de Obsidiana" — archetype: Flotadores de lava. Visual scale: small-scale focal subject, humble readable silhouette, subtle elemental hints, modest presence — not epic, keep detail clear not cluttered. Element theme: nature — color direction: dominant natural greens, moss and leaf tones, soft bark browns as accents. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c1_12 — Elegido 1-12

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c1_12` |
| **Nivel** | 1 |
| **Elemento (`type`)** | Agua (`water`) |
| **Rareza (JSON)** | `common` |
| **Ciclo por nivel** | water (2/10 del ciclo de nivel) |
| **Nombre sugerido** | Manta de Nutrias |
| **Clase / arquetipo** | Balsa de estrellas |
| **Formato (silueta)** | Grupo de animales |
| **Voz / descripción** | «El cielo se nos pegó al pelo.» |
| **Paleta (elemento)** | dominant deep blues and teals, aqua highlights, cool reflective light |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): A raft of sea otters holding paws, starlight reflecting on wet fur and calm water, one kelp strand garland. Cute but painterly fantasy, no people. Flavor anchor: "Manta de Nutrias" — archetype: Balsa de estrellas. Visual scale: small-scale focal subject, humble readable silhouette, subtle elemental hints, modest presence — not epic, keep detail clear not cluttered. Element theme: water — color direction: dominant deep blues and teals, aqua highlights, cool reflective light. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c1_13 — Elegido 1-13

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c1_13` |
| **Nivel** | 1 |
| **Elemento (`type`)** | Alienígena (`alien`) |
| **Rareza (JSON)** | `common` |
| **Ciclo por nivel** | alien (3/10 del ciclo de nivel) |
| **Nombre sugerido** | Calamar Criogénico |
| **Clase / arquetipo** | Nube de tentáculos |
| **Formato (silueta)** | Criatura etérea |
| **Voz / descripción** | «Helamos lo que tocamos.» |
| **Paleta (elemento)** | otherworldly purples, teals, bioluminescent accents, strange atmosphere |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Translucent cryo-squid made of mist and ice crystals, tentacles dissolving into cloud, teal and white. Ethereal beast, not human-shaped. Flavor anchor: "Calamar Criogénico" — archetype: Nube de tentáculos. Visual scale: small-scale focal subject, humble readable silhouette, subtle elemental hints, modest presence — not epic, keep detail clear not cluttered. Element theme: alien — color direction: otherworldly purples, teals, bioluminescent accents, strange atmosphere. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c1_14 — Elegido 1-14

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c1_14` |
| **Nivel** | 1 |
| **Elemento (`type`)** | Aire (`air`) |
| **Rareza (JSON)** | `common` |
| **Ciclo por nivel** | air (4/10 del ciclo de nivel) |
| **Nombre sugerido** | Polilla de Escarcha |
| **Clase / arquetipo** | Gigante nocturno |
| **Formato (silueta)** | Insecto |
| **Voz / descripción** | «Mis alas son ventisca.» |
| **Paleta (elemento)** | airy silvers, sky blues, white wisps, light and translucent feeling |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Single huge moth with frost-pattern wings perched on a dead branch, moon behind, breath-like cold mist. Winter air totem. Flavor anchor: "Polilla de Escarcha" — archetype: Gigante nocturno. Visual scale: small-scale focal subject, humble readable silhouette, subtle elemental hints, modest presence — not epic, keep detail clear not cluttered. Element theme: air — color direction: airy silvers, sky blues, white wisps, light and translucent feeling. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c1_15 — Elegido 1-15

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c1_15` |
| **Nivel** | 1 |
| **Elemento (`type`)** | Fuego (`fire`) |
| **Rareza (JSON)** | `common` |
| **Ciclo por nivel** | fire (5/10 del ciclo de nivel) |
| **Nombre sugerido** | Espiral de Chispas |
| **Clase / arquetipo** | Polillas de ceniza |
| **Formato (silueta)** | Enjambre ígneo |
| **Voz / descripción** | «Danza corta, brillo largo.» |
| **Paleta (elemento)** | strong orange and ember red, warm highlights, subtle smoke wisps |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Spiral of ash moths leaving bright trails in night, ember bokeh. Insect fire ballet, no humanoid center. Flavor anchor: "Espiral de Chispas" — archetype: Polillas de ceniza. Visual scale: small-scale focal subject, humble readable silhouette, subtle elemental hints, modest presence — not epic, keep detail clear not cluttered. Element theme: fire — color direction: strong orange and ember red, warm highlights, subtle smoke wisps. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c1_16 — Elegido 1-16

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c1_16` |
| **Nivel** | 1 |
| **Elemento (`type`)** | Tierra (`earth`) |
| **Rareza (JSON)** | `common` |
| **Ciclo por nivel** | earth (6/10 del ciclo de nivel) |
| **Nombre sugerido** | Rebaño de Rolas |
| **Clase / arquetipo** | Rocas con musgo |
| **Formato (silueta)** | Rocas animadas |
| **Voz / descripción** | «Pastamos lentitud.» |
| **Paleta (elemento)** | ochre, stone gray, clay brown, grounded dusty tones |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Mossy round boulders on a slope with trails like sheep paths, one boulder mid-roll kicking dust. Gentle earth spirits implied by motion, not human. Flavor anchor: "Rebaño de Rolas" — archetype: Rocas con musgo. Visual scale: small-scale focal subject, humble readable silhouette, subtle elemental hints, modest presence — not epic, keep detail clear not cluttered. Element theme: earth — color direction: ochre, stone gray, clay brown, grounded dusty tones. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c1_17 — Elegido 1-17

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c1_17` |
| **Nivel** | 1 |
| **Elemento (`type`)** | Metal (`metal`) |
| **Rareza (JSON)** | `uncommon` |
| **Ciclo por nivel** | metal (7/10 del ciclo de nivel) |
| **Nombre sugerido** | Bosque de Clavos |
| **Clase / arquetipo** | Catedral chatarra |
| **Formato (silueta)** | Chatarra monumental |
| **Voz / descripción** | «Oramos oxidación.» |
| **Paleta (elemento)** | steel silver, bronze or iron reflections, cool metallic highlights |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Forest of giant rusted nails driven upward like stalagmites, fog, crow silhouettes optional. Post-industrial fantasy shrine, no human. Flavor anchor: "Bosque de Clavos" — archetype: Catedral chatarra. Visual scale: small-scale focal subject, humble readable silhouette, subtle elemental hints, modest presence — not epic, keep detail clear not cluttered. Element theme: metal — color direction: steel silver, bronze or iron reflections, cool metallic highlights. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c1_18 — Elegido 1-18

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c1_18` |
| **Nivel** | 1 |
| **Elemento (`type`)** | Amor (`love`) |
| **Rareza (JSON)** | `uncommon` |
| **Ciclo por nivel** | love (8/10 del ciclo de nivel) |
| **Nombre sugerido** | Elefantes Luna |
| **Clase / arquetipo** | Familia de tacto |
| **Formato (silueta)** | Animales |
| **Voz / descripción** | «Nuestras trompas se saludan.» |
| **Paleta (elemento)** | soft rose, warm pink-gold light, gentle harmonious glow |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Adult elephant and calf touching trunks under huge moon, savanna grass silver, dust motes. Tender animal portrait. Flavor anchor: "Elefantes Luna" — archetype: Familia de tacto. Visual scale: small-scale focal subject, humble readable silhouette, subtle elemental hints, modest presence — not epic, keep detail clear not cluttered. Element theme: love — color direction: soft rose, warm pink-gold light, gentle harmonious glow. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c1_19 — Elegido 1-19

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c1_19` |
| **Nivel** | 1 |
| **Elemento (`type`)** | Energía (`energy`) |
| **Rareza (JSON)** | `uncommon` |
| **Ciclo por nivel** | energy (9/10 del ciclo de nivel) |
| **Nombre sugerido** | Flor Parabólica |
| **Clase / arquetipo** | Antena orgánica |
| **Formato (silueta)** | Planta antena |
| **Voz / descripción** | «Escuchamos estrellas baratas.» |
| **Paleta (elemento)** | electric yellow and violet arcs, high-contrast neon accents |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Flower like satellite dish petal array rotating slightly, hummingbirds as static sparks optional. Garden sci-fantasy. Flavor anchor: "Flor Parabólica" — archetype: Antena orgánica. Visual scale: small-scale focal subject, humble readable silhouette, subtle elemental hints, modest presence — not epic, keep detail clear not cluttered. Element theme: energy — color direction: electric yellow and violet arcs, high-contrast neon accents. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c1_20 — Elegido 1-20

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c1_20` |
| **Nivel** | 1 |
| **Elemento (`type`)** | Luz (`light`) |
| **Rareza (JSON)** | `rare` |
| **Ciclo por nivel** | light (10/10 del ciclo de nivel) |
| **Nombre sugerido** | Catedral Cera |
| **Clase / arquetipo** | Velas monumentales |
| **Formato (silueta)** | Cera y llama |
| **Voz / descripción** | «Goteamos oración caliente.» |
| **Paleta (elemento)** | radiant gold and white, soft lens flare, luminous ethereal mood |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Forest of giant melting candles forming column shapes, warm glow, wax rivers. Indoor temple mood without people. Flavor anchor: "Catedral Cera" — archetype: Velas monumentales. Visual scale: small-scale focal subject, humble readable silhouette, subtle elemental hints, modest presence — not epic, keep detail clear not cluttered. Element theme: light — color direction: radiant gold and white, soft lens flare, luminous ethereal mood. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c2_01 — Elegido 2-01

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c2_01` |
| **Nivel** | 2 |
| **Elemento (`type`)** | Naturaleza (`nature`) |
| **Rareza (JSON)** | `common` |
| **Ciclo por nivel** | nature (1/10 del ciclo de nivel) |
| **Nombre sugerido** | Campanilla de Marea |
| **Clase / arquetipo** | Artefacto coralino |
| **Formato (silueta)** | Objeto orgánico |
| **Voz / descripción** | «Toco y el arrecife despierta.» |
| **Paleta (elemento)** | dominant natural greens, moss and leaf tones, soft bark browns as accents |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): An ancient bronze bell completely overgrown with barnacles and soft corals, resting on a wet black tide rock. Tiny bioluminescent anemones pulse around its rim. Night beach mood, splash hints, no human figure. Flavor anchor: "Campanilla de Marea" — archetype: Artefacto coralino. Visual scale: clearer elemental motif, richer materials and textures, growing intensity — still a believable “rising” tier, not a final boss. Element theme: nature — color direction: dominant natural greens, moss and leaf tones, soft bark browns as accents. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c2_02 — Elegido 2-02

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c2_02` |
| **Nivel** | 2 |
| **Elemento (`type`)** | Agua (`water`) |
| **Rareza (JSON)** | `common` |
| **Ciclo por nivel** | water (2/10 del ciclo de nivel) |
| **Nombre sugerido** | Nebulosa Krill |
| **Clase / arquetipo** | Nube de plancton |
| **Formato (silueta)** | Masa viva abstracta |
| **Voz / descripción** | «Somos polvo de galaxia mojada.» |
| **Paleta (elemento)** | dominant deep blues and teals, aqua highlights, cool reflective light |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Billions of tiny krill / plankton lit from below so the swarm reads like a nebula cloud in water, subtle jaws and eyes only as texture — vast scale, no protagonist person. Flavor anchor: "Nebulosa Krill" — archetype: Nube de plancton. Visual scale: clearer elemental motif, richer materials and textures, growing intensity — still a believable “rising” tier, not a final boss. Element theme: water — color direction: dominant deep blues and teals, aqua highlights, cool reflective light. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c2_03 — Elegido 2-03

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c2_03` |
| **Nivel** | 2 |
| **Elemento (`type`)** | Alienígena (`alien`) |
| **Rareza (JSON)** | `common` |
| **Ciclo por nivel** | alien (3/10 del ciclo de nivel) |
| **Nombre sugerido** | Coral Silícico |
| **Clase / arquetipo** | Cerebro de cristal |
| **Formato (silueta)** | Crecimiento mineral |
| **Voz / descripción** | «Pensamos en frío.» |
| **Paleta (elemento)** | otherworldly purples, teals, bioluminescent accents, strange atmosphere |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Brain-shaped silicate coral growth on alien shore, faceted like quartz, inner pink light veins. Organic crystal, unsettling, zero humanoids. Flavor anchor: "Coral Silícico" — archetype: Cerebro de cristal. Visual scale: clearer elemental motif, richer materials and textures, growing intensity — still a believable “rising” tier, not a final boss. Element theme: alien — color direction: otherworldly purples, teals, bioluminescent accents, strange atmosphere. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c2_04 — Elegido 2-04

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c2_04` |
| **Nivel** | 2 |
| **Elemento (`type`)** | Aire (`air`) |
| **Rareza (JSON)** | `common` |
| **Ciclo por nivel** | air (4/10 del ciclo de nivel) |
| **Nombre sugerido** | Corona de Granizo |
| **Clase / arquetipo** | Anillo helado |
| **Formato (silueta)** | Objeto flotante |
| **Voz / descripción** | «Llevamos el invierno en círculo.» |
| **Paleta (elemento)** | airy silvers, sky blues, white wisps, light and translucent feeling |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): A hovering crown-like ring made of fused hailstones and ice crystals, inner glow, soft cloud pillow below. Jewelry-scale weather artifact. Flavor anchor: "Corona de Granizo" — archetype: Anillo helado. Visual scale: clearer elemental motif, richer materials and textures, growing intensity — still a believable “rising” tier, not a final boss. Element theme: air — color direction: airy silvers, sky blues, white wisps, light and translucent feeling. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c2_05 — Elegido 2-05

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c2_05` |
| **Nivel** | 2 |
| **Elemento (`type`)** | Fuego (`fire`) |
| **Rareza (JSON)** | `common` |
| **Ciclo por nivel** | fire (5/10 del ciclo de nivel) |
| **Nombre sugerido** | Dragón de Fuelle |
| **Clase / arquetipo** | Bestia de fragua |
| **Formato (silueta)** | Bestia herrera |
| **Voz / descripción** | «Soplo y nace el filo.» |
| **Paleta (elemento)** | strong orange and ember red, warm highlights, subtle smoke wisps |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Stocky forge beast: leather bellows body, brass plates, mouth blowing focused flame onto an anvil — face is snout not human. Workshop guardian animal. Flavor anchor: "Dragón de Fuelle" — archetype: Bestia de fragua. Visual scale: clearer elemental motif, richer materials and textures, growing intensity — still a believable “rising” tier, not a final boss. Element theme: fire — color direction: strong orange and ember red, warm highlights, subtle smoke wisps. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c2_06 — Elegido 2-06

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c2_06` |
| **Nivel** | 2 |
| **Elemento (`type`)** | Tierra (`earth`) |
| **Rareza (JSON)** | `common` |
| **Ciclo por nivel** | earth (6/10 del ciclo de nivel) |
| **Nombre sugerido** | Madriguera Terracota |
| **Clase / arquetipo** | Túneles de arcilla |
| **Formato (silueta)** | Corte transversal |
| **Voz / descripción** | «Conejos de barro.» |
| **Paleta (elemento)** | ochre, stone gray, clay brown, grounded dusty tones |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Cross-section cutaway of clay hill showing rabbit warren tunnels lined with terracotta bricks, tiny ceramic rabbits. Whimsical earth architecture. Flavor anchor: "Madriguera Terracota" — archetype: Túneles de arcilla. Visual scale: clearer elemental motif, richer materials and textures, growing intensity — still a believable “rising” tier, not a final boss. Element theme: earth — color direction: ochre, stone gray, clay brown, grounded dusty tones. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c2_07 — Elegido 2-07

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c2_07` |
| **Nivel** | 2 |
| **Elemento (`type`)** | Metal (`metal`) |
| **Rareza (JSON)** | `uncommon` |
| **Ciclo por nivel** | metal (7/10 del ciclo de nivel) |
| **Nombre sugerido** | Pájaros de Cobre |
| **Clase / arquetipo** | Autómatas menores |
| **Formato (silueta)** | Mini robots |
| **Voz / descripción** | «Volamos con tic-tac.» |
| **Paleta (elemento)** | steel silver, bronze or iron reflections, cool metallic highlights |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Flock of small copper leaf-shaped automatons with bird silhouettes, perched on iron branch, delicate clockwork. Cute mechanical wildlife. Flavor anchor: "Pájaros de Cobre" — archetype: Autómatas menores. Visual scale: clearer elemental motif, richer materials and textures, growing intensity — still a believable “rising” tier, not a final boss. Element theme: metal — color direction: steel silver, bronze or iron reflections, cool metallic highlights. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c2_08 — Elegido 2-08

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c2_08` |
| **Nivel** | 2 |
| **Elemento (`type`)** | Amor (`love`) |
| **Rareza (JSON)** | `uncommon` |
| **Ciclo por nivel** | love (8/10 del ciclo de nivel) |
| **Nombre sugerido** | Nido Corazón |
| **Clase / arquetipo** | Cuna de ramas |
| **Formato (silueta)** | Nido simbólico |
| **Voz / descripción** | «Latimos en huevo.» |
| **Paleta (elemento)** | soft rose, warm pink-gold light, gentle harmonious glow |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Heart-shaped nest woven from twigs with three speckled eggs glowing faintly inside, morning light. Gentle symbol of care. Flavor anchor: "Nido Corazón" — archetype: Cuna de ramas. Visual scale: clearer elemental motif, richer materials and textures, growing intensity — still a believable “rising” tier, not a final boss. Element theme: love — color direction: soft rose, warm pink-gold light, gentle harmonious glow. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c2_09 — Elegido 2-09

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c2_09` |
| **Nivel** | 2 |
| **Elemento (`type`)** | Energía (`energy`) |
| **Rareza (JSON)** | `uncommon` |
| **Ciclo por nivel** | energy (9/10 del ciclo de nivel) |
| **Nombre sugerido** | Escarabajos Pila |
| **Clase / arquetipo** | Enjambre cargado |
| **Formato (silueta)** | Insectos |
| **Voz / descripción** | «Brillamos con porcentaje.» |
| **Paleta (elemento)** | electric yellow and violet arcs, high-contrast neon accents |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Beetles with glowing battery-shell backs marching in circuit-board patterns on concrete, neon trails. Tech-insect swarm. Flavor anchor: "Escarabajos Pila" — archetype: Enjambre cargado. Visual scale: clearer elemental motif, richer materials and textures, growing intensity — still a believable “rising” tier, not a final boss. Element theme: energy — color direction: electric yellow and violet arcs, high-contrast neon accents. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c2_10 — Elegido 2-10

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c2_10` |
| **Nivel** | 2 |
| **Elemento (`type`)** | Luz (`light`) |
| **Rareza (JSON)** | `rare` |
| **Ciclo por nivel** | light (10/10 del ciclo de nivel) |
| **Nombre sugerido** | Escarabajos Espejo |
| **Clase / arquetipo** | Enjambre brillante |
| **Formato (silueta)** | Insectos |
| **Voz / descripción** | «Reflejamos todo menos miedo.» |
| **Paleta (elemento)** | radiant gold and white, soft lens flare, luminous ethereal mood |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Swarm of mirror beetles exploding into glitter cloud, sunbeam, each beetle a tiny sharp reflection. Dazzling insect burst. Flavor anchor: "Escarabajos Espejo" — archetype: Enjambre brillante. Visual scale: clearer elemental motif, richer materials and textures, growing intensity — still a believable “rising” tier, not a final boss. Element theme: light — color direction: radiant gold and white, soft lens flare, luminous ethereal mood. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c2_11 — Elegido 2-11

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c2_11` |
| **Nivel** | 2 |
| **Elemento (`type`)** | Naturaleza (`nature`) |
| **Rareza (JSON)** | `common` |
| **Ciclo por nivel** | nature (1/10 del ciclo de nivel) |
| **Nombre sugerido** | Helecho Hielofuego |
| **Clase / arquetipo** | Frontera de elementos |
| **Formato (silueta)** | Planta dual |
| **Voz / descripción** | «Cada punta discute con su vecina.» |
| **Paleta (elemento)** | dominant natural greens, moss and leaf tones, soft bark browns as accents |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): A fern whose fronds split visually: one side rimed with frost crystals, the other glowing ember-orange, growing from misty volcanic soil. Surreal but readable single plant subject. Flavor anchor: "Helecho Hielofuego" — archetype: Frontera de elementos. Visual scale: clearer elemental motif, richer materials and textures, growing intensity — still a believable “rising” tier, not a final boss. Element theme: nature — color direction: dominant natural greens, moss and leaf tones, soft bark browns as accents. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c2_12 — Elegido 2-12

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c2_12` |
| **Nivel** | 2 |
| **Elemento (`type`)** | Agua (`water`) |
| **Rareza (JSON)** | `common` |
| **Ciclo por nivel** | water (2/10 del ciclo de nivel) |
| **Nombre sugerido** | Rey Cangrejo Faro |
| **Clase / arquetipo** | Crustáceo de manglar |
| **Formato (silueta)** | Bestia gigante |
| **Voz / descripción** | «Mi caparazón es faro.» |
| **Paleta (elemento)** | dominant deep blues and teals, aqua highlights, cool reflective light |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): A huge crab with bioluminescent patterns on its shell among mangrove roots at night, claws raised gently, water mirrors glow. Insectoid/crustacean hero shot. Flavor anchor: "Rey Cangrejo Faro" — archetype: Crustáceo de manglar. Visual scale: clearer elemental motif, richer materials and textures, growing intensity — still a believable “rising” tier, not a final boss. Element theme: water — color direction: dominant deep blues and teals, aqua highlights, cool reflective light. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c2_13 — Elegido 2-13

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c2_13` |
| **Nivel** | 2 |
| **Elemento (`type`)** | Alienígena (`alien`) |
| **Rareza (JSON)** | `common` |
| **Ciclo por nivel** | alien (3/10 del ciclo de nivel) |
| **Nombre sugerido** | Polilla Obsidiana |
| **Clase / arquetipo** | Polvo de nebula |
| **Formato (silueta)** | Insecto gigante |
| **Voz / descripción** | «Polvo de estrella en alas.» |
| **Paleta (elemento)** | otherworldly purples, teals, bioluminescent accents, strange atmosphere |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Giant moth with obsidian shard wings dusted in star-like specks, eerie still pose on alien rock under twin moons. Insect idol shot. Flavor anchor: "Polilla Obsidiana" — archetype: Polvo de nebula. Visual scale: clearer elemental motif, richer materials and textures, growing intensity — still a believable “rising” tier, not a final boss. Element theme: alien — color direction: otherworldly purples, teals, bioluminescent accents, strange atmosphere. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c2_14 — Elegido 2-14

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c2_14` |
| **Nivel** | 2 |
| **Elemento (`type`)** | Aire (`air`) |
| **Rareza (JSON)** | `common` |
| **Ciclo por nivel** | air (4/10 del ciclo de nivel) |
| **Nombre sugerido** | Moretón Iris |
| **Clase / arquetipo** | Nube herida |
| **Formato (silueta)** | Nube anómala |
| **Voz / descripción** | «Lluvia con arcoíris febril.» |
| **Paleta (elemento)** | airy silvers, sky blues, white wisps, light and translucent feeling |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Storm cloud with a “bruise” of prismatic colors bleeding through dark gray, subtle rain curtain. Abstract weather portrait. Flavor anchor: "Moretón Iris" — archetype: Nube herida. Visual scale: clearer elemental motif, richer materials and textures, growing intensity — still a believable “rising” tier, not a final boss. Element theme: air — color direction: airy silvers, sky blues, white wisps, light and translucent feeling. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c2_15 — Elegido 2-15

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c2_15` |
| **Nivel** | 2 |
| **Elemento (`type`)** | Fuego (`fire`) |
| **Rareza (JSON)** | `common` |
| **Ciclo por nivel** | fire (5/10 del ciclo de nivel) |
| **Nombre sugerido** | Zorro de Ceniza |
| **Clase / arquetipo** | Tres colas de brasa |
| **Formato (silueta)** | Bestia mítica |
| **Voz / descripción** | «Corro y dejo mapas ardientes.» |
| **Paleta (elemento)** | strong orange and ember red, warm highlights, subtle smoke wisps |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Fox creature with three tails like smoke plumes tipped in hot coals, running across cracked basalt. Kitsune-adjacent but clearly beast. Flavor anchor: "Zorro de Ceniza" — archetype: Tres colas de brasa. Visual scale: clearer elemental motif, richer materials and textures, growing intensity — still a believable “rising” tier, not a final boss. Element theme: fire — color direction: strong orange and ember red, warm highlights, subtle smoke wisps. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c2_16 — Elegido 2-16

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c2_16` |
| **Nivel** | 2 |
| **Elemento (`type`)** | Tierra (`earth`) |
| **Rareza (JSON)** | `common` |
| **Ciclo por nivel** | earth (6/10 del ciclo de nivel) |
| **Nombre sugerido** | Fragmento Moai |
| **Clase / arquetipo** | Cabeza de piedra |
| **Formato (silueta)** | Estatua rota |
| **Voz / descripción** | «Medio rostro, memoria entera.» |
| **Paleta (elemento)** | ochre, stone gray, clay brown, grounded dusty tones |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Giant weathered stone head half buried in river mud, vines on cheek, water lapping. Monument fragment, not a living character. Flavor anchor: "Fragmento Moai" — archetype: Cabeza de piedra. Visual scale: clearer elemental motif, richer materials and textures, growing intensity — still a believable “rising” tier, not a final boss. Element theme: earth — color direction: ochre, stone gray, clay brown, grounded dusty tones. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c2_17 — Elegido 2-17

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c2_17` |
| **Nivel** | 2 |
| **Elemento (`type`)** | Metal (`metal`) |
| **Rareza (JSON)** | `uncommon` |
| **Ciclo por nivel** | metal (7/10 del ciclo de nivel) |
| **Nombre sugerido** | Almeja Navaja |
| **Clase / arquetipo** | Concha de acero |
| **Formato (silueta)** | Bivalvo metálico |
| **Voz / descripción** | «Abrir es peligro.» |
| **Paleta (elemento)** | steel silver, bronze or iron reflections, cool metallic highlights |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Giant steel razor clam half open, pearl inside is a ball bearing reflecting firefly LEDs. Still-life metal shell. Flavor anchor: "Almeja Navaja" — archetype: Concha de acero. Visual scale: clearer elemental motif, richer materials and textures, growing intensity — still a believable “rising” tier, not a final boss. Element theme: metal — color direction: steel silver, bronze or iron reflections, cool metallic highlights. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c2_18 — Elegido 2-18

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c2_18` |
| **Nivel** | 2 |
| **Elemento (`type`)** | Amor (`love`) |
| **Rareza (JSON)** | `uncommon` |
| **Ciclo por nivel** | love (8/10 del ciclo de nivel) |
| **Nombre sugerido** | Barco Farol |
| **Clase / arquetipo** | Papel y luz |
| **Formato (silueta)** | Objeto romántico |
| **Voz / descripción** | «Dos asientos, un río.» |
| **Paleta (elemento)** | soft rose, warm pink-gold light, gentle harmonious glow |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Tiny paper lantern boat with two candle hearts inside drifting on canal, reflections, old stone bridge blur. Object story, implied couple without showing humans. Flavor anchor: "Barco Farol" — archetype: Papel y luz. Visual scale: clearer elemental motif, richer materials and textures, growing intensity — still a believable “rising” tier, not a final boss. Element theme: love — color direction: soft rose, warm pink-gold light, gentle harmonious glow. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c2_19 — Elegido 2-19

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c2_19` |
| **Nivel** | 2 |
| **Elemento (`type`)** | Energía (`energy`) |
| **Rareza (JSON)** | `uncommon` |
| **Ciclo por nivel** | energy (9/10 del ciclo de nivel) |
| **Nombre sugerido** | Medusa Soldadura |
| **Clase / arquetipo** | Chispas gelatinosas |
| **Formato (silueta)** | Medusa industrial |
| **Voz / descripción** | «Abrazo corto, marca larga.» |
| **Paleta (elemento)** | electric yellow and violet arcs, high-contrast neon accents |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Jellyfish of molten sparks and wire tentacles in dark workshop, welding flicker light. Industrial magic beast. Flavor anchor: "Medusa Soldadura" — archetype: Chispas gelatinosas. Visual scale: clearer elemental motif, richer materials and textures, growing intensity — still a believable “rising” tier, not a final boss. Element theme: energy — color direction: electric yellow and violet arcs, high-contrast neon accents. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c2_20 — Elegido 2-20

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c2_20` |
| **Nivel** | 2 |
| **Elemento (`type`)** | Luz (`light`) |
| **Rareza (JSON)** | `rare` |
| **Ciclo por nivel** | light (10/10 del ciclo de nivel) |
| **Nombre sugerido** | Pez Abismo Dulce |
| **Clase / arquetipo** | Señuelo corazón |
| **Formato (silueta)** | Pez profundo |
| **Voz / descripción** | «Traigo luz a quien me mira.» |
| **Paleta (elemento)** | radiant gold and white, soft lens flare, luminous ethereal mood |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Deep-sea anglerfish but adorable, lure is glowing heart silhouette, soft pink biolum on black water. Light in darkness metaphor. Flavor anchor: "Pez Abismo Dulce" — archetype: Señuelo corazón. Visual scale: clearer elemental motif, richer materials and textures, growing intensity — still a believable “rising” tier, not a final boss. Element theme: light — color direction: radiant gold and white, soft lens flare, luminous ethereal mood. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c3_01 — Elegido 3-01

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c3_01` |
| **Nivel** | 3 |
| **Elemento (`type`)** | Naturaleza (`nature`) |
| **Rareza (JSON)** | `common` |
| **Ciclo por nivel** | nature (1/10 del ciclo de nivel) |
| **Nombre sugerido** | Orquídea Tormenta |
| **Clase / arquetipo** | Flor cimarrón eléctrica |
| **Formato (silueta)** | Planta heroica |
| **Voz / descripción** | «Bebo relámpago en silencio.» |
| **Paleta (elemento)** | dominant natural greens, moss and leaf tones, soft bark browns as accents |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): A towering orchid-like plant grafted to a lightning-charred tree trunk; glassy petals with faint internal sparks, roots gripping bark like claws. Stormy forest backdrop suggested, subject is purely botanical-monstrous. Flavor anchor: "Orquídea Tormenta" — archetype: Flor cimarrón eléctrica. Visual scale: bold silhouette, strong thematic read, visible mastery of the element — notable power, memorable mid-tier spectacle. Element theme: nature — color direction: dominant natural greens, moss and leaf tones, soft bark browns as accents. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c3_02 — Elegido 3-02

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c3_02` |
| **Nivel** | 3 |
| **Elemento (`type`)** | Agua (`water`) |
| **Rareza (JSON)** | `common` |
| **Ciclo por nivel** | water (2/10 del ciclo de nivel) |
| **Nombre sugerido** | Gólem de Quelpo |
| **Clase / arquetipo** | Guardián de arrecife |
| **Formato (silueta)** | Bestia rocosa |
| **Voz / descripción** | «Pesado como marea.» |
| **Paleta (elemento)** | dominant deep blues and teals, aqua highlights, cool reflective light |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): A stocky quadruped or ape-like golem made of barnacle stone, kelp dreadlocks, and shell plates; eyes like pearl lamps. Clearly creature-construct, not a human warrior. Flavor anchor: "Gólem de Quelpo" — archetype: Guardián de arrecife. Visual scale: bold silhouette, strong thematic read, visible mastery of the element — notable power, memorable mid-tier spectacle. Element theme: water — color direction: dominant deep blues and teals, aqua highlights, cool reflective light. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c3_03 — Elegido 3-03

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c3_03` |
| **Nivel** | 3 |
| **Elemento (`type`)** | Alienígena (`alien`) |
| **Rareza (JSON)** | `common` |
| **Ciclo por nivel** | alien (3/10 del ciclo de nivel) |
| **Nombre sugerido** | Jardín Plasma |
| **Clase / arquetipo** | Zarcillos vivos |
| **Formato (silueta)** | Plantas de energía |
| **Voz / descripción** | «Regamos con rayos suaves.» |
| **Paleta (elemento)** | otherworldly purples, teals, bioluminescent accents, strange atmosphere |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Floating garden of magenta plasma tendrils rooted in floating soil clumps, gentle arcs between buds. Sci-fantasy flora, not a person. Flavor anchor: "Jardín Plasma" — archetype: Zarcillos vivos. Visual scale: bold silhouette, strong thematic read, visible mastery of the element — notable power, memorable mid-tier spectacle. Element theme: alien — color direction: otherworldly purples, teals, bioluminescent accents, strange atmosphere. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c3_04 — Elegido 3-04

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c3_04` |
| **Nivel** | 3 |
| **Elemento (`type`)** | Aire (`air`) |
| **Rareza (JSON)** | `common` |
| **Ciclo por nivel** | air (4/10 del ciclo de nivel) |
| **Nombre sugerido** | Semilla de Tornado |
| **Clase / arquetipo** | Ojo en espiral |
| **Formato (silueta)** | Fenómeno |
| **Voz / descripción** | «Donde miro, gira el mundo.» |
| **Paleta (elemento)** | airy silvers, sky blues, white wisps, light and translucent feeling |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Tight tornado funnel with calm glowing eye, debris orbiting at safe painterly distance. Dynamic air elemental as place, not a wizard. Flavor anchor: "Semilla de Tornado" — archetype: Ojo en espiral. Visual scale: bold silhouette, strong thematic read, visible mastery of the element — notable power, memorable mid-tier spectacle. Element theme: air — color direction: airy silvers, sky blues, white wisps, light and translucent feeling. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c3_05 — Elegido 3-05

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c3_05` |
| **Nivel** | 3 |
| **Elemento (`type`)** | Fuego (`fire`) |
| **Rareza (JSON)** | `common` |
| **Ciclo por nivel** | fire (5/10 del ciclo de nivel) |
| **Nombre sugerido** | Medusas Magma |
| **Clase / arquetipo** | Flotadores de calor |
| **Formato (silueta)** | Criaturas gelatinosas |
| **Voz / descripción** | «Subimos como burbujas rojas.» |
| **Paleta (elemento)** | strong orange and ember red, warm highlights, subtle smoke wisps |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Jellyfish-like creatures of molten glass and dark crust, rising from lava crack, heat shimmer. Alien fire life. Flavor anchor: "Medusas Magma" — archetype: Flotadores de calor. Visual scale: bold silhouette, strong thematic read, visible mastery of the element — notable power, memorable mid-tier spectacle. Element theme: fire — color direction: strong orange and ember red, warm highlights, subtle smoke wisps. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c3_06 — Elegido 3-06

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c3_06` |
| **Nivel** | 3 |
| **Elemento (`type`)** | Tierra (`earth`) |
| **Rareza (JSON)** | `common` |
| **Ciclo por nivel** | earth (6/10 del ciclo de nivel) |
| **Nombre sugerido** | Ámbar Araña |
| **Clase / arquetipo** | Gota fósil |
| **Formato (silueta)** | Objeto fósil |
| **Voz / descripción** | «Atrapada en miel de tiempo.» |
| **Paleta (elemento)** | ochre, stone gray, clay brown, grounded dusty tones |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Huge translucent amber drop with prehistoric spider inside, backlit gold, bark texture behind. Macro treasure. Flavor anchor: "Ámbar Araña" — archetype: Gota fósil. Visual scale: bold silhouette, strong thematic read, visible mastery of the element — notable power, memorable mid-tier spectacle. Element theme: earth — color direction: ochre, stone gray, clay brown, grounded dusty tones. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c3_07 — Elegido 3-07

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c3_07` |
| **Nivel** | 3 |
| **Elemento (`type`)** | Metal (`metal`) |
| **Rareza (JSON)** | `uncommon` |
| **Ciclo por nivel** | metal (7/10 del ciclo de nivel) |
| **Nombre sugerido** | Serpiente Eslabón |
| **Clase / arquetipo** | Cadena consciente |
| **Formato (silueta)** | Bestia metal |
| **Voz / descripción** | «Aprieto sin prisa.» |
| **Paleta (elemento)** | steel silver, bronze or iron reflections, cool metallic highlights |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Serpent made of interlocking chainmail rings and razor scales, coiled around a rusty anchor, tongue a strip of heated steel. Flavor anchor: "Serpiente Eslabón" — archetype: Cadena consciente. Visual scale: bold silhouette, strong thematic read, visible mastery of the element — notable power, memorable mid-tier spectacle. Element theme: metal — color direction: steel silver, bronze or iron reflections, cool metallic highlights. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c3_08 — Elegido 3-08

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c3_08` |
| **Nivel** | 3 |
| **Elemento (`type`)** | Amor (`love`) |
| **Rareza (JSON)** | `uncommon` |
| **Ciclo por nivel** | love (8/10 del ciclo de nivel) |
| **Nombre sugerido** | Hilo Entre Robles |
| **Clase / arquetipo** | Vínculo visible |
| **Formato (silueta)** | Bosque encantado |
| **Voz / descripción** | «Dos troncos, un suspiro.» |
| **Paleta (elemento)** | soft rose, warm pink-gold light, gentle harmonious glow |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Two ancient oaks with crimson thread woven taut between trunks like a bridge, fireflies along the string. Romantic landscape magic. Flavor anchor: "Hilo Entre Robles" — archetype: Vínculo visible. Visual scale: bold silhouette, strong thematic read, visible mastery of the element — notable power, memorable mid-tier spectacle. Element theme: love — color direction: soft rose, warm pink-gold light, gentle harmonious glow. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c3_09 — Elegido 3-09

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c3_09` |
| **Nivel** | 3 |
| **Elemento (`type`)** | Energía (`energy`) |
| **Rareza (JSON)** | `uncommon` |
| **Ciclo por nivel** | energy (9/10 del ciclo de nivel) |
| **Nombre sugerido** | Anguila Neón |
| **Clase / arquetipo** | Cable vivo |
| **Formato (silueta)** | Pez eléctrico |
| **Voz / descripción** | «Nado en línea recta imposible.» |
| **Paleta (elemento)** | electric yellow and violet arcs, high-contrast neon accents |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Glowing neon eel weaving through suspended power lines like abstract sculpture, sparks, cyberpunk palette but fantasy tone. Flavor anchor: "Anguila Neón" — archetype: Cable vivo. Visual scale: bold silhouette, strong thematic read, visible mastery of the element — notable power, memorable mid-tier spectacle. Element theme: energy — color direction: electric yellow and violet arcs, high-contrast neon accents. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c3_10 — Elegido 3-10

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c3_10` |
| **Nivel** | 3 |
| **Elemento (`type`)** | Luz (`light`) |
| **Rareza (JSON)** | `rare` |
| **Ciclo por nivel** | light (10/10 del ciclo de nivel) |
| **Nombre sugerido** | Polilla Halo |
| **Clase / arquetipo** | Gigante sagrada |
| **Formato (silueta)** | Insecto luz |
| **Voz / descripción** | «Mi cabeza es anillo de luz.» |
| **Paleta (elemento)** | radiant gold and white, soft lens flare, luminous ethereal mood |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Huge moth with circular halo through its head pattern (negative space trick), stained-glass wing eyes, cathedral window light. Flavor anchor: "Polilla Halo" — archetype: Gigante sagrada. Visual scale: bold silhouette, strong thematic read, visible mastery of the element — notable power, memorable mid-tier spectacle. Element theme: light — color direction: radiant gold and white, soft lens flare, luminous ethereal mood. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c3_11 — Elegido 3-11

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c3_11` |
| **Nivel** | 3 |
| **Elemento (`type`)** | Naturaleza (`nature`) |
| **Rareza (JSON)** | `common` |
| **Ciclo por nivel** | nature (1/10 del ciclo de nivel) |
| **Nombre sugerido** | Liana Gravítica |
| **Clase / arquetipo** | Enredadera de piedra flotante |
| **Formato (silueta)** | Constructo vegetal |
| **Voz / descripción** | «Atamos lo que el cielo dejó caer.» |
| **Paleta (elemento)** | dominant natural greens, moss and leaf tones, soft bark browns as accents |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Thick braided vines spiraling upward, visibly tethering several hovering boulders; dust motes and leaves in suspension. The composition centers the vine-boulder knot, not a person. Flavor anchor: "Liana Gravítica" — archetype: Enredadera de piedra flotante. Visual scale: bold silhouette, strong thematic read, visible mastery of the element — notable power, memorable mid-tier spectacle. Element theme: nature — color direction: dominant natural greens, moss and leaf tones, soft bark browns as accents. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c3_12 — Elegido 3-12

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c3_12` |
| **Nivel** | 3 |
| **Elemento (`type`)** | Agua (`water`) |
| **Rareza (JSON)** | `common` |
| **Ciclo por nivel** | water (2/10 del ciclo de nivel) |
| **Nombre sugerido** | Arpa de Algas |
| **Clase / arquetipo** | Instrumento natural |
| **Formato (silueta)** | Objeto orgánico |
| **Voz / descripción** | «Las corrientes tocan acordes.» |
| **Paleta (elemento)** | dominant deep blues and teals, aqua highlights, cool reflective light |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Vertical kelp forest with taut golden seaweed “strings” like harp cables, a few fish swimming through as if plucking them. Artistic still-life energy underwater. Flavor anchor: "Arpa de Algas" — archetype: Instrumento natural. Visual scale: bold silhouette, strong thematic read, visible mastery of the element — notable power, memorable mid-tier spectacle. Element theme: water — color direction: dominant deep blues and teals, aqua highlights, cool reflective light. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c3_13 — Elegido 3-13

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c3_13` |
| **Nivel** | 3 |
| **Elemento (`type`)** | Alienígena (`alien`) |
| **Rareza (JSON)** | `common` |
| **Ciclo por nivel** | alien (3/10 del ciclo de nivel) |
| **Nombre sugerido** | Arbusto Gravedad |
| **Clase / arquetipo** | Bayas que doblan luz |
| **Formato (silueta)** | Planta anómala |
| **Voz / descripción** | «Los fotones tropiezan aquí.» |
| **Paleta (elemento)** | otherworldly purples, teals, bioluminescent accents, strange atmosphere |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Bush of heavy glowing berries bending light into arcs around it, grass leaning inward. Physics-warp plant, comic-book science fantasy. Flavor anchor: "Arbusto Gravedad" — archetype: Bayas que doblan luz. Visual scale: bold silhouette, strong thematic read, visible mastery of the element — notable power, memorable mid-tier spectacle. Element theme: alien — color direction: otherworldly purples, teals, bioluminescent accents, strange atmosphere. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c3_14 — Elegido 3-14

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c3_14` |
| **Nivel** | 3 |
| **Elemento (`type`)** | Aire (`air`) |
| **Rareza (JSON)** | `common` |
| **Ciclo por nivel** | air (4/10 del ciclo de nivel) |
| **Nombre sugerido** | Diablillo de Máscaras |
| **Clase / arquetipo** | Viento cargado |
| **Formato (silueta)** | Torbellino |
| **Voz / descripción** | «Giramos recuerdos tallados.» |
| **Paleta (elemento)** | airy silvers, sky blues, white wisps, light and translucent feeling |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Dust devil lifting carved wooden masks in spiral, desert grit sparkle. Cultural objects + wind, no human figure visible. Flavor anchor: "Diablillo de Máscaras" — archetype: Viento cargado. Visual scale: bold silhouette, strong thematic read, visible mastery of the element — notable power, memorable mid-tier spectacle. Element theme: air — color direction: airy silvers, sky blues, white wisps, light and translucent feeling. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c3_15 — Elegido 3-15

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c3_15` |
| **Nivel** | 3 |
| **Elemento (`type`)** | Fuego (`fire`) |
| **Rareza (JSON)** | `common` |
| **Ciclo por nivel** | fire (5/10 del ciclo de nivel) |
| **Nombre sugerido** | Gusano de Tubo Lava |
| **Clase / arquetipo** | Coloso tubular |
| **Formato (silueta)** | Gusano gigante |
| **Voz / descripción** | «Horado el mundo por dentro.» |
| **Paleta (elemento)** | strong orange and ember red, warm highlights, subtle smoke wisps |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Colossal lava tube worm segmented with cooling rock rings, mouth a glowing circular furnace, tunnel background. Monster worm portrait. Flavor anchor: "Gusano de Tubo Lava" — archetype: Coloso tubular. Visual scale: bold silhouette, strong thematic read, visible mastery of the element — notable power, memorable mid-tier spectacle. Element theme: fire — color direction: strong orange and ember red, warm highlights, subtle smoke wisps. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c3_16 — Elegido 3-16

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c3_16` |
| **Nivel** | 3 |
| **Elemento (`type`)** | Tierra (`earth`) |
| **Rareza (JSON)** | `common` |
| **Ciclo por nivel** | earth (6/10 del ciclo de nivel) |
| **Nombre sugerido** | Catedral de Hormigas |
| **Clase / arquetipo** | Torres de cuarzo |
| **Formato (silueta)** | Insectos constructores |
| **Voz / descripción** | «Granito en grano.» |
| **Paleta (elemento)** | ochre, stone gray, clay brown, grounded dusty tones |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Ants building spires from stacked quartz shards at desert edge, some towers already shin-high to viewer macro. Industrious wonder. Flavor anchor: "Catedral de Hormigas" — archetype: Torres de cuarzo. Visual scale: bold silhouette, strong thematic read, visible mastery of the element — notable power, memorable mid-tier spectacle. Element theme: earth — color direction: ochre, stone gray, clay brown, grounded dusty tones. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c3_17 — Elegido 3-17

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c3_17` |
| **Nivel** | 3 |
| **Elemento (`type`)** | Metal (`metal`) |
| **Rareza (JSON)** | `uncommon` |
| **Ciclo por nivel** | metal (7/10 del ciclo de nivel) |
| **Nombre sugerido** | Cangrejo Muelle |
| **Clase / arquetipo** | Mecanismo pinza |
| **Formato (silueta)** | Crustáceo mecánico |
| **Voz / descripción** | «Salto y aprieto.» |
| **Paleta (elemento)** | steel silver, bronze or iron reflections, cool metallic highlights |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Crab built from copper springs, cog claws, glass dome eyes with gears inside, on wet factory floor. Mechanical crustacean. Flavor anchor: "Cangrejo Muelle" — archetype: Mecanismo pinza. Visual scale: bold silhouette, strong thematic read, visible mastery of the element — notable power, memorable mid-tier spectacle. Element theme: metal — color direction: steel silver, bronze or iron reflections, cool metallic highlights. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c3_18 — Elegido 3-18

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c3_18` |
| **Nivel** | 3 |
| **Elemento (`type`)** | Amor (`love`) |
| **Rareza (JSON)** | `uncommon` |
| **Ciclo por nivel** | love (8/10 del ciclo de nivel) |
| **Nombre sugerido** | Granada Estrella |
| **Clase / arquetipo** | Fruta de promesa |
| **Formato (silueta)** | Bodegón mágico |
| **Voz / descripción** | «Cada semilla es voto.» |
| **Paleta (elemento)** | soft rose, warm pink-gold light, gentle harmonious glow |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Split pomegranate on marble with seeds like tiny glowing rubies arranged in spiral, soft rose light. Still-life symbol. Flavor anchor: "Granada Estrella" — archetype: Fruta de promesa. Visual scale: bold silhouette, strong thematic read, visible mastery of the element — notable power, memorable mid-tier spectacle. Element theme: love — color direction: soft rose, warm pink-gold light, gentle harmonious glow. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c3_19 — Elegido 3-19

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c3_19` |
| **Nivel** | 3 |
| **Elemento (`type`)** | Energía (`energy`) |
| **Rareza (JSON)** | `uncommon` |
| **Ciclo por nivel** | energy (9/10 del ciclo de nivel) |
| **Nombre sugerido** | Colibrí Tormenta |
| **Clase / arquetipo** | Ave de voltaje |
| **Formato (silueta)** | Ave eléctrica |
| **Voz / descripción** | «Bato alas y hay trueno.» |
| **Paleta (elemento)** | electric yellow and violet arcs, high-contrast neon accents |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Hummingbird with feathers like blue lightning bolts, motion blur rings, storm cloud backdrop. Small epic creature. Flavor anchor: "Colibrí Tormenta" — archetype: Ave de voltaje. Visual scale: bold silhouette, strong thematic read, visible mastery of the element — notable power, memorable mid-tier spectacle. Element theme: energy — color direction: electric yellow and violet arcs, high-contrast neon accents. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c3_20 — Elegido 3-20

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c3_20` |
| **Nivel** | 3 |
| **Elemento (`type`)** | Luz (`light`) |
| **Rareza (JSON)** | `rare` |
| **Ciclo por nivel** | light (10/10 del ciclo de nivel) |
| **Nombre sugerido** | Vela Solar |
| **Clase / arquetipo** | Semilla de vela |
| **Formato (silueta)** | Planta nave |
| **Voz / descripción** | «Navego fotones.» |
| **Paleta (elemento)** | radiant gold and white, soft lens flare, luminous ethereal mood |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Seed pod that opens into golden solar sail membranes, floating on clear sky gradient, minimalist epic. Plant spaceship. Flavor anchor: "Vela Solar" — archetype: Semilla de vela. Visual scale: bold silhouette, strong thematic read, visible mastery of the element — notable power, memorable mid-tier spectacle. Element theme: light — color direction: radiant gold and white, soft lens flare, luminous ethereal mood. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c4_01 — Elegido 4-01

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c4_01` |
| **Nivel** | 4 |
| **Elemento (`type`)** | Naturaleza (`nature`) |
| **Rareza (JSON)** | `common` |
| **Ciclo por nivel** | nature (1/10 del ciclo de nivel) |
| **Nombre sugerido** | Ojo de Pozas |
| **Clase / arquetipo** | Fósil en charca de granito |
| **Formato (silueta)** | Escena natural |
| **Voz / descripción** | «El tiempo quedó atrapado en círculo.» |
| **Paleta (elemento)** | dominant natural greens, moss and leaf tones, soft bark browns as accents |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): A perfect round granite tide pool (or mountain pool) like an eye: spiral ammonite fossil at the bottom, neon algae rings, a few translucent shrimp. Contemplative, no characters — nature as portrait. Flavor anchor: "Ojo de Pozas" — archetype: Fósil en charca de granito. Visual scale: majestic focal composition, intricate surfaces and effects — elite, almost mythic weight, still one primary subject. Element theme: nature — color direction: dominant natural greens, moss and leaf tones, soft bark browns as accents. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c4_02 — Elegido 4-02

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c4_02` |
| **Nivel** | 4 |
| **Elemento (`type`)** | Agua (`water`) |
| **Rareza (JSON)** | `common` |
| **Ciclo por nivel** | water (2/10 del ciclo de nivel) |
| **Nombre sugerido** | Tormenta Perla |
| **Clase / arquetipo** | Huracán de conchas |
| **Formato (silueta)** | Fenómeno marino |
| **Voz / descripción** | «Llueve dientes del mar.» |
| **Paleta (elemento)** | dominant deep blues and teals, aqua highlights, cool reflective light |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): A stylized underwater hurricane of swirling oyster shells and loose pearls, motion spiral, bioluminescent edges. Dynamic object-weather hybrid. Flavor anchor: "Tormenta Perla" — archetype: Huracán de conchas. Visual scale: majestic focal composition, intricate surfaces and effects — elite, almost mythic weight, still one primary subject. Element theme: water — color direction: dominant deep blues and teals, aqua highlights, cool reflective light. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c4_03 — Elegido 4-03

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c4_03` |
| **Nivel** | 4 |
| **Elemento (`type`)** | Alienígena (`alien`) |
| **Rareza (JSON)** | `common` |
| **Ciclo por nivel** | alien (3/10 del ciclo de nivel) |
| **Nombre sugerido** | Coro de Obeliscos |
| **Clase / arquetipo** | Piedras que cantan |
| **Formato (silueta)** | Monumentos alienígenas |
| **Voz / descripción** | «Vibramos la atmósfera.» |
| **Paleta (elemento)** | otherworldly purples, teals, bioluminescent accents, strange atmosphere |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Circle of slim black obelisks on cracked lilac ground, visible sound-wave distortions in air, dust rings. Mysterious tech-organic, no faces. Flavor anchor: "Coro de Obeliscos" — archetype: Piedras que cantan. Visual scale: majestic focal composition, intricate surfaces and effects — elite, almost mythic weight, still one primary subject. Element theme: alien — color direction: otherworldly purples, teals, bioluminescent accents, strange atmosphere. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c4_04 — Elegido 4-04

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c4_04` |
| **Nivel** | 4 |
| **Elemento (`type`)** | Aire (`air`) |
| **Rareza (JSON)** | `common` |
| **Ciclo por nivel** | air (4/10 del ciclo de nivel) |
| **Nombre sugerido** | Serpiente Aurora |
| **Clase / arquetipo** | Cinta de luz |
| **Formato (silueta)** | Aurora con forma |
| **Voz / descripción** | «Nado sin agua.» |
| **Paleta (elemento)** | airy silvers, sky blues, white wisps, light and translucent feeling |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Northern lights shaped deliberately like a long thin sky serpent, stars through translucent body. Atmospheric creature illusion. Flavor anchor: "Serpiente Aurora" — archetype: Cinta de luz. Visual scale: majestic focal composition, intricate surfaces and effects — elite, almost mythic weight, still one primary subject. Element theme: air — color direction: airy silvers, sky blues, white wisps, light and translucent feeling. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c4_05 — Elegido 4-05

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c4_05` |
| **Nivel** | 4 |
| **Elemento (`type`)** | Fuego (`fire`) |
| **Rareza (JSON)** | `common` |
| **Ciclo por nivel** | fire (5/10 del ciclo de nivel) |
| **Nombre sugerido** | Candelabro Volcánico |
| **Clase / arquetipo** | Goteo de piedra líquida |
| **Formato (silueta)** | Objeto volcánico |
| **Voz / descripción** | «Lujo peligroso.» |
| **Paleta (elemento)** | strong orange and ember red, warm highlights, subtle smoke wisps |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Chandelier formed from cooling lava drips frozen in time, hanging over obsidian floor, pockets of fire inside. Still-life epic. Flavor anchor: "Candelabro Volcánico" — archetype: Goteo de piedra líquida. Visual scale: majestic focal composition, intricate surfaces and effects — elite, almost mythic weight, still one primary subject. Element theme: fire — color direction: strong orange and ember red, warm highlights, subtle smoke wisps. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c4_06 — Elegido 4-06

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c4_06` |
| **Nivel** | 4 |
| **Elemento (`type`)** | Tierra (`earth`) |
| **Rareza (JSON)** | `common` |
| **Ciclo por nivel** | earth (6/10 del ciclo de nivel) |
| **Nombre sugerido** | Ojo Salino |
| **Clase / arquetipo** | Espejo del cielo |
| **Formato (silueta)** | Salinas |
| **Voz / descripción** | «El desierto parpadea.» |
| **Paleta (elemento)** | ochre, stone gray, clay brown, grounded dusty tones |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Salt flat reflecting sky but distorted into iris rings like a giant eye, subtle figure-eight horizon. Surreal landscape portrait. Flavor anchor: "Ojo Salino" — archetype: Espejo del cielo. Visual scale: majestic focal composition, intricate surfaces and effects — elite, almost mythic weight, still one primary subject. Element theme: earth — color direction: ochre, stone gray, clay brown, grounded dusty tones. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c4_07 — Elegido 4-07

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c4_07` |
| **Nivel** | 4 |
| **Elemento (`type`)** | Metal (`metal`) |
| **Rareza (JSON)** | `uncommon` |
| **Ciclo por nivel** | metal (7/10 del ciclo de nivel) |
| **Nombre sugerido** | Tortuga Yunque |
| **Clase / arquetipo** | Bestia forjada |
| **Formato (silueta)** | Bestia objeto |
| **Voz / descripción** | «Llevo el golpe en el lomo.» |
| **Paleta (elemento)** | steel silver, bronze or iron reflections, cool metallic highlights |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Tortoise whose shell is a blacksmith anvil with hammer resting on it, legs iron plates, sparks when it moves. Hybrid creature-tool. Flavor anchor: "Tortuga Yunque" — archetype: Bestia forjada. Visual scale: majestic focal composition, intricate surfaces and effects — elite, almost mythic weight, still one primary subject. Element theme: metal — color direction: steel silver, bronze or iron reflections, cool metallic highlights. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c4_08 — Elegido 4-08

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c4_08` |
| **Nivel** | 4 |
| **Elemento (`type`)** | Amor (`love`) |
| **Rareza (JSON)** | `uncommon` |
| **Ciclo por nivel** | love (8/10 del ciclo de nivel) |
| **Nombre sugerido** | Cisnes de Arco |
| **Clase / arquetipo** | Pareja acuática |
| **Formato (silueta)** | Aves |
| **Voz / descripción** | «Nuestros cuellos dibujan puerta.» |
| **Paleta (elemento)** | soft rose, warm pink-gold light, gentle harmonious glow |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Two swans on mirror lake forming almost a heart with necks, sunset ripples. Classic nature love image, painterly. Flavor anchor: "Cisnes de Arco" — archetype: Pareja acuática. Visual scale: majestic focal composition, intricate surfaces and effects — elite, almost mythic weight, still one primary subject. Element theme: love — color direction: soft rose, warm pink-gold light, gentle harmonious glow. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c4_09 — Elegido 4-09

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c4_09` |
| **Nivel** | 4 |
| **Elemento (`type`)** | Energía (`energy`) |
| **Rareza (JSON)** | `uncommon` |
| **Ciclo por nivel** | energy (9/10 del ciclo de nivel) |
| **Nombre sugerido** | Rebaño Relámpago |
| **Clase / arquetipo** | Esferas errantes |
| **Formato (silueta)** | Fenómeno |
| **Voz / descripción** | «Pastoreamos el cielo.» |
| **Paleta (elemento)** | electric yellow and violet arcs, high-contrast neon accents |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Herd of ball lightning spheres bouncing across salt flat leaving forked afterimages, violet and yellow. Weather-energy creatures. Flavor anchor: "Rebaño Relámpago" — archetype: Esferas errantes. Visual scale: majestic focal composition, intricate surfaces and effects — elite, almost mythic weight, still one primary subject. Element theme: energy — color direction: electric yellow and violet arcs, high-contrast neon accents. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c4_10 — Elegido 4-10

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c4_10` |
| **Nivel** | 4 |
| **Elemento (`type`)** | Luz (`light`) |
| **Rareza (JSON)** | `rare` |
| **Ciclo por nivel** | light (10/10 del ciclo de nivel) |
| **Nombre sugerido** | Mariposa Vitral |
| **Clase / arquetipo** | Fragmentos sagrados |
| **Formato (silueta)** | Mariposa cristal |
| **Voz / descripción** | «Vuelo con pedazos de iglesia.» |
| **Paleta (elemento)** | radiant gold and white, soft lens flare, luminous ethereal mood |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Butterfly wings of broken stained glass held together by gold foil, flying through ruined nave sunbeams. Object-creature beauty. Flavor anchor: "Mariposa Vitral" — archetype: Fragmentos sagrados. Visual scale: majestic focal composition, intricate surfaces and effects — elite, almost mythic weight, still one primary subject. Element theme: light — color direction: radiant gold and white, soft lens flare, luminous ethereal mood. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c4_11 — Elegido 4-11

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c4_11` |
| **Nivel** | 4 |
| **Elemento (`type`)** | Naturaleza (`nature`) |
| **Rareza (JSON)** | `common` |
| **Ciclo por nivel** | nature (1/10 del ciclo de nivel) |
| **Nombre sugerido** | Manto del Eclipse |
| **Clase / arquetipo** | Campo floral bajo luna negra |
| **Formato (silueta)** | Paisaje focal |
| **Voz / descripción** | «Somos pétalos de sombra.» |
| **Paleta (elemento)** | dominant natural greens, moss and leaf tones, soft bark browns as accents |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): A meadow of unusually tall flowers under a total eclipse; each bloom casts a thin crescent shadow on the ground. Dreamlike, painterly, no standing figure — the field is the “character”. Flavor anchor: "Manto del Eclipse" — archetype: Campo floral bajo luna negra. Visual scale: majestic focal composition, intricate surfaces and effects — elite, almost mythic weight, still one primary subject. Element theme: nature — color direction: dominant natural greens, moss and leaf tones, soft bark browns as accents. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c4_12 — Elegido 4-12

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c4_12` |
| **Nivel** | 4 |
| **Elemento (`type`)** | Agua (`water`) |
| **Rareza (JSON)** | `common` |
| **Ciclo por nivel** | water (2/10 del ciclo de nivel) |
| **Nombre sugerido** | Flor del Pecio |
| **Clase / arquetipo** | Anémonas en casco |
| **Formato (silueta)** | Arrecife sobre metal |
| **Voz / descripción** | «Del hierro viejo, pétalos.» |
| **Paleta (elemento)** | dominant deep blues and teals, aqua highlights, cool reflective light |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Shipwreck hull burst open like a flower of giant anemones and coral, fish darting. Rust and neon pink/purple contrast, no diver human. Flavor anchor: "Flor del Pecio" — archetype: Anémonas en casco. Visual scale: majestic focal composition, intricate surfaces and effects — elite, almost mythic weight, still one primary subject. Element theme: water — color direction: dominant deep blues and teals, aqua highlights, cool reflective light. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c4_13 — Elegido 4-13

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c4_13` |
| **Nivel** | 4 |
| **Elemento (`type`)** | Alienígena (`alien`) |
| **Rareza (JSON)** | `common` |
| **Ciclo por nivel** | alien (3/10 del ciclo de nivel) |
| **Nombre sugerido** | Jardín Singularidad |
| **Clase / arquetipo** | Perla negra |
| **Formato (silueta)** | Paisaje anómalo |
| **Voz / descripción** | «Todo inclina su cuello hacia mí.» |
| **Paleta (elemento)** | otherworldly purples, teals, bioluminescent accents, strange atmosphere |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Alien garden where stems curve toward a floating black pearl “singularity”, subtle lensing distortion, flowers stretched. Cosmic horror-lite, still no human. Flavor anchor: "Jardín Singularidad" — archetype: Perla negra. Visual scale: majestic focal composition, intricate surfaces and effects — elite, almost mythic weight, still one primary subject. Element theme: alien — color direction: otherworldly purples, teals, bioluminescent accents, strange atmosphere. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c4_14 — Elegido 4-14

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c4_14` |
| **Nivel** | 4 |
| **Elemento (`type`)** | Aire (`air`) |
| **Rareza (JSON)** | `common` |
| **Ciclo por nivel** | air (4/10 del ciclo de nivel) |
| **Nombre sugerido** | Roble Partido |
| **Clase / arquetipo** | Árbol relámpago |
| **Formato (silueta)** | Árbol heroico |
| **Voz / descripción** | «La cicatriz canta.» |
| **Paleta (elemento)** | airy silvers, sky blues, white wisps, light and translucent feeling |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Ancient oak split down middle by lightning, inner wood glowing like filament, leaves lifting. Nature monument, storm aftermath. Flavor anchor: "Roble Partido" — archetype: Árbol relámpago. Visual scale: majestic focal composition, intricate surfaces and effects — elite, almost mythic weight, still one primary subject. Element theme: air — color direction: airy silvers, sky blues, white wisps, light and translucent feeling. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c4_15 — Elegido 4-15

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c4_15` |
| **Nivel** | 4 |
| **Elemento (`type`)** | Fuego (`fire`) |
| **Rareza (JSON)** | `common` |
| **Ciclo por nivel** | fire (5/10 del ciclo de nivel) |
| **Nombre sugerido** | León de Mancha Solar |
| **Clase / arquetipo** | Bestia de llamarada |
| **Formato (silueta)** | Bestia solar |
| **Voz / descripción** | «Rujo y sube la temperatura.» |
| **Paleta (elemento)** | strong orange and ember red, warm highlights, subtle smoke wisps |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Lion silhouette built from solar flare ribbons and burning mane, eyes white-hot. Elemental beast god, not armored human. Flavor anchor: "León de Mancha Solar" — archetype: Bestia de llamarada. Visual scale: majestic focal composition, intricate surfaces and effects — elite, almost mythic weight, still one primary subject. Element theme: fire — color direction: strong orange and ember red, warm highlights, subtle smoke wisps. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c4_16 — Elegido 4-16

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c4_16` |
| **Nivel** | 4 |
| **Elemento (`type`)** | Tierra (`earth`) |
| **Rareza (JSON)** | `common` |
| **Ciclo por nivel** | earth (6/10 del ciclo de nivel) |
| **Nombre sugerido** | Setas de Hierro |
| **Clase / arquetipo** | Óxido y vida |
| **Formato (silueta)** | Hongos |
| **Voz / descripción** | «Comemos clavos viejos.» |
| **Paleta (elemento)** | ochre, stone gray, clay brown, grounded dusty tones |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Massive rust-colored bracket fungi growing from iron cliff scrap, oil-slick sheen, orange spores. Industrial nature fusion. Flavor anchor: "Setas de Hierro" — archetype: Óxido y vida. Visual scale: majestic focal composition, intricate surfaces and effects — elite, almost mythic weight, still one primary subject. Element theme: earth — color direction: ochre, stone gray, clay brown, grounded dusty tones. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c4_17 — Elegido 4-17

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c4_17` |
| **Nivel** | 4 |
| **Elemento (`type`)** | Metal (`metal`) |
| **Rareza (JSON)** | `uncommon` |
| **Ciclo por nivel** | metal (7/10 del ciclo de nivel) |
| **Nombre sugerido** | Lobo Damasco |
| **Clase / arquetipo** | Estatua filigrana |
| **Formato (silueta)** | Escultura |
| **Voz / descripción** | «Cada pelo es patrón.» |
| **Paleta (elemento)** | steel silver, bronze or iron reflections, cool metallic highlights |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Wolf statue of folded damascus steel patterns, edge glow along muscle lines, museum pedestal optional. Metal art creature. Flavor anchor: "Lobo Damasco" — archetype: Estatua filigrana. Visual scale: majestic focal composition, intricate surfaces and effects — elite, almost mythic weight, still one primary subject. Element theme: metal — color direction: steel silver, bronze or iron reflections, cool metallic highlights. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c4_18 — Elegido 4-18

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c4_18` |
| **Nivel** | 4 |
| **Elemento (`type`)** | Amor (`love`) |
| **Rareza (JSON)** | `uncommon` |
| **Ciclo por nivel** | love (8/10 del ciclo de nivel) |
| **Nombre sugerido** | Anillos del Roble |
| **Clase / arquetipo** | Tiempo crecido |
| **Formato (silueta)** | Árbol + objeto |
| **Voz / descripción** | «La corteza absorbió el juramento.» |
| **Paleta (elemento)** | soft rose, warm pink-gold light, gentle harmonious glow |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Old oak bark grown around two wedding rings embedded in wood, moss, fairy light specks. Time-love metaphor, no faces. Flavor anchor: "Anillos del Roble" — archetype: Tiempo crecido. Visual scale: majestic focal composition, intricate surfaces and effects — elite, almost mythic weight, still one primary subject. Element theme: love — color direction: soft rose, warm pink-gold light, gentle harmonious glow. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c4_19 — Elegido 4-19

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c4_19` |
| **Nivel** | 4 |
| **Elemento (`type`)** | Energía (`energy`) |
| **Rareza (JSON)** | `uncommon` |
| **Ciclo por nivel** | energy (9/10 del ciclo de nivel) |
| **Nombre sugerido** | Ciervo Bobina |
| **Clase / arquetipo** | Esqueleto magnético |
| **Formato (silueta)** | Bestia robótica |
| **Voz / descripción** | «Mis astas son espirales.» |
| **Paleta (elemento)** | electric yellow and violet arcs, high-contrast neon accents |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Deer silhouette formed from copper coils and glass insulators, arcs between antler tines, dark lab background. Construct animal. Flavor anchor: "Ciervo Bobina" — archetype: Esqueleto magnético. Visual scale: majestic focal composition, intricate surfaces and effects — elite, almost mythic weight, still one primary subject. Element theme: energy — color direction: electric yellow and violet arcs, high-contrast neon accents. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c4_20 — Elegido 4-20

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c4_20` |
| **Nivel** | 4 |
| **Elemento (`type`)** | Luz (`light`) |
| **Rareza (JSON)** | `rare` |
| **Ciclo por nivel** | light (10/10 del ciclo de nivel) |
| **Nombre sugerido** | Ojo de Tormenta |
| **Clase / arquetipo** | Claridad circular |
| **Formato (silueta)** | Cielo |
| **Voz / descripción** | «En el centro todo es quieto.» |
| **Paleta (elemento)** | radiant gold and white, soft lens flare, luminous ethereal mood |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Storm with perfect round eye of clear golden sunlight, clouds like dark petals around calm center. Sky mandala. Flavor anchor: "Ojo de Tormenta" — archetype: Claridad circular. Visual scale: majestic focal composition, intricate surfaces and effects — elite, almost mythic weight, still one primary subject. Element theme: light — color direction: radiant gold and white, soft lens flare, luminous ethereal mood. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c5_01 — Elegido 5-01

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c5_01` |
| **Nivel** | 5 |
| **Elemento (`type`)** | Naturaleza (`nature`) |
| **Rareza (JSON)** | `common` |
| **Ciclo por nivel** | nature (1/10 del ciclo de nivel) |
| **Nombre sugerido** | Ygg-spira |
| **Clase / arquetipo** | Monte-ammonita auroral |
| **Formato (silueta)** | Monumento viviente |
| **Voz / descripción** | «Mi espiral toca la aurora.» |
| **Paleta (elemento)** | dominant natural greens, moss and leaf tones, soft bark browns as accents |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): A colossal weathered ammonite spiral forming a small mountain ridge, cracks leaking soft aurora light and moss waterfalls. Epic scale, clearly non-humanoid geology-creature hybrid silhouette. Flavor anchor: "Ygg-spira" — archetype: Monte-ammonita auroral. Visual scale: legendary centerpiece, maximal elemental spectacle, awe-inspiring finale energy — one dominant focal, avoid muddy clutter. Element theme: nature — color direction: dominant natural greens, moss and leaf tones, soft bark browns as accents. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c5_02 — Elegido 5-02

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c5_02` |
| **Nivel** | 5 |
| **Elemento (`type`)** | Agua (`water`) |
| **Rareza (JSON)** | `common` |
| **Ciclo por nivel** | water (2/10 del ciclo de nivel) |
| **Nombre sugerido** | Nave Abisal |
| **Clase / arquetipo** | Ruina de vitral alga |
| **Formato (silueta)** | Arquitectura hundida |
| **Voz / descripción** | «Aquí rezaban las profundidades.» |
| **Paleta (elemento)** | dominant deep blues and teals, aqua highlights, cool reflective light |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Sunken cathedral ruin where “stained glass” is actually colored algae membranes in window frames, silty god-rays. Fish as small accents — focus architecture + water. Flavor anchor: "Nave Abisal" — archetype: Ruina de vitral alga. Visual scale: legendary centerpiece, maximal elemental spectacle, awe-inspiring finale energy — one dominant focal, avoid muddy clutter. Element theme: water — color direction: dominant deep blues and teals, aqua highlights, cool reflective light. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c5_03 — Elegido 5-03

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c5_03` |
| **Nivel** | 5 |
| **Elemento (`type`)** | Alienígena (`alien`) |
| **Rareza (JSON)** | `common` |
| **Ciclo por nivel** | alien (3/10 del ciclo de nivel) |
| **Nombre sugerido** | Anillo Fúngico |
| **Clase / arquetipo** | Planetoide podrido |
| **Formato (silueta)** | Cuerpo celeste pequeño |
| **Voz / descripción** | «Orbitamos esporas.» |
| **Paleta (elemento)** | otherworldly purples, teals, bioluminescent accents, strange atmosphere |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): A small planetoid that is mostly giant mushroom cap rings and mycelium atmosphere, stars close. Whimsical cosmic, silhouette like Saturn made of fungus. Flavor anchor: "Anillo Fúngico" — archetype: Planetoide podrido. Visual scale: legendary centerpiece, maximal elemental spectacle, awe-inspiring finale energy — one dominant focal, avoid muddy clutter. Element theme: alien — color direction: otherworldly purples, teals, bioluminescent accents, strange atmosphere. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c5_04 — Elegido 5-04

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c5_04` |
| **Nivel** | 5 |
| **Elemento (`type`)** | Aire (`air`) |
| **Rareza (JSON)** | `common` |
| **Ciclo por nivel** | air (4/10 del ciclo de nivel) |
| **Nombre sugerido** | Viñedo Celeste |
| **Clase / arquetipo** | Nubes entrenadas |
| **Formato (silueta)** | Paisaje aéreo |
| **Voz / descripción** | «Podamos el viento.» |
| **Paleta (elemento)** | airy silvers, sky blues, white wisps, light and translucent feeling |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Impossible trellises high in sky with cloud vines clipped into geometric shapes, golden hour light. Whimsical aerial garden, no people. Flavor anchor: "Viñedo Celeste" — archetype: Nubes entrenadas. Visual scale: legendary centerpiece, maximal elemental spectacle, awe-inspiring finale energy — one dominant focal, avoid muddy clutter. Element theme: air — color direction: airy silvers, sky blues, white wisps, light and translucent feeling. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c5_05 — Elegido 5-05

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c5_05` |
| **Nivel** | 5 |
| **Elemento (`type`)** | Fuego (`fire`) |
| **Rareza (JSON)** | `common` |
| **Ciclo por nivel** | fire (5/10 del ciclo de nivel) |
| **Nombre sugerido** | Árbol Hueco Solar |
| **Clase / arquetipo** | Fuego perpetuo |
| **Formato (silueta)** | Árbol ardiente |
| **Voz / descripción** | «El tronco es ventana al sol.» |
| **Paleta (elemento)** | strong orange and ember red, warm highlights, subtle smoke wisps |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Hollow dead tree trunk with eternal flame tornado gently spinning inside the cavity, ember leaves drifting. Mythic nature-fire. Flavor anchor: "Árbol Hueco Solar" — archetype: Fuego perpetuo. Visual scale: legendary centerpiece, maximal elemental spectacle, awe-inspiring finale energy — one dominant focal, avoid muddy clutter. Element theme: fire — color direction: strong orange and ember red, warm highlights, subtle smoke wisps. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c5_06 — Elegido 5-06

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c5_06` |
| **Nivel** | 5 |
| **Elemento (`type`)** | Tierra (`earth`) |
| **Rareza (JSON)** | `common` |
| **Ciclo por nivel** | earth (6/10 del ciclo de nivel) |
| **Nombre sugerido** | Boca Geoda |
| **Clase / arquetipo** | Cueva cristalina |
| **Formato (silueta)** | Cueva |
| **Voz / descripción** | «Dientes de cuarzo.» |
| **Paleta (elemento)** | ochre, stone gray, clay brown, grounded dusty tones |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Cave entrance framed like a mouth of purple amethyst “teeth”, glowing crystals inside throat darkness. Earth dragon mouth without dragon body. Flavor anchor: "Boca Geoda" — archetype: Cueva cristalina. Visual scale: legendary centerpiece, maximal elemental spectacle, awe-inspiring finale energy — one dominant focal, avoid muddy clutter. Element theme: earth — color direction: ochre, stone gray, clay brown, grounded dusty tones. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c5_07 — Elegido 5-07

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c5_07` |
| **Nivel** | 5 |
| **Elemento (`type`)** | Metal (`metal`) |
| **Rareza (JSON)** | `uncommon` |
| **Ciclo por nivel** | metal (7/10 del ciclo de nivel) |
| **Nombre sugerido** | Charco Mercurio |
| **Clase / arquetipo** | Hoja líquida |
| **Formato (silueta)** | Metal líquido |
| **Voz / descripción** | «Reflejo que corta.» |
| **Paleta (elemento)** | steel silver, bronze or iron reflections, cool metallic highlights |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Pool of liquid mercury slowly rising into a hovering blade shape, mirror reflections distorted, cool silver palette. Abstract metal spirit. Flavor anchor: "Charco Mercurio" — archetype: Hoja líquida. Visual scale: legendary centerpiece, maximal elemental spectacle, awe-inspiring finale energy — one dominant focal, avoid muddy clutter. Element theme: metal — color direction: steel silver, bronze or iron reflections, cool metallic highlights. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c5_08 — Elegido 5-08

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c5_08` |
| **Nivel** | 5 |
| **Elemento (`type`)** | Amor (`love`) |
| **Rareza (JSON)** | `uncommon` |
| **Ciclo por nivel** | love (8/10 del ciclo de nivel) |
| **Nombre sugerido** | Puerta Rosa |
| **Clase / arquetipo** | Ruina cubierta |
| **Formato (silueta)** | Arquitectura floral |
| **Voz / descripción** | «El amor también es muro roto.» |
| **Paleta (elemento)** | soft rose, warm pink-gold light, gentle harmonious glow |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Stone chapel arch completely swallowed by climbing roses, bell visible above, petals falling. Romantic ruin, no wedding people. Flavor anchor: "Puerta Rosa" — archetype: Ruina cubierta. Visual scale: legendary centerpiece, maximal elemental spectacle, awe-inspiring finale energy — one dominant focal, avoid muddy clutter. Element theme: love — color direction: soft rose, warm pink-gold light, gentle harmonious glow. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c5_09 — Elegido 5-09

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c5_09` |
| **Nivel** | 5 |
| **Elemento (`type`)** | Energía (`energy`) |
| **Rareza (JSON)** | `uncommon` |
| **Ciclo por nivel** | energy (9/10 del ciclo de nivel) |
| **Nombre sugerido** | Hongo Condensador |
| **Clase / arquetipo** | Seta de circuito |
| **Formato (silueta)** | Hongo tech |
| **Voz / descripción** | «Guardo el golpe para después.» |
| **Paleta (elemento)** | electric yellow and violet arcs, high-contrast neon accents |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Giant mushroom cap patterned like circuit traces, LED veins, roots into old server junk pile. Biotech still-life. Flavor anchor: "Hongo Condensador" — archetype: Seta de circuito. Visual scale: legendary centerpiece, maximal elemental spectacle, awe-inspiring finale energy — one dominant focal, avoid muddy clutter. Element theme: energy — color direction: electric yellow and violet arcs, high-contrast neon accents. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c5_10 — Elegido 5-10

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c5_10` |
| **Nivel** | 5 |
| **Elemento (`type`)** | Luz (`light`) |
| **Rareza (JSON)** | `rare` |
| **Ciclo por nivel** | light (10/10 del ciclo de nivel) |
| **Nombre sugerido** | Ramo Lente |
| **Clase / arquetipo** | Flores de flare |
| **Formato (silueta)** | Flores luz |
| **Voz / descripción** | «Pétalos queman suave.» |
| **Paleta (elemento)** | radiant gold and white, soft lens flare, luminous ethereal mood |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Bouquet where petals are soft lens-flare shapes and thin glass, stems chrome, pastel bloom. Abstract light flora. Flavor anchor: "Ramo Lente" — archetype: Flores de flare. Visual scale: legendary centerpiece, maximal elemental spectacle, awe-inspiring finale energy — one dominant focal, avoid muddy clutter. Element theme: light — color direction: radiant gold and white, soft lens flare, luminous ethereal mood. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c5_11 — Elegido 5-11

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c5_11` |
| **Nivel** | 5 |
| **Elemento (`type`)** | Naturaleza (`nature`) |
| **Rareza (JSON)** | `common` |
| **Ciclo por nivel** | nature (1/10 del ciclo de nivel) |
| **Nombre sugerido** | Corazón de Raíz |
| **Clase / arquetipo** | Nudo mundial |
| **Formato (silueta)** | Raíces colosales |
| **Voz / descripción** | «Latimos bajo todos los mapas.» |
| **Paleta (elemento)** | dominant natural greens, moss and leaf tones, soft bark browns as accents |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): A gigantic heart-shaped tangle of ancient roots pulsing with soft green bioluminescence underground chamber hinted. Legendary nature spirit implied by form only — no human face or knight. Flavor anchor: "Corazón de Raíz" — archetype: Nudo mundial. Visual scale: legendary centerpiece, maximal elemental spectacle, awe-inspiring finale energy — one dominant focal, avoid muddy clutter. Element theme: nature — color direction: dominant natural greens, moss and leaf tones, soft bark browns as accents. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c5_12 — Elegido 5-12

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c5_12` |
| **Nivel** | 5 |
| **Elemento (`type`)** | Agua (`water`) |
| **Rareza (JSON)** | `common` |
| **Ciclo por nivel** | water (2/10 del ciclo de nivel) |
| **Nombre sugerido** | Escala Leviatán |
| **Clase / arquetipo** | Fragmento colosal |
| **Formato (silueta)** | Objeto colosal |
| **Voz / descripción** | «Una sola teja del monstruo.» |
| **Paleta (elemento)** | dominant deep blues and teals, aqua highlights, cool reflective light |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): A single impossibly huge fish scale standing like a monolith in the surf, water cascading off iridescent surface, storm horizon. Mythic object, not a humanoid. Flavor anchor: "Escala Leviatán" — archetype: Fragmento colosal. Visual scale: legendary centerpiece, maximal elemental spectacle, awe-inspiring finale energy — one dominant focal, avoid muddy clutter. Element theme: water — color direction: dominant deep blues and teals, aqua highlights, cool reflective light. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c5_13 — Elegido 5-13

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c5_13` |
| **Nivel** | 5 |
| **Elemento (`type`)** | Alienígena (`alien`) |
| **Rareza (JSON)** | `common` |
| **Ciclo por nivel** | alien (3/10 del ciclo de nivel) |
| **Nombre sugerido** | Costa de Lunas Gemelas |
| **Clase / arquetipo** | Marea de rocas vivas |
| **Formato (silueta)** | Costa imposible |
| **Voz / descripción** | «Dos madres en el cielo.» |
| **Paleta (elemento)** | otherworldly purples, teals, bioluminescent accents, strange atmosphere |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Shoreline with two large moons, tide rocks that look like sleeping creatures, bioluminescent surf. Landscape as subject with subtle creature-shapes in stone. Flavor anchor: "Costa de Lunas Gemelas" — archetype: Marea de rocas vivas. Visual scale: legendary centerpiece, maximal elemental spectacle, awe-inspiring finale energy — one dominant focal, avoid muddy clutter. Element theme: alien — color direction: otherworldly purples, teals, bioluminescent accents, strange atmosphere. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c5_14 — Elegido 5-14

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c5_14` |
| **Nivel** | 5 |
| **Elemento (`type`)** | Aire (`air`) |
| **Rareza (JSON)** | `common` |
| **Ciclo por nivel** | air (4/10 del ciclo de nivel) |
| **Nombre sugerido** | Mural de Haboob |
| **Clase / arquetipo** | Pared de arena |
| **Formato (silueta)** | Tormenta de arena |
| **Voz / descripción** | «Historias dentro del polvo.» |
| **Paleta (elemento)** | airy silvers, sky blues, white wisps, light and translucent feeling |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Massive sand wall advancing, inside it faint luminous silhouettes of animals (wolf, bird, snake) like embedded fossils. Epic weather. Flavor anchor: "Mural de Haboob" — archetype: Pared de arena. Visual scale: legendary centerpiece, maximal elemental spectacle, awe-inspiring finale energy — one dominant focal, avoid muddy clutter. Element theme: air — color direction: airy silvers, sky blues, white wisps, light and translucent feeling. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c5_15 — Elegido 5-15

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c5_15` |
| **Nivel** | 5 |
| **Elemento (`type`)** | Fuego (`fire`) |
| **Rareza (JSON)** | `common` |
| **Ciclo por nivel** | fire (5/10 del ciclo de nivel) |
| **Nombre sugerido** | Titán de Caldera |
| **Clase / arquetipo** | Gólem fundido |
| **Formato (silueta)** | Gólem de lava |
| **Voz / descripción** | «Cada paso es nuevo lago.» |
| **Paleta (elemento)** | strong orange and ember red, warm highlights, subtle smoke wisps |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Hunched lava golem with cooling crust plates and molten seams, volcanic caldera backdrop, heat lightning. Broad shoulders but no human face — featureless magma helm or beast snout. Flavor anchor: "Titán de Caldera" — archetype: Gólem fundido. Visual scale: legendary centerpiece, maximal elemental spectacle, awe-inspiring finale energy — one dominant focal, avoid muddy clutter. Element theme: fire — color direction: strong orange and ember red, warm highlights, subtle smoke wisps. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c5_16 — Elegido 5-16

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c5_16` |
| **Nivel** | 5 |
| **Elemento (`type`)** | Tierra (`earth`) |
| **Rareza (JSON)** | `common` |
| **Ciclo por nivel** | earth (6/10 del ciclo de nivel) |
| **Nombre sugerido** | Caparazón Continental |
| **Clase / arquetipo** | Colinas curvas |
| **Formato (silueta)** | Paisaje textura |
| **Voz / descripción** | «El mundo es escudo viejo.» |
| **Paleta (elemento)** | ochre, stone gray, clay brown, grounded dusty tones |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Rolling hills that read as overlapping turtle shell scutes, grass in seams, distant mist. Landscape-as-creature pattern. Flavor anchor: "Caparazón Continental" — archetype: Colinas curvas. Visual scale: legendary centerpiece, maximal elemental spectacle, awe-inspiring finale energy — one dominant focal, avoid muddy clutter. Element theme: earth — color direction: ochre, stone gray, clay brown, grounded dusty tones. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c5_17 — Elegido 5-17

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c5_17` |
| **Nivel** | 5 |
| **Elemento (`type`)** | Metal (`metal`) |
| **Rareza (JSON)** | `uncommon` |
| **Ciclo por nivel** | metal (7/10 del ciclo de nivel) |
| **Nombre sugerido** | Núcleo Anillo |
| **Clase / arquetipo** | Gólem orbital |
| **Formato (silueta)** | Gólem abstracto |
| **Voz / descripción** | «Cuchillas me orbitan.» |
| **Paleta (elemento)** | steel silver, bronze or iron reflections, cool metallic highlights |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Central armored core sphere with several floating sword-blades orbiting like rings, violet energy. Sci-fantasy construct, no human face. Flavor anchor: "Núcleo Anillo" — archetype: Gólem orbital. Visual scale: legendary centerpiece, maximal elemental spectacle, awe-inspiring finale energy — one dominant focal, avoid muddy clutter. Element theme: metal — color direction: steel silver, bronze or iron reflections, cool metallic highlights. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c5_18 — Elegido 5-18

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c5_18` |
| **Nivel** | 5 |
| **Elemento (`type`)** | Amor (`love`) |
| **Rareza (JSON)** | `uncommon` |
| **Ciclo por nivel** | love (8/10 del ciclo de nivel) |
| **Nombre sugerido** | Aurora Cordial |
| **Clase / arquetipo** | Cielo emocional |
| **Formato (silueta)** | Cielo |
| **Voz / descripción** | «El horizonte nos abraza.» |
| **Paleta (elemento)** | soft rose, warm pink-gold light, gentle harmonious glow |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Night sky aurora shaped subtly like two overlapping hearts, stars glitter, lake reflection. Skyscape emotion, abstract. Flavor anchor: "Aurora Cordial" — archetype: Cielo emocional. Visual scale: legendary centerpiece, maximal elemental spectacle, awe-inspiring finale energy — one dominant focal, avoid muddy clutter. Element theme: love — color direction: soft rose, warm pink-gold light, gentle harmonious glow. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c5_19 — Elegido 5-19

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c5_19` |
| **Nivel** | 5 |
| **Elemento (`type`)** | Energía (`energy`) |
| **Rareza (JSON)** | `uncommon` |
| **Ciclo por nivel** | energy (9/10 del ciclo de nivel) |
| **Nombre sugerido** | Semilla Dyson |
| **Clase / arquetipo** | Fractal energético |
| **Formato (silueta)** | Objeto fractal |
| **Voz / descripción** | «Crecemos hacia el sol dos veces.» |
| **Paleta (elemento)** | electric yellow and violet arcs, high-contrast neon accents |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Floating fractal seed-shell with micro ring segments harvesting light, golden rays bending inward. Cosmic energy artifact. Flavor anchor: "Semilla Dyson" — archetype: Fractal energético. Visual scale: legendary centerpiece, maximal elemental spectacle, awe-inspiring finale energy — one dominant focal, avoid muddy clutter. Element theme: energy — color direction: electric yellow and violet arcs, high-contrast neon accents. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---

## c5_20 — Elegido 5-20

| Campo | Valor |
|--------|--------|
| **ID catálogo** | `c5_20` |
| **Nivel** | 5 |
| **Elemento (`type`)** | Luz (`light`) |
| **Rareza (JSON)** | `rare` |
| **Ciclo por nivel** | light (10/10 del ciclo de nivel) |
| **Nombre sugerido** | Ciervo Cuarzo |
| **Clase / arquetipo** | Hueso de luz |
| **Formato (silueta)** | Bestia cristal |
| **Voz / descripción** | «Transparente por dentro.» |
| **Paleta (elemento)** | radiant gold and white, soft lens flare, luminous ethereal mood |

### Prompt (inglés, Leonardo)

```txt
Portrait-oriented fantasy trading card illustration, vertical 5:7 aspect (1:1.4), single centered focal subject, full-bleed art only. Subject (follow strictly): Deer made of translucent quartz with inner filament glow, antlers like branching fiber optics, mist forest. Crystal beast finale. Flavor anchor: "Ciervo Cuarzo" — archetype: Hueso de luz. Visual scale: legendary centerpiece, maximal elemental spectacle, awe-inspiring finale energy — one dominant focal, avoid muddy clutter. Element theme: light — color direction: radiant gold and white, soft lens flare, luminous ethereal mood. The subject may be a creature, plant, object, swarm, weather phenomenon, landscape focal, or abstract entity — do NOT default to human knights, mages, or generic humanoids unless the description explicitly requires a person. Style: cohesive fantasy game art, painterly detail, dramatic but clean lighting, cinematic focus on one primary readable silhouette. Background: simple atmospheric backdrop that supports the element theme, not busy, no scenery that competes with the subject. CRITICAL: illustration only — NO game UI, NO stats, NO text, NO frames, NO icons, NO ability labels, NO HP/ATK, NO typography. High quality, sharp focal subject, professional illustration suitable for a digital card game.
```

---


## Regenerar este archivo

Desde la raíz del repo:

```bash
node angular-app/docs/generate-leonardo-prompts-md.mjs
```

Editar conceptos en `angular-app/docs/leonardo-concepts-data.mjs` (export `CONCEPTS`); paletas y negativo en `generate-leonardo-prompts-md.mjs`.

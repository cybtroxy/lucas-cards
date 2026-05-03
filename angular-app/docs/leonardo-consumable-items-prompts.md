# Prompts Leonardo.ai — ítems consumibles (lotes de 4)

Este archivo define **20 generaciones de imagen**; cada imagen contiene **4 ítems** en una cuadrícula **2×2** (arriba-izquierda, arriba-derecha, abajo-izquierda, abajo-derecha). En total: **80 elementos** numerados **C01–C80** para recortes o exportación por cuadrante.

## Parámetros sugeridos (Leonardo u otro modelo)

| Parámetro | Sugerencia |
|-----------|------------|
| **Relación de aspecto** | **1 : 1** (cuadrado; ej. **1024 × 1024** o **768 × 768**) para recortar 4 cuadrados iguales. |
| **`num_images`** | **4** si el modelo reutiliza la misma semilla con ligera variación; si las celdas se mezclan, generar **1** imagen por prompt y repetir el prompt. |
| **Estilo** | Icono de inventario: **fondo oscuro opaco por celda** (carbón / azul noche / marrón muy oscuro), objeto bien iluminado para **contraste alto** y que resalte frente al fondo; sin escenas complejas. |

Cada **Prompt (inglés)** en los lotes siguientes es un texto único listo para pegar: incluye los cuatro cuadrantes, el **bloque de layout** (fondos **oscuros opacos** por celda para máximo contraste) y la línea **Negative:** con el mismo contenido en todas las generaciones (si Leonardo usa campo aparte para negativo, podés copiar solo la parte después de `Negative:`).

---

## Lote 01 — Poción, fruta, verdura, metal (C01–C04)

| Cuadrante | ID | Ítem (ES) |
|-----------|-----|-----------|
| Arriba-izq. | C01 | Frasco de poción roja (vida) con tapón de corcho y brillo suave |
| Arriba-der. | C02 | Manzana roja fresca con una hoja |
| Abajo-izq. | C03 | Zanahoria naranja entera, tierra mínima |
| Abajo-der. | C04 | Lingote de acero industrial con rebabas sutiles |

### Prompt (inglés)

```txt
Quadrant A top-left: small glass health potion bottle, red glowing liquid, cork stopper, subtle magical shimmer. Quadrant B top-right: crisp red apple with one green leaf. Quadrant C bottom-left: whole orange carrot, minimal root hairs. Quadrant D bottom-right: heavy steel ingot, brushed metal, industrial forging look. Layout: one square image, strict 2×2 grid of four equal quadrants with clear separation (subtle gap or soft edge shadow between cells). Exactly one inventory-style object centered in each quadrant, no overlap across quadrant borders, no extra objects. Orthographic or slight three-quarter view, consistent scale across all four. Fantasy game consumable icon art, painterly, clean readable silhouette. Lighting: strong key light and subtle rim light on each object so materials read clearly; soft contact shadow under each item. Each quadrant uses an opaque dark studio background (near-black charcoal, deep slate blue, dark umber, or rich forest black — may differ slightly per cell), absolutely NOT white, NOT pale gray, NOT cream, NOT pastel high-key. High contrast: subjects must clearly separate from the background and pop forward. Optional gentle vignette in corners; no landscapes. Full-bleed art only. Negative: text, letters, words, watermark, logo, UI, HUD, interface, health bar, mana bar, stats, numbers, card frame, borders, captions, typography, buttons, icons as overlay, human character, human face, hands holding object, duplicate same item in multiple quadrants, crowded scene, busy background, photorealistic noise, blurry subject, split into comic panels with gutters, collage of unrelated photos, bright white background, pale gray background, cream backdrop, pastel wash, high-key lighting, flat lighting, low contrast between object and background, washed-out look.
```

---

## Lote 02 — Química, cable, arma, defensa (C05–C08)

| Cuadrante | ID | Ítem (ES) |
|-----------|-----|-----------|
| Arriba-izq. | C05 | Matraz Erlenmeyer con líquido verde ácido y vapor |
| Arriba-der. | C06 | Bobina de cable de cobre brillante |
| Abajo-izq. | C07 | Espada corta de acero, empuñadura simple |
| Abajo-der. | C08 | Escudo redondo de madera con borde metálico |

### Prompt (inglés)

```txt
Quadrant A top-left: glass Erlenmeyer flask, bright green acidic liquid, wisps of vapor. Quadrant B top-right: neat coil of shiny copper wire. Quadrant C bottom-left: short steel arming sword, simple crossguard, centered. Quadrant D bottom-right: round wooden shield with iron rim and a few scratches. Layout: one square image, strict 2×2 grid of four equal quadrants with clear separation (subtle gap or soft edge shadow between cells). Exactly one inventory-style object centered in each quadrant, no overlap across quadrant borders, no extra objects. Orthographic or slight three-quarter view, consistent scale across all four. Fantasy game consumable icon art, painterly, clean readable silhouette. Lighting: strong key light and subtle rim light on each object so materials read clearly; soft contact shadow under each item. Each quadrant uses an opaque dark studio background (near-black charcoal, deep slate blue, dark umber, or rich forest black — may differ slightly per cell), absolutely NOT white, NOT pale gray, NOT cream, NOT pastel high-key. High contrast: subjects must clearly separate from the background and pop forward. Optional gentle vignette in corners; no landscapes. Full-bleed art only. Negative: text, letters, words, watermark, logo, UI, HUD, interface, health bar, mana bar, stats, numbers, card frame, borders, captions, typography, buttons, icons as overlay, human character, human face, hands holding object, duplicate same item in multiple quadrants, crowded scene, busy background, photorealistic noise, blurry subject, split into comic panels with gutters, collage of unrelated photos, bright white background, pale gray background, cream backdrop, pastel wash, high-key lighting, flat lighting, low contrast between object and background, washed-out look.
```

---

## Lote 03 — Vida, luz, piedra, hoja (C09–C12)

| Cuadrante | ID | Ítem (ES) |
|-----------|-----|-----------|
| Arriba-izq. | C09 | Corazón de cristal rojo que simboliza vida |
| Arriba-der. | C10 | Esfera de luz dorada brillante |
| Abajo-izq. | C11 | Piedra de río lisa gris-azulada |
| Abajo-der. | C12 | Hoja de roble verde con nervaduras marcadas |

### Prompt (inglés)

```txt
Quadrant A top-left: stylized red crystal heart, inner glow, life-symbol not anatomical. Quadrant B top-right: floating golden light orb, soft lens flare. Quadrant C bottom-left: single smooth river stone, cool gray-blue tones. Quadrant D bottom-right: one oak leaf, detailed veins, dew optional. Layout: one square image, strict 2×2 grid of four equal quadrants with clear separation (subtle gap or soft edge shadow between cells). Exactly one inventory-style object centered in each quadrant, no overlap across quadrant borders, no extra objects. Orthographic or slight three-quarter view, consistent scale across all four. Fantasy game consumable icon art, painterly, clean readable silhouette. Lighting: strong key light and subtle rim light on each object so materials read clearly; soft contact shadow under each item. Each quadrant uses an opaque dark studio background (near-black charcoal, deep slate blue, dark umber, or rich forest black — may differ slightly per cell), absolutely NOT white, NOT pale gray, NOT cream, NOT pastel high-key. High contrast: subjects must clearly separate from the background and pop forward. Optional gentle vignette in corners; no landscapes. Full-bleed art only. Negative: text, letters, words, watermark, logo, UI, HUD, interface, health bar, mana bar, stats, numbers, card frame, borders, captions, typography, buttons, icons as overlay, human character, human face, hands holding object, duplicate same item in multiple quadrants, crowded scene, busy background, photorealistic noise, blurry subject, split into comic panels with gutters, collage of unrelated photos, bright white background, pale gray background, cream backdrop, pastel wash, high-key lighting, flat lighting, low contrast between object and background, washed-out look.
```

---

## Lote 04 — Ola, nube, volcán, tornado (C13–C16)

| Cuadrante | ID | Ítem (ES) |
|-----------|-----|-----------|
| Arriba-izq. | C13 | Ola oceánica estilizada en cresta |
| Arriba-der. | C14 | Nube esponjosa blanca aislada |
| Abajo-izq. | C15 | Volcán en miniatura con lava y ceniza |
| Abajo-der. | C16 | Tornado de polvo compacto en embudo |

### Prompt (inglés)

```txt
Quadrant A top-left: stylized ocean wave curl, turquoise and foam, icon scale. Quadrant B top-right: single fluffy white cumulus cloud, cartoon-real blend. Quadrant C bottom-left: miniature volcano cone, orange lava cracks, gray ash plume small. Quadrant D bottom-right: compact dust tornado funnel, debris hints, readable spiral. Layout: one square image, strict 2×2 grid of four equal quadrants with clear separation (subtle gap or soft edge shadow between cells). Exactly one inventory-style object centered in each quadrant, no overlap across quadrant borders, no extra objects. Orthographic or slight three-quarter view, consistent scale across all four. Fantasy game consumable icon art, painterly, clean readable silhouette. Lighting: strong key light and subtle rim light on each object so materials read clearly; soft contact shadow under each item. Each quadrant uses an opaque dark studio background (near-black charcoal, deep slate blue, dark umber, or rich forest black — may differ slightly per cell), absolutely NOT white, NOT pale gray, NOT cream, NOT pastel high-key. High contrast: subjects must clearly separate from the background and pop forward. Optional gentle vignette in corners; no landscapes. Full-bleed art only. Negative: text, letters, words, watermark, logo, UI, HUD, interface, health bar, mana bar, stats, numbers, card frame, borders, captions, typography, buttons, icons as overlay, human character, human face, hands holding object, duplicate same item in multiple quadrants, crowded scene, busy background, photorealistic noise, blurry subject, split into comic panels with gutters, collage of unrelated photos, bright white background, pale gray background, cream backdrop, pastel wash, high-key lighting, flat lighting, low contrast between object and background, washed-out look.
```

---

## Lote 05 — Sismo, meteorito, rayo, gota (C17–C20)

| Cuadrante | ID | Ítem (ES) |
|-----------|-----|-----------|
| Arriba-izq. | C17 | Grieta en tierra con polvo (símbolo de terremoto) |
| Arriba-der. | C18 | Meteorito rocoso con brillo incandescente |
| Abajo-izq. | C19 | Rayo zigzag dorado aislado |
| Abajo-der. | C20 | Gota de agua cristalina perfecta |

### Prompt (inglés)

```txt
Quadrant A top-left: earthquake symbol as cracked earth fissure with dust puff, stylized. Quadrant B top-right: small rocky meteorite, glowing molten edge trails. Quadrant C bottom-left: single bold lightning bolt, golden-white, isolated. Quadrant D bottom-right: one clear water droplet, refraction highlights. Layout: one square image, strict 2×2 grid of four equal quadrants with clear separation (subtle gap or soft edge shadow between cells). Exactly one inventory-style object centered in each quadrant, no overlap across quadrant borders, no extra objects. Orthographic or slight three-quarter view, consistent scale across all four. Fantasy game consumable icon art, painterly, clean readable silhouette. Lighting: strong key light and subtle rim light on each object so materials read clearly; soft contact shadow under each item. Each quadrant uses an opaque dark studio background (near-black charcoal, deep slate blue, dark umber, or rich forest black — may differ slightly per cell), absolutely NOT white, NOT pale gray, NOT cream, NOT pastel high-key. High contrast: subjects must clearly separate from the background and pop forward. Optional gentle vignette in corners; no landscapes. Full-bleed art only. Negative: text, letters, words, watermark, logo, UI, HUD, interface, health bar, mana bar, stats, numbers, card frame, borders, captions, typography, buttons, icons as overlay, human character, human face, hands holding object, duplicate same item in multiple quadrants, crowded scene, busy background, photorealistic noise, blurry subject, split into comic panels with gutters, collage of unrelated photos, bright white background, pale gray background, cream backdrop, pastel wash, high-key lighting, flat lighting, low contrast between object and background, washed-out look.
```

---

## Lote 06 — Ratón, serpiente, caracol, águila (C21–C24)

| Cuadrante | ID | Ítem (ES) |
|-----------|-----|-----------|
| Arriba-izq. | C21 | Ratón gris pequeño sentado |
| Arriba-der. | C22 | Serpiente verde enrollada |
| Abajo-izq. | C23 | Caracol con concha espiral marrón |
| Abajo-der. | C24 | Águila de perfil, pico y ojo fieros |

### Prompt (inglés)

```txt
Quadrant A top-left: small gray field mouse, cute, sitting pose, icon scale. Quadrant B top-right: green snake coiled neatly, scales readable. Quadrant C bottom-left: garden snail with brown spiral shell, soft body. Quadrant D bottom-right: eagle head profile, sharp beak, fierce eye, no full landscape. Layout: one square image, strict 2×2 grid of four equal quadrants with clear separation (subtle gap or soft edge shadow between cells). Exactly one inventory-style object centered in each quadrant, no overlap across quadrant borders, no extra objects. Orthographic or slight three-quarter view, consistent scale across all four. Fantasy game consumable icon art, painterly, clean readable silhouette. Lighting: strong key light and subtle rim light on each object so materials read clearly; soft contact shadow under each item. Each quadrant uses an opaque dark studio background (near-black charcoal, deep slate blue, dark umber, or rich forest black — may differ slightly per cell), absolutely NOT white, NOT pale gray, NOT cream, NOT pastel high-key. High contrast: subjects must clearly separate from the background and pop forward. Optional gentle vignette in corners; no landscapes. Full-bleed art only. Negative: text, letters, words, watermark, logo, UI, HUD, interface, health bar, mana bar, stats, numbers, card frame, borders, captions, typography, buttons, icons as overlay, human character, human face, hands holding object, duplicate same item in multiple quadrants, crowded scene, busy background, photorealistic noise, blurry subject, split into comic panels with gutters, collage of unrelated photos, bright white background, pale gray background, cream backdrop, pastel wash, high-key lighting, flat lighting, low contrast between object and background, washed-out look.
```

---

## Lote 07 — Oso, pez, sirena estilizada, dinosaurio (C25–C28)

| Cuadrante | ID | Ítem (ES) |
|-----------|-----|-----------|
| Arriba-izq. | C25 | Cabeza de oso pardo amistoso |
| Arriba-der. | C26 | Pez tropical azul y amarillo |
| Abajo-izq. | C27 | Sirena estilo ítem (torso y cola, sin escena) |
| Abajo-der. | C28 | Cráneo pequeño de dinosaurio estilizado |

### Prompt (inglés)

```txt
Quadrant A top-left: brown bear head portrait, friendly stylized, icon framing. Quadrant B top-right: single tropical fish, blue and yellow stripes, side view. Quadrant C bottom-left: mermaid figure as collectible icon, teal tail, modest fantasy armor top, no seductive pose, centered bust-to-tail crop. Quadrant D bottom-right: small stylized dinosaur skull fossil, triceratops-like frill optional. Layout: one square image, strict 2×2 grid of four equal quadrants with clear separation (subtle gap or soft edge shadow between cells). Exactly one inventory-style object centered in each quadrant, no overlap across quadrant borders, no extra objects. Orthographic or slight three-quarter view, consistent scale across all four. Fantasy game consumable icon art, painterly, clean readable silhouette. Lighting: strong key light and subtle rim light on each object so materials read clearly; soft contact shadow under each item. Each quadrant uses an opaque dark studio background (near-black charcoal, deep slate blue, dark umber, or rich forest black — may differ slightly per cell), absolutely NOT white, NOT pale gray, NOT cream, NOT pastel high-key. High contrast: subjects must clearly separate from the background and pop forward. Optional gentle vignette in corners; no landscapes. Full-bleed art only. Negative: text, letters, words, watermark, logo, UI, HUD, interface, health bar, mana bar, stats, numbers, card frame, borders, captions, typography, buttons, icons as overlay, human character, human face, hands holding object, duplicate same item in multiple quadrants, crowded scene, busy background, photorealistic noise, blurry subject, split into comic panels with gutters, collage of unrelated photos, bright white background, pale gray background, cream backdrop, pastel wash, high-key lighting, flat lighting, low contrast between object and background, washed-out look.
```

---

## Lote 08 — Frutas y verduras mix (C29–C32)

| Cuadrante | ID | Ítem (ES) |
|-----------|-----|-----------|
| Arriba-izq. | C29 | Racimo de uvas moradas |
| Arriba-der. | C30 | Limón amarillo entero |
| Abajo-izq. | C31 | Brócoli verde compacto |
| Abajo-der. | C32 | Champiñón blanco entero |

### Prompt (inglés)

```txt
Quadrant A top-left: bunch of purple grapes, fresh bloom dust. Quadrant B top-right: whole bright yellow lemon. Quadrant C bottom-left: compact green broccoli head. Quadrant D bottom-right: single white button mushroom. Layout: one square image, strict 2×2 grid of four equal quadrants with clear separation (subtle gap or soft edge shadow between cells). Exactly one inventory-style object centered in each quadrant, no overlap across quadrant borders, no extra objects. Orthographic or slight three-quarter view, consistent scale across all four. Fantasy game consumable icon art, painterly, clean readable silhouette. Lighting: strong key light and subtle rim light on each object so materials read clearly; soft contact shadow under each item. Each quadrant uses an opaque dark studio background (near-black charcoal, deep slate blue, dark umber, or rich forest black — may differ slightly per cell), absolutely NOT white, NOT pale gray, NOT cream, NOT pastel high-key. High contrast: subjects must clearly separate from the background and pop forward. Optional gentle vignette in corners; no landscapes. Full-bleed art only. Negative: text, letters, words, watermark, logo, UI, HUD, interface, health bar, mana bar, stats, numbers, card frame, borders, captions, typography, buttons, icons as overlay, human character, human face, hands holding object, duplicate same item in multiple quadrants, crowded scene, busy background, photorealistic noise, blurry subject, split into comic panels with gutters, collage of unrelated photos, bright white background, pale gray background, cream backdrop, pastel wash, high-key lighting, flat lighting, low contrast between object and background, washed-out look.
```

---

## Lote 09 — Pociones y frascos (C33–C36)

| Cuadrante | ID | Ítem (ES) |
|-----------|-----|-----------|
| Arriba-izq. | C33 | Poción azul (maná) con partículas |
| Arriba-der. | C34 | Frasco ámbar de aceite espeso |
| Abajo-izq. | C35 | Tubo de ensayo con líquido violeta burbujeante |
| Abajo-der. | C36 | Odre de cuero con cordón |

### Prompt (inglés)

```txt
Quadrant A top-left: mana potion, cobalt blue liquid, tiny sparkles inside round flask. Quadrant B top-right: amber glass bottle of thick golden oil. Quadrant C bottom-left: test tube with bubbling violet liquid. Quadrant D bottom-right: leather waterskin, tied cord, slightly worn. Layout: one square image, strict 2×2 grid of four equal quadrants with clear separation (subtle gap or soft edge shadow between cells). Exactly one inventory-style object centered in each quadrant, no overlap across quadrant borders, no extra objects. Orthographic or slight three-quarter view, consistent scale across all four. Fantasy game consumable icon art, painterly, clean readable silhouette. Lighting: strong key light and subtle rim light on each object so materials read clearly; soft contact shadow under each item. Each quadrant uses an opaque dark studio background (near-black charcoal, deep slate blue, dark umber, or rich forest black — may differ slightly per cell), absolutely NOT white, NOT pale gray, NOT cream, NOT pastel high-key. High contrast: subjects must clearly separate from the background and pop forward. Optional gentle vignette in corners; no landscapes. Full-bleed art only. Negative: text, letters, words, watermark, logo, UI, HUD, interface, health bar, mana bar, stats, numbers, card frame, borders, captions, typography, buttons, icons as overlay, human character, human face, hands holding object, duplicate same item in multiple quadrants, crowded scene, busy background, photorealistic noise, blurry subject, split into comic panels with gutters, collage of unrelated photos, bright white background, pale gray background, cream backdrop, pastel wash, high-key lighting, flat lighting, low contrast between object and background, washed-out look.
```

---

## Lote 10 — Industrial y químico (C37–C40)

| Cuadrante | ID | Ítem (ES) |
|-----------|-----|-----------|
| Arriba-izq. | C37 | Tanque de gas propano estilizado pequeño |
| Arriba-der. | C38 | Bidón de plástico con símbolo de peligro |
| Abajo-izq. | C39 | Plancha de aluminio rayada |
| Abajo-der. | C40 | Cristales de sal en montículo |

### Prompt (inglés)

```txt
Quadrant A top-left: small stylized propane tank, valve on top, clean industrial read. Quadrant B top-right: plastic jerrycan with hazard diamond sticker, muted colors. Quadrant C bottom-left: rectangular aluminum sheet, brushed scratches. Quadrant D bottom-right: pile of coarse salt crystals, white and slightly blue tint. Layout: one square image, strict 2×2 grid of four equal quadrants with clear separation (subtle gap or soft edge shadow between cells). Exactly one inventory-style object centered in each quadrant, no overlap across quadrant borders, no extra objects. Orthographic or slight three-quarter view, consistent scale across all four. Fantasy game consumable icon art, painterly, clean readable silhouette. Lighting: strong key light and subtle rim light on each object so materials read clearly; soft contact shadow under each item. Each quadrant uses an opaque dark studio background (near-black charcoal, deep slate blue, dark umber, or rich forest black — may differ slightly per cell), absolutely NOT white, NOT pale gray, NOT cream, NOT pastel high-key. High contrast: subjects must clearly separate from the background and pop forward. Optional gentle vignette in corners; no landscapes. Full-bleed art only. Negative: text, letters, words, watermark, logo, UI, HUD, interface, health bar, mana bar, stats, numbers, card frame, borders, captions, typography, buttons, icons as overlay, human character, human face, hands holding object, duplicate same item in multiple quadrants, crowded scene, busy background, photorealistic noise, blurry subject, split into comic panels with gutters, collage of unrelated photos, bright white background, pale gray background, cream backdrop, pastel wash, high-key lighting, flat lighting, low contrast between object and background, washed-out look.
```

---

## Lote 11 — Armas y herramientas (C41–C44)

| Cuadrante | ID | Ítem (ES) |
|-----------|-----|-----------|
| Arriba-izq. | C41 | Hacha de guerra de doble filo |
| Arriba-der. | C42 | Lanza corta con punta de acero |
| Abajo-izq. | C43 | Martillo de herrero pequeño |
| Abajo-der. | C44 | Arco recurvo simple sin cuerda tensada |

### Prompt (inglés)

```txt
Quadrant A top-left: double-bit battle axe, dark wood handle. Quadrant B top-right: short spear, steel head, leather grip. Quadrant C bottom-left: small blacksmith hammer, heavy head. Quadrant D bottom-right: simple recurve bow, unstrung or loose string, elegant wood. Layout: one square image, strict 2×2 grid of four equal quadrants with clear separation (subtle gap or soft edge shadow between cells). Exactly one inventory-style object centered in each quadrant, no overlap across quadrant borders, no extra objects. Orthographic or slight three-quarter view, consistent scale across all four. Fantasy game consumable icon art, painterly, clean readable silhouette. Lighting: strong key light and subtle rim light on each object so materials read clearly; soft contact shadow under each item. Each quadrant uses an opaque dark studio background (near-black charcoal, deep slate blue, dark umber, or rich forest black — may differ slightly per cell), absolutely NOT white, NOT pale gray, NOT cream, NOT pastel high-key. High contrast: subjects must clearly separate from the background and pop forward. Optional gentle vignette in corners; no landscapes. Full-bleed art only. Negative: text, letters, words, watermark, logo, UI, HUD, interface, health bar, mana bar, stats, numbers, card frame, borders, captions, typography, buttons, icons as overlay, human character, human face, hands holding object, duplicate same item in multiple quadrants, crowded scene, busy background, photorealistic noise, blurry subject, split into comic panels with gutters, collage of unrelated photos, bright white background, pale gray background, cream backdrop, pastel wash, high-key lighting, flat lighting, low contrast between object and background, washed-out look.
```

---

## Lote 12 — Escudos y armadura fragmento (C45–C48)

| Cuadrante | ID | Ítem (ES) |
|-----------|-----|-----------|
| Arriba-izq. | C45 | Escudo tipo “kite” medieval |
| Arriba-der. | C46 | Escudo pequeño de torneo con bisel |
| Abajo-izq. | C47 | Hombrera de metal oxidado |
| Abajo-der. | C48 | Yelmo cerrado con visera |

### Prompt (inglés)

```txt
Quadrant A top-left: kite shield, plain steel with a few dents. Quadrant B top-right: small heater shield, beveled edge, tournament style. Quadrant C bottom-left: single rusty steel pauldron shoulder armor piece. Quadrant D bottom-right: closed knight helm with visor slit, no wearer. Layout: one square image, strict 2×2 grid of four equal quadrants with clear separation (subtle gap or soft edge shadow between cells). Exactly one inventory-style object centered in each quadrant, no overlap across quadrant borders, no extra objects. Orthographic or slight three-quarter view, consistent scale across all four. Fantasy game consumable icon art, painterly, clean readable silhouette. Lighting: strong key light and subtle rim light on each object so materials read clearly; soft contact shadow under each item. Each quadrant uses an opaque dark studio background (near-black charcoal, deep slate blue, dark umber, or rich forest black — may differ slightly per cell), absolutely NOT white, NOT pale gray, NOT cream, NOT pastel high-key. High contrast: subjects must clearly separate from the background and pop forward. Optional gentle vignette in corners; no landscapes. Full-bleed art only. Negative: text, letters, words, watermark, logo, UI, HUD, interface, health bar, mana bar, stats, numbers, card frame, borders, captions, typography, buttons, icons as overlay, human character, human face, hands holding object, duplicate same item in multiple quadrants, crowded scene, busy background, photorealistic noise, blurry subject, split into comic panels with gutters, collage of unrelated photos, bright white background, pale gray background, cream backdrop, pastel wash, high-key lighting, flat lighting, low contrast between object and background, washed-out look.
```

---

## Lote 13 — Naturaleza simple (C49–C52)

| Cuadrante | ID | Ítem (ES) |
|-----------|-----|-----------|
| Arriba-izq. | C49 | Piña entera |
| Arriba-der. | C50 | Concha marina en espiral |
| Abajo-izq. | C51 | Semilla de roble con bellota |
| Abajo-der. | C52 | Trozo de musgo verde en bola |

### Prompt (inglés)

```txt
Quadrant A top-left: whole pineapple, textured skin. Quadrant B top-right: spiral seashell, cream and peach tones. Quadrant C bottom-left: acorn with small oak leaf attached. Quadrant D bottom-right: clump of bright green moss, soft ball shape. Layout: one square image, strict 2×2 grid of four equal quadrants with clear separation (subtle gap or soft edge shadow between cells). Exactly one inventory-style object centered in each quadrant, no overlap across quadrant borders, no extra objects. Orthographic or slight three-quarter view, consistent scale across all four. Fantasy game consumable icon art, painterly, clean readable silhouette. Lighting: strong key light and subtle rim light on each object so materials read clearly; soft contact shadow under each item. Each quadrant uses an opaque dark studio background (near-black charcoal, deep slate blue, dark umber, or rich forest black — may differ slightly per cell), absolutely NOT white, NOT pale gray, NOT cream, NOT pastel high-key. High contrast: subjects must clearly separate from the background and pop forward. Optional gentle vignette in corners; no landscapes. Full-bleed art only. Negative: text, letters, words, watermark, logo, UI, HUD, interface, health bar, mana bar, stats, numbers, card frame, borders, captions, typography, buttons, icons as overlay, human character, human face, hands holding object, duplicate same item in multiple quadrants, crowded scene, busy background, photorealistic noise, blurry subject, split into comic panels with gutters, collage of unrelated photos, bright white background, pale gray background, cream backdrop, pastel wash, high-key lighting, flat lighting, low contrast between object and background, washed-out look.
```

---

## Lote 14 — Energía y elementos (C53–C56)

| Cuadrante | ID | Ítem (ES) |
|-----------|-----|-----------|
| Arriba-izq. | C53 | Batería de pilas estilizada (ícono) |
| Arriba-der. | C54 | Llama aislada estilizada |
| Abajo-izq. | C55 | Cristal de hielo afilado |
| Abajo-der. | C56 | Viento en espiral con hojas |

### Prompt (inglés)

```txt
Quadrant A top-left: stylized battery icon, copper top, yellow body, slight glow. Quadrant B top-right: isolated stylized flame, orange core blue base. Quadrant C bottom-left: sharp faceted ice crystal shard. Quadrant D bottom-right: small wind swirl with a few leaves, readable spiral motion. Layout: one square image, strict 2×2 grid of four equal quadrants with clear separation (subtle gap or soft edge shadow between cells). Exactly one inventory-style object centered in each quadrant, no overlap across quadrant borders, no extra objects. Orthographic or slight three-quarter view, consistent scale across all four. Fantasy game consumable icon art, painterly, clean readable silhouette. Lighting: strong key light and subtle rim light on each object so materials read clearly; soft contact shadow under each item. Each quadrant uses an opaque dark studio background (near-black charcoal, deep slate blue, dark umber, or rich forest black — may differ slightly per cell), absolutely NOT white, NOT pale gray, NOT cream, NOT pastel high-key. High contrast: subjects must clearly separate from the background and pop forward. Optional gentle vignette in corners; no landscapes. Full-bleed art only. Negative: text, letters, words, watermark, logo, UI, HUD, interface, health bar, mana bar, stats, numbers, card frame, borders, captions, typography, buttons, icons as overlay, human character, human face, hands holding object, duplicate same item in multiple quadrants, crowded scene, busy background, photorealistic noise, blurry subject, split into comic panels with gutters, collage of unrelated photos, bright white background, pale gray background, cream backdrop, pastel wash, high-key lighting, flat lighting, low contrast between object and background, washed-out look.
```

---

## Lote 15 — Criaturas pequeñas (C57–C60)

| Cuadrante | ID | Ítem (ES) |
|-----------|-----|-----------|
| Arriba-izq. | C57 | Rana verde brillante |
| Arriba-der. | C58 | Mariposa con alas azules |
| Abajo-izq. | C59 | Abeja caricaturesca grande |
| Abajo-der. | C60 | Tortuga pequeña vista desde arriba |

### Prompt (inglés)

```txt
Quadrant A top-left: bright green frog, sitting, wet sheen. Quadrant B top-right: blue butterfly, wings open, top-down slight angle. Quadrant C bottom-left: chunky stylized bee, fuzzy, friendly. Quadrant D bottom-right: small tortoise shell pattern from above, head peeking. Layout: one square image, strict 2×2 grid of four equal quadrants with clear separation (subtle gap or soft edge shadow between cells). Exactly one inventory-style object centered in each quadrant, no overlap across quadrant borders, no extra objects. Orthographic or slight three-quarter view, consistent scale across all four. Fantasy game consumable icon art, painterly, clean readable silhouette. Lighting: strong key light and subtle rim light on each object so materials read clearly; soft contact shadow under each item. Each quadrant uses an opaque dark studio background (near-black charcoal, deep slate blue, dark umber, or rich forest black — may differ slightly per cell), absolutely NOT white, NOT pale gray, NOT cream, NOT pastel high-key. High contrast: subjects must clearly separate from the background and pop forward. Optional gentle vignette in corners; no landscapes. Full-bleed art only. Negative: text, letters, words, watermark, logo, UI, HUD, interface, health bar, mana bar, stats, numbers, card frame, borders, captions, typography, buttons, icons as overlay, human character, human face, hands holding object, duplicate same item in multiple quadrants, crowded scene, busy background, photorealistic noise, blurry subject, split into comic panels with gutters, collage of unrelated photos, bright white background, pale gray background, cream backdrop, pastel wash, high-key lighting, flat lighting, low contrast between object and background, washed-out look.
```

---

## Lote 16 — Comida y remedios (C61–C64)

| Cuadrante | ID | Ítem (ES) |
|-----------|-----|-----------|
| Arriba-izq. | C61 | Pan redondo dorado |
| Arriba-der. | C62 | Queso con agujeros (emmental) |
| Abajo-izq. | C63 | Venda enrollada blanca |
| Abajo-der. | C64 | Bolsa de hierbas secas atada |

### Prompt (inglés)

```txt
Quadrant A top-left: round golden loaf of bread, steam wisps. Quadrant B top-right: wedge of holey yellow cheese. Quadrant C bottom-left: rolled white cloth bandage, clean. Quadrant D bottom-right: small tied pouch of dried herbs, rustic fabric. Layout: one square image, strict 2×2 grid of four equal quadrants with clear separation (subtle gap or soft edge shadow between cells). Exactly one inventory-style object centered in each quadrant, no overlap across quadrant borders, no extra objects. Orthographic or slight three-quarter view, consistent scale across all four. Fantasy game consumable icon art, painterly, clean readable silhouette. Lighting: strong key light and subtle rim light on each object so materials read clearly; soft contact shadow under each item. Each quadrant uses an opaque dark studio background (near-black charcoal, deep slate blue, dark umber, or rich forest black — may differ slightly per cell), absolutely NOT white, NOT pale gray, NOT cream, NOT pastel high-key. High contrast: subjects must clearly separate from the background and pop forward. Optional gentle vignette in corners; no landscapes. Full-bleed art only. Negative: text, letters, words, watermark, logo, UI, HUD, interface, health bar, mana bar, stats, numbers, card frame, borders, captions, typography, buttons, icons as overlay, human character, human face, hands holding object, duplicate same item in multiple quadrants, crowded scene, busy background, photorealistic noise, blurry subject, split into comic panels with gutters, collage of unrelated photos, bright white background, pale gray background, cream backdrop, pastel wash, high-key lighting, flat lighting, low contrast between object and background, washed-out look.
```

---

## Lote 17 — Minerales y gemas (C65–C68)

| Cuadrante | ID | Ítem (ES) |
|-----------|-----|-----------|
| Arriba-izq. | C65 | Pepita de oro rugosa |
| Arriba-der. | C66 | Rubí tallado octogonal |
| Abajo-izq. | C67 | Trozo de carbón brillante |
| Abajo-der. | C68 | Cuarzo rosa en bruto |

### Prompt (inglés)

```txt
Quadrant A top-left: rough gold nugget, warm highlights. Quadrant B top-right: faceted ruby gem, deep red. Quadrant C bottom-left: lump of shiny black coal, subtle glint. Quadrant D bottom-right: raw rose quartz chunk, milky pink. Layout: one square image, strict 2×2 grid of four equal quadrants with clear separation (subtle gap or soft edge shadow between cells). Exactly one inventory-style object centered in each quadrant, no overlap across quadrant borders, no extra objects. Orthographic or slight three-quarter view, consistent scale across all four. Fantasy game consumable icon art, painterly, clean readable silhouette. Lighting: strong key light and subtle rim light on each object so materials read clearly; soft contact shadow under each item. Each quadrant uses an opaque dark studio background (near-black charcoal, deep slate blue, dark umber, or rich forest black — may differ slightly per cell), absolutely NOT white, NOT pale gray, NOT cream, NOT pastel high-key. High contrast: subjects must clearly separate from the background and pop forward. Optional gentle vignette in corners; no landscapes. Full-bleed art only. Negative: text, letters, words, watermark, logo, UI, HUD, interface, health bar, mana bar, stats, numbers, card frame, borders, captions, typography, buttons, icons as overlay, human character, human face, hands holding object, duplicate same item in multiple quadrants, crowded scene, busy background, photorealistic noise, blurry subject, split into comic panels with gutters, collage of unrelated photos, bright white background, pale gray background, cream backdrop, pastel wash, high-key lighting, flat lighting, low contrast between object and background, washed-out look.
```

---

## Lote 18 — Plástico moderno vs fantasía (C69–C72)

| Cuadrante | ID | Ítem (ES) |
|-----------|-----|-----------|
| Arriba-izq. | C69 | Cinta adhesiva industrial gruesa |
| Arriba-der. | C70 | Tubería PVC gris en codo |
| Abajo-izq. | C71 | Pergamino enrollado con sello de cera |
| Abajo-der. | C72 | Vela encendida en candelabro pequeño |

### Prompt (inglés)

```txt
Quadrant A top-left: thick industrial duct tape roll, silver gray. Quadrant B top-right: gray PVC pipe elbow joint, clean plastic. Quadrant C bottom-left: rolled parchment scroll with red wax seal. Quadrant D bottom-right: lit candle in small brass candlestick, warm flame. Layout: one square image, strict 2×2 grid of four equal quadrants with clear separation (subtle gap or soft edge shadow between cells). Exactly one inventory-style object centered in each quadrant, no overlap across quadrant borders, no extra objects. Orthographic or slight three-quarter view, consistent scale across all four. Fantasy game consumable icon art, painterly, clean readable silhouette. Lighting: strong key light and subtle rim light on each object so materials read clearly; soft contact shadow under each item. Each quadrant uses an opaque dark studio background (near-black charcoal, deep slate blue, dark umber, or rich forest black — may differ slightly per cell), absolutely NOT white, NOT pale gray, NOT cream, NOT pastel high-key. High contrast: subjects must clearly separate from the background and pop forward. Optional gentle vignette in corners; no landscapes. Full-bleed art only. Negative: text, letters, words, watermark, logo, UI, HUD, interface, health bar, mana bar, stats, numbers, card frame, borders, captions, typography, buttons, icons as overlay, human character, human face, hands holding object, duplicate same item in multiple quadrants, crowded scene, busy background, photorealistic noise, blurry subject, split into comic panels with gutters, collage of unrelated photos, bright white background, pale gray background, cream backdrop, pastel wash, high-key lighting, flat lighting, low contrast between object and background, washed-out look.
```

---

## Lote 19 — Depredadores y acuáticos (C73–C76)

| Cuadrante | ID | Ítem (ES) |
|-----------|-----|-----------|
| Arriba-izq. | C73 | Lobo gris aullando (busto) |
| Arriba-der. | C74 | Tiburón aleta visible estilizado |
| Abajo-izq. | C75 | Pulpo pequeño morado |
| Abajo-der. | C76 | Estrella de mar naranja |

### Prompt (inglés)

```txt
Quadrant A top-left: gray wolf head howling, bust crop, stylized. Quadrant B top-right: stylized shark fin cutting water surface, simple icon. Quadrant C bottom-left: small purple octopus, curled tentacles. Quadrant D bottom-right: orange starfish, five arms, slight texture. Layout: one square image, strict 2×2 grid of four equal quadrants with clear separation (subtle gap or soft edge shadow between cells). Exactly one inventory-style object centered in each quadrant, no overlap across quadrant borders, no extra objects. Orthographic or slight three-quarter view, consistent scale across all four. Fantasy game consumable icon art, painterly, clean readable silhouette. Lighting: strong key light and subtle rim light on each object so materials read clearly; soft contact shadow under each item. Each quadrant uses an opaque dark studio background (near-black charcoal, deep slate blue, dark umber, or rich forest black — may differ slightly per cell), absolutely NOT white, NOT pale gray, NOT cream, NOT pastel high-key. High contrast: subjects must clearly separate from the background and pop forward. Optional gentle vignette in corners; no landscapes. Full-bleed art only. Negative: text, letters, words, watermark, logo, UI, HUD, interface, health bar, mana bar, stats, numbers, card frame, borders, captions, typography, buttons, icons as overlay, human character, human face, hands holding object, duplicate same item in multiple quadrants, crowded scene, busy background, photorealistic noise, blurry subject, split into comic panels with gutters, collage of unrelated photos, bright white background, pale gray background, cream backdrop, pastel wash, high-key lighting, flat lighting, low contrast between object and background, washed-out look.
```

---

## Lote 20 — Fantasía variada (C77–C80)

| Cuadrante | ID | Ítem (ES) |
|-----------|-----|-----------|
| Arriba-izq. | C77 | Pluma mágica dorada flotando |
| Arriba-der. | C78 | Runa grabada en piedra cuadrada |
| Abajo-izq. | C79 | Calavera de animal pequeño con cuernos |
| Abajo-der. | C80 | Cofre de madera miniatura cerrado |

### Prompt (inglés)

```txt
Quadrant A top-left: floating golden quill pen, faint magic trail. Quadrant B top-right: square stone tile with carved glowing rune. Quadrant C bottom-left: small horned animal skull, stylized fantasy. Quadrant D bottom-right: miniature closed wooden treasure chest, iron bands. Layout: one square image, strict 2×2 grid of four equal quadrants with clear separation (subtle gap or soft edge shadow between cells). Exactly one inventory-style object centered in each quadrant, no overlap across quadrant borders, no extra objects. Orthographic or slight three-quarter view, consistent scale across all four. Fantasy game consumable icon art, painterly, clean readable silhouette. Lighting: strong key light and subtle rim light on each object so materials read clearly; soft contact shadow under each item. Each quadrant uses an opaque dark studio background (near-black charcoal, deep slate blue, dark umber, or rich forest black — may differ slightly per cell), absolutely NOT white, NOT pale gray, NOT cream, NOT pastel high-key. High contrast: subjects must clearly separate from the background and pop forward. Optional gentle vignette in corners; no landscapes. Full-bleed art only. Negative: text, letters, words, watermark, logo, UI, HUD, interface, health bar, mana bar, stats, numbers, card frame, borders, captions, typography, buttons, icons as overlay, human character, human face, hands holding object, duplicate same item in multiple quadrants, crowded scene, busy background, photorealistic noise, blurry subject, split into comic panels with gutters, collage of unrelated photos, bright white background, pale gray background, cream backdrop, pastel wash, high-key lighting, flat lighting, low contrast between object and background, washed-out look.
```

---

## Índice rápido C01–C80

| IDs | Categoría resumida |
|-----|-------------------|
| C01–C04 | Poción, manzana, zanahoria, lingote |
| C05–C08 | Matraz, cobre, espada, escudo |
| C09–C12 | Corazón cristal, orbe luz, piedra, hoja |
| C13–C16 | Ola, nube, volcán, tornado |
| C17–C20 | Grieta, meteorito, rayo, gota |
| C21–C24 | Ratón, serpiente, caracol, águila |
| C25–C28 | Oso, pez, sirena ícono, cráneo dinosaurio |
| C29–C32 | Uvas, limón, brócoli, champiñón |
| C33–C36 | Poción maná, aceite, tubo ensayo, odre |
| C37–C40 | Gas, bidón, aluminio, sal |
| C41–C44 | Hacha, lanza, martillo, arco |
| C45–C48 | Escudos, hombrera, yelmo |
| C49–C52 | Piña, concha, bellota, musgo |
| C53–C56 | Batería, llama, hielo, viento |
| C57–C60 | Rana, mariposa, abeja, tortuga |
| C61–C64 | Pan, queso, venda, hierbas |
| C65–C68 | Oro, rubí, carbón, cuarzo rosa |
| C69–C72 | Cinta, PVC, pergamino, vela |
| C73–C76 | Lobo, tiburón, pulpo, estrella mar |
| C77–C80 | Pluma, runa, calavera, cofre |

---

## Recorte posterior

1. Exportar imagen cuadrada a editor o script: dividir en **4 regiones 50% × 50%** (con margen opcional de 2–4 px si el modelo dibujó borde).  
2. Nombrar archivos `consumable_C01.png` … `consumable_C80.png` según el cuadrante.  
3. Si un cuadrante falla, regenerar solo ese lote o usar inpainting sobre la celda.

# Las Cartas de Lucas

Juego de cartas por turnos con **combate simultáneo** por asalto. Este repositorio contiene la **SPA en Angular 18** (`angular-app/`): aplicación **standalone**, **sin NgModules**, con **rutas perezosas** (`loadComponent`) y estado reactivo centrado en **`GameStateService`**.

La serie es al **mejor de 9 partidas posibles** en la barra de progreso; la serie la gana quien alcance **5 victorias** primero (`WINS_TO_WIN_SERIES`). Puede haber empates en partida y la serie puede alargarse.

## Origen e intención del proyecto

### Español

La idea inicial del juego es de **Lucas**, un niño menor de 10 años. Las mecánicas se plantearon para que le resultaran **fáciles de entender**; de ahí el nombre: literalmente **Las Cartas de Lucas**.

Se han hecho **adaptaciones** y es probable que se sigan haciendo. La intención es **llevar el juego a móvil y tablet**; la **primera versión pública es en web**. Es muy posible que el juego **no esté balanceado**: **no se ofrece ninguna garantía** de que llegue a un balance perfecto. **No** está pensado como un juego **pay-to-win**, pero **sí** hay interés en **obtener ingresos** si el proyecto **crece y se expande**. Se aceptan **aportaciones mediante pull requests**.

El desarrollo cuenta con **apoyo de IA**, tanto en **diseño** como en **codificación**; de otra forma sería casi imposible o muy lento hacerlo por una sola persona.

Esperamos que lo disfruten y que **niños y niñas** en casa se diviertan. La idea inicial es que el juego esté disponible en **español** e **inglés**.

### English

The original idea for the game came from **Lucas**, a child under 10. The mechanics were chosen so he could **understand them easily**—hence the name: literally **Lucas’s Cards**.

There have been **adaptations**, and more may follow. The goal is to **bring the game to phones and tablets**; the **first release is on the web**. The game may well **not be balanced**: there is **no promise** it will ever be perfectly balanced. It is **not** designed around **pay-to-win**, but there **is** interest in **earning revenue** if the project **grows**. **Pull requests** are welcome.

Development is **AI-assisted** for both **design** and **coding**; otherwise it would be nearly impossible or very slow for a single person.

We hope you enjoy it and that **kids** at home have fun. From the start, the aim is to offer the game in **Spanish** and **English**.

## Requisitos y ejecución

```bash
cd angular-app
npm install
npm start          # http://localhost:4200/
npm run build      # salida en dist/angular-app
npm test           # Karma + Jasmine
```

La URL por defecto redirige a **`/menu`**. No hay en la raíz del repo la antigua versión estática (`index.html` + `game.js` / `combat.js`); el **catálogo** y las reglas viven en el código TypeScript de `angular-app`.

## Arquitectura (Angular 18)

| Área | Rol |
|------|-----|
| **`app.config.ts`** | `provideRouter`, `provideZoneChangeDetection({ eventCoalescing: true })` |
| **`app.routes.ts`** | Rutas con componentes standalone y `loadComponent` |
| **`app.component`** | Shell: `RouterOutlet` + **barra de serie** (`SeriesProgressBarComponent`) visible en **`/select`** |
| **`core/engine/`** | Reglas puras: **`game-rules.ts`** (economía, tienda, apilamiento, gloria, zoom de combate), **`combat.engine.ts`** (tipos, habilidades, intercambio simultáneo), **`combat-log.format.ts`**, **`game-utils.ts`** |
| **`core/services/`** | **`GameStateService`** (estado global y flujo menú → selección → batalla → resultado), **`BattleService`** (fachada del motor de combate), **`CardsCatalogService`**, **`I18nService`**, **`AbilityService`**, **`TypeService`** |
| **`core/models/`** | `GameState`, `DeckSlot`, `BattleCard`, `ShopOfferSlot`, `BattleResultSnapshot`, etc. |
| **`core/guards/`** | **`battleGuard`**: mazo mínimo listo; **`resultGuard`**: hay snapshot de resultado |
| **`features/*/`** | Una **page** por pantalla: `menu`, `select`, `battle`, `result` (cada una standalone) |
| **`shared/components/`** | **`CardComponent`**, **`SeriesProgressBarComponent`** |
| **`core/data/`** | **`cards.json`** + **`cards.catalog.ts`** (import del JSON tipado) |
| **`core/i18n/`** | Textos de referencia (glosario) p. ej. **`card-reference.ts`** |
| **Estilos** | `src/styles.scss` importa **`lucas-cards.scss`** (UI global); estilos por componente en `.scss` junto al TS |

## Rutas

| Ruta | Componente | Notas |
|------|------------|--------|
| `''` | → `menu` | `redirectTo` |
| `/menu` | `MenuPageComponent` | Inicio de serie / navegación |
| `/select` | `SelectPageComponent` | Mazo + tienda |
| `/battle` | `BattlePageComponent` | Requiere **`battleGuard`** |
| `/result` | `ResultPageComponent` | Requiere **`resultGuard`** |

## Mecánicas principales (resumen)

- **Nivel de carta** (`level` 1–5 en datos): filtra la **tienda** según el **asalto de referencia** (`shopAsaltoForNextSelect` / `shopLevelRangeFromAsalto`). No hay campo `cost` por carta.
- **Presupuesto** entre partidas: base mínima **10** + **arrastre** (puntos al **inicio** de la batalla de esa partida, ya descontados los refrescos de tienda de la **selección** de esa partida) + **bono Fibonacci** **1, 2, 3, 5, 8, 13** según partidas ya completadas en la serie. En selección los puntos sirven sobre todo para **refrescar la tienda** (coste `SHOP_REFRESH_COST`).
- **Mazo en selección**: no es solo “hasta 10 cartas”: hay **huecos** (`DeckSlot`) con un máximo según la **partida** (**3–7** huecos, `maxSelectableSlotsForPartida`). En cada hueco puedes **apilar** la misma carta hasta **`MAX_COPIES_PER_DECK_SLOT_STACK` (3)**; al superar el toque en un hueco, una copia igual puede abrir **otro hueco** si cabe. Las **estrellas** (1★ / 2★) reflejan copias y bonifican PV/ATK (`stackStatsFromCopies` en `game-rules.ts`).
- **Tienda**: **`SHOP_OFFER_COUNT`** casillas fijas; al elegir una oferta la casilla queda vacía hasta refresco; misma carta puede repetirse en la rejilla hasta **`SHOP_MAX_SAME_CARD`**. La UI puede resaltar ofertas **apilables** sobre tu mazo actual.
- **Selección**: **Angular CDK Drag-Drop** para reordenar huecos del mazo; tienda por clics en ofertas.
- **Combate**: ataques **simultáneos** por asalto; tipos elementales y habilidades en **`combat.engine.ts`**; UI de animaciones (`battleUi`: golpes, curaciones, K.O. con retirada animada). Límite de seguridad de asaltos: **`MAX_DUEL_ASALTOS`**.
- **Gloria** (trofeos): constantes `GLORY_*` en `game-rules.ts` (participar, victoria, derrota, empate, bonus de serie).
- **Internacionalización**: **`I18nService`** (p. ej. ES/EN en menú); textos de tipos/habilidades alineados con referencias en `core/i18n/`.

## Tipos elementales (combate)

El daño usa el campo **`type`** de cada carta. La tabla de ventajas y el multiplicador efectivo están en **`combat.engine.ts`** (p. ej. ventaja **×1.25**, desventaja **×0.8**, neutro **×1**). Las habilidades se resuelven en el mismo motor (`abilityMap`, `resolveStrike`, etc.).

## Personalización rápida

- **Nuevas cartas**: edita **`angular-app/src/app/core/data/cards.json`** (y el modelo **`card.model.ts`** si añades campos). `cards.catalog.ts` reexporta el array tipado.
- **Economía / tienda / serie / apilamiento**: **`core/engine/game-rules.ts`**.
- **Combate y habilidades**: **`core/engine/combat.engine.ts`**.
- **Flujo de partida y persistencia del mazo entre partidas**: **`core/services/game-state.service.ts`**.
- **Estilos globales de cartas, batalla y selección**: **`angular-app/src/lucas-cards.scss`**.

## Tests

Hay pruebas unitarias del motor en **`combat.engine.spec.ts`**. Ejecutar con `npm test` dentro de `angular-app`.

---

*Si en el futuro vuelves a publicar una versión 100% estática en la raíz del repo, conviene enlazarla aquí y separar claramente “legacy estático” vs “Angular”.*

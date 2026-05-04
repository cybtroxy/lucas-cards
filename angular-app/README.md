# AngularApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.21.

**Serie (reglas):** ver el README del repo raíz. Constantes en `src/app/core/engine/game-rules.ts`: `SERIES_PARTIDA_WINS_TO_CLINCH` (10), `SERIES_PARTIDA_LOSSES_TO_ELIMINATE` (3); empate de partida no suma derrota. **Mazo:** `maxSelectableSlotsForPartida` (3 iniciales, +1 cada 2 partidas, máx. 6). **Batalla:** velocidad ×5 además de ×1/×2/×3 (preferencias en `UserPreferencesService`).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

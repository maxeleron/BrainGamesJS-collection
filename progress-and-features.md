# Progress and Features

Source review: 2026-10-14. This document describes the current repository, not a release guarantee. Maturity labels reflect the implemented code paths. Visual decisions remain provisional; see [design-code.md](design-code.md).

## Current progress

| Area | Current state | Maturity / remaining work |
| --- | --- | --- |
| Landing hub | Links to all three existing game pages, descriptions, theme selector, contact links, and responsive cards. | Navigation is implemented; copy overstates some unfinished game features. |
| Colors Order Challenge | Memorize, shuffle, reorder, check, and replay; configurable tiles and persisted settings. | Most complete game. Storage isolation, validation, accessible reordering, and a visible score summary are missing. |
| Mind Calc Challenge | Ten random-number questions, numeric answer entry, progress, percentage result, and replay. | Working fixed-rule arithmetic prototype. The advertised color-based rules and most settings are not implemented. |
| Visual Memory Challenge | Mouse-driven rectangle drawing, reset button, and settings UI. | Drawing prototype. Target generation, memorization/recall phases, timer, comparison, and scoring are absent. |
| Shared UI and theme | Token-based CSS, reusable shell/control styles, and persistent manual light/dark selection on all pages. | Shared foundation is implemented; design and interaction consistency still need review. |
| String Search Challenge | Listed as planned in README. | No implementation directory, game page, or hub card. |

## Implemented features

### Colors Order Challenge

Sources: [page](colors-order-challenge/index.html), [engine](colors-order-challenge/js/colors-order-engine.js), [game flow](colors-order-challenge/js/game.js), [settings/UI](colors-order-challenge/js/main.js), [styles](colors-order-challenge/css/main.css).

- `GameTile` creates a colored DOM tile; `GameTilesArr` manages tiles, rendering, shuffling, and SortableJS lifecycle.
- Selects colors without replacement from a cloned 36-color palette. Tile IDs record their original positions.
- Implements `Play` → `I Remembered` → `Commit Answer` → results using the action button's text as state. Results branch into `Play Again` → `I Remembered` for an immediate replay, or `Change Settings` → `Play` to return to configuration.
- Memorization is self-paced. After confirmation, a Fisher–Yates shuffle changes the order and SortableJS enables drag-and-drop reordering.
- Checks each tile's DOM position against its original ID. Correct/incorrect tiles receive borders and check/cross symbols; aggregate counts are logged to the console.
- Disables sorting after submission and destroys the previous SortableJS instance before another round.
- Settings: tile count (HTML range 2–36; default 8), Small/Medium/Large tile size (default Medium), Horizontal/Vertical/Cubic tile display (default Horizontal), and rules visibility.
- Exposes tile count, size, and display inline above the action button, synchronizes controls with `settingsObject`, and saves changes to `localStorage` immediately. Tile count, size, and display affect newly created rounds; rules visibility updates on save in the settings dialog.
- Consolidates the former Tile size and Tile format settings into one inline segmented Tile size control (Small, Medium, Large) to simplify configuration. Each size controls both height and width. In Horizontal mode, Small uses the former narrow width, Medium the normal width, and Large the full width. The selected size stays synchronized with saved settings and restored defaults.
- Adds a Tile display segmented control (horizontal, vertical, cubic) below Tile size. The choice is saved and restored, and older saved settings fall back to horizontal. Each new round resets the playground's display class to the selected mode.
- Renders Horizontal as stacked tiles and Vertical as tall, narrow fence boards in a strict single row (`flex-wrap: nowrap`) with horizontal scrolling (`overflow-x: auto`). Non-shrinking tiles use size-dependent widths and left alignment to keep both ends reachable, use the available width, and avoid vertical stacking; bottom padding separates the scrollbar from the tiles. Vertical dimensions follow Small/Medium/Large size, and answer symbols remain centered. Cubic rendering remains a stub and currently falls back to the stacked layout.
- Maps vertical mouse wheel events over the tile container to horizontal scrolling in Vertical mode. Horizontal wheel input and browser zoom gestures retain their normal behavior.
- Dynamically expands the header, main, and footer to 95vw width and maximum width during Vertical rounds, maximizing the horizontal scroll view. The shell transitions back to its standard width for other modes or when returning to configuration.
- Orders the header buttons with the Theme toggle first (left) and Settings gear second (right).
- Provides a collapsible footer with a transparent, borderless toggle inside the main content's bottom-right corner. Removing the external toggle wrapper eliminates the structural gap between the main block and footer. Collapsing hides the entire footer while keeping the toggle visible; the chevron points up to collapse and rotates down to expand.
- Shows inline settings only in the `Play` configuration view and hides them during memorization, answer reordering, and on the post-game screen.
- Presents two distinct post-game actions: `Play Again` immediately starts a new round with the current settings; `Change Settings` clears the playground, restores the initial rules, and returns to inline configuration.
- Restores default settings and synchronizes the form on opening the settings dialog. The Save button appears after changing rules visibility.
- Escape closes settings; Enter advances the game while settings are closed. Theme changes apply immediately.

There is no countdown, session history, difficulty progression, or displayed aggregate score. A shuffle can happen to preserve the original order.

### Mind Calc Challenge

Sources: [page](mind-calc-challenge/index.html), [engine](mind-calc-challenge/js/mind-calc-engine.js), [button wiring](mind-calc-challenge/js/game.js), [page UI](mind-calc-challenge/js/main.js), [styles](mind-calc-challenge/css/main.css).

- Generates ten integers in the range 0–99 and displays one question at a time.
- The actual answer rule is always **displayed number + 3** (`userAnswersArr[i] - 3 == taskList[i]`). All questions share the same CSS accent; there is no per-question color/rule mapping.
- Provides Play, Next, and final Commit Answer controls, automatic answer-field focus, and rejection of empty answers.
- Shows a percentage result and resets round data for replay. Progress advances in fixed ten-point increments on Next, reaches 90% before final submission, and is then reset/hidden.
- Uses a text input with a numeric input hint, three-character limit, and a keyup character filter. This is partial input filtering, not complete numeric validation.
- Concentration mode hides the header/footer and exposes a link to restore them; it does not invoke browser fullscreen.
- Clicking the title opens a rules dialog. Settings and rules have close buttons and Escape handling.
- Light/dark theme selection works through the shared controller.

The settings form displays question count (1–50, default 10), color-rule offset (default 2), hints, and progress toggles. These controls do not update the engine or persist game settings. The hidden Save button has no handler. The displayed offset also disagrees with the actual +3 rule. No hints, streak tracking, timing, or multiple arithmetic operations are implemented.

### Visual Memory Challenge

Sources: [page](visual-memory-challenge/index.html), [drawing prototype](visual-memory-challenge/js/game.js), [settings/UI](visual-memory-challenge/js/main.js), [unfinished engine](visual-memory-challenge/js/visual-memory-engine.js), [styles](visual-memory-challenge/css/main.css).

- Automatically calls `playBtn.click()` on page load, clearing the rules text and initializing a full-width, 400px-high drawing area.
- Mouse down/up coordinates create absolutely positioned rectangles, including drags in either direction. Rectangles require at least 20px in both dimensions.
- Rectangles use theme-aware borders and translucent accent fills. They are DOM elements, not an HTML canvas.
- Every action-button click clears the drawing area and sets its label to `I Remembered`. The intended multi-phase switch is commented out.
- Settings save/restore and form synchronization are implemented: element count (HTML range 2–20, default 5), border size (default medium), delay toggle (default on), timer seconds (1–60, default 5), and rules visibility (default on).
- Only rules visibility is connected to the current game UI, and the drawing initialization empties that text. Element count, border size, delay, and timer values are stored but do not control drawing/gameplay.
- The settings overlay closes through its close button, Escape, or a backdrop click. Theme changes apply immediately.

The engine is excluded by a commented-out script tag. Its constructors/drawing method are unfinished, and `let = array[i];` fails JavaScript syntax checking in strict mode. No generated target shapes, timed display, recall transition, answer comparison, or result screen exists.


### Shared infrastructure

- Static English HTML pages, vanilla JavaScript, and CSS. No application backend, framework, build pipeline, package manifest, automated test suite, or CI configuration is present in the inspected repository.
- [Shared UI CSS](css/shared-ui.css) supplies semantic color tokens, typography, spacing, borders, shadows, radii, layout widths, motion, and legacy token aliases.
- Shared styling covers the header/main/footer shell, settings gear, primary/secondary/ghost buttons, form fields, theme controls, dialogs/overlays, progress bars, rules panels, social links, and utility classes.
- Responsive rules adjust shell dimensions, padding, and type; the hub uses an auto-fitting card grid. Safe-area padding and reduced CSS transition duration are included.
- [Theme controller](js/theme.js) exposes `window.BGJSTheme` with initialization, storage access, application, and control synchronization methods. It applies `data-theme` on `<html>`, persists `bgjs_theme`, defaults to light, and normalizes every non-dark value to light.
- Each HTML head duplicates an early theme bootstrap before styles load to reduce a flash of the wrong theme. Theme storage reads/writes catch failures; theme radios update the current page immediately.
- Game styles load after the shared stylesheet and override accent tokens: violet for Colors Order, rose for Mind Calc, cyan for Visual Memory; the hub uses indigo and matching per-game card accents.
- Game pages have SVG letter-mark favicons, inline SVG settings/email icons, and local raster GitHub icons. The hub's GitHub icon is inline SVG.
- SortableJS 1.15.2 is loaded from jsDelivr for Colors Order. Inter is imported from Google Fonts with local/system font fallbacks. No service worker or offline asset cache is supplied.
- The repository includes an MIT license.

## Architecture overview

```text
BrainGamesJS-collection/
├── README.md
├── LICENSE
├── progress-and-features.md
├── design-code.md
├── index.html                         # Static landing hub
├── css/
│   ├── shared-ui.css                  # Tokens, shell, controls, dialogs
│   └── landing.css                    # Hub layout and game cards
├── js/
│   └── theme.js                       # Shared theme controller
├── colors-order-challenge/
├── mind-calc-challenge/
└── visual-memory-challenge/
    # Each game follows this file layout:
    ├── index.html
    ├── css/main.css
    ├── js/main.js
    ├── js/game.js
    ├── js/<game-name>-engine.js
    └── materials/                     # Favicon and GitHub image
```

### Responsibilities and script loading

| Game | Engine | `game.js` | `main.js` | Script order after shared theme |
| --- | --- | --- | --- | --- |
| Colors Order | DOM tile model, collection, shuffle, SortableJS integration. | Round flow and positional checking. | Settings, persistence, dialog, shortcuts. | `main.js` → engine → `game.js`; deferred. SortableJS loads first. |
| Mind Calc | Random tasks, answer collection, DOM updates, scoring, reset. | Wires buttons to engine functions. | Concentration mode and rules/settings dialogs. | Engine → `game.js` → `main.js`; scripts at end of body, without `defer`. |
| Visual Memory | Unfinished and not loaded. | Drawing handlers and reset; intended round flow commented out. | Settings, persistence, overlay. | `main.js` → `game.js`; deferred. |

The filenames suggest engine/UI separation, but there is no common game interface or DOM-independent engine layer. Scripts use classic shared global scope, page IDs, and load order. Colors Order's engine creates DOM nodes; Mind Calc's engine also handles UI transitions. Each game is a separate page, so similarly named globals do not currently collide in a single document.

### Reusable patterns and duplication

- Shared CSS and `BGJSTheme` are the actual shared runtime infrastructure.
- Colors Order and Visual Memory duplicate `Settings` classes, save/default/form synchronization, rules visibility, and modal handlers. Their storage schemas differ despite sharing one key.
- Header/footer markup, theme radios, early theme scripts, icon markup, and GitHub raster assets repeat across pages.
- Games reuse CSS tokens and conventional IDs such as `playground`, `playBtn`, `settingsGear`, and `settingsWindow`; this is styling/markup convention, not a reusable JavaScript component system.
- Dialog behavior differs: Visual Memory has a clickable overlay; Colors Order and Mind Calc use a body pseudo-element backdrop. Mind Calc also has a separate rules dialog and a table-based settings form.

## Known limitations and technical observations

### Correctness and persistence

| Observation | Consequence / practical implication |
| --- | --- |
| Colors Order and Visual Memory both use `localStorage["settingsObject"]`. | On the same origin, a game can load the other's incompatible schema. Missing tile fields can lead to an empty Colors Order round; saving/restoring one game's settings overwrites the other's record. |
| Those settings constructors parse JSON and access storage without guards or schema validation. | Malformed JSON or unavailable storage can stop settings initialization and later UI wiring. The shared theme controller has stronger error handling. |
| Numeric settings are saved from `.value` as strings; HTML bounds are not enforced in save handlers. | Blank/out-of-range values can be persisted. Colors Order coerces the count using `Number()`; excessive counts exhaust the palette. |
| Mind Calc hard-codes ten tasks, +3 scoring, and ten-point progress increments. | Wiring the existing form requires changing the engine as well; a one-question round also needs explicit handling because Commit is currently revealed only after Next. |
| Mind Calc accepts nonempty text via unary `+`; the keyup filter removes only one disallowed character per event and permits `+`. | Invalid pasted/input values can become `NaN` and be recorded rather than rejected with feedback. |
| Visual Memory retains `startDot` after mouseup and reads it without a null check. | A mouseup inside the field without an earlier field mousedown can throw; stale drag state can also be reused. No pointer capture or pointer/touch handlers exist. |
| Visual Memory's Large border option has `value="lagre"`. | The stored enum is misspelled and should be corrected before border-size behavior is implemented. |

### Interaction, accessibility, and consistency

- Dialogs have `role="dialog"`, accessible titles, and `aria-modal`, but no focus trap, focus restoration, or background `inert` handling. The body pseudo-element backdrop uses `pointer-events: none`, so it does not itself block background interaction.
- Mind Calc opens rules via a clickable `h1` without button semantics or keyboard activation. Its answer field and progress bar lack explicit accessible labels; the question-count control also lacks an associated label.
- Colors Order has no application-provided keyboard alternative to dragging tiles. Color is the only way to distinguish the memorization tiles; feedback symbols add a non-color cue only after checking.
- Visual Memory uses mouse events despite `touch-action: none`; responsive CSS does not establish touch drawing support.
- Results and changing game content have no live-region announcements. Theme radios are visually hidden without an explicit group keyboard-focus style.
- Colors Order's state depends on exact English button text, making copy changes/localization fragile. Other games use globals and inline display styles rather than explicit round state.
- CSS includes broad element/ID selectors, legacy class/token aliases, and `[style*="..."]` selectors with `!important` to accommodate JavaScript display changes. These increase coupling during visual changes.
- There are no in-game links back to the hub. Names vary between `Visual Memory` on its page and `Visual Memory Challenge` in the hub/README.
- README/hub/rules copy describes color-based arithmetic and memory reconstruction beyond what those two prototypes implement; the hub's Mind Calc streak wording has no supporting code.

### Dependencies and maintenance

- Colors Order assumes the CDN-created `Sortable` global exists; there is no load-failure fallback. Offline font loading can fall back to system fonts, but offline drag-and-drop requires SortableJS to be locally available/cached.
- Theme sharing depends on browser origin/storage behavior. File-URL storage behavior should be verified separately; the code has no `storage` listener for live synchronization between already-open tabs and no system-theme preference mode.
- Theme changes can run through both group and document `change` listeners, redundantly applying/persisting the same value. This is minor cleanup, not a missing theme feature.
- Debug console output, unused variables/DOM queries, commented experiments, and mixed class/function naming remain in game scripts.
- Shared CSS comments mention possible future Android token mapping, but the repository contains no Android implementation or explicit delivery plan.

## Planned and missing items

| Item | Evidence | What is missing |
| --- | --- | --- |
| String Search Challenge | Explicitly marked planned in [README](README.md). | Entire game: target strings, distractors, input/checking flow, page, and hub entry. |
| Color-based arithmetic | README, hub description, Mind Calc rules copy, and color/value settings. | Task color/rule model, applying configured transformations, useful rule instructions/hints, and connected settings. |
| Visual memorization and reconstruction | README, game rules, engine skeleton, and commented round switch. | Reference shapes, display/hide phases, timer behavior, reproduction comparison, and scoring. |
| Visual Memory configuration behavior | Existing settings fields and persisted properties. | Applying element count, border size, delay, and timer to gameplay. |
| Stable visual specification | Existing shared tokens and per-game CSS are a starting point. | Agreed design principles, component contracts, contrast checks, and responsive/interaction decisions; record them in the design stub. |

Other recommendations below are engineering suggestions, not an established product roadmap. No accounts, leaderboards, analytics, multiplayer, or backend work is explicitly planned in the inspected sources.

## Suggested next steps

1. **Isolate and validate stored settings.** Use per-game keys and explicit default schemas; handle storage/JSON failures, normalize numbers/enums, enforce ranges, and decide how to migrate the ambiguous legacy key. Check switching between Colors Order and Visual Memory on one origin.
2. **Make current behavior clear to players.** Explain the actual +3 rule in Mind Calc and label Visual Memory as a prototype until its memory loop exists. Align README, hub, rules, and page naming with implemented behavior.
3. **Finish Mind Calc's existing configuration.** Connect question count and rule offset, derive progress from task count, handle single-question rounds, validate finite numeric answers, then introduce the documented color/rule mapping and meaningful hints.
4. **Complete Visual Memory's core loop.** Repair the engine before loading it, generate/store reference rectangles, implement memorization → recall → check/replay, define comparison tolerances, and apply the existing timer/count/border settings. Replace mouse-only handling with pointer events and robust drag-state cleanup.
5. **Improve shared interactions and feedback.** Provide modal focus management/background blocking, a keyboard rules trigger, labels/live feedback, keyboard tile reordering, an on-page Colors Order result summary, and hub navigation. Verify color distinction and contrast in both themes.
6. **Reduce duplicated plumbing and establish focused checks.** Extract validated settings/modal helpers after their behavior is agreed; use explicit game state and remove dead code. Add checks for settings isolation, scoring, round boundaries, shuffle integrity, and drawing coordinates, plus syntax checks and browser smoke checks. Make SortableJS failure/offline behavior deliberate.
7. **Record design decisions as they stabilize.** Fill [design-code.md](design-code.md) after reviewing narrow/wide layouts, short viewports, touch behavior, and both themes. Keep cosmetic choices provisional while functional gaps are resolved.
8. **Implement String Search Challenge when the existing games have reliable core flows.** Use the established page/theme patterns and add its hub card with accurate instructions.

## Review and verification scope

All four HTML pages, shared/game CSS, all ten JavaScript files, README, license, and game favicon sources were inspected. `node --check` passed for the nine loaded JavaScript files and failed for the excluded Visual Memory engine at `let = array[i];`, confirming its syntax defect. These checks do not establish browser interaction correctness, accessibility compliance, or visual quality; those observations above come from source inspection, and browser/device verification remains a next step.

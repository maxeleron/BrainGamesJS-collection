# Design Code — Working Stub

The collection's design is still evolving. This file records the current CSS/JavaScript approach and provides placeholders for future decisions. Existing values are observations, not an approved visual specification. Functional status and implementation gaps are documented in [progress-and-features.md](progress-and-features.md).

## Design principles / goals

**TODO:** Agree on the intended visual character, hierarchy, readability goals, accessibility requirements, and how much identity each game should have.

Current foundation: a shared centered shell, focused game area, theme-aware surfaces, fluid type/layout, and per-game accent colors. Shared CSS targets 48px primary touch controls and includes reduced-transition behavior. These are implementation choices to review rather than finalized principles.

## Color system & theme

Sources: [shared-ui.css](css/shared-ui.css), [theme.js](js/theme.js), [landing.css](css/landing.css), and each game's `css/main.css`.

- Semantic custom properties cover page/surface/elevated/muted backgrounds, text levels, accent states, success/error/warning, borders, shadows, and overlays.
- Light values are defined under `:root, [data-theme="light"]`; dark overrides use `[data-theme="dark"]`. CSS also sets `color-scheme` for native browser controls.
- `BGJSTheme` persists manual selection in `localStorage` under `bgjs_theme`, applies it to `<html data-theme>`, and synchronizes radios/active labels. Default is light; storage failures fall back safely. Each page has an early head bootstrap before stylesheet loading.
- Game-specific styles override shared accent tokens; the hub separately defines matching card accents. Gameplay tile colors are a fixed palette, independent of the shell theme.
- Legacy variables such as `--page-bgc`, `--text-color`, and `--button-bg` alias semantic tokens during migration.

| Current token / identity | Light | Dark |
| --- | --- | --- |
| Page background `--bg-page` | `#f0f2f5` | `#0c1017` |
| Surface `--bg-surface` | `#ffffff` | `#151b26` |
| Primary text `--text-primary` | `#0f172a` | `#f1f5f9` |
| Hub/default accent | `#4f46e5` | `#818cf8` |
| Colors Order accent | `#5b21b6` | `#a78bfa` |
| Mind Calc accent | `#e11d48` | `#fb7185` |
| Visual Memory accent | `#0891b2` | `#22d3ee` |

**TODO:** Approve palettes and contrast targets; decide on system-theme support, non-color gameplay cues, and whether favicon colors should match game accents exactly. There is currently no system-preference mode or live cross-tab theme listener.

## Typography

Current observations:

- Inter weights 400/500/600/700 load through a Google Fonts CSS import. Fallbacks include Aptos, Segoe UI, and system fonts.
- Shared tokens define six fluid font sizes (`xs` through `2xl`) with `clamp()`, weights 400–700, and line heights 1.25/1.5.
- Header titles are absolutely centered, with constrained widths and ellipsis; small-screen rules allow wrapping. Hub titles and large arithmetic text add local size/letter-spacing rules.

**TODO:** Choose the long-term font/loading strategy, heading/body/control hierarchy, minimum readable sizes, numeric presentation, and title overflow behavior with multiple header actions.

## Spacing / layout patterns

Current observations:

- Spacing tokens span 0.25, 0.5, 0.75, 1, 1.5, 2, 3, and 4rem. Radius tokens are 4/6/8px; shadows have three levels.
- The body stacks centered header, main, and footer sections. Their joined borders/radii form one shell; `.app` and `.appElement` share width conventions.
- The base maximum shell width is 42rem, with shared responsive overrides at 480, 900, 1200, and 1800px. Page styles load later: the hub declares 56rem and Visual Memory 52rem maximum widths.
- Main content uses flex layout; the hub uses `auto-fit` cards with a 15.5rem preferred minimum. Dialogs are centered and scrollable, with viewport-based limits and a desktop minimum height.
- Small-screen CSS includes safe-area padding. Visual Memory currently sets drawing height to 400px through JavaScript.

**TODO:** Define approved container widths, breakpoints, vertical rhythm, short-viewport dialog behavior, and game-area sizing. Confirm layout in split windows, narrow screens, and large displays.

## Component patterns

| Pattern | Current implementation | Decision placeholder |
| --- | --- | --- |
| Buttons | `.btn-primary`, `.btn-secondary`, `.btn-ghost`, `.btn-block`; legacy `.button`, `.game-button`, `.closeWinBtn`; hover, active, and focus-visible styling. | **TODO:** Standardize class names, sizes, disabled/loading states, and action hierarchy. |
| Header controls | Centered title, SVG settings gear, optional right-side action group. | **TODO:** Define title/action spacing and an accessible rules entry. |
| Hub cards | Linked cards with letter badges, description, Play cue, per-game accents, and hover/focus elevation. | **TODO:** Approve card density, badge/icon style, and prototype/status treatment. |
| Game containers | Shared `#playground` hook with game-specific tile, arithmetic, or drawing layouts. | **TODO:** Define game-area boundaries and idle/active/result presentation. |
| Forms/theme controls | Token-based inputs/selects, checkbox/radio accent colors, theme labels styled as a segmented group. | **TODO:** Define validation feedback and visible keyboard focus for theme controls. |
| Dialogs | Settings/rules panels, close controls, scroll locking; Visual Memory uses an overlay container while other dialogs use a body backdrop. | **TODO:** Unify layout, backdrop behavior, focus management, and action rows. |
| Feedback/progress | Shared success/error tokens and progress styling; Colors Order adds symbols/borders, Mind Calc displays a percentage. | **TODO:** Define accessible result messages, score summaries, and announcements. |
| Social links/icons | Shared 48px icon links; inline SVG plus raster GitHub icons lightened in dark mode. | **TODO:** Decide whether to standardize on SVG and consolidate repeated assets. |

Some styles compensate for inline JavaScript display values with attribute selectors and `!important`. **TODO:** Agree on state classes/component boundaries before further consolidation.

## Game-specific visual notes

- **Colors Order:** Violet shell accents; vertically stacked fixed-palette tiles with three heights and widths. Sorting uses dashed borders, a ghost state, and a slight chosen-tile scale. Checked answers use success/error borders and check/cross symbols. **TODO:** Review palette distinguishability, non-color identifiers, long sequences, and keyboard interaction.
- **Mind Calc:** Rose accents, oversized centered question/answer text, a green concentration button, progress bar, and table-based settings. Every question currently uses the same accent; rule-specific colors are not implemented. **TODO:** Design a readable rule legend/hint system once arithmetic behavior is specified.
- **Visual Memory:** Cyan accents, a wider drawing area, and translucent rectangles outlined with the primary text color. JavaScript changes the drawing surface to `--bg-surface` and fixes its height at 400px. **TODO:** Define reference/recall/comparison states and spatial feedback after the core game is implemented.
- **Hub:** Indigo theme controls and per-game badges/cards. **TODO:** Align names and descriptions with game maturity; review header title/theme-control fit.

## Open questions / things to decide

- **TODO:** Which token values are ready to stabilize, and which should remain experimental?
- **TODO:** How much visual variation should games have beyond accents and game content?
- **TODO:** What accessibility/contrast criteria will be used, particularly for color-dependent gameplay and drawing?
- **TODO:** Should themes follow the operating system or remain an explicit light/dark choice?
- **TODO:** How should prototype status, instructions, validation errors, and results be presented consistently?
- **TODO:** What are the expected touch, keyboard, small-screen, and offline experiences?
- **TODO:** Should shared dialogs, icons, navigation, and markup become reusable components?
- **TODO:** How should motion be limited across CSS transitions and SortableJS animation?

Record approved decisions here with their rationale and affected source files. Do not treat the current CSS snapshot as a completed design system.

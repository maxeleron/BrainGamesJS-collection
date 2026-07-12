# BrainGamesJS Collection

A collection of JavaScript browser games for mind training, modern UI practice, and learning JS.

**Play:** open [`index.html`](index.html) in the repo root for the hub, or jump to a game below.

## Games

### 1. [Mind Calc Challenge](mind-calc-challenge/)

Solve color-based arithmetic: the number’s color tells you how to transform it before answering (for example, red might mean “add 3”).

### 2. [Colors Order Challenge](colors-order-challenge/)

Memorize a sequence of color tiles, then restore the order after they are shuffled (drag & drop).

### 3. [Visual Memory Challenge](visual-memory-challenge/)

Remember shapes and positions, then redraw them from memory.

### 4. String Search Challenge _(planned)_

Quick visual search for target strings among distractors.

## Design system

- Shared UI: [`css/shared-ui.css`](css/shared-ui.css)
- Theme controller: [`js/theme.js`](js/theme.js) (`localStorage` key `bgjs_theme`, default **light**)
- Light / Dark themes work on the hub and every game

## Structure

```
BrainGamesJS-collection/
├── index.html                 # Landing hub
├── css/shared-ui.css
├── js/theme.js
├── colors-order-challenge/
├── mind-calc-challenge/
└── visual-memory-challenge/
```

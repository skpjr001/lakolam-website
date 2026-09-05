---
title: "Futoshiki"
blurb: "Futoshiki — a Latin square constrained by printed inequality signs"
category: puzzle
version: "1.0.0"
---
A Latin square with inequality signs: fill 1..n once per row and column, and
obey every printed `<`.

## What it is

An `n×n` grid holding each of 1..n exactly once per row and column — the
Latin-square rule sudoku shares — with chevrons printed between some
neighbouring cells. The chevron points at the smaller value. Very few digits
are given; the signs do the work.

## How to play

Start where a sign chain forces its ends: in a 5×5, a run `a < b < c < d < e`
along a row pins all five. Elsewhere, bounds reasoning narrows candidates —
a cell on the large side of a sign cannot hold 1 — and the Latin-square rule
finishes the job.

## Why it is in the catalogue

The clearest demonstration of the shared engine's leverage: futoshiki is a
*one value per cell* puzzle, so rows and columns are `AllDifferent`
(unchanged since sudoku), uniqueness and thinning are `count_solutions` and
`reduce_while_unique`, and the rating is the technique ladder. The only new
code is the inequality propagator — about seventy lines of bounds reasoning.

## History

Published by Tamaki Seto in Japan (2001) and popularised internationally by
*The Guardian* from 2006 under the name Futoshiki ("not equal"); also sold as
Hutosiki and Unequal.

## The implementation's guarantees

- **Uniqueness and no guessing**, both proved on the board that ships: the
  ladder must finish it below `Backtrack`, and `is_unique` is re-checked
  independently of the thinning loop.
- **Both kinds of clue are thinned**: digits first, then signs, each while the
  ladder can still finish unaided — a futoshiki printed with every possible
  sign is a chore, not a puzzle, and the test refuses both extremes.
- The answer is checked against the rules directly (`obeys`) before any
  search runs, so a bug in the propagator cannot hide behind one in the
  generator.
- **Signs are drawn as paths, not glyphs**: the first render used `∧`/`∨`
  text for vertical pairs and the embedded font had neither, so every
  vertical sign silently vanished. A path cannot go missing.
- Rating basis: `technique_ladder` — a measurement of the work, not a proxy.

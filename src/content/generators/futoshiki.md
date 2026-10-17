---
title: "Futoshiki"
blurb: "Futoshiki — a Latin square constrained by printed inequality signs or consecutive dots"
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

**Consecutive pages** print dots instead of signs. A dot between two cells
means their numbers are one apart (3 and 4, or 4 and 3); **no dot means
they are not**. So the cell across a dot from a 1 must be a 2, and if a 3
has no dots around it, none of its neighbours is a 2 or a 4.
Use the empty edges as much as the dots — they are what pin most cells.

## Purpose

The clearest demonstration of the shared engine's leverage: futoshiki is a
*one value per cell* puzzle, so rows and columns are `AllDifferent`
(unchanged since sudoku), uniqueness and thinning are `count_solutions` and
`reduce_while_unique`, and the rating is the technique ladder. The only new
code is the inequality propagator — about seventy lines of bounds reasoning.

## History

Published by Tamaki Seto in Japan (2001) and popularised internationally by
*The Guardian* from 2006 under the name Futoshiki ("not equal"); also sold as
Hutosiki and Unequal.

## This implementation

- **Spec knobs:** `size` (4–9), `difficulty`, `sign_share` (inequality
  boards: the share of neighbour pairs that start with a sign, before
  thinning), `cell`, `line`, and `marks`: `inequality` (the default — `<`
  and `>` signs) or `consecutive` (the Renzoku variant: a dot between
  neighbours one apart, and no dot means they are not). A spec without
  `marks`, or with `inequality`, is byte-identical to before — page, key
  and metadata; a consecutive board adds `marks` and `dots` to the meta.
- **Generation (consecutive):** answer first, on its own seed stream — a
  Latin square, then a dot on exactly the neighbour pairs whose values are
  one apart. Every edge is a clue (a dot, or the absence of one), so no
  edge is thinned; the digits are thinned while the technique ladder can
  still finish the board.
- **Solving (consecutive):** two propagators on the shared engine — a dot
  keeps only values with a partner one apart next door; an undotted edge
  crosses a placed digit's two value-neighbours off the cell beside it —
  plus `AllDifferent` per row and column. Uniqueness is proved by
  `is_unique` on the printed board, and the tests re-count every board
  (4×4–6×6, three bands, several seeds) with an independent cell-by-cell
  backtracking search that knows only the definition, and check that the
  dots alone (without the "no dot means not" half) leave some boards
  ambiguous — the absent dots are real clues.
- **Consecutive bands:** the dots carry so much that boards thin to a digit
  or two and rate low. Measured over seeds 1–8: 4×4 serves Kids and Easy;
  5×5 Kids, Easy and (5 seeds in 8) Medium; 7×7 and 9×9 Easy and Medium
  (7×7 Kids half the time; 9×9 never Kids). Hard and Expert are not
  reached; such a request is served as the nearest band found and
  labelled `requested_difficulty`, never relabelled.

### Guarantees

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

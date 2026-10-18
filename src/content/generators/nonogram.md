---
title: "Nonogram"
blurb: "Picture logic puzzles, proven solvable by line reasoning alone"
category: puzzle
version: "1.1.0"
---
Picture logic: shade cells so each row and column matches its run-length clues,
revealing a hidden picture.

## What it is

A grid with numbers along the top and left. Each number list describes the
runs of filled cells in that row or column, in order, with at least one blank
cell between runs. Solving the grid correctly reveals a small picture — a
heart, a cat, a boat.

## How to play

Work line by line. If a 15-wide row is clued "12", the middle nine cells are
filled in every legal placement — mark them. Rows and columns feed each other:
every cell fixed in a row narrows its column, and the puzzle finishes by
bouncing between the two directions. Mark known-blank cells with a dot; they
are as informative as filled ones.

The moves, from first to last:

- **Overlap.** Slide a run as far left as it can go and as far right; the
  cells it covers both times are filled. Cells no run can reach are blank.
- **Edges and glue.** A filled cell near the edge, or next to a blank, pins
  its run: a "3" whose second cell is filled must also fill the third, and
  everything beyond its reach is blank.
- **The whole line.** When the quick rules stall, check every way the line's
  numbers can still fit what you know; a cell that is the same in all of
  them is fixed.
- **Try a cell.** On the hardest puzzles, suppose a cell is filled and follow
  what it forces in its row and column, then in the lines those cross. If a
  line becomes impossible, the cell was blank. (The very hardest need the
  supposition followed across the whole grid.)

Some puzzles print a few cells already filled (shaded) or marked blank (a
dot): start from them.

## Purpose

The most visual of the logic puzzles — the only one whose answer is a picture,
which makes it a favourite for younger solvers and for themed books. It also
carries the workspace's strictest quality bar: a nonogram that needs guessing
is rejected outright, because no human solves one that way.

## History

Invented independently in the late 1980s by **Non Ishida** (a Tokyo graphics
editor, via a skyscraper-lights design competition) and puzzle author **Tetsuya
Nishio**. Serialised in Japanese magazines from 1988, brought to The Sunday
Telegraph in 1990 under the name *nonogram* (after Ishida). Also known as
picross, griddlers, hanjie, and paint-by-numbers.

## This implementation

- **Spec knobs:** `rows`, `cols` (5–50), `picture` (a named silhouette or
  random texture), `density` for the random pictures, `difficulty` (unset by
  default), `givens` (`none` / `auto`), `image` (an uploaded PNG or JPEG),
  `cell`, `line`.
- **Generation:** render the picture to a bitmap, derive the clues, then
  **verify the grid is solvable by line reasoning alone** — the O(n·k)
  reachability line solver in `lako-solver::line`. Named silhouettes are
  re-rendered slightly fatter or leaner across retries until a line-solvable
  thickness is found, rather than abandoning the requested picture.
- **Guarantees:** line solving makes only forced deductions, so completing the
  grid *is* the uniqueness proof — no separate solution count is needed.
- **Difficulty:** the number of full sweeps the line solver needed; more
  passes means more row/column cross-referencing.
- **Version 1.1 — a technique ladder, givens, photos, 50×50.** Pages with
  `difficulty`, `givens` and `image` all unset are made exactly as before
  (byte-identical), rated by sweeps (`rating_basis: line_solve_passes`).
  Setting any of them takes the ladder path, rated by the hardest rung the
  solve needed, cheapest first (`rating_basis: hardest_rung`):
  **overlap** (Kids: runs slid to both extremes, honouring only crosses),
  **edge and glue** (Easy: the same honouring filled cells too),
  **full line** (Medium: the exact single-line solve), **short probe**
  (Hard: suppose a cell, follow full-line reasoning three generations of
  lines out — row and column, the lines crossing what they forced, the lines
  crossing those; a broken line fixes the cell the other way — two
  generations can never break a line at a full-line fixpoint), and **deep
  probe** (Expert: the supposition followed across the whole grid; a board
  needing six or more short probes and nothing deeper also rates Expert —
  sustained trial, the size of the what-if work as the tie-break). Every
  rung is sound and the solve settles every cell, so the clues (with any
  givens) have exactly one solution; the tests re-prove it with an
  independent row-by-row search. Probing rungs have a fixed work budget per
  solve, which can only leave a board unsolved. A `difficulty` band is
  aimed for by rating the original path's pictures in order and taking the
  first in the band, else the nearest (`requested_difficulty` records the
  request); silhouettes are mostly Easy, random pictures reach Medium to
  Expert. `givens: auto` keeps the nominal picture exactly and adds the
  fewest given cells the ladder needs at the band's ceiling (givens are
  added at line-reasoning strength — the next one is the undecided cell on
  the busiest undecided row and column, filled cells first — then dropped,
  latest first, while the ladder at the band's ceiling still finishes) — which also makes
  Kids and Easy reachable for any picture. `image` thresholds the upload to
  the grid (fitted, aspect kept, half ink; very pale or dark photos at 35 %
  fill) and, without givens, edits cells the ladder cannot reach — noisy
  ones first — until full-line reasoning finishes it; `edited_cells` and
  `givens` are in the meta. A bad upload is a clean spec error.
  - **Sizes 41–50** are new (requests above 40 used to be clamped to 40).
  - **The repair fallback:** where every original draw fails (random
    pictures at large sizes, mostly), the first draw is repaired instead —
    majority-smoothed while that helps, then edited cell by cell — so the
    page no longer errors. Only pages that used to fail change.

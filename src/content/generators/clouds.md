---
title: "Clouds"
blurb: "Clouds — shade rectangular clouds at least 2×2 that never touch, matching the row and column totals"
category: puzzle
version: "1.0.0"
---
Find the rain clouds hiding in the sky: square-cornered, at least 2×2, and
never touching.

## What it is

A square grid with numbers beside some rows and columns. Hidden in it are
clouds — solid rectangles of shaded cells, each at least two cells wide and
two cells tall. The numbers tell how many shaded cells each row or column
holds.

## How to play

Shade cells so that:

- every group of shaded cells forms a solid rectangle at least 2 cells wide
  and 2 cells tall — a cloud;
- clouds never touch each other, not even at a corner;
- each number to the left of a row gives how many shaded cells that row
  holds, and each number above a column how many that column holds.

Lines without a number may hold any amount. A 0 clears its whole line. Any
2×2 square of the grid holds 0, 1, 2 side by side, or 4 shaded cells —
never 3, and never 2 on a diagonal. A cell with no room for a 2×2 cloud
around it stays empty, and since every cloud crosses a line in a stretch at
least two cells long, a single empty cell between white ones in a line can
never be shaded.

## Purpose

A gentle blend of Battleships and nonograms: line arithmetic decides where
the clouds can be, and their rectangle shape lets each discovery spread.

## History

Clouds (also called Rain Clouds, or Wolken in German) is a staple of the
World Puzzle Federation's Puzzle Grand Prix rounds and of puzzle
championship instruction booklets. Like Battleships it hides shapes behind
row and column totals, but the shapes are rectangles of any size.

## This implementation

- **Spec knobs:** `size` (5–10; 0 picks from the difficulty — 6, 7, 8, 8,
  10 from Kids to Expert), `difficulty`, `cell`, `line`.
- **Generation:** clouds of seeded size (2–3 cells each way, now and then a
  long 4×2 on boards from 8×8) are dropped at seeded places that keep a gap
  from every other cloud, and each one is kept only if all the row and
  column totals still settle the sky at the requested rung. Totals are then
  erased one at a time in seeded order — first while the rung below the
  ceiling still settles every cell, then while the ceiling does.
- **Solving:** shaded/white cells on a ladder of four rungs — *totals and
  blocks* (each total full or empty; no 2×2 block with three shaded cells
  or two diagonal ones), *cloud size* (every shaded cell needs a 2×2 block
  around it with no white cell), *line runs* (a whole line at once: every
  way to make its total from runs at least two cells long, by forward and
  backward reachability) and *trial* (assume a cell, propagate the lower
  rungs, keep the opposite on a contradiction).
- **Guarantees:** deterministic per seed; at least one cloud; exactly one
  sky, proven because the sound ladder settles every cell, confirmed by a
  capped exhaustive count (a count that runs out of budget skips the
  attempt), and re-proven in tests by an independent search whose final
  check is the rulebook itself (every shaded group fills its bounding box of
  at least 2×2, and no two groups come within a corner of each other).
  Rated by the hardest rung needed: totals and blocks are Kids up to 6×6
  and Easy above; cloud size is Easy; line runs are Medium; trial is Hard
  up to 8×8 and Expert above. Every band is reached at its default size; a
  band a chosen size cannot reach is served at the nearest band found and
  labelled as such.

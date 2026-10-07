---
title: "Creek"
blurb: "Creek — shade cells so each corner number counts the shaded cells around it and the white cells stay connected"
category: puzzle
version: "1.0.0"
---
Shade the banks so the water still flows everywhere — the numbers on the
grid points count the shaded cells around them.

## What it is

A square grid with small numbers sitting on some of its grid points — the
corners where four cells meet. Each number tells how many of the cells
touching that point are shaded. The white cells left over must form one
connected creek.

## How to play

Shade some cells so that:

- each number on a grid point equals the shaded cells among the (up to
  four) cells that touch that point — two at the edge of the grid, one in
  a corner;
- all the white cells form one group, joined through cells that share a
  side.

A 0 clears every cell around it, and a 4 shades all four. A number on the
edge or in a corner that equals the cells it touches shades them all. Keep
the white area in one piece: a cell whose shading would cut off some white
cells must stay white.

## Purpose

Counting and connectivity in one small package: every number is a tiny
local sum, and the single creek ties the whole board together.

## History

Creek is a classic of the World Puzzle Federation's Puzzle Grand Prix and
the World Puzzle Championship, and appears in Erich Friedman's puzzle
collections and on puzz.link. It shares its "one connected white area" rule
with Nurikabe-style shading puzzles, while its clues on the grid points, as
in Slant, set it apart.

## This implementation

- **Spec knobs:** `size` (4–12; 0 picks from the difficulty — 5, 6, 7, 8,
  10 from Kids to Expert), `difficulty`, `cell`, `line`.
- **Generation:** cells in seeded order are shaded with a seeded chance
  (45–65 %) whenever the white cells stay connected. Every grid-point count
  is printed — these always settle the board (a corner fixes its one cell,
  and each next point along the edge, then inside, fixes one more) — and
  counts are erased one at a time in seeded order, first while the rung
  below the ceiling still settles every cell and then while the ceiling
  does, so the boards lean on their top rung.
- **Solving:** a ladder of three rungs on shaded/white cells — *counts*
  (each number on its own: full or empty), *connectivity* (cells the white
  area cannot reach are shaded, and a cell whose shading would split the
  white area is white — cut cells found by one depth-first search), and
  *trial* (assume a cell, propagate the lower rungs, keep the opposite on a
  contradiction).
- **Guarantees:** deterministic per seed; exactly one shading, proven
  because the sound ladder settles every cell, confirmed by a capped
  exhaustive count (a count that runs out of budget skips the attempt), and
  re-proven in tests by an independent search that knows only the rules as
  a feasibility test. Rated by the hardest rung needed, with size as the
  tie-break: counts are Kids up to 5×5 and Easy above; connectivity is
  Medium up to 7×7 and Hard above; trial is Hard up to 7×7 and Expert
  above. Every band is reached at its default size; a band a chosen size
  cannot reach is served at the nearest band found and labelled as such.

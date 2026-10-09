---
title: "Yajikabe"
blurb: "Yajikabe — shade one connected wall with no 2×2 block; each arrow counts the shaded cells it points at"
category: puzzle
version: "1.0.0"
---
Build one connected wall with no thick blocks — every arrow counts the wall
that lies ahead of it.

## What it is

A square grid with some numbered arrows. Shading cells builds a wall. The wall
must be one connected piece and may never fill a 2×2 square. Each arrow cell
stays white, and its number tells how many shaded cells lie in the direction
it points, all the way to the edge of the grid.

## How to play

Shade cells so that:

- all the shaded cells form one group, joined through cells that share a
  side;
- no 2×2 square is entirely shaded;
- cells with an arrow stay white, and each number equals the shaded cells
  in the arrow's direction, counted all the way to the edge (they need not
  be next to each other).

A 0 clears every cell it points at. An arrow whose number equals all the
cells it could still shade shades them all. Wherever three cells of a 2×2
square are shaded, the fourth is white. Keep the wall in one piece: a white
cell that would cut it in two must be shaded, and a cell the wall cannot
reach stays white.

## Purpose

A gentle meeting of two classics: the arrow counting of Yajilin and the
connected, pool-free wall of Nurikabe. The counts are easy to read, and the
one-wall and no-block rules give the logic its depth.

## History

Yajikabe was probably invented by the Japanese designer Naoki Inaba: his
puzzles from 2002 are the oldest known. The name joins Yaji(lin) and
(Nuri)kabe, the two genres it borrows from. Otto Janko's collection gives
the rules as: a numbered cell is always white; the number is how many black
cells lie in the arrow's direction up to the edge; black cells never cover a
2×2 area and form one orthogonally connected area.

## This implementation

- **Spec knobs:** `size` (5–10; 0 picks from the difficulty — 5, 6, 7, 8, 10
  from Kids to Expert), `difficulty`, `cell`, `line`. Clamped values are
  reported as `requested_*`.
- **Generation:** a random wall grows from one cell, never closing a 2×2
  block and preferring cells that touch it on one side only, until 40–50 % of
  the grid is shaded. Arrows are added on white cells where the ladder leaves
  the most cells unsettled (the direction with the most open cells ahead),
  then erased one at a time, in seeded order, while the ladder still settles
  every cell at the requested rung.
- **Solving:** a ladder of three rungs on shaded/white cells — *arrows and
  blocks* (each arrow's count between the sure and the possible shaded cells
  on its ray; no full 2×2 block), *connectivity* (cells the wall cannot reach
  are white, a cell whose loss would split the wall is wall), and *trial*
  (assume a cell, propagate the lower rungs, keep the opposite on a
  contradiction).
- **Guarantees:** deterministic per seed; exactly one shading, proven because
  the sound ladder settles every cell, confirmed by a capped exhaustive count,
  and re-proven in tests by an independent search that knows only the rules
  as a feasibility test. Rated by the hardest rung needed (`rating_basis:
  hardest_rung_with_size_tiebreak` — Kids/Easy: arrows and blocks, by size;
  Medium: connectivity; Hard: trial; Expert: trial on 9×9 and larger). A band
  this size cannot reach is served at the nearest rung found and labelled as
  such beside `requested_difficulty`. A board whose confirming count runs out
  of its node budget is treated as ambiguous and the next attempt is tried.

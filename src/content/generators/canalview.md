---
title: "Canal View"
blurb: "Canal View — shade one connected canal with no 2×2 pool so each number counts the canal it sees"
category: puzzle
version: "1.1.0"
---
Dig one connected canal with no wide pools — every number counts the canal
it can see.

## What it is

A square grid with some numbers. Shading cells digs a canal. The canal must be
one connected channel and may never open into a 2×2 pool. The numbered cells
are dry land, and each number tells how many canal cells can be seen from it.

## How to play

Shade cells so that:

- all the shaded cells form one group, joined through cells that share a
  side;
- no 2×2 square is entirely shaded;
- numbered cells stay white, and each number equals the shaded cells it sees
  in a straight line up, down, left and right — each line stops at the first
  white cell or the edge (the number does not count itself).

A 0 clears all four of its neighbours. A number that equals everything it
could possibly see shades all of it. Wherever three cells of a 2×2 square are
shaded, the fourth is white. Keep the canal in one piece: a white cell that
would cut the canal in two must be shaded, and a cell the canal cannot reach
stays white.

## Purpose

A clean introduction to "line of sight" shading puzzles: the counting is
easy, while the single-canal and no-pool rules give the logic its depth.

## History

Canal View was invented by the Indian puzzle author Prasanna Seshadri and has
appeared at World Puzzle Championship and US puzzle championship rounds. It
borrows the connected, pool-free wall of Nurikabe and the sight-line counting
of Kurodoko.

## This implementation

- **Spec knobs:** `size` (5–10; 0 picks from the difficulty — 5, 6, 7, 8, 10
  from Kids to Expert), `difficulty`, `cell`, `line`.
- **Generation:** a random canal grows from one cell, never closing a 2×2
  block and preferring cells that touch it on one side only, until 40–50 % of
  the grid is shaded. Numbers are added where the ladder leaves the most cells
  unsettled, then erased one at a time, in seeded order, while the ladder
  still settles every cell at the requested rung.
- **Solving:** a ladder of three rungs on shaded/white cells — *sight and
  blocks* (each number's count lies between the sure shaded run and the
  not-yet-white run in its four directions, every cell of its row and column
  probed against both bounds; no full 2×2 block), *connectivity* (cells the
  canal cannot reach are white, a cell whose loss would split the canal is
  canal — cut cells found by one depth-first search), and *trial* (assume a
  cell, propagate the lower rungs, keep the opposite on a contradiction).
- **Guarantees:** deterministic per seed; exactly one shading, proven because
  the sound ladder settles every cell, confirmed by a capped exhaustive count,
  and re-proven in tests by an independent search that knows only the rules as
  a feasibility test. Rated by the hardest rung needed (Kids/Easy: sight and
  blocks, by size; Medium: connectivity; Hard: trial; Expert: trial on 9×9 and
  larger). Every band is reached at its default size. When a requested band is
  not reached in 24 attempts — for instance Kids or Easy on a large board,
  where the first rung alone cannot settle every cell — the ladder is raised
  one rung at a time and the nearest band found is returned and labelled as
  such. A board whose confirming count runs out of its node budget is
  treated as ambiguous and the next attempt is tried (v1.1.0; before, such a
  board — seen at 10×10 Hard — aborted the whole page).

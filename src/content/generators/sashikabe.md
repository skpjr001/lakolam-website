---
title: "Sashikabe"
blurb: "Sashikabe — shade a connected wall so the white cells form L shapes marked by circles and arrows"
category: puzzle
version: "1.0.0"
---
Shade a connected wall so the white cells form L shapes — circles at their
bends, arrows at their ends.

## What it is

A square grid with circles and arrows in some cells. The solver shades
cells so that the white cells form L shapes, each one cell wide with two
legs, and no two Ls touch side by side. The shaded cells form one
connected wall with no 2×2 block. A circle marks the bend of an L, and a
number in it gives the L's size; an arrow marks the end of a leg and points
along it toward the bend. It is Sashigane's L shapes set inside a Nurikabe
wall.

## How to play

- Shade some cells. Cells with circles or arrows are never shaded.
- The white cells form L shapes: one cell wide, two straight legs meeting
  at a bend, each leg at least one cell long beyond the bend.
- Two Ls may never touch along a side.
- A circle is the bend of its L. A number in the circle is how many cells
  the L has. (Not every bend has a circle.)
- An arrow is the end of a leg and points along the leg toward the bend.
- All shaded cells join up into one wall, and the wall never covers a 2×2
  block.
- There is exactly one way to shade the grid.

Good places to start: an arrow's leg runs straight ahead of it, so the
cell behind the arrow is shaded. A circle needs one leg up or down and one
leg sideways. Every 2×2 block must hold at least one white cell, and a
cell whose whiteness would cut the wall in two must be shaded.

## Purpose

Two classic ideas in one grid: fitting shapes (the Ls) and keeping a wall
connected. It trains spatial planning, following arrows, and the global
"does it still join up?" reasoning of Nurikabe.

## History

Sashikabe was devised by the American puzzle author Grant Fikes, joining
Nikoli's Sashigane (a carpenter's square) with Nurikabe's wall. Otto
Janko's online archive carries a collection of them.

## This implementation

- **Spec knobs:** `size` (5–9; 0 picks from the difficulty — 5, 6, 7, 8, 9
  from Kids to Expert), `max_leg` (the longest leg the answer's Ls may have,
  1–4, default 3), `difficulty`, `cell` (18–90 pt), `line` (0.2–4 pt).
  Out-of-range numbers are clamped and the requested value is reported in
  the metadata; if no grid can be made with legs as short as asked, longer
  legs are allowed and `requested_max_leg` says so.
- **Generation:** answer first. From an all-shaded grid, L shapes are carved
  out one at a time, each breaking some 2×2 block of shading, never
  touching another L and keeping the wall connected; when no L fits a
  block, an L near it is lifted out again. Every L starts with a numbered
  circle and both arrows; arrows and numbers, then circles, are removed in
  a seeded order while the ladder still settles every cell.
- **Solving:** a ladder over one yes/no variable per cell ("shaded") and
  one per L the clues allow ("this L is a white area"). *Local*: every
  cell shaded or in exactly one L, an L's border is shaded, no 2×2 block of
  shading. *Connectivity*: cells the wall cannot reach are white, and a
  cell whose loss would split the wall is shaded. *Trial*: assume a value,
  propagate, keep the opposite on a contradiction.
- **Guarantees:** deterministic per seed; exactly one answer, proven
  because the sound ladder settles every cell (meta `uniqueness_proof`),
  with a capped exhaustive count confirming it (`count_confirmed`), and
  re-proven in tests by an independent search that lays Ls cell by cell
  from the rules alone. Searching for trial deductions over the table of
  Ls is slow, so every band is built at the connectivity rung and the band
  follows the board's size (meta `rating_basis`): Kids at 5×5, Easy at
  6×6, Medium at 7×7, Hard at 8×8 and Expert at 9×9 (a grid the local
  rung alone settles is Easy from 6×6; one built at the trial fallback is
  Medium up to 6×6, Hard at 7×7 and Expert above). With a custom `size`
  the band of that size is served and the request is reported beside it.

---
title: "Nuribou"
blurb: "Nuribou — shade straight bars so every white area holds one number, its size"
category: puzzle
version: "1.0.0"
---
Shade straight bars so that every white area holds one number — its size.

## What it is

A square grid with some numbers. The solver shades cells. The shaded cells
form bars: straight strips one cell wide, running across or down. The
white cells form areas, each holding exactly one number, which says how
many cells the area has. Two bars that touch at a corner must have
different lengths. Unlike Nurikabe, the shading does not need to be
connected.

## How to play

- Shade some cells. Numbered cells are never shaded.
- Shaded cells form straight bars, one cell wide (a single shaded cell is
  a bar of length 1). No shaded cells may sit side by side across a bar's
  length, so no 2×2 block holds three shaded cells.
- The white cells form areas of cells joined side by side. Each area holds
  exactly one number, equal to the number of cells in the area.
- Two bars that touch only at a corner must have different lengths.
- There is exactly one way to shade the grid.

Good places to start: a 1 is walled in on every side. A cell between two
numbers that would make one area too big, or that touches two different
numbered areas, is shaded. A white area that still needs cells and has
only one way out must take it. Once a bar is finished, look at its
corners: a bar of the same length cannot touch it there.

## Purpose

Area counting in the Nurikabe family with a twist: the walls are short
straight bars rather than one connected wall, and the corner rule makes
you compare lengths. It trains region counting, spatial reasoning and
reasoning by contradiction.

## History

Nuribou ("painted bars") appeared in Puzzle Communication Nikoli No. 68
(1997). Otto Janko's online archive carries a collection of them.

## This implementation

- **Spec knobs:** `size` (5–8; 0 picks from the difficulty — 5, 6, 6, 7, 8
  from Kids to Expert), `difficulty`, `cell` (18–90 pt), `line` (0.2–4 pt).
  Out-of-range numbers are clamped and the requested value is reported in
  the metadata.
- **Generation:** answer first. Every bar placement is tried once in a
  random order and laid wherever the rules still hold, and each white area
  gets its number in a random cell. A local search then flips single cells,
  moves numbers within their areas, and lays or lifts bars, keeping each
  change that keeps the rules and leaves no more cells open under the
  ladder, until the band's rung settles every cell.
- **Solving:** a ladder on one yes/no variable per cell ("shaded"). *Local*:
  no 2×2 block with three shaded cells, white areas never hold two numbers
  or outgrow their number, a full area is walled in, an area with one way
  out takes it, a cell between two numbered areas or out of every
  number's reach is shaded, and finished bars touching at a corner differ
  in length. *Trial*: assume a cell, propagate, keep the opposite on a
  contradiction.
- **Guarantees:** deterministic per seed; exactly one answer, proven
  because the sound ladder settles every cell (meta `uniqueness_proof`),
  with a capped exhaustive count confirming it (`count_confirmed`), and
  re-proven in tests by an independent search whose feasibility test is
  written from the rules alone. The band is the hardest rung the solve
  needed and the board's size (meta `rating_basis`): local alone is Kids at
  5×5 and Easy above; trial is Easy at 5×5, Medium at 6×6, Hard at 7×7 and
  Expert at 8×8. Larger boards are not offered: past 8×8 the generator too
  often failed to find a grid the ladder settles. With a custom `size` the
  band of that size and rung is served, and the request is reported beside
  it.

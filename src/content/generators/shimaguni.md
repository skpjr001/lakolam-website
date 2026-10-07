---
title: "Shimaguni"
blurb: "Shimaguni (Islands) — shade one island per region; neighbouring islands never touch and differ in size"
category: puzzle
version: "1.0.0"
---
An archipelago in a grid: one island in every region, and no two
neighbouring islands alike or touching.

## What it is

A square grid divided by thick lines into regions, some of them holding a
number. You shade cells to make islands. Every region holds exactly one
island, the number says how big it is, and islands in regions that border
each other must keep apart and must be different sizes.

## How to play

Shade some cells of the grid.

- In every region, the shaded cells form one island: a single group of
  cells joined side by side. Every region has an island of at least one
  cell, even when it has no number.
- A number in a region tells you how many of its cells are shaded.
- Two shaded cells on opposite sides of a thick border may never share a
  side, so the islands of neighbouring regions never touch (touching at a
  corner is fine).
- Two regions that share a border never have islands of the same size.

Good places to start: a region whose number equals its size is shaded
completely, and every cell next to it across a thick border stays white.
A small region next to a numbered one cannot copy its number, which often
leaves just one size for it. Remember that an island must hang together: a
white cell can split a region so that only one part is big enough.

## Purpose

A shading puzzle that trains two habits at once: counting inside a region
and comparing regions with their neighbours. The finished grid looks like
a map of islands, which makes it a friendly first step into the Nikoli
family of region puzzles.

## History

Shimaguni ("island country") was published by Nikoli in Japan in the
2000s. It appears in the World Puzzle Championship as "Islands" and is
popular in online collections of handmade puzzles in Japan and Europe.

## This implementation

- **Spec knobs:** `size` (6–10; 0 picks from the difficulty — 6, 7, 8, 8,
  10 from Kids to Expert), `difficulty`, `cell` (14–100 pt), `line`
  (0.2–4 pt; region borders are three times as heavy). Out-of-range values
  are clamped and reported in meta (`requested_size`, `requested_cell`,
  `requested_line`).
- **Generation:** the grid is cut into random connected regions of about 4
  to 6 cells (smaller leftovers join a neighbour; regions of three cells or
  fewer make "every neighbour a different size" impossible far too often).
  An island is planted in every region by a backtracking search over each
  region's connected groups — the region with the fewest fitting islands
  first, larger islands preferred — that keeps neighbouring islands apart
  and of different sizes. With every region clued, a hill-climb swaps the
  island of an unsettled region (or of a neighbour) for the fitting island
  that leaves the fewest cells unsettled at the band's rung, until the
  deduction ladder settles the whole board; then clues are removed in
  random order while the ladder still solves the board at that rung. If no
  board settles at the band's rung at all, a second round lets the ladder
  use every rung and the label states the band reached.
- **Solving:** a ladder on one yes/no variable per cell. *Region*: each
  region's island is one of its connected groups of the clued size (any
  size without a clue) that agrees with the settled cells, and no two
  shaded cells face each other across a border. *Neighbour comparison*:
  two neighbouring regions at once — every pair of their possible islands
  that touch or have equal sizes is ruled out. *Trial*: assume a value,
  propagate, keep the opposite on a contradiction.
- **Guarantees:** deterministic per seed; exactly one shading, proven
  because the sound ladder settles every cell (meta `uniqueness_proof`),
  with a capped exhaustive count confirming it when cheap
  (`count_confirmed`), and re-proven in tests by an independent search over
  the cells that knows only the rules. Rated by the hardest rung needed
  with size as the tie-break (region: Kids at 6×6, else Easy; neighbour
  comparison: Medium up to 8×8, else Hard; trial: Hard up to 8×8, else
  Expert). Every band is reached at its default size; with a custom
  `size` the label states the band actually reached (Easy at 6×6 is served
  as Medium, Kids above 6×6 as Easy, Medium at 9×9 and 10×10 as Hard,
  Expert below 9×9 as Hard, and at 10×10 an easy request occasionally ends
  up Expert when no board within the search settles with the easy rung).

---
title: "Nuritwin"
blurb: "Nuritwin — shade two equal blocks in every region; all shading connected, no 2x2"
category: puzzle
version: "1.0.0"
---
Shade twins: every region holds two separate blocks of the same size, and
all the shading joins up across the whole grid.

## What it is

A square grid divided into outlined regions, some with a number. Shade
cells so that each region contains exactly two blocks of equal size, the
shaded cells of the whole grid form one connected network, and no 2×2
square is completely shaded.

## How to play

- Shade some cells. A block is a group of shaded cells inside one region,
  joined side by side.
- Every region holds exactly two blocks, and both have the same number of
  cells. The two blocks of a region never touch each other along a side
  (if they did, they would be one block).
- A number in a region tells you how many cells each of its two blocks
  has.
- All the shaded cells of the grid are connected side by side, crossing
  region borders as needed.
- No 2×2 square of cells is entirely shaded.

Good places to start: a region marked 1 holds two single cells that do not
touch. A long, narrow region with a large number has only a few ways to
fit two blocks apart. Because all the shading must join up, a shaded cell
hemmed in by white cells is impossible, and a cell that is the only link
between two shaded parts must be shaded.

## Purpose

A shading puzzle that mixes counting with connection: each region is a
small pairing problem, and the global rule (one connected network, no 2×2)
ties the regions together. It practises reasoning about shapes and about
chokepoints in a network.

## History

Nuritwin (ぬりツイン, "shade twins") is a recent genre from Nikoli, the
Japanese publisher behind Sudoku and Nurikabe, and appears on its current
list of puzzles. It shares Nurikabe's rules for the shaded network (one
connected wall, no 2×2 square) and adds the twin blocks in each region.

## This implementation

- **Spec knobs:** `size` (6–9; 0 picks from the difficulty — 6, 7, 8, 7, 8
  from Kids to Expert), `difficulty`, `cell` (14–100 pt), `line` (0.2–4
  pt; region borders are three times as heavy). Out-of-range numbers are
  clamped and the requested value is reported in the metadata.
- **Generation:** regions of about 4–7 cells are cut by random growth
  (at most 10 cells, so every region's patterns can be listed). A pair of
  blocks is planted in every region by a backtracking search that tries
  patterns filling more of the region first and propagates the deduction
  ladder after each choice, so the shading stays connected and free of
  2×2 squares. With every region numbered, a hill-climb then swaps a
  region's pattern, or moves a white cell across a region border, keeping
  each change that leaves no more cells open, until the ladder settles the
  whole board. Numbers are then removed in random order while the ladder
  still settles every cell at the band's rung. When the band's rung yields
  no board, more layouts run with every rung allowed and the band actually
  reached is printed.
- **Solving:** a ladder over one yes/no variable per cell. *Region*: a
  region's shading is one of its two-equal-block patterns (of the numbered
  size) that agree with what is settled, and no 2×2 square is fully shaded.
  *Connectivity*: cells the shaded network can no longer reach stay white,
  and a cell whose loss would split it is shaded. *Trial*: assume a cell,
  propagate, keep the opposite on a contradiction.
- **Guarantees:** deterministic per seed; exactly one shading, proven
  because the sound ladder settles every cell (meta `uniqueness_proof`),
  with a capped exhaustive count confirming it when cheap
  (`count_confirmed`), and re-proven in tests by an independent search
  over the cells that knows only the rules. Rated by the hardest rung
  needed with size as the tie-break: region and connectivity reasoning is
  Kids at 6×6, Easy at 7×7 and Medium from 8×8; needing trial is Hard up
  to 7×7 and Expert from 8×8. Region reasoning alone almost never settles a
  board, so the gentler bands are told apart by size. With a custom `size`
  the label states the band actually reached (for example Medium at 6×6 is
  served as Hard, and Kids at 8×8 as Medium).

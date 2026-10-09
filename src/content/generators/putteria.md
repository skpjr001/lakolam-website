---
title: "Putteria"
blurb: "Putteria — one number per region, its size; numbers never repeat in a row or column and never touch"
category: puzzle
version: "1.0.0"
---
One number in every region, telling its size — and no number twice in a
row or column, and never two side by side.

## What it is

A square grid divided into outlined regions, sometimes with a few numbers
already written in. Each region gets exactly one number, and that number
is the count of its cells. The numbers must spread out: the same number
never appears twice in a row or column, and two numbered cells never share
a side.

## How to play

- Write one number in exactly one cell of every region. The number is the
  size of the region (a region of 4 cells gets a 4).
- No number may appear twice in the same row or the same column.
- Two cells with numbers may not touch along a side (touching at a corner
  is fine).
- Most cells stay empty.
- There is exactly one solution.

Good places to start: a region of one cell holds a 1 in its only cell.
Regions of the same size compete for rows and columns — if a region's
cells all lie in one row, no other region of that size can use that row.
A cell beside every cell of a small region can never hold a number.

## Purpose

A spatial logic puzzle with almost no arithmetic: only counting cells. It
trains scanning along lines, juggling several regions at once and "what
if" reasoning.

## History

Putteria is a Nikoli genre from Japan, published in *Puzzle Communication
Nikoli*. Otto Janko's online collection has dozens of them, from 5×5 up to
17×17.

## This implementation

- **Spec knobs:** `size` (5–10; 0 picks from the difficulty — 5, 6, 8, 9,
  10 from Kids to Expert), `difficulty`, `cell` (18–90 pt), `line` (0.2–4
  pt). Out-of-range numbers are clamped and the requested value is
  reported in the metadata.
- **Generation:** answer first. Number cells that never touch are scattered
  (about one cell in three), and a region is grown around each towards a
  random size from one to nine. The layout is then hill-climbed one cell at
  a time — a cell moves to a neighbouring region (keeping both whole), or a
  region's number moves to another of its cells — first until no number
  repeats along a row or column, then until the ladder settles the grid at
  the band's rung with nothing printed. When the climb stalls first, every
  number starts printed and prints are removed in random order while the
  ladder still settles the grid; a grid that keeps more than about a third
  of its numbers printed is dropped. Many grids end with none or a few
  printed.
- **Solving:** a ladder on one yes/no variable per cell ("this cell holds
  its region's number"). *Basic*: exactly one number per region, at most
  one of two side-by-side cells, and in each row and column at most one
  number among the cells of regions of any one size. *Claim*: when a
  region's remaining cells all lie in one row or column, regions of the
  same size lose that line; a cell beside every remaining cell of a region
  stays empty. *Trial*: assume a value, follow the consequences, keep the
  opposite on a contradiction.
- **Guarantees:** deterministic per seed; exactly one answer, proven
  because the sound ladder settles every cell (meta `uniqueness_proof`),
  with a capped exhaustive count confirming it when cheap
  (`count_confirmed`), and re-proven in tests by an independent capped
  count over the rules alone that shares no code with the ladder. Rated by
  the hardest rung needed with size as the tie-break (basic: Kids at 5×5,
  Easy at 6×6, Medium up to 8×8, Hard at 9×9, Expert at 10×10; claim: Easy
  at 5×5, Medium at 6×6, Hard up to 8×8, else Expert; trial: Hard up to
  6×6, else Expert). The basic rung settles nearly every generated grid,
  so the bands mostly follow size. Every band is served at its default
  size; with a custom `size` the label states the band reached.

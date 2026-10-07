---
title: "Walls"
blurb: "Walls — draw a horizontal or vertical line in every white cell so each number totals the lines touching it"
category: puzzle
version: "1.0.0"
---
Fill every white cell with a straight line, sideways or up-and-down, so the
numbers measure the lines that touch them.

## What it is

A square grid with some black cells, most of them carrying a number. Every
white cell gets a line through its middle, either horizontal or vertical.
Lines that point the same way in neighbouring cells join into one longer
line. A number tells you the total length of the lines that touch its
black cell.

## How to play

Draw a horizontal or a vertical line through the middle of every white
cell.

- A number counts the cells of the line running straight out of its left
  side, its right side, its top and its bottom, added together. Sideways
  lines count to the left and right; up-and-down lines count above and
  below.
- A line stops at a black cell, at the edge of the grid, or where the next
  cell's line points the other way.
- A black cell without a number tells you nothing; it only stops lines.

Good places to start: a 0 means every white cell beside it points across
it — the cells to its left and right are vertical, the cells above and
below are horizontal. A big number next to a short gap fills that gap
completely. And once a cell's line points away from a number, that
direction contributes nothing more.

## Purpose

A quick, pencil-friendly logic puzzle that trains careful counting and
"what if" thinking along rows and columns. The solved grid looks like a
little plan of walls and corridors, which makes checking an answer
satisfying at a glance.

## History

Walls is a modern pencil puzzle from the world of puzzle championships,
appearing in World Puzzle Federation Grand Prix rounds and in collections
by puzzle authors online. It is a close cousin of Nikoli's Tatebo-Yokobo,
where every cell holds a short bar and the black cells count the bars
around them.

## This implementation

- **Spec knobs:** `size` (5–12; 0 picks from the difficulty — 5, 6, 7, 8,
  10 from Kids to Expert), `difficulty`, `cell` (14–100 pt), `line`
  (0.2–4 pt). Out-of-range numbers are clamped.
- **Generation:** about 15% of the cells are made black and every white
  cell gets a direction, with directions tending to continue the line on
  the left or above so the answer has long lines. Every black cell is
  numbered; while the deduction ladder leaves cells unsettled, one of them
  is turned black (and the numbers recomputed), up to a third of the grid.
  Numbers are then erased in random order while the ladder, at the band's
  rung, still settles every cell. When the requested band cannot be
  reached, the nearest band found is served and labelled honestly.
- **Solving:** one yes/no variable per cell (horizontal or vertical). The
  ladder: *Run bounds* — each number's shortest and longest reachable
  total, probed cell by cell; *Exact sums* — which run lengths in each
  direction are still possible and whether any combination adds up to the
  number; *Trial* — assume a direction, propagate, keep the opposite on a
  contradiction. Rated by the hardest rung needed, size as tie-break:
  bounds only are Kids up to 5×5, Easy at 6×6 and Medium from 7×7; exact
  sums are Medium; trial is Hard (Expert from 9×9). Exact sums are rarely
  the hardest step a board needs, so Medium is mostly told apart from Easy
  by its larger grid.
- **Guarantees:** deterministic per seed; exactly one answer, proven
  because the sound ladder settles every cell and confirmed by a capped
  exhaustive count (cap 2; a spent budget discards the board); re-proven in
  tests by an independent search that knows only the rules. Every number
  sits on a black cell and equals the lines it touches; meta records
  `unique`, `difficulty`, `requested_difficulty`, `rating_basis`,
  `hardest_technique`, the grid, black cells and numbers.

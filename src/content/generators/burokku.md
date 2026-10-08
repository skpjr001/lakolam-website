---
title: "Burokku"
blurb: "Burokku — cut the N×N grid into N regions of N cells, no letter twice in a region"
category: puzzle
version: "1.0.0"
---
Cut the square into as many blocks as it is wide — and never let a block
hold the same letter twice.

## What it is

An N×N grid (4×4 up to 7×7) with letters in some cells. The solver divides
the grid along its lines into N regions of N cells each, every region one
connected piece, so that no region contains two cells with the same letter.
The letters are the only clues: each one says "I cannot share a region
with my twins".

## How to play

- Draw lines along the grid to cut it into regions. A grid N cells wide is
  cut into N regions of N cells each (a 6×6 grid into six regions of six
  cells).
- Every region is one piece: its cells join side by side.
- No region may hold two cells with the same letter. Empty cells can go
  anywhere.
- There is exactly one way to cut the grid.

Good places to start: two equal letters side by side always have a line
between them. A corner cell boxed in by equal letters has few ways out, and
a region that must reach past a letter it already holds has to turn. Count
the cells a region can still reach — a pocket smaller than N cells cannot
hold a region of its own.

## Purpose

A puzzle about shapes and space rather than numbers: it trains planning
regions of a fixed size, spotting pockets that cannot be filled, and
reading many small "not together" clues at once.

## History

Burokku ("block") is a pencil-puzzle genre from the Japanese publisher
Nikoli. Otto Janko's online archive carries a large collection of them,
some using a single letter repeated, others several.

## This implementation

- **Spec knobs:** `size` (4–7; 0 picks from the difficulty — 4, 5, 6, 7, 7
  from Kids to Expert), `letters` (how many different letters, 1–8, at
  most the grid's width; default 4), `difficulty`, `cell` (18–90 pt),
  `line` (0.2–4 pt). Out-of-range numbers are clamped and the requested
  value is reported in the metadata; if no division can be pinned with as
  few letters as asked, more are used and `requested_letters` says so.
- **Generation:** answer first. A random division into connected N-cell
  regions (a backtracking fill at the first open cell that cuts off any
  pocket whose size is not a multiple of N). Each region gets the first few
  letters, one each, in random cells; a local search swaps letters within
  regions while the deduction ladder leaves no more cells open, until the
  full lettering pins the division. Letters are then removed in a seeded
  order while the band's rung still settles the grid (the forced rung
  first, so easy deductions carry as much as they can).
- **Solving:** an exact-cover table of every region the letters allow, and
  a ladder in rungs — *forced* (a cell only one region can still cover
  takes it), *look one step* (a region is struck if placing it would leave
  some cell uncoverable), *pairs* (where a cell has two regions left, each
  is tried and struck if the lower rungs then contradict).
- **Guarantees:** deterministic per seed; exactly one answer, proven by an
  exhaustive exact-cover count capped at 2 (meta `uniqueness_proof`), and
  re-proven in tests by an independent search that grows regions cell by
  cell from the rules alone. The band is the hardest rung the solve needed
  and the board's size (meta `rating_basis`): forced alone is Kids at 4×4
  and Easy above; look one step is Easy at 5×5, Medium at 6×6 and Hard at
  7×7; pairs are Medium at 5×5, Hard at 6×6 and Expert at 7×7. A band the
  generator cannot reach at a custom size (Kids above 4×4, for instance) is
  served as the nearest band reached and reported beside
  `requested_difficulty`.

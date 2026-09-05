---
title: "Fillomino"
blurb: "Partition the grid into regions, each cell holding the size of its own"
category: puzzle
version: "1.0.0"
---
Divide the grid into regions so every cell's number equals the size of the
region containing it.

## What it is

A grid, some cells carrying numbers. The whole grid must be partitioned into
polyomino regions such that each region of size *n* contains only the number
*n* — and two regions of the same size may never share an edge (they would be
one region). Printed numbers are fixed; empty cells take whatever their final
region dictates.

## How to play

A printed "1" is its own region — wall it off. Two adjacent equal numbers are
in the same region; grow it until it reaches its size, then everything
touching it is *not* that number. Watch for cells no region can reach: an
empty pocket must become a region of exactly its own size. Larger boards turn
on counting how far a number can possibly stretch.

## Purpose

The purest partition puzzle in the collection — no clue type but the region
sizes themselves. In the workspace it shares the polyomino enumeration
machinery (`lako-grid::polyomino`) with nurikabe, which is where that module's
pinned shape-counts test came from.

## History

A Nikoli puzzle, first published in 1994. The name blends "fill" with
*omino* (as in polyomino). Sometimes published in the West as
"allied occupation" — a mistranslation that never caught on.

## This implementation

- **Spec knobs:** `rows`, `cols`, `max_region` (capped at 5), `difficulty`.
- **Generation:** answer first — the grid is partitioned into regions, every
  cell is numbered with its region's size, then numbers are thinned while the
  board keeps exactly one completion. The solver enumerates each number's
  possible region as a polyomino (a `Prepared` catalogue built once per
  board), not cell-by-cell.
- **Guarantees:** `count_answers(2) == 1`; the search is cross-checked against
  the rule definition by brute force over every labelling of a 2×3 board.
- **Performance note:** batching removals during thinning was tried and made
  generation *slower* (1.9 s → 4.6 s); the naive one-at-a-time loop is kept
  and the failed optimisation is recorded in the implementation notes.

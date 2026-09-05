---
title: "Shikaku"
blurb: "Partition a grid into rectangles, one numbered clue per rectangle"
category: puzzle
version: "1.0.0"
---
Divide the grid into rectangles, one per clue, each covering exactly its
clue's number of cells.

## What it is

A grid with numbered cells. The whole grid must be cut into axis-aligned
rectangles so that each rectangle contains exactly one number, and that number
equals the rectangle's area. No gaps, no overlaps.

## How to play

Prime numbers are friendly: a 5 must be a 1×5 strip, and near an edge its
orientation is often forced. For each clue, sketch every rectangle of its area
that covers it without swallowing another clue — cells covered by *every*
candidate are certainly that clue's. Cells only one clue can reach resolve
next. The tiling closes like a zip once a few rectangles are fixed.

## Purpose

The gentlest of the partition puzzles — pure area arithmetic, no arcane rules
— which makes it a staple of kids' sections. In the workspace it is the
textbook exact-cover search: columns are cells, rows are candidate rectangles,
most-constrained-clue-first.

## History

Nikoli, credited to founder **Maki Kaji** — reportedly his favourite of the
puzzles he invented. The full name *Shikaku ni kire* means "cut into squares
(rectangles)".

## This implementation

- **Spec knobs:** `rows`, `cols`, `mean_area`, `difficulty`.
- **Generation:** answer first — the grid is partitioned into rectangles, one
  clue is placed per rectangle (position randomised), and the exact-cover
  search proves the clue set admits exactly one tiling.
- **Guarantees:** `count(2) == Exact(1)`; the areas sum to the cell count, so
  covering each cell at most once means exactly once, and no separate gap
  check is needed (the module docs prove it). A search-budget overrun rejects
  the board — "probably unique" is not a claim this workspace makes.
- **Performance note:** every candidate rectangle's cell list is computed once
  and cached; recomputing it in the inner loop is what once turned a 20×20
  from milliseconds into minutes.
- **Difficulty:** the size of the candidate space (placements per clue),
  banded — a proxy, and labelled as one.

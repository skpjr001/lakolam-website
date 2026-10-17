---
title: "Ten Boxes"
blurb: "Ten boxes — split a grid of digits into rectangles that each sum to 10, one way only"
category: puzzle
version: "1.0.0"
---
Draw rectangles around the digits so every box adds up to exactly 10.

## What it is

A grid of digits from 1 to 9. The whole grid has to be split into
rectangles, with no gaps and no overlaps, so that the digits inside each
rectangle add up to 10. A rectangle can be two squares side by side, a
strip of three, a 2×2 block or any other rectangle, as long as its sum is
10. Each puzzle has exactly one way to split it.

## How to play

Start where there is little choice. A corner square can only belong to a
rectangle that reaches out from that corner, so try the few that add up to
10 and see which ones leave the rest of the grid possible. Big digits are
helpful: a 9 needs a 1 beside it, an 8 needs a 2 or two 1s. Small digits
are the tricky ones, because a run of 1s and 2s can be boxed many ways.
Draw a rectangle when you are sure of it, and check that no square is left
over that cannot reach 10. The hint under the grid tells you how many
rectangles the answer has.

## Purpose

Quick mental addition wrapped in a spatial puzzle: number bonds to ten,
practised many times over, with the logic of fitting rectangles together.
The small grids suit children learning their bonds to ten; the 10×10 grid
is a long, satisfying solve for adults.

## History

"Make ten" games are an old classroom staple for number bonds. The
rectangle-drawing version became popular as a quick online game in which
players drag boxes around apples worth 1–9 that sum to 10 against the
clock. The pen-and-paper form here turns that race into a logic puzzle:
the whole grid must be used and the split is unique, in the tradition of
rectangle-division puzzles such as Shikaku.

## This implementation

- **Spec knobs:** `difficulty` (grid size: kids 4×4, easy 6 rows × 5, medium
  6×6, hard 8×8, expert 10×10), `largest_box` (2–6, the most squares any
  rectangle of the answer may have; values outside are clamped and recorded
  as `requested_largest_box`), `box_count_hint` (print the number of
  rectangles under the grid).
- **Generation:** partition first. A seeded tiling covers the grid with
  rectangles of 2 to `largest_box` squares (row by row from the first
  uncovered square; a dead end restarts), and each rectangle is dealt digits
  1–9 that sum to 10. While a second partition exists, one rectangle of the
  answer that the other partition does not use is dealt new digits (local
  repair, up to 400 times per tiling, 60 tilings).
- **Solving:** exact cover over *every* rectangle of the grid that sums to
  10, whatever its size: the first uncovered square in reading order must be
  the top-left corner of the rectangle covering it, so the search branches
  only on those. Counted to a cap of 2 within a node budget.
- **Guarantees:** deterministic per seed. Every page has exactly one
  partition (`unique: true`, proved by the capped count; a count that ran
  out of budget is never accepted), and the answer is re-checked before the
  page is returned (`answers_checked`). Difficulty is the grid size
  (`rating_basis: "grid size"`); every band is served as asked. The answer
  key shades and outlines each rectangle. Tests re-count the partitions with
  an independent search that branches on the most constrained square.

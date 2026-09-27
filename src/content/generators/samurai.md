---
title: "Samurai Sudoku"
blurb: "Samurai sudoku — five overlapping sudoku grids sharing their corner boxes"
category: puzzle
version: "1.0.0"
---
Five sudoku grids in one — four at the corners, one in the middle, each
sharing a 3×3 box with its neighbour.

## What it is

Five overlapping 9×9 sudoku grids arranged in an X on a 21×21 frame. The
centre grid shares one corner box with each of the four outer grids. Every
grid follows the ordinary rules: each of its rows, columns and 3×3 boxes holds
the digits 1 to 9 exactly once. A digit in a shared box counts for both grids.

## How to play

Solve it as five sudokus that help each other. A grid that is stuck often has
a neighbour that can fill the box they share, and those few digits are enough
to restart it. Work each grid with the usual singles, pairs and box–line
reasoning, and keep carrying digits across the shared corners.

## Purpose

A long-running newspaper and book staple (the Washington Post's Sunday
feature, dedicated book series) and the one popular sudoku variant that is a
change of structure rather than an added rule: 369 cells and 131 groups solved
as one board. It runs on the same constraint engine as `sudoku`.

## History

The overlapping "gattai" (merged) form was popularised in Japan in the early
2000s and spread with the sudoku boom as Samurai Sudoku, the name The Times
and other papers gave it around 2005.

## This implementation

- **Spec knobs:** `difficulty`, `symmetric` (dig in point-symmetric pairs),
  `cell`, `line`.
- **Generation:** one answer is filled against all five grids at once by
  randomised most-constrained-first backtracking; givens are then dug out in
  point-symmetric pairs while the shared engine still finishes the whole board
  by inference at the requested difficulty's ceiling.
- **Solving:** rows, columns and boxes of every grid are all-different groups
  (the four shared boxes once each), with box–line interactions inside each
  grid; ratings come from the same technique ladder as `sudoku`.
- **Guarantees:** deterministic per seed; exactly one answer, proven by the
  inference ladder and checked by an independent solution count; rated by the
  hardest technique actually used. No board has needed a fish pattern, so an
  Expert request returns an honest Hard, with the request noted in the
  metadata. Hard boards take several seconds to tens of seconds to dig —
  every check re-solves 369 cells.

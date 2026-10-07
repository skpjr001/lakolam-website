---
title: "Samurai Sudoku"
blurb: "Samurai sudoku — five overlapping sudoku grids sharing their corner boxes"
category: puzzle
version: "1.1.0"
---
Five sudoku grids in one — four at the corners, one in the middle, each
sharing a 3×3 box with its neighbour.

## What it is

Five overlapping 9×9 sudoku grids arranged in an X on a 21×21 frame. The
centre grid shares one corner box with each of the four outer grids. Every
grid follows the ordinary rules: each of its rows, columns and 3×3 boxes holds
the digits 1 to 9 exactly once. A digit in a shared box counts for both grids.

Other layouts put the same overlapping grids together in different ways:
**Twin** (two grids sharing one corner box), **Butterfly** (four grids packed
into a 12×12 square — the four 9×9 grids are its corners, so every cell
belongs to between one and four of them), **Flower** (a centre grid with four
more shifted one box up, down, left and right), **Windmill** (a centre grid
with four sails, each sharing two boxes with it) and **Sohei** (four grids in a
ring, sharing corner boxes, with an empty centre).

## How to play

Solve it as five sudokus that help each other. A grid that is stuck often has
a neighbour that can fill the box they share, and those few digits are enough
to restart it. Work each grid with the usual singles, pairs and box–line
reasoning, and keep carrying digits across the shared corners.

The rule is the same in every layout: each 9×9 grid is a complete sudoku. In a
Butterfly or Flower the grids overlap so much that a row of the frame can
belong to two grids at once — then the digits must be different within each
grid's stretch of nine cells, not across the whole frame row.

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
  `cell`, `line`, `layout` — `samurai` (the default: five grids, 369 cells),
  `twin` (2 grids, 153 cells), `butterfly` (4 grids in 12×12, 144 cells),
  `flower` (5 grids in 15×15, 189 cells), `windmill` (5 grids in 21×21, 333
  cells) or `sohei` (4 grids in a ring, 288 cells).
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
- **Version 1.1 — layouts:** every layout is a list of box-aligned 9×9 grid
  corners on a frame, so the groups, solver, filling and digging are the
  classic code generalised; each layout is point-symmetric, so symmetric
  digging stays inside the grids. The tests re-prove uniqueness with a
  separate backtracking count (naked and hidden singles, no constraint
  engine). The default `samurai` layout draws from the same random streams as
  before, and every board it made before is byte-identical. Hard Windmill and
  Sohei boards take about five seconds each to dig.

---
title: "Circle Nine"
blurb: "Circle Nine — circle one digit per row, column and box so the circles run 1 to 9"
category: puzzle
version: "1.0.0"
---
Circle one number in every row, column and box so that the circled numbers
are 1 to 9, once each.

## What it is

A full 9×9 grid of digits, split into nine 3×3 boxes like a sudoku — but
nothing is missing. Find the nine cells to circle: one in each row, one in
each column, one in each box, and between them every digit from 1 to 9
exactly once. On easier pages a few circles are already drawn. There is
exactly one way to do it.

## How to play

- Circle nine cells: one in every row, one in every column, one in every
  3×3 box.
- The nine circled numbers must be 1, 2, 3 … 9 — each once.
- When you circle a cell, cross out the rest of its row, its column, its box
  and every other copy of its number.
- A digit with only one copy left must be circled there; so must the last
  open cell of a row, column or box.
- Harder grids: if every copy left of a digit lies in one box (or every open
  cell of a row lies in one box), that box's circle is among them — cross
  out the box's other cells.
- Hardest grids: try a cell in your head. If circling it leaves some row,
  column, box or digit with nowhere to go, cross it out.

## Purpose

A sudoku-shaped search with no writing at all: the whole puzzle is choosing
nine cells, and every circle wipes out a cross of possibilities. Quick to
learn, surprisingly deep at the top band, and easy to check.

## History

A modern search puzzle on a filled grid, offered in printable collections
under names like "Circle 9"; it is the transversal problem of combinatorics
dressed as a sudoku.

## This implementation

- **Spec knobs:** `difficulty`, `cell`, `line`.
- **Generation:** a seeded row/column/box pattern is planted with the digits
  1–9 and the other 72 cells get seeded digits. Every circling the grid
  allows is enumerated (at most 46,656 patterns, pruned on repeats); while a
  rival exists, one of its unplanted cells takes another digit, keeping
  changes that do not add rivals. Circles from the answer are then shown,
  in seeded order, until the deduction ladder needs no more than the band's
  rung (Kids: three at least).
- **Solving:** the deduction ladder treats the puzzle as 36 groups (rows,
  columns, boxes, digits) that each need one circle: basic (a circle crosses
  out its groups; a group's last open cell), locked (a group whose open
  cells all lie inside another), what-if (assume a cell, follow the lower
  rungs to a group with no cell), and a nested what-if.
- **Guarantees:** deterministic per seed; exactly one circling, proven by
  the exhaustive enumeration (cap 2) *without* the given circles, and again
  in the tests by a plain walk over all 9! column orders. The ladder
  finishes every page from its given circles. Rated by the hardest rung
  needed (`rating_basis: hardest_rung`): Kids basic with three circles
  given, Easy basic, Medium locked groups, Hard one what-if, Expert a
  nested what-if. Every band was served as asked on 8 of 8 seeds; a page
  builds in under 200 ms (Easy and Medium are the slowest, as they show
  circles until the ladder is easy enough).

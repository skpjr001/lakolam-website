---
title: "Gappy"
blurb: "Gappy — shade two non-touching cells in every row and column so the outside numbers give the gaps between them"
category: puzzle
version: "1.0.0"
---
Two shaded cells in every row and column, never touching — and the numbers
outside tell you how far apart they are.

## What it is

A square grid with numbers beside some rows and above some columns. Every
row and every column holds exactly two shaded cells, and no two shaded
cells touch. A number says how many white cells lie between the two shaded
cells of its line.

## How to play

Shade cells so that:

- every row and every column holds exactly two shaded cells;
- shaded cells never touch, not even at a corner;
- each number to the left of a row (or above a column) equals the number
  of white cells between that line's two shaded cells.

Lines without a number may have any gap of at least one. A large gap leaves
few places for the pair — an 8 in a 10-wide row puts its shaded cells in
the two end cells or one in from each end. Any 2×2 square holds at most one
shaded cell. Compare neighbouring rows: their shaded cells must keep at
least one column apart, which often rules out all but one placement.

## Purpose

A Star Battle cousin with arithmetic at its heart: the gap numbers turn
each line into a small distance puzzle, and the no-touching rule ties the
lines together.

## History

Gappy is a classic of German and World Puzzle Federation puzzle
competitions and of Otto Janko's online collection, where it appears on
9×9 to 16×16 grids. Like Star Battle it places two marks in every line with
no two touching; the distance clues are its own.

## This implementation

- **Spec knobs:** `size` (9–12; 0 picks from the difficulty — 9, 10, 10,
  11, 12 from Kids to Expert; a 7×7 grid has no answer at all and an 8×8
  only a mirrored pair, so 9 is the smallest), `difficulty`, `cell`,
  `line`.
- **Generation:** a random answer is drawn row by row by a seeded
  backtracking search (each row two columns at least two apart, clear of
  the row above and of columns already used twice). Every gap is printed
  (an answer the gaps do not settle is redrawn), then gaps are erased one at
  a time in seeded order, first while the rung below the ceiling still
  settles every cell, then while the ceiling does.
- **Solving:** shaded/white cells on a ladder of three rungs — *lines*
  (two shaded cells per line, the placements a gap allows, at most one
  shaded cell in any 2×2 block), *neighbouring lines* (every pair of
  placements for two adjacent rows or columns whose shaded cells keep
  apart; a cell all surviving pairs agree on settles) and *trial* (assume a
  cell, propagate the lower rungs, keep the opposite on a contradiction).
- **Guarantees:** deterministic per seed; exactly one answer, proven
  because the sound ladder settles every cell, confirmed by a capped
  exhaustive count (a count that runs out of budget skips the attempt), and
  re-proven in tests by an independent search that knows only the rules as
  a feasibility test. Rated by the hardest rung needed: lines alone are
  Kids on 9×9 and Easy above; neighbouring lines are Medium; trial is Hard
  up to 11×11 and Expert on 12×12. Every band is reached at its default
  size. A band a chosen size cannot reach (Hard on 12×12, where trial means
  Expert) is not searched for: the nearest band that size reaches is served
  and labelled as such.

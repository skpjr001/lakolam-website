---
title: "Sukrokuro"
blurb: "Sukrokuro — a Latin square with kakuro run sums and kropki circles"
category: puzzle
version: "1.0.0"
---
A Latin square dressed as a kakuro: every number once per row and column,
run totals in the blocks, and circles between neighbours one apart.

## What it is

A grid of white cells and grey blocks. Each row and each column has the
same number of white cells, and they hold the numbers 1 to N, each exactly
once. As in a kakuro, the block before each run of white cells shows the
run's total. Small circles sit on some borders between white cells.

## How to play

- Write a number from 1 to N in every white cell (N is the number of white
  cells in each row). Each number appears exactly once in every row and
  every column.
- A number in the upper-right half of a block is the total of the white
  cells running to its right, up to the next block or the edge. A number in
  the lower-left half is the total of the white cells running down below it.
- A circle between two white cells means their numbers differ by exactly
  one (like 4 and 5). Where two white cells touch with no circle, their
  numbers must not differ by one.
- Digits already in the grid are given.
- There is exactly one solution.

Good places to start: a run of two cells totalling 3 must hold 1 and 2, and
their border must then carry a circle. Two cells with a circle and a small
total narrow down quickly. Remember that the missing circle is a clue too:
a 3 with no circle next to its neighbour rules out 2 and 4 there.

## Purpose

Three familiar rule sets — the Latin square of sudoku, the sums of kakuro
and the dots of kropki — packed into one puzzle that rewards switching
between them. It practises small additions, consecutive-number reasoning
and classic row-and-column scanning.

## History

Sukrokuro was invented by Michael Rios, a puzzle author for the US Puzzle
Championship, and is collected with many examples in Otto Janko's online
archive of logic puzzles. Its name joins sudoku, kakuro and kropki, the
three genres it combines.

## This implementation

- **Spec knobs:** `size` (5–10; the playing area, blocks included; 0 picks
  from the difficulty — 5, 6, 8, 9, 9 from Kids to Expert), `digits` (N,
  from 3 up to one less than the side, at most 9 and at least three less
  than the side; 0 picks 4 at 5×5, 5 at 6×6 and 7×7, and one less than
  the side from 8×8 up), `difficulty`, `cell` (18–90 pt), `line` (0.2–4
  pt). Out-of-range numbers are clamped and the requested value is
  reported in the metadata. The page is drawn with a frame row and column
  of clue blocks, as a kakuro.
- **Generation:** answer first. A random Latin square of order n (a
  most-constrained-cell search with shuffled values) keeps its symbols 1..N
  as white cells and turns the rest into blocks, so every line has exactly
  N white cells holding 1..N. Every run of two or more white cells gets its
  total and every pair of neighbours one apart gets its circle. Boards are
  cheap, so up to 200 are tried for the band; only if none is settled by
  the ladder at the band's ceiling are digits of the answer printed where
  it stalls (and trimmed again).
- **Solving:** the shared constraint solver and its technique ladder,
  using existing propagators only: `AllDifferent` per row and column
  (singles, naked and hidden subsets), `SumRun` per run (sum bounds and
  combinations), an allowed-pairs relation per pair of neighbours (differ
  by one where circled, not by one elsewhere), and X-Wing and Swordfish
  across the Latin square.
- **Guarantees:** deterministic per seed; exactly one answer, proven
  because the ladder's sound propagators settle every cell (meta
  `uniqueness_proof`), confirmed by the solver's capped count when cheap
  (`count_confirmed`), and re-proven in tests by an independent
  most-constrained-cell search that shares no code with the solver. Rated
  by the hardest technique the solve used (`rating_basis:
  technique_ladder`). Kids is never reached — reading a total or a circle
  is already an Easy step — so a Kids request is served as Easy. Easy and
  Medium are always reached at their default sizes; Hard (X-Wing) and
  Expert (Swordfish) are reached on most seeds at 9×9, otherwise the
  nearest band found is served.

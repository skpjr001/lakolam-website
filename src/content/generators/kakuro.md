---
title: "Kakuro"
blurb: "Cross-sums with combination reasoning and proven uniqueness"
category: puzzle
version: "1.0.0"
---
Cross-sums: fill the white runs with digits 1–9 so each run adds to its clue,
with no digit repeated within a run.

## What it is

A crossword-shaped grid of black and white cells. Each horizontal and vertical
run of white cells carries a clue — the sum its digits must reach — written in
the black cell at its head. Digits 1–9 only, and no digit may repeat inside a
single run.

## How to play

Start from the runs whose sums have only one digit combination: three cells
summing to 24 can only be {7, 8, 9}; two cells summing to 3 only {1, 2}. Cross
runs share cells, so a placed digit narrows its crossing run. Work outward from
those forced corners, using the combination tables and the no-repeat rule
together. No guessing is ever required.

## Purpose

The arithmetic sibling of the crossword — a staple of newspaper puzzle pages
and mixed puzzle books. In the workspace it earned its keep twice over: its
sum-run propagator (`SumRun`) is exactly what killer sudoku cages needed, so
one solver component serves two generators.

## History

Published as **Cross Sums** in Dell puzzle magazines from 1966, usually
credited to Jacob E. Funk, a Canadian employee of Dell. Nikoli imported it to
Japan and coined **kakuro**, a contraction of *kasan kurosu* ("addition
cross"). It is Japan's second most popular pencil puzzle after sudoku.

## This implementation

- **Spec knobs:** `rows`, `cols`, `block_density` (how much of the interior is
  blocked before refinement), `difficulty`.
- **Generation:** refinement rather than sampling — carve a blank pattern,
  fill it with legal digits, then *refine* (add blocks) until the clue set
  admits exactly one filling. Random carves almost never start unique, so the
  repair loop is the generator.
- **Guarantees:** `count_solutions(2) == 1`, and the difficulty is the hardest
  rung of the shared technique ladder the solve actually needed, including the
  kakuro-specific `SumBounds` and `SumCombination` techniques.
- **Note:** the Kids/Easy bands floor their reasoning at `SumBounds` — a
  kakuro cannot be solved without reading its run totals, so the band below
  that rung cannot exist and is reported honestly as Easy.

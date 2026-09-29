---
title: "Survo"
blurb: "Survo - fill 1 to m*n once each so every row and column hits its sum"
category: puzzle
version: "1.0.0"
---
Every number from 1 up, each used once, so that every row and every column
adds up to the total printed beside it.

## What it is

A small grid, three or four rows by three to six columns, with a total at the
end of each row and at the foot of each column. The grid holds every whole
number from 1 up to its number of cells exactly once: a 4×4 grid holds 1 to
16, a 4×6 grid 1 to 24. A few cells are already filled in. Columns are
lettered A, B, C and rows numbered 1, 2, 3, so a cell can be named like C2.

## How to play

Write a number in every empty cell so that each row adds up to the total at
its right, each column adds up to the total below it, and every number from 1
to the largest is used exactly once. The printed numbers stay as they are.

Start with any row or column that has only one empty cell: its number is the
total minus the others. Keep a list of the numbers still unused; when a
number can only fit in one place, put it there. When that runs dry, think
about sizes: if a row of four still needs 70 from three cells, each of them
must be large, because even the three biggest unused numbers only just reach
it. On the hardest grids, write out every way a row or column could be
finished with the unused numbers and keep only what fits; failing that,
suppose a number goes in a cell and follow the consequences until they either
work or break a total.

## Purpose

A pure arithmetic logic puzzle: no grid geometry to learn, only addition and
a single "each number once" rule, yet the larger grids reward real
combination reasoning. It sits beside `kakuro` and `sujiko` in the catalogue
but works with a much wider range of numbers, which changes the feel from
recalling digit combinations to estimating sizes.

## History

Invented in 2006 by the Finnish statistician Seppo Mustonen, who named it
after Survo, the statistical software system he developed, where the puzzles
were first built and solved. Mustonen rated his puzzles by how much work a
solve takes; they spread through Finnish newspapers and puzzle collections.

## This implementation

- **Spec knobs:** `rows` (3-4) and `cols` (3-6), each 0 to pick from the
  difficulty (Kids 3×3, Easy 3×4, Medium 4×4, Hard 4×5, Expert 4×6);
  `difficulty`, `cell`, `line`.
- **Generation:** a seeded shuffle of 1..m·n fills the grid and the totals
  are read off it. Every cell starts given; givens are removed one at a time
  in random order while the solver below still settles the whole grid using
  no more than the technique the requested band allows (Expert may use the
  whole ladder). A given the solver needs is put back.
- **Solving:** a sound technique ladder over candidate sets — *single* (the
  last open cell of a line, a cell with one candidate, a number with one
  possible cell), *bounds* (a value too small or too large for the rest of
  its line to reach the remaining total with distinct unused numbers),
  *combination* (every way to finish a line enumerated; values no completion
  uses are struck) and *trial* (assume a value, reason with bounds, strike it
  on contradiction).
- **Guarantees:** deterministic per seed; exactly one solution — every
  deduction is sound and the ladder settles every cell, and an independent
  plain backtracking count (cap 2, no candidate sets) confirms it at
  generation time and in the tests; a count that ran out of budget would be
  treated as ambiguous. Difficulty is the size tier (up to 9 cells, up to 16,
  beyond) plus the rank of the hardest technique the cheapest successful
  solve needed (single 0, bounds 1, combination 2, trial 3), capped at
  Expert; the count's node tally is kept as `search_nodes`, a measure of
  Mustonen's "solving effort". A size given explicitly keeps its size tier,
  so a 4×6 cannot be Kids — the nearest honest band is returned instead.
  Uniqueness on a 4×6 needs about eight or more givens whatever the solver,
  so Expert boards print nine to eleven numbers.

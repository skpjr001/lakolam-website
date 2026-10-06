---
title: "Japanese Sums"
blurb: "Japanese Sums — place digits in some cells; the outside clues are the sums of each run"
category: puzzle
version: "1.1.0"
---
A Latin square with holes — the numbers outside add up each run of digits.

## What it is

A square grid with numbers along the left side and the top. Write digits
into some of the cells and leave the others empty. In the classic form
every digit from 1 to N (N is printed under the grid) appears exactly once
in every row and every column, so each line also has a few empty cells.
The numbers beside a row, read left to right, are the sums of its groups
of neighbouring digits, in order; the numbers above a column, read top to
bottom, do the same for the column. A question mark stands for a group
whose sum is not given.

## How to play

Each clue number is one block of filled cells with no gap; blocks are
separated by at least one empty cell. A row clued "5 10" has two blocks:
the first adds up to 5, the second, further right, to 10. A "?" is still a
block — you just don't know its total.

Start with extreme sums. With digits 1–4, a single block of 10 must hold
all four digits side by side; a block of 1 is a lone 1. A row with one big
block leaves its empty cells at the ends. Cross rows with columns: a
digit placed in a row is gone from its column, and an empty cell splits a
column's blocks. On harder grids, try a value in a cell and follow the
consequences — if a line can no longer be filled, the value is wrong.

## Purpose

Kakuro's arithmetic meets sudoku's no-repeat rule and the block logic of
nonograms. It trains combination sums (which digits can make 10 in three
cells?), elimination across lines, and the pleasure of placing empty cells
as carefully as digits.

## History

Japanese Sums is a modern pencil-puzzle genre from the international
competition scene, a sibling of Kakuro and of
nonograms. It has appeared in the World Puzzle Federation's Puzzle Grand
Prix and on Grandmaster Puzzles, usually with the digit range and the
"each digit once" or "no repeats" rule stated with the grid.

## This implementation

- **Spec knobs:** `size` (4–8; 0 picks from the difficulty), `digits` (the
  largest digit N, 2 to min(size − 1, 6); 0 picks from the difficulty —
  4×4 with 1–3, 5×5 with 1–3, 5×5 with 1–4, 6×6 with 1–4, 7×7 with 1–5
  from Kids to Expert), `every_digit` (on: each digit exactly once per row
  and column; off: digits only never repeat), `difficulty`, `cell`,
  `line`.
- **Generation:** a random Latin square of the grid's order is filled cell
  by cell with backtracking, and every symbol above N becomes an empty
  cell (with `every_digit` off, a fifth of the remaining digits are also
  emptied at random). The run sums are counted off the grid. Kids and Easy
  show every sum; Medium hides up to half the grid's side behind "?";
  Hard and Expert hide sums in random order while the ladder still
  finishes the grid, up to two in five (Hard) or half (Expert) of them,
  then take a short random walk — hide one sum, show another — until the
  grid needs the trial rung. The digit range and rule are printed under
  the grid.
- **Solving:** on `lako_solver` domains (empty, 1…N per cell) — *line*
  (each row and column on its own, exactly: every arrangement that fits
  its clue, the no-repeat rule and its cells' candidates is enumerated,
  and only values some arrangement uses survive), and *trial* (assume a
  value, run the lines, strike it on a contradiction).
- **Guarantees:** deterministic per seed; exactly one grid, proven because
  the sound ladder finishes it, confirmed by a capped exhaustive count,
  and re-proven in tests by an independent search that lists each row's
  fillings by brute force and stacks rows while every column stays
  consistent with its clue. Rated by the rung needed with size and hidden
  sums as the tie-break: line reasoning alone is Kids at 4×4, Easy at 5×5
  with every sum shown, Medium at 5×5 with some hidden, Hard from 6×6; a
  trial is Hard up to 6×6 and Expert above. Hard boards are therefore not
  always trial boards — a 6×6 grid with hidden sums is Hard on size, which
  the meta's `hardest_technique` states. When none of the 60 attempts finds a grid at all
  (rare: seen at 6×6 Expert with digits 1-5), up to 120 more run from fresh
  seeds and the nearest band is served and labelled (v1.1.0).

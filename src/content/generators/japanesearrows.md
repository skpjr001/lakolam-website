---
title: "Japanese Arrows"
blurb: "Japanese Arrows — every cell's number counts the different numbers its arrow points at"
category: puzzle
version: "1.0.0"
---
Every arrow asks one question: how many different numbers do you see that
way?

## What it is

A square grid with an arrow in every cell and a few numbers already
written in. Fill every cell with a number equal to how many *different*
numbers lie in the direction of its arrow, from the next cell all the way
to the edge. The grid describes itself: each number depends on the numbers
it points at, which depend on the numbers they point at, and so on.

## How to play

Write a number in every empty cell so that:

- each cell's number is how many different numbers appear in the cells its
  arrow points at, up to the edge of the grid (the cell itself does not
  count; repeated numbers count once);
- the numbers already printed stay as they are.

A cell whose arrow points at only one cell holds 1. A cell that points at
two cells holds 1 if they match and 2 if they differ. A number can never be
more than the cells it points at, and never less than the different
numbers already written along its line — and once a number is known, read
it backwards: if the line already shows that many different numbers, every
empty cell on it repeats one of them.

Some puzzles use diagonal arrows too; they work the same way, along the
diagonal.

## Purpose

A self-referential counting puzzle: no arithmetic beyond counting, but
every cell is tied to a whole line, so solving means reading lines both
forwards (what does this cell see?) and backwards (what must this line hold
for that cell to be right?).

## History

Japanese Arrows has appeared in British puzzle magazines and in World
Puzzle Championship and Grand Prix rounds; the World Puzzle Championship
community wiki records the rules used here (the cell itself is not counted;
different numbers are counted to the edge of the grid).

## This implementation

- **Spec knobs:** `size` (4–8; 0 picks from the difficulty — 4, 5, 6, 6, 7
  from Kids to Expert), `difficulty`, `diagonals` (arrows may also point
  diagonally; off by default), `cell`, `line`.
- **Generation:** every cell gets a seeded arrow whose line is not empty
  (so no cell is a giveaway 0). A filling is found by the solver's own
  search, branching on the values in seeded order. Given numbers are then
  added wherever the ladder leaves a cell with the most values open, and
  erased one at a time in seeded order, first while the rung below the
  ceiling still settles every cell, then while the ceiling does — boards
  usually keep only one to six givens.
- **Solving:** yes/no variables "this cell holds this value" (one value per
  cell) on a ladder of three rungs — *line bounds* (a number is at least the
  different values already on its line, and 1 if the line is not empty; at
  most the line's length, the different values its cells can still take,
  and the known values plus the open cells), *counting back* (a known
  number read onto its line: if the line already shows that many values,
  the open cells repeat them; if only that many cells can bring a new
  value, each must; if the line can hold only that many values, each must
  appear, so a value with one possible cell goes there) and *trial* (assume
  a value, propagate the lower rungs, keep the opposite on a
  contradiction).
- **Guarantees:** deterministic per seed; exactly one filling, proven
  because the sound ladder settles every cell, confirmed by a capped
  exhaustive count, and re-proven in tests by an independent backtracking
  search over the numbers themselves that knows only the rule. Rated by the
  hardest rung needed: line bounds alone are Kids up to 4×4 and Easy above;
  counting back is Medium; trial is Hard up to 6×6 and Expert above. Every
  band is reached at its default size; a band a chosen size cannot reach is
  served as the nearest band that size reaches, and labelled as such.

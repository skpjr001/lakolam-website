---
title: "Shinro"
blurb: "Shinro — find 12 gems in an 8x8 grid from row and column counts and arrows"
category: puzzle
version: "1.0.0"
---
Twelve gems are hidden in the grid: find them all from the counts and the arrows.

## What it is

An 8×8 grid hiding exactly 12 gems. The number beside each row and above
each column says how many gems it holds. Some cells hold arrows; an arrow
is never on a gem, and it points at least one gem somewhere along its
path. Exactly one placement of the gems fits every clue.

## How to play

Mark the 12 gems. Each row and each column must hold as many gems as its
number says. A cell with an arrow has no gem. Each arrow points up, down,
across or diagonally; follow its direction from the arrow to the edge of the
grid, and at least one gem must lie somewhere on that path. It may point at
more than one.

Good first steps: a row or column whose count is 0 is empty; an arrow
whose path has only one cell that could still hold a gem points at that
cell; a row whose gems are all found is empty everywhere else. When those
run out, look at an arrow whose path stays inside one row or column: that
row or column has a gem there, which may use up its count. On the hardest
grids, suppose a cell holds a gem and follow the consequences until the
counts or the arrows can no longer be met — then it is empty.

## Purpose

A short, satisfying deduction puzzle that mixes counting with direction.
It trains careful bookkeeping (gems found versus gems needed) and the habit
of combining two clues that overlap.

## History

Shinro appeared in the 2000s on handheld puzzle collections and in
magazines; its name is often glossed as Japanese for "course" or "path",
after the arrows. It is played on an 8×8 grid with 12 hidden pieces,
sometimes called "gems" or "treasure".

## This implementation

- **Spec knobs:** `difficulty`; `cell`, `line`. Always 8×8 with 12 gems.
- **Generation:** 12 gems at seeded cells; every other cell that sees a gem
  gets an arrow toward a seeded gem-bearing direction; arrows are then taken
  away in seed order while the deduction ladder, capped at the band's rung,
  still settles every cell. Kids keeps at least 24 arrows. Up to 60
  seeded boards are tried for the requested band.
- **Solving:** a sound ladder — **counts** (full or exactly-fillable rows and
  columns; an arrow with one open cell on its path), **overlap** (every way
  to finish one row or column, keeping the arrows whose open cells lie
  inside it satisfied; cells agreed by all ways are settled), **trial**
  (suppose a value; if counts and overlap then clash, it is the other).
  Uniqueness is also proved by an exhaustive row-by-row count with cap 2.
- **Bands** (`rating_basis: "hardest_rung"`, meta `hardest_rung`,
  `arrows`): Kids = counts only with ≥ 24 arrows; Easy = counts only;
  Medium = overlap; Hard = trial. No 8×8 board was found to need more than
  one trial at a time, so Expert is served as Hard with
  `requested_difficulty`.
- **Guarantees:** `unique: true`; the tests re-count every band with an
  independent cell-by-cell search. The answer key marks the gems in red.

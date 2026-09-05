---
title: "Sum Search"
blurb: "Sum Search — find the digit runs that add to each target, uniquely"
category: word
version: "1.0.0"
---
Find the run of digits that adds up to each printed target — across, down or
diagonally.

## What it is

A word search whose vocabulary is arithmetic. The grid is digits 1–9; each
target names exactly one straight run of four (by default) whose digits sum
to it. The answer key rings them.

## How to play

Work from the extremes. A target of 34 out of four digits needs 9+9+9+7 or
better, so scan for clusters of nines; a low target needs a run of ones and
twos. Middle targets are the hard ones — and this generator prints them only
when they happen to be unique.

## Why it is in the catalogue

The word lane's arithmetic cousin, and a good demonstration that "unique
answer" means different things in different puzzles. Here it is not about a
solver: it is about whether the *grid* accidentally contains a second run
reaching the same total.

## The implementation's guarantees

- **Targets are read off the grid, not imposed on it.** The first version
  chose runs, took their sums as targets, and rerolled filler digits until
  each target was hit once — a condition close to unsatisfiable, and the
  arithmetic says why: a 9×9 with four directions holds ~180 runs of four
  digits whose sums span only 4..36, about five runs per sum. No rerolling
  makes a mid-range sum rare, and each reroll perturbs dozens of runs at
  once; forty grids failed in a row. Tallying every run's sum and printing
  only the sums that occur exactly once is cheaper *and* exact.
- A test re-verifies each target against every run in the grid,
  independently of the tally that produced it.
- Digits are 1–9, never 0: a zero lets two visibly different runs share a
  sum, which is the ambiguity the whole design is avoiding.
- Rating basis: `run_length_and_directions` — longer runs and diagonals are
  what make the scan harder, and the metadata says so.

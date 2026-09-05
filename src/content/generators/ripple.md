---
title: "Ripple Effect"
blurb: "Fill each room with 1 to its size, keeping equal values further apart than themselves"
category: puzzle
version: "1.0.0"
---
Fill every room with 1 to its size — and keep equal numbers further apart
than their own value.

## What it is

A grid carved into rooms. Each room of size *n* holds the numbers 1…*n*, each
once. The ripple rule: two copies of the number *k* in the same row or column
must have **more than k cells between them**. A pair of 1s needs one cell of
gap; a pair of 5s needs five.

## How to play

Big numbers in small rooms are the levers: a 5 can only exist in a room of
five or more cells, and two 5s in one row need serious distance. Fill
single-cell rooms (always 1) first, then use the spacing rule as an
eliminator — every placed number sweeps its value out of nearby cells in its
row and column. Room completion and spacing alternate until the board closes.

## History

Nikoli, published as **Hakyuu Kouka** ("ripple effect"), from the mid-1990s.
Less famous than sudoku but prized among solvers for how *physical* the
spacing rule feels — numbers radiate exclusion like ripples in water.

## Purpose

The workspace's second puzzle (after sudoku) on the shared constraint engine:
rooms are `AllDifferent` groups, and the spacing rule is a custom propagator.
Its development recorded two engine lessons — the `Intersection` propagator
is *unsound* for rooms that can repeat a value across groups, and "unique" is
not the same standard as "solvable by inference", both now documented in the
solver crate.

## This implementation

- **Spec knobs:** `rows`, `cols`, `max_room`, `difficulty`.
- **Generation:** answer first — rooms are carved, the engine fills them, and
  givens are thinned while the board stays solvable by inference at the
  target ceiling (the ladder standard, not mere uniqueness — thinning to
  uniqueness alone once produced an 8×8 with a single clue).
- **Guarantees:** exactly one filling, reachable by inference; domains are
  restricted to each cell's room size before the search begins.
- **Difficulty:** the hardest technique the ladder actually needed.
- **Cross-check:** the spacing propagator is verified against an exhaustive
  3×3 enumeration.

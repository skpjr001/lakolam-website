---
title: "Ripple Effect"
blurb: "Fill each room with 1 to its size, keeping equal values further apart than themselves"
category: puzzle
version: "1.2.0"
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
- **Knobs that find nothing (v1.1):** `max_room` of 0–4 found no 8×8 board,
  and 5 failed for some seeds. Now, only when the requested cap finds
  nothing, a second pass from fresh seeds retries it, then raises it a step
  at a time toward 6; the metadata reports `max_room_used`. Every board that
  generated before is unchanged.
- **Version 1.2 — a Hard rung:** the ladder had only singles to offer, so
  every request from Easy up came back Easy. A room–line move is now on the
  ladder at sudoku's pointing-pair rung: when the cells of a room still open
  to a value all lie in one row or column, any cell of that line outside the
  room within that value's reach of every one of them cannot hold it. It
  runs only at the Hard and Expert ceilings, so Kids, Easy and Medium boards
  are byte-identical to 1.1; Hard and Expert requests now get boards that
  need the move (Hard, about 11 seeds in 12). **Reachable bands:** Kids,
  Easy and Hard. Medium is out of reach — measured, the pair rungs are never
  what a thinned board needs, because the spacing rule does that work — and
  Expert has no rung here, so both are served as the nearest band with
  `requested_difficulty` recorded.

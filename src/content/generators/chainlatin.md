---
title: "Chain Latin Square"
blurb: "Chain Latin Square — each number once in every row, column and linked chain"
category: puzzle
version: "1.0.0"
---
Fill the circles so every row, every column and every linked chain holds
each number once.

## What it is

A square of circles, 4×4 up to 7×7. The circles are joined into chains:
each chain is as long as a row, and its links run across, down or
diagonally from one circle to the next. Fill in the numbers 1 up to the
board's size so that no number repeats in any row, any column or any chain.
A few numbers are given, and there is exactly one way to finish.

## How to play

- Write one number in every empty circle, using 1 to 4 on a 4×4 board, 1 to
  5 on a 5×5, and so on.
- Each row, each column and each chain (circles joined by lines) must hold
  every number exactly once.
- Start with a circle whose row, column and chain between them already use
  every number but one: that one goes there.
- Then look at one number in one row, column or chain: if it fits in only
  one circle there, write it in.
- Harder boards need more: two circles of a group that can only hold the
  same two numbers keep those numbers out of the rest of the group; and if a
  number's only places in a chain all lie on one row (or column), it cannot
  go anywhere else in that row.
- The chains are what make it different from an ordinary number square —
  follow them carefully, especially where they turn a corner.

## Purpose

A Latin square with a third family of groups that wander across the board.
Small boards suit children (4×4 needs nothing but "what's missing?"), and
the larger ones reward the same pair and locked-number reasoning as sudoku,
on a board quick enough for a phone or a newspaper corner.

## History

The chain form of the Latin square was devised in the mid-2000s by the
Grabarchuk family of puzzle designers and is published under several names
(Chain Sudoku among them); the Latin square itself is Euler's.

## This implementation

- **Spec knobs:** `size` (4–7, default 6; a request outside is clamped and
  reported as `requested_size`), `difficulty`, `cell`, `line`.
- **Generation:** the chains are grown as king-move paths of N cells that
  tile the board, picking the most cornered free cell next with seeded
  tie-breaks; no two diagonal links cross, and no chain lies along a single
  row or column. A filling that fits rows, columns and chains is found by
  seeded backtracking. Numbers are then removed in seeded order while the
  technique ladder can still finish the board at the band's ceiling, and up
  to 40 boards are tried for the requested band.
- **Solving:** `lako-solver`: all-different on rows, columns and chains
  (naked and hidden singles, naked and hidden pairs) plus chain/line
  intersections (a number locked where a chain meets a row or column, both
  directions).
- **Guarantees:** deterministic per seed; exactly one filling — the ladder
  finishes the board by sound steps, and an exhaustive count (cap 2) of the
  givens confirms it; the tests count again with a separate plain search.
  Rated by the hardest technique the solve needed (`rating_basis:
  hardest_technique`): Kids naked singles, Easy hidden singles, Medium pairs,
  Hard chain/line locks. Served as asked on 5×5–7×7 for Kids to Hard
  (measured, 8 seeds each); 4×4 boards top out at Easy (Medium on about one
  seed in eight), so Medium and Hard on 4×4 are served as the nearest band.
  Expert does not occur and is served as Hard. Any band served other than
  the one asked is recorded as `requested_difficulty`. A 7×7 Hard board
  builds in about 25 ms.

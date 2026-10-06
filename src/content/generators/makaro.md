---
title: "Makaro"
blurb: "Makaro — rooms count themselves, arrows point at the largest neighbour"
category: puzzle
version: "1.0.0"
---
Fill each room with 1 to its size — but no number may touch its twin across a
wall, and every arrow points at the biggest neighbour.

## What it is

A square grid is divided by bold lines into rooms of one to five white cells;
a few cells are black. Some black cells hold an arrow. A few numbers are
given. There is exactly one way to complete the grid.

## How to play

- Write a number in every white cell. A room of two cells holds 1 and 2, a
  room of three holds 1, 2 and 3, and so on — each number once.
- Two cells that touch side by side but belong to **different** rooms never
  hold the same number.
- An arrow in a black cell points at one of the white cells beside it (up,
  down, left or right). That cell holds a number **larger** than every other
  white cell beside the arrow.

Start with the arrows: the cell an arrow points at cannot be a 1, and its
neighbours around the arrow must all be smaller. Small rooms fill quickly, and
a number placed next to a wall rules that number out of the cells just across
it.

## Purpose

A region-filling number puzzle in the family of `suguru` and `ripple`, with
two twists of its own: the no-repeat rule acts only *across* room walls, and
the arrows add a relation clue ("this neighbour is the largest") that gives
the black cells a job. It suits solvers who like suguru but want arrows to
chase.

## History

Makaro is a genre from Nikoli, the Japanese puzzle publisher behind sudoku's
rise, and appears in its magazine *Puzzle Communication Nikoli* and its
puzzle books.

## This implementation

- **Spec knobs:** `size` (5–10), `difficulty` (default Hard), `black_share`
  (share of black cells, 0.05–0.2), `cell`, `line`.
- **Generation:** black cells are scattered so that none touch and the white
  cells stay connected; the white cells are carved into rooms of mostly two to
  five cells (boxed-in singletons fold into a neighbouring room where they
  can); a random legal filling is found by randomised backtracking, room by
  room. Every arrow the filling supports — a black cell with at least two
  white neighbours, one of them strictly largest — is printed. Then digits
  are removed in a random order while the technique ladder still finishes the
  board unaided at the requested ceiling.
- **Solving:** the shared constraint engine — `AllDifferent` per room
  (singles, subsets), an elimination pass for neighbours across walls, a fan
  of inequalities per arrow (target greater than each other neighbour, read
  as the `relation` technique), and a room-pointing rule: when every cell a
  room still allows for some number touches one outside cell across a wall,
  that cell cannot hold the number — the makaro form of a pointing pair, and
  rated as one.
- **Guarantees:** deterministic per seed. The filling obeys every rule and
  every printed arrow points at a strict maximum (checked against the
  definition). Each board is proven unique by the ladder settling every cell
  through sound inference and by the engine's exhaustive count (cap 2); the
  tests re-count with an independent plain backtracker. Difficulty is the
  hardest technique the ladder needed (`rating_basis: technique_ladder`).
  Honest bands: arrows are relation clues, so the Kids band is unreachable
  (a Kids request ships Easy); naked and hidden pairs never proved necessary
  in measurement, so Medium is unreachable too and a Medium request ships the
  nearest band found (Easy or Hard); and no Expert technique is used, so
  Expert requests ship Hard. `requested_difficulty` is always recorded.

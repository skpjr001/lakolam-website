---
title: "Mathrax"
blurb: "Mathrax — a Latin square whose corner clues bind both diagonal pairs"
category: puzzle
version: "1.0.0"
---
A Latin square with arithmetic on its corners: every clue speaks for both
diagonals at once.

## What it is

An N×N grid is filled with the numbers 1 to N so that no number repeats in
any row or column. Small circles sit where four cells meet. Each circle holds
a clue about the two diagonal pairs of those four cells — the top-left with
the bottom-right, and the top-right with the bottom-left — and the clue is
true of **both** pairs. A number or two may be given. There is exactly one
solution.

## How to play

Fill every row and column with 1 to N, each once. Where a circle sits between
four cells, read its clue as a statement about each diagonal pair:

- **7+** — each diagonal pair adds up to 7.
- **3–** — the two numbers in each diagonal pair differ by 3.
- **12×** — each diagonal pair multiplies to 12.
- **2÷** — in each diagonal pair, one number is twice the other (the larger
  divided by the smaller gives 2).
- **=** — the two numbers in each diagonal pair are the same.
- **E** — all four numbers around the circle are even.
- **O** — all four numbers around the circle are odd.

Start with the most restrictive circles: an **E** or **O**, a product with
few factorisations, a large sum or difference. Each one narrows four cells at
once, and the no-repeat rule carries those deductions along the rows and
columns.

## Purpose

A Latin-square puzzle whose clues are relations between cells rather than
cage totals or inequalities. It sits between `futoshiki` (pairwise signs) and
`kenken` (cage arithmetic) in the catalogue, and the "both diagonals" twist
gives it a texture of its own: every clue is two constraints that must agree.

## History

Mathrax was invented by the German puzzle author Otto Janko, who publishes
thousands of them on his website, and it has since appeared in World Puzzle
Championship and national championship rounds.

## This implementation

- **Spec knobs:** `size` (4–9), `difficulty`, `parity` (allow the `E`/`O`
  clues), `cell`, `line`.
- **Generation:** a random Latin square is built by randomised backtracking
  (not a relabelled cyclic square, whose rigid structure makes clue sets
  ambiguous far more often). At every intersection the clues that hold for
  both diagonal pairs are listed — sum, difference, product, quotient, equal,
  even, odd — and one is chosen, preferring anything but a difference, which
  holds far more often than the rest. If the clues alone do not settle the
  board, digits are given in a random order until they do. Then given digits,
  and after them clues (commonest kind first, so variety survives), are
  removed while the technique ladder still finishes the board unaided.
- **Solving:** the shared constraint engine — `AllDifferent` on rows and
  columns (singles, naked and hidden subsets), X-Wing and Swordfish, plus one
  arc-consistency propagator per clue that strikes any value with no partner
  satisfying the clue on its diagonal. Clue reasoning reports the `relation`
  technique (Easy band).
- **Guarantees:** deterministic per seed. Every printed clue is true of both
  diagonal pairs of the answer (checked against the definition). The board is
  proven unique twice: the ladder settles every cell by sound inference, and
  the engine's exhaustive search (cap 2) finds no second filling; the tests
  re-count with an independent plain backtracker. Difficulty is the hardest
  technique the ladder needed (`rating_basis: technique_ladder`). Because every
  clue is a printed relation, the Kids band is unreachable — a Kids request
  ships an Easy board and records `requested_difficulty: kids`. Expert
  (Swordfish) boards are rare and come mainly from 8×8 and 9×9; the closest
  band found is shipped and recorded honestly.

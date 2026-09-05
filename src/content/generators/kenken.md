---
title: "KenKen"
blurb: "Fill a Latin square so each cage reaches its target by its operation"
category: puzzle
version: "1.0.0"
---
Fill a Latin square so every outlined cage reaches its target number using its
printed operation.

## What it is

An n×n grid to be filled with 1–n, no repeats in any row or column (a Latin
square). The grid is carved into heavily-outlined **cages**, each labelled
with a target and an operation, like "12×" or "3−". The digits in a cage must
combine to the target using that operation; single-cell cages are givens.
Digits *may* repeat within a cage if the Latin rows and columns allow it.

## How to play

Start with single-cell cages and cages with unique digit sets (a two-cell "3−"
in a 4×4 must be {1,4} or {2,5}…). Combine cage arithmetic with the Latin
constraint — a candidate ruled out of a row by arithmetic elsewhere is ruled
out of its cage too. Subtraction and division cages may take their digits in
either order.

## Purpose

The arithmetic-practice puzzle: it was invented as a classroom tool, and it
slots between sudoku (pure logic) and kakuro (pure sums) in a mixed book. In
the workspace it shares the whole constraint engine with sudoku — the cages
are just extra propagators over the same Latin-square variables.

## History

Invented in 2004 by Japanese mathematics teacher **Tetsuya Miyamoto** as
KenKen ("cleverness squared"), designed for "the art of teaching without
teaching". Licensed worldwide from 2008, when The Times began publishing it
daily. Also circulated as KenDoku, Calcudoku and Mathdoku.

## This implementation

- **Spec knobs:** `size` (4–9), `max_cage`, `difficulty`,
  `subtraction_and_division` toggle.
- **Generation:** answer first — a Latin square is generated, cages are carved
  as dominoes-and-larger with sizes weighted small, and each cage's operation
  is read off its own digits. After uniqueness is proven, operations are
  re-rolled uniformly per domino (re-proving uniqueness each swap) so `−` and
  `÷` actually appear; without that sweep 2 of the 4 operations nearly
  vanished.
- **Guarantees:** exactly one solution over the Latin constraints and cage
  propagators together; every cage checked against its own answer.
- **Difficulty:** led by the shared technique ladder with a ±1 band nudge from
  mean cage size. The spec bounds which bands exist — a 4×4 of dominoes is
  Kids and cannot be otherwise; Hard needs a 9×9.

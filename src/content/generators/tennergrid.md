---
title: "Tenner Grid"
blurb: "Tenner Grid — every row holds 0-9 once, equal digits never touch, and each column adds up to the number below it"
category: puzzle
version: "1.0.0"
---
Ten digits to a row, no twin ever touching, and every column adding up to the
number underneath.

## What it is

A grid ten squares wide and a few rows deep. Some digits are printed; under
each column, in a grey box, is that column's total. Fill the empty squares so
the rules below hold. There is exactly one way to do it.

## How to play

- Every row holds the digits 0 to 9, each exactly once.
- Two squares that touch — side by side, above and below, or corner to
  corner — never hold the same digit.
- The digits in each column add up to the number in the grey box below it.
  Digits may repeat within a column, as long as they do not touch.

Start with a row that is missing only one digit, or a column with only one
empty square: the total minus the digits already there is the missing one.
Then look for a digit that can fit in only one square of its row, and use the
touching rule to cross digits off the squares around every digit you place.

## Purpose

A number-placement puzzle that mixes the no-repeat row of a Latin square with
the arithmetic of column totals and a "no touching" rule borrowed from Star
Battle — friendly enough to start from the arithmetic alone, with real
deduction once the givens thin out.

## History

The puzzle is known as Tenner Grid, Grid Ten, "From 1 to 10" and, in German,
Zehnergitter; it ran in puzzle magazines under several names and has been a
staple of Otto Janko's puzzle collection, which holds some four hundred of
them.

## This implementation

- **Spec knobs:** `difficulty`, `rows` (3–8; the grid is always 10 wide),
  `cell`, `line`.
- **Generation:** answer-first. Each row is a random arrangement of 0–9 that
  avoids the digits touching it in the row above (randomised backtracking);
  the column totals are read off; then printed digits are removed one at a
  time, keeping a removal only while the technique ladder at the requested
  ceiling still finishes the board unaided. Up to twelve boards are tried and
  the one rated in the requested band — or nearest to it — is kept.
- **Solving:** the shared constraint engine with an all-different per row, an
  all-different per 2×2 window between rows (every touching pair lies in
  one), and a column total that allows repeats. The column total fills a
  column's last empty square by subtraction (a naked single) and otherwise
  keeps only the digits some completion of the column supports (reading the
  clue, the Easy band).
- **Guarantees:** deterministic per seed; the ladder settles every square by
  sound deduction, which proves the answer is the only one, and the engine's
  capped count agrees. Tests re-prove uniqueness with an independent
  depth-first count and check every rule straight from the digits. Rated by
  the hardest technique the solve needed (`rating_basis: technique_ladder`):
  Kids needs only last digits of a row or column, Easy hidden singles and the
  column totals, Medium naked or hidden pairs. **Hard and Expert are not
  reachable** — with full rows and sums there is nothing for X-Wing-style
  reasoning to bite on — so those requests are served at Medium, and meta
  records `requested_difficulty`.

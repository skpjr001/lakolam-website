---
title: "Kyudoku"
blurb: "Kyudoku — circle 1 to 9 once each on a 6x6 grid, no row or column past 9"
category: puzzle
version: "1.0.0"
---
Circle nine numbers, 1 to 9 once each, without any row or column adding up
to more than 9.

## What it is

A 6×6 grid filled with the digits 1 to 9, four of each. Circle nine cells so
that every digit from 1 to 9 is circled exactly once, and the circled digits
in any row — and in any column — add up to 9 or less. One digit (three on
the easiest pages) comes circled. There is exactly one way to do it.

## How to play

- Circle nine cells: one 1, one 2, one 3 … up to one 9.
- In every row, the circled numbers must add up to 9 or less. The same goes
  for every column.
- When you circle a digit, cross out its other copies — that digit is done.
- Cross out any digit that would push its row or column past 9.
- When only one copy of a digit is left, circle it.
- Harder grids: if every copy left of a digit lies in one row, that digit
  will be circled in that row, so count it in the row's total before it is
  circled — it may leave no room for another cell there.
- Hardest grids: try a cell in your head. If circling it leads, step by
  step, to a digit with no copy left or a line past 9, cross it out.

## Purpose

A five-minute number puzzle with very little to read and a lot to weigh:
the "no line past 9" rule turns a hunt for nine digits into careful
budgeting of each row and column. Good for adults and confident children.

## History

A modern pencil puzzle whose name comes from the Japanese for "nine"; it is
published daily online and in printable collections.

## This implementation

- **Spec knobs:** `difficulty`, `cell`, `line`.
- **Generation:** a circling is planted (one cell per digit, largest digits
  first, every line at most 9); the other 27 cells take three more copies of
  each digit in seeded order. While a rival circling exists, one of its
  cells is swapped with another cell (keeping four of each digit), accepting
  swaps that do not raise the number of circlings. The given circle is then
  picked from the answer, in seeded order, so that the deduction ladder
  needs the band's rung; Kids is given three circles.
- **Solving:** the deduction ladder: basic (a circled digit crosses its
  copies; a digit too big for its line's remaining room; the last copy of a
  digit), committed (a digit whose copies all lie in one line counts toward
  that line), what-if (assume a cell, follow the lower rungs to a
  contradiction), and a nested what-if.
- **Guarantees:** deterministic per seed; exactly one circling, proven by an
  exhaustive count (cap 2, one cell per digit, pruned the moment a line
  passes 9) *without* the given circle — the given only gives a start. The
  ladder finishes every page from its given circle, and tests count again
  with a separate search that prunes only on repeated digits. Rated by the
  hardest rung needed (`rating_basis: hardest_rung`): Kids basic steps with
  three circles given, Easy basic steps, Medium committed digits, Hard one
  what-if. A nested what-if was never needed on any grid measured, so Expert
  is served as Hard and reported as `requested_difficulty`. Kids to Hard
  were served as asked on 8 of 8 seeds each; a page builds in under 15 ms.

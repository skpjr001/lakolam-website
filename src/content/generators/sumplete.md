---
title: "Sumplete"
blurb: "Sumplete — cross out numbers so every row and column adds up to its target"
category: maths
version: "1.0.0"
---
Cross out numbers until every row and every column adds up to its total.

## What it is

A square grid of numbers with a total beside each row and below each
column. Some numbers do not belong: cross them out so that the numbers left
in each row add up to the row's total, and the numbers left in each column
add up to the column's total. There is exactly one way to do it.

The puzzle is best known as Sumplete, the name of a 2022 browser game; this
generator makes printable grids of the same kind, from 3 × 3 to 9 × 9,
optionally with negative numbers.

## How to play

- Cross out a number when you are sure it goes; circle it when you are sure
  it stays.
- Every row must add up to the total on its right, and every column to the
  total below it, counting only the numbers not crossed out.
- Start with the extremes. If a row's total is smaller than one of its
  numbers, that number must go (when all the numbers are positive). If a
  row needs nearly everything it has, the numbers it cannot do without must
  stay.
- Then look for the only way to make a total: if 9 must come from 2, 3, 4
  and 7, it can only be 2 + 7, so 3 and 4 go.
- A column you finish settles a number in each row, which often unlocks
  the next row.
- With negative numbers, crossing out a negative number makes a total
  bigger, so think about both directions.

## Purpose

Mental addition with a purpose: the solver adds and compares small sums
over and over, tries combinations, and checks their work in two directions
at once. It is a gentle introduction to logical deduction for children and a
quick daily puzzle for adults.

## History

Sumplete was released in March 2023 as a browser game whose rules and code
were, unusually, written with the help of an AI chatbot; it was soon pointed
out that very similar puzzles already existed, such as the earlier puzzle
app Rullo. The idea — a grid of numbers, row and column targets, delete what
does not belong — is simple enough to have been invented more than once.

## This implementation

**Spec knobs:** `difficulty`; `size` (3-9, 0 picks from the difficulty:
Kids 4, Easy 5, Medium 6, Hard 8, Expert 9); `negatives` (numbers -9 to 9,
never 0); page `width`/`height`; `line`.

**Generation:** numbers 1-9 (or ±1-9) are drawn, and each is kept with
probability 0.55; every row and column must keep at least one number and
cross out at least one, and no total may be 0. The totals are read from the
kept numbers. If a second solution exists, a number that the answer crosses
out but the rival keeps is redrawn — crossed-out numbers never reach a
total, so the answer survives while the rival usually breaks — up to 60
repairs, then a fresh grid. Grids are redrawn until one lands in the
requested band, keeping the nearest.

**Solving:** a sound ladder of deductions, easiest first:

1. **Range** — for each row and column, the lowest and highest totals still
   reachable; a number must stay (or go) when the other choice puts the
   total out of reach.
2. **Line** — every way to finish one row or column; a number kept (or
   crossed) in all of them is settled.
3. **Trial** — assume a number stays (or goes) and apply the two rules
   above until a contradiction appears.
4. **Search** — what the ladder cannot settle.

Rating is by the hardest step needed: Range is Easy (Kids on grids up to
4 × 4), Line is Medium, Trial is Hard, Search is Expert
(`rating_basis: hardest_technique`). At the automatic sizes each band is
reached; a fixed small size may not reach the hardest bands, and then the
nearest band is printed and labelled as such.

**Guarantees:** deterministic per seed; exactly one solution, proven by an
exhaustive count (cap 2) that prunes with the two sound rules and branches
on every unsettled number. Tests re-count with an independent column-by-
column enumeration, re-check 4 × 4 grids against all 65,536 crossings, and
check that the ladder never settles a number against the answer.

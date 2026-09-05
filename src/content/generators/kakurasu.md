---
title: "Kakurasu"
blurb: "Kakurasu — shade cells so every line sums to its position clue"
category: puzzle
version: "1.0.0"
---
Shade cells so that every line's shaded *positions* add up to its clue.

## What it is

A binary shading grid. The number beside a row is the sum of the column
positions of that row's shaded cells — shading the 1st, 3rd and 4th columns
gives 1 + 3 + 4 = 8. The number under a column is the same sum over row
positions. Grey rulers along the top and left show what each position is
worth.

## How to play

Start with the extremes: a clue of 0 empties its line, and the maximum
(1+2+…+n) fills it. Elsewhere, work out which subsets of positions can reach
the clue — a row of six needing 3 can only be {3} or {1,2} — and cross-check
against the column clues.

## Why it is in the catalogue

The catalogue's first *binary* puzzle on the shared engine: the alphabet is
two values rather than 1..n, which is worth having as proof the solver is not
secretly a Latin-square engine. Everything but the clue rule is reused.

## History

A modern computer-era puzzle, popularised by Otto Janko's puzzle collection
and by Grandgames/Puzzle-Team under the names Kakurasu and Index Sums.

## The implementation's guarantees

- **The clue rule is exact**, not bounds arithmetic: the propagator
  enumerates the subsets still consistent with the assigned cells and
  eliminates any state absent from all of them. A line is at most 8 cells
  (256 subsets), so exactness is affordable — and it is what lets the ladder
  finish boards instead of stalling.
- **Uniqueness and no guessing** are proved on the board that ships, and a
  test additionally checks that the unique solution *is the shading the
  generator drew* — uniqueness alone would not say that.
- Clues are thinned while the ladder can still finish unaided; a 6×6
  typically prints 9 of the 12 slots.
- **Rating basis is named honestly**: `clue_density_with_ladder_floor`. This
  puzzle has one rule, so the hardest technique is always the same and the
  ladder alone cannot separate boards — what varies is how many clues
  survived thinning, and the metadata says so rather than dressing density up
  as a technique measurement.

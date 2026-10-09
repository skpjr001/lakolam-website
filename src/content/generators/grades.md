---
title: "Grades"
blurb: "Grades — place digits that never touch; left and top numbers count them, right and bottom numbers add them"
category: puzzle
version: "1.0.0"
---
Place digits that never touch — the numbers on the left and top count them,
the numbers on the right and bottom add them up.

## What it is

An empty square grid with numbers on all four sides. Some cells get a digit
from 1 to 9, spread out so that no two of them touch. Each row and column
has two numbers outside: one says how many digits it holds, the other what
they add up to.

## How to play

- Write a digit from 1 to 9 into some of the cells; the other cells stay
  empty.
- Cells with digits may not touch each other, not even at a corner.
- The number on the left of a row tells how many cells of that row hold a
  digit; the number above a column does the same for the column.
- The number on the right of a row is the sum of the digits in that row;
  the number below a column is the sum of the digits in the column.
- There is exactly one solution.

Good places to start: a row or column with a 0 count is empty. A line with
one digit has that digit's value as its sum, so where it crosses another
line with one digit, both clues must agree. Two digits in a row of five can
only sit in a few places once they may not touch, and a sum of 18 with two
digits means 9 and 9.

## Purpose

A number-placement puzzle that mixes placement logic (where can the digits
go?) with small sums. It trains counting, addition and keeping several
clues in mind at once.

## History

Grades is a genre from Otto Janko's online collection, which holds more
than a hundred of them from 6×6 upward.

## This implementation

- **Spec knobs:** `size` (5–10; 0 picks from the difficulty — 5, 6, 7, 9, 9
  from Kids to Expert), `difficulty`, `cell` (18–90 pt), `line` (0.2–4
  pt). Out-of-range numbers are clamped and the requested value is
  reported in the metadata.
- **Generation:** answer first. Digits 1–9 are scattered on cells that
  never touch and the four rows of edge numbers are read off. The layout is
  then hill-climbed — a digit changed (often to 1 or 9, which pin a sum),
  moved beside itself, added or removed, mostly where the ladder still has
  doubt — keeping a change when the sums rung leaves no more candidates
  open, until it settles every cell (or, for Expert, until it leaves only
  a little open and trial settles the rest). All edge numbers are
  printed.
- **Solving:** a ladder over candidate sets (0 = empty, 1–9). *Counts*: a
  sure digit empties the eight cells around it, and along each line every
  placement of the counted digits on cells that do not touch is weighed.
  *Sums*: every way to choose a line's digits with the right count and sum
  is weighed and candidates no way uses are removed. *Trial*: assume one
  candidate, follow the two rungs above, drop it on a contradiction.
- **Guarantees:** deterministic per seed; exactly one answer, proven
  because the sound ladder settles every cell (meta `uniqueness_proof`),
  and re-proven in tests by an independent capped search that fills the
  grid cell by cell and shares no code with the ladder. Rated by the
  hardest rung needed with size as the tie-break (counts and sums: Kids at
  5×5, Easy at 6×6, Medium up to 8×8, else Hard; trial: Hard up to 7×7,
  else Expert — the default Hard is a 9×9 settled by sums, the default
  Expert a 9×9 that needs trial). The sums rung is always needed (counts alone never tell
  the digits). Every band is served at its default size; with a custom
  `size` the label states the band reached.

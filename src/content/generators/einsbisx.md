---
title: "One to X"
blurb: "One to X (Eins bis X) — each region of N cells holds 1 to N, equal numbers never touch, edge numbers sum the lines"
category: puzzle
version: "1.0.0"
---
Every region counts from one up to its size, equal numbers never touch,
and the edge numbers give each line's sum.

## What it is

A square grid divided into outlined regions, with a number beside every
row and above every column, and sometimes a few numbers already written
in. Each region is filled with the numbers from 1 up to its own size —
"eins bis X", one to X, in German.

## How to play

- Write a number in every cell.
- A region of N cells holds each of the numbers 1 to N exactly once (a
  region of 3 cells holds 1, 2 and 3).
- Two cells that share a side may never hold the same number — also when
  they lie in different regions.
- The number left of a row is the sum of all the numbers in that row; the
  number above a column is the sum of that column.
- There is exactly one solution.

Good places to start: a region of 2 cells holds a 1 and a 2 — and the cells
around it then cannot repeat whichever number touches them. A row with a
small sum needs small numbers, so its cells in big regions are 1s and 2s;
a row with a large sum pushes the big numbers of its regions into it.

## Purpose

A number-placement puzzle like Suguru, with row and column sums added. It
trains small additions, ruling out with neighbours and balancing a total
across several regions.

## History

One to X (Eins bis X) was invented by Joachim Vetter and appeared in the
German magazine Logisch in 2006; Otto Janko's online collection has dozens
of them, from 6×6 up to 12×12.

## This implementation

- **Spec knobs:** `size` (5–10; 0 picks from the difficulty — 5, 6, 7, 9,
  9 from Kids to Expert), `difficulty`, `cell` (18–90 pt), `line` (0.2–4
  pt). Out-of-range numbers are clamped and the requested value is
  reported in the metadata.
- **Generation:** answer first. Regions of 2 to 6 cells are grown at
  random and filled by a backtracking search; the sums are read off. Then
  numbers are printed one at a time in a random cell the sums rung leaves
  undecided, until the band's rung settles every cell, and removed again
  in random order while it still does (at the trial rung, a few removals
  are tried).
- **Solving:** a ladder over candidate sets. *Singles*: a settled number
  leaves its region and its side neighbours, and a number with one place
  left in its region goes there. *Sums*: along each row and column every
  way to fill the line from the candidates with the right sum is weighed,
  and candidates no way uses are removed. *Trial*: assume one candidate,
  follow the two rungs above, drop it on a contradiction.
- **Guarantees:** deterministic per seed; exactly one answer, proven
  because the sound ladder settles every cell (meta `uniqueness_proof`),
  and re-proven in tests by an independent capped search (its own
  narrowing, branching on the cell with fewest options) that shares no
  code with the ladder. Rated by the
  hardest rung needed with size as the tie-break (singles and sums: Kids at
  5×5, Easy at 6×6, Medium up to 8×8, else Hard; trial: Hard up to 7×7,
  else Expert — the default Hard is a 9×9 settled by sums, the default
  Expert a 9×9 that needs trial). The sums rung is almost always needed. Every band is
  served at its default size; with a custom `size` the label states the
  band reached.

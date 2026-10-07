---
title: "Latin Sums"
blurb: "Latin Sums — each row and column holds 1 to N once; black cells sum their white neighbours"
category: puzzle
version: "1.0.0"
---
A Latin square with holes in it: fill every row and column with the same
few numbers, and let the black cells' sums tell you where they go.

## What it is

A square grid with the same number of black cells in every row and every
column. Each black cell shows a number. Fill the white cells so that every
row and every column holds each number from 1 up to N exactly once, where N
is how many white cells a row has. A black cell's number is the sum of the
numbers in the white cells around it — the up to eight cells touching it at
a side or a corner.

## How to play

- Write a number from 1 to N in every white cell. N is the number of white
  cells in each row (every row and column has the same count).
- Each row and each column holds every number from 1 to N exactly once.
- The number in a black cell is the total of the white cells around it,
  including the diagonal ones. Numbers may repeat inside one total.
- Some larger puzzles print a few numbers in white cells to start you off;
  they are part of the answer.

Good places to start: a black cell with only one or two white neighbours
gives their values almost at once — a total of 2 around two cells means
both are 1. Very small and very large totals pin down the extremes. Once a
row or column has all but one number, the last one follows.

## Purpose

Number placement with arithmetic on the side. It practises the Latin-square
habit of scanning rows and columns, and adding up small groups of numbers
in your head to rule candidates in or out.

## History

Latin Sums (German *Lateinische Summen*, Japanese *Kakkuru*) is one of the
many Latin-square variants in the Japanese pencil-puzzle tradition. It is
best known in the West from Otto Janko's online collection, which holds
hundreds of them, from 4×4 grids with two numbers per line up to large
boards.

## This implementation

- **Spec knobs:** `size` (4–9; 0 picks from the difficulty — 5, 6, 7, 8, 8
  from Kids to Expert), `blacks` per row and column (1–3; 0 picks 2, or 3
  from 7×7 up; at most `size − 2`), `difficulty`, `cell` (18–90 pt),
  `line` (0.2–4 pt). Out-of-range numbers are clamped and the requested
  value is reported in the metadata.
- **Generation:** answer first. The black cells are laid as `k` disjoint
  random permutations (so every line has exactly `k`), and a black cell
  with no white neighbour is refused. The white cells are filled by a
  randomised backtracking search — a filling always exists, because the
  white cells form a regular bipartite graph between rows and columns and
  such a graph's edges can always be coloured with as many colours as its
  degree. Every black cell then shows its sum. A board is kept when the
  technique ladder finishes it unaided; up to four fillings are tried per
  layout and up to sixty layouts, stopping at the requested band (or,
  after twenty layouts, at the nearest band found). Some shapes — one black
  cell per line, or two on the largest boards — are almost never unique by
  their sums alone; then a few digits are printed in white cells (each
  cell the ladder left open, chosen at random, until it finishes; then
  thinned while it still does), and the count is in the metadata
  (`givens`). The default shapes never need them.
- **Solving:** the shared constraint engine — an all-different over the
  white cells of each row and column (each holds every value, so hidden
  singles and pairs are sound) and a repeats-allowed sum for every black
  cell: with one open neighbour the total minus the rest is that cell
  (naked single); with more, only digits some completion supports survive
  (reading the clue, banded Easy).
- **Guarantees:** deterministic per seed; exactly one filling, proven
  because the sound ladder finishes the board without guessing, confirmed
  by the engine's capped count, and re-proven in tests by an independent
  depth-first count that knows only the rules. Rated by the hardest
  technique the solve needed (`rating_basis: hardest_technique`, with the
  full trace in `techniques`). Because every black cell is always
  numbered, a board's band comes from its layout rather than from removing
  clues; the generator searches layouts for the requested band and labels
  the band it actually reached when it cannot find it. Without boxes the
  pointing and box-line techniques never apply, and X-Wings almost never
  arise, so **Hard and Expert are not reached**: those requests return the
  hardest board found — Medium (hidden and naked pairs), occasionally
  Easy — and say so in `difficulty` beside `requested_difficulty`.

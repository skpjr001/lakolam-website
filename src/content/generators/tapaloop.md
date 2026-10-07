---
title: "Tapa-Like Loop"
blurb: "Tapa-Like Loop — one loop past the clues; each clue lists the loop's stretches through the cells around it"
category: puzzle
version: "1.0.0"
---
One loop, described the Tapa way: each clue lists the stretches of loop that
pass through the cells around it.

## What it is

A square grid with a few clue cells, each holding one to four numbers.
Draw a single closed loop through the centres of the other cells. The loop
never enters a clue cell, and each clue tells you how the loop runs through
the ring of eight cells around it: every number is one visit of the loop to
that ring, and its value is how many ring cells the loop passes through, one
after another, before it leaves again.

## How to play

Draw lines between the centres of neighbouring cells (up, down, left or
right, never diagonally) to make one loop that never crosses, branches or
touches itself. The loop does not have to visit every cell, and it never
goes through a cell with a clue.

- Look at the eight cells around a clue (sideways and corner to corner).
  Each number in the clue is one stretch of the loop through those cells:
  the number of those cells the loop visits in a row before it leaves them.
- A clue with several numbers means that many separate stretches. Their
  order does not matter.
- A 0 means the loop stays out of all eight cells around it.

Good places to start: a 0 clears a whole ring; a big number like 5 or 6
must run along most of a ring; a clue at the edge or corner of the grid has
fewer cells around it to work with. Every loop cell has exactly two loop
neighbours, so a cell with only one way in can never be on the loop.

## Purpose

A loop puzzle that borrows the clues of Tapa, so solvers who know Tapa
start with a familiar way of reading the numbers and then discover how
differently they behave on a line. It trains careful counting around a
cell, keeping several possibilities in mind for each clue, and the classic
loop habits: no dead ends, no early closing, one connected piece.

## History

Tapa-Like Loop was devised by the Turkish puzzle author Serkan Yürekli, the
inventor of Tapa itself, and became a regular on the Grandmaster Puzzles
blog from the early 2010s, where dozens of his examples appeared. It is
also playable on the puzz.link online collection. Unlike Tapa, there is no
rule about 2×2 blocks: the single loop takes the place of Tapa's wall.

## This implementation

- **Spec knobs:** `size` (5–10; 0 picks from the difficulty — 5, 6, 7, 7, 8
  from Kids to Expert), `difficulty`, `cell` (18–90 pt), `line` (0.2–4 pt).
  Out-of-range numbers are clamped and the value asked for is reported in
  meta (`requested_size`, `requested_cell`, `requested_line`).
- **Generation:** a random simple loop is grown as the outline of a shape of
  unit squares on the lattice of cell centres (preferring no full 2×2
  blocks of loop cells). A loop is kept only if clueing every cell it skips
  would settle it. Clues are then added on skipped cells — each the best of
  a sample of 10 at leaving the fewest variables unsettled — until the
  deduction ladder settles everything at the band's rung, and removed in
  random order while it still does.
- **Solving:** a ladder on yes/no variables — one per edge between cells,
  one per cell (on the loop or not). *Local*: a loop cell has two loop
  edges, any other none; clue cells are off the loop; each clue is a table
  of every pattern of visited ring cells and used ring links that shows its
  numbers, narrowed against the state (a variable on which every surviving
  pattern agrees is settled). *Loop*: no early closing, the possible cells
  hang together, narrow passages are crossed twice or not at all. *Trial*:
  assume a value, keep the opposite on a contradiction.
- **Guarantees:** deterministic per seed; exactly one loop, proven because
  the sound ladder settles every variable (`uniqueness_proof`), confirmed
  by a capped exhaustive count when cheap (`count_confirmed`), and
  re-proven in tests by an independent search over the edges alone that
  recomputes every clue from the rules. Rated by the hardest rung needed
  with size as the tie-break (local: Kids at 5×5, else Easy; loop: Easy up
  to 6×6, else Medium; trial: Hard up to 7×7, else Expert). Every band is
  reached at its default size; with a custom `size` the label states the
  band actually reached (Kids from 6×6 up is Easy, Medium at 5×5 and 6×6
  is Easy, Expert at 5–7 is Hard and Hard from 8×8 up is Expert), and
  `requested_difficulty` records the request.

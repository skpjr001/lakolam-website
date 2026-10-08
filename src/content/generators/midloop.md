---
title: "Mid-loop"
blurb: "Mid-loop — one loop over every dot, each dot at the exact middle of a straight stretch"
category: puzzle
version: "1.0.0"
---
One loop through the grid, and every dot sits at the exact middle of a
straight stretch of it.

## What it is

A square grid with a scattering of black dots — some in the middle of a
cell, some on the line between two cells. The task is to draw one closed
loop that passes over every dot, where each dot marks the precise middle of
the straight piece of loop it lies on.

## How to play

Draw one closed loop through the centres of cells, moving up, down, left or
right between neighbouring cells. The loop never crosses or touches itself
and does not have to visit every cell.

- The loop passes over every dot.
- A stretch is a straight piece of the loop from one turn to the next. Each
  dot lies exactly halfway along its stretch.
- A dot in a cell: the loop runs straight through that cell, and goes the
  same distance before turning on both sides of it.
- A dot on the line between two cells: the loop crosses that line, and goes
  the same distance straight on beyond each of the two cells — possibly
  none, turning in both cells at once.

Good places to start: a dot in a cell next to the edge of the grid must be
crossed parallel to the edge; a dot on a line between two cells at the
border can only be passed by turning in both cells. Count the room on each
side of a dot — the shorter side limits how far the stretch can reach.

## Purpose

Mid-loop is a gentle introduction to loop puzzles: every clue speaks about
distance and symmetry, so the reasoning is about measuring and balancing
rather than about numbers. It trains spatial planning, counting along lines
and the habit of checking a loop for early closure.

## History

Mid-loop is one of the genres on Nikoli's current list of puzzles, the
Japanese publisher behind Sudoku and Slitherlink, and appears in pzprjs and
other puzzle collections. Its dots echo the pearls of Masyu, but instead of
saying how the loop turns they say where its straight pieces are centred.

## This implementation

- **Spec knobs:** `size` (5–10; 0 picks from the difficulty — 5, 6, 7, 7, 8
  from Kids to Expert), `difficulty`, `cell` (18–90 pt), `line`
  (0.2–4 pt). Out-of-range numbers are clamped and the value asked for is
  reported in meta (`requested_size`, `requested_cell`, `requested_line`).
- **Generation:** a random simple loop is grown as the outline of a shape of
  unit squares on the lattice of cell centres. Each straight stretch of it
  has exactly one middle — a cell when the stretch has an even number of
  steps, the border between the two middle cells when odd — so those
  middles are the candidate dots. Dots are added one at a time, each the
  best of a sample at leaving the fewest variables unsettled by the
  deduction ladder, until the ladder settles every edge; then dots are
  removed in random order while it still does.
- **Solving:** a ladder on yes/no variables, one per edge between cells
  plus a "visited" flag per cell. *Local*: every cell has two loop edges or
  none, and each dot's exact table of ways to sit — its axis (for a cell
  dot), its arm length on both sides and the edge that stops each arm —
  keeps only the ways the settled edges allow and settles every edge they
  agree on. *Loop*: the loop may not close early, the possible cells must
  hang together, and across a bridge the loop lives on one side. *Trial*:
  assume an edge, follow the consequences, keep the opposite on a
  contradiction.
- **Guarantees:** deterministic per seed; exactly one loop, proven because
  the sound ladder settles every edge (`uniqueness_proof`), confirmed by a
  capped exhaustive count when cheap (`count_confirmed`), and re-proven in
  tests by an independent count over the edges whose feasibility test
  measures each dot's arms directly. Rated by the hardest rung needed with
  size as the tie-break (local: Kids up to 5×5, else Easy; loop: Easy up to
  6×6, else Medium; trial: Hard up to 7×7, else Expert). Every band is
  reached at its default size. With a custom `size` the label states the
  band actually reached and `requested_difficulty` records the request:
  Kids from 6×6 is Easy and from 7×7 Medium (the local rung alone does not
  settle boards that large), Easy from 7×7 is Medium, Medium up to 6×6 is
  Easy, Expert up to 7×7 is Hard and Hard from 8×8 is Expert.

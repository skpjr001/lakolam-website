---
title: "Kuromasu (Kurodoko)"
blurb: "Black out cells so every number counts the white cells its own cell can see"
category: puzzle
version: "1.1.0"
---
Black out cells so every number counts exactly the white cells its own cell
can see.

## What it is

A grid, some cells carrying numbers. Cells may be blacked out — but never a
numbered cell, never two blacks side by side, and the white cells must remain
one connected area. Each number equals the count of white cells visible from
its cell along the four directions (itself included), with sight stopped by
black cells and the board edge.

## How to play

Numbers equal to their maximum possible view mean *no black anywhere in
sight* — mark those lines safe. Small numbers demand nearby blacks: a "2" in
open space needs its view walled to one neighbour. Every black you place must
keep its neighbours white (no two blacks touch), which chains: black here
means white there, which extends some number's view, which may force another
black. Connectivity arbitrates the endgame: a cell whose blacking would cut
the white area in two must be white.

On the biggest boards, harder pages ask for one more step: when nothing else
moves, suppose a cell black (or white) and follow the consequences. If that
breaks a rule — a number that can no longer be met, two blacks touching, the
white area cut in two — the cell is the other colour.

## Purpose

A sight-line puzzle to sit beside akari: both are about beams, but where
akari places lights, kuromasu carves the room. In the workspace it is the
crate that proved **clue sparsity can be a useless difficulty signal** — its
minimal boards all keep nearly the same number of clues, so it rates by
measured search effort instead.

## History

Nikoli, 1991, under the name **Kurodoko** ("where are the black cells").
Kuromasu ("black squares") is the name that travelled west.

## This implementation

- **Spec knobs:** `rows`, `cols` (4–20), `black_share`, `difficulty`.
- **Sizes:** up to 11×11 a board is proved by the counting search below;
  a board with either side 12–20 (up to 20×20) is proved by a deduction
  ladder instead (see *Large boards*).
- **Generation:** answer first — blacks are placed greedily (legality checked
  per placement, so the pass cannot get stuck), a number is read off every
  white cell, then numbers are thinned while the board keeps exactly one
  answer — and that answer is verified to be the constructed one.
- **Guarantees:** `count_answers(2) == 1`; the search is cross-checked
  against brute force over every black/white pattern of three small boards
  under five clue sets each.
- **Difficulty:** search nodes per cell (`rating_basis:
  search_nodes_per_cell`), reported alongside the band. Measured before
  banding: ten 7×7 boards all kept 9 clues and 9 blacks, while proof effort
  spread 49–379 nodes — an 8:1 range where clue count did not move at all.
- **Served band:** if the requested band is not reached the nearest band
  found is returned and labelled (`requested_difficulty` in meta).
- **Version 1.0.1 — the served-band note is spelled `requested_difficulty`:**
  a band missed was recorded as `difficulty_requested`, a spelling no other
  generator uses. Meta only: every page and answer key is byte-identical to
  1.0.0.
- **Large boards (v1.1, sides 12–20):** the counting search tops out at 128
  cells, so past 11 a side the proof is a ladder of sound deductions on
  448-bit masks that must settle **every** cell — a board it cannot finish
  is rejected, never shipped on a budget. Rungs, easiest first: *sight* (a
  black's neighbours are white; a number that can see exactly its count
  sees all of it; a number already met is closed by blacks), *reach* (an arm
  must see what the other three cannot supply), *cut* (a cell whose blacking
  splits the not-black area is white; a piece cut off from all white is
  black) and *trial* (suppose a cell either colour, run the first three
  rungs, keep the colour that does not break a rule). Every white cell is
  numbered, then numbers are removed while the ladder — capped at the
  band's hardest rung — still settles the board, which must be the
  constructed one. Rated by the hardest rung the full solve used
  (`rating_basis: hardest_rung`, `hardest_rung` in meta): sight → Easy,
  reach/cut → Medium, trial → Hard. Kids is served as Easy and Expert as
  Hard on large boards (with `requested_difficulty`). Tests: the ladder's
  every deduction checked against brute force on small boards under random
  clue sets; 12×12 boards of each band re-proved unique by an independent
  depth-first search. Timing (test-release): 20×20 Easy/Medium ≈ 0.1 s,
  15×15 Hard ≈ 0.3–1 s, 20×20 Hard ≈ 3–10 s.
- **Version 1.1.0:** sides above 11 were clamped to 11 and now give the
  bigger board, so those specs' output changed; every spec with both sides
  ≤ 11 is byte-identical to 1.0.1.

---
title: "Kuromasu (Kurodoko)"
blurb: "Black out cells so every number counts the white cells its own cell can see"
category: puzzle
version: "1.0.0"
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
black. Connectivity arbitrates the endgame.

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

- **Spec knobs:** `rows`, `cols`, `black_share`, `difficulty`.
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

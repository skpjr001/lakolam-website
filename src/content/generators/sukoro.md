---
title: "Sukoro"
blurb: "Sukoro — each digit counts its filled neighbours; equal digits never touch"
category: puzzle
version: "1.0.0"
---
Place digits so that each one counts its own neighbours — and never sits
beside its twin.

## What it is

A square grid in which some cells will hold a digit from 1 to 4 and the rest
stay empty. Each digit equals the number of cells beside it (up, down, left,
right) that also hold digits. Some digits are given, and a cell with a dot is
known to be empty. There is exactly one solution.

## How to play

- Write digits 1 to 4 in some of the cells; leave the others empty.
- Each digit tells how many of its four side neighbours contain digits.
- Two equal digits may never touch side by side.
- All the digit cells form one group, connected side to side.
- Cells with a dot stay empty.

Start from the extremes. A 4 fills all four of its neighbours; a 1 in a
corner with one obvious partner empties everything else around it. A digit
that already has its full count of filled neighbours empties the rest, and a
digit with exactly as many possible neighbours as its value fills them all.
Remember the group must stay in one piece: a cell that is the only bridge
between two parts must be filled.

## Purpose

A small, quick number-placement puzzle whose rule is self-referential: the
digits describe the shape they make. It complements the shading genres
(`nurikabe`, `norinori`) and the counting genres (`fillapix`, `minesweeper`)
with something in between, and the Kids and Easy sizes make a gentle
introduction to connectivity reasoning.

## History

Sukoro is a genre from Nikoli, the Japanese puzzle publisher behind
sudoku's rise, and has appeared in its magazine *Puzzle Communication
Nikoli* and in puzzle collections elsewhere.

## This implementation

- **Spec knobs:** `size` (5–10; 0 picks from the difficulty: Kids 5, Easy 6,
  Medium 7, Hard 8, Expert 9), `difficulty`, `dots` (allow dot givens),
  `cell`, `line`.
- **Generation:** a random connected shape covering 40–55% of the grid is
  grown, then reshaped by local search — toggling border cells, keeping the
  shape connected — until no two touching cells have the same neighbour count.
  Its digits are read off. Every digit and every empty cell (as a dot) start
  as givens; dots are removed first, then digits, each kept only when the
  ladder needs it at the requested ceiling.
- **Solving:** a ladder of three sound rungs over per-cell candidate sets
  {empty, 1, 2, 3, 4}: **Count** (a digit lies between its surely-filled and
  possibly-filled neighbours; a digit whose count is met empties the rest, one
  that needs all its possible neighbours fills them; equal digits are struck
  from beside a placed one), **Connect** (cells no filled cell can reach are
  empty; a cell whose removal would split the filled cells is filled), and
  **Trial** (assume one candidate in one cell; strike it if Count and Connect
  reach a contradiction).
- **Guarantees:** deterministic per seed. The answer obeys every rule
  (checked against the definition). Uniqueness is proven by the ladder
  settling every cell through sound inference, and re-checked by an
  independent exhaustive count (branching with counting only, connectivity
  checked at the leaves, cap 2; a count that exhausts its node budget counts
  as ambiguous). Rated by the hardest rung needed and the size
  (`rating_basis: hardest_technique_and_size`): Count is Kids on 5×5 and Easy
  above; Connect is Medium; Trial is Hard up to 8×8 and Expert above. A
  request whose band the chosen size cannot reach ships the nearest band
  found, with `requested_difficulty` recorded.
  Where the band cannot exist at that size (Hard above 8×8, Kids above
  5×5), the search stops as soon as it holds a board in the nearest
  reachable band — the board it would have returned anyway, so the output
  is unchanged; Hard at 10×10 dropped from 10–25 s to a few seconds.

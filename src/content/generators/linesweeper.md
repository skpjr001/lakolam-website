---
title: "Linesweeper"
blurb: "Linesweeper — one loop past the numbers; each number counts the loop cells around it"
category: puzzle
version: "1.0.0"
---
One loop, counted like a minesweeper board: every number says how much of
the loop runs around it.

## What it is

A square grid with a few numbers in it. Draw a single closed loop through
the centres of the empty cells. The loop never enters a numbered cell, and
each number tells you how many of the eight cells around it — sideways and
corner to corner — the loop passes through.

## How to play

Draw lines between the centres of neighbouring cells (up, down, left or
right — never diagonally) to make one loop that never crosses or touches
itself. The loop does not have to visit every empty cell, and it never
visits a cell with a number.

- A number counts the cells around it, including the four diagonal ones,
  that the loop passes through.
- A 0 keeps the loop out of all eight cells around it.
- An 8 means the loop runs through every cell around it.

Good places to start: a 0 clears a whole ring of cells; a high number next
to the edge or another number must use nearly every cell it can see. A cell
the loop passes through always has exactly two loop neighbours, so a
dead-end cell (with only one open neighbour) can never be on the loop.

## Purpose

A loop puzzle with a minesweeper twist that anyone who has played the
computer game picks up at once. It practises counting around a cell and
the classic loop habits — no dead ends, no early closing — and rewards
reasoning about how the loop must hang together as one piece.

## History

Linesweeper was published by the British puzzle author Jak Marshall in
2010 and spread through online puzzle collections and championship rounds;
it was used at the World Puzzle Championship in 2019. The same idea had
appeared much earlier in Japan as *Happō Rinku* ("eight-way link") in
Nikoli's Puzzle Communication magazine in 1996 — a case of two inventors
reaching the same rules independently.

## This implementation

- **Spec knobs:** `size` (5–10; 0 picks from the difficulty — 5, 6, 7, 7, 8
  from Kids to Expert), `difficulty`, `cell` (18–90 pt), `line` (0.2–4 pt).
  Out-of-range numbers are clamped.
- **Generation:** a random simple loop is grown as the outline of a shape
  of unit squares on the lattice of cell centres. Each growth step weighs
  every square that keeps the outline one loop and prefers ones that add no
  2×2 block of loop cells (numbers only reveal *which* cells the loop
  visits, so a loop that could be re-routed through the same cells could
  never be pinned down) and that lengthen it, with some noise. A loop is
  kept only if numbering every cell it skips would settle it. Numbers are
  then added on skipped cells — each the best of a sample of 12 at leaving
  the fewest variables unsettled — until the deduction ladder settles
  everything at the band's rung, and removed in random order while it
  still does. When the requested rung yields no board, fresh attempts run
  at the rungs above and the band actually reached is printed.
- **Solving:** a ladder on yes/no variables — one per edge between cells,
  one per cell (on the loop or not). *Local*: a cell on the loop has two
  loop edges, any other none; numbered cells are off the loop; each number
  counts its eight neighbours. *Loop*: no loop may close before it holds
  every loop cell, the possible cells must hang together, and across a
  narrow passage the loop lives wholly on one side. *Trial*: assume a
  value, propagate, keep the opposite on a contradiction.
- **Guarantees:** deterministic per seed; exactly one loop, proven because
  the sound ladder settles every variable (meta `uniqueness_proof`), with a
  capped exhaustive count confirming it when cheap (`count_confirmed`), and
  re-proven in tests by an independent search over the edges alone that
  knows only the rules. Rated by the hardest rung needed with size as the
  tie-break (local: Kids at 5×5, else Easy; loop: Easy up to 6×6, else
  Medium; trial: Hard up to 7×7, else Expert). Every band is reached at its
  default size; with a custom `size` the label states the band actually
  reached (Kids from 6×6 up is Easy; Medium at 5×5 and 6×6 is Easy; Expert
  at 5–7 is Hard and Hard from 8×8 up is Expert).

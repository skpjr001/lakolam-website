---
title: "Geradeweg"
blurb: "Geradeweg — one loop through every number; each number is the length of the straight lines through its cell"
category: puzzle
version: "1.0.0"
---
One loop through every circled number — each number is how long the straight
lines through it are.

## What it is

A square grid with a few circled numbers. Draw a single closed loop through
the centres of the cells. It does not have to visit every cell, but it must
pass through every number, and each number tells you the length of the
straight line the loop draws through that cell.

## How to play

Draw lines between the centres of neighbouring cells, across or down, to
make one closed loop. The loop never crosses itself or visits a cell twice,
and it may leave cells empty.

Every circled number must be on the loop. The number says how many steps
long the straight line through that cell is, counting from the corner where
the line starts to the corner where it ends (one step joins two neighbouring
cells). If the loop turns at a numbered cell, both straight lines that meet
there must be that long.

Good places to start: a big number near the edge of the grid, which has
little room to fit its line; a 1, whose line must turn again right after
one step; and two numbers in one row or column, which may or may not share
a line. Remember that the loop must close up into one piece.

## Purpose

A loop puzzle about measuring. Every number is a ruler: the solver keeps
asking "how far can this line run before it must turn?", which trains
counting and spatial planning as much as route finding.

## History

Geradeweg ("straight way" in German) is a loop genre published on Angela
and Otto Janko's puzzle site janko.at, among their many loop puzzles with
cell clues. It is close in spirit to Nikoli's Masyu and to Balance Loop,
where clues also talk about the straight stretches of the loop.

## This implementation

- **Spec knobs:** `size` (5–10; 0 picks from the difficulty — 5, 6, 7, 7, 8
  from Kids to Expert), `difficulty`, `cell` (18–90 pt), `line` (0.2–4 pt).
- **Generation:** a random simple loop is grown as the outline of a tree of
  unit squares on the lattice of cell centres, leaving a quarter to two
  fifths of the cells off the loop. Every cell that can carry a number is
  numbered — straight cells, and turns whose two lines are equally long —
  and numbers are removed in random order while the ladder still settles
  every edge at the band's rung.
- **Solving:** a ladder on yes/no variables (one per edge between cells, one
  per cell) — *local* (a visited cell has two loop edges, a skipped one
  none; each number lists every way its lines can lie — one run across,
  one run down, or one of each meeting at a turn — and keeps what all the
  ways the board still allows agree on), *loop* (no loop may close before
  it holds every visited cell; the possible cells must hang together;
  across a narrow passage the loop lives wholly on one side), and *trial*
  (assume a value, propagate, keep the opposite on a contradiction).
- **Guarantees:** deterministic per seed; exactly one loop, proven because
  the sound ladder settles every variable, confirmed by a capped exhaustive
  count, and re-proven in tests by an independent path search that walks
  loops from a numbered cell, checking each finished line against its
  numbers. Rated by the hardest rung needed with size as the tie-break
  (local: Kids at 5×5, else Easy; loop: Easy up to 6×6, else Medium; trial:
  Hard up to 7×7, else Expert). Every band is reached at its default size;
  with a custom `size` some bands cannot exist (Kids above 5×5, Medium at
  5–6, Hard from 8×8, Expert below 8×8, and the local rung rarely settles
  a board from 7×7 up), and the board served is the nearest band reached,
  labelled as the band it is.

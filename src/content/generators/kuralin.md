---
title: "Kuralin"
blurb: "Kuralin — one loop, every other cell black; circles compare the black and white cells they touch"
category: puzzle
version: "1.0.0"
---
Draw one loop and blacken everything it misses — the circles on the grid
lines tell you which side wins.

## What it is

A square grid with circles sitting on its lines: some where four cells
meet, some on the line between two cells. Draw a single closed loop through
the centres of some of the cells; every cell the loop does not visit is
black. Each circle compares the black and white cells it touches.

## How to play

- Draw one closed loop through the centres of cells. It moves up, down,
  left or right between neighbouring cells, never crosses or touches
  itself, and never visits a cell twice.
- Every cell the loop does not pass through is black. Every cell it does
  pass through is white.
- A circle touches the cells it sits on: the four cells around a grid
  point, or the two cells either side of a grid line.
- A black circle touches more black cells than white ones. A white circle
  touches more white cells than black ones. A grey circle touches as many
  black cells as white ones.

Good places to start: a black circle on a line between two cells makes
both cells black, a white one makes both white, and a grey one makes one
of each. A black circle on a grid point has at least three black cells
around it, a white one at most one. A white cell in a corner, or one with
only two white neighbours, shows exactly how the loop passes through it.

## Purpose

A gentle loop puzzle in which the shading does half the work: every
circle is a small balance to settle, and the loop then has to thread every
white cell exactly once. It practises the core loop habits (every loop
cell has two loop neighbours, no dead ends, no small loops closing early)
alongside simple counting.

## History

Kuralin is a recent genre from Nikoli, the Japanese publisher behind
Sudoku and Slitherlink, and appears on its current list of puzzles. It
joins two Nikoli staples — a single loop, and shading every cell the loop
leaves out — with a new kind of clue: circles placed on the grid lines
rather than in the cells.

## This implementation

- **Spec knobs:** `size` (5–10; 0 picks from the difficulty — 5, 6, 7, 7,
  8 from Kids to Expert), `difficulty`, `cell` (18–90 pt), `line`
  (0.2–4 pt). Out-of-range numbers are clamped and the requested value is
  reported in the metadata.
- **Generation:** a random simple loop is grown as the outline of a shape
  of unit squares on the lattice of cell centres (covering about 55–70% of
  the board, preferring growth that adds no 2×2 block of loop cells); the
  cells it skips are black. A circle is placed on every interior grid point
  and every interior grid line, coloured from that answer, and circles are
  then removed in random order, each removal kept only while the deduction
  ladder still settles the whole board at the band's rung. When the
  requested rung yields no board, fresh attempts run at the rungs above and
  the band actually reached is printed.
- **Rule reading:** "touch" means the cells the circle overlaps — the
  four around a grid point, the two beside a grid line — as the puzz.link
  checker counts them. Circles are only placed on interior points and
  lines.
- **Solving:** a ladder on yes/no variables — one per edge between cells
  and one "on the loop" flag per cell (off the loop = black). *Local*: a
  loop cell has two loop edges, a black cell none; each circle's colour
  holds over its cells. *Loop*: no loop may close before it holds every
  loop cell, the possible cells must hang together, and across a narrow
  passage the loop lives wholly on one side. *Trial*: assume a value,
  propagate, keep the opposite on a contradiction.
- **Guarantees:** deterministic per seed; exactly one answer, proven
  because the sound ladder settles every variable (meta
  `uniqueness_proof`), with a capped exhaustive count confirming it when
  cheap (`count_confirmed`), and re-proven in tests by an independent
  search over the loop's edges alone that knows only the rules. Rated by
  the hardest rung needed with size as the tie-break (local: Kids at 5×5,
  else Easy; loop: Easy up to 6×6, else Medium; trial: Hard up to 7×7,
  else Expert). Every band is reached at its default size; with a custom
  `size` the label states the band actually reached (Kids from 6×6 up is
  Easy; Medium at 5×5 and 6×6 is Easy; Expert below 8×8 is Hard and Hard
  from 8×8 up is Expert).

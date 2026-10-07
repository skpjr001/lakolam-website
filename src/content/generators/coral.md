---
title: "Coral"
blurb: "Coral — shade one connected coral from run lengths given in any order; no 2×2 block, no enclosed lagoon"
category: puzzle
version: "1.0.0"
---
A nonogram that has forgotten its order: the numbers say how long the
shaded runs are, but not which comes first.

## What it is

A square grid with numbers beside the rows and above the columns. Shade
cells to grow one branching coral: all the shaded cells join up, never in a
solid 2×2 block, and the coral never closes around a lagoon — every white
cell has a way out to the edge. Each line's numbers are the lengths of its
shaded runs, listed smallest first, in no particular order along the line.

## How to play

Shade some cells so that:

- the numbers beside a row (or above a column) are the lengths of the
  blocks of shaded cells in that line, in any order — blocks are separated
  by at least one white cell; a 0 means the line has no shaded cell;
- a line with no numbers may hold anything;
- all the shaded cells form one group, joined through cells that share a
  side;
- no 2×2 square is entirely shaded;
- every white cell can reach the edge of the grid through white cells that
  share a side.

Work line by line as in a nonogram, remembering the blocks can come in any
order: a long block in a short line still overlaps itself in the middle.
Then use the shape rules — a white cell walled in on all sides would be a
lagoon, so one of its walls must open, and two shaded groups must find a
way to join.

## Purpose

Nonogram line logic with the order removed, so the solver leans on the
shape rules — one connected coral, no thick blocks, no enclosed water — to
decide which block goes where.

## History

Coral is a modern pencil-puzzle genre seen in World Puzzle Federation Grand
Prix rounds and on puzz.link. It sits between the nonogram (run clues) and
Nurikabe-style shading (one connected wall, no 2×2, white cells open to the
outside).

## This implementation

- **Spec knobs:** `size` (5–10; 0 picks from the difficulty — 5, 6, 7, 8, 10
  from Kids to Expert), `difficulty`, `cell`, `line`.
- **Generation:** a random coral is grown by the ladder itself with every
  line blank: cells are visited in seeded order and given a seeded colour,
  and the no-2×2, connectivity and open-to-the-edge rules propagate; a
  colour that contradicts takes the other. Every line's run lengths are
  written, then whole line clues are erased in seeded order — first while
  the rung below the ceiling still settles every cell, then while the
  ceiling does.
- **Solving:** shaded/white cells on a ladder of three rungs — *line runs*
  (a dynamic programme over each line's cells and the set of its runs
  already placed gives every cell's possible colours; no 2×2 block shaded),
  *connectivity* (the coral stays one piece and every white cell keeps a
  way out to the edge, both by cut cells in one depth-first search) and
  *trial* (assume a cell, propagate the lower rungs, keep the opposite on a
  contradiction).
- **Guarantees:** deterministic per seed; exactly one shading, proven
  because the sound ladder settles every cell, confirmed by a capped
  exhaustive count when it fits its budget (meta `count_confirmed`), and
  re-proven in tests by an independent search whose line check is a plain
  recursive matcher written apart from the solver's programme. Rated by the
  hardest rung needed: line runs alone are Kids up to 5×5 and Easy above;
  connectivity is Medium; trial is Hard up to 8×8 and Expert above. Every
  band is reached at its default size; a band a chosen size cannot reach is
  served as the nearest band that size reaches, and labelled as such.

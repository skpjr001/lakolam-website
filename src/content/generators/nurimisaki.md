---
title: "Nurimisaki"
blurb: "Nurimisaki — shade cells so the white paths connect and every dead end is a circled cape"
category: puzzle
version: "1.0.0"
---
Shade the sea around a winding white coast — every circle is a cape at the
end of a path.

## What it is

A square grid with some circles, a few of them numbered. Shading cells leaves
a network of white paths. The circles are the capes: the dead ends of those
paths. A number in a circle says how far its cape reaches in a straight line.

## How to play

Shade cells so that:

- all the white cells are connected through cells that share a side;
- no 2×2 square is entirely shaded, and no 2×2 square is entirely white;
- every circle is white and has exactly one white neighbour — it is the end
  of a path;
- every cell without a circle that stays white has at least two white
  neighbours — only circles are dead ends;
- a number in a circle counts the white cells in the straight line that
  leaves the circle through its one white neighbour, the circle included,
  up to the first shaded cell or the edge.

A circle in a corner or on an edge has few neighbours, so most of them are
shaded at once. Three cells of a 2×2 square in one colour force the fourth
into the other colour. A plain white cell with only one possible white
neighbour left must be shaded instead. Keep the white paths in one piece.

## Purpose

A shading puzzle about shape rather than area: you build a branching path
network whose every tip is marked. It mixes the 2×2 rules of Nurikabe-style
puzzles with path reasoning.

## History

Nurimisaki — roughly "painted capes" — is a recent genre from the Japanese
publisher Nikoli, published in Puzzle Communication Nikoli since the late
2010s.

## This implementation

- **Spec knobs:** `size` (5–10; 0 picks from the difficulty — 5, 6, 7, 8, 10
  from Kids to Expert), `difficulty`, `cell`, `line`.
- **Generation:** a white area grows cell by cell from one start, never closing
  a 2×2 white block, each step breaking up a remaining 2×2 shaded block where
  it can and preferring cells that touch the area on one side only (so it
  branches into capes), until no 2×2 shaded block is left. Every dead end is
  circled. If the ladder cannot settle the board even with every circle
  numbered, the layout is reshaped by local search — single cells flipped,
  keeping the layout valid, accepting moves that do not increase the cells
  left unsettled. Numbers are then erased one at a time, in seeded order,
  while the ladder still settles every cell at the requested rung.
- **Solving:** a ladder of three rungs on shaded/white cells — *local* (a
  circle has exactly one white neighbour; a numbered circle's run fits in some
  direction, directions that cannot fit are shaded and a single fitting
  direction is settled whole; a plain white cell has two white neighbours;
  no single-colour 2×2 block), *connectivity* (cells the white area cannot
  reach are shaded, a cell whose loss would split it is white — cut cells
  found by one depth-first search), and *trial* (assume a cell, propagate the
  lower rungs, keep the opposite on a contradiction).
- **Guarantees:** deterministic per seed; circles are exactly the dead ends of
  the answer; exactly one shading, proven because the sound ladder settles
  every cell, confirmed by a capped exhaustive count, and re-proven in tests
  by an independent search that knows only the rules as a feasibility test.
  Rated by the hardest rung needed (Kids/Easy: local, by size; Medium:
  connectivity; Hard: trial; Expert: trial on 9×9 and larger). Every band is
  reached at its default size. When a requested band is not reached in 24
  attempts — for instance Kids or Easy on a large board, where the first rung
  alone cannot settle every cell — the ladder is raised one rung at a time and
  the nearest band found is returned and labelled as such.

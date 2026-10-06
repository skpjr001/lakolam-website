---
title: "Cave"
blurb: "Cave — shade walls from the edge so the numbers count the connected cave cells they see"
category: puzzle
version: "1.0.0"
---
Shade the walls so one winding cave remains — every number counts the cave
cells it can see.

## What it is

A square grid with some numbers. Shading some cells turns them into rock; the
cells left white are the cave. The cave must be a single connected space, and
the rock must all be joined to the outside of the grid — no lump of rock may
float sealed inside the cave. Each number sits in the cave and tells how much
of it can be seen from there.

## How to play

Shade cells so that:

- every white cell is connected to every other white cell through cells that
  share a side — the cave is in one piece;
- every group of shaded cells touches the edge of the grid;
- every numbered cell stays white, and its number equals the white cells it
  sees in a straight line up, down, left and right, counting itself, with
  each line stopping at the first shaded cell or the edge.

Start with the large numbers: a number that needs to see far forces long
white runs. A small number in the open means shading close to it. Every time
you shade a cell, check the cave can still join up, and that the new rock can
still reach the edge — rock trapped in the middle is never allowed, and a
white cell that would split the cave in two is never shaded.

## Purpose

A spatial counting puzzle: arithmetic on lines of sight combined with the
global feel of a single connected region. It rewards looking at the whole
board and suits solvers who enjoy Nurikabe or Kurodoko.

## History

Cave is the shading form of a Nikoli genre known as Bag or Corral, first
published in the 1990s, where a single loop encloses all the numbers. The
two are the same puzzle: the inside of the loop is the cave, the outside is
the rock. It is a regular genre at World Puzzle Federation championships.

## This implementation

- **Spec knobs:** `size` (5–10; 0 picks from the difficulty — 5, 6, 7, 8, 10
  from Kids to Expert), `difficulty`, `cell`, `line`.
- **Generation:** rock grows inward from the edge one cell at a time, each new
  cell touching the edge or older rock and never splitting the cave, until
  40–48 % of the grid is shaded; open 2×2 cave blocks are broken up first and
  2×2 rock blocks avoided, so the cave forms corridors and chambers. Numbers
  are added where the ladder leaves the most cells unsettled, then erased one
  at a time, in seeded order, while the ladder still settles every cell at
  the requested rung.
- **Solving:** a ladder of three rungs on shaded/white cells — *sight* (each
  number's count lies between the sure white run and the not-yet-shaded run
  in its four directions; every cell of its row and column is probed against
  both bounds), *connectivity* (cells the cave cannot reach are rock, a cell
  whose loss would split the cave is cave, rock that cannot reach the edge is
  impossible, and a cell whose whitening would seal rock in is rock — cut
  cells found by one depth-first search), and *trial* (assume a cell,
  propagate the lower rungs, keep the opposite on a contradiction).
- **Guarantees:** deterministic per seed; exactly one shading, proven because
  the sound ladder settles every cell, confirmed by a capped exhaustive count,
  and re-proven in tests by an independent search that knows only the rules as
  a feasibility test. Rated by the hardest rung needed (Kids/Easy: sight, by
  size; Medium: connectivity; Hard: trial; Expert: trial on 9×9 and larger).
  Every band is reached at its default size. When a requested band is not
  reached in 24 attempts — for instance Kids or Easy on a large board, where
  the first rung alone cannot settle every cell — the ladder is raised one
  rung at a time and the nearest band found is returned and labelled as such.

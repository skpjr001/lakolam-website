---
title: "Kurotto"
blurb: "Kurotto — shade cells so each circled number totals the shaded groups touching it"
category: puzzle
version: "1.0.0"
---
Shade cells so every circled number adds up the dark groups touching it.

## What it is

A square grid with numbers in circles. Shading cells makes dark groups —
cells joined to each other through shared sides. Each circle looks at the
dark groups that touch it along a side and adds up how many cells they hold,
counting every cell of a group, however far the group runs. That total is
the number in the circle.

## How to play

Shade cells so that:

- every circled cell stays white;
- the number in each circle equals the total number of shaded cells in all
  the shaded groups that touch the circle along a side. A group that touches
  the circle on two sides is still counted only once;
- a circle with 0 has no shaded cell beside it.

There is no other rule: shaded groups do not have to join up, and neither do
the white cells.

Start with the zeros: every cell beside a 0 is white. A small number with
only one free neighbour tells you where its group starts. When a group
already holds as many cells as a circle beside it asks for, every free cell
touching that group, and every free cell beside the circle, must stay white.
Watch for a cell that would join two groups at once — shading it can make a
total too large.

## Purpose

A counting puzzle about groups rather than lines: each circle sums whole
shapes, so one shaded cell can change several totals at once. It trains
careful bookkeeping and the habit of asking what a single cell would join.

## History

Kurotto ("black dot" in Japanese) was introduced by the puzzle publisher
Nikoli in 2012 and has appeared in its magazines and puzzle collections
since. It belongs to the family of shading puzzles alongside Nurikabe and
Kurodoko, but unlike them it has no rule that the white or the shaded cells
must connect.

## This implementation

- **Spec knobs:** `size` (5–10; 0 picks from the difficulty — 5, 6, 7, 8, 10
  from Kids to Expert), `difficulty`, `cell`, `line`.
- **Generation:** each cell is shaded with probability 0.36–0.44, then any
  group larger than 2 + size/2 is broken up by clearing cells, so the totals
  stay readable sums. Circles are added on white cells where the one-circle
  rung leaves the most cells unsettled nearby, until that rung settles the
  whole grid, then erased one at a time, in seeded order, while the ladder
  still settles every cell at the requested rung.
- **Solving:** a ladder of two rungs on shaded/white cells. *Circle bounds*:
  for each circle, the shaded groups already joined to it are a lower bound
  and every cell they could still grow through (not white, reachable from
  the circle) an upper bound; a cell whose shading would push the joined
  total past the number is white, and a cell whose whitening would cut the
  reachable area below the number is shaded. The second move uses cut
  vertices with the sizes they separate, found in one depth-first search; a
  test checks the rule against plain probing of both bounds. *Trial*: assume
  a cell, propagate every circle, keep the opposite on a contradiction.
- **Guarantees:** deterministic per seed; exactly one shading, proven because
  the sound ladder settles every cell, also confirmed by the engine's capped
  exhaustive count when that fits its budget (`count_confirmed` in the
  metadata), and re-proven in tests by an independent search that knows only the rules
  as a feasibility test. Every circle is checked against a fresh flood-fill
  count. Rated by the hardest rung needed, with size as the tie-break
  (circle bounds: Kids at 5×5, Easy at 6×6, Medium from 7×7; trial: Hard up
  to 8×8, Expert from 9×9). Every band is reached at its default size. A
  band the chosen size cannot reach — Kids on a 10×10, say — is served at
  the nearest band found and labelled as such (`requested_difficulty` in the
  metadata). The search stops at the first board as near as any board of
  that size can be, which is the board that would have been served anyway
  (Hard above 8×8 used to try every attempt first — tens of seconds at
  10×10 — for the same board).

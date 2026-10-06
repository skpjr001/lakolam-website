---
title: "Castle Wall"
blurb: "Castle Wall — one loop past the walls: white inside, black outside, arrows total the loop"
category: puzzle
version: "1.0.0"
---
One loop around the castle: white walls inside it, black walls outside, and
arrows that measure the road.

## What it is

A grid with some walled cells, each shaded black or white, most carrying a
number and an arrow. Draw a single closed loop through the centres of the
other cells. The loop never enters a wall. Every white wall must end up
inside the loop and every black wall outside it, and a number with an arrow
tells you how long the loop runs in that direction, in that row or column,
from the wall to the edge of the grid.

## How to play

Draw lines between the centres of neighbouring cells to make one loop that
never crosses or touches itself. The loop does not have to visit every
cell, but it may never pass through a walled cell.

- A white wall lies inside the loop; a black wall lies outside it.
- A number with an arrow is the total length of the loop's straight
  stretches that run in the arrow's direction, counted along the row or
  column from the wall to the edge. A 0 means the loop never runs that way
  there (it may still cross it). Each step from one cell centre to the next
  counts 1.

Good places to start: a 0 pointing along a row stops any sideways stretch
there; a big number pointing at a short stretch of cells fills it almost
completely. Inside and outside are powerful too: crossing the loop flips
you from one to the other, so between a white wall and the edge of the grid
the loop must cross an odd number of times, and between a black wall and
the edge an even number.

## Purpose

A loop puzzle that adds a sense of place: the loop is a castle wall drawn
around the white towers and away from the black ones. It trains two kinds
of thinking at once — counting along lines and keeping track of inside
and outside — and the arrows make every clue a little ruler.

## History

Castle Wall was invented by the American puzzle designer Palmer Mebane in
2009, and quickly spread through puzzle blogs, championship rounds and
online collections. It belongs to the family of loop puzzles that Nikoli's
Slitherlink and Masyu made popular, with an inside-and-outside rule all of
its own.

## This implementation

- **Spec knobs:** `size` (5–10; 0 picks from the difficulty — 5, 6, 7, 7, 8
  from Kids to Expert), `difficulty`, `cell`, `line`.
- **Generation:** a random simple loop is grown as the outline of a shape
  of unit squares on the lattice of cell centres. Most growth steps
  lengthen the loop; about one in three fills the shape in instead, so some
  skipped cells end up inside the loop and can become white walls. Walls
  are then added on skipped cells — a plain wall, or one with an arrow in
  any direction with room for the loop — each the best of a sample of 16 at
  leaving the fewest variables unsettled, until the deduction ladder
  settles everything (at the band's rung, or the loop rung for the trial
  bands). Walls are then removed in random order while the ladder, at the
  band's rung, still settles everything. When the requested rung yields no
  board at all, fresh attempts run at the rungs above and the band actually
  reached is printed; when a custom size cannot reach the requested band
  at all, generation stops at the nearest band it can reach.
- **Solving:** a ladder on yes/no variables — one per edge between cells,
  one per cell (on the loop or not), one per unit square of the lattice of
  cell centres (inside the loop or not). *Local*: a cell on the loop has
  two loop edges, any other none; walls are off the loop; arrow totals; an
  edge is on the loop exactly when the two squares beside it lie on
  different sides (the outside of the grid counting as outside); and a
  wall's colour fixes the side of the squares around it. *Loop*: no loop
  may close before it holds every cell on the loop, the possible cells must
  hang together, and across a narrow passage the loop lives wholly on one
  side. *Trial*: assume a value, propagate, keep the opposite on a
  contradiction.
- **Guarantees:** deterministic per seed; exactly one loop, proven because
  the sound ladder settles every variable, confirmed by a capped exhaustive
  count, and re-proven in tests by an independent search over the edges
  alone that decides each wall's side by casting a ray against the loop.
  White walls never sit on the border. Rated by the hardest rung needed
  with size as the tie-break (local: Kids at 5×5, else Easy; loop: Easy up
  to 6×6, else Medium; trial: Hard up to 7×7, else Expert). Every band is
  reached at its default size; with a custom `size` the label always
  states the band actually reached (Kids from 6×6 up is Easy; Medium at
  5×5 and 6×6 is Easy; Hard from 8×8 up is Expert).

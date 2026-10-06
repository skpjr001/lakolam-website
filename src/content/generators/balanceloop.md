---
title: "Balance Loop"
blurb: "Balance Loop — one loop through every circle: equal straight stretches at white, unequal at black"
category: puzzle
version: "1.0.0"
---
One loop through every circle — white circles balance it, black circles
tip it.

## What it is

A grid with some white and black circles, a few holding a number. Draw a
single closed loop through the centres of cells that passes through every
circle. From each circle the loop leaves in two directions, and each way it
runs straight for a while before its first turn. At a white circle those
two straight stretches are the same length; at a black circle they are
different lengths. A number in a circle is the two lengths added together.

## How to play

Draw lines between the centres of neighbouring cells to make one loop that
never crosses or touches itself. It must pass through every circle, and it
may pass through empty cells too. Measure a stretch in steps from one cell
centre to the next: from the circle, count until the line turns a corner.
If the loop goes straight through a circle, measure each side from the
circle.

- White circle: the two stretches are equal.
- Black circle: the two stretches differ.
- Number: the two stretches add up to it.

Good places to start: a circle near the edge or in a corner, where the
loop has few ways to leave. A white circle with a number is generous: each
stretch is exactly half of it. A black 3 must run one step one way and two
the other. Remember the loop is one piece and may not close early.

## Purpose

A loop puzzle about measuring: every circle is a little see-saw, and the
numbers turn route-finding into arithmetic. It rewards planning in straight
lines and reasoning about what lengths still fit between a circle and the
walls.

## History

Balance Loop was popularised by GMPuzzles (Grandmaster Puzzles), the puzzle
site founded by Thomas Snyder, and has appeared in World Puzzle Federation
Grand Prix rounds. It is one of the many modern variations on the circle
clues of Nikoli's Masyu.

## This implementation

- **Spec knobs:** `size` (5–9; 0 picks from the difficulty — 5, 6, 7, 7, 8
  from Kids to Expert), `difficulty`, `cell`, `line`.
- **Generation:** a random simple loop is grown as the outline of a shape
  of unit squares on the lattice of cell centres (mostly lengthening it,
  sometimes filling in, so straight stretches vary). Circles are added on
  loop cells, numbered or not, each the best of a sample of 16 at leaving
  the fewest variables unsettled at the loop rung, until the ladder settles
  everything at the band's rung. Circles are then removed in random order,
  and numbers from the circles that stay, while it still does. When the
  requested rung yields no board at all (large custom sizes on the easy
  bands), fresh attempts run at the rungs above and the band actually
  reached is printed.
- **Solving:** a ladder on yes/no variables (one per edge between cells,
  one per cell). *Local*: a cell on the loop has two loop edges, any other
  none; circles are on the loop; and each circle's stretches — an exact
  rule that enumerates every pair of directions and lengths the circle
  accepts, keeps those the settled edges allow, and settles every edge
  they agree on. *Loop*: no loop may close before it holds every cell on
  the loop, the possible cells must hang together, and across a narrow
  passage the loop lives wholly on one side. *Trial*: assume a value,
  propagate, keep the opposite on a contradiction.
- **Guarantees:** deterministic per seed; exactly one loop, proven because
  the sound ladder settles every variable, confirmed by a capped exhaustive
  count, and re-proven in tests by an independent search over the edges
  whose rules measure stretches on the loop itself. Rated by the hardest
  rung needed with size as the tie-break (local: Kids at 5×5, else Easy;
  loop: Easy up to 6×6, else Medium; trial: Hard up to 7×7, else Expert).
  Every band is reached at its default size; with a custom `size` the
  label always states the band actually reached. The loop rung is weak for
  this genre on big boards (detours through empty cells need trial to rule
  out), so from 7×7 up Kids and Easy come out Medium, and at 8×8 and 9×9
  the easy bands come out Medium or, when the loop rung finds nothing,
  Expert. Sizes stop at 9×9: trial-rung boards beyond that took seconds.

---
title: "Sashigane"
blurb: "Sashigane — divide the grid into L shapes, circles at their corners and arrows at their arm ends"
category: puzzle
version: "1.1.0"
---
Cut the grid into L shapes — circles mark the corners, arrows the ends.

## What it is

A grid with a few circles and arrows in it. The whole grid divides into L
shapes: each one cell wide, with two arms at a right angle, each arm at
least one cell long beyond the corner. A circle sits on the corner of its
L, and a number in a circle is the L's size in cells. An arrow sits at the
end of an arm and points along the arm toward the corner. There is exactly
one way to divide the grid.

## How to play

Draw lines along the grid to divide every cell into L shapes. The rules:

- every region is an L, one cell wide, with both arms at least one cell
  long beyond the corner (the smallest L has three cells);
- a circle is the corner of its L; a number in a circle tells how many
  cells the whole L has;
- an arrow is at the very end of an arm and points toward that arm's
  corner;
- not every L has a circle or an arrow.

Corners of the grid are good places to start: the cell in a corner must be
either the corner of an L or the end of an arm. A cell boxed in on three
sides can only be an arm end. Follow arrows - the corner is somewhere along
the arrow's line, and the arm cannot stop before it.

## Purpose

A region-dividing puzzle with a single shape in many sizes. It trains
looking along rows and columns, and seeing how one long arm changes what
fits beside it.

## History

Sashigane ("carpenter's square") is a Nikoli genre, published in the
Japanese puzzle magazine Puzzle Communication Nikoli and in its books of
puzzles.

## This implementation

- **Spec knobs:** `rows`, `cols` (4–11; 0 picks from the difficulty — 5×5,
  6×6, 7×7, 8×8, 9×9 from Kids to Expert), `max_arm` (the longest arm the
  answer's Ls may have, 1–10, default 4; the solver still considers every
  length), `difficulty`, `cell`, `line`.
- **Generation:** a random tiling by Ls — a backtracking cover at the first
  open cell, placements shuffled, any pocket of fewer than three cells cut
  off at once. Every L starts with a numbered circle on its corner and
  arrows at both ends, which pins it alone. Clue parts — an arrow, a
  circle's number, then (last, as the genre's signature clue) a bare
  circle — are removed in a seeded order while the deduction ladder, capped
  at the requested rung, still divides the whole grid (for Expert, while an
  exhaustive count with a 20,000-node budget still finds one division).
- **Solving:** the candidates are every L on the board (any corner, any two
  arm lengths) whose clues all agree: a circle only at its corner, with the
  right size if numbered; an arrow only at an arm end pointing at the
  corner. *Forced* (Easy): a cell only one candidate can still cover takes
  it. *Look one step* (Medium): a candidate is struck if placing it would
  leave some open cell with no candidate at all. *Pairs* (Hard): where a
  cell has two candidates left, each is tried and struck if the lower rungs
  then reach a contradiction. Grids the ladder cannot finish are proven by
  search alone (Expert).
- **Guarantees:** deterministic per seed; exactly one division, proven by an
  exact-cover search (branching on the cell with the fewest candidates)
  that counts to a cap of 2 and treats an exhausted node budget as
  ambiguous. Every piece is re-read as an L from its bounding box, and
  tests recount (on boards up to 7×7) with an independent search that
  builds Ls from bounding boxes and corners. Rated by the hardest rung
  needed (forced: Kids for grids of 30 cells or fewer, else Easy;
  look-one-step Medium; pairs Hard; search-only Expert). If a band is not
  reached in sixteen attempts the nearest band found is returned and
  labelled (`requested_difficulty` in meta).
- **Arm cap fallback (v1.1):** arms of one cell make every L a three-cell
  piece, which cannot tile a grid whose area is not a multiple of three
  (5×5, 7×7, 8×8…). Only when all sixteen attempts find nothing does the
  generator lengthen the cap one step at a time, from fresh seeds, and serve
  the nearest band found at the shortest cap that works; such a grid says so
  in meta (`longest_arm`, `requested_max_arm`). Every grid that generated
  before is unchanged.

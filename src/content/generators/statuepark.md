---
title: "Statue Park"
blurb: "Statue Park — place every shape once, none touching, black circles covered and the open ground joined"
category: puzzle
version: "1.1.0"
---
Set every statue in the park — no two touching, and the paths all joined.

## What it is

A square grid, a few black and white circles, and a set of shapes printed
below it: the twelve pentominoes, the five tetrominoes, or a mixed set. Every
shape must be placed in the grid exactly once, and there is exactly one way
to do it.

## How to play

Place each shape from the set into the grid once, along the grid lines. You
may turn shapes and flip them over. The rules:

- shapes may not overlap, and may not touch along an edge (touching at a
  corner is fine);
- every black circle lies under a shape, and every white circle stays empty;
- all the empty cells must be joined together, side by side, into one open
  park — no empty cell or patch may be walled off.

Start where the shapes have least room: a black circle hemmed in by white
circles can only be covered a few ways, and a long shape like the I has few
places to go. Once a shape is down, shade it and mark the cells beside it as
empty — no other shape can use them. Keep an eye on the empty cells: a
placement that would seal off a pocket of empty cells is wrong. Cross each
shape off the list as you place it.

## Purpose

A placement puzzle that rewards seeing shapes: turning and flipping
pentominoes in the mind's eye, and reasoning about what space a shape
leaves behind. The connected-park rule turns it from a packing problem into
a logic puzzle, and the circles make every board different.

## History

Statue Park was invented by Palmer Mebane, who published the first puzzles
in 2011. It quickly spread through puzzle-hunt and competition circles, where
the pentomino set is the classic choice; variants use tetrominoes, larger
polyominoes or a custom set of shapes.

## This implementation

- **Spec knobs:** `set` (`auto` — tetrominoes for Kids, pentominoes
  otherwise — `pentominoes`, `tetrominoes`, or `custom`, a seeded mix of six
  to eight different tri-, tetr- and pentominoes), `size` (board side 6–16;
  0 sizes it from the set: 7×7 for tetrominoes, 12×12 for pentominoes),
  `difficulty`, `cell`, `line`.
- **Generation:** the answer is packed first — cells in reading order, each
  either the top-left cell of a shape still to place or left empty, never
  letting shapes touch or the empty cells split. Placing shapes anywhere at
  random never fitted the twelve pentominoes on 11×11; packing from a corner
  fits them on 12×12 four times in five. Every cell then starts as a circle
  (black under a shape, white elsewhere) and circles are removed in a seeded
  order while the deduction ladder, capped at the requested rung, still
  places every shape.
- **Solving:** a ladder over placements. *Forced* (Easy): a shape with one
  place left goes there; a black circle only one placement covers gets it;
  a black circle only one shape can reach confines that shape. *Look one
  step* (Medium): cells a shape covers wherever it goes are its own, so
  nothing else may touch them; and a placement is struck out if it would at
  once leave another shape nowhere to go, a black circle uncoverable, or the
  empty cells beside the shapes unable to join. *Trial* (Hard): for a shape
  with at most four places left, each is tried, and struck out if the lower
  rungs then hit a contradiction. Boards the ladder cannot finish are proven
  by search alone (Expert).
- **Guarantees:** deterministic per seed; exactly one placement, proven by
  an exhaustive placement search (bitboards over 256-bit masks; branching on
  the shape or black circle with fewest options; pruned by no-touching,
  circle cover and empty-cell connectivity) that counts to a cap of 2 and
  treats an exhausted node budget as ambiguous. Tests re-check every answer
  rule by rule and recount it. Rated by the hardest rung needed: forced is
  Kids for sets of at most five shapes and Easy otherwise, look-one-step
  Medium, trial Hard, search-only Expert. If a band is not reached in ten
  attempts the nearest band found is returned and labelled as such
  (`difficulty_requested` in meta).
- **Version 1.1 — every size generates:** a side too small to hold the
  set's shapes apart (twelve pentominoes below 12×12, the five tetrominoes
  at 6×6, a large custom mix on a small board) used to fail outright. Only
  that failure path changed: when all ten original attempts produce nothing,
  the park grows a side at a time (up to 16), ten fresh attempts per side,
  until a board is packed and proven exactly as before; the grid size in
  meta is the size served. Every board that generated before is
  byte-identical. Expert pentomino parks (12×12, whether asked for or grown
  to) remain the slow case, typically 10–30 s: the search-only thinning
  counts every circle it removes.


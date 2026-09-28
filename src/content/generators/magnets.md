---
title: "Magnets"
blurb: "Magnets: fill domino slots with magnets or blanks so the edge counts hold and like poles never touch"
category: puzzle
version: "1.0.0"
---
Fill the domino slots with magnets and blanks so that every row and column
holds the right number of plus and minus poles, and like poles never touch.

## What it is

A grid divided into outlined dominoes. Each domino is either a magnet, with
one `+` half and one `-` half, or blank. The numbers along the top and left
edges (beside the `+` sign) count the `+` cells in that column or row; the
numbers along the bottom and right edges (beside the `-` sign) count the `-`
cells. Some numbers may be missing, and those lines can hold any count.

## How to play

Mark each domino as a magnet (deciding which end is `+`) or as blank. Two
cells with the same sign may never sit side by side or one above the other,
although they may touch at a corner. Start where a count is 0 — no pole of
that sign in the line — or where a count needs every cell that could still
hold that sign. Remember that a magnet lying along a row puts one `+` and one
`-` into it, while a standing magnet puts only one pole into each row it
crosses. Every time you place a pole, its neighbours lose the chance to hold
the same sign. When the counts stall, try a domino one way and see whether a
line runs out of room.

## Purpose

A counting puzzle with a pairing twist: the cells are not independent, since
every magnet brings its opposite pole along. Row and column arithmetic, the
domino layout and the no-touching rule have to be read together, which makes
it a good step up from the pure counting of `thermometers` or `battleships`.

## History

A classic pencil puzzle, published by Conceptis and others as Magnets and by
Janko as Magnete; Simon Tatham's portable puzzle collection carries it as
Magnets.

## This implementation

- **Spec knobs:** `width` and `height` (4–12; 0 picks a size from the
  difficulty — 4x4 for Kids, 6x6 for Easy and Medium, 8x8 for Hard, 10x10 for
  Expert; an odd area gets one more column so dominoes can tile it),
  `difficulty`, `cell`, `line`.
- **Generation:** a random domino tiling, then a random filling — about a
  quarter of the slots left blank, every magnet oriented so no like poles
  touch — and all the counts read off it. If the solver cannot settle the
  board from the full counts, one of the slots it is stuck on is changed and
  the counts re-read. Counts are then removed one at a time, in random order,
  while the solver still settles the board at the requested difficulty (Kids
  boards keep every count).
- **Solving:** each slot keeps a set of three possible states (blank, `+`
  first, `-` first). A technique ladder strikes states: *basic* (the
  no-touching rule, and a line whose count is already met or needs every
  possible cell), *line* (the achievable pairs of `+`/`-` counts, slot by
  slot, so a magnet lying along a line counts both its poles there), and
  *trial* (assume a state, run the cheaper techniques, strike it on a
  contradiction).
- **Guarantees:** deterministic per seed; exactly one solution, since every
  deduction is sound and the ladder settles every slot — confirmed by an
  independent backtracking count over the slots (a count that runs out of
  budget is treated as not unique). Rated by the hardest technique needed and
  the board size: Kids and Easy need at most line reasoning, Medium is a 6x6
  that needs trial, Hard an 8x8 and Expert a 10x10 that need trial.

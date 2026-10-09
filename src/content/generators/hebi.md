---
title: "Hebi-Ichigo"
blurb: "Hebi-Ichigo — place 1-2-3-4-5 snakes that never touch, seen by arrow clues; no snake may look at another"
category: puzzle
version: "1.0.0"
---
Hide five-cell snakes in the grid — the arrows tell you what they see, and
no snake may stare at another.

## What it is

A square grid with some black cells, each holding an arrow and a number.
Place snakes in the white cells: every snake is five cells long, numbered
1 (its head) to 5 (its tail). The arrows report the first snake number
they see, and the snakes must keep out of each other's way.

## How to play

- Write snakes into white cells. A snake is five cells joined side by side
  in a chain, numbered 1, 2, 3, 4, 5 from head to tail. You decide how
  many snakes there are.
- Two different snakes never touch along a side. They may touch at a
  corner.
- A number in a black cell looks in the direction of its arrow, past empty
  white cells, up to the next black cell or the edge of the grid. The
  first snake cell it meets carries that number. A 0 means it meets no
  snake cell at all.
- A snake looks straight ahead from its head: in the direction from its 2
  to its 1, up to the next black cell or the edge. It must not see any
  part of another snake.
- Black cells are never part of a snake.

Good places to start: a 0 empties every cell up to the next black cell.
An arrow pointing at a number 1 must meet a head, and the 2 next to it
then points the head away from that arrow. Around a finished snake every
neighbouring cell stays empty.

## Purpose

A placement puzzle with a playful theme: the snakes' shapes are free, but
every clue looks along a line, so each one rules out whole rows of
possibilities. It practises line-of-sight reasoning and keeping several
constraints in mind at once.

## History

Hebi-Ichigo (Nikoli now calls it simply Hebi, "snake"; "ichi-go" is
"one-five") is a Nikoli genre,
first published in Puzzle Communication Nikoli and still on the
publisher's current list. Otto Janko's collection carries more than two
hundred of them.

## This implementation

- **Spec knobs:** `size` (5–9; 0 picks from the difficulty — 5, 6, 7, 8, 9
  from Kids to Expert), `difficulty`, `cell` (18–90 pt), `line` (0.2–4
  pt). Out-of-range numbers are clamped and the requested value is reported
  in the metadata.
- **Rule reading:** Nikoli's rules, with the sight details of the
  puzz.link checker: arrows and eyes look past empty white cells and stop
  at black cells and the edge; a snake may see its own body; every snake
  has exactly five cells; every black cell carries an arrow.
- **Generation:** random non-touching snakes are planted over about a
  third of the board, and a black cell is put between any head and the
  snake it would see. An exhaustive placement search then looks for a
  second answer; while one exists, a new arrow clue is added on an empty
  cell where the second answer would show a different number (or would
  need a snake), and the values of all arrows are recomputed. Finally
  clues are removed in random order while the answer stays valid and the
  only one.
- **Solving:** the proving search visits cells in reading order: each
  undecided cell is either empty or the first cell of a snake (any
  five-cell chain, either way round); a placed snake empties its
  neighbours; every arrow and every head is checked against what is
  decided after each step, and 0 arrows empty their line up front. The
  count stops at two answers and gives up after a node budget (ambiguous,
  never unique).
- **Guarantees:** deterministic per seed; exactly one answer, proven by
  the capped exhaustive count (meta `uniqueness_proof`), and re-proven in
  tests by an independent search that writes a number 0–5 into every cell
  and checks only the rules. Rated by grid size (`rating_basis:
  grid_size`: 5×5 Kids, 6×6 Easy, 7×7 Medium, 8×8 Hard, 9×9 Expert); the
  search effort is recorded as `search_nodes`. With a custom `size` the
  size decides the band and the request is recorded as
  `requested_difficulty`.

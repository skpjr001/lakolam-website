---
title: "Dotchi-Loop"
blurb: "Dotchi-Loop — one loop through every white circle, straight at all of a room's circles or turning at all of them"
category: puzzle
version: "1.0.0"
---
One loop through every white circle — and in each room, the circles must
agree: all straight, or all turning.

## What it is

A square grid divided by bold lines into rooms. Some cells hold a white
circle, some a black one. The task is to draw a single closed loop through
the centres of cells that passes through every white circle and avoids every
black one. The twist is the room rule: inside each room, the loop either
goes straight through all of the room's white circles, or turns at all of
them. The name is Japanese for "which one?" — every room asks it.

## How to play

Draw lines between the centres of neighbouring cells (up, down, left or
right, never diagonally) to make one loop that never crosses, branches or
touches itself.

- The loop passes through every white circle.
- The loop never enters a cell with a black circle.
- Look at each room on its own: either the loop goes straight through every
  white circle in that room, or it turns (makes a right angle) in every
  white circle in that room. You have to work out which.
- Cells without a circle may be used or left empty, as the loop needs.

Good places to start: a white circle on the edge of the grid, or next to a
black circle, often cannot go straight one way — and once one circle in a
room is settled, every other circle in that room must do the same. A
white circle in a corner must turn, so its whole room turns.

## Purpose

Dotchi-Loop mixes the line-drawing logic of Masyu with a new kind of
reasoning: a decision made in one corner of a room travels instantly to
every circle in it. Solvers learn to look for the circle that settles its
room, and to carry that choice across the room's border-walls. It trains
spatial reasoning and the habit of asking "what if?" about a whole group at
once.

## History

Dotchi-Loop ("Dotchi Rūpu") is a Nikoli genre: it appears on Nikoli's list
of current puzzle types and has its own Nikoli puzzle book. It has spread
to the wider puzzle community through Otto Janko's archive and the World
Puzzle Federation's Puzzle Grand Prix, which featured it in 2025.

## This implementation

- **Spec knobs:** `size` (5–10; 0 picks from the difficulty — 5, 6, 7, 7, 8
  from Kids to Expert), `difficulty`, `cell` (18–90 pt), `line`
  (0.2–4 pt). Out-of-range numbers are clamped and the value asked for is
  reported in meta (`requested_size`, `requested_cell`, `requested_line`).
- **Generation:** a random simple loop is grown as the outline of a shape of
  unit squares on the lattice of cell centres. The grid is carved into
  random rooms of about 3–6 cells (rooms with no loop cell are merged into
  a neighbour), and each room is told to go straight or turn as its loop
  cells allow. Every loop cell of the room's kind is circled white and
  every cell off the loop black; circles are then removed in random order
  while the deduction ladder still settles everything at the band's rung,
  always keeping at least one white circle per room.
- **Solving:** a ladder on yes/no variables — one per edge between cells,
  one per cell (on the loop or not), one per room (straight or turning).
  *Local*: a loop cell has two loop edges, any other none; circles are on
  or off the loop; each white circle's shape matches its room's choice.
  *Loop*: no early closing, the possible cells hang together, narrow
  passages are crossed twice or not at all. *Trial*: assume a value, keep
  the opposite on a contradiction.
- **Guarantees:** deterministic per seed; exactly one loop, proven because
  the sound ladder settles every variable (`uniqueness_proof`), confirmed
  by a capped exhaustive count when cheap (`count_confirmed`), and
  re-proven in tests by an independent count over the edges alone that
  checks the rules directly. Rated by the hardest rung needed with size as
  the tie-break (local: Kids at 5×5, else Easy; loop: Easy up to 6×6, else
  Medium; trial: Hard up to 7×7, else Expert). Every band is reached at its
  default size; with a custom `size` the label states the band actually
  reached and `requested_difficulty` records the request: Kids from 6×6 up
  is Easy, Medium at 5×5 and 6×6 is Easy, Expert up to 7×7 is Hard, Hard
  from 8×8 up is Expert, and on 9×9 and 10×10 Kids and Easy sometimes come
  out Medium (the local rung alone rarely settles a big board).

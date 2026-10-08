---
title: "Kuroshiro"
blurb: "Kuroshiro — one loop through every circle: straight between like colours, one turn between unlike"
category: puzzle
version: "1.0.0"
---
One loop through every circle — straight between circles of one colour, a
single turn between circles of two.

## What it is

A square grid with white and black circles in some cells. The task is to
draw one closed loop through all the circles. The colours tell you how the
loop behaves between one circle and the next: like colours are joined by a
straight line, unlike colours by a line with exactly one bend.

## How to play

Draw one closed loop through the centres of cells, moving up, down, left or
right between neighbouring cells. The loop never crosses or touches itself
and does not have to visit every cell.

- The loop passes through every circle.
- Follow the loop from one circle to the next circle along it. If the two
  circles have the same colour, the loop runs straight between them — no
  turns at all.
- If the two circles have different colours, the loop turns exactly once
  between them.
- At a circle itself the loop may go straight or turn; only the turns
  between circles count.

Good places to start: two circles of the same colour next to each other
are usually joined directly. A circle in a corner of the grid must turn
there. And from any circle, the next circle along the loop must be reachable
with at most one bend — so a lonely circle far from all others has very few
ways out.

## Purpose

Kuroshiro mixes the pearl reading of Masyu with path planning: every circle
asks "which circle comes next, and can I reach it straight, or with one
turn?" It trains looking ahead along rows and columns, pairing clues, and
keeping a single loop in mind.

## History

Kuroshiro ("black and white") is a Nikoli genre, also published by Otto
Janko's archive (about 130 puzzles) and playable on puzz.link as Kuroshiro
Loop. It belongs to the family of loop puzzles that grew around Masyu,
where coloured circles describe the shape of the loop.

## This implementation

- **Spec knobs:** `size` (5–10; 0 picks from the difficulty — 5, 6, 7, 7, 8
  from Kids to Expert), `difficulty`, `cell` (18–90 pt), `line`
  (0.2–4 pt). Out-of-range numbers are clamped and the value asked for is
  reported in meta (`requested_size`, `requested_cell`, `requested_line`).
- **Generation:** a random simple loop is grown as the outline of a shape of
  unit squares on the lattice of cell centres and saturated with circles: a
  circle on every loop cell except a set of turn cells (never two in a row,
  an even number) where the colour changes. Such a turn is chosen only when
  the corner cell that would cut across it is on the loop, since otherwise
  no circle could tell the two corners apart. A short local search moves
  pairs of colour changes while the deduction ladder settles no fewer
  edges, until it settles every edge at the band's rung; then circles are
  removed in random order while the loop between the remaining neighbours
  still obeys the colour rule and the ladder still settles it.
- **Solving:** a ladder on yes/no variables, one per edge between cells
  plus a "visited" flag per cell. *Local*: every cell has two loop edges or
  none, every circle is visited, and each circle's table of legs — straight
  to the first circle in a direction when it has the same colour, or
  straight, one turn, and straight to the first circle that way when it has
  the other colour — settles every direction all surviving pairs of legs
  use or leave, and every edge all live legs of a surely-used direction
  agree on. *Loop*: no edge off every circle's live legs, no early closing,
  the possible cells hang together, and across a bridge the loop lives on
  one side. *Trial*: assume an edge, follow the consequences, keep the
  opposite on a contradiction.
- **Guarantees:** deterministic per seed; exactly one loop, proven because
  the sound ladder settles every edge (`uniqueness_proof`), confirmed by a
  capped exhaustive count when cheap (`count_confirmed`), and re-proven in
  tests by an independent count over the edges whose feasibility test
  traces the loop out of every circle and counts its turns. Rated by the
  hardest rung needed with size as the tie-break (local: Kids up to 5×5,
  else Easy; loop: Easy up to 6×6, else Medium; trial: Hard up to 7×7, else
  Expert). Every band is reached at its default size. With a custom `size`
  the label states the band actually reached and `requested_difficulty`
  records the request: Kids at 6×6 is Easy and from 7×7 Medium (the local
  rung alone does not settle boards that large), Easy from 7×7 is Medium,
  Medium up to 6×6 is Easy, Expert up to 7×7 is Hard and Hard from 8×8 is
  Expert.

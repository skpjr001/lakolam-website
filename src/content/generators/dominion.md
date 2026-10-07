---
title: "Dominion"
blurb: "Dominion — shade dominoes that never touch so the letters fall into separate areas, alike letters together"
category: puzzle
version: "1.0.0"
---
Shade dominoes that never touch, so that every letter ends up in its own
area — with all the alike letters together.

## What it is

A square grid with letters in some cells. Shade some of the empty cells in
pairs — dominoes — that never touch each other along an edge (corner to
corner is fine). The shaded dominoes act as walls, cutting the white cells
into separate areas. Every area must hold letters of exactly one kind, and
all the cells with the same letter must be in the same area.

## How to play

1. Shade cells so that each shaded cell has exactly one shaded neighbour
   (up, down, left or right): the shading is made of dominoes, and no two
   dominoes touch along an edge.
2. Cells with letters are never shaded.
3. The white cells form areas (white cells joined side by side). Cells with
   the same letter must all be in one area.
4. Different letters must be in different areas.
5. Every area must contain at least one letter.

Good places to start: two different letters side by side are impossible,
so look for different letters one cell apart — the cell between them must
be shaded, and so must its partner. A white cell that cannot reach any
letter without crossing shading breaks rule 5, so it must be shaded too.

## Purpose

A shading puzzle about walls and territory. It trains seeing how small
pieces (dominoes) join corner to corner into long walls, and reasoning
about which areas must stay connected and which must be cut apart.

## History

Dominion was invented by the Japanese puzzle author Naoki Inaba in 2010. It
appears on Otto Janko's puzzle site (some 250 puzzles), in the puzz.link
collection, and at the World Puzzle Championship in 2016 and 2019.

## This implementation

- **Spec knobs:** `size` (5–10; 0 picks from the difficulty — 5, 6, 7, 7, 8
  from Kids to Expert), `difficulty`, `density` (1–9; 0 picks 6 — how much
  of the grid the dominoes cover, so more walls and smaller areas), `cell`
  (20–90 pt), `line` (0.2–4 pt). Out-of-range numbers are clamped and the
  value asked for is reported in meta (`requested_size`, …).
- **Generation:** dominoes are grown into walls: each new domino touches no
  other along an edge and, when it can, closes a wall (splits an area) or
  at least sits on the border or corner to corner with one already placed.
  Every domino that parts no two areas is then removed (it could never be
  told apart from white cells). The areas are named A, B, C… in reading
  order; one letter goes in each area, more are added (each the best of a
  sample at leaving the fewest cells unsettled) until the deduction ladder
  settles the board, and letters are then removed in random order while it
  still does.
- **Solving:** a ladder on one yes/no variable per cell (shaded). *Local*:
  letters are white; a shaded cell has exactly one shaded neighbour.
  *Areas*: each letter's cells hang together through cells not shaded (a
  cell whose loss would cut them apart is white); settled white groups of
  different letters never meet (a cell touching both is shaded); a cell
  that can reach no letter is shaded. *Trial*: assume, keep the opposite on
  a contradiction.
- **Guarantees:** deterministic per seed; exactly one shading, proven
  because the sound ladder settles every cell (`uniqueness_proof`),
  confirmed by a capped count when cheap (`count_confirmed`), and re-proven
  in tests by an independent count over the rules alone. Rated by the
  hardest rung needed with size as the tie-break. The local rung alone
  never settles a board (a white cell is only ever proved white by area
  reasoning), so the gentle bands go by size: area reasoning is Kids at
  5×5, Easy at 6×6 and Medium from 7×7; trial is Hard up to 7×7 and Expert
  beyond. Every band is reached at its default size; with a custom `size`
  the label states the band actually reached (`requested_difficulty`
  records the request).

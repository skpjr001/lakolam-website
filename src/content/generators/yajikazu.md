---
title: "Yajisan-Kazusan"
blurb: "Yajisan-Kazusan — shade non-touching cells; arrows count the shaded cells they point at, unless shaded themselves"
category: puzzle
version: "1.0.0"
---
Arrows count the shaded cells ahead — unless you shade the arrow itself,
and then it says nothing at all.

## What it is

A square grid with some numbered arrows. Shade some cells so that shaded
cells never touch side by side and the white cells stay in one piece. A
white arrow tells the truth: its number is how many shaded cells lie in its
direction. But arrows may be shaded too, and a shaded arrow no longer
counts — so a clue that cannot be true is a clue you must shade.

## How to play

Shade some cells (numbered cells included, if you like) so that:

- shaded cells never share a side;
- all the white cells form one group, joined through cells that share a
  side;
- every number left white is the count of shaded cells in the direction of
  its arrow, all the way to the edge of the grid;
- a shaded number counts for nothing — it may be right or wrong.

Start with numbers that cannot be true: a 3 pointing at only four cells
cannot be satisfied (three shaded cells never fit in four without two
touching), so it must be shaded. A 0 that stays white makes every cell it
points at white. Cells beside a shaded cell are white, and a cell whose
shading would cut the white area in two must stay white.

## Purpose

A shading puzzle with a twist of logic about truth: every clue is a choice
between "this is right" and "this cell is shaded", and the two rules about
shaded cells decide which.

## History

Yajisan-Kazusan (ヤジさんカズさん, "Mr. Arrow, Mr. Number") first appeared
in Nikoli's Puzzle Communication Nikoli vol. 74. It borrows Hitori's rules
for shaded cells (never touching, white cells connected) and adds arrow
clues that may be false — which is why a shaded clue is allowed to lie.

## This implementation

- **Spec knobs:** `size` (5–10; 0 picks from the difficulty — 5, 6, 7, 8, 9
  from Kids to Expert), `difficulty`, `cell`, `line`.
- **Generation:** cells in seeded order are shaded with a seeded chance
  when no shaded cell shares a side with them and the white cells stay
  connected. Arrow clues are then added, one per cell, wherever the ladder
  leaves the most cells unsettled: true counts on white cells and — on a
  fifth of the rounds — a wrong count on a shaded cell, which only shading
  can silence. Clues are then erased one at a time in seeded order, first
  while the rung below the ceiling still settles every cell, then while the
  ceiling does.
- **Solving:** shaded/white cells on a ladder of three rungs — *clue counts*
  (each clue with its line: either the clue cell is shaded, or its line
  holds exactly that many shaded cells with no two touching; no two shaded
  cells side by side), *connectivity* (cells the white area cannot reach are
  shaded, and a cell whose shading would split the white area is white) and
  *trial* (assume a cell, propagate the lower rungs, keep the opposite on a
  contradiction).
- **Guarantees:** deterministic per seed; exactly one shading, proven
  because the sound ladder settles every cell, confirmed by a capped
  exhaustive count (a count that runs out of budget skips the attempt), and
  re-proven in tests by an independent search that knows only the rules as
  a feasibility test. Rated by the hardest rung needed: clue counts alone
  are Kids up to 5×5 and Easy above; connectivity is Medium; trial is Hard
  up to 8×8 and Expert above. Every band is reached at its default size; a
  band a chosen size cannot reach (Kids above 5×5, Hard at 9×9 and 10×10)
  is served as the nearest band that size reaches, and labelled as such.

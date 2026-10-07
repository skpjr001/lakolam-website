---
title: "Pentopia"
blurb: "Pentopia — hide different pentominoes that never touch; arrows point to the nearest ones"
category: puzzle
version: "1.0.0"
---
Hidden pentominoes and arrows that point the way: each arrow shows where
the nearest shaded cells are.

## What it is

A square grid with arrows in some cells. Shade a few pentominoes — shapes
made of five squares joined side by side — so that the arrows are right.
Each shape may be used only once (turned or flipped versions count as the
same shape), and no two pentominoes may touch, not even at a corner. An
arrow cell shows every direction in which the nearest shaded cell lies.

## How to play

- Shade some pentominoes: groups of five cells joined along their sides.
  You decide how many there are; each of the twelve shapes appears at most
  once, and a shape turned round or flipped over is still the same shape.
- Pentominoes never touch each other, not even diagonally.
- Cells with arrows are never shaded.
- Look from an arrow cell straight up, down, left and right. The arrows
  point in every direction where the closest shaded cell is found; if two
  directions tie for closest, both have arrows. A direction without an
  arrow has its first shaded cell farther away, or none at all.

Good places to start: every cell between an arrow and the edge in a
direction that has no arrow, up to the distance of the nearest shaded cell,
is white. An arrow pointing only one way means all the other directions
are empty at least that far. Remember that a shaded cell always belongs to
a whole pentomino, and the space around a pentomino stays white.

## Purpose

A shading puzzle that combines spatial reasoning with shape recognition:
it practises measuring distances along rows and columns and fitting the
twelve pentominoes into the gaps the arrows leave.

## History

Pentopia was created for puzzle competitions and has become a regular in
them: it has appeared at the World Puzzle Championship several times and
in the World Puzzle Federation's Grand Prix, and Grandmaster Puzzles has
published dozens. It is also on the puzz.link puzzle site.

## This implementation

- **Spec knobs:** `size` (6–10; 0 picks from the difficulty — 6, 6, 7, 8,
  9 from Kids to Expert), `pieces` (pentominoes hidden, 1 to 3, 4, 5, 7, 8
  for sizes 6 to 10; 0 picks about one per 16 cells), `difficulty`, `cell`
  (18–90 pt), `line` (0.2–4 pt). Out-of-range numbers are clamped and the
  requested value is reported in the metadata.
- **Generation:** pentominoes of different shapes are planted at random,
  none touching. Arrow cells are then added on white cells — each the best
  of a sample of sixteen at settling cells the ladder left open — until
  the deduction ladder settles everything at the band's rung, and removed
  in random order while it still does. When the requested rung yields no
  board, fresh attempts run at the rungs above and the band actually
  reached is printed.
- **Solving:** a ladder on yes/no variables — one per cell (shaded) and one
  per placement of each pentomino (placed). *Local*: a placed pentomino
  shades its cells and clears every cell around it; a shaded cell lies in
  exactly one placed pentomino; arrow cells stay white; each arrow keeps
  only the distances that agree with it. *Shapes*: each shape is placed at
  most once. Every board is finished by these two rungs alone — no
  trial-and-error is ever needed.
- **Guarantees:** deterministic per seed; exactly one shading, proven
  because the sound ladder settles every variable (meta
  `uniqueness_proof`), with a capped exhaustive count confirming it when
  cheap (`count_confirmed`), and re-proven in tests by an independent
  search over the cells alone that knows only the rules. Rated by the
  hardest rung needed with size as the tie-break (local: Kids at 6×6, else
  Easy; shapes: Easy at 6×6, Medium at 7×7, Hard at 8×8, Expert from 9×9
  up). With so many placement variables, a one-level trial rung is too slow
  to run while choosing arrows, so the harder bands come from bigger boards
  that need the shape rule rather than from guessing. Every band is reached
  at its default size; with a custom `size` the label states the band
  actually reached.

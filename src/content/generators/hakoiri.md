---
title: "Hakoiri"
blurb: "Hakoiri — one circle, triangle and square per region; like shapes never touch; all shapes join up"
category: puzzle
version: "1.0.0"
---
Put a circle, a triangle and a square in every box — without letting two of
a kind touch.

## What it is

A grid is divided into outlined regions of four to six cells. A few shapes
are already drawn in. Every region must end up holding exactly one circle,
one triangle and one square, with its other cells left empty. The puzzle has
exactly one answer.

## How to play

1. Draw exactly one circle, one triangle and one square in every outlined
   region. The region's other cells stay empty.
2. Two of the same shape may never touch — not side by side, and not even
   corner to corner.
3. All the shapes together must form one connected group, joined through
   the sides of their cells. No group of shapes may be cut off from the
   rest.

Start where a region is small or crowded: a four-cell region has only one
empty cell, and a shape next door rules its twin out of every touching cell.
When you are about to leave a cell empty, check that the shapes on either
side can still reach each other.

## Purpose

A Nikoli logic puzzle that uses pictures instead of digits, so it suits
younger solvers and anyone put off by numbers, while the joined-up rule
gives older solvers a real global deduction to make. It brings a placement
genre with three kinds of piece to the catalogue, between the one-kind
placements of Star Battle and Queens and the full digit grids of Sudoku.

## History

Hakoiri-masashi ("boxed-in" plus a pun on a Japanese idiom about a sheltered
daughter) appeared in Nikoli's *Puzzle Communication Nikoli* in the 2000s
and is played online through the puzz.link family of editors. The rules here
follow the standard statement (as given on Otto Janko's puzzle site): one of
each symbol per region, like symbols never adjacent orthogonally or
diagonally, and all symbols one orthogonally connected area.

## This implementation

- **Spec knobs:** `difficulty`; `rows` and `cols` (4–10, 0 = picked from
  the difficulty: 5×5 Kids up to 9×9 Expert); `cell`; `line`.
- **Generation:** answer first. The grid is cut into connected regions of
  four to six cells (three-cell regions were tried and dropped: each shape
  can cover at most a quarter of the board without touching itself, so
  regions that small usually have no answer at all). A random answer is
  found by an exhaustive search branching on the shapes in a seeded order.
  Shapes are then printed one at a time until the deduction ladder settles
  the whole board, and removed again, one by one, wherever the board still
  settles without them.
- **Solving:** a yes/no propagation engine with three rungs — *region and
  touch* (each region's one-of-each count and the no-touching rule),
  *connectivity* (a cell whose loss would cut the shapes apart must hold
  one; a cell no shape can reach stays empty), and *trial* (assume one cell,
  and strike the assumption when it leads to a contradiction; one level
  deep, never a search).
- **Guarantees:** deterministic per seed. Every board is settled cell by
  cell by sound rules, which proves the answer unique; tests re-prove it
  with an independent capped count (a candidate-set search that shares no
  code with the engine). The rating is the hardest rung the solve needed,
  with the board size: region-and-touch on up to 30 cells is Kids, otherwise
  Easy; connectivity is Medium; trial is Hard up to 64 cells and Expert
  above. Boards whose size cannot reach the requested band (say a 10×10 at
  Kids) are rated honestly at the nearest band they reach, and meta records
  `requested_difficulty`.

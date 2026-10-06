---
title: "Choco Banana"
blurb: "Choco Banana — shade cells so shaded groups are rectangles, white groups are not, and numbers give group sizes"
category: puzzle
version: "1.0.0"
---
Shade cells so every dark group is a neat rectangle and every white group is
not.

## What it is

A square grid with some numbers. Shading cells splits the grid into groups
of dark cells and groups of white cells (cells joined through shared sides).
The two colours play opposite roles: every dark group is a solid rectangle —
a bar of chocolate — while every white group is a bent, irregular shape — a
banana. A number tells you how many cells are in the group it belongs to,
whichever colour that turns out to be.

## How to play

Shade cells so that:

- every group of shaded cells is a rectangle or a square;
- no group of white cells is a rectangle or a square;
- every number equals the number of cells in its group. A numbered cell may
  be shaded or white.

A 1 or a 2 must be shaded: a white group of one or two cells would always be
a rectangle. Three shaded cells and one white cell in a 2 by 2 block are
never allowed, because the shaded group would bend. When a white group could
close up into a rectangle with just one free cell left beside it, that cell
must be white so the group keeps growing. Equal numbers next to each other
are often in the same group.

## Purpose

A shading puzzle with two opposite shape rules at once: tidy rectangles for
one colour, untidy shapes for the other. It trains switching between
"what must this group be?" and "what must it never be?".

## History

Choco Banana is a genre from the Japanese publisher Nikoli, printed in its
puzzle magazine and books. The name recalls the chocolate-dipped bananas
sold at Japanese summer festivals: dark, straight chocolate and pale,
curved banana.

## This implementation

- **Spec knobs:** `size` (5–10; 0 picks from the difficulty — 5, 6, 7, 8, 9
  from Kids to Expert), `difficulty`, `cell`, `line`.
- **Generation:** the answer is drawn by the solver's own rules: cells are
  visited in seeded order and given a seeded colour, propagating the 2×2 and
  white-shape rules after each, and a colour that contradicts takes the
  other; answers whose largest group exceeds a quarter of the grid are
  redrawn. Numbers are added where the ladder leaves the most cells
  unsettled nearby, preferring groups with no number yet, then erased one at
  a time, in seeded order, while the ladder still settles every cell at the
  requested rung.
- **Solving:** a ladder of three rungs on shaded/white cells — *group sizes*
  (a shaded number's group is one of its rectangles, holding no different
  number: cells inside every surviving one are shaded, cells along their
  sides white; a white number needs at least 3 cells, its sure white group
  no larger and its reachable area no smaller than the number, and a colour
  that cannot work is ruled out; no 2×2 block has three shaded cells and a
  white one), *white not rectangle* (a white group that is a rectangle with
  one free cell beside it grows into that cell, and with none it is a
  contradiction), and *trial* (assume a cell, propagate the lower rungs,
  keep the opposite on a contradiction).
- **Guarantees:** deterministic per seed; exactly one shading, proven
  because the sound ladder settles every cell, and also confirmed by the
  engine's capped exhaustive count when that fits its budget
  (`count_confirmed` in the metadata). Tests re-prove uniqueness with an
  independent search that places whole shaded rectangles and knows only the
  rules as a feasibility test, check every group of every answer directly,
  and check on random partial answers that propagation never contradicts a
  true answer. Rated by the hardest rung needed, with size as the tie-break
  (group sizes: Kids at 5×5, Easy above; white shape: Medium; trial: Hard up
  to 8×8, Expert from 9×9). Every band is reached at its default size; a band
  the chosen size cannot reach is served at the nearest band found and
  labelled as such (`requested_difficulty` in the metadata). Expert defaults
  to 9×9 because the independent re-proof grows steeply at 10×10; 10×10 is
  still available through `size`.

---
title: "Patches"
blurb: "Patches - tile the grid with rectangles, each holding one area-and-shape clue"
category: puzzle
version: "1.0.0"
---
Cut the grid into rectangles, each holding one shaded clue cell, so that every
rectangle matches what its clue says about its size and shape.

## What it is

A square grid with a few shaded cells. Each shaded cell is a clue, and the
whole grid must be divided into rectangles so that every rectangle contains
exactly one clue cell, with no gaps and no overlaps. A clue can show a number,
a shape, or both:

- the **number** is how many cells the rectangle covers;
- the **shape** says the rectangle is a **square**, **wide** (wider than it is
  tall) or **tall** (taller than it is wide). The key under the grid shows the
  three shape pictures.

A clue with only a number can be any shape; a clue with only a shape can be any
size.

## How to play

Start with clues that have little room: a number and a shape together, a clue
tucked into a corner, or a clue boxed in by its neighbours. List the rectangles
each clue could make — they must cover the clue, avoid every other clue cell
and match the number and shape shown. Cells that every one of a clue's
rectangles covers are that clue's for certain, so no other rectangle may use
them. A cell that only one clue can still reach belongs to that clue. When that
stalls, test a rectangle: if drawing it would leave another clue with no room,
or leave some cell that nobody can cover, it is wrong. On the hardest boards,
follow a guess a few steps further until it runs into trouble.

## Purpose

A friendlier cousin of shikaku. Shape clues add a second kind of information
that a pure area puzzle lacks, and clues that show only a shape or only a
number make the solver combine the two. It is quick at small sizes, which suits
a daily-puzzle slot, and the answer key doubles as a patchwork picture.

## History

Patches is one of the daily games on LinkedIn, alongside Queens,
Tango and Zip. It descends from Nikoli's **Shikaku** (Maki Kaji's rectangle
puzzle), adding the square, wide and tall shape clues.

## This implementation

- **Spec knobs:** `rows` and `cols` (4-11; 0 picks the size from the
  difficulty: Kids 5x5, Easy 6x6, Medium 7x7, Hard 8x8, Expert 9x9),
  `difficulty`, `cell`, `line`.
- **Generation:** answer first. A random rectangle partition is filled in
  reading order (so any tiling, pinwheels included, can come up); each piece
  gets a clue at a random cell showing both its area and its shape class.
  Ambiguity found by the exhaustive search is repaired by moving a clue onto a
  cell two tilings disagree about. Numbers and shapes are then dropped one at a
  time, in random order, while the inference ladder still finishes the board
  within the band's ceiling; harder bands try several drop orders per
  partition and keep the one needing the hardest technique. A clue always keeps
  at least one part; Kids boards keep every number and at least half the
  shapes.
- **Solving:** candidate rectangles per clue (cover the clue, avoid other clue
  cells, match the printed area and shape), narrowed by a technique ladder:
  *basic* (cells shared by all of a clue's candidates are its own; a cell only
  one clue can reach), *lookahead* (a candidate that would starve another clue
  or strand a cell is struck), *trial* (assume a candidate, run the cheaper
  rungs, strike it on contradiction).
- **Guarantees:** deterministic per seed; exactly one tiling, since every
  deduction is sound and the ladder settles every clue, and confirmed by an
  independent reading-order exhaustive count (budget overrun counts as
  ambiguous). Rated by the hardest technique needed and by size: basic on 5x5
  is Kids, otherwise Easy; lookahead is Medium; trial is Hard, or Expert on 81+
  cells. Every band is reached at its default size; boards generate in well
  under 0.1 s (11x11 Expert up to about 0.5 s).

---
title: "Fill-a-Pix"
blurb: "Fill-a-Pix — shade cells so each clue counts its 3x3 block, revealing a picture"
category: puzzle
version: "1.0.0"
---
Shade the cells so every clue counts the shaded squares around it — and a
picture appears.

## What it is

A grid with numbers scattered across it. Each number says how many cells are
shaded in the 3×3 block centred on it, the clue's own cell included, so the
values run from 0 to 9. Shade exactly the right cells and a picture emerges.

## How to play

Start with the extremes: a 0 blanks its whole block, a 9 shades it, and a
clue on an edge or corner with a full count (a 6 on an edge, a 4 in a corner)
shades everything it sees. From there, a clue whose count is already met
blanks the rest of its block, and a clue that needs every remaining cell
takes them all. When single clues stall, compare two that overlap: the cells
they share can only hold so many shaded squares, which settles the cells just
one of them sees.

## Purpose

The catalogue's first "picture from local counts" puzzle. A `nonogram` reads
whole rows and columns; this reads neighbourhoods, which gives it a different
rhythm and makes it gentle enough for newcomers while the overlap reasoning
keeps it interesting for experts. It is also one of the most-played logic
puzzles in print and apps.

## History

Created by Conceptis as Fill-a-Pix and also known as Mosaic, Nurie-Puzzle or
Japanese Puzzle Quilt; Simon Tatham's collection carries it as Mosaic.

## This implementation

- **Spec knobs:** `width` and `height` (5–30; 0 picks a size from the
  difficulty), `difficulty`, `cell`, `line`.
- **Generation:** a seeded picture is drawn first — random noise smoothed by a
  majority cellular automaton and mirrored left to right, so it reads as a
  shape rather than static. Every cell starts with its clue; clues are then
  removed one at a time while the solver still finishes the board by
  inference at or below the requested difficulty.
- **Solving:** a technique ladder — *basic* (a clue met or a clue needing
  every open cell), *overlap* between neighbouring clues, *reach* (the same
  bound across clues whose blocks barely touch), and *trial* (assume a cell,
  keep the opposite on contradiction).
- **Guarantees:** deterministic per seed; exactly one solution, since every
  deduction is sound and the ladder settles every cell — and confirmed by an
  independent backtracking count in the tests. Rated by the hardest technique
  needed; Expert is reach-level logic on a 25×25 board.

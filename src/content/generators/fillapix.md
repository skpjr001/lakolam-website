---
title: "Mosaic"
blurb: "Mosaic — shade cells so each clue counts its 3x3 block, revealing a picture"
category: puzzle
version: "1.1.0"
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

- **Spec knobs:** `width` and `height` (5–35; 0 picks a size from the
  difficulty — 10, 15, 15, 20, 25 from Kids to Expert), `difficulty`,
  `picture` (`blob`, the default; `sprite`; or a named picture), `cell`,
  `line`.
- **Generation:** a seeded picture is drawn first — random noise smoothed by a
  majority cellular automaton and mirrored left to right, so it reads as a
  shape rather than static. Every cell starts with its clue; clues are then
  removed one at a time while the solver still finishes the board by
  inference at or below the requested difficulty.
- **Pictures (`picture`):** besides the seeded blob, ten pixel pictures
  drawn for this generator — `heart`, `star`, `house`, `tree`, `cat`,
  `fish`, `rocket`, `mushroom`, `boat`, `umbrella` — or `sprite`, which lets
  the seed pick one. The picture is scaled to the board by nearest neighbour
  (aspect kept, centred, symmetric pictures sampled symmetrically) and
  mirrored on every other attempt; the clues are thinned exactly as for a
  blob. A picture whose full clue set the requested rung cannot settle is
  given the next rung up and rated by what it needed — fine detail shrunk
  onto a 10×10 Kids board (cat, house, rocket, mushroom) comes out Medium;
  heart, star, tree, fish, boat and umbrella reach Kids. Expert boards
  (25×25) take 0.4–4 s. Metadata adds `picture` (the picture's name).
- **Version 1.1:** sides up to 35 (requests of 31–35 were clamped to 30;
  those pages change, every other page is byte-identical); 35×35 takes
  1.5–5 s.
- **Solving:** a technique ladder — *basic* (a clue met or a clue needing
  every open cell), *overlap* between neighbouring clues, *reach* (the same
  bound across clues whose blocks barely touch), and *trial* (assume a cell,
  keep the opposite on contradiction).
- **Guarantees:** deterministic per seed; exactly one solution, since every
  deduction is sound and the ladder settles every cell — and confirmed by an
  independent backtracking count in the tests. Rated by the hardest technique
  needed; Expert is reach-level logic on a 25×25 board.

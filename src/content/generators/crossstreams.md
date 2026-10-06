---
title: "Cross the Streams"
blurb: "Cross the Streams — shade one connected wall from run clues with ? and * wildcards"
category: puzzle
version: "1.0.0"
---
Shade one winding, connected wall from row and column clues — some of which
hide their numbers behind ? and *.

## What it is

A square grid with a clue beside every row and above every column. As in a
picture-logic grid, a clue lists the lengths of the shaded runs in that line,
in order, with at least one white cell between runs. But some clues are
blurred: a ? is one run whose length you are not told, and a * stands for
any number of runs — maybe none — of any lengths. The shaded cells together
form a single connected wall.

## How to play

Shade cells so that:

- each row and column matches its clue: the numbers are the lengths of its
  shaded runs from left to right or top to bottom; a ? is exactly one run of
  some length; a * is any number of runs, including none;
- all shaded cells are connected to each other through shared sides;
- no 2 by 2 block of cells is entirely shaded.

Start with the lines whose clues are all numbers and work them as you would
a picture-logic grid. A line with ? items still tells you how many runs it
has. A clue that is just * says nothing on its own — fill those lines from
the crossing lines and from the wall: every shaded cell must connect to the
rest, and a 2 by 2 block is never fully shaded.

## Purpose

A twist on picture-logic grids that removes some of the information and
replaces it with a global rule. It trains careful run-counting together with
the connectivity reasoning of shading puzzles such as Nurikabe.

## History

Cross the Streams was invented by the American puzzle author Grant Fikes,
who published it around 2010; it has since appeared at the World Puzzle
Championship and in puzzle-hunt and contest sets. Its clues come from the
nonogram, the picture-logic puzzle popularised in Japan in the late 1980s,
and its wall from Nikoli's Nurikabe.

## This implementation

- **Spec knobs:** `size` (5–10; 0 picks from the difficulty — 5, 6, 7, 8, 10
  from Kids to Expert), `difficulty`, `cell`, `line`.
- **Generation:** the wall is drawn by the solver's own rules with every
  clue a `*`: cells are visited in seeded order and given a seeded colour,
  propagating the 2×2 and connectivity rules after each, and a colour that
  contradicts takes the other; walls covering under two fifths of the grid
  are redrawn. The exact run lists are written, then blurred in a seeded
  order of moves — a number becomes `?`, an item becomes `*` (merged with a
  `*` beside it), or a whole clue becomes `*` — keeping each move only while
  the ladder still settles every cell at the requested rung.
- **Solving:** a ladder of three rungs on shaded/white cells — *line
  placements* (the nonogram line programme generalised to the wildcards:
  states are "cells so far, clue items so far"; a `?` takes a run of any
  length, a `*` takes runs of any length and may be skipped; a backward pass
  marks states that can finish, a forward pass states a valid prefix
  reaches, and a cell every surviving transition agrees on is settled; plus
  no 2×2 block all shaded), *connectivity* (cells the wall cannot reach are
  white, and a cell whose loss would split it is shaded — cut cells, one
  depth-first search), and *trial* (assume a cell, propagate the lower
  rungs, keep the opposite on a contradiction).
- **Guarantees:** deterministic per seed; exactly one wall, proven because
  the sound ladder settles every cell, also confirmed by the engine's capped
  exhaustive count when that fits its budget (`count_confirmed` in the
  metadata), and re-proven in tests by an independent search that knows
  only the rules as a feasibility test (its line check is a separate
  recursive matcher). The line programme is checked against brute force on
  every partial line of length 6 for a set of wildcard clues. Rated by the
  hardest rung needed, with size as the tie-break (line placements: Kids at
  5×5, Easy above; connectivity: Medium; trial: Hard up to 8×8, Expert from
  9×9). Every band is reached at its default size; a band the chosen size
  cannot reach is served at the nearest band found and labelled as such
  (`requested_difficulty` in the metadata). The search stops at the first board as near as any board of
  that size can be, which is the board that would have been served anyway
  (Hard above 8×8 used to try every attempt first — tens of seconds at
  10×10 — for the same board).

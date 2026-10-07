---
title: "Koburin"
blurb: "Koburin — shade cells that never touch, as the numbers count; one loop through every other cell"
category: puzzle
version: "1.0.0"
---
Shade a few cells, then thread one loop through every cell that is left —
the numbers tell you how many shaded cells sit beside them.

## What it is

A square grid with some numbered cells. Shade some of the empty cells and
draw a single closed loop through the centres of all the others. Shaded
cells never touch side by side, and each number counts the shaded cells
directly next to it.

## How to play

- Shade some empty cells. Two shaded cells may touch at a corner but never
  along a side. Numbered cells are never shaded.
- A number tells you how many of the four cells directly above, below, left
  and right of it are shaded. A 0 means none of them are.
- Draw one loop through the centres of every cell that is neither shaded
  nor numbered. The loop moves up, down, left or right between neighbouring
  cells, visits each of those cells exactly once and never crosses or
  touches itself.

Good places to start: around a 0 every empty neighbour is on the loop. An
empty cell in a corner, or one hemmed in so that it has only one open
neighbour, cannot be on the loop and must be shaded. Next to a shaded cell
the four neighbours are all on the loop (or numbered), which often fixes
how the loop turns there.

## Purpose

A gentle mix of two classic ideas — counting shaded cells and drawing one
loop — that rewards switching between them. It practises the core loop
habits (every loop cell has exactly two loop neighbours, no dead ends, no
small loops closing early) and simple counting.

## History

Koburin is a Japanese pencil puzzle from the same family as Yajilin, which
Nikoli popularised; it replaces Yajilin's arrows with plain counts of the
neighbouring shaded cells. It appears in Otto Janko's large online
collection, on the puzz.link puzzle site and in puzzle-competition sets.

## This implementation

- **Spec knobs:** `size` (5–10; 0 picks from the difficulty — 5, 6, 7, 7, 8
  from Kids to Expert), `difficulty`, `cell` (18–90 pt), `line` (0.2–4 pt).
  Out-of-range numbers are clamped and the requested value is reported in
  the metadata.
- **Generation:** a random simple loop is grown as the outline of a shape
  of unit squares on the lattice of cell centres, preferring growth that
  adds no 2×2 block of loop cells (a block could be crossed another way)
  and covering about 55–65% of the board. Every cell the loop skips starts
  as a number (all 0s), which pins the loop down if any choice of numbers
  can. Numbered cells are then turned into shaded ones, one at a time in
  random order (never next to another shaded cell), keeping each change only
  while the deduction ladder still settles the whole board at the band's
  rung. When the requested rung yields no board, fresh attempts run at the
  rungs above and the band actually reached is printed.
- **Solving:** a ladder on yes/no variables — one per edge between cells,
  one per cell for "on the loop" and one for "shaded". *Local*: a loop cell
  has two loop edges, any other none; every unnumbered cell is either on
  the loop or shaded; numbered cells are neither; no two shaded cells
  touch; each number counts its shaded neighbours. *Loop*: no loop may
  close before it holds every loop cell, the possible cells must hang
  together, and across a narrow passage the loop lives wholly on one side.
  *Trial*: assume a value, propagate, keep the opposite on a contradiction.
- **Guarantees:** deterministic per seed; exactly one answer, proven
  because the sound ladder settles every variable (meta
  `uniqueness_proof`), with a capped exhaustive count confirming it when
  cheap (`count_confirmed`), and re-proven in tests by an independent
  search over the loop's edges alone that knows only the rules (a cell
  without loop edges is shaded). Rated by the hardest rung needed with size
  as the tie-break (local: Kids at 5×5, else Easy; loop: Easy up to 6×6,
  else Medium; trial: Hard up to 7×7, else Expert). Every band is reached
  at its default size; with a custom `size` the label states the band
  actually reached (Kids from 6×6 up is Easy; Medium at 5×5 and 6×6 is
  Easy; Expert at 5–7 is Hard and Hard from 8×8 up is Expert).

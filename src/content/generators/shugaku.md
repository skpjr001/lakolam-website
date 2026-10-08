---
title: "Shugaku"
blurb: "Shugaku — lay futons around the pillars so the corridor joins up and the numbers count pillows"
category: puzzle
version: "1.0.0"
---
A school trip's dormitory: lay out the futons around the pillars so the
corridor joins up.

## What it is

A square grid with grey pillar cells, some of them numbered. The solver
lays futons — dominoes covering two neighbouring cells — in the other
cells. Each futon has a pillow half (marked with a square) and a foot
half; a futon lying top to bottom always has its pillow in the lower cell.
A pillar's number counts the pillows next to it. Every cell that is
neither pillar nor futon is corridor: the corridor is all joined up,
never fills a 2×2 block, and every futon touches it.

## How to play

- Grey cells are pillars; nothing goes on them.
- Lay futons on pairs of neighbouring cells, across or down. Mark one half
  of each futon as its pillow. A futon running top to bottom has its
  pillow in the lower cell.
- A number on a pillar tells how many pillows touch it along a side.
  Pillars without numbers say nothing.
- Every remaining cell is corridor. Shade it.
- The corridor must be one connected path network, must never cover a
  2×2 block, and every futon must touch the corridor along a side.
- There is exactly one way to lay the futons.

Good places to start: a 0 means no pillow is beside it — any futon next to
it shows its foot. Any 2×2 block of empty cells needs a futon in it. A
corridor cell that is the only link between two parts of the corridor can
never be covered.

## Purpose

A layout puzzle with a story: futons, pillows and a corridor everyone can
walk along. It mixes counting (the numbers), shape fitting (the dominoes)
and the global "is it still connected?" check of wall puzzles, and trains
reasoning by contradiction.

## History

Shugaku (修学, from "school trip") appeared in Puzzle Communication Nikoli
No. 119 (2007). Otto Janko's online archive carries a collection of them.

## This implementation

- **Spec knobs:** `size` (4–8; 0 picks from the difficulty — 4, 5, 6, 7, 8
  from Kids to Expert), `difficulty`, `cell` (18–90 pt), `line` (0.2–4 pt).
  Out-of-range numbers are clamped and the requested value is reported in
  the metadata.
- **Generation:** answer first. Pillars are scattered (about one cell in
  seven), then as many futons as fit are laid in a random order (each
  keeping the corridor connected and every futon beside it; a futon lying
  across needs a pillar beside just one of its halves, or no number could
  ever tell its pillow side), and any 2×2 block of corridor left gets a
  pillar. Every pillar is numbered. A local search then turns corridor into
  numbered pillars and back (at most one cell in four a pillar) and lays,
  swaps and lifts futons (keeping them on one cell in three or more),
  keeping each change that keeps the rules and leaves no more cells open
  under the ladder, until the ladder settles every cell. Numbers are then
  removed in a seeded order (the pillar stays) while the ladder still
  settles the grid.
- **Solving:** a ladder over one yes/no variable per cell ("corridor") and
  one per futon placement ("this futon is laid"). *Local*: every non-pillar
  cell is corridor or in exactly one futon, each number's pillow count, no
  2×2 block of corridor, every futon beside the corridor. *Connectivity*:
  cells the corridor cannot reach are futon, and a cell whose loss would
  split it is corridor. *Trial*: assume a value, propagate, keep the
  opposite on a contradiction.
- **Guarantees:** deterministic per seed; exactly one answer, proven
  because the sound ladder settles every cell (meta `uniqueness_proof`),
  with a capped exhaustive count confirming it (`count_confirmed`), and
  re-proven in tests by an independent search that lays futons cell by
  cell from the rules alone. With this few numbers the lower rungs rarely
  settle a grid alone, so every band is built at the trial rung and the
  band follows the board's size (meta `rating_basis`): Kids at 4×4, Easy at
  5×5, Medium at 6×6, Hard at 7×7, Expert at 8×8; a grid the lower rungs
  settle alone is a band easier. Boards past 8×8 are not offered: the
  generator was too slow and too often failed there. With a custom `size`
  the band of that size is served and the request is reported beside it.

---
title: "Roma"
blurb: "Roma — an arrow in every cell, all different within a region, and every chain of arrows leads to Rome"
category: puzzle
version: "1.0.0"
---
All roads lead to Rome — fill every cell with an arrow so that, wherever
you start, following the arrows brings you to the black circle.

## What it is

A square grid divided into small outlined regions of up to four cells. One
cell holds a black circle: Rome. Some cells already show an arrow. Every
other cell needs an arrow pointing up, down, left or right, so that the
arrows form roads that all end at Rome.

## How to play

- Draw an arrow in every empty cell (not in Rome), pointing up, down, left
  or right.
- The arrows inside one outlined region all point in different directions.
  A region of four cells uses each direction exactly once.
- Start in any cell and follow the arrows from cell to cell: you must
  always arrive at Rome. No arrow may point off the grid, and the arrows
  may never lead you round in a circle.
- There is exactly one solution.

Good places to start: arrows on the edge of the grid cannot point outwards.
Two neighbouring cells never point at each other — that would be a circle
of two. An arrow must not point into a cell whose road leads straight back
to it, and a cell next to Rome often points into it.

## Purpose

A calm, friendly logic puzzle with no numbers at all — only directions. It
trains following a path, spotting loops and dead ends, and the simple rule
"each direction once per region". Large arrows and few rules make it a good
choice for children and for older solvers alike.

## History

Roma ("all roads lead to Rome") appears in Otto Janko's online puzzle
collection, which has more than a hundred of them from 4×4 to 14×14; its
inventor is not recorded there. It belongs to the family of arrow puzzles
such as Signpost, but asks for the arrows rather than giving them.

## This implementation

- **Spec knobs:** `size` (4–10; 0 picks from the difficulty — 5, 6, 7, 7, 8
  from Kids to Expert), `difficulty`, `cell` (18–90 pt; the default 44 pt
  suits young and older eyes), `line` (0.2–4 pt). Out-of-range numbers are
  clamped and the requested value is reported in the metadata.
- **Generation:** answer first. Rome is placed at random and a uniform
  random spanning tree rooted at it (Wilson's algorithm of loop-erased
  random walks) gives every cell its arrow. The grid is then carved into
  regions of mostly three or four cells whose arrows all differ (a lone
  cell joins a neighbour when it can). Every arrow starts printed and is
  removed in random order while the ladder still settles the grid at the
  band's rung (the rule rungs first, then trial for Hard and Expert). As in
  published Roma puzzles, about half the arrows usually stay printed.
- **Solving:** a ladder on one yes/no variable per cell and direction.
  *Single rules*: one arrow per cell, none off the grid, a direction at
  most once per region (exactly once in a region of four arrows), and two
  neighbours never pointing at each other. *Short paths*: an arrow may not
  point into a cell whose settled road leads straight back, nor into a cell
  that cannot reach Rome at all. *Detours*: an arrow may not point into a
  cell whose every road to Rome passes back through the arrow's own cell —
  found with a dominator tree of the roads still possible. *Trial*: assume
  a value, follow the consequences, keep the opposite on a contradiction.
- **Guarantees:** deterministic per seed; exactly one answer, proven
  because the sound ladder settles every cell (meta `uniqueness_proof`),
  with a capped exhaustive count confirming it when cheap
  (`count_confirmed`), and re-proven in tests by an independent search that
  places arrows most-constrained first and checks loops and reachability
  directly. Rated by the hardest rung needed with size as the tie-break
  (single rules or short paths: Kids up to 5×5, Easy at 6×6, else Medium;
  detours: Easy up to 5×5, Medium at 6×6, else Hard; trial: Hard up to 5×5,
  else Expert). Every band is served at its default size; with a custom
  `size` the label states the band reached.

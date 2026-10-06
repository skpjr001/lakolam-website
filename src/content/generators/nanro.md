---
title: "Nanro"
blurb: "Nanro — number cells so each region's numbers count its numbered cells, all joined in one group"
category: puzzle
version: "1.0.0"
---
Write numbers into the regions so each number counts its own region's
numbers — and every number joins one connected chain.

## What it is

A square grid divided into regions by thick lines, with a few numbers
already written in. You write numbers into some of the empty cells. In each
region, every number you write is the same: it is how many cells of that
region hold a number. All the numbered cells across the whole grid link
up into a single group.

## How to play

Write numbers in some cells so that:

- every number equals how many cells in its region hold a number, so all
  numbers in one region are the same;
- every region holds at least one number;
- all numbered cells are connected to each other through shared sides;
- no 2 by 2 block of cells is completely numbered;
- two equal numbers in different regions never touch along a side.

The given numbers tell you exactly how many cells of their region are
numbered. A region of two cells with a 2 is full; a 1 means every other
cell of its region stays empty. Keep the chain connected: an empty cell that
would cut the numbered cells in two must be numbered. Where two regions
meet, check that the numbers on either side of the border will not be equal.

## Purpose

A number-placement puzzle that is really a shading puzzle in disguise:
choosing which cells hold numbers is the whole task, and the counts, the
connected chain and the border rule all pull on the same choice. It trains
counting within regions while keeping the whole grid in view.

## History

Nanro was introduced by the Japanese publisher Nikoli around 2000 and has
appeared in its magazine and puzzle books since. It sits between Nikoli's
region-counting genres and its shading genres such as Nurikabe: the
numbered cells behave like a connected wall that must not form a 2 by 2
block.

## This implementation

- **Spec knobs:** `size` (5–10; 0 picks from the difficulty — 5, 6, 7, 8, 10
  from Kids to Expert), `difficulty`, `cell`, `line`.
- **Generation:** regions of 2–5 cells grow from free cells in seeded order;
  stray single cells join the smallest neighbouring region. The answer is
  drawn by the solver's own rules: cells are visited in seeded order and
  numbered or left empty by a seeded choice, propagating every rule after
  each, and a choice that contradicts takes the other. Given numbers are
  added where the ladder leaves the most cells unsettled (preferring regions
  that have no given yet), then taken away one at a time, in seeded order,
  while the ladder still settles every cell at the requested rung.
- **Solving:** the unknown is which cells are numbered; the values follow.
  A ladder of three rungs on numbered/empty cells — *region counts* (a
  region with a given holds exactly that many numbers, every region at least
  one, no 2×2 block is all numbered, and two numbered cells touching across a
  border may not leave both regions settled at the same count: each cell of
  the two regions is probed against the regions' possible counts),
  *connectivity* (cells the numbered group cannot reach are empty, and a cell
  whose loss would split it is numbered — cut cells, one depth-first
  search), and *trial* (assume a cell, propagate the lower rungs, keep the
  opposite on a contradiction).
- **Guarantees:** deterministic per seed; exactly one answer, proven because
  the sound ladder settles every cell, also confirmed by the engine's capped
  exhaustive count when that fits its budget (`count_confirmed` in the
  metadata), and re-proven in tests by an independent search that knows
  only the rules as a feasibility test. Every answer is checked against every
  rule directly, and propagation is checked on random partial answers never
  to contradict a true one. Rated by the hardest rung needed, with size as
  the tie-break (region counts: Kids at 5×5, Easy above; connectivity:
  Medium; trial: Hard up to 8×8, Expert from 9×9). Every band is reached at
  its default size; a band the chosen size cannot reach is served at the
  nearest band found and labelled as such (`requested_difficulty` in the
  metadata).

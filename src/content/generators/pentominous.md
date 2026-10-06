---
title: "Pentominous"
blurb: "Pentominous — divide the grid into pentominoes, no two of one shape touching, every letter in its shape"
category: puzzle
version: "1.0.0"
---
Cut the grid into pentominoes — and keep look-alikes apart.

## What it is

A grid with some letters in it. The whole grid divides into pentominoes —
the twelve shapes made of five squares, each named by a letter: F, I, L, N,
P, T, U, V, W, X, Y and Z. A shape may be used any number of times, or not
at all, and there is exactly one way to divide the grid.

## How to play

Draw lines along the grid to divide every cell into pentominoes. The rules:

- every region has exactly five cells;
- two regions of the same shape may not share an edge (they may touch at a
  corner);
- a cell with a letter belongs to a region of that letter's shape.

The legend under the grid shows each shape with its letter; shapes may be
turned and flipped. Look first where the letters crowd together: two
neighbouring cells with the same letter must be in the same region (two
separate regions of one shape could not touch), and two different letters
side by side are always in different regions. An X has only one form and an
I only two, so their letters are quick to settle. Watch the corners and
edges: a pocket of cells that is not a multiple of five can never be filled.

## Purpose

A region-dividing puzzle in which the pieces have names. It trains shape
recognition — every pentomino in every orientation — and the
same-shape-apart rule gives the clues reach far beyond their own cell.

## History

Pentominous was invented by Grant Fikes, who published it in 2013 on his
puzzle blog. It has since become a regular at puzzle championships and in
online puzzle collections.

## This implementation

- **Spec knobs:** `rows`, `cols` (5–12, kept to an area that is a multiple
  of five and at most 120; 0 picks from the difficulty — 5×6, 6×10, 8×10,
  10×10, 10×10 from Kids to Expert), `difficulty`, `legend` (print the
  twelve shapes and letters below the grid), `cell`, `line`.
- **Generation:** a random tiling that keeps the same-shape rule —
  a backtracking cover at the first open cell, placements shuffled, pockets
  whose size is not a multiple of five cut off at once. Every cell starts
  with its letter (a full letter grid always has one answer: same-letter
  neighbours share a region) and letters are removed in a seeded order while
  the deduction ladder, capped at the requested rung, still divides the whole
  grid.
- **Solving:** a ladder over placements (every pentomino position the
  letters allow). *Forced* (Easy): a cell only one placement can still cover
  takes it, and placing a pentomino strikes everything overlapping it and
  every same-shape placement beside it. *Look one step* (Medium): a placement
  is struck if it would leave a nearby cell with nothing to cover it, or
  wall off a small pocket beside it whose size is not a multiple of five.
  *Pairs* (Hard): where a cell has two placements left, each is tried and
  struck if the lower rungs then hit a contradiction. Grids the ladder cannot finish are proven by
  search alone (Expert).
- **Guarantees:** deterministic per seed; exactly one division, proven by an
  exhaustive cover search (first open cell, bitmask placements, same-shape
  and letter pruning) that counts to a cap of 2 and treats an exhausted node
  budget as ambiguous. Tests re-check every rule piece by piece and recount.
  Rated by the hardest rung needed (forced: Kids for grids of 30 cells or
  fewer, else Easy; look-one-step Medium; pairs Hard; search-only Expert).
  If a band is not reached in eight attempts the nearest band found is
  returned and labelled (`difficulty_requested` in meta).

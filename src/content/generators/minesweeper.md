---
title: "Minesweeper"
blurb: "Minesweeper — find every mine from the counts on the open cells"
category: puzzle
version: "1.0.0"
---
Find every mine — each open cell counts the mines among its eight neighbours.

## What it is

A grid of closed (grey) and open (white) cells. Every open cell is safe and
shows how many of the eight cells around it hold a mine. Mark every mine;
the total is printed under the grid as a check.

## How to play

An open cell whose count is already met clears all its other closed
neighbours; one that needs every closed neighbour mines them all. Zeros clear
their surroundings at a stroke. When single counts stall, compare two open
cells that share neighbours: the shared cells can hold only so many mines,
which pins the cells just one of them touches. Harder boards need the same
comparison between cells two apart, and the hardest need a short
what-if: assume a cell, follow the consequences, and reject it on a
contradiction.

## Purpose

The logic of the world's most familiar computer game, with the guessing
removed. Printed Minesweeper is a magazine and book staple ("mine finder"),
and it rounds out the counting family begun by `fillapix`: here a clue never
counts itself and is known safe, which changes the reasoning.

## History

Grew out of 1980s mainframe and home-computer games such as *Mined-Out*
(1983) and became universal with Microsoft Minesweeper, bundled with Windows
from 1990. Pencil-and-paper versions with guaranteed logical solutions are
published by puzzle magazines and in dedicated books.

## This implementation

- **Spec knobs:** `width`, `height` (5–30; 0 picks from the difficulty),
  `density` (share of mine cells; 0 picks from the difficulty),
  `difficulty`, `cell`, `line`.
- **Generation:** mines are scattered; every safe cell starts open with its
  count; open cells are then closed one at a time — zeros first, the least
  informative — while the solver still settles every cell by inference at or
  below the requested difficulty.
- **Solving:** a technique ladder — *basic* counts, *overlap* between open
  cells sharing three or more neighbours, *reach* between cells further
  apart, and *trial* (assume, propagate, reject on contradiction).
- **Guarantees:** deterministic per seed; exactly one mine layout, since every
  deduction is sound and the ladder settles every cell — confirmed by an
  independent backtracking count in the tests; open cells are never mines.
  Rated by the hardest technique needed.

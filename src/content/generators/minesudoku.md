---
title: "Mine Sudoku"
blurb: "Mine Sudoku — three mines in every row, column and box, found from minesweeper numbers"
category: puzzle
version: "1.0.0"
---
Sudoku counting meets minesweeper: three mines in every row, column and
box, found from the numbers.

## What it is

A 9×9 grid divided into nine 3×3 boxes, with a few numbers. Mines are
hidden in the grid: exactly three in every row, every column and every box.
Each number sits on a mine-free cell and tells how many of its eight
neighbours (including diagonals) hold mines. A smaller 6×6 board has 2×3
boxes and two mines per row, column and box. The genre is also known as
Lime Sudoku or Blueberry.

Variant boards add houses that count like a row: **jigsaw** boxes (thick
lines outline irregular pieces of nine cells instead of 3×3 squares),
**centre dot** (the nine shaded box-centre cells), **X** (both long
diagonals) and **windows** (four shaded 3×3 windows). Jigsaw can be combined
with any of the others.

## How to play

Mark the mines so that:

- every row, column and box holds exactly three mines (two on a 6×6 board);
- every number counts the mines among its eight neighbours;
- numbered cells never hold a mine;
- on variant boards, every jigsaw piece, the shaded centre cells, each long
  diagonal or each shaded window also holds exactly three mines (two on a
  6×6 board).

A 0 clears all its neighbours. A number with exactly as many unknown
neighbours as mines still needed gets them all. Once a row, column or box
has its mines, its other cells are empty. Then compare overlapping areas: if
a number needs two mines and only two of its neighbours lie in a row that
still needs two, the rest of that row is clear. On the hardest boards, try a
cell: if a mine there would break a count, it is empty. The extra houses
on variant boards are just more counts to compare: a window that already
holds three mines clears the rest of it, and a window overlapping a box
works like a number overlapping a row.

## Purpose

A hybrid that rewards both sudoku habits (scanning units for their quota)
and minesweeper habits (reading neighbour counts), with very few clues on
the page. A natural follow-on for solvers who enjoy Star Battle or
Minesweeper-style puzzles.

## History

Mine-placement puzzles with sudoku-style unit counts appeared in puzzle
competitions and online puzzle collections in the 2000s and 2010s under
several names — Lime Sudoku, Blueberry, Mine Sudoku — all built on the same
idea: Star Battle's counting with Minesweeper's clues.

## This implementation

- **Spec knobs:** `size` (9, or 6 for 2×3 boxes with two mines per unit; 0
  picks 6 for Kids and 9 otherwise), `difficulty`, `jigsaw` (irregular
  connected boxes), `extra` (`none`, `centre_dot`, `x`, `windows`;
  centre dot and windows exist only on 9×9 — size 0 then picks 9, so a Kids
  request is served as Easy, and an explicit size 6 is refused), `cell`,
  `line`.
- **Variants:** jigsaw pieces start as the regular boxes and are reshaped by
  swapping border cells between neighbouring pieces while both stay
  connected; the mine layout is placed row by row with every house (row,
  column, piece, extra) kept within reach of its count; the same ladder runs
  over every house; the layout is re-proved by an independent row-by-row
  count over the variant's houses. Bands are the classic ones (same rungs,
  same size tie-break); every variant generates in under 0.1 s at Easy to
  Expert, and up to about 1 s for a Kids request on a 9×9-only variant.
- **Generation:** a random mine layout with the right count in every unit is
  placed row by row with backtracking; every mine-free cell is numbered, and
  numbers are erased in random order while the ladder still settles every
  cell at the requested rung.
- **Solving:** a ladder on yes/no cells — *local* (each unit and each number
  alone: full means the rest is clear, tight means the rest is mines),
  *overlap* (two overlapping counts compared: the mines their shared cells
  can hold bound the cells each owns alone), and *trial* (assume a cell,
  propagate, keep the opposite on a contradiction).
- **Guarantees:** deterministic per seed; exactly one layout, proven because
  the sound ladder settles every cell, confirmed by a capped exhaustive
  count, and re-proven in tests by an independent row-by-row count. Rated by
  the hardest rung needed (local: Kids on 6×6, Easy on 9×9; overlap: Easy on
  6×6, Medium on 9×9; trial: Medium on 6×6, Hard on 9×9). **Expert is not
  reachable:** the ladder's top rung is a single trial, which honestly rates
  Hard, so an Expert request returns a Hard board labelled Hard.

---
title: "Snake"
blurb: "Snake — draw a snake from head to tail that never touches itself, matching the edge counts"
category: puzzle
version: "1.0.0"
---
Draw the snake from head to tail — it never touches itself, and the edge
numbers count its cells in every row and column.

## What it is

A square grid with two black dots: the snake's head and its tail. The snake
is a one-cell-wide body that crawls from one dot to the other through cells
that share a side. Numbers outside the grid say how many snake cells each
row and column holds; on harder boards some numbers are missing.

## How to play

Shade the cells of the snake so that:

- it runs from one black dot to the other, cell to side-adjacent cell, with
  no branches and no gaps;
- it never touches itself — no two parts of the body sit side by side or
  corner to corner, except where the snake simply turns a corner;
- every number outside the grid matches the count of snake cells in its row
  or column.

Start with the zeros and the full lines: a 0 clears its whole line. A cell
next to the head or tail must continue the body, and a body cell always has
exactly two body neighbours. A square of four snake cells, or two snake
cells meeting only at a corner, is never allowed. On harder boards, think
about where the snake can still go: it must reach the tail in one piece, so
a cell it cannot reach is empty, and a narrow gap it must pass through is
snake. Grey dots, when shown, are cells you know are on the snake.

## Purpose

A path-drawing puzzle with the counting of Battleships or Tents and the
spatial feel of a maze: a good bridge between number puzzles and loop
puzzles, and quick to explain.

## History

Snake is a long-standing genre of competitive puzzle sets, seen at World
Puzzle Federation events, and the UK Puzzle Association's genre guides use
it as an introduction to path puzzles. Variants give some body cells or
no head and tail; this one gives both ends.

## This implementation

- **Spec knobs:** `size` (5–10; 0 picks from the difficulty — 6, 7, 8, 9, 10
  from Kids to Expert), `difficulty`, `cell`, `line`.
- **Generation:** a random non-touching snake of 30–40 % of the cells is laid
  by a depth-first walk; every row and column count is printed. If the
  counts alone cannot settle the snake at the requested rung, body cells are
  printed as grey helper dots until they do (rare, and boards without
  helpers are preferred). Helpers are then erased, and from Medium up the
  counts too, one at a time, while the ladder still settles every cell.
- **Solving:** a ladder of three rungs on yes/no cells — *local* (row and
  column counts, a body cell has exactly two body neighbours and an end
  exactly one, no full 2×2 square and no lone diagonal pair), *reach* (the
  snake stays in one piece: cells cut off from the head are empty and a cell
  whose removal would split the snake is snake), and *trial* (assume a cell,
  propagate the lower rungs, keep the opposite on a contradiction).
- **Guarantees:** deterministic per seed; exactly one snake, proven because
  the sound ladder settles every cell, confirmed by a capped exhaustive count,
  and re-proven in tests by an independent path search that checks the
  no-touching rule by distance along the body. Rated by the hardest rung
  needed (Kids/Easy: local, by size; Medium: reach; Hard: trial; Expert:
  trial on 10×10). When the requested band is not reached in 40 attempts,
  the nearest band found is returned and labelled as such. Where a band
  cannot exist at a size (Hard on 10×10, Expert below it), the search stops
  as soon as it holds a helper-free board in the nearest reachable band —
  the board it would have returned anyway, without the wasted attempts
  (Hard at 10×10 used to run past a minute).

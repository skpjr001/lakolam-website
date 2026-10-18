---
title: "Three Symbols"
blurb: "Three Symbols — three shapes, equal counts per line, never three alike in a row"
category: puzzle
version: "1.0.0"
---
Fill the grid with rings, triangles and crosses: the same number of each in
every row and column, and never three alike side by side.

## What it is

A square grid of 6×6, 9×9 or 12×12 cells, some already holding one of three
shapes — a ring, a triangle or a cross. Fill every empty cell with a shape.
Each row and each column holds the same number of each shape (two of each
on 6×6, three on 9×9, four on 12×12), and no three alike may sit next to
each other across or down. Some pages add rules: the two shaded long
diagonals follow the same rules, or each bold 3×3 box holds three of each
shape. There is exactly one way to finish.

## How to play

- Every row and every column has the same number of rings, triangles and
  crosses.
- Never three of the same shape in a row, across or down.
- If the page has shaded diagonals, each diagonal follows both rules too. If
  it has bold boxes, each box holds three of each shape.
- Two alike side by side, or two alike with one gap between, mean the cell
  that would make three must be another shape.
- Count: when a row already has its share of a shape, that shape goes
  nowhere else in the row. When a row needs two more crosses and only two
  cells can still take one, both are crosses.
- Harder grids: think about every way a whole row (or column) can still be
  finished — if they all put the same shape in one cell, write it in.
- Hardest grids: try a shape in a cell in your head. If it leads, step by
  step, to a broken rule, it is not that shape.

## Purpose

The two-symbol line puzzle with a third symbol: the familiar "never three"
and "equal counts" rules stay, but each cell now has three choices, so
single steps rarely finish a cell on their own and counting does more of the
work. The shapes need no reading, which suits children; the diagonal and
box rules make tougher variants for adults.

## History

Three-symbol versions of the binary line puzzle appeared in the 2010s in
printable collections and puzzle apps, sometimes with diagonal or box
variants and children's editions with cut-out tiles.

## This implementation

- **Spec knobs:** `size` (6, 9 or 12; other values snap to the nearest and
  are reported as `requested_size`), `diagonals`, `boxes`, `difficulty`,
  `cell`, `line`.
- **Generation:** a full grid is found by seeded search (most constrained
  cell first, random shape order) with the pair and counting rules
  propagated at every step. Shapes are then removed in seeded order while
  the ladder can still finish the grid at the band's ceiling; up to 12
  grids are tried for the band. Kids gives back shapes until half the grid
  is shown.
- **Solving:** the ladder, cheapest rung first: pairs (no third alike),
  counting (a line or box with its share of a shape, or exactly as many
  places as shapes needed), whole lines (every legal way to finish a line
  agrees on a cell), and a what-if (a shape that leads to a broken rule
  under the lower rungs is ruled out).
- **Guarantees:** deterministic per seed; exactly one filling — the ladder
  settles every cell by sound steps, and a separate counting search (cap 2)
  confirms it; the tests count again with a plain search that knows only
  the rules. Rated by the hardest rung needed (`rating_basis:
  hardest_rung`): Kids pairs and counting with half the grid given, Easy
  pairs and counting, Medium whole lines, Hard a what-if. Expert does not
  occur and is served as Hard. Measured over 6 seeds: 9×9 and 12×12 serve
  Kids to Hard as asked, with or without the extra rules; a plain 6×6 never
  needs more than counting, so Medium and Hard on it are served as Easy
  (with diagonals and boxes, 6×6 reaches Hard but not Medium). Any band
  served other than the one asked is recorded as `requested_difficulty`.
  Timings: under 30 ms for most pages; 9×9 Hard about 0.1–0.25 s; 12×12
  Hard about 0.8 s, and about 3 s with both extra rules.

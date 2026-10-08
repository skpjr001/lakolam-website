---
title: "Starry Night"
blurb: "Starry Night — a star, a sun and a moon in every row and column; edge clues say which is nearer the star"
category: puzzle
version: "1.0.0"
---
Hang one star, one sun and one moon in every row and column — the symbols
at the edge tell you which of sun and moon sits nearer the star.

## What it is

A small square grid with a symbol beside every row and above every column.
Each row and each column holds exactly one star, one sun and one moon; the
other cells stay empty. Two equal symbols never touch at a corner. The
edge symbols compare distances inside their line: is the sun or the moon
closer to the star?

## How to play

- Draw one star, one sun and one moon in every row and every column. All
  other cells stay empty.
- Two equal symbols may never touch diagonally (corner to corner).
- The symbol to the left of a row, or above a column, compares the
  distances in that line, counted in cells from the star:
  - a sun means the sun is nearer the star than the moon;
  - a moon means the moon is nearer the star than the sun;
  - a star means the sun and the moon are equally far from the star, one
    on each side.
- Symbols already drawn in the grid are given.
- There is exactly one solution.

Good places to start: a star clue puts the star between sun and moon, so
the star can never sit at the end of that line. In a sun line, the sun is
often right beside the star. Once a symbol is placed, its four diagonal
neighbours cannot hold the same symbol, and its row and column are done
for that symbol.

## Purpose

A gentle placement puzzle with no numbers at all: three pictures, a
distance comparison and a "no touching" rule. It trains spatial reasoning
— thinking about where something can sit along a line — and suits
large-print and children's puzzle books as well as quick breaks.

## History

The puzzle was invented by the Japanese author Naoki Inaba as "Near
Place". Otto Janko published it as "Sternennacht" (starry night) in his
online collection of logic puzzles, and Erich Friedman's Puzzle Palace
featured it in English as "Starry Night". Its "one of each per line"
structure is shared with Easy as ABC; the distance clues are its own.

## This implementation

- **Spec knobs:** `size` (5–9; 0 picks from the difficulty — 5, 6, 6, 7, 7
  from Kids to Expert), `difficulty`, `cell` (18–90 pt), `line` (0.2–4
  pt). Out-of-range numbers are clamped and the requested value is
  reported in the metadata.
- **Generation:** answer first. Three permutations — star, sun, moon — are
  placed row by row from shuffled candidate triples, never on a shared
  cell and never diagonal to their own kind (a depth-first search with a
  node budget). Every line's clue is printed, as in the published puzzles.
  Where the ladder stalls at the band's rung, a symbol of the answer is
  printed in that row; printed symbols are then trimmed again while the
  grid still settles. Grids that need the fewest printed symbols at the
  band's own rung are preferred.
- **Solving:** a ladder on one yes/no variable per cell and symbol.
  *Single rules*: one symbol per cell, each symbol once per line, no
  symbol diagonal to its own kind. *Whole line*: every placement of star,
  sun and moon in a line that fits its clue and what is known; a placement
  no such way uses is ruled out. *Neighbouring lines*: two adjacent rows
  (or columns) together — a placement of one survives only beside a
  placement of the other that keeps every symbol out of the same column
  and off the diagonals. *Trial*: assume a value, follow the consequences,
  keep the opposite on a contradiction.
- **Guarantees:** deterministic per seed; exactly one answer, proven
  because the sound ladder settles every variable (meta
  `uniqueness_proof`), with a capped exhaustive count confirming it when
  cheap (`count_confirmed`), and re-proven in tests by an independent
  row-by-row search that shares no code with the ladder. Rated by the
  hardest rung needed with size as the tie-break (whole line: Kids at 5×5,
  Easy at 6×6, else Medium; neighbouring lines: Easy at 5×5, Medium at
  6×6, else Hard; trial: Hard up to 6×6, else Expert). Every band is
  reached at its default size. The trial rung is not offered from 8×8 up
  (too slow to dig with), so Expert on an 8×8 or 9×9 is served as Hard,
  and Kids from 6×6 up is labelled with the band it reaches.

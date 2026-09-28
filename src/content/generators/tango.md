---
title: "Tango"
blurb: "Tango - balance suns and moons, no three alike, obeying = and x marks"
category: puzzle
version: "1.0.0"
---
Fill the grid with suns and moons: balanced lines, no three alike, and every
= and x between neighbours kept.

## What it is

A small square grid (6×6 as standard, 4×4 for beginners, 8×8 for experts)
with a few suns and moons already placed. Some neighbouring cells are joined
by a mark on their shared wall: `=` means the two cells hold the same symbol,
`x` means they hold opposite symbols. Complete the grid so that:

- every row and every column holds as many suns as moons;
- no more than two of the same symbol sit side by side in a row or column;
- every `=` and `x` mark is respected.

## How to play

Start with the marks: next to a placed symbol, an `=` copies it and an `x`
flips it. Then look for pairs: two suns side by side must be closed by moons
at both ends, and a gap between two suns must be a moon. Once a row or column
has all the suns it needs, every empty cell left in it is a moon, and the
same the other way round. When those run dry, take a whole row and ask which
ways of finishing it still fit: an `x` inside the row means those two cells
share one sun and one moon between them, which often leaves only one way to
place the rest. On the hardest grids, suppose a cell is a sun and follow the
consequences; if they lead to a broken rule, it must be a moon.

## Purpose

A quick, friendly binary logic puzzle in the spirit of Binairo, but with the
relation marks as a second kind of clue, so a grid can carry very few given
symbols. It plays in a few minutes, which suits a daily puzzle page and
younger solvers on the 4×4 size, while the 8×8 grids ask for real
look-ahead.

## History

Tango was introduced by LinkedIn in 2024 as one of its daily games. It
descends from the binary puzzle (Binairo, Takuzu), created in 2009 by Peter
De Schepper and Frank Coussement, adding the `=` and `x` marks and dropping
the rule that no two lines may be identical.

## This implementation

- **Spec knobs:** `size` (4, 6 or 8; 0 picks from the difficulty: Kids 4,
  Expert 8, otherwise 6), `difficulty`, `cell`, `line`.
- **Generation:** a full valid grid is filled by randomised depth-first
  search. Every cell is then given and every neighbouring relation marked;
  givens and marks are removed one at a time, in random order, while the
  solver can still settle the whole grid at or below the requested
  technique ceiling. Up to twelve attempts; the board rated closest to the
  request is kept.
- **Solving:** a technique ladder — *basic* (copy or flip across a mark,
  close pairs and gaps, fill a line whose count is met), *line* (enumerate
  every legal completion of a row or column against its marks and keep what
  they agree on), *trial* (assume a cell, keep the opposite on a
  contradiction found by the lower rungs).
- **Guarantees:** deterministic per seed; exactly one solution, since every
  deduction is sound and the ladder settles every cell, and confirmed in the
  tests by an independent row-major backtracking count. Rated by the hardest
  technique needed and the size: Kids is basic on 4×4, Easy basic on 6×6,
  Medium line on 6×6, Hard trial on 6×6, Expert trial on 8×8. Generation
  takes under 25 ms up to Medium and roughly 20-170 ms for Hard and Expert.

---
title: "Maths Square"
blurb: "Maths square — symbol sums: find each picture's number from the row and column totals"
category: maths
version: "1.0.0"
---
Every picture hides a number: use the row and column totals to find them all.

## What it is

A square grid, from 3×3 up to 5×5, filled with pictures — circles, stars,
triangles, hearts, squares, diamonds and hexagons. Each kind of picture
stands for one whole number, the same everywhere it appears. The total of
each row is printed at its right and the total of each column below it; some
boards also give the totals of the two long diagonals, in the corners. Work
out the number behind every picture and write it in the key below the grid.

## How to play

Start with a line made of just one kind of picture: three stars making 21
means a star is 7. Put that value into every line with a star in it — a
line with only one unknown picture left now gives that picture away, so keep
going. When no line has a single unknown, compare two lines: if one row is
star, star, heart and another is star, heart, heart, take one from the other
and the difference tells you how a star compares with a heart. The hardest
boards need three or more lines weighed together before the first picture
falls out. Every number is between 1 and the largest value printed at the top.

## Purpose

Picture sums are a classroom favourite for early algebra: a symbol standing
for an unknown, and equations solved by substitution and elimination, without
ever writing an x. The catalogue's `crossmath` already covers the other
"maths square" — digits 1 to 9 laced with operators — so this is the
picture-sums puzzle, from a Kids board settled by one division and two
subtractions up to 5×5 grids that need genuine elimination.

## History

Symbol-sum grids have run for decades in puzzle magazines and children's
activity books, and spread widely online as "picture maths" and "emoji math"
brain teasers. They are a friendly face on simultaneous linear equations,
which go back to the Chinese *Nine Chapters on the Mathematical Art*.

## This implementation

- **Spec knobs:** `difficulty`, `size` (3–5; 0 picks from the difficulty),
  `symbols` (2–7; 0 picks), `max_value` (5–50; 0 picks), `diagonals` (also
  print both diagonal totals), `colour` (false for grey fills in black and
  white print), `cell`, `line`.
- **Generation:** distinct values from 1 to the maximum are drawn for the
  pictures; every picture is placed at least once and the rest of the grid
  is filled at random; the totals are computed. Per band: Kids 3×3 with 3
  pictures up to 10, Easy 4×4 with 4 up to 12, Medium 4×4 with 4 up to 15,
  Hard 4×4 with 5 up to 20, Expert 5×5 with 6 up to 20. Layouts are redrawn
  until the solving ladder rates the board at the requested band.
- **Solving:** a human-style ladder, easiest step first — *single* (a line of
  one kind of picture), *substitute* (a line with one unknown picture left),
  *combine* (two lines scaled and subtracted so one picture remains), and
  *eliminate* (row reduction across three or more lines). Every step is a
  sound deduction and the ladder must settle every picture.
- **Guarantees:** deterministic per seed; every printed total is correct;
  the values are the only solution — over all numbers, since the ladder
  settles them by sound algebra, and confirmed in the tests by an
  independent exhaustive count over every value from 1 to the printed
  maximum (cap 2). Rated by the hardest step needed: eliminate is Expert,
  two or more combines Hard, one combine Medium; boards solved by singles
  and substitution alone are Kids on a 3×3 with values up to 10, Easy
  otherwise. With a `size`, `symbols` or `max_value` set by hand the
  requested band may be out of reach; the board then carries the nearest
  band it honestly reaches.

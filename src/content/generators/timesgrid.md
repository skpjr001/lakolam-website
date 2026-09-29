---
title: "Times Tables Grid"
blurb: "Times-table grids — lookup charts, missing squares and hidden-edge puzzles"
category: maths
version: "1.0.0"
---
The multiplication square in three forms: a chart to look things up in, a
grid with squares to fill in, and a puzzle where the edge numbers are hidden.

## What it is

A times-table grid has the numbers 1, 2, 3 ... down the left side and along
the top; each square holds its row number multiplied by its column number.
This page comes in three kinds. The **chart** prints every product (or, as a
practice sheet, leaves every square blank). The **missing-squares grid**
prints the edges and some of the products, and leaves the rest empty; at the
harder levels the edge numbers are mixed up, so the grid cannot be filled by
counting along a row. The **hidden-edge puzzle** prints several small grids
whose edge numbers are all hidden: only a few products are shown, and the
edge numbers have to be worked out from them. Square numbers (a number times
itself) can be shaded.

## How to play

**Chart and missing squares.** Find the row number on the left and the
column number along the top. The number in the square where they meet is the
row number times the column number: row 7, column 8 holds 56. Fill every
empty square this way. If the edge numbers are mixed up, read each one
carefully rather than counting along.

**Hidden edges.** Every number inside a grid is still its row number times
its column number, but the numbers on the edges are missing. Look for a
product that can only be made one way within the printed range: 81 with edge
numbers up to 12 must be 9 x 9, and 121 must be 11 x 11. Once you know one
edge number, every product in its row or column tells you another one
(72 in a row that starts with 9 means that column is 8). No number is used
twice down the side, and no number is used twice along the top, so when two
numbers are possible the one already used elsewhere on that edge is ruled
out. When every edge number is known, fill in all the empty squares. At the
youngest level the edge numbers are listed under the grid, and you only need
to find where each one goes.

## Purpose

Times tables are the foundation for division, fractions, area and almost all
later arithmetic, and the multiplication square shows all of them at once:
the patterns along rows, the symmetry across the diagonal, and the square
numbers down its middle. The chart is a reference and a pattern-spotting
sheet; the missing-squares grid is fluency practice; the hidden-edge puzzle
turns recall around, asking which pairs of numbers make a product, which is
the factor knowledge that division and simplifying fractions rely on.

## History

Multiplication tables are among the oldest written mathematics: Babylonian
scribes kept tables of products on clay tablets four thousand years ago, and
a bamboo-strip decimal multiplication table from China's Warring States
period (around 305 BC) is the oldest known in base ten. The square grid is
often called the Pythagorean table (tabula Pythagorica) in Europe. Learning
tables "up to 12 x 12" is a long tradition in British and American schools,
and the English national curriculum expects every child to know them by the
end of Year 4. Puzzles with hidden grid headers are a more recent classroom
and puzzle-magazine invention.

## This implementation

- **Spec knobs:** `mode` (`chart`, `missing` (default), `puzzle`);
  `difficulty`; `size` (tables up to 3-15 for chart and missing grids; 0 =
  the level's size); `filled` (chart: every product printed, or a blank
  chart to fill); `highlight_squares` (shade the square numbers); `count`
  (puzzle grids on the page, 1-6); `locale` (`us`, `uk`, `in`: the title
  wording, e.g. "multiplication chart" or "multiplication square"); page
  `width` and `height`; `line`.
- **Generation:** chart and missing grids: Kids (grade 2) is 5 x 5 with 35%
  of squares empty; Easy (grade 3) 10 x 10, 45%; Medium (grade 3-4) 12 x 12,
  55%; Hard (grade 4) 12 x 12, 60%, with the edge numbers shuffled; Expert
  (grade 5+) 15 x 15, 70%, shuffled. Puzzles: Kids 3 x 3 from 1-5 with the
  edge numbers listed under the grid; Easy 4 x 4 from 1-10 with one row and
  one column edge number printed; Medium 4 x 4 from 2-10; Hard 5 x 5 and
  Expert 6 x 6 from 2-12. A puzzle starts with every product shown and
  removes them one at a time in random order, keeping each removal only while
  exactly one set of edge numbers still fits; Kids keeps two spare products,
  Easy three, Medium one, Hard and Expert none (every shown product is
  needed).
- **Solving:** a backtracking search over the edge numbers that fills any
  edge number forced by a known neighbour and a shown product first, and
  otherwise branches on the edge with fewest options. It stops at two
  solutions; a search that runs out of its node budget counts as ambiguous.
  The tests re-count every puzzle with a separate rows-first enumeration
  (every set of row numbers, then the column numbers each allows).
- **Guarantees:** deterministic per seed. Every square, printed or in the
  answer key, is exactly its row number times its column number, in
  integers (`answers_checked`). Every puzzle has exactly one set of edge
  numbers consistent with the shown products, the printed range and the
  rule that no number repeats along an edge (`unique: true`), so every
  square has one answer; at Hard and Expert the shown products are minimal.
  Difficulty is grid size, number range and share of empty squares or
  shown products (`rating_basis`), mapped to grade bands as above (meta
  `grade`). Generation takes well under a millisecond for charts and a few
  milliseconds for a page of Expert puzzles.

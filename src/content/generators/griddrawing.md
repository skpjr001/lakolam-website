---
title: "Mystery Grid Drawing"
blurb: "Mystery grid drawing — copy scrambled, labelled squares into a lettered grid to reveal a hidden picture"
category: puzzle
version: "1.0.0"
---
Copy the squares one by one into the grid — and a hidden picture appears.

## What it is

A picture cut into a grid of squares, from 4 × 4 up to 10 × 10. The
squares are printed jumbled up, each with its place written underneath —
a column letter and a row number, like B3 — and below them is an empty
grid with lettered columns and numbered rows. Copy every square into its
place and the whole picture comes together only at the end. Pictures are
animals, objects and things from nature, in line art or colour.

## How to play

Take one square from the top of the page. Read its label: the letter is
the column (across the top of the grid) and the number is the row (down
the side). Find that cell in the empty grid and copy the lines in the
square into it, as exactly as you can — notice where each line enters and
leaves the square's edges, and how it curves in between. Tick off the
square and choose another. Squares left blank are not printed; the page
says how many there are, so those cells simply stay empty.

Do not try to guess the picture: copy each square just as it is. When
every square is done, look at the whole grid. What did you draw? Colour it
in, then check with the answer page.

## Purpose

Grid drawing trains careful looking — seeing the lines that are really
there rather than drawing what you expect — and the coordinates practise
reading a grid reference, a skill that comes back in maps, charts and
graphs. Because only one small square is copied at a time, children who
think they "can't draw" end up with a picture they are proud of.

## History

Artists have used grids to copy and enlarge pictures for thousands of
years: Egyptian wall paintings still show the squared guide lines that
fixed the proportions of figures, and Renaissance artists drew through
gridded frames — Leon Battista Alberti described his "veil" in 1435, and
woodcuts in Albrecht Dürer's treatise on measurement show a draughtsman
drawing through one. Muralists square up their sketches the same way
today. Scrambled "mystery grid"
drawings are a long-standing art-class favourite.

## This implementation

- **Spec knobs:** `difficulty` (grid size: Kids 4 × 4, Easy 5 × 5, Medium
  6 × 6, Hard 8 × 8, Expert 10 × 10), `grid` (3-12 squares a side,
  overriding the level; the level is then rated from the grid printed),
  `icon` (the picture, or random), `blank_tiles` (print the empty squares
  too), `colour`, `guides` (faint centre lines in every square and cell),
  `width`, `height`.
- **Generation:** the picture is drawn into an n × n grid of 100-unit
  cells with lines in proportion to a cell, mirrored at random when its
  mirror image is a different drawing. A cell holds ink when any of its
  pixels does on a 24-pixel-per-cell raster; blank cells are left out
  (or printed, with `blank_tiles`). Each printed square is the whole
  picture moved and clipped to one cell, so a square is exactly that part
  of the picture. The squares are shuffled, then grid neighbours that
  landed side by side are swapped apart. The squares and the empty grid
  are sized together to make both as large as the page allows.
- **Solving:** each square's label names its cell.
- **Guarantees:** the printed squares and the blank cells together cover
  every cell of the grid exactly once, and every cell with ink is printed
  (`unique`, `reassembly_checked`). The tests put every square back in its
  labelled place, rasterise it with cell edges on whole pixels and compare
  with the picture rasterised whole — at every level, in colour and line
  art — and rasterise every left-out cell alone at a finer scale to confirm
  it has no ink. The rating is the grid size (`rating_basis: grid_size`).
  The answer page shows the finished picture in the lettered grid and
  names it.

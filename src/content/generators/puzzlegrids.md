---
title: "Puzzle Grids"
blurb: "Puzzle grids — blank sudoku, crossword-setting, nonogram and square grids, one to six per page with exact square cells"
category: paper
version: "1.0.0"
---
Blank grids for setting and solving puzzles by hand — sudoku, crossword,
nonogram and plain square grids, one to six to a page with exact square
cells.

## What it is

A page of empty puzzle grids, drawn as large as the page allows and centred:

- **Sudoku** — the 9×9 grid with heavy lines round its nine 3×3 boxes, the
  6×6 grid (six boxes three cells wide and two tall) and the 4×4 grid (four
  2×2 boxes) that children start on.
- **Crossword setter grids** — 13×13, 15×15 (the daily standard) and 21×21
  (the American Sunday size), all squares white, ready for you to shade the
  blocks. A faint corner box in each square can hold its clue number, and
  faint centre lines with a ring on the centre square mark the point about
  which a symmetric grid turns.
- **Nonogram blanks** (also called griddlers or hanjie) — any size from 2 to
  40 cells each way, with clue margins above and to the left ruled one
  number to a cell, and a heavy line every five cells for counting.
- **Plain square grids** — any size, for kakuro and other pencil puzzles.

Every cell is an exact square measuring a whole half-millimetre (10 mm on a
page of four sudoku grids on Letter paper), so a grid you draw can be copied
cell for cell.

## How to use it

Print at actual size ("100%", not "Fit to page").

To solve a puzzle from a newspaper or a book with no room to write, copy its
givens into a blank sudoku grid in pencil and work there; four grids to a
page let you start again when a guess goes wrong. Children can begin with
the 4×4 and 6×6 grids.

To set a crossword, shade the black squares first. In the American style the
pattern looks the same when the page is turned upside down: whenever you
shade a square, shade the one opposite it through the centre square too —
the dashed centre lines help you find it. Then number every square that
starts a word across or down, in its corner box, reading left to right and
top to bottom.

To draw a nonogram, colour a picture in the play area, then count each row's
runs of coloured squares from left to right and write the numbers in that
row's clue cells; do the same down each column, writing the numbers above
it from top to bottom. The heavy lines every five squares make counting
easier. Use a plain square grid to lay out a kakuro, a word grid or any
puzzle of your own.

## Purpose

Scrap paper for solvers, a design sheet for puzzle setters, and a classroom
resource: teachers print sudoku blanks for logic lessons, crossword grids for
vocabulary projects where pupils write their own clues, and nonogram grids
for pixel-art pictures that become puzzles for a partner. In a book, a few
pages of blank grids at the back give readers room to set their own.

## History

The crossword began with Arthur Wynne's "word-cross" in the New York World in
1913, and the first crossword book was published by Simon & Schuster in
1924; American daily puzzles settled on a 15×15 grid with 180-degree
rotational symmetry, and weekend puzzles on 21×21 or larger. Sudoku was
first published in 1979 by Dell Magazines as "Number Place", probably
designed by Howard Garns, who added the nine 3×3 boxes to the older Latin
square; the Japanese publisher Nikoli named it Sudoku in the 1980s, and it
reached British newspapers through The Times in November 2004. Nonograms were
devised independently in 1987 by Non Ishida and Tetsuya Nishio in Japan; The
Sunday Telegraph began printing them weekly in 1990 and renamed them
"griddlers" after a readers' competition in 1998. Kakuro appeared in Dell
magazines as "Cross Sums" in the 1960s before becoming one of Japan's most
popular pencil puzzles.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape`; `margin_mm` (0–30, default 10); `kind` (sudoku9x9,
  sudoku6x6, sudoku4x4, crossword13, crossword15, crossword21, nonogram,
  blank); `per_page` (one, two, four, six; default four); `columns` and
  `rows` (2–40, default 10; nonogram and blank only); `clue_cells` (0–15,
  0 = half the line length rounded up, at most 10; nonogram only);
  `heavy_every` (0–10, default 5; nonogram only); `number_corners` and
  `symmetry_guides` (crossword only); `cell_mm` (0 = as large as fits, else
  3–30 mm); `ink` (default black); `weight` (0.1–2 pt thin lines; box lines
  and borders are 2.5×).
- **Generation:** for the number of grids asked for, every arrangement
  (across × down) is tried and the one giving the largest cell kept, with a
  10 mm gutter between grids. A page holds more than one grid only if its
  cells stay at least 5 mm (or the chosen `cell_mm`); otherwise it drops to
  four, two or one grid and records `requested_per_page`. The cell is the
  fitted size rounded down to a whole 0.5 mm (0.1 mm below 1 mm), and the
  block of grids is centred in the content box. Nonogram column lines run
  up through the top clue margin and row lines through the left one, with
  faint lines between the clue cells; heavy lines use square ends and the
  border's outer corners are filled square.
- **Solving:** nothing to solve — blank grids to write on. The seed is
  unused: every seed gives the same sheet.
- **Guarantees:** every cell is square and exactly `cell_mm` (a multiple of
  0.5 mm, recorded in the meta with `cell_exact: true`); sudoku boxes tile
  the grid; grids never come closer than the gutter; a single grid is as
  large as fits to the half-millimetre; and all ink — heavy strokes
  included — stays inside the margins, checked on every page size,
  orientation, kind and grid count. A knob outside its range is clamped and
  the request recorded as `requested_<field>` in the meta.

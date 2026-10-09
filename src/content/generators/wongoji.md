---
title: "Wongoji"
blurb: "Wongoji — Korean manuscript paper: rows of square cells written left to right, 200- and 400-character sheets with character counts"
category: paper
version: "1.0.0"
---
Korean manuscript paper — rows of square cells written left to right, on
the 400- and 200-character sheets, with the running character count along
the edge.

## What it is

Wongoji ("manuscript paper") is the squared paper Korean compositions and
essays are written on. Unlike Japanese manuscript paper it is written
**horizontally**: left to right along each row of square cells, rows from
top to bottom. A narrow blank strip separates one row from the next, for
corrections and editing marks.

The cells set the rules of writing on it: one syllable block per cell, one
punctuation mark per cell, a capital letter per cell, and two digits or two
small letters to a cell. Spaces between words are empty cells, and a new
paragraph starts one cell in. Because every character takes a cell, the
length of a text is simply the number of cells used: the **400-character**
sheet (20 rows of 20) and the **200-character** sheet (10 rows of 20, often
printed sideways) are the common sizes, and a 100-character sheet with
large cells (10 rows of 10) suits young children. Running totals beside
every fifth row (100, 200, 300 …) and small ticks above every fifth column
make the count easy to read off.

## How to use it

Print at actual size ("Actual size" or "100%", not "Fit to page").

Write left to right, one Korean syllable in each square. Put the title in
the first row, centred, and your name on the next row, ending a couple of
squares from the right; leave a row empty and begin the text. Start every
paragraph in the second square of a row. Leave one empty square between
words. Give each punctuation mark its own square; after a question mark or
exclamation mark leave a square empty. Write numbers and lowercase letters
two to a square, and capitals one to a square. If a word ends at the end of
a row, do not leave the first square of the next row empty — begin it
straight away. The numbers at the right edge count the squares up to the
end of that row.

## Purpose

Korean school compositions, diaries and essay contests; university
entrance essays (nonsul) and the writing paper of the TOPIK test of Korean
as a foreign language, which sets its answers in manuscript squares; and
anyone learning to write Korean neatly and to measure a text's length in
characters. In a book, the pages make a Korean composition notebook.

## History

Squared manuscript paper came to Korea from Japan, where the 400-character
genko yoshi sheet had become the standard unit of writing in the Meiji
period, and it was long written vertically like its Japanese model. As
Korean writing moved to horizontal lines in the second half of the 20th
century, manuscript paper turned to rows read left to right. Korea's
punctuation rules of 1988 were drawn up for a world of writing on
manuscript paper, and the 200- and 400-character sheets remain the paper of
school compositions and essay contests.

## This implementation

- **Spec knobs:** `page` (default a4) and `landscape`; `margin_mm` (0–30,
  default 10); `layout` ("20x20" — 400 characters, "20x10" — 200,
  "10x10" — 100; cells per row × rows; default "20x20"); `row_gap_pct`,
  the blank strip between rows as a share of the cell (0–60, default 30);
  `counts` (on) — running totals beside every fifth row and ticks above
  every fifth column; `footer` (on) — the sheet size under the grid;
  `header` (off) — "TITLE" and "NAME" lines above the grid; `ink` (default
  green) and `weight` (0.1–2 pt, default 0.5; the frame is twice as
  heavy); `centre_guide` (off), a faint dashed cross in every cell.
- **Generation:** room is set aside for the header, ticks, counts and
  footer; the cell is then the largest, rounded down to a whole 0.1 mm, for
  which all the rows and strips fit, and the grid is centred in what is
  left. Rows of cells are separated by blank strips bounded by the frame;
  the counts are set just right of the frame, centred on their rows, and
  the footer under its right-hand corner.
- **Solving:** nothing to solve — a page to write on. The seed is unused:
  every seed gives the same sheet.
- **Guarantees:** exactly the layout's number of cells (400, 200 or 100),
  every one square and the same size, rows exactly one cell plus one strip
  apart; every label inside the margins and clear of the grid; all ink
  inside the margins on every page size and orientation. A knob outside its
  range is clamped and recorded as `requested_<field>` in the meta.

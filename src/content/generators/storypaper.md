---
title: "Story Paper"
blurb: "Story paper — primary journal pages: a picture box above primary handwriting rows (dashed midline, red baseline), kindergarten to grade 2 sizes"
category: paper
version: "1.0.0"
---
Primary journal paper — a box for a picture above big handwriting rows with
a dashed midline and a red baseline, at the sizes used from pre-kindergarten
to grade 2.

## What it is

Story paper (also called primary journal paper or picture-story paper) is
the page young children write and draw their first stories on: the top
part of the sheet is an empty box for a picture, and the bottom part is
primary handwriting rows. Each row has three lines:

- a solid **top line**, which capitals and tall letters reach;
- a dashed **midline** halfway down, the top of small letters;
- a solid **baseline**, printed in red, which every letter sits on.

Below each baseline a blank **skip space** leaves room for the tails of
g, j, p, q and y before the next row. The writing space shrinks as children
grow: handwriting programmes in the United States use about ¾ in in
kindergarten, ⅝ in in grade 1 and ½ in in grade 2, with a skip space half
the row; 1 in rows suit pre-kindergarten. A "NAME ____ DATE ____" header,
a title row and a picture box beside the writing on a sideways sheet are
options.

## How to use it

Print at actual size ("Actual size" or "100%", not "Fit to page").

Write your name and the date at the top. Draw a picture of your story in
the box, then write about it on the rows below. Sit every letter on the
red baseline; small letters reach up to the dashed midline, and tall
letters and capitals reach the top line. Tails of g, j, p, q and y hang
down into the space below the red line. Use the biggest rows for the
youngest writers and move to smaller ones as letters become steady.

## Purpose

Kindergarten to grade 2 journals, writing workshop and "draw and tell"
stories, retelling a book, science observations and reading responses — any
task where a child draws first and then writes. In a book, story pages make
a child's journal or a picture-story notebook.

## History

Primary ruled paper with a dashed midline between two solid lines became
standard in American primary classrooms in the 20th century, alongside the
handwriting programmes (Zaner-Bloser, and later D'Nealian) that set their
own letter heights for each grade and used a red baseline in the early
grades. Story paper puts a blank picture space above that ruling; it grew
with process writing and journal writing in the early grades, where young
children are encouraged to tell a story through a drawing and a sentence
or two before they can write at length.

## This implementation

- **Spec knobs:** `page` (default letter) and `landscape`; `margin_mm`
  (0–30, default 10); `picture` (top, side, none; default top);
  `picture_pct`, the picture's share of the page below the header — height
  on top, width at the side (20–70 %, default 40); `row`, top line to
  baseline (one_inch, three_quarter_inch, five_eighths_inch, half_inch;
  default three_quarter_inch); `skip_pct`, the skip space below each row
  as a share of the row (0–100 %, default 50); `header` (on), `title_line`
  (off) and `midline` (on); `ink` (default blue), `baseline_ink` (default
  red) and `weight` (0.1–2 pt, default 0.6; the baseline is 1.5× and the
  picture box 2× heavier).
- **Generation:** the header words sit just inside the top margin with a
  writing line after each; a title row follows when asked. With the picture
  on top, the box takes exactly its share of the rest of the page and the
  rows follow 5 mm below it at an exact pitch (row + skip); if not even one
  row would fit, the box gives way (`picture_shrunk`), and a box that would
  be under 10 mm tall is left out (`picture_dropped`). At the side the box runs down the left and
  the rows fill the right; with no picture the rows run from the top.
- **Solving:** nothing to solve — a page to write on. The seed is unused:
  every seed gives the same sheet.
- **Guarantees:** every row is exactly its size with the midline exactly
  halfway and rows exactly one pitch apart (checked to 1e-9 pt on every
  page size, orientation, picture position and row size); the picture box
  takes exactly its asked share and never touches the writing; all ink, the header words included, stays
  inside the margins. A knob outside its range is clamped and recorded as
  `requested_<field>` in the meta.

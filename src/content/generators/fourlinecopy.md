---
title: "Four-Line Copy"
blurb: "Four-line copy — the Indian school English copybook: rows of four red and blue lines, three equal zones, a gap and a margin line"
category: paper
version: "1.0.0"
---
The Indian school English copybook — rows of four red and blue lines that
show where every part of a letter goes — with the two- and three-line copies
as options.

## What it is

The "four-line" notebook is how children in Indian schools learn to write
English. Every writing row is four ruled lines dividing it into three
zones, and a blank gap separates one row from the next. The lines are
printed in two colours: on most copies the outer pair (the top and bottom
lines) is red and the inner pair blue, on others the colours are swapped,
so both inks can be set.

- Small letters (a, c, e, m, o …) fill the **middle zone**, between the two
  inner lines.
- Tall letters (b, d, h, k, l) and capitals reach up into the **top zone**,
  to the top line.
- Tails (g, j, p, q, y) drop into the **bottom zone**, to the bottom line;
  f in cursive spans all three zones.

The **three-line copy** drops the bottom line, and the **two-line copy**
keeps only the inner pair, bounding the small letters, for children whose
letter heights have become steady. A vertical margin line runs down the
left, as in every school exercise book.

## How to use it

Print at actual size ("Actual size" or "100%", not "Fit to page").

Start each line of writing just right of the margin line. Sit every letter
on the lower of the two inner lines. Keep small letters between the inner
pair; stretch tall letters and capitals up to the top line; drop tails
down to the bottom line. Leave the blank gap between rows empty. Write a
model word at the start of a row and copy it along the row; move to the
three-line and then the two-line copy as letters become even.

## Purpose

English handwriting practice in nursery, kindergarten and the first years
of primary school, for print and for cursive, and for anyone who wants to
tidy their hand. Teachers set copy-writing ("copy work") on these pages
daily; parents print them for practice at home. In a book they make a
handwriting workbook.

## History

Ruled guide lines for letter heights go back to the copybooks of
19th-century handwriting teaching, which ruled lines for the heights of
short and tall letters. In India the four-line notebook, sold as the "four
line" or "red and blue line" copy in small and large sizes with or without
a gap between rows, became the standard first English exercise book of
school children, alongside two-line and single-line copies for older
classes and separate rulings for Hindi.

## This implementation

- **Spec knobs:** `page` (default a4) and `landscape`; `margin_mm` (0–30,
  default 10); `copy` (four_line, three_line, two_line; default four_line);
  `zone_mm`, the middle zone (3–15 mm, default 5); `outer_pct`, the top and
  bottom zones as a share of the middle zone (50–150 %, default 100 —
  three equal zones); `gap_mm` between rows (0–30, default 10);
  `outer_ink` (default red) and `inner_ink` (default blue); `weight`
  (0.1–2 pt, default 0.5); `margin_line` (on) and `margin_line_mm` from the
  left edge of the ruling (10–60, default 20; drawn in the outer ink).
- **Generation:** a row is the copy's lines at offsets top zone, middle
  zone and bottom zone apart; as many whole rows as fit are laid at an
  exact pitch (row + gap) and centred down the page, running the full width
  of the content box through the margin line.
- **Solving:** nothing to solve — a page to write on. The seed is unused:
  every seed gives the same sheet.
- **Guarantees:** every row has exactly its copy's number of lines, the
  inner pair exactly the middle zone apart and the outer zones exactly their
  asked height (checked to 1e-9 pt on every page size, orientation and
  copy); rows are centred; all ink stays inside the margins. A knob outside
  its range is clamped and recorded as `requested_<field>` in the meta.

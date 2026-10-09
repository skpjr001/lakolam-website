---
title: "Penmanship Paper"
blurb: "Penmanship paper — four-line handwriting rows with a dashed midline, 6 mm to 18 mm x-height"
category: paper
version: "1.0.0"
---
Four-line handwriting practice paper — top line, dashed midline, baseline and
descender line — at the sizes classrooms use, from pre-school to fluent
writers.

## What it is

Writing rows ruled to show where every part of a letter goes. Each row has
four lines:

- the **top line**, which tall letters (b, d, h, k, l) and capitals reach;
- the **dashed midline**, the top of small letters (a, c, e, m, o …);
- the **baseline**, drawn heavier, which every letter sits on;
- the lighter **descender line**, which tails (g, j, p, q, y) reach down to.

The space between midline and baseline is the *x-height*: 18 mm or 14 mm for
pre-school and kindergarten, ½ inch for the classic US kindergarten pad,
10 mm for beginners, 8 mm and 6 mm as handwriting becomes fluent. The
ascender and descender zones are set as a share of the x-height, and a
blank gap separates one row from the next.

## How to use it

Print at actual size ("Actual size" or "100%", not "Fit to page").

Sit every letter on the heavy baseline. Small letters fill the space up to
the dashed midline; tall letters and capitals stretch to the top line;
tails drop below the baseline toward the descender line. Start with the
biggest ruling and move to a smaller one as letters become even and
confident. Write a model letter at the start of a row, then copy it along
the row.

## Purpose

Handwriting practice for children learning print or cursive, for older
pupils and adults improving their hand, and for occupational therapy.
Teachers print class sets at the ruling their year group uses; in a book,
penmanship pages make a handwriting workbook or the practice pages beside
copywork.

## History

Ruled guide lines for letter height are as old as formal handwriting
teaching: 19th-century copybooks ruled lines to show the height of short
and tall letters. Primary-school writing paper with a dotted or dashed
midline between two solid lines became standard in American classrooms in
the 20th century, with handwriting programmes publishing their own rulings
for each grade and the line spacing shrinking year by year as children's
writing grows smaller and steadier.

## This implementation

- **Spec knobs:** `page` and `landscape`; `margin_mm` (0–30, default 10);
  `x_height` (mm6, mm8, mm10, half_inch, mm14, mm18; default mm10);
  `ascender_pct` (25–150 % of the x-height, default 100) and
  `descender_pct` (20–100 %, default 50); `gap_mm` between rows (0–30,
  default 5); `ink` (default blue) and `weight` (0.1–2 pt, default 0.5);
  `midline` (on).
- **Generation:** a row is ascender + x-height + descender; as many whole
  rows as fit are laid at an exact pitch (row + gap) and centred down the
  page. The baseline is 1.5× the weight, the midline is dashed in a lighter
  tint, and the descender line is a lighter tint drawn beneath the others,
  so with no gap the next row's top line shows over it.
- **Solving:** nothing to solve — a page to write on. The seed is unused:
  every seed gives the same sheet.
- **Guarantees:** every zone is exactly its asked height and every row the
  same (checked to 1e-9 pt on every page size, orientation and x-height),
  the rows are centred, and all ink stays inside the margins. A knob outside
  its range is clamped and recorded as `requested_<field>` in the meta.

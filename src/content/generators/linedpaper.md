---
title: "Lined Paper"
blurb: "Lined paper — notebook ruling at US narrow, college and wide or metric 5-11 mm, with a red margin line"
category: paper
version: "1.0.0"
---
Notebook paper ruled at the real standards — US narrow, college and wide
rule or metric 5 to 11 mm — with a red margin line and space for a heading.

## What it is

A sheet of evenly spaced horizontal rules, the paper of school notebooks and
loose-leaf binders. It comes in the rulings paper is actually sold in:

- **US rulings** — narrow rule ¼ in (6.35 mm), college (medium) rule 9/32 in
  (7.14 mm), wide (legal) rule 11/32 in (8.73 mm), and ⅜ in.
- **Metric rulings** — 5, 6, 7, 8, 9 and 11 mm. 8 mm is the common adult
  ruling in Britain and much of Europe; Japanese notebooks use 7 mm ("A"),
  6 mm ("B") and 5 mm ("C").

A **red margin line** runs down the left side — 1¼ in from the edge of the
page on US notebook paper — and a blank **header band** above the first rule
leaves room for a name, date and title.

## How to use it

Print the page at actual size ("Actual size" or "100%" in the print dialog,
never "Fit to page") so the ruling measures what it says.

Write on the rules, keeping notes and corrections to the right of the red
line; the margin is for headings, question numbers and a teacher's marks.
Put your name and the date in the space at the top. Choose wide rule or
11 mm for young writers and large handwriting, college rule for everyday
notes, and narrow rule or 5–6 mm when you want more lines on the page.

## Purpose

Everyday writing paper for schoolwork, essays, letters, journals and
meeting notes. Teachers print class sets in the ruling their pupils use;
in a book, lined pages make a notebook, journal or the writing pages of a
workbook.

## History

Paper was ruled by hand with a straightedge, or scored with a stylus, until
ruling machines arrived: the English inventor John Tetlow patented a
"machine for ruling paper for music and other purposes" in 1770, and the
American William Orville Hickok built an improved ruling machine in the
mid-19th century. In the United States the rulings settled into the
familiar fractions of an inch — wide rule for younger pupils, college rule
for older students — printed in light blue with a red margin line, while
Europe adopted metric rulings and its own school standards such as
Germany's DIN 16552 for handwriting lines.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape`; `margin_mm` (0–30, default 10); `ruling` (narrow, college,
  wide, three_eighths_inch, mm5, mm6, mm7, mm8, mm9, mm11; default college);
  `ink` (default light_blue) and `weight` (0.1–2 pt, default 0.5);
  `margin_line` (on), `margin_line_mm` (10–80 mm from the left edge of the
  page, default 31.75 = 1¼ in) and `margin_ink` (default red); `header_mm`
  (0–80, default 15).
- **Generation:** the first rule sits `header_mm` below the top margin and
  the rest follow at `first + k × ruling` down to the bottom margin — never
  stretched to fill the page. Rules run the full width of the content box;
  the margin line runs its full height at 1.5× the rule weight.
- **Solving:** nothing to solve — a page to write on. The seed is unused:
  every seed gives the same sheet.
- **Guarantees:** the ruling is exact (every gap equals the chosen ruling,
  checked to 1e-9 pt on every page size, orientation and ruling) and all
  ink, stroke widths included, stays inside the margins. A margin line asked
  for outside the content box is moved onto it, and a header too deep to
  leave two rules is reduced; like any knob outside its range, the request
  is recorded as `requested_<field>` in the meta.

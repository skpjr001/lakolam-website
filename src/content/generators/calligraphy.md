---
title: "Character Practice Grids"
blurb: "Character practice grids — Tian zi ge, Mi zi ge, nine-square and four-line English, 10 to 25 mm"
category: paper
version: "1.0.0"
---
Squared practice paper for Chinese characters — 田字格, 米字格 and 九宫格 —
plus the four-line, three-space ruling for English letters.

## What it is

Every character in Chinese (and Japanese kanji) is written to fill the same
square, so learners practise in grids whose guide lines show the character's
balance:

- **Tián zì gé (田字格)** — each square crossed by dashed horizontal and
  vertical centre lines, like the character 田;
- **Mǐ zì gé (米字格)** — the centre lines plus both diagonals, like 米,
  for slanting strokes;
- **Jiǔ gōng gé (九宫格)** — each square cut into a 3 × 3 "nine-palace"
  grid;
- **Plain squares** with no guides;
- **Four lines, three spaces (四线三格)** — the ruling Chinese schools use
  for English letters: the middle space holds the small letters, the third
  line is the baseline.

Squares come in 10, 12, 15, 18, 20 and 25 mm.

## How to use it

Print at actual size ("Actual size" or "100%", not "Fit to page").

Write one character in each square, centred on the crossing of the guides.
Use the centre lines to balance left and right, top and bottom; use the
diagonals or the nine-square grid to place slanting strokes and corners.
Copy a model character into the first square of a row and repeat it along
the row. Beginners and young children start with large squares and move
down as their writing steadies. On the English ruling, sit letters on the
heavy third line: small letters fill the middle space, tall letters reach
the top line and tails drop to the bottom line.

## Purpose

Writing practice for learners of Chinese and Japanese, from primary-school
pupils to adult students, and brush or pen calligraphy practice. In a book,
practice grids make a character workbook alongside vocabulary lists.

## History

Squared guides for copying characters have a long history in Chinese
calligraphy teaching: the nine-palace grid is traditionally credited to the
Tang-dynasty calligrapher Ouyang Xun, and later teachers simplified it to
the 米 and 田 grids. The tián zì gé exercise book is now the standard
first writing book of Chinese primary schools, and the four-line,
three-space ruling is used there when pupils start writing English.

## This implementation

- **Spec knobs:** `page` and `landscape`; `margin_mm` (0–30, default 10);
  `style` (tian, mi, jiu_gong, plain, english; default tian); `cell` (mm10,
  mm12, mm15, mm18, mm20, mm25; default mm15); `border_ink` (default
  charcoal) and `guide_ink` (default pale_gray); `weight` (0.1–2 pt,
  default 0.6; guides at half of it).
- **Generation:** as many whole squares as fit are laid at exactly the cell
  size and centred in the content box; each square's guides are dashed
  segments on its exact halves, thirds or diagonals, dashed symmetrically
  within the square. The English ruling stacks four-line groups one cell
  tall, each line a third of a cell apart, with a one-space gap between
  groups.
- **Solving:** nothing to solve — a page to write on. The seed is unused:
  every seed gives the same sheet.
- **Guarantees:** squares (and group pitch) are exact, checked to 1e-9 pt on
  every page size, orientation, style and cell size; guides sit exactly on
  their fractions of each square; all ink stays inside the margins. A knob
  outside its range is clamped and recorded as `requested_<field>` in the
  meta.

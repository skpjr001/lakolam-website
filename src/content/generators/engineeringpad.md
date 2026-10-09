---
title: "Engineering Pad"
blurb: "Engineering computation paper — fine green grid in whole major blocks under a title block"
category: paper
version: "1.0.0"
---
Engineering computation paper — a fine green grid in whole major blocks,
under a title block for project, author, date, checker and sheet number.

## What it is

The calculation sheet of engineering offices and engineering schools: a
fine grid of small squares with a heavier line every few squares, so each
heavy block is a whole number of small ones. The rulings are the ones pads
are sold in:

- **Metric** — 1 mm or 2 mm squares (the usual metric pad) or 5 mm, with a
  heavy line every 4, 5 or 10 squares (2 mm × 5 gives 1 cm blocks).
- **Inch** — 0.1 inch (ten to the inch) or 0.2 inch (five to the inch, the
  classic American "engineer's computation pad"), with a heavy line every
  inch when the subdivision is 10 or 5.

Across the top is a **title block**: a full block has boxes for project,
by, date, subject, checked and "sheet … of …"; a simple one has name, date
and page; or it can be left off for a grid from edge to edge. The grid is
always whole blocks, centred on the sheet. Inks are the traditional
engineering green, grey, sepia, tan and blueprint blue.

## How to use it

Print at actual size ("Actual size" or "100%" in the print dialog) so the
squares measure true.

Fill in the title block first: the project, your initials under "by", the
date, and the sheet number — "sheet 3 of 7" — so a stack of calculations
stays in order and a reviewer can initial "checked". Work down the page one
step per line: write the formula, then the numbers, then the result with
its units, and box the answer. Use the small squares to keep columns of
figures aligned and the heavy blocks as a scale for sketches — for example
one block to 1 m, or one inch to 1 ft.

## Purpose

Hand calculations and design notes in civil, mechanical and electrical
engineering, where every sheet of a calculation is filed, numbered and
checked; sketches of free-body diagrams, sections and circuits at a rough
scale; and coursework in engineering and physics, where many instructors
require homework on engineering paper. In a book, these sheets make an
engineering notebook or a calculation log.

## History

Commercial engineering computation pads — light green tinted paper with a
green grid of fifth-inch squares and a ruled heading — have long been a
staple of US engineering offices and schools. On the classic pad the grid
is printed on the back of each sheet and shows faintly through, leaving the
front clean apart from the heading and margin; this page prints the grid on
the front, which is what a home or office printer can do. Metric pads use
the same idea with millimetre rulings.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape`; `margin_mm` (0–30, default 10); `minor` (mm1, mm2,
  tenth_inch, mm5, fifth_inch; default mm2); `subdivisions` small squares
  per block (2–10, default 5); `ink` (default engineering_green; gray,
  sepia, tan and blueprint_blue are the traditional alternatives);
  `minor_weight` in points (0.05–1, default 0.15; major lines and the
  border are three times as heavy and a shade darker); `header` (full,
  simple, none).
- **Generation:** the content box takes as many whole blocks across as fit;
  the title block's rows are each the smallest whole number of small
  squares at least 7 mm tall; whole blocks fill the height below it; the
  lot is centred. The block's field dividers fall on major lines (minor
  lines on the narrowest sheets), and each field carries a small caption in
  its top-left corner.
- **Solving:** nothing to solve — a page to calculate on. The seed is
  unused: every seed gives the same sheet.
- **Guarantees:** the spacing is exact (every gap equals the chosen square,
  to 1e-9 pt), the grid is whole blocks only, the title block sits on the
  grid and is exactly as wide, every caption lies inside its own field
  clear of the others, and all ink stays inside the margins — checked on
  every page size, orientation, ruling, subdivision, header and margin
  extreme. A knob outside its range is clamped and the request recorded as
  `requested_<field>` in the meta.

---
title: "Dot Grid Paper"
blurb: "Dot grid paper — bullet-journal dots at exact 3 mm to ½ inch spacing, in three dot sizes"
category: paper
version: "1.0.0"
---
Bullet-journal dot paper at exact spacing — light dots 3 mm to ½ inch
apart, in three dot sizes and any ink.

## What it is

A sheet printed with a square lattice of small round dots instead of
lines. The dots mark where grid lines would cross, so the page works as
graph paper when you want it to and as a blank page when you don't. It
comes in the spacings people use:

- **Metric** — 3 mm (fine), 5 mm (the common notebook and bullet-journal
  pitch), 7 mm (roomy, close to wide-ruled lines) and 1 cm.
- **Imperial** — ¼ inch and ½ inch.

Dots come small (0.3 mm), medium (0.5 mm) or large (0.8 mm), in light grey,
dark grey, light blue, black or another ink.

## How to use it

Print the page at actual size: in the print dialog choose "Actual size" or
"100%", never "Fit to page", and dots 5 mm apart measure exactly 5 mm.

Write on every dot row as if it were lined paper, or every other row for
bigger handwriting. Join dots with a ruler for boxes, tables, calendars and
habit trackers; sketch freehand and let the dots keep your shapes square;
count dots to scale a floor plan or a chart. Light grey dots fade into the
background once the page is full; choose large or dark dots if you will
photocopy the page.

## Purpose

The page of bullet journals, planners and sketch notes, and a cleaner
alternative to graph paper for designers, engineers and students who want
alignment without lines competing with their own. In a book, dot grid
sections make a dotted notebook or journal.

## History

Dotted pages became a mainstream notebook ruling in the 2010s with the
rise of bullet journaling: Ryder Carroll's Bullet Journal method is built
around dot-grid pages, and its official notebook, made with the German
notebook maker Leuchtturm1917, is printed in dot grid only. The ruling
spread from there to planners, sketchbooks and printable paper sites.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape`; `margin_mm` (0–30, default 10); `spacing` (mm3, mm5, mm7,
  cm1, quarter_inch, half_inch; default mm5); `dot_size` (small 0.3 mm,
  medium 0.5 mm, large 0.8 mm); `ink` (one of the named paper colours;
  default light_gray).
- **Generation:** the dots sit at `start + k × spacing` across and down —
  as many as fit in the content box less one dot radius, never stretched to
  fill it — and the lattice is centred, the leftover split evenly between
  opposite sides. Every dot is a filled disc of the exact diameter, and all
  dots are one path, so even a 3 mm A3 page stays small.
- **Solving:** nothing to solve — a page to write and draw on. The seed is
  unused: every seed gives the same sheet.
- **Guarantees:** the spacing is exact (every gap equals the chosen pitch,
  checked to 1e-9 pt on every page size, orientation, spacing and dot
  size), the lattice is centred, and every dot — its whole disc — lies
  inside the margins. A margin outside its range is clamped and the request
  recorded as `requested_margin_mm` in the meta.

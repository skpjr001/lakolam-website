---
title: "Diamond Grid"
blurb: "Diamond grid paper — a square grid turned 45°, at an exact 5 mm to 20 mm diamond diagonal"
category: paper
version: "1.0.0"
---
Diamond grid paper — a square grid turned 45° so every cell stands on its
point, at an exact 5 mm to 20 mm diamond.

## What it is

Two sets of evenly spaced parallel lines, one running down to the right and
one down to the left, crossing at right angles. Every cell is a square
standing on its corner — a diamond. The size is given as the diamond's
**diagonal**, its width measured across from point to point: a 10 mm diamond
is 10 mm wide and 10 mm tall, and each of its sides is 10 ÷ √2 ≈ 7.07 mm.

Sizes are 5, 7, 10, 15 and 20 mm and ½ inch. The ruled area is a whole number
of diamonds across and down, so the diamonds along its edges are cut exactly
in half, and a thin frame closes them.

## How to use it

Print at actual size ("Actual size" or "100%" in the print dialog, never "Fit
to page") and every diamond measures what it says.

Colour diamonds in to plan argyle knitting and socks, harlequin and lattice
patterns, quilt borders and diagonal tile layouts. Draw along the lines for
pixel art at 45°, or use the points as a guide for chevrons and zigzags: each
row of points is exactly half a diamond from the next. Turned through a
quarter turn the page is the same, so it works in either orientation.

## Purpose

Pattern planning for knitters, quilters, tilers and designers who work on the
diagonal, and a geometry page for exploring squares, rotations and the
diagonal √2. In a book it makes a pattern-design notebook.

## History

The diamond lattice is the square grid seen corner-on, and it runs through
decorative art: diamond-paned leaded windows, harlequin costume, chequered
floors laid on the diagonal, and argyle — the diamond pattern that grew out
of the tartan of the Campbells of Argyll in Scotland and became the classic
knitted sock and sweater pattern. Paper ruled on the diagonal lets designers
plan such patterns cell by cell without turning ordinary graph paper on its
corner.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape`; `margin_mm` (0–30, default 10); `diagonal` (mm5, mm7, mm10,
  mm15, mm20, half_inch); `ink` (gray by default, or light_blue, lavender,
  dark_gray and every other named paper colour); `weight` in points (0.1–2);
  `border` (frame the ruled field, default on).
- **Generation:** the field is the largest whole number of diagonals that fits
  each way, centred in the content box, so its corners are diamond points.
  The lines are `x − y = c` and `x + y = c` with `c` stepping by exactly one
  diagonal from the corner, cut to the field. Every line starts and ends on a
  diamond point, so the edge diamonds are exact halves.
- **Solving:** nothing to solve — a page to draw on. The seed is unused: every
  seed gives the same sheet.
- **Guarantees:** the diagonal is exact (parallel lines are exactly one side,
  diagonal ÷ √2, apart; every line runs at exactly 45° and ends on a diamond
  point — checked on every page size, orientation and diamond size), the field
  is whole diagonals centred in the content box, and all ink, stroke widths
  included, stays inside the margins. A knob outside its range is clamped and
  the request recorded as `requested_<field>` in the meta.

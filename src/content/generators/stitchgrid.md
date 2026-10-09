---
title: "Cross-Stitch Chart Paper"
blurb: "Cross-stitch chart paper — blank Aida grids at the true 7- to 22-count stitch size, bold every 10, numbered"
category: paper
version: "1.0.0"
---
Blank cross-stitch chart paper — one square per stitch at the true size for
your Aida, with a heavy line every 10 stitches, count numbers and centre
arrows.

## What it is

A grid for designing counted cross-stitch, sized to the fabric. Aida cloth is
sold by its **count**, the number of stitches to the inch, so each square here
is one inch divided by the count: 2.54 mm on 10-count, 1.81 mm on 14-count
(the most popular), 1.41 mm on 18-count. A design drawn on this paper is the
size it will be when stitched. Counts 7, 10, 11, 12, 14, 16, 18, 20 and 22 are
offered.

As on a published chart, a heavy line marks every 10th (or 5th) stitch from
the top-left corner, the edge is framed, numbers along the top and left say
how many stitches each heavy line is from the corner, and small arrows on all
four sides point to the middle row and column.

## How to use it

Print at actual size ("Actual size" or "100%" in the print dialog, never "Fit
to page") so the squares match your fabric.

Each square is one cross stitch. Colour squares in, or mark them with a symbol
for each thread colour, and keep a key at the side. Count your design in
blocks of ten using the heavy lines. Most stitchers start in the middle: find
the centre of the fabric by folding it in four, and the arrows show the
matching middle of the chart. A square-for-square design here comes out the
same size on the cloth; on a different count, it will stitch larger or
smaller.

## Purpose

Design paper for cross-stitchers and embroiderers, for planning samplers,
lettering, borders and pixel-art motifs, and for children learning to count
and design. In a book it makes a pattern notebook for a stitcher.

## History

Counted-thread embroidery has been worked from squared patterns for two
centuries: Berlin wool work patterns, printed on grid paper and coloured by
hand, were published in Berlin early in the 19th century and spread across
Europe. Aida cloth, woven in blocks with an obvious hole at each corner so
every stitch is easy to place, was earlier sold as "Java canvas"; it took
the name Aida around the time of Verdi's opera. Charts kept the conventions
that make counting easy — a bold line every ten squares and arrows at the
centre — and this paper keeps them too.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape`; `margin_mm` (0–30, default 10); `count` (count7, count10,
  count11, count12, count14, count16, count18, count20, count22); `bold_every`
  (2–20 stitches, default 10); `ink` for the stitch grid (gray by default, or
  light_blue, tan …) and `bold_ink` for the heavy lines, frame, numbers and
  arrows (charcoal by default, or steel_blue, dark_red …); `weight` of the
  grid in points (0.1–2; heavy lines are three times it); `numbers` and
  `centre_marks` (both on by default).
- **Generation:** squares are exactly 25.4 / count mm. The grid is as many
  whole squares as fit in the content box after room is kept for the numbers
  (top and left) and arrows (all four sides), centred in what is left. Heavy
  lines fall every `bold_every` squares from the top-left corner, and the
  frame is heavy. Numbers stand at the heavy lines; on fine fabric with close
  heavy lines they are thinned (every 2nd, 3rd … heavy line) so none touch,
  and a number that would sit under a centre arrow is left out.
- **Solving:** nothing to solve — a page to design on. The seed is unused:
  every seed gives the same sheet.
- **Guarantees:** the square size is exact (n squares span exactly n / count
  inches, checked on every count, page size and orientation), heavy lines fall
  exactly every `bold_every` stitches from the corner, every number names the
  stitch count of its heavy line, numbers and arrows never overlap, and all
  ink — strokes, arrows and numbers — stays inside the margins. The meta
  gives the stitch counts and the finished design size in inches on that
  fabric. A knob outside its range is clamped and the request recorded as
  `requested_<field>`.

---
title: "Knitting Graph Paper"
blurb: "Knitter's graph paper — stitch-shaped cells at true gauge ratios, numbered from the bottom right"
category: paper
version: "1.0.0"
---
Knitter's graph paper — cells shaped like knitted stitches, at true gauge
ratios, numbered from the bottom right as a knitting chart is read.

## What it is

A knitted stitch is wider than it is tall: a typical worsted-weight fabric
has about 20 stitches but 28 rows to 10 cm. A motif drawn on square graph
paper therefore knits up squashed. Knitter's graph paper uses rectangular
cells in the fabric's own proportion, named as stitches to rows in the same
length:

- **4:5** — four stitches as wide as five rows are tall; the usual
  stocking-stitch proportion.
- **5:7** — worsted weight (20 stitches × 28 rows).
- **3:4** — DK weight (about 22 stitches × 30 rows).
- **2:3** — very short rows: thick yarn, or yarn held double.
- **1:1** — square cells, for charts drawn square.
- **Your own gauge** — enter the stitches and rows to 10 cm from your swatch.

Cells are 3, 4, 5, 7 or 10 mm wide (any width from 2 to 20 mm), with a
heavier line every 5 or 10 cells. Rows are numbered up the right-hand side
from 1 at the bottom, stitches along the bottom from 1 at the right.

## How to use it

Knit a swatch, count stitches and rows over 10 cm, and pick the ratio closest
to yours — or enter your own gauge. Then each cell is one stitch, and a motif
coloured on the page will have the same shape in the knitting.

Read the chart as you knit it: start at the bottom right corner with row 1.
In flat knitting, read right-side rows from right to left and wrong-side rows
from left to right; in the round, read every row from right to left. The
heavier lines, counted from the bottom right, help you keep your place. Use it
for Fair Isle and stranded colourwork, intarsia pictures, lace and cable
charts, and lettering on jumpers.

## Purpose

Design paper for knitters (and crocheters working tapestry or filet), from a
single motif to a full yoke. In a book it makes a knitting design journal.

## History

Charts came to knitting from needlework, where patterns had long been drawn
square by square on squared paper. Because knitted stitches are not square,
charts drawn on ordinary graph paper look right on the page but come out
squat in the fabric, and knitters' graph paper with proportional cells grew
up to fix this. Reading charts from the bottom right follows the way knitting
grows: the first row worked is at the bottom, and a right-side row is worked
from right to left.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape`; `margin_mm` (0–30, default 10); `ratio` ("1:1", "4:5", "2:3",
  "5:7", "3:4", "gauge"); `cell_width_mm` (2–20, default 5);
  `stitches_per_10cm` (5–60) and `rows_per_10cm` (5–80), used with
  `ratio: gauge`; `major_every` (0–20 cells, 0 for none); `ink` (light_gray
  by default, or rose, light_blue, dark_gray …); `weight` in points (0.1–2;
  major lines and the frame are twice it); `numbers` (on by default).
- **Generation:** a cell is `cell_width_mm` wide and width × stitches ÷ rows
  tall — 4:5 gives 5 × 4 mm cells. A measured gauge whose cell would be
  flatter than 0.4 or taller than 1.5 times its width is held to that range
  (`requested_cell_aspect` in the meta). The grid is as many whole cells as
  fit after room is kept for the numbers on the right and bottom; major lines
  count from the bottom right corner. Every row and stitch is numbered when
  the numbers fit their cells, otherwise every 2nd, 5th, 10th or 20th.
- **Solving:** nothing to solve — a page to chart on. The seed is unused:
  every seed gives the same sheet.
- **Guarantees:** cells are exactly the asked width and exactly width ×
  stitches ÷ rows tall (checked to 1e-9 pt on every page size, orientation and
  ratio), row *k* is numbered on the *k*-th band from the bottom and stitch
  *k* under the *k*-th column from the right, and all ink, numbers included,
  stays inside the margins. A knob outside its range is clamped and the
  request recorded as `requested_<field>` in the meta.

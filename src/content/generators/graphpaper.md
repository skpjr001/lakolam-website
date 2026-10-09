---
title: "Graph Paper"
blurb: "Graph paper — square grids at exact 1 mm to 1 inch spacing, with optional major lines"
category: paper
version: "1.0.0"
---
Square grid paper at exact spacing — 1 mm to 1 inch squares, in classic
green, light blue, grey or black, with an optional heavier line every few
squares.

## What it is

A sheet ruled into equal squares by evenly spaced horizontal and vertical
lines. It comes in the sizes people actually use:

- **Metric** — 1 mm and 2 mm for fine technical work, 5 mm (the European
  school and engineering standard) and 1 cm squares for young children.
- **Imperial** — ⅛ inch (eight to the inch), ¼ inch ("quad-ruled", the US
  school standard), ½ inch and 1 inch.

A **major line** — heavier and darker — can mark every 5 or 10 squares, so
counting and scaling a drawing is quick.

## How to use it

Print the page at actual size: in the print dialog choose "Actual size" or
"100%", never "Fit to page", and a 5 mm square measures exactly 5 mm.

Use one square for each unit when you plot a graph, draw a bar chart, sketch
a floor plan to scale, or lay out pixel art and knitting charts. Line up
columns of digits in sums and long division by writing one digit per square.
Light lines in blue or green keep your own pencil marks easy to read; turn on
major lines when you need to count squares quickly.

## Purpose

The everyday paper of maths class, science labs, engineering notebooks and
craft planning. Teachers print class sets for graphing and arithmetic,
students use quad-ruled sheets for algebra, and makers plan quilts, floor
plans and pixel art on it. In a book, graph paper sections make a graph-paper
notebook or a maths workbook companion.

## History

Squared paper for plotting appeared at the end of the 18th century: the
first commercially published coordinate paper is usually credited to a
Dr Buxton of England, who patented a sheet printed with a square grid in
1794, and by the mid-19th century engineers and statisticians were plotting
data on ruled grids. The light blue "non-photo"
ruling of 20th-century US school pads, and the green engineering sheets of
drafting offices, gave graph paper its familiar colours.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape`; `margin_mm` (0–30, default 10); `spacing` (mm1, mm2, mm5,
  cm1, eighth_inch, quarter_inch, half_inch, inch); `ink` (one of the named
  paper colours: light_blue, classic_green, gray, black, red and more);
  `weight` in points (0.1–2); `major_every` (0–20 squares, 0 for none).
- **Generation:** the lines sit at `start + k × spacing` — as many whole
  squares as fit in the content box, never stretched to fill it — and the
  grid is centred in the box, so the leftover is split evenly between the
  sides. Major lines count from the first line, are twice the weight and a
  darker shade of the ink. Every line of one weight and colour is one path,
  so even a 1 mm page stays small.
- **Solving:** nothing to solve — a page to write and draw on. The seed is
  unused: every seed gives the same sheet.
- **Guarantees:** the spacing is exact (every gap equals the chosen square
  side, checked to 1e-9 pt on every page size, orientation and spacing), the
  grid is whole squares centred in the content box, and all ink — stroke
  widths included — stays inside the margins. A knob outside its range is
  clamped and the request recorded as `requested_<field>` in the meta.

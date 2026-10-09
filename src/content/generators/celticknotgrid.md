---
title: "Celtic Knot Grid"
blurb: "Celtic knotwork construction paper — primary and secondary dots, 45° guides, optional triple grid and whole-cell panel frame"
category: paper
version: "1.0.0"
---
Blank construction paper for Celtic knotwork and key patterns — large
primary dots, small secondary dots at every cell centre, faint 45° guides
and a whole-cell panel frame, ready for the grid method of the Bains and
Aidan Meehan.

## What it is

A dot grid laid out the way knotwork designers build a panel by hand:

- **Primary dots** — large dots at the corners of a square grid. Their
  outline is the shape of the panel, and the knot's cords never pass
  through them.
- **Secondary dots** — smaller dots at the exact centre of every cell,
  in a second colour.
- **Diagonal guides** — faint lines at 45°: either *through the dots*
  (the diamond lattice used in many classroom methods) or *between the
  dots*, the plait lines of Iain Bain's method, which cross at the middle of
  every cell edge where the cords cross over and under; or both.
- **Triple grid** — optionally, the tertiary grid at half the cell
  spacing, with tiny dots at the middle of every cell edge. It is the finer
  scaffolding used for key patterns and detailed knots.
- **Panel frame** — a line along the outermost primary dots, so the panel
  is always a whole number of cells. The panel can fill the page or be set
  to an exact size, such as 4 by 3 cells.

## How to use it

Print the page at actual size ("Actual size" or "100%" in the print
dialog) so each cell measures what you chose.

Work in pencil. Decide where the knot's breaks go: draw short break lines
joining neighbouring dots of the same kind, across or down, never
diagonally and never crossing each other. Then follow the diagonal guides
to draw the cords as a plait: each cord runs at 45° between the dots and
bounces off the frame and off every break line. When the path is complete,
mark the crossings over, under, over, under all the way round, widen the
cords into bands, and ink the result. Rub out the dots and guides, or print
in a light colour and let them fade under the ink.

For key patterns (the straight-line spirals and steps of Celtic borders),
turn on the triple grid and draw along its lines and diagonals.

## Purpose

A ready-made construction grid saves the slow part of every knotwork
design: measuring and dotting the grid. It serves calligraphers,
illuminators, woodcarvers, tattoo and jewellery designers, and art
teachers running a lesson on Celtic design, where every pupil needs the
same accurate grid. In a book, it makes a knotwork practice section beside
finished knot designs.

## History

The interlace of Insular manuscripts such as the Book of Durrow, the Book
of Kells and the Lindisfarne Gospels was long thought impossible to
reconstruct: no description of how the scribes laid out their knots
survived. The Scottish art teacher George Bain studied the manuscripts and
stone carvings for decades and published a practical method of
construction in *Celtic Art: The Methods of Construction* (1951), built on
a grid of dots. His son Iain Bain simplified it into the "three-grid"
technique in *Celtic Knotwork* (1986): a primary grid of dots, a secondary
grid at the centres of its squares, and the tertiary grid that the two
make together, along whose diagonals the plait is drawn. Aidan Meehan,
who came upon the triple-grid method in 1974, taught it step by step in his
Celtic Design series from Thames and Hudson (from 1991), including
volumes on knotwork, key patterns and maze patterns. Andrew Glassner
described the same three-grid method for computer drawing in 1999.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape`; `margin_mm` (0–30, default 10); `cell_mm` (5–25, default 10);
  `columns` and `rows` (0–100 cells, 0 = as many as fit; a panel larger than
  the page is cut to what fits and the ask recorded); `dot_mm` (primary dot
  diameter 0.5–3, default 1.5; secondary dots are 60 % of it, tertiary 40 %);
  `secondary` (default on); `diagonals` (none, through_dots — default,
  cord_paths, both); `triple_grid` (default off); `border` (default on);
  `ink` (primary dots and frame, default red) and `secondary_ink` (secondary
  dots; the guides are a pale tint of it, default blue), after the red and
  blue dots of the published three-grid diagrams; `weight` (guide lines,
  0.1–2 pt; the frame is three times it).
- **Generation:** the primary lines sit at `start + k × cell`, as many whole
  cells as fit (or the number asked for), centred in the content box —
  never stretched. Secondary dots are the exact centres of the cells,
  tertiary dots the exact middles of the cell edges. In cell units with the
  first primary dot at (0, 0), the through-dot guides are the lines
  u + v = c and u − v = c for every whole c, which pass through every
  primary and secondary dot; the cord paths are the same lines for every c
  half-way between whole numbers, which pass through the edge middles and
  miss every dot. Each guide runs from panel edge to panel edge. One path
  per colour and weight keeps even a 5 mm A3 sheet small.
- **Solving:** nothing to solve — a page to design on. The seed is unused:
  every seed gives the same sheet.
- **Guarantees:** the cell spacing is exact (every gap equals the chosen
  cell, checked to 1e-9 pt on every page size, orientation, cell size and
  option), the panel is whole cells, every secondary dot is its cell's
  centre, every guide is at exactly 45° and on the right family of lines,
  and all ink — dot discs, frame and guide strokes included — stays inside
  the margins. A knob outside its range is clamped and the request recorded
  as `requested_<field>` in the meta.

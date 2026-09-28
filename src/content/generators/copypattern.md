---
title: "Copy and Symmetry"
blurb: "Copy and symmetry — copy a grid pattern, or complete its mirror or turn"
category: puzzle
version: "1.0.0"
---
Copy a pattern dot for dot, or finish it so both halves mirror each other —
or so it looks the same after a turn.

## What it is

A pattern drawn on a grid of dots — straight and slanted lines joining
neighbouring dots — or a picture of shaded squares on a square grid. There
are three kinds of page. **Copy** shows the pattern with an empty grid
beside it. **Mirror** shows half of the pattern and a dashed line (or two
dashed lines, with only a quarter shown). **Turn** shows half or a quarter of
the pattern around a marked centre dot. The shaded part of the grid is the
part already done.

## How to play

On a copy page, draw exactly the same pattern in the empty grid: count dots
across and down to find where each line starts and ends. On a mirror page,
draw the reflection on the other side of the dashed line, as if the line
were a mirror — a line one dot to the left of it becomes a line one dot to
the right, and slants lean the opposite way. With two dashed lines, reflect
the corner across both, so all four corners match. On a turn page, complete
the pattern so it looks the same when the page is turned upside down (a half
turn) or turned a quarter of the way round (every quarter turn), spinning
around the circled centre dot. Checking one line at a time, by counting
dots from the centre or the dashed line, keeps the copy exact.

## Purpose

Copying on a grid builds careful looking, counting and pencil control;
completing a reflection or a rotation is an early, hands-on introduction to
symmetry and to transformations taught in primary geometry. Dot-grid and
square-grid symmetry sheets are common in classrooms, workbooks and
occupational-therapy practice for visual-motor skills.

## History

Grid copying goes back to the drawing manuals of the Renaissance, where
artists enlarged pictures square by square. Mirror and rotation completion
worksheets became a classroom standard with the geometry of transformations
in twentieth-century primary curricula, and dot-grid "copy the picture"
exercises remain a staple of visual-perception and handwriting-readiness
books.

## This implementation

- **Spec knobs:** `difficulty`, `mode` (`copy`, `mirror`, `rotate`),
  `pattern` (`lines` between dots, or shaded `cells`), `axis` for mirror
  pages (`auto`, `vertical`, `horizontal`, `both`), `turns` for rotate pages
  (2 or 4; 0 picks from the difficulty), `size` (cells per side, even, 4-16;
  0 picks from the difficulty), `width` and `height` (the page, US Letter by
  default), `line`.
- **Generation:** a pattern element is a pair of lattice dots — a segment's
  ends or a cell's opposite corners — so one set of maps (reflections and
  quarter turns about the grid centre) transforms both kinds. A seed pattern
  is grown connected inside the part to be printed, starting on the axis or
  at the centre dot so the finished figure is one piece; straight lines are
  preferred to reach new dots, loops are allowed occasionally, and slants
  never cross inside a cell; cell patterns mostly avoid solid 2x2 blocks so
  they branch. The answer is the orbit of the seed under the symmetry, and
  the page prints exactly the part of that orbit inside the given region.
  The difficulty scales the grid (4 cells per side for Kids up to 12 for
  Expert), the number of lines or cells (a base of 5 lines or 4 cells for Kids up
  to 22 lines or 20 cells for Expert, scaled to the printed region), allows
  slanted lines from Medium, and picks the symmetry: a vertical mirror for
  Kids and Easy, vertical or horizontal for Medium and Hard, both axes for
  Expert; a half turn up to Medium and a quarter turn for Hard and Expert.
- **Solving:** there is nothing to deduce; the answer key draws the missing
  lines or cells (in grey) on the same grid.
- **Guarantees:** deterministic per seed. The key is exactly the transformed
  pattern: the tests rebuild the answer from the printed part with an
  independent statement of each symmetry and require equality, and check the
  answer is closed under the symmetry and that the printed part is precisely
  its intersection with the given region. The figure is connected, spans at
  least two dots each way, and on mirror and turn pages the reader has at
  least half as much to draw as is shown. Rated by grid size, element count,
  slanted lines and symmetry (`rating_basis`).

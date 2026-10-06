---
title: "Pattern Blocks"
blurb: "Pattern blocks — fill an outline with hexagons, trapezoids, rhombi and triangles, tally the blocks, and find the proven fewest"
category: maths
version: "1.0.0"
---
A picture made of blocks: colour it, count it, or cover it with the fewest
blocks you can.

## What it is

A pattern-block activity page for young children. A picture built from the
classic classroom blocks (yellow hexagons, red trapezoids, blue rhombi and
green triangles, or orange squares and thin tan rhombi) is drawn at the
real blocks' size whenever it fits, so a child can lay actual blocks on it.
A chart below lists each kind of block with room for tally marks and a
number. Younger pages show the lines between the blocks; older pages show
only the outline and set a challenge: cover it with a given number of
blocks, or find the fewest blocks that will do.

## How to play

- **Lines shown:** colour each block in its colour from the chart. Then
  count the hexagons, trapezoids, rhombi and triangles. Make a tally mark
  in the chart for each one, then write how many there are, and the total.
- **Only the outline:** cover the shape with pattern blocks, or draw lines
  to split it into block shapes. Count the blocks you used in the chart.
- **Goal number:** try to cover the shape with exactly that many blocks.
  Big blocks help: one hexagon covers as much as two trapezoids, three
  rhombi or six triangles.
- **Find the fewest:** cover the shape, then try again with fewer blocks.
  Write the smallest number you managed.

## Purpose

Pattern blocks are a staple of early geometry and number sense. Naming and
matching the shapes builds shape vocabulary; counting and tallying links
geometry to data; covering one shape with others (a hexagon is two
trapezoids, a trapezoid is three triangles) is a first, hands-on look at
fractions, area and equivalence. The fewest-blocks challenge adds planning
and checking. Suits ages four to seven, with the challenges for older
children.

## History

The blocks were designed in the 1960s for the Elementary Science Study, a
US curriculum project at the Education Development Center, and became one
of the most common classroom manipulatives. The set's lengths all match
(every side is one inch, the trapezoid's long side two) and its angles are
multiples of 30 degrees, so the pieces fit together edge to edge. They grew
out of a longer tradition of building materials for young children, from
Friedrich Froebel's kindergarten gifts in the 1830s onwards.

## This implementation

- **Spec knobs:** `difficulty` (Kids: about five blocks, lines shown; Easy:
  about nine, lines shown; Medium: outline only, cover it with the printed
  fewest number, small figure; Hard: the same on a larger figure; Expert:
  find the fewest yourself), `set` (`classic` — hexagon, trapezoid, blue
  rhombus, triangle; `squares` — square, thin rhombus, triangle; `all`),
  `task` (`auto`, `colour_count`, `fewest`, `find_fewest`), `actual_size`
  (1-inch sides when the figure fits), `colour` (colour chart and key, or
  greys), `width`, `height`.
- **Generation:** a figure grows from one block on a vertical axis. Each
  step lays a new block's unit edge against a free unit edge of the figure
  (turns in steps of 30 degrees) and adds its mirror image, so every figure
  is left-right symmetric, like the butterflies and rockets children build.
  A step is kept only if no blocks overlap, the figure stays inside the
  page's actual-size box, and its outline stays one simple loop — no holes,
  no blocks meeting only at a corner, no edges that half overlap.
- **Solving:** on the classic set every block is a set of unit triangles of
  the triangle lattice (a hexagon is the six round a lattice point, a
  trapezoid a triangle and two of its neighbours, a rhombus two neighbours).
  The fewest blocks is an exact cover with the fewest pieces, found by
  branch and bound: branch on the first uncovered triangle, cut when the
  blocks used plus a lower bound — the larger of a sixth of the triangles
  left and the gap between up and down triangles left — cannot beat the
  best tiling so far. The search starts from the built tiling and has a
  node budget of four million; a search that runs out is discarded, never
  reported as minimal.
- **Guarantees:** checked before a page is used and again in tests
  (`answers_checked: true`; `fewest_proven: true` and `fewest_blocks` on
  challenge pages). The blocks are real block shapes (side lengths and
  area), do not overlap, and fill exactly the printed outline, one simple
  loop. On colour-and-count pages the key's tally is the shown tiling's.
  On challenge pages the key shows a tiling with exactly the fewest number
  of blocks, and tests re-prove that number with an independent search
  (placements found by turning and moving block polygons over the lattice,
  then an iterative most-constrained-first search showing the number fits
  and one fewer does not). Any tiling with the fewest number is a right
  answer; the key shows one.
- **Honest bands:** the page is rated by what it asks (`rating_basis:
  task_and_figure_size`): colour-and-count is Kids up to six blocks, else
  Easy; the goal-number challenge is Medium up to 36 unit triangles, else
  Hard; find-the-fewest is Hard up to 36 triangles, else Expert. The square
  and thin rhombus do not fit the triangle lattice, so the `squares` and
  `all` sets make colour-and-count pages only; a harder request on them is
  served at Easy (or Kids), with `requested_difficulty` and
  `requested_task` in the meta.

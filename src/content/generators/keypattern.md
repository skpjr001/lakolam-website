---
title: "Celtic Key Pattern"
blurb: "Celtic key patterns — angular spirals on Bain's diagonal grid, and recursive Penmon keys"
category: design
version: "1.0.0"
---
Straight lines turning in angular spirals, the paths between them all one
width, running at 45 degrees across the panel: the key patterns of Insular
manuscripts and carved crosses.

## What it is

Key patterns are the third great family of Celtic ornament, beside knotwork
and spirals. Where knotwork weaves cords over and under, a key pattern is
flat: dark lines branch off long diagonals and wind inward in square-cornered
spirals, and the light paths between them keep the same width everywhere,
folding round each spiral and on along the diagonals. Each run of path
between two diagonals is one closed shape.

Two constructions are offered. The **spiral** key lays a grid of squares
over the panel and cuts most of them along a diagonal into triangles; each
triangle (or uncut square) holds a spiral that hangs from one of its lines.
The **Penmon** key repeats one rule at smaller and smaller scales: every
line sprouts a short spur from its middle, which splits its triangle into two
halves turned 45 degrees, and the halves do the same, two to four times over,
before the smallest triangles take their spirals.

## How to use it

The manuscript-coloured page is ready to frame or print as a card. For
colouring, choose the line-art version: every path is its own closed region,
and mirror-image paths make a scheme easy to echo across the panel. The
classic look gives each path one colour (red, yellow, green, purple on a
cream ground) so that neighbouring paths always differ. Bands make borders
for pages and notebooks; the frame leaves an open centre for writing or a
picture; the cross shape is the arm of a carved high cross. Any pocket too
small to colour comfortably is inked in solid black.

## Purpose

The key-pattern member of the design lane, distinct from the Celtic plait
(cords that cross over and under) and the Greek-key border (one meander line
on a straight band). It gives colourists a geometric, constant-width maze of
paths with the authority of the real tradition: lines at 0, 45 and 90
degrees only, spirals that step in by exactly one path at each turn, and
symmetry across the panel.

## History

Key patterns appear in Insular art of the 7th to 10th centuries — the Book
of Durrow, the Lindisfarne Gospels, the Book of Kells — and on the carved
stone crosses of Ireland, Scotland, Wales and Northumbria, among them the
cross at Penmon Priory on Anglesey. J. Romilly Allen catalogued the designs
in *The Early Christian Monuments of Scotland* (1903), and George Bain's
*Celtic Art: The Methods of Construction* (1951) taught how to draw them:
lay a square grid, choose diagonals, and draw spirals inside the triangles
they cut, every line parallel to a side of its triangle. Paul Gailiunas
(Bridges 2010) described the Penmon panels as a recursion: a line becomes
half a line, a short spur out and back, and half a line, with an inner copy
of the skeleton turned 45 degrees at scale 1/√2.

## This implementation

- **Spec knobs:** `mode` (spiral or penmon), `layout` (panel, band — two-
  or three-square-deep friezes stacked down the page, frame, cross),
  `width`, `height`, `cells` (grid squares across, 4-16; the Penmon grid uses
  half as many, each square holding a whole recursion), `turns` (1-4: turns
  in each triangle, which sets the path width), `depth` (Penmon levels,
  2-4), `cut_share` (the share of squares cut by a diagonal; the rest hold
  square spirals), `symmetry` (mirror: left-right and top-bottom, or a
  mirrored repeating unit in bands; rotation: a half turn, or a plain
  repeating unit in bands; none), `stroke`, `coloring` (insular or lineart).
- **Generation:** each grid square is chosen as a cut (`/` or `\`, with a
  spiral hand for each triangle) or an uncut square hanging its spiral from
  one side, which becomes a drawn line; the choices are made on one
  representative square and mirrored or turned onto its images, so the
  symmetry is exact. Drawn lines are the board's outline, every diagonal and
  every side a square spiral hangs from; the other grid edges are open. A
  spiral's segment *j* lies on the line parallel to its piece's edge *e_j*
  (the edges in turn, from the one it hangs from), set in by that edge's
  base offset — 0 on a drawn line, half a path on an open edge, where the
  neighbour's spiral supplies the other half — plus one path width for each
  earlier visit; consecutive lines are intersected, and the spiral ends
  before a segment would be shorter than one path. The path width is the
  square's side divided by 1.5 + turns × (2 + √2). In Penmon mode every
  triangle's hypotenuse carries a spur from its midpoint toward the right
  angle, stopping one path short; the two halves (legs as hypotenuses,
  turned 45°, scale 1/√2) repeat the rule `depth` times, an uncut square
  being four triangles about its centre with both half-diagonals drawn, and
  the last halves hold spirals hanging from a drawn edge, hands alternating
  by level. All lines are then snapped into a planar graph, split where one
  line ends on another, and walked face by face, so every path is an exact
  polygon (a spiral's free end is walked out and back; a floating key is a
  hole in the path around it). Paths are coloured greedily so neighbours
  differ, a path and its mirror images sharing a colour whenever they do
  not touch; paths under 44 mm² are inked solid. The Penmon mode is this
  generator's reading of Gailiunas's recursive description (spur rule, 45°
  turn, 1/√2 scale, depth 2-4), realised as a recursive halving of right
  isosceles triangles with spirals in the smallest ones — not a copy of the
  Penmon carving.
- **Solving:** nothing to solve; it is a design.
- **Guarantees:** deterministic per seed. The paths tile the board exactly
  (their areas sum to the board's area; meta `regions_tile_board`) and no
  two lines cross. Successive turns of every spiral are a whole number of
  path widths apart, no spiral corner comes within half a path of an open
  edge or within a whole path of a drawn edge it does not lie on, and every
  spiral hangs from a drawn line. Mirror pages are exactly symmetric, line
  for line. Line-art pages pass the colourability check (open regions of at
  least 40 mm², strokes of at least 0.75 pt, ink under 55%) across modes,
  layouts and knob extremes; meta reports `regions`, `pockets_inked`,
  `smallest_region_mm2`, `path_width_pt` and `colorable`. Neighbouring
  paths never share a colour. A page builds in well under 0.1 s.

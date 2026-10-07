---
title: "Roman Mosaic"
blurb: "Roman mosaics — opus tessellatum colour-by-number pages, tesserae laid in rows that follow a central emblem, every gap and number checked"
category: design
version: "1.0.0"
---
A colour-by-number Roman floor: hundreds of little stones laid in rows that
flow round a central emblem, every one numbered, every gap true.

## What it is

A mosaic in the Roman manner (*opus tessellatum*), drawn tessera by
tessera. In the middle sits an emblem — a rosette, a star, a medallion, a
cushion or a sunburst — whose stones are laid in rows that follow its
outline, the way a mosaicist "draws" with the flow of the stones (the
*andamento*). Two rows of ground stones follow the outline outward too,
then the ground runs on in straight rows (*opus regulatum*), framed by a
dark border and a dentil row. One page can have a single emblem or a
quincunx: a large emblem with four small ones in the corners.

As a colour-by-number page every stone carries the number of its colour,
with the colour key beneath; there is also a plain colouring version, and a
finished full-colour mosaic set in grey grout. The finished picture comes
with every page, so you can see what you are making.

## How to use it

1. Find the colours in the key at the bottom of the page — a number, a
   swatch and a name for each.
2. Colour every stone with the colour of its number. Leave the narrow white
   lines between the stones uncoloured: they are the grout.
3. Start with the emblem's dark outline row, then work through the bands of
   the emblem, then the ground and the border.
4. Check your work against the finished picture.

On the colouring version there are no numbers: choose your own colours, or
follow the finished picture. Fine felt-tips or coloured pencils suit stones
this size; for a bolder page choose larger tesserae.

## Purpose

Mosaic colour-by-number is restful, structured colouring: the picture only
appears as the stones fill in. Laying the stones in rows that follow the
emblem, rather than on a square grid, gives the page the flowing look of a
real Roman floor and teaches, by doing, how mosaicists used the direction
of the stones to draw.

## History

Roman mosaicists set floors from small cut cubes of stone, glass and
terracotta — *tesserae* — bedded in mortar. In *opus tessellatum* the
cubes are of roughly equal size; *opus vermiculatum* used tiny ones that
worm along the outlines of a central picture (the *emblema*), while *opus
regulatum* lays the ground in straight rows like a grid. The flow of the
rows, the *andamento*, is the mosaicist's line: rows hug an outline, then
relax into the ground. Geometric rosettes, stars and medallions framed by
a border of dark stones and a stepped dentil were the stock of workshops
from Pompeii to Antioch, and the craft passed on to Byzantine wall mosaics
in gold and lapis.

## This implementation

- **Spec knobs:** `width`, `height`, `margin`; `style` (`colour_by_number`,
  `colouring`, `coloured`); `motif` (`rosette`, `star`, `medallion`,
  `cushion`, `sunburst`); `layout` (`single`, `quincunx`); `palette`
  (`roman`, `byzantine`, `sea`, `earth`); `colours` (3–9); `tile`
  (tessera size, 6–48 pt); `grout` (0.3 pt – a quarter of the tile);
  `irregular` (0–1, how hand-cut the stones look); `border`; `line`
  (outline weight; the coloured style has no outlines). Out-of-range
  values are clamped and the request kept in meta as `requested_*`; a
  border or quincunx that does not fit the page is dropped and reported
  the same way, as are colours the design could not use.
- **Generation:** each emblem is a star-shaped outline in polar form whose
  lobe count, depth and turn come from the seed. Its rows are scaled
  copies of the outline, each cut by arc length into stones about one tile
  long, with the first joint set at a seeded offset so joints stagger from
  row to row; the centre is a ring of triangles. Where a row's straight
  edge stands proud of the true curve, that edge is pulled back by the
  overshoot as well as half the grout, so stones in neighbouring rows
  never meet. Two rows of ground stones follow the outline outward; the
  rest of the panel is a grid of cells, each kept whole when clear of the
  emblems, trimmed straight along the outline (with a pentagon cut once
  more into a triangle and a quad) where the outline crosses it once, or
  split into quarters otherwise. A bent quad is split along whichever
  diagonal leaves two convex halves. Every stone is then inset by half the
  grout, and corners are pulled a seeded fraction toward the middle for a
  hand-cut look (kept only when the stone stays convex). The emblem's
  colours run in seeded bands of one or two rows from a black outline row
  inward, some bands alternating colour between the lobes; the ground and
  the rows following the outline take the ground colour; numbers follow
  the key order.
- **Solving:** nothing to solve — a design to colour.
- **Guarantees:** every page passes `tesserae_checked`, re-measured from the
  finished polygons alone: every tessera is a convex quad or triangle of
  at least a tenth of a tile's area lying inside the panel; no two
  tesserae overlap and every pair is at least the grout apart (exact
  distance between convex polygons, over every pair whose boxes come
  within the grout); and every tessera carries exactly one number, whose
  colour is in the key. Any pair found too close during building loses one
  stone (counted in meta as `repaired`). The outline page also passes the
  colourability check at the stones' minimum area. Tests re-check all of
  this by independent means (winding numbers, turning angles, a sweep
  over every pair), confirm each printed number sits in exactly one stone
  and matches the finished picture's colour, and that the checker rejects
  overlapping, crowded, bent, unnumbered and crumb-sized stones.

---
title: "Sona Sand Drawings"
blurb: "Sona: Chokwe-style sand drawings — one smooth line looping round a grid of dots, built as Gerdes mirror curves, with Lunda designs"
category: design
version: "1.0.0"
---
Drawings in the manner of the Chokwe *sona*: a grid of dots and one smooth
line that loops round every dot and closes on itself.

## What it is

A design in the manner of *sona* (singular *lusona*), the sand drawings of
the Chokwe of north-eastern Angola and neighbouring regions. A drawer
smooths the sand, presses a grid of equally spaced dots with the fingertips,
then draws a line round them with one finger — ideally in a single unbroken
movement that ends where it began, so the line is never lifted and no part
is drawn twice. The line weaves diagonally between the dots, crossing
itself and turning back like light bouncing between mirrors. This page
builds its drawings that way: hidden two-sided mirrors stand between some
neighbouring dots, the line runs at 45° and bounces off them and off the
edge of the grid, and the mirrors are placed so the whole drawing is one
closed line (or as many lines as asked for), often with a mirror or
turning symmetry.

## How to use it

Follow the line with a finger from any point: it passes every gap between
the dots, goes round every dot, and comes back to the start. Try copying it
— first the dots, then the line in one go — the way the drawings were made
in the sand. Turn on the mirrors to see what steers the line: where a short
red bar stands between two dots the line bounces; where there is none it
crosses straight over. The Lunda style colours the little squares along the
line dark and light in turn; notice that every row and every column comes
out half dark. The line-art style is a page to colour or to trace.

## Purpose

A beautiful, ancient way of drawing that is also real mathematics: the
same mirror rule explains why some grids give one line and others several,
and leads to symmetry, knots and the Lunda designs. The page is made for
looking, copying and exploring.

## History

Sona belong to the Chokwe (also written Cokwe, Tshokwe) of the Lunda region
of north-eastern Angola, and to related peoples in neighbouring parts of the
Democratic Republic of the Congo and Zambia. Specialist story-tellers, the
*akwa kuta sona*, drew them in the sand of the village square to accompany
proverbs, fables and riddles, and as teaching; the tradition was recorded by
ethnographers such as Hermann Baumann (*Lunda*, 1935) and Mário Fontinha
(*Desenhos na Areia dos Quiocos do Nordeste de Angola*, 1983). The
Mozambican mathematician Paulus Gerdes (1952–2014) analysed the drawings'
construction rules, introduced *mirror curves* to describe them, and found
the *Lunda designs* — two-colourings of the squares along a mirror curve —
in them; see P. Gerdes, *Geometry from Africa* (Mathematical Association of
America, 1999) and *Lunda Geometry: Mirror Curves, Designs, Knots,
Polyominoes, Patterns, Symmetries* (2007). Slavik Jablan later connected
mirror curves with knot theory. This page draws fresh curves from the
mirror rule in the manner of the tradition; it does not reproduce any
particular lusona or its story.

## This implementation

- **Spec knobs:** `width`, `height` (points); `margin` (0-200 pt); `cols`,
  `rows` (dots, 2-24 each); `shape` (`rectangle`, `diamond`, `cross`,
  `round`); `symmetry` (`auto` — chosen by the seed among those the grid
  allows — `none`, `mirror`, `double`, `rotational`, `four_fold`; four-fold
  needs a square grid and otherwise becomes a half turn; a single line
  cannot have half-turn symmetry when both sides are even, so there the
  half-turn symmetries become a mirror, reported as `requested_symmetry`); `curves` (1-12,
  1 = one line); `mirrors` (share of mirror positions tried in the seeded
  scatter, 0-1); `style` (`sand`, `lunda`, `chalk`, `lines`); `dots`;
  `show_mirrors`; `stroke` (line weight relative to the dot spacing, 0.2-4).
- **Generation:** each dot owns a cell cut into four quarter squares, and
  each quarter square carries one diagonal stroke of the curve. At every
  midpoint between two dots stands nothing (the curve crosses), a mirror on
  the cell edge, or a mirror along the dot line; the border is a mirror.
  The midpoints are grouped into orbits of the symmetry and each orbit gets
  one mirror type, so the layout is exactly symmetric. A seeded scatter
  fills about `mirrors` of the orbits, keeping each only if it does not move
  the curve count away from the target; a seeded local search then changes
  orbits one at a time towards the target, with random sideways moves and
  restarts when it stalls. On an even × even grid no single line has
  half-turn symmetry: the turn's centre is a cell corner, a single curve
  the half turn maps onto itself must wind an odd number of times round
  that centre, yet a ray from the centre along the grid line meets the
  curve only at mirror midpoints, each crossed by an even number of
  strands — so the winding number is even. There the half-turn symmetries
  give way to a mirror. Should the search ever miss, the symmetry falls
  back to a mirror, then none (reported as `requested_symmetry` or
  `chosen_symmetry`), rather than break the single line. The curve is a cubic
  Hermite spline through the midpoints: straight across a crossing, and
  pulled a third of a half-spacing back from each mirror with its tangent
  along the mirror. Lunda squares alternate along each curve.
- **Guarantees:** the drawing has exactly the requested number of closed
  curves — one by default — and every quarter square is crossed exactly
  once, checked by an independent tracer that reflects a ray off mirror
  segments (tested across sizes, shapes and symmetries); curves are closed
  and smooth, each join's handles collinear and opposed (tested); the
  mirror layout and the drawn curve map onto themselves under the
  symmetry (tested); Lunda squares alternate along every curve and, on a
  rectangle, every row and column is half dark (Gerdes's theorem, tested).
  `verification: curve_count_every_square_once_symmetric`. The line-art
  page passes the adult colourability check. Clamped knobs are reported as
  `requested_<field>`.

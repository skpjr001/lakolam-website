---
title: "Kumiko Lattice"
blurb: "Kumiko lattice — Japanese shoji woodwork: asanoha and other infills on a triangle or square grid"
category: design
version: "1.0.0"
---
The woodwork of Japanese shōji screens: a grid of slender bars filled with
hemp leaves, cherry blossoms and bellflowers, every piece fitted without a
nail.

## What it is

Kumiko is the Japanese craft of assembling tiny strips of wood into
lattices. A base grid, the *jigumi*, is laid out first: three families of
bars crossing at 60 degrees, which makes a field of triangles, or a square
grid with both diagonals. Each cell of that grid is then filled with a few
shaped pieces, the *kumiko-ko*, wedged in to make a small figure. The most
famous is *asanoha*, the hemp leaf, whose three spokes join across
neighbouring cells into six-pointed stars. Panels mix infills by region:
a medallion of one pattern in a field of another, concentric rings, or
bands.

This page draws such a panel: a rectangle (the default), a hexagon, a
circle, or a square board with a round window cut through it, with the bars
at real width so every opening is its own pane, and the infills chosen
region by region with a symmetry that matches the frame.

## How to use it

The wood-and-paper version is ready to frame or to print as a card or wall
art; the light glows warmer toward the middle, as if from a lamp behind the
paper. For colouring, choose the line-art version: every pane is a closed
shape of its own, and the bars form one continuous lattice. Colour panes by
pattern to make the regions sing, pick out the stars of the hemp leaf in
one colour, or keep to the natural palette of pale wood and paper. The
square grid gives a stricter, more architectural look; the triangle grid
gives the stars and flowers.

## Purpose

A traditional lattice with real structure, for colouring books, wall art,
cards and woodworkers looking for layouts. Every page is different, yet
every page keeps the logic of the real craft: one grid, a library of exact
infills, regions laid out symmetrically, and panes large enough to colour.

## History

Kumiko developed in Japan from the Asuka period (seventh century) onward,
in the screens, transoms (*ranma*) and sliding doors of temples and houses;
the finest work, with its hundreds of infill patterns, flourished in the Edo
period and is still made by specialist joiners (*tategu-shi*) today. The
patterns take their names from nature: *asanoha* (hemp leaf), a motif long
favoured for children's clothing because hemp grows straight and strong;
*sakura* (cherry blossom); *kikyō* (Chinese bellflower); *kikkō* (tortoise
shell); *goma* (sesame). Workshop names vary between regions and makers;
the infills here are defined by their construction, given below, and named
for the common pattern each one makes.

## This implementation

- **Spec knobs:** `grid` (triangle or square), `frame` (rectangle, hexagon,
  circle, round_window), `cells` (cells across the panel, 2-24), `infills`
  (the patterns the seed may use; empty means all but `plain`), `layout`
  (auto, uniform, rings, bands, medallion, symmetric), `bar` (jigumi bar
  width in points; kumiko-ko bars are 70% of it, the frame three times it),
  `stroke`, `coloring` (wood or lineart), `width`, `height`.
- **Generation:** every cell is a triangle (V0, V1, V2): equilateral on the
  triangle grid, a quarter of a square on the square grid (V0 at the
  square's centre, so asanoha there is the square *kaku-asanoha*). Each
  infill is a list of convex panes in barycentric coordinates, with G the
  centre and M the side midpoints:
  - *plain*: the bare cell;
  - *asanoha*: spokes G to each corner;
  - *mitsukude* ("three hands"): spokes G to each side midpoint;
  - *goma*: the three medians, six slim panes;
  - *kaku-asa*: a central triangle at 0.4 of the way from G to the corners,
    joined to them by spokes;
  - *tsuno-asa*: an inverted inner triangle at 0.55 of the way from G to the
    side midpoints, its points running on to the midpoints as horns, and
    spokes from the corners;
  - *yae-asa*: asanoha again inside each of asanoha's three panes;
  - *sakura*: a small central triangle (0.2 toward the corners) tied to
    every side midpoint, so six kite petals meet round each grid point;
  - *kikyō*: an inverted inner triangle (0.6 toward the midpoints), each
    corner joined to its two nearest inner points;
  - *kikkō*: the corners cut off at a third of each side, leaving a hexagon.
  Every infill has the triangle's full symmetry, so it looks the same
  whichever way a cell is turned. Bars have real width: each pane is shrunk
  by half a jigumi bar along the cell's sides and half a kumiko-ko bar along
  inner edges (half-plane clipping), then clipped to the frame. Regions are
  laid out over *blocks*: on the triangle grid, the hexagonal rosettes of six
  cells round every third grid point (the points whose axial coordinates
  differ by a multiple of three, a sublattice that tiles the plane); on the
  square grid, the squares. Rings use the hexagonal (or square) distance of
  a block from the centre, bands its row, the medallion an inner disc and an
  outer border ring, and the symmetric map gives each orbit of blocks under
  the frame's symmetry group (D6, D4 or D2) its own seeded infill. Block keys
  are exact integers, so the symmetry is exact. Auto picks rings, medallion
  or symmetric.
- **Fitting the floor:** a pane must clear a floor (420 square points and
  6 points wide in line art, about 54 mm2; 60 square points and 2.4 points
  for wood). When the spec names no infills, the ones whose panes would fall
  below it at the requested cell size are left out of the draw (as long as
  two remain), so the panel keeps its cell count; otherwise the panel is
  rebuilt with fewer, larger cells until every pane of every whole cell
  clears it, and meta reports `escalated`. A cell cut by a curved or slanted
  rim keeps its infill only when every piece the rim leaves clears the
  floor; otherwise it is drawn plain, and a plain piece still too small is
  left as wood.
- **Solving:** nothing to solve; it is a design.
- **Guarantees:** deterministic per seed; every infill tiles its cell exactly
  with convex, non-overlapping panes (tested in both cell shapes); every
  opening is convex, lies inside its exact pane and inside the frame, and is
  at least half a bar from every bar line; openings never overlap; the region
  map is invariant under every element of the symmetry group (tested on
  integer block keys); a hexagonal panel on the triangle grid is whole cells
  only; line-art pages pass the colourability check (regions of at least
  40 mm2, strokes of at least 0.75 pt, ink under 55%) for every grid, frame
  and layout. Meta reports `cells_used`, `escalated`, `infills`,
  `smallest_pane`, `narrowest_pane`, `panes_clear_floor`, `all_convex`,
  `symmetry` and `colorable`. A panel builds in a few milliseconds.

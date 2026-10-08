---
title: "English Paper Piecing"
blurb: "English paper piecing — seeded rosette and tiling layouts with cutting counts, and true-size templates inside an exact seam allowance with a test square; every interior vertex's angles sum to 360°"
category: design
version: "1.0.0"
---
True-size English paper piecing templates with an exact seam allowance, and
seeded rosette and tiling layouts with a cutting count.

## What it is

Two pages for English paper piecing (EPP). The layout page is a coloured
patchwork plan from one of nine edge-to-edge designs: Grandmother's Flower
Garden rosettes set in a path, tumbling blocks, half hexagons, hexagons and
triangles, octagons and squares, kite stars, coffins (long hexagons),
hexagons with squares and triangles, and rows of triangles and squares.
Under the plan is a cutting count: how many pieces of each shape to cover in
each fabric, A to H. The templates page draws the same shapes at true size,
each paper shape inside its cutting line, with a test square to check the
print and the same cutting count.

## How to use it

Print the templates page at 100% ("actual size", not "fit to page") and
measure the test square: it must be exactly 1 inch (or 3 cm). Cut the paper
shapes out on the inner line, from card or heavy paper. Use the outer line
as a pattern for the fabric: it is the paper shape with the seam allowance
added all round. Pin or glue a paper to the wrong side of each fabric piece,
fold the allowance over the edges and tack or glue it down. Then hold two
covered shapes right sides together and whip-stitch along one edge, catching
just a few threads of each fold. Join the pieces as the layout page shows:
the count tells you how many of each shape to cover in each fabric. When a
piece is surrounded on all sides, take the tacking out and lift its paper to
use again.

## Purpose

EPP depends on accuracy. Papers a fraction too big or small do not meet at
the corners, and a design that does not close up at every point cannot be
sewn flat. Every layout here is checked corner by corner: wherever pieces
meet all the way round, their corner angles sum to exactly 360°, so the
patchwork lies flat. Every template is checked against its true size, and
every cutting line against the seam allowance.

## History

Paper piecing over papers was being done in Britain by the 1770s, and the
oldest surviving pieces still have their papers in place: old letters,
copybooks and bills, which help to date them. Hexagon "honeycomb" or
"mosaic" patchwork became a favourite of the nineteenth century, and in
1930s America the hexagon rosettes became Grandmother's Flower Garden, one
of the best-loved quilts of the Depression era, sewn from feedsack prints.
Tumbling blocks, made of diamonds that look like stacked cubes, is as old.
Since the 2000s EPP has had a large revival as portable hand sewing, helped
by pre-cut papers in many shapes and ambitious designs such as Willyne
Hammerstein's La Passacaglia.

## This implementation

- **Spec knobs:** `view` (layout, templates), `layout` (auto,
  flower_garden, tumbling_blocks, half_hexagons, hexagon_stars,
  octagon_square, kites, coffins, rhombitrihexagonal, triangles_squares),
  `rings` (1–3 rings round each rosette centre; flower garden only),
  `extent` (layout width in piece sides, 4–60), `size` (side length,
  0.25–4 in or 0.5–10 cm; the half hexagon and coffin are measured by their
  short sides, the kite by its long sides), `units` (inches, centimetres),
  `seam` (quarter_inch, three_eighths_inch, seven_mm, one_cm, none),
  `palette` (auto, feedsack, garden, ocean, autumn, mono), `width`,
  `height` (144–3000 pt). Out-of-range values are clamped and reported as
  `requested_*`. The extent is raised on a page too wide and short for any
  piece to fit, and lowered past 6,000 square sides; on the templates page
  a size too big for the paper is lowered to the largest 1/32 in (or
  0.5 mm) step at which one of each shape fits, and if even a tiny shape
  will not fit with its seam the seam is dropped — all reported.
- **Generation:** each design is a periodic tiling given by the pieces of
  one translation cell and two lattice vectors, in units of one side. The
  tiling is shifted by a seeded offset and every piece lying wholly inside
  the layout rectangle is kept (an EPP top has ragged edges until it is
  finished). Flower garden rosettes sit on the hexagon lattice spanned by
  (2n+1, 1) and its 60° turn, whose shortest vectors are 2n+2 hexagons
  long, so rosettes of n rings never touch and one hexagon of path runs
  between them. Fabrics are seeded by role: rosette rings, the three faces
  of a tumbling block, the two fabrics of each kite star, and so on.
  Templates are packed in shelves, a shelf per shape in turn; each cutting
  line is the mitred offset of the paper shape.
- **Solving:** nothing to solve; it is a design.
- **Guarantees:** deterministic per seed
  (`verification: vertex_angles_sum_360_true_size_exact_seam_counts_tallied`).
  At every vertex whose edges are all shared by two pieces the corner
  angles sum to 360°; nowhere do they pass 360°; no edge is used by more
  than two pieces; no corner lies inside another piece or part-way along
  its edge; and the Euler characteristic V − E + F equals the number of
  connected parts, so the layout has no holes. Every piece is congruent to
  its template (same cycle of sides and angles); the printed count is a
  tally of the pieces placed. Every template's sides are true size within
  0.1 mm, each cutting-line edge lies parallel to its paper edge at exactly
  the seam allowance, and templates lie on the page without overlapping.
  Tests check the textbook vertex configurations of each tiling
  (3.4.6.4 = 60 + 90 + 120 + 90 and so on), the shapes' angles and sides,
  a 1 inch hexagon's known measurements, the rosette and path counts, and
  refuse nudged, missing, duplicated and squashed pieces, wrong counts,
  oversized templates and a seam off by a hair.

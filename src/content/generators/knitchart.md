---
title: "Knitting Chart"
blurb: "Stranded colourwork in the Fair Isle and Selbu traditions — OXO and peerie bands or eight-petal stars, two colours a row with capped floats, as a chart, knitted swatch or colour-by-square page"
category: design
version: "1.0.0"
---
Stranded colourwork charts in the Fair Isle and Selbu traditions: two
colours in every row, short floats, motifs that repeat evenly round the
whole tube.

## What it is

Stranded knitting works patterns in two colours at once. In each row one
colour is knitted and the other is carried loosely across the back as a
*float* until it is needed again. Patterns are worked from a chart: a grid
with one square per stitch, read from the bottom up, one row per round, and
from right to left.

Two families of design are made here.

**Fair Isle style.** Wide *OXO* bands (11 to 15 rows) alternate with narrow
*peerie* bands (5 to 9 rows). In an OXO band the "O" is a lozenge, and the
"X" is the cross formed where the outlines of neighbouring lozenges meet.
Every motif is built from diagonal lines one stitch per row and is a mirror
image of itself left to right and top to bottom. The colours shade towards
the centre row of each band. In one band the background shades and the
pattern colour holds steady; in the next band it is the other way round.

**Selbu style.** The Norwegian eight-petal star, or rose, worked in two
colours. Four lozenge petals point up, down and to the sides, and four block
petals sit on the diagonals. The background is sprinkled with single
stitches called *lice*. Rows of small stars sit between the big ones, and
narrow check borders run along the top and bottom.

## How to use it

- **As a knitting chart.** The default page is the chart itself. Each
  square is shown in its yarn colour, with rows numbered up the right side
  and stitches numbered from the right. A red box marks one repeat of each
  band: knit the boxed stitches, then repeat them all the way round. The two
  squares beside each row show that row's background (B) and pattern (M)
  colours. The key below lists each yarn with its stitch count, so you can
  estimate how much of each you need. The chart fits any tube whose stitch
  count is a multiple of the page's: a hat, a cowl, a yoke band or a
  mitten cuff. Work it in the round, so you are always reading the right
  side.
- **As a swatch preview.** The swatch page draws the finished fabric stitch
  by stitch, as rows of knitted V's, so you can judge the colours before
  you buy the yarn.
- **As a colour-by-square page.** Every patch of one colour is outlined and
  numbered over a fine grid, with a numbered key. Colour each square by its
  number to bring the pattern out. It is a calm, counted colouring activity,
  and also a way to try your own colour scheme on paper.

## Purpose

Charted colourwork is what knitters buy: a fresh, balanced, correctly
repeating chart that is comfortable to knit. Comfort has rules. Floats must
be short enough not to snag, every row must actually use both colours, and
the repeat must divide the stitch count so the pattern meets itself cleanly
round the tube. A generator can make endless new combinations and check
every one of those rules on the finished chart.

## History

Stranded knitting has been worked for centuries around the North Sea. The
Shetland island of Fair Isle gave its name to the shaded, many-coloured
banded style, which became widely fashionable in the 1920s. Its large
lozenge-and-cross bands are known to knitters as OXO patterns, and its
small bands as "peeries" (small ones). A common piece of knitting advice,
often credited to the designer Meg Swansen, is never to change the
background and the pattern colour on the same row. The shaded bands here
follow it. In Selbu, Norway, two-colour mittens and stockings with the eight-petal
rose (*selburose*) became a local tradition from the mid 19th century,
classically in black and white with scattered lice stitches. The rose is
now one of the best-known Nordic knitting motifs. These charts are new
designs in those traditions, not reproductions of named historic patterns.

## This implementation

- **Spec knobs:** `tradition` (`fair_isle`, `selbu`), `output` (`chart`,
  `swatch`, `colouring`), `stitches` (stitches round the tube, 24-240,
  rounded to a multiple of 12 so the usual repeats of 4, 6, 12 and 24
  divide it), `bands` (main OXO or star bands, 1-6, with peerie or
  small-star bands between them), `max_float` (longest float in stitches,
  3-11, default 7), `palette` (`auto`, `shetland`, `nordic`, `heather`,
  `autumn`, `sea`), page `width`/`height`, `stroke` (colouring outline).
- **Generation:** every band is a tile `r` stitches wide (an even divisor of
  the stitch count) and an odd number of rows tall. Motifs are predicates
  on folded coordinates (u = cyclic distance from the tile's centre column,
  v = distance from its centre row), which makes every tile mirror-symmetric
  both ways by construction.
  - **OXO tiles** are a seeded ring profile over the lozenge radius
    p = u + v. The outline is at p = a (half the band height) and the X arms
    are at p = r/2, the next lozenge's outline. Inner rings are one or two
    stitches wide with gaps of two or three, ending in a dot or solid heart.
    Nested chevrons sit above and below the crossing. Options add a cross
    through the lozenge and a small diamond round the crossing.
  - **Peerie tiles** come from a curated set: lozenges, crosses, stars,
    chains, zigzags and beads.
  - **Selbu stars:** the selburose is rasterised in the folded octant
    (l = max(u, v), s = min(u, v)). Axis lozenges lie below the staircase
    l = 2s and diagonal blocks above it, with a two-stitch background channel
    between them. That makes the star exact under all eight symmetries of
    the square. Lice sit one stitch in four along every row, staggered on
    alternate rows and kept a stitch clear of the motifs. The bands are
    separated by 1×1 check borders and small eight-point stars.
  - **Float repair:** any run longer than the cap, counted cyclically round
    the tube, is broken at its middle by one contrasting stitch and its
    mirror images. This adds the scattered single stitches knitters use for
    the same purpose, and the count is reported per band.
  - **Colours:** each band shades one colour symmetrically towards its
    centre row, drawing backgrounds from the palette's light yarns and
    pattern colours from its dark ones. The shading colour alternates band
    by band, and the colour held steady is carried over from the row below.
  - **Pages:** the chart and colouring pages fill traced colour regions
    (`lako_grid::regions`). The colouring page numbers each region at its
    deepest square.
- **Solving:** nothing to solve — a design.
- **Guarantees:** deterministic per seed. All of these are recomputed from
  the finished grid in tests across traditions, stitch counts of 24 to 120,
  caps of 3 to 9 and many seeds, and reported in meta:
  - **No float is longer than `max_float`**, counted round the tube
    (`floats_within_cap`, `longest_float`).
  - **Every row uses exactly two colours** (`two_colours_every_row`).
  - **Every band's repeat divides the stitch count, and every row really
    repeats with it** (`repeats_divide_stitches`, `rows_repeat`).
  - **Every band is mirror-symmetric left to right and top to bottom**
    (`bands_symmetric`).
  - **No row changes both its background and its pattern colour**, and the
    shading colour alternates band by band (`one_colour_change_at_a_time`;
    Selbu uses one pair throughout).
  - Every light and dark yarn pair in every palette has a WCAG contrast of
    at least 3:1 (`min_contrast`).
  - Fair Isle OXO bands are 11 to 15 rows and peerie bands 5 to 9.
  - The colour-by-square regions cover every square exactly once.
  - Colouring pages are not held to the adult colouring-book region floor:
    single stitches are their own squares by design.

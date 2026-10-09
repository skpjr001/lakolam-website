---
title: "Fuse Bead Pattern Paper"
blurb: "Fuse-bead pattern paper — square, hexagon, circle, heart and star pegboards at true mini, midi or maxi peg pitch"
category: paper
version: "1.0.0"
---
Pegboards drawn bead for bead at true size — mini, midi or maxi fuse beads on
square, hexagon, circle, heart and star boards, ready to colour in and lay
under a clear pegboard.

## What it is

A sheet showing a fuse-bead pegboard exactly as it is: one small circle for
every peg, with the bead's centre hole, spaced at the board's real peg pitch:

- **Mini** beads — 2.6 mm from peg to peg (Perler Mini, Artkal mini; Hama
  Mini beads are sold as 2.5 mm).
- **Midi** beads — 5 mm, the standard size of Perler, Hama Midi and most
  other brands.
- **Maxi** beads — 10 mm, the big beads for small hands (Hama Maxi, Perler
  Biggie).

The board comes in the shapes the makers sell, each with its real peg layout:

- **Square** — pegs in straight rows and columns; the large board is 29 × 29
  pegs (841 beads), the small one 14 × 14.
- **Hexagon** — pegs close-packed in staggered rows, so every bead touches
  six others; the large board has 16 pegs along each side (721 beads).
- **Circle** — pegs in rings round a centre peg, 6 in the first ring, 12 in
  the second, 18 in the third and so on; the large board has 14 rings (631
  beads).
- **Heart** — straight rows and columns cut to a heart, 31 pegs across.
- **Star** — a six-pointed star on the close-packed layout, 10 pegs along the
  edge of each point (541 beads).

Every fifth (or tenth) bead is drawn with a heavier ring so you can count
quickly: along rows and columns from the top-left corner on square and heart
boards, along the three directions of the staggered rows from the centre on
hexagons and stars, and every fifth ring on circles. Small boards repeat to
fill the page.

## How to use it

Print the page at actual size: in the print dialog choose "Actual size" or
"100%", never "Fit to page", so the circles sit exactly over the pegs.

Plan a design by colouring one circle for each bead with pencils or markers,
counting along the heavier rings. Then lay a clear pegboard over the sheet and
drop a bead of the matching colour on each peg, or keep the sheet beside the
board and copy it row by row. Iron the finished design between sheets of
ironing paper, as the bead maker directs, with an adult's help for young
children. Choose the bead size you own: mini, midi and maxi beads only fit
their own boards.

## Purpose

Pattern paper for fuse-bead crafts — pixel-art characters, coasters,
ornaments, keyrings and magnets. Teachers and parents print class sets for
design sessions before the beads come out; hobbyists keep a book of their
patterns. In a book it makes a bead-pattern notebook.

## History

Fuse beads are short plastic tubes, set on a pegboard and melted together
with an iron. The Danish firm Hama, founded by Malte Haaning in 1961 to make
plastic drinking straws, launched its Midi bead in 1971, the Mini in 1978
and the Maxi in 1982; ironing the beads together, instead of gluing them to
a tray or card, came in the late 1970s. Perler, the best-known American
brand, and later makers such as Artkal sell beads and boards in the same
three families of sizes, and in shapes as well as squares.
The square boards interlock so a large picture can be built across several
boards, and pattern sheets are drawn on the same grid so a design can be
planned on paper and copied bead for bead.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape`; `margin_mm` (0–30, default 10); `bead` (mini 2.6 mm, midi
  5 mm, maxi 10 mm pitch); `shape` (square, hexagon, circle, heart, star);
  `size` (0–120, 0 for the shape's large board: 29 per side, 16 per side,
  14 rings, 31 across, 10 per point; otherwise pegs per side for square and
  hexagon, rings for circle, pegs across for heart, pegs along each point's
  edge for star); `tile` (repeat the board when more than one fits);
  `major_every` (0 or 2–20, default 5); `hole` (draw the centre hole);
  `outline` (draw the board's edge); `ink` (named paper colours, default
  gray); `weight` in points (0.1–2).
- **Generation:** the square and heart use a square lattice, the hexagon and
  star a triangular lattice (rows a pitch × √3/2 apart, each row offset half
  a pitch), the circle concentric rings at whole pitches with 6k pegs on ring
  k, starting at the top. A bead is drawn 0.9 pitch across so neighbours do
  not merge, with its hole at half its width; the board edge runs 0.75 pitch
  outside the outer pegs. The heart is a square turned 45° with a half-disc
  on each upper side, its outer column set just inside so three rows reach
  it; the star is two triangles of side 3(size − 1) pitches. A board too big
  for the content box is shrunk a size at a time until it fits (recorded as
  `size_fitted_to_page`); copies are laid a pitch apart in a centred block.
- **Solving:** nothing to solve — a page to plan designs on. The seed is
  unused: every seed gives the same sheet.
- **Guarantees:** the pitch is exactly the bead's (2.6, 5 or 10 mm); every
  peg on a lattice board has a neighbour exactly one pitch away and none
  closer, circle pegs sit on rings at whole pitches; the large boards hold
  the makers' peg counts (841, 721, 631, 541, and the closed forms n²,
  3n² − 3n + 1, 3n² + 3n + 1, 6n(n − 1) + 1 for other sizes); all ink stays
  inside the margins and copies never overlap — tested on every page size,
  orientation, bead and shape. A knob outside its range is clamped and the
  request recorded as `requested_<field>` in the meta.

---
title: "Punch Needle"
blurb: "Punch-needle and rug-hooking patterns at true hoop size, printed mirrored for working from the back, every colour region at least two loop rows wide, with a colour key and yarn estimates"
category: design
version: "1.0.0"
---
Punch-needle and rug-hooking patterns at true hoop size, printed mirrored
for working from the back, with every colour wide enough to fill with loops.

## What it is

A bold picture — a rainbow over clouds, a sun, a flower, a heart, a
toadstool, snowy mountains, or a crescent moon and stars — drawn in a round
hoop or a square frame from three to seven inches across, at the exact size
it will be worked. The pattern page is printed back to front, with a number
in every space and a pale wash of its colour. A second page shows the
finished front in colour. Both pages carry a colour key with the yarn each
colour needs and a one-inch bar to check the print size. No space is
narrower than two rows of loops for the chosen needle.

## How to use it

Print at 100% and check the one-inch bar with a ruler. Stretch your
weaver's cloth or monk's cloth drum-tight in the hoop or frame. Lay the
pattern under the cloth on a light box or a sunny window and trace the
lines with a fabric marker onto the side you will work from — that is the
back, which is why the pattern is mirrored; the numbers are printed the
right way round so you can still read them. Punch each space in the
yarn of its number, outlining the edge first and then filling in rows,
loops about the height given on the page. The loops appear on the front,
the right way round, as on the finished-front page. For rug hooking, work
from the front with the mirrored lines traced through, or reverse the
tracing.

## Purpose

Punch needle is a fast, forgiving fibre craft, and printable patterns sell
widely. Two things go wrong with home-made patterns: forgetting to mirror
the design (so lettering and lopsided pictures come out backwards), and
details too thin to punch — a stripe narrower than two rows of loops
collapses into a muddle. These patterns are mirrored and every space is
checked wide enough.

## History

Punch needle grew from rug hooking, which spread through Maine and the
Canadian Maritimes in the 1800s as a way to turn rags into rugs, and from
Russian punch embroidery brought to North America by Old Believers. The
hollow punch needle, which pushes yarn through from the back, became a
popular hobby again in the 2010s with fine and regular needles for
embroidery floss and worsted yarn.

## This implementation

- **Spec knobs:** `motif` (auto, rainbow, sun, flower, heart, mushroom,
  mountains, moon), `hoop` (3–7 inches, true size; others clamped and
  reported as `requested_hoop`; a named motif is reported as
  `requested_motif`), `frame` (round hoop or square frame),
  `needle` (fine: rows 1/10 in apart; regular: 1/8 in; rug: 1/4 in),
  `tinted` (a pale wash of each colour on the pattern) and `page`.
- **Generation:** the motif is built from discs, ellipses, polygons and
  curves sized to the needle (bands, rays, stems and spots no narrower than
  the rule needs) with a seeded yarn palette and layout. It is painted onto
  a raster at one pixel per point. For each colour, exact Euclidean
  distance transforms find where a disc two loop rows across fits wholly
  inside that colour; every pixel such a disc cannot reach is given to the
  colour whose disc comes nearest, and this repeats until nothing changes.
  Colours used up are dropped from the key. The regions are traced back
  into outlines (Douglas–Peucker, 0.8 px) and numbered at the point
  farthest from their edges.
- **Verification:** `obeys()` re-runs the width check on the finished
  raster: every pixel of every colour lies within half a loop row (plus
  1.5 px) of a disc two rows across lying wholly in that colour, so square
  corners pass and no strip or spike narrower than two rows does. The edge
  of the frame counts as open (colours run on under the frame). Tests check
  the distance transform against brute force, that a thin strip is caught
  and repaired, that the pattern page is the mirror image of the front on
  the raster, and that the yarn figures re-add from the region areas.
- **Yarn estimate:** rows × stitches per square inch, each stitch one loop
  up and down plus its length, with 15% to spare, rounded up to a quarter
  yard — an estimate; tension and loop height vary.
- **Guarantees:** `width_checked` and `mirrored` in the meta, with the
  colours, `yarn_yards` per colour and the number of pixels reassigned.

---
title: "Party crowns and hats"
blurb: "Party crowns, cone hats and animal-ear headbands sized to a head circumference, true size with glue tabs"
category: design
version: "1.0.0"
---
Paper party crowns, cone hats and animal-ear headbands, printed at true size
for a real head.

## What it is

Cut-out party headwear in nine designs:

- **Crowns** with zigzag points, rounded scallops, castle battlements, or
  tall and short points with a jewel on each tall one. The band carries
  gems and, on the front strip, your words ("HAPPY BIRTHDAY" or a name).
- **A cone party hat**, with a pattern of stripes, dots or zigzags, a label
  for a name and two holes for an elastic.
- **Headbands** with cat, bunny, bear or mouse ears.

Everything is sized from a head measurement. A crown band is cut into as
many strips as the page needs. Each strip has a glue tab, and once the tabs
are glued under the next strip the ring is exactly the head size. Pages come
in colour, or as black outlines to colour in.

## How to use it

1. Measure round the head, just above the ears and eyebrows, with a tape
   measure or a piece of string, and enter it in centimetres. Typical sizes
   are 47 cm for a toddler, 52 cm for a child and 57 cm for an adult.
2. Print every page at 100 % ("actual size"), not "fit to page". Check the
   1 cm square in the corner with a ruler. Thin card works best.
3. Cut along the solid lines. Fold the tabs back along the dashed lines.
4. **Crown or headband:** glue the tab marked GLUE on strip 1 behind the
   start of strip 2, then strip 2's tab behind strip 3, and so on. Close the
   ring by gluing the last tab behind strip 1. For a headband, glue the ears'
   tabs behind the front of the band, a hand's width apart.
5. **Cone hat:** curl the shape into a cone and glue the tab under the
   opposite straight edge. Thread an elastic through the two holes and knot
   it inside.

## Purpose

Party crowns and hats are a birthday, classroom and holiday staple, but a
printed crown that does not fit is useless. A child's head is about 52 cm
round, longer than any sheet of paper, so a crown has to be cut in strips
and glued, and the glue tabs must not eat into the size. Here the geometry
is worked out from the measurement and checked: the strips meet at exactly
the head size, and a cone rolls into exactly its base circle.

## History

Paper crowns go back at least to the Roman festival of Saturnalia, where
participants wore felt caps. The British Christmas cracker hat appeared in
the 1900s, after Tom Smith's crackers. Cone-shaped party hats became popular
in the United States in the early twentieth century, and animal-ear
headbands have been a staple of children's dress-up and school plays for
generations.

## This implementation

- **Spec knobs:** `design` (`zigzag`, `scallop`, `castle`, `jewel`, `cone`,
  `cat`, `bunny`, `bear`, `mouse`); `head_cm` (30–70); `height_cm` (3–30,
  0 picks a height for the design); `overlap_cm` (glue tab, 1–6); `text`;
  `look` (`colour`, `outline`); `index` (which page of the set); `page`,
  `landscape`; `margin` (inches).
- **Generation:** a band of circumference C is cut into the fewest strips
  n whose length C/n plus the tab fits across the page. Each strip shows
  C/n of the ring, with a whole number of points. A cone hat of base
  circumference 0.65 × head (so it sits on the crown of the head) and height
  h has radius r = base/2π and slant L = √(r² + h²). It is cut as a sector
  of radius L and angle 360° × r/L, turned to fit the page, or split into
  equal parts with tabs when it does not fit. Pieces are shelf-packed at
  100 %. When they need more than one page, `index` picks the page and the
  meta gives `pages`. Out-of-range sizes are clamped and recorded as
  `requested_*`. The seed picks the colour scheme, gem order and pattern.
- **Solving:** nothing to solve.
- **Guarantees:** `geometry_checked`, re-checked from the finished pieces.
  The visible lengths of the strips, or the arcs of the cone's parts, add up
  to the target circumference within 0.5 mm. Every strip tab is the overlap
  length. A cone's part angles add up to exactly 360° × r/L. Every piece
  lies inside the printable area at 100 % scale, and no two pieces on a page
  overlap. Nothing is ever scaled down to fit.

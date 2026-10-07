---
title: "Lacing Cards"
blurb: "Lacing cards — a big picture ringed with evenly spaced punch holes and a cut line, spacing and edge margins measured"
category: design
version: "1.0.0"
---
A big picture with a ring of holes to punch and a lace to thread all the
way round.

## What it is

A printable lacing (or sewing) card: a large animal, object or nature
picture, a ring of evenly spaced punch holes around it and a cut line
around the holes. The card can follow the shape of the picture or be a
rounded rectangle, and a page holds one or two cards. The holes can be
numbered in lacing order, and the picture comes in colour or as line art
to colour in first.

## How to use it

Print on card (160 g/m² or heavier), or print on paper and glue it to a
cereal box. Colour the picture if it is line art. Cut along the outer line,
then punch out each grey hole with a single-hole punch (6 mm is the usual
size). A strip of clear tape over the card before punching makes it last
much longer.

Tie a big knot at one end of a shoelace or a length of wool — wrap the
other end tightly in tape to make a needle — and start at the top hole.
Lace in and out of the holes all the way round (a running stitch), or
over the edge each time (a whip stitch), until you are back at the start.
With numbers on, follow them in order. Unlace and start again!

## Purpose

Lacing is a classic fine-motor activity for children from about three:
holding the card in one hand and guiding the lace with the other trains
two-handed coordination, the pincer grip and hand–eye control, and
following the ring of holes builds concentration. It is also a quiet,
screen-free travel and waiting-room activity.

## History

Friedrich Fröbel's first kindergartens in the 1840s gave children
"occupations" that included pricking outlines into card and sewing them
with coloured wool, and Victorian and Edwardian nurseries had printed
sewing cards with punched holes. Montessori classrooms kept lacing and
sewing frames for practical life, and wooden and card lacing sets have
been nursery staples ever since.

## This implementation

- **Spec knobs:** `icon` (the picture, or random; a second card on the
  page always shows a different picture), `cards_per_page` (1 or 2),
  `hole_mm` (hole diameter 3-12), `spacing_mm` (the least distance between
  any two hole centres, from the hole diameter + 3 up to 40),
  `margin_mm` (the least distance from a hole centre to the cut edge, from
  the hole radius + 3 up to 25), `cut` (shape or rectangle), `colour`,
  `numbers`, `width`, `height`. Out-of-range sizes are clamped and the
  requests recorded in meta.
- **Generation:** the picture's silhouette (with its line widths) is
  rasterised at 0.5 mm (coarser only for cards over 260 mm, to at most
  520 pixels a side), and an exact Euclidean distance transform gives
  the distance from the picture at every point. The holes sit on the level
  line of that distance at an offset that starts at the hole radius plus
  1.5 mm and grows 1 mm at a time; each step out rounds off thin parts such
  as tails, legs and handles. On each ring the holes are placed at equal
  steps of arc length, starting at the top, as many as the spacing allows,
  dropping one at a time until every pair of holes keeps the spacing; a
  ring that needs more than a tenth fewer holes than its length allows is
  passed over for the next offset. The picture is scaled to the largest
  size that leaves room for the ring and margin. A shape cut is the level
  line half a millimetre beyond the margin; a rectangle cut is the holes'
  bounding box grown by the margin, with rounded corners.
- **Guarantees:** on every card, measured after layout: every pair of
  holes (not only neighbours) is at least `spacing_mm` apart centre to
  centre; every hole is inside the cut and at least `margin_mm` from it;
  every hole is clear of the picture by at least 1 mm beyond its radius on
  the 0.5 mm raster (`holes_checked`, with the measured minimums in meta).
  The tests check the distance transform against brute force, re-measure
  all pairs, and re-check margin and clearance on pixels at 4 pixels per
  millimetre: the filled cut shape covers a disc of the margin round every
  hole and the picture has no ink inside any hole. Every picture in the set
  passes on a Letter page without dropping holes.

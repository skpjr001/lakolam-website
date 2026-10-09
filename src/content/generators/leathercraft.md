---
title: "Leather patterns"
blurb: "Leather patterns — a card holder, key fob, luggage tag or coin pouch with stitch holes at the pricking iron's pitch, every corner on a hole and mated edges with equal hole counts"
category: design
version: "1.0.0"
---
A card holder, key fob, luggage tag or coin pouch to cut and hand-stitch
from leather, with every stitch hole set at your pricking iron's spacing.

## What it is

A full-size pattern for a small leather item, with every piece's outline
and every stitch hole marked. The pattern is drawn for one pricking iron —
3, 3.38, 3.85 or 4 mm between prongs — and every straight run of stitching
is a whole number of prongs long, so the iron walks the line without a
short or long stitch, and every corner of a stitch line falls on a hole.
Pieces that are sewn together have the same number of holes along the
seam, lined up. A row of ten prong marks at the foot of the page lets you
check your iron against the print.

## How to use it

1. Print at 100 % ("actual size") and check the 1 cm box and the row of
   prong marks against your iron.
2. Glue or tape the pattern to card, cut it out, and trace each piece onto
   the leather's flesh side; cut the outlines and any window, slot or
   thumb notch.
3. Mark the stitch line with a wing divider set to the stitch margin.
   Punch the corner holes (circled) with an awl, then walk the pricking
   iron along each straight run between them, one prong in the last hole.
4. Lay the pieces together as the instructions say (pockets on the body,
   front on the back, or the strip folded round its ring), check the holes
   line up, and saddle stitch with two needles.
5. Bevel, sand and burnish the edges.

## Purpose

Leathercraft patterns often leave the hole spacing to the maker, and a
seam that does not divide evenly by the iron ends with a squeezed or
stretched stitch, or a corner that misses a hole. Designing every
dimension to the pitch removes that, and checking the mated seams hole by
hole proves the pieces will line up.

## History

Hand-stitched leather goods use the saddle stitch, two needles passing
through each hole, which holds even if one stitch breaks. Pricking irons —
forks of evenly spaced prongs that mark or punch a row of slanted holes —
spread from French saddlery; modern makers choose an iron pitch for the
look of the stitching, from about 3 mm on small goods to 4 mm and up on
bags.

## This implementation

- **Spec knobs:** `item` (`card_holder`, `key_fob`, `tag`, `pouch`);
  `pitch` (`p3`, `p3_38`, `p3_85`, `p4`); `margin_mm` (2.5–6, the stitch
  margin); `thickness_mm` (0.6–3, leather thickness); `look`; `index`
  (which page if the pieces need more than one); `page`; `margin`
  (inches).
- **Generation:** the card holder (cards 85.6 × 54 mm) has a body and a
  pocket on each side, stitched along a U; the key fob is one strip whose
  two ends fold round the ring and are stitched round; the luggage tag is
  a windowed front on a back with a strap slot (business card 89 × 51
  mm); the coin pouch is a front on a back with a round flap and a snap.
  Inner widths allow the content plus 3 mm plus twice the leather
  thickness, rounded up to whole pitches; the pouch's chamfers are sized so
  their diagonals are whole pitches too. Cut edges are the stitch line
  grown by the margin, rounded about the corner holes. Pieces are packed on
  the page at 100 %; if they do not fit inside the margin asked, a 0.25 in
  margin is used and recorded as `requested_margin`. The seed picks the
  leather colour, the fob's width, the thumb notch, the tag's slot room
  and the pouch's flap and chamfer.
- **Solving:** nothing to solve.
- **Guarantees:** `stitching_checked`. Along every seam the holes are
  exactly one pitch apart and every corner of the stitch line is a hole;
  every hole is at least the margin from every cut edge, and holes on an
  edge seam exactly the margin; each piece, moved onto its mate (laid on
  it, or folded over), puts every hole on a hole of the other, with equal
  counts along the shared stretch; the flap's snap meets the front's; the
  pieces fit the page without overlapping.

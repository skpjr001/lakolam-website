---
title: "Balancing Mobile"
blurb: "Balanced hanging mobiles to cut from card — every bar balances exactly, its own mass included, and swinging parts never collide"
category: design
version: "1.0.0"
---
A hanging mobile to cut from card, in the style of Alexander Calder, with
every bar's balance point already worked out.

## What it is

A page of pieces — bold leaf, pebble or geometric shapes and card bars —
and a drawing of how they hang. Each bar hangs from one hole and carries
two loads on strings: a shape, or another bar with everything below it.
The hanging hole on every bar is placed exactly where the two sides balance,
counting the weight of the bar itself, so the finished mobile hangs level,
and the parts are spaced so they can turn freely without hitting each other.

## How to use it

Print the page on card, or glue it to thin card. Cut out every piece.
Pierce each marked hole with a needle or a sharp pencil; the red hole on
each bar is the one it hangs from. Tie the strings as the drawing shows:
each string's length in centimetres is printed beside it, measured from
hole to hole. Work from the bottom up: finish the lowest bar with its two
loads, then hang it from the bar above, and so on. Hang the top bar by its
red hole from a thread.

Glue, tape and knots add a little weight. If a bar tips, slide a tiny
bead of sticky tack along it, or trim a sliver from the heavy side, until
it hangs level.

## Purpose

A mobile is a hands-on lesson in balance and forces: a lever balances when
the weight on each side times its distance from the pivot is the same on
both sides. Because every piece is cut from the same card, its weight is
simply its area, so the maths can be checked with nothing more than a ruler
and squared paper. It is also a striking piece of kinetic art for a
classroom ceiling or a nursery.

## History

The American sculptor Alexander Calder made the first mobiles in the early
1930s; Marcel Duchamp gave them their name. Calder's hanging sculptures of
painted metal shapes on wire arms, balanced so that every part moves in
the air, became one of the best-known forms of modern art, and making a
paper or card mobile is now a favourite school project on balance and
forces.

## This implementation

- **Spec knobs:** `structure` (`chain`: each bar carries a shape and the
  next bar down; `branched`: the top bar carries a chain at each end);
  `levels` (2–4 bars deep); `shapes` (`organic`, `geometric`, `mixed`);
  `look` (`colour`, `outline`); `page`; `margin` (inches, 0.1–1).
  Out-of-range values are clamped and recorded as `requested_*`.
- **Generation:** shapes are star-shaped outlines (wobbly pebbles, pointed
  leaves, circles, triangles, squares, diamonds, stars) with a hole just
  inside the top edge, straight above the centroid. The mobile is built
  from the bottom up: each bar gets seeded string lengths, the two loads
  are set just far enough apart that their swept shapes clear each other
  (plus a little seeded slack), and the hanging hole goes at the balance
  point — the loads' areas and the bar's own area, weighted by position.
  Hanging holes sit near each bar's top edge and load holes near its
  bottom edge, so a bar returns to level. All pieces are packed onto the
  page at one common scale under the hanging drawing, and string lengths
  are printed at that scale. The seed picks the shapes, sizes, string
  lengths, which side each load hangs, and the colours.
- **Solving:** nothing to solve.
- **Guarantees:** `balance_checked`. For every bar, the torques about its
  hanging hole — each side's load (the area of every piece below it)
  times its distance along the bar, plus the bar's own area at its middle
  — sum to zero within 1e-9, recomputed from the pieces as drawn on the
  page (areas and centroids by the shoelace formula, holes measured along
  the drawn bar). Every shape's hole is straight above its centroid, every
  hole lies on its piece, and no two pieces overlap on the sheet. Each
  part sweeps a solid of revolution as it turns on its string; sliced by
  height, the two loads on every bar (strings included) keep a gap
  at every height (`min_clearance_cm` reports the smallest, at printed size), so nothing can collide however the parts
  turn. The tests also turn every part to random angles and check by
  slicing that no two parts touch. Real string, glue and knots are not
  weightless: the drawing is exact for the card, and a bead of tack trims
  the rest.

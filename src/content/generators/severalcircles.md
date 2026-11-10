---
title: "Several Circles"
blurb: "Translucent overlapping circles in the spirit of Kandinsky's Several Circles, every overlap an exact flat face"
category: design
version: "1.0.0"
---
Translucent circles floating and overlapping in space, in the spirit of
Wassily Kandinsky's circle pictures.

## What it is

A composition of circles of many sizes and colours drifting on a deep
blue-black ground, or on a pale one, with a few fine lines and arcs. One
large dark circle with a glowing halo anchors the page; the others gather
round it and across the field, some alone, some overlapping. Where circles
overlap, their colours mix, as if each were a disc of coloured glass. A
third mode is a grid study: a chequer of painted squares, each holding
three to five rings, after the colour study of concentric circles Kandinsky
painted in 1913. Every page is a new composition made in his spirit, not a
copy of his paintings.

## How to use it

Print the cosmos page as wall art; it is at its best large and on matte
paper. Look at how the overlaps make new colours: a blue circle over a
yellow one gives a third colour that belongs to neither. The light version
looks like glazes of watercolour and is a good model to copy with real
paint, layering transparent washes in the same order. The grid study is a
colour game for a class or for yourself: in each square, notice how a ring
changes when its neighbour changes, then paint your own grid with one rule
per row — warm against cool, light against dark.

## Purpose

To show colour mixing and visual balance with the simplest of shapes, and
to make translucency exact: every overlap is a real piece of the picture
with its own colour.

## History

Wassily Kandinsky (1866-1944), born in Moscow, was one of the first painters
of fully abstract pictures, and wrote *Concerning the Spiritual in Art*
(1911) about the inner effect of colour and form. He taught at the Bauhaus
from 1922 until it closed in 1933, and published *Point and Line to Plane*
(1926), in which he analysed the elementary forms. In the mid-1920s the
circle became his central motif; he called it the synthesis of the greatest
oppositions. *Several Circles* (*Einige Kreise*, 1926), now in the Solomon
R. Guggenheim Museum, New York, shows overlapping translucent circles on a
dark ground around a large black circle with a blue halo. His 1913 study of
squares with concentric circles (Städtische Galerie im Lenbachhaus, Munich)
is a grid of small panels of rings. The circle composition rule here is our
own; the colour model uses Oklab (Björn Ottosson, 2020).

## This implementation

- **Spec knobs:** `width`, `height` (points, 200-3000); `mode` (`cosmos`,
  `light`, `grid`); `circles` (5-40 in a composition, halos not counted);
  `halos` (halo rings round the large circle and up to three others);
  `lines` (0-12 thin lines and arcs); `opacity` (0.2-0.9: how far each
  circle moves the colour beneath it toward its own); `cells` (4-30, grid
  study only; the grid is filled out to whole rows).
- **Generation:** a large dark circle with a two-step halo is placed near a
  rule-of-thirds point; the others take radii on a steep power law and are
  each the best of 80 seeded candidates, scored so that the area- and
  contrast-weighted centre of the composition moves toward the middle of
  the page, about three in five circles are rewarded for overlapping and
  the rest for standing alone; a candidate is refused if any two outlines
  would come within 1.2 % of the page of touching (outside or inside), or
  if it would stack more than three deep. Every circle and halo is a
  polygon (about one vertex per 1.6 pt); all go into one planar
  arrangement, and each face's winding number for each circle gives its
  cover. Cosmos colours a face by "over" in Oklab, the covering circles in
  stacking order from the ground up, each moving the colour a fraction α
  toward its own; light colours it by multiplying the ground, per channel
  in linear light, by `1 − α(1 − c)` for each covering circle. The palette
  is nine hues each at its natural lightness. The grid study gives every
  cell a ground and rings that shrink by 55-75 % and shift off-centre within
  the room left, each hand-wobbled.
- **Guarantees:** deterministic per seed. The faces partition the union of
  the circles exactly: for every circle the faces under it add up to its
  area, and the covered faces add up to the area of the union computed
  separately by polygon booleans (tested); a point inside each face lies in
  exactly the circles of its cover, checked by point-in-polygon (tested);
  each face's colour is the stated blend of exactly its covering circles
  (tested); no two outlines graze (tested). In the grid every ring lies
  inside the one around it, wobble included, and differs from it by at
  least 0.12 in Oklab (tested). All ink lies inside the page.
  `verification: faces_partition_union_blend_of_covering_circles` (grid:
  `rings_nest_with_gap_and_contrast`). Clamped knobs are reported as
  `requested_<field>`.

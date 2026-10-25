---
title: "Mola Panel"
blurb: "A mola-style reverse appliqué panel: a bold figure ringed by nested channels of even width, slits in the ground"
category: design
version: "1.0.0"
---
A bold figure ringed again and again by narrow channels of colour, in the
manner of the reverse-appliqué molas of Guna women.

## What it is

A mola-style panel. Layers of coloured cloth are imagined stacked; the
figure in the middle — a rounded blob, a many-pointed star, a turtle-like
creature, or the dark shape of your own picture — is cut through the top
layer, and the cutter follows its outline outward again and again, so the
figure is ringed by channels of even width with strips of the top cloth
between them. Channels also run inward to the figure's heart and round the
edge of the panel, and the open ground is broken with short coloured slits
that follow the flow of the rings.

## How to use it

Follow one channel all the way round the figure, and watch how the rings
change shape as they move out: sharp points soften into curves, and where
two rings meet they merge. To colour it, choose the line-art palette and
alternate two or three colours from ring to ring, as a mola maker
alternates cloths.

## Purpose

A vivid, rhythmic page that shows what an outline does when it is repeated
— and a gentle introduction to a living textile art.

## History

Molas are made by Guna (formerly spelt Kuna) women of the San Blas
archipelago (Guna Yala) of Panama and of Colombia, and are worn as the front
and back panels of their blouses. The technique — reverse appliqué, cutting
through layered cloths and hemming the edges with tiny stitches — developed
in the late 19th and early 20th centuries from earlier body-painting
designs. Molas show geometric designs, animals and plants, scenes of daily
life and stories; they are an important source of income and of cultural
identity, and their designs belong to their makers. This page is mola-style:
a geometric grammar in the manner of the tradition, with geometric figures by
default, and it copies no mola. See Mari Lyn Salvador, ed., *The Art of Being
Kuna* (UCLA Fowler Museum, 1997), and Diana Marks, "The Mola", in
*Encyclopedia of World Dress and Fashion* (2010).

## This implementation

- **Spec knobs:** `shape` (auto = the picture if one is given, else blob,
  star or creature by seed; blob, star, creature, picture), `image` (a PNG or JPEG for the picture shape;
  empty = a built-in silhouette), `channels` (1–14 round the figure; 0 =
  five to eight by seed), `pitch` (channel spacing as a fraction of the
  panel's short side), `slits`, `palette` (auto, scarlet, night, line_art),
  `width`, `height`, `margin`.
- **Generation:** the figure is a union of polygons (a blob from a few
  harmonics, a star, a creature of ellipses; a picture's largest dark region
  traced from a threshold, smoothed and decimated), fitted to the panel.
  Channel k is the boolean difference of two round-joined offsets of the
  figure itself, at k·pitch and k·pitch + width, clipped to the field inside
  the two frame channels; inward channels repeat this at negative distances
  until the figure is used up. Slits sit on a jittered grid in the ground,
  along the level lines of the distance to the outermost channel, kept a
  channel's width clear of it.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic per seed; `verification:
  channels_disjoint_and_of_constant_width`. Tested: no two channels overlap
  (pairwise boolean intersection has zero area) and no slit touches a
  channel; every edge point of every figure channel lies at its channel's
  inner or outer distance from the figure within 0.3 pt (so channel width is
  constant); a picture is cut round and an unreadable one is refused
  cleanly; all ink stays on the page.

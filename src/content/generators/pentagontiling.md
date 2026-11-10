---
title: "Pentagon Tilings"
blurb: "Pentagon tilings: the fifteen families of convex pentagons that tile the plane, from Reinhardt (1918) to Mann, McLoud-Mann and Von Derau (2015)"
category: design
version: "1.0.0"
---
The fifteen known families of convex pentagons that cover the plane with no
gaps and no overlaps, each laid out in its repeating tiling.

## What it is

A regular pentagon cannot tile a floor, but many lopsided convex pentagons
can. Each family is a short list of conditions on the five angles and five
sides — "the angles at B and C add up to 180°", "four sides are equal and
2B + C = 360°" — and every pentagon that meets them tiles the plane in the
same pattern. Fifteen families are known, and since 2017 it has been known
that there are no others. A page shows one family's tiling over the whole
sheet, coloured so that every differently turned or mirrored copy of the
pentagon has its own colour, with the family's number, discoverer and year
underneath.

## How to use it

Pick a type and let the seed reshape the pentagon inside its family, or ask
for the classic shape; each seed gives a new member of the family and the
tiling still fits together exactly. Look for the repeating block — turn on
the unit outline to see it — and count how many copies of the pentagon it
holds: two for the simplest types, twelve for the fifteenth. Trace one
colour across the sheet to see how that copy repeats by sliding alone. The
line-art style is a colouring page: colour by aspect, by pattern, or make
your own rule and see whether it repeats.

## Purpose

A long-running story in mathematics made visible: easy to state, solved
piece by piece over a century by professionals and amateurs, and finished
with a computer. Each page is a true member of its family and a true tiling,
so it can be used to explore which shapes tile and why.

## History

Karl Reinhardt found the first five families in his 1918 dissertation (all
tile with every tile alike under the tiling's symmetries). Richard Kershner
added three more in 1968 and believed the list complete; after Martin
Gardner described it in *Scientific American* (July 1975), Richard James III
found a tenth, and Marjorie Rice, a San Diego homemaker with no training
beyond high school mathematics, found four more (types 9, 11, 12 and 13)
in 1976–77 using a notation of her own; Doris Schattschneider verified and
publicised her work. Rolf Stein found the fourteenth in 1985. In 2015 Casey
Mann, Jennifer McLoud-Mann and David Von Derau at the University of
Washington Bothell found the fifteenth by a computer search, and in 2017
Michaël Rao announced a computer-assisted proof that the list is complete.
See D. Schattschneider, "Tiling the plane with congruent pentagons",
*Mathematics Magazine* 51 (1978); B. Grünbaum and G. C. Shephard, *Tilings
and Patterns* (1987); C. Mann, J. McLoud-Mann and D. Von Derau, "Convex
pentagons that admit i-block transitive tilings", *Geometriae Dedicata* 194
(2018), arXiv:1510.01186; M. Rao, "Exhaustive search of convex pentagons
which tile the plane", arXiv:1708.00274.

## This implementation

- **Spec knobs:** `width`, `height` (points); `margin` (0-200 pt);
  `tile_type` (1-15, 0 = chosen by the seed); `shape` (`seeded`: free
  parameters drawn by the seed, `classic`: the textbook shape); `tile_size`
  (the pentagon's widest span, 12-240 pt); `style` (`colour`, `lines`);
  `colouring` (`aspect`: one colour per copy in the translation unit,
  `chirality`: the pentagon and its mirror image); `palette` (`auto`,
  `garden`, `ocean`, `ember`, `slate`); `rotate` (seeded turn of the whole
  tiling, else the first lattice vector runs level); `show_unit` (outline one
  translation unit); `caption` (type, discoverer and year); `stroke`.
- **Generation:** vertices A–E run counter-clockwise with sides a = EA,
  b = AB, c = BC, d = CD, e = DE. For each family the conditions fix some
  angles; the free angles (and, for types 1–2, free side ratios) are drawn
  by the seed in the family's valid range, two side lengths are solved from
  the closure of the outline, and for types 6–9 and 14, where closure also
  ties an angle, that angle is found by bisection. Shapes with an angle
  under 35° or over 168°, or a side under 0.15 of the longest, are redrawn.
  A recipe of glueings (a new tile's vertex on an earlier tile's vertex, an
  edge along an edge, directly or mirrored) places a small patch; part of it
  is the translation unit (2, 4, 3, 4, 6, 4, 8, 8, 8, 6, 8, 8, 8, 6 and 12
  tiles for types 1–15), and two pairs of equally turned tiles give the
  lattice vectors, Gauss-reduced. The recipes were read off published
  drawings of the fifteen tilings and rebuilt exactly. The unit is repeated
  over the page and clipped to the frame.
- **Guarantees:** every tile is a congruent convex pentagon meeting its
  family's published conditions (tested on the measured angles and sides of
  every unit tile); the tiles cover the plane exactly once: the translation
  unit's area equals the lattice cell's and no tile overlaps another within
  two cells (checked before every page is drawn), and independently over a
  window several cells wide the tiles' clipped areas sum to the window's
  area and random points each lie in exactly one tile (tested for all 15
  types, classic and seeded shapes); edges meet properly — just outside
  every edge lies exactly one neighbouring tile all along it (tested). The
  recipes hold for every seeded shape (tested over 40 seeds per type).
  `verification: congruent_convex_cover_once`. The line-art page passes the
  adult colourability check. Clamped knobs are reported as
  `requested_<field>`.

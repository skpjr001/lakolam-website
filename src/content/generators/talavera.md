---
title: "Talavera Tiles"
blurb: "Talavera-style tile panels in the manner of Puebla: D4-symmetric painted tiles whose corners join into rosettes"
category: design
version: "1.0.0"
---
Panels of hand-painted tiles in the manner of Talavera poblana: cobalt,
yellow, orange and green flowers on milky glaze, joining from tile to tile.

## What it is

A wall panel of square glazed tiles in the style made in Puebla and
Tlaxcala, Mexico. Every tile carries the same painted design: a central
flower, buds on the diagonals and motifs on the edges and corners that are
only half or a quarter of a figure. Laid side by side, the corner quarters
close into rosettes or fans where four tiles meet and the edge halves into
flowers where two meet, so the panel reads as one continuous pattern. The
painting is thick and bright — deep cobalt that stands slightly raised,
with yellow, orange-red and green inside dark drawn lines — and each tile
is painted again by hand, so no two are quite identical. A border of
half-tiles with matching corner tiles frames the panel. The designs are
invented from the tradition's rules; none copies a real tile.

## How to use it

Use the colour panels as prints, backgrounds or patterns for craft and
decoration; the blue-and-white version recalls the older all-cobalt wares.
The line page is a colouring sheet: paint the big petals cobalt, keep the
middle of each flower yellow and orange, the leaves green and the dots
black, and leave the ground white like the glaze. Because every tile is the
same, a colourist can try a different scheme on each tile and see which one
makes the best rosettes where the corners meet.

## Purpose

To show how a single symmetric tile becomes a continuous wall pattern,
and to give a lively, accurate-feeling Talavera look with designs that are
new each time.

## History

Tin-glazed earthenware came to New Spain with Spanish potters in the
sixteenth century; Puebla de los Ángeles, founded in 1531, had good clays
and became its great centre, and by the mid-seventeenth century its potters
had a guild with ordinances governing quality. The ware took its name from
Talavera de la Reina in Spain, whose potteries were famous at the time.
Puebla tiles cover church domes and façades and house fronts, such as the
Casa de los Azulejos in Mexico City. The palette of cobalt blue, yellow,
orange-red, green and black on a milky white glaze, and the raised,
slightly thick blue, are characteristic. Authentic Talavera poblana is
protected by a Mexican denomination of origin (since the 1990s) for workshops in
Puebla and Tlaxcala. In 2019 UNESCO inscribed the "Artisanal talavera of
Puebla and Tlaxcala (Mexico) and ceramics of Talavera de la Reina and El
Puente del Arzobispo (Spain) making process" on the Representative List of
the Intangible Cultural Heritage of Humanity, a joint nomination by Mexico
and Spain.

## This implementation

- **Spec knobs:** `width`, `height` (points, 200-3000); `palette`
  (`polychrome`, `blue_and_white`, `lines`); `across` (2-8 tiles; rows fill
  the page, at most three times as many); `border` (half-depth border and
  corner tiles); `irregularity` (0-1: how far each tile's painting may
  stray from the stencil, up to 0.8 % of a tile).
- **Generation:** the tile has the eight symmetries of the square (D4).
  The seed chooses the central flower (8, 12 or 16 outer petals, inner
  petals offset half a step, an optional pale wash), a lobed band or a ring
  of dots round it, buds and leaves on the diagonals, a quarter rosette or
  a scalloped fan on the corners, a half flower or leaf pair on the edges,
  and black dots on the axes. Each element is built once and placed by its
  orbit under D4 using exact coordinate swaps and sign changes: elements on
  a mirror line are built mirror-exact and placed four times, others eight
  times; rings round the centre are built from one octant. Each tile is
  then repainted by moving its outlines by `a·w(p)·∇F(p)` with `F(x, y) =
  N(x² + y², x²y²)`, seeded value noise of the two D4 invariants, so the
  painted tile keeps its symmetry; the window `w` is zero within 0.04 of a
  tile of its edges. Glaze: a rounded tile shape with a slightly wobbling
  edge inside a grout joint, a faint per-tile tint and a soft sheen; every
  painted shape has a narrow shadow for the raised paint. Border tiles are
  symmetric end to end and side to side; corner tiles carry the border
  bands round all four sides.
- **Guarantees:** deterministic per seed; the stencil and every painted
  tile are D4-symmetric — at random points the paint at each of the eight
  images is the paint at the point (tested); paint just inside every joint
  equals paint just inside the neighbouring tile, so corner and edge motifs
  join exactly (tested), and border tiles join end to end (tested); every
  tile differs from the stencil by at most the stated jitter and not at all
  near its edges (tested); all ink lies inside the page. `verification:
  d4_exact_joins_match_jitter_bounded`. The line page reports the adult
  colourability check as `colorable`. Clamped knobs are reported as
  `requested_<field>`.

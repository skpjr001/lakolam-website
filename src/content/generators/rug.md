---
title: "Rug"
blurb: "Rug - kilim and carpet layouts on a knot grid, symmetric about both axes"
category: design
version: "1.1.0"
---
A kilim or carpet designed knot by knot: nested borders, a central medallion
or an all-over field of guls and stars, mirrored across both centre lines the
way a weaver works, in madder, indigo and saffron.

## What it is

A woven rug is a grid of knots, each one colour, so every shape is built from
little steps — straight lines, 45-degree staircases, hooks. This lays out a
whole rug in that grid:

- an **outline** and a narrow **guard stripe** (teeth, barber-pole stripes,
  dots or a chain), mitred at the corners;
- the **main border**, a band of one repeating motif — running dog, S-shapes,
  ram's horns, eight-pointed stars, hooked diamonds, the elibelinde figure or a
  zigzag — with a star in each corner square, and exactly the right length for
  a whole number of repeats;
- an inner guard stripe; and
- the **field**: a stepped **medallion** (lozenge, hexagon or star) with
  pendants above and below and **spandrels** filling the corners, or an
  **all-over** repeat of one motif alternating with small stars.

The whole design mirrors left to right and top to bottom. An optional
*abrash* shades the ground in horizontal bands, as happens when a weaver runs
out of one batch of dyed wool and starts the next, and an optional fringe
shows the warp threads at both ends.

## How to use it

- **As a print.** The colour versions use traditional dye colours: madder
  red, indigo, saffron, ivory and walnut.
- **As a chart.** Every shape sits on the knot grid, so the page can be read
  as a chart for weaving, needlepoint, cross-stitch or bead work: one knot is
  one stitch.
- **As a colouring page.** The line-art version outlines every patch of
  colour. The patches are small — it suits fine pens and patient colouring,
  and a narrower rug (fewer knots) gives bigger shapes.

## Purpose

Kilims and village rugs are among the richest geometric design traditions,
and their motifs are a visual vocabulary with meanings of their own. The knot
grid makes them a natural fit for charts and colouring, and the strict layout
— border, corners, field, medallion — gives every seed a composed,
recognisable rug rather than a pattern swatch.

## History

Pile carpets and flat-woven kilims have been made across Anatolia, the
Caucasus, Persia and Central Asia for well over two thousand years; the
Pazyryk carpet, found frozen in a Siberian tomb, dates from the 4th-3rd
century BC. Weavers worked from memory or from charts, one row at a time, and
the motifs carried meaning: the elibelinde ("hands on hips") for motherhood
and fertility, the ram's horn for strength, the hooked gul as a tribal emblem,
the running dog in countless borders. Dyes came from plants and insects —
madder root for reds, indigo for blues, weld and saffron for yellows — and the
uneven dye lots produced abrash, now prized as a mark of a hand-made rug.

## This implementation

- **Spec knobs:** `field` (`auto`, `medallion`, `allover`), `medallion`
  (`auto`, `lozenge`, `hexagon`, `star`), `border_motif` (`auto`,
  `running_dog`, `s_motif`, `ram_horn`, `star`, `gul`, `elibelinde`,
  `zigzag`), `field_motif` (for all-over fields: `gul`, `star`, `elibelinde`,
  `ram_horn`; anything else lets the seed choose), `width_knots` (45-121),
  `aspect` (length over width, 1-2), `palette` (`auto`, `madder`, `indigo`,
  `saffron`, `walnut`, `line_art`), `abrash`, `fringe`, page `width`/`height`,
  `stroke` (line art).
- **Generation:** the rug's size is chosen first: the nearest *even* number of
  border repeats each way to the requested width and aspect, so the main
  border between its corner squares is exactly that many repeats and no motif
  sits across a centre line. Each knot's colour is then computed from its
  *folded* coordinates — its distance from the nearest left or top edge — so
  the other three quarters are mirror images by construction. Bands are rings
  by depth from the edge; along a band the position runs from the corner, with
  the diagonal as the mitre. Motifs are small knot bitmaps (all 7 knots tall);
  the medallion, spandrels and stars are stepped shapes with whole-number
  slopes, outlined where they meet another colour. All-over fields place the
  motif on a lattice stretched to fill the field, at double size when the
  field is large, alternating with a secondary star. Colour mode draws each
  colour as one path of knot-row rectangles over a dark backing; line art
  draws the boundaries between knots of different colour. The seed picks
  anything left on `auto`, the two guard stripes, and the abrash bands.
- **Solving:** nothing to solve — a design.
- **Guarantees:** deterministic per seed. **Two-axis symmetry**, tested: for
  every border motif with every medallion and all-over field, at several
  widths and aspects, every knot equals its mirror images across both centre
  lines; with abrash off the drawn colours are symmetric too, and abrash is
  tested to vary whole rows only. **Knot-grid snapping**, tested: every point
  of every drawn path lies on the knot grid (fringe strands on knot centres).
  **Resolved corners**, tested: the border length between corner squares is
  exactly repeats × period with an even repeat count, and the band matches
  the motif tiled whole, column by column, along the top and the side.
  Metadata reports the region count and the smallest region (in knots and
  mm²) — line art is a fine-detail chart, and its smallest patches are single
  knots.
- **Versions:** 1.1.0 — the star medallion now has eight points (before,
  its extra box lay wholly inside the lozenge, so `star` drew the same rug
  as `lozenge`). The seed's own choice never picks the new star, so every
  `auto` rug keeps its picture (meta now names its medallion `lozenge`,
  which is what it always drew). A border-only `field_motif` is reported
  as `requested_field_motif`. Lozenge, hexagon and all-over rugs are
  unchanged.

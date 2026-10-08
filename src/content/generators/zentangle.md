---
title: "Zentangle"
blurb: "Zentangle — a partitioned page, each region filled with its own tangle"
category: design
version: "1.2.0"
---
A page cut into regions, each filled with a different line texture — a
*tangle*.

## What it is

Straight strokes divide the page; every region gets its own repeating
pattern: hatching, scallops, pebbles, spirals, waves, bricks, or deliberate
blank space. The appeal is the contrast between neighbouring textures, which
is also the constraint — two dense tangles side by side read as one grey
smear.

## How to use

Colour each region on its own, or doodle further into the texture. For
crayons, markers, young children or tired eyes, choose the Bold & Easy
version: a few big regions holding big shapes (bands, bubbles, a flower, a
frame) in thick lines, with no fine texture at all.

## History

The Zentangle method was created by Rick Roberts and Maria Thomas in 2004 as
a meditative drawing practice: small repeating patterns drawn without a plan,
one region at a time. The generator makes the substrate — the partition and
the texture choice — that a colourist or doodler then works over.

## The implementation's guarantees

- **Spec knobs:** `cuts`, `tangles`, `pitch`, `size`, `stroke`, `bold`.
- **Bold & Easy (`bold: true`):** a different page, not the fine one with
  thicker lines. At most four cuts, each accepted only if both pieces are big
  (>= 7% of the page) and chunky (no thin wedges); every tangle becomes a
  bold stand-in drawn as whole shapes instead of a clipped texture — hatch
  and wave become one to four straight or wavy bands, pebble and stipple big
  bubbles clear of each other and the edge, scallop and spiral one big flower
  in the region's roomiest spot, brick an inset frame; blank is dropped
  unless it is all that was asked for, and a region too narrow for its shape
  takes the next one that fits. Pitch is 2.2 x `pitch` (75 to 140 Pt,
  absolute, coarsened on retry); one stroke of 3.2 x `stroke` (4.5 pt by
  default, never under 4). Gated by the bold check: lako-validate's **kids**
  profile plus every stroke >= 3 pt plus a flood fill of the rendered page
  measuring every enclosed region against 200 mm². Meta carries
  `bold: true`, `colorable` and a `validation` block. Measured over 40
  seeds: all pass, 14-24 regions, smallest 205-970 mm², typical median
  ~1,700 mm² — against the fine page's 36-152 regions whose clipped
  textures leave 1-4 mm² slivers at region edges.

- **Regions cover the page exactly once**, tested: the partition is convex
  half-plane clipping, and the areas must sum to the page or a tangle is
  leaking outside its region.
- **No two regions in draw order share a tangle** — the grey-smear failure,
  refused by construction and tested.
- Every tangle is drawn over its region's bounding box and *clipped* by the
  scene's group clip, which is what keeps the crate small: a texture never
  has to know the shape it fills.
- **Stipple is excluded from the default palette, and that is a measurement,
  not taste**: its dots come out at ~14 mm² against the adult colourability
  floor of 40 mm², and coarsening the pitch spreads them without growing
  them — a stipple dot *is* ink rather than a region to fill. It remains
  available by naming it in the spec, and such a page reports
  `colorable: false` honestly. A test pins this, so if it ever becomes
  colourable the doc gets corrected rather than quietly drifting.
- The escalation lever is a coarser pitch. Rating basis: none — a design.
- **Version 1.2.0:** a texture is generated over its region's bounding box
  and clipped to the region, so some strokes miss the region entirely — up
  to 30 pt past the page edge. They drew nothing but stayed in the display
  list as ink off the page; they are now left out (after the colourability
  check, so the attempt each page settles on is unchanged). The picture is
  unchanged; the bytes of regular pages change, Bold & Easy pages are
  byte-identical to 1.1.0.

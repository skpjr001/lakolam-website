---
title: "Zentangle"
blurb: "Zentangle — a partitioned page, each region filled with its own tangle"
category: design
version: "1.0.0"
---
A page cut into regions, each filled with a different line texture — a
*tangle*.

## What it is

Straight strokes divide the page; every region gets its own repeating
pattern: hatching, scallops, pebbles, spirals, waves, bricks, or deliberate
blank space. The appeal is the contrast between neighbouring textures, which
is also the constraint — two dense tangles side by side read as one grey
smear.

## History

The Zentangle method was created by Rick Roberts and Maria Thomas in 2004 as
a meditative drawing practice: small repeating patterns drawn without a plan,
one region at a time. The generator makes the substrate — the partition and
the texture choice — that a colourist or doodler then works over.

## The implementation's guarantees

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

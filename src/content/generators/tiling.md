---
title: "Tiling"
blurb: "Islamic star, Truchet, Penrose and Cairo tilings as line art"
category: design
version: "1.0.0"
---
Islamic stars, Truchet fields, Penrose quasicrystals and Cairo pentagons —
four families of tiling, one line-art generator.

## What it is

Full-page geometric patterns from four traditions:

- **Islamic star patterns** by polygons-in-contact — the contact angle
  (30°–75°) changes the whole character of the design;
- **Truchet tilings** — a square tile with arcs, rotated per cell by a noise
  field, producing meandering connected curves;
- **Penrose P2/P3** — aperiodic kite/dart and rhomb tilings by subdivision;
- **Cairo pentagonal** — the street-paving pentagon tiling.

## How to use

Colouring pages: every family emits closed regions. Islamic stars reward
symmetric palettes; Truchet fields read as mazes of ribbon to follow with a
pen; Penrose pages never repeat, which colourists notice halfway through and
either love or curse.

## Purpose

The breadth crate of the design lane — four unrelated geometry traditions
behind one spec, all validated by the same colourability gate. Each family is
a different construction (contact geometry, noise-driven rotation, substitution
rules, direct tiling), so the crate doubles as the workspace's tiling toolbox.

## History

Girih (Islamic strapwork) flourished from the 10th century across the
Islamic world; its polygons-in-contact analysis is modern (Hankin, 1905).
**Sébastien Truchet**, a Carmelite priest, catalogued his tile's patterns in
1704. **Roger Penrose** published his aperiodic tilings in 1974 — later found
echoed in medieval girih and in physical quasicrystals (Shechtman, Nobel
2011). The Cairo tiling paves streets of its namesake city.

## This implementation

- **Spec knobs:** `pattern` (family), `size`, `repeats`, `stroke`.
- **Generation:** each family is its own constructor; Penrose by recursive
  subdivision, Truchet by a random rotation field, stars by
  polygons-in-contact with the angle parameter.
- **What the seed drives:** every family, not just Truchet — Islamic turns
  the stars (one global rotation plus a per-cell phase scheme), Penrose
  rotates and drifts the window into the aperiodic tiling, Cairo samples the
  pentagon family (0.366 is merely the equilateral member) and slides the
  lattice under the page. For a long time only Truchet consumed the RNG and
  the seed was dead for the other three; a test now pins all four.
- **Guarantees:** deterministic per seed; closed-region output validated by
  the colourability gate (region area, stroke width, ink coverage). Penrose
  depths 4+ exceed print resolution at default page size and fail the gate on
  every seed — measured, and recorded on the spec.

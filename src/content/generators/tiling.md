---
title: "Tiling"
blurb: "Islamic star, Truchet, Penrose and Cairo tilings as line art"
category: design
version: "1.3.0"
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

- **Spec knobs:** `pattern` (family), `size`, `repeats`, `stroke`, `bold`
  (Bold & Easy, below).
- **Generation:** each family is its own constructor; Penrose by recursive
  subdivision, Truchet by a random rotation field, stars by
  polygons-in-contact with the angle parameter. Penrose starts from a wheel
  of ten sharp Robinson triangles and applies the standard rules — for P3
  (rhombs) the sharp triangle splits into a sharp and a wide one and the
  wide into two wide and a sharp; for P2 (kites and darts) the half-kite
  splits into a whole small kite and a half-dart, the half-dart into a
  half-kite and a half-dart — then glues each pair of mirror halves into the
  whole tile (rhombs along their shared base, kites and darts along their
  axis) and draws the tiles, with no diagonals. The wheel is large enough
  that its rim stays off the page for every seed's rotation and drift.
- **What the seed drives:** every family, not just Truchet — Islamic turns
  the stars (one global rotation plus a per-cell phase scheme), Penrose
  rotates and drifts the window into the aperiodic tiling, Cairo samples the
  pentagon family (0.366 is merely the equilateral member) and slides the
  lattice under the page. For a long time only Truchet consumed the RNG and
  the seed was dead for the other three; a test now pins all four.
- **Bold & Easy (`bold`):** a chunky colouring page: one heavy line (the
  page / 150, 4 pt at 600 pt) and capped detail. Islamic draws at most 2 x 2
  medallions, each a polygon of 4 to 8 sides holding one closed
  polygons-in-contact star (contact angle held to 20–40 degrees), so the page
  is stars, kites round them and one open ground, with no crossing stubs.
  Truchet is at most 4 x 4; Cairo at most 3 x 3 with its lattice aligned to
  the frame (the seed picks the weave's parity and direction instead of an
  offset, so no pentagon is cut into a sliver). Penrose draws whole P3
  rhombs — each pair of triangles sharing a base merged, no diagonals — at a
  fixed scale (a rhomb edge about an eighth of the page), keeping only the
  rhombs inside a disc clear of the frame: a round medallion of rhombs on an
  open ground. Checked against the kids' profile; meta adds `bold`,
  `colorability_profile` (`kids`) and `stroke_pt`.
- **Guarantees:** deterministic per seed; closed-region output validated by
  the colourability gate (region area, stroke width, ink coverage). At the
  default page size Penrose rhombs pass the print gate on every seed at
  depths 1–5 and fail it on every seed from 6; kites and darts pass at 1–4
  and fail from 5 — measured, recorded on the spec, and pinned by a test.
  Penrose pages are genuine Penrose tilings, checked from the drawn polygons
  alone: every whole tile is a thin 36°/144° or thick 72°/108° rhomb of one
  side length (P3), or a 72-72-72-144° kite or 36-72-36-216° dart with long
  to short sides φ (P2); the tiles cover the starting decagon exactly (areas
  sum to it, no two tiles overlap) and cover the whole page; every interior
  vertex closes at 360° and is one of the legal vertex types (Conway's seven
  for P2; de Bruijn's eight for P3); thick:thin and kite:dart counts tend to
  φ (1.614 and 1.627 at depth 8). Bold pages are tested
  on the rendered page for every family: every patch of paper is at least
  200 mm² (the kids' floor) and every line at least 4 pt; the bold rhombs
  are tested to be true Penrose rhombs (equal sides, angles of 36/144 or
  72/108 degrees).
- **Changelog:**
  - 1.3.0 — every page is wrapped in one group clipped to the page. The
    frame is centred on the page edge, so half its stroke used to sit off
    the page as ink outside the page bounds; the picture is unchanged, the
    bytes of every page change.
  - 1.2.0 — Penrose pages before 1.2.0 were **not true Penrose tilings**:
    the regular page's subdivision gave two pieces of the wide triangle each
    other's kinds, seeded `p3` pages with wide triangles in 36° wedges, never
    produced kites and darts at all, and drew half-triangles rather than
    tiles. Penrose pages now change for every spec and seed; all other
    patterns, and bold Penrose pages, are byte-identical to 1.1.0.
  - 1.1.0 — Bold & Easy mode.

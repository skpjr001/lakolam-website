---
title: "Tessellation"
blurb: "Interlocking tiles whose wiggly edges match exactly, laid by translation or glide"
category: design
version: "1.0.0"
---
Interlocking tiles whose wiggly edges match exactly — Escher's construction,
parameterised.

## What it is

A square tile whose four straight edges are replaced by curves — but in
matched pairs: whatever the right edge does, the left edge does identically,
and likewise top and bottom. Copies of the tile then interlock perfectly, no
gaps and no overlaps. Two laying rules ship: plain translation (wallpaper
group p1) and glide reflection (pg), where alternate columns flip and the
vertical edge must read the same upside down.

## How to use

Colouring pages that reward alternation: the tiles are congruent, so a
two-colour checkerboard scheme always works, and the interlocking makes the
figure-ground flicker that Escher pages are loved for. `wiggle` sweeps from
near-grid to deeply gripping shapes; `harmonics` adds curl.

## Purpose

Deliberately *not* another wallpaper-group generator — all seventeen groups
already live in `lako-geom`, and mandala can stamp motifs under any of them.
This crate makes the other kind of pattern, where the tile outline itself is
the art. It also carries the workspace's cautionary rendering tale: tiles
were once placed with a scaling transform, which scaled the *stroke* too and
shipped a solid black page while every test passed — the stroke-width test
that now exists is named after the incident.

## History

Periodic tilings are ancient craft (Alhambra zellige); the mathematical
census of the 17 wallpaper groups is Fedorov (1891). **M. C. Escher** turned
edge-modification into an art form from the 1930s after visiting the
Alhambra — his notebooks systematise exactly the matched-edge construction
this crate automates. Heesch later classified the edge-modification types.

## This implementation

- **Spec knobs:** `size`, `across`, `wiggle`, `harmonics`, `glide`,
  `stroke`, `kids`.
- **Generation:** each edge is a sum of sine harmonics that vanish at both
  ends — so the tile *cannot* fail to close, by construction. Glide mode
  keeps only odd harmonics on the vertical edge (the symmetry a flipped
  neighbour requires, proven in tests rather than assumed). Degenerate tiles
  (too flat, or bulging past the neighbour's edge) are rejected by measure.
- **Guarantees:** exact edge matching (shared curve, not similar curves);
  deterministic per seed; colourability-gated with tile-size escalation; the
  stroke on the page is the stroke in the spec, asserted by test.

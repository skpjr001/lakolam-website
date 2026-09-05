---
title: "Flow Field"
blurb: "Evenly spaced streamlines through a noise field"
category: design
version: "1.0.0"
---
Evenly spaced streamlines through a noise field — hair, water, wind, made of
lines.

## What it is

A vector field is built from layered gradient noise; streamlines are traced
through it by numerical integration and seeded so that no two lines crowd
each other and no gap yawns. The result reads as combed texture — currents,
grain, contour-like flow — optionally with stroke width modulated by field
strength, or the field curled for vortex structure.

## How to use

As texture pages and backgrounds: the even spacing means the page has a
uniform tone that colours or shades predictably. Following a single line
across the page is its own quiet activity. Pair with a mask (a silhouette
left empty) for figure-ground pages.

## Purpose

The generative-art staple of the design lane, and its most parametric one:
`scale`, `octaves`, `separation`, `step` and `curl` each change the fabric of
the page rather than its arrangement. The crate owns its noise implementation,
so the field is identical on every platform — a determinism requirement, not
an optimisation.

## History

Streamline visualisation is old fluid dynamics; the even-spacing seeding this
crate uses is **Jobard & Lefer's** algorithm ("Creating Evenly-Spaced
Streamlines of Arbitrary Density", 1997). Flow fields entered generative art
through Processing-era practice (Perlin noise driving particle paths) and
became one of its signature textures.

## This implementation

- **Spec knobs:** `size`, `scale`, `octaves`, `separation`, `step`,
  `max_steps`, `modulate_width`, `curl`.
- **Generation:** own gradient-noise implementation (no external noise crate,
  for wasm-identical output), RK4 integration, Jobard–Lefer seeding from a
  queue of candidate points at fixed offsets from existing lines.
- **Guarantees:** deterministic per seed; line spacing bounded below by
  `separation`, which is also what keeps the colourability gate's ink
  coverage in range.

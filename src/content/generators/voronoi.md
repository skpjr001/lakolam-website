---
title: "Voronoi"
blurb: "Cellular and stained-glass patterns from relaxed Voronoi cells"
category: design
version: "1.0.0"
---
Cellular and stained-glass patterns from relaxed Voronoi cells.

## What it is

Seed points are scattered with Poisson-disk spacing (no two too close); the
plane is divided into cells, each containing everything nearer its seed than
any other; Lloyd relaxation nudges the cells toward even, honeycomb-like
shapes. The cell edges become line art — optionally with an inner offset per
cell, which reads as leaded stained glass.

## How to use

Colouring pages, with a rule of thumb: neighbouring cells in contrasting
colours (the four-colour theorem guarantees four suffice). The `lead` inset
style suits marker colouring — the border absorbs wobble. `relax` sweeps the
character from jagged shards (0) to soap-bubble evenness (3+).

## Purpose

The design lane's cellular texture — organic without being botanical. It is
also the crate that exercises the geometry stack hardest: Delaunay
triangulation, half-plane clipping, polygon offsetting, all deterministic
per seed.

## History

**Georgy Voronoy** formalised the diagrams in 1908, though Descartes sketched
the idea (1644) and John Snow's 1854 cholera map used one implicitly.
**Stuart Lloyd's** relaxation dates to 1957 (published 1982). Voronoi cells
recur in nature — dragonfly wings, cracked mud, giraffe patches — which is
why the pages read as organic.

## This implementation

- **Spec knobs:** `size`, `spacing` (Poisson-disk radius), `relax` (Lloyd
  passes), `smooth`, `lead` (stained-glass inset), `stroke`.
- **Generation:** Poisson-disk sampling, Delaunay → Voronoi duality,
  half-plane cell clipping, optional per-cell inner offset.
- **Guarantees:** deterministic per seed; every cell is a closed region, so
  the colourability gate's region checks apply directly; minimum region area
  enforced by the spacing floor.

---
title: "Isohedral Tilings"
blurb: "Escher-style interlocking tilings by Kaplan's isohedral types, properly coloured"
category: design
version: "1.0.0"
---
Escher-style interlocking tiles in twenty-six tiling types — every
tile the same shape, every edge fitting its neighbour exactly.

## What it is

A page covered by copies of one curvy tile, with no gaps and no overlaps.
The tiles turn, flip and slide against each other according to one of the
*isohedral tiling types*: the 93 ways a single tile can cover the plane so
that the pattern looks the same from every tile. Each type says which edges
of the tile meet which, and so what shape each edge may take — a free curve,
a curve that is its own mirror image, a curve that looks the same after a
half turn, or a straight line. Within those rules the edges here are drawn
fresh for every page, so the tiles become lizards-without-faces, birds,
propellers, puzzle pieces and stars. The tiles are coloured so that no two
neighbours share a colour, using as few colours as the pattern allows (two
or three).

## How to use it

Frame it as it is, or print it in line art and colour it. With the line-art
page, pick two or three colours and give each tile a colour different from
every tile it touches; the pattern always allows it, and the result is the
flicker of figure and ground that makes Escher's prints famous. Try turning
single tiles into creatures: an eye and a mouth in the same spot on every
tile brings the whole page to life. Use a heavy felt pen to trace one tile
first, and the shape will jump out of the pattern.

## Purpose

The typed, general companion to the simple square-grid construction in the
tessellation pages. Where that one slides a single tile along two directions,
these pages cover tiles that rotate by thirds, quarters and sixths, flip
across glide lines and pair up by half turns, on hexagonal, pentagonal,
square and triangular corner layouts — the full vocabulary Escher worked in.

## History

M. C. Escher filled notebooks from 1937 with a private theory of how shapes
can tile, drawn out of his visits to the Alhambra and George Pólya's 1924
paper on the wallpaper groups. Heinrich Heesch classified the asymmetric
tiles by how their edges meet (1932, with Kienzle 1963), and Branko Grünbaum
and G. C. Shephard enumerated all 93 isohedral types, numbered IH1 to IH93,
in *Tilings and Patterns* (1987). Craig S. Kaplan turned the classification
into software: his thesis (2002) and the Tactile library parameterise every
type by its tiling vertices and the shape class (J, U, S, I) of each edge.

## This implementation

- **Spec knobs:** `size`, `margin`, `ih` (the Grünbaum–Shephard number, or
  0 for a seeded pick), `family` (any / hexagon / pentagon / quad /
  triangle, for seeded picks), `tiles_across`, `wiggle` (edge bend as a
  fraction of edge length), `harmonics`, `irregularity` (how far tile
  corners move from the type's defaults), `angle`, `palette` (escher,
  ocean, citrus, pastel, jewel, mono, line_art), `stroke`, `kids`.
- **Types:** IH1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 13 (hexagonal corners),
  IH21, 23, 28 (pentagonal), IH33, 41, 43, 46, 53, 55, 57 (quadrilateral),
  IH79, 84, 86, 88, 90 (triangular). Their tiling-vertex coefficients, edge
  orientations, edge-shape classes, aspect transforms, translation vectors
  and colourings are transcribed from Kaplan's Tactile (BSD-3, credited in
  the source).
- **Generation:** the type's free parameters are jittered around Tactile's
  defaults; each edge-shape class gets one seeded curve
  `(s + sum b_k sin(k pi s), sum a_k sin(k pi s))`, which always runs corner
  to corner; the class is kept by harmonic parity (U: odd across, even along;
  S: even both; I: straight). Every edge is the image of its class's curve
  under the edge's own transform, so neighbours draw one shared curve.
  A candidate is rejected and redrawn (smaller bends, then the type's own
  corners) unless it passes the interlock check — simple outline, copies in
  a translational unit summing exactly to the unit's area, no crossing with
  any surrounding copy — and a shape check (no corner under 22 degrees, no
  waist narrower than 12% of the tile). Tiles are clipped to the frame by an
  explicit clip, then framed. Line-art pages go through the colourability
  gate and are redrawn with larger tiles if they fail.
- **Solving:** nothing to solve — a design.
- **Guarantees:** deterministic per seed. Tested for every type over several
  seeds: each interior tile edge coincides point for point with exactly one
  neighbour's edge under the tiling transforms; tile outlines are simple
  closed curves; a probe grid is covered by exactly one tile at every point;
  copies sum to the translational unit's area; edge curves obey their shape
  class; Kaplan's colouring is proper (neighbours always differ). Fills use
  only the chosen palette; line art is black only. About 2 ms per page.

---
title: "Octagon Grid"
blurb: "Octagon grid paper — regular octagons and squares (the 4.8.8 tiling) at an exact 6 to 15 mm side"
category: paper
version: "1.0.0"
---
Octagon grid paper — regular octagons with small squares between them, the
classic octagon-and-square tiling, at an exact side length.

## What it is

A sheet tiled with regular octagons standing on a flat side, side by side in
rows and columns. Where four octagons meet they leave a small square turned
on its point. Every edge on the page is the same length — the chosen side,
6, 8, 10, 12 or 15 mm — so each square is exactly as wide along its edge as
an octagon's side, and octagons repeat every side × (1 + √2): 24.1 mm for a
10 mm side.

The tiled area is a whole number of octagons across and down, framed, so the
squares along its edges are cut exactly in half.

## How to use it

Print at actual size ("Actual size" or "100%" in the print dialog, never "Fit
to page").

Colour the octagons and squares to design floor tiles and mosaics — the
octagon-and-dot pattern of classic bathroom floors — or patchwork and stained
glass. Use it in maths lessons to measure angles (each octagon corner is
135°, each square corner 90°, and around every point 135° + 135° + 90° make
a full 360°), to count shapes, or to explore symmetry. Turn the page a
quarter turn and the pattern is unchanged.

## Purpose

Design paper for tilers, quilters and mosaic makers, and a geometry page
for tessellations and angle work in school. In a book it adds a distinctive
pattern section to a colouring or design notebook.

## History

In the language of tilings this is the **truncated square tiling**, vertex
configuration 4.8.8: every corner is shared by one square and two octagons.
It is one of the eight semiregular (Archimedean) tilings of the plane by
regular polygons, which Johannes Kepler set out systematically in *Harmonices
Mundi* (1619). It is also an old floor: octagon-and-square stone and
ceramic floors appear in many traditions, and small white octagon tiles with
a coloured square "dot" were a favourite of early 20th-century bathrooms.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape`; `margin_mm` (0–30, default 10); `side` (mm6, mm8, mm10, mm12,
  mm15); `ink` (medium_gray by default, or blue, green, brown and every other
  named paper colour); `weight` in points (0.1–2).
- **Generation:** octagon centres sit exactly one period, side × (1 + √2),
  apart, as many as fit each way, and the block is centred in the content
  box. Each octagon contributes its four slanted edges and, inside the field,
  its top and left sides (the ones it shares with the octagon above and to
  the left), so every edge is drawn exactly once; the frame closes the field.
- **Solving:** nothing to solve — a page to colour and design on. The seed is
  unused: every seed gives the same sheet.
- **Guarantees:** the octagons are regular and the squares are squares —
  every edge is exactly one side long and horizontal, vertical or at 45°,
  centres are exactly one period apart (checked to 1e-9 pt on every page
  size, orientation and side) — no edge is drawn twice, and all ink, stroke
  widths included, stays inside the margins. A knob outside its range is
  clamped and the request recorded as `requested_<field>` in the meta.

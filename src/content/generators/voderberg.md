---
title: "Spiral Tilings"
blurb: "Spiral tilings: one tile, two interlocking spiral arms, in the manner of Voderberg's enneagon spiral"
category: design
version: "1.0.0"
---
One tile, two arms: copies of a single slender shape winding round each
other from a tight heart at the centre out to the edge of the page.

## What it is

A **spiral tiling**: the whole plane covered, without gaps or overlaps, by
copies of one tile, laid so that they form two spiral arms that interlock
like the grooves of a double-start screw. The tile is a thin triangle
whose sides may be broken by zigzags or gentle S-curves — with all three
sides broken it has nine sides, like the famous tile Heinz Voderberg found
in 1936. Every tile on the page is the same shape, only turned and moved.

## How to use it

A poster or a page to colour. Follow one arm from the centre outwards and
you never cross into the other; colour the arms in two colours, or colour
each half-turn differently to see the rings. The **fold** sets how many
tiles meet round the heart (a smaller fold gives fatter tiles and a coarser
spiral), **rings** sets how many half-turns fit across the page, and
**bend** how strongly the sides zigzag. The **ink** palette gives the
outlines alone.

## Purpose

A design-lane page that shows a surprising fact of geometry — one shape
can tile the plane in a spiral, not only in rows — and proves it: the
tiling is built so that it closes up exactly, and the tests check it.

## History

Heinz Voderberg published the first spiral tiling by a single tile, a
nine-sided shape, in 1936 ("Zur Zerlegung der Umgebung eines ebenen
Bereiches in kongruente", *Jahresbericht der Deutschen
Mathematiker-Vereinigung* 46). Michael Goldberg (1955) and others found
spiral tilings by triangles and pentagons, and Branko Grünbaum and Geoffrey
Shephard collected them in *Tilings and Patterns* (1987, §9.5). This page
uses a construction in their spirit: a strip of isosceles triangles that
turns at two-triangle fans, wound as two arms; the tile shapes are our own
point-symmetric decorations of the triangle, not Voderberg's exact tile.

## This implementation

- **Spec knobs:** `tile` (auto, triangle, pentagon, heptagon, enneagon,
  curved), `fold` (6–36, even; 0 = the seed's choice), `rings` (3–24),
  `bend` (0–1), `colour_by` (auto, arms, rings, bands), `shape` (auto,
  page, disc), `palette` (auto, majolica, kilim, celadon, dusk, ink),
  `frame`, `caption`, `width`, `height`, `margin`. Clamped values are
  reported as `requested_<field>`.
- **Generation:** the triangle has apex angle 360°/fold, legs 1, base
  b = 2 sin(α/2). Each arm is a strip of triangles: run s has ⌊s/m⌋ bases
  on its inner side (m = fold/2), alternating apex-out and apex-in, and
  turns by α at a fan of two triangles. Runs start at Q₀ = −w₀/2,
  Q_{s+1} = Q_s + ℓ_s b u_s; the second arm is the first turned half a
  revolution. The outer side of each run is exactly the inner side of a
  later run of the other arm, and the first half-turn's zero-length runs
  are fans that close the centre. Side decorations are point-symmetric
  about each side's midpoint (zigzags at a third and two thirds, or cubics
  through the same points), with the second leg the first turned about the
  apex — so fans, strips and strip-to-strip contacts all still fit. The
  scale puts `rings` half-turns across the picture's narrow side, and the
  spiral is grown half a turn at a time until it covers the picture (at
  most 30,000 tiles). The seed picks the tile, fold, colouring, shape,
  palette, the leg zigzag's sense and the tiling's turn.
- **Solving:** Nothing to solve.
- **Guarantees:** on 120 × 120 sample points of a disc reaching the
  spiral's last run, every point lies in exactly one tile, for folds 6,
  10, 12 and 18 with straight, zigzag and curved sides (no gap, no
  overlap); every tile has the prototile's edge-length sequence in the same
  cyclic order and the same signed area (direct congruence, no
  reflections); the enneagon has nine sides, is simple and has the
  triangle's area; every default-size page is complete (meta `disc_complete`);
  all ink stays on the page; deterministic per seed.

---
title: "Sashiko"
blurb: "Sashiko stitch templates — moyozashi patterns dashed so no stitch lies across an intersection"
category: design
version: "1.0.0"
---
Japanese running-stitch patterns laid out as stitch templates: every line
dashed into stitches, with every crossing left open, the way a sashiko
stitcher works them.

## What it is

Sashiko ("little stabs") is Japanese running-stitch needlework. Its
*moyōzashi* patterns are drawn on a grid and stitched as long passes of
even stitches: asanoha (hemp leaf), shippō (seven treasures, overlapping
circles), seigaiha (blue ocean waves), kikkō (tortoiseshell hexagons), yabane
(arrow feathers), uroko (fish scales), kagome (basket weave), hishi
(diamonds) and nowaki (grasses in the autumn wind). Each page is one panel of
a pattern inside a rectangle, a square, a circle or a mending patch, or a
sampler of four to nine labelled swatches. Every stitch is drawn where it
would lie on the cloth, and wherever two lines meet, both leave a gap, so the
meeting point stays open.

## How to use it

As a stitching template: print the black-and-white template version, trace
or transfer it to your cloth, and stitch along the dashes, one pass at a
time. Turn on the arrows to see where each pass starts and which way it
runs; passes in the same direction alternate, so the needle can work back
and forth across the cloth. Turn on the marking grid to see the grid the
pattern is drawn on, which is the grid you would rule onto your fabric to
mark it out yourself. The grid size, stitch length and gap are printed under
the panel. Keep your stitches a little longer than your gaps, and never let
a stitch cross where two lines meet.

As art: the indigo version (white thread on indigo cloth) and the white
version (indigo thread on undyed cloth) make calm prints, cards and
patterns for a project. The sampler page is a practice cloth: one swatch of
each pattern to try before a larger piece.

## Purpose

A pattern library and a stitching guide in one. Sashiko kits and books show
where the lines go; this also shows where the stitches go, and proves the
one rule that makes sashiko look like sashiko: no stitch lies across an
intersection.

## History

Sashiko grew in rural Japan during the Edo period (1603–1868), where cotton
was precious and cloth was layered and stitched to make it warm and to make
it last. Farming and fishing families quilted workwear, firefighters'
jackets and everyday cloths with running stitch in white cotton on indigo,
and mended them again and again (the patched and re-stitched cloth now
called *boro*). The geometric patterns carry their own meanings: asanoha,
the fast-growing hemp, for children's health; seigaiha for calm seas and
good fortune; shippō's linked circles for harmony; kikkō, the tortoise, for
long life. Pattern-filled *moyōzashi* sits beside *hitomezashi*, the
one-stitch family worked on a grid of single stitches. Today sashiko is
practised worldwide, both for visible mending and as an art of its own.

## This implementation

- **Spec knobs:** `mode` (panel or sampler), `pattern` (any of the nine, or
  `any` for the seed to choose), `frame` (rectangle, square, circle, patch),
  `width`, `height`, `cell_mm` (grid unit, 8–40 mm), `stitch_mm` (2–10 mm),
  `gap_mm` (1–6 mm, widened if the thread needs room), `thread` (width in
  points), `arrows` (pass starts and directions), `marking_grid`, `swatches`
  (4–9, sampler), `style` (indigo, white, template), `caption`.
- **Generation:** each pattern is built exactly from straight segments and
  circular arcs on its grid: the triangle grid with centroid spokes
  (asanoha) or nested triangles (uroko); three line families offset so no
  three meet (kagome); the hexagon grid (kikkō); chevron columns (yabane);
  a lozenge lattice with nested lozenges (hishi); circles of radius u/√2,
  each cut into quarters at the points it shares with its neighbours and
  rejoined tangent to tangent into waves (shippō); fans of four concentric
  half-circles in rows half a radius apart, each arc keeping exactly the
  angles not hidden by the two rows in front (seigaiha); and rows of arcs
  bending alternately left and right (nowaki). Straight pieces are merged
  into maximal straight lines, so every line is split into its longest
  smooth passes (runs). Runs are laid a stitch past the frame, and every
  point where a run meets another (crossings and T-junctions alike) is
  found exactly: line–line, line–arc and circle–circle. Each meeting point
  gets a clearance: the least distance at which the stitch ends of all the
  lines through it stand a thread's width plus 0.3 mm apart, measured on
  the real curves (a twelve-way asanoha hub or shippō's kissing circles
  need more than a plain crossing). Then each run is a one-dimensional
  interval problem: with stitch `a` and gap `g`, period `P = a + g`, a
  meeting point `e` lies in a gap exactly when `(e − φ) mod P` falls in
  `[a + c, P − c]`, an arc of phases on the circle; the solver intersects
  those arcs over the nominal period and periods fitted to the spacing of
  the meeting points (stitch within 0.75–1.3× nominal). If no single period
  fits, it fits a whole number of stitches between each pair of
  neighbouring meeting points (0.4–1.6× nominal), as a stitcher does by
  eye. Stitches are finally trimmed to the frame. Passes are ordered by
  direction and alternate passes reversed. The border is its own stitched
  outline, with gaps at its corners. The seed sets the lattice's offset in
  a panel's frame, the pattern when `any`, and the sampler's choice and
  order of patterns (sampler swatches are centred on their grid).
- **Solving:** nothing to solve; it is a design and a template.
- **Guarantees:** deterministic per seed. No stitch lies across an
  intersection: every meeting point falls in a gap of every line through
  it, at least its clearance from every stitch end along the line, checked
  on every page (meta `stitches_on_intersections: 0`,
  `no_stitch_on_intersection: true`) and, independently in tests, by
  sampling every stitch on the page and showing that no two stitches of
  different lines come within a thread's width of each other. Runs are
  maximal (no two meet end to end with a continuous tangent inside the
  frame); every pass with room for two stitches carries stitches; stitch
  lengths stay within 0.4–1.6× the nominal length and gaps never shrink
  below the gap setting. Meta also reports runs, stitches, crossings, how
  many runs took a single period (`runs_uniform`) or fitted stitches
  (`runs_fitted`), stretches too short to hold a stitch (`bare_stretches`),
  and the nearest stitch to any meeting point. The template style is
  black-only. Not a colouring page: the dashed lines enclose no regions, so
  no colourability is claimed. A page builds in well under 0.1 s.

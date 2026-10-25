---
title: "Celtic Spirals"
blurb: "Celtic spiral ornament: triskeles and running spirals joined by smooth S-curves, with trumpet widenings"
category: design
version: "1.0.0"
---
Triskeles and running spirals in the manner of Insular and La Tène art:
coils joined by smooth S-curves, bands widening into trumpets.

## What it is

A design of Celtic spiral ornament, the third great family of Insular
decoration beside interlace and key patterns. Spirals sit in a regular
arrangement — triskeles of three arms on a honeycomb, or two-armed spirals
running in rows — and every arm flows without a break out of one coil,
through an S-curve, and into the next. The bands are thin in the coils and
widen towards the joins like trumpet mouths; the dark ground between them
forms the lens-shaped voids, and small three-leaved lentoid figures fill the
gaps between the coils. Three arrangements: a circular roundel, a
rectangular panel and stacked running borders.

## How to use it

Put a finger in the heart of one spiral and follow its arm outward: it never
stops or doubles back, but sweeps into the neighbouring spiral and winds into
its centre. Count the arms of each spiral, and notice the three colours: one
for each direction of the lattice. To colour it, choose the line-art palette.

## Purpose

A flowing, meditative page and a study in continuous curves: every join is
smooth, and no band ever crosses another.

## History

Spiral ornament runs from the La Tène metalwork of Iron Age Europe (from the
5th century BC) through the hanging bowls and enamels of early medieval
Britain and Ireland to the great Insular gospel books, the Book of Durrow,
the Lindisfarne Gospels and the Book of Kells (7th–9th centuries), where
trumpet spirals fill whole carpet pages. The triskele, a three-armed spiral,
is among its oldest motifs. This page is a geometric grammar in the manner of
the tradition, not a copy of any manuscript or object. See George Bain,
*Celtic Art: The Methods of Construction* (1951), Romilly Allen, *Celtic Art
in Pagan and Christian Times* (1904), and Aidan Meehan, *Celtic Design:
Spiral Patterns* (Thames & Hudson, 1993).

## This implementation

- **Spec knobs:** `layout` (auto, roundel, panel, border), `spirals` (across,
  2–12; 0 = three to five by seed), `turns` (0.75–3 per arm), `trumpet`
  (how much bands widen towards joins, 1–3), `prune` (share of edges left
  unjoined, ending in curls, 0–0.5), `palette` (auto, manuscript, stone,
  line_art), `stroke`, `width`, `height`, `margin`.
- **Generation:** spiral centres are honeycomb vertices (a roundel is
  centred on one, for three-fold symmetry) or rows of a line. Every arm is
  an Archimedean spiral ending a fixed angle β before the direction of its
  neighbour; all spirals turn the same way, so the two arm ends of an edge
  are point-symmetric about its midpoint and a G1 clothoid fit joins them in
  a symmetric S. An edge with no neighbour (or pruned) ends in an
  Euler-spiral curl. Each band is a ribbon of varying half-width (thin in the
  coils, smoothly widening to the join, tapering at the cores and curl tips),
  filled in one of three colours by lattice direction and outlined;
  lentoid triads fill hexagons whose six spirals are all present.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic per seed; `verification:
  joins_tangent_continuous_and_no_arms_cross`. Tested for every layout and
  with pruning: at every arm–join and arm–curl joint the heading turns by
  less than 0.12 rad between samples (no kink); no two band centrelines
  cross and no band crosses itself; triskeles have three arms and border
  spirals two; all ink stays on the page.

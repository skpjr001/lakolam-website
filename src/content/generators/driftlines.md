---
title: "Drifting Strata"
blurb: "Drifting strata: one line redrawn down the page, each copy nudged by smooth noise, never crossing"
category: design
version: "1.0.0"
---
One line, redrawn down the page again and again, each copy nudged a little
further than the last — until a ruler-straight line has become wood grain,
sandstone or a fingerprint.

## What it is

A generative design built on a single rule. The first line is straight (or a
small circle). Every next line is the one before it moved by the usual gap
plus a small, smooth wobble; the wobbles add up, so lines near the start are
nearly even and lines far from it swell, pinch and sweep. Because each step
is always at least a fifth of the gap, the lines never touch or cross. Knots
— small round holes — push the grain round them, and the bands between the
lines can be filled with colour.

## How to use it

Frame it, or colour it in. In colour the page is finished art: wood, layered
rock, sea or moss. In line art, colour band by band — alternating two
colours gives strata, a slow run of shades gives a sunset; or follow single
lines with a fine pen to make them bolder where they swell. Pages with a
circle at the centre read as tree rings or a fingerprint; trace one ring
round with a finger, it is a calm thing to do.

## Purpose

A page that looks hand-drawn and natural but is made by an exact rule, and a
quiet demonstration of how small differences accumulate: the same nudge,
repeated, makes landscape.

## History

Drawing a line and then copying it again and again, each copy wavering a
little from the last, is a well-known exercise in generative and meditative
drawing (often taught as the "one line" or "wave" exercise); generative
artists have long built it with Perlin's gradient noise (Ken Perlin, 1985,
improved 2002). The bands echo what they imitate: the growth rings of
wood, sedimentary strata and the ridges of a fingerprint.

## This implementation

- **Spec knobs:** `base` (auto, straight, circle), `gap` (2–60 pt), `drift`
  (0–3), `scale` (drift wavelength, 20–2000 pt), `knots` (0–8), `palette`
  (auto, wood, strata, ocean, moss, ink, line_art), `bands`, `stroke`,
  `width`, `height`, `margin`.
- **Generation:** line k+1 = line k + n̂ · gap · (1 + η_k(s)), where n̂ is the
  base line's normal and η is two-octave seeded gradient noise sampled at
  (s / scale, k · 0.07) and clamped at −0.8. A straight base starts twelve
  lines above the page so the top already carries drift; a circle base
  samples the noise on a circle (so every ring closes) and lets the drift
  grow in over the first rings. Knots are a smooth injective warp of the
  finished lines, r ↦ r + ρ·e^{−r/2ρ} about each knot, applied with adaptive
  subdivision. Bands are painted beyond each line in order, so each band
  shows between its two lines. Over-range knobs are clamped and recorded as
  `requested_<field>`.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic per seed; `verification: lines_never_cross`.
  Tested: before the knots, every line-to-line step is at least 0.2 · gap
  at every sample (exactly the gap with zero drift), so the lines are
  disjoint graphs over one parameter; with knots, no two consecutive lines
  cross (checked segment by segment) — the warp is injective and its
  radial stretch never falls below ½. Meta reports the smallest step as
  `min_spacing_ratio`. All ink stays inside the page.

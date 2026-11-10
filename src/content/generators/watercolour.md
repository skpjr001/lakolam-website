---
title: "Watercolour"
blurb: "Generative watercolour after Tyler Hobbs: deformed polygon washes stacked as dozens of 4% glazes"
category: design
version: "1.0.0"
---
Soft-edged watercolour paintings built from dozens of nearly transparent
glazes: bleeding blots, a sun over layered hills, fruit on a table, quiet
colour fields.

## What it is

A watercolour painting made the way a painter lays a wash: not one flat
shape, but many thin, watery layers, each a little different from the last.
Where the layers agree the colour builds up deep and even; at the edges,
where each layer wandered its own way, the paint thins into a soft,
feathered gradient with faint tide lines. Neighbouring washes go down wet
into wet, so their colours bleed into each other, and the grain of the
paper shows through as a fine mottling. Four kinds of picture: abstract
blots of colour, a landscape with a sun glowing into the sky above three
ridges of hills, a still life of round fruit with their shadows and lifted
highlights, and soft bands of colour on a pale ground. Each sits on warm
paper inside a clean taped border.

## How to use it

Print it as a picture: it is finished art, in colour, for a wall, a card
or the cover of a notebook. Choose the subject, or let each new seed
surprise you; pick a palette (garden, dusk, coast, autumn or mist) to suit
a room or a season. For a more liquid look, raise the bleed; for smoother,
flatter washes, turn the texture down; for richer, darker colour, raise the
opacity or the number of layers. Turn the tape border off for a painting
that runs to the edge of the sheet.

## Purpose

To show how the look of watercolour — glowing, soft, layered — comes from
very simple parts: one shape, deformed again and again, stacked many times
at a few percent opacity. Every page is an honest stack of those glazes,
composited exactly.

## History

Painting in transparent water-based colour is ancient, but the European
tradition of the watercolour as finished art begins with Albrecht Dürer's
landscape studies of the 1490s and reaches its height with J. M. W. Turner
and the English school of the early nineteenth century; Winsor & Newton's
moist colours in pans (from the 1830s) made it portable. In computer
graphics, Cassidy Curtis, Sean Anderson, Joshua Seims, Kurt Fleischer and
David Salesin simulated the physics of pigment and water in "Computer-
Generated Watercolor" (SIGGRAPH 1997). This generator follows a much
lighter approach published by the generative artist Tyler Hobbs in 2017
("A Guide to Simulating Watercolor Paint with Generative Art"): recursively
deform a polygon, stack many slightly different copies at about 4% opacity,
interleave the layers of neighbouring shapes, and cut texture into each
layer with masks of random circles. The colour-field option nods to the soft
rectangles of Mark Rothko's paintings of the 1950s.

## This implementation

- **Spec knobs:** `width`, `height` (points, 200-3000); `composition`
  (`auto`, `blots`, `landscape`, `still_life`, `bands`; auto picks per
  seed); `palette` (`auto`, `garden`, `dusk`, `coast`, `autumn`, `mist`;
  auto picks per seed); `layers` per wash (30-100, default 50); `opacity`
  of each layer in percent (1-12, default 4); `texture` (0-1, default 0.6:
  how much of each layer the circle masks cut away); `bleed` (0-1, default
  0.5: how far edges wander); `tape` (default on: a clean paper border).
- **Generation:** each composition places washes — a polygon (jittered
  n-gon, soft rectangle or ridge line), a pigment, and a group. A wash's
  base shape is its polygon after four Hobbs passes: every edge longer than
  a few grid cells is split at its midpoint, moved by a 2-D Gaussian of
  spread `edge length × edge variance × scale` (clamped at 2.5 σ), and each
  half inherits the variance times `1 + 0.2·N(0,1)`. Every layer is the base
  scaled about the wash's anchor by `1 + spread·N(0,1)`, then deformed three
  passes more. Layers are composited source-over at the stated opacity on a
  paint grid of about 420 cells along the long side, with exact-area
  anti-aliased coverage (four sub-rows per cell, exact horizontal spans,
  nonzero rule), each layer multiplied by one of six seeded circle masks at
  a random offset. Washes of one group are interleaved five layers at a time
  (wet into wet); groups go down in order (sky, then far hill, then nearer
  ones; shadows, then fruit, then lifted highlights). The scene format has
  no transparency, so the composite itself is drawn: it is lightly smoothed,
  quantised into paint-amount strata (sum of the three channel drops, steps
  of 9) and hue bins (finer as the paint gets denser), islands under six
  cells are merged into the nearest stratum, and each stratum is traced by
  oriented marching squares into closed loops (one Chaikin pass,
  Douglas–Peucker at 0.3 cell), grown one cell into the darker strata so no
  paper shows between neighbours, filled with the mean colour of its cells
  and painted lightest first. Meta lists the washes, glazes, mean vertices
  per glaze, the grid, the strata and regions.
- **Guarantees:** deterministic per seed. Every wash gets exactly `layers`
  glazes at exactly `opacity`% (tested). The page shows the glaze stack:
  at sampled cell centres the drawn colour is within 14 levels (of 255) of
  the exact source-over composite recomputed independently by
  point-in-polygon on every layer polygon, at ≥ 92% of points (tested on
  three compositions; the rest sit on layer edges, where a cell's covered
  area and a point's all-or-nothing coverage differ).
  `verification: glaze_composite_sampled`. All paint lies inside the taped
  area and the page (tested); pigments are darker than the paper in every
  channel; the default SVG stays under about 3 MB (tested < 4.5 MB). Clamped
  knobs are reported as `requested_<field>`.

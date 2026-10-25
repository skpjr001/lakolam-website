---
title: "Cells Within Cells"
blurb: "Cells within cells: a seeded hierarchy drawn as a Voronoi treemap, every cell's area proportional to its weight"
category: design
version: "1.0.0"
---
A hierarchy drawn as nested cells — branches, twigs and leaves as a slice of
plant tissue, each cell exactly as large as its weight says.

## What it is

A Voronoi treemap. A tree of groups, subgroups and items is drawn as
regions inside regions: the page (a circle, hexagon, octagon or rectangle)
is cut into one cell per top-level branch, each of those into cells for its
children, and so on, two or three levels deep. Every cut is straight, so
every cell is a convex polygon, and every cell's area is in proportion to its
weight — big branches get big cells, small ones small cells. Coarse
boundaries are drawn heavy and fine ones light, and each branch keeps one
colour in lighter and darker tints, so the structure reads at a glance. You
can write your own words into the top-level cells.

## How to use it

Hang it as a print — it looks like leaf tissue, cracked glaze or a stained
glass window. In line art, colour it in: give each big region one colour and
vary its shade from cell to cell, or colour by size. With your own words in
the top cells it makes a poster of topics, a family's interests or a class's
projects: each word gets its own territory, its sub-cells ready for
drawings or notes.

## Purpose

Treemaps show how a whole divides into parts and parts into smaller parts.
This page shows that idea at its most organic, and is a calm, intricate
colouring page with regions of every size.

## History

Ben Shneiderman introduced treemaps (1991) to show a disk's directories as
nested rectangles. Michael Balzer and Oliver Deussen (2005) replaced the
rectangles with Voronoi cells, so regions could take any convex shape inside
any outline. Arlind Nocaj and Ulrik Brandes (2012) made the computation fast
and reliable with power diagrams — Voronoi diagrams whose sites carry
weights — moving each site to its cell's centroid and adjusting its weight
until every area matches. The weights here follow a power law (after
Vilfredo Pareto), as sizes in real hierarchies usually do.

## This implementation

- **Spec knobs:** `outline` (auto, rectangle, circle, hexagon, octagon),
  `branches` (2–12 top-level cells), `depth` (1–3 levels), `fanout`
  (typical children per cell, 2–10), `skew` (0–2: equal sizes to a few
  giants), `padding` (space between siblings, 0–16 pt), `labels` (words for
  the top-level cells, comma separated; each becomes one branch, up to 12),
  `palette` (auto, tissue, glaze, atlas, terracotta, line_art), `stroke`
  (finest line weight), `width`, `height`, `margin`.
- **Generation:** a seeded tree, breadth first; each leaf's weight is
  (1 − 0.9u)^(−skew), each inner node's the sum of its children's. Inside
  each region shrunk by half the padding, children are laid out as a power
  diagram: sites start at random, each cell is the parent clipped by the
  half-planes |x − p_i|² − w_i ≤ |x − p_j|² − w_j, then sites move to their
  cell centroids, weights grow or shrink by 0.55 × (target − area), shift so
  the least is zero and are capped at the squared distance to the nearest
  site (so no cell can vanish). Up to 400 rounds, up to six fresh starts, then
  a polishing phase that adjusts weights alone and keeps a step only when it
  lowers the error without emptying a cell. Labels must be drawable by the
  stroke font; others are left out and listed in `labels_dropped`.
  Over-range knobs are clamped and recorded as `requested_<field>`.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic per seed; `verification:
  children_tile_parent`. Tested: in every region the children's cells add up
  to the region's inner area to 10⁻⁶ and no two overlap (checked by an
  independent convex intersection); every cell's area is within 1% of its
  weight's share (the layout stops at 0.4%; meta reports the worst as
  `max_area_error`); targets are exactly proportional to weights; labels the
  font cannot draw are dropped and reported; all ink inside the page; the
  default page takes a few milliseconds.

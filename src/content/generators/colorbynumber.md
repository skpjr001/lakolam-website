---
title: "Colour by Number"
blurb: "Colour by number — a numbered grid that colours into a symmetric design"
category: design
version: "1.1.0"
---
A grid of numbered cells and a colour legend. Colour each cell by its number
and a symmetric design appears.

## What it is

Every cell of the grid carries a number from 1 up; a legend along the bottom
pairs each number with a colour. Fill the cells and the picture — a mandala,
a mirrored motif, or concentric rings, depending on the page — emerges.

## How to use

Work colour by colour or cell by cell; the order does not matter, because
each number has exactly one colour. The symmetry means whole quadrants
repeat, so the design fills faster than the cell count suggests. Adult and
kids pages differ only in grid size and how many colours the legend holds.

## Purpose

The colouring lane's most commercial format, and the fastest-growing
adult-colouring niche. It fits the workspace exactly: the design is real
generative art — a symmetric field quantised into palette bands, the same
quantise-a-field idea `lako-contour` and `lako-flowfield` already use — so
every seed colours a genuinely different picture rather than a stencil pulled
from a library.

## History

Colour by number began in the 1950s as a way to teach art fundamentals to
children; the 2010s adult-colouring boom made the numbered mosaic a
publishing staple in its own right.

## This implementation

- **Spec knobs:** `size` (10–28), `colors` (3–9 palette entries),
  `symmetry` (dihedral / mirror / radial), `cell`, `bold` (Bold & Easy,
  below).
- **Generation:** a seeded smooth field — two angular harmonics, two radial
  frequencies, phases — is folded into the chosen symmetry (applied to the
  coordinates, so the symmetry is exact) and quantised into colour bands over
  its own value range.
- **Bold & Easy (`bold`):** the popular large-print page — a few big
  regions, one number each. The grid is coarser (`size` held to 8–12) with
  at most five colours, and cells are at least 36 pt. Neighbouring cells of
  one colour form one region; any region under three cells takes the colour
  of the neighbour it shares the most border with (neighbours big enough
  themselves first, then the larger, then the lower number), all small
  regions at once, repeated until none is left. The rule looks only at a
  region's shape and its neighbours, so it keeps the design's symmetry, and
  the legend is recomputed afterwards. Only the boundaries between regions
  are drawn, in a heavy line (a tenth of the cell, at least 3 pt), with plain
  corners rounded; each region's number sits in its deepest cell; the answer
  key fills the same regions. Meta adds `regions`, `smallest_region_cells`,
  `smallest_region_mm2`, `bold`, `colorability_profile` (`kids`) and
  `colorable` — the kids' check run on the outlines (the numbers are print a
  child colours over, not regions).
- **Guarantee:** there is nothing to solve, so nothing to prove unique;
  instead the page keeps the colouring guarantee the design lane lives by —
  every cell is a closed region, every printed number maps to exactly one
  legend colour, and every legend colour is actually used, all checked at
  build time. The palette is fixed and print-friendly, and the answer key
  shows the finished, coloured design. A bold page also guarantees every
  region is at least three cells, and is tested on the rendered page: every
  region and legend swatch is at least 200 mm², and a dihedral design stays
  exactly symmetric after its small regions are absorbed.

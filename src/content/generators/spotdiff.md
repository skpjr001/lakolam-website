---
title: "Spot the Difference"
blurb: "Spot the difference — any generator's page twice, the second altered in several places"
category: puzzle
version: "1.0.0"
---
The same picture twice — but the second one has been changed in a handful of
places. Find them all.

## What it is

Two copies of one picture, one above the other (or side by side). The second
has been altered in five to twelve places: a shape removed, a shape recoloured,
a small star, dot or heart added, or a patch of line work erased. The heading
says how many changes there are; the answer key circles every one.

## How to play

Scan in strips, left to right, comparing the same small area in both pictures
before moving on. Symmetric pictures help: a mandala's changed petal breaks the
pattern its neighbours repeat. Count as you go — the number in the heading
tells you when you are done.

## Purpose

Spot-the-difference is a staple of kids' activity books (about a tenth of
their content) and of newspaper puzzle pages. It is also the catalogue's first
generator built from the others: any design generator's page becomes the
picture, so the format inherits the whole design lane.

## History

"Spot the difference" pictures have run in newspapers and children's
magazines since the late 19th century; syndicated features such as *Hocus
Focus* keep the form in daily papers.

## This implementation

- **Spec knobs:** `source` (any generator id; empty picks one of ten that make
  good pictures — mandala, stained glass, zentangle, tessellation, voronoi,
  truchet, celtic, apollonian, phyllotaxis, border), `differences` (0 picks
  from the difficulty), `difficulty` (more and smaller changes as it rises),
  `side_by_side`.
- **Construction:** the source page is a display list, so a change is an edit
  to it — removing or recolouring a shape of findable size, or adding a motif
  or a white disc on top. Changes are spaced apart so each is its own find.
- **Guarantees:** every change is tried on a copy and rasterised, and kept only
  if at least a tenth of its area visibly changes. An edit to the display list
  is not an edit to the picture — removing a shape another shape draws over, or
  erasing blank paper, changes nothing a solver could find — so no difference
  on the page is invisible, and the tests re-check every one against the
  finished pictures. Deterministic per seed.
- **Where it lives:** in `lako-catalog`, the one crate that sees every
  generator; no generator crate depends on another.

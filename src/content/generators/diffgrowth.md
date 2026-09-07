---
title: "Differential Growth"
blurb: "Differential growth — a closed line that buckles into organic meanders"
category: design
version: "1.0.0"
---
A closed line that grows faster than its space allows, and folds into dense
organic meanders — coral, brain-folds, the crinkled edge of a leaf.

## What it is

A loop of points. Each point is pulled gently toward its neighbours and pushed
away from every point nearby; and the loop keeps gaining points, so it must
buckle and fold to fit them in. The result is a single smooth curve that
wanders back and forth in tight, lifelike meanders.

## What to do with it

There is nothing to solve. It is a design — a striking generative-art print,
and an intricate colouring page whose folded channels take colour well.

## Purpose

A signature technique of the fine generative-art world, and a distinct
addition to the design lane: not `flowfield`'s many streamlines, not
`lsystem`'s branching, but one self-avoiding curve growing under its own
tension.

## History

Differential line growth was popularised by Anders Hoff (Inconvergent) and is
a mainstay of the creative-coding and pen-plotter community; it models the same
buckling that shapes coral, lichen and the folds of the cortex.

## This implementation

- **Spec knobs:** `iterations` (40–400), `spacing` (fold density),
  `size`, `line`.
- **Generation:** a small jittered loop is grown by a deterministic simulation
  — each step every point feels neighbour attraction and local repulsion, then
  over-long edges split (and the single longest edge always splits) so the loop
  gains length steadily and folds. The final curve is fitted to the canvas and
  smoothed into cubic Béziers.
- **Guarantees:** deterministic per seed; the output is a single closed vector
  path whose folds enclose colourable regions. A pure design generator — no
  puzzle, no answer key.

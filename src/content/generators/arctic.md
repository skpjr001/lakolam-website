---
title: "Arctic Circle"
blurb: "Random domino and lozenge tilings that freeze at the edges: the Arctic circle"
category: design
version: "1.0.0"
---
A random tiling that freezes solid at its edges and melts into chaos inside —
and the border between the two is a perfect circle.

## What it is

Take a diamond-shaped patch of squares and cover it with dominoes, every way
equally likely. You might expect a featureless jumble. Instead the four
corners come out as tidy brick walls, each made of a single kind of domino,
and the disorder is confined to a disc in the middle. As the diamond grows,
the edge of that disc tends to an exact inscribed circle: the Arctic circle.

The same thing happens with a hexagon tiled by three kinds of rhombus
(lozenges). Shaded light, middle and dark, the rhombi turn into a pile of
cubes stacked in the corner of a box, and the frozen regions become the flat
floor and walls; here the boundary is an ellipse inscribed in the hexagon.

## How to use it

Colour the bricks of each frozen corner in one colour and watch the circle
appear; on the hexagon, shade the three rhombus directions in three tones and
the cube pile jumps out in 3D. The contour style draws the height lines of the
tiling, as on a map: straight and evenly spaced in the frozen parts, wandering
inside the circle. Line-art pages use a smaller diamond, with bricks big
enough to colour by hand — try colouring only the horizontal ones.

## Purpose

The mathematics lane's picture of a phase transition you can hold: a single
random object with a frozen phase, a liquid phase and a sharp boundary, drawn
exactly rather than simulated approximately. It is also the crate that proves
its sampler: the weighted shuffle is checked against an exhaustive list of
every tiling at small sizes.

## History

The Aztec diamond and the formula 2^(n(n+1)/2) for its tilings are due to
Elkies, Kuperberg, Larsen and Propp, "Alternating-sign matrices and domino
tilings" (J. Algebraic Combin., 1992), which also introduced domino shuffling.
Jockusch, Propp and Shor proved the Arctic circle theorem ("Random domino
tilings and the arctic circle theorem", 1995); Cohn, Larsen and Propp found
the ellipse for lozenge tilings of a hexagon ("The shape of a typical boxed
plane partition", New York J. Math., 1998). Propp's "Generalized
domino-shuffling" (Theoret. Comput. Sci., 2003) samples weighted tilings, and
Chhita and Johansson studied the two-periodic weighting and its gas phase
("Domino statistics of the two-periodic Aztec diamond", Adv. Math., 2016).
Exact sampling of the cube stacks uses Propp and Wilson's coupling from the
past (1996).

## This implementation

- **Spec knobs:** `shape` (auto / aztec / hexagon), `order` (Aztec diamond,
  2-150; empty lets the seed choose), `a`, `b`, `c` (hexagon sides, 1-60),
  `colour_by` (type / orientation / height), `weighting` (uniform /
  two_periodic) and `gas_weight` (0.05-1), `sampler` (exact / glauber) and
  `sweeps`, `palette` (auto or one of six), `style` (colour / line_art /
  contour), `width`, `height`, `margin`.
- **Generation:** dominoes by domino shuffling from order 0 (destroy colliding
  pairs, slide, fill each empty 2×2 block by a coin flip); weighted tilings by
  Propp's generalised shuffling, the weights pushed down order by order by
  urban renewal and rescaled so a hundred levels never underflow. Lozenges as
  plane partitions in an a × b × c box, by monotone coupling from the past
  between the empty and the full box (blocks of moves regenerated from
  derived seeds, the past doubled until the two runs meet), or by the plain
  cube add/remove chain for a chosen number of sweeps. Tiles of one colour are
  merged into regions and the tile borders drawn as one path of merged
  straight runs, so a page is a handful of items at any order. Height bands
  and contours come from Thurston's height function.
- **Solving:** Nothing to solve.
- **Guarantees:** every page is a valid tiling (every cell covered exactly
  once by a 1 × 2 domino, or the hexagon covered by exactly ab, bc and ca
  lozenges of the three kinds), recorded as `verification: tiling_valid`.
  The uniform and weighted shuffles match exhaustive enumeration at orders 2
  and 3; the height function is checked edge by edge; `exact_sample` in the
  metadata says whether the cube stack coupled (it does at the default sizes)
  or fell back to the chain after its move budget. Out-of-range knobs are
  clamped and reported as `requested_<field>`.

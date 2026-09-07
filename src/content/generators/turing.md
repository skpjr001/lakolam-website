---
title: "Turing Patterns"
blurb: "Turing patterns — reaction-diffusion spots, stripes and mazes"
category: design
version: "1.0.0"
---
The spots, stripes and mazes that two reacting, diffusing chemicals draw all
by themselves — traced into clean contour lines.

## What it is

Alan Turing's morphogenesis: one substance activates a reaction, another
inhibits it, and because they spread at different speeds the mixture settles
into a standing pattern — leopard spots, zebra stripes, coral labyrinths,
fingerprint whorls. This runs that reaction and outlines the boundary between
high and low concentration.

## What to do with it

There is nothing to solve. It is a design — a distinctly organic art print, and
an intricate colouring page whose channels take colour beautifully.

## Purpose

The most lifelike texture in the design lane, and the one true simulation
here: not the geometric partitions of `voronoi` or the contour *heights* of
`contour`, but emergent biological pattern, rendered as honest vector line-work
via marching squares.

## History

Alan Turing's 1952 paper *The Chemical Basis of Morphogenesis* proposed
reaction-diffusion as the origin of biological pattern; the Gray-Scott model
(1983) is the version used here, beloved by the generative-art community
(Karl Sims, Nervous System) for its endless variety.

## This implementation

- **Spec knobs:** `grid` (simulation resolution, 60–160), `pattern`
  (spots / stripes / maze / mitosis; empty picks per seed), `steps`
  (1000–6000), `size`, `line`.
- **Generation:** the Gray-Scott equations are integrated on a toroidal grid
  from seeded starter patches; the resulting inhibitor field is thresholded and
  traced by marching squares into vector contour segments.
- **Guarantees:** deterministic per seed (the simulation uses no wall-clock,
  only the seed); the output is vector line-work whose closed contours are
  colourable. A pure design generator — no puzzle, no answer key.

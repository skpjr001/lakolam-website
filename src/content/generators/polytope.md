---
title: "Polytopes"
blurb: "Hypercubes and the six regular 4-polytopes as plotter wireframes — Petrie, rotated and perspective projections, edge subsets, counts checked against the Schläfli data"
category: design
version: "1.0.0"
---
Hypercubes and the six regular four-dimensional solids, drawn as fine-line
plotter art.

## What it is

A wireframe drawing of a shape from four or more dimensions, shown in two.
The shapes are the n-cube (the square, cube and tesseract carried on up to
eight dimensions) and the six regular 4-polytopes: the 5-cell, the
tesseract, the 16-cell, the 24-cell, the 600-cell with 720 edges and the
120-cell with 1200. The Petrie view looks straight down the shape's most
symmetric axis and gives a mandala of 8-, 12- or 30-fold symmetry. The
rotated view turns it to a random angle, and the perspective view looks at
it from just outside, one dimension at a time. A grid layout fills the page
with small drawings of the same shape, each turned differently, and can
keep only part of the edges, in the spirit of Manfred Mohr's hypercube
works.

## How to use it

Print it as wall art, or send the page to a pen plotter. On the ink style
every line is a single black stroke, with no fills. With depth cueing on,
near edges are drawn heavier than far ones, which gives the flat drawing a
sense of depth; turn it off for even lines. The caption names the shape,
its Schläfli symbol and its vertex and edge counts. Try the 600-cell's
Petrie view for the classic thirty-fold rosette, or a grid of
six-dimensional cubes with a third of their edges for a Mohr-like study.

## Purpose

The regular polytopes are some of the most beautiful objects in
mathematics, and their projections are a favourite of plotter artists and
maths teachers. Drawing them correctly is easy to get subtly wrong: a
missing edge, a vertex out of place, or a projection that squashes the
shape. Every drawing here is built from exact coordinates and checked
against the textbook counts.

## History

Ludwig Schläfli found the six regular 4-polytopes around 1852, and
Alicia Boole Stott and H. S. M. Coxeter made them famous. Coxeter's
*Regular Polytopes* (1948) introduced the Petrie polygon projections
used here. In the 1970s Manfred Mohr began his long series of plotter
drawings of hypercube edges and their rotations. They are among the first
classics of computer art, and the grid layout here follows their spirit.
Today these projections appear on posters, in museums and in many
generative-art sketchbooks.

## This implementation

- **Spec knobs:** `shape` (hypercube, 5-cell, 16-cell, 24-cell, 120-cell,
  600-cell), `dimension` (3–8, hypercube only), `projection` (petrie,
  rotated, perspective), `layout` (single, grid), `grid` (2–6 per side, grid
  only), `keep` (10–100% of edges), `depth_cue`, `vertices`, `ink` (ink,
  night, colour), `caption`, `stroke` (0.05–6 pt), `width`, `height`
  (144–3000 pt), `margin`. Out-of-range values are clamped and reported as
  `requested_*`.
- **Generation:** vertices from exact coordinates. The cube is {±1}ⁿ, the
  16-cell ±eᵢ, the 24-cell the permutations of (±1, ±1, 0, 0) and the
  600-cell the 120 unit icosians. The 5-cell is the standard simplex in an
  orthonormal basis of its hyperplane. The 120-cell is the 600-cell's dual:
  the 600 tetrahedra are found as 4-cliques of its edge graph, and two of
  their centres are joined when the tetrahedra share a triangle. Edges are
  the pairs at the shortest distance. The Coxeter plane of the cubes and
  16-cell is spanned by (cos πk/n) and (sin πk/n). For the 5-cell it comes
  from the pentagon. For the 24-, 600- and 120-cells the simple roots are
  found from the F4 and H4 root systems themselves (the positive roots whose
  reflection permutes the other positive roots). The plane is then the
  2-dimensional eigenspace of C + Cᵀ for the Coxeter element C, with
  eigenvalue 2 cos(2π/h), found by Jacobi rotation. Seeds turn the view
  within the plane and pick the depth axis. Random views are seeded
  orthonormal frames. Perspective divides one coordinate at a time. Edge
  subsets are a seeded partial shuffle, and edges are drawn back to front.
- **Solving:** nothing to solve; it is a design.
- **Guarantees:** deterministic per seed. Each drawing is checked against
  the Schläfli data (`verification:
  schlafli_counts_equal_edges_orthonormal_frames`). The vertex and edge
  counts and every vertex's degree match the table, every edge has the same
  length to within 10⁻⁹, and every projection frame is orthonormal to within
  10⁻⁹. Tests recompute the edges by brute force and check Euler's relation
  V − E + F − C = 0 from counted triangles and tetrahedra (and by duality for
  the 120-cell). They confirm the h-fold symmetry of each Petrie view and
  refuse hand-broken models. They also check that every option changes the
  page, that every boundary value draws a finite page inside its bounds, and
  that ink pages are unfilled black strokes only.

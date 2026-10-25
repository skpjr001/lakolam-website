---
title: "Abelian Sandpile"
blurb: "Abelian sandpile: grains topple into fractal mandalas, colliding piles and the group identity"
category: design
version: "1.0.0"
---
Pour sand on one square, let every overfull square spill onto its
neighbours, and a mandala grows that no one designed.

## What it is

A grid of cells, each holding some grains of sand. A cell holding as many
grains as it has neighbours is unstable: it *topples*, passing one grain to
each neighbour, which may make them topple in turn. Pile thousands of grains
on a single cell and let the avalanche run until every cell is calm, then
colour each cell by how many grains it keeps. The result is an intricate,
perfectly symmetric pattern of triangles, stripes and lace, with patches of
regular texture divided by thin lines.

The surprise is that the order of the topplings makes no difference: the same
grains always settle into the same picture. Square cells topple at four,
hexagons at six, triangles at three, and each lattice grows its own mandala.
Several piles side by side grow into each other; and on a rectangle there is a
special pile, the *identity*, which can be added to certain others without
changing them — and which turns out to be a striking fractal of its own.

## How to use it

As a colour page, the mandala is ready to frame. As line art, every cell
height becomes a region: give each of the heights its own colour (three, four
or six crayons, depending on the cell shape) and the symmetry will build up
as you go. Colouring only one height at a time is a good way to see how the
pattern is put together.

## Purpose

The mathematics lane's model of self-organised criticality, and a lesson in
drawing: tens of thousands of cells become a handful of merged regions, one
per height, so the page stays a few items however large the pile.

## History

Bak, Tang and Wiesenfeld introduced the sandpile as a model of
self-organised criticality ("Self-organized criticality", Phys. Rev. Lett.,
1987). Dhar discovered its abelian property and the sandpile group
("Self-organized critical state of sandpile automaton models", Phys. Rev.
Lett., 1990); Creutz drew the first identity elements (1991). The fractal
structure of single-source piles was studied by Ostojic (2003) and explained
by Levine, Pegden and Smart ("Apollonian structure in the Abelian sandpile",
Geom. Funct. Anal., 2016). A good introduction is Levine and Propp, "What is
a sandpile?" (Notices of the AMS, 2010).

## This implementation

- **Spec knobs:** `mode` (auto / single / sources / identity), `lattice`
  (auto / square / hex / triangle), `grains` (1-100,000; empty lets the seed
  choose), `sources` (2-6 piles), `cells` (identity rectangle width, 4-120),
  `palette` (auto or one of six), `style` (colour / line_art), `width`,
  `height`, `margin`.
- **Generation:** the board is the lattice's cells inside a disc (piles) or a
  rectangle with the page's proportions (identity); sides facing outside lead
  to a sink. Toppling uses a worklist and fires `⌊h/d⌋` times at once. The
  total number of topplings is fixed by the pile (the least-action
  principle), so the caps bound the time: at most a couple of seconds at the seed's sizes,
  a few seconds at the caps.
  Piles get a disc sized from the expected density, regrown 1.4× if any grain
  reaches its edge, so a pattern is never clipped. Several sources sit on a
  seeded ring with seeded shares of the grains. The identity is
  `(2m − (2m)°)°`, where `m` holds `d − 1` grains everywhere. Equal heights
  are merged into regions (on squares with the shared label-outline tracer,
  on hexagons and triangles by matching corner keys); line art draws each
  border once, straight runs merged. The fullest height takes the deepest
  colour.
- **Solving:** Nothing to solve.
- **Guarantees:** every page is stable (every height below the lattice
  degree) and conserves grains (grains held plus grains lost equals grains
  dropped; nothing is lost for single and multi-source piles), recorded as
  `verification: stable_and_conserved`. Tests check the square pile's D4 and
  the hexagonal pile's sixfold symmetry, that the identity is idempotent
  (`id ⊕ id = id`) and fixes the maximal pile, and that neighbours are mutual
  and share their side. Out-of-range knobs are clamped and reported as
  `requested_<field>`.

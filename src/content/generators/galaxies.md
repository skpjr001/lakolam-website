---
title: "Spiral Galaxies"
blurb: "Spiral Galaxies — partition into whirls, each symmetric about its dot"
category: puzzle
version: "1.0.0"
---
Divide the whole board into whirls, one around each dot — every whirl looks
identical turned 180° about its own dot.

## What it is

The board is covered by galaxies. Each galaxy contains exactly one dot, and
is point-symmetric about it: rotate the galaxy half a turn around its dot and
it maps onto itself. A dot can sit at a cell's centre, on the line between two
cells, or at a corner where four meet. The dots are the only clue.

## How to play

Start from the dots. Each galaxy must at least cover the cells its dot
touches, and every cell it claims drags in the cell diametrically opposite.
Work outward: when a cell has only one dot that could own it symmetrically,
it is settled — and settling it settles its mirror. The board fills as a
jigsaw of pinwheels.

## Purpose

The one puzzle in the catalogue whose generation is *native* to the engine.
`lako-geom` already computes rotational symmetry for the mandalas, and a
galaxy is a C₂-symmetric region under exactly that idea — so Spiral Galaxies
is the design lane and the puzzle lane meeting in the middle.

## History

Published by Nikoli as *Tentai Show* ("astronomical show"), and known in the
West as Spiral Galaxies. A favourite of Simon Tatham's puzzle collection.

## This implementation

- **Spec knobs:** `size` (5–9), `galaxy_share` (target coverage per whirl —
  smaller means more, tighter galaxies), `difficulty`, `cell`, `line`.
- **Generation:** symmetric galaxies are grown to cover the board, each cell
  added together with its 180° image so symmetry holds by construction; dots
  are placed only where their whole core mirrors on-board. The dots are then
  handed to a symmetric-search solver that assigns cells in mirror pairs and
  checks connectivity; the board ships only if that solver finds exactly one
  partition, and the shipped answer *is* the solver's partition.
- **Guarantees:** deterministic per seed; every galaxy provably symmetric and
  connected; exactly one partition, proven by exhaustive symmetric search.
  Rated by galaxy density (named in the metadata) — a region genre with no
  technique ladder.

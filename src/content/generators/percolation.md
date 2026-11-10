---
title: "Percolation Clusters"
blurb: "Percolation clusters at the critical threshold: random sites or bonds, every cluster its own colour, the spanning cluster and its fractal hull"
category: design
version: "1.0.0"
---
Random sites or bonds at the critical threshold, every cluster its own
colour, and the largest cluster's fractal hull.

## What it is

Fill each cell of a lattice at random with probability p, and call two
filled cells connected when they share an edge. The filled cells fall into
clusters. When p is small the clusters are specks; when it is large one
cluster swallows nearly everything. In between lies a sharp threshold, the
critical probability pc, where the largest cluster only just reaches from
one side of the page to the other. At pc the clusters come in every size
at once, with lacy holes inside holes, and their outlines are fractal.

This page draws a lattice exactly at that threshold: square cells
(pc ≈ 0.5927), hexagons (sites of the triangular lattice, pc = 1/2),
triangles (sites of the honeycomb lattice, pc ≈ 0.6970), or a grid of
nodes joined by randomly open bonds (pc = 1/2). Each cluster is filled in
one colour, ranked by size: the largest stands out in the boldest colour,
the next few in their own colours, the smallest in a pale tint, and any
cluster that spans the page from edge to opposite edge is outlined. A disc
mode cuts the lattice into a round plate, and a hull mode draws only the
outer boundary of the largest cluster as one long, wandering line.

## How to use it

The colour pages are prints: a poster of how chance builds connected
shapes. Look for the biggest cluster — does it reach across? Change the
shift a little above or below zero and the picture changes character
abruptly: a little below, only islands; a little above, one continent with
lakes. The line-art page is a colouring sheet: every outlined cluster is a
shape to colour, and colouring the largest one first shows how it threads
through the others. In hull mode, trace the line with a finger: one closed
loop, never crossing itself, that still manages to fill a good part of the
page.

## Purpose

Percolation is the simplest model of a phase transition and the standard
picture of connectivity: how coffee finds its way through the grounds, how
a fire or an epidemic spreads, when a porous rock lets oil through, when
a random network holds together. The page shows what "critical" looks like
— structure at every scale — with the real thresholds of real lattices.

## History

Simon Broadbent and John Hammersley introduced percolation theory in 1957
("Percolation processes", *Proc. Cambridge Phil. Soc.*), motivated by gas
masks whose carbon granules let gas through only along connected pores.
Harry Kesten proved in 1980 that the bond threshold of the square lattice
is exactly 1/2, following M. F. Sykes and J. W. Essam's 1964 duality
argument that also gives 1/2 for sites of the triangular lattice. Joseph
Hoshen and Raoul Kopelman published their one-pass cluster-labelling
algorithm in 1976. The fractal hull was measured by Ziff, Cummings and
Stell (1984) and by Voss (1984), and Bertrand Duplantier and Hubert Saleur
derived its dimension 7/4 in 1987; Stanislav Smirnov's 2001 proof of
conformal invariance for triangular site percolation and the SLE₆ work of
Lawler, Schramm and Werner made it rigorous. The square-site threshold
used here is J. L. Jacobsen's 2015 value 0.59274605…, and the honeycomb
value 0.6970402 is from Feng, Deng and Blöte (2008).

## This implementation

- **Spec knobs:** `width`, `height` (points); `lattice` (`square`,
  `triangular`, `honeycomb`, `bond`); `mode` (`page`, `disc`, `hull`);
  `shift` (−0.3 to 0.3, default 0: p = pc + shift); `cells` (10–300,
  default 90 — about that many cells across, every lattice's cells having
  about the same area); `palette` (`auto`, `sunset`, `ocean`, `orchard`,
  `ink`); `style` (`colour`, `lines`); `stroke`.
- **Generation:** each lattice is built as its dual tiling — squares,
  hexagons, triangles, or node squares and bond bars — with every vertex
  on an integer key lattice, so cells that share a corner share it
  exactly, and only cells wholly inside the frame (or disc) are kept. Two
  cells are neighbours exactly when they share an edge. Sites (or bonds)
  are occupied with probability p in a fixed order. Clusters are labelled
  by union–find in scan order (Hoshen–Kopelman) and ranked by size. A
  cluster's outline is the set of its cells' directed edges it does not
  share with itself, chained into closed loops: outer loops wind one way
  and holes the other, so each cluster is one filled path with its holes.
  At a corner where two cluster cells touch only diagonally the chain turns
  towards the cell it is following, so the outer loop of the largest
  cluster is its hull (fjords included). Spanning means touching opposite
  sides of the frame (for the disc, opposite quarter arcs). The hull's
  box-counting dimension over 1–16 lattice spacings is reported.
- **Guarantees:** deterministic per seed; at shift 0 the occupation
  probability is the lattice's critical threshold. Tests prove that the
  union–find clusters equal the clusters of an independent breadth-first
  flood fill over neighbours found from cell-centre distances alone; that
  every occupied cell lies inside exactly one cluster region (winding
  number 1 for its own, 0 for every other) and every empty cell inside
  none, with each region's area equal to its cells' area; that spanning
  agrees with a breadth-first search from one side to the other; and that
  the hull encloses every cell of the largest cluster and never runs along
  an edge twice. `verification: clusters_match_flood_fill_regions_partition_sites`.
  The line-art page reports the adult colourability check (`colorable`).
  Clamped knobs are reported as `requested_<field>`.

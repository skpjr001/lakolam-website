---
title: "Virus Capsids"
blurb: "Virus capsids on the Caspar–Klug lattice — 12 pentamers and 10(T−1) hexamers seen down a symmetry axis — with T-number plates and a bacteriophage"
category: design
version: "1.0.0"
---
The geodesic shells of viruses — twelve pentamers and a lattice of
hexamers — drawn down their axes of symmetry, with a plate of the T
numbers and a tailed bacteriophage.

## What it is

Many viruses wrap their genes in a shell made of many copies of one
protein. The copies sit on a hexagonal lattice folded into an
icosahedron, and to close the shell exactly twelve places must hold five
copies (pentamers) instead of six (hexamers). Count `h` steps along the
lattice from one pentamer, turn 60° and count `k` more: you reach the
next pentamer, and the shell has `T = h² + hk + k²` times sixty protein
copies. T can be 1, 3, 4, 7, 9, 12, 13 … but never 2, 5 or 6. This page
draws such shells as rings of capsomers, as beads of individual proteins,
or as the folded icosahedron with its lattice and the h-then-k path
marked; seen down a five-fold, three-fold or two-fold axis.

## How to use it

A striking print for a biology classroom or a lab corridor. Find the
pink pentamers: there are always twelve, wherever you look from. Between
two neighbouring pentamers, count the steps along the rings: h straight
on, then k after a turn — the caption gives both, and T. On a "7L" or
"7D" shell the path turns left or right: the two are mirror images. The
plate puts the series side by side so you can watch the shell grow; the
phage page shows a virus that infects bacteria, with its head on a
spring-loaded tail. The black-and-white version is a page to colour in:
colour the pentamers first.

## Purpose

A design-lane page of structural biology: exact Caspar–Klug geometry
rendered in the style of cryo-electron-microscopy reconstructions.

## History

Francis Crick and James Watson (1956) argued that small viruses must
build their shells from identical subunits in a symmetric array. Donald
Caspar and Aaron Klug's "Physical principles in the construction of
regular viruses" (1962) gave the quasi-equivalence theory and the T
numbers, inspired in part by Buckminster Fuller's geodesic domes. Since
then X-ray crystallography and cryo-electron microscopy have confirmed
the T lattices of many viruses — T = 1 satellite viruses, T = 3 plant and
picornaviruses, T = 7 papillomavirus, T = 13 rotavirus layers — and the
prolate heads of tailed phages such as T4.

## This implementation

- **Spec knobs:** `layout` (single, series, phage), `h` and `k` (0–8;
  empty for the seed's choice), `view` (auto, five_fold, three_fold,
  two_fold), `style` (auto, capsomers, subunits, facets), `palette`
  (auto, cryo, pastel, amber, ink), `caption`, `width`, `height`,
  `margin`.
- **Generation:** the `(h, k)` lattice is folded onto the icosahedron and
  its points pushed onto the sphere: the 12 vertices are the pentamers,
  the rest hexamers, each with its lattice neighbours in order round it.
  A capsomer is drawn as the lattice cell round it (the centres of its
  lattice triangles), shrunk and holed, raised a little off the shell,
  and seen orthographically down the chosen axis — so the rings
  foreshorten towards the rim — painted from the back of the visible
  hemisphere forwards and shaded by a fixed light. Hexamers are coloured
  by quasi-equivalent position (lattice distance to the nearest pentamer
  and how many pentamers they touch). Subunits are the `60T` points
  between each capsomer and its lattice triangles, drawn as shaded
  beads: A in pentamers, B and C alternating round hexamers. Facets show
  the flat icosahedron's visible faces with the lattice on them and the
  path from the central pentamer: `h` steps straight, a 60° turn, `k`
  steps. The phage head is the same lattice stretched along its five-fold
  axis on a collar, a sheath of stacked rings, a hexagonal baseplate and
  six kinked fibres.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic per seed; exactly 12 pentamers,
  `10(T − 1)` hexamers and `60T` subunits for every `(h, k)`; T is never
  2, 5 or 6; the five-fold view maps onto itself under a 72° turn; the
  h, k path ends on a pentamer; all ink inside the page; clamped `h` and
  `k` record `requested_<field>` (and `h = k = 0` records
  `requested_t`).

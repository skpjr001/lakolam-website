---
title: "Zellige Mosaic"
blurb: "A Moroccan zellige star mosaic by hasba construction: rosettes, petals and kites cut as tesserae with even grout"
category: design
version: "1.0.0"
---
A Moroccan star mosaic: a great rosette ringed with petals and kites, cut
into hundreds of glazed tesserae set in even white joints.

## What it is

A design in the manner of zellige, the cut-tile mosaic of Morocco. Each
repeat holds a large rosette — a star of 8, 12, 16 or 24 points ringed by
kites and almond-shaped petals inside a circle — and between the rosettes the
square grid forces smaller eight-pointed stars at the corners. Every shape is
a separate tile with a thin, even joint of grout around it. The panel is
framed by border bands, as a rectangle or as a wall fountain under a pointed
arch.

## How to use it

Start at the centre of a rosette and work outward: the star, the ring of
kites between its points, the petals, then the ground and the small stars
where four repeats meet. Every tile has its twins in mirror image all round
the panel. To colour it, choose the line-art palette and give each ring one
colour, as the tile cutters do.

## Purpose

A rich, meditative page that shows how a single circle, a star and a ruler
build the whole of a classic Islamic star pattern — and why the square grid
insists on its eight-pointed stars.

## History

Zellige (zillīj) has been made in Morocco and al-Andalus since at least the
10th century and flourished under the Marinids in the 14th: the madrasas of
Fez (the Bou Inania, the Attarine) and the Alhambra in Granada are covered
in it. Craftsmen (maâlem) cut each tessera by hand from glazed tiles and lay
the pieces face down following a full-size drawing. The patterns are
constructed with compass and straightedge by the hasba (measure) method:
radial lines, a star on a first circle, its edges extended to a second
circle, the lattice repeated by symmetry. Workshops in Fez and Meknes
continue the craft today. This page is a geometric grammar in the manner of
the tradition, not a copy of any panel. See Jean-Marc Castéra, *Arabesques:
Decorative Art in Morocco* (ACR, 1996), and Jay Bonner, *Islamic Geometric
Patterns* (Springer, 2017), on polygonal and radial construction.

## This implementation

- **Spec knobs:** `order` (points of the main rosette: 8, 12, 16 or 24; 0 =
  by seed; other values snap to the nearest and are reported), `repeats`
  (1–6 across), `star` (point size as a fraction of the cell), `frame`
  (auto, panel, fountain), `palette` (auto, fez, tetouan, line_art), `grout`
  (joint width), `width`, `height`, `margin`.
- **Generation:** in the fundamental triangle of p4m (rosette centre, edge
  midpoint, cell centre) the main {n/k} star is drawn on the first circle;
  from each of its points the two star edges are extended to a second
  circle, which closes the ring of kites and petals, and the ends are joined
  into the rosette's rim; the 8-fold {8/3} star the lattice forces at the
  cell centre sends its extended edges out until they meet the rim. The
  triangle's lines are unfolded by the eight elements of D4 and translated
  over the panel; the faces of their planar arrangement are the tesserae,
  each inset by half the grout width (mitred offset) and clipped to the
  frame. Tiles are grouped by symmetry orbit (each face's centroid folded
  into the fundamental triangle) and the orbits coloured outward from the
  main star, neighbouring orbits differing where the palette allows.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic per seed; `verification:
  p4m_symmetric_tesserae_with_even_grout`. Tested for every order: the
  image of every whole tile's centroid under each mirror and quarter turn
  about a rosette and each lattice step is another tile's centroid, of the
  same colour; no two tesserae overlap (pairwise intersection area zero);
  every long joint is exactly half the grout width from each tile (so joints
  are even); all ink stays on the page.

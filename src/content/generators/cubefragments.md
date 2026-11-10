---
title: "Cube Fragments"
blurb: "Broken hypercubes in the spirit of Manfred Mohr: grids of cube edges turned and chosen by a rule, heavy black on white"
category: design
version: "1.0.0"
---
Broken hypercubes in heavy black line — grids of cube edges, turned and
chosen by a rule, in the spirit of Manfred Mohr's algorithmic cube works.

## What it is

A grid of small drawings, each a cube — or a cube from four, five or six
dimensions — seen from an angle, with only some of its edges drawn. From
cell to cell the cube turns a fixed step further, and a different set of
its edges is kept: a broken trail of connected edges, a random handful, a
set beside exactly the edges it left out, or a figure that grows edge by
edge until the whole cube stands there. Every line is a real edge of the
cube, so the fragments keep a strange family likeness: angles and lengths
repeat, and the whole cube seems to be just out of sight. The rule that
made the grid is printed underneath.

It comes as heavy black lines on white, with some of the cube's square
faces filled solid black, or as white lines on black. The left-out edges
can be shown as faint hairlines.

## How to use it

Frame it as a print or poster, or print a single grid as a card. Read the
grid like a sentence: along a row the cube turns, down a column the rule
moves on. Try the complement rule on the plain cube with the faint edges
switched on — each pair of cells adds up to one whole cube — or the growth
rule with only the subset varying, which builds a tesseract in front of
you. Four dimensions with the trail rule is the classic look; six
dimensions makes dense, knotted figures.

## Purpose

The page shows a cube used as an alphabet: twelve edges (or many more in
higher dimensions) are the letters, and a rule writes words with them.
Because every fragment comes from the same structure, the eye senses the
whole even when most of it is missing — a quiet lesson in how much a
picture can leave out and still be understood.

## History

Manfred Mohr (born 1938 in Pforzheim, Germany), a jazz musician and
painter who settled in Paris in 1963, turned to writing computer programs
for his drawings in 1969, influenced by Max Bense's information
aesthetics. In 1971 the Musée d'Art Moderne de la Ville de Paris showed his
plotter drawings in "Une Esthétique Programmée", one of the first solo
museum exhibitions of computer-generated art. In *Cubic Limit* (1973-75)
he made the twelve edges of a cube the alphabet of his work: programs
selected and combined edges by rules, and the drawings, a computer film of
1973-74 and the catalogue of his 1975 show at the Galerie Weiller in Paris
laid the results out in grids. *Cubic Limit II* (1976-77) carried on with
similar algorithms, and from 1977 he turned to the four-dimensional
hypercube and graph theory (*Dimensions*), later working with cubes of
five, six and more dimensions. These pages are original compositions made
with that kind of rule; they do not reproduce any of Mohr's works.

## This implementation

- **Spec knobs:** `width`, `height` (144-2000 pt), `margin` (0-144 pt),
  `dimension` (3-6, default 4), `grid` (2-8 cells a side, default 4),
  `rule` (path, random, complement, growth), `edges` k (0 = by dimension:
  6, 12, 24, 40; else 1 up to the edge count, one less for complement),
  `vary` (both, rotation, subset), `step` (0-90°, default 15), `look`
  (lines, planes, inverse), `ghost`, `caption`, `stroke` (0.5-12 pt,
  default 3.5, at most 8% of a cell). Values outside a range are clamped
  and reported as `requested_<field>`.
- **Generation:** vertices are the bit masks of {0, 1}ⁿ (centred at the
  origin), edges join masks one bit apart (n·2ⁿ⁻¹), faces fix all but two
  bits. The view is the best of sixteen seeded orientations (the one whose
  projected axes are furthest from parallel); two seeded coordinate planes
  are the planes of turning. Cell (row, col) is turned col steps in the
  first plane and row steps in the second, and its subset index is its
  place in reading order — under `rotation` every cell shares subset 0
  (complement alternates 0 and 1), under `subset` every cell shares the
  unturned view, and under `both` complement pairs share one view. The
  projection is orthographic: the first two rows of the rotation. One scale
  serves the whole page, the largest that keeps every cell's figure within
  80% of its square. Rules: `random` takes k edges from a seeded shuffle;
  `path` walks from a seeded vertex along unused edges for k steps (it
  stops early if it reaches a dead end); `complement` gives even subsets k
  random edges and odd ones exactly the rest; `growth` takes ever longer
  prefixes of one seeded order of all edges, ending with the whole cube (k
  edges when there is only one subset). The planes look fills up to four
  faces with at least two drawn edges.
- **Guarantees:** deterministic per seed. `verification:
  segments_are_cube_edges`: tests read every segment back out of the page
  and match it to the projection of a pair of vertices one bit apart, found
  by brute force over all vertex pairs; check that every projection has two
  orthonormal rows; that every filled plane is a true square face (its
  corners one bit apart in turn) and projects to a parallelogram; that each
  cell's edges equal the rule recomputed alone from the seed and its subset
  index; that paths are trails, complement pairs partition the edges and
  growth prefixes nest; that every cell's ink stays inside its own square,
  the squares do not overlap and all ink stays on the page. Meta records
  the planes, the step, the system and every cell's turns, subset and
  edges.

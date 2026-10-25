---
title: "Tocapu Cloth"
blurb: "A cloth of square glyph cells in the manner of Andean tocapu: every glyph new and distinct, no two neighbours alike in kind"
category: design
version: "1.0.0"
---
A woven cloth of small square glyphs in the manner of Andean tocapu: every
square a different bold figure, no two neighbours alike.

## What it is

A design in the manner of tocapu, the square designs woven into fine cloth in
the Andes. The cloth is a grid of cells, each with its own ground colour and a
figure built from a few bold shapes — stepped diagonals, nested squares,
chevrons, ladders, meanders, diamonds — often turned or mirrored into a
symmetric whole. Three arrangements: the whole cloth covered in cells; a
waist band of cells across a plain field under a stepped, chequered neck
yoke; and cells alternating with small chequered squares like a chessboard.
A border of stepped teeth can frame the cloth.

## How to use it

Look for the families: which cells are built from the same kind of shape,
turned or recoloured? No figure appears twice, and two cells that touch are
always made from different kinds of shape. To colour it, choose the
line-art palette: every figure is a set of closed shapes, and the grounds run
in diagonals you can keep or break.

## Purpose

A rich, orderly page of small invented emblems, and a quiet lesson in how a
few shapes, a symmetry and three colours make hundreds of distinct designs.

## History

Tocapu (tokapu) are the square designs found on Inka-era garments of the
15th and 16th centuries and on colonial-era cloths, wooden cups (qeros) and
paintings made by Andean communities after the Spanish conquest. The finest
known tunics are covered entirely in them, others carry them in a band at the
waist. What they meant is not known: proposals range from heraldry and
place-names to a form of writing, and none is settled. This page is a
geometric grammar in the manner of that tradition, not a reproduction: every
glyph on it is new, generated from simple shapes, and no catalogued tocapu is
copied. See Rebecca Stone-Miller, *Art of the Andes* (Thames & Hudson, 2002);
John H. Rowe, "Standardization in Inca Tapestry Tunics" (in *The Junius B.
Bird Pre-Columbian Textile Conference*, 1979); and Tom Cummins, *Toasts with
the Inca* (2002) on tocapu across media.

## This implementation

- **Spec knobs:** `layout` (grid by default; auto, band, chequer), `columns` (3–16; 0 =
  six to nine by seed), `detail` (the 6–14 micro-grid each glyph is drawn
  on), `palette` (auto, andean, highland, line_art), `border` (stepped
  teeth), `stroke`, `width`, `height`, `margin`.
- **Generation:** glyphs come from a cell grammar: one or two primitives
  painted on a k×k micro-grid in two inks, made exactly symmetric under a
  square symmetry group (mirrors, half turns or the full square group —
  never quarter turns without mirrors, the fylfot form), opened so no
  feature is thinner than the minimum, and traced to merged outlines. A pool
  three times the cell count is generated and shuffled; cells are filled in
  reading order with the first unused glyph whose primitives are disjoint from
  every placed neighbour's (edge neighbours; corner neighbours in the
  chequer), topping the pool up from a derived seed when needed. Ground
  colours run in diagonals (cell colour index column + 2·row mod 4), and each
  cell's two inks are the strongest contrasts to its ground.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic per seed; `verification:
  glyphs_distinct_and_neighbours_share_no_primitive`. Tested: no two glyphs
  on a page are equal under rotation or reflection; neighbouring glyphs share
  no primitive in every layout; no glyph has quarter-turn symmetry without
  mirror symmetry; edge-adjacent cells never share a ground and
  a cell's three inks are distinct; all ink stays on the page for every
  layout, palette and extreme size.

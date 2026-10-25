---
title: "Square Limit"
blurb: "A Square Limit built with Henderson's functional geometry: a seeded interlocking tile repeated ever smaller toward the edge"
category: design
version: "1.0.0"
---
One bent triangle, turned, mirrored and halved over and over until the tiles
crowd into an infinitely fine border: a square limit built the way Peter
Henderson described it.

## What it is

A square filled with copies of a single interlocking tile. Big tiles meet in
a pinwheel at the centre; around them the tiles halve in size ring by ring,
so the pattern runs down toward the edge of the square without ever
reaching it. Every tile's sides are bent by the same wavy curve, chosen so
that each bump fits a matching hollow in its neighbour: no gaps, no
overlaps. The tiles are coloured by the way they face, with four colours
arranged so that no two touching tiles share one, and each carries the same
decoration, shrinking and turning with it.

## How to use it

The colour pages are prints. Follow one colour from the centre outward and
watch it spin: tiles facing the same way share a colour, so each colour
traces a whirling chain into the border. The line-art page is a colouring
sheet: colour the big centre tiles first, then work outward; using one
colour per direction a tile faces reproduces the printed pattern, and four
colours are always enough to keep neighbours different. The smallest tiles
at the edge are for fine pens, or leave them as a border texture.

## Purpose

A celebrated piece of mathematical art made by a program that composes
pictures the way a mathematician composes functions: the whole square is a
short formula of a dozen operations applied to one tile. It shows recursion,
similarity and tiling at once, and the result is exact: every tile meets its
neighbours along the same curve.

## History

M. C. Escher's woodcut *Square Limit* (1964) tiled a square with fish that
shrink toward its edge, after his correspondence with H. S. M. Coxeter on
hyperbolic tilings. Peter Henderson rebuilt it in "Functional Geometry"
(Symposium on LISP and Functional Programming, 1982; revised in
*Higher-Order and Symbolic Computation* 15, 2002), defining pictures as
functions of a box and the whole print as `squarelimit(n)` from `beside`,
`above`, `rot`, `rot45`, `flip`, `over`, `quartet`, `nonet`, `side` and
`corner`; the construction is a classic of computer-science teaching
(Abelson and Sussman, *Structure and Interpretation of Computer Programs*,
1985, §2.2.4). Escher's fish are his own; this page bends the tile's sides
with a seeded wave instead.

## This implementation

- **Spec knobs:** `width`, `height` (points); `depth` (n of
  `squarelimit(n)`, 2–5); `wiggle` (how far the sides bend, 0 = plain
  triangles, up to 1.5); `decoration` (`auto`, `plain`, `echo`, `ornament`,
  `full`); `ornament` (`auto`, `none`, `spiral`, `star`, `trefoil`, `petal`,
  `leaf`, `diamond`, `eye`); `colour_by` (`four`, `eight`, `size`); `style`
  (`colour`, `lines`); `palette` (`auto`, `woodcut`, `ocean`, `autumn`,
  `jewel`, `ink`); `stroke` (outline width of the largest tiles; smaller
  tiles get proportionally finer lines).
- **Generation:** the combinators are Henderson's 2002 definitions, kept as
  an expression tree and evaluated on the unit square into one box per
  tile. The tile is the triangle O(0,0) X(1,0) Y(0,1) of its box. Following
  the combinators through, its sides meet neighbours in only three ways:
  leg OX against a neighbour's leg OY turned a quarter about O; the half
  hypotenuse MY against a mirrored half-size neighbour's leg OX; and the
  hypotenuse against another turned half a turn about M. So one curve on
  OX — a seeded sine series `Σ aₖ sin(kπs)` with two to four terms —
  fixes all three sides; amplitudes are shrunk until the outline is a
  simple polygon with a body (largest inscribed circle at least a third of
  the triangle's). Decoration (offset echo lines, a motif at the
  pole of inaccessibility) is built once in the tile's box and mapped with
  every tile. Tiles in the eight orientations (multiples of 45°, mirrored
  at the odd ones) are coloured in pairs {315°, 0°}, {45°, 90°},
  {135°, 180°}, {225°, 270°}.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic per seed; `verification:
  tiles_disjoint_and_neighbours_differ` — no point lies in two tiles
  (sampled at depths 2–4 over several seeds), the middle ninth is covered
  exactly once (the sides interlock), and every pair of touching tiles has
  different colours in the four-colouring (probed along every outline);
  every tile's side is the largest tile's divided by a power of √2, and
  size tracks the distance to the edge (tested). Clamped knobs are reported
  as `requested_<field>`; the line-art style reports its colourability
  check (deep pages have tiles too small to colour, by design).

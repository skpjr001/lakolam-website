---
title: "Iterated Function Systems"
blurb: "Iterated function systems by deterministic iteration: Barnsley's fern, a maple leaf, the Sierpinski family, dragons and seeded collages"
category: design
version: "1.0.0"
---
Barnsley's fern, a maple leaf, the Sierpinski family and the dragons, each
built from a handful of shrinking copies of itself and coloured by which
copy is which.

## What it is

An iterated function system is a short list of rules, each one a way to
shrink, turn, skew and move a picture. Apply all the rules to any shape and
lay the results on top of each other; do it again to the result, and again.
Whatever shape you start with, the pictures settle on one figure, the
*attractor*, which is exactly the union of its own shrunken copies. Four
rules make a fern: one draws the stem, one the two lowest leaflets each, and
one a slightly smaller copy of the whole fern sitting on top. Three
half-size rules make the Sierpinski triangle; two quarter-turning rules make
the Heighway dragon.

Here the figure is drawn by applying the rules over and over to a starting
shape until every piece is smaller than the detail size. Every piece is one
copy of the starting shape, and its colour comes from the sequence of rules
that made it, so the copies within copies show up as families of colour.
The figures are Barnsley's fern and a finer "mutant" fern, a maple leaf,
the Sierpinski triangle, carpet and pentagon, the Heighway dragon, the Lévy
C curve, the twin dragon, a hexaflake crystal, a branching tree, and random
collages of two to five rules.

## How to use it

Print it as a poster or a card: the fern, leaf and tree are botanical
prints; the dragons and Sierpinski figures are geometric ones. Colouring by
*address* gives neighbouring copies neighbouring colours, so a dragon reads
as one long ribbon of colour folded on itself; colouring by the *first rule*
shows the main copies, and by *depth* shades a fern from base to tip. Turn
on outlines to see the first two or three rounds of copies drawn over the
figure, the clearest way to see how the rules build it. Start from a square
or a circle at a low detail to watch the starting shape matter less and
less: the figure is the same whatever it began as.

## Purpose

To show the collage theorem at work: a handful of numbers really is the
whole fern. The page draws the figure exactly, as the images of one shape
under the rules, so every piece on the page is something you could compute
by hand.

## History

John E. Hutchinson proved in 1981 ("Fractals and self-similarity",
*Indiana University Mathematics Journal*) that every finite family of
contractions has exactly one compact set equal to the union of its images.
Michael Barnsley and Stephen Demko named iterated function systems in 1985,
and Barnsley's *Fractals Everywhere* (1988) popularised the collage theorem
(Barnsley, Ervin, Hardin and Lancaster, 1986), the chaos game and the fern
modelled on the black spleenwort, *Asplenium adiantum-nigrum*. The Sierpinski
triangle and carpet are Wacław Sierpiński's (1915, 1916). The dragon curve was
found by NASA physicists John Heighway, Bruce Banks and William Harter in the
1960s and made famous by Martin Gardner in 1967; the twin dragon is Chandler
Davis and Donald Knuth's (1970). The C curve was studied by Paul Lévy in 1938.
The pentaflake's ratio 1/(1 + φ) goes back to Albrecht Dürer's pentagon
constructions (1525).

## This implementation

- **Spec knobs:** `width`, `height` (points, 200-3000); `preset` (`auto`
  picks one of the eleven classics by the seed; `fern`, `mutant_fern`,
  `maple_leaf`, `sierpinski_triangle`, `sierpinski_carpet`,
  `sierpinski_pentagon`, `heighway_dragon`, `levy_c`, `twin_dragon`,
  `crystal`, `tree`, `random`); `colour_by` (`auto` = depth for the ferns
  and the tree, first map for the maple leaf, address for the rest; `address`, `first_map`, `last_map`,
  `depth`); `base` (`natural`, `square`, `circle`); `palette` (`auto`,
  `forest`, `autumn`, `ocean`, `sunset`, `spectrum`, `ink`); `detail` (1-10,
  default 7: pieces are refined until their box diagonal is under
  1/2^(detail+1) of the figure's); `outlines` (0-3: outline the first
  generations); `caption`.
- **Generation:** each system is a list of affine maps `x' = ax + by + e,
  y' = cx + dy + f`. The base polygon is the system's own tile (triangle,
  square, pentagon, hexagon) for the Sierpinski figures and the crystal, and
  otherwise the convex hull of the attractor, found by applying every map to
  the hull's vertices from the maps' fixed points until the hull stops
  growing (then cut down to at most 12 vertices). The pieces are
  `f_{a₁}∘…∘f_{a_k}(B)`, refined depth first branch by branch until a piece
  is small enough (at most 160 compositions); if more than 18,000 pieces
  would be needed, the detail size grows by 1.25 until they fit (counted in
  meta as `coarsened`). Pieces are coloured by a seeded permutation of the
  map indices: the address read as a base-n fraction, the first or last
  map, or the composition depth. Barnsley's stem map (0, 0.16y) is given
  width 0.02 so the stem has area to draw; the mutant fern's stem gets 0.01.
  The random collage draws two to five maps (rotation, unequal scale 0.3-0.75,
  shear, sometimes a flip) with contraction at most 0.8, and keeps a
  candidate only if the total area ratio Σ|det| is 0.45-1.05, the hull is no
  flatter than 1:3 and a short orbit covers 25-90 % of the hull; after 48
  failed attempts it keeps the best-scoring one (meta `random`).
- **Guarantees:** deterministic per seed. Every map is a contraction: its
  largest singular value is computed in closed form, recorded in meta and
  checked against 3,600 directions in the tests. Every piece is exactly the
  image of the base polygon under the composition of its address: the tests
  recompute each piece by applying the maps one at a time to the base
  vertices, last map first, and match the drawn polygon. The addresses form a
  complete prefix code (Σ n^−length = 1), so every point of the attractor
  is covered by exactly one branch. The natural tiles nest exactly
  (`H(B) ⊂ B`, tested), and an independent chaos-game orbit lands on the
  drawn pieces, to within the detail size, for every preset. All ink is
  within the page. `verification:
  contractive_maps_pieces_are_address_images`. Clamped knobs are reported as
  `requested_<field>`.

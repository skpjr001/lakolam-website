---
title: "Hyperbolic Tiling"
blurb: "Regular hyperbolic tilings {p,q} in the Poincare disc, Escher Circle Limit style"
category: design
version: "1.1.0"
---
Infinitely many identical tiles in a single circle, shrinking towards an edge
they never reach. This is the geometry behind M. C. Escher's "Circle Limit"
prints.

## What it is

On a flat floor you can fit exactly four squares, three hexagons or six
triangles around a point. Try to fit seven triangles, or four pentagons, and
the floor would have to ruffle like a lettuce leaf. That ruffled surface is
the **hyperbolic plane**, and it has room for tilings a flat plane cannot
hold: {7,3} (three heptagons at every corner), {5,4} (four pentagons), {4,5},
{6,4}, {8,3} and infinitely many more. The Poincaré disc squeezes the whole
infinite plane into one circle. Every tile is really the same size and shape,
straight edges look like circular arcs that meet the rim at right angles, and
the tiles get smaller and smaller towards the rim.

## How to use it

- **Colouring page (line art):** colour it tile by tile. A lovely challenge is
  to colour it so that no two tiles sharing an edge match. Tiles with an even
  number of neighbours at each corner can be done with two colours. For the
  others you need three or more. Work from the centre outwards. The black rim
  is the edge of the world, where the tiles become too small to draw.
- **Checkerboard:** each tile is cut into its mirror triangles, alternately
  black and white. This is the picture mathematicians draw of the symmetry
  itself, and it makes a striking print.
- **Palette:** a finished art print in which no two neighbouring tiles share a
  colour.
- **Rectified and truncated:** two related patterns built on the same
  skeleton. The rectified one alternates two kinds of tile around every
  corner. The truncated one trims every corner off evenly, like a football.
- **Klein and half-plane views:** the same tiling in other maps of the same
  world. In the Klein disc the edges are straight lines, and in the
  half-plane the rim becomes the bottom edge of the page.

## Purpose

A mathematically exact Escher print: real hyperbolic geometry drawn as true
circular arcs, for colouring books, wall art and maths classrooms. Nobody has
to take on trust that the tiles are congruent. The construction guarantees it
and the tests check it.

## History

Non-Euclidean geometry was found in the 1820s and 1830s by Lobachevsky and
Bolyai. Beltrami (1868) and Poincaré (1882) gave it the disc models drawn
here, and Klein gave the model with straight chords. In 1958 the geometer
H. S. M. Coxeter sent Escher a figure of the {6,4} triangle-group
checkerboard. Escher, who had long wanted to show infinity inside a finite
frame, made Circle Limit I to IV (1958–1960) from it. Circle Limit III, the
fish print, is built on the {8,3} tiling.

## This implementation

- **Spec knobs:** `size` (page side, pt); `p`, `q` (0 = let the seed pick
  from {7,3} {5,4} {4,5} {6,4} {8,3} {3,7} {4,6} {5,5}; a fixed side with
  the other on auto is raised until hyperbolic; 3 to 12, and
  `1/p + 1/q < 1/2` is required — since 1.1.0 a side outside 3–12 is held
  to that range and a fixed pair that is not hyperbolic, such as {4,4},
  has `q` raised until it is, with `requested_p`/`requested_q` in meta,
  rather than the page failing); `min_tile` (smallest tile width drawn, pt;
  0 = automatic); `depth` (max rings of tiles, 0 = unlimited); `style`
  (`lines` | `checker` | `palette`; default `palette`, a full-colour print
  grown to the rim); `pattern` (`regular` | `rectified` |
  `truncated`); `model` (`poincare` | `klein` | `half_plane`); `centre`
  (`auto` | `tile` | `vertex` | `edge`); `palette` (`auto` | `escher` |
  `ocean` | `sunset` | `garden` | `slate`); `rim` (fill the band beyond the
  last tiles); `line` (pt). The dual of {p,q} is {q,p}: swap the numbers.
- **Generation:** the first tile is the regular p-gon with circumradius
  `cosh R = cot(π/p)·cot(π/q)` (disc radius `tanh(R/2)`), turned by a seeded
  angle and optionally moved by a disc isometry so that a vertex or an edge
  midpoint sits at the centre. Tiles grow breadth-first. Each kept tile is
  reflected in each of its edges, and each edge is a geodesic: a diameter,
  or a circle orthogonal to the rim found from `Re(conj(c)·a) = (1+|a|²)/2`.
  The reflection is a Euclidean mirror or a circle inversion. The two shared
  vertices are copied rather than recomputed. Every point (vertices, centres,
  edge midpoints, truncation cuts) passes through one snapping registry, so
  tiles that meet share point *indices*. Growth stops at `depth` or when a
  tile falls below the minimum size. In automatic line art that minimum is an
  area: every region the pattern cuts from a tile must clear the 40 mm²
  colouring floor. In the fill styles it is a width of 0.6% of the page. Each
  geodesic is drawn as a true circular arc through its endpoints and its
  hyperbolic midpoint, which becomes a straight line in the Klein model and
  a semicircle in the half-plane (Cayley map). In the half-plane, solid-filled shapes
  (checker triangles, the rim) are clipped to the window as fine polylines,
  so their measured ink is honest. The rim is the disc minus the
  union of the tiles, from the union's boundary loops with nonzero winding.
  Palette colours are a greedy proper colouring in growth order, with seeded
  ties. The checker colour of a fundamental triangle is its tile's
  reflection parity XOR its side of the tile's mirror.
- **Solving:** nothing to solve. This is a design.
- **Guarantees (tested):** deterministic per seed, and different seeds give
  different pages. Every edge is a diameter or an arc of a circle orthogonal
  to the boundary (`|c|² = r² + 1`) through both endpoints and through the
  geodesic midpoint, which is computed independently by an isometry to the
  origin. Neighbouring tiles share an edge by identical vertex indices,
  linked both ways. No edge belongs to more than two tiles, and snapping
  drift stays below 1e-9. At every inner vertex exactly q tiles meet, each
  with angle 2π/q (to 1e-9), and nowhere do more than q meet. The
  triangle-group checkerboard is a proper 2-colouring, and so is the tile
  palette colouring (checked in tests and reported as `proper_colouring` in
  meta). Truncated 2p-gons have all sides equal, rectified and truncated
  vertex polygons have q sides, and every kept tile meets the minimum size.
  The default line-art page, plus every pattern × model × classic {p,q} in
  automatic line art, passes the ADULT colourability gate. Pages with a
  small explicit `min_tile` are meant as prints; there the gate reports
  `colorable: false` honestly rather than blocking. Meta also carries `p`,
  `q`, `tiles`, `rings`, `capped` (a 30,000-tile safety cap), `max_snap` and
  `geodesic_arcs: true`.

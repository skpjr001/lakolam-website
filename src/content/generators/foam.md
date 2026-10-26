---
title: "Foam"
blurb: "2D soap froth obeying Plateau's laws: arc films meeting three at 120°, curved by pressure, aged by coarsening"
category: design
version: "1.0.0"
---
A soap froth in balance: curved films meeting three at a time at perfect
120° corners, small bubbles bulging into big ones, the whole froth
coarsening as it ages.

## What it is

A slice of **foam**, as it looks squeezed between two sheets of glass. Joseph
Plateau found the rules every such froth obeys once it settles: films meet
only **three at a time**, always at **120°**; each film is an arc of a
circle; and its curvature is set by the difference in pressure between the
two bubbles it separates (**Laplace's law**) — a small bubble, at higher
pressure, bulges into its larger neighbour. Over time gas seeps through the
films from small bubbles to large; small bubbles shrink and vanish, and the
froth coarsens. The little curved triangles at the corners are the
**Plateau borders**, where the liquid of the foam collects.

## How to use it

A poster or a page to colour. Look at any corner: three films, three equal
angles. Look at any small bubble: its sides bow outward, while a big
bubble's sides bow in. **Age** lets the froth coarsen longer, **wet** sets
the size of the Plateau borders, and the tint shows each bubble's size or
its number of sides — in an aged froth the five-sided bubbles tend to be
small and the seven-sided large. The page shows one tile of an endless
froth: what leaves one edge comes back on the opposite edge.

## Purpose

A design-lane page that draws real soap-froth physics: every junction,
angle and curvature on the page is computed, not drawn by eye, and the
tests check Plateau's and Laplace's laws on the result.

## History

Joseph Plateau set out the laws of soap films in *Statique expérimentale et
théorique des liquides soumis aux seules forces moléculaires* (1873).
John von Neumann found in 1952 that a 2D bubble's area changes at a rate
proportional to its number of sides minus six. The vertex-and-arc model of
2D foams, with neighbour swaps (T1) and vanishing bubbles (T2), is due to
Denis Weaire, Joseph Kermode and others in the 1980s (Weaire & Kermode,
*Philosophical Magazine B* 48, 1983; Weaire & Hutzler, *The Physics of
Foams*, 1999); François Graner and colleagues developed related models of
cellular patterns.

## This implementation

- **Spec knobs:** `bubbles` (30–400 to start), `spread` (0–1: how uneven the
  starting bubbles are), `age` (0–1: up to 60 % of the bubbles dissolve),
  `wet` (0–1: Plateau border size), `tint` (auto, area, sides, plain),
  `palette` (auto, soap, amber, lagoon, blush, ink), `highlights`, `frame`,
  `caption`, `width`, `height`, `margin`. Clamped values are reported as
  `requested_<field>`.
- **Generation:** seeded points in a periodic box of the picture's shape
  (mean bubble area 1), smoothed by `round(6 × (1 − spread))` Lloyd steps;
  their periodic Voronoi diagram gives junctions, films and bubbles, each
  bubble's target area its cell's. Each film is the circular arc between
  its junctions with curvature P_left − P_right. Relaxation alternates a
  junction step along the sum of its three films' unit tangents (zero at
  120°; the step held to 6 % of its shortest film) and a damped Newton step
  on each bubble's pressure from its area error; films shorter than 7 % of
  the bubble scale flip (T1). Ageing moves every target by von Neumann's
  law, rescaled so the targets fill the box, flips the shortest film of
  any shrunken bubble with more than three sides, removes shrunken
  three-sided bubbles (T2) and two-sided ones, and relaxes, until the asked
  share has gone; then the froth relaxes until the largest junction pull
  is below 2·10⁻⁴. The page shows one period, every item drawn at the nine
  images round the box and clipped. Plateau borders are concave triangles
  of quadratic curves tangent to the three films. The seed picks the points,
  the tint and the palette.
- **Solving:** Nothing to solve.
- **Guarantees:** the starting network has V = 2F junctions and E = 3F
  films with mean six sides (Euler on the torus); after relaxing and
  ageing every junction has exactly three films, every angle between
  films is within 2° of 120° (about 0.01° on default pages, reported as
  `max_angle_error_degrees`), every drawn arc's curvature (from its
  sagitta) equals the pressure difference across it to 10⁻⁶ of the largest
  difference, every bubble is within 1 % of its target area, no film needs
  capping; ageing dissolves bubbles and conserves total area; all ink stays
  on the page; deterministic per seed.

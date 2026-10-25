---
title: "Islands of Chaos"
blurb: "Islands of chaos: phase portraits of the standard map and Hénon's area-preserving map, regular orbits coloured by rotation, the chaotic sea in grey"
category: design
version: "1.0.0"
---
Order and chaos side by side: smooth rings and island chains floating in a
speckled sea, drawn by two simple rules applied thousands of times.

## What it is

A phase portrait of an area-preserving map — the mathematics of a kicked
pendulum (Chirikov's **standard map**) or of a particle in a storage ring
(Hénon's **quadratic map**). Each starting point is moved by the rule over
and over, and every position it visits is marked. Some starts stay on a
smooth closed curve forever; some circle a chain of islands; others wander
chaotically and speckle a whole region. The curves that survive are the
ones the Kolmogorov–Arnold–Moser (KAM) theorem promises; the speckled sea
is where they have broken up.

## How to use it

A poster, a colouring of the coloured families, or a quiet thing to look
at. Each colour family is one kind of motion — neighbouring rings share
colours, and each island chain reads as one group — while the grey speckle
is chaos. The caption names the rule and its strength: on the standard map
a small kick leaves wavy bands right across the picture, and as the kick
grows past about 0.97 the last band breaks and the sea joins up from top to
bottom. The **curves** look joins smooth orbits into lines; the **dots**
look shows every visit.

## Purpose

A design-lane page that shows a theorem: the line between order and chaos
in a system that never loses energy. It complements the attractors (which
contract onto a shape) with maps that preserve area, where nothing
contracts and order and chaos must share the page.

## History

Boris Chirikov introduced the standard map in 1969 (and his 1979 review in
*Physics Reports* 52 made it famous); John Greene located the break-up of
the last golden-mean circle at K ≈ 0.971635 in 1979. Michel Hénon's
quadratic area-preserving map appeared in *Quarterly of Applied
Mathematics* 27 (1969). The KAM theorem behind the surviving curves is due
to Kolmogorov (1954), Arnold (1963) and Moser (1962).

## This implementation

- **Spec knobs:** `map` (auto, standard, henon), `kick` (standard-map K,
  0 = seed's choice), `turn` (Hénon angle in degrees, 0 = seed's choice),
  `orbits` (60–200), `iterations` (200–3,000), `look` (auto, dots,
  curves), `palette` (auto, nocturne, jewel, ocean, ember, ink), `dot`,
  `frame`, `caption`, `width`, `height`, `margin`.
- **Generation:** half the orbits start on the symmetry line (θ = π for
  the standard map, the positive x axis for Hénon's), half on a jittered
  stratified grid. Each orbit is iterated in full and classified by its
  finite-time Lyapunov exponent (a tangent vector carried by the exact
  Jacobian, renormalised each step): below 0.012 it is regular and coloured
  by its rotation number, otherwise it is drawn grey. Hénon orbits that
  leave |x|, |y| ≤ 4 escape and are not drawn; the Hénon window is fitted
  to the orbits that stay. The seed picks the map, the parameter from a
  list of handsome values (K ∈ {0.6 … 1.6} including Greene's 0.971635;
  cos α ∈ {0.24, 0.3, 0.4, −0.2, 0.1}), the starts, look and palette.
- **Solving:** Nothing to solve.
- **Guarantees:** both maps have Jacobian determinant 1 (tested at random
  points, analytically and by finite differences, and on a small
  triangle's image); the classifier calls every K = 0 orbit and an island
  orbit regular and an orbit by the hyperbolic point at K = 3 chaotic; at
  most 100,000 dots per page (tested by counting them in the drawing); a
  joined curve is drawn only when its points leave no gap wider than 6 %
  of the window, so no line jumps across the picture; all ink stays on the
  page; deterministic per seed.

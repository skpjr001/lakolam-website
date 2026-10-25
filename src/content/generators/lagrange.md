---
title: "Zero-Velocity Curves"
blurb: "Zero-velocity curves of the restricted three-body problem, with the five Lagrange points and integrated tadpole and horseshoe orbits"
category: design
version: "1.0.0"
---
The walls a small body cannot cross near two big ones — the five Lagrange
points, and the tadpole and horseshoe paths that circle them.

## What it is

Two bodies, such as the Sun and Jupiter or the Earth and the Moon, circle
each other. Seen from a viewpoint that turns with them, a third, much
lighter body moves through a landscape of hills and valleys. Its energy
fixes how high it can climb, so for every energy there are curves it can
never cross. Drawn for many energies, these curves make rings round each
body, a figure eight that pinches between them, a horseshoe that opens on
the far side, and two kidney-shaped hollows sixty degrees ahead of and
behind the smaller body. The five places where the landscape is flat are
the Lagrange points L1 to L5. Over the curves, a few real paths are traced:
tadpoles that sway round L4 or L5, like Jupiter's Trojan asteroids, and
horseshoes that swing round both, like Saturn's moons Janus and Epimetheus.

## How to use it

Frame it, colour it, or use it to explain where spacecraft park. Find the
point between the two bodies (L1) where the figure eight pinches: a body
with a little more energy than that can pass from one world to the other.
Follow a tadpole and notice that it never touches the curve around it —
each path stays inside its own wall. Compare systems: round the Sun and
Jupiter the hollows are long and the tadpoles thin; round Pluto and Charon
the two bodies are too close in mass for L4 and L5 to hold anything, and the
paths wander away. The line-art style prints well for colouring the bands.

## Purpose

A true picture of a famous problem in celestial mechanics, made from the
equations rather than drawn by hand. It shows why the Trojan asteroids
gather where they do, why the space telescopes sit at L1 and L2, and how a
single conserved number — the Jacobi constant — shapes every path.

## History

Euler found the three collinear points in 1767 and Lagrange the two
triangular ones in 1772 (*Essai sur le problème des trois corps*). Jacobi
found the conserved quantity of the restricted problem in 1836, and G. W.
Hill drew its zero-velocity curves for the Moon in 1878 (*Researches in the
Lunar Theory*). Routh showed in 1875 that L4 and L5 are stable only when
the smaller body holds less than about 3.85 % of the mass. Max Wolf found
the first Trojan asteroid, Achilles, in 1906; Janus and Epimetheus, the
horseshoe pair, were confirmed by Voyager in 1980. A modern account is
C. D. Murray and S. F. Dermott, *Solar System Dynamics* (1999), chapter 3.

## This implementation

- **Spec knobs:** `system` (auto, sun_jupiter, earth_moon, pluto_charon,
  saturn_titan, sun_earth, custom), `mu` (mass ratio for custom, 0.000001–0.5),
  `style` (bands, lines), `levels` (4–40 curves besides the three critical
  ones), `orbits` (0–8), `points` (mark L1–L5), `caption`, `palette` (auto,
  night, aurora, ember, ocean, ink), `width`, `height`.
- **Generation:** the planar circular restricted three-body problem in the
  rotating frame (separation, total mass and angular rate 1). The Lagrange
  points come from bisection on the axis and the equilateral triangles; the
  curves are level lines of 2Ω sampled on a grid and traced by marching
  squares. Levels are spaced logarithmically above the L4/L5 value
  3 − μ(1 − μ), because the critical values crowd within a few μ^(2/3) of 3
  for small μ; the three critical values (through L1, L2, L3) are always
  drawn, thicker. The field is clamped in a small disc round each body,
  where it is infinite, and the body is drawn over it. Orbits start on the
  circular orbit at the pair's distance at a seeded angle ahead of or behind
  the smaller body (30–55° for a tadpole when μ < 0.002, 44–56° above;
  from 5.2 Hill radii to 23° for a horseshoe, only where that range exists)
  and are integrated with Dormand–Prince 5(4) at tolerance 10⁻¹², stopping
  after one libration, on leaving the frame or near a body. Each orbit is
  classified from its path (tadpole, horseshoe, escape). The seed picks the
  system and palette when they are `auto`, and the orbits' start angles.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic; every L-point marker sits where the
  gradient of Ω vanishes (below 10⁻⁹); the critical levels drawn are the
  exact values of 2Ω at L1, L2 and L3; the Jacobi constant drifts by less
  than 10⁻⁶ along every drawn orbit, so no orbit enters the region its own
  wall forbids (meta `max_jacobi_drift`, `verification:
  jacobi_conserved`); a clamped mass ratio is reported as `requested_mu`;
  everything stays inside the page.

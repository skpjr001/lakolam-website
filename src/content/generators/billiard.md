---
title: "Billiards and Poncelet"
blurb: "Billiard paths in elliptic, stadium, cardioid and polygon tables, Poncelet's closed polygons on a confocal caustic, and coffee-cup reflection caustics"
category: design
version: "1.0.0"
---
One ball on a perfect table: long bouncing paths, closed polygons that
close from anywhere, and the bright curve light draws in a coffee cup.

## What it is

A billiard ball on a frictionless table bounces off the cushion with the
angle of reflection equal to the angle of incidence, forever. That single
rule draws three kinds of page. In an ellipse a long path never fills the
table: it stays tangent to a smaller confocal ellipse (or hyperbola) and
leaves it as a clean hole in the weave. In a stadium — two half-circles
joined by straight sides — the same rule is chaotic and the path wanders
everywhere. Choose the inner ellipse just right and the path closes after
q bounces, and then, by Poncelet's porism, it closes from *every* starting
point: a whole family of polygons sharing one inner ellipse. Finally,
light reflected once by a curved mirror bunches into a bright cusped
curve: the nephroid you see on coffee in a cup, or a cardioid when the
light starts on the rim.

## How to use it

Frame it as a print: the dense weaves and fans read from across a room and
reward a close look. The caption names the figure — the table, the number
of bounces, the porism's rotation number (corners and turns, so 2/7 is a
seven-sided star going round twice), or where the light comes from. On the
line-art version, trace a single polygon or ray in colour to see how the
pattern is built from straight lines; or colour the bands between the
lines of a Poncelet family. Try to spot where the bright caustic curve
sits: nobody drew it, it is where the reflected lines crowd together.

## Purpose

Mathematical-billiards art with honest geometry: every bounce point is
solved exactly against its table's equation, and every Poncelet polygon is
checked to close. A shop-window design for the maths shelf that also
illustrates integrable versus chaotic motion and caustics.

## History

Jean-Victor Poncelet found his closure theorem in 1813 as a prisoner of
war in Saratov, publishing it in his *Traité des propriétés projectives des
figures* (1822); its billiard form — every orbit in an ellipse touches a
confocal caustic — goes back to the focal property of conics known to
Apollonius. G. D. Birkhoff made billiards a model of dynamics in *Dynamical
Systems* (1927); Leonid Bunimovich proved his stadium chaotic (1979).
Reflection caustics were named by Tschirnhaus (1682); Johann Bernoulli
identified the nephroid of the coffee cup (1692). See Serge Tabachnikov,
*Geometry and Billiards* (AMS, 2005), and Dragović & Radnović, *Poncelet
Porisms and Beyond* (2011).

## This implementation

- **Spec knobs:** `table` (auto, ellipse, circle, stadium, cardioid,
  polygon, convex), `mode` (auto, trajectory, poncelet, caustic), `light`
  (auto, parallel, rim, inside — caustic pages only), `lines` (bounces,
  polygons or rays; 0 picks a good number), `period` (corners of a Poncelet
  polygon, 0 = seed), `palette` (auto, jewel, ocean, ember, twilight,
  baize, ink), `line`, `caption`, `width`, `height`, `margin`.
- **Generation:** reflection `v' = v − 2(v·n)n`. Hits are exact: the
  ellipse and circle by the larger root of a quadratic, the stadium by its
  segments and half-circles, polygons by segment intersection; the
  cardioid `(x²+y²−ax)² = a²(x²+y²)` and the seeded smooth convex table
  `r(θ) = 1 + Σ cₖ cos kθ + sₖ sin kθ` (shrunk until its curvature is
  positive) by marching along the chord and bisecting the sign change to
  the last bit. Poncelet: the confocal caustic `x²/(a²−λ) + y²/(b²−λ) = 1`
  for rotation number p/q is found by 64 bisections of λ on the closing
  defect (eccentric-angle turning after q bounces minus 2πp); rotation
  numbers are kept at or below 0.36 (above that the caustic crowds onto the
  foci), stepping p down if a thin ellipse cannot reach it. The family of
  polygons starts spread over one corner gap, 2π/q. Caustics: parallel
  rays enter where their line first crosses the cushion, cross, reflect once
  and run on to the cushion; point sources sit on the rim or inside. A
  table wider than the page is turned upright. Seeded: table, mode,
  ellipse shape, start, rotation number, light, palette.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic per seed; every bounce and mirror point is
  on its table's curve to 1e-9 (meta `max_bounce_off_cushion`); every
  Poncelet polygon closes to 1e-6 from every starting point and each side
  is tangent to the caustic (meta `max_closing_gap`); all ink inside the
  page. A Poncelet page asked for on a non-conic table is served on an
  ellipse with `requested_table`; clamped `lines`, `period` and `line`
  record `requested_<field>`.

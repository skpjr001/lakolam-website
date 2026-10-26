---
title: "Tensegrity Sculptures"
blurb: "Tensegrity sculptures: struts floating in a web of cables, twisted prisms, octahedra and columns form-found to exact equilibrium"
category: design
version: "1.0.0"
---
Wooden struts that float in mid-air, never touching one another, held in
place by nothing but a web of taut cables.

## What it is

A plate of six tensegrity sculptures (or one, filling the page). In a
tensegrity every strut is pushed on by the cables at its two ends, and every
cable pulls; no strut touches another, yet the whole stands firm. The plate
shows twisted prisms of three, four, five and six struts, the expanded
octahedron (six struts in three parallel pairs) and columns of interlocking
twisted stages, each in a different view, with a soft shadow on the floor.
Every one is in exact balance: its shape was calculated, not sketched.

## How to use it

Look for the struts — the thick rods — and check that no two of them meet;
everything they touch is cable. In a prism, look down the axis and notice
that the top ring is turned against the bottom one: only at that one angle
can the cables all be tight. To build a model, cut struts from dowel or
drinking straws (all the same length), tie elastic cord between their ends
following the drawing, and the shape will pull itself into place. The
colour-by-force version shows which struts push hardest and which cables
pull hardest; the black-and-white version can be coloured in.

## Purpose

Tensegrity is a startling idea — compression islands in a sea of tension —
used in sculpture, architecture, deployable masts, robotics and as a model
of the cell's skeleton. The page shows it at its clearest and gives the
exact shapes for anyone building one.

## History

Kenneth Snelson made the first tensegrity sculpture, *X-Piece*, in 1948,
after studying with Buckminster Fuller at Black Mountain College; Fuller
coined "tensegrity" (tensional integrity), and Snelson went on to the
28-metre *Needle Tower* (1968), a column of interlocking twisted stages.
Hugh Kenner's *Geodesic Math and How to Use It* (1976) and Anthony Pugh's
*An Introduction to Tensegrity* (1976) give the geometry of the prisms and
the expanded octahedron. The force density method is due to H.-J. Schek
(1974); its use for tensegrity form-finding to N. Vassart and R. Motro
(1999), and the prism results to G. Tibert and S. Pellegrino, "Review of
form-finding methods for tensegrity structures" (2003).

## This implementation

- **Spec knobs:** `sculpture` (auto, prism3–prism6, octahedron, column);
  `layout` (plate of six, or single); `forces` (colour members by force);
  `shadow`; `caption`; `strut_width` (tube radius as a fraction of strut
  length); `palette` (gallery, steel, bamboo, night, ink, or auto); `page`;
  `margin_mm`.
- **Generation:** prisms: two unit n-gons, the top turned by the analytic
  equilibrium twist π/2 + π/n (150° for three struts) with struts from
  corner i to corner i and vertical cables to the corner before; the
  self-stress is the null vector of the equilibrium matrix (smallest
  eigenvector of AᵀA by Jacobi rotations). Expanded octahedron: force
  density method — cables q = 1, struts q = −s, s raised by bisection until
  the force density matrix first becomes singular (s = 1.5); the triple null
  space gives the coordinates (the symmetric start shape projected onto it,
  then whitened). Columns: two to four interlocking stages of three to five
  struts joined by zig-zag saddle cables; the stage twist is where the
  equilibrium matrix becomes singular with all cables taut, found by a scan
  and golden section and tabulated (the table is re-derived in the tests).
  Drawn with a seeded orbit camera: struts as shaded tubes, cables as thin
  lines in short pieces, all sorted far to near; floor shadows along a
  fixed light.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic; `verification: equilibrium_every_node` —
  at every node of every sculpture the net force is below 10⁻⁶ of the
  largest member force (checked independently by summing member forces by
  hand); every cable is in tension and every strut in compression; every
  node carries exactly one strut; no two struts come within twice the
  thickest drawn tube radius; the prisms stand only at their analytic twist;
  the expanded octahedron's parallel struts are half their length apart.
  All ink lies inside the margins; clamped knobs are reported
  (`requested_<field>`).

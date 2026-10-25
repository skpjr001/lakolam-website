---
title: "Field Lines"
blurb: "Field lines and equipotentials of point charges and bar magnets, or iron filings"
category: design
version: "1.0.0"
---
The invisible made visible: the lines of force round electric charges and bar
magnets, drawn the way a physics textbook draws them.

## What it is

A picture of an electric or magnetic field. Every charge pushes and pulls on
the space around it; a field line follows that push from a positive charge
(or a magnet's north pole) to a negative one (or a south pole), and the
lines crowd together where the field is strong. Dashed equipotentials — the
contour lines of the electric potential — cross every field line at right
angles. Five arrangements: a few equal charges, a dipole, a quadrupole, bar
magnets, and a mixed set of charges of different sizes. Three looks: coloured
lines on a coloured ground, black line art, and iron filings.

## How to use it

Frame the colour pages as prints; they suit a study, a classroom or a lab.
The line-art page is a colouring sheet: field lines and equipotentials cut it
into a mesh of small four-sided cells, and colouring alternate cells, or
shading by distance from a charge, brings the field out. Count the lines
leaving each charge: a charge twice as strong sends out twice as many. The
filings page shows what you see when you sprinkle iron filings on paper over
a magnet: each filing turns to lie along the field, and the heavier dashes
mark where the field is strongest.

## Purpose

Physics made beautiful, and correct enough to teach from: the line counts are
proportional to the charges, lines end only on negative charges, magnets or
the edge of the frame, and the equipotentials are true level curves of the
potential.

## History

Michael Faraday introduced "lines of force" in the 1830s and 1840s to explain
induction, drawing them from iron-filing patterns; James Clerk Maxwell turned
them into mathematics in *On Faraday's Lines of Force* (1855) and the
*Treatise on Electricity and Magnetism* (1873), whose plates of field lines
and equipotentials (drawn by hand from computed potentials) this generator
follows. The equivalence of a uniformly magnetised bar with two sheets of
"magnetic charge" on its pole faces is Poisson's (1824). Reference:
Purcell & Morin, *Electricity and Magnetism*, 3rd ed., ch. 2.

## This implementation

- **Spec knobs:** `width`, `height` (points); `arrangement` (`auto`,
  `charges`, `dipole`, `quadrupole`, `magnets`, `mixed`); `lines` (from the
  strongest source, 4–72); `equipotentials` (0–40); `arrows`; `style`
  (`colour`, `lines`, `filings`); `palette` (`auto`, `midnight`, `paper`,
  `blueprint`, `ember`, `lagoon`); `stroke`.
- **Generation:** the field is Coulomb's law in the plane of the charges,
  `E = Σ qᵢ (x − xᵢ)/|x − xᵢ|³`; magnets are twelve ± point charges on each
  pole face. A charge of size `q` emits `round(N·q/q_max)` lines at equal
  angles with a seeded phase, traced by fixed-step RK4 along the unit field
  until they enter a negative charge's disc (finished at its centre), a
  magnet's body, or leave the frame. When the net charge is negative the
  missing flux enters from the edge: each negative charge is traced
  backwards and lines reaching the frame are kept. Magnet lines start evenly
  spaced round the north end. Equipotentials are marching-squares contours of
  `V = Σ qᵢ/|x − xᵢ|` at levels evenly spaced in `sign(V)·ln(1 + |V|/c)`.
  Filings are Poisson-disc dashes along the field, five weights by
  `log |E|`.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic per seed; every drawn field line runs from a
  positive charge, a north pole or the frame edge to a negative charge, a
  magnet or the frame edge (tested); each charge's line quota is
  `round(N·q/q_max)` (`verification: line_counts_proportional_to_charge`,
  tested); all ink within the page. Clamped knobs are reported as
  `requested_<field>`; the line-art style reports its colourability check.

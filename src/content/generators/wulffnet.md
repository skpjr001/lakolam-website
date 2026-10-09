---
title: "Wulff Net"
blurb: "Stereonet — Wulff equal-angle or Schmidt equal-area net at 2°, 5° or 10° intervals, at an exact diameter"
category: paper
version: "1.0.0"
---
A stereonet for crystallography and structural geology — the equal-angle
Wulff net or the equal-area Schmidt net, at an exact printed diameter.

## What it is

A stereonet shows directions in space — the orientation of a crystal face, a
rock layer or a fault — as points and curves on a circle. It is a grid of
lines of longitude and latitude on a hemisphere, seen from above and
flattened onto the page, with the grid's poles at the top and bottom of the
circle:

- **Great circles** (the meridians) run from pole to pole; each is a plane
  through the centre of the sphere, tilted at a different angle.
- **Small circles** (the parallels) cross them; each is a cone of directions
  at a fixed angle from the poles.
- **The primitive circle** is the rim: horizontal directions.

The **Wulff net** uses the stereographic projection, which keeps angles true
and draws every great and small circle as a circular arc. The **Schmidt
net** uses Lambert's equal-area projection, which keeps areas true, so
equal patches of the sphere cover equal areas of the page — the one to use
when counting how densely measurements cluster. Lines come every 2°, 5° or
10°; with 2° and 5° every 10° line is heavier, and the finer great circles
stop at the 80° small circles so the poles do not fill in solid. A degree
scale round the rim is numbered clockwise from north.

## How to use it

Print at actual size and check the diameter with a ruler. Pin a sheet of
tracing paper over the net through the centre so it can turn, and mark
north on it. To plot a plane with a given strike and dip, turn the tracing
until the strike lies on the north–south line, count the dip in from the rim
along the east–west line, and trace the great circle there; turn back to
read it. To plot a line, count its plunge in from the rim along the
east–west line. Angles between two directions are measured by turning both
onto the same great circle and counting the small-circle steps between them.

Use the Wulff net when angles matter (crystal faces, interfacial angles);
use the Schmidt net when you will contour or count clusters of
measurements.

## Purpose

Crystallography and mineralogy courses (plotting crystal faces and
symmetry), structural geology field and lab work (bedding, joints, faults,
fold axes), rock mechanics and slope stability, and materials science
texture analysis. Students need a printed net at the size their course uses;
150 mm is common.

## History

The stereographic projection is ancient — it was known to Hipparchus and
Ptolemy and used for astrolabes. The Russian crystallographer Georg (Yuri)
Wulff published the stereographic net that bears his name in 1902, for
plotting crystal faces. Johann Heinrich Lambert described the azimuthal
equal-area projection in 1772, and the Austrian geologist Walter Schmidt
brought an equal-area net into structural geology for the statistical study
of rock fabrics, which is why geologists call it the Schmidt net.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape`; `margin_mm` (0–30, default 10); `projection` (wulff,
  schmidt); `interval` (deg2, deg5, deg10); `diameter_mm` (50–400, default
  150; held to what fits the page, and the request recorded); `labels` (the
  degree scale round the rim); `ink` (named paper colours, default gray;
  blue and charcoal match the usual alternatives); `weight` in points
  (0.1–2).
- **Generation:** on the unit sphere (x east, y north, z up) the great circle
  of dip δ is (±cos δ cos φ, sin φ, −sin δ cos φ) and the small circle β from
  the pole is (sin β cos λ, ±cos β, −sin β sin λ). The Wulff net projects
  R(x, y)/(1 − z): its great circle of dip δ is the circle centred R tan δ
  from the centre with radius R sec δ, its small circle β is centred R sec β
  away with radius R tan β, and both are drawn as exact arcs. The Schmidt net
  projects R(x, y)/√(1 − z) — a direction θ from the centre lands at
  √2 R sin(θ/2) — and its curves are drawn as polylines through points
  projected every half degree. The 90° lines are the two straight diameters.
- **Solving:** nothing to solve — a net to plot on. The seed is unused:
  every seed gives the same sheet.
- **Guarantees:** the diameter is exactly what was asked when it fits; the
  closed-form centres and radii agree with the projection formula at every
  sampled point, and small circles meet the primitive at right angles
  (checked to 1e-9 of the radius); full great circles pass through both
  poles; the shortened ones end exactly on the 80° small circle; Schmidt cells
  of equal solid angle have equal area on the page (to 0.1 %); all ink, scale
  and stroke widths included, stays inside the margins on every page size,
  orientation, projection and interval. A knob outside its range is clamped
  and recorded as `requested_<field>` in the meta.

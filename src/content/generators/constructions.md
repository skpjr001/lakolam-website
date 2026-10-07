---
title: "Constructions and Loci"
blurb: "Constructions and loci — ruler-and-compasses tasks at true size, with every construction arc drawn in the key and checked geometrically"
category: maths
version: "1.0.0"
---
Bisect, construct and shade with a ruler and compasses — at true size.

## What it is

A worksheet of two to six construction tasks printed at true size, so one
centimetre on the page is one centimetre on a ruler (a 5 cm bar under the
title checks the printer kept the size). Tasks include bisecting a segment
or an angle, dropping a perpendicular from a point to a line, constructing
angles of 60°, 90°, 30° and 45° without a protractor, constructing
triangles from three sides, two sides and the angle between, or a side and
two angles, and shading loci in a garden: near a point, near a fence,
closer to one point than another, closer to one wall than another. Most
tasks finish with something to measure, or a point X to test against the
shaded region, so the work can be marked. The answer key draws every
construction arc and line in red and hatches each locus.

## How to use it

Print at 100% and check the 5 cm bar. Use a sharp pencil, a ruler and
compasses, and leave your construction arcs showing.

- **Perpendicular bisector of AB:** open the compasses to more than half of
  AB. Draw arcs above and below AB from A, then from B with the same
  setting. Join the two crossing points.
- **Bisector of an angle at B:** draw an arc from B cutting both arms. From
  each of those two points draw arcs (same setting) that cross; join B to
  the crossing.
- **Perpendicular from P to a line:** from P draw an arc cutting the line
  twice; from those two points draw arcs that cross on the other side; join
  P to the crossing.
- **Perpendicular at P on a line:** draw arcs from P cutting the line on
  both sides; from those points draw arcs (wider) that cross; join to P.
- **60°:** draw an arc from A cutting the line; with the same setting, from
  where it cuts, draw an arc crossing the first. Join A to the crossing.
  **30°** is half of 60°, and **45°** half of 90°: bisect them.
- **Triangle from three sides:** draw arcs from A and from B with the two
  given lengths; where they cross is C.
- **Triangle from two sides and an angle, or a side and two angles:**
  construct each angle at the end of the base, measure along the arm, and
  join up.
- **Loci:** points within a distance of a point lie inside a circle; within
  a distance of a fence, inside a "running track" shape round it; closer to
  A than to B, on A's side of the perpendicular bisector of AB; closer to
  one wall than another, on that side of the bisector of the corner's angle.
  Shade where every condition holds, inside the garden.
- Lengths are marked right to 0.1 cm, angles to 2°.

## Purpose

Constructions and loci are part of GCSE mathematics in England, Common Core
geometry in the US (G-CO.12: copying segments and angles, bisectors,
perpendiculars) and India's NCERT class 6 ("Playing with Constructions")
and class 9-10 books. They teach the properties behind the steps — why the
crossing points of equal arcs lie on the perpendicular bisector — as much
as accurate drawing.

## History

Construction with straightedge and compass is the method of Euclid's
*Elements* (about 300 BCE): Book I opens by constructing an equilateral
triangle on a segment (I.1), and soon bisects an angle (I.9) and a segment
(I.10) and draws perpendiculars (I.11-12). Loci — sets of points that obey
a condition — were studied by Apollonius and remain the language of
geometry exams.

## This implementation

- **Spec knobs:** `difficulty`; `topic` (`mixed`, `bisectors`,
  `triangles`, `loci`); `locale` ("a compass" or "compasses"); `count`
  (2-6; if fewer fit at true size on a small page, fewer are printed and
  meta records `requested_count`; on a page too small for even one task at
  true size, everything — the check bar too — is drawn to a smaller scale,
  the page says so, and meta records `true_size: false` and the `scale`);
  page `width`, `height` (at least 0.4 × the width, since the margins grow
  with it) and `line` (clamped, reported as `requested_*`).
- **Generation:** the page is laid out first, so every task knows its
  drawing room; lengths (whole millimetres) and angles are drawn at random
  to fit, and each figure is turned by up to 20°. Levels: Easy bisects a
  segment or an angle and builds an equilateral triangle, with loci near a
  point; Medium perpendiculars from and at a point, triangles from three
  sides, and one-condition loci; Hard 60° and 90° angles, triangles from two
  sides and a 60° angle, and two-condition loci; Expert 30° and 45° angles,
  triangles from two sides and a 30° angle or from two constructed angles,
  and three-condition loci. Kids is served as Easy. Triangles whose
  measured answer sits near a rounding boundary (within 0.3 mm or 0.3°) are
  rejected so the answer is clear-cut; point X in a locus task is at least
  3 mm from every boundary.
- **Solving:** each construction is computed exactly from the given figure
  by intersecting circles, as a pupil would, and the measured answer is
  read from the constructed points. Locus regions are hatched by sampling
  lines at 45° every 2.5 mm and refining each edge by bisection.
- **Guarantees:** `answers_checked` with the guarantee
  `constructions_verified_geometrically`: from the coordinates alone, the
  perpendicular bisector's points are equidistant from A and B and the line
  is perpendicular; bisected angles are equal halves; perpendiculars meet
  the line at 90°; constructed angles measure what they should; triangles
  have their given sides and angles; every hatch line lies inside every
  condition; and each answer equals the measured value. Tests recheck the
  answers by the law of cosines and the sine rule, sample each locus region
  for full shading, confirm the 5 cm bar is 5 × 72 / 2.54 pt long, and that
  every drawing fits its slot at true size. Rated by construction type and
  the number of locus conditions
  (`rating_basis: construction_kind_and_locus_conditions`).

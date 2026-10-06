---
title: "Circles"
blurb: "Circles worksheet — parts of a circle, circumference, area, semicircles and sectors, in terms of pi or rounded"
category: maths
version: "1.0.0"
---
Name the parts of a circle, then find circumferences, areas, arcs and
sectors — exactly in terms of pi, or rounded with no doubt about the last
digit.

## What it is

A worksheet of four to eight questions about circles. A parts question
draws a large circle with lettered features — the centre, a radius, a
diameter, a chord, a tangent, an arc, a shaded sector, a shaded segment and
the circumference — to be named on the lines beside it. The other questions
give a radius or a diameter, drawn and labelled on the circle, and ask for
the circumference or the area; harder pages work backwards from a
circumference or area to the radius, and measure semicircles, quarter
circles and sectors. The answer key gives every answer with its units.

## How to play

- **Parts:** the radius runs from the centre to the edge; the diameter goes
  right across through the centre and is two radii long; a chord joins two
  points on the circle without passing through the centre; a tangent
  touches the circle at just one point; an arc is a piece of the
  circumference (the distance round the edge); a sector is a slice cut by
  two radii, like a slice of pizza; a segment is the piece cut off by a
  chord.
- **Circumference:** C = 2 x pi x r, or pi x d. A radius of 5 cm gives
  10 pi cm.
- **Area:** A = pi x r squared. Halve a diameter to get the radius first: a
  diameter of 8 cm means r = 4, so the area is 16 pi square centimetres.
- **In terms of pi:** leave pi as a letter in the answer, like 12 pi.
  **Rounded:** use the pi key on a calculator, then round to one decimal
  place (the nearest tenth).
- **Working backwards:** if the circumference is 14 pi, then 2r = 14 and
  r = 7. If the area is 36 pi, then r squared = 36 and r = 6.
- **Semicircles and quarter circles:** the curved edge is a half or a
  quarter of the whole circumference; the perimeter also includes the
  straight edges (the diameter for a semicircle, two radii for a quarter
  circle). The area is a half or a quarter of the whole circle's area.
- **Sectors:** a sector with angle 60 degrees is 60/360 = 1/6 of the circle,
  so its arc is 1/6 of the circumference and its area 1/6 of the area. Its
  perimeter is the arc plus two radii.

## Purpose

Circle measurement is a core topic of grade 7 geometry (Common Core
7.G.B.4), KS3 and GCSE mathematics and CBSE class 7–10. The vocabulary of
the parts comes first; the formulas then build from whole circles to
fractions of circles, from answers left in terms of pi (which keep the
working exact and show the structure) to rounded answers (which need a
calculator and a careful rounding), and from forward to reverse problems,
where the formula has to be rearranged.

## History

Archimedes (3rd century BC), in *Measurement of a Circle*, proved that a
circle's area equals that of a right triangle whose legs are its radius and
its circumference, and trapped pi between 3 10/71 and 3 1/7 using polygons
of 96 sides. In China, Liu Hui (3rd century AD) refined the polygon method,
and Zu Chongzhi (5th century) found pi between 3.1415926 and 3.1415927 and
the fraction 355/113, unbeaten for nearly a thousand years. The symbol pi
was first used for the ratio by William Jones in 1706 and became standard
after Leonhard Euler adopted it in the 1730s and 1740s.

## This implementation

- **Spec knobs:** `difficulty`; `mode` (`mixed`, `parts`, `circumference`,
  `area`, `reverse`, `composite` — semicircles and quarter circles —
  `sectors`); `answers` (`auto`, `in_terms_of_pi`, `rounded`; `auto` is in
  terms of pi at Kids, Easy and Expert and rounded at Medium and Hard);
  `locale` (`us`: inches, "center", "nearest tenth"; `uk` and `in`:
  centimetres, "1 decimal place"); `count` (4–8); `width`, `height`,
  `line`.
- **Generation:** Kids names four basic parts and uses whole-number radii
  2–10; Easy adds diameters (even ones) and five parts; Medium uses lengths
  up to 20 with six parts from all nine; Hard mixes circumference and area
  with semicircles, quarter circles and reverse questions; Expert is sectors
  (angles such as 30, 45, 72, 120, 210 degrees: arc length, area,
  perimeter), reverse questions and composite shapes. Parts are placed by
  rejection so no two features' arcs of the circle overlap, letters are
  shuffled, and the centre's letter goes where no line leaves the centre.
  Every diagram is drawn to scale; arcs are polylines whose vertices lie
  exactly on the circle. No question repeats on a page.
- **Solving:** every answer is a + k pi with a and k exact fractions. In
  terms of pi, k is printed as a whole number or a stacked fraction with a
  drawn pi (the stroke font has none). Rounded answers are decided with
  integer arithmetic on both ends of the bracket
  3.14159265358979 < pi < 3.14159265358980: both ends must round to the
  same tenth (and an exact value must not be a tie), or the question is
  rejected — so no printed rounding depends on floating point or sits on a
  boundary. Reverse answers are whole radii.
- **Guarantees:** `answers_checked` in meta. The tests re-derive every
  answer from the printed question text alone (its numbers and words) with
  the textbook formulas and read the printed answer back; check every
  rounding again under an independent, looser bracket on pi; check that each
  diagram prints the given length (and a sector its angle, with the drawn
  wedge spanning exactly that angle); and read every parts diagram back from
  its drawn paths: the radius runs from the centre to the circle, the
  diameter's midpoint is the centre, a chord's ends lie on the circle and it
  misses the centre, the tangent's closest point to the centre lies on the
  circle, an arc lies on the circle, a sector is a filled wedge from the
  centre and a segment a filled region bounded by the circle and a chord.
  Every printed string is checked against the stroke font, and nothing is
  drawn off the page. Meta lists each question and its answer in plain
  text.

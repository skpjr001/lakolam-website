---
title: "Point–Line Configurations"
blurb: "Point-line configurations — Fano, Pappus, Desargues, Mobius-Kantor, Reye, Pascal and astral (2m)4 — as stained-glass line arrangements"
category: design
version: "1.0.0"
---
Points and lines in perfect balance — Pappus, Desargues, Fano, Reye and
Grünbaum's astral stars — drawn as stained-glass windows.

## What it is

A configuration is a set of points and a set of lines in which every line
passes through the same number of the points and every point lies on the
same number of the lines. Pappus's has nine points and nine lines, three on
each; Desargues's ten and ten; Reye's twelve points on four lines each and
sixteen lines through three points each. The astral configurations have
twenty-four, thirty-six or forty-eight points, four on every line and four
lines through every point, arranged with the symmetry of a star.

Every line is extended to the edge of the page, so the lines cut the page
into many small pieces. The stained-glass style fills those pieces in jewel
colours with dark leading; the other styles give a two-colour checkerboard,
a classical geometry diagram with lettered points, or black line art.

## How to use it

As a print, look for the points (the small white discs): each one is a
crossing where exactly the promised number of lines meet, while every other
crossing is just two lines passing. On a Pappus page, the three points in the
middle always fall on one line, however the six outer points are placed —
that is Pappus's theorem; on a Desargues page the three crossings of
matching sides of the two triangles line up the same way. As a colouring
page (line art), colour the pieces like a window: any two pieces that share
an edge can take different colours using just two colours in all.

## Purpose

To show some of the most beautiful facts of projective geometry exactly:
each picture is constructed, not drawn by eye, so every promised meeting of
lines really happens, and the astral stars are true configurations.

## History

Pappus of Alexandria stated his hexagon theorem around 340 AD; Girard
Desargues published the theorem on perspective triangles in 1648; Blaise
Pascal found his hexagram on a conic in 1639–40, and Jakob Steiner (1832)
and Thomas Kirkman (1849) found that its Pascal lines meet three at a time.
Theodor Reye introduced configurations as a subject (*Geometrie der Lage*,
1876); Gino Fano described his seven-point plane in 1892; A. F. Möbius
(1828) and S. Kantor (1882) studied the 8₃. Branko Grünbaum's *Configurations
of Points and Lines* (AMS, 2009) is the modern reference, including the
astral 4-configurations studied with Leah Berman.

## This implementation

- **Spec knobs:** `width`, `height` (points); `configuration` (`astral` by
  default, `auto`, `fano`, `pappus`, `desargues`, `mobius_kantor`, `reye`,
  `pascal`); `style` (`stained`, `checker`, `diagram`, `lines`); `palette`
  (`auto`, `cathedral`, `sea`, `autumn`, `pastel`, `ink`); `labels` (letter
  or number every point); `points` (size of the point marks, 0 hides them);
  `stroke`; `caption`.
- **Generation:** free points are seeded and the rest constructed by joining
  and meeting: Fano from a triangle, its midpoints and centroid, with the
  Steiner inellipse through the midpoints as the seventh line; Pappus from
  three points on each of two lines; Desargues from two triangles in
  perspective; Möbius–Kantor by placing seven of its eight lines straight
  (the real plane cannot hold all eight) and drawing the eighth as the
  circle through its points; Reye as a cube in three-point perspective with
  its centre and three vanishing points; Pascal as six points on an ellipse
  and the three hexagons whose Pascal lines meet in one point (found among
  all sixty); astral as two orbits of `m` points and two families of chords,
  from a table of 26 parameter sets (`m` = 12, 18, 24) found by an
  exhaustive search. The best of up to 80 seeded layouts is kept (clearest
  gaps between points and lines, spread over the page). Lines are extended
  to the frame, chained through the configuration's own points, and the
  faces of the arrangement are coloured by crossing parity and by distance
  from the centre.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic per seed. Every recorded incidence holds to
  10⁻⁹ of the drawing's size and no point lies within 10⁻⁶ of a line it is
  not on (tested for every configuration over several seeds, and for all 26
  astral entries); the counts are right — Fano, Pappus, Desargues and
  Möbius–Kantor 3 points per line and 3 lines per point, Reye (12₄, 16₃),
  astral (2m)₄ (tested); Pascal's three lines meet in a point that is not a
  Pascal point (tested); the faces are properly 2-coloured (tested).
  `verification` and `max_incidence_error` in meta; clamped knobs are
  reported as `requested_<field>`.

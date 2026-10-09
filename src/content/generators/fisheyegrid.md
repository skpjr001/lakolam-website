---
title: "Fisheye Grid"
blurb: "Curvilinear perspective grid — four- and five-point fisheye arcs or a six-point equirectangular sphere"
category: paper
version: "1.0.0"
---
Curvilinear perspective grids — four-point and five-point fisheye circles
and a six-point panorama, every line an exact curve through its vanishing
points.

## What it is

In ordinary perspective straight edges stay straight, which only works for
a narrow view. Curvilinear perspective draws a whole wide view at once, and
straight edges that run across it bend, the way they do in a fisheye lens
or a reflection in a ball. Every set of parallel edges heads for two
opposite vanishing points:

- **Four-point:** a circle showing everything in front of you, half the
  world. Edges running left and right curve through the vanishing points at
  the left and right of the circle; upright edges curve through the ones at
  the top and bottom.
- **Five-point (fisheye):** the same circle with a fifth vanishing point in
  the middle, where edges running straight away from you meet as straight
  lines.
- **Six-point:** the whole sphere around you unrolled into a long
  rectangle twice as wide as it is tall, as in a 360 degree panorama: four
  vanishing points spaced along the horizon (front, right, back, left — the
  back one appears at both ends), one along the top edge straight above and
  one along the bottom edge straight below.

The grid lines are spaced at equal angles of view — every 10 degrees by
default — so the squares grow toward the middle of the view just as they
appear to.

## How to use it

Print at actual size and draw over the grid in pencil, or slide the sheet
under thin paper as a guide. Pick an edge in your scene, decide which way
it runs (across, upright or away from you), and follow the grid curve of
that family that passes nearest; draw the edge along it. A box, a room or a
street becomes a set of curved edges, all heading for the dots.

Start with the five-point circle: put the viewer's eye at the centre, draw
the floor and ceiling along the across curves above and below the horizon,
and run the corners of the room straight out from the centre. Use the box
version to keep drawing past the circle's rim, and the six-point panorama
to draw everything around you at once, so the left end joins the right.

## Purpose

For artists, illustrators and comic artists drawing dramatic wide-angle and
fisheye views: interiors, streets seen from below, superhero leaps, and
360 degree panoramas that can be wrapped into a sphere or viewed in a
virtual-reality viewer. It is also a good way to see how a camera lens
bends the world. In a book, these pages make a perspective sketchbook.

## History

Painters had long noticed that wide views bend: Jean Fouquet painted
curved perspectives in the 15th century, and M. C. Escher built prints
such as *Up and Down* and *House of Stairs* on curved lines. The method was
written down by the artist Albert Flocon and the art historian André Barre
in *La Perspective curviligne* (1968), whose systems put the vanishing
points on a circle and draw straight lines as curves through them. The
American artist Dick Termes, who paints the whole view from a point onto
spheres ("Termespheres"), taught the six-point method that unrolls the
sphere into a rectangle.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape`; `margin_mm` (0–30, default 10); `mode` (four_point,
  five_point — the default — six_point); `frame` (circle, or box to run the
  four- and five-point curves on past the rim; ignored by six-point);
  `step_deg` (2–45, default 10: the angle of view between neighbouring
  lines, also between the five-point rays); `horizon` (horizon and upright
  axis heavier); `vanishing_points` (dots); `ink` (default gray) and
  `weight` (0.1–2 pt, default 0.3; rim, axes and frame twice that).
- **Generation:** the four- and five-point grids use the stereographic
  projection of the sphere of view, the one map in which every straight
  line of the scene becomes an exact circle. The 180 degree view fills a
  circle of radius R; the edges running across at angle a form the circle
  through the left and right vanishing points that crosses the upright axis
  at R·tan(a/2) — likewise for upright edges — and edges running away from
  the viewer are straight rays from the centre at equal azimuths. In the
  circle frame each arc runs from one vanishing point to the other; in the
  box frame each is the full circle cut to the box (its part outside the
  rim is the view behind). Arcs are drawn as true circular arcs. The
  six-point grid is the equirectangular projection (longitude across,
  latitude up, at a 2:1 ratio): meridians are straight, and the two
  horizontal families are tan(lat) = tan(a)·cos(lon) and
  tan(lat) = tan(a)·sin(lon), drawn through points every half degree of
  longitude.
- **Solving:** nothing to solve — a page to draw on. The seed is unused:
  every seed gives the same sheet.
- **Guarantees:** every across arc passes through the left and right
  vanishing points and every upright arc through the top and bottom ones,
  each crossing its axis at R·tan(a/2) (to 1e-6); every ray passes through
  the centre; every six-point vertex satisfies its equation (to 1e-6) and
  each curve passes through its vanishing points; and all ink stays inside
  the margins on every page size, orientation, mode and frame. A knob
  outside its range is clamped and recorded as `requested_<field>`.

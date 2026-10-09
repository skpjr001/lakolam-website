---
title: "Perspective Grid"
blurb: "Perspective grid — one-, two- or three-point vanishing points with rays, horizon and vertical guides"
category: paper
version: "1.0.0"
---
Guide paper for drawing in perspective — one, two or three vanishing points
with rays, a horizon line and vertical guides.

## What it is

In a perspective drawing, parallel lines that run away from you meet at a
point on the horizon — the vanishing point. A perspective grid prints those
guide lines for you, light enough to draw over:

- **One-point** — a single vanishing point on the horizon, rays all the way
  round it, and vertical guides. For roads, railways, corridors and rooms
  seen face on.
- **Two-point** — two vanishing points on the horizon, for buildings,
  furniture and boxes seen corner on, plus vertical guides for their upright
  edges.
- **Three-point** — two on the horizon and a third for the verticals, below
  the page for a bird's-eye view (horizon high) or above it for a worm's-eye
  view (horizon low).

The outer vanishing points sit a tenth of the page in from the edges
(dramatic), on the edges (the usual printed grid) or off the page about 1.7
page widths apart (gentle and undistorted). A point off the page still sends
its rays across the sheet.

## How to use it

Print the sheet and draw over it in pencil or ink; light grey or blue lines
fade into the background, or can be traced through onto a fresh sheet.
Draw a box by choosing its nearest vertical edge on a guide line, then run
its top and bottom edges back along rays to the vanishing points; close it
with more verticals. Things above the horizon line show their undersides,
things below it show their tops.

If boxes near the sides of the page look stretched, choose vanishing points
further apart: keeping them wide keeps everything within a comfortable cone
of vision.

## Purpose

Learning and practising perspective in art classes, comics and storyboards,
architectural and interior sketches, product design and concept art. A
sketchbook section of perspective grids is a standard drawing-practice
resource.

## History

Linear perspective was worked out in Renaissance Florence: Filippo
Brunelleschi demonstrated it with his painted views of the Baptistery around
1415, and Leon Battista Alberti set out the method of a single vanishing
point in his treatise On Painting in 1435. Two- and three-point
constructions followed as artists and architects drew buildings at an angle
and from above or below, and printed perspective grids became a staple of
drawing courses and drafting supplies.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape`; `margin_mm` (0–30, default 10); `mode` (one_point, two_point,
  three_point); `rays` per vanishing point (4–72, default 24); `horizon`
  (draw the line); `horizon_height` (0.1–0.9 of the printed area from the
  top, default 0.4); `spread` (inside, edges, wide — two- and three-point
  only); `verticals` (0–60 evenly spaced guides, one- and two-point);
  `ink` (named paper colours, default light_gray; light_blue, medium_gray and
  tan are the usual alternatives); `weight` in points (0.1–2; the horizon is
  twice as heavy).
- **Generation:** a vanishing point well inside the page sends its rays at
  equal angles all the way round, starting along the horizon; one at or
  beyond an edge spreads its rays at equal angles across the angle the
  printed area subtends from it, so every ray lands on the page. Rays are
  cut to the printed area (Liang–Barsky clipping). The wide spread puts the
  points 1.7 widths apart — the usual rule of thumb for keeping a 60° cone of
  vision on the sheet. The third point sits below the page when the horizon
  is in the upper half, above it otherwise. Vanishing points on the page get
  a dot.
- **Solving:** nothing to solve — a page to draw on. The seed is unused:
  every seed gives the same sheet.
- **Guarantees:** every ray lies on a line through its vanishing point and
  inside the printed area, each vanishing point has its full count of rays,
  the horizon points sit on the horizon, and the verticals are evenly spaced
  (checked on every page size, orientation, mode and spread); all ink,
  stroke widths and dots included, stays inside the margins. A knob outside
  its range is clamped and recorded as `requested_<field>` in the meta.

---
title: "Low-Poly Art"
blurb: "Low-poly art — mountains, sunsets, gems and gradients rebuilt from flat Delaunay triangles, every triangulation checked"
category: design
version: "1.0.0"
---
A picture rebuilt from flat triangles: mountains, a sunset, a gem or a
sweep of colour, faceted like folded paper.

## What it is

Low-poly art breaks a picture into triangles, each filled with one flat
colour. Here the triangles come from points scattered across the page —
packed closely where the picture changes (a ridge line, the horizon, the
rim of the sun, the edge of a gem) and spread out in open sky — and joined
in the one way that keeps every triangle as fat as possible. Each triangle
takes the colour of the picture at its centre, nudged a little lighter or
darker, so neighbouring facets catch the light differently.

It comes as seamless colour, as colour with white lines between the
triangles, or as a colouring page of outlined triangles.

## How to use it

- Print the colour versions as posters, phone or desktop backgrounds,
  journal covers or digital paper; the outlined version looks like a
  stained-glass window.
- Colour the outline version: every triangle is big enough to colour
  (at least 40 square millimetres). A heavier line outlines the
  picture — the sky, the sun, each mountain or facet — and the triangles
  are smaller along its edges, so pick a colour family
  for each part (sky, each mountain, the sun) and shade the triangles
  within it, a little lighter or darker each.
- Try a mosaic: shade each triangle with one pencil, pressing harder or
  lighter, for a faceted greyscale picture.

## Purpose

Low-poly is a popular modern look for wall art and backgrounds, and a
calm, satisfying colouring page: no tiny regions, clear straight edges,
and a picture that appears as the triangles fill.

## History

Low-poly began as a necessity: early real-time 3D graphics of the 1990s
had to draw scenes from very few polygons. In the 2010s artists and
designers took up the faceted look on purpose, in illustration, posters
and games. The triangulation behind it is Boris Delaunay's (1934): of all
the ways to join a set of points into triangles, his is the one where no
point lies inside the circle through any triangle's corners, which keeps
the triangles from being needlessly thin.

## This implementation

- **Spec knobs:** `width`, `height`, `margin` (white border); `picture`
  (`mountains`, `sunset`, `crystal`, `gradient`); `palette` (`dusk`,
  `forest`, `ocean`, `ember`; not used by colouring); `style` (`colour`,
  `outlined`, `colouring`); `detail` (how many triangles); `focus` (how
  much smaller the triangles get along the picture's edges); `line`
  (line weight; not used by seamless colour). Out-of-range values are
  clamped and reported as `requested_*`.
- **Generation:** the seed draws the picture — three midpoint-displaced
  mountain ridges and a low sun; a half-set sun with its road on the sea;
  a gem of six to nine seeded vertices with facets round a seeded point;
  or a gradient in a seeded direction crossed by two waves. Points are
  placed by variable-radius Poisson-disc sampling (Bridson's dart
  throwing): the spacing grows smoothly with distance from the picture's
  nearest edge, from the base spacing up to five times it at `focus` 1,
  and the base spacing scales with the page so the triangle count does
  not depend on the page size. The four corners and points along each
  side are placed first, exactly on the frame. Bowyer–Watson insertion
  builds the Delaunay triangulation of the frame; a point on a side
  splits the hull edge it lies on. A triangle under the size floor loses
  one of its vertices (never a corner or a side's last point) and the
  points are triangulated again. Each triangle is filled with the
  picture's colour at its centroid, shifted by a seeded ±6%; the colouring
  page draws the edges between triangles in different parts of the
  picture in a heavier line.
- **Solving:** nothing to solve — a design.
- **Guarantees:** every page passes `delaunay_checked`: every triangle is
  positively turned and at least the size floor (40 mm² for colouring);
  every edge inside the frame is shared by exactly two triangles in
  opposite directions and every other edge lies on the frame; the areas
  sum to the frame's area; every point is used; and no point lies inside
  any triangle's circumcircle. Meta reports the triangle and point
  counts, the smallest triangle and the smallest angle. Tests re-check
  the empty-circumcircle property against every point without the grid,
  re-sum the drawn triangles' areas, check Euler's count (2n − h − 2
  triangles for n points, h on the frame), check the points keep their
  spacing, and show the checker rejects a flipped edge, a hole, an
  overlap and a turned triangle. The colouring style reports `colourable`
  from the colouring check.

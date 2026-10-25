---
title: "Sculpture Lines"
blurb: "A raymarched abstract sculpture of melted spheres, tori, boxes and capsules, drawn as visible slice contours, silhouettes and light bands"
category: design
version: "1.0.0"
---
An imaginary sculpture of melted spheres, rings, blocks and rods on a
plinth, drawn in contour slices like a sculptor's study.

## What it is

Each page invents a small abstract sculpture: three to eight simple
solids — balls, rings, rounded blocks and rods — pressed together so that
they flow into one another like soft clay, sometimes riddled with
tunnels, standing on a round stone plinth. It is then drawn the way an
artist might study a carving: cut through by evenly spaced parallel
planes, like the contour lines of a map or the layers of a 3D print, with
only the parts of each cut you could really see drawn, a firm outline
round the form, and flat bands of light and shadow, or hatching, to model
it.

## How to use it

A print for a studio, a study or an art classroom, or a reference for
drawing practice. Follow one contour line round the form: it shows the
shape of a single slice, and the spacing between neighbouring lines shows
how steeply the surface turns. Where the lines crowd together the surface
is turning away from you. The black-and-white version with hatching is a
pen-and-ink study: copy it, or shade over it.

## Purpose

A design-lane page from computer graphics: shapes defined by distance
functions, rendered by sphere tracing, then turned back into clean
vector line art with exact hidden-line removal.

## History

Distance-function modelling and sphere tracing were described by John C.
Hart ("Sphere Tracing", The Visual Computer, 1996); the smooth minimum
that melts shapes together was popularised by Iñigo Quilez's articles
and the demoscene in the 2000s. The gyroid was discovered by Alan Schoen
in 1970. Drawing a form by its parallel sections goes back to
Renaissance perspective studies and to the cross-sections of
19th-century naval architecture; sculptors such as Naum Gabo and Henry
Moore built and drew forms from stacked contours.

## This implementation

- **Spec knobs:** `pieces` (3–8 primitives), `blend` (0–1, how softly
  they melt), `carving` (gyroid tunnels), `plinth`, `slices` (auto,
  horizontal, vertical, tilted), `slice_count` (4–90), `hatching`,
  `silhouette`, `palette` (auto, clay, marble, night, lagoon, ink), `line`,
  `width`, `height`, `margin`.
- **Generation:** primitives are placed by a seeded random walk upwards
  from the base (spheres, tori, rounded boxes and capsules with seeded
  sizes and turns), fused by a polynomial smooth minimum, optionally
  carved where the gyroid `sin x cos y + sin y cos z + sin z cos x` rises
  above a seeded level, and stood on the plinth. A seeded perspective
  camera is fitted to the solid. One ray per pixel (300 on the long side)
  is sphere-traced, at most 80 steps, into a buffer of view depth,
  material, facing and Lambert light with a soft shadow. Each slicing
  plane is sampled on a 120-cell grid and traced by marching squares;
  every contour point is pulled onto the surface by Newton steps inside
  its plane and kept only where the buffer shows it unoccluded (depth
  within a bias plus the local depth slope). The outline is the level
  line of the facing value just inside grazing; colour pages fill the
  light in four bands on the sculpture and two on the plinth, and
  hatching adds one, two or three directions of lines as the light falls.
  Buffer contours are smoothed by corner cutting.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic per seed (every transcendental through
  the deterministic maths layer); every drawn slice point lies on the
  surface (|f| below a tiny tolerance) and passes the depth-buffer
  visibility test; the far side of the sculpture is hidden; a default page
  traces in well under a second; all ink inside the page; clamped
  `pieces`, `blend`, `slice_count` and `line` record `requested_<field>`.

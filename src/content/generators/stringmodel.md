---
title: "String Models"
blurb: "Olivier's 19th-century string models: hyperboloids, saddles, conoids and helicoids strung with straight threads between brass rims"
category: design
version: "1.0.0"
---
Curved surfaces made of nothing but straight threads, strung between brass
rims like the 19th-century models in museum glass cases.

## What it is

Some curved surfaces are *ruled*: a straight line can sweep out the whole
surface. Stretch threads between two rims along those lines and the
surface appears out of straight strings. Two equal circles, the top one
turned, give the waisted hyperboloid of a cooling tower; turn the threads
the other way and a second set of straight lines lies on the same surface.
A twisted square frame gives the saddle-shaped hyperbolic paraboloid,
again strung both ways. A circle joined to a straight line gives a conoid;
threads across a double helix give a helicoid, the shape of a spiral
staircase; a tilted, turned top ring gives a leaning twisted cylinder.

## How to use it

A print for a study, classroom or maths department — it looks like a
museum plate. Follow one thread from rim to rim and see that it is
perfectly straight, then see the curve the threads make together. On a
doubly ruled surface the two colours are the two families: every thread of
one colour crosses every thread of the other. The far threads are paler
and finer, so the eye reads the depth. The plate layout shows four models
side by side, each labelled.

## Purpose

A design-lane page from 3D geometry: the classic ruled surfaces, exact
(every thread ends on its rim, and both hyperboloid families lie on one
quadric), drawn with depth shading and shaded brass frames.

## History

Gaspard Monge's descriptive geometry made ruled surfaces an engineering
subject; his student Théodore Olivier built movable string models for his
lectures at the Conservatoire des Arts et Métiers in the 1830s, and
Harvard, Union College and the Science Museum in London still hold sets.
Christopher Wren had already noted the hyperboloid's straight lines (1669);
Vladimir Shukhov built hyperboloid towers from straight steel bars from
1896. Later makers (Brill, Schilling) sold string models across Europe's
universities. See Angela Vierling-Claassen, "Models of Surfaces and
Abstract Art in the Early 20th Century" (2010).

## This implementation

- **Spec knobs:** `surface` (auto, hyperboloid, paraboloid, conoid,
  helicoid, twisted_cylinder), `layout` (single, plate), `threads` (per
  family, 4–160), `frame` (brass tube rims or plain lines), `palette` (auto,
  museum, silk, blueprint, rose, ink), `line`, `caption`, `width`,
  `height`, `margin`.
- **Generation:** each model is two rim curves and a matching rule; the
  hyperboloid joins θ below to θ ± φ above (both families on
  `(x²+y²)/a² − z²/c² = 1`, `a = R cos(φ/2)`, `c = h / tan(φ/2)`), the
  paraboloid joins matching points of opposite sides of a skew
  quadrilateral (both pairs), the conoid joins a circle to the line above
  its diameter parallel to one plane, the helicoid joins opposite points of
  a double helix through the axis, the twisted cylinder joins a circle to a
  tilted, turned copy. A seeded orbit camera with mild perspective (a
  three-quarter view; the saddle between a side and a diagonal, the tilted
  ring leaning towards the viewer) is fitted to the frame. Threads are cut
  into ten pieces, each coloured and thinned by depth; rims are swept tubes
  shaded by a fixed light; everything is painted far to near together. On a
  plate the four models are all different, the chosen one first.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic per seed; every thread endpoint lies on its
  rim curve to 1e-9 (from the rims' equations); every point of both
  hyperboloid families satisfies the quadric to 1e-9, and both paraboloid
  families lie on the saddle `z = −rise·xy/s²`; all ink inside the page;
  clamped `threads` and `line` record `requested_<field>`.

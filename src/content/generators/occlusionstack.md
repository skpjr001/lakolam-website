---
title: "Layers Upon Layers"
blurb: "Layers upon layers: textured cut-outs, cards, hills or petals stacked back to front, every hidden line truly removed"
category: design
version: "1.0.0"
---
Paper cut-outs, cards, hills or petals stacked one on another, each with its
own texture — and not one hidden line drawn.

## What it is

A generative design of overlapping shapes. Each shape is filled with a
pen-drawn texture — parallel hatching, rings inset from its outline like
contour lines, a lattice of dots, bold stripes, or nothing at all — and
shapes nearer the front cover the ones behind. The covering is real: every
line of a shape further back stops exactly where a nearer shape begins, so
even the black-and-white page reads as a stack of cut paper. Four
arrangements: a scattered pile, a cascade of cards stepping across the page,
hills receding under a sun, and a fan of petals.

## How to use it

Frame it, or colour it in. In colour the page is finished art; in line art,
colour each shape in one shade, darker for the shapes in front, and the
stack jumps forward. The line-art page is also ready for a pen plotter or a
laser cutter: every line on it is meant to be drawn, nothing is drawn twice
and nothing is drawn underneath.

## Purpose

A study in depth with the simplest means — overlap alone tells the eye what
is in front. It also shows a problem every plotter artist meets: a pen
cannot paint over a line, so what is hidden has to be removed before
drawing.

## History

Overlap (occlusion) is the oldest depth cue in picture-making, from cave
paintings to the layered paper cut-outs of Henri Matisse's late work and
the receding ridges of Japanese woodblock landscapes. Removing hidden lines
was one of the first problems of computer graphics (Roberts, 1963; Appel,
1967; Sutherland, Sproull and Schumacker's survey of hidden-surface
algorithms, 1974); for flat layers it reduces to clipping each line against
the shapes in front. Pen-plotter artists revived the question in the 2010s,
when stacked, textured shapes with true hidden-line removal became a
signature of plotted art.

## This implementation

- **Spec knobs:** `layout` (auto, pile, cascade, hills, fan), `texture`
  (mixed, hatch, concentric, dots, stripes, plain), `shapes` (2–40),
  `spacing` (texture pitch, 1.5–20 pt), `palette` (auto, dusk, riso, earth,
  sea, line_art), `stroke`, `width`, `height`, `margin`.
- **Generation:** the layout makes the outlines back to front — scattered
  circles, rounded rectangles, arches and lobed blobs (gathered toward the
  middle); a row of cards or arches stepping diagonally; a sun and ridges
  of summed sines, far ones high and gentle, near ones low; petals or cards
  turned about one pivot. Each shape gets a texture (in `mixed`, one per
  shape by the seed): hatch at a random angle (`lako_geom::polygon::hatch`),
  inset rings as level lines of the exact signed distance to the outline,
  a triangular lattice of dots kept clear of the edge, or stripe bands cut
  from the shape by polygon intersection. Every outline and texture line is
  then clipped against every later shape whose box it meets
  (`lako_geom::polygon::clip_polyline`) and only the outside runs are kept;
  a dot is kept only if its whole disc is clear of every later shape; stripe
  bands are intersected with the visible part of the shape (the shape minus
  every later shape). Everything is cropped to the plate. In colour each
  shape is also filled, back to front, and its texture drawn in a deeper
  shade of its fill. Over-range knobs are clamped and recorded as
  `requested_<field>`.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic per seed; `verification:
  hidden_lines_removed`. Tested on every layout and texture: no point of
  any visible line (sampled every 1.5 pt), no dot and no stripe-band edge
  lies strictly inside a later shape, every visible line lies inside the
  plate, and the front shape's outline is never cut except by the plate.
  Meta reports the drawn and the hidden line length. All ink stays inside
  the page.

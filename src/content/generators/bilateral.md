---
title: "Two-Hand Mirror Tracing"
blurb: "Two-hand mirror tracing: paired paths, mirrored or shifted, to trace with both hands at once"
category: design
version: "1.0.0"
---
Pairs of paths to trace with a pencil in each hand at the same time — one
the mirror image of the other.

## What it is

A page split down the middle. On each row the left hand has a path and the
right hand its mirror image, starting at matching dots and moving
symmetrically: waves, arches, zigzags and loops, and whole pictures — a
heart, a flower, a butterfly — split in half so each hand draws one side.
A harder version shifts the right path across instead of mirroring it, so
both hands move the same way.

## How to use it

Hold a pencil or crayon in each hand. Put both on the dots of the first row
and trace both paths together, at the same speed, following the arrows to
the small circles at the ends. Start slowly; it gets easier with practice.
Mirror pages usually feel natural; the "both hands move the same way" pages
are a real challenge.

## Purpose

A playful two-handed drawing exercise often used in classrooms and in
"brain gym" style warm-ups, and simply a fun coordination challenge for
any age. It is offered as an activity, without any claims about what it
does for the brain.

## History

Drawing with both hands at once — "bilateral" or "ambidextrous" drawing —
appears in art-school exercises and was taught by Victorian educators such
as John Jackson, whose *Ambidexterity* (1905) argued for training both
hands; mirror-symmetric two-hand drawing pages are now common in activity
books and occupational-therapy materials.

## This implementation

- **Spec knobs:** `mode` (mirror, parallel), `figure` (mixed, waves, arches,
  zigzags, loops, flower, butterfly, heart), `pairs` (1–6), `dashed`,
  `title`, `palette` (auto, garden, sky, berry, line_art), `stroke`,
  `width`, `height`, `margin`.
- **Generation:** each left path is built in a unit box and fitted to its
  half of a row: waves, arches and zigzags from seeded periods and phases,
  loops from a prolate trochoid; whole figures are the left halves of
  curves symmetric about the vertical axis — a rose r = 0.62 + 0.38 cos kθ
  with k even, a butterfly from Fay's curve lifted so it never crosses the
  axis, and the classic heart — running from the axis back to the axis. A
  mixed page climbs a seeded ladder of figures, easiest first (row paths
  only when shifted). The right path, its arrows, dots and end rings are
  computed from the left one point by point.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic per seed; `verification: mirror_exact`.
  Tested for every figure, mode and pair count: each right point is exactly
  (bit for bit) the reflection x ↦ 2c − x (or the shift x ↦ x + w/2) of its
  left point, with the same y; the two paths have equal length; in mirror
  mode no path crosses the centre line; whole figures run from the axis
  side, top to bottom. All ink stays inside the page.

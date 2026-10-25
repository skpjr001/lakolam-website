---
title: "Breathing Guides"
blurb: "Breathing guides to trace: each stretch exactly as long as its seconds, a tick every second"
category: design
version: "1.0.0"
---
A shape to trace with a finger while you breathe, every stretch exactly as
long as its part of the breath, with a tick for each second.

## What it is

A page of paced breathing patterns drawn as paths. Box breathing is a square
— in, hold, out, hold — and the 4-7-8 pattern a triangle whose sides are 4,
7 and 8 long. There is a figure-eight (in round one loop, out round the
other), a five-point star (in towards each point, out on the way back), rows
of waves that rise as you breathe in and fall as you breathe out, and a
spiral whose breaths grow a little longer each time round. Each part of the
path is coloured by what to do, labelled, and marked with a tick every
second.

## How to use it

Put a finger on the dot. Move along the path at an even, slow pace — about
one tick each second — and do what the words say: breathe in, hold, breathe
out. Follow the arrows, and on a closed shape go round as many times as you
like. Keep the pace comfortable; if a count feels too long, choose a page
with shorter counts. On the wave page, finish a row and start the next at
its small circle; on the spiral, start in the middle and let each breath
slow down as you go out.

## Purpose

A simple, quiet guide for calm breathing practice and a gentle focus for the
eyes and hands. It is a relaxation aid, not a treatment; anyone with a
medical concern about breathing exercises should ask a professional.

## History

Paced breathing has a long history in contemplative traditions (the
pranayama of yoga). "Box" or square breathing became widely known through
its use in stress training; the 4-7-8 pattern was popularised by Andrew
Weil. Finger-tracing shapes — the "breathing star", the "figure-eight
breath" — are common in classroom and wellbeing materials.

## This implementation

- **Spec knobs:** `pattern` (box, triangle, figure_eight, star, waves,
  spiral, mixed), `count` (1–6 guides on the page), `inhale`, `hold`,
  `exhale`, `hold_out` (seconds; empty = the pattern's own: box 4-4-4-4,
  triangle 4-7-8, figure-eight 5-5, star 3-3, waves 4-1-6-1, spiral 3-3
  growing; holds apply to box, triangle and waves), `labels`, `title`,
  `frame` (motifs, line, none), `palette` (auto, sage, dusk, sunrise, ocean,
  line_art), `width`, `height`, `margin`.
- **Generation:** a closed shape cannot simply have each side stretched to
  its time and still close, so each is built in proportion. Polygon
  patterns are the *cyclic polygon* with the phase lengths as sides (unique
  when the longest is shorter than the rest together; circumradius by
  bisection on the central angles), turned so the in-breath climbs straight
  up: four equal phases give the square, 4-7-8 the triangle. Counts that
  make no polygon fall back to waves and say so. The figure-eight scales
  each lobe of a lemniscate about the crossing; the star places each point
  where the strokes out and back are in the ratio of in to out (deepening
  the valleys if needed); each wave rise has its width solved so its length
  is its seconds; the spiral is cut by arc length. A final arc-length
  rescale settles the last ulps, and the drawing is one uniform scale of
  the result. The fit grows each side's margin until the labels clear the
  panel. The seed chooses only decoration: palette, frame motif and rhythm,
  and the order of a mixed page.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic per seed; `verification: timing_exact`.
  Tested over every pattern and many counts: each phase's length equals
  seconds × unit to 1e-9 relative (also reported as
  `timing_max_relative_error`), ticks fall at equal arc length one per
  second and number exactly the total seconds, phases join end to start,
  closed shapes close; the cyclic polygon has its sides to 1e-9. All ink
  stays inside the page.

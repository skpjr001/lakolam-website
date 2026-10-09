---
title: "Unit Circle"
blurb: "Unit circle — the 16 standard angles in degrees and radians with exact (cos, sin) pairs, filled in or blank"
category: paper
version: "1.0.0"
---
The unit circle for trigonometry — the sixteen standard angles in degrees
and radians with their exact coordinates, filled in or blank for practice.

## What it is

A circle of radius 1 centred where the x and y axes cross. Sixteen points
are marked on it: every multiple of 30° and of 45°, from 0° round to 330°.
Along each radius the angle is written in degrees near the rim and in
radians (as fractions of π: π/6, π/4, π/3 …) just inside. Outside each
point are its exact coordinates (cos θ, sin θ) — 0, ±1/2, ±√2/2, ±√3/2 or
±1 — written as proper stacked fractions. In blank mode every label is an
empty box of the same size, so the sheet is a worksheet to fill in from
memory. Reference triangles — a dashed drop from the point to the x axis
with a right-angle mark — can be shown for the first quadrant or for every
point off the axes.

## How to use it

As a reference: keep the filled-in sheet beside you. The x coordinate of
each point is the cosine of its angle, the y coordinate is the sine, and
the tangent is y divided by x.

As practice (blank mode):

1. Fill in the degrees first, going round in 30 and 45 degree steps.
2. Change each to radians: multiply by pi and divide by 180, so 30 degrees
   is pi/6 and 135 degrees is 3pi/4.
3. Learn the first quadrant: the coordinates at 30, 45 and 60 degrees use
   only 1/2, root 2 over 2 and root 3 over 2. Draw the reference triangles
   to see why.
4. Fill in the other quadrants by symmetry. Only the signs change: both
   positive in the top right, x negative in the top left, both negative in
   the bottom left, and y negative in the bottom right.

Time yourself, and print a fresh sheet each day until the whole circle
comes easily.

## Purpose

Learning and revising trigonometry: the exact values of sine, cosine and
tangent at the special angles, converting between degrees and radians,
reference angles and the signs in each quadrant. Used in precalculus,
trigonometry and calculus classes, for homework and quizzes, and as a
desk reference.

## History

Measuring angles in degrees goes back to Babylonian astronomy, while the
radian — the angle whose arc equals the radius — was named in the 1870s
and is the natural unit of calculus. Defining sine and cosine as the
coordinates of a point on a circle of radius one, rather than as ratios in
a right triangle, became the standard approach in school mathematics in
the twentieth century, and the chart of the sixteen special angles is now
one of the most widely printed handouts in mathematics teaching.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape`; `margin_mm` (0–30, default 10); `angles` along the radii —
  `both`, `degrees`, `radians` or `none`; `coordinates` (the exact pairs
  outside the circle); `mode` — `filled` or `blank`; `axes`; `radii`;
  `triangles` — `none`, `first_quadrant` (30°, 45°, 60°) or `all`; `ink`
  for the circle, axes, degree and coordinate labels (default charcoal);
  `accent` for the points, radian labels and triangles (default blue);
  `weight` of the circle in points (0.1–2; radii and axes lighter).
- **Generation:** the exact values come from a table of reference angles
  (cos 30° = √3/2 …) with the quadrant's signs, and radians from the
  reduced fraction degrees/180. The stroke font has neither √ nor π, so the
  crate typesets them itself: a drawn radical with its overbar, a π in the
  font's stroke style, stacked fractions centred on the cap height, and
  curved parentheses as tall as the fractions. Label size starts at about
  1/40 of the page's shorter side (at most 14 pt) and steps down; for each
  size the radius is solved in closed form as the largest that keeps every
  coordinate pair inside the margins, angle labels are stacked inward from
  the rim along their radius, and the size is accepted only when no two
  labels come within a third of their gap and none crowds the centre.
  Radii, axes and triangle legs are broken where they would cross a label.
  Blank boxes have one size per kind (the widest value's), so a box's size
  never hints at its answer.
- **Solving:** nothing to solve on a filled sheet. A blank sheet ships the
  same sheet filled in as its answer key (laid out on its own, so it may
  use a slightly different label size). The seed is unused — every seed
  gives the same sheet.
- **Guarantees:** each point sits exactly on the circle at its angle;
  every printed coordinate and radian value equals cos θ, sin θ and θ (to
  1e-12); every label is centred on its own radius, angle labels inside
  the circle and coordinates outside, clear of the points and of each
  other; all ink stays inside the margins — checked on every page size,
  orientation, angle mode, filled and blank mode and margin extreme. A
  knob outside its range is clamped and the request recorded as
  `requested_<field>` in the meta.

---
title: "Polar Grid"
blurb: "Polar graph paper — concentric rings and angle rays, labelled in degrees or radians"
category: paper
version: "1.0.0"
---
Polar coordinate graph paper — concentric rings and equally spaced rays,
centred on the sheet, with the rim labelled in degrees or radians.

## What it is

Instead of squares, a polar grid locates a point by its **distance** from
the centre (which ring) and its **angle** (which ray). The rings are
equally spaced — 5, 8, 10, 12, 15 or 20 of them — and the rays divide the
full turn into 4, 6, 8, 12, 18, 24 or 36 equal angles (90° down to 10°).
Angles are measured as in mathematics: 0 points to the right and they
increase anticlockwise, so 90° points up. The rim can carry angle labels in
degrees (0°, 30°, 60° … 330°) or in radians as fractions of π (0, π/6,
π/3 … 11π/6). The outer circle and the axes are drawn heavier, and on fine
divisions only every 30° ray runs into the centre, so the middle stays
clear.

## How to use it

Print at actual size ("Actual size" or "100%" in the print dialog) so the
circles stay round.

To plot the point (r, θ) — say (4, 60°) — follow the 60° ray out from the
centre to the fourth ring and mark it. Let each ring stand for whatever
step suits your values (1, 2, 5, 10 …). To draw a polar graph such as a
rose r = sin 3θ, a cardioid r = 1 + cos θ or a spiral, make a table of θ
and r, plot each pair, and join the points in order of angle. A negative r
is plotted on the opposite ray, 180° round. Use the degree labels for
bearings and directions, and the radian labels when your formulas use
radians.

## Purpose

Graphing polar equations in precalculus and calculus; vectors, complex
numbers in polar form and circular motion in physics; antenna and
microphone polar patterns; wind roses and compass bearings; and designs
with rotational symmetry such as mandalas, dials and clock faces. In a
book, polar sheets make a trigonometry workbook section or a design
notebook.

## History

Measuring position by a distance and an angle is far older than graph
paper — astronomers and navigators have long used it — but polar
coordinates as a tool for curves are usually traced to the late 17th
century, to Isaac Newton's work on fluxions and Jakob Bernoulli's use of
them in 1691. Printed polar paper became a standard companion to squared
graph paper for drawing spirals, roses and directional diagrams in
mathematics and engineering.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape`; `margin_mm` (0–30, default 10); `rings` (1–40, default 10);
  `divisions` (2–72, default 12); `labels` (none, degrees, radians); `ink`
  (default gray; light_blue, charcoal and light_green are common);
  `weight` in points (0.1–2, default 0.3; the rim and the 0°/90°/180°/270°
  rays are twice as heavy and a shade darker).
- **Generation:** the centre is the centre of the content box. Without
  labels the circle is as large as the box allows. With labels, each one
  is centred on its own ray just outside the rim (its whole ink box kept a
  small gap clear of the rim, found by bisection), and the radius is the
  largest — again by bisection — at which every label still fits inside
  the margins; the label size steps down from 8 pt until no two labels
  come within 1 pt of each other (only if even 4.5 pt crowds does it label
  every second division, and so on). Ring k is at k/rings of the radius,
  ray i at 360°·i/divisions. Degrees that are not whole show one decimal
  (51.4°); radians are reduced fractions of π. The stroke font has no π,
  so the crate draws one in the font's own stroke style.
- **Solving:** nothing to solve — a page to plot on. The seed is unused:
  every seed gives the same sheet.
- **Guarantees:** the grid is centred in the content box; rings are equal
  steps and rays equal angles; the rim and every stroke stay inside the
  margins; every label lies inside the margins, entirely outside the rim
  and clear of every other label — checked on every page size,
  orientation, division count from 4 to 36, label mode and margin extreme
  (and on crowded rims up to 72 divisions). A knob outside its range is
  clamped and the request recorded as `requested_<field>` in the meta.

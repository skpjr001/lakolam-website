---
title: "Trigonometric Graph Paper"
blurb: "Trigonometric graph paper — x axis in multiples of π/2 to π/12 or degrees, y from −N to N, labelled"
category: paper
version: "1.0.0"
---
Graph paper for sine, cosine and tangent: the x axis ruled and labelled in
fractions of pi or in degrees, the y axis from −N to N.

## What it is

A coordinate grid whose vertical lines fall on the angles trigonometry is
written in, so a sine curve's peaks, zeros and troughs land exactly on grid
lines:

- **Radians** — one column for every π/2, π/4, π/6 or π/12, labelled as
  reduced fractions stacked over a bar: π/6, π/3, π/2, 2π/3, 5π/6, π …
- **Degrees** — one column for every 15°, 30°, 45° or 90°.
- **Range** — −2π to 2π (the y axis in the middle), 0 to 4π, −π to π or
  0 to 2π; in degrees the same turns, −360° to 360° and so on.
- **The y axis** runs from −1 to 1 up to −10 to 10, with one to ten rows to
  each unit.

The lines at every quarter turn (π/2, 90°) and at every whole unit of y are
heavier, and the axes carry arrowheads, the letters x and y and their
labels. One to four graphs fit on a sheet.

## How to use it

Print the page at actual size ("Actual size" or "100%" in the print
dialog). Each column is one step of the angle printed under the x axis, and
each heavier line is a quarter turn, so key points are easy to find: for
y = sin x, mark 0 at 0, 1 at pi/2, 0 at pi, -1 at 3pi/2 and 0 at 2pi, then
draw a smooth curve through them. For y = 2 sin 3x, count the columns to
the new period and the rows to the new height. Use one graph per function,
or draw two functions on the same axes in different colours to compare
shifts and stretches. Choose degrees if your class has not met radians
yet.

## Purpose

Trig homework and teaching: graphing sine, cosine and tangent, their
amplitude, period and phase shifts, and solving equations graphically.
Teachers print class sets with two or four graphs to a page; students keep
a pad for precalculus and physics (waves, oscillations, alternating
current).

## History

Angles were measured in degrees long before the graph: the 360-part circle
comes from Babylonian astronomy. Measuring an angle by the length of arc it
cuts from a unit circle was described by Roger Cotes in 1714, and the word
"radian" first appeared in print in 1873, in examination questions set by
James Thomson at Queen's College, Belfast. Once the sine and cosine came to
be treated as functions of a real number, their graphs — periodic waves
crossing zero at whole multiples of π — became a staple of school
mathematics, and printed sheets ruled in multiples of π followed as a
classroom aid.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape` (default on); `margin_mm` (0–30, default 10); `x_unit`
  (pi2, pi4, pi6, pi12, deg15, deg30, deg45, deg90; default pi6);
  `x_range` (minus_two_pi_to_two_pi, zero_to_four_pi, minus_pi_to_pi,
  zero_to_two_pi); `y_max` (1–10, default 2); `y_divisions` (rows per
  unit, 1–10, default 4); `graphs` (1–4); `grid_ink` (default light blue)
  and `axis_ink` (default charcoal); `weight` in points (0.1–2); `labels`
  and `arrows` (both on by default).
- **Generation:** the content box is split into one cell per graph (stacked;
  four make a 2 × 2 block). Room is kept for the labels, then the column
  width and row height are fitted to the cell and rounded down to a whole
  0.5 mm (0.1 mm below 1 mm), so every column is the same exact width and
  every row the same exact height. The axes lie on grid lines: x = 0 and
  y = 0. Labels are laid out with their exact ink boxes: every k-th
  division is labelled, k being the smallest divisor (or multiple) of a
  half turn that keeps neighbours apart, and any label that would touch
  another, an arrowhead or the margin is left out. Fractions of π are
  reduced and stacked over a bar; the stroke font has no π, so a π glyph is
  drawn in the same stroke style. Minus signs are en dashes.
- **Solving:** nothing to solve — a page to graph on. The seed is unused:
  every seed gives the same sheet.
- **Guarantees:** every grid has exactly one column per division and
  2 × y_max × y_divisions rows, all of identical size; the axes sit on grid
  lines; the lines at every quarter turn and whole unit are heavier; all
  ink — strokes, arrowheads and labels — stays inside the margins, and no
  two labels touch (checked on every page size, orientation, unit and
  range). A knob outside its range is clamped and the request recorded as
  `requested_<field>` in the meta.

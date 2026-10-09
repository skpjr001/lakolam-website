---
title: "Smith Chart"
blurb: "Smith chart — impedance, admittance or ZY chart with exact resistance circles and reactance arcs"
category: paper
version: "1.0.0"
---
A blank Smith chart for radio-frequency work — exact resistance circles and
reactance arcs, as an impedance chart, an admittance chart or both at once.

## What it is

The Smith chart draws every impedance on one disc. Each point stands for a
normalised impedance z = r + jx (the impedance divided by the line's
characteristic impedance), placed where its reflection coefficient
Γ = (z − 1)/(z + 1) falls inside the unit circle:

- **Constant-resistance circles** — one for each r, centred on the real axis
  at r/(1 + r) with radius 1/(1 + r). They all touch at the right-hand end of
  the axis, the open circuit.
- **Constant-reactance arcs** — one pair for each x, from the circles centred
  at (1, ±1/x) with radius 1/|x|. Positive (inductive) reactance curves into
  the upper half, negative (capacitive) into the lower half; every arc meets
  the rim at a right angle.
- **The rim** is pure reactance (r = 0) and the **centre** is a perfect match
  (z = 1).

Three detail levels: **basic** (0.2, 0.5, 1, 2, 5), **standard** (0.1 steps to
1, 0.2 steps to 2, then 3, 4, 5, 10, 20) and **detailed** (adds 0.05 steps
below 1, and 6, 8 and 50). As on printed charts, the finer lines stop at a
line of the other family before they crowd together near the open circuit.
The **admittance** chart is the impedance chart turned half a turn; the
**immittance** (ZY) chart prints both, the admittance lines paler.

## How to use it

Print at actual size. Normalise the load: divide its impedance by the line's
impedance (usually 50 ohms), then find the point where its resistance circle
crosses its reactance arc — resistance values are written along the
horizontal axis, reactance values round the rim (+j above, -j below).

Moving along a lossless line turns the point round the centre on a circle
of constant distance: one full turn is half a wavelength. The distance from
the centre is the size of the reflection; where that circle crosses the
right half of the axis you read the standing-wave ratio. To design a
matching network, step from the load toward the centre along circles and
arcs — series parts move you along constant-resistance circles, parallel
parts (on the admittance chart) along constant-conductance circles.

## Purpose

The working tool of RF and microwave engineers, antenna builders and radio
amateurs for impedance matching, stub tuning and reading network-analyser
plots, and the standard teaching aid in transmission-line courses. A blank
chart is for homework, lab notebooks and design sketches; the ZY chart is the
one to use for L-network matching with mixed series and shunt parts.

## History

Phillip H. Smith, an engineer at Bell Telephone Laboratories, began working
on the chart in the early 1930s and published it as a "Transmission Line
Calculator" in Electronics magazine in January 1939; Mizuhashi Tosaku
published an equivalent chart in Japan in 1937. Smith extended it in a 1944
article, including its use with admittance coordinates. From the Second
World War until computers took over the arithmetic it was the microwave
engineer's main calculator, and it remains the standard way to display
impedance on network analysers today.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape`; `margin_mm` (0–30, default 10); `detail` (basic, standard,
  detailed); `chart` (impedance, admittance, immittance); `labels` (values
  along the real axis and round the rim); `ink` (named paper colours, default
  steel_blue; dark_gray and engineering_green are the classic alternatives);
  `weight` in points (0.1–2).
- **Generation:** the chart is the largest circle that fits the content box
  with room for the rim labels, centred. Every resistance circle and
  reactance arc is an exact circular arc through three points computed from
  Γ(r, x) — never a polyline. A line stops at its listed limit (for example
  the standard 0.1-step lines stop at the 2.0 lines), chosen so the spacing
  near the open circuit, which shrinks like 2Δ/|z + 1|², stays readable; each
  limit is itself a value on the chart, so lines end on a crossing. The rim
  and real axis are heavier, the r = 1 circle and x = ±1 arcs a little
  heavier. Reactance labels are set tangent to the rim (fewer past 5, where
  the rim crowds); resistance labels read upward along the axis.
- **Solving:** nothing to solve — a chart to plot on. The seed is unused:
  every seed gives the same sheet.
- **Guarantees:** every resistance circle touches the rim from inside at the
  open-circuit point and every reactance circle passes through it and meets
  the rim at a right angle (checked to 1e-6 of the radius on every page size,
  orientation, detail level and chart type); points Γ(r, x) lie on their
  circles; the admittance chart is exactly the impedance chart turned half a
  turn; all ink, labels and stroke widths included, stays inside the
  margins. A knob outside its range is clamped and recorded as
  `requested_<field>` in the meta.

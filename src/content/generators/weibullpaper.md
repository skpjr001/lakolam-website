---
title: "Weibull Paper"
blurb: "Weibull probability paper — log time cycles against ln(-ln(1-F)) in percent failed, with a slope scale and the 63.2 % line"
category: paper
version: "1.0.0"
---
Weibull probability paper — a logarithmic time axis against a doubly
logarithmic percent-failed axis, so Weibull failure data plots as a straight
line whose slope is the shape parameter.

## What it is

Graph paper for life data. Across the page, time runs on a logarithmic
scale of one to five cycles, each cycle ruled 1 to 10 like ordinary log
paper. Up the page, the cumulative percentage of parts failed is spaced by
ln(−ln(1 − F)), the transformation that straightens the Weibull
distribution: the standard percentages 0.1, 0.2, 0.3, 0.5, 1, 2, 3, 5, 10,
20 … 90, 95, 99 and 99.9 are ruled and labelled, with fainter in-between
lines where there is room. A heavy dashed line marks 63.2 %, the fraction
failed at the characteristic life. Beside the grid stands an estimation
point E and a slope scale from 0 to 10 for reading the shape parameter
(beta) off a fitted line.

## How to use it

Print at actual size ("Actual size" or "100%" in the print dialog).

1. Sort the n failure times from shortest to longest.
2. Give the i-th one the median-rank plotting position
   (i - 0.3) ÷ (n + 0.4) × 100 % — for ten failures, the first is at 6.7 %,
   the second at 16.3 %, and so on.
3. Number the cycles along the bottom to cover your times (for example 10,
   100, 1000 hours), and plot each time against its percentage.
4. If the points lie close to a straight line, the data follows a Weibull
   distribution. Draw the best line by eye.
5. The characteristic life is the time where your line crosses the dashed
   63.2 % line: by then 63.2 % of the parts have failed.
6. For the shape (the slope), draw a line through the point E parallel to
   your line and read where it crosses the slope scale. A slope below 1
   means early "infant mortality" failures, about 1 means random failures,
   and above 1 means wear-out.

Points that bend away from a straight line can mean a failure-free period
at the start, or two failure modes mixed together.

## Purpose

Reliability and life-data analysis by hand: estimating the shape and
characteristic life of bearings, electronic parts, fatigue specimens,
insulation and other components from test or field failures; checking
whether a Weibull model fits at all; comparing designs or suppliers on one
sheet; and teaching what reliability software does behind its plots.

## History

The Swedish engineer Waloddi Weibull introduced the distribution in 1939 in
work on the strength of materials, and made it widely known with "A
Statistical Distribution Function of Wide Applicability" in the ASME
Journal of Applied Mechanics in 1951. Because taking the logarithm twice
makes it a straight line, it lent itself to graphical analysis on specially
ruled paper; John H. K. Kao's 1959 Technometrics paper on the life testing
of electron tubes estimated Weibull parameters graphically in exactly this
way. Weibull paper became a standard tool of reliability engineering, and
the same plot is still the first picture drawn in reliability software.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape`; `margin_mm` (0–30, default 10); `cycles` of log time (1–5,
  default 3); `range` of the percent axis — `standard` 0.1–99.9 %, `wide`
  0.01–99.99 %, `narrow` 1–99 %; `ink` (default steel_blue); `weight` of the
  finest lines in points (0.05–1; standard percentages and whole time
  values 1.5×, cycle lines and the border 3× as heavy); `labels`
  (percentages, cycle numbers 1–9 and the axis titles); `slope_scale` (the
  estimation point E and the beta scale); `characteristic_line` (the dashed
  63.2 % line).
- **Generation:** the percentage p sits at a height proportional to
  Y = ln(−ln(1 − p/100)), computed with `ln_1p` for accuracy at small p,
  with the range's ends on the border. Each time cycle places the value v
  at log10(v) of the cycle; 1–2, 2–5 and 5–10 are subdivided as finely as
  keeps lines 1.2 mm apart. In-between percentages are added only where
  they stay 1.2 mm clear of every other line. The slope scale is a vertical
  line k natural-log units of time to the right of E (k chosen so the run
  is at most 18 mm and beta = 10 fits the plot's height); since a line of
  Weibull slope beta rises beta × k units of Y over that run, beta is
  marked at exactly that height above E — a linear scale, with tenths to 2
  where they are 0.8 mm apart and halves to 10. Labels are placed by
  importance and only where they clear the grid and each other.
- **Solving:** nothing to solve — a page to plot on. The seed is unused:
  every seed gives the same sheet.
- **Guarantees:** every ruled percentage sits at ln(−ln(1 − F)) to 1e-9 pt,
  with 63.2121 % (F = 1 − 1/e) at Y = 0; the transform matches known values
  (ln ln 2 at 50 %, ln ln 1000 at 99.9 %) and exact Weibull quantiles plot
  on one line of page slope beta that crosses 63.2 % at the characteristic
  life; whole time values sit at log10 of their cycle; a line of slope beta
  through E meets the slope scale at its beta tick; all ink stays inside
  the margins and labels clear the grid and each other — checked on every
  page size, orientation, range, cycle count, label setting and margin
  extreme. A knob outside its range is clamped and the request recorded as
  `requested_<field>` in the meta.

---
title: "Probability Paper"
blurb: "Normal probability paper — a 0.01-99.99 % axis spaced by the inverse normal CDF, linear x divisions"
category: paper
version: "1.0.0"
---
Normal probability paper — a cumulative-percentage scale from 0.01 % to
99.99 %, spaced so that normally distributed data plots as a straight line.

## What it is

Graph paper whose vertical axis is stretched in the tails: the line for
each cumulative percentage is placed at the matching point of the standard
normal distribution (its z-score), so 50 % is in the middle, 84.1 % is one
standard deviation above it, 97.7 % two, and 99.87 % three. The standard
percentages are ruled and labelled — 0.01, 0.02, 0.05, 0.1, 0.2, 0.5, 1,
2, 5, 10, 20 … 80, 90, 95, 98, 99, 99.5, 99.8, 99.9, 99.95, 99.98, 99.99 —
with fainter in-between lines wherever there is room. A scale of standard
deviations (−3 to 3) runs down the right-hand side. The horizontal axis is
ordinary and linear, split into 5, 10 or 20 equal divisions for your own
scale.

## How to use it

Print at actual size ("Actual size" or "100%" in the print dialog).

1. Sort your n measurements from smallest to largest.
2. Give the i-th one the plotting position (i − 0.5) ÷ n × 100 % — for 20
   values, the smallest is at 2.5 %, the next at 7.5 %, and so on.
3. Number the horizontal divisions to cover your range, and plot each
   value against its percentage.
4. If the points lie close to a straight line, the data is roughly normal.
   Draw the best line by eye: where it crosses 50 % is the mean, and the
   distance along the value axis from 50 % to 84.1 % (one standard
   deviation on the right-hand scale) is the standard deviation.

Points that bend away at the ends show skewed or heavy-tailed data. For
data that grows by multiplying, such as particle sizes or flood flows, plot
the logarithms of the values instead.

## Purpose

Checking whether data is normally distributed and estimating its mean and
spread by eye — in quality control and process capability studies,
reliability and life testing, hydrology (flood and rainfall frequency),
grain-size analysis in geology, and statistics teaching, where plotting by
hand shows what a normal probability plot on a computer actually does.

## History

The American hydraulic engineer Allen Hazen introduced probability paper in
1914, in papers for the American Society of Civil Engineers on flood flows
and reservoir storage, plotting ranked observations at the positions
(i − ½)/n that still carry his name. Printed arithmetic-probability paper
became a standard engineering and laboratory supply in the following
decades, and the plot it makes survives in every statistics package as the
normal probability (or Q–Q) plot.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape`; `margin_mm` (0–30, default 10); `x_divisions` (2–50; 5, 10
  and 20 are the usual; default 10); `ink` (default green; steel_blue and
  medium_gray are the other traditional colours); `weight` of the finest
  lines in points (0.05–1; standard percentages 1.5× and the border and
  50 % line 3× as heavy); `labels` (percentages up the left with the title
  "cumulative percent", division numbers along the bottom); `sd_scale` (the
  standard-deviation scale on the right).
- **Generation:** the percentage p sits at height proportional to
  Φ⁻¹(p/100), with 0.01 % and 99.99 % (z = ∓3.719) at the border. Φ⁻¹ is
  computed in the crate: Peter Acklam's rational approximation (relative
  error below 1.2e-9) followed by one Halley step against Φ from its
  Taylor series, accurate to about 1e-15. Every standard percentage is
  ruled; in-between percentages (45, 35, 25, 15, 9 … 0.015 and their
  mirrors) are added in pairs only where both stay 1.2 mm clear of every
  other line. Labels are placed by importance — 50, 10, 90, 1, 99, 0.1,
  99.9, 0.01, 99.99, then the rest — each only where it clears those
  already written.
- **Solving:** nothing to solve — a page to plot on. The seed is unused:
  every seed gives the same sheet.
- **Guarantees:** every ruled percentage sits at its normal quantile (to
  1e-9 pt), so the scale is symmetric about 50 %; Φ⁻¹ matches published
  values to 1e-11 and is checked against an independent Simpson-rule
  integration of the normal density; the x divisions are equal; labels lie
  off the grid and clear of each other; all ink stays inside the margins —
  checked on every page size, orientation, division count, label setting
  and margin extreme. A knob outside its range is clamped and the request
  recorded as `requested_<field>` in the meta.

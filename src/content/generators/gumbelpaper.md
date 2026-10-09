---
title: "Gumbel Paper"
blurb: "Gumbel extreme-value probability paper — reduced variate with return-period (1.01-1000 years) and probability scales, for flood and rainfall frequency plots"
category: paper
version: "1.0.0"
---
Extreme-value probability paper — a return-period scale from 1.01 to 1000
years, spaced so that yearly maxima following Gumbel's law plot as a
straight line.

## What it is

Graph paper for the largest value of each year: the biggest flood, the
heaviest one-day rainfall, the strongest gust. The horizontal axis is the
Gumbel "reduced variate" y = –ln(–ln F), where F is the chance that a
year's maximum stays below a value. Above it runs the return period
T = 1 ÷ (1 – F) in years — 1.01, 1.1, 1.5, 2, 5, 10, 20, 50, 100, 200,
500, 1000 — and below it the same positions as a probability in percent
(T = 10 years is F = 90 %, T = 100 years is F = 99 %), with an evenly
divided ruler of y itself underneath. The vertical axis is for your own
values: ten equal divisions, or a logarithmic scale of one to four cycles.
A dashed line marks T = 2.33 years, where the mean of a Gumbel
distribution always falls — the "mean annual flood" of hydrology.

## How to use it

Print at actual size ("Actual size" or "100%" in the print dialog).

1. List the largest value of each of your n years and sort them from
   largest to smallest.
2. Give the m-th largest a return period of (n + 1) ÷ m years — for 30
   years of records the largest is plotted at 31 years, the second at 15.5,
   the smallest at about 1.03. (Many hydrologists prefer the Gringorten
   position, (n + 0.12) ÷ (m – 0.44), which suits this paper slightly better.)
3. Number the vertical divisions to cover your values and plot each one
   against its return period on the top scale.
4. If the points lie close to a straight line, draw it by eye and read off
   the value for any return period: the 100-year flood is where the line
   crosses T = 100. The line should pass near the average of your values
   at the dashed 2.33-year line.

Points that curve upwards suggest a heavier-tailed law; try plotting the
logarithms of the values on the log scale instead.

## Purpose

Flood and storm frequency analysis by hand: estimating the 50-, 100- or
1000-year flood for bridges, culverts, levees and dams, design rainfall,
extreme wind speeds and wave heights, and any other "largest of the year"
record — and teaching what a return period actually means, which a fitted
line on squared paper shows at a glance.

## History

The theory of the largest value of a sample was worked out by Ronald
Fisher and Leonard Tippett in 1928, whose first limiting form is now called
the type I extreme-value or Gumbel distribution. The German statistician
Emil Julius Gumbel proposed it for annual floods in 1941 and spent the rest
of his career on it, summed up in his book Statistics of Extremes (1958).
Ralph Powell drew the first special plotting paper for it in 1943, and a
slight modification of Powell's sheet became the United States Geological
Survey's printed flood-data form, on which the mean of the distribution
falls at the 2.33-year recurrence interval. Gumbel paper remained a
standard tool of hydrology offices for decades; in the United States,
federal guidelines later favoured the log-Pearson type III distribution for
floods, but the Gumbel plot is still widely taught and used for rainfall,
wind and other extremes.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape` (default on — the long axis is the return period);
  `margin_mm` (0–30, default 10); `range` (`t100`, `t1000`, `t10000`: the
  reduced variate runs from −2 to 5, 7 or 10, so the standard return
  periods up to 100, 1000 or 10 000 years appear; default `t1000`);
  `x_grid` (`return_period` — lines at the standard periods with
  in-between periods 1.2, 3, 30, 15 … added where they stay 1.2 mm clear;
  `reduced_variate` — equal lines every 0.1, heavier every 0.5 and 1;
  `both`, the default — faint 0.1 steps under the return-period lines);
  `y_scale` (`linear`, or `log_1_cycle` … `log_4_cycles`, with half steps
  added when a decade is at least 40 mm tall); `y_divisions` (2–50, linear
  axis only; default 10); `ink` (default blue); `weight` of the finest lines
  in points (0.05–1; main lines 1.5×, border 3×); `labels` (numbers and
  titles on every scale); `probability_scale` (F in percent along the
  bottom); `variate_scale` (the ruler of y); `mean_marker` (the dashed
  line at y = γ, T = 2.33 years, named inside the plot).
- **Generation:** x is linear in y = −ln(−ln F) from −2 to the range's
  end. A return period T sits at y = −ln(−ln(1 − 1/T)), computed with
  `ln_1p` so T = 1.01 keeps full precision; a probability F at
  −ln(−ln F); the mean at Euler's constant γ = 0.5772, whose return period
  1/(1 − exp(−exp(−γ))) = 2.3276 years. Labels are placed by importance
  (2, 10, 100, 1000 years first; 50, 90, 99 % first) and each only where it
  clears those already written, so crowded small sheets drop the minor
  ones rather than overprint.
- **Solving:** nothing to solve — a page to plot on. The seed is unused:
  every seed gives the same sheet.
- **Guarantees:** every return-period line and tick sits at its reduced
  variate to 1e-9 pt, every probability tick at −ln(−ln F), the ruler steps
  by exactly 0.1, the value axis is equal (linear) or at log10 (log), and
  the mean line at γ; the transforms are tested against values to 1e-12,
  and γ as the mean is checked by numerical integration of the density.
  Scale labels lie off the grid and clear of each other, and all ink stays
  inside the margins — checked on every page size, orientation, range,
  grid, value scale, label setting and margin extreme. A knob outside its
  range is clamped and the request recorded as `requested_<field>` in the
  meta.

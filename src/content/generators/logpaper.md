---
title: "Log Paper"
blurb: "Log paper — semi-log and log-log graph paper with 1 to 5 labelled, subdivided cycles"
category: paper
version: "1.0.0"
---
Logarithmic graph paper — semi-log and log-log sheets with 1 to 5 cycles,
each ruled at exactly log₁₀ of its values and labelled 1 to 9.

## What it is

Graph paper on which one or both axes are logarithmic: the distance from
the bottom of a **cycle** (or decade) to the line for a value is
proportional to the value's logarithm. Each cycle covers a factor of ten —
1 to 10, 10 to 100, 100 to 1000 — and looks the same as the last, with its
lines crowding together towards the top: 2 sits 30.1 % of the way up, 5 at
69.9 %.

- **Semi-log** paper has a logarithmic y axis over an ordinary linear x
  axis (5 mm, 10 mm or 0.1 inch squares). Anything that grows or decays by
  a constant factor per step — compound interest, population growth,
  radioactive decay, a cooling curve — plots as a straight line.
- **Log-log** paper has both axes logarithmic, with cycles of the same
  length both ways. A power law y = a·xⁿ plots as a straight line whose
  slope is n.

Each cycle is subdivided as finely as its height allows, the way printed
log paper is: 1 to 2, 2 to 5 and 5 to 10 split by 0.05, 0.1, 0.2 or 0.5,
never closer than 1.2 mm. Three cycles on a Letter sheet give the classic
ruling — tenths from 1 to 2, fifths from 2 to 5, halves from 5 to 10.

## How to use it

Print at actual size ("Actual size" or "100%" in the print dialog).

The printed numbers 1, 2 … 9 are digits, not values: decide what the
bottom line stands for — 1, 10, 0.01, whatever your data needs — and each
cycle above it is ten times the one below. Write your values next to the
1s (for example 1, 10, 100, 1000). There is no zero on a log axis: choose
a bottom value smaller than your smallest data point. To plot 350 on a
cycle that runs from 100 to 1000, find the 3 line of that cycle and go half
way to the 4 — mind that the gaps shrink as you go up. Draw a straight line
through the points: on semi-log paper its steepness tells you the growth
rate; on log-log paper, measure the slope with a ruler (rise over run) to
read the power directly, because the cycles are the same size both ways.

## Purpose

Science and engineering graphs that span several powers of ten: Bode plots
and frequency response in electronics, reaction rates and pH in chemistry,
decay curves in physics, growth curves in biology and economics, and
power-law fits in any lab. Students use it to see exponential and power
relationships become straight lines before they meet logarithms
algebraically. In a book, a log paper section suits a lab notebook.

## History

Logarithmic scales on a graph are usually credited to the French engineer
Léon Lalanne, who in the 1840s graduated the axes of a chart
logarithmically so that curves such as xy = k became straight lines — the
principle behind his "universal calculator" nomogram and behind log-log
paper. The semi-logarithmic "ratio chart", which shows equal rates of
growth as equal slopes, was promoted for statistics by Irving Fisher in a
1917 paper of the American Statistical Association. Printed log and
semi-log papers, sold by the number of cycles, were standard drafting-room
supplies through the slide-rule era and are still used in teaching and
laboratory work.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape`; `margin_mm` (0–30, default 10); `scale` (semi_log or
  log_log); `decades` up the y axis (1–5, default 3); `x_decades` across
  the x axis of log-log paper (1–5, default 3; semi-log paper has a linear
  x axis and ignores it); `linear` x spacing for semi-log paper (mm5, mm10,
  tenth_inch); `ink` (default orange_brown, the classic log-paper colour;
  engineering_green, gray and blueprint_blue are common alternatives);
  `weight` of the finest lines in points (0.05–1; whole-number lines are
  twice and cycle lines four times as heavy); `labels` writes 1 … 9 in the
  margin of each cycle (and under each x cycle on log-log paper).
- **Generation:** semi-log paper fills the height with equal cycles over
  whole linear squares centred across the sheet; log-log paper uses one
  cycle length for both axes — the largest that fits — and centres the
  plot. The line for value v in cycle d sits at `base + (d + log10 v) ×
  cycle`. Each of the groups 1–2, 2–5 and 5–10 takes the finest step
  (0.05/0.1/0.2/0.5) whose closest pair of lines — at the top of the group —
  is at least 1.2 mm apart, or none. Labels: each cycle's 1, then 2, 5, 3,
  4, 6, 7, 8, 9 in that order, each only where it stays clear of the
  labels already written, and a final 1 at the very top (traditional log
  paper repeats 1 at each cycle; write the powers of ten beside them).
- **Solving:** nothing to solve — a page to plot on. The seed is unused:
  every seed gives the same sheet.
- **Guarantees:** every whole-value line sits at exactly log₁₀ of its
  value within its cycle (to 1e-9 pt), the cycles are equal (and equal on
  both axes of log-log paper), the linear axis spacing is exact,
  subdivision lines are never closer than 1.2 mm, labels lie in the margin
  off the grid and clear of each other, and all ink stays inside the
  margins — checked on every page size, orientation, scale, cycle count and
  margin extreme. A knob outside its range is clamped and the request
  recorded as `requested_<field>` in the meta.

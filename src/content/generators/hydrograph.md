---
title: "Storm Hydrograph"
blurb: "Storm hydrographs — read or plot rainfall bars and river discharge, find peak discharge, lag time, base flow and the limbs, and compare an urban and a rural river"
category: maths
version: "1.0.0"
---
Read (or plot) how a river rises and falls after a storm — peak discharge, lag time, base flow and the limbs, and an urban river against a rural one.

## What it is

A geography worksheet built round one storm hydrograph: bars for the rain
that fell in each hour and a line for the river's discharge (the volume of
water flowing past a point each second, in cumecs), on one grid with
discharge on the left scale and rainfall on the right. The line starts
flat at base flow, rises to a single peak some hours after the heaviest
rain, then falls slowly back. Every value the questions ask about sits
exactly on a grid intersection, so it can be read without guessing.
Four to ten questions ask for the time and size of the peak rainfall and
peak discharge, the base flow, a reading at a given hour, whether the
river is on its rising or falling limb, the lag time, the storm total, the
rise in discharge, how long the rising limb lasts, how long after the peak
the river falls to a level, and the mean rate of rise. At Hard and Expert
two rivers — one draining a town, one draining fields and woods — had the
same storm, and the questions compare them. In draw mode the discharge is
printed as a table and the pupil plots the line first. The storms are
invented, so every number is exact. The answer key fills in every answer
and, in draw mode, shows the finished line.

## How to play

1. Discharge is read from the line against the left-hand scale (cumecs);
   rainfall from the bars against the right-hand scale (mm). Each bar is
   centred on its hour. The dots on the line sit on grid crossings: follow
   the grid lines down to the time and across to the scale.
2. **Peak rainfall:** the tallest bar; its time is the hour under its
   middle. **Peak discharge:** the highest point of the line.
3. **Lag time:** the time of peak discharge minus the time of peak
   rainfall.
4. **Base flow:** the discharge before the storm, where the line is flat.
5. **Rising limb:** from where the line leaves base flow up to the peak.
   **Falling limb:** from the peak back down.
6. **Rise in discharge:** peak discharge minus base flow. **Mean rate of
   rise:** that rise divided by the hours of the rising limb.
7. **Two rivers:** a town catchment of roofs, roads and drains sends water
   to the river fast, so its river has the shorter lag time and the higher
   peak; fields, soil and woods soak water up and release it slowly.
8. **Plotting:** mark each pair from the table as a dot (hour across,
   discharge up) and join the dots with one smooth curve.

## Purpose

Storm hydrographs are part of every GCSE geography rivers unit (AQA
3.1.3, Edexcel, OCR, WJEC) and of the A-level water cycle, and appear in
Australian, Indian and US physical-geography courses. Pupils must read
them, draw them from data, describe the shape and explain it — why
urbanisation, impermeable rock, steep slopes or deforestation make a
"flashy" hydrograph with a short lag and a high peak, and why that means
floods. The page practises the careful reading and the small
calculations (lag, differences, rates) that exam questions ask for.

## History

The unit hydrograph — the idea that a catchment answers a burst of rain
with a characteristic, repeatable discharge curve — was put forward by
LeRoy Sherman in 1932, building on Mulvany's rational method (1851) and
the first systematic stream gauging of the nineteenth century. Hydrograph
analysis became the basis of flood forecasting and of the design of
bridges, culverts and urban drainage, and the storm hydrograph, with its
rising limb, peak, lag and recession, has been a standard school diagram
since the 1970s.

## This implementation

- **Spec knobs:** `difficulty`; `mode` (`read` the drawn hydrograph, or
  `draw` the discharge from a table — the key shows the line in red);
  `rivers` (`auto`: one river at Easy and Medium, an urban and a rural
  river at Hard and Expert; `one`; `two` — meta `rivers_choice` records
  the setting); `count` (4-10, clamped and recorded as
  `requested_count`); `width`, `height`, `line`.
- **Generation:** an invented storm of three to six hourly bars (1 or 2 mm
  steps) with one tallest bar. Each river is a list of knots on whole
  hours and grid values: flat base flow until shortly after the rain
  starts, up to two knots rising strictly to one peak (lag 3-7 hours for
  a single river, 2-4 urban, 6-11 rural), then an exponential recession
  rounded to the grid and kept only where it has dropped a whole step,
  ending flat at base flow if it gets there. The urban river always has
  the shorter lag and the higher peak. The line through the knots is a
  monotone piecewise cubic (PCHIP slopes: zero at turning knots, a
  weighted harmonic mean of the neighbouring secants elsewhere), drawn as
  exact Bézier segments. Easy asks single readings on a 24-hour record;
  Medium adds lag, total, rise, the rising limb and the fall after the
  peak on 36 hours; Hard compares two rivers on 48 hours (lags, peaks,
  which is urban); Expert adds differences and mean rates of rise (only
  when whole). Kids is served at Easy (meta `requested_difficulty`).
- **Solving:** every answer is recomputed from the knots and bars.
- **Guarantees:** `answers_checked`. Because every slope lies between 0
  and 3 times each neighbouring secant, the cubic is monotone on every
  interval, so the line passes through every knot and has exactly one
  maximum, at the peak knot. The tests sample the drawn Bézier curves
  densely and check this (through every knot, never above the peak,
  rising then falling), check the Bézier and Hermite forms agree, re-read
  every answer from the sampled drawing by a separate reader (argmax for
  the peak, sample values at hours, the direction of the line for the
  limb), check that a changed answer or an off-grid bar is caught, that
  the urban river is quicker and higher, and that the page stays inside
  its bounds at every size.

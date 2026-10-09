---
title: "Bode Plot Paper"
blurb: "Bode plot paper — a dB magnitude grid above a phase grid on a shared 1-6 decade log frequency axis"
category: paper
version: "1.0.0"
---
Bode plot paper — a decibel magnitude grid above a phase grid in degrees,
sharing one logarithmic frequency axis.

## What it is

Two graphs stacked on one sheet for sketching the frequency response of a
filter, amplifier or control loop. Across both runs the same logarithmic
frequency scale of one to six decades, each decade ruled at 2, 3 … 9 and
numbered as a power of ten (10⁰, 10¹, 10² …) or with SI prefixes (1, 10,
100, 1k …). The upper grid is the magnitude in decibels — for example −60
to +20 dB in steps of 10 — and the lower grid is the phase in degrees — for
example −180° to +90° in steps of 45° — both with finer lines in between.
The 0 dB and −180° lines are drawn heavy, because that is where gain and
phase margins are read.

## How to use it

Print at actual size ("Actual size" or "100%" in the print dialog).

1. Number the decades along the bottom to suit your circuit, or use the
   printed powers of ten.
2. Mark each corner (break) frequency on the frequency axis.
3. On the magnitude grid, draw the straight-line approximation: flat up to
   a corner, then sloping down 20 dB per decade for each pole (up 20 dB per
   decade for each zero). One decade across is exactly one decade line to
   the next, so slopes are easy to draw.
4. On the phase grid, each pole takes the phase down 90 degrees, about 45
   degrees of it at the corner frequency, spread over a decade either side.
5. Read the gain margin where the phase curve crosses -180 degrees, and the
   phase margin where the magnitude crosses 0 dB.

## Purpose

Sketching and checking frequency responses by hand in electronics, audio
and control engineering: asymptotic Bode plots of transfer functions,
plotting measured gain and phase from a signal generator and oscilloscope,
finding bandwidth, resonance and stability margins, and practising for
exams where the straight-line method is taught.

## History

Hendrik Wade Bode, an engineer at Bell Telephone Laboratories, set out the
relations between gain and phase in feedback amplifiers in "Relations
Between Attenuation and Phase in Feedback Amplifier Design", published in
the Bell System Technical Journal in July 1940, and expanded them in his
1945 book "Network Analysis and Feedback Amplifier Design". His way of
drawing gain in decibels and phase against a logarithmic frequency scale,
with straight-line asymptotes, became the standard tool for judging the
stability of feedback systems and is still taught to every electrical and
control engineer.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape`; `margin_mm` (0–30, default 10); `decades` (1–6, default 4);
  `start_exponent`, the power of ten of the first decade (−3 to 9, default
  0); `subdivide` (the 2–9 lines); `magnitude` range — `minus60_plus20`,
  `minus40_plus40`, `minus80_plus20`, `minus100_plus20` (every 10 dB),
  `minus20_plus20` (every 5 dB), `minus120_plus40` (every 20 dB);
  `phase` range — `minus180_plus90`, `minus180_zero`, `minus270_zero`,
  `minus360_zero`, `minus180_plus180` (every 45°), `minus90_plus90`,
  `minus90_zero` (every 15°); `reference_lines` (0 dB and −180° heavy);
  `labels`; `frequency_labels` (`powers`, `si`, `none`); `unit` in the
  frequency title (`hz`, `rad_per_sec`, `none`); `ink` (default blue);
  `weight` of the finest lines (0.05–1; labelled lines 1.5×, decades, the
  border and the reference lines 3×).
- **Generation:** the two grids share the same left and right edges and
  split the height equally, with room between them for a second row of
  decade numbers. The frequency value v · 10^e sits log10(v) of a decade
  from the decade line 10^e. Each linear grid runs exactly from its bottom
  to its top value; between labelled lines it adds the finest step that
  divides the labelled one (1, 2 or 5 dB; 5 or 15 degrees) and keeps lines
  1.2 mm apart. Value labels are placed ends first, then zero, then each
  step, only where they clear the grids and each other.
- **Solving:** nothing to solve — a page to plot on. The seed is unused:
  every seed gives the same sheet.
- **Guarantees:** decade lines are equally spaced and the 2–9 lines sit at
  log10 of their decade (checked to 1e-9 pt); both grids share one
  frequency axis; each linear grid's labelled lines are exactly one step
  apart and its minor lines at least 1.2 mm apart; the magnitude grid is
  above the phase grid; all ink stays inside the margins and labels clear
  the grids and each other — checked on every page size, orientation,
  range preset, decade count and margin extreme. A knob outside its range
  is clamped and the request recorded as `requested_<field>` in the meta.

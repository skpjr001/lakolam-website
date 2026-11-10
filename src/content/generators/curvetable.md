---
title: "Curve Tables"
blurb: "Curve tables: a grid of Lissajous figures, roses and trochoids, one frequency ratio per cell, with the oscillators that draw them"
category: design
version: "1.0.0"
---
A grid of curves, one for every pair of frequencies: Lissajous figures,
roses and rolling-circle loops, with the turning circles that draw them.

## What it is

A table of curves. Along the top runs a row of circles, each with a point
going round it at its own speed — once, twice, three times … per cycle; down
the side runs a column of the same. Every cell of the table holds the curve
you get by combining its column's motion with its row's. In a Lissajous
table the column point gives the curve's left-and-right movement and the row
point its up-and-down, and faint lines drop from each circle's point down
its column and across its row: wherever two lines meet, there is the
current point of that cell's curve. The picture is a moment frozen from the
famous animated curve tables.

The same table can hold *rose curves* (petalled flowers r = cos(k·θ) with
k the column number over the row number), *hypotrochoids* (two arms turning
opposite ways, the loops of a spirograph inside a ring) or *epitrochoids*
(two arms turning the same way, loops outside). Or the cells can be laid
out one per simple ratio, 1:2, 1:3, 2:3 … in increasing order, each
labelled.

## How to use it

Read the table like a multiplication square. Pick a column and a row: the
cell where they meet combines the two speeds. Cells on the diagonal (equal
speeds) give the simplest shapes — a circle, an ellipse or a single loop.
Cells whose speeds share a factor (2 and 4, 3 and 6) repeat a simpler cell:
with colouring by ratio they share its colour, so you can see the same
ratios lining up along straight lines from the corner. Count the lobes of a
Lissajous figure along its top edge and its side: they are the column and
row numbers. The light page prints well as a poster or a classroom sheet;
the dark one is the look of the original oscilloscope pictures.

## Purpose

To show, all at once, how a single rule produces a whole family of shapes,
and how a shape depends on the ratio of two frequencies rather than the
frequencies themselves. It is a picture of musical intervals (2:3 is a
fifth, 3:4 a fourth), of how an oscilloscope compares two signals, and of
how epicycles build complicated orbits from circles.

## History

Nathaniel Bowditch studied the figures traced by a compound pendulum in
1815; Jules Antoine Lissajous made them visible with light reflected from
mirrors on two vibrating tuning forks and published his study in 1857,
including tables of the figures for the musical intervals at different
phases. They became a standard way to compare frequencies on the cathode-ray
oscilloscope. The rose curves are Guido Grandi's *rhodonea* (letters of
1723–1728). Curves traced by a circle rolling on a circle — epicycloids and
hypocycloids, and the trochoids traced by a point on an arm — were studied
by Albrecht Dürer (1525), Ole Rømer (1674) and Philippe de La Hire, and the
epicycles of Hipparchus and Ptolemy model planetary motion with circles on
circles. Arranging such curves as a table of frequency ratios, with the
generating oscillators along the edges, is a familiar demonstration of
animated mathematics. The Farey sequence of fractions was described by John
Farey in 1816 (and by Charles Haros in 1802).

## This implementation

- **Spec knobs:** `width`, `height` (points, 200-3000); `kind`
  (`lissajous` — the default —, `rose`, `hypotrochoid`, `epitrochoid`);
  `ordering` (`grid`: frequencies 1 to size on each axis with oscillator
  headers; `farey`: every reduced ratio p:q ≤ 1 with q ≤ size, ascending,
  labelled); `size` (3-12, default 6); `phase` (degrees, 0-360, default 90:
  shifts the Lissajous x oscillator, turns roses, starts the trochoid's
  second arm); `colouring` (`ratio`, `consonance`, `rainbow`, `mono`);
  `paper` (`dark`, `light`); `guides` (oscillator points, construction lines
  and current points, default on); `caption`; `stroke` (0.2-4).
- **Generation:** cell (p, q) draws a Lissajous figure `(sin(pt + φ),
  sin(qt))`, a rose `cos(ps)·(cos(qs + φ), sin(qs + φ))` (k = p/q), or a
  two-arm trochoid `(e^{ipt} + 0.6·e^{∓iqt + iφ}) / 1.6`, scaled to 0.4 of
  the cell. The period comes from the ratio: with g = gcd(p, q), 2π/g for
  Lissajous figures and trochoids; π/g for a rose whose reduced p and q are
  both odd, else 2π/g. Each curve is sampled over exactly one period
  (48 samples per unit of (p + q)/g, plus 96) and closed. The seed sets the
  frozen moment τ: the header circles show each oscillator's point at τ,
  Lissajous tables draw the construction lines from them, and roses and
  trochoids show their turning arms in each cell; every cell marks its
  current point. Farey order uses the next-term recurrence of the Farey
  sequence.
- **Guarantees:** deterministic per seed; every curve closes exactly after
  its computed period and not before — tested for every kind, every p, q
  in 1-12 and several phases against an independent formula (complex
  exponentials), including that no shift by T/2, T/3, T/5, T/7 or T/11
  repeats it; every curve lies inside its cell (tested); in a Lissajous
  table the construction lines meet each cell's current point exactly
  (tested); Farey order is ascending, reduced and complete (tested against
  Σφ(k)). Meta records each cell's ratio and period and the largest
  closure error measured. `verification: closed_by_rational_period;
  inside_cells`. Clamped knobs are reported as `requested_<field>`.

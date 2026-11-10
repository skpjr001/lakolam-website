---
title: "Pendulum Wave"
blurb: "Pendulum waves: a row of pendulums tuned to drift through travelling waves, standing waves and group splits, realigning once a cycle"
category: design
version: "1.0.0"
---
A row of pendulums tuned so their swings drift apart and come back together:
travelling waves, standing waves, snakes in two, three and four strands, and
then, exactly once a cycle, a single straight line again.

## What it is

Hang a row of pendulums of slightly different lengths and let them go
together. The longest one swings, say, 51 times a minute; the next is a
little shorter and swings 52 times; the next 53; and so on down the row.
At first they move as one, then the faster ones creep ahead and the row
becomes a gentle travelling wave, then a tighter one. Half way through the
cycle every other pendulum is on the opposite side: a zig-zag. At a third
of the cycle the row splits into three interleaved snakes, at a quarter
into four. In between it looks like pure chaos. And at the end of the
minute every pendulum has made a whole number of swings, so they are all
back where they started, in a straight line.

The page shows the dance in one of three ways:

- **Time strip** — snapshots of the row stacked down the page, the first
  moment at the top and the last at the bottom. Each snapshot is a row of
  bobs joined by a smooth curve, seen from above. The moments of exact
  pattern (halves, thirds, quarters, sixths of the cycle) are shaded and
  labelled.
- **Spacetime map** — one narrow column per pendulum, time running down in
  three panels, each column coloured by where its bob is in its swing. The
  waves show up as sweeping diagonal stripes and moiré.
- **Rig** — the apparatus itself in a three-quarter view at one chosen
  moment, each bob trailing faint ghosts of where it just was, with a
  line through the bobs to show the shape of the wave.

## How to use it

Read the time strip from the top. The first row is a straight line; follow
the curves down and watch the wave tighten until the row at "1/2" is a
perfect zig-zag, then loosen again until the last row is straight. Look at
the rows labelled 1/3 and 2/3: every third bob lines up, three strands
woven together. In the spacetime map, the stripes lean one way in the first
third and the other way in the last; the middle panel is the busiest part
of the dance. The small arrow marks the moment the rig view shows. Pin it
up beside a real pendulum wave, or use it to plan building one: the page
lists each pendulum's length.

## Purpose

A poster of a famous physics demonstration that shows its whole hidden
order on one sheet: the patterns that flash by in a video become rows and
stripes you can study, count and compare with the arithmetic that makes
them.

## History

Richard E. Berg described the apparatus as a lecture demonstration in
"Pendulum waves: A demonstration of wave motion using pendula", *American
Journal of Physics* 59, 186 (1991). James A. Flaten and Kevin A. Parendo
explained the patterns as aliasing — the row of pendulums samples one
underlying wave at fixed points — in "Pendulum waves: A lesson in
aliasing", *American Journal of Physics* 69, 778 (2001). The version
most people know is the Harvard Natural Sciences Lecture Demonstrations
rig: fifteen pendulums, a 60-second cycle, the longest making 51 swings and
each shorter one a single swing more, which is this page's default.

## This implementation

- **Spec knobs:** `width`, `height` (points); `view` (`strip`, `spacetime`,
  `rig`); `pendulums` (12-24, default 15); `swings` (the longest pendulum's
  swings per cycle, 10-100, default 51; each next one makes one more);
  `cycle_seconds` (10-600, default 60; sets the printed times and the real
  lengths); `rows` (snapshots in the strip, 12-96, default 24);
  `amplitude` (swing angle in degrees, 5-40, default 20; the wave height in
  the strip); `moment` (fraction of the cycle, 0-1, default 1/3: the rig's
  moment, an arrow in the other views); `trails` (rig ghosts, 0-12);
  `palette` (`auto` — a colour scheme drawn by the seed — `dusk`,
  `ocean`, `ember`, `ink`); `marks` (shade and label the pattern moments);
  `stroke`.
- **Generation:** pendulum `k` has period `T_k = Γ / (N₀ + k)` and length
  `g (T_k / 2π)²`, and moves as `θ_k(t) = A cos(2π (N₀ + k) t / Γ)` — the
  small-angle motion the tuning is built on. The strip draws the moments
  `t = Γ·j/rows`, so with a multiple of 12 rows every half, third, quarter
  and sixth of the cycle is a row; each snapshot is a Catmull–Rom curve
  through the bobs. The spacetime map cuts each column into exact phase
  bands (eight per swing, edges at `t = Γ (c + b/8) / (N₀ + k)`),
  coloured by bob position. The rig is an orthographic three-quarter view
  of the real lengths, fitted to the page, with ghosts at earlier moments
  and floor shadows.
- **Guarantees:** deterministic per seed (the seed only picks the `auto`
  colours). At a moment `t = Γ·p/q` the phase of pendulum `k` is
  `((N₀ + k)·p mod q) / q` turns, computed in integers: every pendulum is
  back at its start at `t = Γ` (tested, exactly, for every row size and
  `N₀`, and in floating point too), and at `t = Γ·p/m` (`p/m` in lowest
  terms) the row falls into exactly `min(n, m)` groups (tested for every
  `m` up to 30, and independently by clustering the floating-point bob
  angles). The page's `moments` meta lists each labelled moment with its
  group count. All ink lies inside the page (tested for every view and
  palette at extreme sizes). `verification:
  realigns_at_cycle_and_group_counts_match_theory`. Clamped knobs are
  reported as `requested_<field>`.

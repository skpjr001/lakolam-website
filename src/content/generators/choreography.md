---
title: "Three-Body Dances"
blurb: "Three-body dances: the figure-eight and the Šuvakov–Dmitrašinović butterflies, moths and yin-yangs, integrated over exactly one period"
category: design
version: "1.0.0"
---
Three equal stars that dance forever: the figure-eight, the butterflies, the
moths and the yin-yangs, each traced over exactly one turn of its dance.

## What it is

The three-body problem has no general solution — most starts end with one
star flung away — but a few special starts repeat forever. In the
**figure-eight** all three stars chase each other round one eight-shaped
track. In 2013 Milovan Šuvakov and Veljko Dmitrašinović found thirteen new
families by computer search and named them after the shapes they make in a
more abstract picture of the motion: butterflies, moths, a bumblebee, a
dragonfly, goggles, yarn and yin-yangs. Each page draws one or more of
these orbits, the paths of the three stars over one full period, starting
and ending in the same place.

## How to use it

Hang it, colour it, or study it. Each colour is one star; the small dots
mark where the three start (and, one period later, end). On a **beads**
page the dots are spaced at equal moments, so where they bunch up a star is
moving slowly and where they spread out it is racing through a close
encounter. On a **ribbon** page each thin triangle joins the three stars at
one moment: the envelope the triangles weave is the dance's shape. A
**rotating** page shows the same dance seen by an observer who turns with
it a whole number of times per period, which folds the paths into a
rosette. Pencil and fineliner shading between the crossings works well on
the black-and-white version.

## Purpose

A design-lane generator that is also an honest piece of physics: every
orbit on the page is integrated from its published starting values and is
checked to return to its start after one period. It sits beside the
harmonograph and the attractors as a page whose beauty comes from an
equation rather than from a drawing hand.

## History

Cris Moore found the figure-eight numerically in 1993; Alain Chenciner and
Richard Montgomery proved it exists in 2000 (*Annals of Mathematics* 152),
and Carles Simó computed the initial values used here. Milovan Šuvakov and
Veljko Dmitrašinović published thirteen new periodic families in
*Physical Review Letters* 110, 114301 (2013; arXiv:1303.0181), with a
gallery that made the "three-body zoo" famous. Hundreds more have since
been found by Li and Liao (2017) with high-precision searches.

## This implementation

- **Spec knobs:** `layout` (single, gallery), `orbit` (auto or one of 14),
  `look` (auto, trails, beads, ribbon, rotating), `palette` (auto, nocturne,
  jewel, ember, ocean, ink), `count` (gallery size, 1–14), `ticks`
  (equal-time steps per period, 12–360), `line`, `labels`, `width`,
  `height`, `margin`.
- **Generation:** masses 1, G = 1, no softening. Adaptive Dormand–Prince
  5(4) at relative tolerance 1e-12 integrates exactly one period, segment
  by segment so the equal-time ticks land exactly; each path is drawn as
  cubic Bézier pieces whose control points come from the velocities at
  both ends (exact Hermite interpolation), so it stays smooth at any size.
  The Šuvakov–Dmitrašinović values are published to six digits, which
  misses closure by up to 1.5 % for the most sensitive orbits; the table
  holds the same orbits refined by Gauss–Newton shooting on `(p1, p2, T)`
  to about 1e-10 (a test checks the refined values stay within 5e-4 of the
  published ones). The rotating look turns the frame by
  `2π · spin · t / T` (spin ±1–3, picked by the seed), so the curve still
  closes. A wide orbit in a tall cell is stood on end. The seed picks the
  orbit, look, palette, spin and the gallery's order.
- **Solving:** Nothing to solve.
- **Guarantees:** every orbit in the table returns to its starting
  positions and velocities after one period to better than 1e-6 of its
  size (tested; the page's meta reports each orbit's closure defect);
  energy is conserved to 1e-8 over the period; total momentum is zero; the
  figure-eight is a true choreography (after a third of a period each star
  is where another began); all ink stays on the page; deterministic per
  seed.

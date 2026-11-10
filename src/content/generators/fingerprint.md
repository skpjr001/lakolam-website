---
title: "Fingerprints"
blurb: "Fingerprints: friction ridges grown from an orientation field — loops, whorls, arches and tented arches"
category: design
version: "1.0.0"
---
Friction ridges grown along an orientation field: arches, tented arches,
loops, whorls, double loops and central pockets, with their own ridge endings
and forks.

## What it is

A fingertip print, drawn ridge by ridge. Every fingerprint is organised by a
few special places where the ridge flow turns: a *core*, at the heart of a
loop, where ridges turn back on themselves, and a *delta*, a little triangle
where three ridge directions meet. How many there are, and where, gives the
pattern class. An arch has none: ridges run in one side, rise over the middle
and run out the other. A tented arch pushes them up into a sharp point over a
delta. A loop has one core and one delta: ridges come in from one side, turn
round and leave the same way; an *ulnar* loop opens towards the little
finger, a *radial* loop towards the thumb. Whorls have two of each: circles
or spirals in a *plain whorl*, two loops wrapped round each other in an S in
a *double loop*, and a small whorl tucked inside a loop in a *central pocket*.
Between them, ridges end and fork where the flow squeezes them, just as on a
real finger. The page shows one large print in bright contour colours, as an
inked impression on card, or as plain black ridge lines.

## How to use it

Pick a pattern, or leave it on automatic and the patterns come up about as
often as they do on real hands — mostly loops, then whorls, now and then an
arch. The contour colour pages make posters and cards; the inked ones look
like a print taken on a fingerprint card, with pores, uneven pressure and a
fading edge. The plain-line page is good for colouring along the ridges, or
as a starting point for a "find the forks and endings" game: look for places
where one ridge splits into two, and where a ridge simply stops. Fewer
ridges across the finger give a bolder, simpler print; more give a fine,
lifelike one.

## Purpose

To show how a whole fingerprint follows from a handful of points: once the
cores and deltas are placed, the direction of every ridge is fixed, and the
ridge endings and forks fall where the flow converges.

## History

Fingerprint patterns were first sorted by Jan Evangelista Purkyně, who
described nine types in his 1823 thesis in Breslau. William Herschel used
handprints on contracts in Bengal from 1858, and Henry Faulds proposed
identification by fingerprints in a letter to *Nature* in 1880. Francis
Galton's *Finger Prints* (1892) set out the three families — arches, loops
and whorls — and the small ridge features (endings, forks, islands) still
called *Galton details* or minutiae. In Argentina Juan Vucetich built a
working classification in 1891–96, and in Bengal Edward Henry, with Azizul
Haque and Hem Chandra Bose, devised the system Henry published as
*Classification and Uses of Finger Prints* (1900), adopted by Scotland Yard
in 1901; it is where the names tented arch, ulnar and radial loop, double
loop and central pocket loop come from. The idea of describing the ridge
flow by its singular points goes back to Kawagoe and Tojo's Poincaré-index
method (1984); B. G. Sherlock and D. M. Monro, "A model for interpreting
fingerprint topology", *Pattern Recognition* 26 (1993), wrote the whole
orientation field down from the cores and deltas alone — the zero-pole model
used here, also the basis of synthetic-fingerprint generators such as
Cappelli, Maio and Maltoni's SFinGe (2000). The evenly spaced ridge tracing
is B. Jobard and W. Lefer's streamline method (1997).

## This implementation

- **Spec knobs:** `width`, `height` (points, 200–3000); `pattern` (`auto`,
  `plain_arch`, `tented_arch`, `ulnar_loop`, `radial_loop`, `plain_whorl`,
  `double_loop`, `central_pocket`; auto weights the classes roughly as real
  fingers do); `style` (`contour` colours, `ink` impression, `lines`);
  `palette` for the contour style (`auto`, `spectrum`, `ember`, `ocean`,
  `aurora`); `ridges` across the fingertip (16–80); `forks`, the chance a
  squeezed ridge joins its neighbour instead of ending (0–1); `ridge_width`
  as a share of the spacing (0.15–0.85). Loops are drawn as on a right-hand
  print (ulnar opens to the right).
- **Generation:** cores and deltas are placed for the class with seeded
  jitter, and the orientation is `θ = θ∞ + ½Σ arg(z − core) − ½Σ arg(z −
  delta)` (Sherlock–Monro), plus a smooth single-valued "dome" term that
  bends the ridges above the pattern into arcs following the fingertip. The
  plain arch has no singular point: its ridges are level lines of a potential
  `y − h·exp(−x²/2σ²)·exp(−(y−y₀)²/2τ²)` with `h < τ√e`, so the slope never
  turns over. Ridges are evenly spaced streamlines of the line field
  (Jobard–Lefer seeding at one spacing either side of every ridge, then a
  sweep that fills any gap 1.5 spacings wide), traced with a midpoint rule
  that keeps each step's direction nearest the last, inside an egg-shaped
  fingertip outline. A ridge that runs within 0.6 spacings of another stops:
  a ridge ending, or with chance `forks` it is joined to the point it ran
  into, a bifurcation. Whorl rings that come back to their start close. The
  ink style varies the width with pressure noise, breaks ridges at dry specks,
  adds pores and fades at the rim; the contour style colours each stretch of
  ridge by its distance from the core.
- **Guarantees:** deterministic per seed. The singular points match the
  class: a Poincaré-index scan of the whole fingertip (orientation steps
  wrapped into (−π/2, π/2], the scan grid moved if an edge passes too near a
  singular point) finds exactly the class's cores (+½) and deltas (−½) or the
  points are placed again; the tests re-check each point with a fine circle,
  a second grid, and the zero total round the rim. No two ridges cross and no
  ridge crosses itself (tested segment by segment); ridges keep at least the
  stop distance apart except where a fork joins; no point well inside the
  fingertip is more than 0.9 spacings from a ridge (tested on every class).
  Meta lists cores, deltas, their page positions, the scan's counts and the
  minutiae (ridge endings, bifurcations, short ridges);
  `verification: poincare_index_matches_class_ridge_spacing_no_crossings`.
  The line style reports the colourability check. Clamped knobs are reported
  as `requested_<field>`.

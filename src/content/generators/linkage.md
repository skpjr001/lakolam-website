---
title: "Linkages"
blurb: "Linkages: the curves traced by mechanical linkages — four-bar coupler curves, Watt, Chebyshev, Jansen's Strandbeest leg, Peaucellier–Lipkin"
category: design
version: "1.0.0"
---
The curves that machines draw: four-bar coupler curves, Jansen's walking
leg and the straight-line mechanisms, solved exactly through a full turn.

## What it is

A linkage is a set of rigid bars joined by pins. Fix two pins to the
ground, turn one bar round, and every other point of the machine is forced
along a path. The simplest linkage that does anything interesting is the
*four-bar*: a turning crank, a rocker, and a *coupler* joining their ends.
Points carried on the coupler trace an astonishing range of closed curves —
ovals, teardrops, figure-eights, curves with long nearly straight runs and
sharp cusps — and engineers have used them for two centuries to make
machines feed film, walk, stamp and stitch.

The page is drawn like an engineering plate: the mechanism in solid line,
faint ghosts of it at other moments of its cycle, and the traced curves in
colour. The *atlas* plate shows several four-bars of different
proportions, each with a family of curves from a grid of points on its
coupler, dashed so that each dash is the same turn of the crank: long dashes
where the point moves fast, short ones where it slows. *Hero* shows one
four-bar large. *Jansen* shows Theo Jansen's Strandbeest leg pair, whose
feet trace a flat-bottomed stride. *Straight line* shows four answers to an
old engineering problem — how to make a point move in a straight line using
only pins and bars.

## How to use it

Read a curve by following its dashes: where they are long the point is
moving quickly, where they bunch up it nearly stops — a useful dwell in a
machine. The four numbers under each atlas linkage are its proportions,
crank : coupler : rocker : ground, so you can build any of them from card,
split pins and a drawing pin: the crank is the bar marked 1. On the
straight-line page, find the stretch of each curve that runs straight:
Watt's and Chebyshev's are very nearly straight over part of the motion;
Peaucellier's is exactly straight. The pages make striking prints for a
workshop, classroom or maker space, and the blueprint palette looks the
part on a wall.

## Purpose

To show what a few bars and pins can do, and to draw it truthfully: every
position is solved from the bar lengths, every bar keeps its length
exactly, and every curve closes on itself after one cycle of the machine.

## History

James Watt patented his "parallel motion" in 1784 to guide the piston rod
of his beam engines, and later wrote that he was prouder of it than of any
other invention. Pafnuty Chebyshev studied how nearly a linkage can follow a
straight line from the 1850s, and his approximate straight-line linkage
bears his name; the Hoekens linkage is one of its cognates (a different
four-bar that traces the same curve, as Samuel Roberts (1875) and Chebyshev
(1878) showed every coupler curve has three). Franz Grashof stated in 1883
when a four-bar's crank can turn fully round. The first linkage to draw an
exactly straight line was found by the French army engineer
Charles-Nicolas Peaucellier in 1864 and independently by Yom Tov Lipman
Lipkin in 1871; A. B. Kempe's lecture *How to Draw a Straight Line* (1877)
made it famous. In 1951 John Hrones and George Nelson published *Analysis
of the Four-Bar Linkage*, an atlas of some 7,000 coupler curves drawn as
dashed lines, which designers used for decades to pick a mechanism by eye.
The Dutch artist Theo Jansen began building his wind-walking Strandbeests
in 1990; he found the proportions of their legs — his "holy numbers" — by
an evolutionary search on a computer.

## This implementation

- **Spec knobs:** `width`, `height` (points); `mode` (`atlas`, `hero`,
  `jansen`, `straight_line`); `palette` (`auto` — chosen by the seed —
  `drafting`, `blueprint`, `ink`); `cells` (linkages on an atlas plate,
  2–20, default 6); `points` (coupler points traced, 1–25, default 9; in
  Jansen mode the foot plus up to five more joints); `ghosts` (ghosted
  positions, 0–12); `title`; `line` (weight, 0.2–4).
- **Generation:** each joint is the intersection of two circles about
  joints already placed (the bar lengths as radii); of the two
  intersections, the one nearest the previous position is kept, so the
  mechanism never snaps to its mirror assembly. For a four-bar the input's
  range comes from requiring the distance from the crank pin to the far
  ground pivot to stay between |coupler − rocker| and coupler + rocker: if
  that never binds the crank turns fully (a Grashof crank, sampled every
  1° or ½°), otherwise the input rocks between its limit angles, sampled
  out on one assembly branch and back on the other (they meet at the
  limits), with samples crowded towards the limits where the coupler moves
  fastest. Atlas linkages are seeded Grashof crank-rockers with the crank
  1 and the other bars 1.6–3.6, beating Grashof's sum by a margin; the hero
  is a crank-rocker four times in five, else a rocking linkage, and its
  subtitle says which (Grashof crank-rocker, Grashof double rocker or
  non-Grashof triple rocker). Coupler points sit on a lattice over the
  coupler plate. Jansen's leg uses his published proportions (crank 15,
  fixed pivot 38 across and 7.8 down, bars 41.5, 39.3, 40.1, 55.8, 39.4,
  36.7, 65.7, 49, 50, 61.9); the mirrored leg shares the same crank pin.
  The straight-line page draws Watt (arms 2, link 1), Chebyshev (ground 4,
  arms 5, link 2), Hoekens (crank 1, ground 2, rocker 2.5, coupler 5 with
  the rocker at its middle) and a Peaucellier–Lipkin inversor driven on a
  circle through its fixed pivot.
- **Guarantees:** at every sample every bar and every coupler-plate
  distance keeps its length to within 1e-6 (in practice ~1e-14), the
  ground pivots never move, no joint jumps between samples, and the last
  sample equals the first, so every curve is closed (all tested by an
  independent re-measurement of the frames; the page refuses to draw if
  the check fails). Peaucellier's point stays on its line to 1e-9 (tested;
  meta `peaucellier_line_deviation`). Hoekens', Chebyshev's and Watt's
  curves each contain a run longer than 0.3 of their longest bar that
  stays within 1% of a straight chord (tested). Grashof's condition and
  the motion (crank or rocker, with its range in degrees) are reported per
  linkage in meta, with `max_link_error`, `closure_error` and
  `verification`. Clamped knobs are reported as `requested_<field>`.

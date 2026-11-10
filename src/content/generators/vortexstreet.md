---
title: "Vortex Streets"
blurb: "Vortex streets and billows: Kármán streets behind cylinders and Kelvin–Helmholtz waves, drawn as smoke streaklines"
category: design
version: "1.0.0"
---
Smoke drawn through moving water: the rolling double row of eddies behind
a cylinder, two wakes locking together, cloud spirals behind an island, and
a shear layer curling into breaking billows.

## What it is

When a steady stream passes a round post, the flow behind it cannot stay
calm. Eddies peel off one side, then the other, in a steady rhythm, and
drift away downstream as two staggered rows of whirls turning in opposite
directions: a *vortex street*. Put a thread of smoke or dye in the stream
and it is wound into those whirls, which is how the famous laboratory
photographs were taken. The same street appears on a giant scale when wind
blows a cloud deck past a mountainous island, and a cousin of it, the
Kelvin–Helmholtz billow, forms wherever one layer of fluid slides over
another — a row of curling waves you can see in clouds at sunset.

Each page is one of these flows: a single cylinder (the classic street),
two cylinders side by side with their wakes interfering, an island seen
from orbit with the cloud deck streaming past it, or a shear layer rolling
up, with every dyed layer of the fluid shown in its own colour.

## How to use it

Print it as a poster or use it as a background: the dark palettes look like
a lit laboratory photograph, the paper palette like an engraving. The dye
lines are coloured by where they started, so you can follow one thread of
smoke from the rake on the left, round the cylinder and into a whirl. Try
the dye coming off the cylinder itself for the cleanest view of the whirls,
a wider or narrower street, stronger whirls that wind the smoke tighter, or
more or fewer smoke threads. Look for the two rows: whirls in the upper row
turn clockwise, those in the lower row anticlockwise.

## Purpose

To show a piece of real physics in the way it was first seen — as dye — and
to make it beautiful. Every curve on the page is the actual path of smoke in
a simulated flow, not a drawing of one.

## History

Leonardo da Vinci sketched the eddies behind obstacles in a stream around
1510. Vincenc Strouhal (1878) found that the tone of a wire singing in the
wind is set by the wind speed over the wire's thickness — the shedding
rhythm now measured by the Strouhal number. Henri Bénard photographed the
alternating eddies behind obstacles in 1908, and Theodore von Kármán (1911–
1912) showed that a double row of opposite vortices is stable only when the
rows' distance apart is about 0.281 of the spacing along each row, which is
close to what is seen. Hermann von Helmholtz (1868) and Lord Kelvin (1871)
explained the instability of one fluid sliding over another; S. A. Thorpe's
tilting-tank experiments (1971) and the mixing-layer photographs of G. L.
Brown and A. Roshko (1974) showed its billows in the laboratory, and Robert
Krasny (1986) computed a vortex sheet rolling up by giving its point
vortices a small smoothing radius, the method used here. Sadatoshi Taneda's
photographs of cylinder wakes are among the best known images in Milton Van
Dyke's *An Album of Fluid Motion* (1982). Island cloud streets were noticed
in early weather-satellite images (K. P. Chopra and L. F. Hubert, 1965) and
became famous in Landsat views of islands such as Guadalupe, Jan Mayen and
Alejandro Selkirk.

## This implementation

- **Spec knobs:** `width`, `height` (points, 200-3000); `mode` (`karman`
  default, `kelvin_helmholtz`, `two_cylinders`, `island`); `palette`
  (`aurora` default, `smoke`, `ember`, `paper`; the island has its own sea
  and cloud colours); `dye` (`rake` default, a smoke wire upstream, or
  `cylinder`, sources on the cylinder's shoulders; not used by the shear
  layer or the island's cloud deck); `streaks` (4-60, default 36: dye
  sources, twice that for the island's cloud deck, or dyed layers in the
  shear layer); `spacing_ratio` (h/a, 0.15-0.6, default 0.281); `strength`
  (0.5-2, default 1); `stroke` (0.2-4 pt, default 0.8).
- **Generation:** units are the cylinder diameter and the stream speed. The
  cylinder is a doublet in a uniform stream; vortex blobs (core radius 0.4
  diameters, growing with age like a viscous core) are shed alternately
  from either side every half period, top ones clockwise. The period is
  timed from the requested street spacing a (seeded, about 4 diameters)
  and the infinite street's self-induced speed, the rows are released a
  little wider than h = ratio × a because the cylinder's images draw fresh
  vortices in, and strengths, release points and the starting side are
  jittered by the seed. Every blob has a circle-theorem image of opposite
  strength inside the cylinder (two cylinders: first-order images in
  each), so the cylinder stays a streamline and carries the bound
  circulation. Vortices and dye particles move together under one
  fixed-step fourth-order Runge–Kutta scheme (dt = 0.08); a source releases
  a particle every step, and a source's particles in release order are its
  streakline, drawn as a smooth curve, coloured by source and shaded by
  release time and age. The island mode turns the flow, uses an even rake
  drawn as layered soft strokes for the cloud deck, and draws a seeded
  coastline inside the obstacle. The shear layer is Krasny's periodic,
  δ-regularised vortex sheet (160 blobs, two wavelengths with a seeded
  subharmonic), carrying passive material lines that gain points wherever
  they stretch, filled between as coloured strata.
- **Guarantees:** deterministic per seed with fixed steps; the integrator
  follows an exactly known co-rotating vortex pair (tested); circulation is
  conserved — free plus bound circulation is zero at every step and no
  vortex's strength changes after shedding (tested); streaklines are
  continuous — neighbours on a drawn line are never further apart than half
  a diameter and never fold back sharper than 120°: a line is split there
  instead, and pieces of fewer than four particles are left out (tested);
  the street measured downstream settles near the requested h/a (tested
  0.2–0.4 for the default 0.281, and wider when a wider ratio is asked);
  every line lies inside the page and all ink is clipped to it (tested).
  `verification: circulation_conserved_streaklines_continuous_ink_inside`.
  Clamped knobs are reported as `requested_<field>`.

---
title: "Tree Ring Slab"
blurb: "A sawn log end: climate-driven tree rings, a knot, a drying check, rays, bark and decade dots"
category: design
version: "1.0.0"
---
The sawn end of a log: a tree's whole life in rings, with the knot, the
crack and the bark that make it real.

## What it is

A cross-section of a tree trunk, the way a log looks after a clean saw cut.
Every year the tree adds one ring: pale, open *earlywood* grown in spring,
and a dark band of dense *latewood* in late summer. Young trees grow fast,
so the rings near the centre are wide; good and bad years make a pattern of
wide and narrow rings, with the narrowest marking droughts. The centre (the
pith) is often off-centre where the tree leaned. The slab shows a knot where
a branch grew out and the rings bent round it, a drying crack running in
from the bark, fine rays radiating from the pith, pale sapwood under the
bark around darker heartwood, and the rough bark itself. Optional pencil
dots count the decades the way tree-ring scientists do.

## How to use it

Count the rings to find how old the tree was — the dots help: one dot marks
every ten rings counted from the centre, two dots mark fifty, and three
mark a hundred. Look for runs of narrow rings (hard years) and wide ones
(good years), and see which side of the trunk grew faster. The colour pages
make striking prints; the black-and-white version is a colouring page in
which every ring is a band to fill, with heavier lines on every tenth ring.

## Purpose

Tree rings are a natural record of time and climate, and counting them is
a first experience of real data. The page is accurate in the details that
matter — one ring per year, rings that never cross, the decade-dot
convention — so it can be used to teach dating as well as to decorate.

## History

Leonardo da Vinci noted that rings record a tree's years and that their
width tracks wet and dry seasons. A. E. Douglass founded dendrochronology at
the University of Arizona in the early 20th century, cross-dating
sequences of narrow and wide rings to date ancient timbers. Marvin Stokes and
Terah Smiley's *An Introduction to Tree-Ring Dating* (1968) set out the
marking convention used here, and Harold Fritts's *Tree Rings and Climate*
(1976) the separation of ring width into an age trend and a climate signal.

## This implementation

- **Spec knobs:** `width`, `height` (page, points, 200–3000); `years`
  (1–300 rings, or 0 to let the seed choose 50–130); `irregularity` (0–1,
  how far rings wander from circles); `drought` (0–0.5, the share of years
  that are droughts); `knot`, `check`, `rays`, `decade_dots` (on/off);
  `style` (colour, lines); `wood` (auto, pine, oak, cherry, walnut, birch).
  Clamped values are reported as `requested_<field>` in meta.
- **Generation:** ring widths are a negative-exponential age trend times
  exp of an AR(1) climate index, with seeded drought years at 20–40% of
  normal growth (never two in a row) and a floor of a fifth of the mean.
  Every ring boundary is sampled on the same 480 rays from the pith:
  ρ_k(θ) = r_k (1 + E_k cos(θ − θ_e) + Σ_{j=2..6} A_j(k) cos(jθ + φ_j(k)))
  — the first harmonic grows with age and moves the pith off-centre
  (reaction wood), the higher ones grow and drift so old rings wander more.
  The latewood line sits 66–82% of the way across each ring. The knot opens
  a gap between two rings with the per-ray map r ↦ r + K(θ)·sign(r − D)·
  exp(−|r − D|/s), D the midline between the two rings, K fading with
  angle, K ≤ s. A final clamp holds every ring at least a quarter of the
  mean width outside the one before on every ray. The slab is scaled to fill
  the page with a margin. The check is a jagged V from the bark to 30–55%
  of the way in; rays are thin radial strokes avoiding the knot and the
  check; decade dots sit in the middle of each tenth ring along one radius
  drawn in pencil.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic per seed; exactly `years` rings; rings never
  cross (each is at least the minimum width outside the previous one on
  every ray, which for polylines on shared rays means no crossing anywhere);
  the knot lies wholly inside the gap the rings open for it; the decade dots
  follow the 1 / 2 (fifty) / 3 (hundred) convention counted from the pith,
  each inside its own ring; all ink is on the page; the line-art style
  reports the colourability check as `colorable`.

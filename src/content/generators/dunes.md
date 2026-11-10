---
title: "Dune Fields"
blurb: "Dune fields from the air: barchans, transverse ridges, linear and star dunes with wind ripples, grown by Werner's sand-slab model"
category: design
version: "1.0.0"
---
A desert seen from the air: crescent barchans, ridges across the wind,
long linear dunes and star dunes, grown grain-slab by grain-slab.

## What it is

Wind lifts sand from the gentle windward (stoss) side of a dune, carries
it over the crest and drops it in the still air behind, where it piles up
until it slides down a steep slip face. Repeat that for long enough and the
shape of the dunes tells you the winds. One steady wind over scarce sand
makes barchans — crescents whose horns point downwind, crawling across
bare ground. The same wind over plenty of sand makes transverse ridges at
right angles to it. Two winds blowing from far apart make long linear
(seif) dunes that run along between them, and winds from all round the
compass pile the sand into star dunes with arms reaching out from a peak.
The page is a view from straight above, the sun low: windward slopes lit,
slip faces in shadow, sharp crest lines where one meets the other, and fine
wind ripples combed across the windward slopes.

## How to use it

Use the colour pages as prints, backgrounds or covers: golden Sahara sand
over dark gravel plains, white gypsum sand with blue shadows, or red Namib
sand over pale clay pans. Pick a dune type, then play with the sand supply
— less sand breaks a field into separate dunes, more sand joins them into
ridges — and with the wind direction to turn the whole field on the page.
Running the wind longer lets dunes grow and merge. The line palette draws
the dunes as a contour map with bold crest lines, good for tracing,
colouring or teaching how dunes are shaped.

## Purpose

Dunes that are made, not drawn: every dune on the page grew out of the
same simple rules for moving sand, so their shapes — the barchan's horns,
the steep lee face, the bare ground between — are the shapes the rules
produce, as in the real desert.

## History

Ralph Bagnold's *The Physics of Blown Sand and Desert Dunes* (1941) founded
the study of how wind moves sand; the word "barchan" was brought into
science by the naturalist Alexander von Middendorf (1881) from the Turkic
name for the crescent dunes of Central Asia. Edwin McKee's *A Study of
Global Sand Seas* (US Geological Survey, 1979) classified dunes into the
types used here. In 1995 Bradley T. Werner showed ("Eolian dunes: computer
simulations and attractor interpretation", *Geology* 23) that a cellular
model in which slabs of sand hop downwind, stick more readily on sand than
on bare ground, rest in the wind shadow of dunes and avalanche when too
steep, reproduces barchan, transverse, linear and star dunes from the wind
regime and sand supply alone. David Rubin and Ralph Hunter (*Science*,
1987) explained why dunes under two winds align to maximise the sand
carried across their crests. Real examples: barchans in Egypt's Kharga
Depression and Peru, transverse dunes at White Sands in New Mexico (gypsum),
star dunes at Sossusvlei in the Namib, linear dunes in the Namib and the
Simpson Desert.

## This implementation

- **Spec knobs:** `width`, `height` (points, 200-3000); `mode` (`barchan`,
  `transverse`, `linear`, `star`; default `barchan`); `palette` (`sahara`,
  `gypsum`, `namib`, `lines`; default `sahara`); `grid` (cells per side of
  the simulation, 64-256, default 200); `steps` (sweeps of the model,
  0-1000, default 300); `supply` (mean slabs per cell, 0.2-8; empty means
  the mode's own: 1.5 barchan, 5 transverse, 3 linear, 2 star); `wind_deg`
  (direction the main wind blows toward on the page, degrees clockwise from
  page right, 0-360; empty means chosen by the seed); `ripples` (draw wind
  ripples, default on).
- **Generation:** Werner's slab model on a periodic grid. The starting
  sand — exactly `round(supply × grid²)` slabs — is scattered evenly, with
  a mode-dependent share (barchan 30%, transverse none, linear 30%, star
  95%) gathered into loose heaps, then avalanched stable. A sweep is
  `grid²` events: pick a random cell; if it holds sand and is not in a
  wind shadow (some upwind cell rises above the 15° line back from it,
  with slabs a third of a cell high), lift a slab and hop it 3 cells
  downwind until it sticks — always in a shadow, else with probability 0.6
  on sand and 0.4 on bare ground. After each lift and each landing the pile
  avalanches: while two 4-neighbours differ by more than 2 slabs (about
  34°, the angle of repose), a slab moves down the steepest drop, and
  every cell whose height changed, with its neighbours, is checked again.
  Barchan and transverse modes use one wind; linear alternates two winds
  140° apart every 6 sweeps; star cycles three winds 120° apart every
  sweep. The heights are blurred, sampled on the page through the wind
  rotation, and hill-shaded with the sun low over the upwind side; the
  shade is cut into six tone bands, clipped to the sand (smoothed height
  above 0.45 slab) over specked bare ground. Crest lines are the brinks:
  where the downwind fall reaches 0.9 slab per cell and is still growing
  downwind, on dunes over 1.5 slabs high, for each wind of the regime.
  Ripples are wavy lines across the main wind, spaced 0.7 cell, kept where
  the ground rises gently into the wind. The line palette draws contours
  every two slabs and the sand edge, plus crest lines.
- **Guarantees:** deterministic per seed for a fixed step count. Mass is
  conserved: the total number of slabs equals the starting supply after
  every sweep (tested on every mode, sweep by sweep, and reported as
  `mass_conserved`). No slope is steeper than the angle of repose: every
  pair of 4-neighbours differs by at most 2 slabs after every sweep
  (tested with an independent neighbour scan, and reported as
  `repose_ok`). Shadows fall only downwind and within the 15° line
  (tested). One wind over little sand leaves more bare ground than over
  plenty (tested). All ink lies inside the page. `verification:
  mass_conserved_slopes_at_repose`. Clamped knobs are reported as
  `requested_<field>`.

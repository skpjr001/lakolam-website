---
title: "Haeckel Plates"
blurb: "Plates in the manner of Haeckel's Kunstformen der Natur — diatoms, lattice radiolarians and Müller's-law acantharians, numbered and framed"
category: design
version: "1.0.0"
---
Numbered plates of glassy microscopic life - diatoms, lattice-shelled
radiolarians and star-like acantharians - in the manner of Ernst Haeckel.

## What it is

Each page is a framed natural-history plate with a title and a plate
number, holding several numbered figures arranged symmetrically around a
large central one. The figures are invented, but they are built by the
rules that shape the real organisms:

- **Round (centric) diatoms**: rows of tiny pores run out from the centre;
  where two rows drift too far apart a new row starts between them. Some
  have raised and sunken sectors, some ribs joined by rings like a web.
- **Boat-shaped (pennate) diatoms**: a slit (the raphe) down the middle,
  and fine rows of pores fanning out to the edge.
- **Lattice radiolarians**: one to three glass spheres nested inside each
  other, pierced by hexagonal or round windows, often with radial spines.
- **Acantharians**: a coloured central capsule and exactly twenty spines,
  arranged by Müller's law.

Pages come in four colourings: gold on black, sepia on cream, sea-blue on
pale paper, and black line art for colouring.

## How to use it

- **Frame it.** The plates are made to hang, singly or as a series of
  numbered plates.
- **Colour it.** The line-art version leaves every shell, spine and valve
  open to colour; the pores make fine stippled texture.
- **Count the spines.** Every acantharian has twenty. Find the four around
  its middle (the equator), then the two rings of four above and below it,
  and the two small rings of four near the poles.
- **Look for symmetry.** Fold a diatom in half in your mind: its rows of
  pores match on both sides. Then look for the plate's own mirror line.
- **Compare with the real thing.** Look up Haeckel's plates of diatoms
  and radiolarians, or photographs taken with an electron microscope, and
  find the forms that inspired each figure.

## Purpose

Diatoms and radiolarians build skeletons of glass, and their geometry -
radial rows, hexagonal lattices, spines in exact positions - is some of the
most precise in nature. Seeing the rules drawn out makes a beautiful print
and a quiet lesson in how simple growth rules produce intricate form.

## History

Ernst Haeckel's *Kunstformen der Natur* ("Art Forms in Nature",
1899-1904) presented a hundred lithographic plates of organisms arranged
in symmetrical compositions; its plates of diatoms and radiolarians drew on
his *Report on the Radiolaria* from the Challenger expedition (1887). The
twenty-spine plan of acantharians was described by Johannes Müller (1858)
and is known as Müller's law. Pore-row insertion in centric diatoms and the
naviculoid valve are standard in diatom morphology (Round, Crawford and
Mann, *The Diatoms*, 1990). Haeckel's plates are in the public domain;
these pages are new compositions in that style, not copies of his figures.

## This implementation

- **Spec knobs:** `subject` (`auto` default, `diatoms`, `radiolaria`,
  `acantharia`, `mixed`), `figures` (1-25, default 9; a mirrored pair may
  add one), `arrangement` (`symmetric` default, `scattered`), `detail`
  (0.5-2: pore and stria density of diatoms and lattice shells), `numbers`,
  `title`, `frame` (`double` default, `single`, `none`), `palette` (`noir`
  default, `sepia`, `azure`, `ink`), `line` (0.1-3 pt), `width`, `height`,
  `margin`.
- **Generation:** the plate packs round slots: a large one near the
  centre, then each into the largest free hole on a 64-column grid (seeded
  jitter in the choice), mirrored about the vertical axis in the symmetric
  arrangement; then each slot (a pair together) swells into the free space
  around it. Mirrored pairs share a kind, kinds cycle through the
  subject's pool from a seeded start, and figures are numbered in reading
  order. A centric valve has primary rows at `2πk/N` (N even, about 1.6
  pore spacings apart at the central area); with `m` rows the gap at
  radius `r` is `2πr/m`, so new rows start midway at `r = 2s·m/2π`, where
  the gap reaches twice the pore spacing `s`, repeating level by level.
  A pennate valve has half-width `w(x)` (elliptic, lanceolate or
  capitate), striae at `x = ±(k + 1/2)·pitch` leaning radiate in the
  middle and convergent near the ends, mirrored across both axes, and a
  raphe with hooked ends. Lattice shells are Goldberg polyhedra (duals of
  geodesic spheres) or Fibonacci spheres, viewed orthographically; only
  front pores are cut, each pore's wall is the crescent between it and its
  inner mouth (the pore scaled by 1 - 0.07 about the centre), inner shells
  show through the pores, and spines (polar, octahedral, icosahedral or
  bristly) are drawn back to front. Acantharian spines follow Müller's law:
  latitudes 0°, ±30°, ±60°, four each, on meridians 45° apart - equatorial
  and polar spines on 0°, 90°, 180°, 270°, tropical spines on the 45°
  meridians - with optional side branches and a cage of great-circle arcs
  joining spines less than 56° apart. Spiny figures are enlarged until
  their longest projected spine reaches their disc. Bigger figures get
  finer pores, so pores keep a similar size on the page. The presets and
  shapes are ours.
- **Solving:** Nothing to solve.
- **Guarantees:** every acantharian has exactly 20 spines at Müller
  latitudes and longitudes (tested over many seeds); centric diatom pore
  rows are mirror-symmetric and no two live neighbouring rows are more
  than `2s` apart inside the rim; pennate striae are mirror-symmetric
  across both axes and stay inside the valve; slots are disjoint and
  inside the frame, and every point of a figure's ink lies in its own slot,
  clear of its number, so figures never overlap; the symmetric
  arrangement is an exact mirror; deterministic per seed; ink inside the
  page. `verification: muller_law_spines_mirror_striae_disjoint_figures`.
  Clamped `figures`, `detail` and `line` are reported as `requested_*`.

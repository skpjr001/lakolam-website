---
title: "Stained Glass"
blurb: "Stained glass — a rose window in lead and jewel-coloured glass"
category: design
version: "1.1.0"
---
A cathedral rose window: concentric rings of glass cut by heavy black lead
lines, around a central rosette. Colour the panes, or admire the jewel tones.

## What it is

A circular window divided by *cames* — the thick black lead lines — into rings
of glass, each ring cut into more panes than the ring inside it, all turning
about a central rosette of round "eyes". By default the panes are filled with
cathedral jewel colours; set it clear and it becomes a colouring page whose
heavy leading holds the colour beautifully.

## What to do with it

There is nothing to solve. It is a design — a print, or a colouring template.
The radial symmetry means whole wedges repeat, so a colourist can echo a
scheme around the ring.

## Purpose

One of the largest evergreen niches in the colouring world, and a distinct
addition to the design lane: not a random `voronoi` partition and not a
`mandala`'s line motifs, but architectural tracery — rings, spokes and a rose,
with the unmistakable weight of leaded glass.

## History

The rose window is a glory of Gothic architecture — Chartres, Notre-Dame,
Sainte-Chapelle — where radial stone tracery frames stained glass into a wheel
of light. The form has been a decorative and devotional staple for eight
centuries.

## This implementation

- **Spec knobs:** `petals` (inner-ring panes, 6–16), `rings` (3–6),
  `diameter`, `lead` (came width), `tinted` (jewel glass vs. clear for
  colouring), `bold` (a Bold & Easy colouring window, below).
- **Generation:** ring radii are laid from the rosette out to the rim; each
  ring is cut into `petals` panes (doubling to `petals × 2` in the outer
  rings), filled from a seeded jewel palette offset per ring so no two rings
  align, then the cames — rings, radial spokes, the rosette of eyes, and the
  heavy outer frame — are stroked over the glass.
- **Bold & Easy (`bold`):** a chunky window for crayons and markers, always
  clear. Two rings of four to six big panes (half of `petals`; the outer ring
  sometimes doubled) round a large rosette — oval petals or a scalloped
  flower about a hub. Each ring is plain panes, panes each holding a round
  roundel, or a band of fat beads with no cames; the seed chooses, and also
  turns and staggers the rings, so bold windows differ from seed to seed. One
  heavy came throughout: the diameter / 112, 5.7 pt on the default window
  (about 4.4 pt once fitted to a letter page). A roundel is drawn only where
  its clear glass is at least 280 mm². `rings` and `tinted` do not apply.
  Meta carries `bold`, `colorability_profile` (`kids`) and `colorable`, the
  kids' colourability check (regions of at least 200 mm², lines of at least
  1.5 pt, ink under 40%).
- **Guarantees:** deterministic per seed; every pane is a closed, colourable
  region; the window is radially structured by construction. A pure design
  generator — no puzzle, no answer key. Bold windows are tested on the
  rendered page: every patch of paper, the gaps round the jewels included,
  is at least 200 mm² at native size, across petal counts and seeds.

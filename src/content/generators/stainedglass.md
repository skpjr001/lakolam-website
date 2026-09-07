---
title: "Stained Glass"
blurb: "Stained glass — a rose window in lead and jewel-coloured glass"
category: design
version: "1.0.0"
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
  colouring).
- **Generation:** ring radii are laid from the rosette out to the rim; each
  ring is cut into `petals` panes (doubling to `petals × 2` in the outer
  rings), filled from a seeded jewel palette offset per ring so no two rings
  align, then the cames — rings, radial spokes, the rosette of eyes, and the
  heavy outer frame — are stroked over the glass.
- **Guarantees:** deterministic per seed; every pane is a closed, colourable
  region; the window is radially structured by construction. A pure design
  generator — no puzzle, no answer key.

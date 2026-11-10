---
title: "Ikat Cloth"
blurb: "Resist-dyed cloth in the manner of ikat — abr clouds, patola double ikat, kasuri crosses — with every thread shifted a little so the motif's edges feather and step"
category: design
version: "1.0.0"
---
Resist-dyed cloth in the manner of ikat — Central Asian abr clouds, Gujarati
patola, Japanese kasuri — where every motif edge feathers because the
threads were dyed before they were woven.

## What it is

A design in the manner of ikat. In ikat the pattern is not printed or woven
in: it is dyed into the threads first. Bundles of threads are tied tightly
wherever a colour must not reach, dipped in dye, re-tied and dipped again for
each colour, and only then set up on the loom. No thread lands exactly where
it was planned — each slides a little along its length — so the edges of the
motif come out stepped and feathered, like a flame or a soft blur. The page
shows the cloth thread by thread, with its fringe of warp ends. Three styles:
abr, with large flame-edged clouds in vivid colours on the lengthwise
threads only; patola, double ikat (both thread directions dyed) on a fine
grid, with stepped diamonds, latch hooks or rosettes in red, black and white
inside a border; and kasuri, indigo with small white crosses and well-curb
marks or arrow feathers.

## How to use it

Look closely at an edge: each thread stops at a slightly different place,
and its colour ends in a point. Then step back and the motif is clear and
exactly mirrored left to right and top to bottom — the blur is the only
irregularity. Compare a warp-only cloth with a double ikat: in the double
ikat both directions blur, so the edges step both ways.

## Purpose

A rich, glowing page about a remarkable way of making pattern: the design is
planned in the threads before any weaving starts, and the slight
imprecision of the process becomes its beauty.

## History

The name comes from the Malay and Indonesian *mengikat*, to tie or bind.
Ikat is made across the world — in Indonesia, India, Central Asia, Japan,
the Middle East and Latin America. In the oasis cities of Central Asia —
Bukhara, Samarkand and the Fergana Valley, notably Margilan — nineteenth-
century dyers and weavers made silk warp ikat called *abr*, from the Persian
for cloud, with bold blurred shapes in brilliant colours; the binders were
called *abrbandi*. In Patan, Gujarat, the patola sari is a double ikat in
silk, in which warp and weft are both tied and dyed so that their patterns
meet on the loom; patola were treasured trade cloths in Southeast Asia, and
the Salvi family of Patan still weave them. Double ikat is also made at
Tenganan in Bali. In Japan, kasuri is cotton ikat, usually indigo and white;
Kurume kasuri is traditionally said to have been begun around 1800 by a
young girl, Inoue Den, and small crosses, the well-curb (*igeta*) and arrow
feathers (*yagasuri*) are among its classic marks. This page invents its own
motifs in the manner of these traditions and copies no named cloth. See
Jack Lenor Larsen, *The Dyer's Art: Ikat, Batik, Plangi* (1976); Kate Fitz
Gibbon and Andrew Hale, *Ikat: Silks of Central Asia* (1997); and Rosemary
Crill, *Indian Ikat Textiles* (V&A, 1998).

## This implementation

- **Spec knobs:** `style` (abr, patola, kasuri), `motif` (auto = one of the
  style's own; diamonds, hooks, medallions, arrows, clouds, crosses),
  `weave` (auto = warp for abr, double for patola and kasuri; warp, double),
  `threads` (warp threads across, 60–360; 0 = the style's own: abr 144,
  patola 192, kasuri 168), `bleed` (largest shift of a thread along its
  length, in thread widths, 0–12; null = the style's own: abr 6, patola
  1.5, kasuri 2.5), `repeats` (motif repeats across, 1–8; 0 = by style and
  seed), `border`, `width`, `height`, `margin`.
- **Generation:** threads are tied in bundles (three for abr, two
  otherwise), and the design grid has one cell per bundle each way, so the
  cloth is a whole number of cells. A cell's ink comes from its distance to
  the two centre lines — the design is folded about both, so it is
  mirror-symmetric by construction — then folded into a tile (with a
  half-drop second motif for most motifs) and read from the motif: banded
  L1 diamonds, a diamond outline with latch hooks, scalloped ring
  medallions, arrow-feather chevron columns, metaball clouds stretched along
  the warp with flickering edges, or kasuri crosses and well-curbs; a border
  band (with a stepped-diamond chain for patola) runs along the sides, and
  for patola across the ends too. Each warp thread reads its column as runs
  of one ink, merged across equal cells; the whole thread is shifted by a
  bundle wave and jolt plus a little of its own, clamped to the bleed; each
  run ends in pointed tongues reaching half a taper into its neighbours.
  Double ikat dyes the weft rows the same way and draws them under narrower
  warp threads, so both show.
- **Guarantees:** deterministic per seed; `verification:
  design_mirror_symmetric_shift_within_bleed_runs_at_least_one_bundle`.
  Tested: the design rebuilt from the threads' own runs is the same mirrored
  left–right and top–bottom (and the weft carries the same design as the
  warp); no thread shifts more than the bleed (and none at bleed 0); every
  run is at least one bundle (two or three threads) long, runs tile each
  thread without gaps and neighbouring runs differ, so no colour appears as
  a lone speck; all ink stays on the page for every style, motif and weave.
  Meta records the largest shift and shortest run actually used, and any
  clamped value as `requested_<field>`.

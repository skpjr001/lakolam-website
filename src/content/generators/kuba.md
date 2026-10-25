---
title: "Kuba Raffia Cloth"
blurb: "A raffia cloth in the manner of Kuba embroidery: line bands and cut-pile tufts in repeats that deliberately break off at seams"
category: design
version: "1.0.0"
---
A raffia cloth in the manner of Kuba embroidery: dark stitched lines and
plush cut-pile tufts in repeats that break off where you least expect.

## What it is

A design in the manner of the raffia textiles of the Kuba peoples, and in
particular the embroidered and cut-pile cloths of the Shoowa. On a coarse
woven ground, dark embroidered bands draw a geometric pattern — nested
diamonds, chevrons, a running meander, interlocking hooks, crossing double
lines — and small square patches of plush pile fill the spaces in two
colours. Each pattern repeats for a while and then, at a seam, switches to
another motif, another scale or a shifted copy of itself before the repeat
is complete. With no breaks the cloth is one perfect repeat.

## How to use it

Find the seams: where does one pattern stop and the next begin, and what
changed — the shape, the size, or only the position? Then try to continue a
pattern across its seam in your head. To colour it, choose the line-art
palette: the stitched bands are drawn, and the pile patches are outlined
for you to fill.

## Purpose

A page about rules and the pleasure of breaking them: a lesson in repeat
patterns, symmetry groups and deliberate interruption.

## History

The Kuba kingdom of the Kasai region in the Democratic Republic of the Congo
is famous for its raffia textiles. Men weave the raffia palm-fibre ground on
single-heddle looms; among the Shoowa, women embroider it with dark lines
and cut pile, a technique in which short tufts are pulled through and cut
flush, giving a velvet texture. Kuba designs are known for their abrupt
shifts — patterns that change mid-repeat — which have fascinated
mathematicians and artists alike. This page is a geometric grammar in the
manner of the tradition, not a copy of any cloth. See Monni Adams, "Kuba
Embroidered Cloth", *African Arts* 12:1 (1978); Dorothy K. Washburn and
Donald W. Crowe, *Symmetries of Culture* (1988), on Kuba symmetry groups;
and Georges Meurant, *Shoowa Design* (Thames & Hudson, 1986).

## This implementation

- **Spec knobs:** `cells` (lattice cells across, 16–80; 0 = 36–48 by seed),
  `breaks` (0–12 seams; 0 = one perfect repeat), `motif` (auto, diamonds,
  chevrons, meander, hooks, crossings — the first zone's), `group` (auto,
  p1, pm, pmm, p2, cm — the first zone's), `palette` (auto, raffia, charcoal,
  line_art), `pile`, `width`, `height`, `margin`.
- **Generation:** every cell is ground, line or one of two piles. A zone
  repeats a p × p motif tile (p = 6, 8, 10 or 12) under its wallpaper group
  with a phase; every group used repeats after 2p cells. Each break picks
  the largest zone, cuts it vertically or horizontally at a cell line that is
  not a whole repeat from the zone's phase, and changes the new side's
  motif, scale or phase (in a seeded order), keeping the first change that
  alters a stitch in the two cell lines beside the seam. Line cells are
  linked orthogonally, and diagonally only where no orthogonal path exists,
  and drawn as thick bands with stem-stitch ticks; pile cells are clusters
  of nine jittered dots; the ground carries a fine plain-weave grid and a
  running-stitch hem.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic per seed; `verification: exactly_periodic`
  with no breaks, else `seams_break_the_repeat_visibly`. Tested: with no
  breaks every cell equals the cell one repeat (2p) away in both directions,
  for every motif and group; with b breaks there are exactly b seams and
  b + 1 zones tiling the cloth, every seam lies off a whole repeat and
  changes the stitches beside it; asking for more breaks than fit reports
  `requested_breaks`; all ink stays on the page.

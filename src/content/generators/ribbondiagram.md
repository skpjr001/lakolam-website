---
title: "Protein Ribbon Diagrams"
blurb: "Protein ribbon diagrams in the manner of Jane Richardson's cartoons: helices, sheets and loops of invented proteins"
category: design
version: "1.0.0"
---
Protein ribbon diagrams in the manner of Jane Richardson's cartoons:
helices, sheets and loops of invented proteins.

## What it is

A protein is a single chain that folds into a compact shape, and the
ribbon diagram is the classic way to draw that shape without drawing every
atom. Coiled ribbons are α-helices, broad flat arrows are β-strands (lined
up side by side into sheets, the arrow showing the direction of the
chain), and thin tubes are the loops that join them. Every protein on this
page is invented: the generator makes up a plausible fold — a bundle of
helices, a β-sandwich or barrel, a Rossmann-like α/β sheet with helices on
both faces, or an α+β sheet with helices packed on one side — folds it in
three dimensions and draws it in depth. None of them is a real structure
from the Protein Data Bank.

## How to use it

Follow the chain from the N terminus to the C terminus: in the rainbow
style it runs blue to red, so the order of the elements is easy to trace.
Notice which strands of a sheet run the same way (parallel) and which run
opposite ways (antiparallel), how a helix crossing between two parallel
strands always turns the same way round, and how the inside face of each
helix ribbon is darker than the outside. The by-type style colours helices,
strands and loops separately; the cartoon style is black and white with
hatched back faces, like the hand-drawn originals; the line-art style is
for colouring in.

## Purpose

To make the language of protein structure — helices, sheets, hairpins,
crossovers, barrels — something to look at, trace and colour, with
drawings that obey the same geometry real proteins do.

## History

Linus Pauling, Robert Corey and Herman Branson proposed the α-helix in
1951, and Pauling and Corey the pleated β-sheet the same year; John
Kendrew's myoglobin (1958) and Max Perutz's haemoglobin were the first
protein structures. Michael Levitt and Cyrus Chothia (1976) sorted folds
into the all-α, all-β, α/β and α+β classes used here, and Michael
Rossmann's group described the nucleotide-binding fold that bears his name
in the early 1970s. Jane S. Richardson showed that crossover connections
between parallel strands are almost always right-handed (1976), named the
Greek-key motif (1977), and in "The anatomy and taxonomy of protein
structure" (Advances in Protein Chemistry, 1981) drew the hand-made ribbon
cartoons — spiral ribbons, arrows and ropes — that every later picture
follows. Computer ribbons followed with Mike Carson's ribbon models (1987)
and Per Kraulis's MolScript (1991).

## This implementation

- **Spec knobs:** `width`, `height` (points, 200-3000); `fold` (`auto` —
  picked by the seed — `all_alpha`, `all_beta`, `alpha_beta`,
  `alpha_plus_beta`); `size` (`small`, `medium`, `large`); `style`
  (`rainbow`, `by_type`, `cartoon`, `lines`); `termini` (N and C labels);
  `caption`; `depth_cue`; `stroke` (0.2-4).
- **Generation:** the fold class fixes the cast and the seed the details.
  All-α: an up-down bundle on a ring 10 Å apart (with a core helix when
  large). All-β: a meander barrel (strands round a circle at a 4.8 Å
  chord) or a sandwich of two sheets 10 Å apart, connected as a meander or
  Greek-key-like pairs. α/β: a parallel sheet in Rossmann (321456…),
  flavodoxin (21345…) or plain 12345… order, with each crossover helix on
  the face that makes the connection right-handed, spread 10 Å apart. α+β:
  a sheet grown by hairpins (with the odd Greek-key jump) and helices
  packed on one face. Strands lie 4.8 Å apart (3.3 Å per residue) with a
  small seeded twist of the arrow; helices are ideal right-handed α-helices
  (radius 2.3 Å, 1.5 Å rise, 3.6 residues a turn). Elements run along ±z
  and alternate direction along the chain, so each loop joins two ends on
  the same face. Each loop is a cubic Bézier arch leaving one end along its
  direction and landing on the next; arches of rising height and sideways
  bulge are tried, cheapest first, until one keeps the clearance; the two
  tails are routed the same way. If any loop finds no clear route the
  layout is retried with less jitter. Drawing: helices are ribbons wound
  on the helix cylinder (outer face light, inner face dark — hatched in the
  cartoon style), strands broad arrows, loops 8-sided tubes; every piece is
  a small quad in one painter's sort under an orthographic seeded
  three-quarter view, and tube outlines are the silhouette edges between a
  face turned towards the viewer and one turned away.
- **Guarantees:** deterministic per seed; the chain is continuous — each
  element begins exactly where the previous one ends, loops alternate with
  helices and strands, and both termini are loops (tested); no element
  passes through another — every pair of elements that do not join stays
  at least 0.35 Å apart, checked on the drawn surface points rather than
  the router's own model (tested over every fold and size), and the router
  itself keeps 0.6 Å past each element's radius (`blocked_loops` is 0 in
  every tested case); H-bonded neighbouring strands keep exactly 4.8 Å
  spacing all along their overlap, in sheets and barrels (tested); α/β
  sheets are parallel with every helix antiparallel to them (tested); all
  ink stays inside the page. `verification:
  chain_continuous_clearance_sheet_spacing`, `invented: true`. The
  line-art page records the colourability check in `colorable`. Clamped
  knobs are reported as `requested_<field>`.

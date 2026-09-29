---
title: "Kolam"
blurb: "Sikku and pulli kolam: continuous loops woven around a dot lattice"
category: design
version: "1.1.0"
---
Continuous loops woven around a lattice of dots — the South Indian threshold
art, and this workspace's namesake.

## What it is

A dot lattice (square, diamond or triangular) with smooth curves weaving
diagonally around the dots. In the **sikku** ("knot") style the curves are
closed loops that enclose every dot; the prestige form is a single unbroken
line around the entire lattice. **Pulli** style connects the dots directly.
The `curve` knob sweeps from angular to fully rounded weave.

## How to use

As line art for colouring or tracing. Tracing pages follow the loop with a
finger or pencil in one continuous motion — the single-loop kolams exist for
exactly that. As colouring pages, the weave's over-alternating regions take
alternating colours naturally. For crayons, markers, young children or tired
eyes, choose the Bold & Easy version: a small grid of dots drawn big, one
thick line, and every cell roomy enough to fill easily.

## Purpose

The namesake crate. Kolam is also a satisfying algorithmic object: loops
emerge from local crossing decisions on the dual edge graph, and merging
along a spanning tree walks the design from many small loops down to one —
the same spanning-tree trick masyu uses for its Hamiltonian cycle.

## History

Kolam is a daily practice in Tamil Nadu: women draw the design in rice flour
at the threshold before dawn, an act of welcome and impermanence — walked
away by the day, redrawn the next. The sikku tradition encodes real
mathematics (array grammars and knot theory both study it), and specific
family patterns pass down generations. Related forms: rangoli (North
India), muggu (Andhra Pradesh).

## This implementation

- **Spec knobs:** `lattice` (square/diamond/triangular), `style`
  (sikku/pulli), `loops` (1 = single continuous line), `curve`, `spacing`,
  `show_dots`, `bold`.
- **Bold & Easy (`bold: true`):** the lattice is capped at 5 dots a side
  (diamond at half 2), spacing is raised so the page is about a letter page
  wide at native size (so the Pt measured are the Pt printed), one stroke of
  2 x `stroke` (4.8 pt by default, never under 4.5), dots drawn fat, and the
  page is always the sikku weave — pulli line art is a spanning tree and
  encloses nothing to colour. Where two diamonds stay separate their curves
  kiss; drawn thick the kiss closes and the page becomes a lattice of big
  cells, one round the dot and one between every four dots. Gated by the bold
  check: lako-validate's **kids** profile plus every stroke >= 3 pt plus a
  flood fill of the rendered page measuring every enclosed cell against
  200 mm² (lako-validate alone measures only closed subpaths, and a sikku
  kolam is one self-crossing loop). Meta carries `bold: true`, `colorable`
  and a `validation` block. Measured: 5x5 pages have 41 cells, smallest
  ~234-324 mm².
- **Generation:** every dot starts as its own diamond loop; a union-find
  merge along randomly-ordered adjacent pairs fuses loops until the target
  count remains; the weave is traced through gate pairings and rendered as
  smoothed beziers.
- **Guarantees:** every dot enclosed, loop count reported honestly
  (`loops_found` vs `loops_requested`), all arcs used — each checked, not
  assumed.

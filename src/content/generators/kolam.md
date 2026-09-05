---
title: "Kolam"
blurb: "Sikku and pulli kolam: continuous loops woven around a dot lattice"
category: design
version: "1.0.0"
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
alternating colours naturally.

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
  `show_dots`.
- **Generation:** every dot starts as its own diamond loop; a union-find
  merge along randomly-ordered adjacent pairs fuses loops until the target
  count remains; the weave is traced through gate pairings and rendered as
  smoothed beziers.
- **Guarantees:** every dot enclosed, loop count reported honestly
  (`loops_found` vs `loops_requested`), all arcs used — each checked, not
  assumed.

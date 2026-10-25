---
title: "Benzenoid Molecules"
blurb: "Random polycyclic aromatic molecules with Kekulé structures, Clar sextets and formulas"
category: design
version: "1.0.0"
---
Honeycomb molecules drawn as a chemist draws them: rings, double bonds,
aromatic circles and the formula underneath.

## What it is

Benzene is a ring of six carbon atoms. Fuse rings side by side, the way
cells fit together in a honeycomb, and you get the family of polycyclic
aromatic hydrocarbons: naphthalene (mothballs), anthracene, pyrene, coronene
and thousands more, found in soot, coal tar and interstellar dust.

Each page shows such molecules in skeletal form. Every corner is a carbon
atom, every side a bond between two carbons, and each carbon on the outside
edge also holds a hydrogen (not drawn, as is the custom). Every carbon must
make exactly four bonds, so some bonds are double: they are drawn with a
second, shorter line inside the ring. Where a ring can be drawn as a full
aromatic "sextet", it gets a circle instead — and the picture with the most
circles, the Clar structure, is the one chemists say best describes the
molecule. Under each molecule is its formula, C for carbon and H for
hydrogen with the counts written small, and its name when it is a famous one.

## How to use it

Use the chart as a reference sheet or a classroom poster: compare how the
formula changes as rings are added in a line, round a corner or in a
cluster. As a puzzle, cover the drawing's double bonds and try to place them
yourself so that every carbon has exactly one; or find a different
arrangement from the one shown. On the line-art page, shade the circled
rings in one colour and the others in another.

## Purpose

The chemistry entry in the design lane: random molecules that are always
real, closed-shell structures, never just pretty hexagons. Every carbon's
four bonds are checked, so the page can be trusted in a classroom.

## History

Kekulé proposed the ring structure of benzene in 1865. Erich Clar's *The
Aromatic Sextet* (1972) introduced the sextet picture, and the mathematical
theory of benzenoids — Kekulé structures as perfect matchings, Clar numbers,
catacondensed versus peri-condensed shapes — is set out in Gutman and Cyvin,
*Introduction to the Theory of Benzenoid Hydrocarbons* (Springer, 1989).
Names follow IUPAC usage for the common polycyclic aromatic hydrocarbons.

## This implementation

- **Spec knobs:** `page` (chart / single), `kind` (mixed / compact / chain /
  branched / classic), `rings` (1-20 per molecule; empty lets the seed
  choose), `count` (2-30 on a chart), `clar` (circle the sextets, or show a
  plain Kekulé structure), `palette`, `style` (colour / line_art), `labels`,
  `width`, `height`, `margin`.
- **Generation:** hexagons are grown on the honeycomb from one ring: compact
  growth prefers cells touching several rings and rejects any that would
  enclose a hole; chains add each ring to the last one touching only it;
  branched trees add rings touching exactly one existing ring, branch points
  allowed. Shapes without a Kekulé structure (a perfect matching of the
  bipartite carbon graph, found by augmenting paths) are rejected, as are
  repeats on a chart (compared up to rotation and reflection). The Clar
  structure is an exact branch-and-bound over vertex-disjoint rings, keeping
  the largest set whose leftover carbons still match perfectly. Names come
  from a table of fifteen well-known molecules matched by canonical shape.
  Charts share one bond length (the median fit), so molecules compare at
  true relative size; subscripts are drawn as smaller, lowered digits.
- **Solving:** Nothing to solve.
- **Guarantees:** every carbon has exactly four bonds counting its hydrogen
  and its double bond (`verification: four_bonds_per_carbon`, re-checked into
  `valences_checked`); the formula is CₙHₘ with n carbons and m the carbons
  bonded to only two others; no molecule has a hole. Tests pin the formulas of
  all fifteen named molecules and the literature Clar numbers of ten,
  check that catacondensed molecules obey C = 4h + 2, H = 2h + 4, that a
  chart repeats no shape, and that phenalene is rejected as non-Kekuléan.
  Out-of-range knobs are clamped and reported as `requested_<field>`.

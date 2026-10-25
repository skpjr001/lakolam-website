---
title: "Tree of Life"
blurb: "A tree of life of invented species: Yule, coalescent or balanced trees, circular, fan, rectangular or slanted, with clades to colour"
category: design
version: "1.0.0"
---
A family tree of invented species, grown by the same random rules
biologists use to model evolution.

## What it is

A phylogenetic tree: a diagram of who is related to whom. The root, in the
middle (or at the left), is a single ancestor long ago; every fork is a
species splitting in two; every tip is a living species, and all the tips
reach the present, so they line up on one outer ring. Groups that share a
recent ancestor - clades - are shaded as coloured wedges behind the tree.
The species have made-up two-part Latin names: a genus shared by the whole
clade, then a name of their own. A scale bar shows how many (invented)
millions of years a length of branch stands for.

The tree can be drawn round a circle, as an open fan, as a rectangular
"cladogram" with right-angled branches, or with straight slanted branches.

## How to use it

- **Colour the clades.** Each shaded wedge is one family of species. Give
  each its own colour, or, on the outline version, colour each wedge
  yourself.
- **Read it like a family tree.** Pick two species and trace their branches
  inward until they meet: that fork is their most recent common ancestor.
  The closer to the tips it is, the more closely they are related.
- **Find the oldest split.** The fork nearest the root divides all the
  species into two great groups. Which wedges fall on each side?
- **Name a species.** Choose a tip and draw what you imagine it looks like
  from its name.

## Purpose

Trees of life are among the most important pictures in biology and among
the hardest to read at first. A made-up tree, with names that carry no
baggage, lets a reader learn to read branch lengths, forks and clades
without already knowing the animals. It is also a striking circular design.

## History

Charles Darwin sketched a branching tree in his 1837 notebook under the
words "I think", and the only figure in *On the Origin of Species* (1859) is
a tree. Ernst Haeckel drew grand illustrated trees later in the century.
The random models used here come from mathematics: G. Udny Yule's
pure-birth process (1924), in which every living lineage is equally likely
to split next, and J. F. C. Kingman's coalescent (1982), which traces
lineages back in time until they merge. Circular "fan" layouts became
popular with large molecular trees, such as Hillis, Zwickl and Gutell's
tree of life poster (2003).

## This implementation

- **Spec knobs:** `model` (`yule` default, `coalescent`, `balanced`, `auto`),
  `layout` (`circular` default, `fan`, `rectangular`, `slanted`, `auto`),
  `tips` (4-160), `clades` (0-12; 0 or 1 draws none), `labels`
  (`binomial` default, `numbers`, `none`), `scale_bar`, `palette`
  (`spectrum` default, `earth`, `ink`, `colouring`), `line`, `width`,
  `height`, `margin`.
- **Generation:** Yule: from one split at time 0, wait `Exp(n)` with `n`
  lineages alive, split one chosen uniformly, stop at `N` tips and run on
  one more waiting time. Kingman: from `N` tips, wait `Exp(k(k-1)/2)`, merge
  two lineages chosen uniformly, then flip heights into times. Balanced:
  halve the tips at every node, one time unit per level. Waiting times are
  `-ln U / rate` with libm logarithms. Children are ladderised (smaller
  clade first, ties by node index). Circular tips sit at angle `2πi/N`, a fan
  spans 1.2π along the page's long side; every node sits at a radius equal
  to its time from the root, internal nodes at the midpoint of their
  children's span; each internal node draws an arc at its radius across its
  children, each child a radial segment from its parent's radius to its
  own. Clades: the earliest splits are opened one at a time until `k`
  subtrees hang below the cut; their tip runs give the wedges, from the cut
  radius out past the labels. Names: syllables (onset, vowel, optional
  coda) plus a Latin ending, 5-11 letters, unique, with a blocklist of rude
  substrings and famous real genera; one genus per clade. Labels are sized
  to the tip spacing and the tree to the room the labels leave; left-hand
  labels are turned to read outward. The root's age is a seeded round
  number of millions of years for the scale bar.
- **Solving:** Nothing to solve.
- **Guarantees:** `N` tips and `N - 1` binary internal nodes; ultrametric
  (every tip at the same time, so on one ring); no arc crosses a branch and
  arcs at one radius never overlap; the clade wedges tile the ring exactly
  (consecutive runs covering every tip once, each equal to one clade); every
  name is printable and unique; deterministic per seed; ink inside the
  page. A clamped `tips` or `clades` is reported as `requested_*`.

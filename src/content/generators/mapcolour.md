---
title: "Four-Colour Map"
blurb: "Four-colour map — shade every region with one of four patterns so touching regions differ"
category: puzzle
version: "1.0.0"
---
Shade a map with four patterns so that no two neighbouring regions match.

## What it is

A rectangle is divided into irregular regions, like countries on a map. A
few regions are already shaded with one of four patterns: dots, stripes,
checks or solid grey. Shade every other region with one of the four
patterns so that two regions sharing a border never have the same one.
There is exactly one way to do it.

## How to play

1. Give every region one of the four patterns shown under the map. (If you
   would rather colour, pick four crayons and let each stand for one
   pattern.)
2. Two regions that share a stretch of border must be different. Regions
   that meet only at a single corner point do not count as touching.
3. The regions already shaded stay as they are.

Look for a blank region that already touches three different patterns: it
can only take the fourth. Each region you finish narrows down its
neighbours. On harder maps, look for two touching regions that are left
with the same two choices — between them they use up both, so any region
touching both must take one of the other two.

## Purpose

A logic puzzle that doubles as a colouring page, and a hands-on
introduction to one of mathematics' most famous results. Printed patterns
keep it black and white for print, while a solver with pencils can still
colour it in. Small maps suit young children; large ones need real
reasoning chains.

## History

Francis Guthrie noticed in 1852 that four colours seemed enough for any
map; the Four Colour Theorem was finally proved by Kenneth Appel and
Wolfgang Haken in 1976, the first major theorem proved with a computer.
As a puzzle — a partly coloured map with one completion — it is best known
from Simon Tatham's *Map*, in his Portable Puzzle Collection, whose
difficulty levels follow the same deductions as here.

## This implementation

- **Spec knobs:** `difficulty`; `regions` (6–40, 0 = picked from the
  difficulty: 9 Kids, 16 Easy, 22 Medium, 24 Hard, 36 Expert); `cell` (one
  step of the 30 × 22 map lattice, in points); `line`.
- **Generation:** answer first. Regions grow from seeds spread across the
  lattice, each step claiming the most enclosed of a few sampled border
  cells for the region holding most of its sides, which keeps borders
  smooth; regions under seven cells are merged into the neighbour they
  share most border with, and extra seeds are sown if that leaves too few.
  A random four-colouring comes from a search branching in a seeded order.
  Regions are shaded one at a time until the deduction ladder settles the
  map, then unshaded in several seeded orders, keeping the thinning that
  needs the target rung.
- **Solving:** a yes/no engine with one variable per region and pattern.
  Rungs: *singles* (one pattern per region; a pattern used by a region is
  struck from its neighbours), *pairs* (two touching regions left with the
  same two patterns strike both from every region touching them both), and
  *trial* (assume a pattern, strike it on a contradiction; one level deep,
  never a search).
- **Guarantees:** deterministic per seed. Every map settles region by
  region with sound rules, which proves the colouring unique; tests re-prove
  it with an independent capped count that colours the regions one at a
  time, re-reading the borders from the lattice. Rated by the hardest rung
  needed and the size: singles are Kids up to 12 regions and Easy above;
  pairs are Medium; trial is Hard up to 28 regions and Expert above. A size
  that cannot reach the requested band is rated honestly at the nearest
  band, with `requested_difficulty` and `requested_regions` in meta.

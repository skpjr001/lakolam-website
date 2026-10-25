---
title: "Cones and Fruit"
blurb: "Pine and spruce cones, pineapples, artichokes and hops with their scales on Fibonacci spirals, and the spirals traced to count"
category: design
version: "1.0.0"
---
Pine cones, spruce cones, pineapples, artichokes and hops, every scale
placed on the golden-angle spirals the plants themselves use.

## What it is

A pine cone, a pineapple and an artichoke grow the same way: new scales
(or eyes, or bracts) appear one at a time round the growing tip, each
turned about 137.5° — the golden angle — from the one before. On the
finished fruit the scales line up in two sets of spirals, one winding left
and one winding right, and the number of spirals in each set is almost
always a pair of neighbouring Fibonacci numbers: 5 and 8, 8 and 13, 13 and
21. This page grows each fruit that way and draws it in the round: woody
pine scales with a diamond tip and a small knob, the thin round lips of a
spruce cone, a pineapple's hexagonal eyes with their little pointed
bracts and a crown of leaves, an artichoke's overlapping bracts, a hop's
papery cone.

## How to use it

Count the spirals. Pick a scale near the middle and follow its neighbours
up and to the right; count how many such spirals go round the fruit. Then
count the ones going up and to the left. With "count the spirals" turned
on, the two families are drawn for you in red and blue and the caption
gives both numbers — check them against the Fibonacci sequence 1, 1, 2, 3,
5, 8, 13, 21, 34. The black-and-white version is a page to colour in.

## Purpose

A design-lane page from botany and mathematics: phyllotaxis made visible,
with the spiral counts emerging from the golden angle rather than being
drawn on.

## History

Leonardo da Vinci noted the spiral arrangement of leaves; Charles Bonnet
described it in 1754, and Karl Schimper and Alexander Braun (1830s) found
the Fibonacci fractions in leaf divergence. The brothers Louis and Auguste
Bravais (1837) explained them with the golden angle on a cylinder. Alan
Turing worked on phyllotaxis in his last years; Douady and Couder (1992)
showed in a physical experiment that the golden angle follows from each
new organ appearing where there is most room. Helmut Vogel's sunflower
model (1979) and Prusinkiewicz and Lindenmayer's *The Algorithmic Beauty
of Plants* (1990) gave the computer models this page follows.

## This implementation

- **Spec knobs:** `fruit` (auto, pine, spruce, pineapple, artichoke, hop),
  `layout` (single, plate of four), `organs` (16–400; empty for a count
  typical of the fruit), `count_spirals`, `palette` (auto, linen, sage,
  sky, night, ink), `caption`, `width`, `height`, `margin`.
- **Generation:** each fruit is a surface of revolution from a seeded
  profile. Organ `i` sits at angle `i × 137.508°` and at the height where
  the area below it is `(i + ½)/n` of the whole, so scales keep one size.
  Scales are Voronoi cells of the organs in the conformal chart
  `(θ, ∫ ds/r)` of the surface — one diagram, periodic in θ, so the cells
  tile the fruit exactly — then shrunk towards their organ and dressed per
  fruit: a pyramid apophysis with an umbo (pine), a raised eye with a bract
  and dimple (pineapple), a rounded or pointed shield standing off the
  surface (spruce, hop, artichoke). An orthographic camera with a seeded
  view sees the fruit; scales facing away are culled, tiled kinds are
  painted far to near and overlapping kinds in growth order so each lip
  covers the scale beneath it. A dark core fills the gaps; the pineapple
  gets a crown of leaves at the golden angle. The spiral option joins
  every `m`-th and every `n`-th organ, where `(m, n)` are the contact
  parastichy numbers measured from the organs' nearest neighbours.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic per seed; organs are exactly one golden
  angle apart with non-decreasing height; the contact parastichy numbers
  are consecutive Fibonacci numbers for every fruit and organ count in its
  range (and `fibonacci` in the metadata says so); front-facing scales never
  overlap on the page; all ink inside the page; a clamped `organs` records
  `requested_organs`.

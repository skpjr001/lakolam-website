---
title: "Sequence Art"
blurb: "Integer sequence art: Recamán's arcs, Harriss's Collatz seaweed and the Stern–Brocot tree as nested Farey arcs"
category: design
version: "1.0.0"
---
Famous number sequences drawn line by line: Recamán's looping arcs,
Collatz seaweed, and the Stern–Brocot tree of fractions as nested arcs.

## What it is

Three pictures in which every line is one term of a number sequence.

- **Recamán's sequence** starts at 0 and on step `n` jumps back `n` if it
  lands on a new, non-negative number, and forward `n` otherwise: 0, 1, 3,
  6, 2, 7, 13, 20, 12, 21… Each jump is drawn as a half circle on a number
  line, alternately above and below, and the jumps coil into rings.
- **Collatz seaweed**: halve an even number, triple an odd one and add 1,
  and every number tried so far falls to 1. Grow each of those journeys back
  out of 1, bending one way on a halving and the other way on a tripling,
  and thousands of journeys share their stems like fronds of weed.
- **The Stern–Brocot tree**: between two neighbouring fractions sits their
  *mediant*, top plus top over bottom plus bottom (between 1/2 and 1/1 sits
  2/3). Join neighbours by arcs and every split nests three arcs inside one —
  the Farey tessellation, drawn in a disc or as a band of arcs on a line.

## How to use it

A wall print or a slow colouring page. On the Recamán page, find where the
line runs backwards and forwards, and follow the rings outward. On the
seaweed, the thick stem is the journey every number shares (16, 8, 4, 2, 1);
find where the branches leave it. On the disc, the big middle triangle has
the corners 0, 1 and infinity; every smaller triangle inside sits between two
fractions and their mediant. The outline version is ready to colour — a
colour per level of the tree makes the nesting jump out.

## Purpose

Art that is also exact mathematics: the sequence is computed, not traced,
so every arc and branch on the page is a true term. It shows how a one-line
rule can draw something organic.

## History

Bernardo Recamán Santos sent his sequence to Neil Sloane's encyclopedia
(OEIS A005132) in 1991; the arc picture spread through Numberphile's 2018
video with Alex Bellos and Edmund Harriss. Harriss also drew the Collatz
"seaweed" (Lothar Collatz posed the 3n + 1 problem in 1937; it is still
unsolved). Moritz Stern (1858) and Achille Brocot (1861, a clockmaker
choosing gear ratios) found the tree of fractions; John Farey's 1816 letter
named the sequences, Lester Ford's circles (1938) and Allen Hatcher's
*Topology of Numbers* give the geometry of the tessellation.

## This implementation

- **Spec knobs:** `mode` (auto, recaman, collatz, stern_brocot), `rule`
  (auto, classic, variant), `detail` (Recamán terms ≈ 25–145, Collatz
  starting numbers ≈ 500–10,000, Farey levels 3–11), `palette` (auto, kelp,
  sunset, ocean, nocturne, abyss, ink), `line`, `caption`, `width`,
  `height`, `margin`.
- **Generation:** Recamán arcs are exact semicircles; the variant starts
  from another number (1–40) or sends forward steps above and backward steps
  below. Collatz trajectories are merged into one tree keyed by number, so
  each (number, image) edge is drawn once and its width grows with the
  number of trajectories through it; the turtle turns `θ_even` (5–8.5°) on a
  halving and about 1.75–2.05 × that the other way on an odd step, steps
  shrink by a seeded factor per level, and the shortcut `(3n + 1)/2` and
  `5n + 1` variants rescale the odd turn by their halving ratio so the frond
  does not curl. `5n + 1` walks that pass 2⁴⁸ or 1,000 steps without
  reaching 1 are left out and counted (`unreached`). The Farey disc maps
  the tessellation by the Möbius map sending 0, 1, ∞ to an equilateral
  triangle and fills each ideal triangle by level; the variant band shows
  [0, 1] as coloured arcs, mirrored, with fractions blended toward the
  Minkowski question-mark spacing. The seed picks the mode (auto), the
  variant (auto), Recamán's start, the turtle's angles, taper and heading,
  the window, the blend, the disc's turn and the palette.
- **Solving:** Nothing to solve.
- **Guarantees:** Recamán's first terms equal OEIS A005132 and every arc
  joins consecutive terms with diameter `n`; the Collatz tree has exactly
  one edge per distinct (number, image) pair met on the trajectories (tested
  for all three maps); every Farey triangle's corners are neighbours
  (`|ad − bc| = 1`) with the mediant between them. All ink stays inside the
  page; deterministic per seed. The sequences are fixed, so the seed's
  variety comes from the choices above — six seeds give at least five
  different pages in every mode.

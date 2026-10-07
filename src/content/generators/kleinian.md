---
title: "Indra's Pearls"
blurb: "Indra's Pearls — Kleinian limit sets: nested circles from two Möbius maps, every generation disjoint and inside its parent"
category: design
version: "1.0.0"
---
Circles inside circles inside circles, made by two simple maps — a print of
the limit set of a Kleinian group, the necklace of pearls from Indra's net.

## What it is

Four circles sit in a ring. Two transformations of the plane pair them off:
the first turns the outside of one circle into the inside of its partner,
the second does the same for the other pair. Apply the two maps, and their
reverses, over and over in every order, and each circle fills with three
smaller copies of the others, and each of those with three more. The
circles shrink towards a fractal — the limit set. When the four starting
circles stand apart it is a scatter of dust; when they touch in a ring, the
pearls close up into a single wobbly necklace.

The picture comes as shaded pearls on a dark or light ground, as outlined
rings to colour, or as the dust of the smallest circles alone.

## How to use it

- Print the pearls as wall art: the dark Midnight ground is made for a
  frame, the light palettes for a notebook cover or gift card.
- Colour the rings: every ring on the colouring version is big enough to
  colour, and a ring's three children can take one colour family, so the
  branches of the tree show through.
- Trace a branch: pick a big circle and follow its three children, then
  their children — each circle holds a smaller copy of the whole pattern,
  turned and squeezed.
- Look for the necklace: in the touching version every circle meets its
  neighbours, and the chain of touching points runs round one closed loop.

## Purpose

A piece of real modern mathematics that is also beautiful to look at. It
looks nothing like the related Apollonian gasket on purpose: that packs
circles into the gaps between circles, while these pearls nest inside one
another along a single curve or a cloud of dust. It suits maths-art prints,
colouring books for grown-ups and classroom displays on symmetry and
fractals.

## History

Felix Klein and Henri Poincaré studied groups of these circle-preserving
maps (Möbius transformations) in the 1880s; Friedrich Schottky had
described the paired-circle construction in 1877. The pictures stayed
mostly in the mind until computers could draw them: David Mumford,
Caroline Series and David Wright's book *Indra's Pearls: The Vision of
Felix Klein* (2002) made them famous, naming them after the Buddhist image
of a net of jewels in which each pearl reflects all the others.

## This implementation

- **Spec knobs:** `width`, `height`, `margin`; `group` (`kissing` — the
  four circles touch in a ring — or `classical` — they stand apart);
  `style` (`pearls`, `rings`, `dust`); `palette` (`midnight`, `sunrise`,
  `jewel`, `ink`; not used by rings); `depth` (generations, 1–8);
  `min_radius` (smallest circle drawn, in points; rings never go below
  10.5 pt); `separation` (how far apart a classical group's circles stand;
  not used by kissing groups); `line` (outline weight; not used by dust).
  Out-of-range values are clamped and reported as `requested_*`.
- **Generation:** the seed picks the four circles' sizes (A and a on a
  line, B and b each touching both). A classical group shrinks them apart
  by `separation` and pairs each with its partner by
  `z ↦ c' + k r r' / (z − c)` with a seeded twist `k`. A kissing group
  pairs them so that the touching points of each circle land on the
  touching points of its partner, neighbour by neighbour, with a seeded
  third point fixing the rest — so the touches survive every generation.
  The circles of each reduced word are computed generation by generation,
  each in closed form as the Möbius image of a base circle (the image's
  centre is the image of the pole's reflection in the circle). A branch
  stops at `depth` or below `min_radius`. The design is turned a quarter
  turn when that prints it larger.
- **Solving:** nothing to solve — a design.
- **Guarantees:** every page passes `nesting_checked`: each generator
  carries its circle onto its partner's at eight test points, turns it
  inside out (its pole is inside its own circle) and cancels with its
  inverse; every circle lies inside its parent; sibling circles are
  disjoint — strictly apart in a classical group, touching at most in a
  kissing group, whose four starting circles touch in a ring — so each
  generation is pairwise disjoint; every word is reduced; everything is on
  the page. Tests re-derive every circle by pushing three points through
  the word's maps, re-check every pair in each generation without using
  the tree, confirm the kissing chain (each circle's children touch in a
  chain of two touches) and that the symmetric ring is the Fuchsian case
  (all four circles orthogonal to the circle through the touching points),
  and that the checker rejects swollen, moved or misnamed circles. The
  rings style reports `colourable` from the colouring check.

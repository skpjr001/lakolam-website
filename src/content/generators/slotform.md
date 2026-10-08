---
title: "Slot-together sculptures"
blurb: "Slot-together card sculptures — a sphere, egg, dome, torus, pebble, onion dome or heart as an egg-crate grid or ribs and rings, every crossing's two slot depths adding up to its length"
category: design
version: "1.0.0"
---
Flat card shapes that slot into each other to make a sphere, an egg, a
dome, a torus, a pebble, an onion dome or a heart.

## What it is

A set of card parts to cut out and slot together into a 3D sculpture,
like the cardboard dinosaur and animal kits sold for children, but made of
geometric solids. Each part is an exact slice through the solid. There are
two ways to slice:

- **Ribs and rings.** Ribs stand round the vertical axis like the segments
  of an orange; one to four horizontal rings hold them. The finished
  sculpture looks like a lantern or a globe. This is the only way to make
  the torus, whose middle is empty.
- **Egg-crate grid.** Two sets of upright cards cross at right angles, like
  the dividers in an egg box. The heart is made this way: one set shows the
  heart's outline, shrinking towards the edges, the other its puffy side
  view.

Every slot is exactly as wide as the card, and where two parts cross their
two slots together are exactly as long as the crossing, so the parts sit
flush. The parts carry their names, each slot names the part that goes in
it, and a small picture shows the finished sculpture.

## How to use it

1. Set the card thickness to the card you will use: about 0.3 mm for
   paper, 0.5 mm for a cereal box, 1.5 mm for mount board, 3–4 mm for
   corrugated cardboard. The slots are cut to that width.
2. Print every page at 100 % ("actual size"). The box in the corner is
   1 cm wide; check it with a ruler. Glue the pages onto the card, or trace
   the parts.
3. Cut out every part, and cut each slot all the way to its end with a
   craft knife.
4. **Ribs and rings:** lay the B rings out, then slide each A rib in towards
   the middle so its slots take the rings, matching the names beside the
   slots. Add the ribs round the rings one at a time.
5. **Grid:** stand the B cards up, then drop each A card onto them from
   above, each slot onto the card named beside it.
6. A dab of glue at the crossings makes the sculpture permanent.

## Purpose

Slot-together card models are a classic classroom and maker activity: no
glue, no tabs, and a 3D form from flat sheets. The geometry is unforgiving,
though. A slot cut too deep leaves a gap, one too shallow stops the parts
from closing, and two parts that graze each other without a slot cannot be
assembled at all. Here every crossing is computed from the solid itself
and checked, so the parts go together.

## History

Interlocking flat sections are an old way to build curved forms: ships'
frames and the "egg-crate" structure of aircraft fuselages, and the
cardboard animal and dinosaur kits that spread in the 1970s. Designers and
architects use the same "sectioning" technique to build large curved
pavilions from flat plywood, and laser-cutting and software such as
Autodesk's 123D Make (2012) brought it to makers.

## This implementation

- **Spec knobs:** `shape` (`sphere`, `egg`, `dome`, `torus`, `pebble`,
  `onion`, `heart`); `arrangement` (`radial`, `grid`); `slices` (grid: cards
  across the wider way, 2–8, proportionally fewer across the narrower;
  radial: ribs, 3–12); `rings` (radial only, 1–4); `size_cm` (6–40, the
  largest dimension); `thickness_mm` (0.3–5, the slot width); `look`
  (`colour`, `outline`); `labels`; `index` (which page); `page`,
  `landscape`; `margin` (inches).
- **Generation:** each solid is an inside test in unit coordinates (the
  heart is two discs and a polygon, puffed out so that every slice parallel
  to it is the heart shrunk about its centre). Outlines are traced along
  their crossing lines: at each sample, the run of the line inside the solid
  is found by sampling and refined by bisection to machine precision.
  Ribs are trimmed back from the axis so neighbouring ribs keep clear.
  Plane positions are searched in a seeded order, widest spreads first:
  a layout is accepted only if every pair of planes either crosses along a
  segment at least 2 mm plus two margins long with both slots well inside
  both parts, or keeps clear by a margin; ring slots keep apart; every
  plane is one piece; and the crossings join all the parts. If no layout
  works with as many planes as asked, fewer are used and recorded as
  `requested_slices` or `requested_rings`; a card thicker than a thirtieth
  of the size is thinned and recorded; a size whose parts do not fit the
  page is reduced and recorded as `requested_size_cm`. A torus asked for as
  a grid, or a heart as ribs, uses the other arrangement and records
  `requested_arrangement`. The seed picks the colours and the plane
  positions among the valid layouts.
- **Solving:** nothing to solve.
- **Guarantees:** `slots_checked`, re-checked from the finished model. At
  every crossing the two parts are slotted from opposite ends (grid: first
  family from the top; radial: rings from the rim, ribs from the inner
  edge) and the two depths add up to the crossing length, which is found
  again from scratch along the line. Every slot is exactly the card
  thickness wide. Every outline corner off the slots and rib trims lies on
  the solid's surface. The crossings join every part into one sculpture.
  Parts lie inside the page at 100 % without overlapping. The tests check
  independently that along each crossing line every point is card in
  exactly one of the two parts, that each slot is open just inside its
  edges and card just outside, and that inside each outline agrees with
  inside the solid on a grid of points.

---
title: "Monotile"
blurb: "Aperiodic monotile tilings: the hat and the spectre, grown by substitution"
category: design
version: "1.1.0"
---
One shape and endless pattern that never repeats. The "hat" and the
"spectre" are the einstein tiles found in 2023.

## What it is

For sixty years mathematicians asked whether a single shape could cover a
floor with no gaps and no overlaps, yet never fall into a repeating pattern.
In 2023 an amateur, David Smith, found one: the **hat**, a thirteen-sided
shape made of eight kites cut from a hexagon grid. Most hats in the pattern
face one way. About one in seven is a mirror image. Weeks later the same team
found the **spectre**, a fourteen-sided cousin that never needs its mirror
image at all. Slide your eye across the page and you will see the same
clusters again and again, but never the same arrangement twice.

## How to use it

- **Colouring page (line art):** colour the tiles any way you like. Try
  giving the mirror-image hats their own colour and see how rarely they
  turn up, always on their own. Or colour by the way each tile points: hats
  can only point in six directions.
- **Mirror hats highlighted:** the odd ones out are filled for you. On a
  spectre page the highlighted tile is the second spectre of each "Mystic"
  pair.
- **By direction:** each tile is filled by which way it faces, which shows
  the drifting stripes that run through an aperiodic pattern.
- **By cluster:** each tile is filled by the family it belongs to in the
  pattern's hierarchy. For the hat this is the colouring its discoverers
  used: a dark mirror hat surrounded by its three light partners.
- **Curved spectre:** every edge becomes a gentle S-curve. The shape then
  cannot be flipped over to fit, so it is a monotile in the strictest sense.
- **Circle:** clip the pattern to a round medallion instead of the page.

## Purpose

A real, provably correct aperiodic tiling as a colouring page or art print.
It is grown by the published substitution rules rather than drawn by hand,
and every page is checked: the tiles cover the frame exactly, with no gaps
and no overlaps, and every tile is a copy of the one shape.

## History

Robert Berger showed in 1966 that aperiodic tile sets exist, using 20,426
tiles. Raphael Robinson got it down to six, and Roger Penrose (1974) to two.
Whether a single tile could do it (an "einstein", German for "one stone")
stayed open until David Smith, Joseph Samuel Myers, Craig S. Kaplan and
Chaim Goodman-Strauss published "An aperiodic monotile" in March 2023. The
hat needs its mirror image. "A chiral aperiodic monotile" (May 2023) gave the
spectre, which does not.

## This implementation

- **Spec knobs:** `size` (page side, pt); `shape` (`hat` | `spectre`);
  `curved` (spectre: S-curved edges); `tile_size` (approximate tile width on
  the page, pt); `clip` (`page` | `circle`); `colour` (`lines` |
  `reflected` | `orientation` | `cluster`; default `cluster`); `palette` (`auto` | `kaplan` |
  `terracotta` | `ocean` | `meadow` | `ink`); `line` (pt).
- **Generation:** the hat uses the H/T/P/F metatile substitution, following
  Kaplan's reference construction. Each step glues 29 metatiles into a patch
  by matching edges and reads the next level's four outlines off landmark
  points of it. H holds three hats and one mirrored hat, T one hat, P and F
  two each. The spectre uses the nine-type substitution: eight copies of the
  previous level go around a ring (the Mystic Γ rule leaves one slot empty),
  each turned and shifted so a corner of its guiding quadrilateral meets the
  previous copy's, and the ring is reflected, so all spectres keep one
  handedness. The seed picks the top tile type, rotates the whole tiling by
  any angle, and shifts the window by up to 12% of the top tile's size.
  Levels are added until the clipped tile areas sum to the clip region's
  area (to 1e-9), so coverage is measured before a page is accepted. The
  curved spectre replaces every edge with an S-curve that is point-symmetric
  about the edge midpoint. The same rule traversed from either end gives the
  same curve, so neighbours still share edges exactly and areas do not
  change.
- **Solving:** nothing to solve. This is a design.
- **Guarantees (tested):** deterministic per seed, and different seeds give
  different pages. **No gaps:** the clipped tile areas sum to the region's
  area within 1e-9, for page and circle (the circle is measured as a 512-gon)
  and several seeds. **No overlaps:** for every pair of tiles whose boxes
  meet, the exact polygon intersection area (ear-clip triangulation plus
  convex clipping) is at most 1e-7 of a tile. For the hat there is also an
  exact lattice check: every hat's eight kites land on one kite grid, and no
  kite is claimed twice. **One shape:** every tile's edge-length and
  turning-angle sequence matches the prototile up to rotation (the hat also
  up to reflection). Every spectre is a direct copy, never a mirror.
  Spectres meet edge to edge: away from the border, every edge is the exact
  reverse of an edge of exactly one other tile, which is what makes the
  curved variant valid. Tile turns are whole multiples of 60° (hat) or
  30° (spectre). The measured share of mirrored hats is 1,714 of 13,503 (0.1269)
  over four seeds at `tile_size` 16. The limit is 1/(1+φ⁴) ≈ 0.1273, and
  the test requires 0.10–0.16. Each page reports its own `reflected_ratio`
  in meta; default pages show about 0.124–0.127. The default line-art pages pass the ADULT
  colourability gate. Meta records `levels`, `tiles`, `coverage`,
  `gap_free`, `reflected` and `colorable`.
- **Out-of-range knobs (1.1.0+):** when the deepest substitution still
  leaves part of the page bare (small tiles on a big page with the seeded
  window off-centre), the window is centred (`window: centred` in meta), and
  if that is not enough the tiles are made a quarter larger at a time until
  the page is covered (`tile_size` and `requested_tile_size` in meta).
  Patches that covered before are unchanged.


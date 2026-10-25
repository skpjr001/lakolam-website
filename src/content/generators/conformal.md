---
title: "Spiral and Droste Tilings"
blurb: "Periodic tilings bent by conformal maps: logarithmic and double spirals, Escher's Droste twist, circle inversion and the Joukowski aerofoil"
category: design
version: "1.0.0"
---
A plain tiling of squares, hexagons or Truchet curves, bent by the maths of
complex numbers into whirlpools, twin spirals, Escher's endlessly nested
picture-in-a-picture, a circle turned inside out, or an aerofoil in a
stream.

## What it is

Start with a tiling everyone knows — squares, a chessboard, hexagons,
triangles, the 3.4.6.4 pattern of hexagons, squares and triangles, Smith's
quarter-circle Truchet tiles or brickwork. Then push the whole plane through
a *conformal map*: a transformation that bends and stretches but keeps
every angle, so tiles grow and shrink and curve while their corners stay
true. Five maps are offered:

- **Spiral** — tiles wind into a single point, shrinking forever.
- **Double spiral** — tiles stream out of one point and wind into another.
- **Droste** — a framed picture contains itself, smaller, again and again;
  twisted, the frames become one continuous spiral, as in M. C. Escher's
  *Print Gallery*.
- **Inversion** — the tiling turned inside out in a circle: the distant
  tiles crowd into the centre and the near ones balloon outwards.
- **Joukowski** — the map aircraft designers used to turn a circle into a
  wing section; the tiling flows round the aerofoil.

## How to use it

The colour pages are prints and posters. The spirals invite tracing: follow
one row of tiles and watch it wind into the pole, and count how many arms
of each colour there are. On a Droste page, find the frame and follow it
round — it never closes, it spirals into the next, smaller picture.

The line-art page is a colouring sheet. Colouring rows in repeating
colours brings out the spiral arms; colouring like a chessboard brings out
the rings. Every tile is still the same tile it was, only bent — a good
page for talking about what changes under a transformation and what
stays.

## Purpose

To show what a conformal map does, with something familiar: right angles
stay right angles, small squares stay square, only size and direction
change from place to place. The spiral and Droste pages make visible a
piece of algebra — identifying one step of a lattice with a full turn —
that is otherwise hard to picture.

## History

Conformal maps are as old as Mercator's projection (1569) and were made a
theory by Euler, Gauss and Riemann. Logarithmic spirals as the image of a
lattice under the exponential map underlie D'Arcy Thompson's *On Growth and
Form* (1917). Nikolai Joukowski introduced his aerofoil map in 1910. The
Droste effect is named after the Dutch cocoa tin of 1904 that showed a nurse
holding the tin; M. C. Escher drew *Print Gallery* (1956), and Bart de Smit
and Hendrik Lenstra worked out its mathematics — the map `exp(α·log z)`
with `α = 2πi/(log S + 2πi)` — in "The Mathematical Structure of Escher's
Print Gallery" (*Notices of the AMS*, 2003). Truchet's tiles go back to
Sébastien Truchet (1704), the quarter-circle form to Cyril Stanley Smith
(1987). Circle inversion is classical (Apollonius; Steiner and Plücker in
the nineteenth century).

## This implementation

- **Spec knobs:** `width`, `height` (points); `map` (`auto`, `spiral`,
  `double_spiral`, `droste`, `inversion`, `joukowski`); `tiling` (`auto`,
  `square`, `checker`, `hex`, `triangle`, `rhombitrihexagonal`, `truchet`,
  `brick`); `twist` (−8 to 8, null = seed's choice: spirals take that many
  lattice steps per turn, 0 giving rings and rays; Droste: number of arms,
  the sign the direction; inversion and Joukowski: the tiling's tilt in
  7.5° steps); `tiles_around` (4–60, null = seed's choice: tiles round the
  pole, tiles across the Droste picture, or tiles across the page);
  `min_tile` (points); `palette` (`auto`, `majolica`, `jewel`, `citrus`,
  `nocturne`, `sorbet`, `ink`); `style` (`colour`, `lines`); `stroke`.
- **Generation:** spirals choose a lattice vector `u = a·v₁ + b·v₂`
  (`a` = twist, `b` = tiles around, nudged up until the colouring agrees on
  cells `u` apart) and map `w ↦ c + exp(2πi·w/u)`; the double spiral then
  applies `(q·z + p)/(z + 1)` to send the pole to `p` and infinity to `q`.
  Droste cuts the tiling to a square frame `[−1, 1]²` minus `[−1/S, 1/S]²`
  (`S` = 2 or 3), takes logarithms (periods `ln S` and `2πi`) and maps
  with `α = 2πi/(ln S + 2πik)`, `k` the arms; the frame's edge becomes the
  spiralling bold line. Tiles are enumerated in `log|z|` exactly over the
  range where they are at least `min_tile` and touch the page, one per
  orbit; each outline is warped by adaptive subdivision. Inversion centres
  the tiling on a tile (whose image, everything outside a closed curve, is
  drawn as the frame with a hole); Joukowski cuts tiles against its circle
  (`|w − μ| = |1 − μ|`) before mapping and draws the aerofoil solid.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic per seed; the identified lattice vector
  maps to the identity — `map(w + u) = map(w)` to 1e-8 (tested for every
  spiral map and tiling), so the spiral closes up with no seam; colours are
  equal on identified cells (tested) and neighbouring tiles always differ
  in colour (tested; Truchet regions keep one colour across cell edges);
  the prototiles fill their cell exactly (area, tested); mapped tiles never
  overlap (sampled, tested), and tiles round a pole of the map are
  rejected by their reversed orientation; no tile smaller than `min_tile`
  is drawn (`min_tile` is capped where a map would otherwise lose every
  tile; meta `min_tile_used_pt`). Clamped knobs are reported as `requested_<field>`; the
  line-art style reports its colourability check.

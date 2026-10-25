---
title: "Substitution Tilings"
blurb: "Substitution tilings: the Conway–Radin pinwheel and Danzer's 7-fold triangles, grown from a seeded root"
category: design
version: "1.0.0"
---
Triangles cut into smaller triangles, again and again, until the page is
covered by a pattern that never repeats.

## What it is

A substitution tiling starts from one tile and a rule: blow the tile up
by a fixed factor and cut it into copies of the original shapes. Apply the
rule to every piece, then to every piece of those, and the page fills
with a tiling that has no period — no shift of the page ever lines it up
with itself — yet is built entirely from a handful of shapes. Two classics
are drawn here:

- **The pinwheel tiling** of John Conway and Charles Radin: one right
  triangle with legs 1 and 2, cut into five copies of itself. One copy is
  turned by an angle that is not a whole fraction of a turn, so the tiles
  point in ever more directions: look long enough and you will find a
  tile pointing every way.
- **Danzer's 7-fold tiling**: three triangles whose angles are sevenths of
  a half turn. Every tile points in one of fourteen directions, and the
  pattern carries a seven-fold rhythm no repeating tiling can have.

Each page shows a different patch of the endless tiling, turned and
shifted.

## How to use it

The colour pages are prints. Coloured by direction, the pinwheel shows
its windmills — the five-tile clusters that give it its name — and
Danzer's tiling shows its fans of seven. The thicker lines outline the
larger tiles one step up, so you can see how every big triangle is made of
small ones of the same shapes.

The line-art page is a colouring sheet. Try colouring all the tiles that
point the same way in one colour, or colour each outlined big triangle as
one patch, and watch the hidden structure appear.

## Purpose

A first look at aperiodic order — the mathematics behind quasicrystals —
drawn exactly: every tile is an exact scaled copy of a prototile, and the
pieces of every tile fit together with no gaps and no overlaps.

## History

Rep-tiles and substitution rules go back to Solomon Golomb (1964). Charles
Radin described the pinwheel tiling, from a construction by John H.
Conway, in "The pinwheel tilings of the plane", *Annals of Mathematics*
139 (1994); it was the first tiling shown to have tiles in infinitely many
orientations. Ludwig Danzer studied tilings with seven-fold symmetry with
Martin Nischke ("A construction of inflation rules based on n-fold
symmetry", *Discrete & Computational Geometry* 15, 1996). See also
Grünbaum and Shephard, *Tilings and Patterns* (1987, ch. 10), and Baake
and Grimm, *Aperiodic Order*, vol. 1 (2013).

## This implementation

- **Spec knobs:** `width`, `height` (points); `kind` (`auto`, `pinwheel`,
  `danzer`); `tiles` (roughly how many tiles span the frame, 3–60 — it
  sets the tile size and so the number of levels; line-art pages draw tiles
  1.6 times larger so every piece can be coloured); `colouring`
  (`orientation`, `prototile`, `supertiles`, `lines`); `palette` (`auto`,
  `atlas`, `garden`, `dusk`, `sea`, `ember`, `ink`); `outlines` (supertile
  levels outlined, 0–3); `stroke` (tile edge width, 0–4).
- **Generation:** each rule is a table of children in affine coordinates
  of the parent's corners, so it applies to a tile in any position, turn or
  mirror image, and a child's corner order always matches its prototile's
  angles. Pinwheel: the √5-inflated triangle is cut by the altitude into a
  unit copy and a double copy, the double copy into two corner copies and
  a parallelogram split along its diagonal (three children mirrored, two
  not — the cut that makes the orientations dense; the other diagonal
  mirrors all five and leaves only four directions). Danzer: triangles
  with angles (1,2,4), (1,3,3) and (2,2,3)·π/7, inflation
  σ = sin(3π/7)/sin(π/7) ≈ 2.247, cut into 4, 5 and 7 children; the
  dissections were found by an exhaustive corner-filling search. The root
  is a seeded prototile, turned and possibly mirrored, scaled by λⁿ so its
  incircle holds the frame with room for a seeded shift; tiles whose
  bounding box misses the frame are culled at every level. Tiles are cut
  to the frame (Sutherland–Hodgman) and filled by colour, then edges and
  supertile outlines are stroked.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic per seed; every child is an exact copy of
  its prototile (sides to 10⁻⁹, tested); inflation preserves area exactly
  (children's areas sum to the parent's, tested); children tile their
  parent with no overlap and no gap (dense point sampling, tested) and the
  drawn leaves cover the frame exactly once (tested); pinwheel directions
  keep multiplying with depth, Danzer's stay on the 14-fold star (tested).
  `verification: children_tile_parent`. Clamped knobs are reported as
  `requested_<field>`; the line-art style reports its colourability check.

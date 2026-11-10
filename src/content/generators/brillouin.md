---
title: "Brillouin Zones"
blurb: "Brillouin zones: the nested, equal-area cells of a lattice's reciprocal space, cut by perpendicular bisectors"
category: design
version: "1.0.0"
---
The nested, equal-area zones of a crystal lattice's reciprocal space: a
star of interlocking polygons cut by nothing but perpendicular bisectors.

## What it is

Pick a regular grid of points — a lattice — and stand at one of them, the
origin. Every other point has a line exactly halfway to it: its
perpendicular bisector. Those lines cut the plane into pieces. The pieces
you can reach from the origin without crossing a single line form the
first zone; crossing exactly one line puts you in the second zone, two
lines in the third, and so on. The zones nest round each other like the
layers of a star, each split into more and smaller pieces than the one
inside it, and — surprisingly — every zone has exactly the same total area.
Better still, the pieces of any zone can be slid back by lattice steps to
fill the first zone exactly once, like a jigsaw. The page shows the zones
in place, the jigsaw for each zone, or both.

## How to use it

As a print, it is a geometric star whose colours step outward zone by
zone; square, hexagonal, rectangular, centred and oblique lattices give
very different stars, and the faint lines behind are the bisectors that cut
them. The panels in the reduced view are a puzzle in their own right: each
shows how one zone's scattered pieces fit back together into the central
cell. The line-art page is a colour-by-zone sheet: each piece carries its
zone number where it fits — colour each number its own colour, and the
star appears. Pick a few related colours and let them darken or lighten
outward.

## Purpose

To make a central object of solid-state physics visible and touchable: the
zones decide how electrons and waves move through a crystal, and their
equal areas and exact jigsaw fit are true facts the picture shows rather
than claims.

## History

Léon Brillouin introduced the zones in 1930 ("Les électrons libres dans
les métaux et le rôle des réflexions de Bragg", *Journal de Physique et le
Radium* 1), explaining how the free electrons of a metal are reflected by
the crystal planes: a zone boundary is exactly where an electron wave
satisfies Bragg's condition. The first zone is the Wigner–Seitz cell of the
reciprocal lattice, after Eugene Wigner and Frederick Seitz (1933).
Ludwig Bieberbach proved in 1939 that all zones have equal area
("Über die Inhaltsgleichheit der Brillouinschen Zonen", *Monatshefte für
Mathematik und Physik* 48). Harry Jones's *The Theory of Brillouin Zones
and Electronic States in Crystals* (1960) and Ashcroft and Mermin's
*Solid State Physics* (1976) made the extended and reduced zone schemes,
and their striking star diagrams, standard textbook pictures.

## This implementation

- **Spec knobs:** `width`, `height` (points, 200-3000; default 600 × 750);
  `lattice` (`auto`, `square`, `hexagonal`, `rectangular`,
  `centred_rectangular`, `oblique`; auto picks per seed, and the seed picks
  side ratios and angles where a lattice has them); `zones` (1-30, default
  10); `scheme` (`extended` — default, the zones in place; `reduced` — one
  panel per zone folded into the first; `both`); `style` (`colour`, `lines`
  — numbered outlines); `palette` (`auto`, `spectrum`, `ocean`, `ember`,
  `pastel`, `ink`); `bisectors` (draw the cutting lines out to the frame,
  default on); `stroke` (0.2-4).
- **Generation:** the lattice basis is scaled to unit cell area 1. A large
  square is split, exactly, by the bisector `x·g = |g|²/2` of every lattice
  point `g` that can reach it, in order of `|g|`; each convex piece carries
  how many bisectors it lies beyond and is dropped once that reaches the
  zone count. Crossing any bisector changes the count by exactly one, so no
  two pieces of one zone share an edge: every finished piece is a single
  convex zone piece and no polygon union is needed. If any kept piece
  touches the square it is enlarged and the cut repeated. The reduced
  scheme shifts each piece by every lattice vector that brings part of it
  over the first zone and clips it there (convex clipping). Colour pages
  fill pieces by zone with a slight light/dark alternation so neighbours
  always part; line art labels each piece with its zone number when the
  number fits inside it.
- **Guarantees:** deterministic per seed. Every zone's area equals the unit
  cell's, and so does the total of its folded pieces in the reduced scheme
  (tested to 1e-8 on every lattice at 1, 6 and 14 zones; meta
  `max_area_error`). The zones exactly partition the region they cover:
  random points are classified by brute force (counting lattice points
  closer than the origin) and each one inside zones 1..N lies in exactly
  one piece, of that zone, and points beyond lie in none; every point of
  the first zone is covered exactly once by each zone's folded pieces
  (tested). Pieces are convex. `verification:
  equal_zone_areas_exact_partition`. Outer zones have very small pieces,
  so the line-art page at many zones does not pass the colourability check
  (`colorable` reports it). Clamped knobs are reported as
  `requested_<field>`.

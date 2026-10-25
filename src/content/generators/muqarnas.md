---
title: "Muqarnas Plans"
blurb: "Muqarnas vault plans: tiers of squares and rhombi round a central star, every tier closed"
category: design
version: "1.0.0"
---
The flat plan of a honeycomb vault: rings of squares and rhombi stepping out
from a star, every ring closing exactly on the one inside it.

## What it is

A muqarnas is the cascade of small niches that carries a dome, a portal hood
or a corner squinch down to its walls. Seen from below and drawn flat, it
becomes a plan: a central star, then tier after tier of cells whose outlines
are a few simple units. This page draws such a plan, in the manner of the
pattern scrolls Islamic master builders worked from: an eight-pointed star
(or a rosette of four squares) and up to ten tiers of unit squares and 45°
rhombi round it. Each tier is a ring that fits the tier below exactly: a cell
stands on an edge, fills a notch, or closes a corner, and nothing else. The
plan has the full symmetry of its centre: eight-fold (or four-fold), mirrored.
It can be shown whole in an octagonal frame, or as one quarter, as in the
corner of a square niche, where the mirror lines halve some cells into
triangles and half rhombi.

## How to use it

Display it as a geometric print, or colour it. In the line-art version every
cell is a closed square or rhombus to fill. Try colouring tier by tier
outward from the star, or give every square one colour and every rhombus
another and watch the stars and crosses appear. The heavier lines mark where
one tier ends and the next begins: follow one all the way round, and notice
that it is made of equal steps in only eight directions.

## Purpose

A page with the calm of strict geometry and the richness of a vault, and an
honest picture of how such plans are built: from a handful of units, laid so
that each tier shares its vertices with the tier before.

## History

Muqarnas vaults appear across the Islamic world from the 11th century, from
Baghdad and Cairo to Isfahan, Granada and Istanbul. The mathematician
Ghiyāth al-Dīn al-Kāshī described their units — the square, the rhombus,
the half-square triangle, the "almond" and the "jug" — and how to measure a
vault from its plan, in his *Key of Arithmetic* (*Miftāḥ al-ḥisāb*, 1427).
The Topkapı scroll, a Timurid–Turkmen pattern roll of the 15th–16th century
now in Istanbul, preserves many muqarnas plans drawn with fine construction
lines. This page is a geometric grammar in the manner of that tradition, not
a copy of any surviving vault or plan. Sources: Gülru Necipoğlu, *The
Topkapı Scroll: Geometry and Ornament in Islamic Architecture* (Getty,
1995); Yvonne Dold-Samplonius, "Practical Arabic mathematics: measuring the
muqarnas by al-Kāshī", *Centaurus* 35 (1992); Silvia Harmsen, *Algorithmic
computer reconstructions of stalactite vaults — muqarnas — in Islamic
architecture* (PhD thesis, Heidelberg, 2006).

## This implementation

- **Spec knobs:** `base` (octagon, niche_quarter), `centre` (star8,
  rosette4), `tiers` (1–10), `square_bias` (0–1: how often an edge carries a
  square rather than a leaning rhombus), `shading` (none, tiers, units),
  `palette` (auto, scroll, lapis, turquoise, line_art), `construction`
  (faint radial and circular guides), `caption`, `stroke`, `width`,
  `height`, `margin`.
- **Generation:** every vertex is an integer vector in the basis of the unit
  vectors at 0°, 45°, 90° and 135°, unique because √2 is irrational, so
  geometry is decided exactly. A tier is grown on the counter-clockwise
  boundary of the one below: each edge gets an edge cell (a square, or a
  rhombus leaning ±45°) or shares a notch cell with its neighbour across a
  concave corner; the gap at each convex corner is closed by a wedge cell
  spanned by the neighbours' outer sides, allowed only at 45°, 90° or 135°,
  so every cell is a unit square or 45° rhombus. Choices are made for whole
  orbits of edges under the centre's dihedral group, so the plan is exactly
  symmetric. Each tier draws its own mix of squares, rhombi and notches from
  the seed; a sampled tier is kept only if it closes, and a tier that cannot
  be closed sends the search back one tier (bounded backtracking, keeping
  the deepest plan found).
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic per seed; `verification: every_tier_closes`
  — every tier's cells have positive area, its outer boundary is a simple
  polygon, and the cells' areas add up to the area between the two boundary
  polygons. Tested independently: the planar arrangement of all cell
  outlines has exactly one bounded face per cell with matching areas (no
  gaps, no overlaps); every cell corner lies on one of its tier's two
  boundaries and every vertex of the inner boundary is a cell corner
  (consecutive tiers share vertices); the cell set is invariant under
  rotation by 360°/n and the mirror; every cell is a unit square or 45°
  rhombus. Six to ten tiers were reached for every seed tested; should the
  search budget ever run out first, the page draws the deepest closed plan
  found and records `requested_tiers`. The restricted unit set (square and
  rhombus, plus the half units the quarter view cuts) is the one for which
  closure is proved; al-Kāshī's almond and jug are not used. All ink stays
  inside the page.

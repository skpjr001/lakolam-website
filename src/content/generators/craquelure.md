---
title: "Cracks: Mud, Glaze, Craquelure and Basalt"
blurb: "Cracks: drying mud, glaze crackle, old-paint craquelure and basalt columns from hierarchical fracture of a shrinking layer"
category: design
version: "1.0.0"
---
The cracks a drying layer makes — curled mud plates, glaze crackle, an old
painting's craquelure and the hexagonal tops of basalt columns.

## What it is

When a thin layer shrinks while it is stuck to something that does not —
mud drying on firm ground, a glaze cooling on a pot, old paint on a canvas
that moves with the weather — it cracks, and the cracks come in
generations. The first crack runs right across the layer; each later one
splits a single piece and stops where it reaches an older crack, meeting it
squarely in a T. Early cracks gape widest, the last are hairlines. Wet and
dry the mud again and again, or let lava cool slowly into columns, and the
pattern matures: the corners turn into three-way Y-junctions near 120° and
the pieces become rough hexagons, like the tops of the columns at the
Giant's Causeway. A page shows one of four surfaces: dried mud, crackled
glaze, a cracked old landscape painting, or basalt columns from above.

## How to use it

The colour pages are prints and backgrounds: sun-baked earth, a celadon or
ivory glaze with dark main cracks and fine golden ones, a little landscape
under amber varnish, or grey stone. Fewer pieces give bold plates, more
give a fine web; turn the wobble down for straight, brittle cracks and up
for wandering ones, and widen the cracks to make the gaps deep. Adding
drying cycles turns any surface from Ts toward the rounded honeycomb of
old mud and basalt. The ink palette is a colouring page: every piece is a
shape to colour, and the heavier lines are the oldest cracks — try
colouring each big block of pieces in its own family of shades.

## Purpose

A true picture of how cracks grow: the order of the cracks is kept, so the
page reads as a history, oldest and widest first, and the shift from
T-junctions to Y-junctions is the real signature of a layer that has dried
many times.

## History

Hierarchical crack patterns were studied by S. Bohn, L. Pauchard and
Y. Couder ("Hierarchical crack pattern as formed by successive domain
divisions", *Physical Review E* 71, 2005), who showed in drying films that
each new crack divides one existing domain and joins older cracks at right
angles. L. Goehring, L. Mahadevan and S. W. Morris ("Nonequilibrium scale
selection mechanism for columnar jointing", *PNAS* 106, 2009) and
L. Goehring, R. Conroy, A. Akhter, W. J. Clegg and A. F. Routh ("Evolution
of mud-crack patterns during repeated drying cycles", *Soft Matter* 6,
2010) showed how repeated drying moves junctions from 90° toward 120°, the
same order seen in columnar basalt such as the Giant's Causeway in County
Antrim and Svartifoss in Iceland. Deliberate glaze crackle was prized in
Song-dynasty China; Ge ware is famous for its "gold thread and iron wire"
(*jīnsī tiěxiàn*), a coarse dark network with fine golden cracks between.
Craquelure on paintings has been read as evidence of age and origin since
the nineteenth century; S. Bucklow's studies in the 1990s classified its
patterns by school and support.

## This implementation

- **Spec knobs:** `width`, `height` (points, 200-3000); `mode` (`mud`,
  `glaze`, `craquelure`, `basalt`; default `mud`); `palette` (`auto` = the
  mode's own: earth, celadon, amber, slate; or `earth`, `clay`, `celadon`,
  `ivory`, `amber`, `slate`, `ink` for a colouring page); `cells` (main
  pieces, 20-1500, default 160 — glaze adds four times as many fine pieces,
  craquelure breaks three times finer); `cycles` (wetting–drying cycles,
  0-40; empty means the mode's own: 10 for basalt, 0 otherwise); `wobble`
  (0-1, default 0.5); `gap` (crack width multiplier, 0.2-3, default 1).
- **Generation:** the page starts as one piece. The piece with the most
  stored stress (its area times a seeded factor in 0.6–1.4) splits next, by
  a straight crack through its middle (seeded shift along its long axis),
  perpendicular to its long axis with seeded jitter, then turned half-way
  toward the mean normal of the two sides it ends on, so it meets them near
  90°. The crack ends on those sides and the new junctions are also
  inserted into the neighbouring pieces, keeping a shared-vertex planar
  partition. A crack's generation is `⌊log₂(page area / piece area)⌋`; its
  width falls with the generation (in glaze, cracks made after the main
  pieces exist are the fine golden ones). With `cycles > 0` the pieces'
  centroids are moved by that many Lloyd steps (each to the centroid of its
  Voronoi cell, computed by half-plane clipping) and the network is rebuilt
  as their Voronoi diagram. Finally every crack crinkles along its length
  (a three-term sine series, zero at both junctions) and the whole plane is
  bent by one smooth seeded displacement that fades to zero at the border.
  Mud plates are drawn curled and lit from the upper left; basalt columns
  have bevelled tops; craquelure is drawn over an invented landscape (sky,
  clouds, hill ranges, trees) with a lit lip on each crack.
- **Guarantees:** deterministic per seed. The cells partition the page —
  every outline is a simple polygon of positive area, the areas add up to
  the page area (to 1e-9), and every crack edge is shared by exactly two
  cells (tested on every mode at wobble 0.5 and 1). No crack dangles: every
  junction off the border joins at least three cracks, and only the four
  page corners have two (tested). Junction statistics are reported in meta
  (`junctions`: T and Y counts, `t_fraction`, `mean_largest_angle_deg`,
  the mean of each junction's largest angle — the mean of all three angles
  is always 120°, so it is not used). Tested, recomputed independently from
  the cells' corner angles: hierarchical mud has over 90% T-junctions with
  a mean largest angle above 165°; basalt has a mean largest angle under
  140°, over 95% Y-junctions and inner cells averaging six sides within
  0.3; more cycles move the mean toward 120°. Earlier cracks are never
  narrower than later ones (tested). All ink lies inside the page. The ink
  palette passes the adult colourability check. `verification:
  planar_partition_no_dangling_ends`. Clamped knobs are reported as
  `requested_<field>`.

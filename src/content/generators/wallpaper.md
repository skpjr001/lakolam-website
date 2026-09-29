---
title: "Wallpaper"
blurb: "Surface patterns and seamless repeat tiles from the 17 wallpaper groups"
category: design
version: "1.1.0"
---
Surface patterns and seamless repeat tiles built from the seventeen
wallpaper groups: leaves, petals, stars and small florals placed once and
repeated across the plane by rotation, reflection and glide.

## What it is

A repeating pattern of the kind printed on fabric, gift wrap and
wallpaper. A few simple shapes are arranged in one small patch of the
plane, and that patch is copied everywhere by one of the seventeen ways a
flat pattern can repeat: slid along two directions only, turned about
points by a half, third, quarter or sixth of a turn, reflected in mirror
lines, or reflected and slid at once (a glide). Where the pattern turns
about a point, a medallion (a twelve-point star, a scalloped rosette or a
ring) sits exactly on that point, and leaves and petals placed near it are
turned into a rosette around it; beside a mirror line they become mirrored
pairs. Small dots fill the gaps. No two shapes anywhere on the page touch.

The shapes: leaves (with veins), petals, drops, rings, stars, crescents,
arches, triangles, diamonds, hexagons, scalloped flowers, sprigs and
hearts. The colour schemes: garden, ocean, terracotta, nursery pastels and
midnight, on their own ground, on white or on a dark ground; or plain black
line art to colour in.

The page is either a full sheet of pattern inside a margin, or exactly one
**repeat tile**: a rectangle whose right edge continues into its left edge
and whose bottom continues into its top, so that copies laid side by side
and top to bottom make an unbroken pattern of any size.

## How to use it

Print a full page as wrapping paper, a scrapbook sheet, a background for
cards or a pattern to frame. For fabric, wallpaper or print-on-demand
products, use the repeat tile: upload it as a repeating design, set the
repeat to "basic" (straight, not half-drop), and the service lays copies
edge to edge. Scale it to taste: the drawing is vector art, crisp at any
size. Choose the line-art version to colour: every shape is a closed
outline large enough to fill, the tiny details are solid dots, and the
pattern's symmetry makes a satisfying page to colour in a scheme of your
own, repeating the same colours wherever a shape repeats.

## Purpose

Surface pattern design is one of the largest markets for printable art,
and the difference between a pattern that sells and one that does not is
often the repeat: a tile whose edges do not quite meet shows a seam every
few inches down a bolt of fabric. The generator makes the repeat exact by
construction and lets the symmetry do the composing, so every seed is a
coherent design rather than scattered clip art.

## History

Every repeating flat pattern has one of exactly seventeen symmetry types,
a fact proved by Evgraf Fedorov in 1891 and George Pólya in 1924. Craftsmen
found all seventeen long before the proof: the tilework of the Alhambra,
Roman floor mosaics, Chinese lattice windows and Egyptian ceiling
paintings. William Morris's wallpapers and textiles in 19th-century England
made the carefully drawn, invisibly seamed repeat an art in its own right,
and M. C. Escher's notebooks explored the groups after he studied the
Alhambra. Today the same repeats are made for print-on-demand fabric and
paper services.

## This implementation

- **Spec knobs:** `group` (`auto` or any of `p1`, `p2`, `pm`, `pg`, `cm`,
  `pmm`, `pmg`, `pgg`, `cmm`, `p4`, `p4m`, `p4g`, `p3`, `p3m1`, `p31m`,
  `p6`, `p6m`), `cell` (lattice repeat length in points, default 144 =
  2 in), `motifs` (main motifs per fundamental region, 1 to 8), `density`
  (0 to 1, filler dots), `shapes` (restrict the motif library; empty means
  all but the plain dot), `palette` (garden, ocean, terracotta, nursery,
  midnight, line), `background` (palette, white, dark, none), `output`
  (`page` or `tile`), `width`, `height`, `margin` (page output), `stroke`
  (line art), `bold` (Bold & Easy, below).
- **Generation:** the group's cosets and lattice come from `lako-geom`
  (shared with mandala) and are scaled to the cell. The placer solves each
  non-identity coset (with lattice shifts) for its fixed points and mirror
  lines, reduced into the base cell. Medallions go exactly on the
  highest-order rotation centres; they have twelve-fold dihedral symmetry
  with a vertex on the x-axis (12-point stars, 12-lobed rosettes, 48-gon
  rings), which every wallpaper rotation (multiples of 60 or 90 degrees) and
  mirror direction (multiples of 15 degrees) maps onto itself vertex for
  vertex. Main motifs are sized to share the fundamental region's area, then
  placed near a rotation centre pointing away from it, beside a true mirror
  at right angles to it, or freely; a candidate is accepted only if its
  covering circles clear every image of everything already placed and every
  one of its own images. A growth pass then enlarges each motif in 5% steps,
  round-robin, while that still holds (capped at 2.6 times). Filler dots go
  in last. Motifs are painted in pattern coordinates (never scaled through a
  transform, so strokes keep their weight) and the page draws, for each
  group element whose copy reaches the view, one group of that motif; a
  medallion's coincident images are drawn once. Line art raises the cell
  when needed so the fundamental region is at least 80 pt square
  equivalent, sizes each motif so its smallest region clears the
  colourability floor, and turns accents too small to colour into solid
  pips; if the page still fails the check, the cell grows 15% and it tries
  again (up to four attempts). Inks too close in lightness to the chosen
  ground are left out. The tile is `cell` by `cell` for the square and
  centred-rectangular lattices and `cell` by `cell` times the square root of
  3 for the hexagonal ones (both lattice periods), clipped from the plane
  pattern. Typically 1 to 10 ms per page.
- **Bold & Easy (`bold`):** a chunky colouring page whatever the palette:
  line art, always a page, a heavy line (at least 4 pt), a cell of at least
  170 pt and a fundamental region of at least 110 pt square-equivalent, one
  or two main motifs, no sprig (a stem of small leaves) and no filler dots.
  Veins are dropped and accents too small to colour are left out rather than
  inked as pips; motifs are sized so their regions clear 1.4 times the kids'
  200 mm² floor, kept apart by lanes of three line widths, and may grow to
  four times their placed size. Only whole motif copies lying inside the
  frame (clear of it by two line widths) are drawn, so nothing is sliced into
  slivers at the edge: the pattern floats on one open ground. Checked
  against the kids' profile; meta adds `bold`, `colorability_profile` and
  `stroke_pt`.
- **Solving:** nothing to solve — a design.
- **Guarantees:** deterministic per seed. Tested for all 17 groups across
  many seeds: the emitted geometry is invariant under every generator of the
  group (each coset and both lattice translations map every path vertex,
  with its paint, onto a vertex of the pattern); a tile's content equals the
  content of every translate of it by its width and height, so tiles meet
  seamlessly (whatever crosses one edge continues from the opposite edge),
  and a hexagonal tile is exactly `cell` by `cell` times the square root of
  3; no two copies of any motif overlap (their covering circles, proven to
  cover every outline point, are disjoint); medallions sit exactly on
  rotation centres; line art passes the colourability check at the adult
  floor (and reports its findings in meta, with a debug overlay if it ever
  fails) and uses black only. Meta records the group, symmetry order,
  lattice, cell, motifs placed, medallions, fillers, palette, output, the
  tile size and `seamless` for tiles. Bold pages are tested for all 17
  groups on the rendered page: every patch of paper is at least 200 mm², and
  the page has no solid marks and no line under 4 pt.

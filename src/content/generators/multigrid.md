---
title: "Multigrid Tilings"
blurb: "De Bruijn multigrid tilings — Penrose, Ammann-Beenker and 2n-fold rhomb tilings from n overlaid grids, edge to edge by construction and checked exactly"
category: design
version: "1.0.0"
---
Penrose, Ammann–Beenker and their 2n-fold cousins, built from overlaid grids
of lines: rhombs that fit edge to edge forever and never repeat.

## What it is

A page of a quasiperiodic rhomb tiling. Every tile is a rhombus with sides of
one length, and the tiles meet edge to edge with no gaps and no overlaps, yet
the pattern never repeats itself. Five grids give Penrose's famous tiling of
fat and thin rhombs with its tenfold stars; four give the Ammann–Beenker
tiling of squares and 45° rhombs with eightfold stars; seven, nine or twelve
grids give richer tilings with three to six rhomb shapes. Tiles are coloured
by shape, by direction, or along the ribbons that run through the tiling,
and the page can be a full rectangle or a round medallion, drawn in colour,
as stained glass or as a colouring page.

## How to use it

Print it as wall art, frame the medallion, or colour it in. On a colouring
page, try colouring by shape first: every fat Penrose rhomb one colour and
every thin one another, and the stars and decagons jump out. Then try
following a ribbon: start at a tile, step to the neighbour across the
parallel edge, and keep going. The ribbon wanders across the whole page
without ever crossing itself, and every tile lies on exactly two ribbons.
Quilters and tilers can use the rhombs as templates, because every tile on
the page is one of a handful of shapes, all with sides of the same length.

## Purpose

Quasiperiodic tilings are among the most striking patterns in mathematics
and design: ordered, symmetric at every scale, and never repeating. Most
pages show only Penrose's tiling, drawn by subdivision. The multigrid
method draws a whole family of tilings, with every tile placed exactly, so
colour schemes can follow the deep structure (shapes, directions and
ribbons) that the method makes visible.

## History

Roger Penrose found his aperiodic tilings in 1974. In 1981 N. G. de Bruijn
showed that the rhomb tiling is the dual of a "pentagrid": five sets of
parallel lines. Each crossing of two lines becomes one rhomb, and every rhomb
comes from a crossing. Robert Ammann found the eightfold tiling of squares
and rhombs in the 1970s, and F. Beenker described it in 1982. The same
construction with n grids gives a 2n-fold tiling, and in 1984 the discovery
of quasicrystals by Dan Shechtman showed that nature uses this kind of
order too. The multigrid method is now the standard way to draw these
tilings in software, from crystallography tools to Krita's fill layers.

## This implementation

- **Spec knobs:** `grids` (3–12), `offsets` (balanced, random), `density`
  (4–60 tile edges across the window), `colour_by` (shape, orientation,
  ribbons), `style` (colour, stained glass, colouring), `window` (rectangle,
  circle), `palette` (auto, jewel, ocean, earth, sunset, mono; ignored on a
  colouring page), `stroke` (0.1–8 pt), `width`, `height` (144–3000 pt),
  `margin`. Out-of-range values are clamped and reported as `requested_*`.
- **Generation:** grid j is the lines x·e_j = k + γ_j with e_j at angle
  πj/n. The offsets γ_j are seeded; balanced offsets add up to zero (with five
  grids this is exactly Penrose's tiling). Each crossing of lines from
  grids j and l is solved exactly. Every other grid's strip index there,
  K_m = ⌈x·e_m − γ_m⌉, gives the rhomb's corner Σ K_m e_m and its edges e_j
  and e_l. If a crossing lies within 10⁻⁷ of a third line, the offsets are
  redrawn, so no three lines ever meet. A seeded point picks where in the
  endless tiling the window looks. Tiles are clipped exactly to the window
  (a rectangle or a 192-gon circle), so nothing crosses the frame. The
  ribbon colouring picks out the tiles of one grid's lines in alternating
  colours.
- **Solving:** nothing to solve; it is a design.
- **Guarantees:** deterministic per seed. The finished patch is
  re-checked from the tile list alone, in exact integer lattice coordinates
  (`verification: edge_to_edge_exact_lattice_check`). No directed edge is
  used twice (no overlaps), every edge inside the window is shared by two
  tiles from opposite sides, and the rhomb angles round every corner inside
  the window add up to exactly 2n units of π/n (no gaps). The clipped tiles
  also cover the window's area to within 10⁻⁶. Tests confirm this for every
  grid count, both offset modes and both windows. They also sample points to
  check each is covered exactly once and that all sides are equal. Thick
  and thin Penrose rhombs come in the golden ratio, and Ammann–Beenker
  rhombs and squares in the ratio √2. Hand-broken tilings (a duplicated,
  missing or swapped tile) are refused. Every option is shown to change the
  page, and every boundary value generates a finite page that stays inside
  its bounds. The colouring page is run through the adult colourability
  check and the result is reported as `colorable`. Tiles clipped by the frame
  can fall under its 40 mm² floor, so this is a report, not a promise.

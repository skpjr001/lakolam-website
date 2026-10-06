---
title: "Op Art"
blurb: "Op art — Vasarely and Riley figures: bulging checkerboards, movement in squares, currents, tunnels, zebras, moiré"
category: design
version: "1.0.0"
---
Black-and-white figures that seem to bulge, ripple and spin — op art in the
manner of Victor Vasarely and Bridget Riley.

## What it is

Optical art builds movement out of nothing but hard-edged shapes. A plain
checkerboard, a stack of stripes or a nest of rings is bent by a smooth,
steady distortion, and the eye reads the bending as depth or motion. Seven
figures:

- **Vega** — a checkerboard that swells toward you through a lens, after
  Vasarely's *Vega* paintings.
- **Squares** — columns of squares that squeeze toward a fold and open out
  again, after Riley's *Movement in Squares*.
- **Current** — wavy bands whose ripples quicken and drift down the page,
  after Riley's *Current* and *Fall*.
- **Tunnel** and **Rings** — nested squares or circles whose centres slide
  toward a vanishing point.
- **Zebra** — stripes swirled and sheared like a zebra's coat, after
  Vasarely's zebras.
- **Moiré** — two sets of rings laid over each other, inked wherever exactly
  one of them is, so the interference itself becomes the picture.

Palettes: black on white, black on cream, or two colours of the same
lightness (red and turquoise, orange and blue, violet and green). Colour
pairs like these make edges shimmer, an effect Riley used in her colour
paintings.

## How to use it

Print it big and hang it: op art is made for walls, and the black-and-white
pages reproduce perfectly on any printer. Pin a few seeds of one figure side
by side and they read as a series. Stare at the centre of a Vega or a
Movement in Squares page for a few seconds and the flat paper starts to
move. The line-art version turns every cell, band and ring into an outline
to colour. Keep strictly to two colours, alternating, and you rebuild the
illusion yourself; break the rule and you get a stained-glass version of it.

## Purpose

Op art is a lasting favourite in printable wall art and an easy one to get
wrong: the effect depends on edges that stay crisp and shapes that never
overlap, however hard the distortion pulls them. Generating it as exact
vector shapes keeps every edge sharp at any size, and gives an endless supply
of variations on a handful of classic figures.

## History

Victor Vasarely's *Zebras* of the 1930s are often called the first op art.
In the 1950s and 60s he built a whole vocabulary of distorted grids, the
*Vega* series among them. Bridget Riley's black-and-white paintings of
1961–65 (*Movement in Squares*, *Fall*, *Current*) made the movement famous,
and the Museum of Modern Art's 1965 exhibition *The Responsive Eye* gave it
its name. Moiré patterns were studied by physicists long before artists
adopted them. They arise wherever two regular gratings overlap.

## This implementation

- **Spec knobs:** `family` (`vega` default, `squares`, `current`, `tunnel`,
  `rings`, `zebra`, `moire`), `grid` (cells across, bands, rings or stripes;
  0 = the family's default of 14, 24, 30, 16, 18, 20 or 14), `strength`
  (0–1, default 0.6), `palette` (`black_white` default, `cream`,
  `red_turquoise`, `orange_blue`, `violet_green`), `bold` (a heavy black
  frame; heavier lines in line art), `line_art`, `stroke`, `width`,
  `height`, `margin`. The effect's centre (lens, fold, vanishing point,
  swirl, ring centres) is seeded.
- **Generation:** every family except moiré starts from a plain figure in an
  undistorted plane and pushes each cell's boundary, sampled densely,
  through a smooth one-to-one map. *Vega*: the radial lens
  `r' = r·(1 + k·e^(−r²/s²))` with `k = 0.25 + 1.25·strength`. Its radial
  profile is strictly increasing for `k < 2.24`, so the map is a bijection
  and the image of the page covers the page. *Squares*: column widths
  `ε + (1 − ε)·d²`, with `d` the distance to a seeded fold, so the column
  edges follow a cubic. Rows are as tall as the widest column. *Current*:
  sine lines whose frequency and phase drift down the page. The amplitude
  is reduced until no two neighbouring lines come closer than a third of
  their spacing, and the gaps between lines are the bands. *Tunnel /
  rings*: nested squares or circles whose centres drift toward a seeded
  point (eased by `t^1.5`). The drift is scaled back until each step moves
  the centre less than 70% of the step in size, so rings nest strictly.
  *Zebra*: stripes pass through a monotone warp across them, then a swirl
  (each circle about a seeded centre turns rigidly by an angle fading with
  radius), then two shears, `x += h(y)` and `y += g(x)`. Each map is a
  bijection, so their composition is one. *Moiré*: the field
  `sin(π·d₁/w)·sin(π·d₂/w)` is positive exactly where one ring system is
  inked. Its zero set is traced by marching squares (`lako_geom::isoline`)
  with the border held negative so every loop closes, and each loop is
  oriented by probing the field beside its longest edges, so the ink fills
  correctly under the non-zero rule. Ink cells are drawn as one path over a
  paper-coloured frame, all clipped to the frame.
- **Solving:** nothing to solve. This is a design.
- **Guarantees (tested):** deterministic per seed, and seeds differ.
  Every ring of every family is a simple polygon, checked edge against edge
  across seeds and the full strength range. The partition families tile the
  frame exactly: random probe points lie in exactly one region, holes
  included. Ink and paper alternate across every probed edge. Moiré ink
  matches the sign of the field at every probe away from the zero set.
  Tunnel rings nest strictly. Current bands keep at least a third of their
  spacing. The colour palettes pair colours within a contrast ratio of 1.1.
  Line-art tunnels pass the adult colourability gate. Meta reports
  `partition`, `two_coloured`, `simple_polygons`, `smallest_region_mm2`,
  the seeded centre and the family's parameters. Every family at its
  largest grid takes well under a second.
- **Caveats:** op art is about fine detail, so line-art pages of the
  compressing families (squares near the fold, vega near the frame) have
  cells below the adult colouring floor, and `colorable` says so. The
  conformal square-to-disc variant of Vega is not implemented; the radial
  lens gives the classic look.

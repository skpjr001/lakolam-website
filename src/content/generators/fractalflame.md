---
title: "Fractal Flames"
blurb: "Fractal flames after Scott Draves: chaos-game function systems with nonlinear variations, cut into glowing density bands"
category: design
version: "1.0.0"
---
Glowing, curling fractal flames after Scott Draves: a few simple maps,
played as a chaos game millions of times, and the density they leave
behind cut into nested bands of light.

## What it is

A fractal flame is drawn by a game of chance. A point jumps around the
plane; at every step one of a handful of rules is picked at random — each a
stretch, turn and shift followed by a curving twist such as a swirl, a
spherical inversion or a julia fold — and the point lands somewhere new.
After millions of jumps the places it visits form a shape of filaments,
arcs and veils, the attractor of the system, and how often each spot was
visited becomes how bright it glows. Each rule also carries a colour, which
the point blends with as it goes, so each part of the shape takes the
colour of the rules that made it. Optional symmetry repeats the shape
round the centre like a kaleidoscope. Here the glow is drawn as nested
bands, each a level of brightness, so the flame reads like a luminous
contour map.

## How to use it

Print the dark page as a poster: the brightest bands sit where the flame
is densest and the faint outer bands are its haze. Try other seeds for
whole new flames, a symmetry for mandala-like flames, or one variation
(say swirl, julia or spherical) to see its character. The light style
prints as ink on paper and saves toner; the line-art style is a dense,
detailed colouring page for patient colourists — colour band by band from
the outside in, darker to lighter.

## Purpose

To put a celebrated piece of generative art — and the honest maths behind
it — onto paper as clean vector art: every band is a true level of how often
the chaos game visited that place.

## History

Iterated function systems were set out by John Hutchinson (1981) and made
famous by Michael Barnsley, whose *Fractals Everywhere* (1988) popularised
the "chaos game" way of drawing their attractors. Scott Draves invented the
fractal flame in 1992, adding nonlinear *variations*, colour that follows
the transforms, and log-density tone mapping so that the huge range of
visit counts becomes visible structure; the algorithm is written up in
Draves and Erik Reckase's paper *The Fractal Flame Algorithm* (2003,
revised 2008) and implemented in the open-source flam3. Flames became
widely known through Draves's distributed screensaver Electric Sheep
(1999), in which viewers' votes breed new flames, and through editors such
as Apophysis.

## This implementation

- **Spec knobs:** `width`, `height` (points, 200-3000; default 600 × 750);
  `transforms` (2-6, default 3); `variation` (`auto` — a seeded mix of the
  filament-forming variations julia, spherical, swirl, polar, handkerchief,
  bubble, disc, hyperbolic, horseshoe and spiral — or one of `linear`,
  `sinusoidal`, `spherical`, `swirl`, `horseshoe`, `polar`, `handkerchief`,
  `heart`, `disc`, `spiral`, `hyperbolic`, `diamond`, `julia`,
  `exponential`, `eyefish`, `bubble`, `cylinder`, used by every transform,
  sometimes with a little linear); `final_transform` (default on);
  `symmetry` (`auto` — three in four auto flames get one — `none`,
  `mirror`, `rot2`-`rot8`, `dihedral3`, `dihedral4`, `dihedral6`);
  `palette` (`auto`, `fire`, `ocean`, `aurora`, `sunset`, `orchid`);
  `style` (`dark` — default, `light`, `lines`); `levels` (density bands,
  4-24, default 16); `quality` (`draft`, `normal`, `fine`: point budget and
  grid resolution); `gamma` (1-5, default 2.2); `stroke` (band edge, 0-3,
  default 0 — no edge).
- **Generation:** each transform is a contractive affine map (rotation,
  scale 0.35-0.85, shear, optional flip, shift) followed by a normalised
  blend of variations, with a weight and a colour coordinate; the colour is
  averaged with the chosen transform's at every step (`c ← (c + cᵢ)/2`).
  A seeded final transform (one of ten variations under a turn and scale)
  is applied to every plotted point; symmetry plots every point's rotated
  or mirrored copies. A 30,000-point pilot run sets the camera (robust
  percentile bounds; centred for symmetric flames). The chaos game runs a
  fixed number of steps into a histogram of hits and colour sums: the
  quality's budget `n` (draft 250,000 on a 140-cell grid, normal
  10,000,000 on 560 cells, fine 20,000,000 on 760 cells across the short
  side) becomes `2n/(k+1)` steps for `k` symmetric copies, so the work stays
  level across symmetries. Density estimation blends a narrow (σ 0.6 cell)
  and a wide (σ 1.6 cell) Gaussian blur by local density, so thin filaments
  stay sharp and sparse haze is smoothed; the result is tone mapped by
  `log(1 + d)/log(1 + top)` and the gamma. The tone field is cut by
  marching squares into nested band loops at evenly spaced levels; each
  band region is filled with the mean colour coordinate of its cells
  through the palette on a glow ramp — faint outer bands barely lift off
  the night, dense cores run through the palette to white heat (light
  style: ink deepening on paper).
- **Rejecting dull flames:** each attempt is measured on a draft histogram
  at the default gamma and a fixed tone level (so `quality`, `gamma` and
  `levels` never change which flame is drawn) and must cover 6-50% of the
  frame, keep at most 65% of the hits in the densest 1% of cells, leave at
  least a fifth of its outline's rows dark (no fog: fill ≤ 0.8), break into
  at most 10 + 5 × copies separate pieces (no bead dust), and score at least
  0.4 on *filament*: the share of covered cells within two cells of the
  dark (lumpy blobs score low, arcs and threads high). Failures retry with
  derived seeds, up to 24; after that a fixed preset flame (hyperbolic and
  horseshoe arcs under an eyefish final transform, which it always keeps)
  is used. Meta reports `attempts`, `preset` (`seeded` or `fallback`) and
  the measured numbers (`checked_at_draft`).
- **Guarantees:** deterministic per seed; the histogram is a fixed point
  count (tested: identical counts on rebuild, the step count is the
  budget's, and the hits equal the points plotted inside the frame).
  Accepted flames lie inside all the bounds above, recomputed independently
  from the raw histogram in tests. The preset passes the coverage,
  concentration, fill and piece bounds (tested at several page shapes) but
  is not held to the filament score, and with a forced symmetry it may not
  meet the others. Band loops are nested and never cross, up to the
  simplification tolerance (tested pairwise). `verification:
  fixed_iterations_nested_bands_coverage_bounded`. The line-art page is very
  detailed and does not pass the colourability check (`colorable` reports
  it). Clamped knobs are reported as `requested_<field>`.

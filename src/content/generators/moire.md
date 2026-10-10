---
title: "Moiré"
blurb: "Moiré op art: overlaid line, ring, spoke, wave and spiral gratings, slightly turned, stretched or shifted so large interference fringes appear"
category: design
version: "1.0.0"
---
Two sets of fine lines laid over each other, and broad bands appear that
neither set contains.

## What it is

A moiré pattern appears wherever two regular gratings overlap: two window
screens, a striped shirt on a television, a folded net curtain. Each grating
alone is a flat grey texture. Turn one a few degrees, stretch it a little or
slide it sideways, and the two fall in and out of step across the page. Where
their lines sit side by side the page looks dark. Where they lie on top of one
another it looks light. The eye reads these slow changes as large bands,
rings and curves, the fringes, that no single line draws.

Seven combinations:

- **Circles** (the default): two sets of rings with nearby centres, which
  give fringes like the field lines of two charges.
- **Lines**: two sets of parallel lines, one turned or stretched a little.
  The fringes are straight bands.
- **Radial**: two starbursts of spokes with nearby hubs. The fringes are
  circles through both hubs.
- **Lines and circles**: straight lines over rings. The fringes are
  parabolas.
- **Wavy**: straight lines over lines with ripples too small to notice. The
  fringes show the ripples as large, slow waves.
- **Spirals**: two spirals with nearby centres, turning the same way or
  opposite ways.
- **Triple**: three sets of lines at 60 degrees, one turned slightly. Bands
  sweep across the mesh where its triangles turn into stars and hexagons.

The seed picks the combination when the kind is auto. It also picks how far
the second layer is turned, stretched or slid, unless you set these yourself.
The design fills a circle, a square or the whole page. Line art is black on
white. The colour style draws each layer in its own colour from a palette.

## How to use it

Print it and hang it, or hold it at arm's length and watch the bands. Then
bring it close: the bands vanish into plain lines, and come back as you step
away. Tilt the page, or look at it from the side, and the fringes swing and
slide much faster than the paper moves. That is the magnifying power of
moire at work.

For a hands-on demonstration, print two pages of the same design, one of them
on clear film, and lay the film over the paper. Turn it slowly and the
fringes grow, shrink and wheel around. Slide it and they race across the page.

This is op art, not a colouring page. The lines are too close together to
colour between, and the shapes you see are made by your eye, not drawn.

## Purpose

Moiré is one of the simplest ways to make a picture that seems to move: two
plain textures and a tiny mismatch. These pages make the effect easy to
print sharply at any size, show the classic combinations side by side, and
put a working demonstration of interference on a classroom wall. Every line
is placed exactly, so the fringes appear where the mathematics says they
should, and the page records where that is.

## History

The word comes from French *moiré*, "watered", the name for silk pressed so
that its two layers of weave leave a shimmering, wood-grain pattern. Lord
Rayleigh used the effect in 1874 to compare the rulings of diffraction
gratings: laying two gratings face to face showed their errors as broad
bands. The physical chemist Gerald Oster made moiré famous outside the
laboratory with "Moiré Patterns", written with Yasunori Nishijima for
*Scientific American* in May 1963. It set out the indicial rule (the fringes
are the curves along which the line numbers of the two gratings differ by a
constant), showed ring, line and spoke gratings, and was followed by moiré
kits of transparencies sold through Edmund Scientific. Artists of the op art
movement of the 1960s, among them Jesús Rafael Soto and Ludwig Wilding, built
works from overlapping gratings. In 1994 Hutley, Hunt, Stevens and Savander
described the moiré magnifier, in which a small mismatch between two arrays
magnifies a pattern hidden in one of them, an effect now used in security
features on banknotes. Isaac Amidror's *The Theory of the Moiré Phenomenon*
(2000) gives the modern Fourier treatment.

## This implementation

- **Spec knobs:** `kind` (`circles` default, `auto`, `lines`, `radial`,
  `line_circles`, `wavy`, `spirals`, `triple`), `style` (`line` black on
  white, `colour` one palette colour per layer), `palette` (`sunset`,
  `ocean`, `forest`, `berry`, `rainbow`, `ink_blue`; colour only), `frame`
  (`circle` default, `square`, `none`), `width`/`height` (144-2000 pt,
  default Letter), `margin` (0-144 pt), `pitch` (grating period, 2.5-20 pt,
  default 5), `stroke` (0.5-4 pt, default 1.6, cut to at most 45% of the
  pitch), and three optional knobs that otherwise come from the seed:
  `angle` (0-30 degrees: the second layer's turn, or for rings and spokes the
  turn of the axis between the centres), `stretch` (0.8-1.25: the second
  layer's period over the first's; for spokes the count is divided by it),
  `shift` (0-200 pt: centre offset for rings, spokes and spirals, a sideways
  slide for lines, the phase of the ripples for wavy). Out-of-range values
  are clamped and reported as `requested_<field>`.
- **Generation:** every layer is a grating drawn as exact polylines and
  clipped to the frame by an exact segment clip (Liang-Barsky for squares,
  the line-circle quadratic for circles); arcs are sampled so a chord strays
  under 0.05 pt. Spokes thin toward the hub (spoke `j` starts at the inner
  radius over 2 to the power of the trailing zeros of `j`) so they never
  merge into a blot. Each layer is one path. Lines: normals `phi` and
  `phi + angle`, periods `p` and `p * stretch`. Circles: centres
  `c -/+ (shift / 2) u`, `u` at `beta + angle`. Wavy: the second grating's
  lines are displaced by `0.3 p * sin(2 pi (t + shift) / wavelength)`.
  Triple: periods `1.4 p` at `phi`, `phi + 60`, `phi + 120 + angle`.
- **Solving:** nothing to solve. This is a design.
- **Guarantees (tested):** deterministic per seed, and seeds differ; auto
  draws exactly what the explicit kind draws. For straight-line gratings the
  meta predicts the fringes from the wave vectors `k = n / p` (cycles per
  point, normal to the lines): period `1 / |k_a - k_b|`, which for equal
  periods and a turn `theta` is `p / (2 sin(theta / 2))`, and for a stretch
  alone `p q / |q - p|`; direction perpendicular to `k_a - k_b`;
  magnification `|k_b| / |k_a - k_b|` (how far the fringes move per point the
  second grating moves). The triple's third-order fringes use
  `k_a - k_b + k_c`, which vanishes when the three are exactly 60 degrees
  apart. A test rasterises line pages and measures the fringe period by a
  Fourier search across the fringes: it matches the prediction within 1.5% (measured errors are about 0.2%).
  All ink stays inside the margins on every kind, frame and page shape; the
  clip is checked against random segments. Meta records every layer
  (centres, normals, periods, counts, amplitude), the fringe shape and the
  ink coverage. It sets `colorable: false`: the default page passes the
  adult colouring check's stroke and coverage limits
  (`colorability_check_passed`), but a grating has no regions to colour, and
  the meta says so instead of claiming a colouring page.

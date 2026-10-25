---
title: "Agate Slices"
blurb: "Polished agate slices: Liesegang fortification bands, onyx layers and quartz-lined geodes"
category: design
version: "1.0.0"
---
Polished slices of banded agate: fortification zig-zags, flat onyx layers
and geodes lined with quartz points.

## What it is

A cut and polished agate, seen face on. Agate forms when silica-rich water
seeps into a hollow in volcanic rock and deposits chalcedony on the walls,
layer after layer, working inward. Every band follows the shape of the wall
it grew on, so the bands are nested outlines that sharpen into zig-zag
corners wherever the wall had a crevice: the "fortification" look. Some
stones finish with a different story in the middle. In *onyx* agates the
last silica settled under gravity into flat, level layers, which still show
which way was down when the stone formed. In *geodes* the centre stayed
hollow and clear quartz crystals grew into it from the innermost band. A
page shows one large slab or a tray of six smaller slices.

## How to use it

The colour pages are prints: each palette follows a real stone — fiery
carnelian, pale blue lace, honey-and-green moss, or grey. The line-art page
is a colouring sheet: every band is a ring to colour. Real agates alternate
thin pale bands with thicker coloured ones, and get darker or lighter in
long runs; try a light–dark rhythm, keep the thin bands white, and colour
the flat onyx layers in stripes. In a geode, leave the crystals pale and
shade one face of each point to make it stand out.

## Purpose

A mineral's growth history made into a pattern that is true to how it grew:
the bands really are the distances in from the cavity wall, and their
spacing follows the law of periodic precipitation that makes agate banded at
all.

## History

Agate is named after the river Achates in Sicily, where Theophrastus
(c. 300 BC, *On Stones*) says it was found; it has been carved into seals,
beads and cameos since the Bronze Age. The bands are classically compared to
Liesegang rings, the periodic precipitation bands Raphael Liesegang
described in 1896; S. Jablczynski (1923) observed that successive band
positions grow geometrically, xₙ₊₁/xₙ → 1 + p. On agate genesis see
T. Moxon, *Agate: Microstructure and Possible Origins* (1996), and
P. J. Heaney and A. M. Davis, "Observation and origin of self-organized
textures in agates", *Science* 269 (1995). Onyx ("gravity-levelled") agates
and their use as geological spirit levels are discussed by Moxon and in
G. Holzhey's work on Thuringian agates.

## This implementation

- **Spec knobs:** `width`, `height` (points); `layout` (`auto`, `single`,
  `tray` of six); `kind` (`auto`, `fortification`, `onyx`, `geode`; auto
  picks per slice); `palette` (`auto`, `carnelian`, `blue_lace`, `moss`,
  `ink`); `style` (`colour`, `lines`); `bands` (4–80; a tray uses about half
  per slice); `growth` (the Jablczynski coefficient p, 0–0.3); `inlet` (cut
  the inlet channel into the wall); `stroke`.
- **Generation:** the cavity wall is `r(θ) = R(1 + Σ_{k=2..8} a_k cos(kθ+φ_k))`
  with `a_k ∝ k^−1.5`, a row of botryoidal arches bulging into the cavity
  (they meet in sharp crevices, which erosion keeps sharp as the bands move
  inward), a seeded squash and an optional narrow inlet dip. The depth of
  every grid point is the exact distance to the wall (`lako_geom::sdf`),
  measured at slightly domain-warped positions. Band boundaries sit at
  `dₙ = d₀(1+p)ⁿ` with seeded jitter, a fine pale band leads about half the
  wide ones, and gaps under the minimum band width are merged. The levels
  are traced as closed band loops (`lako_geom::bands`) and painted largest
  first; thick bands carry faint striations. Onyx: the inner region is cut
  by a seeded, slightly tilted level line and filled below it with
  horizontal layers (polygon intersection with strips). Geode: the inner
  region is hollow and the innermost band carries quartz points pointing
  inward, shaded on two faces. The slab's cut edge is a smoothed,
  star-shaped rind round the wall.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic per seed; bands are nested and never cross —
  every loop lies inside the loop of the band outside it (tested) — and
  every band is at least most of the minimum band width wide everywhere
  (tested: ≥ 0.6 × the width the levels were built to, the rest being the
  warp and simplification); band gaps widen inward under the Jablczynski
  law (tested); onyx layers lie inside the core. `verification:
  bands_nested_min_width`. The line-art page passes the adult colourability
  check. Clamped knobs are reported as `requested_<field>`.

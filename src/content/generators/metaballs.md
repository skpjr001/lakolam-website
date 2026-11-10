---
title: "Metaballs"
blurb: "Metaballs: blobs that merge — lava lamps, 70s groovy bands and liquid posters"
category: design
version: "1.0.0"
---
Blobs that merge and split: 70s groovy bands, lava lamps, glossy liquid
drops and dot grids that fuse into chains.

## What it is

A metaball is a soft round blob that reaches out to its neighbours. Put
two side by side and, instead of overlapping like coins, they swell
toward each other, form a neck and melt into one smooth shape; pull them
apart and the neck thins and snaps. Every page here is drawn from that
idea. *Groovy* wraps a cluster of blobs in nested bands of colour, like a
1970s poster; *lava lamp* puts warm wax blobs inside the glass of a lamp,
rising, stretching and pooling at the bottom; *liquid* shows a few large
glossy drops with highlights and soft shadows; *grid* sets a regular grid
of dots whose sizes swell and shrink across the page, so where they grow
they fuse into chains and webs.

## How to use it

The colour pages are posters and prints: try the retro palette for
browns, oranges and mustard, psychedelic for a dark ground and electric
colours, pastel for a nursery or a soft print, or mono for a graphic
black-and-grey sheet. The line-art palette makes a colouring page: every
band is a ring to fill. Alternating a light and a dark colour from the
outside in gives the strongest groovy look; in the lava lamp, colour the
wax from deep red at the edge to yellow in the middle and the liquid
round it dark. More bands give a busier, more hypnotic page; bigger balls
fuse into larger, wilder shapes.

## Purpose

A playful, purely mathematical way to draw organic shapes: every outline
is a contour line of one smooth function, so shapes merge exactly the way
liquid does, and the bands round them are guaranteed to nest neatly.

## History

James Blinn introduced "blobby" implicit surfaces in "A Generalization of
Algebraic Surface Drawing" (*ACM Transactions on Graphics*, 1982), to
render electron-density models of molecules. At Osaka University, Hiroaki
Nishimura and colleagues built the same kind of model, under the name
*metaballs*, for the LINKS-1 graphics computer (1983–85). Geoff Wyvill,
Craig McPheeters and Brian Wyvill published "Data Structure for Soft
Objects" (*The Visual Computer*, 1986), with the polynomial falloff that
stops at a fixed radius; the contour-tracing method used for such
surfaces in 3D is Lorensen and Cline's marching cubes (1987), of which
marching squares is the 2D case. The lava lamp was invented by the
British accountant Edward Craven Walker, whose company Crestworth launched
the Astro lamp in 1963 (the company later became Mathmos); its rising wax
became a symbol of the late 1960s and 1970s, alongside the flowing,
banded lettering and shapes of psychedelic concert posters.

## This implementation

- **Spec knobs:** `width`, `height` (points, 200-3000); `mode`
  (`groovy`, `lava_lamp`, `liquid`, `grid`; default `groovy`); `palette`
  (`retro`, `psychedelic`, `pastel`, `mono`, `line_art`; default
  `retro`); `falloff` (`wyvill`, `inverse_square`); `balls` (2-40,
  default 10; liquid uses about a third as many, larger; the grid about
  four times as many cells; the lamp at most 14 rising blobs plus its
  pool); `bands` (1-8 nested levels, default 6; line-art lamps and liquid drops draw at most three, spread wider, so the rings stay roomy); `scale` (ball size,
  0.5-2); `stroke` (line width, 0.2-4; used by line art and the lava-lamp
  outline only, so it does not change the colour pages).
- **Generation:** each ball adds Wyvill's `(1 − d²/R²)³` (support
  `R = 2.4 r`) or the inverse square `r²/d²` to one scalar field. Level
  `k` is the value at which a lone ball's outline would have radius
  `sₖ·r`, with `s` stepping evenly from an outer to an inner factor
  (groovy 1.9 → 0.5, so the outer bands swallow whole clusters). The
  field is capped by the depth inside a container — the frame, or the
  lamp's glass — as `min(f, T₀·(depth/m)³)`, negative outside, so no
  level can come within the margin `m` of the wall and blobs flatten
  against the glass. It is sampled on a grid of about 280 cells across
  the short side and every level is traced by marching squares into
  closed loops, painted largest first. Groovy places balls by seeded
  rejection sampling (centres at least 0.85·(rᵢ + rⱼ) apart); the lamp
  has a pool of two to four balls at the bottom, an optional blob hanging
  from the top and rising blobs sized to the glass, some with a smaller
  twin just above, necking as they split; the grid sizes its balls by a
  sum of three seeded plane waves; liquid highlights are tilted ellipses
  kept only where they lie wholly inside the innermost band.
- **Guarantees:** deterministic per seed. Every level line closes (no
  open lines) and is a simple polygon; loops never cross one another;
  every point of a level-`k+1` loop lies inside the region of level `k`,
  checked both by evaluating the field directly and geometrically — the
  bands nest. Lava-lamp blobs stay inside the glass, at least the margin
  (less one grid cell) from it, and the glass gleam sits in the wax-free
  margin. Liquid highlights lie inside the innermost band. All ink is
  inside the page. `verification: levels_closed_simple_nested_contained`.
  The line-art pages pass the adult colourability check (loops smaller
  than about 40 mm² are dropped there). Clamped knobs are reported as
  `requested_<field>`.

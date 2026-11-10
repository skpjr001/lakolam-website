---
title: "Ferrofluid"
blurb: "Ferrofluid in a magnetic field: the Rosensweig spike lattice and thin-film labyrinths, in glossy black relief"
category: design
version: "1.0.0"
---
A magnetic liquid pulled into a lattice of glossy black spikes, or squeezed
into labyrinths — the Rosensweig instability in shaded relief.

## What it is

A ferrofluid is an oil carrying iron-oxide particles a few billionths of a
metre across, so the whole liquid responds to a magnet. Put a dish of it in
a vertical magnetic field and nothing happens until the field passes a
critical strength; then the flat surface suddenly rises into a hexagonal
lattice of sharp cones, each one balanced between magnetism pulling it up
and gravity and surface tension pulling it down. Squeeze the same fluid into
a thin film between two plates and the field instead makes it break into
winding stripes that fill the space like a maze, the same labyrinths seen in
thin magnetic garnet films. A page shows the spikes from low over the dish
(or straight down), a labyrinth, or a round patch of spikes where the field
is strongest fading into labyrinth around it.

## How to use it

It is a print: dramatic black-on-colour art for a wall, a cover, a science
poster or a classroom display about magnetism. The spikes in perspective are
the classic look; the top view turns the lattice into a pattern of studs;
the labyrinth is a strong graphic in any of the four colourings. Notice how
the spikes stand in rows of six around each other, and where two tilted
patches of rows meet along a crooked seam — real ferrofluid does the same.
A stronger field gives taller, sharper spikes; more wavelengths make the
lattice finer.

## Purpose

To show one of the cleanest examples of pattern formation in physics: a
uniform liquid choosing a wavelength and a hexagonal order all by itself,
and the same equations giving stripes when the up–down symmetry is not
broken.

## History

Ferrofluids were developed by Stephen Papell at NASA in the early 1960s as
a way to move rocket fuel in weightlessness. In 1967 M. D. Cowley and
Ronald E. Rosensweig described the "normal-field instability" — the
appearance of a hexagonal array of peaks above a critical field — now called
the Rosensweig instability (*Journal of Fluid Mechanics* 30, 1967);
Rosensweig's book *Ferrohydrodynamics* (1985) is the standard account.
Labyrinthine patterns in confined ferrofluid layers were studied by
Rosensweig, Zahn and Shumovich (1983) and by Dickstein, Erramilli, Goldstein,
Jackson and Langer ("Labyrinthine pattern formation in magnetic fluids",
*Science* 261, 1993). The Swift–Hohenberg equation used here was introduced
by Jack Swift and Pierre Hohenberg in 1977 as a model of convection; with a
quadratic term it is the textbook model of hexagonal patterns. Sachiko
Kodama's ferrofluid sculptures (from 2000) made the spikes famous as art.

## This implementation

- **Spec knobs:** `width`, `height` (points, 200-3000); `mode` (`spikes`,
  `labyrinth`, `mixed`); `view` (`oblique`, a perspective camera low over a
  round dish; `top`, straight down with the pattern filling the page);
  `palette` (`cobalt`, `copper`, `studio`, `neon` — the fluid is always
  black); `cells` (wavelengths across the page or dish, 6-28; very long
  pages use fewer, reported as `requested_cells`); `field` (reduced field
  strength above critical, 0.05-1: sets ε and the quadratic term, and the
  spike height); `grains` (hexagonal grains seeded, 1-12; a small dish
  holds fewer, meta `grains_used`); `steps` (relaxation steps, 50-1500).
- **Generation:** the Swift–Hohenberg equation `∂u/∂t = εu − (1+∇²)²u +
  g·u² − u³` is stepped semi-implicitly in Fourier space (a radix-2 FFT with
  deterministic twiddles) for exactly `steps` steps of 0.5 on a 64-256
  grid with at least five points per wavelength. Spikes use `g > 0`
  (hexagons) and start from seeded grains of three plane waves at 120°,
  softly blended, so grain boundaries and dislocations relax into place;
  the labyrinth uses `g = 0` from seeded noise; mixed makes `g` fall to zero
  outside a central patch. The field is zeroed at and beyond the container
  wall after every step. The relaxed field is upsampled spectrally; each
  local maximum becomes a concave cone `H(1 − ρ/r)^1.6` on a rippled sheet,
  the film a flat-topped band. The relief is ray-cast (orthographic or
  perspective, with a soft shadow march toward the key light) and shaded as
  glossy black: two highlights, a ring of reflected light near the horizon,
  a dim sky and Fresnel. Three screen fields — fluid cover, fluid brightness
  and lit ground — are traced with marching squares into closed bands and
  painted largest first; the fluid outline is one compound path with holes.
- **Guarantees:** a fixed step count, so the same spec and seed give the
  same page; the spikes' bond-orientational order ψ₆ (mean |ψ₆| over
  interior spikes, neighbours within 1.35 lattice spacings) is in meta with
  `psi6_global` and `mean_neighbours`, and in spikes mode it is at least
  0.7 (`hexagonal_order`), checked in tests by an independent six-nearest-
  neighbour ψ₆; the field is exactly zero at and outside the wall; every
  traced band is a closed level set (`open_lines: 0`) and labyrinth bands
  are long closed loops; all ink lies inside the page.

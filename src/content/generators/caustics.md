---
title: "Caustics"
blurb: "Caustics: the nephroid in a cup, light on a pool floor, and gravitational-lens arcs and rings"
category: design
version: "1.0.0"
---
The bright curves light draws when it is focused: the heart in a coffee
cup, the dancing net on a pool floor, the arcs of a gravitational lens.

## What it is

A caustic is where a family of light rays folds over itself and piles up
into a bright, sharp-edged curve with pointed cusps. Three kinds:

- **Cup** — sunlight reflected inside a ring, like a coffee cup or a
  wedding ring on a table. Parallel light gives a two-cusped *nephroid*;
  light from a point on the rim gives a heart-shaped *cardioid*; a slightly
  wobbly mirror or a second reflection adds more loops and cusps.
- **Pool** — sunlight through gently rippled water, focused by the curved
  surface into the shimmering bright net on the floor of a swimming pool.
- **Lens** — light from distant galaxies bent by the gravity of a nearer
  galaxy (or a pair, or a galaxy in a cluster's tidal pull), smeared into
  arcs, split into several images, or closed into an Einstein ring.

## How to use it

The colour pages are prints: gold light in a dark cup, white light on blue
water, blue arcs round a golden galaxy on a starry sky. The line-art page
outlines the bands of brightness for colouring: colour from dark at the
outside to bright at the caustic itself, the brightest line of all. Look
for the cusps — the sharp points where two bright curves meet — they are
the same shape in a cup, on a pool floor and round a galaxy.

## Purpose

Optics drawn faithfully: every bright curve is where rays really fold, the
cup's cusp sits where geometry says it must, and lensed images obey the
lens equation of general relativity.

## History

Caustics by reflection ("catacaustics") were studied by Tschirnhaus (1682),
Huygens (*Traité de la lumière*, 1690) and Johann Bernoulli, who showed the
coffee-cup curve is a nephroid; the cardioid from a point on the rim is in
the same circle of work. Pool caustics and their cusps are the subject of
M. V. Berry's catastrophe optics (Berry & Upstill, "Catastrophe optics",
*Progress in Optics* 18, 1980) and J. F. Nye, *Natural Focusing and Fine
Structure of Light* (1999). Gravitational lensing was predicted by
Einstein (1936, "Lens-like action of a star by the deviation of light in
the gravitational field"); the first lensed quasar was found in 1979
(Walsh, Carswell & Weymann) and the first Einstein ring in 1988. Lens maps
follow P. Schneider, J. Ehlers & E. E. Falco, *Gravitational Lenses* (1992).

## This implementation

- **Spec knobs:** `width`, `height` (points); `mode` (`auto`, `cup`,
  `pool`, `lens`); `palette` (`auto` — the mode's own — `gold`, `aqua`,
  `cosmic`, `ink`); `style` (`colour`, `lines`); `strength` (0.2–3: the
  mirror's wobble, the pool's depth, the lens's mass); `rays` (cup,
  200–8000); `reflections` (cup, 1–3); `waves` (pool ripples, 2–16);
  `bands` (4–40); `curves` (draw the caustic curves themselves); `stroke`.
- **Generation:** *Cup:* a mirror `r(θ) = R(1 + Σ ε_k cos(kθ+φ_k))` (a plain
  ring half the time) lit by parallel light or a point on its rim; rays
  are traced with exact specular reflection and splatted into a density
  grid (the incoming light as a faint even glow, each reflection keeping
  80 %); the envelope of the once-reflected rays is found as crossings of
  neighbouring rays. *Pool:* `h = Σ A_k cos(k·x + φ_k)` with a dominant
  swell direction; a fine grid of surface points is mapped to the floor by
  `p ↦ p + D∇h` and counted (the floor density is `Σ 1/|det J|`), `D` set
  from the surface curvature so the map folds; caustic curves are the
  `det J = 0` contour carried to the floor. *Lens:* a point mass, a singular
  isothermal sphere, or a binary, with optional external shear;
  `β = θ − α(θ)`; critical curves are the `det J = 0` contour and caustics
  their images; a spiral source galaxy is placed near a caustic and a few
  faint field galaxies behind, and every image-plane point takes the
  brightness at `β(θ)`. Light is cut into bands of log density (lens:
  brightness) and painted level by level; the lens galaxy glows beneath.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic per seed; for parallel light in a circle
  the envelope's cusp lies at half the radius (tested to 0.2 %); for a rim
  source the cardioid's far vertex lies a third of the radius past the
  centre (tested); a point lens's critical curve is its Einstein circle and
  maps to the source position (tested to 0.2 %), and so does an isothermal
  sphere's; pool caustic curves run through the brightest light (tested).
  `verification: ray_counted_density_and_exact_caustic_curves`. Line art
  reports its colourability check. Clamped knobs are reported as
  `requested_<field>`.

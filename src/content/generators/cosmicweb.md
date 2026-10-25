---
title: "Cosmic Web"
blurb: "Cosmic web: a seeded Gaussian random field grown by the Zel'dovich approximation into voids, sheets, filaments and fold caustics"
category: design
version: "1.0.0"
---
Ripples from the early universe, grown by gravity into the great web of
voids, sheets and filaments that galaxies trace today.

## What it is

A picture of how the largest structures in the universe form. It starts
from an almost smooth sea of matter with tiny random ripples in density.
Gravity pulls each bit of matter towards the denser places around it, and
— to a very good first approximation — every bit simply travels in a
straight line. Where neighbouring streams of matter cross, they pile up
into thin sheets, the sheets meet in bright filaments, and the filaments
meet in knots, while the space between empties into dark voids. The page
shows that flow as a fine grid carried along with the matter (threads
crowd together in the filaments and stretch wide over the voids), as a
cloud of particles, or as the fold lines — caustics — where the flow turns
over on itself.

## How to use it

Frame it, or colour it: the black-and-white grid makes a delicate
colouring page where the dark crowded threads mark the filaments. Look for
the voids — the big, open, nearly square cells — and the knots where three
or four filaments meet; in the real universe those knots are clusters of
galaxies. Turn up the growth to see the web age: sheets thicken, small
filaments merge into big ones and the voids grow. Lower the spectral index
for a few large voids and long filaments; raise it for a fine foam.

## Purpose

Generative art whose pattern is real physics. The same few lines of
mathematics that cosmologists used to understand the web of galaxies make
the picture, so it shows why the universe is foamy — not by simulating
millions of galaxies, but by following a single straight-line rule from a
random start.

## History

Yakov Zel'dovich proposed the approximation in 1970 ("Gravitational
instability: an approximate theory for large density perturbations",
*Astronomy and Astrophysics* 5, 84), predicting flattened "pancakes" before
any survey had seen them. Arnold, Shandarin and Zel'dovich classified the
caustics it forms (1982), and Shandarin and Zel'dovich reviewed the whole
picture in *Reviews of Modern Physics* 61 (1989). Redshift surveys from
the CfA "slice of the universe" (de Lapparent, Geller and Huchra, 1986) to
the Sloan Digital Sky Survey then mapped the web for real, and the
Millennium Simulation (Springel et al., 2005) made its image famous. The
fast Fourier transform used to build the starting field is Cooley and
Tukey's (1965).

## This implementation

- **Spec knobs:** `growth` (growth factor D, 0–4, in units of the starting
  ripples' rms), `spectral_index` (n in P(k) ∝ kⁿ, −3 to 1),
  `smoothing` (R as a percentage of the box, 0–10), `grid` (32–512 cells a
  side, rounded down to a power of two), `style` (mesh, particles, web,
  caustics), `palette` (auto, nebula, ice, ember, aurora, ink), `width`,
  `height`.
- **Generation:** white noise drawn from the seed on a periodic n × n grid
  is transformed by a home-grown radix-2 FFT (twiddle factors through the
  deterministic maths layer), multiplied by √P(k) with
  P(k) ∝ kⁿ·e^{−k²R²} (computed in logs so heavy smoothing never
  underflows), with the k = 0 and Nyquist modes removed so every derived
  field is exactly real, and normalised to unit rms density. Five inverse
  transforms give the displacement −∇φ = i k δ/k² and the deformation
  tensor ∂ᵢ∂ⱼφ = kᵢkⱼ δ/k²; a particle starting at q is drawn at
  x = q − D∇φ(q) (bilinear between grid points). Density is
  1/|det(I − D·∂∂φ)|. Mesh lines and particles are coloured by density;
  caustics are the level set λ₁ = 1/D of the tensor's largest eigenvalue,
  traced by marching squares on a doubled grid in q and carried to x. The
  caustics style also draws the folds of earlier stages (D from 0.3 to 1
  of its value), carried to where their matter is now, so each fold holds
  nested contours of collapse time. The window shows the whole box along
  the page's long side and reaches past its edge into the periodic copies,
  so matter flows in from beyond. The seed draws the noise and picks the
  palette when it is `auto`.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic; the FFT round trip is the identity and
  matches the direct sum (tested); the displacement has exactly zero mean
  (`verification: zero_mean_displacement`) and the starting density unit
  rms; the deformation tensor's trace equals the density contrast and the
  displacement's divergence is −δ; more growth folds more of the flow; at
  zero growth nothing moves; clamped values are reported as `requested_*`;
  everything stays inside the page; the ink palette is grey only.

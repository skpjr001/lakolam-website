---
title: "Cloud Chamber Tracks"
blurb: "Cloud chamber tracks: alphas, betas, muons, spirals, pair production and delta rays, bent by a magnetic field and drawn as droplet chains"
category: design
version: "1.0.0"
---
The trails of mist that subatomic particles leave as they cross a cloud
chamber in a magnetic field: straight, curly, spiral and V-shaped.

## What it is

A photograph-like page of a cloud chamber. The chamber is full of vapour on
the point of condensing, so wherever a charged particle passes, a line of
tiny droplets forms along its path. A magnet bends every path into a curve
whose size tells the particle's momentum, and whose direction of turning
tells its charge. On the page you will find short thick straight tracks
(alpha particles, which ionise heavily and stop within a few centimetres),
thin wandering tracks (beta electrons, knocked about by the gas), long
nearly straight dotted lines crossing the whole window (cosmic-ray muons),
electrons winding inward in spirals as they slow, V shapes where an
invisible photon turned into an electron and a positron curling opposite
ways, and tiny curls branching off fast tracks (delta rays, electrons
knocked out of atoms).

## How to use it

Sort the tracks by their look: thickness says how hard a particle ionises,
length how soon it stops, curvature how much momentum it has. Find a V and
check that its two arms bend opposite ways — one is matter, one antimatter.
Follow a spiral inward: each turn is smaller because the electron is losing
energy. The circle with a dot in the corner means the magnetic field points
out of the page (a cross means into it); with it, positive particles turn
clockwise and negative ones anticlockwise. The scale bar shows five
centimetres of chamber. In the colour version each kind of particle has its
own colour.

## Purpose

Cloud chamber photographs are how the positron, the muon and many other
particles were discovered, and they still teach the basic physics of
charged particles better than any diagram: momentum, charge, energy loss and
scattering are all visible at once. The page makes a striking dark print
and a good starting point for a physics lesson or a home-made chamber.

## History

C. T. R. Wilson built the first cloud chamber in 1911 and shared the 1927
Nobel Prize for it. Carl Anderson discovered the positron in a cloud chamber
in a magnetic field in 1932 (Nobel Prize 1936), and with Seth Neddermeyer
the muon in 1936; Patrick Blackett and Giuseppe Occhialini photographed
electron–positron pairs in 1933. The physics used here is textbook:
the radius r = p/(qB), the Bethe formula for ionisation loss and Highland's
formula for multiple scattering (Particle Data Group, *Review of Particle
Physics*, sections "Passage of particles through matter"); the knock-on
electron angle is the two-body relation for delta rays.

## This implementation

- **Spec knobs:** `events` (mixed, cosmic, source, pairs, or auto);
  `field` (tesla, −3 to 3, sign is the direction); `scattering` (multiple
  scattering as a multiple of Highland's angle; 0 turns it off); `busy`
  (how many events); `window` (round or rect); `haze` (stray background
  droplets); `caption` (title, field, track counts, scale bar and field
  symbol); `palette` (darkfield, sepia, colour, ink, or auto); `page`;
  `margin_mm`.
- **Generation:** each scene draws counts of alphas (fanning from a source
  needle near the rim, at a few lines of one energy), muons (entering at
  the window's edge, 0.25–3 GeV, either charge), betas (0.4–2.6 MeV
  electrons), fast electrons (6–18 MeV, started on a circle that lies inside
  the window so the whole spiral is seen) and photon conversions (20–120
  MeV, the energy shared between electron and positron, opening angle of
  order mₑ/E). Each particle is followed in steps along the exact circle of
  its current momentum (radius p/(3|z|B) cm), losing energy at a Bethe rate
  S₀z²(0.92/β²)·L(βγ)/L(3.5) with S₀ = 0.05 MeV/cm (a dense vapour, about
  twenty times air, so every kind of track fits the window) and kicked by a
  Gaussian Highland angle with radiation length 15 m, until it stops or
  leaves. Muons throw one to three delta rays at the two-body angle
  cos²θ = (T/Tmax)(Tmax + 2mₑ)/(T + 2mₑ). Droplets fall along each path at
  exponential (Poisson) gaps whose mean shrinks with the ionisation,
  jittered sideways by diffusion and sized by the ionisation, over a faint
  glow of the track.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic; `verification: radius_matches_momentum` —
  with scattering off, every three consecutive points of every track lie
  on a circle whose radius is p/(3|z|B) at that point (to the momentum
  lost in one step); positive particles turn clockwise in a field out of
  the page; slowing electrons spiral inward; alphas are short and dense,
  muons long and sparse; every track starts inside the chamber and every
  droplet lies inside the window; all ink stays inside the margins.
  Clamped knobs are reported (`requested_<field>`).

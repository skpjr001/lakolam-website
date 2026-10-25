---
title: "Ringed Planet"
blurb: "Ringed planet: a banded globe in rings whose gaps sit at its moons' resonances, the planet's shadow laid across them"
category: design
version: "1.0.0"
---
A banded giant planet inside its rings, the gaps in the rings placed exactly
where its moons' rhythms clear them.

## What it is

A gas giant seen at a slant: cloud belts and zones with wavy edges, perhaps
a storm, a night side and a soft twilight on the side away from the Sun.
Around it, rings made of hundreds of ringlets — dim and see-through close
in, bright in the middle — opened towards you, their far half passing
behind the planet and their near half in front of it. Dark gaps cut through
the rings, and a few small moons sit beyond them. On the far side the
planet's own shadow falls across the rings.

## How to use it

Frame it, colour it, or use it to talk about orbits. Each gap is where a
ring particle would go round the planet exactly twice (or one and a half
times, or three times) while one of the moons goes round once; the moon's
regular pull at the same places sweeps that orbit clear. Find the shadow on
the rings and work out where the Sun must be. The outline style is a
colouring page: give the belts and zones alternating colours and leave the
gaps black.

## Purpose

A planet portrait whose details are physics, not decoration: the rings are
cut where Kepler's third law says resonances fall, the occlusion of rings by
planet is exact, and the shadow is the planet's real shadow cylinder laid on
the ring plane. It makes orbital resonance — the reason Saturn's rings have
the Cassini Division — something you can see.

## History

Galileo saw Saturn's "ears" in 1610; Christiaan Huygens explained them as a
thin flat ring in *Systema Saturnium* (1659), and Giovanni Cassini found the
dark division in 1675. James Clerk Maxwell proved in 1859 that the rings must
be swarms of small particles. Daniel Kirkwood showed in 1866 that the
asteroid belt has gaps at resonances with Jupiter, and the same mechanism
places the Cassini Division at Mimas's 2:1 resonance (P. Goldreich and S.
Tremaine, "The dynamics of planetary rings", *Annual Review of Astronomy and
Astrophysics* 20, 1982). Voyager (1980–81) and Cassini (2004–17) images of
ringlets, gaps and the planet's shadow on the rings are the look this page
follows. Ring radii here are in planet radii, roughly Saturn's.

## This implementation

- **Spec knobs:** `style` (colour, hatch, outline), `tilt_deg` (ring
  opening, 0–70), `phase_deg` (Sun–planet–viewer angle, 0–150), `moons`
  (0–6), `ringlets` (20–400), `stars`, `palette` (auto, saturn, ice, ember,
  violet, ink), `width`, `height`.
- **Generation:** orthographic projection with the ring plane opened by B:
  a ring point at radius r and azimuth λ lands at (r cos λ, −r sin λ sin B)
  with depth r sin λ cos B, so each ringlet is drawn as two half-annuli — the
  far one before the planet, the near one after it. The seed sets the ring
  edges, a brightness profile (dim inner ring, bright middle, moderate
  outer) rippled by a few waves, the moons (just outside the rings, seen
  within the rings' width) and, for each moon, gaps at its 2:1, 3:2, 3:1, 4:3
  and 5:3 resonances that fall inside the rings, at
  r = a_moon (q/p)^{2/3}, wider for first-order resonances and heavier
  moons. Every region on the planet is a cap n·a ≥ k of the sphere: its edge
  circle's visible part is projected and closed along the limb on the cap's
  side. Bands are nested caps about the pole (edges wobbled in latitude);
  night and twilight are caps about the anti-Sun direction, drawn by
  repainting the bands darker inside a clip. The planet's shadow on the ring
  plane is the half-ellipse r²(1 − (r̂·s)²) < 1 on the anti-Sun side; the
  rings are repainted in shadow colours inside it. Thin inner ringlets are
  repainted over the planet half-mixed with it, so it shows through. Hatch
  style draws ring edges, gap edges and every few ringlets as arcs (the far
  ones cut away inside the planet), band edges, and hatches the belts, the
  night side, the twilight and the ring shadow. The seed picks the palette
  when `auto`, the Sun's side, a slight roll of the whole picture and the
  storm.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic; every gap sits at a resonance by Kepler's
  third law ((r/a_moon)^{3/2} = q/p to 10⁻¹², checked independently) and no
  ringlet material lies inside a gap; nothing behind the planet is drawn
  over it (every point of a later item inside the planet's disc is on the
  near half of the rings or on a moon in front); the shadow outline lies on
  the anti-Sun side and bounds exactly the points whose sunward ray hits the
  planet; the ink palette is grey only; clamped `tilt_deg`, `phase_deg`,
  `moons` and `ringlets` are reported as `requested_*`; the outline style
  reports its colourability check (`colorable`); everything stays inside
  the page.

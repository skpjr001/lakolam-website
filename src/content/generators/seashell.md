---
title: "Seashells"
blurb: "Seashells grown from Raup's coiling model: turret, cone and top shells, ramshorns, ammonites with frilled sutures and the nautilus, as shaded 3D meshes"
category: design
version: "1.0.0"
---
Turret shells, cones, top shells, ramshorns, ammonites and the nautilus,
each grown from one tube swept along a logarithmic spiral.

## What it is

Almost every coiled shell is the same idea: a tube that grows as it
turns, each turn a larger copy of the one before. In the 1960s the
palaeontologist David Raup showed that four numbers describe the coil —
how fast the tube widens with each turn, how far it sits from the axis,
how far it slides down the axis as it grows, and the shape of its
cross-section. Change the numbers and a tall turret shell becomes a cone,
a squat top shell, a flat ramshorn coil or a nautilus whose last whorl
wraps all the others. This page grows such shells as shaded 3D surfaces,
with growth lines across the whorls, colour bands, ribs and spines, and the
frilled suture lines that make fossil ammonites so beautiful.

## How to use it

Hang it as a natural-history print, or use it to talk about growth: every
whorl is the one before it, scaled up. Follow a growth line across a whorl
— it marks where the lip of the shell once was. On an ammonite the wavy
lines are sutures, where the inner walls of the chambers met the shell.
The plate shows several kinds side by side with their three coiling
numbers: W (how much bigger each turn is), D (how far the tube stands from
the axis) and T (how far it slides down per unit of growth). The
black-and-white version is a page to colour in: shade the far side of each
whorl darker and the shell will stand out.

## Purpose

A design-lane page that turns a famous piece of theoretical morphology
into art: the shells are exact logarithmic coils, drawn with shading and
a painter's depth order, in colours or as line art.

## History

D'Arcy Thompson's *On Growth and Form* (1917) explained shells as
equiangular spirals; Henry Moseley had measured them that way in 1838.
David M. Raup's "Computer as aid in describing form in gastropod shells"
(*Science*, 1962) and "Geometric analysis of shell coiling" (*Journal of
Paleontology*, 1966) introduced the W, D, T, S parameters and plotted real
shell groups inside the cube they span, showing that much of the cube is
empty — shapes life never tried. Later work (Fowler, Meinhardt and
Prusinkiewicz, "Modeling seashells", SIGGRAPH 1992; Cortie 1989) added
ribs, spines and pigment. Ammonite suture lines, studied since Leopold von
Buch (1829), are used to identify species.

## This implementation

- **Spec knobs:** `form` (auto, turret, cone, top, planispiral, ammonite,
  nautilus, plate), `specimens` (4–9 on a plate), `expansion` (W),
  `distance` (D), `translation` (T) and `shape` (S) — each empty for the
  seed's choice — `ornament` (auto, smooth, ribs, spines), `bands` (auto,
  none, spiral, flames), `palette` (auto, sand, coral, tiger, slate, ink),
  `growth_lines` per whorl, `sinistral`, `caption`, `width`, `height`,
  `margin`.
- **Generation:** the tube's centre is at radius `Rc(θ) = W^{θ/2π}` and
  height `−T·Rc`, its cross-section an ellipse of radial semi-axis
  `ρ = Rc(1 − D)/(1 + D)` and axial semi-axis `S·ρ` (a cone's has a flat
  shoulder and leans in below). The seed draws W, D, S and an embrace
  factor (T as a fraction of the translation at which whorls just touch)
  inside each family's region of Raup's cube. Ribs and cords modulate `ρ`;
  spines are pyramids raised from rib crests; ammonite sutures are frilled
  curves at each septum, left off the body chamber. The surface becomes a
  quad mesh (roughly 40–100 rows a whorl and 32 round the tube), seen by a
  rotated orthographic camera with the light at the upper left. A depth
  buffer drops faces that cannot show (inside or behind the shell); the
  rest are painted far to near (ties by face index), the inside of the
  aperture in a pearly colour, with growth lines, outline and sutures
  drawn straight after the face they lie on.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic per seed; on the mesh, every row one whorl
  on is the earlier row scaled by exactly W about the apex (to 1e-9), and
  the tube's centre slides down T per unit of radial growth (to 1e-9); no
  NaN for W at or near 1 (the whorl count is capped at 12); the quad count
  is bounded (480 × 32 per specimen); all ink inside the page; clamped
  values record `requested_<field>`.

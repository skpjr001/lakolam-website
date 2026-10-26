---
title: "Laue X-ray Patterns"
blurb: "Laue X-ray photographs: the spots a crystal's planes throw onto film in a white X-ray beam, with zone curves and Miller indices"
category: design
version: "1.0.0"
---
The photograph that proved crystals are lattices: a constellation of spots
thrown by a single crystal in a beam of white X-rays.

## What it is

A page showing a Laue photograph. A narrow beam of X-rays containing every
wavelength in a band passes through one crystal; each family of parallel
atomic planes reflects the one wavelength that suits its spacing and angle,
and sends it off as a thin ray that leaves a spot on the film. The crystal
here is simple cubic, body-centred cubic (like iron), face-centred cubic
(like copper), diamond cubic (like silicon), body-centred tetragonal (like
tin) or hexagonal close-packed (like zinc). When one of the crystal's
symmetry axes points along the beam, the spots repeat four, three or six
times round the centre. Faint curves — ellipses on film behind the crystal,
hyperbolae on film in front of it — string together the spots of planes
that share one direction (a zone). The strongest spots are labelled with
the plane's Miller indices; a bar over a number means it is negative.

## How to use it

Find the centre, where the beam stop shades the film, and turn the page:
with a symmetric axis along the beam the pattern looks the same after a
quarter, third or sixth of a turn. Follow a faint curve from the centre and
see how many spots lie on it — each is a plane of that zone. Compare spots
with the same numbers in a different order or sign: they are the same kind
of plane turned by the symmetry, and they are equally bright. In the
spectrum colours, blue spots were made by short wavelengths and amber ones
by long. The black-and-white version can be coloured: give each zone its
own colour.

## Purpose

Laue patterns are still how a crystal's orientation is found in the
laboratory — a metallurgist cutting a turbine blade or a silicon wafer
reads the symmetry from spots like these. The page shows Bragg's law at
work and why some planes never show (the extinction rules of each
structure), and it makes an unusual print: a real physical experiment, not
an imitation of one.

## History

In April 1912 Walter Friedrich and Paul Knipping, following Max von Laue's
idea, passed X-rays through a crystal of copper sulphate and recorded the
first diffraction spots; Laue's theory won him the 1914 Nobel Prize. The
same year William Lawrence Bragg reinterpreted the spots as reflections
from lattice planes (Bragg's law), and with his father solved the first
crystal structures (Nobel Prize 1915). Paul Peter Ewald's construction
(1913, 1921) gives the geometry used here. Sources: W. Friedrich, P.
Knipping and M. Laue, *Interferenz-Erscheinungen bei Röntgenstrahlen*
(Sitzungsberichte der Bayerischen Akademie, 1912); B. D. Cullity and S. R.
Stock, *Elements of X-Ray Diffraction*, 3rd ed., ch. 3 and 8; *International
Tables for Crystallography*, vol. A (reflection conditions).

## This implementation

- **Spec knobs:** `crystal` (auto, simple_cubic, bcc, fcc, diamond,
  tetragonal, hexagonal); `axis` (symmetric — the 4-, 3- or 6-fold zone axis
  along the beam —, twofold, oblique); `film` (transmission or
  back_reflection); `wavelength_min` / `wavelength_max` (the white beam's
  band, ångström); `exposure` (how faint a spot still shows); `zones`,
  `labels`, `grid` (circles of equal scattering angle every 10°), `caption`;
  `palette` (spectrum — spots in the colour of their wavelength on night-dark
  film —, film, print, ink, or auto); `page`; `margin_mm`.
- **Generation:** real and reciprocal cell vectors of the chosen lattice
  (cell edges and c/a seeded within typical values); the crystal is turned so
  the zone axis lies along the beam, then spun about the beam by a seeded
  angle (oblique: a seeded general rotation). Every plane (h k l) with
  coprime indices inside a sphere of reciprocal space is tested with the
  Ewald condition for a white beam, λ = −2(ẑ·G)/|G|²; the ray leaves along
  ẑ + λG and lands on flat film. Each harmonic n(h k l) at λ/n adds to the
  same spot if λ/n is in the band and its structure factor does not vanish
  (bcc h+k+l even; fcc unmixed; diamond fcc with all-even only for h+k+l a
  multiple of 4; bct h+k+l even; hcp from atoms at 0 and (⅓, ⅔, ½)). The
  intensity is |F|² × a Kramers bremsstrahlung spectrum × a form-factor
  fall-off with sin θ/λ; spots below the exposure's threshold are dropped.
  Zones [u v w] with five or more spots are drawn as the cone u·r̂ = ẑ·r̂
  through the beam, met with the film plane. Spots are drawn as radially
  elongated ellipses sized by intensity, with a glow; labels go beside the
  strongest spots where they overlap no spot, label or the rim.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic; `verification: bragg_law_every_spot` —
  for every spot, the scattering angle read off its film position and the
  plane spacing satisfy λ = 2 (d/n) sin θ for every contributing order, with
  λ inside the band, and every contributing order is allowed by the
  structure factor; along a symmetric axis the spot set (positions and
  intensities) maps onto itself under the 4-, 3- or 6-fold turn, and along
  a two-fold axis under a half turn; zone curves pass exactly through their
  spots. All ink lies inside the margins; clamped knobs are reported
  (`requested_<field>`).

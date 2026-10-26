---
title: "Armillary Sphere"
blurb: "Armillary sphere: horizon, meridian, equator, tropics, colures and the zodiac band set for a latitude, engraved or in brass"
category: design
version: "1.0.0"
---
The sky's great circles as a cage of rings round a small Earth, set for a
place on the globe and drawn in brass or as an engraving.

## What it is

A plate showing an armillary sphere, the instrument astronomers used for two
thousand years to picture the heavens. A broad flat ring is the horizon,
marked with north, east, south and west; the upright ring is the meridian.
Inside them a cage of rings turns about the slanting polar axis: the
celestial equator, the tropics of Cancer and Capricorn, the arctic and
antarctic circles, the two colures through the poles, and the wide ecliptic
band carrying the twelve signs of the zodiac — the path of the Sun through
the year. The axis is tilted to the latitude of a real observatory (or the
one you choose), so the sphere shows the sky as seen from there. Each ring
is named round the margin.

## How to use it

Find the polar axis: it rises above the horizon at the same angle as the
place's latitude. Follow the ecliptic band and see how it crosses the
equator at two points (the equinoxes, in Aries and Libra) and touches the
two tropics (the solstices, in Cancer and Capricorn). The Sun moves along
the ecliptic through the signs once a year; the whole inner cage turns once
a day. Match each name to its ring by its leader line. The black-and-white
version is a colouring page: brass for the rings, blue for the band and the
Earth.

## Purpose

The armillary sphere is the clearest model ever made of why we have
seasons, why the Sun rises in different places through the year and how
the sky looks from different latitudes. The page is a handsome print in the
tradition of old astronomical plates and a teaching aid for the celestial
sphere.

## History

Armillary spheres were described by Eratosthenes and Ptolemy (Almagest,
book V) and built in Han China by Zhang Heng; great bronze examples stand
at the Beijing Ancient Observatory. Islamic astronomers at Maragha and
Samarkand, and Tycho Brahe at Uraniborg (*Astronomiae instauratae
mechanica*, 1598), used them as measuring instruments; later they became
teaching models in every European library. The engravings in Diderot and
d'Alembert's *Encyclopédie* (plates "Astronomie") are the model for the
engraved style. The obliquity used is the IAU value for J2000, 23.4393°.

## This implementation

- **Spec knobs:** `latitude` (degrees; null picks an observatory —
  Greenwich, Paris, Uraniborg, Beijing, Jaipur, Samarkand, Alexandria, Cape
  of Good Hope); `sidereal_hours` (how the inner cage is turned; null lets
  the seed choose); `labels` (ring names with leader lines); `zodiac`;
  `globe`; `stand`; `title`; `palette` (brass, engraving, night, ink, or
  auto); `page`; `margin_mm`.
- **Generation:** world frame x north, y west, z zenith; the pole at
  (cos φ, 0, sin φ); equatorial axes from the local sidereal time; every
  ring a circle p·n = sin δ₀ (great or small) built as a band — belts across
  the sphere for the celestial rings, flat washers for horizon and
  meridian. Rings, globe (its quads are the 10° graticule), polar axis,
  turned pedestal and four bracket arms are meshes painted together far to
  near (two-sided, shaded by a fixed light); each band quad strokes its own
  two boundary edges, so hidden edges vanish with their faces. Engraving
  hatches every face along the band, more lines where it is darker. Hour
  ticks on the equator, degree ticks and compass letters on the horizon,
  sign divisions and names along the ecliptic (turned to its projected
  tangent, near side only) are sorted in with the faces. Callouts go to the
  nearest point of each ring and are stacked down both margins without
  overlapping. The seed picks the place, the sidereal time and a
  three-quarter view.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic; `verification: ring_inclinations_exact`
  — from three points of each drawn ring: equator to horizon 90° − |φ|,
  ecliptic to equator ε, meridian square to the horizon and through the
  pole, tropics and polar circles parallel to the equator with every point
  at declination ±ε or ±(90° − ε), colures through the pole and square to
  each other, the equinoctial colure through the equinoxes, the summer
  solstice point at declination +ε; tested at latitudes from −89° to 90°.
  All ink lies on the page (inside the margins for the ink style); clamped
  knobs are reported (`requested_<field>`).

---
title: "Star Trails"
blurb: "Star trails: a long exposure of the real night sky for a date and latitude, every bright star an arc about the pole above a silhouette skyline"
category: design
version: "1.0.0"
---
A long-exposure photograph of the real night sky — every bright star an arc
about the pole, above a silhouette skyline.

## What it is

Point a camera at the night sky and leave the shutter open for hours, and
the stars do not stay put: the Earth turns beneath them, so each star draws
a curved streak. All the streaks turn about one point — the celestial pole,
near the Pole Star in the northern hemisphere — and all of them turn
through the same angle, about 15° for every hour. This page draws that
photograph from the real star catalogue for the date, time and place you
choose: blue-white hot stars and orange cool ones, the brightest with
the widest trails, fading in the thick air near the horizon, over a black
skyline of hills, pine trees or an observatory dome.

## How to use it

Frame it, or print the black-and-white version and colour the trails —
blue for the hot stars at the outside of the colour range, orange and red
for the cool ones. Look for the small tight circle at the centre of the
rings: that is the Pole Star, which hardly moves at all. Measure any trail
with a protractor from the centre of the rings: every one spans the same
angle, about 15° for each hour of the exposure. Turn the camera away from
the pole and the rings open into arcs, and at the celestial equator they
become straight lines.

## Purpose

A piece of night-sky art that is also a true astronomical record: each
trail is where that star really went across the sky on that night, seen
from that latitude. It shows the Earth's rotation, the difference between
the solar and the sidereal day, and why the pole stays still while
everything else wheels around it.

## History

Star trails appeared on photographic plates almost as soon as astronomers
pointed cameras at the sky in the 1880s; Edward Emerson Barnard and others
used them to test telescope drives, and trail photographs became a
favourite of amateur astronomers through the twentieth century. Digital
cameras turned them into a popular art form, usually by stacking hundreds
of short exposures. The stars come from the Yale Bright Star Catalogue
(Hoffleit and Warren, 5th revised edition, 1991; public domain), with
precession after Meeus, *Astronomical Algorithms* (1998), chapter 21, and
sidereal time from chapter 12.

## This implementation

- **Spec knobs:** `latitude`, `year` (1000–3000), `month`, `day`,
  `start_hour` (local mean time), `hours` (0.1–24), `facing` (pole,
  equator, east, west, custom), `azimuth` (used when facing is custom),
  `elevation` (camera tilt, −10 to 90°), `focal_length` (8–300 mm on a
  36 × 24 mm frame), `projection` (perspective, stereographic),
  `magnitude_limit` (1–6), `horizon` (auto, hills, conifers,
  observatory), `style` (colour, line_art), `width`, `height`.
- **Generation:** every catalogue star down to the magnitude limit is moved
  by its proper motion and precessed to the date; the local sidereal time
  at the start comes from the date and local mean time (the observer's
  longitude cancels); each star's hour angle then sweeps through
  hours × 15.041°/h (360.9856° a solar day) in half-degree steps and is
  turned into altitude and azimuth for the latitude. A camera at the
  facing's azimuth and the elevation projects the sky onto the frame —
  gnomonic for a rectilinear lens, stereographic for a fisheye — scaled
  by the focal length. Trails are clipped to the frame and to the horizon,
  grouped by colour (B−V index), width (magnitude) and an atmospheric
  fade near the horizon, and bright stars get a soft halo. The skyline's
  ridge is a sum of seeded waves in azimuth, found column by column by
  inverting the camera; trees and the observatory stand upright on it,
  sized by the lens's scale at their foot. The seed picks the skyline when
  it is `auto`, shapes it, and tints the night sky.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic; every trail turns through exactly
  hours × 15.041 068 64° about the pole (`verification:
  trail_angle_exact` — tested by reading each trail's two ends back to
  hour angles through an independent inversion of the horizon coordinates,
  within 10⁻⁶°, and checking the declination holds along it); Polaris stays
  within a degree of the pole's altitude; precession moves it towards the
  pole until about 2100; the camera's forward and inverse projections
  agree; out-of-range dates, latitudes and lens settings are clamped and
  reported as `requested_*`; everything stays inside the page; the line-art
  style is grey only.

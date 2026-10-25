---
title: "Analemmas"
blurb: "Analemmas: the Sun's figure-eight at the same time each day, on Earth, Mars and the giant planets, or at every hour over a horizon"
category: design
version: "1.0.0"
---
Where the Sun stands at the same clock time every day for a year: Earth's
figure-eight, Mars's teardrop, and the shapes of the giant planets.

## What it is

If you photographed the Sun at exactly the same time every day for a year,
the pictures would trace a tall loop in the sky called an analemma. It rises
and falls with the seasons, and drifts a little east and west because the
Earth's tilted axis and its oval orbit make the real Sun run sometimes
ahead of the clock and sometimes behind it. On Earth the loop is a
figure-eight with a small summer loop. Other worlds have their own: Mars,
with its more oval orbit, draws a teardrop; Jupiter, hardly tilted, a
slanting oval; Uranus, tipped on its side, an enormous hourglass.

The gallery page shows six worlds side by side. The sky page shows the
Earth's analemma at every hour of the day, fanned out over a horizon for
your latitude — the picture a camera on a fixed tripod would build up over
a year.

## How to use it

Use the gallery to compare the worlds: the height of each figure is twice
the tilt of the planet's axis, and its lopsidedness comes from the shape of
the orbit. Dots mark the Sun's place on regular days (on Earth the 1st and
15th of each month, labelled with the month's initial), so you can see
where it lingers and where it hurries. Colours follow the seasons of the
northern hemisphere: green spring, gold summer, rust autumn, blue winter.

On the sky page, find the hour you are usually outside and follow its
figure: the Sun is at the top in midsummer, at the bottom in midwinter, and
on the crossing in April and late August. The black-and-white style makes a
colouring page.

## Purpose

The analemma ties together three facts that are hard to picture: the tilt
of a planet's axis, the shape of its orbit, and the difference between
sundial time and clock time (the equation of time). Seeing them on other
worlds shows which part of Earth's shape comes from which cause.

## History

Analemmas were engraved on globes and sundials in the 18th and 19th
centuries to convert sundial time to clock time; the word comes from
Ptolemy's treatise on sundial construction. Dennis di Cicco took the first
photographic analemma from Massachusetts in 1978–79, and many photographers
have since repeated it. The Earth here uses Jean Meeus's low-precision solar
formulae and equation of time (*Astronomical Algorithms*, 2nd ed., ch. 25
and 28). Other worlds are derived from their orbits (E. M. Standish,
"Approximate Positions of the Planets", JPL) and their spin axes (Archinal
et al., *Report of the IAU Working Group on Cartographic Coordinates and
Rotational Elements: 2009*, Celestial Mechanics and Dynamical Astronomy
109, 2011); the tilts this gives agree with NASA's Planetary Fact Sheets.

## This implementation

- **Spec knobs:** `kind` (gallery, sky), `year` (1800–2200), `scale`
  (gallery: own, common), `latitude` (sky: 30–65° either side of the
  equator), `horizon` (sky: auto, hills, mountains, forest, city, sea),
  `dots`, `palette` (auto, dawn, day, dusk, ink), `width`, `height`.
- **Generation:** Earth's curve is the Sun at noon UT on every day of the
  year: apparent declination and the equation of time from lako_astro.
  For the other worlds the obliquity is the angle between the spin axis
  (the IAU pole; Uranus's angular-momentum pole is opposite its IAU north
  pole) and the orbit's normal, the vernal equinox lies along pole × normal,
  and the Sun's seasonal longitude at perihelion (Ls) follows. Through one
  orbit, sampled evenly in mean anomaly, Kepler's equation gives the true
  anomaly; the Sun's right ascension and declination on the world's sky
  follow, and the equation of time is the mean Sun's right ascension minus
  the true one (the mean Sun runs backwards when the tilt exceeds 90°).
  Mercury and Venus are left out: neither has a meaningful "same time each
  day" through its year. The sky view computes each whole hour's analemma
  in altitude and azimuth (apparent solar time = mean time + equation of
  time), drawn on a conformal Mercator panorama centred on the meridian so
  the figures keep their true shapes; horizon silhouettes are drawn at
  twice their true height. The seed picks the palette, the horizon and its
  shape, and scatters the gallery's background stars.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic; Earth's equation of time peaks at
  +16.4 minutes in November and −14.2 in February (tested within 0.2
  minutes); each world's declination reaches ± its obliquity; the derived
  tilts match NASA's fact sheets within 0.2° and Mars's perihelion falls at
  Ls ≈ 251°; the general method applied to the Earth reproduces Meeus's
  equation of time; Earth's curve crosses itself (a figure-eight) and
  Mars's does not (a teardrop); a clamped year or latitude is reported
  (`requested_year`, `requested_latitude`); everything stays inside the
  page.

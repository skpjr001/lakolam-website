---
title: "Retrograde Loops"
blurb: "Retrograde loops: a planet's real path seen from the Earth over years, in plan or against the zodiac, with Ptolemy's epicycles on request"
category: design
version: "1.0.0"
---
Watch a planet from the moving Earth for a few years and it stops, runs
backwards and turns forward again — drawn here from its real orbit.

## What it is

The planets do not move steadily through the zodiac. Every time the Earth
overtakes an outer planet (or Venus and Mercury overtake the Earth), the
planet seems to halt, slide backwards for some weeks, and set off forwards
again, tying a loop in its path. This page draws that path from the true
orbits of the planet and the Earth. In the plan view the path is shown to
scale round the Earth: Venus over eight years traces a five-petalled rose,
Mars a ring of loops, Saturn a garland. In the sky view the same path is
drawn against the stars and the zodiac constellations, as it would appear
night after night, with each loop labelled with its month.

## How to use it

Find a loop, read its month, and look for the planet in that part of the
sky then: it will be at its brightest, rising at sunset (or, for Venus and
Mercury, passing between us and the Sun). Count the loops and the years
under the title to discover the planet's rhythm — Mars loops about every two
years and two months, Jupiter about once a year. Small ticks mark the first
of each month, longer ones each New Year, so you can follow the planet's
speed: the ticks crowd together where it stands still. Turn on the epicycle
overlay to see how the ancient astronomers explained the same loops with a
circle riding on a circle. The black-and-white style is for colouring and
for annotating in class.

## Purpose

Retrograde motion is the puzzle that drove astronomy from Ptolemy's
epicycles to Copernicus's moving Earth. Drawing it from real orbits shows
that the loops are not something the planet does but something we see from
a moving platform, and makes the synodic period visible and countable.

## History

Babylonian astronomers tabulated the stations and retrogradations of the
planets from the eighth century BC. Ptolemy's *Almagest* (about AD 150)
modelled them with a deferent circle carrying an epicycle — a construction
that reproduces the loop exactly, because it is the same vector sum
(Earth-to-Sun plus Sun-to-planet) taken in the other order. Copernicus's
*De revolutionibus* (1543) explained the loops as the Earth overtaking the
outer planets, and Kepler's ellipses (1609) made the explanation exact.
Planet positions here come from E. M. Standish, "Approximate Positions of
the Planets" (JPL Solar System Dynamics), Table 1, valid 1800–2050; the
background stars from the Yale Bright Star Catalogue and the constellation
figures from d3-celestial.

## This implementation

- **Spec knobs:** `planet` (auto, mercury, venus, mars, jupiter, saturn,
  uranus, neptune), `years` (0 = the planet's natural span; 0.25–60),
  `start_year` (1800–2050), `view` (plan, sky), `epicycle_overlay`, `ticks`
  (none, months, years), `palette` (auto, night, parchment, ocean, ink),
  `width`, `height`.
- **Generation:** the geocentric position is g(t) = r_planet(t) − r_Earth(t),
  both from JPL's Keplerian elements, sampled every half day (2,000–12,000
  samples). The geocentric ecliptic longitude is unwrapped into a
  continuous angle; a retrograde loop is a run where it decreases. The plan
  view fits the path, the Earth and the Sun's yearly circle into the page.
  The sky view cuts the longitude into consecutive windows — the narrowest
  of 5° … 360° that keeps the path within eight rows, a full lap per row
  for the fast planets — with each row centred on its own stretch of path
  and latitude exaggerated by the same factor on every row (printed in the
  footnote). Stars to magnitude 5.5 and the zodiac names (at the centre of
  each constellation's figure) sit behind. The epicycle overlay draws the
  deferent and the epicycle at each loop's middle (plan) or the deferent's
  steady longitude (sky). The seed chooses the planet and the palette when
  they are `auto`.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic; the path is exactly the difference of the
  two orbits (tested); the number of complete loops over a span matches the
  span divided by the synodic period within one (Mars over ten years:
  about 4.7); Venus over eight years has five loops spaced a fifth of a
  turn apart and closes within a few degrees; labels never overlap each
  other (those that cannot be placed are counted in `labels_skipped`);
  clamped years or start years are reported (`requested_years`,
  `requested_start_year`); everything stays inside the page.

---
title: "Sun-Path Diagram"
blurb: "Sun-path diagram: the architect's polar sun chart for a latitude, with date arcs, hour lines, sunrise azimuths and an optional shadow-angle protractor"
category: design
version: "1.0.0"
---
The architect's sun chart for your latitude: where the Sun is in the sky at
every hour of every month, ready to lay over a site plan.

## What it is

A round chart of the whole sky as seen from one place, drawn like a map:
the point straight overhead at the centre, the horizon round the edge,
north at the top and east to the right. Rings mark the Sun's height above
the horizon every 10°, spokes its compass bearing. Coloured arcs show the
Sun's path across the sky on the 21st of each month — the highest on the
summer solstice, the lowest on the winter solstice — and lines across them
mark the hours. Small ticks on the rim show where the Sun rises and sets
on each of those days. An optional second panel, a shadow-angle
protractor at the same scale, can be cut out and laid over the chart to
see how much a window's overhang or side fins will shade it.

## How to use it

To find the Sun at a given date and time, find the arc for the date and
the line for the hour; where they cross, read the height from the rings
and the bearing from the spokes. Lay the chart over a site plan, north to
north, to see which hours of the year sunlight reaches a garden or a
window, and which buildings or trees will block it. In solar time the
noon line points due south (due north in the southern hemisphere); in
clock time each hour becomes a narrow figure-eight, because the Sun runs a
little ahead of or behind the clock through the year.

For the protractor: put its centre on the chart's centre and turn its
straight edge along the wall of the window. Its radial lines read the
sideways angle of the Sun to the wall; its curves read the angle a sunbeam
makes in a cross-section through the window, which is what decides how
deep an overhang must be.

## Purpose

Sun-path diagrams are a standard tool in architecture, landscape design and
solar-panel siting: they show at a glance when a place is in sun or shade
through the year. Making one for your own latitude also shows how the
seasons work — why summer days are long and high, and why the winter Sun
stays low in the south.

## History

Polar sun charts were developed for building design in the 1930s and 40s;
the shadow-angle protractor method was set out by Victor Olgyay and Aladar
Olgyay (*Solar Control and Shading Devices*, 1957) and is taught in
building physics to this day, alongside the stereographic charts popularised
by the British Building Research Establishment. The Sun's positions here
use Jean Meeus's solar formulae and sidereal time (*Astronomical
Algorithms*, 2nd ed., ch. 12, 13 and 25) and the map projections of John
P. Snyder (*Map Projections — A Working Manual*, USGS 1987).

## This implementation

- **Spec knobs:** `latitude` (0–89°, the sign ignored), `hemisphere`
  (north, south), `longitude` and `zone_meridian` (clock time), `time`
  (solar, clock), `projection` (equidistant, stereographic), `year`
  (1800–2200), `protractor`, `palette` (auto, blueprint, sepia, sage,
  studio, ink), `width`, `height`.
- **Generation:** every vertex is the Sun's position at a known instant:
  right ascension and declination from the solar theory, hour angle from
  local sidereal time, altitude and azimuth from the spherical-astronomy
  transform, then the azimuthal projection centred on the zenith (north
  up, east right). Date arcs are sampled every four minutes on the 21st of
  each month, their ends bisected onto the horizon. Solar-time hour lines
  join the instants of each apparent solar hour (found by iterating the
  hour angle) from the December to the June solstice; clock-time hour
  lines join the instants of each zone-clock hour every second day of the
  year. Hour lines are clipped at the horizon. Sunrise ticks use
  cos A = sin δ / cos φ with the declination at local noon. The protractor
  draws horizontal shadow angles as radial lines and vertical shadow
  angles as the curves tan altitude = tan VSA · cos HSA, at the chart's
  scale. The seed chooses only the decoration: palette (when `auto`), rim
  style and motto.
- **Solving:** Nothing to solve.
- **Guarantees:** meta `"verification": "sun_positions_exact"`: every
  plotted vertex, read back off the page through the projection's inverse,
  lies within 0.05° of the Sun's computed position at its instant (tested
  at latitudes 0–80° in both hemispheres, both projections and both time
  systems — over ten thousand vertices); date arcs never dip below the
  horizon; each sunrise tick satisfies cos A = sin δ / cos φ and meets its
  arc within a degree; solar noon lies on the meridian; the June noon
  altitude is 90° − φ + 23.44°; clamped inputs are reported
  (`requested_latitude`, `requested_year`).

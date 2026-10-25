---
title: "Solar Eclipse Paths"
blurb: "Solar eclipse paths: the path of totality on a globe, or every central eclipse of a decade on a world map, computed from the Sun and Moon"
category: design
version: "1.0.0"
---
The Moon's shadow on the Earth: the path of totality on a globe, or every
central eclipse of a decade on a world map, worked out from the Sun and Moon.

## What it is

A map of solar eclipses in the manner of the classic almanac charts. In
**one-eclipse** mode the page shows the eclipse nearest the chosen month on
a globe turned towards it: the path of totality (or of annularity, where the
Moon is too far away to cover the Sun and leaves a ring of fire) with its
limits, its centre line and the times the shadow passes, a star at the point
of greatest eclipse, and the much wider partial eclipse as a field of dots
whose size shows how much of the Sun is covered, with contour lines. Below,
an almanac panel gives the time and place of greatest eclipse, how long
totality lasts there, how wide the path is and when the shadow touches the
Earth. On the world-map view it also lists what the capitals see. In
**decade** mode every central eclipse of a decade is drawn on one map,
labelled with its date, with a table of all the decade's solar eclipses.

## How to use it

Find where you live and look for the dark band: inside it the Sun is
completely covered for a few minutes (or, on an annular path, becomes a
bright ring). The ticks across the path mark the time the shadow passes, in
Universal Time — add your time zone's offset. Outside the band, the dots and
contours show the partial eclipse: a contour marked 0.6 means that at most
six-tenths of the Sun's diameter is covered there. Never look at the Sun
without proper eclipse glasses or a pinhole projector, except during the
totality itself. Use the decade map to plan a trip: the table gives each
eclipse's date, type, greatest time and place, and its longest duration.

## Purpose

Eclipse maps bring together the geometry of shadows and spheres, the motion
of the Moon, time zones and geography. A decade map shows at a glance that
eclipses are not rare — about one central eclipse a year somewhere — but
that any one place sees totality only every few centuries.

## History

Edmond Halley published the first eclipse path map, for the total eclipse
of 1715 over England, and used the observers' reports to test his
prediction. Friedrich Bessel's method of the fundamental plane (1824)
became the standard; Chauvenet's *Manual of Spherical and Practical
Astronomy* (1863) and the *Explanatory Supplement to the Astronomical
Almanac* set it out, and Fred Espenak and Jean Meeus's *Five Millennium
Canon of Solar Eclipses* (NASA, 2006) is the reference this page is tested
against. The lunar theory is the ELP-2000/82 truncation in Jean Meeus,
*Astronomical Algorithms* (2nd ed., 1998), ch. 47; the Sun is ch. 25 with
the perturbation terms of Meeus's *Astronomical Formulae for Calculators*;
ΔT follows Espenak and Meeus. Coastlines and borders are Natural Earth
(public domain).

## This implementation

- **Spec knobs:** `mode` (one, decade); `year` (1800–2200; in decade mode its
  decade) and `month` (one mode shows the eclipse nearest the middle of that
  month); `view` (auto — a globe for one eclipse, a map for a decade — globe,
  map: an Equal Earth world map); `partial_zone` (the halftone and contours
  of the partial eclipse, one mode); `palette` (auto, night, atlas, sepia,
  ink); `page`; `margin_mm`.
- **Generation:** candidates are the new moons within 0.36 of a lunar node
  (|sin F|). At each instant the apparent geocentric Sun and Moon (our own
  60+60-term lunar series and a perturbed solar theory, with nutation and
  aberration) give the Besselian elements directly — the shadow axis, the
  Moon's position (x, y) on the fundamental plane, the penumbral and umbral
  radii l₁, l₂ and cone angles — evaluated afresh at every instant rather
  than from fitted polynomials. Greatest eclipse is the minimum of x² + y²
  (golden-section search); its place is where the shadow axis meets the WGS 84
  ellipsoid. Eclipses are partial, total, annular or hybrid by whether the
  axis meets the Earth and the sign of the umbral radius at the ground along
  the centre line. The path is the union of the umbral outlines (each cone
  edge intersected with the ellipsoid, iterated for the observer's height)
  every 30 seconds, with quads between the outlines' extremes across the
  track (the limits); durations are found by bisection on the edge
  crossings. The partial zone is each place's greatest magnitude, sampled on
  a 2° grid every 4 minutes with the Sun above the horizon, contoured by
  marching squares. Coastlines come from Natural Earth via the Equal Earth
  data of the political maps, unprojected exactly; Antarctica is not in that
  data, so paths over it cross blank ocean-coloured ground. The seed varies
  decoration only: palette (when `auto`), graticule spacing, the frame and
  how far the globe is turned from greatest eclipse.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic; `verification: greatest_eclipse_matches_nasa`
  — tests compare greatest eclipse with NASA's *Five Millennium Canon*:
  2017-08-21 (20 s late, 6 km off), 2024-04-08 (40 s, 18 km), 2027-08-02
  (27 s, 14 km), central durations within 0.4 s of NASA's (2m40s, 4m28s,
  6m23s); the tests hold every one within 2 minutes and 100 km. The whole
  2020s decade comes out right: all 22 solar eclipses found with NASA's
  dates and types (including the hybrid of 2023 April 20), annular durations
  such as 2024 Oct 2 (7m25s) and 2028 Jan 26 (10m27s) matching NASA's to the
  second. Greatest eclipse lies inside the umbra with magnitude above 1; the
  partial field peaks on the path and is empty at the antipode. All ink lies
  inside the margins; clamped knobs are reported (`requested_<field>`); the
  ink palette is grey only. Accuracy is limited by the truncated lunar
  theory (about 10″, some 20 km and 20–40 s) and by ΔT, which is unknown
  for future centuries: far-future paths can be off by many kilometres in
  longitude.

---
title: "Weather Chart"
blurb: "Surface weather charts: isobars round highs and lows, fronts with WMO symbols, wind barbs and a coastline"
category: design
version: "1.0.0"
---
A surface weather map of an invented day: isobars round highs and lows,
fronts with their triangles and half-moons, and wind barbs.

## What it is

The chart a forecaster draws at the surface. Lines of equal sea-level
pressure — *isobars*, every 4 hectopascals — wrap round areas of high (H)
and low (L) pressure. Fronts, the boundaries between air masses, sweep out
from the lows: a *cold front* marked with blue triangles, a *warm front*
with red half-moons, an *occluded front* where the cold front has caught
the warm one (purple, both symbols), and sometimes a *stationary front*
(alternating blue and red on opposite sides). Isobars bend sharply where
they cross a front, because fronts lie in troughs. Small *wind barbs* show
the wind at weather stations: the staff points into the wind and each
feather adds speed.

## How to use it

The colour pages are prints, in the familiar style of a newspaper or
met-office chart, or aged like an old synoptic map. The line-art page is a
colouring chart: shade the land and sea, colour the cold fronts blue and the
warm fronts red, or colour the bands between isobars from deep blue round
the lows to warm orange round the highs. To read the wind: the wind blows
almost along the isobars, faster where they crowd together; in the
northern hemisphere it circles anticlockwise round a low, in the southern
clockwise. Each long feather on a barb is 10 knots, a short one 5 and a
filled pennant 50.

## Purpose

Meteorology's own graphic language, drawn by its rules: the wind on every
barb follows the pressure field, the fronts sit in pressure troughs, and
every symbol is the standard one.

## History

The first synoptic weather maps were drawn by H. W. Brandes (1820) from
old observations; daily telegraphed charts began in Britain and France in
the 1850s–60s. C. H. D. Buys Ballot stated his law of wind and pressure in
1857. Fronts and their symbols come from the Bergen school of Vilhelm and
Jacob Bjerknes, Halvor Solberg and Tor Bergeron (1918–22). The symbols and
the 4 hPa isobar interval follow the World Meteorological Organization's
conventions (WMO Manual on Codes; WMO-No. 485); the wind-barb notation is
the standard station model.

## This implementation

- **Spec knobs:** `width`, `height` (points); `hemisphere` (`north`,
  `south`); `systems` (highs and lows, 2–8); `fronts`; `barbs` (stations
  across the chart, 0–30); `coast`; `palette` (`auto`, `classic`,
  `vintage`, `mono`); `style` (`colour`, `lines`); `stroke`.
- **Generation:** pressure is `1013 hPa + Σ ±A exp(−½ dᵀQd)`: seeded
  anisotropic Gaussian lows (14–34 hPa deep) and highs (10–24 hPa), at
  least one of each. Every deep low gets a warm front heading east to
  south-east and a cold front trailing south-west (mirrored in the south),
  often joined to the low by an occluded front through a triple point;
  half the charts add a stationary front between a high and a low. Each
  front adds a trough `−3 hPa · e^{−d/D}` (`d` the distance to the front),
  which kinks the isobars. Isobars are the field's contours at multiples of
  4 hPa, labelled in gaps at their straightest points away from edges,
  fronts and centres. Symbols are spaced along each front by arc length on
  the side it moves toward (cold: into the warm sector; warm and occluded:
  into the cold air). The wind is the geostrophic wind `k × ∇p / f`, turned
  20° toward low pressure, at jittered stations; feathers on the
  low-pressure side. The coastline is thresholded seeded noise with a tilt.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic per seed; every isobar is a multiple of
  4 hPa and lies on its level to within 0.6 hPa (tested); every barb runs
  within 30° of the isobars (20° by construction) with low pressure on the
  left facing downwind in the north and on the right in the south, leaning
  toward the low (tested); fronts lie in troughs (tested). `verification:
  geostrophic_wind_buys_ballot`. Line art reports its colourability check.
  Clamped knobs are reported as `requested_<field>`.

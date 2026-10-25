---
title: "Human Sundial"
blurb: "Human-gnomon (analemmatic) sundial: a dimensioned plan in metres for a playground, or a true-size desk dial for a pencil, with an exact date scale"
category: design
version: "1.0.0"
---
The plan for a sundial where you are the gnomon: mark the hour points and
the date scale on a playground, stand on today's date, and your shadow
tells the time.

## What it is

An analemmatic sundial has no fixed pointer. Its hour marks sit on a wide
oval, and a person stands on a short scale of dates along the oval's
north–south line — further north in summer, further south in winter. Their
shadow then falls across the hour mark for the time. This page gives
everything needed to build one: a drawing of the dial, the exact position
of every hour point and every month's mark in metres from the centre, and
the steps to mark it out. A desk-size version is drawn at true size on the
paper, to be read with a pencil standing upright on the date.

## How to use it

1. Choose a flat, sunny spot. Find true north: put a stick upright and mark
   the tip of its shadow at local noon (or use a map); draw that
   north–south line, and an east–west line across it at right angles.
   Where they cross is the centre.
2. Measure each hour point from the table: the first number along the
   east–west line (minus means west), the second along the north–south
   line (minus means south). Paint a stone or a circle at each, with its
   number.
3. Paint the date scale on the north–south line, with the month marks at
   the distances in the table.
4. Stand upright on today's date, feet together, facing away from the
   Sun. Your shadow points at the time. To turn it into clock time add the
   correction for the month, and add an hour in summer time.

For the desk dial, print at 100% (check the 5 cm bar), lay the page flat
with its north line pointing north, and stand a pencil straight up on the
date.

## Purpose

A human sundial turns a playground into a working astronomical instrument
and makes the Sun's yearly climb visible: you must move to a new place on
the date scale as the seasons change. Building one practises measuring,
coordinates and compass directions; using one shows why sundial time and
clock time differ.

## History

Analemmatic dials were described in France in the 17th century; one of the
oldest surviving is in the church of Brou at Bourg-en-Bresse (rebuilt in
the 18th century on an older design). The geometry — the orthographic
projection of an equatorial dial onto the ground — was set out by
Vaulezard in 1640 and Ozanam later. They became popular again in the 20th
century for schools and parks, where children act as the gnomon. The
Sun's declination for the date scale comes from Jean Meeus's solar
formulae (*Astronomical Algorithms*, 2nd ed., ch. 25).

## This implementation

- **Spec knobs:** `latitude` (10–70°, the sign ignored), `hemisphere`
  (north, south), `longitude_correction` with `longitude` and
  `zone_meridian` (difference clamped to ±30°), `year` (1800–2200, for the
  date scale), `plan` (playground, desk), `major_m` (playground semi-major
  axis, 1–10 m), `palette` (auto, meadow, slate, sand, brick), `line_art`,
  `width`, `height`.
- **Generation:** with semi-major axis M, signed latitude φ and hour angle
  h = 15° × (clock time − 12) + (longitude − zone meridian when corrected),
  each hour point is (M sin h, M sin φ cos h) — east and north of the
  centre — and the gnomon for a day of declination δ stands at
  M tan δ cos φ on the north–south line. Hours are drawn while the Sun can
  be up at midsummer; half hours as dots. The date scale is ticked on the
  1st of each month from the Sun's declination at noon that day (January
  to June on one side, July to December on the other). The desk dial takes
  the largest whole half-centimetre M that fits and is drawn at 72 points
  per inch with a 5 cm check bar. Tables give metres to the centimetre
  (desk: centimetres to the millimetre) and the equation-of-time
  correction on the 1st of each month. The seed chooses only the
  decoration: the palette (when `auto`), the shape of the hour stones and a
  motto.
- **Solving:** Nothing to solve.
- **Guarantees:** meta `"verification": "shadow_exact"`: for random dates,
  times and longitudes at latitudes 10–70° in both hemispheres, the shadow
  of a vertical gnomon standing on the date point — along the Sun's true
  azimuth from the solar position and sidereal time — passes through the
  hour point for that instant to within 0.1° (tested on over a thousand
  instants). The drawn marks are the formulas (tested), hours cover the
  longest day and no more, the desk dial is true size, the seed changes
  the decoration and never a mark, and clamped inputs are reported
  (`requested_latitude`, `requested_major_m`, `requested_year`,
  `requested_longitude_shift_deg`).

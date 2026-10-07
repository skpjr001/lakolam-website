---
title: "Sundial"
blurb: "Paper horizontal sundials for your latitude — exact hour lines (tan θ = sin φ tan h), a true-size gnomon template with glue tabs, and an equation-of-time table"
category: design
version: "1.0.0"
---
A paper sundial made for your latitude: cut out the gnomon, fold it, glue it
on the noon line, and read the time from the sun.

## What it is

A horizontal sundial: a flat face with hour lines fanning out from one
point, and a triangular gnomon that stands upright on the noon line. The
gnomon's sloping edge rises at the same angle as your latitude, so it points
at the celestial pole — the Pole Star in the north — and lies parallel to the
Earth's axis. Its shadow then swings round evenly through the day and falls
on the hour lines, which are spaced closer together near noon and wider
towards morning and evening, exactly as your latitude requires. The page
also carries a table of the small corrections that turn sundial time into
clock time through the year.

## How to use it

1. Print the page at actual size (100%, no "fit to page"). Measure the black
   scale bar: it must be 5 cm long. If it is not, the gnomon will not match
   the dial — reprint.
2. Glue the page to card if you like, and cut out the gnomon. Fold it in half
   along the dashed back edge so the two triangles lie together, and fold
   the glue tabs outwards along the bottom edges.
3. Glue the tabs along the thick gnomon line on the dial, with the pointed
   end (the angle marked with your latitude) on the dot where the hour lines
   meet. The gnomon should stand straight up.
4. Lay the dial flat and level in the sun, with the gnomon line pointing to
   true north (true south in the southern hemisphere) — use a map or the
   shadow of a vertical stick at local noon, not just a compass.
5. Read the hour where the shadow of the sloping edge falls. To get clock
   time, add the correction for the date from the table, and add an hour in
   summer time. If the dial was made with a longitude correction, set it up
   by the dashed meridian line instead; the hour lines already allow for
   your distance from the time-zone meridian.

## Purpose

Making a sundial that works is one of the most satisfying ways to see the
Earth turning. It joins geometry (the tangent formula for the hour lines),
geography (latitude and longitude) and astronomy (the equation of time) in
one object you can hold, and it makes a good classroom or family project.

## History

Shadow clocks were used in Egypt more than three thousand years ago, and the
Greeks and Romans built many dials whose hours were twelfths of daylight, so
their length changed with the seasons. Around the 14th century, dial makers
in the Islamic world and then in Europe learned to tilt the gnomon parallel
to the Earth's axis, giving equal hours all year — the dial drawn here. In
the 17th and 18th centuries "dialling" was taught as a branch of
mathematics, and garden dials carried mottoes such as "I count only the
sunny hours". Clocks then took over timekeeping, and railways brought
standard time zones in the 19th century — which is why a sundial needs the
longitude and equation-of-time corrections to agree with a watch.

## This implementation

- **Spec knobs:** `latitude` (5–85°, the sign ignored), `hemisphere`
  (north, south), `longitude_correction` with `longitude` and
  `zone_meridian` (degrees, east positive; the difference is clamped to
  ±30°), `marks` (hours, half_hours, quarter_hours), `numerals` (roman,
  arabic), `palette` (auto, parchment, slate, terracotta, verdigris),
  `line_art` (black on white for printing), `equation_table`, `width`,
  `height` (page size in points).
- **Generation:** for each clock time the sun's hour angle is
  h = 15° × (time − 12) + (longitude − zone meridian) when the correction is
  on, and the hour line makes the angle θ with the meridian given by
  tan θ = sin φ · tan h (computed with `atan2(sin φ · sin h, cos h)` so lines
  past six o'clock fall in the right quadrant). Lines are drawn only for
  times when the sun can be up: within half the length of the midsummer
  day, acos(−tan φ · tan 23.44°), or all round the clock where the midsummer
  sun never sets. The southern dial is the mirror image, its hours running
  anticlockwise. The face, the gnomon template and the table share one
  scale (points at 72 per inch), so the template's base is exactly the
  gnomon line drawn on the dial; a steep gnomon is laid out a quarter turn
  round so it stays as large as possible. The seed chooses only the
  decoration: the palette (when `auto`), the border ornament (rays, dots,
  chevrons, ropes) and a traditional motto. Numerals that would collide
  (near the equator the lines crowd round noon) are dropped, nearest noon
  kept first.
- **Solving:** nothing to solve — a design. The equation of time comes from
  Meeus's low-precision solar formulae (*Astronomical Algorithms*, ch. 28)
  for 2026; it changes by well under half a minute from year to year.
- **Guarantees:** deterministic per seed; `verification: hour_lines_exact`.
  Tested: every drawn line's angle, measured from its endpoints on the page,
  matches an independent 3-D shadow calculation (the plane through the
  polar axis and the sun, cut by the dial) and the tangent formula; noon
  lies on the meridian and six o'clock square to it; the southern dial is
  the exact mirror of the northern; the drawn gnomon template has the
  latitude angle at its foot, a right angle at the back, mirror halves
  about the fold, and a base equal to the dial's gnomon line; the
  equation of time is within 30 seconds of published values; the scale
  bar is 5 cm; line art is black only. Near the equator a horizontal dial
  is a poor instrument — its lines crowd round noon — but it is still drawn
  exactly.

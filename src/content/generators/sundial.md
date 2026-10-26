---
title: "Sundial"
blurb: "Paper sundials for your latitude — horizontal, vertical, declining, polar or equatorial, exact hour lines, a true-size gnomon template with glue tabs, and an equation-of-time table"
category: design
version: "1.1.0"
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

The page can also make four other kinds of dial; the template and the
setting-up note on the page change to suit:

- **Vertical:** fix the face on a wall that faces due south (due north in
  the southern hemisphere), the noon line plumb, and glue the gnomon on the
  thick line hanging from the dot.
- **Declining:** the same, for a wall turned away from due south by the
  angle printed under the face. The gnomon line then leans away from the
  noon line — glue the gnomon on the thick line, not on XII.
- **Polar:** tilt the face up from level by your latitude, facing due south
  (north), and glue the fin upright along the thick noon line. Its top
  edge casts the shadow; the hour lines are parallel.
- **Equatorial:** cut out both faces and glue them back to back, then push a
  straight rod (a skewer) through both dots, square to the card, at least as
  long as the page says on each side. Rest the dial on the folded stand so
  the rod points to true north (south) and rises by your latitude. Read the
  upper face from March to September and the lower face the rest of the year
  (the other way round in the southern hemisphere).

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
  `height` (page size in points), `kind` (horizontal — the default —
  vertical, declining, polar, equatorial), `declination` (declining dials:
  the wall's turn from due south, degrees west positive, clamped to ±75 and
  recorded as `requested_declination_deg`; ignored by the other kinds).
- **Other kinds (Waugh, *Sundials: Their Theory and Construction*; Rohr,
  *Sundials*):** one vector construction serves them all. With `n` the
  plate's outward normal, `g` the style (the polar axis pointed out of the
  plate), `m` the equator's meridian point and `w` west, the hour line at
  hour angle h is `n × (g × q)`, `q = cos h · m + sin h · w`, on the side
  away from the sun. That is tan θ = cos φ · tan h on a vertical dial
  (style height 90° − φ) and tan θ = cos φ / (cos D · cot h + sin D · sin φ)
  on one declining D west (style height asin(cos φ · cos D), the substyle
  leaning off the noon line). A polar plate contains the axis, so its lines
  are parallel at x = H · tan h for a fin of height H, drawn to ±75° (five
  hours either side of noon) with H as large as the face allows; the fin
  template is H tall. An equatorial plate is square to the axis: both faces
  have lines 15° an hour apart, mirror images, the upper face lit while the
  sun is north of the equator, the lower face the rest of the year, with a
  stand template tilted 90° − φ and a rod at least r · tan 23.44° each side
  (r the face's half-width) so the rod tip's shadow reaches the lines at the
  solstice. On every kind a line is drawn only for clock times at which the
  sun can be both above the horizon and in front of the plate on some day of
  the year (checked every quarter degree of declination); a vertical dial
  then runs six to six at most. The root sits where the lines and the
  substyle reach furthest into the face. Meta adds `kind`,
  `style_height_deg` (also `gnomon_angle_deg`), `declination_deg` and
  `substyle_angle_deg`, `fin_height_mm`, `face_tilt_deg`,
  `stand_angle_deg`, `rod_min_cm_each_side` and the lower face's
  `lower_face_hour_lines`; hour lines give `line_angle_deg` clockwise on the
  page from the noon line (`offset_mm` on a polar dial).
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
  exactly. The other kinds carry the same `hour_lines_exact` guarantee,
  tested on every drawn line of every kind and both hemispheres: its
  direction measured on the page matches the shadow of a point of the style
  moved along a sunbeam onto the plate (a direct construction, not the
  plane intersection the lines are drawn from); vertical lines match
  tan θ = cos φ · tan h, declining lines the closed form above, polar lines
  sit at H · tan h and agree with the shadow of the fin's edge, equatorial
  lines are 15° an hour on both faces and the faces mirror each other; the
  templates have the style height (or stand tilt) at the foot; the polar fin
  is exactly H tall. The default (`kind: horizontal`) draws every earlier
  page byte for byte.

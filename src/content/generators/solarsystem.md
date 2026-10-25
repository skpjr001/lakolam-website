---
title: "Solar System to Scale"
blurb: "The Solar System to scale: a true-size lineup, a distance strip to tape across pages, the orbits on a date and a scale-model table"
category: design
version: "1.0.0"
---
The Sun and planets at one true scale — a lineup, a strip to tape across the
floor, the orbits on any date, and a scale model you can pace out.

## What it is

Pictures of the Solar System nearly always cheat: the planets are drawn the
same size and side by side, because at one honest scale for both size and
distance they would be specks hundreds of metres apart. This page tells the
truth one measure at a time. The **size lineup** shows the edge of the Sun
and the eight planets in a row at a single scale, so you can see that Jupiter
is eleven Earths across and the Sun 109. The **distance strip** spreads the
planets' distances from the Sun along a paper strip printed over several
pages, with cut lines and glue tabs, to tape together into a corridor a metre
or more long. The **orbits** page shows where every planet really was (or
will be) on a chosen date, the inner and outer planets in two panels. The
**scale table** answers "if the Sun were a ball 20 cm across, how big and how
far away is everything else?" — with an everyday object of about each size.

## How to use it

For the lineup, compare the planets with each other and with the Sun's huge
curved edge; measure them with a ruler and use the scale printed under the
title to turn millimetres back into kilometres. For the strip, print every
page, cut each band out along the dashed lines, lay each page over the grey
tab of the one before so the triangles meet, and tape the joins. Lay it on
the floor and walk from the Sun: the inner planets crowd together at the
start, then the gaps open up. The light times say how long sunlight takes to
reach each planet. For the orbits, pick a birthday or an event and see where
the planets stood; the line from the Sun points to where the Sun sits in the
sky at the March equinox. For the table, choose the size of your model Sun,
find objects of the listed sizes, and pace out the distances in a park — one
long stride is about a metre.

## Purpose

To make the scale of the Solar System something you can hold and walk,
rather than a number. Children meet the sizes and distances as objects they
know; older students can check the arithmetic (every model figure is the
real one times a single factor) and see why no textbook diagram can show
both size and distance at once.

## History

Scale models of the Solar System go back to orreries of the early 1700s,
which got the order and periods right but not the distances. Walkable
"planet walks" became popular in the 20th century — Sweden's model with the
Stockholm Globe Arena as the Sun is the largest — and "if the Sun were a
ball" exercises are a classroom staple (Guy Ottewell's *The Thousand-Yard
Model*, 1989, uses an 8-inch ball). Radii are the IAU 2015 nominal values
(Mamajek et al., resolution B3; Archinal et al. 2018 for the planets);
distances and positions come from E. M. Standish, "Approximate Positions of
the Planets" (JPL Solar System Dynamics), Table 1, valid 1800–2050.

## This implementation

- **Spec knobs:** `kind` (size_lineup, distance_strip, orbits, scale_table);
  `pluto` (add the dwarf planet to the lineup, strip and table); `strip_pages`
  (1–40) and `index` (which page, from 0); `year`, `month`, `day` for the
  orbits (1800–2050); `sun_cm` (model Sun diameter, 1–1000 cm); `look`
  (colour, ink); `palette` (auto, night, parchment, slate); `page`,
  `landscape`, `margin_mm`.
- **Generation:** every body has one equatorial radius and one mean distance
  (the J2000 semi-major axis from JPL's elements; Pluto 39.482 AU). The lineup
  finds the largest single scale at which all slots (Saturn with its rings,
  each slot at least as wide as its name) fit beside the Sun's limb, with
  Jupiter no taller than about half the page. The strip's scale is the strip
  length (pages × usable width) less an end margin, over the farthest body's
  distance; page *j* shows strip positions [j·w, (j+1)·w) and carries a glue
  tab beyond w. Planet discs on the strip are enlarged (their true size would
  be under a dot) and labelled in non-colliding lanes. The orbits panels draw
  each orbit from the elements on the date and each planet at its
  heliocentric position, viewed from the ecliptic's north pole. The table
  multiplies sizes and distances by one factor, sun_cm / Sun diameter. The
  seed varies only decoration: the palette (when `auto`) and the scattered
  background stars.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic; ratios exact (`verification:
  ratios_exact`): every lineup radius divided by Earth's equals the radius
  ratio of the data, every strip position divided by Earth's equals the
  distance ratio, every orbits position is the planet's heliocentric position
  on the date, every table figure is the data times one factor (all to
  10⁻¹²); the strip's pages join exactly (page j starts at j × usable width,
  total length pages × usable width); planets in the lineup never overlap;
  clamped knobs are reported (`requested_<field>`); everything stays on the
  page; the ink look is grey only.

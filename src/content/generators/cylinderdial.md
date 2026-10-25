---
title: "Shepherd's Dial"
blurb: "Shepherd's cylinder dial: a true-size wrap for a tube with hour curves across the year, a gnomon template and a turning top cap"
category: design
version: "1.0.0"
---
A pocket sundial on a tube: wrap it round a cardboard roll, turn the cap to
today's date, face the Sun, and the shadow's tip tells the hour.

## What it is

The shepherd's dial (pillar dial or cylinder dial) is one of the oldest
portable sundials. It is a cylinder with a small blade — the gnomon —
sticking out sideways from a cap that turns on top. Held upright with the
blade pointing at the Sun, the blade's shadow falls straight down the
side. When the Sun is high the shadow is long; when it is low the shadow is
short. Curved hour lines running across the year's months turn the length
of the shadow into the time of day. This page prints the wrap at exactly
the right size for your tube, with the gnomon and a turning cap at the
same scale.

## How to use it

1. Print at 100% and check that the black bar measures 5 cm. Measure your
   tube (a kitchen-roll or poster tube) and make the page for that
   diameter: the wrap must go exactly once round.
2. Cut out the wrap and glue it round the tube with the orange gnomon line
   at the top edge, the tab under the other end.
3. Cut out the cap and fold its tabs down so it sits snugly on the tube but
   can still turn.
4. Cut out the gnomon strip and glue it under the cap along the cap's
   centre line, so that the part marked with its length sticks out beyond
   the dashed line at the cap's edge.
5. To read the time: turn the cap so the gnomon is above today's date. Hold
   the dial by its top, hanging straight, and turn it until the gnomon
   points at the Sun and its shadow falls straight down the tube. The tip
   of the shadow is at the hour. Each line carries two hours, a morning one
   and an afternoon one (9/3 means nine in the morning or three in the
   afternoon) — you know which half of the day it is. The dial shows
   solar time: for clock time allow for summer time, your longitude and
   the equation of time (up to a quarter of an hour).

## Purpose

A sundial you can make from a toilet-roll tube in half an hour and carry
in a pocket. It shows a different side of the Sun's motion from a flat
dial: it measures the Sun's height rather than its direction, so it needs
to know the date — and it shows why the Sun stands higher in summer.

## History

Cylinder dials go back to Roman times and were common in medieval Europe;
the 11th-century writer Hermannus Contractus described one, and Chaucer's
*Shipman's Tale* has a monk carrying a "chilyndre". Shepherds in the
Pyrenees used wooden ones into the 20th century, which is how they got
their English name. The Sun's declination for each day comes from Jean
Meeus's solar formulae (*Astronomical Algorithms*, 2nd ed., ch. 25).

## This implementation

- **Spec knobs:** `latitude` (15–66°, the sign ignored), `hemisphere`
  (north, south), `diameter_mm` (20–120, no wider than the page allows),
  `height_mm` (60–220, no taller than the page allows), `year`
  (1800–2200), `palette` (auto, parchment, delft, meadow, heather),
  `line_art`, `width`, `height`.
- **Generation:** the wrap is exactly π·D wide, one column per day of the
  year (the year's declinations at noon UT), months marked on the 1st. For
  each solar hour from 4 to 12, the Sun's altitude is
  sin a = sin φ sin δ + cos φ cos δ cos H with H = 15° × (hour − 12), and
  the shadow of the gnomon's tip lies g · tan a below the gnomon line;
  morning and afternoon hours symmetric about noon share a curve. The
  gnomon is as long as lets the highest Sun the dial is laid out for —
  the midsummer noon Sun, or 65° where that is higher — reach the foot of
  the hour field, so at lower latitudes the summer noon curve runs off the
  foot rather than squeezing every other hour into the top (at most the
  page's width less half the tube). Labels go where no other curve or label
  crowds them. The wrap, the gnomon template and the crenellated cap share
  one scale (72 points to the inch); cut lines are solid, fold lines dashed.
  A page too short to hold the parts at true size is refused with a clear
  message. The seed chooses only the decoration: palette (when `auto`),
  border and motto.
- **Solving:** Nothing to solve.
- **Guarantees:** meta `"verification": "shadow_lengths_exact"`: shadow
  depths measured back off the drawn page for random dates and hours, at
  latitudes 15–66° in both hemispheres, match an independent computation
  (the Sun's altitude from its position at that instant, the shadow found
  by intersecting the ray from the gnomon's tip with the dial's surface)
  within 0.2 mm; the wrap is π·D wide; noon is the deepest curve; the
  gnomon template's length matches the dial; clamped inputs are reported
  (`requested_latitude`, `requested_diameter_mm`, `requested_height_mm`,
  `requested_year`).

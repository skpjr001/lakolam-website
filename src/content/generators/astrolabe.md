---
title: "Planispheric Astrolabe"
blurb: "Planispheric astrolabe: a print-and-make astrolabe — mater, plate for your latitude, star rete for your year, rule and alidade"
category: design
version: "1.0.0"
---
Print, cut and pin together a working astrolabe for your latitude, with the
stars where they stand in your year.

## What it is

The astrolabe is the sky folded flat: a brass computer for the heavens used
from late antiquity to the seventeenth century. Three sheets make one here.
The first is the **mater**, a disc with a hanging ring and a raised rim (the
limb) marked in hours and degrees, with the **plate** for your latitude
printed on its face: the two tropics and the equator, the horizon, the
almucantars (circles of equal altitude), the azimuth arcs that climb to the
zenith, a dashed line for the end of twilight and the twelve unequal hours
of the night. The second sheet is the **rete**, an open frame that turns
over the plate, carrying the off-centre ring of the zodiac and pointers whose
tips are bright stars, and the **rule**, a turning bar with a declination
scale. The third is the mater's **back**: an altitude scale, a calendar ring
beside the zodiac, and a shadow square, with the **alidade**, a sighting bar
with two folding vanes.

## How to use it

1. Glue each sheet to thin card (the rete is best printed on clear film).
   Cut out the mater, its back, the rete, the rule and the alidade; glue the
   mater and its back together, back to back.
2. Pin everything through the centre: the alidade on the back; the rete and
   then the rule on the face, so that all three turn.
3. **Measure an altitude.** Hang the astrolabe from its ring, turn the
   alidade until you see a star (or the Sun's spot of light, never the Sun
   itself) through both vanes, and read its altitude on the back's rim.
4. **Find the Sun.** Lay the alidade on today's date on the calendar ring;
   the zodiac ring beside it gives the Sun's place, which you then find on
   the rete's zodiac ring.
5. **Set the sky.** Turn the rete until the star you measured sits on the
   almucantar of its altitude, east or west of the meridian as you saw it.
   The plate now shows the whole sky as it is: what is up, what is rising
   and setting, where the Sun is below the horizon.
6. **Tell the time.** Lay the rule's edge over the Sun's place and read the
   time where it crosses the hour scale on the rim (12 at the top is noon).
   The rete's little pointer shows the sidereal time on the degree scale.
7. Turn the rete to put the Sun's place on the eastern horizon to find
   sunrise, on the western horizon for sunset, and on the dashed twilight
   line for the end of dusk.

## Purpose

A real scientific instrument from paper and a pin, and the most beautiful way
there is to understand the sky's daily turning: the plate stays still, the
sky turns over it. It connects geometry (the projection keeps circles as
circles and angles true), astronomy (altitude, azimuth, sidereal time, the
zodiac, precession) and history.

## History

The stereographic projection that makes the astrolabe possible is described
in Ptolemy's *Planisphaerium* (2nd century), and the instrument itself by
John Philoponus (6th century) and Severus Sebokht (7th). It flourished in
the Islamic world — al-Sufi counted a thousand uses — and in medieval
Europe, where Geoffrey Chaucer wrote his *Treatise on the Astrolabe* (c.
1391) for his son. Great collections survive at the Museum of the History of
Science, Oxford, the Adler Planetarium, Chicago, and the National Maritime
Museum, Greenwich. Construction follows J. D. North, *Chaucer's Universe*
(1988), and J. E. Morrison, *The Astrolabe* (2007). Star places are from the
Yale Bright Star Catalogue (5th ed., public domain), moved by proper motion
and precessed with Meeus, *Astronomical Algorithms* (2nd ed., 1998), ch. 21;
the Sun's longitude for the calendar ring from Meeus ch. 25.

## This implementation

- **Spec knobs:** `latitude` (−89 to 89; north positive; a southern latitude
  makes a southern instrument, projected from the north celestial pole);
  `year` (1500–2500), the epoch of the stars, the obliquity and the calendar
  ring; `almucantar_step` (two, five, ten degrees; azimuth arcs every 10°, or
  15° with ten); `stars` (8–40 pointers, brightest first); `palette` (auto,
  brass, midnight, verdigris, parchment, ink); `page`; `margin_mm`.
- **Generation:** everything is the stereographic projection from the south
  celestial pole onto the equator, scaled so the tropic of Capricorn is the
  plate's edge. Each line is built from its own definition: a declination
  circle has radius r = R·tan((90° − δ)/2); an almucantar is the circle on its
  two meridian crossings at zenith distance 90° − h either side of the
  zenith; an azimuth arc is the circle through the projected zenith, nadir
  and its horizon point; the ecliptic on the rete is the circle through three
  projected ecliptic points; each unequal-hour line is the circle through its
  points on the three solar circles (−ε, 0, +ε), where the Sun's night arc is
  divided into twelve. Star pointers are placed with the library projection
  and grow from the nearest part of the rete's frame; names are placed where
  they overlap least. The rete's pointer (almuri) sits at the first point of
  Aries. The back's calendar ring puts each day of the chosen year at the
  Sun's apparent longitude at noon UT. A southern plate is the northern
  construction for the mirrored sky (declinations and latitude negated),
  which keeps every altitude. The seed varies decoration only: palette (when
  `auto`), throne, rete tracery, pointer shape, rim border and motto.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic; `verification: altitude_exact` — for 400
  random stars and sidereal times at six latitudes (both hemispheres) and
  years from 1600 to 2400, the star's tip on the turned rete lies on the
  almucantar of the altitude computed independently from the hour angle
  (`alt_az`) within 0.05° (in practice to rounding); stars at altitude 0 lie
  on the horizon circle within 10⁻⁶ of the plate radius; the ecliptic
  touches both tropics (to 10⁻⁹) and passes through every projected ecliptic
  point; azimuth arcs pass through zenith and nadir and every point of their
  azimuth; unequal hour 6 is the midnight meridian. All ink lies inside the
  margins on every page size; clamped knobs are reported
  (`requested_<field>`); the ink palette is grey only. The three sheets
  share one scale. Stars are mean places (no nutation or aberration, under a
  minute of arc) — far finer than a paper instrument reads.

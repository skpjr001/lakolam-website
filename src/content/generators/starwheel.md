---
title: "Star Wheel"
blurb: "Planisphere (star wheel) for any latitude, to cut out and pin, or a sky chart for a date, time and place"
category: design
version: "1.1.0"
---
Make a planisphere for your own latitude — a turning star map that shows
the sky for any date and hour — or print the sky above a place at a moment.

## What it is

A **planisphere** (star wheel) is two discs pinned together at the pole
star. The star disc carries the stars and constellations, with the months
and days round its edge; the holder on top has an oval window, cut to the
horizon of your latitude, and the hours round its rim. Turn the disc until
the date meets the time, and the window shows exactly the stars above you.

A **sky chart** shows the whole sky above the horizon at one date, time and
place, with the point overhead in the middle — a keepsake of a birthday or
a first night under the stars, or a map to take outside.

## How to use it

**Making the planisphere.** Print both pages, on card if you can. Cut out
the star disc round its outer circle. Cut out the holder round its circle,
then cut out the white window (the dashed line). Push a paper fastener
through the cross at the centre of the holder and then the centre of the
disc, holder on top, and open it at the back so the disc turns freely.

**Using it.** Turn the disc until today's date lines up with the time on
the holder's rim. The hours are local time without summer time: if your
clocks are an hour ahead in summer, use the hour before. Go outside, face
south (or north, if the bottom of your window says N), and hold the wheel
up in front of you with that edge at the bottom. The stars near the bottom
of the window are low over that horizon, and the middle of the window is
the sky straight overhead. The letters E and W show where stars rise and
set. Turn the disc forward an hour to see what the sky will look like
later tonight.

**Using the sky chart.** Hold it above your head with the N towards the
north: east and west then match the sky, and the middle is overhead.

## Purpose

A planisphere teaches how the sky turns: why some stars never set, why the
winter and summer constellations differ, and how the sky depends on where
you live. It is a classic classroom project (Earth and space in the upper
primary years) and a real observing tool for beginners — no batteries, no
screen to spoil dark-adapted eyes.

## History

Star maps on a turning disc go back to the astrolabe of the ancient Greek
and medieval Islamic astronomers. The modern planisphere, a star disc
under a mask with a horizon window, appeared in the 19th century, and
printed cardboard star wheels have been sold to amateur astronomers ever
since. The star positions here come from the Yale Bright Star Catalogue,
first compiled by Frank Schlesinger in 1930 and revised by Dorrit Hoffleit.

## This implementation

- **Spec knobs:** `kind` (`planisphere`, `sky_chart`); `latitude`
  (a planisphere is made for 10–80° north or south, the nearest being used
  and reported as `requested_latitude`); `longitude`, `month`, `day`,
  `hour`, `minute`, `utc_offset` (the sky chart's place and moment);
  `year` (the epoch the stars are precessed to, and the chart's year);
  `look` (`colour` night sky or `print` black on white); `names`
  (constellation and bright-star names); `faintest` (magnitude limit,
  1–4.5); `width`, `height`.
- **Data:** the 1,035 stars of the Yale Bright Star Catalogue, 5th revised
  edition (Hoffleit and Warren 1991, CDS catalogue V/50; public domain)
  brighter than magnitude 4.5 or used by a figure; constellation stick
  figures from d3-celestial (BSD-3-Clause, Olaf Frohn), matched to
  catalogue stars within 0.003°; IAU constellation and star names.
- **Generation:** each star's J2000 place is moved by its proper motion
  and precessed rigorously to the chart's date (Meeus, ch. 21). The
  planisphere's star disc is a polar equidistant projection about the
  visible pole, reaching just past the horizon's farthest point; right
  ascension runs clockwise in the north (anticlockwise in the south) so
  that the sky turns the right way. The date mark of each day sits at the
  Greenwich mean sidereal time of 0h on that day (Meeus 12.4), the hour
  ring at 15° an hour with midnight at the bottom, and the window is the
  horizon (altitude 0) traced every degree of azimuth and mapped through
  the same projection. The sky chart uses a stereographic projection of
  the dome, zenith at the centre, north up and east to the left. The seed
  only tints the night colour.
- **Solving:** nothing to solve — a design to make and use.
- **Guarantees:** `planisphere_checked` — every vertex of the drawn window,
  read back from the page, lies at altitude 0 to 1e-9°; the rings put the
  right sidereal time on the meridian to within 2 minutes on every date
  and hour (`ring_error_minutes`; a disc whose 24 hours span 360° cannot
  do better, as a sidereal day is 4 minutes shorter); `sky_checked` —
  every star's altitude and azimuth from Meeus's formulas agrees with an
  independent vector rotation to 1e-9°. The tests check Julian day and
  sidereal time against Meeus's examples 7.a, 12.a and 12.b, precession
  against example 21.b (θ Persei), altitude and azimuth against example
  13.b (Venus from Washington), catalogue places of Sirius, Vega and
  Polaris, Polaris's altitude, and Orion's place in a January evening sky.
- **Version 1.1:** nested and single clips now apply to live text in web SVG too — labels inside a clipped frame are cut at the frame, as they always were in print, PNG and PDF; print output is unchanged.

---
title: "Star Atlas Plates"
blurb: "Star atlas plates in the manner of the engraved atlases: one constellation, graticule, graded stars, Greek letters and a cartouche"
category: design
version: "1.0.0"
---
One constellation as a plate from an old engraved star atlas — graticule,
graded stars, Greek letters, and a cartouche with its Latin name.

## What it is

A **star atlas plate** maps one constellation and the sky round it. The
stars are drawn as discs, bigger for brighter stars, with the stick figure
joining the main ones. Lines of right ascension (the sky's longitude, in
hours) and declination (its latitude, in degrees) run across the plate,
numbered in a ruled border whose black-and-white divisions measure the
degrees. Beside the stars stand their **Bayer letters** — α for the
brightest, β for the next, and so on through the Greek alphabet (π², π³ …
for stars sharing a letter) — **Flamsteed numbers** for the fainter
unlettered stars, and the proper names of the brightest. A magnitude scale,
a compass and a framed title panel, the cartouche, complete the page.

Pages come engraved (ink on cream paper), modern (white stars on deep
blue), in colour (each star tinted by its true colour, blue-white to
orange), or as line art to colour in.

## How to use it

**Reading the plate.** North is at the top and east is to the **left** —
the plate shows the sky as you see it looking up, not a map of the ground
looking down. Each line running up the plate is an hour of right
ascension; each line running across is a declination, marked in the
border (+20° north of the celestial equator, −20° south of it). The
magnitude scale at the bottom shows how big a star of each brightness is
drawn: 0 is a very bright star, 5 is about the faintest you can see from a
dark country sky.

**Finding it in the sky.** Start with the figure's brightest stars, the
largest discs, and look for their shape; the neighbouring constellations,
named in spaced letters, help you step from one figure to the next. The
star letters let you name what you see: α Orionis is Betelgeuse, β Orionis
is Rigel.

**As a print.** Each plate is a finished picture: frame a single one, or
print the constellations of your birthday month, the zodiac, or a season's
sky as a set. Colour the line-art plates in pencil or watercolour — stars
gold or tinted by colour, the sky between left white or washed blue.

## Purpose

An atlas plate is both a working chart and a piece of decorative art. It
teaches the sky's coordinate grid, how stars are named, and how
brightness is measured, and it is a handsome print for a study, nursery
or classroom wall — or a gift for anyone born under a particular
constellation.

## History

Johann Bayer's *Uranometria* (Augsburg, 1603) was the first atlas to cover
the whole sky, engraved on copper by Alexander Mair, and it introduced the
Greek letters still used to name stars. Johannes Hevelius's *Firmamentum
Sobiescianum* (Gdańsk, 1690) and John Flamsteed's *Atlas Coelestis*
(London, 1729), whose catalogue gave the Flamsteed numbers, followed; the
great hand-engraved tradition ended with Bode's *Uranographia* (1801).
Their plates combined careful measurement — a graduated border, stars
placed by catalogue — with ornament: titled cartouches, scrolls and
foliage. These pages are drawn afresh from a modern catalogue in that
manner; no historic plate is copied. Sources: D. Hoffleit and W. H. Warren
Jr., *The Bright Star Catalogue*, 5th revised edition (Yale University
Observatory, 1991); J. P. Snyder, *Map Projections — A Working Manual*
(USGS Professional Paper 1395, 1987); J. Meeus, *Astronomical Algorithms*
(2nd ed., 1998), chapter 21; N. Kanas, *Star Maps: History, Artistry, and
Cartography* (Springer, 2007).

## This implementation

- **Spec knobs:** `constellation` (`auto`, chosen by the seed with the
  best-known figures — Orion, the Great Bear, Cassiopeia, Cygnus, Scorpius
  … — coming up most; or any of the 88 by IAU abbreviation, name or Latin
  genitive in any case; anything else is refused); `faintest_magnitude`
  (1–6); `labels` (`greek`: Bayer letters and Flamsteed numbers, `names`:
  proper names, `both`, `none`); `genitive` (the Latin genitive under the
  name); `graticule`; `figure` (this constellation's and its neighbours'
  stick figures); `style` (`engraved`, `modern`, `colour`, `line_art`);
  `palette` (the engraved ink: `sepia`, `iron_gall`, `prussian`, or `auto`
  by seed; other styles ignore it); `year` (the epoch, 1000–3000, default
  2000); `width`, `height`, `margin` (points). Out-of-range values are
  clamped and reported as `requested_<field>`.
- **Data:** the Yale Bright Star Catalogue, 5th revised edition (public
  domain), and d3-celestial's stick figures (BSD-3-Clause, Olaf Frohn),
  both through `lako_astro::stars`; IAU (WGSN) star names; Latin genitives.
  **Not drawn:** the IAU constellation boundaries (Delporte 1930, CDS
  catalogue VI/49) — their redistribution terms could not be confirmed, so
  each plate is framed round its figure instead — and the Milky Way, for
  which no public-domain outline was to hand. Meta records both omissions.
- **Generation:** every star is moved by its proper motion from J2000.0 and
  precessed to the epoch's equinox (Meeus 21.2–21.4); the graticule is that
  equinox's. The region is the figure's stars plus the constellation's
  lettered stars to magnitude 5. A region centred above 50° of declination
  goes on an oblique stereographic projection about its centre; any other
  on an equidistant conic whose standard parallels lie a sixth of the way
  in from the region's northern and southern edges (Snyder's rule), moved
  at least 8° off the equator so the cone never degenerates. The plane is
  seen from inside the sky (east left, north up) and scaled to fit the
  region plus a margin, never less than 18° of sky, into the frame.
  Graticule spacing is chosen for five to seven labelled lines; the
  border's divisions use the finest multiple of the fine step that keeps
  every division legible. Stars to the magnitude cut are drawn as discs
  graded by magnitude (slightly smaller on very wide fields), each in a
  paper halo that breaks the lines behind it. Labels are placed greedily
  in priority order (the constellation's Bayer letters by brightness,
  names, Flamsteed numbers, other constellations' letters, neighbours'
  names), each tried in eight positions round its star and put in the
  first that touches no star disc, no earlier label and nothing outside
  the frame, preferring positions that cross no figure line; a label with
  no free position is dropped and listed in meta. Greek letters are drawn
  as letters when the stroke font covers them, spelled (ALP, BET …)
  otherwise (meta `greek_glyphs`). The seed picks the constellation (when
  `auto`), the engraved ink and the cartouche (notched, rounded or
  chamfered corners; scrolled volutes or laurel sprays).
- **Solving:** Nothing to solve.
- **Guarantees** (meta `verification`: `graticule_labels_exact`): every
  border number sits where its line crosses the frame, found by bisection
  on the exact projection, and reading the plate back at that point gives
  the printed hour or degree to 10⁻⁶°; every page point inverts exactly
  through the projection (round trip under 10⁻⁶ pt); every drawn star is
  a catalogue star within the magnitude cut, its whole disc inside the
  frame; no label overlaps another label or any star disc; all ink stays
  on the page. Tests check each of these for polar, equatorial, southern,
  very wide and very small constellations, at several epochs.

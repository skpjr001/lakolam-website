---
title: "Planetary Dance"
blurb: "Planetary dance: a line between two planets on their real orbits every few days, until the rosette of their conjunctions appears"
category: design
version: "1.0.0"
---
Draw a line between two planets every few days, for a few years, and their
real orbits weave a flower — five petals for Earth and Venus.

## What it is

Two planets travel round the Sun on their true, slightly oval orbits. At
regular moments a straight line is drawn from one to the other. Any one
line means little, but after hundreds of them a rosette appears, and its
number of petals is the number of times the inner planet overtakes the outer
one before the pair is back where it started. Earth and Venus line up five
times in almost exactly eight years, so their lines draw a five-fold
flower; Jupiter and Saturn meet three times in sixty years and draw a
triangle. The page can also show the path of each line's midpoint — a
looping rose curve — or watch the dance from a frame that turns with the
planets, where every meeting falls at the same place.

## How to use it

Frame it, colour it, or use it to start a conversation about the sky. Pick
a pair of planets and count the petals: then count how many times the two
planets met in the years written under the picture — the numbers match.
Change the number of years and the flower stays open; choose the pair's
natural span and it closes. The black-and-white style prints well for
colouring the bands between the lines.

## Purpose

A piece of generative art whose pattern is not invented: every line ends
exactly where a planet really was on that day. It shows how resonances
(near whole-number ratios of orbital periods) turn into visible symmetry,
and makes the synodic period — the time between two meetings — something
you can count on paper.

## History

The Earth–Venus pentagram was known to Babylonian and Maya astronomers, who
tracked Venus's eight-year cycle of five appearances; the Dresden Codex
tables it. Johannes Kepler drew the "great conjunctions" of Jupiter and
Saturn as a slowly turning triangle in *De Stella Nova* (1606). The chord
drawings themselves became popular from John Martineau's *A Little Book of
Coincidence in the Solar System* (2001), and have been redrawn by many
artists and teachers since. Planet positions here come from E. M. Standish,
"Approximate Positions of the Planets" (JPL Solar System Dynamics), Table 1,
valid 1800–2050.

## This implementation

- **Spec knobs:** `pair` (auto, earth_venus, earth_mars, mercury_venus,
  mercury_earth, venus_mars, earth_jupiter, mars_jupiter, jupiter_saturn,
  venus_jupiter, earth_saturn), `years` (0 = the pair's natural span; 0.5–300),
  `step_days` (0 = about 720 chords and at least 48 a synodic period;
  0.5–3650, at most 4,000 chords), `start_year` (1800–2050), `style` (chords,
  midpoints, both), `frame` (heliocentric, rotating), `orbits`, `palette`
  (auto, night, dawn, ocean, ember, ink), `width`, `height`.
- **Generation:** both planets' heliocentric positions come from JPL's
  Keplerian elements and their century rates, Kepler's equation solved for
  each instant. The natural span is k synodic periods, k chosen per pair as
  the smallest count after which both planets return within a few degrees
  (Earth–Venus 5, Earth–Mars 7, Jupiter–Saturn 3, …). The view is from the
  ecliptic's north pole with the vernal equinox to the right. The rotating
  frame turns at the mean of the two planets' angular rates. Each chord is
  coloured by its synodic phase (the difference of the two longitudes), so
  each conjunction is one band of colour. The seed picks the pair and the
  palette when they are `auto`.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic; every chord end is the planet's position
  on that day (tested against the focal property of each orbit: distances to
  the two foci sum to 2a within 10⁻⁹ AU); Earth–Venus over eight years has
  its strongest Fourier mode at five; each pair's natural span closes the
  figure within a few degrees; a widened step or a clamped start year is
  reported (`requested_step_days`, `requested_start_year`); everything stays
  inside the page.

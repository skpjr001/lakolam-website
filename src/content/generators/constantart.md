---
title: "Constant Art"
blurb: "Constant art — π, e, φ and √2 as skylines, chord circles, digit walks and colour-by-digit grids, plus Ulam prime spirals; digits computed exactly and checksummed"
category: design
version: "1.0.0"
---
Maths art from the digits of pi, e, the golden ratio and root 2 — a
digit skyline, a chord circle, a digit walk, a colour-by-digit grid — and
the Ulam spiral of the primes.

## What it is

A page of art built from a famous number. The **skyline** turns each digit
into a building that many storeys tall on grid paper, the Pi Day classic.
The **chord circle** puts the digits 0 to 9 round a ring and joins each
digit to the next, so a thousand digits weave a coloured web. The **digit
walk** takes one step per digit, turned 36° times the digit, and wanders
like a coastline. The **digit grid** is a colour-by-digit page with a
colour key. The **Ulam spiral** writes 1, 2, 3 … spiralling out from the
centre and colours the primes by their last digit, showing the diagonal
streaks Stanisław Ulam noticed in 1963. Black-and-white versions are
outlines to colour in.

## How to use it

Colour the skyline buildings, the grid squares or the spiral's primes, or
use the coloured pages as posters. Read the digits along the bottom of
the skyline: the first building is 3 storeys tall for pi, 2 for e. On the
chord circle, the thickest bundles show which digits most often follow
each other. In the Ulam spiral, look for diagonal lines of primes and
check them with a calculator.

## Purpose

A Pi Day (14 March) and maths-week favourite for classrooms and
libraries: real mathematics that ends in a picture. Every digit printed
is checked, so the art is also an accurate table of the constant.

## History

Pi has been computed by hand for two thousand years, from Archimedes'
polygons to William Shanks's 707 digits (1873, wrong after 527). Spigot
algorithms, which produce digits one at a time with whole-number
arithmetic, were published by Sale for e (1968) and Rabinowitz and Wagon
for pi (1995). Martin Krzywinski's circular digit art (2013) popularised
the chord circle, and the Pi Day skyline grew out of school maths
projects. Ulam drew his spiral while doodling in a meeting in 1963.

## This implementation

- **Spec knobs:** `mode` (chord_circle, skyline, digit_walk, digit_grid,
  ulam), `constant` (auto, pi, e, phi, sqrt2; the spiral uses none),
  `count` (digits or whole numbers, 10–2000; per mode: skyline 10–60,
  chord circle and walk 50–2000, grid 25–2000, ulam 25–2025 rounded to an
  odd square; null takes the mode's default), `palette` (auto, rainbow,
  ocean, sunset, pastel, mono), `width`, `height` (page, 144–3000 pt).
  Clamps are reported as `requested_*`.
- **Generation:** the seed picks the constant and palette when they are
  auto, which colour goes with which digit (a turn of the colour wheel,
  or a shuffle for the grid and spiral), the turn of the chord ring and
  digit walk, and the skyline's windows and roofs. A black-and-white Ulam
  spiral is the same for every seed.
- **Solving:** nothing to solve; it is a design.
- **Guarantees:** deterministic per seed.
  `verification: digits_computed_exactly_and_checked_against_stored_checksum`.
  Pi comes from the Rabinowitz–Wagon spigot, e from Sale's spigot, and
  phi = (1 + root 5) / 2 and root 2 from the schoolbook digit-by-digit
  square root, all in whole numbers. The first 2000 digits of each are
  checked against a stored FNV-1a checksum of digits computed
  independently (Machin's formula, the factorial series and an exact
  integer square root); a mismatch refuses the page. Primes come from a
  sieve. Tests check digits far into each expansion against that
  reference, recheck every prime to 2025 by trial division, walk the Ulam
  spiral (every cell once, in unit steps, 2 to the right of 1) and read
  the drawn skyline heights back from the page.

---
title: "Factorization Diagrams"
blurb: "Yorgey's factorization diagrams: n dots nested on polygons by its prime factors — a 1–100 poster, one big number, or a sunflower spiral"
category: design
version: "1.0.0"
---
Every number drawn as that many dots, grouped by its prime factors: primes
are rings, and everything else is rings of rings.

## What it is

A factorization diagram shows a whole number `n` as exactly `n` dots,
arranged so that its prime factors can be seen. Start with one dot. For each
prime factor `p`, set `p` copies of the picture so far on the corners of a
regular `p`-sided polygon. Twelve is three groups of four, or four groups of
three; a prime such as 13 can only be one ring of 13. Pairs sit side by side
and two pairs make a square, so powers of two become neat grids. The page is
a numbered poster of consecutive numbers (1 to 100 by default), one large
number with its factorisation written out, or a sunflower spiral of numbers
growing from the centre.

## How to use it

Hang the poster where people can puzzle over it: which numbers are single
rings (the primes)? Which look alike, and why? Count the groups to find a
number's factors, then check against the label. On the single-number page,
read the caption and find each factor in the picture — the outer ring, the
groups inside it, the dots inside those. Children can colour the outlined
version, giving each group its own colour. The spiral is a picture to enjoy:
the primes show up as plain rings scattered among the patterned composites.

## Purpose

A design-lane page that is also honest arithmetic: every diagram is built
from the number's real prime factorisation, carries exactly that many dots,
and never lets two dots touch, so the picture can be counted and trusted.

## History

Brent Yorgey drew factorization diagrams in 2012 with his Haskell `diagrams`
library ("Factorization diagrams", *The Math Less Traveled*, October 2012);
Sean Seefried's animation and Stephen Von Worley's "Dance, Factor, Dance"
(Data Pointed, 2012) made them famous, and the 1–100 poster has been printed
for classrooms ever since. The special cases — twos side by side, two twos as
a square — are Yorgey's.

## This implementation

- **Spec knobs:** `layout` (poster / single / spiral), `start` and `count`
  (the window of numbers), `number` (the single page's number; 0 lets the
  seed pick a handsome one), `order` (which factors nest inside: auto,
  ascending, descending, seeded), `colouring` (auto, nesting, largest prime,
  prime set, factor count), `palette` (auto, jewel, sorbet, ocean, ember,
  nocturne, ink), `gap`, `labels`, `title`, `width`, `height`, `margin`.
- **Generation:** factors are found by trial division; adjacent pairs of 2
  merge into a 4. Level by level a polygon of circumradius
  `r(1 + gap) / sin(π/p)` holds `p` copies of the sub-diagram of bounding
  radius `r`. Twos alternate horizontal and vertical; odd primes point a
  corner up. The seed picks the palette, the colouring, the nesting order,
  whether copies turn to face outward, a quarter-turn of the whole page, and
  (single layout, `number` 0) the number. The poster picks the column count
  that gives the biggest cells; the spiral uses Vogel's sunflower and sizes
  every diagram to half its nearest neighbour distance.
- **Solving:** Nothing to solve.
- **Guarantees:** the diagram of `n` has exactly `n` dots and no two dots
  overlap (neighbouring copies are `2r(1 + gap)` apart, so their bounding
  discs at most touch) — both checked by tests for every `n` ≤ 360, every
  order, with and without radial turning; `verification` in meta names it.
  At most 120,000 dots and numbers up to 20,000: a longer window is shortened
  and reports `requested_count` (and `requested_start` / `requested_number`
  for clamped values). All ink stays inside the page; deterministic per
  seed. The `ink` palette draws outlined dots on white for colouring.

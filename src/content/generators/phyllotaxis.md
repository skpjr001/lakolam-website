---
title: "Phyllotaxis"
blurb: "Phyllotaxis — golden-angle floret spirals, sunflower heads and petal disks"
category: design
version: "1.0.0"
---
Florets placed by the golden angle: floret `n` sits at angle `n · 137.507…°`
and radius `c·√n`, and the sunflower's spiral arms appear without ever being
drawn.

## What it is

Vogel's 1979 model of seed-head growth. The golden angle — the circle divided
by the golden ratio — is the unique divergence that packs florets evenly at
every radius; the apparent left- and right-winding spiral families
(parastichies) count consecutive Fibonacci numbers. Two floret styles: dots
(seed head) and radially oriented petals (dahlia).

## How to use it

A colouring disk: every floret is a closed region. Set `angle` to 90 or 99.5
to see exactly why the golden angle is special — rational angles collapse
into spokes.

## History

Spiral phyllotaxis was measured by botanists from the 1830s (the
Bravais brothers); Helmut Vogel's compact `r = c√n` model dates to 1979, and
the golden-angle explanation was made rigorous by Douady and Couder's 1992
physics experiments.

## The implementation's guarantees

- **Florets never touch, measured**: Vogel's model promises ≈`c`
  nearest-neighbour spacing; the floret radius banks on it and a pairwise
  test verifies it rather than trusting the asymptotics.
- The colourability lever is floret count (fewer florets = larger florets at
  fixed page size); the surviving count is reported beside the requested one.
- Seeded orientation and chirality; the divergence angle is a spec knob with
  the golden angle as default.
- Rating basis: none — a design. Honesty fields: floret count, divergence,
  style, attempt.

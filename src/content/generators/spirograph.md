---
title: "Spirograph"
blurb: "Layered spirograph roulettes, closed exactly by their tooth ratios"
category: design
version: "1.0.0"
---
Layered roulette curves — hypotrochoids and epitrochoids — closed exactly by
their integer tooth ratios.

## What it is

The toy, in software: a pen fixed in a wheel that rolls inside (hypotrochoid)
or outside (epitrochoid) a toothed ring. Integer tooth counts mean every
curve closes *exactly* — the number of lobes is `ring/gcd(ring, wheel)` and
the wheel makes `wheel/gcd` turns before the figure repeats. Several curves
nest per page, scaled inward with daylight between them.

## How to use

Colouring pages with a distinctive petal structure: the overlapping lobes
create lens-shaped regions that alternate naturally. Kids mode uses fewer,
fatter curves. The `pen` position sweeps a family from near-circles (pen at
centre) to pointed stars (pen at rim).

## Purpose

Nostalgia with mathematics attached — the one design crate whose output
every adult recognises from childhood. Its development recorded two taste
lessons now cited across the lane: `dedup_by_key` only removes *adjacent*
duplicates (a page shipped wheels 5, 13, 22, 13), and ranking by a single
metric loses variety (a 3-lobe trefoil vanished under a 96-lobe rosette) —
hence banded selection with a lobe floor.

## History

Mathematicians studied roulettes from the 17th century (La Hire, Euler); the
19th century built lathes and harmonographs around them. **Denys Fisher**, a
Leeds engineer, turned the geared version into the Spirograph toy in 1965 —
Toy of the Year 1967, and the name became generic.

## This implementation

- **Spec knobs:** `size`, `ring` (tooth count), `curves` per page, `family`
  (hypo/epi/both), `pen`, `stroke`, `kids`.
- **Generation:** wheels are chosen by banded lobe-count selection with a
  taste floor of 6 lobes (plus the deliberate low-lobe band), degenerate
  combinations rejected (wheel ≥ ring, < 3 lobes, Tusi-couple straight
  lines); curves are sampled per-turn and closed exactly.
- **Guarantees:** every curve closes (integer arithmetic, not tolerance);
  colourability-gated with curve-count escalation.

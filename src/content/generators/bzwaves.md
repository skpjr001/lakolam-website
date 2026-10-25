---
title: "Belousov–Zhabotinsky Waves"
blurb: "Belousov-Zhabotinsky waves: target rings and spirals in a dish, annihilating where they meet"
category: design
version: "1.0.0"
---
Blue rings and spirals spreading through an orange dish: a chemical clock
caught mid-tick.

## What it is

The Belousov–Zhabotinsky reaction is a chemical mixture that oscillates.
Spread thin in a dish, it becomes an *excitable medium*: a disturbance sets
off a wave of colour change that travels outward at a steady speed, and the
liquid behind it needs time to recover before it can fire again. Tiny
pacemakers send out concentric *target* rings; a broken wave curls up into
a rotating *spiral*, usually one of a counter-turning pair. Because the
medium behind each wave is still recovering, two waves that meet cannot
pass through each other — both are destroyed, leaving sharp seams and
cusps where the patterns meet.

## How to use it

The colour pages are prints in the reaction's own colours (or sepia, teal
or grey): a dark front, a fading tail, and the resting liquid. The line-art
page outlines each front and its tail for colouring — colour the fronts
darkest, fade the tails toward the background, and watch for the seams
where two families of waves meet. Spiral centres are marked with small
circles: follow an arm out from one and see where it runs into its
neighbours.

## Purpose

A celebrated piece of chemistry and of the science of pattern formation
drawn by its own rules: waves travel at one speed, every point has a
refractory time, and colliding fronts annihilate.

## History

Boris Belousov found the oscillating reaction in 1951 (his paper was
rejected and appeared only in a 1959 conference abstract); Anatol
Zhabotinsky took it up from 1961, and with Albert Zaikin photographed the
first target waves and spirals in thin layers (*Nature* 225, 1970). Arthur
Winfree studied the spirals' geometry (*Science* 175, 1972; *The Geometry
of Biological Time*, 1980). The integrated model is Dwight Barkley's
excitable-medium equations ("A model for fast computer simulation of waves
in excitable media", *Physica D* 49, 1991). Belousov, Zhabotinsky, Zaikin,
Krinsky and Ivanitsky shared the Lenin Prize in 1980.

## This implementation

- **Spec knobs:** `width`, `height` (points); `model` (`analytic`,
  `barkley`); `vessel` (`dish`, `page`); `palette` (`auto`, `ferroin`,
  `sepia`, `teal`, `ink`); `style` (`colour`, `lines`); `sources` (1–12);
  `wavelength` (points on a 600 pt page, 12–120; at least a sixtieth of the
  page diagonal); `spirals` (share of sources that are spirals, 0–1);
  `stroke`.
- **Generation:** *Analytic:* seeded sources — targets with period
  1–1.5 P and a birth time (so their rings have an outer edge), spirals in
  counter-rotating pairs with period 0.85–0.97 P. Each source fixes when its
  waves reach every grid point: `t = |x−c|/v + φ + nP`, minus `sPθ/2π` for a
  spiral of chirality `s`. Every point merges all sources' arrivals in time
  order (a bucketed event queue, buckets shorter than a cell's travel
  time) and accepts an arrival only if it has recovered (refractory time
  0.425 P) and the same wave was accepted one cell upstream along its
  direction of travel — so a wave that died in a collision stays dead.
  The picture is the medium at time 0: the time since each point last
  fired, or the time until it next fires just ahead of a front, cut into
  bands (front, three tail shades, rest); spiral cores get small circles.
  *Barkley:* the reaction–diffusion equations integrated from broken-wave
  seeds at the spiral sources on a grid of at most 170 cells, `u` drawn as
  the front and `v` as the tail.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic per seed; a lone target fires on every wave
  at exactly `t = d/v + φ + nP`, so its rings are a wavelength `vP` apart
  (tested); twin identical pacemakers split the dish along its bisector
  (tested); every accepted firing away from its source was fed by the same
  wave just upstream — fronts annihilate, never cross (tested over a whole
  run with two unequal pacemakers). `verification:
  fronts_annihilate_never_cross`. Line art reports its colourability check.
  Clamped knobs are reported as `requested_<field>`.

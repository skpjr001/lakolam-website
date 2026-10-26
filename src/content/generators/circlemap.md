---
title: "Arnold Tongues"
blurb: "Arnold tongues: where the sine circle map locks to a rational rhythm, with threads of quasi-periodic motion and the devil's staircase"
category: design
version: "1.0.0"
---
Rhythm and its failure, mapped: bright wedges where a driven oscillator
locks into step, fine threads where it never quite repeats, and the devil's
staircase climbing beneath.

## What it is

A map of the **sine circle map**, the simplest model of something that
spins and is nudged — a pendulum clock kicked by a motor, a heart paced by
a stimulus, two coupled fireflies. Each point of the picture is one
setting: across is the drive frequency Ω, up is the strength K of the
nudge. Inside a coloured wedge — an **Arnold tongue** — the motion locks
into a whole-number rhythm, *p* turns every *q* beats, and the wedge is
labelled *p/q*. Between the wedges the motion never repeats; the thin
threads there are lines of equal average speed, squeezed between the
tongues as the nudge grows. The panel below is the **devil's staircase**:
the average speed against Ω at the strongest nudge, flat on every tongue.

## How to use it

A poster about synchronisation, or a page to colour: each wedge is one
rhythm, and its fraction says how many turns per how many beats. The
widest tongues are the simplest rhythms (0/1, 1/2, 1/1); between any two,
the next widest is the one whose fraction adds their tops and bottoms
(between 1/3 and 1/2 lies 2/5). The **zoom** view shows that the same
pattern repeats inside any gap. The **ink** palette gives the outlines
alone.

## Purpose

A design-lane page that draws a central picture of nonlinear dynamics
exactly: each tongue is a smooth, closed shape solved for row by row, not
a blur of pixels, so it prints sharp at any size and can be coloured.

## History

Vladimir Arnold studied the circle map and its mode-locked regions in 1961
("Small denominators. I. Mappings of the circumference onto itself",
*Izvestiya Akad. Nauk SSSR*, Ser. Mat. 25), and the tongues bear his name.
The devil's staircase of its rotation number, and its universality at the
critical coupling K = 1, were explored by Per Bak, Tomas Bohr and Mogens
Høgh Jensen in the 1980s (e.g. *Physica Scripta* T9, 1985). Huygens's
observation of two pendulum clocks falling into step (1665) is the
phenomenon's first record.

## This implementation

- **Spec knobs:** `view` (auto, full, half, zoom), `max_denominator`
  (2–14 for the full view; the half view adds two and the zoom five),
  `threads` (0–120), `staircase`, `labels`, `palette` (auto, sunset, tide,
  meadow, night, ink), `frame`, `caption`, `width`, `height`, `margin`.
  Clamped values are reported as `requested_<field>`.
- **Generation:** the lifted map f(θ) = θ + Ω − (K/2π) sin 2πθ. For each
  reduced fraction p/q in the view and each of 72 rows of K from 0 to 1,
  the tongue's edges are the roots in Ω of max and min over θ of
  f^q(θ) − θ − p (both increase with Ω), bracketed within K/2π of p/q and
  found by bisection to 10⁻¹⁰; the extremes over θ come from 8q + 8 samples
  refined by golden section. Rows are solved from the top down; once a
  tongue is narrower than 10⁻⁷ the rest is drawn as a line to its tip at
  p/q. Threads are the curves where the rotation estimate fⁿ(0)/n
  (n = 240) equals a seeded, evenly spread target, found by bisection on
  every row, and the bands between them are tinted by rotation number. The
  staircase plots fⁿ(0)/n (n = 1,500) at K = 1 on 501 samples, each
  tongue's top edge drawn as a coloured step. The seed picks the view, the
  Farey interval of a zoom, the palette and the threads' nudges.
- **Solving:** Nothing to solve.
- **Guarantees:** samples inside every tongue with q ≤ 6 have rotation
  number p/q to within the estimate's 1/n (n = 4,000); points just outside
  the wide tongues are not locked; the 0/1 tongue is |Ω| ≤ K/2π to 10⁻⁸
  and the 1/2 tongue symmetric about ½; tongues widen with K and never
  overlap; the staircase is monotone (the estimate is non-decreasing in Ω
  exactly) and flat on the 1/2 step; all ink stays on the page;
  deterministic per seed.

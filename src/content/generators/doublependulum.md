---
title: "Double Pendulum"
blurb: "Double pendulum chaos: tip traces of the chaotic pendulum, fans of nearby starts, and the flip-time fractal"
category: design
version: "1.0.0"
---
The classic chaotic pendulum: the wild path of its lower bob, a fan of
almost identical releases tearing apart, and the fractal map of how long
it takes to flip over.

## What it is

A double pendulum is one pendulum hanging from the end of another. Swing
it gently and it rocks in a calm, predictable way. Lift it high and let go,
and it thrashes: the lower arm whips round, flips over the top, stalls,
reverses — a motion that never repeats and that no one can forecast far
ahead, though nothing about it is random. It is the simplest machine most
people can build that shows chaos.

The page shows it three ways:

- **Traces** — the path of the lower bob from one release, drawn as one
  long smooth line whose colour changes with time, with the pendulum drawn
  at the position it was let go from. All the loops stay inside the circle
  the two arms can reach.
- **Fan** — several releases a hundredth of a degree apart, each in its own
  colour. For a while they move as one thick strand; then, suddenly, they
  peel apart and go their own ways.
- **Flip map** — a square of every possible starting position, upper arm
  angle across, lower arm angle up, coloured by how long the pendulum takes,
  let go from rest there, before either arm flips over the top. The dark
  lens in the middle holds the starts too low to ever flip; around it the
  bands fold into swirls and filaments, a fractal.

## How to use it

Follow the colour of a trace from its start at the drawn bob: the early
part of the path and the late part look nothing alike. In the fan, look for
the place where the strands split — before it, the tiny difference in the
starts was invisible; after it, it is everything. In the flip map, the
bright corners are starts that flip almost at once (both arms near the
top); the darkest band beside the lens holds starts that took longer than
the whole time waited, or never flip at all. The map looks the same turned
upside down: a start and its mirror image (both angles reversed) behave
exactly alike. The dark pages make striking posters; the ink palette prints
on white.

## Purpose

A picture of deterministic chaos you can hold: a simple, exactly known law
of motion, followed exactly, that still produces paths no one could have
guessed and a boundary of infinite intricacy.

## History

Daniel Bernoulli worked out the small oscillations of linked pendulums and
hanging chains in the 1730s, the beginning of the theory of normal modes;
for small swings a double pendulum is just two such modes added together.
The large swings are another matter: the double pendulum became a standard
example of chaos in a mechanical system, studied in detail by Troy
Shinbrot, Celso Grebogi, Jack Wisdom and James A. Yorke in "Chaos in a
double pendulum", *American Journal of Physics* 60, 491 (1992). The
flip-time picture was popularised by the astrophysicist Jeremy S. Heyl's
"double pendulum fractal" images (2008), which coloured each starting
position by how long the pendulum takes to flip.

## This implementation

- **Spec knobs:** `width`, `height` (points); `mode` (`traces`, `fan`,
  `flip_map`); `mass_ratio` (lower bob over upper, 0.1-10, default 1);
  `length_ratio` (lower arm over upper, 0.1-10, default 1); `duration`
  (5-400 natural time units √(l/g), default 100; the fan runs for a third
  of it); `starts` (fan releases, 2-12, default 6); `spread` (degrees
  between fan releases, 0.0001-5, default 0.01); `resolution` (flip map
  samples per side, 40-300, default 240); `horizon` (longest flip time
  waited for, 10-300, default 100); `bands` (flip-time colour bands,
  4-24, default 12); `palette` (`auto` — one of the colour palettes,
  picked by the seed — `aurora`, `ember`, `ocean`, `ink`); `arms` (draw
  the pendulum at its release); `stroke`.
- **Generation:** units with the upper arm, upper mass and gravity equal
  to 1. The full equations of motion of two point masses on rigid
  massless arms are integrated with fixed-step classical RK4, every
  trigonometric call through the cross-platform deterministic maths. The
  seed picks a release from rest with both angles large enough that the
  pendulum can flip (energy above the flip barrier). Traces use step
  0.002 (shorter, by the square root of the speed-up, when the lower arm
  is short or the lower bob heavy) and are drawn as cubic Hermite pieces between samples every 0.02
  (exact position and velocity at both ends), cut into 64 time-coloured
  chunks. The fan steps the upper angle by `spread` per release. The flip
  map releases from rest at the centre of every cell of an n × n grid
  over (−180°, 180°)², step 0.04, and records the first time either arm
  passes straight up (interpolated within the step); starts whose
  potential energy lies below the lowest flip barrier are marked "never"
  without integrating, and starts still unflipped at the horizon "later".
  `ln(flip time)` is cut into bands at quantiles of the flip times (so
  each band covers a similar area), traced as filled regions by marching
  squares, with the "later" and "never" regions as the two darkest bands.
- **Guarantees:** deterministic per seed. Energy is conserved: the traces
  track the total energy and its worst drift, over the energy scale
  `(m₁+m₂)gl₁ + m₂gl₂`, is reported as `energy_drift` and tested under
  `1e-6` for mass and length ratios across their whole ranges (in practice about `1e-9`);
  the integrator is also checked against the small-swing normal mode.
  The flip map is symmetric under (θ₁, θ₂) → (−θ₁, −θ₂): the equations
  and every floating-point step are odd, the sample grid is built so
  mirrored cells are exact negations, and the tests integrate every cell
  of a map independently and find the mirrored starts flip at exactly
  the same time (the generator then computes half the map and mirrors
  it). The "never" region is exact: for equal pendulums it is precisely
  `2 cos θ₁ + cos θ₂ > 1` (tested). All ink lies inside the page (tested
  for every mode and palette at extreme sizes). `verification:
  energy_conserved_within_tolerance` (traces, fan) or
  `flip_map_point_symmetric_and_barrier_exact` (flip map). Clamped knobs
  are reported as `requested_<field>`.

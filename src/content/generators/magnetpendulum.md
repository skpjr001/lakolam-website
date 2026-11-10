---
title: "The Magnetic Pendulum"
blurb: "The magnetic pendulum: fractal basins of the magnet a swinging bob comes to rest over, shaded by settling time"
category: design
version: "1.0.0"
---
A swinging bob over a ring of magnets: colour every starting place by the
magnet the bob finally rests over, and the map is a fractal.

## What it is

The magnetic pendulum is a desk toy: a pendulum with a small magnet for a
bob, swinging over three (or more) magnets set in a ring on the table.
Let it go and it darts from magnet to magnet, overshoots, is caught, breaks
free, and at last, slowed by the air, comes to rest over one of them. Which
one? Start right above a magnet and the answer is easy. But start a little
way out and the bob's path loops between all the magnets before it
decides, and moving the start by a hair can change the answer.

This page answers the question for every starting place at once. Each
point of the square is a place to let the bob go from, at rest; it is
coloured by the magnet the bob ends up over. Near the magnets the colours
form calm, solid petals. Further out they break into interleaved
filaments, every boundary between two colours crowded with thin slivers of
the third — the signature of a fractal basin boundary. Darker shades mark
starting places from which the bob takes longer to settle. The white dots
are the magnets; the white line is one bob's journey from its start (the
small circle) to its resting place.

## How to use it

Pick any point and its colour tells you where a bob let go there will come
to rest. Trace the white path: it may wander through several colours
before it settles, because the colour belongs to the starting place, not
to where the bob happens to be. Look along any boundary between two
colours and you will find the third squeezed between them, again and
again at finer scales. Turn the picture by one magnet's step and the
pattern lands on itself with the colours shifted round: the table is
symmetric, so the map is too. Less friction makes the bob swing longer and
the pattern finer; more magnets make a richer flower.

## Purpose

A clear, printable picture of sensitive dependence on initial conditions in
an everyday machine with friction: every bob settles, and the rule is
simple and exactly known, yet the answer to "where will it stop?" is a
fractal.

## History

Pendulum toys swinging over magnets have been sold for decades. Their
fractal basins became a standard illustration of chaos in dissipative
systems through Heinz-Otto Peitgen, Hartmut Jürgens and Dietmar Saupe's
*Chaos and Fractals: New Frontiers of Science* (Springer, 1992). Adilson
E. Motter, Márton Gruiz, György Károlyi and Tamás Tél used the magnetic
pendulum as a central example in "Doubly transient chaos: generic form of
chaos in autonomous dissipative systems", *Physical Review Letters* 111,
194101 (2013), explaining why the chaotic motion is transient (the bob
always settles) yet the boundaries between outcomes are fractal.

## This implementation

- **Spec knobs:** `width`, `height` (points); `magnets` (3-6, on a regular
  polygon, one at the top); `friction` (0.05-1, default 0.2);
  `strength` (0.3-3, default 1); `height_above` (the bob's clearance above
  the magnets, 0.1-0.6, default 0.25); `spring` (the pendulum's pull to the
  centre, 0.1-1, default 0.5); `extent` (half-width of the square of
  starts, 1-4 magnet-circle radii, default 2); `resolution` (starts per
  side, 60-300, default 220); `shades` (settling-time shades per basin,
  1-5, default 3); `trajectory` (draw one bob's path from a start the seed
  picks); `palette` (`auto` — jewel tones round a hue the seed draws —
  `jewel`, `pastel`, `earth`, `ink`); `stroke`.
- **Generation:** in the small-swing approximation the bob moves in the
  plane under `x'' = −k x − b x' + Σ s (mᵢ − x) / (|mᵢ − x|² + h²)^{3/2}`,
  magnets `mᵢ` on the unit circle. Each start is released from rest and
  integrated with step 0.02 by Strang splitting: exact friction for half a
  step, velocity Verlet for the spring and magnets, friction for half a
  step (second order, one force evaluation per step, plain floating-point
  arithmetic). Each magnet's resting point (the potential minimum near it,
  found by following the force downhill from the magnet) gets a capture
  disc of radius 0.4 (less if resting points are close); the bob is
  captured over magnet i once it is inside that disc with energy below
  the lowest potential on the disc's rim. A magnet whose disc does not
  pass this test has no proven trap; a bob not captured within 200 time
  units, or at rest away from every magnet, is unsettled and drawn in its
  own dark colour (a weak, high or stiff-spring table can have many). Settling times are split into shades at their quantiles. The
  picture is drawn twice over: an exact base layer of the sample cells,
  one path per magnet and shade (it covers the square with no gaps), and
  on top smooth regions — each magnet's and shade's indicator blurred by
  a small [1 2 1]² kernel and traced at one half by marching squares, so
  two neighbouring basins share one smooth boundary. Magnets and the
  seeded path are drawn on top.
- **Guarantees:** deterministic per seed (the seed picks the drawn path
  and the `auto` hue). Every capture is proved by energy: friction only
  lowers the energy, so a bob inside a capture disc with energy below the
  rim's lowest potential can never leave it (tested by re-running
  captured bobs for 100 time units with a different integrator: none
  leaves its disc, all come to rest over their magnet). Starts that are
  not captured are counted in `unsettled`, never given a magnet (tested
  that `settled` plus `unsettled` covers every start; the default table
  has none). The basins respect the table's symmetry: turning a start by
  one magnet step lands in the next magnet's basin for over 90 % of random
  starts for 3-6 magnets (the rest lie on fractal boundaries, where
  rounding decides), and each magnet's basin covers the same share of
  the default square within 6 % (tested). All ink lies inside the page
  (tested for every palette and magnet count at extreme sizes).
  `verification: captures_proved_by_energy_and_basins_rotate_with_magnets`.
  Clamped knobs are reported as `requested_<field>`.

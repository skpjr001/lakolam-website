---
title: "Ising Domains"
blurb: "Ising and Potts model domains: a quenched spin lattice coarsening into labyrinths and islands, traced from the final spins"
category: design
version: "1.0.0"
---
Magnetised regions of a cooling magnet, coarsening into labyrinths and
islands.

## What it is

A magnet is made of tiny atomic compasses, spins, that each point up or
down. Neighbours prefer to agree; heat makes them jostle at random. Above a
critical temperature the jostling wins and the spins stay mixed. Cool the
material suddenly below it and neighbours start to agree locally: patches
of up and patches of down appear and grow, the small ones swallowed by the
large, so the pattern coarsens into winding domains separated by walls.

This page runs that experiment on a lattice of tens of thousands of spins
and draws the domains at the moment it stops: a two-colour labyrinth when
the material has just been cooled, islands in a sea when an outside field
favours one side or the temperature sits right at the critical point, and
patchworks of three to five colours for the Potts model, where each spin
has more than two choices. A conserved mode, where spins can only swap
places, separates the two kinds like oil and vinegar into the even, finely
branched labyrinth of spinodal decomposition.

## How to use it

The colour pages are prints and textile-like repeats: a camouflage, a
marbled paper, a leopard coat drawn by physics. Lower the temperature for
clean, smooth walls, raise it towards the critical point for ragged
islands within islands, add a small field for a sea with islands, add
sweeps for bigger domains. The line-art page is a colouring sheet: every
domain is a shape to colour, and since two colours are enough to tell the
domains of a two-state page apart, it can be coloured like a chessboard —
or in as many colours as you like.

## Purpose

The Ising model is the physicist's simplest picture of how order appears
from many small parts, and it describes far more than magnets: alloys
un-mixing, liquids and gases, opinions in a crowd. These pages show its
true dynamics — the domains really are the spins after a real Monte Carlo
quench — so the textures carry its laws: domain size growing as the square
root of time after a quench, or more slowly when the material is conserved.

## History

Wilhelm Lenz proposed the model in 1920 and his student Ernst Ising solved
the one-dimensional case in his 1924 thesis, finding no transition. Rudolf
Peierls argued in 1936 that in two dimensions it does order, and Hendrik
Kramers and Gregory Wannier located the critical temperature
Tc = 2/ln(1+√2) in 1941; Lars Onsager solved the two-dimensional model
exactly in 1944. Renfrey Potts generalised it to q states in 1952. The
Metropolis algorithm is from Metropolis, the Rosenbluths and the Tellers
(1953); Kyozi Kawasaki introduced spin-exchange dynamics in 1966; Robert
Swendsen and Jian-Sheng Wang (1987) and Ulli Wolff (1989) introduced the
cluster algorithms that beat critical slowing down. Domain coarsening laws
are due to I. M. Lifshitz (1962), Lifshitz and Slyozov (1961), and Allen
and Cahn (1979).

## This implementation

- **Spec knobs:** `width`, `height` (points); `lattice` (`square`,
  `triangular`); `states` (2–5; 2 is Ising, 3–5 Potts); `dynamics`
  (`metropolis`, `wolff`, `swendsen_wang`, `kawasaki`); `temperature`
  (0.05–3 × Tc, default 0.8); `field` (−1 to 1, default 0; under
  Kawasaki it sets the starting share of the favoured state instead);
  `sweeps` (0–2000, default 15); `cells` (16–320 spins across, default
  240; very tall pages use fewer to stay within 150,000 spins); `smooth`
  (0–3 lattice spacings, default 1.4); `palette` (`auto`, `indigo`,
  `magnet`, `ember`, `lagoon`, `ink`); `style` (`colour`, `lines`);
  `stroke`.
- **Generation:** the energy is written in Potts form,
  E = −J Σ δ(sᵢ,sⱼ) − J h Σ δ(sᵢ,1), with J = 2 for two states (exactly
  the Ising energy up to a constant, so temperatures are in Ising units)
  and J = 1 for Potts. Critical temperatures are exact: Kc = ln(1+√q) on
  the square lattice and the root of v³ + 3v² = q, v = e^Kc − 1, on the
  triangular lattice. The lattice is periodic and starts in a random
  state (a quench from infinite temperature), then runs a fixed number of
  sweeps: Metropolis single-spin moves; Wolff clusters grown with
  p = 1 − e^(−J/T), the field applied as an acceptance test on the whole
  cluster; Swendsen–Wang, every cluster re-drawn by heat bath in the
  field; or Kawasaki exchanges of unlike neighbours. Each state's
  indicator is smoothed by a Gaussian over the sites (or taken from the
  nearest site at smooth 0) on a grid of half the lattice spacing; a
  state owns the points where it beats every other, and those regions are
  traced by marching squares into closed loops, oriented so holes wind
  against their outer loop. State 0 is the ground the others are painted
  on; regions under about a third of a cell are dropped.
- **Guarantees:** deterministic per seed for a fixed sweep count. Tests
  check the critical temperatures against the exact values, that the
  neighbour tables are symmetric with every bond counted once, that a
  quench lowers the energy for every dynamics on both lattices (the
  reported energy also matches an independent recount), that Kawasaki
  conserves every state exactly, and that the domains are traced from the
  final spins: each state's traced area matches its share of the sites on
  the page to within 3% of the page, and every site whose neighbours all
  agree with it lies inside its own state's region and no other.
  Magnetisation (m = n↑ − n↓ for Ising, (q·max share − 1)/(q − 1) for
  Potts), state shares and the energy trace are in meta.
  `verification: domains_traced_from_final_spins_area_recount`. The
  line-art page reports the adult colourability check. Clamped knobs are
  reported as `requested_<field>`.

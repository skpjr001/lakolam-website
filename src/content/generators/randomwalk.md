---
title: "Random Walks"
blurb: "Random walks: lattice walks coloured by time, self-avoiding chains, Lévy flights and spanning-tree rivers"
category: design
version: "1.0.0"
---
The art of chance steps: tangles of lattice walks fading through time, a
long chain that never crosses itself, Lévy flights that hop between
clusters, and river networks grown from loop-erased walks.

## What it is

A random walk takes one step after another in a direction picked by chance.
Let a dozen walkers loose from the middle of a grid, colour each step by
when it was taken, and you get a glowing tangle that spreads like a stain:
the early steps are buried in the middle, the late ones reach out. Forbid a
walker from ever stepping on a place it has been and it becomes a
*self-avoiding walk*, a model of a long polymer molecule: one coiled chain
that wanders far further than a free walk would. Let the step lengths
follow a power law, so that most steps are tiny and a few are enormous,
and you get a *Lévy flight*: tight clusters of dots joined by long jumps,
the way some animals forage. And let walks wander until they hit a growing
tree, erasing any loop they made on the way, and the tree that results is
a *uniform spanning tree*: a network that reaches every site of the grid
exactly once, and looks uncannily like a river system when each stream is
drawn as wide as the area it drains.

## How to use it

The colour pages are prints. On the walks and the chain, the colour ramp
is time: follow it from the dark start to the bright end. The Lévy page
shows each landing point as a dot, with the long jumps as faint lines. The river page is a
map with no geography: every site drains along exactly one path to the
mouth, and the widest channels carry the most water. The line-art style
draws everything in black for printing or for colouring the rivers in by
size.

## Purpose

To show what chance looks like when it is left to run: the shapes here are
not designed but are honest samples of famous random processes, each one
checked against its definition.

## History

Karl Pearson named the "random walk" in a letter to *Nature* in 1905, and
Lord Rayleigh answered it the same summer; Louis Bachelier had used the
idea for prices in his 1900 thesis, and Albert Einstein (1905) and Marian
Smoluchowski (1906) for Brownian motion. George Pólya proved in 1921 that a
walk on the square grid returns home with certainty but one in three
dimensions may not. Self-avoiding walks were introduced by the chemist
Paul Flory (1949) and W. J. C. Orr (1947) as models of polymers; Flory's
estimate of their size, R ∼ N^{3/4} in the plane, was derived exactly
(though not yet rigorously proved) by Bernard Nienhuis in 1982. The pivot algorithm is due to
Moti Lal (1969) and was analysed by Neal Madras and Alan Sokal (1988).
Paul Lévy studied the stable laws behind power-law steps in the 1920s and
30s; Benoît Mandelbrot named the dust of their landing points in *The
Fractal Geometry of Nature* (1982). Gregory Lawler introduced loop-erased
random walks in 1980, and David Bruce Wilson showed in 1996 that they grow
a uniform spanning tree; that such trees look like rivers is a theme of
Rodríguez-Iturbe and Rinaldo's *Fractal River Basins* (1997). The width
of a river growing as the square root of its discharge is the hydraulic
geometry of Leopold and Maddock (1953).

## This implementation

- **Spec knobs:** `width`, `height` (points, 200–3000); `mode` (`walks`,
  `saw`, `levy`, `rivers` (default)); `lattice` (`square`, `hex`
  (default) — the six-direction triangular point lattice; not used by
  `levy`); `steps` (100–20000, default 3000: steps per walk, chain length,
  or number of flights; walks keep walkers × steps within 200000);
  `walkers` (1–40, default 12, walks); `alpha` (0.5–2.5, default 1.5,
  levy); `cells` (8–120, default 46: sites across the short side, rivers);
  `outlet` (`mouth` (default) at the middle of the bottom edge, `coast` —
  the whole bottom row — or `centre`, rivers); `style` (`night` (default),
  `colour`, `lines`); `palette` (`auto`, `ember`, `ocean`, `aurora`,
  `moss`; auto picks per seed; not used by `lines`); `stroke` (0.2–4,
  default 1).
- **Generation:** *walks*: simple random walks from the origin, steps drawn
  uniformly from the lattice's four or six directions, fitted to the page
  as one picture and drawn in 36 time slices through the ramp, later on
  top. *saw*: the pivot algorithm from a straight rod — 6N + 2000 attempts,
  each a random interior site and one of the 7 (square) or 11 (hex)
  non-identity lattice symmetries applied to the shorter side about that
  site, accepted only if no moved site lands on the fixed side (checked
  nearest the pivot first, with a site map); the chain is turned by a
  seeded angle, fitted and drawn in 72 colour slices with its two ends
  marked. *levy*: N flights from the origin with uniform directions and
  lengths from the truncated Pareto law P(L > l) ∝ l^−α on [l0, 400·l0] by
  the exact inverse CDF; the whole flight is then scaled to fit the page
  (lengths scale with it, so the law is unchanged). Jumps longer than 8·l0
  are faint lines; short steps and landing dots are coloured by time. *rivers*: sites in rows
  (`cells` across the short side; hex rows offset by half), a uniform
  spanning tree rooted at the outlet by Wilson's algorithm (loop-erased
  random walks from every site, in seeded order, until they hit the tree);
  each site's drainage is the number of sites upstream, edges are drawn as
  curves through slightly jittered sites (at most 0.24 spacing) joining at
  midpoints along the main stem, grouped into 20 levels by log drainage
  (colour), each drawn (0.07 + 0.62·√(drainage / max)) × spacing wide.
- **Solving:** Nothing to solve.
- **Guarantees:** every lattice walk takes unit lattice steps
  (`lattice_unit_steps`); the self-avoiding walk never revisits a site and
  every step is a lattice step, checked by an independent sorted-set test
  (`self_avoiding`); every Lévy step length lies in [l0, lmax] and is drawn
  at exactly that length inside the frame, and
  the tests check the tail P(L > 2·l0) against the stated law
  (`levy_step_bounds`); the rivers are a spanning tree — with one outlet,
  exactly n − 1 edges, all lattice edges, connected and acyclic (union–find,
  and an independent walk to the root from every site), with a coast
  outlet a forest whose roots are the coast sites (`spanning_tree`). The
  meta field `verified` records the check on every page; all ink stays
  inside the page. Clamped knobs are reported as `requested_<field>`.

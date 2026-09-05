---
title: "L-System"
blurb: "Ferns, vines and fractals from stochastic L-systems, with fillable leaves"
category: design
version: "1.0.0"
---
Ferns, vines and fractals grown from rewriting rules, drawn by a turtle with
fillable leaves.

## What it is

A Lindenmayer system: an axiom string and rewriting rules, expanded a fixed
number of generations, then interpreted by a turtle — draw forward, turn,
push and pop position. Presets cover ferns, trees, vines and classical
fractals; stochastic rules add natural variation, and closed leaf shapes are
attached at branch tips so the pages are colourable rather than mere line
skeletons.

## How to use

Botanical pages colour like botanical illustration — stems dark, leaves in
gradient families. The fractal presets (dragon curve, Sierpinski arrowhead)
are tracing exercises as much as colouring. `depth` controls complexity;
`jitter` and stochastic rules keep two pages from the same preset visibly
different.

## Purpose

The organic counterweight to the geometric design crates — everything else
in the lane is compass-and-straightedge, this one grows. Its corner
flourishes also feed the mandala crate's border bands conceptually: closed,
fillable curve-work at arbitrary scale.

## History

**Aristid Lindenmayer**, a Hungarian botanist, introduced the formalism in
1968 to model algae growth. Przemysław Prusinkiewicz's *The Algorithmic
Beauty of Plants* (1990) made it the canonical computer-graphics plant model;
the turtle interpretation borrows from Logo (Papert, 1967).

## This implementation

- **Spec knobs:** `preset`, `depth`, `angle` override, `leaf_scale`,
  `jitter`, `taper`, plus a free-form `axiom`/`rules` escape hatch for custom
  grammars.
- **Generation:** bounded-depth expansion (growth is exponential — the cap is
  a promise, not a suggestion), turtle interpretation to beziers, leaves as
  closed paths so the colourability gate has regions to check.
- **Guarantees:** deterministic per seed — stochastic rule choices draw from
  the seeded stream; degenerate grammars (unbounded or empty output) are
  rejected with an explanation rather than drawn.

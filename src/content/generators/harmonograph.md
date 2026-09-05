---
title: "Harmonograph"
blurb: "Damped pendulum figures, with frequencies nudged off exact ratios so they precess"
category: design
version: "1.0.0"
---
The figures a swinging table draws: damped pendulums, slightly detuned so
the curve precesses instead of retracing itself.

## What it is

A simulation of the Victorian drawing machine: two damped pendulums per axis,
each contributing a decaying sine to the pen's position. The frequencies are
near-integer ratios — *near*, not exact, because an exact ratio closes and
retraces one path forever, while a few thousandths of detune makes the figure
precess, drawing the same shape at slowly turning angles. Damping spirals the
line inward, giving the pages their dense rims and open centres.

## How to use

Colouring and contemplation pages — the fine interference bands between line
passes take pencil shading beautifully. `damping` sweeps from constant-width
bands (0) toward centre-spiralling figures; `detune` controls how fast the
figure turns as it draws; several figures nest per page.

## Purpose

The physical-simulation entry in the design lane, and the crate that
documents a measurement lesson: "does the pen travel far enough" *cannot*
detect a retraced circle (it travels far), so degeneracy is caught by a
revisit factor — travel divided by ground covered — where the retraced
circle scores 7.8 and a healthy rosette 2.1.

## History

Invented around the 1840s, usually credited to Scottish mathematician **Hugh
Blackburn**; by the 1870s harmonographs were parlour fixtures, drawing
Lissajous-adjacent figures for entertainment. The machine is a physical
demonstration of the same mathematics as Lissajous curves (1855), with decay
added by honest friction.

## This implementation

- **Spec knobs:** `size`, `figures`, `detune`, `damping`, `steps`, `stroke`,
  `kids`.
- **Generation:** four pendulums (two per axis) with small-integer base
  frequencies, signed detune, per-pendulum damping variation; sampled evenly
  in *time* (which is what the pen does — fast mid-swing, slow at the ends);
  figures screened by taste checks (sliver, revisit factor, damped-to-a-dot)
  and near-duplicate rejection against *every* earlier figure on the page.
- **Guarantees:** deterministic per seed; every figure fits the page (scaled
  by its own extent); colourability-gated with figure-count escalation.

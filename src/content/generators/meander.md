---
title: "River Meanders"
blurb: "River meander history maps after Fisk: migrating bends, cutoffs, oxbow lakes and past courses"
category: design
version: "1.0.0"
---
A river's whole wandering history on one map: today's channel, the courses
it abandoned, its oxbow lakes, in the manner of Harold Fisk's famous 1944
maps of the Mississippi.

## What it is

A river on a wide, flat valley floor never keeps still. Water swings to the
outside of every bend, eating the outer bank while sand builds up on the
inside, so bends grow, sharpen and creep downstream. When a bend loops so
far round that its neck is pinched through, the river takes the shortcut
and the abandoned loop becomes a crescent-shaped *oxbow lake*. Over
centuries the channel sweeps back and forth across its *meander belt*. This
page draws that history: each past course in its own colour, oldest
palest, the present channel in blue on top, recent oxbow lakes, the faint
*scroll bars* left on the insides of migrating bends, and the bluffs that
wall the valley.

## How to use it

The colour pages are prints. The line-art page draws the banks of six past
courses, the lakes and the present channel to colour: give every course its
own colour as Fisk did (a rainbow of pastels works beautifully), or shade
them from pale for the oldest to strong for the most recent, and leave the
present river and its lakes blue.

## Purpose

A real piece of earth science made into art: the river is moved by the
same rule geologists use to model meander migration, and the shapes —
skewed bends, cutoffs, oxbows — come out of it rather than being drawn in.

## History

Harold N. Fisk's *Geological Investigation of the Alluvial Valley of the
Lower Mississippi River* (US Army Corps of Engineers, Mississippi River
Commission, 1944; public domain) mapped the river's former courses in
colour, and its plates have become a classic of scientific cartography.
The migration rule is A. D. Howard and T. R. Knutson, "Sufficient
conditions for river meandering: a simulation approach", *Water Resources
Research* 20 (1984), building on S. Ikeda, G. Parker and K. Sawai, "Bend
theory of river meanders", *Journal of Fluid Mechanics* 112 (1981); see
also A. Sun et al. and Camporeale et al. (2007) for later developments.

## This implementation

- **Spec knobs:** `width`, `height` (points); `channel` (channel width in
  points on a 600 pt page, 2–16; at least 1/320 of the page's long side);
  `steps` (migration steps, 100–4000); `courses` (past courses drawn,
  0–30); `palette` (`auto`, `fisk`, `earth`, `slate`); `style` (`colour`,
  `lines`); `scroll_bars`; `stroke`.
- **Generation:** a slightly skewed valley along the page's long side; the
  centreline starts nearly straight with seeded wiggles, nodes half a width
  apart. Each step computes the signed curvature `C(s)` (lightly smoothed)
  and the Howard–Knutson bank velocity
  `R(s) = Ω C(s) + Γ ∫ C(s−ξ) e^{−αξ} dξ / ∫ e^{−αξ} dξ` (Ω = −1, Γ = 2.5,
  seeded memory `1/α` of 1.6–2.6 widths, integral truncated at `5/α`),
  moves every node along its normal (at most a fifth of a width), eases
  bends back inside a seeded meander belt, and resamples. The inflow
  direction swings slowly so new bends keep forming upstream. Necks
  narrower than a channel width between nodes more than ~9 widths apart
  along the river are cut, and a crossing check cuts anything they miss.
  Snapshots every `steps/(courses+1)` steps are the past courses, recent
  closely spaced banks are the scroll bars; cutoffs from the second half of
  the run are trimmed back from the channel and drawn as closed lakes.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic per seed; the centreline never crosses
  itself after any step (tested with a grid check every step and a brute-force
  check, across hundreds of steps and several cutoffs); bends grow from
  small wiggles (tested); every oxbow lake is a closed outline clear of the
  present channel — no bank point within half a width of its centreline and
  no channel point inside a lake (tested). `verification:
  centreline_simple_oxbows_clear`; meta carries `tradition` (Fisk 1944).
  Line art draws only lakes big enough to colour and reports its
  colourability check. Clamped knobs are reported as `requested_<field>`.

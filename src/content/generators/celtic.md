---
title: "Celtic Plait"
blurb: "An interlaced plait: cords passing over and under, with cells that turn them back"
category: design
version: "1.0.0"
---
An interlaced plait: cords crossing over and under, turned back by chosen
cells, every cord provably a closed loop.

## What it is

Cords run through the midpoints of cell edges. Each cell either **crosses**
its two strands (one passing visibly over the other) or **turns** them back;
the border joins the outer midpoints in pairs. The over/under alternates
along every cord, and the gaps at each under-crossing are what make the page
read as woven rather than as crossing lines.

What it draws is a *plait* — cords along the rows and columns. The 45°
diagonal interlace of Insular manuscript borders needs a different
construction (cords matched under rotation) and is recorded as not
implemented rather than approximated.

## How to use

Colouring and tracing pages. Tracing a single cord over and under until it
returns to its start is the classic exercise; colouring by cord (each closed
loop one colour) shows the knot's structure — the `cords` count in the
metadata says how many colours that takes.

## Purpose

The knotwork entry in the design lane, built on a proof rather than a check:
every midpoint acquires exactly two connections (one per adjacent cell, plus
the border pairing), and a graph where every node has degree two is a
disjoint union of cycles — so a dangling cord is not a reachable state. The
crate documents its abandoned first model (a bouncing billiard) whose
stepping was non-invertible and whose over/under rule was arithmetically
impossible; property tests caught both.

## History

Interlace patterns predate the Celts (Roman mosaics, Coptic manuscripts),
but the Insular tradition of the 7th–9th centuries — the Book of Kells, the
Lindisfarne Gospels — made knotwork its signature, woven into borders,
initials and carpet pages. Modern construction methods (grids, breaklines)
descend from George Bain's *Celtic Art: The Methods of Construction* (1951).

## This implementation

- **Spec knobs:** `size`, `cells`, `break_share` (fraction of cells that
  turn the cords), `gap` (the under-crossing window), `stroke`, `kids`.
- **Generation:** a grid of crossing cells with turns placed at random;
  degree-two connectivity checked (a failure is a model bug, reported as
  such); cords traced deterministically from sorted starts; dull knots
  (a mesh of short loops) rejected by measure and re-rolled.
- **Guarantees:** every cord closes — by counting argument, verified per
  page; over/under alternates along every cord (cell-parity rule, tested);
  deterministic per seed; colourability-gated with grid coarsening.

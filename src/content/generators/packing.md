---
title: "Circle Packing"
blurb: "A page of circles, each grown until it touches a neighbour or the wall"
category: design
version: "1.0.0"
---
A page of circles, each grown until it touches a neighbour or the wall.

## What it is

Circles placed one at a time at random candidate positions, each inflated
until it kisses an existing circle or the page boundary, until no circle of
the minimum radius fits anywhere. The result is a dense, organic arrangement
— bubbles, pebbles, cells — with tangencies everywhere and overlaps nowhere.

## How to use

A colouring page with a built-in rhythm: big circles anchor a palette, small
ones fill with accents. The optional concentric `rings` turn each circle
into a target of bands. Kids mode raises the minimum radius so every circle
is comfortably fillable with a crayon.

## Purpose

The design lane's simplest satisfying object — and the crate that
demonstrates deriving a default from a *rule* rather than taste: the minimum
radius (11 Pt) is computed from the colourability gate's 40 mm² minimum
region area, because the first default (9 Pt) made every page fail and
escalate invisibly.

## History

Tangent circles run from Apollonius of Perga (the tangency problem, ~200 BC)
through Apollonian gaskets to Descartes' circle theorem (1643). The
grow-until-touch packing is a staple of generative art practice; circle
packings also carry serious mathematics (Koebe–Andreev–Thurston: every
planar graph is a circle-packing contact graph).

## This implementation

- **Spec knobs:** `size`, `shape` (page silhouette), `min_radius`,
  `max_radius`, `candidates` per placement, `rings`, `stroke`, `kids`.
- **Generation:** rejection-sampled candidate centres; each circle takes the
  largest legal radius at its position, capped by `max_radius`; placement
  stops when `candidates` successive positions all fail at `min_radius`.
- **Guarantees:** no overlaps (checked, with the check exposed as
  `check() -> Result`), all circles inside the page shape, deterministic per
  seed; colourability-gated by construction since the radius floor *is* the
  region-area rule.

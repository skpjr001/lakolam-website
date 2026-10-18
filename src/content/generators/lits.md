---
title: "LITS"
blurb: "Shade one L, I, T or S tetromino in every region, all joined, with no two alike touching"
category: puzzle
version: "1.2.0"
---
Shade one tetromino in every region — L, I, T or S — all connected, no 2×2
block, and no two identical shapes touching.

## What it is

A grid divided into regions of four or more cells. In each region exactly
four cells are shaded, forming an L, I, T or S tetromino (the square is
excluded — it would break the next rule anyway). All shaded cells across the
board form one connected mass; no 2×2 area is fully shaded; and two
tetrominoes of the same shape may never share an edge. Rotations and
reflections count as the same shape.

## How to play

Four-cell regions are their own answer — shade them whole and name the shape.
Work adjacency from there: a placed S forbids any S against it, which often
leaves a neighbouring region only one option. The 2×2 rule polices corners
where regions meet, and global connectivity decides between the last few
candidates. There are **no numbers anywhere** — the region borders are the
entire clue.

On the bigger boards the steps come in a rough order of difficulty. First
the plain ones: a shape that would fill a 2×2 with cells that must be
shaded, or sit against a finished piece of the same shape, or be cut off
from every other piece, is out. Next, look at two neighbouring regions
together: a shape that leaves the region next door nothing it could still
hold is out. Harder: a shape that would wall the certain shading off from
itself, so it could never all join up, is out. The hardest boards need a
trial — suppose a shape, follow the plain steps, and if some region is left
with nothing, that shape was wrong.

## Purpose

The only clueless puzzle in the collection, which makes it the purest test of
the workspace's uniqueness machinery: nothing can be thinned, so uniqueness
has to be *built*, by moving cells between regions until only the intended
shading survives.

## History

Invented by Naoki Inaba as **Nuruomino**, adopted and renamed **LITS** by
Nikoli in 2004 — the name is simply the four usable tetromino letters.

## This implementation

- **Spec knobs:** `rows`, `cols` (4–15), `difficulty`.
- **Generation:** four attempts documented in the crate, each killed by a
  measurement — blind region carves gave 90% zero-answer boards (0/160
  unique); greedy piece placement saturated at 57% density (regions too big
  to pin); a 2×2-blocking lattice made density worse. The shipped
  construction *packs* tetrominoes with a hole budget to 73–75% density
  (regions ≈ 5.4 cells, where published LITS sits), draws regions around the
  pieces, then repairs boundaries — a second answer diagnoses exactly which
  region had a choice, and one cell moves to remove it.
  On large boards (11×11, some 7×11) the dense packing search can run out
  of nodes on all 24 attempts; only then the packing is allowed 6, 8 or 10
  more bare cells, from fresh seeds, and the nearest band found is served
  and labelled (v1.1.0). Such boards still take 15–25 s: the 24 dense
  attempts run first so that every board generated before is unchanged.
- **Guarantees:** exactly one shading, verified against the rule definition;
  the shape classifier is pinned by enumerating all 19 fixed tetrominoes
  (2 I, 1 square, 4 T, 8 L, 4 S) — an invariant like neighbour-count
  multisets *cannot* tell L, S and I apart, so the classifier canonicalises
  all eight orientations instead.
- **Difficulty:** search nodes per cell, with thresholds measured on LITS
  itself — its proofs cost ~0.2 nodes/cell where kuromasu's cost 1–11, so
  borrowed cuts would have rated every board Kids.
- **Boards past 11×11 (v1.2.0, up to 15×15).** A side of 12–15 used to be
  clamped to 11; it now gives the board asked for, so those specs' output
  changes (every spec of 11×11 or less is byte-identical). These boards use
  256-cell wide masks and are proved by a **sound ladder that settles every
  region**, never by a capped count. Each region keeps the tetrominoes it
  could still hold; rungs remove options no answer can use: **basic** (a
  2×2 with cells every answer shades; touching a settled same-shape piece;
  touching no possible shading at all), **pair** (leaves a neighbouring
  region no compatible option), **connect** (the certain shading could no
  longer be joined through possibly-shaded cells), **trial** (assume an
  option, run the first three; a region left empty refutes it). When every
  region is down to one option the intended shading is the only answer.
  Generation packs pieces with a looser hole budget (n/4 + 3 + n/14…n/9;
  measured on 15×15: +8 packed 0 of 40 seeds, +24 all 40), carves regions,
  then repairs: when the ladder (to *connect*) stalls, a bare cell of a
  still-possible wrong option — with any bare cells its removal would cut
  off — moves to a neighbouring region, choosing among six candidate moves
  the one leaving fewest options. Then the board is eased with only the
  band's rungs if it needed more, or roughened (bare cells handed to
  neighbours while the ladder still settles) toward the band's rung.
  **Rating:** `rating_basis: "hardest_rung"`, with `hardest_rung` and
  `rung_uses` in the metadata; basic → Easy, pair → Medium, connect → Hard,
  trial → Expert. Kids is served as Easy. 24 attempts (24 looser ones only
  if none built a board); the first at the band wins, else the nearest band
  is served with `requested_difficulty`. Over seeds 0–5: Easy and Medium are
  met on every seed at 12×12 and 15×15; Hard on 6/6 at 12×12 and 2–4/6 at
  15×15; Expert on 5/6 at 12×12 and 1–2/6 at 15×15. 15×15 takes 1–8 s on a
  loaded 8-core machine; 12×12 well under 2 s.
- **Version 1.1.1 — the request note is spelled `requested_difficulty`.**
  Earlier versions wrote `difficulty_requested`, which nothing else in the
  catalogue reads. Pages and keys are unchanged. Over seeds 1–8 every band is
  reached; Medium is the thin one (served Easy or Hard on 7 seeds of 8).

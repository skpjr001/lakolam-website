---
title: "LITS"
blurb: "Shade one L, I, T or S tetromino in every region, all joined, with no two alike touching"
category: puzzle
version: "1.0.0"
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

## Purpose

The only clueless puzzle in the collection, which makes it the purest test of
the workspace's uniqueness machinery: nothing can be thinned, so uniqueness
has to be *built*, by moving cells between regions until only the intended
shading survives.

## History

Invented by Naoki Inaba as **Nuruomino**, adopted and renamed **LITS** by
Nikoli in 2004 — the name is simply the four usable tetromino letters.

## This implementation

- **Spec knobs:** `rows`, `cols`, `difficulty`.
- **Generation:** four attempts documented in the crate, each killed by a
  measurement — blind region carves gave 90% zero-answer boards (0/160
  unique); greedy piece placement saturated at 57% density (regions too big
  to pin); a 2×2-blocking lattice made density worse. The shipped
  construction *packs* tetrominoes with a hole budget to 73–75% density
  (regions ≈ 5.4 cells, where published LITS sits), draws regions around the
  pieces, then repairs boundaries — a second answer diagnoses exactly which
  region had a choice, and one cell moves to remove it.
- **Guarantees:** exactly one shading, verified against the rule definition;
  the shape classifier is pinned by enumerating all 19 fixed tetrominoes
  (2 I, 1 square, 4 T, 8 L, 4 S) — an invariant like neighbour-count
  multisets *cannot* tell L, S and I apart, so the classifier canonicalises
  all eight orientations instead.
- **Difficulty:** search nodes per cell, with thresholds measured on LITS
  itself — its proofs cost ~0.2 nodes/cell where kuromasu's cost 1–11, so
  borrowed cuts would have rated every board Kids.

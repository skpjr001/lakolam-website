---
title: "Sujiko"
blurb: "Sujiko — place 1-9 so each corner circle sums its 2x2 block"
category: puzzle
version: "1.0.0"
---
Place 1 to 9 in the grid so that each circle equals the sum of the four
numbers around it.

## What it is

A 3×3 grid holds the digits 1 to 9, each once. A circle sits at each of the
four inner corners, and its number is the total of the 2×2 block of cells it
touches. A digit or two may be given. There is exactly one arrangement.

## How to play

The four circles overlap on the centre cell, and their sums add to a value
that pins it down. From there, corner cells belong to a single circle, so each
is forced by its circle's remaining total. Small, quick, and forgiving —
a good warm-up puzzle.

## Purpose

A compact number filler that rounds out the kids/family lane, with a mechanic
unlike any other in the catalogue: overlapping 2×2 block sums over a single
permutation of 1–9, rather than the no-repeat lines of `sudoku` or the cage
sums of `kakuro`.

## History

Sujiko was created by Jai Gomer of Kobayaashi Studios and runs daily in *The
Times*, *The Telegraph* and other papers; its cousin Suko adds coloured cell
groups.

## This implementation

- **Spec knobs:** `difficulty`, `cell`, `line`.
- **Generation:** a random permutation of 1–9 is placed, the four corner sums
  computed, and — if the sums alone are not enough — as few digits as possible
  revealed to force the answer, then trimmed.
- **Guarantees:** deterministic per seed; the digits are a permutation of 1–9
  and the four sums match (checked); and an exhaustive search over the
  permutations — pruning the moment a completed block misses its sum — proves
  exactly one arrangement fits. Rated by how many digits are given.

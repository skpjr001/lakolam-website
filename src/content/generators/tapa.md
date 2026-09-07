---
title: "Tapa"
blurb: "Tapa — shade one connected wall; the numbers count the runs around each clue"
category: puzzle
version: "1.0.0"
---
Shade cells to build one connected wall with no 2×2 block. The numbers in a
clue cell count the runs of shaded cells around it.

## What it is

Some cells carry numbers and are never shaded; the rest you shade or leave
white. A clue's numbers are the lengths of the shaded runs among its eight
neighbours, read around the ring in any rotation — so `3 1` means a run of
three shaded cells and, separated by white, a run of one. All the shaded cells
must join into a single wall, and no 2×2 square may be fully shaded.

## How to play

A clue of `8` shades all eight neighbours; a `0` leaves them all white. Most
clues are read for what they forbid as much as what they force — `1 1` needs
two shaded cells with white between them, never touching. The no-2×2 rule and
the single-wall rule then knit the local deductions into one shape.

## Purpose

The catalogue's most information-dense clue: not a single number but a
*multiset of run-lengths* around each cell. It is a modern championship
staple, and its clue type is unlike anything else here — Kuromasu counts a
line of sight, Nurikabe counts a region's size, Tapa counts the pattern in a
ring.

## History

Invented by Serkan Yürekli in 2007 (the name is a play on the Turkish/Spanish
word), Tapa rose quickly through the World Puzzle Federation circuit and
GMPuzzles to become one of the most popular modern loop-free shading genres.

## This implementation

- **Spec knobs:** `size` (5–8), `difficulty`, `cell`, `line`.
- **Generation:** a connected wall is grown cell by cell, each addition
  refused if it would make a 2×2 block; then every white cell is clued with
  its true ring pattern and the clues trimmed to a subset that still forces
  the wall.
- **Guarantees:** deterministic per seed; the wall is connected, has no 2×2,
  clue cells are unshaded, and every clue matches its ring (checked); and a
  backtracking search — pruning monochrome squares as they form, checking each
  clue the instant its whole ring is decided, verifying connectivity at the
  leaves, node-budgeted — proves exactly one wall fits (a truncated search is
  treated as ambiguous). Rated by clue density.

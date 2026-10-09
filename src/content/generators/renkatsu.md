---
title: "Renkatsu"
blurb: "Renkatsu — divide a grid of numbers into regions that each hold 1 to their size once"
category: puzzle
version: "1.0.0"
---
Cut a grid full of numbers into regions that each count 1, 2, 3… up to their
own size.

## What it is

Every cell of the grid already holds a number. The task is to draw the
borders: divide the whole grid into regions so that a region of three cells
holds 1, 2 and 3, a region of five holds 1 to 5, and so on.

## How to play

Divide the grid along its lines into regions so that:

- every cell belongs to exactly one region;
- a region of N cells holds each number from 1 to N exactly once.

Every region holds exactly one 1, so count the 1s to know how many regions
there are. A 4 must share a region with a 1, a 2 and a 3 — and with nothing
bigger than 4 unless the region grows to hold every number up to it. When
only one region can reach a cell, draw it; when every region that could take
a cell also takes its neighbour, those two cells belong together.

## Purpose

A division puzzle where the numbers are all printed and the borders are the
answer: it trains spotting groups and reading constraints across the whole
board, with no writing of numbers at all.

## History

Renkatsu was devised by Naoki Inaba and published on his website Puzzle
Laboratory on 2 October 2010; Otto Janko's collection renders the name as
roughly "division into number sequences". The rules used here are Janko's:
divide the grid along the grid lines into regions, each region of N cells
containing all numbers from 1 to N exactly once.

## This implementation

- **Spec knobs:** `size` (5–9; 0 picks from the difficulty — 5, 6, 6, 7, 8
  from Kids to Expert), `difficulty`, `cell`, `line`. Clamped values are
  reported as `requested_*`.
- **Generation:** random regions of two to six cells (a few stay single)
  are grown from random open cells and numbered with a random order of 1 to
  their size. While the deduction ladder stalls, the region of a cell it
  left open is re-numbered — of six random numberings, the one that leaves
  the fewest cells open is kept — up to 80 times per carving.
- **Solving:** each region holds exactly one 1, so every candidate region is
  grown from a 1 — every connected group of cells holding exactly 1 to its
  size — and the puzzle is an exact cover of the grid by those groups. The
  ladder's rungs: *only fit* (a cell only one candidate can still cover
  takes it), *shared cells* (when every candidate covering one cell also
  covers another, candidates that split them are struck out), and *trial*
  (assume one of a cell's last two or three candidates, follow the lower
  rungs, strike it out on a contradiction).
- **Guarantees:** deterministic per seed; exactly one division, proven
  because the sound ladder settles every cell, confirmed by a capped exact
  cover count, and re-proven in tests by an independent search that grows
  regions cell by cell from the rules. Rated by the hardest rung needed
  (`rating_basis: hardest_rung_with_size_tiebreak`): only fit Kids on 5×5 and
  Easy above; shared cells Medium; trial Hard up to 7×7 and Expert above. A
  band a size cannot reach is served at the nearest band found and labelled
  as such beside `requested_difficulty`.

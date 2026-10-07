---
title: "Nondango"
blurb: "Nondango — blacken one circle in every region so no three circles in a line share a colour"
category: puzzle
version: "1.0.0"
---
One black circle in every room, and never three of a colour in a row.

## What it is

A grid divided into outlined regions, with white circles in some cells.
Colour some circles black so that every region has exactly one black
circle, and no three circles in neighbouring cells along a line — across,
down or diagonally — are all the same colour.

## How to play

Blacken some of the circles so that:

- every outlined region holds exactly one black circle (the rest of its
  circles stay white);
- no three circles in consecutive cells — across, down or along a
  diagonal — are all black or all white;
- an empty cell breaks a line, so circles on either side of a gap do not
  count as consecutive.

Look for three circles in a row: they cannot all be white, so one of them
is black, and if two of them share a region the third may be decided at
once. A region with one circle is easy — that circle is black — and once a
region's black circle is found, its other circles are white.

## Purpose

A light colouring puzzle that mixes a region rule (exactly one per room)
with a pattern rule (no three alike in a line), so every decision ripples
both inside its region and along the lines through it.

## History

Nondango (ノンダンゴ, roughly "no dumplings" — no skewer of three alike)
first appeared in Nikoli's Puzzle Communication Nikoli vol. 152 and is
playable on puzz.link.

## This implementation

- **Spec knobs:** `size` (5–10; 0 picks from the difficulty — 5, 6, 7, 8,
  10 from Kids to Expert), `difficulty`, `cell`, `line`.
- **Generation:** random regions of two to five cells are grown from seeded
  cells (a lone leftover cell joins a neighbour). One black circle per
  region is placed where no three blacks line up, then white circles are
  added in seeded order wherever they make no white run of three. Local
  search then edits the circles — adding or removing a white circle, or
  moving a region's black circle — keeping every edit that leaves the
  board valid and no farther from finished (four per circle the ladder
  leaves unsettled, plus one per region with a lone circle, a give-away),
  until the ladder settles every circle.
- **Solving:** one yes/no variable per circle, on a ladder of three rungs —
  *regions and runs* (exactly one black per region; every run of three
  circles mixed), *region choices* (one region at a time, every choice of
  its black circle tried against the runs of three that touch it) and
  *trial* (assume a circle, propagate the lower rungs, keep the opposite on
  a contradiction).
- **Guarantees:** deterministic per seed; exactly one colouring, proven
  because the sound ladder settles every circle, confirmed by a capped
  exhaustive count, and re-proven in tests by an independent search that
  knows only the rules as a feasibility test. Rated by the hardest rung
  needed: regions and runs alone are Kids up to 5×5 and Easy above; region
  choices are Medium; trial is Hard up to 8×8 and Expert above. Every band
  is reached at its default size; a band a chosen size cannot reach is
  served as the nearest band that size reaches, and labelled as such.

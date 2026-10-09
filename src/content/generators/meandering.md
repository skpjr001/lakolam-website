---
title: "Meandering Numbers"
blurb: "Meandering Numbers — each region holds 1..N as a snake of side-by-side steps; equal numbers never touch, not even diagonally"
category: puzzle
version: "1.0.0"
---
Count your way through every region — each number steps to the next one
beside it, and equal numbers never touch, not even at a corner.

## What it is

A square grid divided into outlined regions of one to seven cells, with a
handful of numbers already written in. A region of N cells holds the
numbers 1 to N, and they wind through the region like a snake: 1 next to 2,
2 next to 3, and so on. Two equal numbers may never touch anywhere in the
grid, not even diagonally.

## How to play

- Write a number in every cell. A region of N cells holds each of the
  numbers 1 to N exactly once (a one-cell region holds 1).
- Inside a region, every number touches the number one smaller and the
  number one larger along a side (where those exist). So the numbers 1, 2,
  3 … N run through the region as one unbroken path.
- Two cells holding the same number never touch, not side by side and not
  corner to corner, even across a region border.
- There is exactly one solution.

Good places to start: any square of four cells (two by two) must hold four
different numbers. The 1 of a region sits at one end of its path, so a
cell with neighbours in the region on three sides cannot hold the 1 or the
largest number. A number rules itself out of all eight cells around it.

## Purpose

A quiet number-placement puzzle with no arithmetic: only small numbers,
paths and "no two alike touching". It trains spatial reasoning — seeing
which ways a path can wind through a shape — together with elimination,
and whole grids often follow from only two or three printed numbers.

## History

The genre was invented by the Japanese puzzle author Naoki Inaba (2010) and
appeared as "Count Number" at the Japanese Puzzle Grand Prix in 2014. Otto
Janko's collection lists it as Mäanderzahlen ("meandering numbers"). It is a
relative of Suguru (Tectonic), which shares the regions numbered 1 to N and
the no-touching rule, and adds the path through each region.

## This implementation

- **Spec knobs:** `size` (5–10; 0 picks from the difficulty — 5, 6, 7, 8,
  10 from Kids to Expert), `difficulty`, `cell` (18–90 pt), `line` (0.2–4
  pt). Out-of-range numbers are clamped and the requested value is
  reported in the metadata.
- **Generation:** answer first. Regions and their numbers are grown
  together by a search: the most shut-in open cell goes next and becomes a
  new region's 1, the next number at a neighbouring region's tail, or a
  neighbouring region's new 1 at its head (its numbers moving up one) —
  never beside an equal number. Each region gets a random size goal of four
  to seven cells; a few may come out shorter. Every number starts printed
  and is removed in random order while the ladder still settles the grid at
  the band's rung.
- **Solving:** a ladder on one yes/no variable per cell and number. *Single
  rules*: one number per cell within its region's range, each number once
  per region, equal numbers never touching (all eight directions), and "if
  this cell holds x, a region neighbour holds x − 1 (and x + 1)". *Whole
  region*: every path through the region that agrees with what is known; a
  number no such path puts in a cell is ruled out. *Trial*: assume a value,
  follow the consequences, keep the opposite on a contradiction.
- **Guarantees:** deterministic per seed; exactly one answer, proven
  because the sound ladder settles every variable (meta
  `uniqueness_proof`), with a capped exhaustive count confirming it when
  cheap (`count_confirmed`), and re-proven in tests by an independent
  most-constrained-cell search that shares no code with the ladder. Rated
  by the hardest rung needed with size as the tie-break (single rules: Kids
  at 5×5, Easy at 6×6, Medium up to 8×8, else Hard; whole region: Easy at
  5×5, Medium up to 7×7, Hard up to 9×9, Expert at 10×10; trial: Hard up to
  6×6, else Expert). Minimal digs never needed trial in our surveys, so
  Hard and Expert come from size with whole-region reasoning; every band is
  served at its default size, and with a custom `size` the label states the
  band reached.

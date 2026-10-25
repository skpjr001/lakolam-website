---
title: "Packed Squares"
blurb: "Packed squares: many-sized squares interlocking on a grid with no straight cut across, each holding a plotter motif"
category: design
version: "1.0.0"
---
Big squares, middling squares and a swarm of little ones, locked together
like a dry-stone wall — each carrying its own pattern of lines.

## What it is

A generative design on a grid. The biggest squares are set down first,
wherever they fit, then smaller and smaller ones in the gaps, and finally
every cell still empty becomes a little square of its own — so the squares
cover the whole grid with no gaps and no overlaps. Because the big squares
are placed freely rather than by cutting the page in halves, there is
usually no straight line right across the page: the pieces interlock.

Each square holds one motif drawn as a pen plotter would: nested squares
that drift towards one side (the "hypnotic squares"), quarter-circle arcs
from two opposite corners, hatching at one of four angles, rings like a
target, or nothing but its colour.

## How to use it

Frame it, or print the line-art version and colour it: give each size its
own colour, colour only the squares with rings, or shade the hatched ones
dark and leave the rest pale. The many small squares are good for practising
steady, even colouring; the big ones for blending.

## Purpose

A bold, graphic page with the order of a grid and the surprise of a
mosaic, and a quiet lesson in packing: the same rule — largest first —
that people use to fill a box or a shelf.

## History

Square packings that tile a rectangle with squares of many sizes go back to
the "squared rectangles" studied by Brooks, Smith, Stone and Tutte (1940).
Placing pieces largest first is the classic greedy rule of packing. Nested
squares drifting off-centre recall William Kolomyjec's plotter drawing
"Hypnotic Squares" (1970s) and Vera Molnár's squares; quarter-circle arcs
are Truchet tiles in the form popularised by Cyril Stanley Smith (1987).

## This implementation

- **Spec knobs:** `unit` (grid cell, 6–120 pt), `largest` (largest
  square's side in cells, 1–40), `density` (0–1, how eagerly big squares
  are placed), `motifs` (mixed, concentric, truchet, hatch, target, plain),
  `palette` (auto, bauhaus, riso, ocean, earth, ink, line_art), `gap`,
  `stroke`, `width`, `height`, `margin`.
- **Generation:** the grid holds as many whole cells as fit the plate
  (centred; at most 40 000 cells, else `unit` grows). For each side s from
  `largest` down to 2, every cell is visited in a fresh seeded order, and
  where an s × s square fits on free cells it is placed with probability
  min(1, 2.4 · density / s^2.3). Remaining cells become 1 × 1 squares. A
  mixed page weights the motifs by seeded preferences. Line pitch is about
  a third of a cell. Over-range knobs are clamped and recorded as
  `requested_<field>`.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic per seed; `verification: squares_tile_grid`.
  Tested: across grid shapes, sizes, densities and seeds, every cell is
  covered by exactly one square and the areas sum to the grid's; no square
  exceeds `largest`; zero density gives only 1 × 1 squares; the default
  page uses at least four sizes and is not guillotine (it cannot be cut
  down to its squares by straight cuts right across). Every motif stays
  inside its square (clipped), and all ink stays inside the page.

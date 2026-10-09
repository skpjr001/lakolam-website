---
title: "Reflect Link"
blurb: "Reflect Link — one loop that bounces off triangle mirrors and crosses itself only at the crosses; numbers give arm lengths"
category: puzzle
version: "1.0.0"
---
Bounce one loop off black mirrors and send it straight through every
crossing — the numbers measure the straight stretches.

## What it is

A square grid with a few black triangles and a few cross marks. Draw one
closed loop through the centres of cells. The loop bounces off each
triangle like light off a mirror, crosses itself at every cross mark, and
never crosses anywhere else. It does not have to visit every cell.

## How to play

- Draw one closed loop through the centres of cells, moving up, down, left
  or right between neighbouring cells. Cells the loop does not use stay
  empty.
- The loop passes through every black triangle. A triangle fills half its
  cell; the loop enters and leaves through the two sides of the white half,
  so it turns there.
- The loop passes through every cross twice, once across and once up and
  down, going straight both times. It never crosses itself anywhere else,
  and never turns at a cross.
- A number in a triangle tells you how many cells the two straight lines
  that meet at the triangle cover altogether, counting the triangle's own
  cell once. A straight line runs on through crosses and stops where the
  loop turns.

Good places to start: a cross fixes four pieces of loop at once. A
triangle fixes two. A small number keeps both straight lines short, so
the loop must turn soon after the triangle; a large number near the edge
of the grid often leaves only one way to split it.

## Purpose

A light, visual loop puzzle. Instead of covering the whole grid, the loop
is steered by a handful of mirrors and crossings, and the arithmetic of the
numbers ties the straight runs together. It practises planning a route
ahead and counting along rows and columns.

## History

Reflect Link (リフレクトリンク) is a Nikoli genre that appeared in the
publisher's Puzzle Communication Nikoli magazine. Otto Janko's collection
lists it as "Reflect", and the puzz.link site hosts a solver for it.

## This implementation

- **Spec knobs:** `size` (5–10; 0 picks from the difficulty — 6, 6, 7, 7,
  8 from Kids to Expert), `difficulty`, `cell` (18–90 pt), `line` (0.2–4
  pt). Out-of-range numbers are clamped and the requested value is reported
  in the metadata.
- **Rule reading:** as in the puzz.link checker, a number equals the edges
  of the two straight runs plus one (so at least 3); every cross must be
  crossed; the loop may turn in plain cells.
- **Generation:** a randomised depth-first walk draws a closed loop of
  about 45–65% of the cell count. The walk may re-enter a cell it crossed
  straight before, going straight across it at right angles (a crossing),
  and is steered home once it is long enough. Every crossing becomes a
  cross mark and every turn a numbered triangle — enough to fix the loop.
  Triangles, then their numbers, are removed in random order while the
  deduction ladder still settles every edge at the band's rung. When the
  requested rung yields no board, fresh attempts run at the rungs above
  and the band actually reached is printed.
- **Solving:** a ladder over one yes/no variable per edge and one
  "visited" flag per strand end (a cross has two ends: across and up and
  down). *Local*: a visited cell has two loop edges, an unvisited one none;
  triangles and crosses are visited, triangles use only their open sides,
  and each number keeps only the pairs of run lengths that add up.
  *Loop*: no loop may close before it holds everything, the possible
  edges must hang together, and across a narrow passage the loop lives
  wholly on one side. *Trial*: assume an edge, propagate, keep the
  opposite on a contradiction.
- **Guarantees:** deterministic per seed; exactly one loop, proven because
  the sound ladder settles every edge (meta `uniqueness_proof`), with a
  capped exhaustive count confirming it when cheap (`count_confirmed`),
  and re-proven in tests by an independent search over the edges that
  knows only the rules. Rated by the hardest rung needed with size as the
  tie-break (local: Kids up to 6×6, else Easy; loop: Easy up to 6×6, else
  Medium; trial: Hard up to 7×7, else Expert). Every band is reached at its
  default size; with a custom `size` the label states the band actually
  reached (Kids from 7×7 up is Easy or Medium; Medium up to 6×6 is Easy;
  Expert below 8×8 is Hard and Hard from 8×8 up is Expert).

---
title: "Light and Shadow"
blurb: "Light and Shadow — split the grid into grey and white regions, each holding one number equal to its size"
category: puzzle
version: "1.0.0"
---
Shade the shadows — every area of one colour is the size of its number.

## What it is

A grid with numbers, some printed on grey cells and some on white. Colour
every cell grey or white so that the grid falls into areas of one colour,
each holding exactly one number, and each number tells the size of its
area. There is exactly one way to colour the grid.

## How to play

Shade some cells grey and leave the rest white. The rules:

- an area is a group of cells of one colour joined along edges; two grey
  areas (or two white areas) can never share an edge - they would be one
  area;
- every area contains exactly one number, and the number is how many cells
  the area has;
- a number on a grey cell belongs to a grey area, a number on a white cell
  to a white area.

Start with the 1s: a 1 is an area on its own, so every cell beside it has
the other colour. Two cells side by side are in the same area exactly when
they have the same colour, so a cell between a grey number and a white
number joins one and walls off the other. Grow the areas outward from
their numbers and keep count - an area that has reached its size is
closed, and the cells around it take the other colour.

## Purpose

A shading puzzle and a region puzzle at once: light and shadow fit
together like a map with two colours. It trains counting, careful
bookkeeping and seeing how one closed area forces its neighbours.

## History

Light and Shadow was created by the Turkish puzzle author Serkan Yürekli
and has appeared in international puzzle competitions and online puzzle
collections.

## This implementation

- **Spec knobs:** `rows`, `cols` (4–11; 0 picks from the difficulty — 5×5,
  6×6, 7×7, 8×8, 8×8 from Kids to Expert), `max_region` (2–7; 0 picks 4 for
  Kids, 5 for Easy and Medium, 6 for Hard and Expert), `difficulty`,
  `cell`, `line`.
- **Generation:** a random two-colour partition grown region by region from
  the first open cell; each region takes the colour opposite every region
  it touches, and an open cell beside both colours ends that branch (no
  region could cover it). One number per region, in a random cell, printed
  on its colour. A local search then moves numbers within their regions or
  re-cuts the regions around a cell the deduction ladder leaves open (never
  adding regions, so the grid does not drift into many tiny ones), keeping
  each change that leaves no more cells open at the requested rung - and,
  once none are, that leaves at least as many open for the rung below, so
  the grid needs the rung it is rated for. Expert first reaches a grid the
  pairs rung settles, then walks among grids an exhaustive count (20,000
  nodes) still proves unique until the ladder can no longer finish one.
- **Solving:** the candidates are, for each number, every connected set of
  its size through it that holds no other number, in the number's colour;
  two candidates clash if they overlap, or if they share a colour and an
  edge. *Forced* (Easy): a cell only one candidate can still cover takes it,
  striking every clashing candidate. *Look one step* (Medium): a candidate
  is struck if placing it would leave some open cell with no candidate.
  *Pairs* (Hard): where a cell has two candidates left, each is tried and
  struck if the lower rungs then reach a contradiction. Grids the ladder
  cannot finish are proven by search alone (Expert).
- **Guarantees:** deterministic per seed; exactly one colouring, proven by
  an exact-cover search with the same-colour rule (branching on the cell
  with the fewest candidates) that counts to a cap of 2 and treats an
  exhausted node budget as ambiguous. The definition is checked from the
  colours alone (one-colour areas, one number each, equal to the size, on
  its colour), and tests recount with an independent search that grows
  regions through every connected set. Rated by the hardest rung needed
  (forced: Kids for grids of 30 cells or fewer, else Easy; look-one-step
  Medium; pairs Hard; search-only Expert). Every band through Hard is
  reached at the default sizes; Expert is reached for roughly five seeds in
  eight, and otherwise the nearest band found (usually Medium) is returned
  and labelled (`requested_difficulty` in meta).

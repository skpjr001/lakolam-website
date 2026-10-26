---
title: "Metro Maps"
blurb: "Metro maps of invented cities: octilinear lines, interchanges, a river and invented station names, laid out by annealing"
category: design
version: "1.0.0"
---
The underground map of a city that does not exist: coloured lines at
right angles and diagonals, interchanges, a river and a station at every
stop.

## What it is

A poster-style metro map in the manner Harry Beck invented for London in
1931. Each coloured line runs only horizontally, vertically or at 45°;
stations are spaced evenly along it rather than where they really are;
where lines share a stretch of track they run side by side; interchanges
are white linked circles, ordinary stations little ticks. A river winds
across the map and every station has a name — all invented, from made-up
syllables, like the city itself. The key at the bottom names each line and
its two terminals.

## How to use it

Plan a journey: pick two stations and find the route with the fewest
changes. Every change of line happens at a white circle; ticks are stations
on one line only. Count the stations between two stops — the map is a
diagram, so distances on it mean stops, not kilometres. Find which
stations have a bridge, a wharf or steps in their name: they are by the
river. The black-and-white version draws every line hollow, ready to colour
in your own scheme.

## Purpose

The schematic metro map is one of the great designs of the twentieth
century: it throws away geography to show connections clearly. The page
shows that idea at work, invites map reading and route puzzles, and makes
a playful poster of an imaginary city.

## History

Harry Beck's diagram of the London Underground (1931, published 1933)
introduced the octilinear, evenly spaced style; Massimo Vignelli's New York
map (1972) and countless others followed. Drawing such maps automatically
is a research problem of its own: Hong, Merrick and do Nascimento (2006),
Stott, Rodgers, Martínez-Ovando and Walker ("Automatic metro map layout
using multicriteria optimization", 2011) and Nöllenburg and Wolff's
mixed-integer programme ("Drawing and labeling high-quality metro maps by
mixed-integer programming", 2011). This page uses a light annealing in the
spirit of Stott et al. Station and city names are invented syllables.

## This implementation

- **Spec knobs:** `lines` (2–8); `river`; `labels` (station names);
  `legend` (title and key of lines); `landscape`; `palette` (classic, night,
  ink, or auto); `page`; `margin_mm`.
- **Generation:** a 10 × 8 jittered street grid with one diagonal per
  block (planar), a river between two rows crossed by four bridges. Each
  line joins two rim terminals roughly opposite each other by a cheapest
  path, street costs seeded, pulled towards the centre and discounted where
  another line already runs (so lines share sections). The network is
  reduced to its skeleton — interchanges, terminals, stations where the set
  of lines changes (a middle station is promoted to break loops and
  parallel chains) — and only skeleton nodes are placed, on an integer
  grid, by simulated annealing: moves nudge a node one step or flip a
  chain's bend; the cost forbids crossings, overlaps, a route over a node it
  does not serve and coincident nodes, and weighs distance from geography,
  room for each chain's stations, bends and sharp turns of a line through a
  node. Each chain is an octilinear route with at most one bend, its
  stations spread evenly along it; shared chains offset their lines side by
  side. The river follows the gap between northern and southern stations,
  snapped to 45° steps. Names are tried at eight positions round each
  station (perpendicular first), at three sizes, avoiding every station
  marker and earlier name and preferring spots off the lines; interchanges
  are named first.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic; `verification:
  octilinear_planar_labels_clear` — every route segment has dx = 0,
  dy = 0 or |dx| = |dy| and every station lies on its route; no two routes
  meet except at a skeleton station both serve (exact integer test), and no
  two city lines cross between stations; no name overlaps a station marker
  or another name (at least 90 % of stations are named in tests; the count
  left unnamed is in meta `unlabelled`); a layout with any hard violation is
  never shipped (the city is regenerated). Every name is unique and drawn
  by the stroke font. All ink stays on the page; clamped knobs are reported
  (`requested_<field>`).

---
title: "Chinese Window Lattice"
blurb: "A framed Chinese window lattice: regular lattice families with a border band and a central medallion, every bar attached"
category: design
version: "1.0.0"
---
A carved wooden window in the manner of Chinese lattice: a moon, fan, vase or
rectangular frame filled with a regular lattice, a border band and a central
medallion.

## What it is

A design in the manner of the wooden window lattices of traditional Chinese
houses and gardens. Inside the frame, a border band runs round a field, and
a medallion can sit at the centre — each filled with a different lattice
family: bars meeting only in T joints like brickwork; a slanting grid with
every other rung left out; octagons and little squares; tall
tortoiseshell hexagons; interlocking stepped frets; and zigzags tied by
posts. The bars are drawn as real wood of even width, with clean joints and
paper glowing behind them.

## How to use it

Trace the families: follow a bar from the frame inward and notice where it
meets another and how. Every bar is fixed at both ends — in a real window
nothing may hang loose. To colour it, choose the line-art palette and colour
the panes, the bars, or both.

## Purpose

A calm, architectural page that shows how a handful of construction rules
make a great variety of lattices, and how a frame, a border and a centre
compose a window.

## History

Window and door lattices of wood, backed with paper, are one of the great
decorative arts of Chinese architecture, from imperial palaces to the
gardens of Suzhou. Daniel Sheets Dye, working in Sichuan in the 1920s and
30s, recorded thousands of them and sorted them by construction in *A
Grammar of Chinese Lattice* (Harvard-Yenching Institute, 1937; Dover
reprint as *Chinese Lattice Designs*, 1974). Moon, fan and vase-shaped
openings are typical of garden walls. This page is a geometric grammar in
the manner of the tradition, drawing a few of Dye's regular families (the
cracked-ice family has its own page; the swastika fret family is left out);
it reproduces no specific window. See also Ronald G. Knapp, *Chinese Houses*
(2005).

## This implementation

- **Spec knobs:** `frame` (auto, rectangle, moon, fan, vase), `field` and
  `border` (auto, t_plain, interrupted, octagon, tortoiseshell, fret,
  broken), `medallion`, `cells` (4–30 across), `bar` (bar width as a
  fraction of a cell), `palette` (auto, lacquer, teak, line_art), `width`,
  `height`, `margin`.
- **Generation:** the frame is a polygon; the inner ring is its inset by the
  band width; the medallion is an octagon, lozenge or circle at the centre.
  Each zone takes a different family, generated as centre lines about the
  centre, and placed — trying half-cell phase shifts and small scale
  changes — so that no lattice joint falls just beside a zone boundary;
  the lines are clipped to the zone, the zone rings are added as bars, and
  the whole set is split at every crossing into a planar graph whose faces,
  inset by half a bar (and by the frame width at the frame), are the panes:
  the wood is the frame minus the panes, so every joint is exact. The
  lattice casts a soft shadow on the paper.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic per seed; `verification:
  every_bar_attached_no_dangling_ends`. Tested for every frame and every
  family: the split centre-line graph has no node of degree one (no
  dangling bar end) and is connected (every bar reaches the frame); the
  field, border and medallion families differ; all ink stays on the page.

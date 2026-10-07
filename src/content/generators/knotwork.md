---
title: "Knotwork"
blurb: "Insular Celtic knotwork on the 45° grid — panels, borders and corner pieces with breaks, over and under alternating along every cord"
category: design
version: "1.0.0"
---
Celtic knotwork in the manuscript style: ribbons running at 45 degrees,
weaving over and under, turned back by breaks into panels, borders and
corner pieces.

## What it is

A page of interlace like the decorated pages of the Insular gospel books.
Ribbons run diagonally across a grid, crossing one another; wherever a
ribbon meets a break or the edge of the design it curves round and heads
back. Follow any ribbon and it goes over, then under, then over, all the
way round until it returns to where it started. The page comes as one
large panel, as a border round the page with a knot in each corner, or as
four L-shaped corner pieces. Breaks are placed in mirror-image patterns, so
the design balances.

## How to use it

Print it in colour as a panel, card or frame, or print the line-art version
to colour. To colour it, pick one ribbon and follow it with your pencil
over and under until it comes back to the start, colouring it as you go; a
second colour for the next ribbon shows how the knot is built. Leave the
ground dark (or a single colour) so the ribbons stand out. The border page
has an empty centre for a picture, a poem or a name.

## Purpose

Knotwork is one of the most loved colouring and craft patterns, and drawing
it correctly by hand is hard: one wrong crossing and the over-and-under
breaks down. Built from a grid and a set of breaks, every page here weaves
correctly everywhere, so the eye can follow each ribbon without a stumble.

## History

Interlace appears across late Roman, Coptic and Germanic art, but it
reached its height in the Insular art of Ireland and Britain in the seventh
to ninth centuries — the Book of Durrow, the Lindisfarne Gospels and the
Book of Kells — and on carved stone crosses. The artists worked from a grid
of dots, running the cords diagonally and placing breaks to vary the plait.
J. Romilly Allen catalogued the patterns in the 1900s; George Bain's *Celtic
Art: The Methods of Construction* (1951) taught the grid method to a
modern audience, and later writers — Aidan Meehan, Peter Cromwell (who
described the knots mathematically), Andy Sloss — refined the construction
into tile and graph methods. This generator follows that grid-and-break
method; it is the diagonal interlace the studio's plait generator (which
runs cords along rows and columns) does not draw.

## This implementation

- **Spec knobs:** `width`, `height`, `margin`; `layout` (panel, border,
  corners); `cells` (cells across, 2–40; rows follow from the page shape);
  `band` (border and corner width in cells, 1–6); `period` (border run
  repeat in cells, 1–6); `breaks` (0 = plain plait to 1 = dense);
  `symmetry` (mirror, turn, none — for panels); `single_cord`; `ribbon`
  (width as a fraction of the spacing between parallel cords, 0.25–0.5);
  `palette` (manuscript, jewel, stone, gold); `line_art`; `stroke`.
- **Generation:** cells sit on a grid in doubled coordinates; every cell
  edge's midpoint is a node and the cord runs as a diamond through each
  cell's four edge midpoints, so every step is diagonal. A node between two
  cells is a crossing unless its edge is broken; a broken node, like one on
  the boundary, is a bounce where each cord turns back on its own side.
  Breaks go down as short straight walls from a random grid vertex, each
  with its whole symmetry orbit: both mirrors (or a half turn) for panels;
  for borders and corner pieces both mirrors plus the corner block's
  diagonal and, along a border's runs, a repeat of `period` cells (rows are
  trimmed so the runs repeat cleanly round the corners). A border may wall
  its corner blocks off as separate knots. A wall is kept only if every
  cord still crosses something (no loose hoops). With `single_cord`, a
  local search toggles mirror orbits of breaks, never adding cords, until
  the design is one cord (one per corner piece). Two even sides pair a
  mirrored panel's cords off, so a single-cord mirrored panel drops a row to
  make one side odd; a single-cord border keeps one mirror, across an even
  side (with both sides odd the search drops the symmetry), because a ring
  mirrored both ways kept its cords in pairs. Ribbons are
  cubic curves: straight and diagonal through a crossing, turning at an
  apex pulled back from each wall, sharing point and heading at every node.
  Each cord is cut where it passes under another, leaving ribbon pieces
  that each carry one over-crossing. Mirror-image cords share a colour.
  Line art strokes the pieces and the frame in black, and coarsens a grid
  too fine to colour (`grid_coarsened`).
- **Solving:** nothing to solve — a design.
- **Guarantees:** every cord closes (each node pairs its arms). Over and
  under alternate along every cord: the strand along one diagonal is over
  where x is even, and a cord changes x at every step and its diagonal at
  every bounce, so the state flips between consecutive crossings — and
  `alternation` re-checks it cord by cord on every page (every cord's
  crossings alternate cyclically, every crossing is passed exactly once
  over and once under; `verification: alternation_proven_per_cord`). Every
  cord has a crossing. Ribbon outlines are tested pairwise for crossings and
  containment (`ribbons_disjoint`). The cord count, crossings and breaks
  are reported. Tested independently from the drawing: every crossing point
  lies in exactly one ribbon piece and every piece covers exactly one
  crossing; breaks are invariant under the chosen symmetry, corner blocks
  under their diagonal, border runs under the period; line art is black and
  passes the adult colourability check. With `single_cord`, panels,
  borders and corner pieces reached one cord per piece in tests; the search
  has a budget, and a page that stops short says so
  (`single_cord_reached: false`, with the cord count).

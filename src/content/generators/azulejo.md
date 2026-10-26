---
title: "Azulejo Panel"
blurb: "Azulejo tile panels: cobalt-painted padrão tiles whose quarter motifs assemble across 2×2 and 4×4 repeats, framed by border and corner tiles"
category: design
version: "1.0.0"
---
A wall of painted tiles in cobalt on white: each tile holds a quarter of a
rosette, and the full pattern only appears when the tiles meet.

## What it is

A design in the manner of Portuguese azulejos — square tin-glazed tiles
painted in cobalt blue (or in blue, yellow and green, or manganese purple).
Each pattern tile carries a quarter of a large rosette in one corner, a
quarter of a small one in the other, and a lacework band between them;
turned about their shared corner, four tiles complete the rosettes, and a
wall of them becomes one continuous pattern with the tile joints running
straight through it. Some panels alternate two different tiles in blocks of
four. The field is framed by a border of half-height tiles with a running
motif and by corner tiles. The page shows either the whole wall panel or a
pattern-book sheet with each tile drawn large.

## How to use it

Look for the four tiles that make each large rosette, then follow the band
that links the small rosettes across the joints. To colour it, choose the
line-art palette: give each ring of the rosettes its own colour and keep the
same colour for the same part of every tile, as a tile painter working from
one stencil would. The tile sheet is a plan for painting your own tiles: the
large tile is the one to copy, the assembled square shows how it repeats.

## Purpose

A calm, richly patterned page that shows how a single small design, mirrored
and repeated, builds a much larger one — the idea behind every patterned tile
floor and wall.

## History

Tin-glazed tiles came to Portugal from Seville in the late 15th century and
became a national art. In the 17th century Portuguese workshops in Lisbon
made *azulejos de padrão* — pattern tiles in which four, sixteen or more
tiles combine into one repeat — usually in blue and yellow; from the late
17th century cobalt blue on white dominated, influenced by Chinese porcelain
and Delftware. Panels are framed by *cercaduras* (borders) and *barras*
(friezes), and tiled façades are still made and restored in Portugal today.
This page is a geometric grammar in the manner of the tradition, not a copy
of any panel. Sources: Santos Simões, *Azulejaria em Portugal no Século
XVII* (Fundação Calouste Gulbenkian, 1971); Museu Nacional do Azulejo,
Lisbon, collection notes; Rioletta Sabo and Jorge Nuno Falcato, *Portuguese
Decorative Tiles: Azulejos* (Abbeville, 1998).

## This implementation

- **Spec knobs:** `layout` (wall_panel, tile_sheet), `repeat` (auto, one,
  two, four — tiles per repeat), `palette` (auto, cobalt, polychrome,
  manganese, line_art), `columns` and `rows` of pattern tiles (wall panel),
  `border` (frame with border and corner tiles), `joint` (joint width in
  points), `glaze` (tile-to-tile irregularity), `width`, `height`, `margin`.
- **Generation:** a quarter tile is drawn in the unit square from a motif
  grammar: a large rosette (scalloped rosette, eight-point star or beaded
  medallion) centred on one corner, a small one (quatrefoil, rosette, star)
  on the opposite corner, a lace band (circle, double circle, diamond strap
  or none) linking the small rosettes, a motif where the lace crosses the
  diagonal, paired sprigs, and a motif where it crosses each edge. Every
  element is symmetric about the diagonal and every corner motif about the
  four mirrors of the square. Tiles are placed by reflection (odd columns
  mirrored left–right, odd rows top–bottom), so four tiles assemble each
  rosette. A 4 × 4 repeat alternates tiles A and B in blocks of four; they
  share every element that reaches the outer edges and differ only in the
  large rosette, which stays clear of them. A 1 × 1 tile is a 2 × 2 block
  at half scale. Border tiles carry a running motif mirrored tile to tile;
  corner tiles turn the border's rules. Each tile's glaze gets its own tint
  and a softly wobbling edge inside a visible joint, and the wash varies a
  little in strength from tile to tile.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic per seed; `verification:
  tile_edges_match_and_field_is_periodic_with_the_declared_repeat`. Tested
  for every repeat and several seeds: sampled a hair either side of every
  joint of an 8 × 8 field, the painting shows the same colour on both sides;
  the tile layout and the painted colour field repeat exactly every 1, 2 or
  4 tiles as declared (and a 4 × 4 does not already repeat at 2); tiles A
  and B agree along their whole outer edges; all ink stays on the page.

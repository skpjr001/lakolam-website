---
title: "Hexagonal Grid Paper"
blurb: "Hexagonal grid paper — a centred honeycomb of whole regular hexagons, 5 mm to 1 inch across"
category: paper
version: "1.0.0"
---
A honeycomb of whole, regular hexagons at exact size — 5 mm to 15 mm on a
side, ¼ or ½ inch, or the 1-inch tabletop hex.

## What it is

A sheet tiled with regular hexagons that share their edges, like a
honeycomb. Each hexagon touches six others, every neighbour the same
distance away — which is why game designers prefer hexes to squares, where
diagonal neighbours are farther than side neighbours. Sizes are given by
the side of a hexagon (5, 7, 10 and 15 mm, ¼ and ½ inch), plus the
tabletop battle-map hex measured 1 inch across the flats. Hexagons can
stand with a flat edge on top (in columns) or a corner on top (in rows).

## How to use it

Print the page at actual size: in the print dialog choose "Actual size" or
"100%", never "Fit to page", so each hexagon is exactly the chosen size.

For a game map, colour hexes for terrain — forest, water, hills — and
number them for reference; one hex is one unit of movement in any of six
directions. For chemistry, trace a hexagon for each benzene ring and
follow the shared edges to draw fused rings. Quilters and tilers can plan
hexagon patchwork and floor patterns, one hexagon per piece.

## Purpose

The paper of board-game and role-playing-game maps, wargame design,
organic chemistry structures, hexagon quilting ("English paper piecing"),
tile layouts and honeycomb-inspired art. In a book, hex sections make a
game-design notebook or a map book for tabletop campaigns.

## History

Hexagon grids entered gaming through military simulation. Staff at the
RAND Corporation used hex-shaped boards in their war games in the early
1950s, letting pieces move in six equal directions instead of four, and
Charles S. Roberts brought the idea to commercial games: Avalon Hill's
D-Day (1961) is usually named as the first board wargame with a hex-grid
map, and hexes soon became the genre's standard. In chemistry, the
hexagon has stood for the benzene ring since August Kekulé proposed its
ring structure in 1865.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape`; `margin_mm` (0–30, default 10); `size` (mm5, mm7, mm10,
  mm15, quarter_inch, half_inch by side, or inch_across_flats; default
  mm10); `orientation` (flat_top, default, or pointy_top); `ink` (one of
  the named paper colours; default gray); `weight` in points (0.1–2,
  default 0.3; the reference site offers 0.3, 0.5 and 1).
- **Generation:** hexagon corners sit on an integer lattice — half sides
  one way, half hexagon heights the other — so every hexagon is regular
  and exact. As many whole columns as fit go across, and down each column
  as many whole hexagons as fit, alternate columns offset by half a
  hexagon and holding one fewer when the height allows only that; the
  honeycomb is then centred in the content box. Every edge is collected
  once by its lattice ends, so an edge shared by two hexagons is drawn a
  single time, and all edges are one path.
- **Solving:** nothing to solve — a page to draw on. The seed is unused:
  every seed gives the same sheet.
- **Guarantees:** every hexagon is whole and regular, each edge exactly
  one side long; neighbouring centres are exactly one flat-to-flat width
  apart; no edge is drawn twice and none is left over; the honeycomb is
  centred and no further column or row would fit; and all ink, stroke
  widths included, stays inside the margins — checked on every page size,
  orientation, hexagon size, weight and margin. A knob outside its range
  is clamped and the request recorded as `requested_<field>` in the meta.

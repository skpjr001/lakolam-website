---
title: "Battle Map Paper"
blurb: "Battle-map paper — exact 1-inch or metric squares or hexes for tabletop games, with coordinates"
category: paper
version: "1.0.0"
---
Tabletop battle-map paper — exact 1-inch, half-inch or metric squares or
hexes for role-playing and war games, with lettered edges or wargame-style
hex numbers.

## What it is

A sheet ruled for moving figures and counters around a map. It comes in the
grids tabletop games actually use:

- **Squares** — 1 inch, the standard for miniatures on 1-inch bases (in
  most fantasy role-playing games one square is a 5-foot step); 2.5 cm and
  2 cm metric squares; and ½ inch for big maps.
- **Hexes** — the same sizes measured across the flats, plus the ⅝-inch
  (about 16 mm) hex of classic board wargames. Flat-topped hexes stand in
  columns, every other column half a hex lower; pointy-topped hexes lie in
  rows.
- **Hex over squares** — a hex grid printed over a faint square grid of
  the same size, its rows lined up with the squares, so one map works for
  both kinds of game.

Coordinates can run along the edges — columns A, B, C … Z, AA, AB … across
the top and rows 1, 2, 3 … down the side — or be printed in every cell as
a four-digit number, column then row: 0101 is the top-left cell, 0102 the
one below it and 0201 the next column. On a flat-topped hex map the odd
columns sit half a hex higher, so 0101 is above 0201, as on most board
wargame maps.

## How to use it

Print at actual size ("Actual size" or "100%" in the print dialog, never
"Fit to page"), so a 1-inch square really is one inch and your figures fit
on it.

Draw rooms, caves, forests and rivers with pencil or coloured pens, then
place figures one per square or hex. Count squares or hexes to measure
moves and ranges — in many role-playing games each square or hex is
5 feet. Call out positions by their coordinates ("the goblin moves to
C4", "the tank is in hex 0712") so everyone can find them. Tape several
sheets together for a bigger battlefield: the grids are whole cells, so
neighbouring sheets line up when you trim the margins.

## Purpose

Game masters sketch dungeon rooms and encounter maps before a session;
wargamers draw scenario maps and campaign hex maps; teachers use the
coordinates for map and grid-reference lessons. Hex paper is also the
paper of overland travel maps, where each hex is a day's walk. In a book,
battle-map pages make a game master's notebook or a campaign journal.

## History

Squared boards for war games go back to Johann Christian Ludwig Hellwig's
war game of 1780, played on a chessboard-like map of coloured squares. Hexagons arrived in commercial board wargames in 1961, when
Avalon Hill redid its Gettysburg and other titles with a hex grid — so
that every neighbouring cell is the same distance away, which squares
cannot manage on the diagonals — and hex maps have been a staple of
wargames ever since, numbered cell by cell with four-digit column-and-row
codes. Dungeons & Dragons (1974) grew out of miniature wargaming, and
wipe-clean mats ruled with 1-inch squares on one side and 1-inch hexes on
the other became standard role-playing kit, sized for miniatures on
1-inch bases.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape`; `margin_mm` (0–30, default 10); `grid` (squares, hexes,
  hex_over_square); `size` (inch, half_inch, five_eighths_inch, cm25,
  cm2 — a square's side or a hex across the flats); `hex_orientation`
  (flat_top, pointy_top; used by hexes and the overlay); `coordinates`
  (none, edges, numbers); `ink` for the grid (default medium grey) and
  `label_ink` for coordinates; `weight` (0.1–2 pt).
- **Generation:** squares sit at `start + k × size`, as many whole squares
  as fit, centred; hexes are regular with the side `size / √3`, as many
  whole hexes as fit, centred. Each shared hex edge is drawn once. The
  overlay lays a hex lattice whose rows (flat-top) or columns (pointy-top)
  run along the squares' centre lines, one spare hex all round, clipped to
  the square grid, and draws the squares in a lighter tint. Edge
  coordinates take room above and left of the grid; in-cell numbers go at
  the top of each hex or the top-left corner of each square. On the
  overlay, coordinates name the squares.
- **Solving:** nothing to solve — a page to draw and play on. The seed is
  unused: every seed gives the same sheet.
- **Guarantees:** squares are exact (every gap equals the size, to
  1e-9 pt); every hex is regular, measures exactly the size across the
  flats and has a neighbour exactly one size away; whole hexes only on a hex
  map; no shared edge is drawn twice; labels never touch and in-cell
  numbers sit inside their hex; and all ink — stroke widths included —
  stays inside the margins, on every page size, orientation, grid, size,
  orientation and coordinate style tested. A knob outside its range is
  clamped and the request recorded as `requested_<field>` in the meta.

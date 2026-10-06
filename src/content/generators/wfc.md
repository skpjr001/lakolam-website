---
title: "Wave Function Collapse"
blurb: "Wave function collapse — circuit boards, pipes, knots, road maps and dungeons assembled tile by tile from socket rules"
category: design
version: "1.0.0"
---
Circuit boards, plumbing, knotwork, kids' road maps and dungeon plans,
assembled tile by tile so that every connection meets its match.

## What it is

A picture built from square tiles, like a jigsaw where any piece may go
anywhere as long as its edges agree with its neighbours. A pipe that leaves
one tile through its right edge must enter the next tile through its left;
a road may meet a road, a river may meet a river, and where a road has to
cross a river there is a bridge. The page starts with every square
undecided. The square with the fewest possibilities is settled first, the
choice narrows down its neighbours, and the picture grows outward until
every square is fixed. The result looks designed, but no two pages are
the same.

## How to use it

- **Circuit board (the default):** copper traces, twin bus lines, chips,
  resistors and connector pins on a green board. A finished print, or a
  plotter or laser-engraving file in line style.
- **Pipes:** plumbing with flanged joints, valves and pressure tanks. The
  line style is a colouring page with big, simple shapes.
- **Knots:** gold ribbons that weave over and under each other, like
  Celtic knotwork. In line style, colour each ribbon its own colour and
  follow where it goes.
- **Roads:** a kids' map with roads, rivers, bridges, ponds, houses and
  trees. The line style uses six big tiles across, so every shape is large
  enough for crayons. Try drawing a car's route from one dead end to
  another.
- **Dungeon:** halls, rooms and doors cut into hatched rock, for tabletop
  adventures or a maze to explore with a pencil.
- **Closed border** (on by default) means nothing runs off the page. Every
  pipe, road, ribbon and hall connects to something, and ribbons always form
  closed loops. Turn it off for a map that continues beyond the page.
- More tiles across give a busier, finer page. Fewer give a bolder one.

## Purpose

Generative pattern pages with a strong, recognisable theme: wall art,
colouring pages, game maps and engraving files. The method is well known
from video games, so the pages also make a good starting point for talking
about how computers build levels and worlds from simple rules.

## History

Wave function collapse is Maxim Gumin's algorithm, published in 2016. Its
"simple tiled model" fills a grid with tiles under adjacency rules, always
deciding the least certain cell next. The name borrows loosely from quantum
mechanics: each cell is in a superposition of tiles until it is observed.
Underneath it is classic constraint satisfaction: arc consistency (Mackworth's
AC-3, 1977) and the "most constrained variable first" heuristic. Earlier
roots are Wang tiles (Hao Wang, 1961), squares with coloured edges that may
only meet a matching colour, and Truchet's tiles of 1704. The method spread
through games such as *Caves of Qud*, *Bad North* and *Townscaper*, and
through Oskar Stålberg's demonstrations. Circuit, knot and road tile sets
like these became the standard showcase.

## This implementation

- **Spec knobs:** `tileset` (`circuit` | `pipes` | `knots` | `roads` |
  `dungeon`, default `circuit`); `style` (`colour` | `lines`, default
  `colour`); `cols` (3–40; 0 = the set's own: circuit 14, pipes 12 (8 in
  lines), knots 12, roads 8 (6 in lines), dungeon 14 (10 in lines)); `rows`
  (3–40; 0 = square); `closed_border` (default true); `size` (page width,
  pt); `stroke` (outline width, pt; 0 = the set's own).
- **Tiles:** each set is a list of hand-drawn vector designs, each with
  four edge sockets, a weight and its distinct quarter turns (5 to 13
  designs, 10 to 33 variants per set). Drawings live on the unit square,
  rotate with the tile and scale onto the cell. Sockets are read clockwise
  round the tile, so two tiles may touch when their sockets on the shared
  edge are partners: equal for symmetric profiles, and 3 against 4 for a
  dungeon wall that crosses the edge near one end. Without that chirality,
  midpoint sockets cannot tell where a wall meets an edge, and rooms leaked
  at every step in their outline. With it, rooms are always closed
  rectangles of at least 2×2 tiles. Outline segments that lie on a tile's
  edge are filled but never inked, so a road reads as one road across
  tiles. All fills on a layer are wound the same way, so they never leave a
  seam where they meet.
- **Generation:** domains are 64-bit sets of tile variants. The closed
  border restricts edge cells to tiles with socket 0 facing out. The solver
  observes the undecided cell of lowest Shannon entropy over its weights,
  with ties broken by a fixed per-cell seeded noise. It collapses that cell
  by weight and propagates arc consistency (AC-3) through a queue. A
  contradiction (a cell with no tile left) is undone through a trail, and
  the failed choice is banned (chronological backtracking, so the search is
  complete). After 40 × cells backtracks the attempt restarts from
  `seed.derive("wfc/attempt/N")`, up to 8 attempts. If every attempt runs
  out, or the search refutes every branch, generation fails with a
  `GenerationExhausted` error that says which. No page is ever faked. Room
  decorations (pillars, chests, stairs) come from a separate derived stream
  and never touch the solve.
- **Solving:** nothing to solve. This is a design.
- **Guarantees (tested):** deterministic per seed, and different seeds give
  different pages. Every adjacency in the output satisfies the socket
  rules, checked by an audit independent of the solver's tables across all
  five sets, six seeds, three grid shapes, and the border on and off
  (`socket_violations: 0`, `sockets_match`). The audit fails on a broken
  control grid. With the closed border no connection leaves the page
  (`dangling_connections: 0`). With it open, connections do run off. The
  knot set's parity rules (no ends, no tees) force real contradictions,
  and the backtracking search still finishes with consistent grids. An
  unsatisfiable rule set is reported as infeasible. Line-style pages of
  pipes, knots, roads (against the KIDS rules) and dungeons pass the
  colourability gate (`colorable`). Circuit line art is a plotter and
  engraving file, not a colouring page, and its meta reports `colorable:
  false` honestly. A 30 × 30 page takes well under 0.5 s in release builds,
  and default pages take about 0.02 s.
- **Caveats:** the rules are local, so connectivity across the page is not
  guaranteed. A dungeon can contain a sealed room or a hall loop that joins
  nothing, and a road map can have two separate networks. Knot crossings
  alternate over and under by checkerboard parity. That gives true weaving
  wherever strands cross in a row, but not a strictly alternating knot
  along every strand.

---
title: "Slitherlink"
blurb: "Draw one closed loop, clued by how many edges each cell touches"
category: puzzle
version: "1.3.0"
---
Draw a single closed loop along the grid lines so each clue counts the edges
drawn around its cell.

## What it is

A lattice of dots. Some cells between the dots carry a number 0–3: exactly
that many of the cell's four edges are part of the loop. The loop is one
simple closed curve — it never branches, never crosses itself, and there is
only one of it.

Variety boards use other cells. On a **hexagon** board the dots outline
hexagons and a clue runs from 0 to 6; on a **triangle** board they outline
small triangles inside one big triangle and a clue runs from 0 to 3.

## How to play

Zeros are gifts: no edge touches them, and a 3 beside a 0 is nearly forced.
Corners and edges constrain hard — a 3 in a corner takes both outer edges.
Track dot degrees: every dot on the loop has exactly two drawn edges, so a dot
with two edges decided excludes the rest. The single-loop rule closes the
game: never complete a small cycle while cells remain unsatisfied.

Big boards climb a ladder of techniques, and harder boards need higher rungs:

- **Basics:** 0s, a cell that already has its count (cross the rest) or needs
  every open side, a 3 or 1 in a corner, and dot rules (no dot has one or
  three lines).
- **Patterns:** two 3s side by side take the three parallel edges; two 3s on
  a diagonal (even with 2s between) take their outer corners; a line running
  into a 3's corner fills the far two sides, into a 1's corner crosses them.
- **No small loops:** never join the two ends of a path unless that finishes
  the whole puzzle.
- **Inside and outside:** shade cells in or out (the area round the board is
  out). A line separates in from out, a cross joins two cells of the same
  kind — so two cells known to match across a chain of marks settle the edge
  between them, and a 3 beside two matching cells has lines on both sides.
- **What if:** imagine an edge drawn (or crossed), follow the easy rules, and
  if something breaks, it must be the other way.
- **Both ways and deep what-if (Expert):** try an edge both ways and keep what
  both agree on, or follow a what-if much further, using what-ifs inside it.

On hexagons and triangles the rules are the same — the number in a cell says
how many of its sides the loop uses. Dots on a hexagon board meet only three
edges, so a dot with one drawn edge and one excluded edge forces the third. A
hexagon's 5 leaves just one side free. On triangles the 1s and 2s do the
work: a 3 would close the loop around a single triangle, so it never appears
on a real board.

## Purpose

The archetypal loop puzzle and one of Nikoli's "big four". In the workspace it
is the hardest solver honestly bounded: slitherlink is NP-complete, the search
carries four proof-based prunes, a worklist propagator, and a union-find over
dots — and its development history (including a rollback bug that could have
called ambiguous boards unique) is recorded in the module docs as a warning.

## History

Nikoli, 1989, credited as a collaboration refined by founder Maki Kaji.
Published in English as Slitherlink, Fences, Loop the Loop and Dotty Dilemma.
It remains one of the most-analysed pencil puzzles in computer science.

## This implementation

- **Spec knobs:** `rows`, `cols` (square boards: 3–8 on the exhaustive path;
  a side above 8 takes the ladder path, rows 3–25 × columns 3–30), `fill` (share of the
  board the loop encloses), `difficulty`, `cell`, `line`, and `grid` —
  `square` (the default), `hex` (a hexagonal board of hexagons; `rows` sets
  its radius as `rows ÷ 2`, 2–4, i.e. 19, 37 or 61 cells) or `triangular`
  (one big triangle of small ones; `rows` is its rows, 4–8, i.e. 16–64
  cells). `cols` is ignored off the square grid.
- **Generation:** answer first — a closed loop is grown on the dual grid as a
  random simple polygon (the `lattice` module, shared through `lako-grid`),
  every cell's edge count is read off it, then clues are removed while the
  loop stays unique.
- **Guarantees:** exactly one loop satisfies the printed clues; the search is
  cross-checked against brute force over **every clue subset** of a small
  board — the test that once caught a union-find rollback bug no ordinary
  fixture would have found.
- **Difficulty:** rated by the share of cells still clued (`rate`): the
  sparser the board, the more of the loop is inferred.
- **Version 1.1 — hex and triangular grids:** the board is read off
  `lako-grid`'s cell outlines (corners become dots, sides become edges) and
  solved by a general branch-and-propagate edge search — clue and dot-degree
  rules force edges, a union-find spots a closing cycle, which must then hold
  every drawn edge — with a node budget whose exhaustion counts as ambiguous,
  never unique. Generation is the square plan: grow a connected, hole-free
  set of cells, take its outline as the loop (checked to be one loop, since
  triangles can pinch at a corner), clue every cell, then blank clues while
  the count stays exactly one. Blanking stops at the requested band's floor of
  clue share, so every band down to Hard is met exactly; Expert (at most 32%
  clued) is reached on most boards and otherwise served as Hard and recorded
  (`requested_difficulty`). The tests check the general search against the
  square solver on square boards and against an independent count over every
  set of enclosed cells on small hex and triangle boards. The variety pages
  draw faint cell outlines under the dots, since hexagons and triangles are
  hard to read from dots alone. Square boards are byte-identical to 1.0.
- **Version 1.2 — `line` works on every grid:** the answer key's loop is
  drawn `line` times its standard width. Square boards draw no cell outlines,
  so before this `line` changed nothing there. Pages and keys at the default
  `line` of 1 are unchanged.
- **Version 1.3 — large boards on a technique ladder:** a square board with a
  side above 8 (to 25 rows × 30 columns; 20×20 and 25×30 are the big site
  sizes) is generated by `lako-loop`. The loop is grown as before (from its
  own derived seed), every cell is clued, and clues are removed only while the
  sound `lako-loop` ladder still settles every edge from the clues alone —
  the proof of uniqueness at these sizes (every rung is a pure consequence of
  the rules, none assumes uniqueness). The band is the **hardest rung** the
  solve needed (`rating_basis: "hardest_rung"`, `hardest_rung` and
  `rung_uses` in meta): basics → Kids, patterns → Easy, no small loops and
  inside/outside → Medium, one-edge what-if → Hard, both ways / deep what-if
  → Expert. The requested band caps the rungs the thinning may use (a cheap
  pass up to inside/outside, then a pass under the full cap). All five bands
  are reached at 10×10, 15×15, 20×20 and 25×30 at the default seed; a board
  that misses its band is served at the nearest one with
  `requested_difficulty`. Generation takes well under 2 s at 20×20 Expert
  and about 2 s at 25×30. The tests re-prove 9×9 ladder boards with the
  exhaustive count, and `lako-loop` checks every rung against brute force on
  small boards. Boards up to 8×8, and hex and triangle boards, are
  byte-identical to 1.2 (clue-share rating, exhaustive count).

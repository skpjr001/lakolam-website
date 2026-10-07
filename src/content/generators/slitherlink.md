---
title: "Slitherlink"
blurb: "Draw one closed loop, clued by how many edges each cell touches"
category: puzzle
version: "1.1.0"
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

- **Spec knobs:** `rows`, `cols` (square boards, 3–8), `fill` (share of the
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

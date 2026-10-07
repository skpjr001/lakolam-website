---
title: "Nurimaze"
blurb: "Nurimaze — shade whole regions so the white cells form a tree maze whose S-to-G route passes every circle and no triangle"
category: puzzle
version: "1.0.0"
---
Paint whole rooms black until the white cells become a maze — one with a
single path from S to G that calls at every circle and skips every triangle.

## What it is

A square grid divided into regions by thick lines. A few cells hold an S, a
G, a circle or a triangle. Shade some regions completely so that the white
cells left over form a maze: corridors one cell wide that all join up,
never loop back on themselves, and lead from S to G past every circle while
avoiding every triangle.

## How to play

Shade some regions black. A region is always shaded as a whole or left
white as a whole — never split. Cells with S, G, a circle or a triangle are
never shaded.

- No 2×2 block of cells may be all black, and no 2×2 block may be all
  white.
- All the white cells must join up into one area, travelling up, down, left
  and right.
- The white cells must never form a loop: there is only ever one way
  between two white cells.
- The path from S to G through the white cells must pass through every
  circle and through no triangle.

Good places to start: any region with a mark in it is white. A region that
would let the white cells go round in a circle must be black, and so must
any region that would complete a white 2×2 square. Where four cells could
become an all-black square, one of their regions has to stay white. Then
follow the route: a triangle can never be on the way from S to G, so if the
only way past it goes through it, look for another corridor.

## Purpose

A shading puzzle that builds a maze: it combines the "whole regions"
logic of Nurikabe-style puzzles with route-finding. The no-loop rule makes
every new white region a careful choice, and the circles and triangles give
the maze a story — the one way through it.

## History

Nurimaze (ぬりめいず, "paint maze") is a Nikoli genre that first appeared in
the magazine *Puzzle Communication Nikoli* in the 2000s. Its rules are given
in English and German at Otto Janko's puzzle collection (janko.at), and it is
playable online in collections such as puzz.link.

## This implementation

- **Spec knobs:** `size` (6–10; 0 picks from the difficulty — 6, 7, 8, 8, 10
  from Kids to Expert; other values are clamped), `difficulty`, `cell`
  (18–90 pt), `line` (0.2–4 pt).
- **Generation:** a random maximal tree of white cells is grown corridor by
  corridor (a cell joins only where it touches the tree at exactly one edge,
  so no loop or white 2×2 can form); a tree that leaves a black 2×2 is
  refused. S sits at a random dead end and G at a dead end far from it. Each
  colour is cut into small regions, and every black region that touches the
  white cells at fewer than two edges is merged into a black neighbour — so
  whitening any black region would close a loop. Every white cell is marked
  (circles on the route, triangles off it), which makes the shading unique;
  marks are then removed, triangles first, while the ladder still settles
  every cell at the band's rung.
- **Solving:** a ladder on one yes/no variable per cell — *local* (marked
  cells are white, a region is one colour, no 2×2 of one colour), *tree*
  (the white cells hang together, with chokepoints found by cut vertices; a
  region whose whitening would close a loop is black), *route* (G must be
  reachable from S without a triangle, every circle from S without passing G
  and from G without passing S, and once S and G are joined the route is
  checked outright; narrowed by trying each cell both ways) and *trial*
  (assume a value, propagate, keep the opposite on a contradiction).
- **Guarantees:** deterministic per seed; exactly one shading, proven because
  the sound ladder settles every cell, confirmed by a capped exhaustive count,
  and re-proven in tests by an independent search over region colourings
  checked against the rules as written. Rated by the hardest rung needed with
  size as the tie-break (local or tree: Kids up to 6×6, else Easy; route:
  Medium up to 8×8, else Hard; trial: Hard up to 8×8, else Expert). Every
  band is reached at its default size. With a custom `size` some bands
  cannot exist — Expert needs 9×9 or more, Medium at most 8×8, Kids exactly
  6×6 and Easy at least 7×7 — and the nearest band is served and labelled honestly.

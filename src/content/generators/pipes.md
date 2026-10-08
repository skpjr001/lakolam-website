---
title: "Pipes"
blurb: "Pipes (Net) — turn every scrambled pipe tile so the whole board joins into one network with no loops"
category: puzzle
version: "1.0.0"
---
Every tile has been knocked askew: turn them back so the pipes join into one
network, with no loose ends and no loops.

## What it is

A square board of pipe tiles — ends, straights, bends and T-pieces — each
shown turned the wrong way. Beside it is an empty board of the same size.
The task is to redraw every tile on the empty board, turned by a quarter,
half or three-quarter turn (or not at all), so that all the pipes fit
together into a single network that reaches every tile. Shaded tiles, when
there are any, are already the right way round.

## How to play

Draw each tile on the empty board in the same square, turned any way you
like. You may not change its shape: an end stays an end, a bend stays a
bend.

- Every pipe end must meet a pipe end of the neighbouring tile — no pipe
  may lead into a wall between two tiles.
- No pipe may point off the edge of the board.
- All the tiles must join up into one network.
- The network has no loops: there is only one way along the pipes from any
  tile to any other.
- Shaded tiles are fixed: copy them as they are.

Good places to start: a tile in a corner or on the edge has fewer ways to
turn, because no pipe may point outwards. A straight on the edge must run
along it. Two ends next to each other can never point at each other, or
they would make a little network of their own. And a pipe that would close
a loop must turn away.

## Purpose

Pipes is a calm, visual logic puzzle: no numbers, only shapes. It builds
spatial reasoning — imagining a shape turned in place — and the habit of
working inwards from the edges where choices are few. The no-loops,
all-joined rule introduces the idea of a tree, a structure found everywhere
from family trees to road and water networks.

## History

The puzzle is best known from computer games: NetWalk, Simon Tatham's "Net"
in his Portable Puzzle Collection, and phone apps such as Infinity Loop.
Tatham's version generates every board with a unique answer, and the same
idea works on paper: you redraw each tile on an empty grid, the way other
"turn the pieces" puzzles are solved in print.

## This implementation

- **Spec knobs:** `size` (3–12; 0 picks from the difficulty — 4, 5, 6, 7, 9
  from Kids to Expert), `difficulty`, `cell` (tile size, 18–90 pt), `line`
  (0.2–4 pt). Out-of-range numbers are clamped and the value asked for is
  reported in meta (`requested_size`, `requested_cell`, `requested_line`).
- **Generation:** a random spanning tree of the grid with no tile of more
  than three pipe ends (random edge order, joining pieces while the cap
  allows). It is reshaped by edge swaps near the trouble — one tree link
  removed, another that rejoins the two halves added — keeping the swap that
  leaves the fewest links unsettled (and, above the easiest rung, preferring
  boards that need the band's rung), until the deduction ladder settles
  every link from the tile shapes alone. If the swaps stall, tiles are fixed
  in place one at a time (the best of a sample each time) until the board
  settles, then unfixed where not needed. Every loose tile is then shown
  turned a random number of quarter turns.
- **Solving:** a ladder on yes/no variables, one per link between
  neighbouring tiles. *Local*: each tile's links are a turn of its shape and
  none points off the board. *Network*: a link between two tiles already
  joined would close a loop, so it is ruled out; every tile must still be
  reachable; and a link every remaining way round depends on (a bridge) is
  forced. *Trial*: assume a link, keep the opposite on a contradiction.
- **Guarantees:** deterministic per seed; exactly one network, proven
  because the sound ladder settles every link (`uniqueness_proof`),
  confirmed by a capped exhaustive count when cheap (`count_confirmed`), and
  re-proven in tests by an independent search over the tiles' turns in
  reading order. Rated by the hardest rung needed with size as the
  tie-break (local: Kids up to 4×4, else Easy; network: Easy up to 5×5,
  else Medium; trial: Hard up to 8×8, else Expert). Every band is reached at
  its default size. With a custom `size` the label states the band actually
  reached and `requested_difficulty` records the request: Kids from 5×5 up
  is Easy, Medium up to 5×5 is Easy, Expert up to 8×8 is Hard, Hard from
  9×9 up is Expert, a 3×3 board is always Kids, and on 4×4 and 6×6 Hard and
  Expert sometimes come out easier (small boards rarely need the trial
  rung).

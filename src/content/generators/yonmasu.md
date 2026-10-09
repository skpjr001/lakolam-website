---
title: "Yonmasu"
blurb: "Yonmasu — cut the white cells into tetrominoes, each holding exactly one circle"
category: puzzle
version: "1.0.0"
---
Cut the grid into four-cell pieces, one circle in each.

## What it is

A square grid with a few black cells and some circled cells. All the white
cells are to be divided into tetrominoes — pieces of four cells joined side
by side, like the pieces of a falling-blocks game — so that every piece
holds exactly one circle.

## How to play

- Draw lines along the grid to divide all the white cells into pieces of
  exactly four cells joined side by side. Any shape of four cells is
  allowed, turned or flipped.
- Every piece holds exactly one circle.
- Black cells belong to no piece.
- There is exactly one solution.

Good places to start: a white cell in a corner or hemmed in by black cells
can reach only a few circles. A circle whose neighbourhood is cramped has
few ways to form its piece — cells that every one of those ways uses belong
to that circle. A piece can never hold two circles, so the cells between
two close circles must be shared out between them.

## Purpose

A spatial partition puzzle with no numbers at all. It trains seeing
shapes, counting to four and reasoning about which piece can reach which
cell — friendly for younger solvers on small grids, and tricky on large
ones.

## History

Yonmasu ("four squares" in Japanese) was published by Inaba in 2012; Otto
Janko's online collection has more than a hundred of them, from 6×6 up to
10×10.

## This implementation

- **Spec knobs:** `size` (5–10; 0 picks from the difficulty — 6, 7, 8, 9,
  10 from Kids to Expert), `difficulty`, `cell` (18–90 pt), `line` (0.2–4
  pt). Out-of-range numbers are clamped and the requested value is
  reported in the metadata.
- **Generation:** answer first. A backtracking cover tiles the grid: the
  first open cell in reading order takes a random tetromino whose first
  cell it is, or turns black (more readily while a budget of about one cell
  in seven lasts). One circle goes into a random cell of each piece; then
  the layout is hill-climbed — a circle moves to another cell of its piece,
  or a piece and a neighbour are cut into two other tetrominoes with fresh
  circles — keeping a move when the ladder (at the band's rung) leaves no
  more possible pieces unsettled, until it settles every one.
- **Solving:** a ladder on one yes/no variable per possible piece (a
  tetromino on white cells holding exactly one circle). *Basic*: every
  white cell lies in exactly one piece, and a piece that would overlap
  every remaining way to cover some other cell is ruled out. *Trial*:
  assume a piece, follow the consequences, keep the opposite on a
  contradiction.
- **Guarantees:** deterministic per seed; exactly one cut, proven because
  the sound ladder settles every possible piece (meta `uniqueness_proof`),
  with a capped exhaustive count confirming it when cheap
  (`count_confirmed`), and re-proven in tests by an independent search that
  grows pieces cell by cell from the first uncovered cell and shares no
  code with the ladder. Rated by the hardest rung needed with size as the
  tie-break (basic: Kids up to 6×6, Easy at 7×7, Medium at 8×8, Hard at
  9×9, Expert at 10×10; trial: Hard up to 7×7, else Expert). The generator
  aims every band at the basic rung — trial rarely settles what basic
  leaves open — so the bands follow size. Every band is served at its
  default size; with a custom `size` the label states the band reached.

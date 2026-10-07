---
title: "Chess Maze"
blurb: "Chess maze — move one white piece to the star in the fewest moves, never stopping where a black piece attacks"
category: maze
version: "1.0.0"
---
One white chess piece, a star to reach, and black pieces whose every attacked
square is a pit: find the shortest safe way through.

## What it is

A maze drawn on a chessboard. There are no walls; the walls are the squares
the black pieces attack, and they are invisible — you work them out from how
each black piece moves. Your white piece moves exactly as it does in chess,
and the page tells you how many moves the shortest safe route takes. There
is exactly one route that short.

## How to play

1. Your piece is the white one. Get it to the star in the number of moves
   printed at the top.
2. Move it as in chess: a rook any distance up, down, left or right; a
   bishop any distance diagonally; a queen either way; a king one square in
   any direction; a knight in an L — two squares one way and one to the
   side, jumping over anything.
3. Never **stop** on a square that a black piece attacks. Passing over an
   attacked square on the way is fine; only where you stop counts.
4. Never capture, and never move through a black piece (only the knight
   jumps). The black pieces never move.
5. Black pawns attack the two squares diagonally in front of them — down the
   page, toward rank 1.

Tip: before you move, mark every attacked square with a small cross. What is
left is the maze.

## Purpose

It trains the core skill of chess — seeing at a glance which squares each
piece controls — without needing an opponent or even knowing the full rules.
Beginners learn how each piece moves and attacks; stronger players get a
visualisation workout, especially with the knight, whose paths are hardest
to see. It also rewards planning: the shortest route is rarely the obvious
one.

## History

Chess mazes were popularised by the chess teacher and author Bruce Alberston,
whose *Chess Mazes* (2004) and *Chess Mazes 2* (2008) became favourites of
chess clubs and school chess programmes. Alberston's rule is the one used
here: the white piece may not move to any square attacked by the black
pieces, and may not capture.

## This implementation

- **Spec knobs:** `difficulty` (Kids: a rook in 2–3 moves; Easy: a bishop
  in 4–5; Medium: a queen in 5–7; Hard: a knight in 6–7; Expert: a knight in
  8 or more), `piece` (unset = the level's; `king`, `rook`, `bishop`,
  `queen`, `knight` — the move band then comes from the level and the
  piece), `size` (0 = an 8×8 board; otherwise 5–10), `coordinates` (file
  letters and rank numbers, on by default), `width`, `height`, `line`.
- **Generation:** the white piece starts on one of the two bottom ranks and
  the star sits in the top half (for a bishop, on the same colour). Black
  pieces — pawns, knights, bishops and rooks, at most one queen and one
  king, no pawn on the first or last rank — are placed, removed, swapped and
  moved by local search. Each candidate is scored by a breadth-first search
  from the white piece that counts the shortest routes to the star; the
  search drives that count to one, the length into the band and the number
  of black pieces into the level's range, then polishes for more reachable
  squares (more wrong turns).
- **Solving:** a square is attacked if a black piece could capture there,
  with line pieces blocked by other black pieces. The white piece's legal
  moves are its chess moves that stop on an empty, unattacked square.
  Because the page prints the move count, "one shortest route" is "one
  answer".
- **Guarantees:** exactly one route to the star in the fewest moves, never
  stopping on an attacked square (`unique: true`), re-proved in tests
  without the generator's search — a distance-to-star table by fixpoint
  iteration, then a depth-first count of routes of that length capped at 2 —
  and every stop is re-checked against an attack test written separately
  from the rules of chess. Rated by moves weighted by the piece (a knight's
  move counts 1.5, a queen's 1.2, a rook's or bishop's 1, a king's 0.8;
  under 4 Kids, 6 Easy, 8.5 Medium, 11 Hard, more Expert —
  `rating_basis: moves_weighted_by_piece`). Some piece-and-level pairs
  cannot reach their band (a queen crosses the board in a few moves, so a
  queen at Easy, Hard or Expert often lands a band lower); the
  nearest maze is served with its honest rating. The key marks every
  attacked square with a cross and draws the route as numbered red arrows.

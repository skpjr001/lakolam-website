---
title: "Block Fit"
blurb: "Block fit — place the given pieces so full lines clear and the board ends empty"
category: puzzle
version: "1.0.0"
---
Fit every piece onto the board so the full lines clear and nothing is left.

## What it is

A square board, partly filled with blocks, and a short list of pieces made
of squares. Each piece goes onto empty squares of the board. Whenever a row
or a column becomes completely full, it clears at once and its squares are
empty again; one piece can clear several lines together. The puzzle: place
every piece, in any order you like, so that the board is completely empty
after the last one.

## How to play

Pieces go on exactly as drawn — no turning — unless the page says they may
be turned. Look for the rows and columns that are nearly full: a gap of
three in a row is a job for a three-square piece. Every block on the board
has to be cleared by its row or its column filling up, so a block far from
any nearly full line tells you where pieces must go. Order matters: a line
that clears early can open the space another piece needs, or break up a
line you still wanted to fill. Cut out the pieces along their outlines and
try them on the board, or draw them in pencil. The answer page shows the
solution, placed piece by piece.

## Purpose

A spatial planning puzzle in the style of the popular block-placing games,
but with a definite end and a single answer. Small boards with two pieces
suit children; six pieces on a crowded board make a real puzzle for adults.

## History

Block-placing games descend from Tetris (1984), whose falling pieces clear
completed rows. Later games dropped the falling and the time pressure: the
player drags given pieces onto an 8×8 or 10×10 board, and full rows and
columns clear. Endless versions are games of chance; the puzzle versions
give a fixed board and pieces with a target, as here: clear it all.

## This implementation

- **Spec knobs:** `difficulty` (pieces to place: kids 2, easy 3, medium 4,
  hard 5, expert 6), `size` (board side 6–10; values outside are clamped and
  recorded as `requested_size`), `rotate` (pieces may be turned a quarter at
  a time, never flipped), `cutouts` (pieces at board size with cutting
  outlines, or small pieces in a tray).
- **Generation:** backwards from the empty board. Each reverse step takes a
  piece off: either a piece whose placing cleared one or two lines (the
  lines are filled back in, minus the piece's squares) or one that cleared
  nothing; the board before every step must have no full line and the piece
  must clear exactly the chosen lines. Pieces come from 15 shapes (single,
  bars of 2–5, squares 2×2 and 3×3, a 2×3 block, small and big corners, L,
  J, T, S, Z) in every orientation. The board reached is the puzzle, kept
  when 6–60% of it is filled; replaying the steps forwards clears it. Up to
  40 plans are tried; the first with a unique solution is kept.
- **Solving:** an exhaustive memoised search over (board, pieces left) tries
  every piece at every legal spot in every order. Two pruning rules, both
  sound: every filled square must lie on a row or column whose empty squares
  the remaining pieces can still fill, and some set of lines covering every
  filled square must have no more empty squares in total than the remaining
  pieces have squares. Solutions are counted as distinct placements (each
  piece's squares, whatever the order; identical pieces swapped count once),
  capped at 2.
- **Guarantees:** deterministic per seed. Every puzzle is solvable by
  construction and the answer key is replayed piece by piece before the page
  is returned (`solvable`, `answers_checked`); `unique` is true only when
  the capped count proved one solution (all bands in testing). Difficulty
  is the number of pieces (`rating_basis: "pieces to place"`), every band
  served as asked; meta also gives the fill and the lines cleared. The key
  shows the board before each piece, the piece in place and the lines it
  clears. Tests re-count solutions with an independent search written from
  the rules.

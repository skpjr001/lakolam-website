---
title: "Square Jam"
blurb: "Square Jam — divide the grid into squares; numbers give their sides, and no four squares share a corner"
category: puzzle
version: "1.0.0"
---
Cut the grid into squares — the numbers tell you how big, and no four
squares may meet at one corner.

## What it is

A square grid with a few numbers in it. The whole grid must be divided
into squares along the grid lines: 1×1, 2×2, 3×3 and so on. A number gives
the side length of the square it lies in. Not every square has a number
(and a square may hold more than one), and squares without numbers can be
any size.

## How to play

Draw lines along the grid to divide every cell into squares.

- Every cell belongs to exactly one square.
- A number tells you the side of its square: a 3 lies in a 3×3 square, a
  1 is a single cell on its own.
- No point of the grid may be a corner of four different squares. Where
  borders cross, at most three squares come together, so the lines make a
  T, never a plus sign.

Good places to start: a number that only fits one way near the edge or
next to another number. Then use the corner rule: around every point
inside the grid, at least two of the four cells must share a square. So
four single cells in a 2×2 block are never allowed, and a big square often
has to stretch past a corner to stop four squares meeting there.

## Purpose

A tidy spatial puzzle about fitting and packing: it builds a feel for
area and side length (a 3 covers nine cells) and rewards looking at the
corners where shapes meet. The finished grid is a pleasing patchwork of
squares.

## History

Square Jam is a modern pencil puzzle from the world of puzzle
championships, found in World Puzzle Federation Grand Prix rounds and in
competition sets. It is a sibling of Nikoli's Shikaku, which cuts the grid
into rectangles; here every piece must be a perfect square, and the
four-corner rule replaces Shikaku's one-number-per-piece rule.

## This implementation

- **Spec knobs:** `size` (5–12; 0 picks from the difficulty — 5, 6, 7, 8,
  10 from Kids to Expert), `max_side` (largest square in the answer, 2–6
  and below the grid's side; 0 picks 3, 3, 4, 4, 5 from Kids to Expert),
  `difficulty`, `cell` (14–100 pt), `line` (0.2–4 pt). Out-of-range numbers
  are clamped. `max_side` shapes the answer only; the solver never assumes
  it, so a solver may consider any size. A side too small to tile the grid
  quickly (1×1s and 2×2s jam easily under the corner rule) is raised, and
  the side used is recorded beside `requested_max_side`.
- **Generation:** a random tiling by squares (larger sides tried first
  more often) is built by backtracking under the four-corner rule. While
  the deduction ladder leaves cells unsettled, the unnumbered square with
  the most unsettled cells gets its number in a random cell of it (when
  every such square is numbered, one takes a second number). Numbers
  are then erased in random order while the ladder, at the band's rung,
  still settles every cell. When the requested band cannot be reached,
  the nearest band found is served and labelled honestly.
- **Solving:** one yes/no variable per possible square of any size. The
  ladder: *Cover* — every cell lies in exactly one square, and a square
  holding a number other than its side is out; *Four corners* — when three
  of the cells around a point lie in squares cornered there, every square
  that would corner the fourth cell there too is out; *Trial* — assume a
  square, propagate, drop it on a contradiction. Rated by the hardest rung needed, size as
  tie-break: cover only is Kids up to 5×5, Easy at 6×6 and Medium above,
  the four-corner rule is Medium, trial is Hard (Expert from 9×9).
- **Guarantees:** deterministic per seed; exactly one tiling, proven
  because the sound ladder settles every square and confirmed by a capped
  exhaustive count (cap 2; a spent budget discards the board); re-proven in
  tests by an independent search over tilings that knows only the rules.
  Meta records `unique`, `difficulty`, `requested_difficulty`,
  `rating_basis`, `hardest_technique`, the grid, squares, numbers and
  `max_side`.

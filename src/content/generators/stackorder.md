---
title: "Stacking Order"
blurb: "Stacking Order — number the overlapping sticks, strips or cards in the order they were laid"
category: puzzle
version: "1.0.0"
---
A pile of sticks, strips or cards: work out the order they were laid down.

## What it is

Pieces were dropped one at a time onto a table, each landing on top of
whatever it touched. Every piece carries a letter. Where two pieces cross,
the one on top was laid later. The pile was built so that the picture allows
exactly one order, bottom piece first.

## How to play

Write the letters in the boxes in the order the pieces were laid: the bottom
piece in box 1, the top piece in the last box.

- **Look at each crossing.** The piece whose outline runs unbroken across the
  other one is on top; the piece that disappears under it is below.
- **Start from the top.** Find the piece that nothing lies on: it was laid
  last. Imagine lifting it away and find the next piece with nothing on it.
  Fill the boxes from the last one backwards.
- **Or start from the bottom.** The first piece lies on nothing — every
  piece that touches it is on top of it.
- Every piece lies on the one laid just before it, so there is never a
  choice: if two pieces seem free at the same time, look again at their
  crossings.

## Purpose

A gentle visual-logic puzzle about layers: reading which edge is in front,
building a chain of "this lies on that", and putting it in order. Small piles
suit young children; large piles of sticks are a real untangling job.

## History

Pick-up sticks (spillikins, mikado) has been played for centuries; working
out the order of overlapping shapes is a classic of picture puzzle books and
of many screen games about stacked paper, sticks and stamps.

## This implementation

- **Spec knobs:** `difficulty`; `pieces` (3-16, empty for the band's,
  clamped and reported as `requested_pieces`); `kind` — `sticks` (round
  ends, the default), `strips` (wider paper strips) or `cards`; `board`
  (side of the pile area, 200-900 pt), `line`.
- **Bands** (`rating_basis: pieces_and_crossings`), the highest band whose
  pieces and visible crossings the pile has: Kids 4 pieces; Easy 6 pieces
  and 6 crossings; Medium 8 and 10; Hard 10 and 14; Expert 13 and 20. A pile
  that misses the band's crossings (300 tries) is served in the band it
  reaches with `requested_difficulty`. Over seeds 0-19 every band is served
  as asked for all three kinds; sticks cross most (Expert about 40-54
  crossings), cards least (Expert 20-26).
- **Generation:** each piece is dropped through a random point of the one
  before it, at a clear angle, inside the board. After each drop the pile is
  rasterised (256 × 256 samples of the board) and the drop is kept only if
  every link of the chain so far is still visible and every piece it touches
  still has room for its label (up to 24 drops tried per piece). The finished
  pile is moved to the middle of the board by whole pixels.
- **Solving / visibility:** the picture is read from the raster alone. An
  overlap counts as *decided* when at least 6 pixel steps show the upper
  piece's edge cutting across the lower one: the lower piece seen on one
  side, the upper piece seen on the other, over a pixel the lower one also
  covers. Each piece must visibly lie on the one before it, and Kahn's
  algorithm over the decided overlaps must find exactly one piece free at
  every step — one topological order. Labels sit at the point of each
  piece's visible part farthest from anything else (3-4 chamfer distance)
  and the whole label disc is on that piece.
- **Guarantees:** deterministic per seed; `unique: true`, `proof:
  rasterised_relations_single_topological_order`. `obeys()` re-rasterises
  in the stated order and re-checks the relations, the chain and the single
  order; the tests count linear extensions with a plain permutation search
  (cap 2), check that every decided overlap is a real overlap of later on
  earlier, and that every label disc lies on its own piece.
- **Meta:** `pieces`, `crossings` (decided overlaps), `kind`, `answer` (the
  letters bottom first).
- **Play API** (`lako_stackorder::play`): `puzzle` / `puzzle_from` (pieces
  as rounded rectangles on the unit board, `draw_order`, label spots,
  `lies_on` pairs); `check(puzzle, guess)` → legal, leading places right,
  solved, and the first contradicted pair; `covering(puzzle, removed,
  piece)`; `hint(puzzle, removed)` → `TakeOff { piece, rule: "nothing on top"
  }`, the next piece to lift off the top, or `Undo { keep }` after a wrong
  removal.

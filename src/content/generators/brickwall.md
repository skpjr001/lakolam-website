---
title: "Brick Wall"
blurb: "Brick Wall — a Latin square laid as a brick wall: every brick holds one odd and one even number"
category: puzzle
version: "1.0.0"
---
A number square laid like a brick wall: every brick holds one odd and one
even number.

## What it is

A square grid drawn as a wall of bricks, each brick two squares long, with
every other row shifted by half a brick. A few numbers are given. Fill the
rest so the rules below hold; there is exactly one way.

## How to play

- On a grid of side 6, use the numbers 1 to 6 (on side 8, 1 to 8, and so on).
- Each row and each column holds every number exactly once.
- Every brick holds one odd number and one even number.
- In the shifted rows, the half brick at the left end and the half brick at
  the right end together count as one brick: one of them is odd and the
  other even.

When one square of a brick is known, its partner's parity is known too: next
to a 3 only 2, 4 or 6 can go. Combine that with the numbers already in the row
and column to find squares with a single possibility.

## Purpose

A gentle twist on the Latin square: the odd-even rule gives every brick a
small clue of its own, so beginners have something to hold on to while larger
walls still need pairs and X-Wings.

## History

Brick Wall (German *Ziegelmauer*) is a modern pencil puzzle from the German
puzzle scene, with some two hundred examples in Otto Janko's collection,
mostly on 6×6 and 8×8 walls, and its own genre tag on the Logic Masters
Deutschland puzzle portal.

## This implementation

- **Spec knobs:** `difficulty`, `size` (0 = by level: Kids 4, Easy and
  Medium 6, Hard and Expert 8; otherwise 4, 6 or 8, an odd side rounded
  down), `cell`, `line`.
- **Generation:** answer-first. A random square that obeys the brick rule is
  built by randomised backtracking (restarted when a branch runs long), then
  given numbers are removed one at a time while the technique ladder at the
  requested ceiling still finishes the board. Up to 24 boards are tried for
  one rated in the requested band.
- **Solving:** the shared constraint engine — all-different per row and
  column with X-Wing and Swordfish (sound on a Latin square), and one parity
  rule per brick that gives the partner the other parity once a square's
  parity is settled (reading the brick, the Easy band).
- **Guarantees:** deterministic per seed; the ladder settles every square by
  sound deduction, which proves the answer unique, and the engine's capped
  count agrees. Tests re-prove uniqueness with an independent depth-first
  count and check every rule from the numbers alone. Rated by the hardest
  technique the solve needed (`rating_basis: technique_ladder`). Kids boards
  fall to naked singles alone. **Expert is not reached**: the wall's parity
  clues settle boards before Swordfish-level reasoning is ever needed, so
  Expert requests are served at Hard and meta records
  `requested_difficulty`.

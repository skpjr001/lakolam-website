---
title: "Pips"
blurb: "Pips - lay the given dominoes on the board so every coloured region meets its condition"
category: puzzle
version: "1.0.0"
---
Lay the given dominoes on the board so every coloured region meets its
condition.

## What it is

An irregular board of squares and, beside it, a set of dominoes, each with 0
to 6 pips on its two halves. The dominoes cover the board exactly, each used
once, lying either across or up and down. Some squares are grouped into
coloured regions, and a small badge on each region gives its condition:

- a number: the pips in the region add up to exactly that number;
- `<N` or `>N`: the pips in the region add up to less than, or more than, N;
- `=`: every half in the region shows the same number;
- a crossed `=`: no two halves in the region show the same number.

White squares have no condition. There is exactly one way to lay the dominoes.

## How to play

Start with the tight spots: a single-square region with a number tells you
exactly which half lands there, and a square with only one free neighbour
must share a domino with it. A `<1` region can only hold blanks, a region
adding to 0 is all blanks, and a large total in a small region needs the
heavy halves (a two-square region adding to 12 takes 6 and 6). Count which
dominoes carry the numbers you need: if only one domino in the set has a 5,
that domino goes where a 5 must be, and its other half then fixes the square
next door. Cross each domino off the set as you place it, and remember a
domino can lie either way round.

## Purpose

A domino puzzle with a different engine from `dominosa`: there the numbers are
printed and you find the dominoes; here the dominoes are printed and you find
the numbers. Arithmetic, matching and tiling all pull on the same cells, which
suits small daily boards and larger weekend ones alike.

## History

Pips was launched by The New York Times Games in August 2025 as a daily puzzle
with easy, medium and hard boards. Domino-placement puzzles with region
conditions go back further, but Pips made the region-and-badge format popular.

## This implementation

- **Spec knobs:** `difficulty`, `color` (false prints the regions in greys),
  `cell`, `line`.
- **Generation:** the board grows one domino at a time, each touching what is
  already there (a gentle bias favours snug placements), and that growth order
  is the hidden tiling. Distinct dominoes from a double-six set are dealt onto
  it, each a random way round. The board is cut into small connected regions
  that never hold both halves of a non-double domino (such a domino could be
  turned round unnoticed), and every region starts with its exact sum. Where
  two layouts still fit, a cell on which they disagree gets a one-square sum
  of its own until only one layout remains. From Medium up, neighbouring sums
  are then merged into larger regions, and finally conditions are dropped or
  loosened (to `=`, the crossed `=`, and from Medium up to `<N` / `>N`) while
  the layout stays forced. Kids and Easy loosen only a quarter / under half of
  their regions and keep exact sums otherwise.
- **Solving:** the generator counts layouts with a most-constrained-cell
  search (the open square with the fewest legal domino placements first) and
  incremental region tallies that prune on partial sums and on equal /
  different conflicts, capped at two solutions and a 60,000-node budget. The
  independent check branches on whichever is scarcer, the unplaced domino or
  the open square with the fewest placements, re-checks regions from scratch
  and rejects stranded squares.
- **Guarantees:** deterministic per seed; exactly one layout, counting both
  where each domino lies and which way round, proven by a search that
  finished (running out of budget counts as ambiguous, never as unique), and
  confirmed by the independent counter. Rated by board size: Kids 4 dominoes,
  Easy 6, Medium 9, Hard 12, Expert 15, with Medium and above also merging and
  loosening conditions.

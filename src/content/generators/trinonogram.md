---
title: "Triangle Nonogram"
blurb: "Picture logic on triangular (or hexagonal) cells, with run clues along three directions"
category: puzzle
version: "1.0.0"
---
Picture logic on a triangle of triangles: shade cells so every line in all
three directions matches its clue, and a picture appears.

## What it is

A big triangle cut into small triangles (or, in hex mode, a big hexagon of
hexagonal cells). The cells line up in three directions instead of two: the
rows, and two families of slanting strips. Each line has a clue printed at
one end — the lengths of the runs of shaded cells along it, in order. A
strip of triangles zig-zags, alternating point-up and point-down cells, and
a run is any unbroken stretch of shaded cells along it.

## How to play

Shade cells so that every line's runs match its clue. Read a clue from the
outside in: the number farthest from the board is the run nearest that end
of the line, and between two runs there is at least one blank cell. A `0`
means the whole line is blank.

The rows are clued on the left edge, the strips leaning one way on the right
edge (or at the top right in hex mode), and the strips leaning the other way
along the bottom (bottom right in hex mode). Follow a clue's slant into the
board to find its line.

The moves, from first to last:

- **Overlap.** Slide a run as far toward one end as it can go, then the
  other: cells it covers both times are shaded. Cells no run can reach are
  blank.
- **Edges and glue.** A shaded cell near the end of a line, or next to a
  blank, pins its run in place.
- **The whole line.** Check every way the line's numbers can still fit what
  you know; a cell that is the same in all of them is fixed.
- **Try a cell.** On harder puzzles, suppose a cell is shaded and follow what
  it forces in the three lines through it and the lines those cross. If a
  line becomes impossible, the cell was blank. The hardest puzzles need the
  supposition followed across the whole board.

Every cell sits on three lines, so each cell you fix feeds three other
clues. Mark blanks with a dot: they help as much as shaded cells.

## Purpose

A fresh shape for a well-loved puzzle: the same line logic as a square
nonogram, but with three directions to cross-check instead of two, and
pictures with diagonals that a square grid cannot draw cleanly.

## History

Nonograms were invented in Japan in the late 1980s (Non Ishida, Tetsuya
Nishio). Triangular and hexagonal variants followed in puzzle magazines and
online collections in the 2000s, where solvers soon found that a third
direction of clues changes the feel of the logic: shorter lines, more
crossings, more ways for one deduction to spread.

## This implementation

- **Spec knobs:** `mode` (`triangle` or `hex`), `size` (board side: triangle
  4–16, hex 3–9; unset sizes by band — triangle 5/7/9/11/13 and hex
  3/4/5/6/7 from kids to expert), `picture` (twelve built-in pictures, or
  `auto` by seed), `difficulty`, `cell`, `line`.
- **Generation:** the picture (simple shapes in a unit square) is sampled at
  every cell centre, scaled and shifted a little differently on each of ten
  attempts. The clues are derived and solved by the ladder up to the band's
  ceiling (kids: overlap only; easy: edge and glue; medium: full line;
  hard: short probes; expert: deep probes); where it stalls, the generator
  flips the unsolved cell (ragged outline cells first, four tried at a
  time) that most helps the solve, up to a sixth of the board. The first
  attempt rated at the band with few edits is kept; otherwise the closest
  one, with the request reported as `requested_difficulty`.
- **Solving:** a three-family line ladder — overlap, edge and glue, full
  single-line reasoning (the square nonogram's line solver), short probes
  (two generations of full-line reasoning from a supposed cell) and deep
  probes (followed to a fixpoint).
- **Rating:** by size and technique (`rating_basis:
  "size_and_hardest_rung"`): the band is the larger of the size band
  (`size_band`: triangle side 5/7/9/11/13, hex side 3/4/5/6/7 open kids to
  expert) and the band of the hardest rung the solve used
  (`technique_band`, `hardest_technique`, with `technique_uses` per rung).
  Measured: the built-in pictures, being solid shapes, solve by overlap and
  edge-and-glue reasoning at every size — three crossing directions and
  short lines give the quick rules a lot to work with — so the harder bands
  are harder by size (a kids board has 25 cells, an expert triangle 169)
  rather than by deeper technique. A board needing the full-line or probing
  rungs is still rated by them.
- **Guarantees:** every page is completed by the sound ladder from the
  printed clues alone, so it has exactly one solution (`unique: true`); the
  answer key is that solution. `edited_cells` reports how many cells differ
  from the drawn picture. Tests re-prove uniqueness on small boards with an
  independent exhaustive count.

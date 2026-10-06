---
title: "Tangle"
blurb: "Tangle — follow each crossing line from its letter to its number"
category: maze
version: "1.1.0"
---
Which line leads where? Follow each tangled line from its letter to its
number.

## What it is

Lettered circles down the left of the page are joined to numbered squares
down the right by smooth lines that swoop, cross and recross one another.
Every letter has exactly one line, and every line arrives at exactly one
number. The puzzle is to find out which.

## How to play

Put your finger (or the tip of a pencil) on a letter and follow its line
across the page. Where two lines cross, keep going straight through the
crossing — a line never turns sharply or doubles back, and it always keeps
moving from left to right. When you reach a number, write it in the box
under that letter. Then do the next letter. Lines that cross several times
are the tricky ones: go slowly, and if you lose your place, start that line
again. A coloured pencil per line makes a good check at the end.

## Purpose

A visual-tracking puzzle for the maze lane: young children practise
following a line by eye across busy crossings (the classic "tangled kites"
or "fishing lines" activity page), and the harder levels — ten lines and
dozens of crossings — are a genuine concentration test for older solvers.

## History

"Which string belongs to which kite?" and "whose fishing line caught which
fish?" puzzles have been staples of children's activity books and newspaper
kids' corners for a century. The same structure underlies Amidakuji, the
Japanese ladder lottery, where horizontal rungs swap lines between vertical
poles and the result is a permutation.

## This implementation

- **Spec knobs:** `difficulty` (Kids 3 lines, Easy 4, Medium 6, Hard 8,
  Expert 10, each with more swing and more crossings), `lines` (0 = the
  level's count, otherwise 2–12), `answer_boxes`, `width`, `height`, `line`.
- **Generation:** a seeded permutation with no fixed points pairs the starts
  with the ends. Each line is the graph of a function `y(x)`: a piecewise
  cubic Hermite curve with Catmull–Rom slopes through control heights at
  evenly spaced knots, flat at both ends, emitted as the exact cubic Bézier of
  each piece. Local search re-draws one interior control height of a line in
  trouble at a time, keeping any change that does not add violations, until
  every followability check passes and the crossing count lands in the
  level's range; failing that it restarts with a fresh permutation.
- **Solving:** none needed — each line is a function of `x`, so it reaches
  exactly one end, and the answer is the permutation.
- **Guarantees:** deterministic per seed. Every crossing is transversal, the
  two tangents at least 28° apart; no two crossing points lie within 17 pt
  (so no three lines meet at a point and crossings never pile up); wherever
  two lines approach without crossing, the gap across them stays at least
  10 pt (no tangencies or near misses); a pair that crosses twice swings at
  least 20 pt apart in between; no crossing sits in the flat lead-in at either
  end; and no line is steeper than 3:1. An independent check samples the
  emitted Bézier paths more finely, re-measures all of these, and recovers
  the permutation from the parity of each pair's crossings (odd exactly when
  the pair swaps order). Rated by lines and crossings per line — the lower of
  the two bands — recorded as `lines_and_crossings`; the answer key colours
  each line and fills in the boxes.
- **Version 1.1:** when the first 40 attempts find no followable tangle, a
  plot much taller than it is wide (a narrow or very tall page) is narrowed
  to a band 1.2 times as tall as it is wide, centred where it was, and tried
  again; if the level's crossing range is still out of reach (twelve lines
  held to Kids' few crossings each, say), any crossing count is accepted and
  the band is rated, as always, from the crossings actually drawn. Pages that
  generated before are unchanged. A page too short for its lines (Expert on
  a 396 pt page, 6 lines on 1224 × 396) still reports that no tangle fits.

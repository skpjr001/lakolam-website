---
title: "One Stroke"
blurb: "One stroke — draw each figure without lifting the pencil, or spot the impossible ones"
category: puzzle
version: "1.0.0"
---
Draw each figure without lifting your pencil or going over a line twice — or
spot the ones that cannot be done.

## What it is

A page of line figures drawn on a grid of dots: squares, triangles,
zig-zags and crossed boxes joined into one shape. Most can be traced in a
single continuous stroke that covers every line exactly once. A few cannot,
and the challenge is to tell which.

## How to play

Put your pencil on a dot and trace the figure, moving along the lines from
dot to dot. You may pass through a dot as often as you like, but you may
never go over the same line twice and you may never lift the pencil. If you
manage every line, the figure is done; if a figure cannot be done, mark it
with an X.

A secret that makes it easy: count the lines meeting at each dot. A dot with
an odd number of lines is an *odd point*. If a figure has no odd points you
can start anywhere and you will finish where you began. If it has exactly two,
you must start at one of them and finish at the other. If it has more than
two, it cannot be drawn in one stroke, however hard you try.

## Purpose

A kid-to-adult drawing puzzle that rewards experiment first and reasoning
second: young solvers trace and retry, older ones discover the odd-point rule
and turn it into a test that settles every figure at a glance. It adds a
graph-theory puzzle to the catalogue that is drawn rather than filled in.

## History

Tracing a figure in one stroke is an old pastime — the "envelope" and
similar figures were schoolyard challenges for generations. Leonhard Euler
settled the question in 1736 with the Seven Bridges of Königsberg, the
founding problem of graph theory: a connected figure can be drawn in one
stroke exactly when it has zero or two odd points. Carl Hierholzer published
the method for actually finding such a stroke in 1873.

## This implementation

- **Spec knobs:** `difficulty` (Kids tiny 2×2-cell figures of 6–10 lines,
  Easy 3×2 with 11–16, Medium 3×3 with 17–24, Hard 4×3 with 25–34, Expert
  5×4 with 35–60, diagonals and crossed cells becoming commoner as the level
  rises), `figures` (1–12; 0 = six, or four at Hard and Expert), `width`,
  `height`, `line`.
- **Generation:** each figure is a planar graph on a dot lattice — unit
  horizontal and vertical lines, at most one diagonal per cell, or a crossed
  cell whose two diagonals meet at a drawn centre dot, so lines only ever
  meet at dots. A random set of lines is chosen, then its parity repaired:
  pair an odd point with its nearest odd partner and toggle every line along
  a shortest lattice path between them (a symmetric difference that flips the
  parity of the two ends only), until the figure has the odd-point count it
  was meant to have — 0 or 2 for a possible figure, 4 to 6 for an impossible
  one. Figures that come out disconnected, outside the level's line-count
  window, or not spanning the lattice are redrawn. About one figure in five
  or six is impossible (at least one per page from Easy up; Kids pages have
  none or one).
- **Solving:** possible figures get a trail by Hierholzer's algorithm,
  starting at an odd point when there are two. The answer key numbers every
  line in drawing order with an arrow for the direction, circles the start and
  squares the end; impossible figures are crossed out with their odd points
  circled.
- **Guarantees:** deterministic per seed; every figure is connected; each
  possible figure has 0 or 2 odd points and a stored trail that is re-walked
  to use every line exactly once, starting at an odd point when there is one;
  each impossible figure has more than two odd points, so by Euler's theorem
  no stroke exists. The trail is one of many, but the possible/impossible
  verdict for every figure is unique — that verdict is what `unique` in the
  metadata asserts (also `verdict_unique`, `answers_checked`). Tests confirm
  every verdict on small figures with an exhaustive search for a stroke, an
  independent method. Rated by the average number of lines per figure
  (`lines_per_figure`), each band being exactly the window its level enforces.

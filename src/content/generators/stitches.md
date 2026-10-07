---
title: "Stitches"
blurb: "Stitches — sew every pair of neighbouring regions together; the edge numbers count stitched cells"
category: puzzle
version: "1.0.0"
---
Sew the patchwork together: one stitch across every border between two
pieces, and the numbers round the edge count the stitched cells.

## What it is

A square grid divided by thick lines into regions, like patches of a quilt,
with a number beside every row and above every column. Every two regions
that touch must be joined by exactly one stitch — a short line between the
centres of two side-by-side cells, one in each region. No cell holds more
than one stitch end, and the numbers say how many cells in each row and
column are stitched.

## How to play

Draw stitches: each stitch joins the centres of two cells that share a side
and lie in different regions.

- Every pair of regions that share a border is joined by exactly one
  stitch (in the two-stitch version, exactly two) — no more, no less.
- A cell can hold at most one stitch end.
- The number beside a row (or above a column) tells you how many of its
  cells hold a stitch end. A stitch lying along a row puts two ends in that
  row; a stitch crossing between rows puts one end in each.

Good places to start: two regions that share only one short stretch of
border have very few places for their stitch; a 0 rules out every stitch
end in its line. Once a cell holds a stitch end, no other stitch may use
it, which often pins down the neighbouring borders.

## Purpose

A gentle logic puzzle with a craft feel: the answer looks like a piece of
sewing. It practises bookkeeping across two kinds of clue at once — the
borders between regions and the totals along each line — and the habit of
looking for the most constrained place first.

## History

Stitches is a modern pencil puzzle whose inventor and first publication
are not recorded; it is known from puzzle competitions such as the World
Puzzle Federation's Grand Prix and from large online collections of
handmade examples, where it is sometimes set with two stitches per border.

## This implementation

- **Spec knobs:** `size` (5–10; 0 picks from the difficulty — 5, 6, 7, 7, 9
  from Kids to Expert), `difficulty`, `stitches` (per border, 1–2),
  `cell` (14–100 pt), `line` (0.2–4 pt). Out-of-range numbers are clamped.
- **Generation:** the grid is cut into random connected regions of about 3
  to `size + 1` cells (smaller leftovers join a neighbour; with two
  stitches per border, regions sharing fewer than three border edges are
  merged so both stitches fit). Every neighbouring pair is sewn at random by
  a backtracking search that never reuses a cell, and every row and column
  count is printed. When the deduction ladder cannot settle the board at
  the band's rung, the pairs it left open are re-sewn while the rest stay
  (up to 30 times) before the regions are cut afresh; for the Hard and
  Expert bands a board the easy rung already settles is re-sewn in a few
  random places to look for one that needs trial.
- **Solving:** a ladder on yes/no variables — one per border edge between
  two regions, one per cell (stitched or not). *Local*: each border's
  stitch count, a cell's flag equal to its stitch ends (at most one), and
  the row and column counts. *Trial*: assume a value, propagate, keep the
  opposite on a contradiction.
- **Guarantees:** deterministic per seed; exactly one sewing, proven because
  the sound ladder settles every variable (meta `uniqueness_proof`), with a
  capped exhaustive count confirming it when cheap (`count_confirmed`), and
  re-proven in tests by an independent search over the border edges that
  knows only the rules. Every row and column number is printed, as in the
  classic puzzle. Rated by the hardest rung needed with size as the
  tie-break (local: Kids at 5×5, Easy at 6×6, else Medium; trial: Hard up to
  8×8, else Expert); with two rungs the size carries the easier bands.
  Every band is reached at its default size; with a custom `size` the
  label states the band actually reached (for example Kids at 7×7 is
  Medium, Medium at 5×5 or 6×6 is served as Hard, Expert below 9×9 is Hard,
  and at 9×9 and 10×10 an easy request occasionally ends up Expert when no
  board within the search settles without trial).

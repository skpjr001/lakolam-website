---
title: "Fillomino"
blurb: "Partition the grid into regions, each cell holding the size of its own"
category: puzzle
version: "1.3.0"
---
Divide the grid into regions so every cell's number equals the size of the
region containing it.

## What it is

A grid, some cells carrying numbers. The whole grid must be partitioned into
polyomino regions such that each region of size *n* contains only the number
*n* — and two regions of the same size may never share an edge (they would be
one region). Printed numbers are fixed; empty cells take whatever their final
region dictates.

## How to play

A printed "1" is its own region — wall it off. Two adjacent equal numbers are
in the same region; grow it until it reaches its size, then everything
touching it is *not* that number. Watch for cells no region can reach: an
empty pocket must become a region of exactly its own size. Larger boards turn
on counting how far a number can possibly stretch: a size can only reach a
cell if some shape of that size fits there without touching another region
of the same size. On the hardest boards you will sometimes need to suppose a
number for a cell and follow it until it breaks a rule — then the cell is not
that number.

## Purpose

The purest partition puzzle in the collection — no clue type but the region
sizes themselves. In the workspace it shares the polyomino enumeration
machinery (`lako-grid::polyomino`) with nurikabe, which is where that module's
pinned shape-counts test came from.

## History

A Nikoli puzzle, first published in 1994. The name blends "fill" with
*omino* (as in polyomino). Sometimes published in the West as
"allied occupation" — a mistranslation that never caught on.

## This implementation

- **Spec knobs:** `rows`, `cols` (3–20), `max_region` (capped at 5), `difficulty`.
- **Generation:** answer first — the grid is partitioned into regions, every
  cell is numbered with its region's size, then numbers are thinned while the
  board keeps exactly one completion. The solver enumerates each number's
  possible region as a polyomino (a `Prepared` catalogue built once per
  board), not cell-by-cell.
- **Guarantees:** one answer under the real rules — regions of any size —
  since v1.3 (see below); the searches are cross-checked against the rule
  definition by brute force over every labelling of small boards.
- **Performance note:** batching removals during thinning was tried and made
  generation *slower* (1.9 s → 4.6 s); the naive one-at-a-time loop is kept
  and the failed optimisation is recorded in the implementation notes.
- **Knobs that find nothing (v1.1):** `max_region` of 0–3 found no 7×7 board
  for any seed. Now, only when the requested cap finds nothing, a second
  pass from fresh seeds retries it, then raises it a step at a time toward
  5; the board's metadata reports `max_region_used`. Every board that
  generated before is unchanged.
- **Version 1.2 — Kids and Easy are served.** Thinning leaves every number
  load-bearing, about a third of the cells on a 7×7, so the ladder only ever
  gave Medium and Hard. Kids and Easy requests now put numbers of the answer
  back — first one in each region that shows none — until 58% (Kids) or 48%
  (Easy) of cells are numbered; restoring a true number cannot admit a second
  answer. Rated by the share of cells numbered: Kids from 55%, Easy 45%,
  Medium 35%, Hard 25%. A thinned board almost never drops under a quarter, so
  Expert is served as Hard (with `requested_difficulty`), and a Hard request
  whose 24 attempts all thin to Medium is served as Medium. Medium, Hard and
  Expert boards are unchanged.
- **v1.3 — boards to 20×20.** Sides up to 9 take the original path above,
  byte for byte. A side of 10–20 (a request above 9 used to be clamped to 9,
  so those specs now give bigger boards — hence the version) is proved by a
  **deduction ladder** on wide bitboards instead of a count: every cell keeps
  the sizes it could still have — 1–5 or "six or more", since the reader is
  not told the cap — and sound rules strike them out until each cell has
  one. Rungs: **grow** (a settled cell's region is one of the fitting
  polyominoes of its size through it; cells in all of them join it, cells
  beside all of them cannot take that size), **reach** (a size survives in a
  cell only if a fitting polyomino of that size covers it; "six or more" only
  in a pocket of six), **trial** (suppose a size, run grow and reach, strike
  it on a contradiction; at most 150 suppositions a solve — running out
  counts as unsettled, so the number is kept). A settled board is unique, and
  the settled sizes are checked to be the answer; numbers are thinned while
  the ladder capped at the band's rung still settles. Rated by the hardest
  rung (`rating_basis: "hardest_rung"`, `hardest_rung` names it): grow =
  Easy, reach = Medium, trial = Hard; Kids is served as Easy and Expert as
  Hard, with `requested_difficulty`. Wide boards keep about 40% of their
  numbers at every band. Timings (test-release): 15×15 Easy/Medium < 0.1 s,
  Hard 2–2.5 s; 20×20 Easy/Medium < 0.6 s, Hard 10–13 s. Tests re-prove 10×10
  boards at every band with the exact count.
- **v1.3 — proved without a size cap (boards up to 9×9).** The count that
  proved small boards only grew regions of up to five cells, but the page
  never says regions stop at five, so an answer with an unnumbered region of
  six or more was never ruled out. Measured on the old path (30 seeds each):
  a second answer of that kind on 1–2 of 30 Medium, Hard and Expert 5×5 and
  6×6 pages and 2–4 of 30 at 7×7; none at Kids or Easy (the restored numbers
  close the gap). Now the board the original selection picks is proved under
  the real rules: every printed number is at most 5, so a bigger region lies
  in a pocket of six or more unnumbered cells; with no such pocket the capped
  count is already exact; otherwise the deduction ladder below rules a region
  of six out where it can, and an exact count grows regions of six or more
  (every connected set, met once) in the cells the ladder leaves, with a node
  budget — running out is not a proof. Only when that proof fails is the
  selection run again with each such attempt thinned afresh under the real
  rules, so **pages that were sound are unchanged byte for byte** and only
  pages that had a second answer change (about one Medium or Hard page in
  ten). Tests count answers with an independent cell-by-cell search of any
  region size. The wide boards below were already proved without a cap.

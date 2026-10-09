---
title: "Weaving Draft Paper"
blurb: "Weaving draft paper — blank threading, tie-up, treadling and drawdown grids, American or Scandinavian layout"
category: paper
version: "1.0.0"
---
Blank drafting paper for loom weavers — threading, tie-up, treadling and
drawdown grids side by side, in the American or the Scandinavian layout.

## What it is

A weaving draft is the written recipe for a cloth woven on a shaft loom. It
is four grids that share their edges:

- the **threading** — one row per shaft, one column per warp end: a mark in
  a square says which shaft that end is threaded on;
- the **tie-up** — shafts by treadles: which shafts each treadle works;
- the **treadling** — one row per pick of weft, one column per treadle:
  which treadle is pressed for that pick;
- the **drawdown** — picks by ends: the cloth itself, worked out square by
  square from the other three.

This page gives all four blank, lined up column for column and row for row,
with one empty square between them. Heavier lines every 4 (or 8) squares
make it quick to count ends and picks, and the shafts and treadles are
numbered.

Two traditions place the blocks differently:

- **American** — threading at the top left, tie-up at the top right,
  treadling down the right side, drawdown below the threading. End 1 is at
  the right, shaft 1 at the bottom of the threading, treadle 1 at the left
  of the tie-up, and picks are read from the top down.
- **Scandinavian** — threading below the drawdown, tie-up at the bottom
  left, treadling up the left side. Shaft 1 is the top row of the
  threading, treadle 1 is at the right of the tie-up, end 1 is at the left,
  and picks are read from the bottom up.

The tie-up can also sit at the top left or the bottom right. Whatever the
corner, every count starts where the four blocks meet.

## How to use it

Print the page at actual size ("Actual size" or "100%", never "Fit to
page").

Write the draft's name, date, yarns and setts in the header. Fill in the
threading first: for each warp end, mark the square on the row of the shaft
it goes on. Mark the tie-up: for each treadle, the shafts it raises (in the
American way) or lowers (in the traditional Scandinavian way) - say which
in your notes. Then mark the treadling, one square per pick.

To draw the cloth down, take each pick in turn: find its treadle, read off
the shafts that treadle raises, and in that pick's row of the drawdown fill
every square whose end is threaded on one of those shafts. Filled squares
are warp on top, blank squares are weft. A few repeats drawn down show
whether the pattern works before a single thread goes on the loom.

## Purpose

For handweavers designing on paper: planning twills, overshot, summer and
winter, huck and other shaft-loom structures, copying drafts out of old
books, converting a draft between the American and Scandinavian layouts,
and teaching beginners to read drafts. Smaller squares give room for long
threadings; larger ones are easier to colour in. In a book, a run of these
pages makes a weaver's draft notebook.

## History

Weavers have long recorded their patterns on squared grids, often keeping
them as closely guarded working notes. Among the first printed books on
weaving were Marx Ziegler's *Weber Kunst und Bild Buch* (Ulm, 1677) and
Nathaniel Lumscher's *Neu eingerichtetes Weber Kunst und Bild Buch* (1708),
both full of patterns drawn on grids. Handwritten draft books of coverlet
and linen weavers carried the tradition through the 18th and 19th
centuries.

The two modern layouts follow the looms they grew up with. American drafts
are written for the rising-shed jack loom, so the tie-up marks the shafts
that rise. Scandinavian drafts, written for counterbalance and countermarch
looms, traditionally mark the shafts that sink and put the threading and
tie-up below the cloth, read from the bottom up.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape`; `margin_mm` (0–30, default 10); `arrangement` (american,
  tie_up_top_left, scandinavian, tie_up_bottom_right); `shafts` (2–16,
  default 4); `treadles` (2–16, default 6); `cell_mm` (3–6, default 4);
  `major_every` (0–16, default 4; 0 for none); `numbers` (shaft and treadle
  numbers, end and pick counts at every heavier line); `header` (name,
  date, warp, weft, EPI and PPI fields); `ends` and `picks` (0–400, 0 = as
  many as fit; more than fit are clamped); `ink`; `weight` in points
  (0.1–2; heavier lines are twice this).
- **Generation:** the threading and drawdown share their columns, the
  tie-up and treadling theirs; the threading and tie-up share their rows,
  the treadling and drawdown theirs; the blocks stand one square apart.
  Numbers sit in strips on the outer sides, each placed by its own ink so it
  is centred on the square it names; counts that would crowd their
  neighbours are left out. The ends and picks fill the sheet with whole
  squares, and the whole draft is centred under the header. If the blocks
  cannot fit a small sheet at the asked square size, the square shrinks in
  0.25 mm steps (never below 3 mm) and the page says so in its meta.
- **Solving:** nothing to solve — a blank page to draft on. The seed is
  unused: every seed gives the same sheet.
- **Guarantees:** every square is exactly the chosen size (checked to 1e-6
  pt); the four blocks are aligned and one square apart with the tie-up in
  the chosen corner; ends, shafts, treadles and picks are all counted from
  where the blocks meet, with heavier lines at whole multiples from square 1;
  no number overlaps a grid or another number; and all ink, stroke widths
  and labels included, stays inside the margins on every page size and
  orientation. A knob outside its range is clamped and the request recorded
  as `requested_<field>` in the meta.

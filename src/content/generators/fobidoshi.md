---
title: "Fobidoshi"
blurb: "Fobidoshi (Forbidden Four) — circle cells so all circles join up and no line holds four in a row"
category: puzzle
version: "1.0.0"
---
Join every circle into one group — but never let four of them stand in a
row.

## What it is

A square grid with a few circles already drawn and, now and then, a cross.
Circle more of the empty cells so that all the circles on the board link up
side by side into a single group, while no row or column ever holds four
circles next to each other. Its other name, Forbidden Four, is the whole
rule in two words.

## How to play

- Draw a circle in some of the empty cells. A cell with a cross may not be
  circled; the printed circles stay.
- All the circles must form one group: from any circle you can reach any
  other by stepping up, down, left or right through circled cells only.
- No row or column may contain four or more circles in an unbroken line.
  Three side by side is fine; a fourth next to them is not.
- There is exactly one way to finish the grid.

Good places to start: an empty cell between a run of three circles and the
edge — or one that would join two runs into four — can never be circled, so
cross it. Then look for a circle that has only one way out to the rest of
the group: the cell on that way must be circled. Cells the circles can no
longer reach stay empty.

## Purpose

A calm, low-arithmetic puzzle about paths and bottlenecks. It trains the
habit of asking "how else could these two circles meet?" — the same
connectivity reasoning used in Nurikabe and other shading puzzles — with
only two rules to keep in mind, so it suits newcomers and older solvers
alike.

## History

Fobidoshi was invented by the Japanese puzzle designer Naoki Inaba, one of
the most prolific inventors of pencil-puzzle rules. Otto Janko's archive
carries a large collection under the names Fobidoshi and Forbidden Four,
and the genre has since been studied as a computer-science exercise in
solving and generating puzzles with a connectivity rule.

## This implementation

- **Spec knobs:** `size` (4–10; 0 picks from the difficulty — 5, 6, 7, 7, 8
  from Kids to Expert), `difficulty`, `cell` (18–90 pt), `line` (0.2–4 pt).
  Out-of-range numbers are clamped and the requested value is reported in
  the metadata.
- **Generation:** answer first. One group of circles grows from a random
  cell, each step adding a random neighbouring cell that makes no run of
  four, preferring cells that touch the group once (a cycle's cells could
  each be left out, so they could only ever be printed), until nothing more
  fits. Growing to the end matters: an empty cell is only deducible when
  circling it would make four in a row or it is cut off. Then every cell is
  printed — circle or cross — and printed cells are taken away one at a
  time, crosses first and then circles, each in random order, keeping a
  removal only while the deduction ladder still settles the whole board at
  the band's rung. At least one circle always stays printed. When the
  requested rung yields no board, fresh attempts run at the rung above and
  the band actually reached is printed.
- **Solving:** a ladder on one yes/no variable per cell. *Four in a row*:
  every window of four cells along a row or column holds at most three
  circles. *Connectivity*: cells the circles cannot reach stay empty, and a
  cell whose loss would cut circles apart is circled (cut vertices by one
  depth-first search). *Trial*: assume a value, propagate, keep the
  opposite on a contradiction. The connectivity rung is the floor: with the
  four-in-a-row rule alone no circle can ever be deduced.
- **Guarantees:** deterministic per seed; exactly one answer, proven
  because the sound ladder settles every cell (meta `uniqueness_proof`),
  with a capped exhaustive count confirming it when cheap
  (`count_confirmed`), and re-proven in tests by an independent search that
  knows only the rules (no window of four circles; every circle in one
  component of the cells not crossed). Rated by the hardest rung needed
  with size as the tie-break (connectivity: Kids up to 5×5, Easy at 6×6,
  else Medium; trial: Hard up to 7×7, else Expert). Every band is reached at
  its default size; with a custom `size` the label states the band actually
  reached (Kids is Easy at 6×6 and Medium from 7×7 up; Easy is Medium from
  7×7 up; Easy and Medium up to 5×5 are Kids and Medium at 6×6 is Easy;
  Expert up to 7×7 is Hard and Hard from 8×8 up is Expert).
  Real Fobidoshi boards sometimes need longer chains of reasoning than one
  trial step; those are not generated here.

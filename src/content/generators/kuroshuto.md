---
title: "Kuroshuto"
blurb: "Kuroshuto — shade non-touching cells so each number sees exactly one shaded cell at its distance, with the white cells connected"
category: puzzle
version: "1.0.0"
---
Every number is a measuring tape: exactly one shaded cell lies that many
steps away.

## What it is

A square grid with numbers in some cells. Shade some of the empty cells.
From each number, look the given number of steps up, down, left and right:
exactly one of those (up to four) cells is shaded. Shaded cells keep apart,
and the white cells stay in one connected piece.

## How to play

Shade some cells so that:

- numbered cells are never shaded;
- for each number N, exactly one of the cells exactly N steps away in a
  straight line — up, down, left or right — is shaded (the cells in
  between do not matter);
- shaded cells never share a side;
- all the white cells form one group, joined through cells that share a
  side.

A number near the edge often has only one or two cells at its distance —
when only one is left, shade it. Once a number's shaded cell is found, its
other cells at that distance are white. Cells beside a shaded cell are
white. Keep the white area in one piece: a cell whose shading would cut
some white cells off must stay white.

## Purpose

Distance-counting with a light touch of connectivity: each clue is a small
"one of these four" choice, and the rules about shaded cells weave the
choices together.

## History

Kuroshuto (クロシュート, also spelled Kurochute) is a Japanese pencil puzzle
from the family of shading genres around Nurikabe and Hitori. It is
published in Otto Janko's online collection and on puzz.link, and shares
Hitori's rules that shaded cells never touch and white cells stay
connected.

## This implementation

- **Spec knobs:** `size` (5–10; 0 picks from the difficulty — 5, 6, 7, 8,
  10 from Kids to Expert), `difficulty`, `cell`, `line`.
- **Generation:** cells in seeded order are shaded with a seeded chance
  when no shaded cell shares a side with them and the white cells stay
  connected. Numbers are added on white cells — at a distance where
  exactly one shaded cell lies — wherever the ladder leaves the most cells
  unsettled, then erased one at a time in seeded order, first while the
  rung below the ceiling still settles every cell, then while the ceiling
  does.
- **Solving:** shaded/white cells on a ladder of three rungs — *distances*
  (each number's cells at its distance hold exactly one shaded cell; no two
  shaded cells side by side), *connectivity* (cells the white area cannot
  reach are shaded, and a cell whose shading would split the white area is
  white — cut cells found by one depth-first search) and *trial* (assume a
  cell, propagate the lower rungs, keep the opposite on a contradiction).
- **Guarantees:** deterministic per seed; exactly one shading, proven
  because the sound ladder settles every cell, confirmed by a capped
  exhaustive count (a count that runs out of budget skips the attempt), and
  re-proven in tests by an independent search that knows only the rules as
  a feasibility test. Rated by the hardest rung needed: distances alone are
  Kids up to 5×5 and Easy above; connectivity is Medium; trial is Hard up to
  8×8 and Expert above. Every band is reached at its default size. A band a
  chosen size cannot reach is not searched for: the nearest band that size
  reaches is served and labelled as such.

---
title: "Stars and Arrows"
blurb: "Stars and Arrows — place stars so every arrow points at one and every star is pointed at once"
category: puzzle
version: "1.0.0"
---
Every arrow points at a star, and every star has its arrow — place the
stars.

## What it is

A square grid with arrows in some cells, each pointing in one of eight
directions (straight or diagonal), and numbers beside some rows and above
some columns. The solver places stars in empty cells. Every arrow points
at exactly one star somewhere along its line, all the way to the edge of
the grid, and every star is pointed at by exactly one arrow. The numbers
say how many stars each row and column holds. In the *at least* form an
arrow may point at several stars and a star may be pointed at by several
arrows, but never by none.

## How to play

- Put stars in some of the empty cells; cells with arrows never hold a
  star.
- An arrow points along its whole line — up, down, sideways or
  diagonally — to the edge of the grid, passing over other arrows.
- Each arrow must point at exactly one star.
- Each star must be pointed at by exactly one arrow.
- A number beside a row or above a column tells how many stars it holds.
- At least form: each arrow points at one star or more, and each star is
  pointed at by one arrow or more.
- There is exactly one way to place the stars.

Good places to start: in the classic form a cell that two arrows point at
can never hold a star, and neither can a cell no arrow points at — cross
those out first. An arrow with only one possible cell left on its line
gets its star there; a row whose number equals its possible cells is
full.

## Purpose

A calm scanning puzzle: following lines in eight directions and crossing
out cells trains careful attention and spatial tracking, and the row and
column numbers add a little counting. Small grids suit children and
beginners; large ones with few numbers need longer chains of reasoning.

## History

Stars and Arrows (German *Sternenhimmel*, "starry sky") comes from Russian
puzzle magazines; it has appeared at the World Puzzle Championship and
Otto Janko's online archive carries a large collection, in both the
"exactly" and the "at least" forms.

## This implementation

- **Spec knobs:** `size` (5–10; 0 picks from the difficulty — 5, 6, 7, 8,
  10 from Kids to Expert), `rule` (`exactly` or `at_least`), `difficulty`,
  `cell` (18–90 pt), `line` (0.2–4 pt). Out-of-range numbers are clamped
  and the requested value is reported in the metadata.
- **Generation:** answer first. Arrow–star pairs are added one at a time:
  a star in a free cell and an arrow somewhere behind it pointing at it,
  kept only when every rule still holds (in the at-least form a new arrow
  may also point at a star already placed). After a start of about one
  star per five cells, a local search keeps adding pairs while each
  addition leaves no more cells open under the band's rung of the ladder,
  until the ladder settles every cell. Kids and Easy show every row and
  column count; harder bands hide counts in a seeded order while the
  trial rung still settles the grid.
- **Solving:** a ladder on one yes/no variable per cell ("star"). Cells no
  arrow points at (and, in the classic form, cells two arrows point at)
  are empty from the start. *Local*: each arrow's line and each row and
  column count on its own. *Trial*: assume a cell, propagate, keep the
  opposite on a contradiction.
- **Guarantees:** deterministic per seed; exactly one answer, proven
  because the sound ladder settles every cell (meta `uniqueness_proof`),
  with a capped exhaustive count confirming it (`count_confirmed`), and
  re-proven in tests by an independent search whose feasibility test is
  written from the rules alone. The band is the hardest rung the solve
  needed and the board's size (meta `rating_basis`): local alone is Kids
  at 5×5, Easy above; trial is Easy up to 6×6, Medium at 7×7, Hard at 8×8
  and Expert from 9×9. With a custom `size` the band of that size and rung
  is served, and the request is reported beside it.

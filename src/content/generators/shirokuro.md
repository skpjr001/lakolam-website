---
title: "Shirokuro"
blurb: "Shirokuro — join every black circle to a white one by a straight line; lines never cross or pass a circle"
category: puzzle
version: "1.0.0"
---
Black and white circles everywhere — pair every black one with a white one
by straight lines that never cross.

## What it is

A square grid with black and white circles in some of its cells. Every
circle has a partner of the other colour in the same row or column, and the
pairs are joined by straight lines along the cells. The lines may not pass
through a circle and may not cross each other, so the circles have to be
paired in exactly one way.

## How to play

- Join each black circle to one white circle with a straight horizontal or
  vertical line drawn through the middles of the cells.
- Every circle gets exactly one line: each black circle is paired with
  exactly one white circle, and each white circle with exactly one black.
- A line may not pass through another circle, and two lines may never cross
  or share a cell.
- Some cells are left without a line.
- There is exactly one solution.

Good places to start: a circle can only be joined to the nearest circle in
each direction, and only if that circle has the other colour — so many
circles have just one or two choices. A circle in a corner, or one boxed in
by circles of its own colour, often has only one way out. Once a line is
drawn, every line that would cross it is gone.

## Purpose

A calm, wordless pairing puzzle with no arithmetic at all. It trains
looking along rows and columns, eliminating options and seeing how one
choice blocks another; the finished page is a tidy web of short bars.

## History

Shirokuro ("white-black" in Japanese) is a pairing genre from Japan; Otto
Janko's online collection has more than a hundred of them, from 10×10 up
to 17×17.

## This implementation

- **Spec knobs:** `size` (5–14; 0 picks from the difficulty — 6, 8, 10,
  12, 14 from Kids to Expert), `difficulty`, `cell` (16–80 pt), `line`
  (0.2–4 pt). Out-of-range numbers are clamped and the requested value is
  reported in the metadata.
- **Generation:** answer first. Straight segments of one to five cells are
  laid at random into the free cells, each with a black and a white circle
  at its ends, until the grid is dense. The layout is then hill-climbed:
  swap the colours of a segment's ends, or take a segment away and lay new
  ones into the space, keeping a change when the ladder (at the band's
  rung) leaves no more possible lines unsettled — until it settles every
  one (and, above the lowest rung, the rung below does not).
- **Solving:** a ladder on one yes/no variable per possible line (a circle
  and the nearest circle of the other colour along a row or column).
  *Basic*: every circle ends exactly one line, and every empty cell carries
  at most one. *Claim*: a line that every remaining choice of some circle
  would block (by crossing it or taking its far circle) is ruled out.
  *Trial*: assume a line, follow the consequences, keep the opposite on a
  contradiction.
- **Guarantees:** deterministic per seed; exactly one pairing, proven
  because the sound ladder settles every possible line (meta
  `uniqueness_proof`), with a capped exhaustive count confirming it when
  cheap (`count_confirmed`), and re-proven in tests by an independent
  search that walks the grid from the first unjoined circle and shares no
  code with the ladder. Rated by the hardest rung needed with size as the
  tie-break (basic: Kids up to 6×6, Easy up to 8×8, Medium up to 10×10,
  Hard up to 12×12, else Expert; claim: Easy up to 6×6, Medium up to 8×8,
  Hard up to 10×10, else Expert; trial: Hard up to 6×6, else Expert). The
  basic rung settles nearly every generated grid, so the bands mostly
  follow size. Every band is served at its default size; with a custom
  `size` the label states the band reached.

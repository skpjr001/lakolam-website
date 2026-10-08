---
title: "Ebony & Ivory"
blurb: "Ebony & Ivory — shade cells so each line's longest black and white runs match the edge numbers"
category: puzzle
version: "1.0.0"
---
Shade the grid so that every row and column has exactly the longest black
run and the longest white run its numbers ask for.

## What it is

An empty square grid with a number at both ends of every row and every
column. The numbers in black discs, on the left and on top, give the length
of the longest unbroken run of black cells in that line. The numbers in
white circles, on the right and at the bottom, give the length of the
longest unbroken run of white cells.

## How to play

- Colour some cells black. Every other cell stays white.
- The number in a black disc to the left of a row (or above a column) is the
  length of the longest run of black cells, side by side, in that line.
  There may be shorter black runs too, but none longer.
- The number in a white circle to the right of a row (or below a column) is
  the length of the longest run of white cells in that line.
- A 0 means the line has no black cell at all (or, in a white circle, no
  white cell).
- Shaded or dotted cells already in the grid are given: a shaded cell is
  black, a dotted cell is white.
- There is exactly one solution.

Good places to start: a black 1 means no two black cells in that line may
touch, and a white 1 means no two white cells may touch — so a line with
both is an alternating pattern. When a cell would join two runs into one
longer than allowed, it must take the other colour.

## Purpose

A calm shading puzzle in the family of nonograms, with no arithmetic beyond
counting cells in a row. It trains looking at both colours at once — every
decision about black is also a decision about white — and suits puzzle
books for adults and older children alike.

## History

Ebony & Ivory is a pencil-puzzle genre from Otto Janko's large online
collection of logic puzzles, where the first examples came from Mikhael
Khotiner. It borrows the edge clues of the nonogram but keeps only one fact
per colour — the longest run — which makes each line far less determined on
its own and the crossing of rows and columns more important.

## This implementation

- **Spec knobs:** `size` (5–12; 0 picks from the difficulty — 6, 6, 8, 8,
  10 from Kids to Expert), `difficulty`, `cell` (14–80 pt), `line` (0.2–4
  pt). Out-of-range numbers are clamped and the requested value is
  reported in the metadata.
- **Generation:** answer first. A random shading gets every clue printed;
  then a local search flips one cell at a time, keeping each flip that
  leaves no more cells open under the ladder at the band's rung, until the
  ladder settles the grid. If the search runs out, cells of the answer are
  printed where the ladder stalls and trimmed again while it still settles
  (a shaded cell for black, a dot for white); grids that need none are
  always preferred, and so is a grid that needs exactly the band's rung.
- **Solving:** a ladder on one yes/no variable per cell. *Run caps*: a cell
  whose colour would join a run longer than its line allows takes the other
  colour. *Whole line*: every shading of the line with both longest runs
  right (listed once per side and grouped by clue pair) that agrees with
  what is known; a cell every such shading colours alike takes that
  colour. *Trial*: assume a colour, follow the consequences, keep the
  opposite on a contradiction.
- **Guarantees:** deterministic per seed; exactly one answer, proven because
  the sound ladder settles every cell (meta `uniqueness_proof`), with a
  capped exhaustive count confirming it when cheap (`count_confirmed`), and
  re-proven in tests by an independent row-by-row search (row shadings
  listed by brute force, columns tracked by their running and longest runs)
  that shares no code with the ladder. Rated by the hardest rung needed with
  size as the tie-break (run caps: Kids up to 6×6, else Easy; whole line:
  Easy up to 6×6, Medium up to 9×9, else Hard; trial: Hard up to 8×8, else
  Expert). Every band is reached at its default size. With a custom `size`
  the label states the band reached — Kids from 7×7 up is Easy, and a
  large Kids grid may need printed cells.

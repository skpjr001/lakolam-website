---
title: "ABC Combi"
blurb: "ABC Combi — a letter in every cell, counted per row and column, never twice side by side"
category: puzzle
version: "1.0.0"
---
Fill the grid with letters — the numbers say how many of each letter every
row and column holds, and no letter ever sits beside itself.

## What it is

An empty square grid with a small table of numbers along the top and the
left. Every cell takes one letter from a short range, such as A to C. For
each row and each column, the numbers tell how many times each letter
appears in it. Two cells that share a side never hold the same letter.

## How to play

- Write one letter from the given range (for example A, B or C) in every
  cell.
- The numbers to the left of a row give, letter by letter, how many times
  each letter appears in that row. The numbers above a column do the same
  for the column. The letters in the corner show which number belongs to
  which letter.
- Two cells side by side or one above the other may not hold the same
  letter. Cells touching only at a corner may.
- There is exactly one way to fill the grid.

Good places to start: a 0 rules a letter out of a whole line. A letter that
must appear in half the cells of a line (rounded up) has to take every
other cell, starting at an end when the line is odd. Once a cell is known,
its four neighbours lose that letter.

## Purpose

A quiet counting-and-placement puzzle with no arithmetic beyond tallying. It
trains keeping several small counts in mind at once and spotting how the
"never side by side" rule spreads from one cell to its neighbours — a good
warm-up for Latin-square and colouring puzzles.

## History

ABC Combi ("Abc-Kombi") is a pencil-puzzle genre from Otto Janko's large
online collection of logic puzzles, where it is one of the more numerous
types. It belongs to the family of letter-placement puzzles such as Easy as
ABC, but replaces their "each letter once" rule with letter counts and a
ban on equal neighbours.

## This implementation

- **Spec knobs:** `size` (4–8; 0 picks from the difficulty — 5, 6, 6, 6, 7
  from Kids to Expert), `letters` (3–5, meaning A–C up to A–E; default 3),
  `difficulty`, `cell` (18–90 pt), `line` (0.2–4 pt). Out-of-range numbers
  are clamped and the requested value is reported in the metadata.
- **Generation:** answer first. A random filling, cell by cell in reading
  order, avoids the letters above and to the left (always possible with
  three or more letters). With every count printed, a local search changes
  one letter at a time (keeping neighbours different), keeping each change
  that leaves no more cells open under the ladder at the band's rung, until
  the ladder settles the grid. In the rare case the search runs out,
  letters of the answer are printed in the grid where the ladder stalls and
  trimmed again while it still settles; grids that need no printed letters
  are always preferred. When the requested rung yields no grid, fresh
  attempts run at the rungs above and the band actually reached is printed.
- **Solving:** a ladder on one yes/no variable per cell and letter.
  *Counts and neighbours*: one letter per cell, each line's count of each
  letter, and no letter in two neighbouring cells, each rule on its own.
  *Whole line*: every spelling of a line that fits its counts, never
  repeats a letter side by side and agrees with what is known is listed
  (a depth-first search pruned by "equal letters cannot touch, so the rest
  of the line holds at most half of any letter"); a letter no spelling puts
  in a cell is ruled out there. *Trial*: assume a value, propagate, keep
  the opposite on a contradiction.
- **Guarantees:** deterministic per seed; exactly one answer, proven
  because the sound ladder settles every variable (meta
  `uniqueness_proof`), with a capped exhaustive count confirming it when
  cheap (`count_confirmed`), and re-proven in tests by an independent
  search whose feasibility test is written from the rules alone. Rated by
  the hardest rung needed with size as the tie-break (counts and
  neighbours: Kids up to 5×5, else Easy; whole line: Easy up to 5×5, else
  Medium; trial: Hard up to 6×6, else Expert). Every band is reached at its
  default size with three or four letters; with a custom `size` the label
  states the band actually reached (Kids from 6×6 up is Easy; Easy at 4×4
  and 5×5 is Kids; Medium at 4×4 and 5×5 is Easy; Expert up to 6×6 is Hard
  and Hard from 7×7 up is Expert; with four or more letters a few small
  Hard boards settle at Easy).

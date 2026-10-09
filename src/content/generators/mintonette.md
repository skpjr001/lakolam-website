---
title: "Mintonette"
blurb: "Mintonette — pair the clues with lines that fill the grid, each line turning as often as its number says"
category: puzzle
version: "1.0.0"
---
Pair up the circled numbers with lines that fill the grid — each line turns
exactly as often as its numbers say.

## What it is

A grid with circled numbers. Every circle is the end of one line, and every
line joins two circles. The lines run through the centres of the cells,
straight across or up and down, and together they pass through every cell of
the grid exactly once. The number in a circle says how many times its line
turns; a question mark means the line turns at least once.

## How to play

Draw lines between pairs of circles so that:

- every line runs horizontally and vertically from cell to cell and joins
  exactly two circles, without passing through any other circle;
- every cell of the grid is visited by exactly one line, and lines never
  cross or share a cell;
- the number in a circle is how many times its line turns (both ends of a
  line show the same number); a ? stands for any number of turns above zero.

A 0 is a straight line: look along its row and column for a 0 it can see. A
corner cell can only be reached two ways, and a cell boxed in by finished
lines must be passed through by the one line that can still reach it.

## Purpose

A path puzzle that mixes route-finding with counting: the turn counts rule
out most pairings at a glance, and filling every cell forces the rest. Small
boards make good introductions to Numberlink-style puzzles.

## History

Mintonette is Nikoli's Sokode Magare, first published in
Puzzle Communication Nikoli No. 73 in May 1998 by a contributor named
Derutonneru, who probably invented it. An earlier Nikoli puzzle, Sumaga
(1992), gave only the starting points of the lines. The rules used here are
Otto Janko's: connect the number and question-mark cells in pairs with
lines; every cell is visited by a line and exactly one line ends in each
clue cell; the number tells how often the line turns, and a question mark is
any number above zero.

## This implementation

- **Spec knobs:** `size` (5–9; 0 picks from the difficulty — 5, 6, 6, 7, 8
  from Kids to Expert), `difficulty`, `cell`, `line`. Clamped values are
  reported as `requested_*`.
- **Generation:** lines (4 to twice the side plus two cells long) are
  planted to cover the grid — each starts at the open cell with the fewest
  open neighbours and walks (mostly straight, never
  beside its own body, at most four turns up to 6×6 and five above) from
  both ends; a cell left alone joins a neighbouring line's end. Both ends of
  each line show its turns. Boards the ladder does not settle completely are
  discarded. On Hard and Expert, one end of a turning line may show a ? when
  the board still settles; there is never more than one ?.
- **Solving:** every candidate line — each route from a numbered circle with
  exactly its number of turns, passing no other circle and ending on one
  that agrees — is listed, and the puzzle becomes an exact cover of the grid
  by those lines. The ladder's rungs: *only fit* (a cell only one line can
  still cover takes it), *shared cells* (when every line through one cell
  also passes another, lines that split them are struck out), and *trial*
  (assume one of a cell's last two or three lines, follow the lower rungs,
  strike it out on a contradiction). Boards with more than 60,000 candidate
  lines are refused.
- **Guarantees:** deterministic per seed; exactly one set of lines, proven
  because the sound ladder settles every cell, confirmed by a capped exact
  cover count, and re-proven in tests by an independent search that draws
  lines step by step from the rules. Rated by the hardest rung needed
  (`rating_basis: hardest_rung_with_size_tiebreak`): only fit Kids on 5×5 and
  Easy above; shared cells Medium; trial Hard up to 7×7 and Expert above.
  **Hard and Expert are not reached:** with every line end printed, the
  only-fit and shared-cells rungs have settled every board planted so far,
  so those requests are served at Medium and labelled as such beside
  `requested_difficulty` (a `?` still appears on them).

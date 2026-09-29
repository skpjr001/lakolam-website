---
title: "A to Z Crossword"
blurb: "A to Z crossword — 26 clues from A to Z, no numbers: work out where each answer goes"
category: word
version: "1.0.0"
---
Twenty-six clues, one for each letter of the alphabet, and a grid with no
numbers: solve them, then work out where each answer goes.

## What it is

A crossword with its numbers taken away. The grid is an ordinary symmetric
crossword grid, but instead of numbered Across and Down lists the clues are
listed A to Z. The answer to clue A begins with A, the answer to clue B with
B, and so on through the alphabet. X and Z are the usual exceptions, since
hardly any words start with them: their answers only have to contain the
letter somewhere.

## How to play

Solve any clues you can. Each clue tells you the first letter of its answer
(for X and Z, a letter the answer contains), and the number in brackets
gives its length. Then find a place for each answer: it must go in a run of
white squares of the same length, across or down, and it must agree with
every letter already crossing that run. Long answers and lengths that
appear only once in the grid are the easiest to place. Every answer you
place writes letters into the runs it crosses, which narrows down where the
others can go. There is exactly one way to fit all twenty-six answers into
the grid. Some puzzles start with an answer or two already written in. In
the hardest puzzles the lengths are not printed, so you only learn how long
an answer is once you have solved its clue.

## Purpose

A long-running favourite of British puzzle magazines, it adds a second
puzzle to the crossword: placement. Solvers who get stuck on a clue can
often recover it from the letters that placing other answers writes into
the grid. And because each answer has to begin with its own letter, the
clue gives away a little more than an ordinary crossword clue does.

## History

Alphabetical crosswords are a British magazine staple, sold under names
such as "A to Z" and "Alphabet". They grew out of the variety puzzles of
the mid twentieth century, where the numbers were stripped from the grid to
add a logical layer to plain definitions. The X-and-Z convention, where an
answer only has to contain an awkward letter, is common to the genre.

## This implementation

- **Spec knobs:** `difficulty`, `cell`, `line`. The grid is always 13x13:
  the size at which a British half-checked grid holds 26 answers.
- **Generation:** a 180-degree symmetric lattice grid (answers along the
  even rows and columns, unchecked cells between). A few symmetric pairs of
  crossing cells are blocked, then each line takes the fewest extra blocks
  that leave runs of 1 or 3 to 7 cells. Any cell where an across and a down
  answer would both start is blocked and the lines are redone, because two
  answers cannot share a first letter. Only grids with exactly 26 answers
  are kept. The grid is filled by backtracking over the project's own clued
  word list (the same list the crossword uses, three to seven letters). The
  search branches on the most constrained slot, or on the letter with the
  fewest possible homes when that is tighter. A bipartite matching check
  (letters still needed against slots still open) prunes fills that can no
  longer cover the alphabet. Short searches are restarted rather than one
  long search being run, because fill times are heavy-tailed.
- **Solving:** a placement ladder starts from knowing the answers. *Single*:
  an answer fits only one open slot, or a slot only one answer, by length
  and the letters already written. *Trial*: pencil an answer into a slot,
  follow singles, and strike it off on a clash. *Search*: anything beyond
  that. Easy writes starter answers into the grid until singles are enough.
  Medium allows at most one starter.
- **Guarantees:** deterministic per seed. There are 26 distinct dictionary
  answers, one per letter (starting with it; X and Z containing it). Every
  white cell lies in an answer and crossings agree. **The placement is
  unique:** an exhaustive count (cap 2, with a node budget; running out of
  budget counts as ambiguous) of the ways to assign the answers to slots of
  equal length with agreeing crossings comes to exactly 1. Because every
  cell is covered, the letter fill is then the only possible completion. The
  tests re-check this with an independent count that tries each answer in
  every slot in turn. The answer key shows the filled grid with clue
  numbers and says where each letter's answer goes (for example
  "A 15 ACROSS - AND").
- **Difficulty:** rated by the hardest placement technique needed, the
  number of starters, and whether lengths are printed. Easy means singles
  with two or more starters. Medium means singles with at most one starter.
  Hard needs trial, with lengths shown. Expert is trial or deeper with the
  lengths hidden. The clues are general-vocabulary crossword clues, so Kids
  builds the Easy puzzle and is rated Easy.

---
title: "Straight-Line Fill-In"
blurb: "Straight-Line Fill-In — themed words start on their numbers and run straight in one of eight directions until the grid is full"
category: word
version: "1.0.0"
---
Every word starts on its number and runs in a straight line. Find which way
each one goes, and fill the whole grid.

## What it is

A square grid with some numbered squares, and a numbered list of words on a
theme. Each word begins on the square with its number and runs in a
straight line in one of eight directions: across, down, up, backwards, or
along any of the four diagonals. Words may cross and even overlap, as long
as they share the same letter where they meet. When every word is in its
place, every square of the grid holds a letter. A few letters may be
printed to start you off.

## How to play

Start with the word's first letter: it always goes in its numbered square.
Then decide which way the word runs. Some directions run off the edge of
the grid, so a long word near an edge or a corner often has only one way
to go. Write in the words you are sure of. Their letters then rule out other
directions, because a word can only cross a square that already holds the
same letter. Look for empty squares that only one word could still reach:
that word must go through them. Keep going until every word is placed and
every square is filled.

## Purpose

A gentle logic puzzle dressed as a word search. Instead of hunting for
hidden words, the solver builds the grid, which trains careful spelling,
spatial thinking and the habit of using one deduction to unlock the next.
The themed lists (animals, holidays, sports, food and many more, in several
languages) make it easy to match a lesson, a season or a party.

## History

The puzzle was devised by the British puzzle writer Laura Lines around 2005
and became a regular in British puzzle magazines under the name
Kross-Filler. It turns the familiar word search inside out: the words are
given and their starting squares are marked, and the challenge is to fit
them together so that nothing is left empty.

## This implementation

- **Spec knobs:** `difficulty`, `theme` (any lexicon theme; default
  `animals`), `language` (`en` default; `es`, `fr`, `de`, `it`, `pt`, `nl`;
  accents folded to A-Z), `cell`, `line`.
- **Generation:** the grid is 5 by 5 for Kids, 6 by 6 Easy, 7 by 7 Medium,
  8 by 8 Hard and 9 by 9 Expert. Theme words of three letters up to the
  grid's width are used, dropping any word hidden inside a longer one. The
  grid is covered by local search: an empty square that few placements can
  reach is chosen, every way an unused word could cross it (agreeing with
  the letters already placed, starting on a square no other word starts on)
  is scored by how many empty squares it fills, and one of the best is
  placed, favouring directions used least so far; when a square cannot be
  reached at all, a word near it is lifted out again. Words are numbered in
  reading order of their start squares. A theme with too few short words
  for the band's grid (national parks or US states for Kids) gets the next
  larger grid instead, and is rated by that size.
- **Solving:** each word may point in any of the eight directions that stay
  on the grid. An exhaustive search over directions, with letters agreeing
  wherever words meet and every square covered, counts the fills and stops
  at two. While there is a second fill, a letter where the two differ is
  printed in its square; printed letters are then trimmed back to the fewest
  needed (most grids need none).
- **Guarantees:** deterministic per seed; exactly one choice of directions
  fills the grid, re-checked in the tests by walking every combination of
  directions word by word, with no pruning. Rated by the grid size and by
  replaying a solver's deductions (`rating_basis`:
  `grid_size_and_deduction_rung`): rung 1 places a word whose other
  directions clash with known letters, or a word that is the only one able
  to reach some square; rung 2 rules out a direction that clashes with
  every direction another word has left; rung 3 rules out a direction by
  trying it and finding a contradiction. The band is the harder of the
  grid's band and the rung's band (rung 1 Kids, 2 Medium, 3 Hard, beyond
  Expert). Nearly every grid is settled at rung 1, so in practice the grid
  size sets the band; when a covering cannot reach the requested band, the
  nearest band is returned and labelled honestly.

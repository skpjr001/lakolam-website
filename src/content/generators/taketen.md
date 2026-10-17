---
title: "Take Ten"
blurb: "Take ten — cross out matching or ten-making pairs until the grid is clear"
category: puzzle
version: "1.0.0"
---
Cross out matching pairs and pairs that make ten until the grid is empty.

## What it is

A grid of digits from 1 to 9, read like a book. Two digits make a pair when
they are the same (4 and 4) or add up to 10 (3 and 7). A pair can be crossed
out when the two digits are next to each other — across, down, diagonally,
or one straight after the other in reading order, running on from the end of
one row to the start of the next. Digits already crossed out do not count as
being in the way, so clearing a gap brings new digits together. The puzzle
is to cross out every digit.

## How to play

Cross out one pair at a time, in pencil. Before you take an easy pair, look
at what it leaves behind: a digit with no partner left anywhere near it can
strand you. Every crossed-out pair opens up the digits on either side of it,
so a pair that looks impossible now may join up later. Fives only pair with
fives; 1 and 9, 2 and 8, 3 and 7, 4 and 6 work both ways. Each puzzle can be
cleared completely — if you get stuck, rub out a few pairs and try another
order.

## Purpose

Fast number bonds to ten, again and again, with a planning puzzle on top:
the order matters, and greedy play gets stuck. It is a good pencil puzzle
for a quiet few minutes, and the small grids suit children learning which
digits make ten.

## History

The pen-and-paper game, often called Take Ten or Numberzilla, spread as a
pastime of writing the digits 1 to 19 in rows of nine and crossing out
pairs, copying out the remaining digits whenever the player got stuck. App
versions made it widely popular as "number match" games. This puzzle form
has no copying out: the grid is built so that it can be cleared as it
stands.

## This implementation

- **Spec knobs:** `difficulty` (digits to clear: kids 12, easy 18, medium
  24, hard 30, expert 36), `width` (digits per row, 4–9; the last row may be
  short; values outside are clamped and recorded as `requested_width`),
  `diagonals` (diagonal neighbours pair — the usual rule), `wrap` (reading
  order runs on to the next row — the usual rule; off: across within a row
  only).
- **Generation:** the clearing is played first, on blank squares: a seeded
  depth-first walk removes two neighbouring squares at a time until none are
  left (with wrap on, two squares next to each other in reading order are
  always available, so it never sticks). Each removed pair is then dealt
  matching digits, chosen by hill climbing to keep down the "stray" matching
  pairs open along the planted order. While a second clearing exists, a pair
  it disagrees on is dealt again (a few repairs per attempt, up to 12
  attempts, within a total search budget).
- **Solving:** a memoised depth-first search over the set of digits left
  counts distinct clearings — sets of pairs, whatever the order they are
  crossed out in — capped at 2. A count that runs out of its budget is
  reported as unknown (`clearings: null`), never as unique.
- **Guarantees:** deterministic per seed. Every grid is clearable by
  construction, and the answer key's order is replayed pair by pair before
  the page is returned (`clearable`, `solvable`, `answers_checked`).
  `unique` is true only when the capped count proved a single clearing: in
  practice the small grids (kids, easy) under the usual rules, and every
  band with diagonals and wrap off. With the full rules the larger grids
  have several clearings (`unique: false`, `clearings: 2`), as the genre
  does. Difficulty is the number of digits (`rating_basis`); every band is
  served as asked; `opening_moves` records how many pairs are open at the
  start. The answer key numbers each digit with the step it is crossed out
  at and lists the pairs. Tests re-count the clearings with an independent
  search and an independent adjacency test written from the rules.

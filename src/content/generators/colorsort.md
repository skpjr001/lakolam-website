---
title: "Colour Sort"
blurb: "Colour Sort — pour the coloured balls between tubes until every tube holds one colour"
category: puzzle
version: "1.0.0"
---
Pour the balls from tube to tube until every tube holds a single colour.

## What it is

A row of numbered tubes, each holding a stack of coloured balls, and one or
two empty tubes to work with. Every ball carries its colour's letter, so the
page works in black ink and for colour-blind solvers too. Every deal can be
solved, and the answer key gives a shortest solution.

## How to play

A pour takes the balls of one colour lying together at the top of a tube
and moves them to another tube. You may pour into an empty tube, or onto a
ball of the same colour when that tube has room; as many balls as fit go
across, and the rest stay behind. A tube is full when it holds as many
balls as the tube is tall. You have finished when every tube is either
empty or full of one colour.

Write each pour as two tube numbers, from and to: the key's "3, arrow, 5"
means "pour tube 3 into tube 5". Try to finish in as few pours as you
can — the answer key shows the fewest possible. An empty tube is precious: fill one only when it frees a colour you need.

## Purpose

The tube-sorting game is one of the most played puzzles on phones and
puzzle sites. On paper it becomes a planning puzzle: you cannot undo a
pour by trying things out, so you think a few pours ahead. The letters make
it printable in one ink and fair to colour-blind players.

## History

Sorting liquids or balls between tubes became a hit genre of casual mobile
games around 2020 (sold under names such as Water Sort, Ball Sort and Liquid
Sort), and spread to many puzzle websites. It descends from older
pouring and stacking puzzles in which only the top item can move.

## This implementation

- **Spec knobs:** `difficulty`; `colours` 2–12 (null = by band: Kids 3,
  Easy 4–5, Medium 6–7, Hard 8, Expert 9–12); `capacity` 3–5 (balls per tube
  and per colour); `empty_tubes` 1–3 (null = 2); `style` `colour` (coloured
  balls with letters) or `ink` (letters only); `ball`, `line`.
- **Generation:** the balls are shuffled into full tubes (a deal that is
  already sorted is reshuffled) and the empty tubes added. Each deal is
  solved; deals are retried (up to 40 per round) until one rates in the
  requested band, otherwise the nearest band reached is served and
  `requested_difficulty` records the request. With one spare tube many
  deals are dead ends; if a whole round finds no solvable deal, a spare tube
  is added and the change is recorded as `requested_empty_tubes`.
- **Solving:** A* (`lako_statesearch::shortest_astar`) over positions with
  the tube order quotiented out (the packed tubes are sorted inside the
  state, so swapping two tubes is the same position, and pours between
  identical tubes are listed once). The lower bound counts the colour changes
  inside tubes plus, for each colour, the tubes beyond the first that have it
  at the bottom; one pour removes at most one of either, so the bound is
  admissible and the first solution found is optimal. Pours on the sorted
  state are translated back to the printed tube numbers. Two-spare deals
  settle in well under a millisecond to a few milliseconds (12 colours:
  about 1 ms); a deal the 400,000-node budget cannot settle is discarded,
  never guessed.
- **Guarantees:** deterministic per seed; `solvable: true`; `optimal_moves`
  is the proven fewest pours, rated by `rating_basis: "optimal_moves"`
  (Kids ≤ 9, Easy 10–16, Medium 17–22, Hard 23–28, Expert 29+); the printed
  pour list (also in meta as `solution`, 1-based tube numbers) is replayed
  by the rules written out afresh before the page is returned. Tests re-prove
  the optimum with an independent breadth-first search over tube lists for
  Kids–Medium deals and for capacity-3, one-spare deals. A shortest solution
  is usually not unique (independent pours can swap order), so
  `unique_optimal` is not reported.

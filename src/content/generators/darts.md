---
title: "Darts"
blurb: "Darts — throw darts at different numbered spaces to hit each target score; every target has one answer"
category: maths
version: "1.0.0"
---
Throw darts at a numbered board: find the one set of spaces that hits each
target score.

## What it is

A dartboard is drawn as rings split into numbered spaces, every number
different. Under it is a list of target scores. For each score, throw the
stated number of darts — each into a different space — so the numbers add up
to the score. Every target has exactly one answer. In the classroom variant,
one dart lands in each ring.

## How to play

Read the number of darts at the top of the page. For each target, choose that
many different spaces on the board whose numbers add up to the target, and
write them in the blanks. No space may be used twice in the same throw, and
the black centre does not score. When the page says one dart in each ring,
take one number from every ring, starting with the outside ring.

Grabbing the biggest numbers that fit rarely works: check the last digits
first (they must add up to the target's last digit), and use the smallest and
largest numbers on the board to see how high or low a throw can go.

## Purpose

A number puzzle that turns adding three or four numbers into a search with a
single right answer. It practises mental addition, estimation and the
habit of checking units digits, and its drawn board makes a friendly page for
a classroom or a puzzle book's maths section.

## History

Darts puzzles appear in the World Puzzle Championship and the Puzzle Grand
Prix: throw a given number of darts into different regions of a board so they
total the target. The same idea is a long-standing classroom favourite — the
dartboard addition problems of NRICH and countless worksheets, where one dart
lands in each ring of a target.

## This implementation

- **Spec knobs:** `difficulty` (sets the board: Kids 2 darts at 2 rings of 4
  numbered to 12; Easy 3 darts at 2 rings of 5 to 20; Medium 3 darts at 3
  rings of 6 to 40; Hard 4 darts at 3 rings of 6 to 60; Expert 4 darts at 3
  rings of 8 to 99), `rule` (`any_regions`, the competition rule, or
  `one_per_ring`), `darts` (0 = the level's, 2–4), `rings` (0 = the level's,
  1–4), `sectors` (0 = the level's, 3–10 per ring), `targets` (3–12), `width`,
  `height`, `line`. Impossible combinations are relaxed and the request kept
  in meta: `one_per_ring` needs two rings and throws one dart per ring; a
  board too small for the darts throws fewer; the number range grows to cover
  every space; a board with fewer single-answer scores than asked prints the
  ones it has (`requested_targets`).
- **Generation:** a board of distinct random numbers, then a local search that
  swaps one number for an unused one and keeps the swap when the page gets no
  worse. Each step enumerates every set of spaces the rule allows (at most
  C(40, 4) = 91,390) and histograms their sums; the targets are sums hit
  exactly once. The search prefers targets deep inside the range of possible
  scores (the very smallest and largest are unique for free and dull), then
  targets that defeat the greedy guess (largest number that fits, then the
  next).
- **Solving:** for each target, try sets of spaces, pruning when the running
  total passes the target; the last-digit check cuts the search sharply.
- **Guarantees:** deterministic per seed; every number on the board is
  different; every printed target has exactly one set of spaces, proven by the
  exhaustive enumeration and re-checked by an independent capped recursion
  over the sorted numbers (ring by ring for `one_per_ring`), and by bitmask
  brute force in tests; the key's answers add up to their targets
  (`answers_checked`). Rated by the number of sets of spaces a solver must
  consider (`rating_basis: board_size_and_darts`): up to 40 Kids, 200 Easy,
  1,500 Medium, 6,000 Hard, more Expert — the level boards land in their own
  band under the competition rule; `one_per_ring` boards are smaller searches
  and rate a band or two lower, which the meta reports honestly. On the
  largest boards (Expert) single-answer scores exist only near the ends of the
  range, so those targets sit closer to the smallest or largest possible
  throw.

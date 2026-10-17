---
title: "Tower of Hanoi"
blurb: "Tower of Hanoi — finish from a mid-game position in the proven fewest moves"
category: puzzle
version: "1.0.0"
---
Finish the tower from the middle of a game, in the fewest moves possible.

## What it is

Discs of different sizes sit on three pegs. Move them, one at a time, until
the whole tower stands on the goal peg — largest at the bottom. A disc may
never sit on a smaller one. The puzzle page shows a position partway
through a game and says how many moves the shortest finish takes; a numbered
sheet has a line for each move. There is also the classic whole-stack page
and a harder four-peg version.

## How to play

Only the top disc of a peg can move, and only onto an empty peg or a bigger
disc. Write each move as the peg it leaves and the peg it lands on ("A-C").
Work from the biggest disc down: the largest disc that is not yet on the
goal peg has to get there, so everything above it and everything in its way
must first be gathered on the remaining peg — and that smaller tower is
the same puzzle again. With three pegs there is exactly one shortest way to
finish, so if you match the number of moves you have found it.

With four pegs the spare peg makes things quicker, and there may be more
than one shortest way.

## Purpose

The Tower of Hanoi is the classic first puzzle in recursion and planning.
Starting from a scrambled position instead of a full stack turns a
well-known pattern into a real puzzle every time, and the move count gives
an honest target. The classic sheet is a ready-made activity for the
2ⁿ − 1 pattern.

## History

The puzzle was published in 1883 by the French mathematician Édouard Lucas,
with a legend of priests moving 64 golden discs whose last move would end
the world. Henry Dudeney's four-peg "Reve's puzzle" (1907) took until 2014
to prove optimal for every size by computer search; for small towers the
Frame–Stewart numbers (5, 9, 13, 17, 25 moves for 3–7 discs) are exact.

## This implementation

- **Spec knobs:** `mode` (`position`, `classic`, `four_pegs`),
  `difficulty`, `discs` (3–8, 3–7 with four pegs; 0 picks by band:
  kids 3, easy 4, medium 5, hard 6, expert 7), `record_sheet`.
- **Generation:** the goal peg is seeded. `position` and `four_pegs` find
  every position's distance to the goal tower in one breadth-first search
  from the goal (moves are reversible) over all 3ⁿ or 4ⁿ positions, keep
  those in the requested band — not whole stacks, at least three moves
  away — and pick one by seed. With four pegs, the first of up to 24 such
  positions whose shortest finish is unique is preferred. `classic` stacks
  every disc on a seeded other peg.
- **Solving:** the shared state-search crate finds a shortest move list by
  breadth-first search and counts the shortest lists (cap 2).
- **Guarantees:** deterministic per seed; the move list is replayed to the
  goal tower before the page is returned (`solvable`, `answers_checked`),
  `optimal_moves` is the proven minimum, and `unique_optimal` (also
  `unique`) is true when the shortest list is the only one — always, with
  three pegs. Rated by `optimal_moves` (`rating_basis`): three pegs kids
  ≤ 7, easy 8–15, medium 16–31, hard 32–63, expert 64+; four pegs kids
  ≤ 4, easy 5–8, medium 9–13, hard 14–19, expert 20+. A band the chosen
  disc count cannot reach is served as the nearest and recorded as
  `requested_difficulty`; a clamped disc count as `requested_discs`. The
  tests re-prove the minimum and the number of shortest lists with their
  own breadth-first search, and check the four-peg whole-stack numbers.

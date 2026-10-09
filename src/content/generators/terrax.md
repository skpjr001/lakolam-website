---
title: "Terra-X"
blurb: "Terra-X — a digit per region, neighbours different, and every four-region corner adds up to the total"
category: puzzle
version: "1.0.0"
---
One digit per region, neighbours different — and wherever four regions meet,
their digits add up to 10.

## What it is

A map: a grid divided into small regions. Each region gets one digit from 0
to 9. Regions that share a side must differ, and at every grid point where
four different regions meet (marked with a dot), the four digits add up to
the total printed above the grid — 10 in the classic puzzle.

## How to play

Write one digit from 0 to 9 in every region so that:

- two regions that share a side never hold the same digit;
- wherever four regions meet at a dot, their four digits add up to the
  total shown above the grid.

Some regions already show their digit. At a dot with three digits known,
the fourth is whatever is left of the total. A dot whose known digits
already add up to 9 (with a total of 10) leaves 1 to share among the rest,
so they are 0 and 1. Two regions that touch can never share a digit, which
often decides between the last two choices.

## Purpose

Light arithmetic with a map-colouring twist: short sums to 10 that suit
younger solvers and seniors alike, with the neighbour rule supplying the
logic. A gentle bridge from kakuro-style sums to region puzzles.

## History

Terra-X was devised by Jürgen Blume-Nienhaus for the 2019 World Puzzle
Championship, as a map-based puzzle whose "X" stands for 10, the sum at
every four-region point. A later variant, Terra-XX by Zoran Tanasić for the
2020 Puzzle Grand Prix, uses 20. Otto Janko's collection gives the rules as:
a number from 0 to 9 in each region, different numbers in orthogonally
adjacent regions, and where four regions meet at a grid point their sum is
X, stated with the puzzle.

## This implementation

- **Spec knobs:** `size` (5–10; 0 picks from the difficulty — 5, 6, 7, 7, 8
  from Kids to Expert), `total` (4–32, default 10; 20 gives Terra-XX),
  `mark_points` (dots on the four-region points, default on), `difficulty`,
  `cell`, `line`. Clamped values are reported as `requested_*`. Totals near
  the ends of the range leave so few digit choices that a map rarely fills;
  when none does, the total steps toward 10 until one does, and the request
  is reported as `requested_total`.
- **Generation:** random regions of one to four cells (mostly two) grown
  from random open cells; of a dozen carvings the one with the most
  four-region points per region is kept, and carvings with fewer than one
  point per three regions are skipped. The shared constraint engine fills the
  digits from a few random seeds, and given digits are removed in seeded
  order while the ladder still settles every region — first with the cheap
  rungs, then with the requested ceiling. Each region prints its digit in
  its cell nearest the region's centre.
- **Solving:** the shared engine — neighbours differ, and each four-region
  point sums to the total: below the *sum bounds* rung only the last open
  digit of a point is settled; from it a digit goes when even the smallest
  or largest digits left in the other three cannot reach the total; from
  *sum combination* also when no exact combination of the others' digits
  does — plus a **trial** rung above them: assume a digit, follow it with
  every rung, and cross it off when that ends in a contradiction.
- **Guarantees:** deterministic per seed; exactly one answer, proven
  because the sound ladder settles every region, confirmed by a capped
  count, and re-proven in tests by an independent forward-checking search
  written straight from the rules. Rated by the hardest rung needed
  (`rating_basis: hardest_rung_with_size_tiebreak`): last digits and
  neighbour eliminations Kids on 5×5 and Easy above; sum bounds Easy up to
  6×6 and Medium above; exact combinations Medium; trial Hard up to 7×7 and
  Expert above. A band a size cannot reach is served at the nearest band
  found and labelled as such beside `requested_difficulty`.

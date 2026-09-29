---
title: "Target Number"
blurb: "Make the target — the 24 game, a Countdown-style numbers round and Krypto"
category: maths
version: "1.0.0"
---
Make the target from the numbers you are given: the 24 game, a numbers round
in the style of Countdown, and Krypto.

## What it is

Each puzzle gives you a handful of numbers and a target. Combine the numbers
with adding, subtracting, multiplying and dividing to hit the target exactly.
Three classic formats:

- **Make 24** — four numbers from 1 to 13; use all four to make 24.
- **Hit the target** — six number tiles, drawn from the small numbers 1-10
  (two of each) and the large numbers 25, 50, 75 and 100, and a three-digit
  target from 101 to 999. Use as many of the tiles as you like.
- **Five card target** — five cards and a target card dealt from a Krypto
  deck; use all five cards to make the target.

## How to play

- You may use +, -, × and ÷, as many times as you like, and brackets.
- **Make 24:** use each of the four numbers exactly once. Fractions along the
  way are fine — 8 ÷ (3 - 8 ÷ 3) makes 24.
- **Hit the target:** use each tile at most once; you do not have to use them
  all. Every step must give a whole number above zero — no fractions and no
  negatives.
- **Five card target:** use each of the five cards exactly once. Fractions
  along the way are fine.

Write your working on the lines, one step at a time if it helps
("75 + 25 = 100, 100 × 9 = 900 ..."). Every puzzle can be solved; most have
more than one answer, and any correct one counts.

## Purpose

Make-the-target puzzles build number sense — spotting that 24 is 3 × 8 or
4 × 6, that 900 is 9 lots of 100 — and fluency with all four operations and
the order of operations. They are open-ended enough for mixed classes: a
quick finisher can hunt for a second solution.

## History

The 24 game was devised in China and popularised in classrooms as a card game
(Robert Sun's commercial version dates from 1988). The numbers round has been
part of the British television quiz Countdown since 1982, with its six tiles
of small and large numbers and a three-digit target. Krypto, a card game with
a 56-card deck and a target card, was published in the 1960s and has long
been a school maths-club staple.

## This implementation

- **Spec knobs:** `mode` (`game24`, `countdown`, `krypto`); `difficulty`;
  `count` (1-12 puzzles, default 6); `unique` (only puzzles with exactly one
  solution); page `width`/`height`; `line`.
- **Generation:** 24 game — four numbers from 1-9 at Kids and Easy, 1-13
  above. Countdown — 0-4 large tiles, the rest small, drawn without
  replacement from the real set (two of each of 1-10; 25, 50, 75, 100);
  targets to 300 at Kids and 500 at Easy, to 999 above. Krypto — five cards
  and a target from a shuffled 56-card deck (three each of 1-6, four each of
  7-10, two each of 11-17, one each of 18-25). Deals are drawn until one
  lands in the requested band; no deal repeats on a page.
- **Solving:** an exhaustive solver combines every pair of the numbers left
  with every operation (both orders for - and ÷), all the way down, in exact
  rational arithmetic; Countdown checks every intermediate value against the
  target and prunes any step that is not a whole number above zero. Every
  solution is reduced to a canonical form — nested sums and differences
  flattened into one bag of added and one bag of subtracted terms, products
  and quotients into multiplied and divided factors, each bag sorted — so
  solutions that differ only by commutativity or associativity count once.
  (Multiplying or dividing by 1 counts as the same solution, and in Countdown
  as not using the 1 at all.)
- **Difficulty:** rated by the number of distinct solutions. 24 game: Kids
  6+, Easy 4-5, Medium 3, Hard 2, Expert 1. Countdown: Kids 80+, Easy 30-79,
  Medium 10-29, Hard 3-9, Expert 1-2. Krypto: Kids 80+, Easy 40-79, Medium
  15-39, Hard 5-14, Expert 1-4. A puzzle whose only one or two solutions
  need a fraction on the way is Expert. The `unique` option keeps puzzles with
  exactly one solution, which is the Expert band by definition, so a unique
  page is always rated Expert whatever level was asked for.
- **Guarantees:** deterministic per seed; every puzzle is proven solvable and
  its solution count is exact. The key shows one canonical solution —
  preferring whole-number steps, then the fewest numbers, then the shortest —
  and says how many there are. Tests re-read every printed solution with a
  separate parser (checking the numbers used and the whole-number rule) and
  recount the 24 and Krypto solutions with a separate subset-by-subset
  enumeration; meta records `unique` (true only when every puzzle has one
  solution), `solvable_proven` and each puzzle's count.

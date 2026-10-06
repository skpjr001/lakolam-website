---
title: "Code Breaker"
blurb: "Code Breaker — deduce a hidden code from guesses scored right place / wrong place (Bagels)"
category: maths
version: "1.0.0"
---
Crack the hidden code from a few earlier guesses and how close each one came.

## What it is

A deduction puzzle with numbers. Each puzzle hides a code of three, four or
five digits. Below the padlock are some guesses that have already been
tried, and each guess comes with feedback: how many of its digits are right
and in the right place, and how many are right but in the wrong place. Put
the clues together and only one code fits them all.

The feedback is printed in one of three ways: as sentences ("one digit is
right and in the right place", as in the popular lock-code puzzles), as two
columns of numbers, or in the words of the old game Bagels — FERMI for each
right digit in the right place, PICO for each right digit in the wrong place,
BAGELS when no digit is right.

## How to play

- Write the code in the empty boxes beside the padlock.
- **Right place** means a digit of the guess is in the code, in that very
  position. **Wrong place** means a digit of the guess is in the code, but in
  a different position.
- Unless the page says digits may repeat, no digit appears twice in the code
  or in the guesses.
- When digits may repeat, each digit of the code can be matched only once:
  if the code has one 3 and a guess has two, only one of them can count.
- The feedback does not say *which* digits are right. In the Bagels words,
  the order of FERMI and PICO tells you nothing.

Start with the easy wins. "Nothing is correct" rules out every digit in that
guess, everywhere. A guess with no digit in the right place tells you each
of its digits is not where it was guessed. Then compare guesses that share a
digit: if two clues can only both be true when a digit is in the code, it
is. Every clue printed is needed, so a clue you have not used yet is still
telling you something.

## Purpose

Logical deduction with a small, concrete search space: reading clues
carefully, ruling things out, and combining two facts to reach a third.
It suits brain-training books for adults, classroom logic lessons and
anyone who enjoyed Mastermind.

## History

Bagels — also called Pico, Fermi, Bagels — is a pencil-and-paper guessing
game for two players that was among the early computer games distributed in
BASIC in the 1970s. Mastermind, the board game with coloured pegs invented
by Mordecai Meirowitz, was published in 1970 and has a numbers variant often
called Bulls and Cows, a game much older than the board game. The
"crack the lock code" form, where the guesses are fixed and printed with
sentence clues, became a widely shared puzzle image online.

## This implementation

**Spec knobs:** `difficulty`; `digits` (3-5); `repeats` (whether a digit may
appear more than once); `feedback` (`sentences`, `counts`, `words`);
`count` (1-8 puzzles; sentences print one per row, the others two per row);
page `width`/`height`; `line`.

**Generation:** a secret code is drawn, then guesses are added one at a
time. Each step proposes a handful of random guesses from the same code
space and keeps one that rules out at least one more code; easier levels
take the most informative guess and allow "nothing is correct" clues, harder
ones take middling guesses and no blank clues. Once one code is left, every
clue the answer does not need is removed (in a seeded random order), so each
printed clue is necessary. Puzzles are redrawn until one lands in the
requested band, up to a budget, keeping the nearest. No page repeats a code.

**Solving:** uniqueness is exhaustive: all 10^k codes (or the codes with no
repeated digit) are scored against every clue, and exactly one must survive.
Difficulty comes from a solver ladder working on the digits still possible
in each position:

1. at a glance — a "nothing is correct" clue strikes its digits everywhere,
   a clue with nothing in place strikes each digit from its own position, a
   clue whose digits are all in the code (no repeats) strikes every other
   digit, and a position down to one digit takes it from the others;
2. one clue at a time — a digit is struck from a position when no code that
   fits that clue alone (within the digits still possible) puts it there;
   repeated in passes until nothing changes;
3. two clues together — the same test against pairs of clues.

Kids: settled at a glance or by one pass of single clues. Easy: two passes.
Medium: three or more passes. Hard: needs two clues read together. Expert:
none of these settles it, and the solver must try cases. The page reports
its hardest puzzle; meta keeps each puzzle's code, clues, hardest step and
band (`rating_basis`: `hardest_deduction_step_and_clue_count`). Expert is
the rarest band; when the budget runs out the nearest band is printed and
labelled as such.

**Guarantees:** deterministic per seed; every puzzle has exactly one code,
proven by the exhaustive filter in the generator and re-proven in tests by
an independent string-based scorer over every number 0 to 10^k − 1; every
printed clue is necessary (removing any one leaves more than one code); the
ratings are recomputed in tests from the clues alone.

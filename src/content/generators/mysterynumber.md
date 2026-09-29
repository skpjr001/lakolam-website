---
title: "Mystery Numbers"
blurb: "Mystery numbers — riddle cards whose clues fit exactly one number"
category: puzzle
version: "1.0.0"
---
"I am odd. My tens digit is 3 more than my ones digit. I am greater than
50." Read the clues and find the one number that fits them all.

## What it is

A page of riddle cards, four to six to a page. Each card speaks as a secret
number and gives a short list of clues about itself: whether it is odd or
even, how big it is, what its digits are and how they compare, what times
tables it is in, and at the higher levels whether it is a square, a prime or
a cube. The top of the page says the range every mystery number comes from
(1 to 100, or 1 to 1000). At the youngest levels each card also carries a
hundred chart for crossing numbers out.

## How to play

Read every clue on the card before you start. Then take the clues one at a
time and rule out every number that does not fit. On a card with a hundred
chart, cross those numbers out; otherwise make a short list of the numbers
that are still possible and strike them off as you go. Begin with the clue
that rules out the most, such as "I am less than 50" or "my ones digit is
3".

When only one number is left, check it against every clue once more, then
write it on the line: "I am ___".

Some words to know: the ones digit is the last digit, the tens digit the one
before it and the hundreds digit the one before that (a one-digit number has
no tens digit). "My digits add up to 8" means the digits added together
make 8, as in 35 or 71. A multiple of 4 is in the 4 times table; a factor of
96 divides 96 exactly. A square number is a number times itself (49 = 7 x 7),
a cube number is a number times itself times itself (125 = 5 x 5 x 5), and a
prime number has exactly two factors, 1 and itself.

Every card has exactly one answer, and every clue matters: leave any one out
and another number would fit too.

## Purpose

"Guess my number" riddles are a favourite in primary classrooms because
they practise a lot of number vocabulary at once (odd and even, place
value, multiples and factors) in a form children enjoy. They are also
honest logic puzzles: each clue narrows the possibilities, and the reader
learns to combine conditions and check an answer against all of them. The
hundred chart turns that narrowing into something visible.

## History

Number riddles in the "I am a number..." form are old, from the
arithmetical riddles of puzzle books to the "guess my number" game of
yes-or-no questions. As a classroom exercise they grew with the teaching of
place value and number properties, and the hundred chart, a staple of
primary maths since the nineteenth century, is the traditional tool for
solving them by elimination.

## This implementation

- **Spec knobs:** `difficulty`; `count` (4-6 riddles; a page with hundred
  charts holds 4); `hundred_chart` (a chart on each card at Kids and Easy,
  where the numbers run to 100); page `width` and `height`; `line`.
- **Generation:** Kids uses numbers from 1 to 100 (mystery numbers 10-99)
  and 2-3 clues about size, odd and even, one place-value digit and which
  digit is bigger. Easy uses 3 clues and adds digit sums, the odd/even of a
  digit, "k more than" digit relations and multiples of 3, 5 and 10. Medium
  uses 4 clues and adds the times tables to 9, "not a multiple of", "a
  factor of" and square numbers. Hard moves to 1-1000 (mystery numbers
  100-999) with 4-5 clues, hundreds digits and multiples of 11 and 25.
  Expert uses 5-6 clues and adds primes, cubes, "all my digits are
  different" and negative clues ("I am not a prime number"). For each
  mystery number a pool of true clues is drawn (one lower and one upper
  bound on round numbers, one exact digit, at most two digit comparisons);
  clues are added in random order while they rule something out, until one
  number is left; then every clue the others make redundant is removed. A
  riddle is kept only when its clue count is in the level's band, it has at
  least one clue about the whole number (not only its digits), and from
  Medium up at least one about multiples, factors, squares or primes. No
  number is the answer twice on a page.
- **Solving:** every number in the stated range is tested against every
  clue. The answer key writes each number in red and circles it on the
  hundred chart.
- **Guarantees:** deterministic per seed. For every riddle, brute force over
  the whole range shows exactly one number fits all the clues, and that for
  each clue, removing it lets a second number fit (every clue is necessary).
  The tests recount both from scratch and cross-check the digit reader
  against the written decimal number for every number to 1000. A digit
  clue about a place the number does not have (the tens digit of 7) is
  false. Difficulty is the range, the clue types and the clue count
  (`rating_basis: range_clue_types_and_count`); every level produces its own
  band. A page takes a few milliseconds at Kids to Medium and 0.05-0.3 s at
  Hard and Expert.

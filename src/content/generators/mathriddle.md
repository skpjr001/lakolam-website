---
title: "Math Riddle"
blurb: "Math Riddle — solve the problems, look up each answer in a code bank, decode the joke"
category: maths
version: "1.0.0"
---
Solve the problems to decode the answer to a riddle.

## What it is

A self-checking practice page with a joke as the reward. A riddle is
printed at the top, but its answer is hidden in a row of empty boxes. Each
box carries the number of a problem on the page. Solve that problem, find
its answer in the code bank, and the bank tells you which letter goes in
the box. Solve them all and the punchline appears.

## How to play

- Solve each numbered problem and write the answer on its line.
- Find the answer in the code bank. The letter under it is that problem's
  letter.
- Write the letter in every answer box marked with the problem's number.
  Some letters appear more than once in the answer.
- The code bank also holds numbers that are not the answer to any problem.
  If your answer leads to a letter that makes no sense in the punchline,
  check your work.
- Read the punchline!

## Purpose

Arithmetic practice with built-in motivation and feedback: the joke only
reads correctly when every answer is right, so children check their own
work. Topics and levels run from addition within 20 to four-digit sums and
two-digit multiplication and division, for classrooms, homework and
activity books.

## History

Riddle and joke decoding pages - often called "math riddles" or "secret
code" worksheets - have been classroom staples for decades. Teachers value
them because a wrong answer shows up as a wrong letter, so the puzzle marks
itself. The riddles on these pages were written for Lakolam.

## This implementation

**Spec knobs:** `difficulty` (number ranges); `topic` (`add`, `subtract`,
`add_subtract`, `multiply`, `divide`, `multiply_divide`, `mixed` - Kids'
mixed pages use addition and subtraction only); `decoys` (0-10 extra
entries in the code bank); `locale` (`us`, `uk`, `in`: the title says MATH
or MATHS, and numbers of five digits or more are grouped in the local
style); page `width`/`height`; `line`.

**Ranges:** Kids - sums within 20, tables to 5, division with a quotient
to 10. Easy - sums and differences within 100, tables to 10, quotients to
12. Medium - two-digit sums, differences within 200, two-digit times
one-digit and the matching divisions. Hard - three-digit sums and
differences, two-digit times two-digit up to 30, three-digit divided by
one-digit. Expert - four-digit sums and differences, two-digit times
two-digit, three-digit divided by two-digit. Every division is exact and no
answer is negative. Difficulty is the requested range (`rating_basis`:
`operand_ranges`).

**Generation:** a riddle is drawn from a list written for Lakolam. Its
punchline needs one problem per different letter; only riddles whose letter
count the chosen topic and level can supply with different answers are
drawn (division with small numbers has few different answers), and pages
other than Kids prefer riddles with at least nine different letters.
Problems are drawn with the operations spread evenly, no repeated problem
and no repeated answer, then shuffled and paired with the letters. Decoys
are near misses of the real answers - one, two, ten or a hundred off, or
the last two digits swapped - that are not themselves answers, each given a
letter the punchline does not use. The bank is printed in number order.
The answer key shows every answer, the decoded punchline and the decoys
struck through.

**Solving:** nothing is deduced: each problem is plain arithmetic at the
level's range, and its answer is looked up in the bank. Because answers
are all different and no decoy equals one, every box has exactly one
letter, and a wrong answer lands on a decoy or on no letter at all - the
punchline only reads right when every sum does.

**Guarantees:** deterministic per seed; every answer is exact
(`lako_arith`), non-negative and different from every other; the bank maps
numbers to letters one-to-one; no decoy equals any problem's answer;
decoding the boxes through the bank spells the punchline exactly
(`answers_checked` and `code_one_to_one` in meta). Tests re-check every
topic and level from the meta alone, recomputing each problem from its
printed text.

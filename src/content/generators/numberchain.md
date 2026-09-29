---
title: "Number Chains"
blurb: "Number chains — maths trains, working backwards, missing steps, loops and function machines"
category: maths
version: "1.0.0"
---
Maths trains and function machines: follow a number through a chain of
steps, work backwards to the start, find a missing step, and discover the
rule inside a machine.

## What it is

A number chain is a row of boxes joined by arrows. Each arrow carries a
step, such as +7, -3, x4, /2, DOUBLE or HALVE, and the number in each box is
the number before it with that step done. Some boxes are empty. The page
mixes four kinds of chain: chains that start from a given number, chains
where only the last number is given, chains with a missing step (an empty
bubble on an arrow), and loops that come back round to the number they
started from. Below the chains, function machines show an IN/OUT table: each
IN number goes through the machine's rule to make the OUT number. At the
higher levels the rule is hidden and must be worked out from the table.

## How to play

Start from a number you know and follow the arrows, doing each step in turn:
if the box holds 12 and the arrow says x3, the next box is 36.

If the start is missing, work backwards from the end, doing the opposite of
each step: the opposite of +7 is -7, the opposite of x4 is /4, and the
opposite of HALVE is DOUBLE.

An empty bubble is a missing step. Look at the numbers on either side: 12
to 36 is x3. The step is one of those listed at the top of the page (add or
take away a number up to the limit shown, or multiply or divide by a number
in the range shown), and only one of them fits. DOUBLE counts as x2 and
HALVE as /2.

A loop comes back round: the last arrow leads from the last box to the
first, so you can go either way round the loop.

For a function machine, put each IN number through the rule to get its OUT
number. If an IN number is missing, work backwards from the OUT number. If
the rule is missing, look at the complete rows first: what turns 4 into 13
and 6 into 19? (x3 then +1.) Check your rule on every complete row before
using it to fill the table.

## Purpose

Chains build fluency with the four operations and mental arithmetic in a
format children enjoy, and they teach inverse operations directly: working
backwards is undoing each step. Missing steps ask which operation links two
numbers, which is reasoning rather than recall, and function machines are
the first step towards algebra: a rule such as "x3 then +1" is the function
3n + 1, and finding it from a table is finding a formula from data.

## History

Function machines and "number trains" have been a staple of primary maths in
Britain since the 1970s (they appear throughout the English national
curriculum's work on inverse operations and early algebra), and the same
idea appears as "input/output tables" and "in and out boxes" in American
grade-school curricula and as "function machines" in Indian textbooks. Their
roots are in the idea of a function as a machine that turns inputs into
outputs, a picture that became common in school mathematics during the
"new math" reforms of the 1960s.

## This implementation

- **Spec knobs:** `difficulty`; `chains` (`mixed` (default), `forward`,
  `backward`, `missing_op`, `loop`); `count` (chains, 0-8); `machines`
  (function machines, 0-2); page `width` and `height`; `line`.
- **Generation:** Kids (grade 1): three steps of + and - with numbers to
  20, every chain started for you, machines with the rule printed. Easy
  (grade 2): four steps adding DOUBLE and HALVE, numbers to 50, working
  backwards; one machine rule printed and one + or - rule to find. Medium
  (grade 3): all four operations (x and / up to 10), numbers to 100, a
  missing step in some chains; one-step rules to find. Hard (grade 4): five
  steps, numbers to 200, working backwards, missing steps and loops of four
  boxes; rules of the form "x a then + or - b" to find. Expert (grade 5+):
  six steps, numbers to 500, two missing steps, loops of five; rules also of
  the forms "+ or - b then x a" and "/ a then + or - b". Steps are drawn at
  random, with add and take away twice as likely as each other operation.
  Every division comes out exactly, every number is at least 1 and within
  the level's range, no number appears twice in a chain and no chain repeats
  a single step all the way. A loop's last step is one from the level's list
  that returns to the start. A hidden machine rule reveals complete rows
  (two at least) until it is the only rule that fits; one other row asks for
  the IN number.
- **Solving:** a chain is kept only when forced deductions settle every
  blank: a known number through a known step (or backwards through its
  opposite) gives its neighbour, and a missing step between two known
  numbers must be the only step of the printed list that fits. A hidden
  rule must be the only one of its family, compared as a function (m x + c
  in exact fractions, so "+2 then x3" and "x3 then +6" are one rule). The
  tests re-check every chain by brute force: every start value 0 to the
  level's limit (or the printed one) and every listed step for each missing
  step, run forwards and compared with everything printed; every rule of the
  family that fits a machine's complete rows is checked to give the same
  answer in every blank, and a missing IN number to be the only whole number
  from 0 to 1000 that works.
- **Guarantees:** deterministic per seed. All arithmetic is exact whole
  numbers (`answers_checked`). Every blank box has exactly one answer, every
  missing step exactly one step from the printed list, and every hidden
  rule is unique among its family (`unique: true`). Because every rule
  here has the form m x + c and at least two complete rows with different
  inputs are always shown, any rule of that kind that fits them is the same
  rule. Difficulty is the number of steps, the operations used, the number
  range and the rule shape (`rating_basis`), mapped to grade bands as above
  (meta `grade`). Generation takes about a millisecond (up to ~15 ms at
  Expert).

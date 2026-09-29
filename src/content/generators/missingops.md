---
title: "Missing Operators"
blurb: "Missing operators — write the signs that make each equation true"
category: maths
version: "1.0.0"
---
The numbers are there and so is the answer; the signs are missing. Write +,
-, x or / in each circle to make the equation true.

## What it is

A maths worksheet of equations with the signs left out: "8 O 3 O 2 = 22",
where every O is an empty circle. Twelve such rows fill the top of the page,
and a second section, "find the missing number", prints four equations with
their signs in place and a box where one number should be ("7 x [ ] = 42").
The instructions at the top say which signs to use and how the equations
are worked: the youngest levels have a single circle, the middle level works
from left to right, and the top levels follow the usual order of operations,
with brackets at Expert.

## How to play

Look at the numbers on the left and the answer on the right, then choose a
sign for each circle: + (add), - (take away), x (times) or / (divide).
Write it in the circle. When you have filled every circle, work the
equation through and check that it gives the answer after the = sign.

Follow the rule printed at the top of the page. "Work from left to right"
means you do the first sign first, then the next, and so on. "Multiply and
divide before you add and subtract" means you do every x and / first, then
the + and -. Anything inside brackets is worked out before everything else.
A sign can be used more than once in the same equation.

Each equation has exactly one right set of signs, so if your signs make it
true, you have found the answer. For "find the missing number", write the
one number that makes the equation true in the box.

## Purpose

Most arithmetic practice gives the question and asks for the answer; this
page turns it around. To find the missing signs a child has to estimate
("22 is bigger than 8 and 3, so something is being multiplied"), test an
idea, and check it, which is number sense and reasoning rather than recall.
The multi-sign levels are also a gentle, self-checking way to practise the
order of operations: using the wrong order gives the wrong total, and the
child can see it.

## History

"Missing operator" or "missing sign" problems are a long-standing feature of
primary maths textbooks and mental-arithmetic tests, and a close cousin of
number puzzles such as Countdown's numbers round and the "four fours"
recreation, where signs are chosen to reach a target. Classroom versions
move from a single + or - sign, through the four operations, to longer
strings that depend on the order of operations.

## This implementation

- **Spec knobs:** `difficulty`; `count` (4-16 missing-operator equations);
  `missing` (0-8 missing-number rows); page `width` and `height`; `line`.
- **Generation:** Kids has one circle and uses + or - with numbers to 10;
  Easy has one circle and all four signs, with times-table multiplication
  and division; Medium has two circles worked left to right; Hard two or
  three circles with multiplication and division first; Expert three or four
  circles with that order and a bracket in every other row (a bracket is
  kept only when it changes the answer). Each row is built around a lead
  sign that rotates through the level's signs, so every sign gets its share
  of rows. Divisions are built to come out exactly, every intermediate
  result in the intended working is a whole number, zero or more, and "times
  one" and "divided by one" are never used. Missing-number rows use the same
  equations with one number blanked. No equation repeats on a page.
- **Solving:** for an operator row every assignment of all four signs to its
  circles (4, 16, 64 or 256 of them) is evaluated under the page's order rule
  in exact fractions, so an assignment that is only true through a fraction
  along the way, such as 3 / 2 x 4 = 6, still counts. For a missing-number
  row every whole number from 0 to 1000 is tried. The answer key writes the
  signs in red in the circles and the numbers in red in the boxes.
- **Guarantees:** deterministic per seed. Every operator row has exactly one
  assignment of the four signs that makes it true (all four are tried even
  at Kids, where the page only asks for + and -, so "2 O 2 = 4" can never
  appear), and it is the one in the key. Every missing-number row has exactly
  one whole number from 0 to 1000 that fits; every step between the blank and the
  answer undoes cleanly unless a zero wipes the blank out (times zero, or
  zero divided by it), and that makes almost every number fit, so one hit in
  that range means one answer among all numbers.
  Both checks are repeated in the tests by a second evaluator (shunting-yard
  to postfix) that reads the order rules independently. Difficulty is the
  number of signs and the order rule (`rating_basis:
  signs_and_order_of_operations`); every level produces its own band.
  Generation takes a few milliseconds per page (occasionally ~0.2 s at Hard).

---
title: "Solving Equations"
blurb: "Solving equations — one-step to both-sides linear equations, and balance puzzles"
category: maths
version: "1.0.0"
---
Linear equations to solve, from balance-scale pictures for young children
through one-step and two-step equations to variables on both sides, each
with exactly one answer and a worked answer key.

## What it is

A worksheet of numbered equations such as "3x + 5 = 20", "x/4 - 3 = 2",
"6(x - 2) = 42" or "5x - 3 = 2x + 9", each followed by writing lines, one
for every step, the last one darker for the answer. The unknown can be a
letter (x, y or n), an empty box or a triangle; with a box or triangle the
signs are written out (3 × box). The youngest level shows pan balances
instead: mystery boxes and numbered weights on two level pans, and a line
to write what one box weighs. The answer key writes the steps and the
answer in red (on a balance page, the weight of every box).

## How to play

Find the number that makes both sides equal. Whatever you do to one side,
do to the other, so the two sides stay equal, and write the new equation
on the next line:

- **Undo adding or subtracting** first: take away the number that was
  added, or add back the number that was taken away.
- **Undo multiplying or dividing** next: divide by the number in front of
  x, or multiply by the number under it.
- **Brackets:** divide both sides by the number outside the bracket, then
  carry on.
- **Like terms:** add the x terms on the same side together first
  (3x + 5x is 8x).
- **x on both sides:** take the smaller x term away from both sides so x
  is on one side only.

Stop when the line reads x = a number. Check it by putting that number
back into the first equation: both sides must come out the same. Some
answers at the top level are fractions.

For a balance picture: both pans weigh the same. Take the same weights
off both sides in your head until only boxes are left on one side, then
share what is left equally between the boxes.

## Purpose

Solving an equation is the first real algebra: keeping a statement true
while changing it. The balance pictures give young children that idea
before any symbols, and the written levels build it up one move at a time,
from one inverse operation to several, then to collecting like terms and
moving x from one side to the other. Writing one step per line makes the
reasoning visible and every answer can be checked by substitution.

## History

Solving for an unknown by doing the same to both sides is the method of
al-Khwarizmi's ninth-century book on "al-jabr" (restoring) and "al-muqabala"
(balancing), which gave algebra its name. The letter x for the unknown
comes from Descartes (1637). Pan-balance pictures became a standard way
into equations in primary classrooms in the twentieth century, alongside
the boxes and triangles used for missing numbers.

## This implementation

- **Spec knobs:** `difficulty`; `forms` (any of `add` x + b = c,
  `subtract` x - b = c, `multiply` ax = c, `divide` x/a = c, `two_step`
  ax ± b = c, `two_step_divide` x/a ± b = c, `distribute` a(x ± b) = c,
  `like_terms` ax + bx + d = c, `both_sides` ax + b = cx + d, sometimes
  with a bracket on the left; shared out evenly); `layout` (`equations` or
  `balance`); `unknown` (`box`, `symbol` or `letter`) and `letter` (`x`,
  `y`, `n`); `negatives`; `fractions` (fraction answers for every second
  multiply, two-step or both-sides problem); `worked_steps` (on the key);
  `problems` (1-24, 1-10 balances, 0 = from difficulty); page `width`,
  `height`, `line`.
- **Difficulty (grade):** Kids = balance pictures, x + b, ax and ax + b
  with up to three boxes (grade 1-3); Easy = one-step equations (5-6);
  Medium = two-step equations (6-7); Hard = two-step, brackets and like
  terms, with negative numbers (7-8); Expert = variables on both sides,
  brackets and like terms, negative numbers and some fraction answers
  (8-9). `rating_basis: equation_form_negatives_and_fractions`.
- **Generation:** every equation is built backwards from a chosen
  solution: pick x (a whole number, or a fraction p/k whose denominator is
  the final coefficient), pick the coefficients and constants, and compute
  the other side. The worked steps come from the form (undo the constant,
  undo the coefficient; divide out a bracket first; combine like terms
  first; move the x terms to one side). Without negatives, no negative
  number is written anywhere, in the equation or its working (a minus sign
  between terms is fine). Numbers stay under 150 (one-step) or 200, and no
  equation repeats on a page.
- **Solving:** each side is evaluated as an exact rational function of x
  at 0, 1 and 2, which proves it is linear and gives the coefficient of x
  after simplifying and the constant.
- **Guarantees:** deterministic per seed. Every equation has exactly one
  solution (the simplified coefficient of x is not zero) and it is the one
  on the key; substituting it back makes both sides equal; every worked
  line has the same single solution and the last reads x = solution. The
  tests re-check all of this from the printed text with an independent
  reader that parses the equations into linear forms. On balance pages the
  boxes and weights on the two pans weigh the same. A page takes a few
  milliseconds.

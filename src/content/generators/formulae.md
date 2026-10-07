---
title: "Changing the Subject"
blurb: "Formulae — substitute into formulae, change the subject, literal equations, the subject appearing twice"
category: maths
version: "1.0.0"
---
Substitute into formulae, rearrange real formulae and literal equations, and factorise out a subject that appears twice.

## What it is

A worksheet of four to sixteen questions on formulae. Substitute values
into a formula such as v = u + at or A = πr²h (leaving π in the answer
where asked); find a letter that is not the subject by substituting and
rearranging; make a given letter the subject of a real formula from
science and geometry — speed, force, Ohm's law, the area of a circle or
trapezium, kinetic energy, Pythagoras, Fahrenheit and Celsius; and solve
literal equations such as ax + b = c or (ax + b)/c = d for x. The
hardest questions have the new subject twice, as in ax + b = cx + d or
y = (x + a)/(x – b). The answer key gives one correct form of each
answer in red.

## How to play

- **Substituting:** replace each letter by its value and work it out,
  using the order of operations. Leave pi as pi when the question says so:
  A = pi × 6 × 6 = 36 pi.
- **Changing the subject:** undo what has been done to the letter you
  want, in reverse order, doing the same to both sides. In v = u + at,
  t is multiplied by a, then u is added: take away u, then divide by a,
  so t = (v – u)/a.
- **Brackets and fractions:** multiply out of a fraction first (multiply
  both sides by the bottom), or divide by what multiplies a bracket.
- **Squares and roots:** undo a square with a square root and a root by
  squaring. All the letters stand for positive numbers, so take the
  positive root: from A = pi × r × r, r = the square root of A/pi.
- **The letter on the bottom:** multiply both sides by it first, then
  rearrange.
- **The letter appears twice:** collect every term with the new subject on
  one side and everything else on the other, factorise it out, then
  divide. ax + b = cx + d gives ax – cx = d – b, so x(a – c) = d – b and
  x = (d – b)/(a – c).

Any rearrangement that is equal to the key's answer is correct:
(v – u)/a and v/a – u/a are the same formula.

## Purpose

Formulae carry the rules of science, finance and geometry, and using
them means substituting and rearranging. Changing the subject is in GCSE
Mathematics in England (Foundation: simple formulae; Higher: the subject
appearing twice), the US Common Core standard A-CED.4 ("rearrange
formulas to highlight a quantity of interest", the "literal equations"
of US textbooks), and NCERT algebra in India.

## History

Writing rules as formulae with letters began with François Viète, who
in 1591 used vowels for unknowns and consonants for known quantities;
Descartes' 1637 convention of x, y, z for unknowns and a, b, c for
constants stuck. Physics made formulae everyday: v = u + at and its
relatives come from Galileo's study of falling bodies, and V = IR from
Georg Ohm (1827).

## This implementation

- **Spec knobs:** `difficulty`; `topic` (`mixed`, `substitute`,
  `rearrange`, `literal`); `locale` (`uk` "make t the subject", titled
  "changing the subject"; `us` "solve for t", titled "formulas and literal
  equations"; `in` "make t the subject", titled "formulae"); `count`
  (4-16); `width` (300-2000 Pt) and `height` (300-3000 Pt). Out-of-range
  values are clamped and reported in meta as `requested_*`.
- **Generation:** formulae come from a catalogue of twenty real ones;
  literal equations are built from templates over random letters. The
  level is the number of inverse steps the rearrangement needs: Easy one
  step, Medium two, Hard three or more or any square, root or letter on
  the bottom of a fraction, Expert the subject appearing twice (and Hard's
  real formulae with at least two steps). Substitution: Easy and Medium
  find the subject from whole numbers or decimals; Hard finds another
  letter or keeps π; Expert finds a letter behind a square, a root or a
  denominator. Values are chosen so the answer is an exact short decimal.
- **Solving:** the formula is an expression tree; the rearrangement walks
  from the root to the one occurrence of the new subject, undoing each
  operation on the other side, then tidies the result (numbers first in
  products, fractions over fractions folded, a letter before a bracket).
  The twice-forms are factorised by template.
- **Guarantees:** every rearrangement is checked by substitution: for
  several sets of positive values of the other letters the answer gives a
  value of the new subject that makes the original formula true. Every
  substitution answer makes the formula hold, exactly where no π or root
  is involved. Meta: `answers_checked`, `unique` (one canonical form is
  shown; equivalent forms are correct), `difficulty`, `rating_basis`
  (`inverse_steps_squares_roots_and_repeated_subject`).

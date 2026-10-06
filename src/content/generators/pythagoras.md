---
title: "Pythagoras' Theorem"
blurb: "Pythagoras worksheet — hypotenuse, missing leg, converse, word problems and distance"
category: maths
version: "1.0.0"
---
Find the missing side of a right triangle, test whether a triangle is
right-angled, and measure the distance between two points.

## What it is

A worksheet of four to eight questions on Pythagoras' theorem. Most draw a
right triangle to scale, marked with its right angle, with two sides labelled
and the third marked X. Others give three sides and ask whether the triangle
is right-angled, tell a short story (a ladder against a wall, a kite on a
string, a ramp, a walk, a field, a wire to a pole), or plot two points on a
coordinate grid and ask how far apart they are. The answer key shows the
working and the answer for every question.

## How to play

In a right triangle, the longest side — the **hypotenuse** — is the one
opposite the right angle. The theorem says the square on the hypotenuse
equals the squares on the other two sides added together: a^2 + b^2 = c^2.

- **Finding the hypotenuse:** square the two shorter sides, add, and take the
  square root. For sides 5 and 12: 25 + 144 = 169, and the square root of
  169 is 13.
- **Finding a shorter side:** square the hypotenuse, *subtract* the square of
  the side you know, and take the square root. For 13 and 5: 169 - 25 = 144,
  so the side is 12.
- **Is it right-angled?** Square the two shorter sides and add them. If the
  total equals the square of the longest side, the triangle has a right
  angle; if not, it does not. The drawing will not tell you — some triangles
  are very nearly right-angled.
- **Word problems:** sketch the triangle first. A ladder, a kite string, a
  ramp, a wire or a diagonal path is the hypotenuse; the wall, the ground and
  the height are the other two sides.
- **Distance between two points:** draw the right triangle whose sides run
  along the grid. Count (or subtract) how far across and how far up, then use
  the theorem.

Harder pages ask for answers to one decimal place, or exactly in simplest
surd (radical) form: the square root of 72 is the root of 36 x 2, which is
6 root 2 — take out the largest square factor.

## Purpose

Pythagoras' theorem is a core topic of grade 8 and KS3–GCSE geometry, and a
gateway to trigonometry, coordinate geometry and vectors. Practice moves
from Pythagorean triples (whole-number answers, so the method is the focus)
to decimals and exact surds, and from abstract triangles to the
applications — heights, diagonals, distances — that make the theorem worth
knowing. The converse questions guard against the commonest slip, adding
when one should subtract, by making students identify the hypotenuse first.

## History

The relation between the sides of a right triangle was known long before
Pythagoras (6th century BC): the Babylonian tablet Plimpton 322 (about
1800 BC) lists Pythagorean triples, and the Indian *Baudhāyana Śulbasūtra*
states the rule for building altars. Euclid's *Elements* (Book I,
Proposition 47) gives the classic proof, and its converse (Proposition 48).
The Chinese *Zhoubi Suanjing* calls it the *gougu* theorem.

## This implementation

- **Spec knobs:** `difficulty`; `mode` (`mixed`, `hypotenuse`, `leg`,
  `converse`, `word`, `distance`); `locale` (`us`: inches, feet and miles,
  "right triangle", "nearest tenth", "radical form"; `uk` and `in`:
  centimetres, metres and kilometres, "right-angled", "1 decimal place",
  "surd form"); `count` (4–8); `width`, `height`, `line`.
- **Generation:** every given is a whole number, so every answer is √n for a
  whole number n, and the level controls the form of n. Kids uses the
  3-4-5 family (plus 5-12-13 and 8-15-17) and mostly asks for the
  hypotenuse; Easy uses every triple up to 30 and adds legs and the
  converse; Medium uses triples up to 65 and adds word problems (all three
  give whole-number answers). Hard uses any whole sides with n not a
  square, answered to one decimal place. Expert asks for exact answers with
  n = k²m, k ≥ 2 and m square-free, so simplifying is always needed.
  Converse triangles are a triple or a near miss (one side one longer or
  shorter), half each. Triangles are drawn to their true proportions,
  rotated, mirrored and tilted for variety, never more lopsided than 3 : 10;
  a converse triangle is drawn true to its three sides with no right-angle
  mark. Distance questions plot the points on a grid up to Hard and print the
  coordinates at Expert. No question repeats on a page.
- **Solving:** the key shows a working line (for example
  X² = 13² − 5² = 144, or X = √(36 × 2)) and the answer.
- **Guarantees:** every answer is checked when the page is built and again
  in the tests from the printed numbers alone: a whole answer squares back
  exactly; a rounded answer t (in tenths) satisfies
  (2t − 1)² ≤ 400n < (2t + 1)² — pure integer arithmetic, so floating point
  never decides a rounding, and no value within 1e-6 of a rounding boundary
  is used; a surd k√m squares back to n with m square-free (checked by
  trial division); a converse verdict is the exact integer test on the
  longest side. The tests also read every drawn triangle back: side
  lengths match their labels and the right-angle mark sits on a true right
  angle. Meta reports `answers_checked`, the `answer_form` (whole,
  rounded_1dp or surd) and each question with its working and answer.

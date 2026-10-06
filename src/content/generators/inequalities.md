---
title: "Inequalities"
blurb: "Linear inequalities worksheet — solve, show on a number line, double inequalities and integer solutions"
category: maths
version: "1.0.0"
---
Solve linear inequalities and show every answer on a number line.

## What it is

A worksheet of four to twelve inequality questions in two columns, most
with a number line underneath. Some draw a set on the number line and ask
for the inequality it shows; others give an inequality to solve and then
mark on the line; harder pages add double inequalities such as
-3 < 2x + 1 <= 9 and ask for every integer that fits. The answer key
writes each answer and draws it on its number line.

## How to play

An inequality compares two sides: < means "less than", > "greater than",
<= "less than or equal to" and >= "greater than or equal to".

- **Solving:** treat it like an equation — do the same to both sides to
  get x on its own. 3x - 4 <= 11 becomes 3x <= 15, so x <= 5.
- **Negative numbers:** when you multiply or divide both sides by a
  negative number, turn the sign round. -2x < 6 becomes x > -3.
- **Number lines:** put a circle on the boundary number. Fill it in when
  the number is included (<= or >=); leave it open when it is not (< or >).
  Then draw a thick line with an arrow in the direction of the numbers
  that work: to the right for "greater than", to the left for "less than".
- **Double inequalities:** work on all three parts at once:
  -3 < 2x + 1 <= 9 becomes -4 < 2x <= 8, so -2 < x <= 4. The answer is a
  thick line between two circles.
- **Integers:** list the whole numbers (negative ones too) inside the
  answer, minding which ends are included. For -2 < n <= 4 they are
  -1, 0, 1, 2, 3 and 4.

Check an answer by trying a number from your answer set in the original
inequality, and one from outside it.

## Purpose

Inequalities extend equation solving to ranges of answers and are the
start of linear programming, error bounds and domains. The page covers
Common Core 6.EE.8 and 7.EE.4b (writing, solving and graphing
inequalities) and the KS3–GCSE strand on solving linear inequalities,
including the number-line conventions and the reversal rule that is the
commonest mistake.

## History

The symbols < and > were introduced by Thomas Harriot in *Artis
Analyticae Praxis* (1631); the signs with a bar for "or equal to" were
first printed by Pierre Bouguer in 1734. Inequalities became a subject of
their own with Hardy, Littlewood and Pólya's *Inequalities* (1934), and
systems of linear inequalities are the heart of linear programming
(Kantorovich, 1939; Dantzig's simplex method, 1947).

## This implementation

- **Spec knobs:** `difficulty`; `mode` (`mixed`, `solve`, `read`,
  `compound`, `integers`); `locale`; `count` (4–12); `width`, `height`,
  `line`.
- **Generation:** Kids reads number lines and solves x + b < c with
  positive whole numbers on a 0–12 line; Easy adds subtraction, negative
  answers and ax < c; Medium two-step inequalities, bounded number lines,
  simple double inequalities and integer lists; Hard puts the unknown on
  both sides and divides by negatives (so the sign turns round) and uses
  ax + b inside double inequalities; Expert adds brackets such as
  -3(x - 4) < -4x + 7, fraction answers (most of its solving questions)
  and negative coefficients inside double inequalities. Double
  inequalities and integer lists start at Medium: lower requests in those
  modes are served at Medium and labelled `requested_difficulty`. The
  number line spans 12 units chosen to hold every end at least one unit
  in from its arrows; a fraction end is drawn at its exact place and
  labelled. No question repeats on a page.
- **Solving:** exact rational arithmetic. Terms are collected to
  (a - c)x REL (d - b), then divided by a - c, turning the sign round when
  it is negative; a double inequality is the intersection of its two
  halves.
- **Guarantees:** every solution set is checked when the page is built by
  substitution: each boundary value is where the truth of the printed
  inequality changes (a value 1/1000 inside satisfies it, 1/1000 outside
  does not), and an included end satisfies it while an excluded one does
  not. The tests re-check every printed answer against the printed
  question at every multiple of 1/60 across the number line with an
  independent expression reader, list integer answers by brute force,
  check the sign turns round exactly when the coefficient is negative,
  and read every drawn number line back — the bar, its arrows and the
  open or filled circles — to recover the answer set exactly.

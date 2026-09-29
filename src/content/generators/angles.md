---
title: "Angles"
blurb: "Angles — measure with a protractor, draw, classify and find missing angles"
category: maths
version: "1.0.0"
---
A page of angles to measure, draw, name and calculate, from reading a
protractor to algebra around a point.

## What it is

An angles worksheet of four to nine questions. Some angles sit under a
printed protractor, ready to read; others are bare, for a real protractor.
Some questions give a base arm and a size to draw. Some ask what type an
angle is: acute, right, obtuse, straight or reflex. The rest are
missing-angle figures: angles in a right angle, on a straight line, around a
point, where two lines cross, inside a triangle, at an exterior angle, or
written with an unknown such as (2X + 10)°.

## How to play

To read a protractor, find the 0 that lies on the first arm of the angle.
Follow that scale (inner or outer) round to where the second arm crosses it,
and write the number. A reflex angle is bigger than a straight line: measure
the smaller angle and take it away from 360°.

To draw an angle, put the centre of your protractor on the dot and its base
line along the arm. Mark a dot at the size you need, counting from the 0 on
the arm, then join it to the vertex with a ruler.

To name an angle: acute is less than a right angle (90°), obtuse is between
a right angle and a straight line (180°), and reflex is more than 180°.

For missing angles, do not measure: the diagrams are not drawn to scale.
Use the facts instead. Angles in a right angle add up to 90°, on a straight
line to 180°, and around a point to 360°. The angles in a triangle add up to
180°. Where two lines cross, the opposite angles are equal. The two base
angles of an isosceles triangle (the one with two equal marked sides) are
equal. An exterior angle of a triangle equals the two opposite inside angles
added together. When the angles are written with X, write the fact as an
equation and solve it for X.

## Purpose

Angles run through the middle years of school maths: recognising right
angles, measuring and drawing with a protractor, then reasoning with angle
facts, which is many pupils' first taste of geometric proof. Two things spoil
most angle worksheets: angles that are not quite the size they claim, and
missing-angle diagrams drawn so accurately that the answer can be measured
instead of worked out. This page avoids both.

## History

The protractor, a graduated half-circle, has been a drawing and navigation
instrument since at least the 17th century, and the 360-degree circle goes
back to Babylonian astronomy. The angle facts used here (angles on a line,
vertically opposite angles, the angle sum of a triangle, the exterior angle)
are propositions from the first book of Euclid's *Elements*, and they have
been the backbone of school geometry ever since.

## This implementation

- **Spec knobs:** `difficulty`; `mode` (`mixed`, `measure`, `draw`,
  `classify` or `missing`); `count` (4-9 questions); `protractor` (print a
  protractor over measuring questions, or leave the angles bare for a real
  one); page `width` and `height`; `line`.
- **Generation:** difficulty maps to grade. Kids (grade 3) measures on the
  printed protractor in tens and names acute, right and obtuse angles. Easy
  (grade 4) measures and draws in fives, adds straight angles, and splits a
  right angle or a straight line in two. Medium (grade 5) works to the
  degree, adds reflex angles, and finds angles on a line and around a point.
  Hard (grades 6-7) adds vertically opposite angles, triangles and reflex
  measuring, with figures turned at any angle. Expert (grade 8) uses
  isosceles triangles, exterior angles and algebraic angles (kX + c) on a
  line, around a point and at a crossing. Missing-angle figures are drawn
  with every angle distorted by up to 16 degrees while the structure is kept
  exactly (a line stays straight, a turn stays whole); the angle asked for is
  always at least 7 degrees off its true size, and around a point no two rays
  are drawn close to a straight line, so no figure looks like a crossing.
  No question repeats on a page.
- **Solving:** the answer key writes every measurement, type and missing
  angle (or value of X) in red and draws the arm of every "draw" question in
  red with its size.
- **Guarantees:** deterministic per seed. Every measured, drawn and
  classified angle is placed by a uniform scale, so it is exactly its stated
  size; the tests read every angle back from the placed arms, and for the
  printed protractor they check that one scale's 0 lies on the first arm and
  that the second arm crosses that scale at a whole-degree tick equal to the
  answer (360° minus it for reflex angles). Bare angles are exact on paper
  when printed at 100%. Every missing-angle figure uses positive whole
  degrees that make 90, 180 or 360 exactly; the tests recompute each answer
  from the printed labels alone (so it is always deducible), check each
  label against its angle, and measure the placed triangles to confirm they
  are drawn at their distorted sizes. Difficulty is the grade-level skill set
  (`rating_basis: grade_level_skills`), so every level produces its own band.

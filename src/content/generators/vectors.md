---
title: "Vectors"
blurb: "Vectors — column vectors on a grid, adding and scaling, magnitudes, vector geometry with midpoints and ratios"
category: maths
version: "1.0.0"
---
Column vectors on a grid, adding and scaling them, magnitudes, and vector geometry with midpoints and ratios.

## What it is

A worksheet of four to twelve vector questions. Read the column vectors
of arrows drawn on a squared grid, and draw a vector (or a + b, a – b,
2a) from a marked point; add, subtract and multiply column vectors by
numbers, and find the numbers p and q that make pa + qb equal a given
vector; find the magnitude (length) of a vector, as a whole number or in
simplest surd form; and in a triangle, parallelogram or trapezium with
OA = a and OB = b, write a vector such as MN in terms of a and b when M
and N are midpoints or divide a side in a given ratio. Vectors are
printed in bold. The answer key writes every answer in red and draws
the vectors to be drawn.

## How to play

- **Column vectors:** the top number is how far the arrow goes across
  (right is positive, left negative), the bottom how far up (up positive,
  down negative). Count squares from the tail of the arrow to its head.
- **Drawing:** start at the point, go across by the top number and up or
  down by the bottom number, and draw the arrow with its head at the end.
- **Adding and scaling:** add the top numbers and the bottom numbers
  separately; to multiply by a number, multiply both. To find p and q,
  write one equation for the top numbers and one for the bottom, and
  solve them together.
- **Magnitude:** by Pythagoras, the length of a vector with parts x and y
  is the square root of (x × x + y × y). Write it as a whole number or in
  simplest surd form: the square root of 20 is 2 root 5.
- **Vector geometry:** to go from one point to another, follow a route
  along vectors you know, adding them as you go, and going against an
  arrow takes it away: AB = AO + OB = –a + b. A midpoint is half way
  along: if M is the midpoint of AB, AM = 1/2 AB. If AP : PB = 2 : 3,
  then AP is 2/5 of AB. Simplify by collecting the a terms and the b
  terms.

Written by hand, a vector is underlined; in print it is bold.

## Purpose

Vectors describe movement — how far and in which direction — and are the
language of mechanics, computer graphics and navigation. Column vectors
and their arithmetic are GCSE Mathematics Foundation content in England,
and vector geometry (proving and using results in shapes) is a Higher
tier staple; the same ideas are in the US Common Core standards N-VM and
in NCERT's introduction to vectors.

## History

The parallelogram rule for combining forces goes back to Simon Stevin
(1586) and Newton's *Principia*. William Rowan Hamilton coined the word
"vector" in the 1840s while working on quaternions, and Josiah Willard
Gibbs and Oliver Heaviside turned that work into the vector algebra of
modern physics in the 1880s. Column vectors in round brackets are the
British school notation for the same idea.

## This implementation

- **Spec knobs:** `difficulty`; `topic` (`mixed`, `column`,
  `arithmetic`, `magnitude`, `geometry`); `locale` (`uk` "column vector",
  `us` "component form", `in` "length" for magnitude); `count` (4-12);
  `width` (300-2000 Pt), `height` (300-3000 Pt) and `line` (0.5-4 Pt,
  the arrows and shapes). Out-of-range values are clamped and reported in
  meta as `requested_*`.
- **Generation:** Easy: two arrows on a 14 × 8 grid with small parts, and
  drawing a vector. Medium: three arrows (never more than one along a
  grid line), drawing a + b, a – b or 2a, adding, subtracting and scaling,
  and whole-number magnitudes from Pythagorean triples. Hard: combinations
  such as 2a – 3b, magnitudes in surd form, midpoints in triangles and
  parallelograms. Expert: finding p and q, magnitudes of combinations,
  points dividing a side in a ratio, trapezia. Column questions are set at
  Easy and Medium, arithmetic and magnitude from Medium, geometry from
  Hard; other requests are served at the nearest level and the meta
  records `requested_difficulty`.
- **Solving:** exact arithmetic throughout. Each geometry point is stored
  as its coefficients of a and b, so a vector between two points is the
  difference of their coefficients.
- **Guarantees:** each answer is re-derived another way: arrows from their
  end coordinates, combinations component by component, p and q
  substituted back, magnitudes as (k root r) squared = x × x + y × y with r
  square-free, and geometry answers by placing every point at its drawn
  coordinates and solving the 2 × 2 system for the coefficients of the
  drawn a and b — unique because a and b are not parallel. Meta:
  `answers_checked`, `unique`, `difficulty`, `rating_basis`
  (`question_forms_by_level`).

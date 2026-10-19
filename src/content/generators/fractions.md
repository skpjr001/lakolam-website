---
title: "Fractions"
blurb: "Fractions — name, shade, compare and match shaded area models"
category: maths
version: "1.0.0"
---
Shaded circles, bars and grids: name the fraction, shade the fraction,
compare two, and find the equal one.

## What it is

A worksheet of fraction questions built on area models: circles cut into
equal slices, bars cut into equal strips and rectangles cut into equal grids,
some parts shaded. Each panel asks one of five questions: what fraction is
shaded, shade a given fraction, compare two fractions with <, > or =, fill in
the missing number of an equivalent fraction, or write several shaded wholes
as a mixed number. Two more pages can be chosen on their own: fractions on a
number line, and "are the parts equal?" pictures.

## How to play

A fraction has two numbers. The bottom number says how many equal parts the
whole is cut into; the top number says how many of those parts you count.

- **What fraction is shaded?** Count all the parts and write that number on
  the bottom; count the shaded parts and write that number on top.
- **Shade this fraction.** Shade as many parts as the top number says.
- **Write <, > or =.** Decide which fraction is bigger. With the same bottom
  number, the bigger top number wins; with the same top number, the smaller
  bottom number wins (the pieces are bigger). Otherwise, rewrite both with a
  common bottom number and compare the tops. The open mouth of < or > faces
  the bigger fraction.
- **Fill in the missing number.** Whatever you multiply the bottom by, multiply
  the top by the same number (or divide both by the same number).
- **Write as a mixed number.** Count the wholes that are completely shaded,
  then write the part of the last whole as a fraction beside them.
- **What fraction is at the dot?** Count the equal jumps from 0 to 1: that
  is the bottom number. Count the jumps from 0 to the dot: that is the top
  number. On a line that goes on to 2, keep counting past 1 (the dot can be
  more than one whole, like 5/4). An equal fraction is right too.
- **Mark this fraction on the line.** Count jumps from 0 to 1 to see how
  many equal parts the line uses, then count along as many jumps as the top
  number says and draw a dot. If the line is cut into eighths and you must
  mark 3/4, remember 3/4 = 6/8: count six jumps.
- **Are the parts equal?** Look at each piece. If every piece is exactly the
  same size, circle YES; if any piece is bigger or smaller, circle NO. Pieces
  can be equal even when they are not all the same shape, as long as each
  covers the same amount of the whole.

## Purpose

Fractions are where many children first stall in maths, and pictures are the
standard remedy: a shaded area makes "three quarters" something you can see.
One page covers the whole early fraction strand, from halves and quarters to
comparing unlike fractions and mixed numbers, with a key a parent or teacher
can mark at a glance.

Grade notes: the name-it and shade-it questions and "are the parts equal?"
suit ages 5-7 (kindergarten to grade 2: halves, thirds, quarters, and the
idea that fraction parts must be equal); fractions on a 0-1 number line are
a grade 3 topic (ages 8-9); 0-2 lines with fractions past one whole, and
comparing unlike fractions and equivalences, suit grades 3-4; mixed numbers
and simplifying suit grades 4-5.

## History

Area models for fractions (the "pizza" circle and the fraction bar) have been
classroom staples for well over a century, and fraction strips and walls
became standard manipulatives in the twentieth century; the order of topics
here follows the common primary progression.

## This implementation

- **Spec knobs:** `difficulty`; `tasks` (`auto` for the level's mix, or only
  `write`, `shade`, `compare`, `equivalent`, `mixed`, `number_line` or
  `equal_parts` — the last two are never part of `auto`); `model` (`auto`,
  `circle`, `bar`, `grid` — grids fall back to bars for prime
  denominators; for `equal_parts`, `bar` cuts strips, `circle` sectors and
  `grid` a square; ignored by `number_line`); `count` (4-12 questions); page `width` and `height`; `line`.
- **Generation:** Kids uses halves and quarters with name-it and shade-it
  questions. Easy adds thirds, sixths and eighths and comparing fractions with
  the same denominator (with pictures). Medium adds fifths and tenths,
  comparisons with the same numerator or equal values, and equivalent
  fractions up to twelfths. Hard compares unlike fractions up to twelfths
  without pictures and hides numerator or denominator in equivalences up to
  24ths. Expert adds improper fractions to comparisons, simplifying
  equivalences up to 36ths and mixed numbers. Question kinds are dealt
  round-robin, so each appears; no question repeats on a page.
  Number lines: half the questions read a dot, half mark a fraction. Kids
  uses 0-1 lines in halves, thirds and quarters; Easy adds sixths and
  eighths; Medium fifths and tenths; Hard mixes 0-1 lines up to twelfths
  with 0-2 lines (up to eighths) whose points can pass one whole; Expert
  uses 0-2 lines and names the point to mark in lowest terms, so a line in
  eighths may ask for 3/4. A dot is never on a whole number. Equal parts:
  half the pictures are equal. Bars are cut into strips and circles into
  sectors (Kids 2 or 4 parts, Easy 2-4, Medium and up 2, 3, 4, 6 or 8);
  squares are cut by lines from a point to the four corners, by a cross, or
  by one straight cut from top to bottom (a slanted cut can still make
  halves). An unequal split is visibly unequal: its largest part is at
  least 7/5 of its smallest.
- **Solving:** every answer is computed exactly with integers: comparisons by
  cross-multiplication, equivalence by scaling, mixed numbers by division
  with remainder. The key shades the Shade questions and writes every answer
  in red.
- **Guarantees:** deterministic per seed. A number-line point is a tick
  index over a whole number of equal steps, so its fraction is exact; the
  tests check every point against the printed fraction over the least common
  denominator. Equal-parts areas are integers (strip widths and sector
  angles in 24ths, polygon corners on a 12 × 12 grid, doubled shoelace
  area); the tests recompute every polygon area by an independent trapezoid
  rule, check the pieces tile the whole, and that YES holds exactly when all
  areas are equal. Every picture's shaded parts over
  its total parts equals the stated fraction exactly; every comparison symbol
  and every equivalence is re-checked in the tests with a second, independent
  exact method (both fractions over their least common denominator); in a
  mixed-number picture every whole but the last is fully shaded. Difficulty
  is set by the denominators and question types used
  (`rating_basis: denominators_and_question_types`).

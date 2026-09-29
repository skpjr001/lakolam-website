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
as a mixed number.

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

## Purpose

Fractions are where many children first stall in maths, and pictures are the
standard remedy: a shaded area makes "three quarters" something you can see.
One page covers the whole early fraction strand, from halves and quarters to
comparing unlike fractions and mixed numbers, with a key a parent or teacher
can mark at a glance.

## History

Area models for fractions (the "pizza" circle and the fraction bar) have been
classroom staples for well over a century, and fraction strips and walls
became standard manipulatives in the twentieth century; the order of topics
here follows the common primary progression.

## This implementation

- **Spec knobs:** `difficulty`; `tasks` (`auto` for the level's mix, or only
  `write`, `shade`, `compare`, `equivalent` or `mixed`); `model` (`auto`,
  `circle`, `bar`, `grid` — grids fall back to bars for prime
  denominators); `count` (4-12 questions); page `width` and `height`; `line`.
- **Generation:** Kids uses halves and quarters with name-it and shade-it
  questions. Easy adds thirds, sixths and eighths and comparing fractions with
  the same denominator (with pictures). Medium adds fifths and tenths,
  comparisons with the same numerator or equal values, and equivalent
  fractions up to twelfths. Hard compares unlike fractions up to twelfths
  without pictures and hides numerator or denominator in equivalences up to
  24ths. Expert adds improper fractions to comparisons, simplifying
  equivalences up to 36ths and mixed numbers. Question kinds are dealt
  round-robin, so each appears; no question repeats on a page.
- **Solving:** every answer is computed exactly with integers: comparisons by
  cross-multiplication, equivalence by scaling, mixed numbers by division
  with remainder. The key shades the Shade questions and writes every answer
  in red.
- **Guarantees:** deterministic per seed. Every picture's shaded parts over
  its total parts equals the stated fraction exactly; every comparison symbol
  and every equivalence is re-checked in the tests with a second, independent
  exact method (both fractions over their least common denominator); in a
  mixed-number picture every whole but the last is fully shaded. Difficulty
  is set by the denominators and question types used
  (`rating_basis: denominators_and_question_types`).

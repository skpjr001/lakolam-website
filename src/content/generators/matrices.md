---
title: "Figure Matrices"
blurb: "Figure matrices — find the rule along the rows and columns and pick the missing picture"
category: puzzle
version: "1.0.0"
---
A grid of pictures with one box empty. Work out how the pictures change
along the rows and down the columns, and choose the one that belongs.

## What it is

Picture-pattern puzzles in the style of Raven's Progressive Matrices and the
figure-matrix questions in school ability tests. Each puzzle is a 2×2 or 3×3
grid. The pictures change by simple rules — the shape, how many there are,
how they are filled in, which way they point, how big they are — and the
bottom-right box is missing. Below or beside it are four to eight choices;
exactly one follows every rule.

Harder pages add line puzzles: each picture is a few lines in a square, and
the third picture in a row is made by combining the first two.

## How to play

1. Look along the top row. What changes from one box to the next? What stays
   the same?
2. Check the other rows (and the columns) — the same rules hold there.
3. Use the rules to work out what the empty box must hold: the right shape,
   the right number, the right filling, pointing the right way, at the right
   size.
4. Circle the choice that matches. Watch out — the wrong choices are nearly
   right, but each one breaks a rule.

The rules you may meet: a thing stays the same; it changes from row to row
or column to column; it grows or turns a step at a time; each row has the
same three things in a different order; the third number is the first two
added together. In line puzzles, the third box shows the lines from both
first boxes, or the first box with the second box's lines taken away, or
only the lines that appear in exactly one of the first two.

## Purpose

Non-verbal reasoning: spotting what varies, holding several rules in mind
at once, and checking an answer against all of them. Because there are no
words or numbers to read, the puzzles suit children from five upwards and
are widely used to practise for figure-matrix sections of school tests
(NNAT, CogAT, 11+ non-verbal reasoning).

## History

John C. Raven published the *Progressive Matrices* in 1938 as a test of
reasoning free of language and schooling; its 3×3 grids of patterned
figures, with one cell missing and eight choices, became the model for the
matrix items in the Naglieri Nonverbal Ability Test (NNAT, 1997), the
Cognitive Abilities Test (CogAT) and countless puzzle books. Carpenter, Just
and Shell's analysis (1990) of the rules behind Raven's items — constant in
a row, quantitative progression, distribution of three values, figure
addition or subtraction — is the rule set used here.

## This implementation

- **Spec knobs:** `difficulty` (Kids 2×2, one changing attribute, 4
  choices; Easy 3×3, one attribute, 4 choices; Medium 3×3, two attributes,
  6 choices; Hard 3×3, three attributes, or a line puzzle with OR or
  subtract, 6 choices; Expert 3×3, three attributes including a
  distribution or sum rule, or a line puzzle with XOR, 8 choices), `count`
  (matrices per page; 0 = 3 for 2×2, 2 for 3×3; at most 4), `options`
  (4–8), `lines` (allow line puzzles on Hard and Expert), `width`,
  `height`, `line`.
- **Generation:** a palette of four shapes (shapes whose quarter turns all
  look different when turning is in play) and four fills is drawn from
  `lako-icons`; the chosen attributes get rules (constant, by row, by
  column, progression, distribution of three, sum of counts) and the rest
  stay constant. Line puzzles draw 3–5 of eight segments per first and
  second cell and combine them. Distractors change one or two attributes
  of the answer (mostly the ones that vary — the tempting mistakes); line
  distractors are the other overlay operations and one- or two-line edits.
- **Solving:** a library of rule hypotheses, wider than the generator's own
  rules: per attribute, constant everywhere, constant along rows or
  columns, even steps along rows or columns (common or per line, turning
  modulo four), the same values in every row or column, and row or column
  sums and differences of counts; for line figures, constant, by row or
  column, distribution, and AND, OR, XOR, XNOR and both subtractions along
  rows or columns.
- **Guarantees:** for every attribute, every library rule consistent with
  the eight shown cells predicts the same value, so the missing figure is
  determined; the right choice is that figure, and every other choice fails
  the library (`unique: true`). Every pair of choices is rendered and
  compared as pixels (soft IoU below `lako_icons::DISTINCT_BELOW`), and every
  fill in play is checked to read clearly on every shape in play. Rated by
  how many attributes vary and whether a distribution or sum rule is used,
  or by the overlay operation; the page carries the rating of its easiest
  matrix (`rating_basis: varying_attributes_and_rule_kinds_easiest_matrix`).
  The key draws the missing figure in place and rings the right choice.

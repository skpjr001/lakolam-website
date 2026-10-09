---
title: "Non-Verbal Reasoning"
blurb: "11+ non-verbal reasoning — picture analogies, shape codes and hidden shapes, multiple choice, every answer proven by a closed rule library"
category: puzzle
version: "1.0.0"
---
11+ picture puzzles: analogies, codes and hidden shapes, with an answer key.

## What it is

Practice pages in the style of the UK 11+ non-verbal reasoning papers and
the US gifted-programme picture tests. Each question is multiple choice
with options lettered A to E:

- **Analogies** - the first two pictures go together in a certain way;
  which picture goes with the third in the same way?
- **Codes** - each picture has a letter code, each letter standing for one
  thing about the picture; what is the code of the new picture?
- **Hidden shapes** - which of the small shapes is hidden in the big
  figure, the same size and the same way round?

## How to play

**Analogies.** Look at how the first picture changes into the second. It
may turn, flip over as in a mirror, swap its colours, swap its shapes, lose
its inner shape, or have its dot move round - or two of these at once. Do
the same to the third picture and circle the option that shows the result.

**Codes.** Each letter stands for one feature, such as the shape, its
shading, the small shape inside or where the dot is. Pictures that share a
letter share that feature. Work out which feature each letter belongs to,
then build the code for the last picture. Some features change without
changing the code - ignore them.

**Hidden shapes.** One option can be found in the big figure: every one of
its lines lies along lines of the figure, at the same size and the same way
round. It may not be turned or flipped over. Extra lines may pass through
it.

Circle the letter of your answer.

## Purpose

Visual reasoning without words: spotting rules, holding several features
in mind at once and checking each option carefully. These are the
question types of 11+ non-verbal reasoning papers and of cognitive-ability
tests used for gifted and talented programmes. Pair them with the figure
matrices, odd one out, what comes next, paper folding and cube nets pages
for a full practice paper.

## History

Figural analogies and classification items were part of the earliest
intelligence tests in the early twentieth century, and embedded-figure
tests were developed in the 1940s and 1950s. Non-verbal reasoning has been
a standard part of the English eleven-plus examination since the 1940s
and remains one of its papers today.

## This implementation

**Spec knobs:** `kind` (`mixed` with a section of each type, `analogy`,
`codes`, `hidden`); `difficulty`; `questions` (1-12); `choices` (3-5
options); `name_line`; page `width`, `height`, `margin`. Clamped values are
reported as `requested_<field>`.

**Generation:** pictures come from a closed vocabulary: eight outer shapes
(circle, square, triangle, pentagon, hexagon, diamond, cross, arrow) in any
quarter turn or mirror image; white, black, grey or hatched in one of four
directions; perhaps a small inner shape; perhaps a dot at one of eight
places round it. Analogies apply a rule from the library - turn a quarter,
a half or three quarters, mirror in an upright or level line, invert black
and white, swap fills, swap shapes, drop the inner shape, move the dot -
or two of them. Codes give 2 or 3 letters to features (shape, shading,
inner shape, dot) with a feature that varies without counting from Medium
up. Hidden shapes are lattice polygons with level, upright and 45° sides,
camouflaged by other shapes and a long line, on a 5 to 7 square lattice.

**Solving:** pictures are compared by exact geometry (outlines rounded to
whole units once, then turned and mirrored exactly), so a turned square is
the same square and a turned triangle is not. An analogy is kept only when
every rule and every pair of rules in the library that turns the first
picture into the second gives one and the same picture from the third, and
exactly one option is that picture. A code question is kept only when, for
each letter, every feature that matches the letters one-for-one across the
examples predicts the same letter for the new picture. A hidden-shape
question is kept only when exactly one option lies along the figure's lines
under some slide. Difficulty (`rating_basis`): analogies by the easiest
library rule that fits (a fill or shape change Easy, a turn, mirror or dot
move Medium, two rules Hard); codes Easy with two letters, Medium with a
feature that does not count, Hard with three letters; hidden shapes Easy on
a 5 lattice, Medium with a turned or flipped copy of the answer among the
options, Hard on a 7 lattice with one. Kids is served as Easy and Expert as
Hard, with `requested_difficulty` in meta.

**Guarantees:** deterministic per seed; every question has exactly one
right option, rechecked in tests by independent methods (testing each
option against the whole rule library, testing each option's code for a
one-for-one feature, sliding each option over the figure in doubled
coordinates); spatial rules on the picture's features are tested to draw
exactly what turning or mirroring the drawn geometry gives. Meta: `unique`,
`answers_checked`, `difficulty`, `rating_basis`, and every question's type,
answer letter, band and rule, codes or figure size.

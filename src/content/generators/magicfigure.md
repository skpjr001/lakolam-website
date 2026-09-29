---
title: "Magic Figures"
blurb: "Magic figures — triangles, V, H, cross and star where every line adds up the same"
category: maths
version: "1.0.0"
---
Magic triangles, a magic V, a magic H, a magic cross and a six-point magic
star: put the numbers in the circles so every line adds up the same.

## What it is

Each figure is a set of circles joined by straight lines. The numbers 1 to n
go in the circles, one number per circle, so that the numbers along every
line add to the same total. Five shapes appear: the **magic V** (1 to 5, two
arms of three), the **magic triangle** (1 to 6, three circles to a side),
the **magic H** (1 to 7, two uprights and a crossbar), the **magic cross**
(1 to 9, two lines of five crossing in the middle), the **big magic
triangle** (1 to 9, four to a side) and the **six-point magic star** (1 to
12, six lines of four, each adding to 26). Some numbers are already in
place, and there is exactly one way to finish each figure.

## How to play

Write a number in every empty circle. Use each number from 1 to the largest
number printed under the figure exactly once, and make every straight line
add up to the total printed under it. At the hardest level the total is not
printed: every line must simply add up to the same number, and finding that
number is part of the puzzle.

Start with a line that is nearly full: if a side of a triangle must add to
20 and already holds 8 and 9, the missing number is 3. Corners of a triangle
count in two sides, so big numbers in the corners make every side bigger.
Cross numbers off a list as you use them. The numbers already placed make
the answer unique: there is only one way to fill the circles.

## Purpose

These puzzles practise addition and number bonds, but mostly they practise
reasoning: trying a number, checking every line, and reasoning about what
must go where ("the three corners together must add to 12"). They are a
classic enrichment activity from the first years of school to the end of
primary, and the star and the big triangle challenge adults too.

## History

Magic figures grew out of the magic square, known in China since at least
the first centuries AD (the Lo Shu) and studied across India, the Islamic
world and Europe. Magic triangles, stars and other "magic figures" were
popularised by puzzle writers such as Henry Dudeney and Sam Loyd in the late
19th and early 20th centuries, and later by Martin Gardner. The six-point
magic star with 1 to 12 has 80 essentially different solutions; the
five-point star famously has none with the numbers 1 to 10. Magic triangles
and the magic V are staples of primary-school problem-solving books.

## This implementation

- **Spec knobs:** `difficulty`; `figure` (`mixed` (default), `v`,
  `triangle`, `h`, `cross`, `big_triangle`, `star`); `count` (figures on the
  page, 1-6); `symmetric_equivalent` (count a turned or flipped answer as
  the same answer; off by default); page `width` and `height`; `line`.
- **Generation:** Kids (grade 1-2): magic V and triangle, total printed, one
  spare number shown. Easy (grade 2-3): triangle, H and V, total printed,
  one spare number. Medium (grade 3-4): triangle, H, big triangle and cross,
  total printed. Hard (grade 4-5): big triangle and star (a cross joins them on
  pages of five or six), total printed. Expert (grade 5+): star and big
  triangle (a cross on pages of six), total not printed. Every arrangement of each figure is
  enumerated once per page by a search that fills the circles line by line
  and prunes a line as soon as its total can no longer be reached. A puzzle
  picks one arrangement at random, reveals its numbers in random order until
  it is the only arrangement that agrees with them (only arrangements with
  the printed total, when it is printed), then removes every revealed number
  that can be spared, so the given numbers are minimal before the spare ones
  of the easy levels are added. Figures on one page are never turns or
  flips of each other when the figure has enough answers to avoid it.
- **Solving:** the tests check each puzzle with a plain permutation search:
  every ordering of the unused numbers in the empty circles, with the lines
  checked only at the end.
- **Guarantees:** deterministic per seed. Every answer uses 1 to n once each
  with every line on one total, and agrees with the printed numbers. By
  default exactly one completion exists, literally: the printed numbers
  break the figure's symmetry, so no turned or flipped copy also fits
  (`unique: true`, `answer_counting: literal`). With
  `symmetric_equivalent` every completion is a turn or flip of the answer
  (`answer_counting: up_to_rotation_and_reflection`), which lets small
  figures be printed with no numbers at all (the 1-6 triangle with sides of
  9 has one answer up to symmetry, but six literal ones). Difficulty is the
  figure's size, whether the total is printed and how many numbers are
  given (`rating_basis`). Generation takes about a millisecond for the easy
  levels and about half a second for a page with two stars (the
  independent check dominates).

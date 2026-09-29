---
title: "Hundred Chart"
blurb: "Hundred chart — missing numbers, chart pieces, skip counting and hidden pictures"
category: maths
version: "1.0.0"
---
The classroom 1-to-100 chart turned into puzzles: fill in the gaps, rebuild
cut-out pieces, colour skip-counting patterns and hidden pictures.

## What it is

A hundred chart is a 10 by 10 table of consecutive numbers — 1 to 100 in the
usual version, ten to a row, so moving right adds one and moving down adds
ten. This page comes in three kinds:

- **Missing numbers** — some cells are blank, to be filled back in.
- **Chart pieces** — small shapes cut out of the chart, like jigsaw pieces,
  with one or two numbers printed and the rest left blank.
- **Patterns** — colour every multiple of a number (skip counting) and look
  at the stripes and diagonals it makes, or colour listed numbers in listed
  colours to uncover a hidden picture.

Harder pages blank out more numbers, cut bigger pieces with fewer clues, use
trickier skip counts, and move to the 0–99 or 101–200 charts.

## How to play

**Missing numbers:** write the number that belongs in each empty square. Use
the numbers around it: the square to the left is one less, the square to the
right is one more, the square above is ten less and the square below is ten
more.

**Chart pieces:** each shaded square shows its number. Fill in every white
square of the piece: one step right adds 1, one step left takes away 1, one
step down adds 10 and one step up takes away 10.

**Skip counting:** colour every number the instruction asks for: every
number you say when counting by 5s, for example, or every multiple of 3,
then look at the pattern the coloured squares make.

**Hidden picture:** find each listed number on the chart and colour its
square with the colour named beside the list. On harder pages, 21-24 means
every number from 21 to 24. When all the numbers are coloured, a picture
appears.

## Purpose

The hundred chart is one of the most used tools in early-grades maths: it
makes the structure of our number system visible — ones along a row, tens
down a column. Missing-number pages practise counting on and back; pieces
make children reason with "+1, +10" moves instead of copying from a chart;
skip-counting pages turn multiplication tables into pictures; and the
mystery pictures reward careful number finding. Teachers, homeschoolers and
activity-book makers use all four.

## History

Number charts arranged in rows of ten have been used in classrooms for well
over a century; the hundred chart became a staple of primary teaching with
the spread of place-value-centred curricula in the twentieth century, and
"hundred chart puzzle pieces" and "hundred chart mystery pictures" are now
familiar worksheet genres of their own.

## This implementation

- **Spec knobs:** `mode` (`missing`, `pieces`, `pattern`), `pattern` (`auto`,
  `multiples`, `picture` — used in pattern mode), `range` (`auto`, `1-100`,
  `0-99`, `101-200`), `difficulty`, `cell` (chart cell side in Pt; the page is
  ten cells plus margins wide, letter proportions), `line`.
- **Generation:** difficulty maps to grade level. Missing: 12 / 24 / 40 / 55
  / 70 blanks from Kids to Expert; Kids blanks never touch, so every blank has
  all four neighbours showing. Pieces: connected shapes of 4–5 cells (Kids)
  up to 9–12 cells (Expert) are grown on the chart without overlapping, with
  two printed numbers at Kids and Easy and one above; as many as fit (up to
  eight) are shelf-packed onto the page in seeded order. Patterns: skip
  counts by 10 or 5 (Kids), 2/5/10 (Easy), 3 or 4 (Medium), 6–9 (Hard), and
  7, 8, 9, 11 or 12 (Expert); hidden pictures are chosen from twelve vendored
  10×10 pixel pictures (one or two colours at Kids and Easy), with runs of
  three or more numbers written as ranges at Hard and Expert. Auto range is
  1–100 up to Medium, 0–99 at Hard and 101–200 at Expert.
- **Solving:** the chart itself determines every blank. For pieces, each
  fragment's shape is tried at every position on the chart and the printed
  numbers must match at exactly one of them; a piece with no printed number
  would fit dozens of places and is never produced.
- **Guarantees:** deterministic per seed; every blank has exactly one
  correct number (`unique` in missing and pieces modes, proven for pieces by
  the exhaustive placement count); in pattern modes the answer key shades
  exactly the multiples, or exactly the listed numbers, and the listed
  numbers reproduce the picture cell for cell (`answers_checked`). Rating
  basis: number of blanks, piece size and clues, skip-count step or picture
  colours, plus the chart range. Every difficulty is reachable in every mode.

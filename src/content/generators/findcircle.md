---
title: "Find and Circle"
blurb: "Find and circle — count the target symbols among look-alike distractors"
category: puzzle
version: "1.0.0"
---
A page full of little pictures: find every one that matches, circle it, and
write how many you found.

## What it is

A field of simple drawn symbols — stars, hearts, fish, moons, arrows, letters
and digits — scattered across the page or set out in tidy rows. The top of
the page shows the symbol (or symbols) to look for, each beside an empty box
for the count. Gentle pages use a few very different shapes; harder pages
fill the field with look-alikes: `b` among `d`, `p` and `q`, `6` among `9`,
an arrow among the same arrow pointing other ways, a fish among fish facing
the other way.

## How to play

Look at the symbol in the grey box at the top. Search the whole field and
draw a circle around every symbol that matches it exactly — same shape, same
way round. A symbol that is flipped or turned is a different symbol, so look
carefully. When you have found them all, count your circles and write the
number in the box next to that symbol. If there are several symbols at the
top, do the same for each one. Sweeping the page row by row, left to right,
is the surest way not to miss any.

## Purpose

Visual discrimination — telling apart shapes that differ only in orientation
— is a foundation of early reading and number work: the `b`/`d` and `6`/`9`
confusions are exactly the ones young readers make. The page also practises
careful scanning and counting, and the tally boxes turn it into a small
self-checking exercise. At the top bands it is a real attention test even
for adults, much like a letter-cancellation sheet.

## History

"Find and circle" and "how many can you find?" pages are a staple of
preschool workbooks and activity books. Cancellation tasks — cross out every
target letter in a dense field — have been used since the late nineteenth
century to measure attention and visual scanning, and remain in clinical
use; the classroom version swaps letters for friendly pictures.

## This implementation

- **Spec knobs:** `difficulty`, `layout` (`scatter` or `grid`), `items` (0
  picks a count from the difficulty), `symbol` (size in Pt; 0 picks from the
  difficulty), `width` and `height` (the page, US Letter by default), `line`
  (stroke width; 0 scales with the symbol).
- **Generation:** every symbol is a vector glyph drawn in the generator and
  normalised into a unit box; a *token* is a glyph in one orientation
  (mirrored or turned), and tokens that differ only by orientation form a
  look-alike family. The difficulty picks the targets and distractors: Kids
  (preschool) has one target among two other simple shapes, about 16 large
  symbols; Easy (ages 5-6) one target among four others; Medium (ages 6-7)
  two targets, one of them with its mirror or turned twins as distractors;
  Hard (ages 7-9) two targets from two look-alike families, letters and
  digits included, with every twin present; Expert (ages 9 and up) three
  targets — two from the same four-way family (`b d p q` or the four arrows)
  plus one more — among about 76 small symbols. Each target appears a seeded
  number of times, every distractor at least once. Scatter placement is
  dart throwing with a centre-to-centre floor of 1.45 symbol sizes, which
  keeps every symbol's bounding box clear of every other; grid placement
  lays out even rows at that pitch or more.
- **Solving:** there is nothing to deduce; the answer key circles every
  target in the field and writes each count in its box.
- **Guarantees:** deterministic per seed. The counts in the key are recounted
  from the placed symbols and must equal them; no two symbols' bounding
  boxes (stroke included) overlap, and the smallest gap is reported as
  `min_gap_pt`; no distractor is ever a target, and no two tokens in the
  catalogue look alike — the tests compare every pair of drawn outlines and
  require them to differ clearly. Rated by the look-alike content and the
  number of targets and symbols (`rating_basis`), not by a solver.

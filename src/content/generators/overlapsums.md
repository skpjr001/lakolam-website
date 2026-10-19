---
title: "Overlap Sums"
blurb: "Overlap Sums — place number tiles in the regions of overlapping circles so every circle adds up to its target"
category: maths
version: "1.0.0"
---
Every circle has a number. Put the tiles in the boxes so that each circle
adds up to it.

## What it is

A page of number puzzles drawn as overlapping circles: two side by side,
three as a Venn diagram, or four in a ring. Every region where circles
overlap (and every part of a circle on its own) has one empty box. A row
of number tiles sits underneath, one tile for each empty box. The number
on a circle is the total of all the tiles inside that circle, including
the ones in the overlaps. There is exactly one way to place the tiles.

## How to play

- Put each tile in one box. Every box gets one tile, and every tile is
  used once. Some boxes may already have a number.
- Add up all the boxes inside a circle, even the ones in the parts it
  shares with other circles: they must make the number on that circle.
- A box in an overlap counts for every circle it is inside, so big
  numbers often belong in the middle where several circles meet.
- Compare two circles that share a region: the difference between their
  numbers is the difference between the parts they do not share.
- Try a tile in a box and add up: if a circle can no longer reach its
  number with the tiles left, move it.
- On pages with negative tiles, adding a negative number makes a total
  smaller.

## Purpose

Overlap sums practise mental addition many times over while asking for
reasoning about sets: which regions belong to which circle, and how a
single number can count twice. They make a playful introduction to Venn
diagrams and to adding and subtracting with negative numbers.

Grade notes: **Kids** suits grades 1-2 (age 6-8): two circles, three tiles
1-9. **Easy** suits grades 2-3 (age 7-9): three circles, two or more boxes
filled in. **Medium** suits grades 3-4 (age 8-10): three circles with at
most one box filled. **Hard** suits grades 4-5 (age 9-11): four circles in
a ring, eight tiles up to 12, some boxes filled. **Expert** suits grades
5-6 (age 10-12): four circles, nothing filled. Negative tiles (-9 to 9)
make any page one level harder and suit grades 6-7.

## History

Sum puzzles on overlapping shapes are a long-standing family of
recreational maths puzzles, and versions with draggable number blocks
are popular in classroom maths-game collections. This is an original
version with layouts of our own.

## This implementation

- **Spec knobs:** `difficulty`, `circles` (2-4; `null` by level: Kids 2,
  Easy and Medium 3, Hard and Expert 4, one fewer with negatives; clamped
  with `requested_circles`), `negatives` (tiles -9..9 without 0),
  `count` (1-6 puzzles, clamped with `requested_count`), `width`,
  `height`, `line`.
- **Generation:** regions come from the layout (circle membership of
  sample points; each box sits at the point deepest inside its region).
  Different tiles are dealt to the regions and the circle totals
  computed. Givens are added in seed order until the placement is unique,
  then trimmed back to a minimal set; easier levels reveal extra givens.
  Up to 3000 tries per puzzle for the level; a level the circle count
  cannot reach is served at the nearest one with `requested_difficulty`.
- **Solving:** a permutation search of the free tiles over the free
  regions (equal values counted once), checking each circle as soon as
  its last region is filled; counting stops at 2.
- **Guarantees:** deterministic per seed; `unique: true`. Tests recount
  every placement by plain permutation (Heap's algorithm) and check the
  region layouts point by point. Rated by circles, givens and negatives
  (`rating_basis: circles_givens_and_negatives`): Kids 2 circles; Easy 3
  circles with 2+ givens; Medium 3 with 0-1; Hard 4 with 1+; Expert 4 with
  none; negatives one level up.

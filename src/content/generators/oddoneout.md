---
title: "Odd One Out"
blurb: "Odd one out — circle the picture that is different (picture, filling, count, mirror, turn, missing detail) or the one that matches"
category: puzzle
version: "1.0.0"
---
Rows of pictures that are all the same except one. Can you spot it?

## What it is

A visual-discrimination page for young children. Each row shows four to six
pictures. All but one are exactly alike; the odd one is a different picture,
has a different filling, shows a different number of things, faces the
other way, is turned round, or has a part missing. On the hardest rows the
pictures are turned every which way and the odd one is the only one that
has been flipped over. Some rows ask the other question: the first picture
sits in a shaded box, and one of the pictures after it is exactly the same.

## How to play

Look carefully at every picture in the row.

- **Circle the odd one out:** all the pictures are the same except one.
  Find the one that is different and circle it. Say what is different
  about it.
- **Shaded box first:** circle the picture that is exactly the same as the
  one in the shaded box. The others are nearly the same, but not quite.
- **Turning is allowed, flipping over is not:** on these rows the pictures
  may be turned round. Imagine turning each one. Only one cannot be turned
  to match the others, because it has been flipped over, like a mirror
  image.

## Purpose

Spotting the one that is different trains careful looking: noticing shape,
direction, pattern, number and small details, and holding one picture in
mind while checking another. These visual discrimination skills underpin
early reading (telling b from d) and mathematics (seeing a shape turned or
reflected). Saying *why* the odd one is different builds vocabulary for
comparing. The page suits ages three to eight.

## History

"Which one is different?" and "find the one that matches" are among the
oldest readiness exercises, found in kindergarten workbooks since the early
twentieth century and in children's magazines ever since. The same item
types appear in early intelligence and readiness tests, and the "one is
flipped" rows echo the mental-rotation tasks of Roger Shepard and Jacqueline
Metzler (1971).

## This implementation

- **Spec knobs:** `difficulty` (Kids: a different picture or filling, four
  to a row; Easy: adds a different count; Medium: mirror images and quarter
  or half turns, five to a row; Hard: a missing detail; Expert: six to a row
  and "flipped among turned" rows), `task` (`mixed`, `odd_one`, `match`),
  `rows` (3-7), `figures` (4-6, or 0 for the level's own), `colour`,
  `width`, `height`.
- **Generation:** each row takes a kind of difference from the level's list
  in a shuffled cycle and pictures from the shared `lako-icons` set (near
  twins left out, pictures not yet on the page preferred). Mirror and turn
  rows only use pictures whose mirror image or turn really looks different
  (from the icons' symmetry metadata, then on pixels). Missing-detail rows
  only remove lines, dots or small parts whose absence is clearly visible on
  pixels — only about ten pictures in the set have one. "Flipped" rows use
  chiral pictures: no turn of the picture equals its mirror image. Count
  rows use compact pictures in a fixed grid so only the number changes.
  Match rows draw their wrong choices from the same kind of difference;
  missing-detail match rows also use turns and mirror images, because few
  pictures have more than one detail to lose.
- **Solving:** the answer is the one picture that differs (or the one that
  is the first picture again).
- **Guarantees:** checked for every row before it is used
  (`answers_checked: true`, `unique: true`). In an odd-one-out row every
  picture but the answer is exactly the same picture (on flipped rows: the
  same picture turned by whole quarter turns, at least two different ways),
  and the answer looks clearly different from it — from every quarter turn
  of it on flipped rows — by `lako_icons`' raster comparison (similarity
  below 0.8; turns, flips and different pictures below 0.65, so a young
  child sees them at a glance). In a match row the answer is the first
  picture again (a quarter turn of it, on flipped rows) and every other
  choice looks clearly different from it; the wrong choices also differ
  from each other. Tests re-check every row independently, spinning the
  drawn pictures as pixels rather than re-posing them. Rating
  (`rating_basis: hardest_difference_kind_and_row_length`): picture and
  filling Kids, count Easy, mirror and turn Medium, missing detail Hard,
  flipped-among-turned Expert, raised by the row length (five pictures at
  least Easy, six at least Medium). The page takes its hardest row's band,
  and `requested_difficulty` records what was asked. The key rings each
  answer.

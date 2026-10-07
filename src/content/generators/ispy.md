---
title: "I Spy and Count"
blurb: "I Spy and count — pictures scattered over the page, turned and never overlapping; count each kind and write the number in the tally"
category: puzzle
version: "1.0.0"
---
Pictures scattered all over the page. How many cars can you find? How many
keys?

## What it is

A seek-and-count page for young children. Pictures of a few kinds (cars,
keys, turtles, stars…) are scattered across a big frame, some standing up,
some tipped or turned round. Along the bottom, a tally strip shows one of
each kind beside an empty box. Easy pages have three or four kinds and a
handful of each; harder pages have more kinds, up to ten of each, pictures
turned every which way, and on the hardest pages pictures that all belong to
one family (all shapes, say) plus a few pictures that are not counted at
all.

## How to play

- Look at the first picture in the strip at the bottom.
- Find every picture like it in the big frame. Pictures may be turned or
  tipped over — a turned car is still a car.
- Count them, and write the number in the box next to that picture.
- Do the same for every picture in the strip.

Tip: tick or dot each picture as you count it, so you never count one twice.
Some pages also hide pictures that are not in the strip: leave those out.

## Purpose

Counting real objects scattered at random is harder than counting a neat row:
the child has to keep track of what has been counted, which builds
one-to-one correspondence, visual scanning and attention. Turned pictures
add shape constancy (recognising a thing in any position). Writing the total
practises numerals 1 to 10. The page suits ages three to seven.

## History

"I spy with my little eye" is an old guessing game, played on journeys and
in classrooms. Search-and-find picture books grew popular in the late
twentieth century with Martin Handford's *Where's Wally?* (1987) and the *I
Spy* books by Jean Marzollo and Walter Wick (from 1992). "I spy and count"
pages, where children find and tally simple pictures, became a staple of
pre-school workbooks and of the counting books sold to parents of two- to
five-year-olds.

## This implementation

- **Spec knobs:** `difficulty` (Kids: three kinds, one to five of each,
  upright; Easy: four kinds, up to six, tilted up to 20°; Medium: five kinds,
  up to eight, any angle; Hard: six kinds, two to ten, any angle, one kind not
  counted; Expert: seven kinds from one family, three to ten, any angle, some
  flipped over, two kinds not counted), `kinds` (3-8, 0 = the level's),
  `max_count` (2-10, 0 = the level's), `colour`, `width`, `height`.
- **Generation:** pictures come from the shared icon set. Kinds are taken
  from a shuffled pool one at a time, each kept only if it is clearly
  different from every kind already taken. Counts are drawn, then every
  picture is scattered by rejection sampling: a random spot, turn and slight
  size change, kept only if its inked box (stroke included) stays inside the
  frame and clear of every other picture by a gap. If the pictures do not
  fit, they are all made smaller and scattered again.
- **Solving:** count the pictures of each kind; the key numbers them 1, 2,
  3… within each kind, writes the totals in red, and crosses out the
  pictures that are not counted.
- **Guarantees:** `answers_checked: true`. No two pictures overlap or touch
  (their inked bounding boxes are at least 3 Pt apart, re-checked in tests
  on pixels, picture by picture); each tally count equals the number of
  pictures of that kind on the page; and every two kinds on the page
  (uncounted ones included) look clearly different under every turn and
  flip the page uses — raster similarity, compared at every 30° (every 10°
  up to ±20° on tilted pages) and mirrored where flips occur, below 0.6,
  well inside the icon library's own 0.8 line (so a turned square and a
  diamond never share a page; the striped ball and the oval, which read as a
  circle when small, are left out). The page is rated by its hardest
  feature — kinds, largest count, turning, uncounted kinds, one family
  (`rating_basis: kinds_count_range_turning_decoys_and_family`) — so raising
  `kinds` or `max_count` raises the rating honestly. An Expert page that
  finds no family with enough clearly different pictures mixes families;
  it still rates Expert by its kinds and flips.

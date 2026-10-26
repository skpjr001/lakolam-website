---
title: "Quipu"
blurb: "Quipu (khipu) data art: pendant cords whose knots tie numbers in base ten, single, long and figure-eight knots, with a key"
category: design
version: "1.0.0"
---
Numbers tied in knotted cords: pendant cords hang from a main cord, and
their knots spell out numbers in tens, hundreds and thousands.

## What it is

A picture of numbers recorded the way the numerical khipus (quipus) of the
Inka record them, as data art. A thick main cord runs across the top; from it
hang pendant cords in coloured groups, and some pendants carry a subsidiary
cord of their own. Each cord holds one number. Knots are tied in clusters at
fixed heights, the same on every cord: the lowest cluster is the units, the
one above it the tens, then hundreds, thousands and ten-thousands. A key
explains the knots. When the page makes up its own numbers, the first cord
of each group records the total of the others in the group.

## How to use it

Read a cord from the top down. In every cluster above the lowest, count the
single knots: that is the digit for that place. In the lowest cluster a long
knot gives the units digit — count its turns — and a figure-eight knot means
1. A place with no knot is zero. So a cord with three single knots high up,
nothing below, then seven single knots, then a long knot of two turns reads
3 0 7 2: 3,072. Check a group: add the other cords and compare with the
first. Turn on the labels to check your reading, or give your own list of
numbers — ages, scores, a calendar — and read them back in knots.

## Purpose

A tactile picture of place value: the same idea as our written digits —
the position tells the power of ten, zero is an empty place — made with
string instead of ink.

## History

Khipus were made and read by specialists (*khipukamayuq*) across the Inka
empire in the 15th and early 16th centuries, and by earlier Andean peoples
such as the Wari; several hundred survive. In the early 20th century Leland
Locke showed that many record numbers in a base-ten positional system, and
Marcia and Robert Ascher's study of hundreds of khipus described the knot
types used here, the alignment of clusters across cords, and relations such
as a cord holding the sum of a group. Not all khipus are numerical, and how
the non-numerical ones (and colour, ply and attachment) carry meaning is
still being studied; communities in the Peruvian highlands, such as San
Andrés de Tupicocha and Rapaz, keep khipus as communal heritage today. This
page follows the numerical encoding as it is understood; it does not
reproduce any khipu. Sources: L. Leland Locke, *The Ancient Quipu or
Peruvian Knot Record* (American Museum of Natural History, 1923); Marcia
Ascher and Robert Ascher, *Code of the Quipu* (University of Michigan Press,
1981; Dover as *Mathematics of the Incas*, 1997); Gary Urton, *Signs of the
Inka Khipu* (University of Texas Press, 2003); Frank Salomon, *The Cord
Keepers* (Duke University Press, 2004).

## This implementation

- **Spec knobs:** `numbers` (a list to tie, one pendant each, 0–99,999;
  empty = seeded data), `pendants` (how many seeded pendants; 0 = by seed),
  `subsidiaries` (some seeded pendants carry subsidiary cords), `key`,
  `labels` (print each cord's number, digit above digit, under the cord),
  `palette` (auto, natural, dyed, line_art), `width`, `height`, `margin`.
- **Generation:** seeded data comes in groups of three to six pendants; the
  first cord of a group holds the sum of the rest (some values zero, some
  round). The number of knot positions is set by the largest value (at least
  three). Positions are fixed depths below each cord's top, the units
  lowest; tens and above take that many single knots in a cluster, the units
  a long knot of 2–9 turns or a figure-eight for 1, and zero leaves the place
  empty. Pendants hang from a sagging main cord, coloured by group (the sum
  cord in its own colour), swaying slightly, with ply twists, attachment
  loops and frayed ends; subsidiaries tie on just below a pendant's top and
  hang beside it, measured from the same top so their clusters line up.
- **Solving:** Nothing to solve (the labels give the readings).
- **Guarantees:** deterministic per seed; `verification:
  decoding_the_drawn_knots_returns_the_encoded_numbers` (meta lists every
  pendant's and subsidiary's value). Tested: for 20 seeds and for a list
  with internal zeros, ones and 99,999, decoding each cord's drawn knots
  (cluster from the knot's depth, digit from kind and count) returns its
  number; for every value sampled up to 99,999 the units place is empty for
  0, a figure-eight for 1, a long knot of n turns for n, and every other
  knot is single; every sum cord decodes to the sum of its group; all ink
  stays on the page.

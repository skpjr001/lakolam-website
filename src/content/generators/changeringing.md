---
title: "Change Ringing"
blurb: "Change ringing: methods as blue-line diagrams — Plain Bob, Grandsire, Stedman, Cambridge Surprise and more"
category: design
version: "1.0.0"
---
The methods English bell ringers ring, drawn the way ringers learn them:
blue lines through columns of figures, one-lead grids and woven ribbons.

## What it is

In English change ringing a band rings a set of tower bells, one ringer to
a bell, round and round in a row: 1 2 3 4 5 6 7 8, the treble (the
smallest, highest bell) first. A heavy bell cannot be hurried or held back
by more than one place at a time, so from one row to the next a bell may
only stay where it is or swap with a neighbour. A *method* is a fixed
pattern of such changes, rung lead after lead until the bells come back to
rounds: that whole journey is the *plain course*, and in it no row is ever
rung twice.

Ringers do not memorise rows; they learn the path their own bell takes
through them, the *blue line*. A blue-line page writes out every row of the
plain course, a lead to a column, and draws the treble's path in red and a
working bell's in blue. Methods have names and a family likeness: Plain
Bob, the first to learn; Grandsire, the oldest still rung; Stedman, with
its sixes of quick and slow work; the Surprise methods — Cambridge,
Yorkshire, Bristol, London — and Kent and Oxford Treble Bob, Double Norwich
Court Bob, Little Bob, and the Doubles methods for five bells.

## How to use it

As a learner's sheet: pick the method you are learning and the number of
bells in your tower, and follow the blue line down each column — when it
leads, makes a place, dodges or hunts — while the red treble shows where it
passes you. The figures beside the line are the bells you strike after.
The grid page shows one lead with every bell's line in its own colour and
the place notation beside each change, with the lead heads of the plain
course listed on the right: read across a lead head to see the order the
bells start the next lead in. The ribbon page is a picture of the whole
plain course: every bell a coloured ribbon, weaving over and under its
neighbours — frame it for a ringing chamber or a tower open day.

## Purpose

To show that a method is a piece of exact mathematics — a walk through the
permutations of the bells that never repeats itself — and to give ringers
the diagram they actually learn from, for any standard method, correctly
drawn.

## History

Change ringing grew up in England in the early seventeenth century, when
full-circle wheels let a ringer hold a bell balanced mouth-up and choose
the moment it strikes. Fabian Stedman's *Tintinnalogia* (1668, with Richard
Duckworth) and his *Campanalogia* (1677) set out the art in print; Stedman's
own principle, published in 1677, is still rung everywhere. Grandsire is
traditionally credited to Robert Roan in the 1650s. The Surprise methods
followed in the eighteenth and nineteenth centuries; the first peal of
Cambridge Surprise Royal was rung at Wakefield in 1822. Ringers understood
early that a method is a walk through the group of permutations of the
bells, and the analysis of extents and true touches anticipated parts of
group theory (see Arthur T. White, "Ringing the changes", *Mathematical
Proceedings of the Cambridge Philosophical Society* 94, 1983). The
Central Council of Church Bell Ringers, founded in 1891, keeps the
standard method collection; every place notation here is taken from it.

## This implementation

- **Spec knobs:** `width`, `height` (points); `method` (`auto` or one of
  `plain_bob`, `grandsire`, `stedman`, `cambridge`, `yorkshire`, `bristol`,
  `london`, `superlative`, `kent`, `oxford`, `double_norwich`, `little_bob`,
  `double_oxford`, `st_clements`, `st_simons`, `reverse_canterbury`,
  `erin`; auto picks per seed among the methods rung on that many bells);
  `bells` (5–12, default 8); `style` (`blue_line`, `grid`, `ribbons`);
  `bell` (the working bell traced in blue, 2–12; 0 = chosen by the seed);
  `palette` (`auto`, `classic`, `parchment`, `night`, `bronze`); `numbers`
  (figures on or off); `title`; `line` (weight, 0.2–4).
- **Generation:** each method family carries the Central Council place
  notation for every stage it is rung at (Doubles to Maximus). The parser
  follows the Council's conventions: `x`/`-` is the cross change, `.`
  separates changes, external places may be left implied (`5` on eight
  bells is `58`), and `a,b` means both halves are palindromes written to
  their middle. Bells 10, 11 and 12 are written `0`, `E`, `T`. A lead is
  applied to rounds again and again until rounds return. Odd-bell methods
  on an even number of bells (Grandsire Triples on eight) ring with the
  tenor covering behind; a method without notation at the stage asked for
  is rung at its nearest stage. Blue-line and ribbon pages lay the leads
  out in a grid of columns sized to fit the page; ribbons are smooth
  S-curves between rows, and at every crossing the bell moving up is over
  on alternate changes, so each hunting bell goes over, under, over — a
  true weave. The hunt bells (those the lead head leaves in place) are
  drawn red; Stedman and Erin have none.
- **Guarantees:** every row is a permutation of the bells; every change
  swaps only bells in adjacent places; no row repeats in the plain course
  until the final rounds (the course is true); the lead length and lead
  head of every family at every stage equal the Central Council
  collection's, and the plain course length equals the lead length times
  the order of the lead head (all tested, with an independent checker).
  With a cover bell the tenor never moves. Meta records the title,
  notation, stage, lead head, course length, hunt bells and traced bell,
  `true_course: true` and `verification`. Clamped knobs are reported as
  `requested_<field>`.

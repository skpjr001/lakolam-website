---
title: "Circuits"
blurb: "Circuits — a network of word boxes where every arrow joins two words into a compound; fill the blanks, proven unique"
category: word
version: "1.1.0"
---
A network of word boxes joined by arrows: every arrow makes a compound word. Fill in the empty boxes.

## What it is

A clue-free word puzzle drawn as a little circuit diagram. Boxes sit on a
grid and are joined by arrows; each box holds one word, and every arrow
joins the word it leaves with the word it points to into a single closed
compound word — an arrow from FOOT to BALL makes FOOTBALL. Some boxes are
filled in. The rest are empty, showing only how many letters their words
have. There is exactly one way to fill them.

## How to play

Start from a filled-in box. Each arrow leaving it needs a word that can
come after it; each arrow arriving at it needs a word that can come
before it. An empty box must work with every arrow that touches it, so
a box with two or three arrows usually has only one possible word — look
for those first. The number of squares in a box is the number of letters
in its word. Write one letter in each square. Arrows are always read in
their own direction: an arrow from SNOW to BALL is SNOWBALL, but one
from BALL to ROOM is BALLROOM.

## Purpose

Circuits exercises vocabulary in a networked way: one word has to fit
several compounds at once, so solvers test candidates against every
neighbour, the way a crossword checks a letter against two words. It
builds awareness of how English joins short words into new ones, and it
needs no clues, so it suits any reader who knows everyday compounds.

## History

Compound-word link puzzles are an old newspaper staple — "missing link"
and "word ladder" rows where one word joins two others. Puzzmo's daily
Circuits (2024) turned the idea into a network, with arrows giving the
direction of each join. This page is a printable take on that network
form.

## This implementation

- **Spec knobs:** `difficulty`; `boxes` (4–20; 0 = the level's count;
  out-of-range values are clamped and reported as `requested_boxes`);
  `first_letters` (print the first letter of each empty box); `cell`
  (12–40 pt); `line` (0.2–4 pt).
- **Levels:** Kids — 6 boxes of everyday words, at most a third blank;
  Easy — 8 boxes of everyday words, under half blank; Medium — 10 boxes,
  about half blank; Hard — 12 boxes and Expert — 15 boxes, with as many
  blanks as uniqueness allows. The level is the box count, the word tier
  and the number of blanks (`rating_basis`).
- **Generation:** the network grows on a small grid from a curated list
  of genuine closed compounds written for Lakolam (shared with Missing
  Link and Compound Words): each new box is a compound partner of a box
  already placed, in a free neighbouring cell, and no word repeats. Any
  other pair of neighbouring boxes that happens to form a curated compound
  gets an arrow too. Boxes are then blanked one at a time, in random
  order, keeping each blank only while the filling stays unique.
- **Solving:** an exhaustive count with forward checking, most
  constrained box first, capped at two solutions. A blank's candidates are
  *every* word of its length in Lakolam's large dictionary (about 114,000
  words), and an arrow accepts *any* pair whose join is in that
  dictionary — so even accidental joins (CAR + PET) count against
  uniqueness. A search that exhausts its node budget counts as
  ambiguous, never unique.
- **Guarantees:** deterministic per seed; exactly one filling of the
  blanks (`unique`) even for a solver who knows obscure words; every
  arrow of the intended solution is a curated, family-friendly compound;
  the network is connected and no word repeats. The tests recount every
  level with an independent breadth-first enumeration over the
  dictionary.
- **Version 1.1:** the shared family-friendly word filter now refuses more words (an audit of the everyday dictionary tiers: crude, sexual, drug, drink and violent words and inflections of words already refused), so some pages draw different words.

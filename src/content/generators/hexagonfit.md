---
title: "Hexagon Fit"
blurb: "Hexagon Fit — wrap each listed six-letter word clockwise around its hexagon of triangles; neighbours share letters"
category: word
version: "1.0.0"
---
Six-letter words wrapped around overlapping hexagons of triangles. Fit
every word in the list so that neighbouring hexagons agree.

## What it is

A board of small triangles. Around each numbered point, six triangles form
a hexagon, and each hexagon holds one six-letter word, written clockwise
from the triangle its arrow points into. Neighbouring hexagons overlap:
the two triangles between their numbers belong to both, so the two words
must share those letters. The words are listed in alphabetical order,
without saying which hexagon each belongs to. There is exactly one way to
fit them all.

## How to play

Each word in the list goes into exactly one hexagon, and every hexagon
gets one word. To write a word into a hexagon, put its first letter in the
triangle the arrow points into, then carry on clockwise around the number,
one letter per triangle, until all six are placed.

Where two hexagons overlap, the two shared triangles must hold the same
letters for both words. Use this to decide which word goes where: a word
can only go into a hexagon if each neighbour still has some other word
that agrees with it on the shared triangles. If a few letters are printed,
start with them: they often allow only one word in their hexagon. Each
word you place fixes two letters in each neighbour. Cross words off the
list as you use them.

## Purpose

A fit-word puzzle in a new shape. There are no clues and no general
knowledge, only letter patterns, and the overlaps make every placement
matter twice. It exercises careful checking and spelling, and suits
anyone who enjoys word searches and fill-ins but wants more deduction.

## History

Fill-in puzzles, where a list of words must be fitted into a grid, have
been a magazine staple for decades. Honeycomb puzzles, in which answers
wind around hexagonal cells and neighbours share letters, are a long
running variety in puzzle magazines and newspapers. This version builds
each hexagon from six triangles and lets neighbouring hexagons share two,
which works like a crossword on a triangle grid.

## This implementation

- **Spec knobs:** `difficulty`, `hexagons` (3 to 16; 0 picks 4 for Kids,
  6 for Easy, 8 for Medium, 10 for Hard and 12 for Expert), `cell` (the
  triangle side), `line`.
- **Generation:** hexagon centres are lattice points of a triangle grid
  avoiding one of its three sublattices, so they form a honeycomb: no three
  are mutually adjacent, adjacent hexagons share exactly two triangles, and
  no triangle is in more than two words. A compact patch grows from one
  centre, preferring points that close a ring and then points near the
  middle, with a seeded pick among the best three. Each hexagon gets a
  seeded start; the rings are filled by backtracking with forward checking
  over a bitset index of different, family-friendly six-letter words
  (Basic tier for Kids, Common otherwise).
- **Solving:** an exhaustive search over assignments of the listed words
  to hexagons, most-constrained hexagon first, against the shared
  triangles and the printed letters, counts solutions and stops at two.
  Letters are printed one at a time (seeded order) until the board is
  unique and the requested rung of the ladder settles it, then every
  printed letter the rung does not need is removed.
- **Guarantees:** deterministic per seed; every word is a real,
  family-friendly six-letter word, used once; exactly one assignment fits,
  re-counted in the tests by an independent search (word by word in list
  order rather than hexagon by hexagon). Difficulty uses `rating_basis`
  `deduction_rung_and_words`: the easiest rung that places every word -
  singles (a hexagon only one word fits, or a word that fits only one
  hexagon, given the letters already written), then crossing logic (a word
  stays in a hexagon only if every neighbour still has a different word
  agreeing on the shared triangles), then one-deep trial - and the number
  of hexagons. Singles is Kids with up to 5 hexagons, otherwise Easy;
  crossing is Medium up to 8, otherwise Hard; trial would be Expert.
  Kids and Easy boards print one or two letters; Medium and Hard print
  none. **Expert is not reachable:** crossing logic has settled every board
  measured with no letters printed at all, because different six-letter
  words rarely agree on two shared triangles. An Expert request is served
  as a 12-hexagon Hard board and labelled so (`requested_difficulty` in
  the metadata).

---
title: "Fold and Punch"
blurb: "Paper folding — a sheet is folded and punched; choose the picture of it opened out"
category: puzzle
version: "1.0.0"
---
A square of paper is folded, holes are punched through it, and it is opened
out again. Which picture shows the holes?

## What it is

A non-verbal reasoning puzzle from gifted-programme and entrance tests. Each
problem shows a square sheet being folded once, twice or three times - in
half across, in half down, or corner to corner - and then the folded paper
with one or two holes punched through it. Below are three to five pictures
of the opened sheet; exactly one is right. The wrong ones are the mistakes
people really make: forgetting to unfold a fold, unfolding across the wrong
line, leaving the holes where they were punched, or turning the paper over.

## How to play

Follow the pictures from left to right. In each one the shaded flap is
folded over along the dashed line, the way the arrow shows. The last picture
shows the folded paper and the punched holes.

Now open the paper in your head, one fold at a time, starting with the last
fold. Each time you open a fold, every hole gets a twin: its mirror image on
the other side of that fold line. Two folds make four holes for every
punch; three folds make eight.

Choose the picture that matches. Check it by counting the holes first - it
is the quickest way to rule out wrong answers.

## Purpose

Paper folding tests spatial visualisation: holding a shape in mind while
it moves, and reasoning about reflections. It is one of the most reliable
measures of this skill and appears in gifted-and-talented screening tests
for children from about six, in UK 11+ non-verbal reasoning papers and in
adult aptitude batteries. Practice with real paper and a hole punch, then
with pictures, builds the skill quickly.

## History

Louis Thurstone included a punched-holes task in his studies of primary
mental abilities in the 1930s and 1940s, and the Educational Testing
Service's 1976 Kit of Factor-Referenced Cognitive Tests made its Paper
Folding Test a standard measure of visualisation used in hundreds of
studies. The Cognitive Abilities Test (CogAT) added a paper-folding subtest
to its non-verbal battery with Form 7 in 2011, and hole-punched paper
questions are a regular part of 11+ non-verbal reasoning.

## This implementation

- **Spec knobs:** `difficulty` (Kids: one fold in half, one hole, three
  choices; Easy: one fold, two holes, four choices; Medium: two folds in
  half, two holes; Hard: two folds, one of them corner to corner; Expert:
  three folds, two holes, five choices), `problems` (1-4 per page), `width`,
  `height`.
- **Generation:** the sheet is a 64 x 64 integer lattice. Each fold is
  chosen among the lines of symmetry of the shape folded so far - vertical,
  horizontal or diagonal through its centre - so the flap lands exactly on
  the half that stays and the folded shape is always an exact half; a
  random side stays put. Holes are punched at lattice points inside the
  final shape, clear of its edges and folds by a hole's radius plus a
  margin, and well apart. The answer is the unfolding: going back through
  the folds, each adds the mirror image of every hole. Distractors are made
  from named slips (not unfolded, only the last folds unfolded, one fold
  reflected across the perpendicular line, the right holes flipped or turned
  with the whole sheet), shuffled, and kept only if they differ visibly from
  the answer and every option kept so far.
- **Solving:** reflect the punched holes through the fold lines, last fold
  first.
- **Guarantees:** every reflection is an exact integer map, so the answer is
  exact. It is checked for every problem by an independent method - every
  lattice point of the open sheet is folded forward, and the holes are the
  points that land on a punch - and in tests again by simulating the paper
  as stacks of layers. Every option differs from the answer and from every
  other option by at least a hole's width somewhere (Hausdorff distance of
  the hole sets at least two hole radii), so exactly one picture is right
  (`unique: true`). Holes never touch each other or the sheet's edge. Each
  problem is rated by what it is - folds, diagonal folds and holes
  (`rating_basis: folds_diagonal_folds_and_holes`) - and every level is
  reached as asked; the page reports the hardest of its problems.

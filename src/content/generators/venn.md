---
title: "Venn and Carroll Diagrams"
blurb: "Venn and Carroll diagrams — sort numbers by their properties, read filled diagrams, find the labels"
category: maths
version: "1.0.0"
---
Sort numbers by their properties into Venn and Carroll diagrams — then read them, and find their labels.

## What it is

A worksheet of two to six diagrams. Most give a list of numbers to sort
into a two-set Venn diagram (two overlapping circles in a box), a 2 × 2
Carroll diagram (a table with a property and its opposite along each side),
or a three-set Venn diagram. The properties are the ones met in primary and
middle school: even and odd, multiples of a number, factors of a number,
square numbers, prime numbers, two-digit numbers, and more or less than a
number. Other diagrams come already filled in, with questions such as "how
many are in A but not B?", or — the hardest — filled in without their
labels, to be chosen from a list. The answer key writes every number where
it belongs.

## How to play

- **Venn diagrams:** each circle holds the numbers with its property. A
  number with both properties goes where the circles overlap; a number with
  only one goes in that circle but outside the overlap; a number with
  neither goes inside the box but outside both circles. With three circles
  there are eight places: in all three, in each pair only, in each one
  only, and in none.
- **Carroll diagrams:** find the row (has the first property, or NOT) and
  the column (has the second property, or NOT), and write the number where
  they cross. Every number goes in exactly one of the four boxes.
- **Test each number against each property in turn.** A factor of 24
  divides 24 exactly (1, 2, 3, 4, 6, 8, 12, 24). A multiple of 6 is in the
  6 times table. A square number is a number times itself (1, 4, 9, 16 …).
  A prime number has exactly two factors, 1 and itself (2, 3, 5, 7, 11 …);
  1 is not prime.
- **Reading a diagram:** count the numbers in the part asked about. "In A
  but not B" is the part of circle A outside the overlap; "not in B" is
  everything outside circle B, including outside both circles.
- **Finding the labels:** look at the numbers inside each circle and ask
  what they share that the numbers outside do not. Check your choice
  against every number — only one pair of labels from the list fits them
  all.

## Purpose

Sorting by properties is a staple of primary mathematics in England (Venn
and Carroll diagrams appear from Year 2 to Year 6) and of early set work
in India and elsewhere. The diagrams make children name and test number
properties — odd and even, multiples, factors, squares and primes — and
they prepare for sets, logic and probability later on: the regions of a
Venn diagram are the intersections, differences and complements of sets,
met here without symbols. Finding the labels reverses the task and asks
for reasoning about what a group of numbers has in common.

## History

John Venn introduced his diagrams in 1880 in the paper "On the
Diagrammatic and Mechanical Representation of Propositions and
Reasonings", improving on the circles Leonhard Euler had used in his
*Letters to a German Princess* (1768). Lewis Carroll — the logician
Charles Dodgson, author of *Alice's Adventures in Wonderland* — published
his own square diagrams in *The Game of Logic* (1886) and *Symbolic Logic*
(1896); their 2 × 2 form is the Carroll diagram of today's classrooms.

## This implementation

- **Spec knobs:** `difficulty`; `mode` (`mixed`, `venn`, `carroll`,
  `venn3`, `read`, `labels`); `locale` (`us` writes GREATER THAN, `uk` and
  `in` MORE THAN); `count` (2-6 diagrams); `width`, `height`, `line`.
- **Generation:** Kids sorts numbers up to 20 by even, odd, multiples of 5
  and 10, and more or less than a number, into two-set Venn and Carroll
  diagrams; Easy goes to 30 and adds multiples of 3 and 4; Medium goes to
  50, adds multiples of 6, factors of 24, 36 and 48, square numbers, and
  filled diagrams to read; Hard goes to 100, adds primes, two-digit numbers,
  multiples of 9, factors of 60 and 100, and three-set Venn diagrams;
  Expert adds finding the labels of a filled diagram. Properties are paired
  only when no two are the same set, opposites, or one inside the other,
  and the numbers are chosen so every region of a two-set diagram (and at
  least six of the eight of a three-set one) holds a number, with at most
  four numbers to a region (three in a three-set diagram, two in its
  middle) so the key stays readable. Pairs of properties do not repeat on
  a page. Modes are served at an honest level: reading from Medium,
  three-set diagrams from Hard, finding labels at Expert only (meta
  reports `requested_difficulty`). Notation is spelled out — no set
  symbols.
- **Solving:** each number's region is the set of properties it has. On
  the key, numbers are written at grid points inside their region that
  keep clear of every circle, cell edge and letter, at the largest size
  that fits. Read questions count the numbers in the region asked about.
- **Guarantees:** `answers_checked` — every placement is re-derived from
  the properties. A labels diagram is proven to have exactly one answer by
  trying every ordered pair of different labels from its printed list
  (`labels_unique` in meta). The tests define every property a second way
  (primes from a list, squares by square root, multiples and factors by
  search) and check they agree on 1-100, read every number back from where
  it was drawn on the key and classify its position against the drawn
  circles or cells — it must be in the region its properties say — check
  that no two numbers overlap and that the page leaves sorting diagrams
  empty, recount every Read answer from the drawing, re-prove every labels
  answer by brute force, and check every printed character is in the font.

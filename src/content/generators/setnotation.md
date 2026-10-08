---
title: "Set Notation"
blurb: "Set notation — list the elements of unions, intersections and complements, shade and name Venn diagram regions, and counting problems; every named region has one shortest form"
category: maths
version: "1.0.0"
---
Unions, intersections and complements — list the elements, shade and name Venn diagram regions, and count with the overlaps.

## What it is

A worksheet of four to twelve questions on set notation. From a
universal set and two or three sets, given as lists or drawn on a Venn
diagram, list the elements of A ∪ B, A ∩ B′ or (A ∪ B ∪ C)′; shade the
region an expression names on a blank diagram; write the expression for
a shaded region; and solve counting problems such as "of 30 pupils, 18
play football, 12 play tennis and 5 do both: how many do neither?". The
answer key writes every answer and shades every region in red.

## How to play

- **The symbols:** the union of A and B (a cup sign between them) holds
  everything in A or B or both. The intersection (an upside-down cup)
  holds what is in both. The complement of A (a small dash after the
  letter, or a raised c) holds everything in the universal set that is
  not in A. The universal set is the box around the diagram, written
  with the Greek letter xi or with U.
- **Brackets first:** work out the inside of a bracket before the rest:
  for the complement of (A union B), find A union B, then take
  everything else.
- **Listing:** write the elements in curly brackets, smallest first. If
  there are none, write the empty set sign.
- **Shading:** shade each region (each separate piece of the diagram)
  that belongs to the expression. It can help to shade the parts lightly
  in pencil first, then go over the answer.
- **Naming:** write one expression for exactly the shaded part. The key
  gives the shortest one; any equivalent expression is also correct.
- **Counting:** n(A) means the number of elements of A. Fill in the
  diagram from the middle outwards: the overlap first, then the rest of
  each set, then what is outside every set. The number in A or B is
  n(A) + n(B) take away the number in both.

## Purpose

Set notation is new content at GCSE Mathematics (9-1) in England, where
pupils must use ξ, ∪, ∩ and ′ with Venn diagrams, and it opens NCERT
class 11 in India ("Sets") and US courses in probability (Common Core
S-CP.1). Shading and naming regions builds the picture that later
probability questions rely on.

## History

Georg Cantor founded set theory in the 1870s. The symbols ∪ and ∩ come
from Giuseppe Peano (1888), and the diagrams from John Venn's 1880 paper
on representing logical propositions; Leonhard Euler had drawn similar
circles a century earlier. The ξ for the universal set is a British
exam-board convention.

## This implementation

- **Spec knobs:** `difficulty`; `topic` (`mixed`, `list`, `shade`,
  `name`, `count`); `locale` (`uk` writes ξ and A′, `in` writes U and
  A′ and is titled "Sets", `us` writes U and Aᶜ); `count` (4-12);
  `width` (300-2000 Pt) and `height` (300-3000 Pt). Out-of-range values
  are clamped and reported in meta as `requested_*`. Pages narrower than
  460 Pt use one column.
- **Generation:** Easy uses two sets with expressions of one or two
  operations, sets listed in curly brackets, and word problems. Medium
  uses two sets with up to four operations, alternates listed sets with
  filled diagrams, and n(…) problems. Hard and Expert use three sets
  (always drawn), expressions of up to three and of three to five
  operations, working back to n(A ∩ B) at Hard and three-set counting
  from all the overlaps at Expert. Elements are spread over the regions
  with a cap per region so the numbers fit the drawing.
- **Solving:** a diagram with k sets has 2ᵏ regions; each expression's
  region set is a bitmask. Every expression with at most nine symbols is
  built bottom-up (each shortest expression is made of shortest parts),
  keeping all shortest forms of each region set up to the order of the
  parts of a union or intersection.
- **Guarantees:** a listed answer is computed from the sets by logic and
  again through the region mask. A region is asked to be named only when
  its shortest expression (at most seven symbols) is unique; the tests
  confirm this by building every expression tree independently. A count
  is asked only when the target's region vector lies in the span of the
  givens' (exact Gaussian elimination), so the facts on the page fix it;
  the tests recompute it by inclusion–exclusion. Numbers drawn on a
  diagram are checked to sit inside their regions. Two sets have only
  about a dozen nameable regions, so a long page of naming questions at
  Easy or Medium may repeat one. Meta: `answers_checked`, `unique`,
  `difficulty`, `rating_basis` (`question_forms_by_level`).

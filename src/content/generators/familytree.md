---
title: "Family tree charts"
blurb: "Family tree charts — fan charts of a half, three-quarter or full circle and pedigree charts, 4 to 7 generations with Ahnentafel numbers"
category: design
version: "1.0.0"
---
Fan charts and pedigree charts to fill in, four to seven generations, with
every ancestor's place numbered the way genealogists number them.

## What it is

A blank chart of your direct ancestors. You are number 1. Your father is 2
and your mother 3. Your father's parents are 4 and 5, your mother's 6 and 7,
and so on: the father of person n is always 2n and the mother 2n + 1. This
is the Ahnentafel ("ancestor table") numbering, and it lets you refer to
anyone on the chart by a number.

- A **fan chart** puts you at the centre, with each earlier generation in a
  ring around you. Each person's parents share the two halves of that
  person's slice. It comes as a half circle, three quarters of a circle or
  a full circle.
- A **pedigree chart** runs from left to right. Your box is on the left,
  bracketed to your parents' boxes, which are bracketed to theirs. Larger
  boxes have lines for birth (B.) and death (D.) dates.

Colours can be plain for colouring in, soft greens, warm browns for the
father's side and rose for the mother's, or a rainbow, with an optional
ornamental border.

## How to use it

1. Print at 100 % on the largest paper you can. A full circle of seven
   generations fits on letter or A4 paper; fewer generations leave more
   room to write.
2. Write your own name in the centre (fan) or the left-hand box
   (pedigree), number 1.
3. Write your father in 2 and your mother in 3. For anyone in place n,
   their father goes in 2n and their mother in 2n + 1. In a fan chart the
   father always takes the first half of the slice, clockwise.
4. Add dates and places beside the names, or in the B. and D. lines of a
   pedigree chart.
5. To go further back, start a new chart for one ancestor and note "see
   chart 2" in their place.

## Purpose

Family trees are a favourite gift and a classroom project. Fan charts show
many generations at a glance and look good framed. Pedigree charts are the
working tool of genealogists, with room for dates. Both only work if the
spaces are big enough to write in, which is hard in the outer rings of a fan.
These charts check that every space is at least 5 mm across, and draw one
generation fewer rather than print spaces too small to use.

## History

Tables of ancestors are ancient, but the numbering used here was set out by
the Spanish genealogist Jerónimo de Sosa in 1676 and popularised by Stephan
Kekulé von Stradonitz in 1898, so it is also called Sosa–Stradonitz
numbering. Fan charts became popular in nineteenth-century France and
Germany as decorative family records. Pedigree charts in the standard
left-to-right form are what genealogical societies and record offices have
used for a century.

## This implementation

- **Spec knobs:** `kind` (`fan`, `pedigree`); `generations` (4–7,
  including you); `arc` (`half`, `three_quarter`, `full`, fan only);
  `look` (`plain`, `sage`, `heritage`, `rainbow`); `numbers`; `border`;
  `title`; `page`, `landscape`; `margin` (inches); `weight`.
- **Generation:** generation g has 2^g places, numbered 2^g to
  2^(g+1) − 1 in order. In a fan, ring g is cut into 2^g equal slices
  running clockwise from the start of the arc, so place n's parents 2n and
  2n + 1 split its slice in two. Rings get wider towards the edge, where
  names are written along the radius. In a pedigree chart, generation g is
  a column, and each box is centred between its two parents. If the request
  leaves any space under 5 mm, a generation is dropped and the request is
  kept as `requested_generations`. The seed picks the border ornament.
- **Solving:** nothing to solve.
- **Guarantees:** `ahnentafel_checked` and `partition_checked`. These are
  re-checked from the finished places, not from the layout code. Generation
  g holds exactly the numbers 2^g to 2^(g+1) − 1. In a fan, the slices of
  every ring partition the arc exactly, in number order, and each parent
  pair halves its child's slice, father first. In a pedigree chart, each
  pair of parent boxes is centred on the child's box, father above. Every
  writing space is at least 5 mm across at 100 % print.

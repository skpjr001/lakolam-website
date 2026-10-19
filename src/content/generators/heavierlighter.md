---
title: "Heavier or Lighter"
blurb: "Heavier or Lighter — picture objects on pan balances: circle the heavier, find the heaviest, put them in order"
category: maths
version: "1.0.0"
---
Look at the balances. Which one is heavier?

## What it is

A picture page for young children. Toys and things — balls, gifts, jars,
bags, blocks and buckets — sit on pan balances. A balance goes down on the
side with the heavier thing. The easiest questions ask which of two things
is heavier or lighter. Harder ones show two, three or four balances and ask
for the heaviest or lightest thing, or for all of them in order from
lightest to heaviest.

## How to play

- A balance goes down on the heavier side and up on the lighter side.
- **Circle the heavier one:** circle the thing on the side that is down.
  **Circle the lighter one:** circle the thing on the side that is up.
- **Heaviest or lightest of three:** look at both balances. The heaviest
  thing is never on the side that goes up. The lightest thing is never on
  the side that goes down.
- **Put them in order:** write 1 under the lightest thing, 2 under the
  next, and so on up to the heaviest. If the ball is heavier than the
  jar, and the jar is heavier than the gift, then the ball is heavier
  than the gift too.
- Each thing looks the same in every balance of a question, so you can
  follow it from one balance to the next.

## Purpose

Comparing weights on a balance is one of the first measurement ideas in
early maths: heavier, lighter, heaviest, lightest. Putting three or more
things in order from two or more balances adds a first taste of logical
reasoning — if A is heavier than B and B is heavier than C, then A is
heavier than C.

Grade notes: **Kids** suits pre-K to kindergarten (age 4-5): one balance,
two things. **Easy** suits kindergarten to grade 1 (age 5-6): heaviest or
lightest of three from two balances. **Medium** suits grade 1 (age 6-7):
put three things in order. **Hard** suits grades 1-2 (age 6-8): four
things on three balances, heaviest, lightest or order. **Expert** suits
grade 2 (age 7-8): five things on four balances, in order.

## History

Balance-scale comparison pages are a staple of early-years maths
workbooks, and picture balance games are a favourite of early-learning
websites. This is an original version with pictures of our own.

## This implementation

- **Spec knobs:** `difficulty` (things and balances per question),
  `count` (2-8 questions, clamped with `requested_count`), `colour`
  (coloured pictures, or greys), `width`, `height`, `line`.
- **Generation:** each question picks different kinds of thing, colours
  and hidden weights (different whole numbers 1-20), then one balance
  fewer than things between random pairs, each drawn tipping towards the
  heavier side. Heaviest/lightest questions are kept only when no single
  balance settles them.
- **Solving:** every ordering of the question's things is tried; the
  orderings that agree with every balance must all give the asked answer
  (the same heaviest, the same lightest, or one single order), so the
  answer is forced by the pictures.
- **Guarantees:** deterministic per seed; `unique: true`,
  `check: every_consistent_ordering`. Tests check again with every weight
  assignment 1..n (repeats allowed) that matches the tilts. Rated by
  things and balances (`rating_basis: objects_and_balances`): Kids 2
  things 1 balance, Easy 3 things 2 balances (extreme), Medium 3 in
  order, Hard 4 things 3 balances, Expert 5 things 4 balances.

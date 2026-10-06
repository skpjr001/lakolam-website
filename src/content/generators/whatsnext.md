---
title: "What Comes Next?"
blurb: "What comes next? — continue picture patterns (AB, AAB, ABC, turning, growing) by drawing or circling"
category: puzzle
version: "1.0.0"
---
Rows of pictures that repeat in a pattern. Spot the pattern and say what
comes next.

## What it is

A pattern-completion page for young children. Each row repeats a little
group of pictures — apple, star, apple, star… — and ends with an empty box,
or has a picture missing in the middle. Early rows use simple patterns like
AB, AAB and ABB; later ones use three or four pictures, pictures that turn a
quarter at a time or flip, pictures whose filling changes, and groups that
grow by one (or two) each time.

## How to play

Say the pictures in each row out loud and listen for the part that repeats.

- **Empty box at the end:** draw what comes next, or circle it among the
  pictures underneath.
- **Empty box in the middle:** a picture is missing. Circle the one that
  fits the gap.
- **Growing rows:** count the pictures in each box. How many more each time?
  Circle the box that comes next.
- **Turning rows:** watch which way the picture points. It turns the same
  amount each time.

## Purpose

Recognising and extending patterns is one of the first steps in early
mathematics: it builds the habit of looking for a rule, predicting with it
and checking. Saying the pattern aloud ("dog, fish, fish, dog, fish,
fish…") links it to rhythm and language; growing patterns lead on to
counting on and skip counting. The page suits ages three to seven.

## History

Repeating patterns with beads, blocks and pictures have been a staple of
early-years teaching since Friedrich Fröbel's kindergarten "gifts" in the
1830s and Maria Montessori's materials. Pattern work is part of the early
mathematics standards in many countries — the US Common Core and Head Start
frameworks, and England's Early Years Foundation Stage, which asks children
to "continue, copy and create repeating patterns".

## This implementation

- **Spec knobs:** `difficulty` (Kids: AB, AAB, ABB; Easy: adds ABC and
  AABB; Medium: ABCD and gaps in the middle; Hard: quarter turns, changing
  fills, groups growing by one; Expert: ABAC, half turns, mirror flips,
  groups growing by two, more gaps), `task` (`mixed`, `draw`, `circle`,
  `gap`), `rows` (3–7), `choices` (3–4), `colour`, `width`, `height`.
- **Generation:** each row takes a pattern from the level's list in a
  shuffled cycle. Pictures come from the shared `lako-icons` set (near-twins
  such as ball and circle left out), turning rows only use pictures whose
  quarter turns all look different, and fill rows use plane shapes. A row
  shows six to eight pictures — always at least two whole repeats — and the
  gap, when there is one, sits in the second repeat or later. Wrong choices
  are the pattern's other pictures first (the tempting ones), then spares.
- **Solving:** the answer is what the repeat puts in the missing place; for
  growing rows, the last count plus the step.
- **Guarantees:** checked for every row before it is used, and re-checked in
  tests (`answers_checked: true`, `unique: true`). At least two whole
  repeats are visible, and the shortest repeat that fits what is shown (the
  gap matching anything) is the intended one — so there is no other
  reading, and the answer is the picture that repeat puts in the missing
  place. Growing rows show at least three steps with a steady step. The
  pictures of a repeat look clearly different from each other, turns and
  flips by a wide margin (similarity at most 0.6), and every wrong choice
  looks clearly different from the answer — checked on pixels with
  `lako_icons::distinct`, or by comparing whole boxes for groups of
  different sizes. The page is rated by its hardest row
  (`rating_basis: hardest_pattern_kind_and_task`); a level whose rows happen
  to be easier is labelled with the band it actually reaches. The key draws
  the answer in place and rings the right choice.

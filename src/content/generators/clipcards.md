---
title: "Count and Clip"
blurb: "Count-and-clip cards — count pictures, ten frames, dice or tally marks, or solve a fact, and clip the one right numeral"
category: maths
version: "1.0.0"
---
Count the pictures, then clip a peg on the right number — task cards for
early counting and number facts.

## What it is

A page of cards to cut out. Each card shows a quantity — a group of the
same picture, counters in ten frames, dice or tally marks — or a small
addition or subtraction fact, and along its bottom edge two to four
numbers. Exactly one of them is right. Pages can show one kind of card or
mix pictures, ten frames, dice and tally marks, and five levels run from
counting to five up to counting to thirty.

## How to play

Cut out the cards. Pick a card and count what it shows: the pictures, the
dots in the ten frames, the dots on all the dice together, or the tally
marks (a bundle of four with a line across is five). On a sum card, work
out the answer. Then find that number along the bottom of the card and
clip a clothes peg on it. Only one number on each card is right.

To check your own work, put a small sticker or dot on the back of each card
behind the right number, using the answer sheet: when you turn the card
over, the peg should sit on the sticker.

## Purpose

Counting a set and matching it to a numeral is the heart of early number
sense; seeing ten frames, dice patterns and tally bundles builds the habit
of counting in groups instead of one by one. The wrong numbers are close
to the right one, so guessing by size does not work. Squeezing a clothes
peg strengthens the pincer grip children need for writing, which is why
clip cards are a favourite for maths centres and quiet tables.

## History

Clothes-peg activities come from early-years practice, where practical
"work" with everyday objects goes back to Maria Montessori's classrooms in
the early 1900s. The ten frame was popularised by the mathematics educator
Robert Wirtz in the 1970s and is now standard in early-years maths, and
the word "subitizing" — seeing how many without counting — was coined by
psychologists in 1949. Printable count-and-clip cards became a teacher-made
staple with the rise of classroom resource sharing online.

## This implementation

- **Spec knobs:** `difficulty` (Kids answers 1-5 with wrong numbers 2-3
  away, Easy 1-10 with 1-3 away, Medium 1-20 with 1-2 away, Hard 6-20 with
  1 away, Expert 11-30 with 1 or 10 away), `show` (pictures, ten frame,
  dice, tally, addition, subtraction, mixed), `cards` (2-12), `choices`
  (2-4 numbers per card), `colour`, `width`, `height`. Out-of-range `cards`
  and `choices` are clamped and the request is recorded in meta.
- **Generation:** answers are dealt from the level's range without repeats
  until it runs out (never the same answer twice in a row). Pictures sit
  in random cells of a grid with about a third more cells than pictures;
  ten frames fill row by row, one frame per ten; dice split the number as
  evenly as possible and then pass pips between dice at random; tally
  marks are gates of five. Addition splits the answer into two parts;
  subtraction keeps the first number within the level's top and the part
  taken away no bigger than what is left. Wrong numbers come from the
  level's distances first and only then from further away, never below 1,
  and the right number goes in a random position.
- **Solving:** count, or work out the fact.
- **Guarantees:** on every card exactly one number equals the quantity
  drawn, and the others are distinct (`answers_checked`). The quantity is
  recomputed from the drawing's own parts before the page is drawn, and the
  tests count again from the display list itself — pips, counters, tally
  strokes and pictures — at every level and kind. The rating is the level's
  number range and distractor distance (`rating_basis:
  number_range_and_distractor_gap`). The answer sheet circles the right
  number on every card.

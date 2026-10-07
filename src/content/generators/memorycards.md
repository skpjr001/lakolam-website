---
title: "Memory Pairs"
blurb: "Memory pairs — cut-out card sheets of picture, word, shadow, number and fact pairs, every card with exactly one partner"
category: puzzle
version: "1.0.0"
---
Turn over two cards: a pair? Keep them! A printable memory game of
pictures, words, shadows, numbers and sums.

## What it is

A sheet of square cards to cut out and play the classic memory game
(also called Concentration or Pelmanism). Cards come in pairs: two of the
same picture, a picture and its word, a picture and its shadow, a number
and a group of dots, or a sum and its answer. Four to twelve pairs suit
players from toddlers to grown-ups. The cards are printed shuffled, so the
uncut sheet also works as a "find the pairs" page.

## How to play

Cut out the cards and lay them face down in rows. Take turns to turn over
two cards so everyone can see them.

- If they make a pair — the same picture, a picture and its word or
  shadow, a number and that many dots, or a sum and its answer — keep them
  and have another turn.
- If not, turn them back over in the same places, and the next player
  goes.

Remember where each card was! When every pair has been found, the player
holding the most pairs wins. Every card has exactly one partner. To play
on the sheet instead, colour or join each card to its partner; the answer
sheet marks the two cards of each pair with the same letter.

## Purpose

Memory games train visual memory, attention and turn-taking, and the
mixed pairs add learning: reading a word for a picture, linking a numeral
to a quantity, recalling addition facts, or matching a shape by its
outline alone. Fewer pairs make a gentle first game; twelve pairs keep
older players busy.

## History

Pairs games with ordinary playing cards are old: in Britain the game was
called Pelmanism, after the Pelman Institute's memory-training courses of
the early 20th century, and in America Concentration — the name of a long
running television quiz from 1958. The Swiss picture-card version was
published by Ravensburger as Memory in 1959 and has sold in the tens of
millions since.

## This implementation

- **Spec knobs:** `difficulty` (pairs: Kids 4, Easy 6, Medium 8, Hard 10,
  Expert 12), `pairs` (2-15, overriding the level; the level is then rated
  from the pairs printed), `kind` (pictures, picture-word, shadow,
  number-quantity, addition), `colour`, `numbers` (small card numbers in
  the corners), `width`, `height`. Numbers and sums run to 5 at Kids, 10 at
  Easy and Medium and 20 at Hard and Expert, widening when there are more
  pairs than numbers.
- **Generation:** pictures are drawn in a random order and kept only when
  they look clearly different from every picture already kept, measured on
  rendered bitmaps (soft overlap below the icon set's distinctness line)
  as outlines and, for shadow pairs, as silhouettes too. Numbers and sums
  are distinct; each sum is split into two parts of at least 1. The cards
  are shuffled into a grid of equal squares sized to fill the page.
- **Solving:** each card's partner is the one card that matches it.
- **Guarantees:** every card pairs with exactly one other card, checked
  over every pair of cards on the sheet (`unique`, `pairs_checked`); the
  tests re-check it by grouping cards by what they stand for, re-measure
  every two pictures with the icon set's own distinctness test, and check
  that the counters on a card are exactly its number. The rating is the
  number of pairs (`rating_basis: pairs`). The answer sheet letters every
  card with its pair, and meta lists each pair by card number.

---
title: "Memory Pairs"
blurb: "Memory pairs — cut-out card sheets of picture, word, shadow, number and fact pairs, every card with exactly one partner"
category: puzzle
version: "1.0.1"
---
Turn over two cards: a pair? Keep them! A printable memory game of
pictures, words, shadows, numbers and sums.

## What it is

A sheet of square cards to cut out and play the classic memory game
(also called Concentration or Pelmanism). Cards come in pairs: two of the
same picture, a picture and its word, a picture and its shadow, a number
and a group of dots, or a sum and its answer. More decks match a number
with a group of pictures, a capital letter with its small letter, a shape
with its name, a times fact with its answer, two words that rhyme, or two
of the same sight word. Four to twelve pairs suit players from toddlers to
grown-ups. The cards are printed shuffled, so the
uncut sheet also works as a "find the pairs" page.

## How to play

Cut out the cards and lay them face down in rows. Take turns to turn over
two cards so everyone can see them.

- If they make a pair — the same picture, a picture and its word or
  shadow, a number and that many dots or pictures, a capital and its small
  letter (A and a), a shape and its name, a sum or times fact and its
  answer, two words that rhyme (cat and hat), or the same sight word twice
  — keep them and have another turn. Say the pair out loud as you take
  it: "four — one, two, three, four ducks", "big A, little a", "cat, hat".
- If not, turn them back over in the same places, and the next player
  goes.

Remember where each card was! When every pair has been found, the player
holding the most pairs wins. Every card has exactly one partner. To play
on the sheet instead, colour or join each card to its partner; the answer
sheet marks the two cards of each pair with the same letter.

## Purpose

Memory games train visual memory, attention and turn-taking, and the
mixed pairs add learning: reading a word for a picture, linking a numeral
to a quantity, recalling addition and times facts, or matching a shape by
its outline alone; the letter, shape, rhyme and sight-word decks practise
early reading. Fewer pairs make a gentle first game; twelve pairs keep
older players busy.

Grade notes: pictures, shadows, number and pictures, and capital and small
letters suit ages 3-6 (preschool and kindergarten); shapes and names,
rhymes and sight words kindergarten to grade 2 (the sight words follow the
Dolch lists: pre-primer at Kids and Easy, primer at Medium, first grade at
Hard, second grade at Expert); addition grades 1-2; times facts grades 2-4
(the 2s at Kids, 2s, 5s and 10s at Easy, up to the 5s at Medium, 2-10 at
Hard and 2-12 at Expert).

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
  from the pairs printed), `kind` (`pictures`, `picture_word`, `shadow`,
  `number_quantity`, `addition`), `deck` (`by_kind`, the default, prints
  the pairs `kind` names; `number_picture`, `case_letters`, `shape_name`,
  `times`, `rhyme`, `sight_words` are further decks and ignore `kind`),
  `colour`, `numbers` (small card numbers in
  the corners), `width`, `height`. Numbers and sums run to 5 at Kids, 10 at
  Easy and Medium and 20 at Hard and Expert, widening when there are more
  pairs than numbers.
- **Generation:** pictures are drawn in a random order and kept only when
  they look clearly different from every picture already kept, measured on
  rendered bitmaps (soft overlap below the icon set's distinctness line)
  as outlines and, for shadow pairs, as silhouettes too. Numbers and sums
  are distinct; each sum is split into two parts of at least 1. The cards
  are shuffled into a grid of equal squares sized to fill the page.
- **Decks:** number and pictures uses numbers up to 5 at Kids and up to 10
  above (widening when there are more pairs), each group a different
  everyday picture; letters are drawn from A-Z with real small letters;
  shapes start from circle, square, triangle, rectangle, star, heart, oval
  and diamond at Kids and Easy and mix all eighteen from Medium; times
  facts have distinct products (either factor order); rhymes come from
  thirty families of everyday words, each word shown with its picture when
  there is one; sight words from the Dolch list of the level. Words on
  rhyme and sight-word cards are printed in small letters, and the extra
  decks colour their ink by place on the sheet, never by pair. A deck draws
  from its own randomness stream, so no earlier sheet changes.
- **Solving:** each card's partner is the one card that matches it.
- **Guarantees:** every card pairs with exactly one other card, checked
  over every pair of cards on the sheet (`unique`, `pairs_checked`); the
  tests re-check it by grouping cards by what they stand for, re-measure
  every two pictures with the icon set's own distinctness test, and check
  that the counters on a card are exactly its number. The rating is the
  number of pairs (`rating_basis: pairs`). For the extra decks the same
  all-pairs check runs on their own matching rule (meta `deck`), and two
  rhyme cards pair only when the words rhyme in every American
  pronunciation (CMUdict) — a pair is drawn only when neither word rhymes
  with any word already on the sheet under any accent (so PIN and TEN,
  which some accents merge, never share a sheet); the tests re-check every
  deck by grouping cards from their faces and the rhyme table. The answer sheet letters every
  card with its pair, and meta lists each pair by card number.

---
title: "Analogies"
blurb: "Word analogies — PUPPY is to DOG as KITTEN is to …; circle or write the word, every option proven to fit only one relation"
category: word
version: "1.0.0"
---
PUPPY is to DOG as KITTEN is to … — word pairs that go together in the same
way, every option proven to fit only one.

## What it is

A page of word analogies. Each row shows a pair of words that belong
together in some way, then a third word: the reader finds the word that
belongs with the third word in the same way. Rows use ten kinds of link:
opposites, young animals, male and female, animal sounds, animal homes,
part and whole, worker and tool, worker and workplace, item and kind, and
animal and group name — each either way round.

## How to play

Say the first pair as a sentence: "a puppy is a young dog". Then say the
same sentence with the third word: "a kitten is a young …". The word that
finishes the sentence is the answer. On a choice page, circle it among the
four words under the row; on a write-in page, write it on the line. If two
words seem to fit, make your sentence more exact.

## Purpose

Analogies build vocabulary and reasoning at once, and they appear in
school entrance tests (the 11+, CogAT, OLSAT) and in many curricula. Pages
for the youngest use first words such as HOT and COLD or PUPPY and DOG;
harder pages reach words like ZENITH and NADIR and a PARLIAMENT of owls.

## History

Verbal analogies go back to Aristotle's study of proportion in language
("as old age is to life, so evening is to day"). They became a mainstay of
intelligence and aptitude tests in the twentieth century, including the
SAT, which used them until 2005, and remain a standard item type in
children's reasoning tests.

## This implementation

- **Spec knobs:** `difficulty` (Kids first words, Easy ages 7-8, Medium
  9-11, Hard secondary; Expert is served as Hard); `task` (`choice`, the
  default, or `write`); `relation` (`mixed`, the default, or one of the ten
  kinds); `rows` (4-12, 0 = 8); `name_line`; `width`, `height`, `margin`.
- **Generation:** each row takes a question pair at the band's grade from
  its relation (either direction), a stem pair from the same relation and
  direction at the band or easier, and three wrong options from words on
  the same side of the same relation, so they are the same kind of word.
  No word is used twice on a page. When a relation has no pairs at the
  band (animal sounds stop at grade 3; worker and tool starts at grade 2),
  the page is served at the nearest band it can fill and says so as
  `requested_difficulty`.
- **Solving:** proved over the whole relation table: the stem pair stands
  in exactly one relation; no wrong option has any link to the third word
  — in any relation, either way round, or as one of the listed close pairs
  (links that are real in speech but not used for questions, such as FOX
  and BURROW or TRIANGLE and INSTRUMENT); for a write-in row the third word
  has exactly one partner and no close link to any other word on the
  answer side, and only relations whose answer is a single word are asked
  (young ones and male and female both ways round, the rest forwards). The tests re-check every page from the raw data
  file.
- **Guarantees:** exactly one option fits within the relation table
  (`unique: true`); every word is a friendly dictionary word; the page is
  rated by its hardest pair's grade (`rating_basis`). The relation table
  is a curated list written for Lakolam; meanings outside it are kept out
  of the options by the close-pair list, not by proof.

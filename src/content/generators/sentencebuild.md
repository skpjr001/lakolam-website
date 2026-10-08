---
title: "Build the Sentence"
blurb: "Build the sentence — scrambled word cards to cut and glue or write in order, each with exactly one grammatical order"
category: word
version: "1.0.0"
---
Cut out the word cards and glue them in order: the capital letter starts
the sentence and the full stop ends it.

## What it is

A cut-and-glue sentence page for early readers. Each row shows the words of
a short sentence on cards, shuffled — "cat. / on / The / sat / mat / the".
The child cuts the cards out and glues them into the boxes in the right
order, or writes the sentence on a line. The first word carries its
capital letter and the last word its full stop, so the cards themselves
give the first clues. Easy pages have three or four words; harder pages
have up to eight, with describing words that must come in the right order
("a big old red bus").

## How to play

- Read all the word cards in the row.
- Find the card with a capital letter that is not a name or I: it goes
  first. Find the card with the full stop: it goes last.
- Put the other words in between so the sentence makes sense. Read it out
  loud to check.
- Cut the cards out and glue them into the boxes in order (or write the
  sentence on the line).
- There is only one way to order each row's cards into a sentence.

## Purpose

Building sentences from scrambled words practises word order, the idea of
a sentence, and the conventions of a capital letter and full stop — early
grammar goals such as Common Core L.K.1f and L.1.1j and the Year 1 and 2
expectations of the English National Curriculum. Handling the words as
cards lets children try different orders before they commit, and gluing
them keeps the page fun for fine-motor practice.

## History

Sentence strips and word cards have been part of early reading teaching
since the "sentence method" of the late nineteenth century, when teachers
began to teach reading from whole sentences rather than letters alone.
Cut-and-paste scrambled sentences became a staple of kindergarten and first
grade workbooks and of teacher-made resources in the late twentieth
century.

## This implementation

- **Spec knobs:** `difficulty` (words per sentence: Kids 3-4, Easy 5,
  Medium 6, Hard 7, Expert 8), `layout` (`cut`: dashed cards to cut and
  boxes to glue them into; `write`: cards and a writing line), `count`
  (2-8 sentences, 0 for 5), `name_line`, `width`, `height`, `margin`.
- **Generation:** sentences are built from simple frames — a name, a
  pronoun or "the dog" as subject; a verb phrase such as "is happy", "can
  see the kite", "ran to the zoo", "has a big red hat" — over a small
  vocabulary of sight words and picture nouns, with agreement (he sees,
  they see) and a or an. Cards are shuffled so that neither the first nor
  the last card is in place. A verb frame is not repeated on a page.
- **Solving:** the key shows the cards glued in order (or the sentence
  written on the line).
- **Guarantees:** `unique`. Every order of a row's cards that starts with
  the capital and ends with the full stop is parsed by a deliberately
  generous grammar: it ignores meaning ("the ball sees the dog" parses),
  lets any verb take an object and any number of phrases, lets
  prepositions stand alone after a verb, stacks plain nouns ("box kite"),
  joins phrases and sentences with "and", allows plural and mass nouns
  without a determiner, and lists every word under every part of speech it
  can take ("park" is a noun and a verb). It keeps only rules every
  reader hears: count nouns need a determiner, the verb agrees with its
  subject, object pronouns are not subjects, describing words come before
  their noun with size before age before colour, and objects come before
  phrases. A sentence is used only when exactly one order parses — so a
  describing word that could sit on either noun ("the sad fox sees the
  ball") never appears. The tests re-check every row by brute force over
  every arrangement of its cards. The page is rated by words per sentence
  (`rating_basis`).

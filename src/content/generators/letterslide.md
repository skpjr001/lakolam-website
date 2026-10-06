---
title: "Letter Slide"
blurb: "Letter slide — one letter from each column spells a word; find the key words that use every letter once"
category: word
version: "1.0.0"
---
Slide the letter columns to spell words — and find the few words that use
every letter exactly once.

## What it is

A row of letter columns, like the strips of a combination lock. A word is
read straight across by taking one letter from each column, in order: with
columns L/B/H, I/A/O, L/F/N and T/E/D you can spell LIFT, BAND, HOLE, BOLD,
LANE and many more. Every column holds the same number of letters, and that
many key words use every letter on the board exactly once between them.
The puzzle is to find them; the activity version asks how many words you
can make at all.

## How to play

Pick one letter from the first column, one from the second, and so on, to
spell a word across. You may use any letter of a column — imagine sliding
the strip up or down until it sits in your word.

To solve the puzzle, find words that together use every letter on the
board exactly once: if each column has four letters, you need four words,
and no letter may be used twice. Many words can be spelled, but only one
set of words uses up every letter. Rare letters are a good place to start
— a column's odd letter (a Y, a K) can only sit in a few words. Write each
word in the boxes below the columns.

In the "make as many words as you can" version, write every word you find
on the lines; the answer page lists the ones we found.

## Purpose

A word-building puzzle that rewards vocabulary and a little planning:
finding words is easy, but finding the set that uses everything needs you
to think about which words leave the right letters for the others. The
activity version is a classroom favourite for spelling and word-family
practice.

## History

Letter-column word games go back to mechanical word wheels and sliding
spelling toys for children. The modern puzzle — columns of letters, find
words and then the set that uses every letter — was popularised by the
mobile game TypeShift, designed by Zach Gage (2016), whose "core" challenge
is the minimum set of words covering every letter. This is a clue-free,
printable version under a generic name.

## This implementation

- **Spec knobs:** `difficulty`, `mode` (`cover` — the puzzle; `find_all` —
  the activity page), `cell`, `line`.
- **Levels:** Kids — 3 columns of 3 everyday letters (3 key words of 3
  letters). Easy — 4 columns of 3. Medium — 5 columns of 4. Hard — 5
  columns of 5. Expert — 6 columns of 5. Kids and Easy key words come from
  SCOWL's basic tier, the rest from its common tier; all pass the
  family-friendly filter, and plain plurals are left out.
- **Generation:** key words are picked so no two share a letter in the
  same position; each column is the key words' letters at that position,
  in a seeded order. If the columns allow a second cover, local search
  swaps one key word at a time while the number of covers does not grow,
  until it is one. Several such boards are made and the one with the most
  common words to find (the most decoys) is kept.
- **Solving / proof:** every word of the large dictionary (`Tier::Large`,
  SCOWL ≤ 70, ≈ 114k words) the columns can spell is listed, and an
  exact-cover search counts the sets of words that use every letter once,
  stopping at two. Tests re-check by a different method: the spellable
  words are rebuilt by trying every letter combination, and covers are
  enumerated as one word per first-column letter. Difficulty is rated from
  the board's size (`columns_and_letters_per_column`); every band is
  reached as asked.
- **Guarantees:** deterministic per seed; in `cover` mode the key words are
  the only set of large-dictionary words using every letter exactly once
  (`unique`). In `find_all` mode the answer page lists every common-tier,
  family-friendly word the columns spell (`answers_checked`; a solver may
  also find rarer words).

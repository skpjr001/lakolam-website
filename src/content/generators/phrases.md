---
title: "Finish the Phrase"
blurb: "Finish the phrase — sayings, famous pairs and similes with a missing word to write, circle, take from a word bank or match; large print"
category: word
version: "1.0.0"
---
A stitch in time saves ___ — well-known sayings, famous pairs and similes with one word to remember.

## What it is

A large-print page of familiar phrases with the last word (or one word)
missing: proverbs such as A PENNY SAVED IS A PENNY ___, famous pairs such
as SALT AND ___ or SOONER OR ___, and similes such as AS BUSY AS A ___.
The reader supplies the missing word — by writing it, circling it among
three, taking it from a word box, or drawing a line to it.

## How to play

- **Write:** read each phrase and write the missing word on the line.
- **Choice:** circle the one word of the three that finishes the phrase.
- **Word box:** every missing word is in the box at the top. Use each word
  once.
- **Match:** draw a line from each phrase to the word on the right that
  finishes it. Every word is used once.

Some phrases have more than one common ending — AS BUSY AS A BEE or A
BEAVER — and any well-known ending counts. On the word-box, matching and
choice pages only one of the words shown fits each phrase.

## Purpose

Finish-the-phrase is one of the activities carers and activity
coordinators reach for first with older adults: familiar sayings live in
long-term memory, so the page is easy to start, rewarding to finish and
a natural start to conversation ("my mother always said that"). For
English learners the same page is a drill in idioms, collocations and
similes that textbooks rarely list. The four tasks let the same
phrases be offered with more or less help.

## History

Proverbs are among the oldest pieces of language people pass on: many of
these were collected by John Heywood in 1546 and by Benjamin Franklin's
*Poor Richard's Almanack* in the 1730s, and some are far older. Fixed
pairs (salt and pepper, safe and sound) and stock similes (as cool as a
cucumber) are just as traditional. "Finish the saying" quizzes have long
been a staple of newspapers, radio games and reminiscence sessions.

## This implementation

- **Spec knobs:** `difficulty`; `task` (`write`, `choice`, `bank`,
  `match`); `kind` (`mixed`, `sayings`, `pairs`, `similes`); `rows`
  (4–16; 0 fits as many as the page holds at the text size); `text_size`
  (12–36 pt, 20 by default for large print); `name_line`; `width`,
  `height`, `margin`.
- **Levels:** every phrase carries a familiarity tier: 1 known to almost
  everyone, 2 familiar, 3 older or less common. Easy pages use tier 1,
  Medium tier 2, Hard tier 3 (easier tiers fill in only when a kind runs
  short). The page is rated by its least familiar phrase
  (`rating_basis`). There are three tiers, so Kids is served as Easy and
  Expert as Hard, with `requested_difficulty` in the metadata.
- **Generation:** phrases come from a curated list written for Lakolam of
  about 250 traditional, public-domain sayings, pairs and similes, each
  with its usual ending and every other word a fair reader might write in
  the blank. Phrases are drawn at random, the band's tier first, and kept
  only if they can share the page (below). Choice rows take two wrong
  words from the answers of other phrases of the same kind, agreeing with
  an A or AN before the blank. When the rows do not fit, the text is set
  smaller (meta `text_size`), and past 8 pt rows are dropped
  (`requested_rows`).
- **Solving:** two phrases share a page only if neither accepts the
  other's answer, their answers differ, and neither answer appears in the
  other's wording. So on a word-box or matching page each phrase has
  exactly one fitting word among those shown, and each choice row exactly
  one right choice; the tests re-check this from the raw list.
- **Guarantees:** deterministic per seed; every answer is a curated,
  family-friendly dictionary word, and every word printed passes the
  family-friendly filter (`answers_checked`); choice, word-box and match
  pages carry `unique` (one fitting word per phrase among those shown,
  judged by the recorded endings). Write pages list each phrase's other
  accepted endings in `also_accepted`. American and British spellings are
  avoided where they differ.

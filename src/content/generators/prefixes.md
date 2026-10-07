---
title: "Prefixes"
blurb: "Prefixes — un, re, dis, mis, pre and more: build words, choose the prefix, split and match meanings"
category: word
version: "1.0.0"
---
Un + happy = unhappy — build words with prefixes, choose the right one, split them apart and learn what they mean.

## What it is

A word-building worksheet on prefixes: the small word parts added to the
front of a base word to change its meaning (UN + HAPPY = UNHAPPY, RE +
READ = REREAD, PRE + VIEW = PREVIEW). The same prefixes are practised
four ways: add a prefix and write the new word, choose the one prefix
that makes a real word, split a word into its prefix and base word, or
circle what the prefix means. A box at the top lists the prefixes in play
with their meanings.

## How to play

- **Write:** add the prefix to the front of the base word and write the
  new word. The base word does not change: DIS + APPEAR = DISAPPEAR,
  MIS + SPELL = MISSPELL.
- **Choose:** circle the one prefix that makes a real word with the base
  word (___FAIR: UN or RE? — UNFAIR).
- **Split:** write the prefix and the base word the long word is made
  from (UNHAPPY = UN + HAPPY).
- **Meaning:** circle what the prefix in each word means (the UN in
  UNHAPPY means NOT).

Common meanings: UN-, DIS-, NON-, IN-, IM-, IL-, IR- mean NOT; RE- means
AGAIN; PRE- means BEFORE; MIS- means WRONGLY; OVER- means TOO MUCH;
UNDER- means TOO LITTLE; SUB- means UNDER; INTER- means BETWEEN; SUPER-
means ABOVE; ANTI- means AGAINST; AUTO- means SELF; SEMI- means HALF;
MID- means MIDDLE.

## Purpose

Knowing a handful of prefixes unlocks thousands of words: a reader who
knows UN- and RE- can work out UNTIE and RETELL without having met them.
Using a known prefix to work out the meaning of a new word is a core
vocabulary skill in the primary grades, and the "not" prefixes IN-, IM-,
IL- and IR- are a classic spelling point (IMPOSSIBLE, ILLEGAL,
IRREGULAR).

## History

Most English prefixes come from Old English (UN-, OVER-, UNDER-, MID-),
Latin (RE-, PRE-, DIS-, SUB-, INTER-, IN-) or Greek (ANTI-, AUTO-). Prefix
lists with their meanings have been part of spelling and vocabulary
teaching for well over a century and appear in today's curriculum
standards for the early grades.

## This implementation

- **Spec knobs:** `difficulty`, `task` (`write`, `choose`, `split`,
  `meaning`), `rows` (4–20; 0 = the level's default), `meanings_box`,
  `name_line`, `width`, `height`, `margin`.
- **Levels:** Kids — UN- and RE-, 8 rows. Easy — adds DIS- and PRE-, 10
  rows. Medium — adds MIS-, NON-, OVER- and UNDER-, 12 rows. Hard — adds
  SUB-, IN-, IM-, IL-, IR- and INTER-, 14 rows, and less common words.
  Expert — adds SUPER-, ANTI-, AUTO-, SEMI- and MID-. The level is the set
  of prefixes in play (`rating_basis: prefixes_in_play`); every band is
  served as asked.
- **Generation:** derivations come only from a curated list of true
  prefix + base pairs written for Lakolam, so accidental spellings (REALLY
  is not RE + ALLY, UNION is not UN + ION) and words whose meaning has
  drifted from their parts (DISCOVER, UNDERSTAND, RECOVER) never appear.
  Each pair is kept only if the base is a common word, both words are
  family-friendly, and the new word is in the dictionary (a common word up
  to Medium, a less common one allowed at Hard and Expert). Rows are drawn
  round-robin over the prefixes, no base word twice.
- **Solving / checks:** a choose row is kept only if exactly one offered
  prefix makes a word of the large dictionary (about 114,000 words) with
  the base — ___LIKE never offers both UN and DIS. A split row is kept
  only if exactly one prefix of the full list leaves a dictionary word. A
  meaning row offers three meanings from different meaning groups, so
  only one fits.
- **Guarantees:** deterministic per seed; every answer is a curated, true
  derivation and a dictionary word (`answers_checked`); choose, split and
  meaning rows each have exactly one answer, re-checked before the page
  ships and again by brute force in the tests.

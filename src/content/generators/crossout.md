---
title: "Cross-Out"
blurb: "Cross-out — strike every word a rule describes; the words left spell a saying"
category: word
version: "1.1.0"
---
Strike out every word the rules describe — the words left over spell a saying.

## What it is

A grid of 20 to 36 words with a short numbered list of rules above it:
"cross out words that start with B", "…that have exactly five letters",
"…that are animals", "…that have the same letter twice in a row". Most of
the words in the grid break at least one rule. The handful that break none,
read in order, spell a well-known proverb or a friendly saying.

## How to play

Take the rules one at a time. For each rule, go through the whole grid and
draw a line through every word it describes. A word only needs to match one
rule to be crossed out, and some words match more than one.

When every rule is done, read the words that are left, left to right along
each row and from the top row down. They make a saying — write it on the
lines at the bottom of the page.

Read each rule carefully: "start with" means the first letter, "end with"
the last letter, and "contain" means anywhere in the word. Vowels are A, E,
I, O and U. If the leftover words do not make sense, a word was missed or
crossed out by mistake — check it against every rule again.

## Purpose

Careful reading and following instructions, letter and spelling awareness
(first and last letters, word length, double letters, vowels, word endings)
and sorting words into categories — rewarded with a message at the end,
which tells solvers themselves whether they got it right.

## History

Cross-out puzzles are a long-standing staple of puzzle magazines and
children's activity books: a box of words, a list of instructions, and a
hidden quotation or answer to a riddle among the words that survive. The
same idea appears in classroom "follow the directions" worksheets, where
pupils cross out words or letters by rule to reveal a message.

## This implementation

- **Spec knobs:** `difficulty`; `words` (20–36, 0 = the level's default);
  `rules` (1–8, 0 = the level's default); `columns` (3–6, 0 = 4); `width`,
  `height`, `margin`; `name_line`. Out-of-range numbers are clamped.
- **Levels:** Kids — 20 words, 2 rules (first letter, length, category).
  Easy — 24 words, 3 rules (adds last letter and "contains"). Medium — 28
  words, 4 rules (adds double letters). Hard — 32 words, 5 rules (adds
  vowel counts and word endings such as -ING). Expert — 36 words, 6 rules
  of every kind. Each level from Easy to Hard always prints at least one
  rule of its own new kind.
- **Generation:** a saying is drawn in seeded order from a curated list of
  about sixty proverbs and encouraging sayings. Every candidate rule is
  checked against the saying — it may not touch any of its words — and the
  rules are chosen one kind at a time, avoiding near-repeats (START WITH C
  beside CONTAIN THE LETTER C, two lengths, an ending beside its own last
  letter). Filler words are drawn first one per rule (so every rule crosses
  something out), then from any rule, and scattered among the message words,
  which keep their order. Fillers come from the family-friendly basic tier
  of the dictionary (no plurals) or, for a category rule, from short curated
  lists of unmistakable animals, colours, fruits and body parts.
- **Solving:** nothing to search: every rule is a predicate evaluated on
  every word. The key strikes each crossed word and prints the numbers of
  the rules that hit it, and writes the saying.
- **Guarantees:** `answers_checked` — the words no rule hits are exactly the
  saying's words in order; every crossed word is hit by at least one rule;
  every rule hits at least one word; rules and filler words are distinct and
  fillers never repeat a message word. A category rule is used only when no
  message word belongs to the category even on a looser reading (checked
  against the curated list, words like BIRD or GOLD, and the lexicon's wider
  themed lists), so a reader never strikes a message word by mistake. The
  difficulty is rated from the page itself (`rating_basis`
  `rule_count_and_hardest_rule_kind`): the number of rules sets the band,
  raised to the band of the hardest kind of rule printed. Overriding
  `rules` can move the rating away from the asked level; meta then records
  `requested_difficulty`.
- **Version 1.1:** the shared family-friendly word filter now refuses more words (an audit of the everyday dictionary tiers: crude, sexual, drug, drink and violent words and inflections of words already refused), so some pages draw different words.

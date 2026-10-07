---
title: "Adding Suffixes"
blurb: "Adding suffixes — double the last letter, drop the e, change y to i, and plurals"
category: word
version: "1.0.0"
---
Hop, hopping; bake, baked; cry, cried — add the ending and spell the new word by the rules.

## What it is

A spelling-rules worksheet. Each row gives a base word and an ending
(HOP + ING, BAKE + ED, BOX + S/ES), and the new word has to be spelled
by one of the rules children learn for adding suffixes: just add the
ending, double the last letter, drop the silent e, change y to i, add
-es, or change f to v. A box at the top lists the rules in play with an
example of each. The same rows can be asked three ways: write the new
word (and the letter of the rule you used), circle the right spelling
among look-alikes made by the wrong rule, or work backwards to the base
word.

## How to play

Look at the base word and the ending.

- **Ending starts with a vowel** (-ING, -ED, -ER, -EST, -Y):
  - a short word ending vowel–consonant doubles the last letter:
    HOP → HOPPING, BIG → BIGGER;
  - a word ending in a silent E drops it: BAKE → BAKING, SHINE → SHINY;
  - a word ending consonant + Y changes the Y to I: CRY → CRIED —
    except before -ING, which keeps the Y: CRYING;
  - otherwise, just add it: JUMP → JUMPING, PLAY → PLAYED.
- **Ending starts with a consonant** (-FUL, -LESS, -LY, -NESS): just add
  it — nothing doubles and the E stays: HOPEFUL, SADNESS, SAFELY.
- **S or ES**: add -ES after S, X, Z, CH and SH (BOXES, WISHES); change
  consonant + Y to -IES (SKIES); some words ending in F or FE change to
  -VES (LEAF → LEAVES, KNIFE → KNIVES); otherwise add -S.

Write the new word on the line. If there is a box, write the letter of
the rule you used. On a "circle" page, circle the one correct spelling;
on a "base word" page, write the word the long word was made from.

## Purpose

The suffix rules are a core spelling skill in the early grades (adding
-ed, -ing, -er and -est to base words, and the plural rules). Practising
them on real, everyday words, and seeing the wrong-rule spellings side by
side, builds the habit of asking "which rule?" before writing.

## History

The doubling, drop-the-e and y-to-i rules were codified in nineteenth
-century spelling books and are still taught in much the same words
today. "Base word + suffix" tables and "circle the correct spelling"
drills are long-standing staples of phonics and spelling programmes in
the US and the UK.

## This implementation

- **Spec knobs:** `difficulty`, `task` (`write`, `choose`, `base`),
  `focus` (`mixed`, `just_add`, `double`, `drop_e`, `y_to_i`,
  `plurals`), `rows` (4–20; 0 = the level's default), `rules_box`,
  `rule_column`, `name_line`, `width`, `height`, `margin`.
- **Levels:** Kids — -s, -es, -ing, -ed simply added (just add, add -es).
  Easy — adds doubling with -ing and -ed. Medium — adds drop the e and the
  -er and -y endings. Hard — adds y to i, -es and -est. Expert — adds f to
  v plurals and the consonant endings -ful, -less, -ly, -ness. The level
  is the set of rules in play (`rating_basis: rules_in_play`), so every
  band is reached as asked.
- **Generation:** base words are one-syllable words (the doubling rule
  for longer words depends on stress) from grade spelling lists, plus
  curated lists written for this generator: one-syllable adjectives (the
  only bases given -est), nouns that take -y, bases for the consonant
  endings, action verbs, and the f-to-v plurals. The rules are applied by
  code; words ending in O, in a vowel + E, or in a single Z are left out
  because their spelling is not decided by the rules. Rows are drawn
  round-robin over the rules so a mixed page practises each one. A focus
  with no rows for the chosen task falls back to the level's mix
  (`requested_focus` in meta).
- **Solving / checks:** every answer must be a family-friendly word of the
  dictionary — an everyday word, or a common word when its base is on a
  curated list for that ending (the curation guards the meaning, the
  dictionary the spelling). Y to I is refused when keeping the Y is also a
  word (DRIER / DRYER). A short list of false derivations (LADDER is not
  LAD + ER) is never printed. Circle-task wrong spellings come from the
  other rules and from spelling by sound (HOPEING, JUMPT) and are kept
  only if they are not words of the large dictionary. A base-word row is
  kept only if exactly one large-dictionary word gives the long word under
  the rules.
- **Guarantees:** deterministic per seed; each answer is the rules'
  spelling and a dictionary word; each circle row has exactly one real
  word; each base-word row has exactly one base; no base or answer
  repeats on a page. Meta carries `answers_checked`, the rules used and
  the answers.

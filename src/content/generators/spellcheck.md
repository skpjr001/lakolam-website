---
title: "Spell Check"
blurb: "Spell check — circle the one correct spelling in each row of rule-made misspellings"
category: word
version: "1.0.0"
---
Three or four spellings in every row, and only one is right. Circle it.

## What it is

A spelling worksheet of numbered rows. Each row shows one word spelled
three or four different ways: the correct spelling, and look-alikes that
make the mistakes people really make — a doubled or a missing double
letter (TABBLE, LETER), I and E the wrong way round (RECIEVE), a silent
letter left out (NIFE, LAM), a sound spelled the way it sounds (FONE,
SIRCLE, NOTICEABEL), or one vowel changed (SEPERATE). The pages run from
first words for young readers to the famous adult traps.

## How to play

Read every spelling in the row before you choose. Say the word in your
head, then look closely at each version: are the double letters in the
right place? Is it I before E? Is a silent letter missing? Only one
spelling in each row is a real word spelled correctly. Draw a circle
around it, then move on to the next row.

If two spellings both look right, cover the others with your finger and
look at each one on its own — the correct spelling usually "looks right"
once you see it by itself.

## Purpose

Spelling practice by recognition rather than recall: children and English
learners meet the correct form side by side with the typical mistakes, and
learn to spot the patterns (double consonants, IE and EI, silent letters,
-LE and -EL, -ANCE and -ENCE). Adults get a quick, satisfying test on the
words everyone gets wrong.

## History

"Which word is spelled correctly?" is one of the oldest school drill
formats, used in spelling workbooks and standardised tests throughout the
twentieth century, and it remains a staple of ESL and literacy
worksheets. The adult version — a list of "commonly misspelled words" such
as ACCOMMODATE, NECESSARY and SEPARATE — is a favourite of newspaper
quizzes and style guides.

## This implementation

- **Spec knobs:** `difficulty`, `rows` (0 = the level's default),
  `choices` (3 or 4; 0 = the level's default), `width`, `height`,
  `margin`, `name_line`.
- **Levels:** Kids — kindergarten and grade 1 spelling-list words, 3–5
  letters, eight rows of three. Easy — grades 1–2, ten rows of three.
  Medium — grades 2–3, twelve rows of four. Hard — grades 3–4 and up,
  twelve rows of four. Expert — a curated list of famously misspelled
  adult words, twelve rows of four. The level is the word list, so every
  band is reached as asked.
- **Generation:** words are drawn in seeded order from the level's list.
  Six mistake rules (doubled, undoubled, IE/EI, silent letter, sound-alike,
  vowel change) each propose misspellings; the rules are restricted to
  places a real speller would slip (a consonant is doubled only after a
  short vowel, a silent E only in a consonant-vowel-consonant-E ending, a
  vowel changed only when it stands alone). Distractors are taken one rule
  at a time, so a row mixes kinds of mistake, with vowel changes last.
- **Solving / proof:** every printed wrong spelling is looked up in the
  large dictionary (`Tier::Large`, SCOWL ≤ 70, ≈ 114k words) and kept only
  if it is **not** a word there, so a "misspelling" can never be another
  real word (WRITE → RITE is refused). The correct spelling is on the
  level's list and in the dictionary. Every option passes the
  family-friendly filter.
- **Guarantees:** deterministic per seed; in every row exactly one option
  is a word of the large dictionary, and it is the answer; options in a row
  are distinct; no word repeats on a page. Meta carries `answers_checked`,
  the difficulty and its basis (`word_list_grade`), the answers and a count
  of the mistake rules used.

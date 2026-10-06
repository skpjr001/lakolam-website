---
title: "Missing Letter"
blurb: "Missing letter — one letter completes every word in a row; the letters spell a hidden word"
category: word
version: "1.0.0"
---
Every word in a row is missing the same letter. Find it, and the letters
read down spell a hidden word.

## What it is

A worksheet of numbered rows. Each row shows three or four words, and each
word has one empty box where a letter has been taken out — at the start
(`_AT`), in the middle (`B_T`) or at the end (`PO_`). The same letter is
missing from every word in the row. Write it in the row's box on the right;
when every row is done, the boxes read from top to bottom spell a hidden
word, and the bottom of the page says what kind of word to expect.

## How to play

Take one word at a time and try letters in its gap: `_AT` could be BAT, CAT,
HAT and many more. Then try the same letters in the next word — the right
letter is the one that makes a real word in *every* gap of the row. Only one
letter of the alphabet works for the whole row. Write it in the box, and
when all the boxes are full, read them downwards for the hidden word.

Stuck on a row? Start with the word that has the fewest possible letters,
or skip ahead: the hidden word's theme and the letters you already have may
tell you what the missing one should be.

## Purpose

A spelling and vocabulary puzzle that works at two levels: young readers
practise sounding out short words and checking that a letter makes a real
word, while adults get longer words where no single gap gives the letter
away. The hidden word turns a list of small wins into a goal.

## History

"Missing letter" and "fill the gap" rows are a staple of children's puzzle
books and phonics worksheets, and an adult variant ("the same letter
completes all of these") runs in newspaper and magazine puzzle pages and
brain-training books. Adding a vertical hidden word is the acrostic idea —
a word read down a column of answers — familiar since the Victorian
double acrostic.

## This implementation

- **Spec knobs:** `difficulty`, `hidden` (your own hidden word, 3–12
  letters), `theme` (the word-list theme the hidden word is drawn from;
  empty mixes family-friendly themes), `theme_hint` (print the theme),
  `width`, `height`, `margin`, `name_line`.
- **Levels:** Kids — school spelling-list words of 3–4 letters (grades K–2),
  four to a row. Easy — spelling-list words of 3–5 letters (grades K–3).
  Medium — common words of 4–6 letters, four to a row. Hard — common words of
  5–7 letters, three to a row, the gap never first. Expert — common words of
  5–8 letters, three to a row, the gap inside the word, and no word whose gap
  can be filled by only one letter on its own.
- **Generation:** for each letter of the hidden word, candidate words holding
  that letter exactly once (so it is never given away elsewhere in the word)
  are gapped at it; their completing letters are found by trying all 26, and
  words are picked greedily so the row's common letters shrink to the one
  wanted. No word repeats on a page. If a letter cannot be given a row at the
  level, another hidden word is tried.
- **Solving / proof:** every gap is tried with all 26 letters against the
  large dictionary (`Tier::Large`, ≈ 114k words, SCOWL ≤ 70), so a word a keen
  solver knows can never make a second letter fit; shown words pass a
  family-friendly filter. Rated from the page: all spelling-list words of up
  to four letters is Kids, spelling-list words Easy, common words four to a
  row Medium; three to a row is Hard when some word settles its letter alone
  and Expert when none does.
- **Guarantees:** deterministic per seed; in every row exactly one letter of
  A–Z completes every word, it is the row's missing letter, and the letters
  read down spell the hidden word. Meta carries `unique`, the difficulty and
  its basis, the hidden word and theme, and the count of words that settle
  their letter alone.

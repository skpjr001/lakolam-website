---
title: "Alpha-Fit"
blurb: "Alpha-fit — a criss-cross with 26 empty squares; each letter A-Z fits exactly one"
category: word
version: "1.1.0"
---
A crossword with no clues and 26 empty squares: every letter from A to Z
goes in exactly one of them.

## What it is

A criss-cross grid of interlocking words, printed almost complete. Exactly
26 squares are empty, and the 26 letters of the alphabet fill them — each
letter used once — so that every word across and down is a real word.
Below the grid, the alphabet is printed so you can cross letters off as you
use them. There is only one way to fit the whole alphabet in.

## How to play

Look for words where only one letter can fill the gap: if a word reads
W_LTZ, the missing letter must be A. Write it in and cross it off the
alphabet — it cannot be used again anywhere else.

Each letter you use makes the other gaps easier, because that letter is
gone. Where a gap could take several letters, check the word that crosses
it, and remember that rare letters such as J, Q, X and Z must go somewhere:
if only one empty square can take the Q, that is where it goes. On the
hardest grids you may need to try a letter in a square and follow where it
leads; if it forces a word that cannot be completed, that letter belongs
elsewhere.

The puzzle is finished when all 26 letters are used and every word reads
correctly.

## Purpose

A vocabulary puzzle that needs no clues and no general knowledge, only
words and logic. The "each letter once" rule turns a page of easy gaps into
a chain of deductions, and hunting for homes for the rare letters is half
the fun.

## History

Alphabet-placement crosswords have run in British and Australian puzzle
magazines for decades under names such as Alpha-Fit, The Full Set and
A to Z, alongside other clue-free grid puzzles like the codeword and the
fill-in. This is a criss-cross version of the idea under a generic name.

## This implementation

- **Spec knobs:** `difficulty`, `rows` and `cols` (the area the
  criss-cross grows in, each clamped to 9–17; default 13×13), `cell`,
  `line`.
- **Levels:** Easy — every square follows from words that only one letter
  completes, with used letters crossed off. Medium — some squares also need
  "this letter fits in only one square". Hard — some square needs a
  one-step trial. Kids is served as Easy (a 26-letter grid is not a first
  puzzle), and Expert as Hard: with all 26 letters used once, one-step
  trials settled every grid tried (none of 96 grids, searched toward
  needing more, did). Both are labelled (`requested_difficulty`).
- **Generation:** a criss-cross is grown from family-friendly common words
  of 3–9 letters (no plain plurals): a long word across the middle, then
  words that bring in the rarest missing letter, placed at a crossing with
  nothing touching sideways, until all 26 letters are in the grid and it
  holds at least 16 words. Small or narrow areas rarely hold all 26
  letters (9×9 never did; 11×11 and 13×9 rarely). Since v1.1, when none of
  the first 12 attempts gives a grid, up to 48 more run from fresh seeds
  with more patient placing, the smaller side growing by two squares (up
  to 17) after every 8 misses; a grid from this phase must also pass the
  independent uniqueness check, and a grid larger than asked records
  `grid` and `requested_grid` in its metadata. Every grid the first
  attempts already produced is unchanged. One occurrence of each letter is blanked; which
  one is chosen by local search, changing one letter's square at a time
  toward fewer squares left unsettled by the band's own solving rung (and
  away from grids an easier rung already settles).
- **Solving / proof:** each word's candidates are the words of the large
  dictionary (`Tier::Large`, SCOWL ≤ 70, ≈ 114k words) that agree with its
  printed letters; an all-different search over the 26 squares, with word
  consistency, used-up letters and single-place letters as propagation,
  counts completions and stops at two (a search past its node budget is
  ambiguous, never unique). Tests re-check with a plain search that fills
  squares one at a time and looks each completed word up by name. Rated by
  the easiest sound rung that settles every square (`slot_fits`,
  `letter_placement`, `trial`).
- **Guarantees:** deterministic per seed; every run of letters in the grid
  is a placed word; exactly one way of putting A–Z, once each, into the 26
  empty squares makes every word a large-dictionary word (`unique`); every
  printed word passes the family-friendly filter.

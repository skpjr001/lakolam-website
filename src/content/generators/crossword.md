---
title: "Crossword"
blurb: "Symmetric crossword grids filled from a clued wordlist"
category: word
version: "1.1.0"
---
Fill the symmetric grid from numbered clues, across and down.

## What it is

A square grid of white and black cells, conventionally with 180° rotational
symmetry. Numbered white cells start the entries; each across and down entry
has a clue. Every white cell belongs to both an across and a down word
(fully checked grids), so each letter is confirmed twice.

## How to play

Answer what you know, pencil what you suspect, and let crossings settle
disagreements. Short entries recur across published puzzles (crosswordese
rewards experience); long entries yield to patterns once a few crossings are
in. In a well-made grid every letter is checked by two words, so a wrong
guess collides quickly.

**Anagram clues.** Some pages clue each answer with its own letters,
jumbled: TOMATO might be clued OTTAMO (6). Rearrange the letters into a
word that fits the squares. When the same letters make more than one word
(TEA, EAT, ATE), the crossings tell you which; where they could not, a
short definition follows the letters.

## Purpose

The prestige word puzzle, and the hardest of the three word-grid crates: it
needs a *clued, scored* wordlist, which is a data-acquisition problem as
much as an algorithmic one. The crate exists because the grid-filling
machinery is shared with wordfit; the wordlist quality is the ongoing
investment.

## History

Invented by **Arthur Wynne** — a Liverpudlian journalist — for the *New York
World*, published 21 December 1913 as a diamond-shaped "Word-Cross". The
1920s made it a craze; The Times of London capitulated in 1930; the cryptic
tradition forked in Britain while American grids standardised on full
checking and rotational symmetry.

## This implementation

- **Spec knobs:** `size`, `style`, `words`, `min_word`, `cell`, `line`,
  `clue_style` (`definition`, the default, or `anagram`; added in wave 22).
- **Anagram clues:** the grid is the definition page's grid (same seed,
  same fill); each clue is the answer's letters shuffled on their own seed
  stream until the result is not the answer, not a word of the large
  dictionary (SCOWL, about 114,000 words) and holds no blocked word inside
  it. The fill is then proved: every filling in which each slot holds a
  large-dictionary word of the clue's letters (or the answer itself) and
  crossings agree is counted, capped at two. If more than one fits, the
  slots whose letters make more than one word print their definition after
  the letters (`ETA – Hot drink`), which leaves exactly one; a word with no
  printable shuffle (EEE) keeps its definition alone. Tests re-count with
  an independent slot-order search and readings found by scanning the
  dictionary. Meta: `clue_style`, `clues`, `anagram_hints` (clues that
  carry a definition), `uniqueness_proof`. `language` is not offered: the
  clued word list is English only, and the lexicon's other-language lists
  (about 500 words each, unclued) are too small to fill a lattice grid.
- **Generation:** symmetric block placement under connectivity and
  minimum-word-length constraints, then backtracking fill with
  most-constrained-slot-first over the scored wordlist; clues come with the
  list entries.
- **When the asked-for grid cannot fill** (v1.1): the dense `blocked`
  style outruns the embedded vocabulary from about 13x13, and a long
  shortest answer (`min_word` 8) starves either style. Only after every
  attempt at the asked-for grid fails, the generator relaxes as little as
  it can from fresh seeds — a blocked grid steps down in size (to the
  largest that fills, usually 11x11), then the shortest answer steps down —
  and records `requested_size` / `requested_min_word` in the metadata.
  Every grid that filled before is unchanged.
- **Guarantees:** the grid is connected, symmetric, fully filled from the
  list, and every entry has a clue; the fill is deterministic per seed.
- **Difficulty:** wordlist scoring tier and grid openness (block count,
  average entry length), banded.

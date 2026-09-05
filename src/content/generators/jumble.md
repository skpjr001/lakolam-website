---
title: "Word Jumble"
blurb: "Word jumble — anagram-unique scrambles feeding a circled final answer"
category: word
version: "1.0.0"
---
Scrambled words on the left, letter boxes on the right; the circled boxes
donate their letters to a final answer to unscramble.

## What it is

The newspaper scramble format popularised by *Jumble* (Martin Naydel, 1954,
syndicated ever since): solve each anagram, then unscramble the circled
letters for the payoff answer.

## The implementation's guarantees

- **Every puzzle word is anagram-unique within the vocabulary** — the classic
  failure (printing a scramble whose solution could be TEAM or MATE) is
  checked, and words with anagram mates in a custom list are excluded rather
  than trusted.
- **Every scramble differs from its solution** — a "scramble" that is not
  scrambled is refused.
- **The circled letters are exactly the answer's letters** (as a multiset —
  the blanks unscramble anyway, so donation order is free; the first version
  demanded answer-order donation and starved itself of valid layouts).
- Answers are retried until one distributes over the page's words: QUILT is
  a fine word and an impossible answer on the built-in list, because no other
  word can donate a Q.
- Rating basis: `longest_word`. The answer key fills every box.

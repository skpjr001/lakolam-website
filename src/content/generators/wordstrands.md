---
title: "Word Strands"
blurb: "Word Strands — a letter grid that splits completely into snaking themed words and one grid-spanning theme word"
category: word
version: "1.0.0"
---
A grid of letters that splits, square by square, into a handful of hidden words on one theme.

## What it is

A 6-by-8 grid of letters holds several words on a theme plus one theme word that names it. Every
word snakes through touching squares, and together they use every letter exactly once. The theme
word stretches from one side of the grid to the opposite side. A short hint points at the theme.

## How to play

1. Read the theme hint. It is a nudge, not the answer.
2. Find a word by moving from letter to letter. Each step can go to any of the eight squares around
   the last one: sideways, up, down or diagonally. A word may turn as often as it likes, but it
   cannot use the same square twice.
3. Every word has at least four letters. Mark each word you find; its letters are used up.
4. One word, the theme word, touches two opposite sides of the grid (left and right, or top and
   bottom). It sums up what the other words have in common.
5. When you are done, every letter belongs to exactly one word, and the number of words matches the
   page. On easier pages the length of every word is given (and on the easiest the first letter of
   each word is circled). On the hardest page only the hint is given.

Tip: corners and edges have the fewest neighbours, so start there. If a letter can only belong to
one word, that word is certain.

## Purpose

Word search meets jigsaw: vocabulary, spelling and pattern spotting, with a theme to reason from
and a full-grid check at the end. Every word you find shrinks the space left for the rest.

## History

Letter grids read along snaking paths go back to Boggle-style games and the word-search hidden-path
variants of puzzle magazines. Splitting the whole grid into themed words, with a spanning theme
word, became a popular daily word game in the 2020s. This version is our own, with its own themes
and word lists.

## This implementation

**Spec knobs:** `difficulty` (what the page states: Kids — every word's length, first letters
circled; Easy — every word's length; Medium — the number of words and the theme word's length;
Hard — the number of words; Expert — the hint only, the number of words is not given), `theme`
(30 curated themes, or `auto` to let the seed pick), `cell` (square size, 24–90 pt), `line`.

**Generation:** a theme word (6–10 letters, from the theme's curated list of spanning words) is
laid as a random snaking path that touches two opposite sides; the rest of the grid is split into
paths of 4–8 squares (each started from the most cornered free square, every free region kept at
least four squares), and themed words of matching lengths — from the `lako-lexicon` list, in the
large dictionary and family-friendly — are written along them. No other path touches two opposite
sides. A grid that is not unique is thrown away and the next tried (about one grid in three at
Kids–Hard; about one in thirty at Expert).

**Solving:** every path through the grid that spells a word of the large dictionary (`Tier::Large`,
about 114,000 words, 4–15 letters) is listed through a trie. An exact-cover search (the lowest
uncovered square is covered by a word whose lowest square it is) counts, capped at two, the splits
of the whole grid into those words that obey what the page states, with at least one word touching
two opposite sides. A count that runs out of its node budget counts as ambiguous.

**Guarantees:** `unique` — exactly one split fits the stated rules, even for a solver who knows
obscure words; the theme is never needed to rule out a second split. `rating_basis: clues_shown` —
the band is what the page states. Expert is rare; if no Expert grid turns up in 400 tries the page
is served as Hard with `requested_difficulty: "expert"`. Meta: `theme`, `hint`, `theme_word`,
`words`, `word_count`, `lengths_shown`, `dictionary_paths`. Tests re-count with an independent
reader (a prefix set, not the trie) and an independent cover search (fewest-options-first). The
app's play API (`play`) checks traced paths and gives a hint that names the square only one word
can still cover (`only_fit`), else reveals a word (`reveal`).

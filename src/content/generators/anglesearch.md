---
title: "Angle Search"
blurb: "Angle search - a word search where every word bends once, each hidden exactly once"
category: word
version: "1.2.0"
---
A word search with a twist: every hidden word runs straight, turns a corner
once, and runs straight again.

## What it is

A grid of letters with a themed word list underneath. Each listed word is
hidden along a bent line: it starts in a straight line, turns at one of its
letters, and finishes in a straight line in the new direction. On most
settings the turn is a right angle; on the hardest setting a word may also
turn by half a right angle. Every word is hidden exactly once.

## How to play

Pick a word from the list and look for its first letter. From there, follow
the word's letters in a straight line; at some letter the word turns a corner
and carries on in a new straight direction. Each word turns exactly once, so
when the letters stop lining up, try turning at the last letter that matched.
It often helps to start from a rare letter in the middle of the word and look
both ways for the bend. Mark each word as you find it and cross it off the
list.

The settings grow harder step by step:

- **Kids:** words read left to right or top to bottom, then turn down or
  right.
- **Easy:** the turn can go either way, so the end of a word may read upwards
  or right to left.
- **Medium:** words may also start on a diagonal.
- **Hard:** words may start in any direction, including backwards.
- **Expert:** a word may turn by half a right angle as well as a full one.

## Purpose

A fresh take on the most familiar puzzle of all. A plain word search is
solved by scanning straight lines; a bend breaks that habit and makes the
solver hold the word in mind across a corner, so an easy genre gains real
challenge without new rules to learn. Its difficulty ladder runs from a
first-reader page to one that rewards careful attention.

## History

Bent-word searches grew up in puzzle magazines as a variant of the classic
word search (invented by Norman E. Gibat in 1968), under titles such as
angle search and bent word search. The single-bend rule keeps the
search manageable: the answer is still two straight lines, not a free path.

## This implementation

- **Spec knobs:** `difficulty`, `theme` or your own `words` (five letters or
  more), `language`, `accents`, `rows`, `cols` and `count` (0 = from the
  difficulty), `word_list`, `cell`, `line`. `theme` is one of the six
  built-in lists (space, animals, ocean, fruit, weather, garden, unchanged)
  or any list of the shared lexicon (`christmas`, `the_80s`, `dinosaurs`,
  `bible_books`, ... sixty-odd English themes). `language` (`en` default;
  `es`, `fr`, `de`, `it`, `pt`, `nl`) picks that language's list (ten themes
  each, including animals) and fills the grid with its letter frequencies.
  `accents`: `fold` (default for theme lists) or `keep` (accented capitals
  in the grid); unset leaves your own words cleaned as before (A-Z only).
  A theme with no list in the chosen language (the default `space` among
  them) uses the nearest of those ten instead — `animals` for creature
  themes, `food`, `school`, `travel`, `home`, otherwise `nature` — and the
  metadata names it (`theme`, `requested_theme`); before v1.2 that was an
  error, so a page whose only change from the defaults was the language
  would not generate.
- **Generation:** the difficulty fixes a set of bent shapes (first-leg
  directions and turn angles) and a grid: Kids 9x9 with 6 words, Easy 11x11
  with 8, Medium 12x12 with 10, Hard 13x13 with 12, Expert 14x14 with 14.
  Words (no word contained in another, forwards or backwards) are placed
  longest first at the spot among all legal bent paths that crosses the most
  existing letters (at most one shared letter); a third of them are drawn
  from the shapes that are new at that level, so its feature is really on the
  page. Kids through Medium keep both legs at least three letters long. Empty
  cells are filled with letters drawn from the words themselves, so answers
  do not stand out.
- **Solving:** a walker counts every occurrence of each word over *all*
  straight and one-bend paths in the grid — any start, any of eight
  directions, 45 or 90 degree turns either way, read forwards or backwards —
  regardless of which shapes the level itself uses. Filler letters on any extra copy are re-rolled
  until each word occurs exactly once; a copy made only of word letters
  restarts the attempt.
- **Guarantees:** deterministic per seed; every listed word occurs exactly
  once as a straight-or-one-bend path, so the answer key (bent paths drawn as
  rounded highlights) is the only reading. Tests re-check this with an
  independent method that spells out every geometric path of the word's
  length. Difficulty is rated by the shape set, grid size and word count
  (`rating_basis` in the metadata), and the tests confirm Hard really uses
  backward starts and Expert really uses 45 degree bends.

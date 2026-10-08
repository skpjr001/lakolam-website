---
title: "Picture Crossword"
blurb: "Picture crossword — numbered pictures are the clues; write each name in the grid, the fill proven unique over every name a child might use"
category: word
version: "1.0.0"
---
A crossword where the clues are pictures: name each one and write it in the grid.

## What it is

A small criss-cross grid of word boxes for early readers. Each word starts
at a number. Below the grid, numbered pictures sit under ACROSS and DOWN:
the picture is the clue, and its name is the answer. An optional word bank
at the bottom lists every answer, so children who cannot yet spell a word
can find it and copy it letter by letter. Easy pages have five or six short
words; harder ones have up to a dozen words of up to nine letters.

## How to play

1. Look at a picture under ACROSS or DOWN and say its name.
2. Find the same number in the grid.
3. Write the name in the boxes, one letter in each box. ACROSS words go
   from left to right; DOWN words go from top to bottom.
4. Where two words cross they share a letter. If a letter does not fit,
   check both words — maybe the picture has another name.
5. Stuck on spelling? Find the word in the word bank and tick it off when
   you have used it.

## Purpose

A picture crossword practises spelling whole words from sound and memory,
letter-by-letter copying, and left-to-right and top-to-bottom reading
direction. The crossing letters give built-in self-checking, and naming
pictures builds vocabulary. With the word bank it suits children of five or
six; without it, seven and up.

## History

The crossword was invented by Arthur Wynne for the *New York World* in 1913,
and puzzle books for children followed within a decade. The free-form
"criss-cross" or kriss-kross grid, with no black squares, became the
standard form for children's and teaching puzzles, and replacing the
written clues with pictures made the crossword usable before children can
read a clue. Picture crosswords are now a staple of phonics workbooks and
early-years activity books.

## This implementation

- **Spec knobs:** `difficulty` (Kids: about five words of 3–4 letters;
  Easy: six up to 5; Medium: eight up to 6; Hard: ten up to 8; Expert:
  twelve up to 9), `words` (3–14, 0 for the level's own), `word_bank`,
  `theme` (a seasonal picture pack, used first), `colour` (pictures in
  colour or line art), `name_line`, `width`, `height`. Clamps and unmet
  requests are reported (`requested_words`, `requested_width`,
  `requested_height`, `requested_difficulty`).
- **Generation:** answers are the one-word names (3–9 letters) of the
  shared `lako-icons` pictures, classic and seasonal, plain shapes left out.
  A shuffled candidate list (the theme's pictures first, the level's
  longest length leading) is laid out greedily: the longest word across,
  then repeatedly the word that crosses the grid at the most letters. Words
  meet only at crossings — no letter touches another word's side or end —
  within 13 rows by 15 columns. Up to 80 candidate lists are tried; the
  best layout with the requested word count and band is kept. Clue numbers
  run in reading order.
- **Solving:** each slot is fixed by its picture; crossings confirm it.
- **Guarantees:** `unique: true`. Every picture carries every name a child
  might give it (its label, its seasonal "also called" names and a curated
  list here: CUP or MUG, BOAT or SHIP, RABBIT, BUNNY or HARE; spaces dropped,
  so BEACHBALL counts). An exhaustive count of the fills where each slot
  takes one of its own picture's names, consistent at every crossing,
  capped at 2 with a node budget (a spent budget counts as ambiguous), must
  be exactly 1 — so if MUG would fit where CUP belongs, the crossings rule
  it out, or the layout is rejected. The check is re-run independently as a
  brute-force product over the names, and the finished grid's letter runs
  are recomputed and must be exactly the answers, all connected. Answers
  are family-friendly dictionary words (DONUT, the picture's American
  label, is the one spelling the dictionary lacks). Meta
  `bank_fill_unique` also reports whether the word bank alone, without the
  pictures, fills the grid one way only — a bonus, not a promise.
- **Difficulty:** rated from the page (`rating_basis`): the larger of a
  word-count band (≤5, 6, 7–8, 9–10, 11+) and a longest-word band (≤4, 5, 6,
  7–8, 9), one band harder without the word bank. Without the bank the page
  is built one band smaller, so every band but Kids is reachable; a Kids
  page without a word bank is served as Easy and reported.
- **Limits:** about a hundred pictures, so long words are few and Expert
  grids repeat favourites (BUTTERFLY, SNOWFLAKE, UMBRELLA). Pictures with
  two-word names (ICE CREAM, TEDDY BEAR) are not used.

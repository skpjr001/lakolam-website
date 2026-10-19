---
title: "Secret Word Party Cards"
blurb: "Secret Word Party Cards — fold-over cards for 3-10 players: everyone gets the same secret word except one odd one out"
category: design
version: "1.0.0"
---
Everyone gets the same secret word — except one player. Give clues, listen
hard and vote out the odd one out.

## What it is

Fold-over cards for a party game for 3 to 10 players. One set has a card for
each player. Every card in a set shows the same secret word, such as SHARK,
except exactly one: the odd one out. In the classic game that card says ODD
ONE OUT and its player has to bluff; in the tricky version it shows a
different word from the same theme, and its player does not even know they
are the odd one. Several sets fill a sheet, each from its own theme, with a
host sheet listing the words.

## How to play

Cut out the cards and fold each one on its dashed line, so the set number is
on one side and the word on the other. Take one set, shuffle it with the
backs up, and give everyone one card. Look at your own card secretly.

Going round the circle, each player says one word that is a clue to the
secret word — not too obvious, or the odd one out will guess it, but not so
vague that the others suspect you. After one or two rounds of clues, count
to three and everyone points at the player they think is the odd one out.

If most players point at the odd one out, that player has one guess at the
secret word: right, and they win anyway; wrong, and everyone else wins. If
the vote picks someone else, the odd one out wins. Then play the next set.

With the tricky cards, nobody knows who is odd — maybe not even you. Listen
for a clue that fits a different word from the same theme.

## Purpose

A talking game that works across ages: choosing a clue that is just
specific enough is a real vocabulary and theory-of-mind exercise, and the
voting keeps everyone listening. No board, no reading beyond one word, and
the themes are everyday, family-friendly words.

## History

Hidden-role party games, where one player lacks information the others
share, have long roots in parlour games; the secret-word form, with one
player bluffing about a word everyone else knows, became popular around the
2010s and is now played everywhere, from classrooms to family gatherings.

## This implementation

- **Spec knobs:** `players` (3-10, default 6 — cards per set), `sets` (1-17,
  default 4, each from a different theme), `odd` (`blank`: the odd card says
  ODD ONE OUT; `related`: another word from the same theme), `show_theme`
  (the theme on every card, a hint for the bluffer), `colour` (a different
  back tint per set), `page` (Letter or A4). Out-of-range `players` and
  `sets` are clamped and recorded as `requested_players` / `requested_sets`.
- **Words:** 17 curated themes of 12 words each (animals, food, fruit,
  places, jobs, sports, transport, at home, nature, music, clothes, school,
  storybook, space, under the sea, toys, outings) — picturable,
  family-friendly, at most 13 characters, no word in two themes. No
  dictionary words are drawn at random.
- **Generation:** themes are dealt without repeats; each set picks its
  secret word (and, in related mode, a second word of the theme for the odd
  card), and the odd card's place in the set is random. Cards are 2 × 3.1 in
  (2 × 1.55 in folded), twelve to a sheet under a rules strip; the word half
  is printed upside down so the folded card reads the right way up when
  turned over. The host sheet (answer key) lists each set's theme, word and
  odd card.
- **Guarantees:** `answers_checked` and `one_odd_card_per_set` in meta: every
  set has one card per player and exactly one odd card, which shows ODD ONE
  OUT or a different word of the same theme; every word is from the curated
  list and printable; no two sets share a theme. Checked before the page is
  drawn, and tests re-read the printed cards to confirm exactly one card per
  set differs.

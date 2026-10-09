---
title: "Categories"
blurb: "Categories — the Stop the Bus word game: an answer for every category starting with each letter, every box checked answerable"
category: word
version: "1.0.0"
---
Think of an animal starting with B, a country starting with M — one answer for every category and every letter.

## What it is

A party and classroom word game on one sheet. Categories run down the
side and letters across the top; in each box, write something from that
category that begins with that letter. A card layout gives each letter a
round of its own, like the commercial game Scattergories. There are no
single right answers — the fun is in thinking of one, and of one nobody
else thought of.

## How to play

For each category, write a word or name that fits the category and
starts with the letter at the top of the column (or on the card). Play
alone against a timer, or with friends: each player fills in a sheet,
then everyone reads out their answers. Score a point for each answer that
nobody else wrote. Every box can be filled — each one has several
possible answers — so keep thinking.

## Purpose

Categories trains quick recall and flexible vocabulary: the letter cuts
across meaning, so the player searches memory in two directions at once.
It builds general knowledge (countries, cities, animals) and is a classic
early-finisher, warm-up and family-game activity.

## History

The pencil-and-paper game is old and goes by many names — "Categories",
"Guggenheim", "Stop the Bus" in Britain, "Stadt, Land, Fluss" in
Germany, "Tutti Frutti" in Spanish-speaking countries and "Petit Bac" in
France. Milton Bradley published it as the boxed game Scattergories in
1988, with a lettered die and category cards.

## This implementation

- **Spec knobs:** `difficulty`; `layout` (`table`, `cards`);
  `categories` (3–16), `letters` (2–8) and `min_answers` (1–10), each 0
  for the level's value; `cell` (16–60 pt); `line` (0.2–4 pt). Values out
  of range are clamped; combinations the lists cannot meet are relaxed —
  fewer letters, then fewer categories, then a lower minimum — and every
  asked value that changed is reported (`requested_categories`,
  `requested_letters`, `requested_min_answers`).
- **Levels:** Kids — 5 everyday categories × 4 easy letters, at least 3
  answers per box; Easy — 6 everyday categories × 5 letters; Medium — 8
  categories from the full set × 5 letters; Hard — 10 categories × 6
  letters (any but Q, U, X, Y and Z), at least 2 answers per box; Expert — 12 categories × 6 letters from the whole alphabet, at
  least 2 answers per box. The level is the category pool, the letter pool
  and the minimum (`rating_basis`).
- **Generation:** curated answer lists written for Lakolam — 30
  categories from animals and fruits to countries, cities, names, things in
  a kitchen and words that describe a person, each of 40 to 165 answers,
  all family-friendly. Categories are drawn at random from the level's
  pool; the letters are then drawn from those that give every chosen
  category enough answers.
- **Checks:** every box on the page is counted against its list.
- **Guarantees:** deterministic per seed; every letter–category box has at
  least `min_answers` answers in the curated lists (`answers_checked`,
  `every_cell_answerable`), and the answer page lists up to three sample
  answers for each. Any other answer that fits counts too. The tests
  recount every box from the raw data file.

## Version history

- **1.1:** WATER PISTOL left the toys list — the family filter now blocks PISTOL, and every answer must pass it. Pages that could draw it from the toys list change.

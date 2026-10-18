---
title: "Triad"
blurb: "Triad — find every three cards that are all alike or all different in each feature"
category: puzzle
version: "1.0.0"
---
Find every set of three cards that are all alike or all different in each
feature.

## What it is

A table of 9, 12 or 15 picture cards. Each card has three or four features,
and each feature has three values:

- **count** — one, two or three symbols;
- **shape** — circle, triangle or square;
- **colour** — red, green or purple, each also marked by its letter (R, G or
  P) in the top-right corner, so a black-and-white print still tells them
  apart;
- **fill** — solid, striped or empty (on four-feature cards only; on
  three-feature cards every symbol is solid).

Three cards make a **triad** when, feature by feature, they are either all
the same or all different. The page says how many triads the deal holds, and
there are exactly that many.

## How to play

Find all the triads and write the three card numbers of each one in a row of
boxes. Check a candidate one feature at a time: count, shape, colour, fill.
If two cards agree on a feature and the third does not, it is not a triad.

- **Any two cards decide the third.** For each feature, if the two agree, the
  third must agree too; if they differ, the third must have the remaining
  value. Pick two cards, work out the card that completes them, and look for
  it on the table.
- **Work through the pairs in order** — card 1 with 2, 1 with 3, and so on —
  so you do not miss any.
- A card can belong to more than one triad, and two triads can share a card,
  but never two cards.
- Stop when you have found as many triads as the page asks for.

## Purpose

A visual reasoning puzzle that rewards systematic search over luck: every
answer can be checked at a glance, and the hint "any two cards decide the
third" turns a scan into a method. Three-feature deals make a gentle start
for young players.

## History

The all-alike-or-all-different card game was invented by the geneticist
Marsha Falco in 1974 and published in 1991; the "find every set in this
layout" puzzle has run daily in newspapers and online since. Mathematically
the cards are the points of a finite geometry, and triads are its lines.
This page uses its own cards and its own name.

## This implementation

- **Spec knobs:** `difficulty`; `features` (3-4), `cards` (9, 12, 15) and
  `triads` (the exact count), each empty for the band's choice, clamped and
  reported as `requested_features` / `requested_cards` / `requested_triads`;
  `card` (card width), `line`.
- **Bands** (`rating_basis: features_and_cards`): Kids 3 features, 9 cards;
  Easy 4 features, 9 cards (or 3 features, 12); Medium 4 features, 12 cards
  (or 3 features, 15); Hard 4 features, 15 cards. Expert is served as Hard
  with `requested_difficulty`: more cards stop fitting a printed table.
- **Triad counts:** four features — 9 cards 1-6 (default 3), 12 cards 1-8
  (default 4), 15 cards 1-10 (default 6). Three features come from only 27
  possible cards, so larger deals always hold many triads: 9 cards 1-6
  (default 3), 12 cards 4-8 (default 5), 15 cards 13-16 (default 14).
- **Generation:** a random deal of distinct cards is changed one card at a
  time, keeping a change unless it moves the triad count away from the
  target, until the count is exact (up to 40 restarts of 4,000 steps).
- **Solving:** every one of the C(k, 3) triples is checked (a triple is a
  triad when each feature's three values sum to a multiple of 3).
- **Guarantees:** deterministic per seed; the deal holds exactly the stated
  number of triads, so the full list on the key is the only answer
  (`unique: true`, `proof: all_triples_enumerated`). `obeys()` re-counts by
  pairs — the third card of a triad is fixed by any two — and the tests
  re-count again with a plain all-alike-or-all-different check over ordered
  triples. Colour always has a second cue (the corner letter); count, shape
  and fill are drawn in shape and line alone.
- **Meta:** `features`, `cards`, `triads`, `answer` (card numbers from 1).
- **Play API** (`lako_triad::play`): `deal` / `deal_from`; `check(deal,
  found, pick)` → `Found`, `AlreadyFound`, `NotATriad { feature }` (the first
  feature with two alike and one different) or `Invalid`; `solved`; `hint(deal,
  found, level)` → one card of an unfound triad, then a second, then all
  three.

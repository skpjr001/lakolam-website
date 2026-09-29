---
title: "Bingo"
blurb: "Bingo cards - 75-ball, 90-ball tickets, words and maths facts, with a caller sheet"
category: puzzle
version: "1.1.0"
---
Class sets of bingo cards — numbers, 90-ball tickets, words or maths facts —
with a caller sheet, and never two cards alike.

## What it is

Printable bingo cards, one, two or four to a page, in four kinds:

- **Numbers** — the classic 75-ball card: five columns headed B, I, N, G, O
  holding 1-15, 16-30, 31-45, 46-60 and 61-75, with a free centre square.
- **90-ball** — the UK ticket: three rows by nine columns, fifteen numbers,
  five in every row, each column holding its own ten (1-9, 10-19, ... 80-90)
  in order from top to bottom.
- **Words** — a themed list (sight words, animals, colours, holidays, and
  dozens more: holidays, seasons, decades, sports, hobbies), a list in
  Spanish, French, German, Italian, Portuguese or Dutch, or your own words.
- **Maths** — the cards show answers; the caller reads the facts ("6 X 7"),
  and players cover the answer. Facts step up by level, from adding single
  digits to times tables, division and two-digit products.

Every page comes with a caller sheet: a tick-list of everything that can be
called (and, for 75-ball, calling cards to cut out and draw from a bag).

## How to play

Each player takes a card and some counters. The caller picks an item from
the caller sheet, reads it out — a number, a word, or a maths fact — and
ticks it off. If it is on your card, cover it; in maths bingo, work out the
answer and cover that. The free square in the middle counts as already
covered. The first player to complete a line — across, down or corner to
corner on a square card, or a whole row on a 90-ball ticket — shouts
"Bingo!", and the caller checks the covered items against the ticks. For
longer games, play on for two lines, then a full card.

## Purpose

A classroom staple and a party game: word bingo drills sight words and
vocabulary, maths bingo turns fact practice into a race, and number bingo
needs no preparation at all. The pages are built to be printed as a whole
class set without two players holding the same card.

## History

Bingo descends from the Italian lottery Lo Giuoco del Lotto d'Italia of the
1530s, which spread to France and Germany as a parlour game and a teaching
aid. The American 75-ball card was popularised in the late 1920s by Edwin
Lowe, who sold it as "bingo"; Britain and Australia kept the older 90-ball
"housie" ticket.

## This implementation

- **Spec knobs:** `kind` (`numbers`, `90ball`, `words`, `maths`), `theme`
  (`sight_words`, `animals`, `colours`, `holidays`, unchanged, or any list
  of the shared lexicon: `christmas`, `the_90s`, `jobs`, ... sixty-odd
  English themes) or your own `words`, `language` (`en` default; `es`,
  `fr`, `de`, `it`, `pt`, `nl`: that language's list, ten themes each),
  `accents` (`fold`, the default for theme lists, or `keep` accented
  capitals; unset leaves your own words cleaned as before),
  `difficulty` (maths facts by level, and the default card size), `cards`
  per page (1, 2 or 4), `card_index` (the first card of this page within
  the set, 0-based), `size` (3, 4 or 5 for word and maths cards; 0 picks
  from the difficulty: Kids 3x3, Easy 4x4, otherwise 5x5), `free_centre`,
  `title`.
- **Generation:** a pool of callable items is built first and shared by the
  whole set — fixed for numbers, the word list for words, and for maths one
  seeded fact per distinct answer (at most 60 answers in play). Kids facts
  are sums of single digits, Easy adds and subtracts within 20, Medium is
  times tables to 10, Hard times tables and division to 12, Expert two-digit
  products, squares and larger sums. Card *i* is drawn from its own seed
  stream and redrawn until it differs from every card before it, so the
  set is fixed by the seed alone. 90-ball tickets choose column counts (one
  to three each, fifteen in all) and seat them five to a row with a greedy
  fill (fullest columns first, into the emptiest rows) that always
  completes.
- **Solving:** nothing to solve; the caller sheet is the key — every item
  that can be called, with the answer printed under each maths fact.
- **Guarantees:** deterministic per seed; card *i* is the same card
  whichever page prints it; the cards of a set are pairwise distinct
  (tested over sixty-card sets of every kind, and on a word list only just
  long enough for one card); 75-ball columns keep their ranges; 90-ball
  tickets have five numbers per row, every column used and sorted, fifteen
  numbers in all; no card repeats an item, so maths answers on a card are
  distinct; every maths fact evaluates to the answer printed for it
  (tested). Difficulty applies to word and maths cards (`rating_basis`
  `maths_facts_by_grade` or `card_size`); number cards are a fixed format
  (`fixed_format`). `card_index` is capped at 996.

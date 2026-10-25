---
title: "Trumps Deck"
blurb: "Trumps Deck — print-and-cut cards of invented monsters, robots, dinosaurs, space ships or animals; no ties, and every card can beat every other at something"
category: design
version: "1.0.1"
---
Print, cut and play a deck of invented monsters, robots, dinosaurs, space
ships or animals — pick a stat, and the highest number wins.

## What it is

A deck of 16 to 32 cards to cut out, all from one theme. Every card has its
own made-up name, a picture and four to six numbers: speed, strength, scare
and so on. The deck is fair: no two cards ever have the same number for a
stat, so there is always one winner, and no card is better than another at
everything — every card can beat every other card at something. A rules
card and printed backs come with it.

## How to play

Cut out the cards along the grey lines (print the back pages on the other
side of the paper first, if you want patterned backs). Two to six players.
Shuffle and deal all the cards face down; everyone holds their pile and
looks only at their top card.

The first player chooses one stat on their top card and reads out its
number. Everyone else reads the same stat on their own top card. The highest
number wins: that player takes all the top cards and puts them at the bottom
of their pile, then chooses the stat for the next round. When a player runs
out of cards they are out. Win every card to win the game, or play to a
timer and count cards at the end.

Tip: remember which cards have big numbers. Even the weakest-looking card is
the best at something, so a clever choice of stat can win any round.

## Purpose

A card game that is really a number game: children compare two- and
three-digit numbers dozens of times a round without noticing, and learn to
judge which stat is a good bet. Making the deck — cutting, sorting, colouring
the line-art version — is half the fun, and a fresh seed gives a new deck of
new characters.

## History

Trading-card games with stat comparisons became a playground staple in
Britain in the 1970s, with decks of cars, aircraft and warships, and later
footballers, film characters and animals. The game of comparing one number
at a time and winning the cards is much older than any brand and is played
the world over.

## This implementation

- **Spec knobs:** `theme` (monsters, robots, dinosaurs, space ships,
  animals), `cards` (16-32, default 24), `stats` (4-6, default 5),
  `colour` (otherwise line art to colour in), `backs` (a mirrored back page
  after each sheet, for long-edge duplex), `page` (Letter or A4).
  Out-of-range `cards` and `stats` are clamped and recorded as
  `requested_cards` / `requested_stats`.
- **Generation:** names come from theme word parts (at most two per first
  part) or, for animals, an alliterative word and an animal from the shared
  icon set; pictures are built from seeded parts (bodies, eyes, horns, legs,
  wheels, fins, plates). Each stat draws distinct values from its own range
  (at least 40 values wide). A local search then removes domination: while
  some card beats another on every stat, it swaps one stat's values between
  the two, choosing the stat that leaves the fewest dominated pairs around
  them. Cards are 2.5 × 3.5 in, nine to a sheet, the rules card in the slot
  after the last card.
- **Guarantees:** checked before the page is drawn (`answers_checked`, with
  `no_ties` and `no_card_dominates` in meta): per stat every value differs,
  so each stat has exactly one top card (listed as `top_card_per_stat`); no
  card beats another on every stat, so any card can beat any other on at
  least one stat; names are distinct and printable. Tests prove it at every
  theme, size and stat count, and re-read the numbers from the printed page
  itself. Backs sit at the mirror image of their fronts.

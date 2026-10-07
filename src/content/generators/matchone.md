---
title: "Find the Match"
blurb: "Find the match — a printable card deck where any two cards share exactly one picture, built from a finite projective plane"
category: puzzle
version: "1.1.0"
---
A deck of picture cards where any two cards share exactly one picture. Be
the first to spot it!

## What it is

A printable card game in the style of the well-known spot-the-match party
games. Every card carries the same number of pictures (three to eight) in
different sizes and places, and whichever two cards you pick, exactly one
picture appears on both. Pages print a few cards at a time; print every page
to cut out the whole deck. Decks can use pictures, numbers or capital
letters.

## How to play

Cut out the cards. Each card has several pictures, and **any two cards have
exactly one picture in common** - never none, never two.

- **Race:** turn over two cards. The first player to name the picture they
  share wins the top card. Keep going until the deck runs out; whoever holds
  the most cards wins.
- **The tower:** deal one card to each player face down and put the rest in
  a pile face up. Turn your card over. When you spot the match between your
  card and the top of the pile, call it out and take the top card onto your
  own. The tallest tower at the end wins.
- **On your own:** pick any two cards and time how fast you find the match.

The pictures can be big or small on different cards, so look at shapes, not
sizes. Each page's answer sheet names the shared picture for every pair of
cards on that page.

## Purpose

Finding the match is fast visual search: scanning, comparing and ignoring
size and position. It suits ages four and up and plays well with a group
because nobody waits for a turn. Small decks with three pictures a card suit
the youngest players; eight-picture decks challenge adults.

## History

The mathematics is older than the game. In 1850 Thomas Kirkman posed his
schoolgirl problem, and finite projective planes - arrangements where any
two lines meet in exactly one point - were studied by Fano, Veblen and
others around 1900. In 1976 the French puzzle maker Jacques Cottereau made
a set of insect cards on this principle; Denis Blanchot turned it into a
commercial party game in 2009, and it became one of the best-selling family
card games in the world.

## This implementation

- **Spec knobs:** `difficulty` (symbols per card: Kids 3 with 7 cards, Easy 4
  with 13, Medium 5 with 21, Hard 6 with 31, Expert 8 with 57), `order` (the
  plane's order 2, 3, 4, 5 or 7, overriding the level; 6 has no plane and
  becomes 7, other numbers the nearest order), `symbols` (pictures, numbers,
  letters), `colour`, `shape` (round or square cards), `cards_per_page` (1,
  2, 4 or 6), `page` (0-based; past the end prints the last page), `width`,
  `height`, `theme` (a seasonal picture pack for picture decks —
  `halloween`, `christmas`, `easter`, `thanksgiving`, `birthday`,
  `valentines`, `festivals` — or `none` for the classic pictures; a pack has
  12-13 pictures, so a Kids deck (7 symbols) is all seasonal, an Easy deck
  (13) nearly so, and bigger decks are topped up with classic pictures that
  look clearly different from the pack's, reported as `theme_pictures`).
- **Generation:** the deck is the projective plane of order q over the field
  GF(q) - prime fields for 2, 3, 5 and 7, and GF(4) from its addition (XOR)
  and multiplication tables. Points and lines are the normalised vectors
  (1, a, b), (0, 1, a), (0, 0, 1); a card is a line and its symbols are the
  points whose dot product with it is zero. Symbols are relabelled, cards
  shuffled and each card's symbols scattered at random, one large and the
  rest varied in size and tilted up to 20 degrees, by rejection sampling of
  non-overlapping bounding circles inside the card's rim (shrinking if a card
  will not pack).
- **Solving:** for any two cards, the one shared symbol is the unique common
  point of two lines.
- **Guarantees:** the pair property is checked for every pair of cards of
  the whole deck before a page is drawn, and tests check the planes
  independently by the dual axiom (every two points on exactly one line) and
  GF(4) by the field laws (`unique: true`, `pair_property_checked`). The
  rating is the symbols per card (`rating_basis: symbols_per_card`). Picture
  decks never hold both of a near-twin pair (ball and circle, square and
  diamond, rectangle and door, and a few more), so a match is never a
  look-alike. The icon set has 49 pictures once twins are dropped: order 7
  needs 57 symbols, so an Expert picture deck adds 8 capital letters. Letters
  stop at order 4 (21 symbols); a larger request is served at order 4 and
  `requested_order` records it. Symbols on a card never overlap and stay
  inside the rim (tested). The key lists every pair of cards on the page with
  the symbol they share.

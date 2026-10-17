---
title: "Pyramid"
blurb: "Pyramid — clear a face-up pyramid by removing pairs that sum to 13; the stock is printed in order and every deal is proven clearable"
category: puzzle
version: "1.0.0"
---
Clear a face-up pyramid of cards by removing pairs that add up to 13.

## What it is

A patience laid out as a puzzle: 28 cards in a seven-row pyramid, each row
overlapping the one above, and the other 24 cards — the stock — printed
face up in the order they will be turned. Every card is visible, every
deal is proven clearable, and the answer key gives a clearing line.

## How to play

A card is uncovered when both cards overlapping it from the row below have
gone. Remove two uncovered cards whose values add up to 13: Ace counts 1,
number cards their number, Jack 11, Queen 12. So 6 + 7, 4 + 9, Ace +
Queen, 2 + Jack. A King counts 13 and is removed on its own.

Turn the stock one card at a time onto a waste pile (the stock is printed
numbered, 1 first). The top card of the waste may be paired with an
uncovered pyramid card, or removed if it is a King; the cards beneath it
come back into play as it goes. When the stock runs out you may turn the
waste over and go through it again, as many times through in all as the
page says. You win when the whole pyramid is cleared.

The key names cards by row and place — rows A (the top card) to G (the
bottom row), counted from the left — and "WASTE" for the top waste card.
Grey lines turn the stock or turn the waste over.

## Purpose

Pyramid is simple adding to 13, which makes it a good arithmetic game for
young players, but it also punishes greed: a pair taken too early can bury
the only partner a covered card has. Printed with the stock visible it is a
planning puzzle with a guaranteed win.

## History

Pyramid is a traditional patience known since at least the early 20th
century, one of a family of "pair to 13" games. It was popularised by
computer card collections from the 1990s on, often with three passes
through the stock.

## This implementation

- **Spec knobs:** `difficulty`; `passes` 1–3 through the stock (null = 3,
  or 2 for Expert); `style` `colour` or `ink` (red suits hollow); `card`
  (card width in points).
- **Generation:** a seeded shuffle fills the pyramid row by row from the
  top; the other 24 cards are the stock in turning order. A naive player is
  simulated first (1,000 seeded playouts: a uniformly random removal when
  one exists, else turn the stock or the waste); only deals whose band
  would serve the request, or come nearer than the best so far, are solved
  exactly. Up to 150 deals are tried, otherwise the nearest band reached is
  served with `requested_difficulty`. A deal not proved clearable is never
  printed.
- **Solving:** exact depth-first search (kings, then pairs, then turning)
  over positions of removed pyramid cards, removed stock cards, cards turned
  and the pass, with a memo of losing positions and two sound prunes: a
  pyramid card with no card of its partner rank left anywhere, or whose
  every remaining partner lies on top of it, can never go. Budget 20,000
  positions; a deal not settled inside it is rejected, never guessed. The
  line is replayed by the rules before the page is returned.
- **Rating** (`rating_basis: "naive_win_rate"`): the naive player's win
  rate with the printed passes — Kids ≥ 90 %, Easy 50–90 %, Medium 20–50 %,
  Hard 0.1–20 %, Expert: the naive player never wins (yet a clearing line
  exists). Naive play in Pyramid either mostly works or never does, so Hard
  is the rarest band (about one deal in thirty); with one pass almost every
  clearable deal is Expert and about one deal in thirty is clearable at all.
- **Guarantees:** deterministic per seed; `clearable: true`,
  `winnable: true`, `solvable: true`; `solution_moves`, `passes`,
  `passes_used`, `naive_win_rate`, `solver_nodes`, and the line as text in
  `solution` ("G3:KS", "B1:6H+W5:7C", "TURN", "REDEAL"). The line is not
  claimed to be the shortest. Tests replay the printed text with an
  independent rules engine (stock and waste as real piles), re-prove every
  band's deals clearable with an independent recursive search over whole
  positions, and confirm that deals the engine calls lost are lost.

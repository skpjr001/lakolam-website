---
title: "TriPeaks"
blurb: "TriPeaks — clear three face-up peaks onto the waste one rank up or down; the stock is printed in order and every deal is proven winnable"
category: puzzle
version: "1.0.0"
---
Clear three face-up peaks onto the waste, one rank up or down at a time.

## What it is

A patience laid out as a puzzle: 28 cards in three overlapping peaks, a
waste card, and the stock printed face up in the order it will be turned.
Every card is visible, so the whole game can be planned, and every deal is
proven winnable. The answer key gives a winning line.

## How to play

A card is free when no card overlaps it from the row below. Play a free
card onto the waste when its rank is one higher or one lower than the waste
card: a 7 or a 9 on an 8. Suits and colours do not matter. Each card
played becomes the new waste card, so you can chain long runs up and down.
King and Ace are neighbours (a King on an Ace, an Ace on a King) unless the
page says "no wrap".

When no free card can be played, turn the next stock card onto the waste
(the stock is printed numbered, 1 first) and carry on from it. You win when
all three peaks are cleared.

The key names cards by row and place: rows A (the three peak tops) to D
(the bottom row), counted from the left, so "D4: 7♥" plays the fourth card
of the bottom row. Grey lines turn the stock.

## Purpose

TriPeaks is fast and friendly, but a good game depends on choosing which of
several playable cards to take: the run that frees a peak card is usually
worth more than the longest run. Printed face up with its stock it becomes
a planning puzzle with a guaranteed win.

## History

TriPeaks was devised by Robert Hogue in 1989 as a variation of Golf
patience, and spread through computer card-game collections in the 1990s;
it remains one of the most played patience games online.

## This implementation

- **Spec knobs:** `difficulty`; `wrap` (King and Ace neighbours, default
  on, as in the usual rules); `style` `colour` or `ink` (red suits hollow);
  `card` (card width in points).
- **Generation:** a seeded shuffle fills the peaks row by row (3, 6, 9 and
  10 cards); the 29th card starts the waste and the other 23 are the stock
  in turning order. A naive player is simulated first (1,000 seeded
  playouts: a uniformly random play, turning the stock only when stuck);
  only deals whose band would serve the request, or come nearer than the
  best so far, are solved exactly. Up to 150 deals are tried, otherwise the
  nearest band reached is served with `requested_difficulty`. A deal not
  proved winnable is never printed.
- **Solving:** exact depth-first search (plays before turns) with a memo of
  losing positions keyed by the cards removed and the waste card, storing
  the fewest stock cards turned known to lose (having turned fewer is never
  worse), and a sound prune: a layout card with no card of a neighbouring
  rank left anywhere can never be played. Budget 200,000 positions; over
  budget the deal is rejected. The line is replayed by the rules before the
  page is returned.
- **Rating** (`rating_basis: "naive_win_rate"`): the naive player's win
  rate — Kids ≥ 60 %, Easy 30–60 %, Medium 10–30 %, Hard 2–10 %, Expert
  below 2 % (yet proven winnable). With wrap almost every deal can be won
  and all bands are common; without wrap about three deals in four can be
  won.
- **Guarantees:** deterministic per seed; `winnable: true`,
  `solvable: true`; `solution_moves`, `stock_left`, `naive_win_rate`,
  `solver_nodes`, and the line as text in `solution` ("D4:7H", "TURN:9C").
  The line is not claimed to be the shortest. Tests check the covering
  relation against the drawn geometry, replay the printed text with an
  independent rules engine, re-prove every band's deals winnable with an
  independent recursive search that works out which cards are free from the
  geometry, and confirm that deals the engine calls lost are lost.

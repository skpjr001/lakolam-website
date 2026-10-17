---
title: "Golf"
blurb: "Golf — clear seven face-up columns onto the waste one rank up or down; the stock is printed in order and every deal is proven winnable"
category: puzzle
version: "1.0.0"
---
Clear seven face-up columns onto the waste, one rank up or down at a time.

## What it is

A patience laid out as a puzzle: seven columns of five cards, a waste card,
and the rest of the pack — the stock — printed face up in the order it will
be turned. Every card is visible, so you can plan the whole game, and every
deal is proven winnable. The answer key gives a winning line.

## How to play

Only the bottom card of each column (the one fully showing) can be played.
Play it onto the waste when its rank is one higher or one lower than the
waste card: a 7 or a 9 on an 8, a Queen or a 10 on a Jack. Suits and
colours do not matter. Each card played becomes the new waste card, so you
can build long runs up and down — 8, 9, 8, 7, 6 …

When no column card can be played, turn the next stock card onto the waste
(the stock is printed numbered, 1 first) and carry on from it. You win when
all seven columns are cleared; stock cards left over do not matter.

Unless the page says "with King-Ace wrap", the ranks do not go round the
corner: nothing is played on a King except a Queen, and an Ace takes only a
2. With wrap, King and Ace count as neighbours.

The key lists the line in order: "COL 3: 7♥" plays the bottom card of
column 3, and grey lines turn the stock.

## Purpose

Golf is quick to learn and rewards looking ahead: the obvious play is often
the wrong one, because a long run now may leave a column stuck later.
Printed with the whole stock visible it becomes a pure planning puzzle,
with a fair guarantee that a win exists.

## History

Golf is an old patience of the 19th or early 20th century, named for its
scoring: in the traditional game a hand is scored like a hole of golf, by
the cards left over, and a "round" is nine deals. It appears in the classic
patience books and later in many computer card-game collections.

## This implementation

- **Spec knobs:** `difficulty`; `wrap` (King and Ace neighbours, default
  off); `style` `colour` or `ink` (red suits hollow); `card` (card width in
  points).
- **Generation:** a seeded shuffle is dealt row by row into the seven
  columns; the 36th card starts the waste and the other 16 are the stock in
  turning order. A naive player is simulated first (1,000 seeded playouts:
  a uniformly random legal play, turning the stock only when stuck); only
  deals whose band would serve the request, or come nearer than the best so
  far, are then solved exactly. Up to 150 deals are tried; otherwise the
  nearest band reached is served with `requested_difficulty`. A deal not
  proved winnable is never printed.
- **Solving:** exact depth-first search (plays before turns) with a memo of
  losing positions keyed by the column heights and the waste card, storing
  the fewest stock cards turned known to lose (having turned fewer is never
  worse, since one can turn on to catch up), and a sound prune: a layout
  card with no card of a neighbouring rank left anywhere can never be
  played. Budget 200,000 positions; over budget the deal is rejected, never
  guessed. The line found is replayed by the rules before the page is
  returned.
- **Rating** (`rating_basis: "naive_win_rate"`): the naive player's win
  rate — Kids ≥ 15 %, Easy 5–15 %, Medium 1.5–5 %, Hard 0.2–1.5 %, Expert
  below 0.2 % (yet proven winnable). Without wrap about half of all deals
  can be won, most of them rated Hard or Expert; Kids deals are rare (about
  1 deal in 150), so a no-wrap Kids request is occasionally served as Easy
  and says so. With wrap nine deals in ten can be won and every band is
  common.
- **Guarantees:** deterministic per seed; `winnable: true`,
  `solvable: true`; `solution_moves`, `stock_left` (stock cards the key's
  line never turns), `naive_win_rate`, `solver_nodes`, and the line as text
  in `solution` ("3:7H", "TURN:9C"). The line is not claimed to be the
  shortest. Tests replay the printed text with an independent rules engine,
  re-prove every band's deals winnable with an independent recursive search
  over whole positions (no memo dominance, no prune), and confirm that deals
  the engine calls lost are lost by the independent search too.

---
title: "Klondike"
blurb: "Klondike — the classic patience, dealt face up: a deal proven winnable, with the winning line as the key"
category: puzzle
version: "1.0.0"
---
The classic patience, dealt face up on paper: every deal can be won, and the answer key shows how.

## What it is

A full Klondike deal printed with every card showing: the seven piles, with
the cards that would be face down drawn shaded, and the 24 stock cards in
the order you would turn them. The deal has been checked by a solver that
knew where every card was, and it found a way to put all 52 cards home. The
answer key is that winning line, move by move.

A winnable deal is not a promise that you will win it in an ordinary game.
When you play with the face-down cards hidden you cannot see what you are
uncovering, and a sensible move can still lead to a loss. The page lets you
play it as an open puzzle instead, with nothing hidden.

## How to play

Build four foundations, one for each suit, from Ace up to King. Each of the
seven piles shows its top card; the shaded cards beneath are the ones that
would be face down. On the piles, put a card on one rank higher in the other
colour (a red 6 on a black 7). You may move a whole run like that as one
unit, and only a King (or a run headed by a King) may go into an empty pile.
When a pile's face-up cards are all moved away, turn the card beneath face
up.

Turn cards from the stock onto a waste pile, one or three at a time as the
page says; only the top waste card can be played. When the stock runs out
you may turn the waste back over and go through again, as many times as the
page allows. You win when all 52 cards are on the foundations.

In the key, "W" is the waste, "F" a foundation and 1–7 the piles: "7H W > 3"
plays the 7 of hearts from the waste onto pile 3, and "9S–8H 6 > 2" moves
the run from the 9 of spades to the 8 of hearts from pile 6 onto pile 2.

## Purpose

Klondike is the best-known patience in the world and the top card game on
web game sites. Printed face up it becomes a planning puzzle: you can see
the whole deal and look for the order of moves that frees every card, then
compare your line with the key.

## History

Klondike takes its name from the Klondike gold rush in Canada's Yukon at the
end of the 1890s, and appears in patience books from the early 1900s. Its
place on almost every home computer, from the early 1990s on, made it the
game most people simply call "solitaire". The "thoughtful" form, played
with every card known, has been used for decades to study how many deals can
be won: around eight in ten with draw 1.

## This implementation

- **Spec knobs:** `difficulty`; `draw` 1 or 3 (null = by band: Kids and
  Easy draw 1, Medium and Hard draw 3, Expert draw 3); `passes` 1–9 passes
  through the stock or 0 for unlimited (null = by band: unlimited up to Hard,
  3 for Expert); `style` `colour` or `ink` (red suits hollow); `card` width
  in points.
- **Generation:** the 52 cards are shuffled (`lako_cards::shuffled`) and
  dealt row by row; the solver must find a win within 150,000 positions or
  the deal is thrown away (a deal it loses or cannot settle is never called
  winnable). Up to 60 deals (and 3,000,000 positions in all) are tried per
  rule set for the requested band, then the nearest band reached is served
  with `requested_difficulty`. If no deal at all is won (draw 3 with one
  pass wins rarely), the passes are relaxed a step at a time and the change
  recorded as `requested_passes`. The winning line has its loops cut out
  (where the table returns to an earlier position, the moves between are
  dropped).
- **Solving:** depth-first search with an explicit stack and a
  transposition table, seeing every card. A stock card is played straight
  from wherever drawing can reach it (with at most one reset per move), the
  draws written into the line; safe foundation moves (no card in play could
  need the card as a host) are made automatically; moves are tried
  foundation plays first, then moves that turn a face-down card (most
  face-down cards first), stock plays, emptying moves and partial run moves
  that free a foundation card, and last foundation-to-pile moves. Positions
  are canonical (pile order ignored; with draw 1 and unlimited passes the
  waste position too). Once the stock is gone and every card is face up the
  rest plays off. Measured over 200 shuffles at 150,000 positions: draw 1
  unlimited wins 84% (1% lost, 15% unsettled); draw 1, 3 passes 65%; draw 3
  unlimited 73% (13% lost); draw 3, 3 passes 50% (23% lost); draw 3, one
  pass 3%.
- **Guarantees:** deterministic per seed; `winnable_deal: true` and
  `full_knowledge: true` — the line in the key wins with every card known;
  it does **not** promise a player who cannot see the face-down cards will
  win. The line (also in meta as `solution`) is replayed by the rules
  written out afresh before the page is returned, and tests replay it again
  on an independent engine. Rated by `rating_basis`: a rules tier (draw 1
  unlimited 0; draw 1 limited or draw 3 unlimited 1; draw 1 one pass or draw
  3 limited 2; draw 3 one pass 3) plus a search tier from the solver's dead
  ends (`solver_backtracks` ≤ 5 → 0, ≤ 1,000 → 1, more → 2); Kids is draw 1
  that the solver won without backing out, Expert draw 3 with limited
  passes that needed real search. Meta also has `solution_moves` (printed
  steps, a run of draws counted once), `actions`, `card_moves`, `draws`,
  `solver_nodes`, `draw`, `passes`. Every band is served for the default
  rules; median times about 50–160 ms per band, the slowest sweep case (Kids asked with one pass) about 3 s.

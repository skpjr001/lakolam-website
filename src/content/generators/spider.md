---
title: "Spider"
blurb: "Spider — two-deck patience in 1, 2 or 4 suits, dealt face up: a deal proven winnable, with the winning line as the key"
category: puzzle
version: "1.0.0"
---
Two-deck patience in one, two or four suits, dealt face up on paper: every deal can be won, and the answer key shows how.

## What it is

A full Spider deal printed with every card showing: the ten piles, with the
cards that would be face down drawn shaded, and the five stock deals laid
out under the piles they fall on. A solver that knew where every card was
found a way to clear the table, and the answer key is that winning line.

A winnable deal is not a promise that you will win it in an ordinary game:
with the face-down cards hidden you cannot see what you are uncovering, and
a reasonable move can still lose. The page lets you play it as an open
puzzle, with nothing hidden.

## How to play

The aim is to build each suit from King down to Ace in one pile; a complete
King-to-Ace run of one suit comes off the table at once. You win when all
eight have come off.

You may put a card on any card one rank higher, whatever its suit (a 6 on
any 7). A run of cards in order and all of one suit can be moved together;
a run of mixed suits cannot. Any card or single-suit run may go into an
empty pile. When a pile's face-up cards are all moved away, turn the card
beneath face up.

When you are stuck, deal from the stock: one card onto every pile, in the
order shown under the piles (deal 1 first). You may not deal while a pile
is empty.

In the key, "9S–6S 3 > 8" moves the run from the 9 of spades to the 6 of
spades from pile 3 onto pile 8; "DEAL" deals the next row; "+ SUIT OFF"
marks a move that completed a suit.

## Purpose

Spider is one of the most played patience games on computers and game
sites, loved for its long, deep games. Printed face up it becomes a planning
puzzle: you can see every card and look for the order of moves that frees
them all. One suit is gentle, two suits a real puzzle, and four suits a
long, hard one.

## History

Spider is an old two-deck patience, described in English patience books
from the late 1800s and early 1900s and long counted among the hardest
common games. It became widely known when a version with one, two and four
suits shipped with home computers around the turn of the millennium.

## This implementation

- **Spec knobs:** `difficulty`; `suits` 1, 2 or 4 (null = by band: Kids and
  Easy 1, Medium and Hard 2, Expert 4; 0 is read as 1 and 3 or more as 4);
  `style` `colour` or `ink` (red suits hollow); `card` width in points.
- **Generation:** two decks are shuffled (`lako_cards::shuffled(2, …)`) and
  the suits folded (one suit: all spades; two: clubs to spades and diamonds
  to hearts), then dealt row by row: six cards on piles 1–4, five on piles
  5–10, the other 50 the stock in dealing order. The solver must find a win
  within 60,000 positions or the deal is thrown away — a deal it cannot
  settle is never called winnable. Up to 40 deals (2,400,000 positions in
  all) are tried for the requested band, then the nearest band reached is
  served with `requested_difficulty`. **Four suits are served only when the
  solver proves a deal in budget**, which it does for about 1% of four-suit
  deals, so an Expert page is four suits for roughly 4 seeds in 10 (about
  5 s); otherwise the hardest two-suit deal found is served, rated Hard,
  with `requested_difficulty: "expert"` and `requested_suits: 4`. The
  winning line has its loops cut out (where the table returns to an earlier
  position, the moves between are dropped).
- **Solving:** depth-first search with an explicit stack and a
  transposition table, seeing every card. Children are tried best first by
  a score (suits off, face-down cards left, cards resting on the next rank —
  more when on their own suit — and empty piles). Only the base of a pile's
  same-suit run moves; a run already resting on the next rank moves only
  onto its own suit; a whole pile never moves into an empty pile and only
  the first empty pile is a target; complete suits come off at once.
  Positions are canonical (pile order ignored). Measured over 100 shuffles
  at 60,000 positions: one suit wins 100%; two suits 45% (55% unsettled);
  four suits 1%.
- **Guarantees:** deterministic per seed; `winnable_deal: true` and
  `full_knowledge: true` — the key's line wins with every card known; it
  does **not** promise a player who cannot see the face-down cards will win.
  The line (also in meta as `solution`) is replayed by the rules written
  out afresh before the page is returned, and tests replay it again on an
  independent engine. Rated by `rating_basis`: the suits, then the solver's
  dead ends (`solver_backtracks`): one suit ≤ 20 Kids, else Easy; two suits
  ≤ 2,000 Medium, else Hard; four suits Expert. Meta also has
  `solution_moves`, `deals`, `solver_nodes`, `suits`. Times: Kids/Easy a
  few ms, Medium about 0.3 s (up to ~1 s), Hard about 0.2–0.4 s, Expert up
  to ~7.5 s.

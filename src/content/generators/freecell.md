---
title: "FreeCell"
blurb: "FreeCell — an open patience deal, every card face up, proven winnable, with the winning moves in the key (Baker's Dozen too)"
category: puzzle
version: "1.0.0"
---
A deal of patience with every card face up, proven winnable, with the winning moves in the key.

## What it is

A whole pack dealt face up into eight overlapping cascades, with free cells
and four empty foundations above them. Nothing is hidden, so the deal is a
true puzzle: it can be won, and the answer key gives a winning line move by
move. A second game on the same page style, Baker's Dozen, deals thirteen
piles of four and has no free cells.

## How to play

The aim is to move every card to the four foundations, building each one up
in a single suit from Ace to King.

**FreeCell.** Only the last card of a cascade (the one fully showing) can
move, one card at a time. You may move it:

- onto the foundation of its suit, if it is the next card up;
- onto the last card of another cascade, if it is one rank lower and the
  other colour (a red 9 on a black 10);
- into an empty free cell — each cell holds one card, and a card in a cell
  can later move to a foundation or onto a cascade;
- into an empty cascade — any card may start a new one.

Moving several cards at once is just a quicker way of making single moves
through the free cells, so the key lists single moves only.

**Baker's Dozen.** Thirteen piles of four, kings already moved to the bottom
of their piles. Move the last card of a pile onto a card one rank higher of
any suit, or to its foundation. There are no free cells, and an empty pile
stays empty for the rest of the game.

The answer key reads "card, from, to": "7♥ 3 → C2" moves the seven of
hearts from cascade 3 to free cell 2, and "F" is the foundation. Lines in
grey are moves to the foundations that can never do harm — most players
make them as soon as they can.

## Purpose

FreeCell is the patience in which skill decides: nearly every deal can be
won, but only by planning several moves ahead. With fewer free cells the
same game becomes much harder, which gives an honest ladder from a gentle
warm-up to a real struggle. Printed, it is a puzzle to solve with a real
pack or in the head, and the key lets the solver check a line.

## History

Paul Alfille wrote FreeCell for a university computer system in 1978,
building on older games such as Baker's Game, in which cascades are built
down by suit. It became famous when it was included with Microsoft Windows
in the 1990s; the "Internet FreeCell Project" then showed that all but one
of the first 32,000 numbered deals can be won. Baker's Dozen is an older
open patience, named for its thirteen piles.

## This implementation

- **Spec knobs:** `difficulty`; `variant` `standard` (FreeCell) or
  `bakers_dozen`; `cells` 1–4 (null = by band: Kids and Easy 4, Medium 3,
  Hard 2, Expert 1; ignored by Baker's Dozen); `style` `colour` or `ink`
  (red suits hollow); `card` (card width in points).
- **Generation:** a seeded shuffle (`lako_cards::shuffled`) is dealt left
  to right into the cascades (Baker's Dozen moves each king to the bottom of
  its pile). Each deal is solved; up to 48 deals are tried until one rates
  in the requested band, otherwise the nearest band reached is served and
  `requested_difficulty` records the request. A deal the solver does not
  win inside its budget is thrown away — it is never printed.
- **Solving:** best-first search over canonical positions (the order of
  cascades and of cells is quotiented out, since swapping two cascades
  changes nothing) with single-card moves only, and with the provably safe
  automatic foundation moves made after every move (a card goes up when no
  card that could still be placed on it remains in play: both foundations
  of the other colour are at least one rank below it in FreeCell, all four
  in Baker's Dozen). Budgets: 40,000 positions (FreeCell), 15,000 (Baker's
  Dozen). The winning line is translated to printed places and replayed by
  the rules written out afresh before the page is returned.
- **Rating** (`rating_basis` `free_cells+solver_nodes`, or `solver_nodes`
  for Baker's Dozen): FreeCell starts from the free cells — 4 Easy, 3
  Medium, 2 Hard, 1 Expert — then goes one band down when the solver won in
  at most 150 positions and one band up past 5,000. Kids is therefore a
  four-cell deal won almost at once; a four-cell deal can be Medium, and a
  one-cell deal won almost at once is Hard. Baker's Dozen by positions
  alone: Kids ≤ 45, Easy ≤ 150, Medium ≤ 1,000, Hard ≤ 4,000, Expert
  beyond (and inside the budget). These measure the effort of one fixed
  search, not of a person; the free cells are the main lever.
- **Guarantees:** deterministic per seed; `winnable: true` and
  `solvable: true`; `solution_moves` (the key's length, automatic moves
  included), `automatic_moves`, `solver_nodes`, `cells`, `variant`, and the
  line as text in `solution` ("7H 3>C2"). The line is not claimed to be the
  shortest. Tests replay the printed text with an independent rules engine,
  re-prove every band's deals winnable with an independent best-first
  search over whole positions (its own score, no canonical forms), and check
  determinism, every card dealt once, kings at the bottom in Baker's Dozen,
  and that every band is served at the default seed.

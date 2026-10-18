---
title: "Akari (Light Up)"
blurb: "Place bulbs to light every cell, with no two bulbs shining on each other"
category: puzzle
version: "1.2.0"
---
Place light bulbs in white cells so every cell is lit and no two bulbs shine
on each other.

## What it is

A grid of white and black cells. Some black cells carry a number: exactly that
many bulbs must sit in the (up to four) white cells beside it. A bulb lights
every cell in its row and column until a black cell blocks the beam. The goal:
every white cell lit, and no bulb in another bulb's beam.

## How to play

Start at the numbers. A "4" forces bulbs on all four sides; a "0" forbids all
four. A numbered cell whose remaining free neighbours exactly match its count
forces them all. Cells that no candidate bulb can reach must themselves hold a
bulb. Mark cells that *cannot* hold a bulb (lit cells, and neighbours of a
satisfied number) — the answer falls out of the interaction.

On the larger boards two further steps come up. **Shadows:** a cell cannot
take a bulb if that bulb would shine on every cell that could still light
some other dark cell, or would rule out so many of a number's neighbours that
the number could no longer be met. **Trying a cell:** when nothing else
moves, pick a cell beside an unfinished number (or one of only two cells left
that could light a dark cell), suppose it holds a bulb, and follow the simple
steps; if that runs into a contradiction, the cell is empty — and the other
way round.

## Purpose

A gentle, visual entry into constraint puzzles — beams are easy to see, and
the "no two bulbs see each other" rule reads instantly. In the workspace it is
also the crate that showed a whole generator can work *without* search:
placing bulbs greedily and lighting everything is a loop that cannot fail.

## History

Introduced by Nikoli in 2001 as **Bijutsukan** ("art gallery"), published in
English as Akari or Light Up. It descends from the mathematical art-gallery
illumination problems, turned into a pencil puzzle with the beam-blocking
twist.

## This implementation

- **Spec knobs:** `rows`, `cols` (3–20 each), `wall_share`, `symmetric`,
  `difficulty`, `cell`, `line`.
- **Generation:** answer first — walls are scattered, bulbs are placed by a
  greedy pass that provably lights everything, numbers are read off the walls,
  and numbers are thinned while the board keeps exactly one answer.
- **Guarantees:** `count_answers(2) == 1` over the walls and surviving
  numbers; every number re-checked against the bulbs actually beside it. The
  search was cross-checked against brute force over **every** wall pattern of
  a 3×3 and every bulb subset of each — 512 boards, no exceptions.
- **A lesson recorded:** a wall blocks a *column* as well as a row, and all
  four neighbours of a wall can hold bulbs — two "obvious" assumptions the
  brute-force sweep corrected during development.
- **Knobs that find nothing (v1.1):** a `wall_share` below about 0.15 found no
  board with one answer. Now, only when the requested share finds nothing, a
  second pass from fresh seeds retries it, then moves it in steps of 0.05
  toward 0.2; the metadata reports `wall_share_used`. Every board that
  generated before is unchanged.
- **Big boards (W16): 12–20 a side.** Boards up to 11×11 are exactly as
  before (a `u128` mask, an exhaustive count, rated by number share with
  `rating_basis: "number_share"`). When either side is past 11 the board is a
  448-bit mask and the proof is a ladder of sound deductions instead of a
  count: **basic** (beams, numbers met or needing every open neighbour, a dark
  cell with one candidate left), **shadow** (a bulb that would starve another
  dark cell or a number), **trial** (suppose a bulb, or no bulb, beside a
  number or in a two-candidate cell; the basic steps reach a contradiction).
  Every wall is numbered first; if the ladder, capped at the requested band's
  rung, cannot settle every cell, a stuck empty cell (and its symmetric
  partner) becomes a wall, the answer is re-lit and the walls renumbered, up
  to 40 times — so big boards end with somewhat more wall than `wall_share`
  asked for (about a quarter at 20×20; `walls` in the metadata is the count).
  Numbers are then blanked while the capped ladder still settles the board.
  **Bands:** basic → Easy, shadow → Medium, trial → Hard, by the hardest rung
  the solve needed (`rating_basis: "hardest_rung"`, `hardest_rung` in the
  metadata). Kids is served as Easy and Expert as Hard, with
  `requested_difficulty`. A 20×20 takes well under a second.
- **Big-board guarantee:** the ladder settles every white cell, and the settled
  bulbs are re-checked against the rules and against the constructed answer.
  Tests re-prove uniqueness on 12×12 and 13×13 boards with an exhaustive
  search that does not use the ladder, and every settled 3×3 wall pattern
  against the count.
- **v1.2:** sides 12–20 are new. A spec asking for more than 11 used to be
  clamped to 11 and now gets the board it asked for, hence the minor bump;
  every board of 11×11 or less is byte-identical.

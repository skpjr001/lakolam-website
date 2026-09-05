---
title: "Akari (Light Up)"
blurb: "Place bulbs to light every cell, with no two bulbs shining on each other"
category: puzzle
version: "1.0.0"
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

- **Spec knobs:** `rows`, `cols`, `wall_share`, `numbered_share`,
  `difficulty`.
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

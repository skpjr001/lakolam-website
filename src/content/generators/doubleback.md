---
title: "Double Back"
blurb: "Double Back — one loop through every white cell, entering each region exactly twice"
category: puzzle
version: "1.0.0"
---
One loop through every white cell — and it must come back to every region
exactly once more.

## What it is

A grid divided into regions by thick borders, with a few black cells. Draw
a single closed loop that passes through every white cell exactly once.
The twist: the loop must visit each region exactly twice — it goes in,
leaves, and later doubles back for a second visit.

## How to play

Draw lines between the centres of neighbouring cells, across or down, to
make one closed loop. The loop passes through every white cell exactly
once and never enters a black cell.

Every region must be visited exactly twice: the loop enters it, wanders
through some of its cells, leaves, and later enters it a second time to
pick up the rest. So the loop crosses each region's thick border exactly
four times.

Good places to start: corner cells and cells beside black cells, where the
loop has only two ways in and out; small regions, where two separate visits
leave very little choice; and long thick borders, which the loop may cross
only four times in all.

## Purpose

A loop puzzle that is all about planning a tour. Because every cell must be
used, each local choice ripples far across the board, and the "come back
exactly once" rule makes the solver think about the order in which the
regions are visited.

## History

Double Back is a modern loop genre built on the classic idea of a tour that
visits every cell. It appears in puzzle championship sets and on Angela and
Otto Janko's puzzle site janko.at. Some versions use every cell of the grid;
this one, like many published puzzles, also uses black cells that the loop
skips.

## This implementation

- **Spec knobs:** `size` (5–10; 0 picks from the difficulty — 5, 6, 7, 7, 8
  from Kids to Expert), `difficulty`, `cell` (18–90 pt), `line` (0.2–4 pt).
- **Generation:** a random simple loop is grown as the outline of a tree of
  unit squares on the lattice of cell centres until only a few cells (one
  to one and a half times the side length) are left off it; those become
  the black cells. Walking along the loop, the next run of one or two free cells
  is joined with a run beside it that does not follow it along the loop, so every
  region is visited exactly twice by construction. A local search then
  moves single cells between neighbouring regions — keeping only layouts
  where each region is still one piece visited twice — until the ladder
  settles every edge at the band's rung.
- **Solving:** a ladder on yes/no variables (one per edge between cells, one
  per cell) — *local* (every white cell has two loop edges; each region's
  border is crossed exactly four times), *loop* (no loop may close before
  it holds every cell; the possible cells must hang together; across a
  narrow passage the loop lives wholly on one side), and *trial* (assume a
  value, propagate, keep the opposite on a contradiction).
- **Guarantees:** deterministic per seed; exactly one loop, proven because
  the sound ladder settles every variable, confirmed by a capped exhaustive
  count, and re-proven in tests by an independent path search for tours
  that refuses a third visit to any region. Rated by the hardest rung
  needed with size as the tie-break (local: Kids at 5×5, else Easy; loop:
  Easy up to 6×6, else Medium; trial: Hard up to 7×7, else Expert). Every
  band is reached at its default size. With a custom `size` some bands
  cannot exist: Kids above 5×5, Medium below 7×7, Hard from 8×8, Expert
  below 8×8 — and from 7×7 up the local rung never settles a board, while
  from 9×9 up the loop rung seldom does, so Kids, Easy and Medium requests
  on 9×9 and 10×10 boards usually come out as Expert. Those requests try
  the easier rungs only briefly on big boards before moving up. The board served is always the
  nearest band reached, labelled as the band it is.

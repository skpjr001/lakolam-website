---
title: "Anglers"
blurb: "Anglers — a fishing line from every angler on the edge to a fish, lengths given, every cell used once"
category: puzzle
version: "1.0.0"
---
Every angler on the bank casts one line, and every fish in the pond is
caught — with each line exactly as long as its angler says.

## What it is

A square pond of cells with fish in some of them, and anglers standing round
the edge, each holding a number. Draw a fishing line from every angler into
the pond to a fish, so that every fish is caught by exactly one line and
every cell of the pond is crossed by exactly one line. Each angler's number
says how many cells the line passes through.

## How to play

Draw a line from each angler into the pond, moving from cell to cell up,
down, left or right, and ending on a fish.

- The angler's number counts the cells the line passes through, including
  the angler's own place on the bank and the fish's cell. So a 2 catches
  the fish right in front of it.
- Every fish is caught by exactly one angler.
- Lines never cross, never touch the same cell twice, and never pass
  through a fish on the way to their own.
- When you are done, every cell of the pond is used by exactly one line.

Good places to start: a small number can only reach the few fish close to
its angler. A cell in a corner or a narrow gap can only be reached by one
line, which must pass through it. And because every cell is used, a line
can never leave a cell that no other line could reach.

## Purpose

A friendly path-drawing puzzle with a picture built in: anglers, lines and
fish. It practises counting steps, planning a route of a set length and
keeping track of space — every cell has to be used — and it suits young
solvers at the smaller sizes.

## History

Anglers was invented by the Hungarian puzzle author László Mérő and first
used at the World Puzzle Championship of 1999 in Hungary. It has appeared in
many championships since, and large collections of handmade examples are
published online.

## This implementation

- **Spec knobs:** `size` (pond side, 4–8; 0 picks from the difficulty — 5,
  6, 6, 7, 8 from Kids to Expert), `difficulty`, `max_number` (largest
  angler number, 4–10; raised to what the pond needs when it is too small to
  reach the middle — 4 up to 5×5, 5 at 6×6, 6 from 7×7 — with
  `requested_max_number` in meta), `cell` (18–90 pt), `line` (0.2–4 pt).
  Out-of-range numbers are clamped.
- **Generation:** the pond is cut into lines grown backwards from their
  fish: a free cell with at most one free neighbour (else the one farthest
  from the bank) becomes the next fish, and a random walk of 3 to
  `max_number − 1` cells (shorter only when that fails), never straying
  further from a free place on the bank than its remaining length allows,
  carries the line out to the bank, where its angler stands. When the
  deduction ladder cannot settle a cutting at the band's rung, a random part
  of the lines it left open is cut again while the rest stay (up to 12
  rounds). For Hard and Expert, boards that need trial are looked for first.
- **Solving:** every candidate line of every angler (each self-avoiding walk
  of its length from its place to a fish, passing no other fish) is a yes/no
  variable. *Singles*: each angler takes one line and each cell is used
  once, so an angler with one line left takes it, a cell only one line can
  still use gets it, and lines clashing with a chosen one go. *Claims*:
  cells every remaining line of an angler uses are that angler's, and an
  angler that alone can still use a cell must use it. *Trial*: assume a
  line, propagate, keep the opposite on a contradiction.
- **Guarantees:** deterministic per seed; every cell used once and every fish
  caught once; exactly one catch, proven because the sound ladder settles
  every candidate line (meta `uniqueness_proof`), with a capped exhaustive
  count confirming it when cheap (`count_confirmed`), and re-proven in tests
  by an independent exact cover over walks enumerated separately. Rated by
  the hardest rung needed with size as the tie-break (singles: Kids up to
  5×5, else Easy; claims: Easy up to 5×5, Medium at 6×6, Hard at 7×7, Expert
  at 8×8; trial: Hard up to 6×6, else Expert). Claims settle most boards,
  so Hard and Expert are carried mostly by size, with trial boards preferred
  when the search finds them. Every band is reached at its default size;
  with a custom `size` the label states the band actually reached (for
  example Kids at 6×6 and above is Easy, Medium at 7×7 is Hard, and the
  hard bands at 4×4 and 5×5 are usually Easy).

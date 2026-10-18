---
title: "Hex Mines"
blurb: "Hex Mines — shade every mine on a hexagon board from cell, line and together/apart clues; no guessing"
category: puzzle
version: "1.0.0"
---
Shade every hidden mine on a board of hexagons, using numbers that count mines around a cell or along a line — no guessing ever needed.

## What it is

A hexagon-shaped board of six-sided cells. Grey cells are open and safe;
each shows how many of its six neighbours hold mines. Numbers just outside
the board count the mines along a whole line of cells, and the total number
of mines is printed at the top. Every white cell is either a mine or safe,
and the clues decide every one of them.

## How to play

Decide, for every white cell, whether it hides a mine; shade the mines (and
put a dot in the cells you know are safe).

- A number in a grey cell counts the mines in the cells touching it (up to
  six).
- A number outside the board counts the mines in the line of cells it
  points along: straight down a column, or down a diagonal. The small
  pointer and the tilt of the number show the direction.
- **{3}** — a number in braces: those mines sit together in one unbroken
  run. Around a cell, the run goes round the ring of neighbours (the last
  neighbour touches the first); along a line, the mines are consecutive.
- **-3-** — a number between dashes: those mines are *not* all together;
  there is at least one gap.
- The total at the top counts every mine on the board.

Start with the easy counts: a 0 makes all its neighbours safe, and a number
with exactly that many white cells around it makes them all mines. Then use
the braces and dashes: {2} beside two white cells that are not neighbours on
the ring cannot use both. Harder boards ask you to read two clues together —
the mines one clue needs may be shared with another — and the hardest ask
you to suppose a cell is a mine and follow the consequences until a clue
breaks.

## Purpose

Mine-finding without the luck: every board can be cleared by reasoning
alone. It trains counting, careful elimination, and combining clues that
overlap.

## History

Minesweeper became famous as a bundled computer game in the early 1990s,
but on its square grid a player is sometimes forced to guess. Hexagonal
versions and "no guessing" logic editions followed; in the 2010s, hexagonal
mine puzzles with line clues and together/apart marks became a popular
genre of their own on computers and phones. This page is our own generic
version of that idea.

## This implementation

- **Spec knobs:** `difficulty`; `cell` (centre spacing), `line`. Band
  boards (hexagon radius → cells, mine share, clue types): Kids radius 2
  (19 cells, 30%, cell numbers only); Easy radius 3 (37, 33%, + line
  clues); Medium radius 3 (37, 36%, + {n}/-n- marks); Hard radius 4 (61,
  36%); Expert radius 5 (91, 38%).
- **Generation:** seeded mines; every safe cell starts open, every usable
  line clue shown (one per printing spot so labels never collide) and, from
  Medium, every meaningful mark shown (count ≥ 2 and below the cells
  available). Clues are then taken away in seed order — covering open cells,
  dropping line clues, dropping marks — while the ladder capped at the
  band's rung still settles every covered cell (Expert digs with the pair
  rung first, then with trial). Up to 24 seeded boards are tried.
- **Solving:** a sound ladder over mine / safe / unknown — **count** (one
  clue, or the total, met or only just meetable), **contiguity** (every
  completion of one marked clue), **pair** (every joint completion of two
  clues sharing covered cells, at most 14 of them), **trial** (suppose a
  value; if rungs 1–3 then clash, it is the other).
- **Bands** (`rating_basis: "hardest_rung"`, meta `hardest_rung`): count
  only → Kids on radius 2, Easy otherwise; contiguity → Medium; pair →
  Hard; trial → Expert. A board landing elsewhere is served with
  `requested_difficulty`.
- **Guarantees:** the ladder settles every covered cell, so the layout is
  the only one (`unique: true`) and no guess is ever needed; the tests
  re-count each band with an independent search over the covered cells.
  The answer key shades the mines in red.

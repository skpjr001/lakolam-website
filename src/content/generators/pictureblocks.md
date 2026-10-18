---
title: "Picture Blocks"
blurb: "Split the grid into rectangles of each clue's size and colour to reveal a pixel picture"
category: puzzle
version: "1.0.0"
---
Split the grid into rectangles, one per numbered clue, and paint each one in
its clue's colour: a pixel picture appears.

## What it is

A grid scattered with numbers. Each number sits in a coloured cell marked
with a letter. Every cell of the grid belongs to exactly one rectangle; each
rectangle holds exactly one number, and the number is how many cells the
rectangle covers. Paint each rectangle in its number's colour (the letter
names it in the key below the grid; numbers without a letter stay white),
and the finished grid is a little pixel picture — a cat, a sailboat, a
mushroom.

## How to play

Draw a rectangle around each number covering exactly that many cells, with
no other number inside, until every cell is used. Then colour the blocks.

- **Only one fit.** A `1` is its own block. A number boxed in by the edge or
  by other numbers often has just one rectangle of its size that fits —
  draw it, and its cells are taken.
- **Only one reach.** A cell that only one number can still reach must be in
  that number's block, which often leaves it a single shape.
- **Overlap.** If every rectangle a number could still make covers some
  cell, that cell is its — no other block may use it.
- **What if.** On harder puzzles, try a shape for a number: if it would leave
  another number no room, or some cell that no block can cover, the shape is
  wrong. The hardest puzzles need the trial followed a few steps further.

A rectangle of 6 can be 1×6, 2×3, 3×2 or 6×1 — remember to consider them
all.

## Purpose

A picture puzzle that rewards spatial reasoning rather than arithmetic: the
numbers are small, the logic is about fitting shapes, and the reward is a
colourful picture. It prints well in colour and, thanks to the letters, in
black ink too.

## History

Rectangle division puzzles were made famous by Nikoli's Shikaku in the
1990s. Puzzle publishers then joined the idea to pixel art: give every
number a colour, make every block a block of the picture, and the solved
grid becomes a painting by blocks. Large colour versions with thousands of
cells became a staple of logic-puzzle magazines and apps in the 2000s.

## This implementation

- **Spec knobs:** `picture` (thirteen built-in 16×16 pixel pictures drawn
  for this generator, or `auto` by seed), `image` (your own PNG or JPEG),
  `size` (cells on the longer side of an uploaded picture, 8–40), `colours`
  (colours an upload is reduced to, white included, 2–6), `scale` (1 or 2:
  each pixel of a built-in picture becomes 2×2 cells, a 32×32 grid; unset
  goes by band — 16×16 for kids to medium, 32×32 for hard and expert),
  `ink` (`colour`, or `mono` — black ink only, the colours as distinct
  shades of grey), `difficulty`, `cell`, `line`.
- **Generation:** each colour region of the picture is tiled into rectangles
  (larger ones favoured; the band sets the largest: 4, 6, 9, 12, 12 cells
  from kids to expert) and each rectangle gets its area written in one of
  its cells (for hard and expert, the cell the most same-sized rectangles
  could cover, so the clue gives away least). The ladder then solves the
  clues up to the band's ceiling; where it stalls, a cell two clues still
  compete for gets its true owner's clue moved onto it — which rules the
  rival out — and a block that keeps causing trouble is split in two. For
  medium and up, the settled board is then made harder: two neighbouring
  blocks of one colour that together form a rectangle are merged into one
  clue, kept only while the ladder still settles the board at the ceiling.
  Moves, splits and merges stay inside the picture's colour regions, so the
  picture never changes. Tilings are tried until one rates at the band (10
  for kids and easy, 24 for medium, 16 for hard, 24 for expert), else the
  nearest band is served and reported as `requested_difficulty`. An upload
  is reduced to its colours by k-means (white paper always one of them).
- **Solving:** the deduction ladder works on each clue's possible
  rectangles: one fit (kids), only reach (easy), overlap (medium), a one-step
  what-if (hard) and a what-if followed through the first three rules
  (expert). Rated by the hardest rung used (`rating_basis: "hardest_rung"`);
  `technique_uses` counts each rung (the what-if rungs count passes).
  Measured over twelve seeds per band at the default sizes: kids, easy and
  hard always come out at their band, medium 11 of 12 (the twelfth easy),
  expert 5 of 12 — the deep what-if is rarely needed even on a 32×32 board,
  so the rest are served as hard. Typical times: under 20 ms for kids to
  medium, about 0.2 s for hard, 1–4 s for expert.
- **Guarantees:** every page is settled by the sound ladder from the printed
  clues alone and re-proved by an exhaustive exact-cover count capped at two
  (a count that runs out of budget rejects the board), so it has exactly one
  solution (`unique: true`). The answer key is the painted picture. Colour
  clue cells are tinted and lettered, and a legend names each letter, so a
  black-ink print still says which blocks to paint. Tests re-prove
  uniqueness with an independent exhaustive search.

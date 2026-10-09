---
title: "Battleship"
blurb: "Battleship game sheet — MY FLEET and ENEMY FLEET grids with coordinates and a fleet checklist"
category: paper
version: "1.0.0"
---
The pencil-and-paper Battleship sheet: a MY FLEET grid and an ENEMY FLEET
grid with lettered rows and numbered columns, and a fleet checklist beside
each.

## What it is

One player's sheet for the classic guessing game. It holds two square grids
of the same size — 10 × 10 as in the classic game, or 8 × 8 for a quicker
game and 12 × 12 for a longer one. The rows are lettered down the left side
(A to J on the classic grid) and the columns numbered across the top (1 to
10), so every square has a name such as B7.

Next to each grid (or under it, whichever lets the squares be bigger) is a
checklist of the fleet, each ship drawn as a row of joined squares as long
as the ship:

- **Classic** — carrier 5, battleship 4, cruiser 3, submarine 3,
  destroyer 2 (17 squares).
- **Hasbro 2002** — carrier 5, battleship 4, destroyer 3, submarine 3,
  patrol boat 2.
- **Russian** — the traditional pencil-and-paper fleet of ten ships: one of
  4 squares, two of 3, three of 2 and four of 1 (20 squares).

## How to use it

Each player takes a sheet and keeps it hidden. On MY FLEET, draw your ships
along the rows or columns, never diagonally, each one covering as many
squares as its row in the checklist; ships may not overlap. (In the Russian
game ships may not touch each other, not even at a corner.)

Take turns calling one square, such as "C5". The other player answers
"miss", "hit", or "hit and sunk" when the last square of a ship is hit.
Mark every shot you call on ENEMY FLEET — a dot for a miss, a cross for a
hit — and mark your opponent's shots on MY FLEET. Use the checklists to
shade the squares of each ship as it is hit and cross it off when it sinks.
The first player to sink the whole enemy fleet wins.

## Purpose

A two-player game of deduction and coordinates that needs only paper and
pencil — for classrooms, car journeys and rainy days. It is a natural way
to practise grid references (letter and number, the same idea as map
coordinates and spreadsheet cells) and simple probability: where can the
last ship still fit? In a book, Battleship sheets make a games or travel
activity section.

## History

Battleship began as a pencil-and-paper game, usually dated to around the
First World War. Printed pads followed: Starex Novelty published one as
Salvo in 1931, and other pad editions appeared in the 1930s and 1940s,
among them Milton Bradley's Broadsides in 1943. Milton Bradley's 1967
plastic board game, with pegs and miniature ships on 10 × 10 grids, made it
famous; its later rules list the carrier, battleship, cruiser, submarine
and destroyer used for the classic fleet here, and Hasbro's 2002 edition
renamed the cruiser a destroyer and added a two-square patrol boat. The
ten-ship fleet is the standard pencil-and-paper version played in Russia
and neighbouring countries.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape`; `margin_mm` (0–30, default 10); `grid` (8x8, 10x10, 12x12);
  `fleet` (classic, hasbro_2002, russian); `checklist` (on or off); `ink`
  for the grid lines (default steel blue) and `label_ink` for titles,
  coordinates and the checklist (default charcoal); `weight` (0.2–2 pt; the
  grid border and ships are drawn twice as heavy).
- **Generation:** the two fleet blocks are laid out in each of four
  arrangements — stacked or side by side, checklist beside or under the
  grid — and the one giving the biggest square wins. The square is rounded
  down to a whole half-millimetre (at most 15 mm), and titles,
  coordinates and checklist are all sized from it, then the whole layout is
  centred in the content box. A letter sheet in portrait gets two 10 × 10
  grids stacked; in landscape they sit side by side.
- **Solving:** nothing to solve — a page to play on. The seed is unused:
  every seed gives the same sheet.
- **Guarantees:** both grids are exactly n × n squares of one size (checked
  to 1e-9 pt); every row and column is labelled; each checklist draws every
  ship of the chosen fleet with exactly its number of squares; no label
  touches another label, a grid or a ship; and all ink — stroke widths
  included — stays inside the margins, on every page size, orientation,
  grid, fleet and margin tested. A knob outside its range is clamped and the
  request recorded as `requested_<field>` in the meta.

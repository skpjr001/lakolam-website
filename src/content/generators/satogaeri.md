---
title: "Satogaeri"
blurb: "Satogaeri — slide every circle straight home, exactly its number of cells, one circle per country"
category: puzzle
version: "1.0.0"
---
Homecoming: slide every circle straight home so each country ends up
with exactly one.

## What it is

A square grid divided by bold lines into countries, with circles in some
cells. Each circle slides along its row or column, without turning, by
exactly the number written in it; a blank circle slides any distance or
stays where it is. When every circle has moved, each country holds
exactly one circle.

## How to play

- Move every numbered circle in a straight line — up, down, left or
  right, without turning — exactly as many cells as its number.
- A blank circle may move any distance in a straight line, or stay put.
- When you are done, every country (an area inside bold lines) must
  contain exactly one circle.
- A circle may not pass over or stop on another circle, and no two
  circles' tracks may cross or share a cell.
- Draw each track as a line from where the circle starts to where it
  stops. There is exactly one way to bring every circle home.

Good places to start: a circle that can only move one way must go that
way. A country that only one circle can still reach belongs to that
circle. A track that every move of a circle has to use is blocked for
all the others.

## Purpose

A calm sliding puzzle: the numbers limit each circle to at most four
moves, and the countries decide which one works. It trains elimination
("if this goes there, that one has nowhere to go") and suits beginners at
small sizes.

## History

Satogaeri (里帰り, "returning home") first appeared in Puzzle
Communication Nikoli No. 99 (2002) and is on the publisher's current
list of puzzles; Otto Janko's online archive carries about 150 of them.

## This implementation

- **Spec knobs:** `size` (4–10; 0 picks from the difficulty — 5, 6, 7, 8,
  9 from Kids to Expert), `difficulty`, `cell` (18–90 pt), `line`
  (0.2–4 pt; borders three times as heavy). Out-of-range numbers are
  clamped and the requested value is reported in the metadata.
- **Generation:** answer first. About one circle per five cells gets a
  random straight track (a few stay put), no two tracks touching;
  countries are grown outward from the cells where circles stop, the
  smallest country growing first. A local search then hands border cells
  from country to country (never a circle's home cell, keeping every
  country connected and, unless that stalls, two cells or more) while no
  more circles are left open by the ladder, until the ladder settles the
  board with every number shown. Numbers are then removed in a seeded
  order while the band's rung still settles it. For Medium and up a
  further search regrows the countries or moves one track, keeping a
  change that leaves the board unique and no easier, until the band's
  rung is needed.
- **Solving:** every legal move of every circle is listed up front (four
  at most for a numbered circle; a blank circle may stay), and a
  trajectory cover picks one move per circle: no shared cells, one circle
  per country. The ladder: *single* (a move clashing with a settled one
  goes; a circle with one move left takes it), *area* (a country only
  one circle can still reach takes it), *overlap* (cells every remaining
  move of a circle uses are its own), *trial* (assume a move, follow the
  rungs below, drop it on a contradiction).
- **Guarantees:** deterministic per seed; exactly one answer, proven by
  the sound ladder settling every circle and confirmed by an exhaustive
  count over the moves capped at two (a spent budget counts as
  ambiguous); tests re-prove it with an independent search that slides
  the circles one by one. Rated by the hardest rung the solve needs (meta
  `rating_basis`, `hardest_technique`): single is Easy (Kids on 5×5 or
  smaller), area Medium, overlap Hard, trial Expert. A requested band the
  board does not reach is served as the nearest one and labelled
  honestly beside `requested_difficulty`; small custom sizes tend to come
  out Kids, and a 4×4 Hard often comes out Medium.

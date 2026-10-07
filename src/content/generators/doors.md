---
title: "Doors"
blurb: "Doors — open or shut the doors between rooms so each number sees that many rooms and every room stays reachable"
category: puzzle
version: "1.0.0"
---
Every wall between two rooms is a door, open or shut. The numbers say how
many rooms you can see — find the shut doors.

## What it is

A square grid of rooms, one room per cell. Between every two neighbouring
rooms is a door. Some rooms show a number: standing in that room and
looking north, east, south and west through open doors, that is how many
other rooms you can see altogether. Your job is to find which doors are
shut, while keeping every room reachable from every other.

## How to play

1. Draw a thick wall on every door that is shut. Doors you leave open are
   simply the thin grid lines.
2. A number counts the other rooms visible from its room in the four
   straight directions. A view runs on through open doors and stops at the
   first shut door or the outside wall. The room itself does not count.
3. All the rooms must stay connected: from any room you can walk to any
   other through open doors.

Start with the extremes. A 0 means all four doors of its room are shut. A
number as big as its whole row and column means nothing is shut along
them. Count what each room could see with every door open, and compare: the
difference must be hidden behind shut doors. Never wall a room in, or cut
the house in two — a door that would do that must be open.

## Purpose

A visibility puzzle in the family of Kurodoko and Cave, but with walls on
the edges instead of shaded cells. It trains adding up sight lines in four
directions and keeping a whole floor plan connected.

## History

Doors (in German Türen, also known as Seethrough, Open Office or Vista) is
of unknown origin, probably Czech: it was used at the World Puzzle
Championship in 2001 and again in 2011, 2013, 2016 and 2017. Otto Janko's
puzzle site has some 270 of them.

## This implementation

- **Spec knobs:** `size` (4–9; 0 picks from the difficulty — 4, 5, 6, 6, 7
  from Kids to Expert), `difficulty`, `walls` (1–9; 0 picks 5 — how many
  doors are shut), `cell` (24–90 pt), `line` (0.2–4 pt). Out-of-range
  numbers are clamped and the value asked for is reported in meta
  (`requested_size`, `requested_walls`, …).
- **Generation:** doors are shut at random (never one that would cut the
  rooms apart), every room is numbered, and the board is kept only when the
  deduction ladder settles it. Numbers are then removed in random order
  while the ladder still settles it at the connectivity rung; for Hard and
  Expert a few more are then tried at the trial rung.
- **Solving:** a ladder on one yes/no variable per door (shut). *Sight*:
  each number lies between its sure view (open doors in a row) and its
  possible view (doors not shut in a row) along its four arms; probing
  each door on the arms against those bounds settles it. *Connectivity*:
  the rooms joined by doors not shut must be one group, and a door whose
  shutting would split them (a bridge) is open. *Trial*: assume, keep the
  opposite on a contradiction.
- **Guarantees:** deterministic per seed; exactly one set of shut doors,
  proven because the sound ladder settles every door (`uniqueness_proof`),
  confirmed by a capped count when cheap (`count_confirmed`), and
  re-proven in tests by an independent count over the rules alone. Rated
  by the hardest rung needed with size as the tie-break (sight: Kids at
  4×4, else Easy; connectivity: Easy up to 5×5, else Medium; trial: Hard up
  to 6×6, else Expert). Every band is reached at its default size; with a
  custom `size` the label states the band actually reached
  (`requested_difficulty` records the request).

---
title: "Switch Maze"
blurb: "Switch maze — red and blue doors swap open and shut each time you step on a switch; find the one shortest way"
category: maze
version: "1.0.0"
---
Red doors are open, blue doors are shut — until you step on a switch and
they swap.

## What it is

A grid maze with coloured doors and round switches. Only one colour of door
is open at a time. Every time you step onto a switch the doors change over,
so a door you walked through a moment ago may now be shut behind you. The
maze has loops, so there is more than one way around, but only one shortest
way to the treasure, and you cannot get there without using the switches.

A three-colour version cycles red, then blue, then green.

## How to play

Start on START and find your way to the treasure. Move from square to square
through the gaps — you cannot cross a wall.

- A door is a coloured bar across a gap. You can walk through it only while
  its colour is open. Each colour also has a shape — a circle for red, a
  square for blue, a triangle for green — so the page works in black and
  white too.
- At the start, red doors are open and every other colour is shut.
- Each time you step onto a switch, the open colour changes. With two
  colours, red and blue swap. With three, red gives way to blue, blue to
  green and green to red.
- Stepping off a switch changes nothing; stepping back onto it changes the
  doors again.

Find the shortest way — there is only one.

## Purpose

Keeping track of a changing state. In a plain maze the walls stay put; here
the solver has to remember which doors are open right now, and plan when to
change them — sometimes going out of the way to a switch, or stepping onto
one twice. That is the kind of working-memory and planning-ahead exercise
behind logic circuits and adventure games, at a level an eight-year-old can
start on and an adult can still find tricky.

## History

Robert Abbott's books *Mad Mazes* (1990) and *SuperMazes* (1997) made
"multi-state" mazes — mazes whose rules change with the way you have walked
them — one of the main families of logic maze. Switches that open one set of
doors and close another are also a staple of video-game dungeons, from the
crystal switches of *The Legend of Zelda: A Link to the Past* (1991) onwards.

## This implementation

- **Spec knobs:** `difficulty` (Kids 6×6 with 2 doors on the way, Easy 8×8
  3, Medium 10×10 4, Hard 12×12 5, Expert 16×16 7), `size` (0 = the level's;
  otherwise 5–20), `doors` (doors on the way, 0 = the level's; otherwise
  1–8), `colours` (2 or 3), `loops` (share of dead ends opened into loops,
  0–1), `decoys` (extra doors and switches off the route), `colour`,
  `width`, `height`, `line`. Clamped requests are reported as
  `requested_<field>`; when the path is too short for the doors asked for,
  fewer are used and `requested_doors` is reported.
- **Generation:** a growing-tree carve makes a branchy spanning tree. Doors
  go on edges of the START–treasure path, so each is a bridge. Their colours
  are chosen so the first door, and most later ones, need a change of
  colour; for each change a switch is hidden deep on a side branch of the
  section before that door. Decoy switches and decoy doors off the route
  are added one at a time, and loops are opened from dead ends only inside
  one door-bounded section; each addition is kept only if the shortest
  route stays unique. Up to eight valid mazes are built in search of the
  requested band.
- **Solving:** breadth-first search over (square, open colour), counting
  shortest routes, capped. The open colour advances on entering a switch
  square.
- **Guarantees:** exactly one shortest route (`unique: true`); it presses a
  switch at least once, and with the switches taken away the treasure
  cannot be reached at all. Tests re-prove the route with a distance-to-goal
  table by fixpoint iteration and a capped depth-first count, re-check the
  length with a separate breadth-first search, and walk the route square by
  square checking each door against the open colour. Rated by route length
  and switch presses, the average of the two bands (`rating_basis:
  route_steps_and_switch_presses`); a band not reached after eight tries is
  served as the nearest one, labelled honestly with `requested_difficulty`.
  The key draws the route with direction arrows and numbers each switch
  press.

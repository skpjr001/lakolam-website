---
title: "Key Maze"
blurb: "Key maze — fetch the key for every locked door (or collect the stars, or obey one-way gates) on the way to the treasure"
category: maze
version: "1.0.1"
---
Locked doors stand between you and the treasure. Find each key, in the right
order, and take the one shortest way through.

## What it is

A grid maze with a few lettered doors. Each door is opened by the key with
the same letter, and the keys are tucked away down side passages — often
behind earlier doors. The maze has loops, so there is more than one way
around, but only one shortest route, and every key on the page is needed.

Two other modes use the same maze: a **star maze**, where you collect every
star before the treasure, and a **one-way maze**, where gates marked with
arrows can only be passed in the arrow's direction.

## How to play

Start on START and find your way to the treasure. Move from square to square
through the gaps — you cannot cross a wall.

- **Keys:** a door with a letter is locked. Walk onto the square with the key
  of the same letter to pick it up; after that you can go through that door
  as often as you like. Keys never get used up, and every key is needed.
- **Stars:** walk onto every star to collect it, then go to the treasure.
- **One-way gates:** you may only pass a gate in the direction its arrow
  points.

Find the shortest way — there is only one.

## Purpose

Planning in stages. A plain maze asks "how do I get there?"; a key maze asks
"what do I need first, and where is it?" Children learn to set a sub-goal,
remember what they are carrying and come back for the door — the same
backward planning behind adventure games and real-life errands. It suits ages
six to twelve, from one key on a small grid to five on a large one.

## History

Locks and keys are among the oldest devices in puzzle design: they gate
progress in text adventures such as *Colossal Cave Adventure* (1976) and in
the dungeons of *The Legend of Zelda* (1986), where a door's key always
waits somewhere before it. One-way doors are a staple of Robert Abbott's
*Mad Mazes* (1990) and of logic-maze collections that followed.

## This implementation

- **Spec knobs:** `difficulty` (Kids 6×6 with 1 key, or 2 stars or gates;
  Easy 8×8 2 / 3; Medium 10×10 3 / 4; Hard 12×12 4 / 5; Expert 14×14 5 / 6),
  `mode` (`keys`, `stars`, `gates`), `items` (0 = the level's count;
  otherwise 1–6, capped to keep pages uncluttered), `size` (0 = the level's;
  otherwise 5–20), `loops` (share of dead ends opened into loops, 0–1),
  `colour`, `width`, `height`, `line`.
- **Generation:** a growing-tree carve (half newest, half random) makes a
  branchy spanning tree. *Keys:* doors go on edges of the START–treasure
  path, spread along it, so each door is a bridge; key *j* is hidden deep on
  a side branch in the region before door *j* (sometimes an earlier region,
  so it must be carried). Loops are then opened from dead ends, only between
  squares of the same door-bounded region, and each is kept only if the
  shortest route stays unique. *Stars:* stars are placed one at a time on
  side branches, kept if the route stays unique, then loops are added the
  same way. *Gates:* the maze is braided heavily, then each gate is put on
  an edge of the current shortest route, facing against it, so it bars that
  route and the next shortest one takes over; leftover ties are broken by
  closing unneeded passages.
- **Solving:** breadth-first search over (square, keys or stars held),
  counting shortest routes; keys are picked up on entering their square.
- **Guarantees:** exactly one shortest route (`unique: true`). Keys: every
  key is necessary — take any one away and the treasure cannot be reached —
  and every door is opened on the route. Gates: every gate blocks a
  shortcut — let it swing both ways and a shorter route opens. Tests re-prove
  the route with a distance-to-goal table by fixpoint iteration and a capped
  depth-first count, re-check key necessity by flood fill, and walk the
  route square by square. Rated by route length and number of items, the
  average of the two bands (`rating_basis: route_steps_and_item_count`);
  gate mazes are short and open, so they usually rate a band below the level
  asked for, and are labelled so. The key draws the route in red with
  direction arrows and prints its length.
- **Version 1.0.1 — a missed band is recorded.** The rating is measured
  from the route, and now and then a seed lands one band below or above the
  request (seeds 1–8: 2 of 40 off). The page and key are unchanged; the
  metadata now adds `requested_difficulty` when the served band differs.

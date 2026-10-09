---
title: "Fog Maze"
blurb: "Fog maze — walk the maze seeing only through a cut-out window card, rated by the steps the fog makes you waste"
category: maze
version: "1.0.0"
---
A maze you may only see through a small window: cut out the viewing card,
keep your square in the middle of it, and find the way out in the fog.

## What it is

A printed maze from IN to OUT, and a viewing card — a sheet with a square
window, 3, 5 or 7 squares across, at exactly the maze's scale. Laid on the
maze, the card hides everything but the squares round you. You walk one
square at a time, moving the card with you, so you meet every junction
without knowing which way leads on: a short dead end is easy to spot through
the window, but a long passage could be the way out or a trap.

The maze has exactly one way from IN to OUT. Hiding the rest of the maze is
up to you — it is played on your honour.

## How to play

- Cut out the viewing card along the dashed lines, and cut out its window.
  Thick paper or card works best.
- Lay the card on the maze so that your square sits in the middle of the
  window — the red ticks mark the middle square. Start at IN.
- Move one square at a time, up, down, left or right, through the gaps in
  the walls, and slide the card along with you.
- Mark your trail only through the window, and only look at the maze
  through the window. No peeking round the card!
- Reach OUT. Count your steps if you like: the fewer wasted steps, the
  better your fog-walking.
- For two players: one holds the answer page and says "yes" or "no" at each
  junction you try; the other walks with the card.

## Purpose

A maze seen whole is solved by the eyes, often backwards from OUT. In fog
that shortcut is gone: you have to keep a mental map of where you have
been, choose at junctions with too little information, and backtrack
systematically — the same depth-first habits a robot or a computer program
uses to explore a maze. Marking your trail as you go (only inside the
window) turns that memory into a strategy you can see.

## History

Mazes in which you cannot see the whole picture go back to hedge mazes,
where the walker's view is a few steps of path. Andrea Gilbert's
clickmazes site had a peephole knight's-tour maze (1998) that showed only a
5×5 patch of the board at a time, and web games have since put mazes "in fog", showing
only a small area round the player. Activity books have long hidden parts
of a page — invisible-ink books reveal the path only as you colour it in.
This page brings the fog to paper with a cut-out window, which keeps the
idea and lets you keep your trail.

## This implementation

- **Spec knobs:** `difficulty` (Kids 10×10 maze with a 7×7 window, Easy
  13×13 with 5×5, Medium 16×16 with 5×5, Hard 20×20 with 3×3, Expert 26×26
  with 3×3), `size` (maze side, 0 = the level's, otherwise 8–48), `window`
  (0 = the level's, otherwise 3–9 and odd; an even request is rounded up),
  `card` (`separate`: a full-page card as a second page; `same_page`: a
  small card below the maze), `width`, `height`, `line`. The maze and the
  card share one square size, so the window is exactly `window` squares
  across. Clamped requests are reported as `requested_<field>`.
- **Generation:** a recursive-backtracker perfect maze from IN (top-left)
  to OUT (bottom-right), then tuned by spanning-tree edge swaps — open a
  missing passage, close another passage on the loop it makes — keeping a
  swap when it does not move the fog cost further from the level's band
  and does not make the true path shorter than twice the maze's side.
  Up to six carvings are tried; a climb that stalls outside the band (a
  size or window the band cannot fit) ends the search.
- **Solving and rating:** the fog cost is the exact expected number of
  wasted steps of a careful fog walker. The walker explores depth-first;
  never enters a side passage whose whole extent is already inside the
  window (it can see it is a dead end); heads straight for OUT as soon as
  the whole way there is inside the window; and otherwise picks among the
  passages it has not tried uniformly at random. On a perfect maze this is
  computed bottom-up: for every branch, the expected number of passages
  entered and the chance that OUT comes into view inside it; a branch at a
  junction is entered only if it comes before the right way on and no
  branch before it ended the search, and every passage entered is walked
  twice. Bands: Kids under 12 wasted steps, Easy 12–39, Medium 40–99, Hard
  100–249, Expert 250 or more (`rating_basis: fog_walker_expected_waste`);
  the meta also gives the cost for a walker with no view at all.
- **Guarantees:** a perfect maze — one fewer passage than squares, all
  connected — so exactly one path from IN to OUT does not repeat a square
  (`unique: true`); the answer key draws it. Tests check the closed form
  against a Monte-Carlo walker that looks round the maze square by square
  (agreement within four standard errors on several mazes), that a wider
  window never costs more and a whole-maze window costs nothing, and that
  the card's window is exactly `window` squares of the maze. A band the
  size and window cannot reach (an 8×8 maze cannot waste 250 steps) is
  served as the band reached, labelled honestly with
  `requested_difficulty`.
- **What paper cannot do:** the web original fades your trail and truly
  hides the maze. On paper the maze is all printed and the card is the
  honour system; the rule "mark only through the window" replaces the
  fading, and you may keep your marks, which is kinder.

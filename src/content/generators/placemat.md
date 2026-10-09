---
title: "Placemat"
blurb: "Kids' activity placemats — a maze, word search, dot-to-dot, tic-tac-toe and a design to colour on one themed sheet; each puzzle keeps its own generator's proof, panels never overlap, answers on a second page"
category: puzzle
version: "1.0.0"
---
A kids' activity placemat: a maze, a word search, a dot-to-dot,
tic-tac-toe and a picture to colour on one themed sheet.

## What it is

A landscape sheet with a title and a line for a name across the top, a
large design to colour down one side, and four boxes of things to do: a
maze to find the way through, a word search with words on the theme, a
dot-to-dot that joins into a picture on the theme, and four tic-tac-toe
boards to play with a friend. Themes are the ocean, space, the farm, the
garden, Christmas and Valentine's Day. A second page has the answers.

## How to play

Write your name at the top. In the maze, draw a line from the way in to
the way out without crossing a wall. In the word search, find each word
in the list hidden in the letters and circle it; words read across and
down, and at harder levels backwards and on the diagonals too. Join the
dots in number order to see the picture, then colour it. Play
tic-tac-toe with a friend: take turns to draw X or O in an empty square,
and the first to get three in a row across, down or corner to corner
wins. Colour the big picture any way you like.

## Purpose

Restaurants, cafés, waiting rooms, parties and long car journeys all need
something to keep children busy for twenty minutes, and an activity
placemat does it on a single sheet: a little reading, a little counting, a
little logic, a game for two and some colouring. Printing your own means a
fresh sheet every time, on a theme to match the occasion.

## History

Paper placemats printed with games and colouring for children spread
through family restaurants in the United States in the 1950s and 1960s,
often with crayons in a paper sleeve beside them, and they are still sold
by the thousand to restaurants today. Mazes, word searches (from 1968) and
connect-the-dots (from the late 19th century) are the classic puzzles they
carry.

## This implementation

- **Spec knobs:** `theme` (auto, ocean, space, farm, garden, christmas,
  valentines; a named theme is reported as `requested_theme`),
  `difficulty` (kids to expert: a 6 × 6 maze, an 8 × 8 word search with
  five words read across and down and 12 dots at kids, up to a 14 × 14
  maze, a 12 × 12 grid with ten words in all eight directions and 40 dots
  at expert), `source` for the colouring panel (auto, mandala, stained
  glass, voronoi, isohedral, apollonian, celtic) and `page` (letter, A4,
  tabloid; always landscape).
- **Generation:** each puzzle is another generator's own page — maze,
  word search (the theme's word list), dot-to-dot (the theme's shape) —
  made at the difficulty's size with its own seed, and placed into its
  panel by one uniform scale and shift. The colouring design is reduced to
  black line art. The answer page draws the same layout with each puzzle's
  own answer key placed by the same transform.
- **Solving:** each puzzle is solved and proven by its own generator: the
  maze has exactly one route, every word is hidden exactly once, and the
  dots join in one order.
- **Guarantees:** `obeys()` checks that every panel and the title band lie
  inside the page margin and no two overlap; that every panel's content
  and answer lie inside the panel's window; that each panel is placed by a
  uniform scale and shift (nothing inside it is changed); that each puzzle
  panel's generator reported its puzzle unique and shipped an answer; and
  that the answers sit exactly where the puzzles do. A test regenerates
  the maze from the same spec and seed and finds it identical, item for
  item. Difficulty is the size band asked for (`rating_basis`: panel
  sizes); meta lists every panel with its generator and proof.
- **Where it lives:** in `lako-catalog`, beside colour cards, because it
  uses other generators' pages.

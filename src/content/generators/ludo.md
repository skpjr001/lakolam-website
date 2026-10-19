---
title: "Ludo"
blurb: "A printable Ludo board — the classic four-player cross or the six-arm hexagonal board — in colour or black ink, with star safe squares, rules, cut-out counters and a die net; the geometry is checked to tile exactly"
category: design
version: "1.0.0"
---
The race-round-the-cross board game, ready to print — the classic board for
four, or the six-arm board for a bigger family.

## What it is

A printable Ludo board. For four players it is the classic 15 × 15 cross: a
yard in each corner with four circles for your counters, three-wide arms of
six squares between them, and a centre square split into four home
triangles. Each arm carries a home column of five squares in its player's
colour, and each player's start square is coloured and arrowed. The track
round the outside is 52 squares long. For six players the board has six arms
round a central hexagon, a triangular yard between each pair of arms and a
78-square track. A pachisi board is offered too: longer arms of eight
squares (a 68-square track for four), a nest circle in each corner, three
safe squares on every arm marked with a circle and cross, and the rules for
two dice. Print it in the classic colours (red, green, yellow and
blue, with orange and purple added for six), or in black ink for home
printers, where each player is told apart by a number and a hatching
pattern. A second page holds four counters per player and a die to cut out
and fold.

## How to play

You need the board, four counters for each player and one die.

1. Each player takes a yard — a corner of one colour (or, on the black and
   white board, one number and pattern) — and puts their four counters on
   its circles.
2. Take turns clockwise to roll the die. A six lets you bring one counter
   out of your yard onto your start square, the square beside your yard
   with the arrow. Otherwise, move one of your counters on the track that
   many squares clockwise. A six also gives you another roll. If none of
   your counters can move, your turn passes.
3. If your move ends on a square held by an opponent's counter, you capture
   it: it goes back to its yard and needs another six to come out. Your own
   counters may share a square.
4. Counters on a star, or on any start square, are safe and cannot be
   captured. (A board printed without stars plays without safe squares.)
5. When your counter has gone all the way round and reaches the square
   behind your start, it turns at the arrow into your home column — the
   five squares of your colour — and on to your triangle in the centre. No
   one else may enter your home column. You need the exact roll to land in
   the triangle.
6. The first player to bring all four counters home wins.

With two players on the four-arm board, sit in opposite yards, or take two
yards each for a longer game. The six-arm board plays the same way with a
78-square track: five or six can play, or fewer in yards spread round the
board — three players taking every other yard keeps it fair.

**Pachisi rules** (the longer board):

1. You need four counters each and two dice. Put your counters in your
   nest, the corner circle of your colour.
2. Roll both dice. A 5 on either die, or two dice adding up to 5, brings a
   counter out onto your start square (the one with your arrow). Move one
   counter by each die, or one counter by both. A double gives you another
   roll; a third double in a row sends your counter nearest home back to
   its nest.
3. Two of your counters on one square make a blockade: no counter, not even
   your own, may pass it or land on it.
4. Land on a single enemy counter to capture it: it goes back to its nest
   and you move any one of your counters 20 squares. Counters on a circled
   square or a start square are safe, and two colours may share one.
5. At the end of your own arm, turn into your home column of seven squares
   and go on to the centre by the exact roll. Each counter that gets home
   earns a bonus move of 10. The first to bring all four home wins.

## Purpose

A first strategy game for children: counting moves, choosing which counter
to move, and weighing a safe move against a capture. A printed board needs
no box, and the black-ink version can be coloured in before playing.

## History

Ludo is the English adaptation of the Indian game Pachisi, played for
centuries on a cloth cross with cowrie shells for dice. A simplified version
with a cubic die and a square board was patented in England in 1896 as
Ludo, Latin for "I play"; the same game is sold as Parcheesi in the United
States, Mensch ärgere dich nicht in Germany and Parchís in Spain. Boards for
six (and even eight) players appeared later for larger families.

## This implementation

- **Spec knobs:** `players` (4 = the classic cross, 6 = the six-arm board;
  other values snap — up to 4 → 4, 5 or more → 6 — and meta reports
  `requested_players`), `style` (`classic` colours or black `ink` with
  numbers and patterns), `safe_squares` (stars on the safe squares and the
  safe-square rule), `counters` (the cut-out page of counters and a die
  net), `rules` (the how-to-play panel), `page` (`letter` or `a4`),
  `variant` (`ludo`, the default, or `pachisi`: arms of 3 × 8, a 68- or
  102-square track, home columns of 7, nests drawn as circles, three safe
  squares an arm marked with a circle and cross, two die nets on the
  counter page; meta adds `variant`, `dice: 2`, `enter_on: 5`).
- **Generation:** the board is built for one arm and turned about the centre
  in exact 90° or 60° steps. The centre is a regular polygon of side 3 (a
  3 × 3 square, or a hexagon); each side carries an arm 3 squares wide and
  6 long; the gap between two arms is the yard (a 6 × 6 square, or an
  equilateral triangle of side 6). The track runs out along one side of
  each arm, across its end and back along the other: 13 squares an arm, 52
  or 78 in all. Each player's start square is the second square in from the
  end on the side beside their yard; the star square lies 8 squares further
  on. Squares are drawn at their true shape on the six-arm board, never a
  stretched grid. The seed is not used: a board is a pure function of its
  spec, so every seed gives the same page.
- **Solving:** nothing to solve — a printable game board.
- **Guarantees:** `geometry_checked`, re-checked by an independent route:
  every square is a unit square; track squares, home columns, centre
  triangles and yards are pairwise disjoint and their areas sum to the
  board's outline, so they tile it exactly; the track is one closed loop
  whose neighbours share an edge, except at the centre's corners, where it
  steps diagonally round the corner as on every Ludo board; each home column
  runs 5 squares from its entry square to its triangle; each start square
  lies along its own yard; each yard holds four separate circles; arms are
  exactly 90° or 60° apart and each is the first one rotated; start and star
  squares are all distinct (8 safe squares for four, 12 for six; on the
  pachisi board 12 or 18, three an arm: the fourth square out, the square
  across the arm's end where its player turns home, and the start four
  squares in, symmetric about the arm); the die
  net's opposite faces sum to 7; the counter sheet holds four counters per
  player, each no wider than a square. In ink every fill and line is black,
  white or grey.

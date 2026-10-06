---
title: "Game Sheets"
blurb: "Game sheets — pen-and-paper game pads (dots and boxes, tic-tac-toe, hangman, sprouts, connect four, MASH) and solved dots-and-boxes winning-move puzzles"
category: puzzle
version: "1.0.0"
---
Pen-and-paper game pads ready to play, and dots-and-boxes endgames where
exactly one move wins.

## What it is

A pad of the classic games two people play with a pencil: dots and boxes on
square, triangular or honeycomb dot grids; tic-tac-toe, four-layer 3-D
tic-tac-toe and ultimate tic-tac-toe; hangman rounds; sprouts; four in a row;
and a MASH fortune sheet. The puzzle page turns dots and boxes into a
challenge: four games are nearly over, it is your turn, and only one line
leads to a win.

## How to play

**Winning-move puzzles.** In dots and boxes, players take turns drawing a
line between two dots next to each other. Whoever draws the fourth side of a
box owns it (marked Y for you, F for your friend) and must move again. When
every line is drawn, the player with more boxes wins. Each game on the page
is your turn: find the one line that wins if you and your friend both play
your best from then on. Every other line ties or loses.

- Count the boxes left and the score so far.
- Look for long chains of boxes. Opening a chain hands your friend every box
  in it, so sometimes the winning move gives away one or two boxes on
  purpose, to make your friend open the next, longer chain.
- On the hardest games a box is on offer, and the winning move is to leave
  it - or to take all but the last two boxes of a chain and hand those over -
  so that your friend must open the next chain for you.

**Pads.** Each pad prints its rules at the top. Dots and boxes: claim
squares, triangles or hexagons. Tic-tac-toe: three in a row. 3-D: four in a
line across, down or through the layers. Ultimate: your move decides which
small board your friend plays in next. Hangman: guess the word letter by
letter. Sprouts: join spots without crossing; no spot may have more than
three lines; whoever cannot move loses. Four in a row: marks drop to the
lowest empty hole of a column. MASH: draw a spiral, count its rings and
cross out choices to read a silly future.

## Purpose

Paper games teach turn-taking, planning ahead and fair play, and need
nothing but a pencil - ideal for car trips, wet playtimes and waiting rooms.
Dots and boxes hides real mathematics: the winning-move puzzles practise
counting chains, thinking two moves ahead and the idea that giving
something away now can win more later.

## History

Dots and boxes was published by the French mathematician Edouard Lucas in
1889 as "la pipopipette". Its theory - chains, sacrifices and the
"double-dealing" move - was worked out by Elwyn Berlekamp, who wrote a whole
book on it in 2000. Sprouts was invented by John Conway and Michael Paterson
at Cambridge in 1967. Three-in-a-row games go back to ancient Egypt and
Rome; the 4x4x4 cube version was sold as a board game in the 1960s, and
ultimate tic-tac-toe spread as a playground and puzzle-column variant in the
2000s. Hangman dates from Victorian England, and the MASH fortune game from
American schoolyards of the 1980s. The vertical four-in-a-row game was
first sold in 1974.

## This implementation

- **Spec knobs:** `mode` (`puzzle`, `dots_and_boxes`, `tic_tac_toe`,
  `tic_tac_toe_3d`, `ultimate`, `hangman`, `sprouts`, `connect_four`,
  `mash`), `difficulty` (puzzle mode), `puzzles` (2-6), `lattice` (`square`,
  `triangular`, `hex`), `dots` (3-12 dots or hexagons across), `games` (per
  page; 0 = the mode's usual number), `word_length` (hangman, 3-12; 0 = a mix
  of 4-8), `width`, `height`. The default is a page of four Medium
  winning-move puzzles.
- **Generation:** each endgame comes from a plausible random game on a
  board sized by level (Kids 2x2, Easy 2x3, Medium and Hard 3x3, Expert 3x4
  boxes): players usually take a box on offer and avoid handing one over
  while they can. Play stops with a seeded number of lines still open (at
  most 16; Expert stops where a box is on offer). The position is kept only
  if exactly one line wins; up to 400 tries per puzzle, and a puzzle never
  repeats on a page. Pads draw true dot lattices, standard grids, seeded
  hangman slot counts and seeded sprouts spots.
- **Solving:** exact. A memoised negamax over the set of drawn lines gives
  the best net score for the player to move (a completed box scores and
  moves again). The winning lines are those after which your final score
  beats your friend's.
- **Guarantees:** puzzles are proved: of all open lines exactly one leads to
  a win with best play (`unique: true`, `answers_checked: true`), re-checked
  in tests by an independent solver that counts the boxes each side collects
  over a different state representation. Each is rated by the kind of move
  that wins (`rating_basis: winning_move_kind_and_open_lines`): a capture
  when it is the only box on offer (Kids with up to 6 lines open, else
  Easy); a quiet move that gives nothing away (Easy up to 8 lines open, else
  Medium); choosing the right one of several captures (Medium); a sacrifice
  handing over a box (Hard); declining a box on offer, as in double-dealing
  (Expert). Every band is reached; if a band were ever missed in 400 tries
  the page would carry the nearest band reached and say so (`difficulty`
  beside `requested_difficulty`). The key draws the winning line in red with
  the final score under best play. Pads have nothing to solve and carry no
  key; their guarantee is geometric (`geometry_checked`): every dot grid is
  a true lattice - neighbouring dots exactly one spacing apart, none closer,
  every dot with at least two neighbours - and sprouts spots stay well apart
  from each other and from the frame.

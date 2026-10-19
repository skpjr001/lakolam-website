---
title: "Score Pads"
blurb: "Large-print score sheets for five dice, Farkle, rummy, gin, Mexican train, golf, canasta, bridge and cribbage, with a scoring page and every maximum computed"
category: design
version: "1.0.0"
---
Large-print score sheets for the dice, card and domino games people play at
the kitchen table, with every maximum worked out from the rules.

## What it is

A score sheet for one game: the five-dice category game, Farkle, rummy, gin
rummy, Mexican train dominoes, six-card golf, canasta, rubber bridge,
cribbage, spades, hearts, euchre, Oklahoma-style gin, or a blank rounds
sheet for any game. Each sheet is a grid of
write-in boxes, one column for each player or side and one row for each
category, turn, hand, hole, deal or round, with total rows at the foot. In
large print the words are big and the boxes are tall. The five-dice sheet
shows the most each box can hold. A second page gives the game's scoring in
the same large print: what each combination scores, the bonuses, and a few
numbers worth knowing, such as the best possible game.

## How to use it

Print as many sheets as you need, or slip one into a plastic sleeve and use
a dry-wipe pen. Write each player's name at the top of a column. After each
turn, hand or round, write the score in that player's box, and add up the
column at the end. For five dice, fill one box per turn and write 0 if the
dice do not fit; the column after the names shows the most a box can score,
so a high number is easy to check. For Mexican train, start on the top
double and work down one row a round. For bridge, write bonuses above the
heavy line and the tricks bid and made below it, and rule off under a game
when a side wins it. For spades, each side's column is split into bid,
tricks won, score and bags: write the bid before play and the rest after
the hand. For hearts, write each player's points for the hand and their
running total beside it; the game ends when someone reaches 100. For
euchre, write the scoring side's new total after each hand, first to 10.
For Oklahoma gin, write the turned-up card's value in the knock column
(mark a spade, which doubles the hand), then the winner's score; add the
boxes and the game bonus at the foot. Keep the scoring page on the table
for settling arguments.

## Purpose

Score sheets wear out fast, and printed pads in large print are hard to
find. Seniors' clubs, care homes and families with older players ask for
them, and they round out any book of games. The scoring page makes the
sheet complete on its own, so nobody has to remember whether a full house
scores 25 or how much a red three is worth.

## History

People kept score with chalk, pegs and pencils long before printed pads.
Cribbage boards date from the 1600s, and rubber bridge's "above and below
the line" sheets come from the 1900s. Five-dice category games descend
from older dice games such as poker dice, and became family favourites in
the 1950s and 1960s. Farkle is a folk dice game played under many names;
Mexican train grew up in the late 20th century as a family domino game.

## This implementation

- **Spec knobs:** `game` (five dice, Farkle, rummy, gin, Mexican train,
  golf, canasta, bridge, cribbage, blank, `spades`, `hearts`, `euchre`,
  `oklahoma_gin`), `players` (2–8; 0 = the game's usual; gin and Oklahoma
  gin are for two, bridge and euchre for four as two sides, canasta takes
  2, 3, 4 or 6 with four and six as partnerships, cribbage and spades 2–4
  with four as partnerships, hearts 3–6), `rounds` (1–30 rows of turns,
  hands, holes or deals; 0 = the usual — spades 12, hearts and Oklahoma gin
  15, euchre 19; Mexican train counts down from its top double, 7–19 rows),
  `large_print` (no text under 16 pt, boxes at least 28 pt tall),
  `rules` (the scoring page; a lined house-rules page for the blank
  sheet), `colour` (a seeded accent colour, or black and grey) and `page`
  (Letter or A4).
- **Generation:** the game's rows, footer, rules and facts come from a
  rules module. Row heights, the label size and the column widths are fitted
  to the page; the label size shrinks (never below the print size's
  minimum) when many players need room, and rows of rounds that do not fit
  are dropped. The seed picks the accent colour and the dice, suits or
  dominoes drawn beside the title. Spades and hearts split each column into
  sub-columns (BID, WON, SCORE, BAGS; HAND, TOTAL — or the short heads PTS,
  BAG, SUM when columns are narrow) under a heading strip; Oklahoma gin
  adds a KNOCK write-in column; euchre has WE and THEY.
- **Verification:** every number printed is computed, not typed: the
  five-dice box maximums over all 7,776 rolls, the best game of 1,575
  (each box's best is reached by a five of a kind, so thirteen of them
  reach every best at once, with twelve 100-point bonuses), the best Farkle
  throw (3,000) and how often six dice score nothing (1,080 in 46,656),
  the most deadwood a ten-card gin hand can hold with no meld (98, by
  branch and bound), the best and worst six-card golf hands (−6 and 60),
  the best cribbage hand (29) and the hand scores no hand can make (19,
  25, 26, 27), the trick score of seven no trumps redoubled (880), the
  canasta pack's card points and each domino set's tiles and pips; the
  best and worst spades hand for a side over every pair of bids and split
  of tricks (230 and −230, blind nil aside), the 26 points of a hearts deal
  and the fewest deals to 100 (4), the shortest and longest euchre game
  (3 and 19 hands, so the sheet has a row for every hand), the euchre pack
  (24 cards, 4 in the kitty) and the best Oklahoma gin hand (gin on a spade
  against 98 deadwood: 246). Tests
  re-derive them independently (cribbage over every real hand of cards).
  `obeys()` re-adds the five-dice totals and checks every label fits, no
  text is under the minimum, and every box is big enough. A player or
  round count the game cannot take is moved to the nearest it can and
  reported as `requested_players` or `requested_rounds`.
- **Guarantees:** `rules_checked` and `maximums_computed` in the meta,
  with the facts themselves (`best_game`, `best_throw`, `max_deadwood`,
  `best_hand`, `impossible_hands`…) and `smallest_text_pt`.

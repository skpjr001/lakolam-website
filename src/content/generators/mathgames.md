---
title: "Maths Game Boards"
blurb: "Maths game boards — the product game, bump, four in a row and cover-up, each board exactly the results the dice or factor strip can make"
category: maths
version: "1.0.0"
---
Print-and-play boards for the product game, bump, four in a row and
cover-up — every square is a result the game can actually make.

## What it is

A one-page, two-player maths game with its rules and board. The **product
game** has a strip of factors (1 to 9 in the classic version) and a 6 × 6
board holding every product of two of them exactly once. **Bump** and
**four in a row** use two dice, added or multiplied: the board has one
square for every way the two dice can land, so each answer appears as often
as the dice make it — 7 six times on a sum board, 2 once. **Cover-up** gives
each player a strip with every possible answer once. The answer sheet shows,
in every square, the factor pairs or the roll behind it.

## How to use it

- **Product game:** one player puts a paper clip on a factor; the other puts
  the second clip on any factor (the same one is allowed), multiplies, and
  covers the product. After that, each turn moves just one clip, then covers
  the new product (if it is already covered, the turn ends). Four covered
  squares in a row — across, down or diagonally — wins. Think ahead: every
  clip you leave gives your opponent choices.
- **Bump:** roll two dice and add (or multiply). Place a counter on a square
  with that answer. If your opponent has a single counter there, bump it off;
  if you already have one there, add a second to lock the square. The first
  to place all 10 counters wins.
- **Four in a row:** roll, work out the answer, and cover a free square with
  it; four in a row wins.
- **Cover-up:** roll, work out the answer, and cross it off your own strip.
  The first to cross off every number wins — and you soon find out which
  numbers are hard to roll.
- The answer sheet lists the factor pairs or dice rolls for every square:
  useful for checking, and for talking about why some answers are common.

## Purpose

Fact-fluency games give the repetition of a drill with a reason to think:
the product game rewards knowing which factor pairs make each product, and
the dice boards build an intuition for probability (why 7 turns up more than
12). They are classroom staples for multiplication and addition facts in
the early and middle grades.

## History

The product game was popularised by the National Council of Teachers of
Mathematics (NCTM) in its Illuminations lessons; its 6 × 6 board holds the
36 different products of 1 to 9. Bump games and four-in-a-row fact boards
are long-standing classroom favourites, and cover-up strips descend from the
pub dice game Shut the Box.

## This implementation

- **Spec knobs:** `game` (`product`, `bump`, `four_in_a_row`, `cover`);
  `operation` (`add`, `multiply`; ignored by the product game); `faces` (dice
  numbered 1 to 4-10; ignored by the product game); `top` (the product
  game's largest factor, 5-12; ignored by the dice games); `order`
  (`sorted`, `shuffled`; cover-up strips always run in order); page `width`,
  `height` and `line`. Clamped values are reported as `requested_*`.
- **Generation:** the product game's squares are the distinct products of
  two factors from 1 to `top`, laid out at least 4 × 4 with as few grey FREE
  squares as possible (the classic 1-9 board is exactly 6 × 6, with none);
  the dice boards have one square per ordered roll, `faces`
  × `faces`; cover-up strips list each distinct result once.
- **Guarantees:** `answers_checked` with the guarantee
  `board_equals_reachable_set`: the board is checked against the results
  recomputed from the rules — every product exactly once; every ordered dice
  roll on exactly one square (so each answer's count is the number of ways
  to roll it); every distinct result once on a strip — and every pair in the
  key multiplies or adds back to its square. Tests recompute the reachable
  results by brute force, check the classic board matches the NCTM layout,
  and check a tampered board is caught.

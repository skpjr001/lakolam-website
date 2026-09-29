---
title: "Money Maths"
blurb: "Money — count coins and notes, make amounts, give change, compare and add"
category: maths
version: "1.0.0"
---
Coins and notes to count, amounts to make, change to work out, purses to
compare and prices to add, in dollars, pounds, euros or rupees.

## What it is

A worksheet of money questions, four to ten to a page, with pictures of
coins and notes (bills). Coins are drawn as simple tinted discs at their
real relative sizes, with the value in the middle; notes are tinted
rectangles with their value. Five kinds of question share the page: count the
money, circle coins that make an amount, draw an amount with the fewest coins
and notes, work out the change, say which of two purses holds more, and add
two or three price tags.

## How to play

- **How much money is here?** Start with the biggest note or coin and count
  on: for 25¢ 25¢ 10¢ 5¢ 1¢, say 25, 50, 60, 65, 66 cents. When a count
  passes 100 cents (or pence), that makes one dollar (or pound).
- **Circle money to make an amount.** Circle the coins and notes that add up
  to exactly the amount. There can be more than one way; any way that makes
  the amount is right.
- **Draw it using the fewest coins and notes.** Start with the biggest piece
  that is not more than the amount, take it away, and repeat with what is
  left. Write how many pieces you used.
- **Change.** Count what you paid, then count on from the price up to that
  amount: the amount you counted on is the change.
- **Which has more?** Count each purse. The purse with more pieces does not
  always hold more money. Circle the letter of the one with more.
- **How much for both?** Add the prices: cents (or pence) first, then dollars
  (or pounds), carrying 100 cents into one dollar.

## Purpose

Money is where place value and addition meet everyday life, and it is taught
in every primary year: recognising coins, counting mixed coins, making
amounts, and giving change. One page mixes the skills the level calls for,
in the child's own currency, with an answer key for quick marking.

## History

Counting coins and making change have been part of school arithmetic for as
long as there have been coins; worksheets with coin pictures became standard
in the twentieth century. The level order here follows the common
progression: small coins, then all coins under one unit, then notes, change
and larger amounts.

## This implementation

- **Spec knobs:** `difficulty`; `mode` (`mixed`, `count`, `make`, `fewest`,
  `change`, `compare`, `add`); `locale` (`us`, `uk`, `in`: default currency,
  "bills" or "notes", "math" or "maths", Indian digit grouping); `currency`
  (`auto`, `usd`, `gbp`, `eur`, `inr`); `style` (`colour` metallic tints or
  `line_art` black on white); `count` (4-10); page `width` and `height`;
  `line`.
- **Generation:** Kids (about kindergarten to grade 1) uses the smallest coins
  (1¢ 5¢ 10¢; 1p 2p 5p 10p; ₹1 ₹2 ₹5) with totals to 20-30; Easy (grades 1-2)
  every coin under one unit, totals under 1.00; Medium (grades 2-3) all
  coins and the first note, to 5.00; Hard (grades 3-4) notes to 10, totals to
  20.00; Expert (grades 4-5) every piece, to 100.00 (rupees: ₹1-₹500 pieces,
  to ₹2,000). Mixed pages deal the kinds the level teaches: Kids count, make
  and compare; Easy adds adding; Medium adds change; Hard and Expert add the
  fewest-pieces question. Purses are drawn at random within the level's
  range; young levels show the pieces largest first, later levels shuffled.
  Change is paid with the next piece up, or the fewest pieces of the next
  round amount. No question appears twice on a page, and a make-it question
  never contains a single piece worth the whole amount. All pictures on a
  page share one scale, so a coin is the same size everywhere. Coins and
  notes are generic: a coin is a disc (or the curved seven-sided shape of the
  UK 20p and 50p), bimetallic where the real coin is; no real design is
  drawn. The currency symbols $ ¢ £ € ₹ and the small p and c are drawn as
  paths in the style of the page font.
- **Solving:** amounts are integers in cents, pence, euro cents or paise, so
  every sum and difference is exact. The fewest-pieces answer comes from a
  dynamic programme over every amount up to the target (ties prefer larger
  pieces); the key draws that set and its size, circles one correct set for
  make-it questions, circles the richer purse with both totals, and writes
  every other answer in red.
- **Guarantees:** deterministic per seed. Pictured values sum exactly to the
  answer; change is exactly tendered minus price and always positive; every
  fewest-pieces answer is proven optimal — the tests compare the dynamic
  programme with an independent breadth-first search on every amount up to
  10.00 (₹1,000) in all four currencies and on a non-greedy coin system.
  Every piece on the page belongs to the level; compared purses never tie.
  Difficulty is the amount range and denominations in play
  (`rating_basis: amount_range_and_denominations`).

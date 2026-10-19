---
title: "Money Maths"
blurb: "Money — count coins and notes, make amounts, give change, compare and add"
category: maths
version: "1.0.0"
---
Coins and notes to count, amounts to make, change to work out, purses to
compare and prices to add, in dollars, pounds, euros, rupees and ten more
currencies, with cash rounding where the smallest coins are gone.

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
- **Paying in cash.** Canada and Australia no longer have 1¢ and 2¢ coins, so
  a cash price is rounded to the nearest 5 cents: a last digit of 1, 2, 6 or
  7 rounds down, and 3, 4, 8 or 9 rounds up (3.47 dollars is paid as 3.45,
  3.48 as 3.50). New Zealand has no 5c coin either, so cash is rounded to the
  nearest 10 cents (3.43 dollars is paid as 3.40, 3.47 as 3.50). Write what
  you pay.

## Purpose

Money is where place value and addition meet everyday life, and it is taught
in every primary year: recognising coins, counting mixed coins, making
amounts, and giving change. One page mixes the skills the level calls for,
in the child's own currency, with an answer key for quick marking.

Grade notes: Kids suits kindergarten to grade 1 (ages 5-7), Easy grades 1-2,
Medium grades 2-3, Hard grades 3-4 and Expert grades 4-5 (ages 9-11). Cash
rounding, in Canadian, Australian and New Zealand dollars, joins the mixed
page from Medium, where children meet rounding to the nearest 5 and 10.

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
  (`auto`, `usd`, `gbp`, `eur`, `inr`, and the later ten: `cad`, `aud`,
  `nzd`, `sgd`, `hkd`, `zar`, `php`, `mxn`, `brl`, `aed`); `mode` also
  takes `round` (cash rounding; `cad`, `aud` and `nzd` only, any other
  currency is refused); `style` (`colour` metallic tints or
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
  page share one scale, so a coin is the same size everywhere.
  The later ten use only coins in circulation: no 1c or 2c in Canada,
  Australia or New Zealand (and no 5c in New Zealand), no 10 or 20 centavos
  in Mexico, no 1 or 5 sentimo in the Philippines. Their levels follow the
  same grades: currencies with small cent coins (CAD, AUD, NZD, SGD, BRL)
  start Kids on those coins with totals to 1.00 (NZD 1.50); those whose
  coins are mostly whole units (HKD, ZAR, MXN, PHP) start Kids on 1, 2 and
  5 (PHP 1, 5 and 10) unit coins to 20-30.00; the dirham starts on 25 fils,
  50 fils and 1 dirham to 5.00. Expert reaches 100.00 (CAD, AUD, NZD, SGD),
  200.00 (BRL), 500.00 (ZAR), 1,000 (AED) and 2,000 (HKD, PHP, MXN).
  Prices move in the greatest common divisor of the level's pieces, so
  every price can be paid exactly; change for these is paid with the next
  round amount above the price in one of the level's units, in at most four
  pieces. A cash-rounding price never ends exactly halfway (no 5c ending in
  New Zealand) and is never already payable. Amounts are written `$3.45`
  and `35¢` (CAD, MXN), `50c` (AUD, NZD, SGD, HKD; `R` and `c` for the
  rand), `₱20.25` and `25¢` (PHP), `R$0.50` (BRL) and `AED 1.50` and
  `25 FILS` (AED; the coins read `25F`, `50F` and `AED1`). The heptagonal
  UAE 50 fils is the only shaped coin among them; the rest are drawn round. Coins and
  notes are generic: a coin is a disc (or the curved seven-sided shape of the
  UK 20p and 50p), bimetallic where the real coin is; no real design is
  drawn. The currency symbols $ ¢ £ € ₹ ₱ and the small p and c are drawn as
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
  10.00 (₹1,000) in all fourteen currencies (every multiple of the
  currency's step, the unmakeable gaps included) and on a non-greedy coin
  system. A cash-rounding answer is checked against an independent search
  for the strictly nearest multiple of the rounding unit; meta records
  `cash_unit` for the three rounding currencies.
  Every piece on the page belongs to the level; compared purses never tie.
  Difficulty is the amount range and denominations in play
  (`rating_basis: amount_range_and_denominations`).

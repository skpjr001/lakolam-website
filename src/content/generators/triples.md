---
title: "Find the Triples"
blurb: "Triples — find every set of three cards whose features are all the same or all different; the page says exactly how many"
category: puzzle
version: "1.0.0"
---
A table of cards with shapes on them. Find every group of three where each
feature is all the same or all different.

## What it is

A visual logic puzzle played with a table of cards. Each card shows one,
two or three copies of a shape, and each card differs from the others in
up to four features: the number of shapes, the shape (circle, triangle,
square), the fill (empty, striped, solid) and the colour (red, green,
purple). Black-and-white pages use the card's corners - round, square or
cut - in place of colour. The page tells you exactly how many triples the
cards hold.

## How to play

Three cards make a **triple** when, for every feature on its own, the three
cards are either all the same or all different.

- Number: 1, 1, 1 or 1, 2, 3 is fine; 1, 1, 2 is not.
- Shape: three circles, or a circle, a triangle and a square.
- Fill and colour (or corners) work the same way.

A quick test: if two cards share a feature and the third does not, it is
not a triple. Any two cards are completed by exactly one possible third
card, so pick two cards, work out what the third must look like, and look
for it.

Find all the triples the page promises and write each one as three letters
on the lines below the cards. A card can belong to more than one triple.

## Purpose

The puzzle trains attention to several features at once, systematic
search, and the rule "all the same or all different", which is harder than
it looks: people tend to spot triples that share features and miss the
ones where everything differs. Three-feature pages with nine cards suit
children from about six; fifteen cards with four features challenge
adults.

## History

The game behind this puzzle was invented in 1974 by the geneticist Marsha
Falco, who drew cards to track traits while studying epilepsy in German
shepherds, and published as a card game in 1991. Mathematicians recognised
the cards as the points of a four-dimensional space over the numbers 0, 1
and 2, where triples are exactly the lines; the largest set of cards with
no triple at all is 20, proved by Giuseppe Pellegrino in 1971 before the
game existed. A daily "find the sets" puzzle with twelve cards has run in
newspapers and online since the 2000s.

## This implementation

- **Spec knobs:** `difficulty` (Kids: three features, 9 cards, 2-4
  triples; Easy: three features, 12 cards, 4-8 triples; Medium: four
  features, 9 cards, 1-3 triples; Hard: four features, 12 cards, 4-6
  triples; Expert: four features, 15 cards, 6-9 triples), `colour` (the
  fourth feature is colour, otherwise the card's corners), `width`,
  `height`.
- **Generation:** with each feature's values as 0, 1, 2, three cards are a
  triple exactly when every feature sums to a multiple of 3. A table starts
  as random distinct cards and is improved by local search - swap one card
  for one not on the table, keep the swap if the triple count moves no
  further from the level's range - until the count is in range.
- **Solving:** for each pair of cards, the third card of their triple is
  determined (each feature is the pair's shared value, or the value neither
  has); look for it on the table.
- **Guarantees:** the printed number is exact (`unique: true`): every one of
  the C(n, 3) groups of three cards is checked, and the count is confirmed
  by the other route, completing every pair and looking the third card up
  (each triple is found exactly three times). Tests check the sum rule
  against the rule as printed ("all the same or all different") and that
  every pair has exactly one completion in the full deck. Cards on a table
  are all different. The level is rated by features and cards
  (`rating_basis: features_and_cards`) and each level's count range is
  always met; meta also reports how many triples differ in every feature,
  the kind people find hardest. The key lists every triple.

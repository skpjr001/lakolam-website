---
title: "Proportion"
blurb: "Proportion — is it proportional, the constant of proportionality, direct, inverse and power proportion, unitary-method word problems"
category: maths
version: "1.0.0"
---
Is it proportional? The constant, the equation, direct and inverse proportion — every answer exact.

## What it is

A worksheet of four to ten questions on proportional relationships. Some
show a table of x and y values, or points on a straight-line graph, and
ask whether y is proportional to x and what the constant of
proportionality is; on harder pages a table may show direct proportion,
inverse proportion or neither. Others say "y is directly (or inversely)
proportional to x" — or to the square or cube of x — give one pair of
values, and ask for the equation and another value. Word problems use the
unitary method: notebooks and prices, fuel and distance, eggs and
pancakes, ribbon and cost, and, for inverse proportion, workers and days,
speed and journey time, hay and horses, pumps and a tank. The answer key
fills in every answer.

## How to play

- **Is it proportional?** Divide each y by its x. If every answer is the
  same number, y is proportional to x and that number is the constant of
  proportionality, k (so y = kx). If even one is different, it is not.
- **On a graph:** a proportional relationship is a straight line through
  the origin (0, 0). A straight line that misses the origin is not
  proportional. Read k as the y-value when x = 1, or as y ÷ x at any
  point.
- **Inverse proportion:** y = k ÷ x — as one doubles, the other halves.
  Multiply each x by its y: if the products are all the same, the
  relationship is inverse and that product is k.
- **Finding the equation:** for direct proportion, k = y ÷ x; for inverse
  proportion, k = x × y. Then write y = kx or y = k/x, and use it to find
  the other value.
- **To a power:** "y is proportional to the square of x" means y = kx^2,
  so k = y ÷ x^2. "Inversely proportional to the square of x" means
  y = k/x^2, so k = y × x^2. To find x from y, rearrange and take the
  square or cube root.
- **The unitary method:** find the value for one (divide), then multiply
  up. 5 notebooks cost 12 dollars, so 1 costs 2.40 and 8 cost 19.20. For
  inverse proportion, find the total first: 8 workers for 15 days is 120
  worker-days, so 12 workers take 120 ÷ 12 = 10 days.

Every answer comes out exactly — money to the cent — so no rounding is
needed.

## Purpose

Proportional reasoning is the backbone of middle-school mathematics:
Common Core 7.RP.2 asks students to decide whether two quantities are
proportional from a table or graph, find the constant of proportionality
and write y = kx; England's GCSE covers direct and inverse proportion,
including y proportional to x^2 and to 1/x^2 at Higher tier; and India's
NCERT class 8 chapter "Direct and Inverse Proportions" works through
exactly these word problems. Ratio tables, unit rates and sharing in a
ratio live on the ratios worksheet; this page is about recognising
proportion and using its constant.

## History

Proportion is one of the oldest ideas in mathematics. The "rule of three"
— three known terms of a proportion give the fourth — appears in the
Chinese *Nine Chapters* and in Indian mathematics from Aryabhata (499 CE)
and Brahmagupta, reached Europe through Arabic texts, and was the central
skill of merchants' arithmetic books for centuries. Euclid's Book V
(attributed to Eudoxus) gave the theory of proportion its classical
form. Laws of the form y = kx^n became the language of physics, from
Hooke's law to Newton's inverse-square law of gravitation.

## This implementation

- **Spec knobs:** `difficulty`; `topic` (`mixed`, `tables`, `direct`,
  `inverse`, `powers`); `locale` (`us` miles, gallons, yards and dollars;
  `uk` and `in` kilometres, litres, metres, and pounds or rupees);
  `count` (4-10); `width`, `height`, `line` (clamped to sensible page
  sizes).
- **Generation:** every relationship is built from its constant, chosen
  first. Easy uses whole constants: "is this table proportional?",
  y = kx through a given pair, and whole-number word problems. Medium adds
  fractional constants (tables then show decimals), straight-line graphs
  on a 0-10 grid, inverse proportion equations and word problems. Hard
  asks whether a table is direct, inverse or neither, prices to the cent,
  and y proportional to x^2. Expert adds the cube and the inverse square
  of x, and finding the positive x for a given y. A "not proportional"
  table or graph is a straight line y = kx + b with b from 1 to 6. The
  inverse topic starts at Medium and the powers topic at Hard (lower
  requests are served there, and meta records `requested_difficulty`);
  Kids is served as Easy. No question repeats on a page.
- **Solving:** constants and answers are computed with exact fractions;
  money is written to two places.
- **Guarantees:** `answers_checked` and `unique` — the answers are
  re-derived from the printed numbers: a table or graph is proportional
  exactly when every ratio y/x agrees (one unequal ratio proves it is
  not; for inverse, every product x·y), and the constant is that common
  value; an equation's law must pass through the given pair and give the
  asked value, and a found x is the only positive whole number that works
  (checked by trying every x up to 500); word problems must
  cross-multiply. The tests also re-solve every word problem from the
  numbers read out of its printed sentence, re-check graph points against
  the drawn line, check each level's promises, that the key writes in red
  where the page is blank, and that every printed character is in the
  font.

---
title: "Probability"
blurb: "Probability worksheet — spinners, dice, bags of counters, sample spaces, two-way tables and tree diagrams"
category: maths
version: "1.0.0"
---
Spin, roll, draw and count: find exact chances as fractions, from spinners to tree diagrams.

## What it is

A worksheet of four to eight probability questions, each with a picture: a
fair spinner (equal sectors, or unequal sectors with their angles marked),
a dice, a bag of lettered counters, a grid of outcomes for two dice (or a
spinner and a dice) to fill in, a two-way table with missing entries to
complete, or a two-stage tree diagram to finish. Every question ends with a
line such as P(EVEN) = ____ for the answer. The answer key fills in every
grid, table and branch and gives each probability as a fraction in its
simplest form.

## How to play

A probability is a number from 0 (impossible) to 1 (certain). When every
outcome is equally likely:

    probability = (number of outcomes you want) / (number of outcomes)

- **Spinners:** count the sectors you want and divide by the number of
  sectors. When the sectors are different sizes, use their angles instead:
  a 90 degree sector is 90/360 = 1/4 of the spinner.
- **Dice:** a fair dice has six equally likely faces, 1 to 6. For "prime",
  the primes are 2, 3 and 5, so P(PRIME) = 3/6 = 1/2.
- **Bags of counters:** count the counters of each colour (the letter on
  each counter tells you its colour). P(NOT RED) = 1 - P(RED). For "red or
  blue", add the red and blue counters together.
- **Two draws:** if the first counter is put back, the second draw is just
  like the first: multiply the two probabilities. If it is kept out, there
  is one counter fewer for the second draw - and one fewer of the colour
  taken.
- **Sample-space grids:** fill in every cell (add, multiply or subtract the
  row and column numbers), then count the cells you want and divide by the
  number of cells.
- **Two-way tables:** each row adds up to its total, and so does each
  column. Use the totals to fill the gaps, then read off the count you need
  and divide by the right total. "One of the girls is chosen" means divide
  by the number of girls, not by everyone.
- **Tree diagrams:** write the probability on each branch. Multiply along a
  path to get the chance of that pair of outcomes; add the paths you want.
  The four paths always add up to 1 - a good check. "At least one red" is
  1 - P(no red).

Always cancel your fraction to its simplest form: 6/36 is 1/6.

## Purpose

Probability is a core topic of middle-school and lower-secondary maths
(grade 7 statistics and probability in the US Common Core, KS3 and GCSE in
England). These pages move from counting equally likely outcomes, through
listing outcomes systematically in grids and tables, to combining events
with tree diagrams - the progression the curricula follow - and every
answer is an exact fraction, so the method is practised without rounding.
Two-way tables also practise reading data, and conditional questions ("one
of the girls is chosen") prepare for conditional probability.

## History

Gerolamo Cardano wrote the first systematic study of chance, *Liber de Ludo
Aleae* (written about 1564, printed 1663), counting the outcomes of dice
throws. The theory proper began in 1654 with the letters between Blaise
Pascal and Pierre de Fermat on the "problem of points" - how to share the
stakes of an unfinished game. Christiaan Huygens wrote them up as the first
printed textbook on probability, *De Ratiociniis in Ludo Aleae* (1657).
Tree diagrams and two-way tables are later classroom tools for the same
counting.

## This implementation

- **Spec knobs:** `difficulty`; `mode` (`mixed`, `spinner`, `dice`, `bag`,
  `sample_space`, `two_way`, `tree`); `locale` (`us` writes "die", `uk` and
  `in` write "dice"); `count` (4-8); `width`, `height`, `line`.
- **Generation:** Kids uses equal spinners (3-6 sectors) and one dice with
  simple events; Easy adds bags (one draw) and "not" events; Medium adds
  "or" events, sample-space grids (two dice, or a 1-4 spinner and a dice)
  and two-way tables with two missing entries; Hard adds unequal spinners
  (sectors in multiples of 45 degrees), two draws with replacement, grids
  of products and differences, three missing table entries and tree
  diagrams with replacement; Expert uses sectors in multiples of 30
  degrees, draws without replacement, "at least one" and "same colour"
  trees, four missing table entries and conditional questions ("one of the
  girls is chosen"). A tree's second-stage branches are left blank to fill
  in. Questions do not repeat on a page, and each probability asked is
  different where the level allows. Single-kind pages are served at an
  honest level: sample spaces and two-way tables start at Medium and tree
  diagrams at Hard (lower requests are served there), and a dice page is
  never harder than Medium (one dice has nothing harder to ask); meta then
  reports `requested_difficulty`.
- **Solving:** the answer key fills every grid cell, every missing table
  entry and every tree branch, writes each tree path's probability, and
  gives each answer as a fraction in lowest terms.
- **Guarantees:** every answer is an exact `Rational` - favourable over
  equally likely outcomes, a sector's angle over 360 degrees, or a product
  of branch fractions - strictly between 0 and 1 and in lowest terms.
  Spinner sectors sum to one whole turn; a tree's four paths sum to 1; a
  two-way table's rows and columns add up, and its missing entries can
  always be worked out from what is shown (checked by settling one unknown
  at a time). The tests re-derive every answer from the drawing by an
  independent method: sector angles are measured from the wedge paths and
  the labels found inside each wedge (marked angles must match), counters
  are counted from the letters drawn in the bag (and must match the
  prompt) and the draws enumerated pair by pair, grid and table entries are
  read from the key cell by cell and recounted, dice events are recounted
  over the six faces with independently written rules, and tree answers
  are recounted over every ordered pair of counters. Meta reports
  `answers_checked` and each question with its answer.

---
title: "Word Problems"
blurb: "Word problems — one-, two- and three-step stories for every operation, money, measures and fractions, each answer checked from the printed numbers"
category: maths
version: "1.0.0"
---
Short maths stories, from one step to three, where every answer has been worked out twice.

## What it is

A worksheet of three to ten short stories, each ending in a question:
sharing sweets among friends, change from a shopping trip, how many vans a
school trip needs, how much tape is left on a roll. Each story has space to
show the working and an answer line such as ANSWER: ____ STICKERS. The
answer key writes the number sentences in red, one per step (6 × 10 = 60,
then 60 - 21 = 39), and fills in every answer.

Stories cover joining, taking away and comparing; equal groups, arrays,
sharing and "times as many"; division with a remainder (how many are left
over, how many whole cakes, how many vans are needed); money; lengths,
weights, capacities and minutes; and fractions of amounts. Names, money
and units follow the region: dollars, inches, feet, ounces, pounds, cups and
gallons in the US; pounds sterling and metric units in the UK; rupees,
metric units and Indian digit grouping (1,23,456) in India.

## How to play

Read the whole story before you start. Then:

1. **Find the question.** It is the last sentence. What are you asked for,
   and in what units?
2. **Pick out the numbers you need** and what each one means.
3. **Decide what to do.** Putting together or adding more means add.
   Taking away, finding what is left, or "how many more" means subtract.
   Equal groups, rows or "times as many" means multiply. Sharing equally or
   making groups of the same size means divide.
4. **Write a number sentence for each step**, work it out, and use that
   answer in the next step. A two-step story needs two number sentences.
5. **Check that your answer makes sense.** Is it bigger or smaller than
   you expected? Did you answer the question that was asked?

When a division has a remainder, read the question carefully: "how many
are left over" wants the remainder; "how many whole cakes" wants the
answer without the remainder; "how many vans are needed to take every
child" needs one more van for the children left over.

## Purpose

Word problems are where arithmetic meets real life, and every primary
curriculum asks for them: the US Common Core from kindergarten (add and
subtract within 10 to solve word problems) to grade 5 (multi-step problems
with whole numbers, fractions and decimals); England's national curriculum
from Year 1 ("solve one-step problems that involve addition and
subtraction") to Year 6 (multi-step problems in context); and the CBSE /
NCERT primary books, whose chapters are full of shop, market and school
stories. Deciding *which* operation to use is the skill being practised,
so stories of different kinds are mixed on one page rather than grouped by
operation.

## History

Story problems are as old as written mathematics. The Rhind papyrus of
Egypt (about 1550 BC) shares loaves among men; Babylonian tablets ask about
fields, grain and interest; and Alcuin of York's *Propositions to Sharpen
the Young* (about 800 AD) includes the famous river crossing with a wolf, a
goat and cabbages. Printed arithmetic books from the 1500s on taught almost
everything through problems about merchants, coins and measures. In the
twentieth century, research on how children solve them — "join", "separate",
"compare" and "part-whole" stories — shaped how they are taught today, and
Singapore's bar-model method spread worldwide as a way to draw a story
before solving it.

## This implementation

- **Spec knobs:** `difficulty`; `topic` (`mixed`, `add_subtract`,
  `multiply_divide`, `money`, `measures`, `fractions`); `steps` (0 = the
  mix suited to the level, or exactly 1, 2 or 3); `locale` (`us`, `uk`,
  `in`); `count` (3-10); `width`, `height`, `line`.
- **Generation:** stories come from a bank of 74 templates written for
  Lakolam and reviewed so that no story needs a fact it does not state.
  Each template has typed slots (two different names from a short list of
  friendly first names per region, an object such as STICKERS or MANGOES,
  numbers, money, fractions, unit words), a function that draws the numbers
  and states the answer, and a separate statement of the arithmetic as a
  postfix expression over the numbers in the order they are printed. Levels
  set the number ranges and steps: Kids adds and takes away within 20 in one
  step; Easy works within 100 with one or two steps and equal groups up to
  5; Medium within 1,000 with tables to 10 × 10 and whole-number money; Hard
  within 10,000 with two-digit factors, remainders, money to 5 cents (whole
  rupees) and fractions of amounts, up to three steps; Expert up to a
  million with three-digit factors, money to the cent and fraction answers.
  Every count printed is at least 2 (so every noun reads as a plural), and
  names already used on the page are avoided. A topic or step count that a
  level has no stories for is served at the nearest level that does (Kids
  has no multiplication, fractions start at Hard, three steps start at
  Hard); meta then records `requested_difficulty` / `requested_steps`.
- **Solving:** the answer is computed exactly with fractions by evaluating
  the template's expression step by step; each step becomes a number
  sentence on the key (with `R` for a remainder and the rounded-up or
  whole answer spelled out).
- **Guarantees:** `answers_checked` — a story is kept only when the
  template's own answer equals the expression's value, every intermediate
  value is non-negative, every whole-number division is exact, remainder
  stories really have a remainder, money is in whole cents and the answer
  fits the level's range. The tests re-solve every story from its printed
  words alone: they read the numbers out of the text, evaluate the
  expression with an independent evaluator and compare with the key; they
  also check that every template prints its numbers in order and uses all
  of them, that every template generates at every level and region it
  claims, that every printed character is in the font, and that the
  working space and answer line fit each slot.

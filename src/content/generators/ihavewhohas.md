---
title: "I Have, Who Has?"
blurb: "I Have, Who Has? — a cut-apart class card deck of maths facts that forms one closed loop"
category: maths
version: "1.1.0"
---
A cut-apart card game for the whole class: every card answers one question
and asks the next, all the way round.

## What it is

A deck of 20 to 36 cards, one per player. Each card says "I have …" with an
answer, and "Who has …?" with a question. The question on one card is
answered by exactly one other card, and the chain of questions runs through
every card in the deck before it comes back to where it started. Topics are
the four operations, mixed facts, place value, telling the time, fractions
and simple equations, each at five levels.

## How to play

- Print every page of the deck, cut along the dashed lines and hand out the
  cards — one each, or two each for a small group.
- The player with the **START** card (card 1) reads only the bottom half:
  "Who has 9 × 8?"
- Everyone works it out. The player whose card says "I have 72" reads their
  whole card aloud: "I have 72. Who has 6 × 7?"
- Play continues until the last question is answered by the START card,
  which closes the loop. Every card is read exactly once.
- Time the class and try to beat the record, or shuffle and deal again so
  everyone gets a different card.
- The answer key lists the calling order by card number, so the teacher can
  help a player who misses their turn.

## Purpose

Fluency practice that keeps every child listening: each player must work
out every answer to know whether it is theirs. It rehearses facts, mental
calculation, reading times and fractions aloud, and careful listening, and
it suits warm-ups, revision and substitute lessons.

## History

I Have, Who Has? is a long-standing classroom game, sometimes called a
loop game or chain cards, that spread through teacher resource books and
then teacher-made printables. The format works for any subject — sight
words, vocabulary, capitals — but maths facts are its most common use,
because every question has one exact answer.

## This implementation

**Spec knobs:** `topic` (`addition`, `subtraction`, `multiplication`,
`division`, `mixed`, `place_value`, `time`, `fractions`, `equations`);
`difficulty` (the grade level of the facts); `cards` (20-36);
`per_page` (6, 8, 9, 10 or 12 cards to a page); `page` (which page of the
deck, 0-based — print every page with the same seed); `locale` (`us`, `uk`,
`in` digit grouping); page `width`/`height`; `line`.

**Generation:** facts are drawn at random for the topic and level until the
deck has as many as it has cards, each with an answer no other card has —
compared by value, so 2/4 and 1/2 would count as the same
answer. The facts are put in a random order, and card *i* pairs fact *i*'s
answer with fact *i + 1*'s question; the last card's question is answered
by the first. Card 1 starts the loop; the other cards are numbered in a
shuffled order, so neighbours in the pile are not neighbours in the chain.
Levels, roughly: Kids — sums and differences to 40, the 2, 3, 4, 5 and 10
times tables, halving, 10 or 1 more and less, o'clock, quarter and half
past, missing addends; Expert — three-digit sums and differences, two-digit
by one-digit products, division by 11-25, the value of a digit in a
seven-digit number, elapsed time across the hour, adding and subtracting
fractions with unlike denominators, and two-step equations with brackets or
N on both sides. Time answers are on a 12-hour clock; fraction answers are
in simplest form.

**Solving:** nothing to solve; the deck has a correctness guarantee instead.

**Guarantees:** deterministic per seed, and every page of a deck shares one
deck and one answer key. No two cards say "I have" the same value; every
"who has" question is answered by exactly one card; following the chain
from card 1 visits every card once and returns to card 1 (one closed loop,
recorded as `one_loop` and `answers_checked` in meta). Tests prove this
from the printed words alone, for every topic and level at 20 and 36 cards:
an independent reader parses each question — arithmetic, "more than",
"the value of the 7 in …", times in words, elapsed time, fractions of
amounts, simplest form, and equations solved by trying every N — and looks
the answer up among the cards' "I have" texts. Every printed string is
checked against the font.
- **Out-of-range knobs (1.1.0+):** `cards` outside 20–36 is held to that
  range, a `per_page` that is not 6, 8, 9, 10 or 12 gets the nearest of
  those (the smaller on a tie), and a `page` past the end of the deck prints
  the last page; meta records each asked-for value as `requested_cards` /
  `requested_per_page` / `requested_page`. Such specs used to be refused.


---
title: "Ten Frames"
blurb: "Ten frames - count, make ten, write the number sentence, draw counters"
category: maths
version: "1.0.0"
---
A counting worksheet built on ten frames: count the counters, find how many
more make ten, write the number sentence, or draw the counters yourself.

## What it is

A ten frame is a box of ten squares in two rows of five. Counters placed in
the squares show a number at a glance: a full top row is five, a full frame
is ten, and two frames side by side hold up to twenty. Each problem on the
page asks one of four things:

- **How many?** Count the counters and write the number.
- **How many more to make 10?** Count the empty squares (with two frames,
  how many more make 20).
- **Write the number sentence.** Write the sum the frame shows: the two
  colours of counters (4 + 3 = 7), the counters and the empty squares
  (6 + 4 = 10), or a full frame and the rest (10 + 3 = 13).
- **Draw the counters.** Draw the number of counters asked for in the empty
  frame.

The easiest pages count up to ten in one colour, with counters filling the
top row first. Harder pages scatter the counters, use two colours, and add
two frames for the teen numbers and sums that cross ten.

## How to play

Count the counters. You do not have to count one by one: a full row is 5
and a full frame is 10, so a full top row and 2 more in the bottom row make
7.

For "how many more to make 10", count the empty squares: they are the
counters still needed to fill the frame.

For a number sentence with two colours, count each colour and write them
with a plus sign, then the total: 4 blue and 3 yellow counters make
4 + 3 = 7. With one colour, write the counters, then the empty squares,
then 10. With two frames, the full frame is 10: 10 + 3 = 13.

To draw a number, put one counter in each square, filling the top row from
left to right before the bottom row.

## Purpose

Ten frames build number sense before written sums: seeing 7 as "5 and 2
more" or "3 less than 10" without counting is the step that makes mental
arithmetic possible. The pairs that make ten, the teen numbers as "ten and
some more", and the make-ten strategy for sums such as 8 + 5 (fill the frame
with 2 of the 5, then 3 more) all come straight from the picture. The page
suits kindergarten and first grade classrooms, homeschool and early-years
workbooks.

## History

Ten frames are usually credited to the American mathematics educator Robert
Wirtz, who used them in the 1970s. They spread widely in the 1990s through
early-number programmes such as Australia's Count Me In Too and New
Zealand's Numeracy Development Projects, which built lessons around
recognising small quantities in structured arrangements. They are now a standard picture in kindergarten
and first grade curricula in the United States, the United Kingdom and
India.

## This implementation

- **Spec knobs:** `difficulty`; `tasks` (`mixed`, `how_many`, `make_ten`,
  `number_sentence`, `draw`); `frames` (`auto`, `single`, `double`); `fill`
  (`auto`, `row_first`, `scattered`); `colours` (`auto`, `one`, `two`);
  `problems` (1-9 with one frame, 1-6 with two; 0 = 6 at Kids, 8 with one
  frame, 5 with two); `locale` (`us`, `uk`, `in`: the grade tag reads
  Kindergarten / Grade 1-2 and "math", Year 1-3 and "maths", or UKG /
  Class 1-2 and "maths"); `colour` (blue and yellow counters, or black and
  open counters for black-and-white printing); `show_level`; `width`,
  `height` (Pt, default US letter); `line`.
- **Generation:** difficulty maps to grade. Kids (kindergarten): one frame,
  1 to 10 counters in one colour, filled row first; how many, draw, make
  10. Easy (kindergarten-grade 1): one frame with two-colour number
  sentences. Medium (grade 1): two frames, the teen numbers 11 to 20 as a
  full ten and some more. Hard (grade 1): two frames with scattered
  counters in two colours. Expert (grades 1-2): sums of two numbers up to 9
  that cross ten, drawn the make-ten way: the first colour, then the second
  colour filling frame one and spilling into frame two. The first frame is
  always full before the second is used. A problem is kept only if the page
  still obeys every rule and does not repeat an earlier problem; totals are
  kept different where the range allows.
- **Solving:** each answer is read straight from the model: the total, the
  empty squares (10 or 20 less the total), or the sentence x + y = z.
- **Guarantees:** deterministic per seed; the counters drawn are counted as
  they are drawn and equal the problem's total, and each colour's count
  equals its part of the sum, on the student page and the answer key
  (tested); the answer key draws every "draw" problem's counters; every
  sentence is true with both addends at least 1; "make 10" problems always
  have an empty square; no problem repeats on a page
  (`answers_checked`, `counters_checked`). Rating basis: grade level, the
  number of frames, the fill and the number of colours. Every difficulty is
  reachable with every task.

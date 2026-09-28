---
title: "Base Ten Blocks"
blurb: "Base-ten blocks — read, draw, expand and regroup place value"
category: puzzle
version: "1.0.0"
---
A place-value worksheet: count the cubes, rods, flats and big cubes, draw
numbers with them, write them in expanded form and regroup.

## What it is

Base-ten blocks are the classroom model of our number system. A small cube
is one. Ten cubes in a row make a rod, worth ten. Ten rods side by side make
a flat, worth one hundred. Ten flats stacked make a big cube, worth one
thousand. Each problem on the page is one of four kinds:

- **What number do the blocks show?** Count the blocks and write the number.
- **Draw it.** Draw a number using blocks.
- **Expanded form.** Split a number into its places (347 = 300 + 40 + 7), or
  put the places back together (4000 + 60 + 7 = 4067).
- **Regrouping.** A count with ten or more of one kind of block, such as
  2 hundreds, 14 tens and 3 ones, to be turned into one number.

The easiest pages use tens and ones up to 20; the hardest use thousands and
regroup two places at once.

## How to play

The box at the top of the page shows what each block is worth.

To find the number the blocks show, count each kind: big cubes are
thousands, flats are hundreds, rods are tens and small cubes are ones. Write
the thousands digit, then the hundreds, the tens and the ones. 3 flats,
4 rods and 7 cubes make 347.

To draw a number, draw one flat for each hundred, one rod (a tall rectangle
split into ten) for each ten and one small square for each one.

For expanded form, write what each digit is worth: in 347 the 3 is worth
300, the 4 is worth 40 and the 7 is worth 7, so 347 = 300 + 40 + 7. Going
the other way, add the parts back together.

To regroup, trade ten of a kind for one of the next kind up: 14 tens are
1 hundred and 4 tens, so 2 hundreds, 14 tens and 3 ones make 343. Ten or
more ones become tens the same way.

## Purpose

Place value is the idea every later arithmetic skill rests on: carrying and
borrowing are regrouping, and reading big numbers is expanded form in
reverse. Base-ten blocks make it concrete, and worksheets that draw them let
children practise without a box of plastic cubes. The page covers the
classic progression from teens (a ten and some ones) to four-digit numbers
and regrouping, for teachers, homeschoolers and workbook makers.

## History

Proportional place-value blocks were popularised by Zoltan Dienes in the
1950s and 1960s (they are still often called Dienes blocks), building on
Maria Montessori's earlier golden-bead materials. Drawings of cubes, rods,
flats and big cubes have been a fixture of primary maths textbooks ever
since.

## This implementation

- **Spec knobs:** `difficulty`, `tasks` (`mixed`, `show`, `draw`,
  `expanded`, `regroup`), `problems` (0 picks from the difficulty: 6 / 8 / 4
  / 4 / 3), `page_width` and `page_height` (Pt, default US letter), `line`.
- **Generation:** difficulty maps to grade level. Kids: numbers 6–20 in tens
  and ones, show and draw. Easy: 11–99, adding expanded form. Medium:
  100–999 with hundreds, adding expanded form in reverse. Hard: 100–999 with
  one regrouping trade. Expert: 1,000–9,999 with thousands cubes and two
  regrouping trades in different places. Numbers never repeat on a page.
  Blocks are drawn in a light oblique projection (a unit cube, a rod split
  into ten, a flat ruled 10 by 10, a big cube ruled on three faces), in one
  colour per place. Each picture is laid out by trying every arrangement of
  rows per place and keeping the one that allows the largest blocks in the
  problem's box; a number whose blocks would come out too small to count
  (unit cube under 3.4 Pt) is rejected and redrawn from the seed.
- **Solving:** each answer follows directly from the problem: the number is
  the sum of blocks times their place values; the expanded parts are the
  non-zero digits times their places.
- **Guarantees:** deterministic per seed; the blocks drawn for every problem
  are counted as they are drawn and equal the number (tested, for the
  student page and the answer key); every drawing stays inside its box and
  its box inside its cell (tested); regrouping problems really need
  regrouping (a place holds 10 to 19 blocks; two places at Expert); the
  answer key writes every answer and draws every "draw it" number
  (`answers_checked`). Rating basis: the places used and the number of
  regrouping trades. Every difficulty is reachable with every task.

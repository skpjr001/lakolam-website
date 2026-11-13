---
title: "Equation Crossword"
blurb: "Equation crossword — crossing sums with blanks filled from a number bank"
category: maths
version: "1.0.0"
---
A crossword made of sums: fill the empty boxes from the number bank so that
every line works out.

## What it is

A grid shaped like a crossword, but every answer is an equation. Each line,
across or down, reads like `7 + 5 = 12` or `6 × 4 − 9 = 15`: numbers in the
white boxes, signs in the grey boxes, then `=` and the answer. Where two
lines cross they share a number. Some numbers are printed; the rest of the
white boxes are empty, and the numbers that belong in them are listed in the
bank under the grid — each used exactly once. Only one way of placing them
makes every line true.

## How to play

Write a number from the bank in each empty box, crossing it off the bank as
you go. When you are done, every line across and every line down must be
correct.

- Do times (×) and divide (÷) before plus (+) and minus (−). So
  `2 + 3 × 4 = 14`, because 3 × 4 is done first. Otherwise work from left
  to right, or from top to bottom.
- Divisions always come out exactly, with nothing left over, and no line
  ever drops below zero on the way.
- Start with a line that has only one empty box: there is usually just one
  bank number that fits it. Then use the number you placed in the lines that
  cross it.
- Big answers often come from times, and an answer of 1 or 2 after a divide
  means two numbers close together.
- If you get stuck, look at the bank: a number that appears once can only go
  in one place.

Some pages have no bank. Then each line with one empty box tells you its
missing number, and that number helps the lines that cross it.

## Purpose

Arithmetic practice with a puzzle's pull. The bank turns a page of sums into
a search with a single answer, so children practise the four operations and
the order of operations while checking their own work — every crossing is a
check. The harder bands give adults a number puzzle that needs real
deduction: long lines with mixed operations, few printed numbers and a big
bank.

## History

Arithmetic crosswords, where across and down answers are sums that share
their numbers, have appeared in puzzle magazines and school workbooks for
decades under names such as math crossword, number cross and cross sums.
The version with a bank of loose numbers to place became popular in puzzle
apps and books in the 2010s and 2020s. This generator builds its own layouts
and look.

## This implementation

- **Spec knobs:** `difficulty` (Kids–Expert); `operators` (`auto` by band,
  `add_subtract`, `all`); `max_number` (largest number in any box, 10-999;
  null picks by band — 20, 30, 50, 100, 150 — and a clamped request is
  reported as `requested_max_number`); `cell` (16-80 pt) and `line`
  (0.3-4 pt), clamps reported as `requested_cell` / `requested_line`;
  `show_bank` (default true).
- **Generation:** the layout is grown on a lattice — numbers on even rows and
  columns, signs between — by laying each new equation across a number of
  one already placed, never touching another line end to end (one crossing
  preferred two times in three, at most two). Equations are then filled in
  the order they were laid: random operators from the band's set, random
  operands, and one operand tried over every value so the numbers its
  crossings already fixed still fit (no ×1, ÷1 or a ÷ a). Every number lies
  in 1..max, divisions are exact and no running total goes below zero.
  Number cells are then blanked one at a time in seed order, each kept only
  while the grid stays unique, up to the band's target. Bands: Kids 3
  equations of two numbers with + and −, numbers to 20, 3 blanks; Easy 4
  equations with ×, to 30, 5 blanks; Medium 5–6 equations with all four
  signs, to 50, 7 blanks; Hard 6–7 equations, about half with three
  numbers, to 100, 10 blanks; Expert 8–10 three-number equations, to 150,
  18 blanks.
- **Solving:** with the bank, uniqueness is an exhaustive count of bank
  placements (cap 2, 40,000-node budget; a budget-out counts as ambiguous
  and the blank is put back). Each node takes the blank with the fewest bank
  numbers that keep its equations possible — an equation with one unknown
  must have a bank number that makes it true. Without the bank, a blank is
  kept only while the equations alone settle every blank, one equation with
  one unknown at a time; that is sound because every equation is strictly
  monotone in each of its numbers, so at most one number fits.
- **Rating:** points — two per blank, one per equation, two per
  three-number equation, two for ×, three for ÷, two per doubling of the
  search nodes beyond one per blank (`rating_basis`). Kids is + and − only
  and at most 12 points; Easy to 20, Medium 21–29, Hard 30–45, Expert
  above. A page whose rating differs from the request (for example
  `operators: add_subtract` at Expert) is served in its own band with
  `requested_difficulty`.
- **Guarantees:** deterministic per seed; exactly one answer, proved by the
  generator and re-checked by an independent evaluator and search in
  `obeys()`; the bank is exactly the numbers of the blanks. Meta records
  `unique`, `difficulty`, `rating_basis`, `equations`,
  `three_number_equations`, `blanks`, `givens`, `bank`, `bank_shown`,
  `proof_nodes`, `operators`, `max_number` and the grid size. The answer key
  fills the blanks in a Solution layer. Structured data is a `grid`: the
  printed cells (numbers, signs, null), the solution, a `layout` per cell
  (`""` unused, `"n"` number, else its sign), the `blanks`, the `bank`,
  `bank_shown`, `max_number` and every equation's number cells (operands,
  then result), operators and direction.

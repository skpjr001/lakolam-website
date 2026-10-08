---
title: "Check Digits"
blurb: "Check digits and parity — ISBN, EAN, UPC and Luhn check digits, missing and swapped digits, parity bits and parity grids, every answer proved the only one"
category: maths
version: "1.0.0"
---
Book numbers, barcodes, card-style numbers and parity bits — find the check digit, the missing digit, the swap or the flipped bit.

## What it is

A worksheet on the error-detecting digits hidden in everyday numbers.
Each question shows a code in numbered boxes — an ISBN-10 or ISBN-13
book number, an EAN-13 or UPC-A product barcode, or a sixteen-digit
card-style number checked by the Luhn algorithm — and asks for its check
digit, whether it is valid, which digit is missing, or which two
neighbouring digits were swapped. Parity questions add a parity bit to
seven bits, find the byte that arrived with an error, or find the one
flipped bit in a grid whose last row and column are parity bits. A panel
at the top prints every rule the page uses. The answer key fills in every
answer and marks the swapped pair or flipped bit.

## How to play

1. Read the rule for the code in the box at the top. Positions are
   numbered from 1 on the left.
2. **ISBN-13 and EAN-13:** multiply the digits by 1, 3, 1, 3, … and add.
   **UPC-A:** multiply by 3, 1, 3, 1, … and add. The total, check digit
   included, must be a multiple of 10. To find a missing check digit, add
   up the others and choose the digit that brings the total up to the
   next multiple of 10.
3. **ISBN-10:** multiply the digits by 10, 9, 8, … down to 1 and add; the
   total must be a multiple of 11. A check digit of ten is written X.
4. **Luhn:** starting from the right, leave the last digit alone and
   double every second digit. If a double is more than 9, subtract 9. Add
   everything up; the total must be a multiple of 10.
5. **A missing digit** in the middle: work out the total without it, then
   try 0 to 9 in its place (remember its weight) until the total works.
   Exactly one digit does.
6. **A swapped pair:** the number is invalid. Swap each pair of
   neighbours in turn and check again; exactly one swap mends it.
7. **Parity:** with even parity the number of 1s, parity bit included, is
   even; with odd parity it is odd. In a parity grid, the flipped bit sits
   where the one row and the one column that fail their check cross.

## Purpose

Check digits are a favourite of liberal-arts maths courses (*For All
Practical Purposes* gives them a chapter), of computer science units on
error detection (GCSE and A-level Computer Science, CS Unplugged's "card
flip magic" parity trick) and of enrichment lessons on modular
arithmetic. They show why a weighted sum catches the two commonest typing
mistakes — one wrong digit and two neighbours swapped — and why a parity
bit catches any single flipped bit, using numbers printed on every book
and packet in the classroom.

## History

The ISBN grew out of Gordon Foster's 1966 Standard Book Numbering for the
bookseller W. H. Smith; ISO adopted the ten-digit ISBN in 1970, with a
mod-11 check digit that catches every single error and every swap of
neighbours. The Universal Product Code was first scanned on a packet of
chewing gum in Troy, Ohio, in 1974, and the European Article Number
extended it to thirteen digits; since 2007 ISBNs have been EAN-13 codes
starting 978 or 979. IBM scientist Hans Peter Luhn patented his checksum
in 1960; it now guards card numbers and phone IMEIs. Parity bits are as
old as punched tape and telegraph codes, and Richard Hamming's 1950
codes grew from them.

## This implementation

- **Spec knobs:** `difficulty`; `topic` (`mixed`, `isbn`, `barcodes`,
  `luhn`, `parity`); `count` (4-10, clamped and recorded as
  `requested_count`); `width`, `height`, `line`.
- **Generation:** codes are random digits after a plausible prefix (978
  or 979 for ISBN-13, a GS1 country prefix for EAN-13, 0 for UPC-A) with
  the check digit computed. Card-style numbers always start 0000, which no
  card network issues, so no generated number can be a real card; their
  first four digits are never altered. Easy asks for check digits of
  ISBN-13 and barcodes, whether a code is valid, and parity bits; Medium
  adds ISBN-10 (with X) and Luhn, and the byte with a parity error; Hard
  asks for a missing digit anywhere and the flipped bit in a 4 × 4 parity
  grid; Expert asks which neighbours were swapped and uses a 6 × 6 grid.
  Mixed pages give every fourth question to parity. Kids is served at
  Easy (meta `requested_difficulty`). No question repeats on a page.
- **Solving:** the only judge is the rule as printed. A missing digit is
  tried at every value (0-9, and X where allowed) and exactly one must make
  the code valid; a swapped code must be invalid and exactly one swap of
  different neighbours must make it valid (swaps a scheme cannot detect,
  such as two EAN digits that differ by 5, are rejected); a parity grid
  must fail in exactly one data row and one data column.
- **Guarantees:** `unique` and `answers_checked` — every answer is the
  only one the printed code allows. The tests check published codes
  (ISBN 978-0-306-40615-7 and 0-8044-2957-X, UPC 036000291452, EAN
  4006381333931, Luhn 79927398713), re-prove every answer with a second,
  independently written validator (ISBN-10 by the running-sum method,
  Luhn by summing the digits of doubles), show that no other single flip
  repairs a parity grid, catch a changed answer, and keep every box inside
  its question.

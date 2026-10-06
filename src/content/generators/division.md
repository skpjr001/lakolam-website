---
title: "Division"
blurb: "Division worksheets — facts, short and long division with remainders or decimal answers, worked steps on the key"
category: maths
version: "1.1.0"
---
Division practice from the facts of the times tables to long division with
remainders and decimal answers, in the written layout your school uses,
with every step of the working shown on the answer key.

## What it is

A worksheet of division problems with a NAME and DATE line, numbered
problems in a tidy grid, and an answer key. There are three kinds of page.
Division facts are written on one line ("56 ÷ 8 = ____"). Short division
uses the "bus stop": the divisor outside, the number being divided under
the bar, the answer written on top. Long division uses the same bracket
(the American and British layout), the Indian layout "7 ) 945 ( 135", or
the continental European layout "945 : 7 = 135", with room under each
problem for the working. Problems can come out exactly, leave a remainder
("135 R 2"), or be divided on past the decimal point to an answer such as
5.75. An optional faint grid of boxes, like squared paper, keeps every
digit in its column. The answer key shows every quotient in red and, if
wanted, the whole method: each subtraction and each digit brought down for
long division, or each small carried remainder for short division.

## How to play

For a fact, think of the times table: 56 ÷ 8 asks "how many eights make
56?", so the answer is 7. If the number does not share out exactly, write
how many times it goes and what is left over, like 7 R 3.

For short division, work from the left. Ask how many times the divisor
goes into the first digit; write that above it, and write what is left
over as a small digit in front of the next digit. Carry on to the right,
each time dividing the number made by the small carried digit and the
digit under the bar.

For long division, work from the left in four steps, over and over:
divide (how many times does the divisor go into the number so far? write
it on top), multiply (write that many divisors underneath), subtract (the
difference must be smaller than the divisor), and bring down the next
digit beside the difference. When there are no digits left, what remains
is the remainder. If the divisor does not go into the number so far, write
0 on top and bring down the next digit too.

When the page asks for decimal places, the zeros after the decimal point
have been written for you: keep dividing into them, and put the decimal
point in the answer straight above the one below. Each answer finishes
exactly at the number of places the page says.

Check an answer by multiplying: the quotient times the divisor, plus the
remainder, gives back the number you started with.

## Purpose

Division is the hardest of the four written methods because it runs the
other three inside it: estimating with the times tables, multiplying,
subtracting and keeping place value straight. Fact pages build the recall
the method depends on; short division practises the idea of carrying a
remainder to the next place; long division lays every step out so a
mistake can be found. Pages that either never, sometimes or always leave a
remainder let a teacher introduce remainders gently, and decimal pages
show that division does not have to stop at the ones. A worked answer key
lets a pupil or parent find exactly which step went wrong.

## History

The long division layout taught today goes back to Henry Briggs and the
printed arithmetic books of the early 1600s; before it, Europe used the
"galley" or scratch method inherited from Indian and Arabic arithmetic,
which crossed digits out as it went. The bracket with the answer on top is
the American and British form; much of continental Europe writes the
problem on one line with a colon for divide, and schools in India write
the divisor and quotient either side of the dividend in round brackets.
Short division, the compact form in which only the remainders are
written, is the standard written method for one-digit divisors in English
primary schools.

## This implementation

- **Spec knobs:** `difficulty`; `method` (`facts`, `short`, `long`);
  `long_style` (`bracket`, `indian`, `european`; unset follows the locale:
  Indian for `in`, bracket otherwise); `divisor_digits` (1-3, short
  division 1-2); `dividend_digits` (1-7, at least the divisor's);
  `remainders` (`none`, `some`, `all`); `decimal_places` (0-3: divide on
  past the point to exactly that many places; remainders must then be
  `none`); `table_max` (facts: largest divisor and quotient, 5-12);
  `problems` (0 = the most of a few tidy counts that fit the page at a
  comfortable size); `show_steps` (the working on the key); `grid_support`
  (squared-paper boxes); `large_print`; `locale` (`us`, `uk`, `in`: the
  default written method and layout, "work" or "working", digit grouping
  on facts); page `width`, `height`, `line`.
- **Difficulty (grade):** Kids = division facts to 10 × 10, no remainders
  (grade 3); Easy = 3-digit ÷ 1-digit, no remainders (grade 4); Medium =
  4-digit ÷ 1-digit, half the problems with remainders (grade 4-5); Hard =
  4-digit ÷ 2-digit, half with remainders (grade 5); Expert = 3-digit ÷
  2-digit with the quotient to exactly 2 decimal places (grade 6). The
  method follows the locale: short division for 1-digit divisors in the
  UK, long division otherwise. Any knob can be set directly instead.
- **Generation:** every problem is built backwards: a divisor (never 1 or
  a power of ten) and a quotient are drawn, then a remainder if the problem
  should have one (1 up to the divisor minus 1), and the dividend is
  divisor × quotient + remainder, redrawn until it has the page's number of
  digits. For decimal places k the quotient in units of the k-th place is
  a multiple of 10^k / gcd(divisor, 10^k) that does not end in 0, so the
  dividend is whole and the quotient ends exactly at the k-th place;
  divisors that can never do this (÷ 3 never stops) are not used. The page
  draws its problems without repeats under an attempt budget, and refuses
  with a clear message when fewer different problems exist than were asked
  for, when the problems would not fit the page at a readable size, or
  when the request is impossible (a remainder with decimal places, a
  divisor longer than the dividend).
- **Solving:** answers are exact whole numbers or exact decimals. The long
  division working is the written algorithm on the dividend's digits: the
  first product sits under the fewest leading digits the divisor goes
  into, each difference is followed by the digits brought down, and a
  quotient digit 0 gets no product line (its digit is simply brought down
  as well). Every digit of the dividend, the quotient and the working is
  drawn at the centre of its place-value column, and the decimal point
  sits between two columns, so the working lines up.
- **Guarantees:** deterministic per seed. For every problem, dividend =
  divisor × quotient + remainder with 0 ≤ remainder < divisor; the
  remainder mode holds problem by problem (`none`: all exact; `all`: every
  problem leaves a remainder; `some`: exactly half, rounded up); every
  number has the page's digit count; decimal quotients are exact (checked
  with exact rational arithmetic) and end at exactly the page's number of
  places; no two problems on a page are the same. The working drawn on the
  key is replayed in the tests from its printed texts alone — each product
  a multiple of the divisor, each difference below it, each brought-down
  line reading "difference then the next digits", no skipped column the
  divisor would have gone into — and must give back the quotient and
  remainder; short-division carries are replayed the same way. Meta
  records `answers_checked`, `steps_checked`, `no_duplicates`, the grade
  and `rating_basis: method_digits_remainders_and_decimal_places`. A page
  takes a few milliseconds.
- **Out-of-range knobs (1.1.0+):** a request the method cannot print is
  brought into range instead of refused, and meta names each moved knob in
  `adjusted`: `divisor_digits` to 1–3 (1–2 for short division),
  `dividend_digits` to 1–7 and at least the divisor's, `decimal_places` to
  0–3 and to at most 8 written digits (0 for facts), `table_max` to 5–12,
  `problems` to the page's maximum and lowered to what fits, and remainders
  are dropped when dividing on to decimal places. A request with too few
  different problems is still refused.

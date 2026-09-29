---
title: "Multiplication"
blurb: "Multiplication worksheets — standard column, lattice, area model, partial products and times-table facts"
category: maths
version: "1.0.0"
---
Multi-digit multiplication practice in four written methods (standard
columns, lattice, area model and partial products) plus times-table facts,
with every step of the working shown on the answer key.

## What it is

A worksheet of multiplication problems with a NAME and DATE line, numbered
problems in a tidy grid, and an answer key. The same kind of problem can be
set in four ways:

- **Standard (long multiplication):** the numbers stacked in columns, with
  room above for carried digits, one row for each digit of the bottom
  number, and a line for the total.
- **Lattice:** a grid with the top number's digits across the top and the
  bottom number's digits down the right side, each box split by a diagonal,
  and the diagonals running out past the grid where the answer is written.
- **Area model** (called the grid method in the UK and the box method in
  India): the top number split into hundreds, tens and ones across the top
  of a box, the bottom number split down its side, and a space after each
  row for its total.
- **Partial products:** the numbers stacked in columns, then one line for
  each pair of parts, each labelled with what to multiply ("20 × 40").

A facts page practises the times tables from 0 to 12 instead: mixed facts or
a single table, on one line ("7 × 8 = ____") or in columns. The answer key
shows every product in red, and with it the working: the rows and carries
of long multiplication, the digits in every lattice box and diagonal, every
box and row total of the area model, and every partial product.

## How to play

Multiply the numbers in each problem, using the method on the page.

**Standard.** Multiply the top number by the ones digit of the bottom
number, starting from the right; write the ones digit of each product and
carry the tens to the next column. Then multiply by the tens digit on the
next row, starting with a 0 in the ones place, and so on for each digit.
Add the rows for the answer. Cross out old carries before starting a new
row.

**Lattice.** Multiply the digit at the top of each column by the digit at
the right of each row, and write the product in that box: tens above the
diagonal, ones below it (7 × 8 = 56 goes in as 5 and 6; 2 × 3 = 06). Then
add along each diagonal, starting at the bottom right. Write the ones digit
of each diagonal's sum at its end, and carry any tens into the next
diagonal. Read the answer down the left side and along the bottom.

**Area model.** Multiply the number at the top of each column by the
number at the left of each row, and write the product in the box where they
meet (40 × 20 = 800: multiply 4 × 2 and write both zeros). Add each row and
write its total after the equals sign, then add the row totals for the
answer.

**Partial products.** Work out each product named beside a line and write
it there, lined up by place value. Add all the lines for the answer.

**Facts.** Write each product. Say the fact to yourself as you write it.

## Purpose

Multi-digit multiplication is where place value, the times tables and
column addition all meet, and a child who is shaky on any one of them gets
lost. The area model and partial products keep the place value in view
(40 × 20 is 800, not 8); the lattice separates the times-table facts from
the adding; long multiplication is the fast, compact method pupils are
expected to reach by grades 5 and 6 (Years 5 and 6 in England). Setting the
same problems in different methods helps children connect them, and an
answer key that shows every step lets a teacher or parent see exactly where
a mistake crept in.

## History

Lattice multiplication, the "gelosia" method named after lattice window
screens, was brought to Europe in Fibonacci's Liber Abaci (1202) from
Arabic and Indian arithmetic and was the usual method in Europe for
centuries; Napier's bones (1617) are a lattice cut into rods. The column
method we now call long multiplication spread with printed arithmetic books
and became the standard school method in the 1800s. The area (box or grid)
model and partial products were promoted by reform curricula from the
1990s as bridges to it: the UK's National Numeracy Strategy made the grid
method a standard step in 1999, and the US Common Core standards (2010)
name area models for grade 4, with the standard algorithm expected by
grade 5.

## This implementation

- **Spec knobs:** `difficulty`; `method` (`standard`, `lattice`, `area`,
  `partial`, `facts`); `digits` (top and bottom factor digits, e.g. `[3, 2]`:
  top 1-5, bottom 1-4 and no longer than the top); `regrouping` (`none`,
  `some`, `all`, `every`); `layout` (`vertical` or `horizontal`, for the
  standard method and facts); `problems` (1-40, 1-20 in large print; 0 =
  as many as fit at a readable size); `table` (facts: one times table
  0-12); `max_factor` (facts: 1-12) and `min_factor` (mixed facts);
  `large_print`; `grid_support` (faint digit boxes in column layouts);
  `show_carries` (on the standard key); `locale` (`us`, `uk`, `in`:
  regroup / exchange / carry, area model / grid method / box method, and
  1,234,567 or 12,34,567 grouping for numbers of five digits and more
  outside columns); page `width`, `height`, `line`.
- **Difficulty (grade):** Kids = 2-digit × 1-digit, half the problems
  regroup (grade 3); Easy = 3-digit × 1-digit (grade 4); Medium = 2-digit ×
  2-digit (grade 4); Hard = 3-digit × 2-digit (grade 5); Expert = 4-digit ×
  3-digit (grade 6); from Easy up every problem regroups. Facts: factors
  0-5 (Kids), 1-10 (Easy), 2-12 (Medium and up); a focus table always runs
  from × 0 to × max. Digits, regrouping and factor ranges can be set
  directly instead. The method does not change the problems, only how they
  are set out.
- **Generation:** "regrouping" is judged on the standard method: a problem
  regroups when a carry has to be written while multiplying (a digit
  product plus carry of ten or more in any column but the leftmost; for a
  one-digit top number, a product of ten or more) or while adding the rows.
  `none` means no digit step ever reaches ten and the rows add without
  carrying; `every` means every digit step of every row reaches ten. The
  bottom number is drawn first (one-digit multipliers are 2-9); the top
  number is then built one column at a time from the ones, each digit
  chosen so that every row's step in that column carries or not as
  required, and the finished problem is re-checked with the shared column
  analysis. Zeros are kept rare so pages are not full of trivial columns.
  Problems are drawn without repeats (34 × 57 and 57 × 34 count as the same
  problem); facts pages choose from the full list of facts. The page is
  refused with a clear message when fewer different problems exist than
  were asked for (a table has 13 facts), or when the problems would not fit
  the page at a readable size (checked with the widest possible problems;
  an automatic count takes the most that fit).
- **Solving:** each method is worked digit by digit the way a pupil does
  it: standard rows with their carries (a zero digit gives a row of zeros)
  added in written columns; lattice boxes and diagonal sums with carries;
  area-model boxes from leading digits and zeros, row totals; the partial
  products and their sum.
- **Guarantees:** deterministic per seed. Every answer is the exact
  product. Every method's working adds up to it, checked independently of
  the methods themselves: each standard row equals the top number times its
  digit, shifted, and the rows sum to the product; the lattice boxes, taken
  by place, sum to the product and the digits read along the diagonals are
  the product; the area-model boxes and the row totals each sum to the
  product and each row total is the top number times that row's part; the
  partial products sum to the product. Every top factor has exactly its
  number of digits, and so does every bottom factor. No two problems on a
  page are the same pair in either order. Regrouping holds per problem
  (`some`: exactly half the problems, rounded up, regroup and the rest never
  reach ten). All of these are proven in the tests for every shape from
  1 × 1 to 5 × 4, including thousands of random products with zeros. Meta
  records `answers_checked`, `working_checked`, `no_duplicates`, the grade
  and `rating_basis` (`factor_digits_and_regrouping`, or
  `times_table_range` for facts). A page takes a few milliseconds. Large
  area models (5 × 4 in large print) do not fit a page and are refused;
  timed fact drills belong to the timed-test pages.

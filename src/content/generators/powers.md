---
title: "Powers and Roots"
blurb: "Powers and roots — squares, cubes, roots, exponents, powers of ten, estimating roots, scientific notation"
category: maths
version: "1.0.0"
---
Squares, cubes and roots, exponents, powers of ten, estimating roots and
scientific notation, from times-table squares to numbers in standard form.

## What it is

A worksheet with a NAME and DATE line and two or three titled sections of
numbered one-line problems, or a whole page of one kind. Powers are written
the way a textbook writes them, with the exponent as a small raised
numeral, and roots with a proper root sign (a small 3 in its notch for a
cube root). Sections ask you to work out squares, cubes and other powers;
find square and cube roots; write a repeated product as a power or fill in
a missing exponent; work with powers of ten; say which two whole numbers a
root lies between; and move between ordinary numbers and scientific
notation. Every root asked for is a whole number. The answer key shows
every answer in red, including the raised exponents.

## How to use it

**Powers.** The small raised number says how many times the big number is
multiplied by itself: 4 cubed is 4 x 4 x 4 = 64. To write a product as a
power, count how many equal factors there are. For a missing exponent,
keep multiplying the number by itself and count the steps until you reach
the value.

**Roots.** The square root of a number is the number that, times itself,
makes it: the square root of 49 is 7. The cube root is the number that,
used three times, makes it: the cube root of 64 is 4. Knowing the first
fifteen square numbers and ten cube numbers by heart makes these quick.

**Estimating roots.** When a number is not a perfect square, find the two
square numbers either side of it. 50 lies between 49 and 64, so its square
root lies between 7 and 8.

**Powers of ten.** 10 to the power 4 is a 1 followed by four zeros:
10,000. Multiplying by 10 to the power 3 moves every digit three places to
the left. A negative power moves them to the right: 10 to the power -2 is
0.01.

**Scientific notation** (standard form in the UK and India) writes a number
as a number from 1 up to (but not including) 10, times a power of ten.
Place the decimal point after the first non-zero digit and count how many
places it moved: 45,000 = 4.5 x 10 to the power 4, and 0.0063 = 6.3 x 10
to the power -3. To go back, move the point that many places.

## Purpose

Powers and roots connect multiplication to area and volume (a square of
side 7 has area 7 squared; a cube of side 4 has volume 4 cubed), underpin
place value through the powers of ten, and prepare students for algebra,
Pythagoras and the very large and very small numbers of science. Estimating
roots between whole numbers builds number sense for irrational numbers
before calculators take over.

## History

Babylonian scribes kept tables of squares and computed square roots on
clay tablets nearly 4,000 years ago; the tablet YBC 7289 gives the square
root of 2 to six decimal places. Archimedes counted the grains of sand
that would fill the universe using what amounts to powers of ten. The
raised-exponent notation comes from Descartes (1637), and the root sign
from Christoph Rudolff (1525). Scientific notation became standard in the
twentieth century as physics and astronomy needed to write numbers like
6.02 x 10 to the power 23.

## This implementation

- **Spec knobs:** `difficulty`; `task` (`mixed`, `squares`, `roots`,
  `exponents`, `powers_of_ten`, `estimate`, `scientific`); `problems` for
  a single-task page (1-40, 0 = 16, or all the level has when fewer;
  bases and roots start at 2); `locale` (`us`: exponents and
  scientific notation; `uk`: indices and standard form; `in`: exponents,
  standard form and 12,34,567 digit grouping; numbers group from five
  digits); page `width`, `height`, `line`.
- **Difficulty (grade):** Kids (grade 5) = squares to 12 x 12, cubes to 4,
  powers of ten to a million, whole-number times powers of ten; Easy
  (grade 6) = square roots to 144, cube roots to 125, writing products as
  powers; Medium (grade 7) = squares to 15, cubes to 6, other powers to
  1000, missing exponents; Hard (grade 8) = squares 11-20, cube roots to
  1000, estimating square roots to 300, negative powers of ten and decimal
  coefficients; Expert (grade 8-9) = squares to 30, cube roots to 1728,
  estimating square roots to 1000 and cube roots to 500, scientific
  notation with exponents from -5 to 9 and up to three significant digits.
  A mixed page has these sections: Kids squares and powers of ten; Easy
  squares, roots, exponents; Medium squares and powers, roots, exponents;
  Hard roots, estimating, exponents; Expert estimating, scientific
  notation, powers of ten. Each task on its own uses the level's numbers.
- **Generation:** every problem a level allows is listed (roots are built
  backwards from the root, so every radicand is a perfect square or cube;
  estimation radicands are exactly the non-perfect ones) and the page
  draws the requested number without repeats. Asking for more different
  problems than a level has, or for more than fit the page, is refused
  with a clear message.
- **Solving:** whole-number powers by exact integer arithmetic; powers of
  ten and scientific notation with exact decimals (a scaled integer, never
  floating point).
- **Guarantees:** deterministic per seed. Every answer is re-derived a
  different way before the page is drawn: powers by repeated
  multiplication; each root raised back to its power gives the radicand,
  and the neighbouring whole numbers do not; a missing exponent by
  counting multiplications until the value is reached; each estimate
  satisfies a^k < n < (a+1)^k and n is not a perfect power; a power of ten
  or a scientific-notation number is read off its own digit string (its
  significant digits and exponent must equal the mantissa, which lies in
  [1, 10), and the exponent); coefficient x 10^e by exact fractions. Tests
  prove these across every task and level, and check the estimates once
  more with floating-point roots. No problem repeats within a section.
  Meta records `answers_checked`, `no_duplicates`, the grade,
  `rating_basis: number_size_and_skill`, and every question and answer.
  A page takes a few milliseconds.

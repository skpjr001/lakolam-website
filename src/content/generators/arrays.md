---
title: "Arrays"
blurb: "Multiplication arrays - rows of, repeated addition, turned arrays and sharing"
category: maths
version: "1.0.0"
---
A multiplication worksheet of arrays: rows of dots, stars, hearts and
squares to count, add, multiply, turn round and share into equal groups.

## What it is

An array is a set of objects arranged in rows, with the same number in
every row. Three rows of four stars show 3 x 4 = 12 at a glance, and the
same picture turned on its side shows 4 x 3. Each problem on the page is one
of four kinds:

- **Rows of.** Write how many rows there are, how many are in each row, and
  how many there are in all: 3 rows of 4 = 12.
- **Add the rows, then multiply.** Add one row at a time (4 + 4 + 4 = 12),
  then write it as groups: 3 groups of 4 = 12.
- **Turned arrays.** Two arrays, one the other turned round. Write a
  multiplication for each: 3 x 4 = 12 and 4 x 3 = 12.
- **Sharing.** A row of objects to share equally into circles, then the
  division: 12 shared into 3 groups is 12 / 3 = 4, with 4 in each group.

The easiest pages use two or three rows of up to five; the hardest use
arrays up to ten rows of twelve and sharing into as many as eight groups.

## How to play

Count the rows going down, then count how many are in one row going
across. Every row has the same number, so you only need to count one row.

For "rows of", write the number of rows, then the number in each row, then
the total. To find the total, count on in steps: 4, 8, 12.

For "add the rows", write the number in each row once for every row, add
them up, then write the same thing as groups: 4 + 4 + 4 is 3 groups of 4.

For turned arrays, write a multiplication for each picture. Both answers
are the same: turning an array round does not change how many there are.

For sharing, share the objects out one at a time into the circles, like
dealing cards, until none are left. You can cross each one off as you draw
it in a circle. Every circle ends up with the same number. Write the
division and how many are in each group.

## Purpose

Arrays turn multiplication from a list of facts into something a child can
see: equal rows, repeated addition, and the fact that 3 x 4 and 4 x 3 are
the same number of objects. Sharing into equal groups is the first meaning
of division, and doing both on one page shows that the two are opposites.
The same picture later becomes the area model for multiplying larger
numbers. The page suits second and third grade (Years 3 and 4 in the UK),
with an easier level for younger children meeting equal groups.

## History

Rectangular arrays of counters and dots have been used to teach
multiplication for well over a century; they appear in nineteenth-century
object-lesson teaching and in Montessori's bead materials. Modern
curricula make them explicit: the United States Common Core standards
introduce arrays up to 5 by 5 with repeated addition in grade 2 and use them
for multiplication and division in grade 3, and the English National
Curriculum uses arrays and "lots of" language from Year 2.

## This implementation

- **Spec knobs:** `difficulty`; `tasks` (`mixed`, `rows_of`,
  `repeated_addition`, `commutative`, `sharing`); `objects` (`mixed`,
  `dots`, `stars`, `hearts`, `squares`); `problems` (1-8, 0 = 5, or 4 at
  Expert); `locale` (`us`: "groups of", Kindergarten / Grade 1-3 and "math";
  `uk`: "lots of", Year 1-4 and "maths"; `in`: "groups of", UKG / Class 1-3
  and "maths"); `colour` (coloured objects, or black and white);
  `show_level`; `width`, `height` (Pt, default US letter); `line`.
- **Generation:** difficulty maps to grade. Kids (kindergarten-grade 1):
  2 or 3 rows of 2 to 5, sharing into 2 or 3 groups of up to 4. Easy
  (grade 2): arrays to 5 x 5, rows of, repeated addition and sharing.
  Medium (grades 2-3): arrays to 6 x 6, with turned arrays. Hard (grade 3):
  arrays to 8 rows of 10, sharing into up to 6 groups. Expert (grade 3):
  arrays to 10 rows of 12, sharing up to 8 groups of 9. Repeated addition
  keeps to six rows and turned arrays to 8 x 8 so the sentence and the
  picture stay readable. A problem is kept only if the page still obeys
  every rule and does not repeat an earlier problem; products are kept
  different where the range allows, and when a small range runs out of new
  problems the next size up is used.
- **Solving:** answers are exact whole-number products and quotients;
  sharing problems are built as groups times the number in each group, so
  they always divide exactly.
- **Guarantees:** deterministic per seed; the objects drawn in every array
  are counted as they are drawn and equal rows x columns (a turned pair
  draws both arrays in full); the sharing row holds exactly the total; the
  answer key draws the same number in every circle, and the circles add up
  to the total (tested); repeated additions add up to the product and
  turned arrays give the same product both ways; every array has at least 2
  rows and 2 columns; no problem repeats on a page (`answers_checked`,
  `objects_counted`). Rating basis: grade level and array size. Every
  difficulty is reachable with every task.

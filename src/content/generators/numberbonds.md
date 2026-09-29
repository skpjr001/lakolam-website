---
title: "Number Bonds"
blurb: "Number bonds - bonds, part-part-whole, bar models and fact-family houses"
category: maths
version: "1.0.0"
---
A worksheet of number bonds, part-part-whole boxes, bar models and
fact-family houses, each with one number missing.

## What it is

A number bond shows how a number splits into parts: 10 is 7 and 3. The page
draws the same idea four ways:

- **Number bond.** A big circle for the whole, joined by lines to two, three
  or four circles for the parts.
- **Part-part-whole.** A long box for the whole sitting on top of smaller
  boxes for the parts.
- **Bar model.** A bar for the whole over a bar cut into the parts, each
  part drawn about as long as its size.
- **Fact family house.** The whole sits in the roof and the two parts in the
  windows. Beside the house are four facts to write: two adding and two
  taking away.

In every picture one number is missing. The easiest pages use numbers to
10; the hardest use numbers to 100 in three or four parts, and decimals that
make 1.

## How to play

Look at the numbers you have.

If the whole is missing, add the parts: 6 and 4 make 10, so write 10 in the
big circle (or the top box, or the top bar).

If a part is missing, start with the whole and take away the parts you can
see: the whole is 10 and one part is 6, so the missing part is 10 - 6 = 4.
With three parts, take away both of the parts you can see.

For a fact family house, first fill in the missing number, then write the
four facts that use the three numbers. For 3, 7 and 10 they are:
3 + 7 = 10, 7 + 3 = 10, 10 - 3 = 7 and 10 - 7 = 3.

Decimal bonds work the same way: 0.3 and 0.7 make 1.

## Purpose

Knowing number bonds by heart, especially the pairs that make 10, 20 and
100, is the foundation of mental addition and subtraction: 8 + 5 is easy
once you know that 8 needs 2 more to make 10. Seeing the whole and its parts
at the same time also shows that addition and subtraction are two views of
one fact, which is exactly what a fact family writes down. The bar model
grows into the bar diagrams used for word problems in later grades.

## History

Number bonds are the heart of the Singapore mathematics approach, whose
textbooks drew the whole-and-parts circles from the 1980s onward; its
success in international comparisons carried the picture into schools
across the United States, the United Kingdom and India. The bar model comes
from the same curriculum. Part-part-whole boxes and fact families (often
drawn as triangles or houses) were already long-standing staples of American
and British primary classrooms.

## This implementation

- **Spec knobs:** `difficulty`; `model` (`mixed`, `bond`, `part_part_whole`,
  `bar`, `fact_family`); `focus` (`auto`, `within10`, `within20`,
  `within50`, `within100`, `make_ten`, `make_twenty`, `make_hundred`,
  `make_one`); `parts` (2-4, 0 = from the difficulty); `problems` (1-12,
  0 = 6 at Kids, 8 otherwise); `locale` (`us`, `uk`, `in`: the grade tag
  reads Kindergarten / Grade 1-3 and "math", Year 1-4 and "maths", or
  UKG / Class 1-3 and "maths"); `colour` (soft fills, or black and white);
  `show_level`; `width`, `height` (Pt, default US letter); `line`.
- **Generation:** difficulty maps to grade. Kids (kindergarten): wholes 3 to
  10, two parts, bonds and part-part-whole boxes. Easy (grade 1): wholes to
  20 and make 10, with fact families. Medium (grades 1-2): make 10, make 20
  and wholes to 20, one bond in three with three parts, bar models. Hard
  (grade 2): wholes 20 to 100, complements to 100 in fives, two or three
  parts. Expert (grade 3): wholes to 100 and complements to 100 in ones,
  two to four parts, and decimals making 1 (hundredths in fives). The
  whole is drawn first, then the parts are cut at distinct random points,
  so every part is at least one step; one slot is hidden at random. A new
  bond is kept only if the page still obeys every rule; when a small pool
  runs dry (make 10 in two parts has only nine bonds), a fact family
  becomes a bond and a bond takes one more part.
- **Solving:** the hidden number is the sum of the parts, or the whole less
  the parts shown. Decimals are held as whole numbers of tenths or
  hundredths, so every sum is exact.
- **Guarantees:** deterministic per seed; the parts of every bond add up to
  the whole exactly; the missing number is the only value that fits (tested
  by trying every candidate) and is never negative; every part is at least
  1 (0.1 or 0.05 for decimals); fact families use two different parts and
  their four facts are all true; no bond repeats on a page (same whole and
  parts in the same order), and a fact family's three numbers never appear
  again as a bond (`answers_checked`, `no_duplicates`). Rating basis: grade
  level, the size of the whole and the number of parts. Every difficulty is
  reachable with every model and focus.

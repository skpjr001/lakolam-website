---
title: "Order of Operations"
blurb: "Order of operations — PEMDAS / BIDMAS / BODMAS worksheets with step-by-step keys"
category: maths
version: "1.0.0"
---
PEMDAS, BIDMAS or BODMAS practice: expressions of two to six steps, with
brackets that matter, powers at the higher levels, and an answer key that
works every problem one step at a time.

## What it is

A worksheet of numbered expressions such as "(20 - 110 ÷ 10) ÷ 3" or
"14 - [4 ÷ (6 - 4)]²", each followed by writing lines, one for every step,
the last one darker for the answer. The header names the rule the page
uses: PEMDAS in the US, BIDMAS in the UK and BODMAS in India. Harder pages
add powers (written as small raised numbers), nested brackets (round inside
square), negative numbers or fractions. The answer key writes out the
working in red, one operation per line, ending with the answer.

## How to play

Work out each expression in the right order, doing one step on each line:

1. **Brackets** (parentheses) first. With brackets inside brackets, start
   with the innermost pair.
2. **Powers** next (exponents, indices or orders): 5² means 5 × 5.
3. **Multiply and divide**, working from left to right: they have the same
   rank, so do whichever comes first.
4. **Add and subtract**, again from left to right.

Copy the rest of the expression unchanged on each line, so every line is
one step shorter than the one above. The last line is the answer. A
negative number in brackets, such as (-3), is just a number: its brackets
only keep the minus sign apart from the sign in front of it.

## Purpose

The order of operations is a convention, not something a child can work
out, so it needs practice until it is automatic. Problems without brackets
here are always ones where working straight from left to right gives the
wrong answer, so a child who ignores the rule finds out; problems with
brackets only have brackets that change the answer, so every pair has to
be taken seriously. Writing one step per line makes the working easy to
check and shows exactly where a mistake happened. Powers, negatives and
fractions carry the same rule into pre-algebra.

## History

Mathematicians settled on doing multiplication before addition during the
growth of algebra in the 1500s and 1600s, when writing "3 + 4 × 5" without
brackets needed an agreed reading. The school mnemonics came much later:
"Please Excuse My Dear Aunt Sally" (PEMDAS) in the United States from the
early twentieth century, and BODMAS and BIDMAS ("Brackets, Orders/Indices,
Division, Multiplication, Addition, Subtraction") in Britain, India and
much of the Commonwealth. All of them describe the same rule; multiply and
divide share a rank, and so do add and subtract.

## This implementation

- **Spec knobs:** `difficulty`; `numbers` (`whole`, `integers` or
  `fractions`); `steps` (2-6 operations per problem, 0 = from difficulty);
  `exponents`; `brackets` (`none`, `needed`, or `extra`, which also adds
  one deliberately redundant pair where a problem allows it); `show_steps`
  (working on the key, or the answer only); `problems` (1-16, 0 = from
  difficulty, fewer when long problems need the room); `locale` (`us`
  PEMDAS and parentheses, `uk` BIDMAS and indices, `in` BODMAS and orders);
  page `width`, `height`, `line`.
- **Difficulty (grade):** Kids = 2 steps (grade 3-4); Easy = 3 steps
  (4-5); Medium = 3-4 steps with nested brackets (5-6); Hard = 4-5 steps
  with powers (6-7); Expert = 5-6 steps with powers and negative integers
  (7-8). Any level can switch to fractions or integers. Half the problems
  have brackets and half do not; at Hard and Expert half have a power.
  `rating_basis: steps_brackets_exponents_and_numbers`.
- **Generation:** each problem is an evaluation tree with the requested
  number of operations, filled bottom-up so the arithmetic is clean: a
  divisor is picked among the divisors of what it divides, a whole-number
  subtraction never goes below zero, powers stay small (squares to 12²,
  cubes to 5³, 2⁴ and 3⁴), and nothing is multiplied or divided by 0 or 1.
  The tree is printed with the fewest brackets that keep its structure
  (a child is bracketed when its operation ranks lower than its parent's,
  or ties with it on the right); negative numbers are bracketed only where
  a sign sits in front of them or a power follows. No operation takes more
  than half the steps, and no problem repeats on a page.
- **Solving:** the key reduces the tree one operation at a time: the
  deepest bracket first, then powers, then × and ÷, then + and -, each rank
  from left to right, printing the whole expression after each step.
- **Guarantees:** deterministic per seed. Every intermediate value is a
  whole number (at or above zero on `whole` pages, any sign on `integers`
  pages) or, with fractions, an exact non-negative fraction; divisions are
  exact and never by zero. The printed text, read back by an independent
  shunting-yard parser in the tests, evaluates to the key's answer, and so
  does every line of the working. Every bracket pair is needed: removing
  any one pair changes the answer (re-checked on the printed text in the
  tests), except the marked redundant pairs in `extra` mode. Every problem
  without brackets gives a different answer when worked strictly left to
  right. Integer pages have a negative number in every problem. A page
  takes a few milliseconds (fractions up to ~0.1 s).

---
title: "Number Bases"
blurb: "Number bases worksheet — binary place value, binary, hexadecimal and base-n conversion, and addition in other bases"
category: maths
version: "1.1.0"
---
Binary, hexadecimal and other bases: read a place-value chart, convert, and add in columns.

## What it is

A worksheet of four to twelve questions on numbers written in other bases.
A small number after a number gives its base: 1011₂ is binary, 2F₁₆ is
hexadecimal, 212₃ is base 3. Questions read a binary place-value chart,
convert between binary, denary (decimal) and hexadecimal, between denary and
bases 3 to 9, or from one base straight to another, and add two numbers in
columns in binary, hexadecimal or another base. The answer key fills in
every answer, and for additions also writes the carries above the columns.

## How to play

In base 10 the columns are worth 1, 10, 100, 1000 … In base 2 they are
worth 1, 2, 4, 8, 16 … (each column is worth twice the one to its right);
in base 16 they are worth 1, 16, 256 …; in base n, 1, n, n × n …

- **To base 10:** multiply each digit by its column's value and add.
  1011₂ = 8 + 0 + 2 + 1 = 11. 2F₁₆ = 2 × 16 + 15 = 47.
- **From base 10:** divide by the base again and again, writing down the
  remainders; read the remainders from the last to the first. 13 ÷ 2 = 6
  r 1, 6 ÷ 2 = 3 r 0, 3 ÷ 2 = 1 r 1, 1 ÷ 2 = 0 r 1, so 13 = 1101₂. (Or take
  away the biggest column value that fits, again and again.)
- **Hexadecimal digits:** after 9 come A = 10, B = 11, C = 12, D = 13,
  E = 14, F = 15.
- **Binary and hexadecimal:** split the binary number into groups of four
  from the right; each group is one hex digit. 1011 0110₂ = B6₁₆. Going the
  other way, write each hex digit as four bits.
- **From one base to another:** go through base 10 — change to base 10
  first, then to the new base.
- **Column addition:** add as you do in base 10, starting on the right,
  but carry when a column reaches the base, not 10. In binary, 1 + 1 = 10:
  write 0 and carry 1; 1 + 1 + 1 = 11: write 1, carry 1. In hexadecimal,
  F + 5 = 20 (fifteen and five make twenty, which is one sixteen and four):
  write 4, carry 1.

## Purpose

Binary and hexadecimal are taught in computing — Key Stage 3 and GCSE
Computer Science in England, and computer science courses everywhere —
because every number, letter and colour inside a computer is stored in
binary, and hexadecimal is its short form (colour codes, memory
addresses). Working in other bases is also a favourite of maths clubs: it
shows what place value really means by taking away the familiar number
ten, and makes the carrying rule in addition visible.

## History

Positional notation was perfected in India by the 5th century AD and
reached Europe through Arabic mathematicians. The Babylonians had counted
in base 60, which survives in our minutes and seconds. Gottfried Wilhelm
Leibniz described binary arithmetic in 1703 in *Explication de
l'Arithmétique Binaire*, noting its likeness to the hexagrams of the
Chinese *I Ching*. In 1937 Claude Shannon showed that binary arithmetic
could be built from electrical switches, and binary became the language of
digital computers; hexadecimal came into wide use with byte-based machines
such as the IBM System/360 in the 1960s.

## This implementation

- **Spec knobs:** `difficulty`; `topic` (`mixed`, `binary`, `hex`,
  `base_n`, `addition`); `locale` (`uk` says DENARY for base 10; `us` and
  `in` say DECIMAL); `count` (4-12); `width`, `height`, `line`.
- **Since 1.1.0:** `line` scales every rule and diagram stroke on the
  page and its key (it was accepted but changed nothing before); a
  `count` outside its range is clamped and recorded as `requested_count`.
- **Generation:** Kids reads 4-bit place-value charts and converts numbers
  below 16 to and from binary; Easy goes to 6 bits with 8-bit charts;
  Medium converts 8-bit binary and two-digit hexadecimal and adds in
  binary; Hard converts binary ↔ hexadecimal, three-digit hexadecimal and
  bases 3-9, and adds 8-bit binary numbers; Expert converts from one base to
  another (2-9), binary up to 16 bits, and adds in hexadecimal and in base
  n. Single-topic pages are served at an honest level — hexadecimal and
  addition from Medium, bases 3-9 from Hard (meta reports
  `requested_difficulty`). No question repeats; additions come last and
  get taller rows. Every number is written with its base as a subscript,
  drawn smaller and lower.
- **Solving:** the generator writes numbers in a base by repeated division
  and adds column by column, recording each carry.
- **Guarantees:** `answers_checked` — every printed question and answer is
  read back with the standard library's `u64::from_str_radix`, an
  implementation independent of the generator's digit routines, and must
  give the task's value (or the sum of the two addends); a question whose
  base is its answer's base is refused. The tests also check the digit
  routines against the standard library for every base 2-16, read every
  place-value chart back from the page (column heads must be the powers of
  two, and the bits under them must make the number), and read every
  addition back from the key — both addends, the sum and the carries,
  digit by digit at the logged column positions — and add it again in the
  test's own column arithmetic.

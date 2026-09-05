---
title: "Cryptarithm"
blurb: "An addition in letters, with exactly one way to read it as digits"
category: word
version: "1.0.0"
---
An addition written in letters: give each letter a digit and make the sum
true.

## What it is

An addition like `SEND + MORE = MONEY` where every letter stands for one
digit, the same digit everywhere it appears, different letters for different
digits, and no number starts with zero. Exactly one assignment makes the
arithmetic work — that is the puzzle's contract.

## How to play

Work column by column from the units, tracking carries. The leftmost letter
of the total is often forced (in SEND+MORE=MONEY, M must be 1 — two
four-digit numbers cannot reach 20000). Each carry deduction feeds the next
column; branch only when a column genuinely allows two digits, and back out
at the first collision between letters.

## Purpose

The bridge between the word and number lanes, and the workspace's one
generator that **cannot work answer-first**: you cannot write down digits
first and hope words appear. It searches word triples whose letters admit
exactly one reading, which inverts the usual pipeline and is documented in
the crate as the exception that proves the rule.

## History

Letter arithmetic circulated in 19th-century journals, but the genre's
masterpiece is **Henry Dudeney's** SEND+MORE=MONEY (*Strand Magazine*, 1924).
The name *crypt-arithmétique* was coined by Minos Vatriquant in 1931; J. A.
H. Hunter later coined **alphametic** for the meaningful-words special case.

## This implementation

- **Spec knobs:** `max_letters` (default 7), `theme`/word pool, `difficulty`.
- **Generation:** word triples `A + B = C` are screened by a fast
  plausibility filter, then a column-by-column search with carry propagation
  counts assignments; only triples with exactly one survive. The one reading
  is re-verified arithmetically rather than trusted from the search.
- **Guarantees:** exactly one digit assignment; leading letters nonzero;
  cross-checked against brute force over all 151,200 assignments of a
  six-letter sum.
- **Difficulty:** letter count and how late the search's first forced digit
  arrives, banded.

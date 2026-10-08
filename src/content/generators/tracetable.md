---
title: "Trace Tables"
blurb: "Trace tables — exam-style pseudocode and flowcharts: complete the table, state the output, find the input"
category: maths
version: "1.0.0"
---
Run a short algorithm by hand: fill in the trace table, say what it outputs, or work out what was typed in.

## What it is

A computing worksheet of one to four questions. Each prints a short
algorithm — numbered lines of exam-style pseudocode, or the same kind of
algorithm drawn as a flowchart — beside an empty trace table with a column
for every variable and one for the output. Some questions ask you to
complete the table, some ask what the algorithm outputs, and some give the
output and ask which number was entered. The answer key fills in every
table and answer line.

## How to play

A trace table records a program's run, one step at a time.

- Start at the top (or at START on a flowchart) and carry out one line at
  a time.
- Each time a variable gets a value, write the value in the next empty box
  of that variable's column. When the box in the current row is already
  used, move down to a new row.
- When the algorithm outputs something, write it in the OUTPUT column.
- X ← X + 1 (or X = X + 1) means "work out X + 1, then store it in X".
- FOR I ← 1 TO 4 runs the lines inside with I = 1, 2, 3 and 4. On a
  flowchart the loop is drawn as a test: I goes up by one each time round,
  so it ends one past the last value (5) when the test fails.
- WHILE repeats the lines inside as long as its test is true; the test is
  checked before every pass.
- IF … THEN … ELSE runs the THEN lines when the test is true, otherwise
  the ELSE lines. On a flowchart, follow the YES or NO arrow.
- DIV divides and throws away the remainder: 17 DIV 5 = 3. MOD gives the
  remainder: 17 MOD 5 = 2.
- Lists count from 0: in NUMS ← [4, 9, 2], NUMS[0] is 4 and NUMS[2] is 2.
- To find a number that was entered, try numbers from the range given and
  trace each one until the output matches. Only one number in the range
  works.

The first row of the table is filled in on the easiest pages, to show you
how to start.

## Purpose

Tracing code is how programmers check an algorithm without a computer,
and it is a core skill in school computing: GCSE Computer Science (AQA
8525, OCR J277) sets trace tables in every algorithms paper, and the
National Centre for Computing Education's Key Stage 3 and 4 lessons teach
"tracing algorithms" as a first step towards debugging. Working through
loops, conditions, integer division and lists by hand builds the mental
model of a running program that makes later coding faster and more
accurate.

## History

Hand-tracing is as old as programming. Herman Goldstine and John von
Neumann's 1947 reports on planning programs used flow diagrams with
boxes for each operation and asked the programmer to follow the values
through them, and early programmers "desk-checked" their code on paper
before spending precious machine time. Flowchart symbols were standardised
in the 1960s (ANSI X3.5, 1970, later ISO 5807), and trace tables became the
standard way to teach and examine program execution in school computing
courses from the 1980s on.

## This implementation

- **Spec knobs:** `difficulty` (Kids is served as Easy, reported as
  `requested_difficulty`); `task` (`mixed`, `trace`, `output`,
  `find_input`); `format` (`pseudocode`, `flowchart`, or `mixed`
  alternating); `syntax` (`aqa`: `←`, `OUTPUT`, `ENDFOR`, `=`, `≤ ≥`;
  `ocr`: `=`, `PRINT()`, `NEXT I`, `==`, `<= >=`); `count` (1-4, clamped,
  `requested_count`); `width`, `height`, `line`.
- **Generation:** each question picks an algorithm family for its level —
  Easy: running totals, times tables and countdowns in one FOR loop (first
  row given); Medium: WHILE loops (doubling, division by repeated
  subtraction), IF with MOD inside a loop, Fibonacci-style swapping; Hard:
  digit sums with DIV and MOD, Euclid's algorithm, the Collatz rule with
  IF-ELSE, largest/smallest and counting in a list; Expert: one pass of
  bubble sort, conversion to binary, nested loops, reversing digits. Numbers
  are drawn at random; a program is kept only if it runs within bounds
  (at most 2,000 steps, numbers below a million, DIV and MOD on
  non-negative numbers only) and its table fits (at most 10 rows on Easy,
  14 otherwise, 8 columns). A page avoids repeating an algorithm family
  while it can. Flowcharts are drawn from the same program with every FOR
  loop rewritten as counter, test and add-one boxes, so the counter's last
  value is part of the trace.
- **Solving:** a tree-walking interpreter runs the program and records
  each change of a variable and each output; the table is laid out by the
  rule above (a new row only when the column's box in the current row is
  taken), so each column lists its values in order.
- **Guarantees:** `answers_checked` — every question is re-run by a second,
  independent path: the printed pseudocode lines are parsed back into a
  program, compiled to bytecode and executed on a stack machine, and the
  rebuilt table and outputs must equal the key exactly. For "find the
  input", every number in the stated range is run, and exactly one must
  give the stated output (the key's answer); the printed table has as
  many rows as the longest run in the range, so its length gives nothing
  away. The tests also check that both interpreters agree on every
  question, that printing then parsing returns the same program, that the
  key writes exactly the table cells and answers in red and the page none,
  and that everything printed is in the font.

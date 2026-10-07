---
title: "Logic Gates"
blurb: "Logic gates — AND, OR, NOT, NAND, NOR and XOR circuits: complete the truth table, find the output, find the inputs"
category: maths
version: "1.0.0"
---
AND, OR, NOT, NAND, NOR and XOR circuits drawn with the standard symbols — complete the truth table, find the output, find the inputs.

## What it is

A worksheet of logic circuits. Each circuit has inputs A, B and C on the
left, gates drawn with the standard distinctive shapes (the D of AND, the
curved shield of OR, the triangle and bubble of NOT, and NAND, NOR and XOR),
and one output Q on the right. Wires never cross. Questions ask for a whole
truth table (with the in-between wires labelled on the easier levels), the
output for given inputs, or — on the hard levels — the only inputs that give
a stated output. The answer key fills in every answer.

## How to play

1 means on (true), 0 means off (false).

- **AND** is 1 only when both inputs are 1.
- **OR** is 1 when either input (or both) is 1.
- **NOT** has one input and turns 1 into 0 and 0 into 1.
- **NAND** is NOT AND: 0 only when both inputs are 1.
- **NOR** is NOT OR: 1 only when both inputs are 0.
- **XOR** (exclusive or) is 1 when the inputs are different.

A small circle (a bubble) on a gate's output means NOT. Work from left to
right: find each gate's output from its inputs, then use it as an input to
the next gate. For a truth table, do this for every row; a labelled wire has
its own column. To find the inputs, try each row of the truth table until
you find the one that gives the output asked for — there is only one.

## Purpose

Boolean logic is how computers compute. Logic gates and truth tables are
part of GCSE Computer Science (AQA 8525 "Boolean logic", OCR J277), Key
Stage 3 computing, and introductory digital electronics and CS courses
worldwide. Tracing small circuits builds the habit of evaluating
expressions step by step, and the find-the-inputs questions turn a truth
table into a search.

## History

George Boole set out the algebra of true and false in 1854. In 1937 Claude
Shannon's master's thesis showed that Boole's algebra describes relay
switching circuits, and with it the design of every digital computer since.
The distinctive gate shapes were standardised in the US military standard
MIL-STD-806B (1962) and later in ANSI/IEEE Std 91; the rectangular IEC
symbols are their European alternative.

## This implementation

- **Spec knobs:** `difficulty` (Kids is served as Easy; Easy: single AND,
  OR and NOT gates; Medium: single NAND, NOR and XOR gates and two-gate
  circuits of AND, OR and NOT; Hard: two or three gates of every kind, up to
  three inputs; Expert: three or four gates, three inputs with some used
  twice, only Q in the table); `task` (`truth_table`, `output`,
  `find_inputs` — served as `output` below Hard — and `mixed`); `count`
  (2-8); page `width`, `height` and `line`.
- **Generation:** a circuit is a random expression tree of the level's
  gates. It is drawn as a tree — each gate placed at the average height of
  its inputs, inputs listed top to bottom — so no wires cross; an input used
  twice gets its own labelled terminal. Circuits whose output ignores an
  input, gates whose output is constant, and gates with the same wire on
  both inputs are thrown away. Single-gate pages may repeat a gate (there
  are only three per level) with different questions.
- **Solving:** answers are computed by evaluating the circuit row by row.
- **Guarantees:** every answer is re-derived from bitmask truth tables,
  gate by gate (`answers_checked`); a find-the-inputs target is reached by
  exactly one input row, found by enumerating all 2, 4 or 8 rows.
